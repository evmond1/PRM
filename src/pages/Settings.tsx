import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';
import RoleBasedContent from '../components/RoleBasedContent';

function Settings() {
  const { profile, loading: authLoading } = useAuth();
  const { settings, loading: settingsLoading, updateSettings } = useSettings();

  const [appName, setAppName] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (settings) {
      setAppName(settings.app_name || '');
      setLogoUrl(settings.logo_url || '');
    }
  }, [settings]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError(null);
    setSaveSuccess(false);

    const { error } = await updateSettings({
      app_name: appName,
      logo_url: logoUrl || null, // Save null if empty string
    });

    if (error) {
      setSaveError(error.message);
      setSaveSuccess(false);
    } else {
      setSaveSuccess(true);
      // Optionally refetch settings if updateSettings doesn't return the updated data
      // fetchSettings();
    }
    setIsSaving(false);
  };

  if (authLoading || settingsLoading) {
    return <div>Loading settings...</div>; // Basic loading state
  }

  return (
    <RoleBasedContent allowedRoles={['admin']} fallback={<div>You do not have permission to view these settings.</div>}>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">App Settings (White-Label)</h1>

        <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
          <p className="text-gray-700 mb-4">Customize the application name and logo. Only visible to admin users.</p>

          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label htmlFor="appName" className="block text-gray-700 text-sm font-bold mb-2">
                Application Name:
              </label>
              <input
                type="text"
                id="appName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={appName}
                onChange={(e) => setAppName(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="logoUrl" className="block text-gray-700 text-sm font-bold mb-2">
                Logo URL:
              </label>
              <input
                type="text"
                id="logoUrl"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={logoUrl}
                onChange={(e) => setLogoUrl(e.target.value)}
                placeholder="e.g., https://example.com/logo.png"
              />
              {logoUrl && (
                <div className="mt-2">
                  <img src={logoUrl} alt="Logo Preview" className="max-h-20" />
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSaving}
              >
                {isSaving ? 'Saving...' : 'Save Settings'}
              </button>
              {saveSuccess && <p className="text-green-500 text-sm">Settings saved!</p>}
              {saveError && <p className="text-red-500 text-sm">Error: {saveError}</p>}
            </div>
          </form>
        </div>
      </div>
    </RoleBasedContent>
  );
}

export default Settings;
