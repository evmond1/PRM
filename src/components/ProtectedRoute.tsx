import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  // If still loading, don't render anything yet.
  // AuthStatusWaiter should handle this before ProtectedRoute is reached,
  // but this adds an extra layer of safety.
  if (loading) {
    return null; // Or a loading indicator
  }

  // If user is authenticated, render the nested routes via Outlet
  // Otherwise, redirect to the login page
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
