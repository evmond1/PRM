import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // Assuming AuthContext is in src/contexts

const ProtectedRoute: React.FC = () => {
  const authContext = useContext(AuthContext);

  // Check if the context is available and if the user is authenticated
  // You might need a more robust check based on your AuthContext implementation
  // For now, we'll assume a simple check like authContext?.user exists
  if (!authContext || !authContext.user) {
    // Redirect to the login page if not authenticated
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;
