import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Package, ShoppingBag, BarChart2, BookOpen, Bell, Settings, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import RoleBasedContent from './RoleBasedContent';

interface SidebarProps {
  appName: string;
  logoUrl: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ appName, logoUrl }) => {
  const location = useLocation();
  const { profile } = useAuth();

  const navItems = [
    { path: '/dashboard', name: 'Dashboard', icon: Home },
    { path: '/partners', name: 'Partners', icon: Users },
    { path: '/vendors', name: 'Vendors', icon: Package },
    { path: '/products', name: 'Products', icon: ShoppingBag },
    { path: '/deals', name: 'Deals', icon: BarChart2 },
    { path: '/marketing', name: 'Marketing', icon: BarChart2 },
    { path: '/training', name: 'Training', icon: BookOpen },
    { path: '/notifications', name: 'Notifications', icon: Bell },
    { path: '/settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex flex-col w-64 bg-gray-800 text-white shadow-lg"> {/* Added shadow */}
      <div className="flex items-center justify-center h-16 bg-gray-900 text-xl font-bold border-b border-gray-700"> {/* Darker background, border */}
         {logoUrl ? (
          <img src={logoUrl} alt={`${appName} Logo`} className="h-8" />
        ) : (
          <span>{appName}</span>
        )}
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2"> {/* Increased padding */}
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${ // Added text size, weight, transition
              location.pathname === item.path ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <item.icon size={20} className="mr-3" />
            {item.name}
          </Link>
        ))}

        {/* Admin-only link example */}
        <RoleBasedContent allowedRoles={['admin']}>
           <Link
            to="/admin/users"
            className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${ // Added text size, weight, transition
              location.pathname === '/admin/users' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <Shield size={20} className="mr-3" />
            Admin Users
          </Link>
        </RoleBasedContent>

      </nav>
    </div>
  );
};

export default Sidebar;
