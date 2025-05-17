import React from 'react';
import { useAuth } from '../contexts/AuthContext';

interface AuthStatusWaiterProps {
  children: React.ReactNode;
}

const AuthStatusWaiter: React.FC<AuthStatusWaiterProps> = ({ children }) => {
  const { loading } = useAuth();

  if (loading) {
    // You can replace this with a proper loading spinner or component
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-700">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p>Loading authentication status...</p>
        </div>
      </div>
    );
  }

  // Once authentication status is loaded, render the children (which will be AppRoutes)
  return <>{children}</>;
};

export default AuthStatusWaiter;
