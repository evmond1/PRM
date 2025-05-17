import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSettings } from '../contexts/SettingsContext';

function Layout() {
  const { settings, loading } = useSettings();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-700">
        Loading application settings...
      </div>
    );
  }

  const appName = settings?.app_name || 'My App';
  const logoUrl = settings?.logo_url;

  return (
    <div className="flex h-screen bg-gray-100"> {/* Base background */}
      <Sidebar appName={appName} logoUrl={logoUrl} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header appName={appName} logoUrl={logoUrl} />
        {/* Main content area with padding and background */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6"> {/* Increased padding, slightly lighter background */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
