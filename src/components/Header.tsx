import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Bell, UserCircle } from 'lucide-react';

interface HeaderProps {
  appName: string;
  logoUrl: string | null;
}

const Header: React.FC<HeaderProps> = ({ appName, logoUrl }) => {
  const { user, signOut } = useAuth();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm"> {/* Lighter border, added shadow */}
      <div className="flex items-center">
        {logoUrl ? (
          <img src={logoUrl} alt={`${appName} Logo`} className="h-8 mr-3" />
        ) : (
          <span className="text-xl font-semibold text-gray-800">{appName}</span>
        )}
      </div>

      <div className="flex items-center space-x-4"> {/* Added space between items */}
        {/* Notification Icon */}
        <Link to="/notifications" className="text-gray-500 hover:text-indigo-600 transition-colors duration-200"> {/* Changed color, added hover effect */}
          <Bell size={24} />
        </Link>

        {/* User Dropdown (Placeholder) */}
        <div className="relative">
          <button className="flex items-center text-gray-600 hover:text-indigo-600 focus:outline-none transition-colors duration-200"> {/* Changed color, added hover effect */}
            <UserCircle size={24} className="mr-2" />
            <span className="hidden md:block text-sm font-medium">{user?.email || 'Guest'}</span> {/* Added text size and weight */}
          </button>
          {/* Dropdown content goes here */}
        </div>

        {/* Sign Out Button */}
        {user && (
          <button
            onClick={signOut}
            className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-200" // Added text size, rounded-md, focus ring
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
