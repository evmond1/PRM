import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Store, 
  Package, 
  BarChart2, 
  Calendar, 
  Settings, 
  HelpCircle,
  X
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, isMobile, toggleSidebar }) => {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: <Home size={20} /> },
    { name: 'Partners', path: '/partners', icon: <Users size={20} /> },
    { name: 'Vendors', path: '/vendors', icon: <Store size={20} /> },
    { name: 'Products', path: '/products', icon: <Package size={20} /> },
    { name: 'Deals', path: '/deals', icon: <BarChart2 size={20} /> },
    { name: 'Marketing', path: '/marketing', icon: <Calendar size={20} /> },
  ];

  const bottomNavItems = [
    { name: 'Settings', path: '/settings', icon: <Settings size={20} /> },
    { name: 'Help', path: '/help', icon: <HelpCircle size={20} /> },
  ];

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside 
        className={`
          ${isMobile ? 'fixed inset-y-0 left-0 z-30' : 'relative'} 
          w-64 bg-white border-r border-gray-200 flex flex-col h-full
        `}
      >
        {/* Sidebar header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold">
              PRM
            </div>
            <h2 className="ml-2 text-xl font-semibold text-gray-900">Partner RM</h2>
          </div>
          {isMobile && (
            <button 
              onClick={toggleSidebar}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </div>
        </nav>

        {/* Bottom navigation */}
        <div className="px-3 py-4 border-t border-gray-200">
          <div className="space-y-1">
            {bottomNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => `
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md
                  ${isActive 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'}
                `}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
