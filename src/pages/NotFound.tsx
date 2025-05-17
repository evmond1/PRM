import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-center">404 - Page Not Found</h3>
        <p className="mt-4 text-center">The page you are looking for does not exist.</p>
        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-600 hover:underline">Go to Dashboard</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
