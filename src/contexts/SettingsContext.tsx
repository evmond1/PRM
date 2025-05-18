import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // Assuming supabase client is available
import { Database } from '../lib/supabase'; // Import Database type

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
      // and there's only one row or you fetch based on a specific key/ID
      console.log('SettingsContext: Calling supabase.from("app_settings").select("*").single()...');
      const { data, error } = await supabase
        .from('app_settings') // Replace with your actual settings table name
        .select('*')
        .single(); // Assuming a single row for global settings

      if (!isMounted) {
        console.log('SettingsContext: Supabase fetch finished but component unmounted. Aborting state updates.');
        return; // Don't update state if component unmounted
      }

      console.log('SettingsContext: Supabase fetch finished. Data:', data, 'Error:', error);

      if (error) {
        console.error('SettingsContext: Error fetching settings:', error);
        setError(error);
        setSettings(null); // Or set default settings if fetching fails
      } else {
        console.log('SettingsContext: Settings fetched successfully:', data);
        setSettings(data as AppSettings); // Cast data to AppSettings type
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
