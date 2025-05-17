import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import NotFound from './pages/NotFound';
import { useAuth } from './contexts/AuthContext';

function AppRoutes() {
  const { user, loading } = useAuth();

  // AuthStatusWaiter handles the initial loading state before AppRoutes is rendered.
  // So, by the time AppRoutes renders, 'loading' should be false.
  // However, keeping the check here is harmless and provides a fallback.
  if (loading) {
    return null; // Or a loading spinner if AuthStatusWaiter wasn't used
  }

  return (
    <Routes>
      {/* Public Routes */}
      {/* If user is logged in, redirect from login/signup to dashboard */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />

      {/* Root route - Redirect based on auth status */}
      {/* If user is logged in, go to dashboard, otherwise go to login */}
      <Route path="/" element={user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} />

      {/* Protected Routes */}
      {/* This route element uses ProtectedRoute to check auth */}
      <Route element={<ProtectedRoute />}>
        {/* Nested routes that require authentication */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />
          {/* Add other protected routes here */}
        </Route>
      </Route>

      {/* 404 Catch-all Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
