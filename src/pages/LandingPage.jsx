import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-semibold mb-4">Welcome to SUPER Shop Website</h1>
        <div className="flex justify-center space-x-4">
          <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg">
            Login
          </button>
          <button className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;