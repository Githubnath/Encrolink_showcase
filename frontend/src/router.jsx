import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import Verify from './pages/Verify';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import AdminPanel from './components/Dashboard/AdminPanel';
import NotFound from './pages/NotFound';   // Optional catch-all

// Example protected route wrapper (replace with real auth logic)
const ProtectedRoute = ({ element }) => {
  const isAuthenticated = true; // Replace with actual auth check
  return isAuthenticated ? element : <Login />;
};

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/verify/:token" element={<Verify />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/forgot-password" element={<ForgotPassword />} />
    <Route path="/reset-password/:token" element={<ResetPassword />} />
    <Route path="/admin" element={<ProtectedRoute element={<AdminPanel />} />} />
    <Route path="*" element={<NotFound />} />  {/* Optional catch-all */}
  </Routes>
);

export default Router;
