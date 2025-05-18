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

      // Assuming settings are stored in a table, e.g., 'app_settings'
      // Fetch using limit(1) instead of single() for potentially better handling of no rows
      console.log('SettingsContext: Calling supabase.from("app_settings").select("*").limit(1)...');

      const { data, error } = await supabase
        .from('app_settings') // Replace with your actual settings table name
        .select('*')
        .limit(1); // Use limit(1)

      console.log('SettingsContext: Supabase fetch finished.');
      console.log('SettingsContext: Raw Data:', data);
      console.log('SettingsContext: Raw Error:', error);


      if (!isMounted) {
        console.log('SettingsContext: Supabase fetch finished but component unmounted. Aborting state updates.');
        return; // Don't update state if component unmounted
      }

      if (error) {
        console.error('SettingsContext: Error fetching settings:', error);
        setError(error);
        setSettings(null); // Or set default settings if fetching fails
      } else {
        console.log('SettingsContext: Settings fetched successfully.');
        // Handle the result which is now an array (even if it's just one item or empty)
        if (data && data.length > 0) {
          console.log('SettingsContext: Found settings data:', data[0]);
          setSettings(data[0] as AppSettings); // Take the first item
        } else {
          console.log('SettingsContext: No settings data found.');
          setSettings(null); // Or set default settings if no data
        }
      }

      console.log('SettingsContext: fetchSettings finished, setting loading to false.');
      setLoading(false);
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
