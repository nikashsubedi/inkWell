import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SlidingAuthTest = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🎉 SLIDING AUTH WORKING! 🎉
        </h1>
        <p className="text-gray-600 text-lg">
          The new component is now loaded and ready!
        </p>
        <p className="text-sm text-gray-500 mt-4">
          If you can see this, the routing is working correctly.
        </p>
      </div>
    </div>
  );
};

export default SlidingAuthTest;
