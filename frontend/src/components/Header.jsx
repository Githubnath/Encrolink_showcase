// frontend/src/components/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import avatarDefault from '../assets/images/avatar-default.png';

const Header = () => {
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Profile', path: '/profile' },
  ];

  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600">
      <div className="flex items-center justify-between w-full md:w-auto">
        <img src={logo} alt="EncroLink Logo" className="h-10 w-auto" />
      </div>

      <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 mt-4 md:mt-0">
        {navLinks.map((link) => (
          <button
            key={link.name}
            onClick={() => navigate(link.path)}
            className="text-white hover:underline font-semibold"
          >
            {link.name}
          </button>
        ))}
      </nav>

      <div className="flex items-center space-x-4 mt-4 md:mt-0">
        <span className="text-white font-semibold">Welcome, User</span>
        <img
          src={avatarDefault}
          alt="User Avatar"
          className="h-10 w-10 rounded-full border-2 border-white"
        />
      </div>
    </header>
  );
};

export default Header;

