import React, { useState } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Menu, X, Home, Users, Package, ShoppingBag, DollarSign,
  BarChart2, GraduationCap, Bell, User, LogOut, ChevronDown
} from 'lucide-react';

const Layout: React.FC = () => {
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();

  // For demo purposes - normally would come from API
  const notifications = [
    { id: 1, title: 'New partner request', message: 'TechCorp has requested to become a partner', time: '5 min ago' },
    { id: 2, title: 'Deal closed', message: 'The deal with Acme Inc. has been closed successfully', time: '1 hour ago' },
    { id: 3, title: 'Product update', message: 'New product catalog has been updated', time: '3 hours ago' },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleNotifications = () => {
    setNotificationsOpen(!notificationsOpen);
    if (profileOpen) setProfileOpen(false); // Close profile if notifications open
  };

  const toggleProfile = () => {
    setProfileOpen(!profileOpen);
    if (notificationsOpen) setNotificationsOpen(false); // Close notifications if profile open
  };

  const handleSignOut = async () => {
    await signOut();
  };

  // If not logged in, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : '';
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-blue-800 text-white transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-blue-700">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold">DistributeConnect</span>
          </Link>
          <button
            className="p-1 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-white"
            onClick={toggleSidebar}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                className={`flex items-center px-4 py-2 text-sm rounded-md hover:bg-blue-700 ${isActive('/')}`}
                onClick={() => setSidebarOpen(false)} // Close sidebar on link click
              >
                <Home className="w-5 h-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/partners"
                className={`flex items-center px-4 py-2 text-sm rounded-md hover:bg-blue-700 ${isActive('/partners')}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Users className="w-5 h-5 mr-3" />
                Partners
              </Link>
            </li>
            <li>
              <Link
                to="/vendors"
                className={`flex items-center px-4 py-2 text-sm rounded-md hover:bg-blue-700 ${isActive('/vendors')}`}
                onClick={() => setSidebarOpen(false)}
              >
                <Package className="w-5 h-5 mr-3" />
                Vendors
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={`flex items-center px-4 py-2 text-sm rounded-md hover:bg-blue-700 ${isActive('/products')}`}
                onClick={() => setSidebarOpen(false)}
              >
                <ShoppingBag className="w-5 h-5 mr-3" />
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/deals"
                className={`flex items-center px-4 py-2 text-sm rounded-md hover:bg-blue-700 ${isActive('/deals')}`}
                onClick={() => setSidebarOpen(false)}
              >
                <DollarSign className="w-5 h-5 mr-3" />
                Deals
              </Link>
            </li>
            <li>
              <Link
                to="/marketing"
                className={`flex items-center px-4 py-2 text-sm rounded-md hover:bg-blue-700 ${isActive('/marketing')}`}
                onClick={() => setSidebarOpen(false)}
              >
                <BarChart2 className="w-5 h-5 mr-3" />
                Marketing
              </Link>
            </li>
            <li>
              <Link
                to="/training"
                className={`flex items-center px-4 py-2 text-sm rounded-md hover:bg-blue-700 ${isActive('/training')}`}
                onClick={() => setSidebarOpen(false)}
              >
                <GraduationCap className="w-5 h-5 mr-3" />
                Training
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className={`flex items-center px-4 py-2 text-sm rounded-md hover:bg-blue-700 ${isActive('/profile')}`}
                onClick={() => setSidebarOpen(false)}
              >
                <User className="w-5 h-5 mr-3" />
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4 md:px-6">
          <div className="flex items-center">
            <button
              className="p-1 mr-4 rounded-md md:hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={toggleSidebar}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
            <h1 className="text-xl font-semibold text-gray-800">
              {/* Dynamically set page title */}
              {location.pathname === '/' && 'Dashboard'}
              {location.pathname === '/partners' && 'Partners'}
              {location.pathname === '/vendors' && 'Vendors'}
              {location.pathname === '/products' && 'Products'}
              {location.pathname === '/deals' && 'Deals'}
              {location.pathname === '/marketing' && 'Marketing'}
              {location.pathname === '/training' && 'Training'}
              {location.pathname === '/profile' && 'Profile'}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                className="p-1 rounded-full text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={toggleNotifications}
              >
                <Bell className="w-6 h-6" />
                {notifications.length > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                )}
              </button>
              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-40">
                  <div className="px-4 py-2 text-sm text-gray-700 border-b">Notifications</div>
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <div key={notification.id} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100">
                        <p className="font-semibold">{notification.title}</p>
                        <p className="text-xs text-gray-500">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    ))
                  ) : (
                    <div className="block px-4 py-3 text-sm text-gray-700">No new notifications</div>
                  )}
                  <div className="px-4 py-2 text-sm text-center text-blue-600 hover:underline cursor-pointer border-t">View All</div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={toggleProfile}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" // Example Pexels URL
                  alt="User Avatar"
                />
                <span className="hidden md:block ml-2 text-gray-700 font-medium">{user?.email || 'User'}</span>
                <ChevronDown className="w-4 h-4 ml-1 text-gray-500 hidden md:block" />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 z-40">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => { setProfileOpen(false); setSidebarOpen(false); }}
                  >
                    <User className="inline-block w-4 h-4 mr-2" /> Your Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="inline-block w-4 h-4 mr-2" /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          <Outlet /> {/* This is where the routed pages will render */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
