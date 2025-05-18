import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Import useAuth
import { SettingsProvider } from './contexts/SettingsContext'; // Import SettingsProvider
import AppRoutes from './AppRoutes';

// Simple Loading Component (can be replaced with a more complex one)
const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-700">
    <div className="text-center">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
      <p>Loading application...</p>
    </div>
  </div>
);

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    console.log('AppContent: Auth is loading, showing spinner.');
    return <LoadingSpinner />;
  }

  console.log('AppContent: Auth finished loading, rendering routes.');
  return (
    <SettingsProvider>
      <Router>
        <AppRoutes />
      </Router>
    </SettingsProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent /> {/* Render the content component that waits for auth */}
    </AuthProvider>
  );
}

export default App;
