import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth(); // Use the hook to get user and loading state

  // While loading, you might want to show a loading indicator or null
  // For now, we'll just wait for loading to finish before redirecting
  if (loading) {
    return null; // Or a loading spinner component
  }

  // Check if the user is authenticated
  if (!user) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
