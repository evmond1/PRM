import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';

const Dashboard: React.FC = () => {
  const { user, profile, signOut } = useAuth();
  const { settings, loading: settingsLoading, error: settingsError } = useSettings();

  const handleSignOut = async () => {
    await signOut();
  };

  if (settingsLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading settings...</div>;
  }

  if (settingsError) {
    return <div className="flex items-center justify-center min-h-screen text-red-500">Error loading settings: {settingsError.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          {settings?.logo_url && (
            <img src={settings.logo_url} alt="App Logo" className="h-8 mr-4" />
          )}
          <h1 className="text-3xl font-bold text-gray-800">{settings?.app_name || 'Dashboard'}</h1>
        </div>
        <div className="flex items-center">
          {profile && (
            <span className="mr-4 text-gray-700">Welcome, {profile.name || user?.email}!</span>
          )}
          <button
            onClick={handleSignOut}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-200"
          >
            Sign Out
          </button>
        </div>
      </header>

      <main>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Overview</h2>
        {/* Add your dashboard content here */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Card */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Card Title</h3>
            <p className="text-gray-600">This is an example card. You can add various widgets and information here.</p>
          </div>
          {/* Add more cards/widgets */}
           <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Another Card</h3>
            <p className="text-gray-600">Display key metrics, recent activity, or quick links.</p>
          </div>
           <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-medium text-gray-900 mb-4">Third Card</h3>
            <p className="text-gray-600">Customize these cards based on user roles or preferences.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
