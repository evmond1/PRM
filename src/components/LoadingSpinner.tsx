import React from 'react';

const LoadingSpinner: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    <p className="ml-4 text-lg text-gray-700">Loading authentication status...</p>
  </div>
);

export default LoadingSpinner;
