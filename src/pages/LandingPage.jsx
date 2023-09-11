import React from 'react';
import { Link } from 'react-router-dom';
import mallImage from '../components/layout/mall.jpg';

const LandingPage = () => {
  const heroSectionStyle = {
    backgroundImage: `url(${mallImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };


  return (
    <div className="min-h-screen flex items-center justify-center" style={heroSectionStyle}>
      <div className="p-8 text-center">
        <h1 className="text-5xl text-white font-bold mb-6">Welcome to Ozas</h1>
        <h2 className="text-2xl text-white font-semibold mb-4">Please log in or register to begin browsing</h2>
        <div className="flex justify-center space-x-4">
          <Link
            to="/login"
            className="px-40 py-4 text-xl rounded-lg transition bg-white hover:bg-red-600 hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-40 py-4 text-xl rounded-lg transition bg-white hover:bg-red-600 hover:text-white"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;