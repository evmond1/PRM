import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/supabase';

// Define the type for the app_settings table row
type AppSettingsRow = Database['public']['Tables']['app_settings']['Row'];

interface AppSettings extends AppSettingsRow {
  // Add other settings properties here if needed, extending the Supabase type
}

interface SettingsContextType {
  settings: AppSettings | null;
  loading: boolean;
  error: any; // Consider a more specific error type
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

// Define a timeout duration (e.g., 15 seconds)
const SETTINGS_FETCH_TIMEOUT = 15000; // 15 seconds

// Define default settings to use as a fallback (keeping this for now, but focusing on fixing the fetch)
const DEFAULT_APP_SETTINGS: AppSettings = {
  id: 'default-settings-id', // Use a placeholder ID
  app_name: 'Default App Name',
  logo_url: null, // Or a default logo URL if available
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};


export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<AppSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  console.log('SettingsContext: Initializing, loading:', loading);

  useEffect(() => {
    console.log('SettingsContext: useEffect running to fetch settings');

    // Flag to track if the component is mounted
    let isMounted = true;

    const fetchSettings = async () => {
      if (!isMounted) {
        console.log('SettingsContext: fetchSettings called but component unmounted. Aborting.');
        return; // Don't proceed if component unmounted
      }

      console.log('SettingsContext: fetchSettings starting...');
      setLoading(true);
      setError(null);

      // Create the Supabase fetch promise
      console.log('SettingsContext: Creating Supabase fetch promise...');
      const supabaseFetchPromise = supabase.from('app_settings').select('*').limit(1);

      // Add logging to the Supabase fetch promise's outcome
      const instrumentedSupabaseFetchPromise = supabaseFetchPromise
        .then(result => {
          console.log('SettingsContext: Supabase fetch promise RESOLVED.', result);
          return result; // Pass the result along
        })
        .catch(err => {
          console.error('SettingsContext: Supabase fetch promise REJECTED.', err);
          throw err; // Re-throw the error so Promise.race catches it
        });


      // Use a Promise.race to implement a timeout
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => {
          console.log('SettingsContext: Timeout promise triggered.');
          reject(new Error('Settings fetch timed out'));
        }, SETTINGS_FETCH_TIMEOUT)
      );

      try {
        console.log('SettingsContext: Racing Supabase fetch against timeout...');

        // Race the instrumented Supabase fetch against the timeout
        const { data, error: supabaseError } = await Promise.race([
          instrumentedSupabaseFetchPromise,
          timeoutPromise, // This will reject if timeout occurs first
        ]);

        console.log('SettingsContext: Await Promise.race finished.');


        console.log('SettingsContext: Supabase fetch finished or timeout occurred.');
        console.log('SettingsContext: Raw Data:', data);
        console.log('SettingsContext: Raw Error:', supabaseError);

        if (!isMounted) {
          console.log('SettingsContext: Supabase fetch finished but component unmounted. Aborting state updates.');
          return; // Don't update state if component unmounted
        }

        if (supabaseError) {
          console.error('SettingsContext: Error fetching settings:', supabaseError);
          setError(supabaseError);
          // Use default settings on Supabase error
          setSettings(DEFAULT_APP_SETTINGS); // Still using fallback for now
        } else {
          console.log('SettingsContext: Settings fetched successfully.');
          // Handle the result which is now an array (even if it's just one item or empty)
          if (data && data.length > 0) {
            console.log('SettingsContext: Found settings data:', data[0]);
            setSettings(data[0] as AppSettings); // Take the first item
          } else {
            console.log('SettingsContext: No settings data found, using defaults.');
            // Use default settings if no data is returned
            setSettings(DEFAULT_APP_SETTINGS); // Still using fallback for now
          }
        }
      } catch (timeoutError: any) {
        // This catch block handles the timeout rejection
        console.error('SettingsContext: Settings fetch timed out:', timeoutError.message);
        if (isMounted) {
           setError(timeoutError);
           // Use default settings on timeout
           setSettings(DEFAULT_APP_SETTINGS); // Still using fallback for now
        }
      } finally {
        if (isMounted) {
          console.log('SettingsContext: fetchSettings finished (or timed out), setting loading to false.');
          setLoading(false);
        }
      }
    };

    fetchSettings();

    return () => {
      console.log('SettingsContext: Cleaning up SettingsContext useEffect, setting isMounted to false');
      isMounted = false; // Set flag to false on cleanup
    };
  }, []); // Empty dependency array means this runs once on mount

  console.log('SettingsContext: Rendering provider, current loading state:', loading);

  return (
    <SettingsContext.Provider value={{ settings, loading, error }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
