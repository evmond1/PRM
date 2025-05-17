import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import AppRoutes from '../AppRoutes'; // Assuming your routes are defined here
import LoadingSpinner from './LoadingSpinner'; // Import the LoadingSpinner component
import { SettingsProvider } from '../contexts/SettingsContext'; // Import SettingsProvider here

const AuthProtectedContent: React.FC = () => {
  const { user, loading } = useAuth();

  // Show a loading spinner while the authentication status is being determined
  if (loading) {
    return <LoadingSpinner />;
  }

  // Once loading is false, render the main application routes wrapped in SettingsProvider
  return (
    <SettingsProvider>
      <AppRoutes />
    </SettingsProvider>
  );
};

export default AuthProtectedContent;
