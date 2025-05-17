import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Pages
import Dashboard from './pages/Dashboard';
import Partners from './pages/Partners';
import Vendors from './pages/Vendors';
import Products from './pages/Products';
import Deals from './pages/Deals';
import Marketing from './pages/Marketing';
import Training from './pages/Training';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute'; // Ensure this path is correct
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastContainer position="top-right" autoClose={3000} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="partners" element={<Partners />} />
              <Route path="vendors" element={<Vendors />} />
              <Route path="products" element={<Products />} />
              <Route path="deals" element={<Deals />} />
              <Route path="marketing" element={<Marketing />} />
              <Route path="training" element={<Training />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Route>

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
