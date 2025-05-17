import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // Assuming supabase client is available

interface AppSettings {
  app_name: string;
  logo_url: string | null;
  // Add other settings properties here
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

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      setError(null);
      // Assuming settings are stored in a table, e.g., 'app_settings'
      // and there's only one row or you fetch based on a specific key/ID
      const { data, error } = await supabase
        .from('app_settings') // Replace with your actual settings table name
        .select('*')
        .single(); // Assuming a single row for global settings

      if (error) {
        console.error('Error fetching settings:', error);
        setError(error);
        setSettings(null); // Or set default settings if fetching fails
      } else {
        setSettings(data as AppSettings); // Cast data to AppSettings type
      }
      setLoading(false);
    };

    fetchSettings();
  }, []); // Empty dependency array means this runs once on mount

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
