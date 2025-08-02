// routes/Routes.jsx
import { createBrowserRouter } from 'react-router-dom';
import React from 'react';
import AuthContainer from '../components/auth/AuthContainer'; // Assuming you have an AuthContainer component
import Dashboard from '../components/layout/DashboardLayout'; // Assuming you have a Dashboard component

const router = createBrowserRouter([
  {
    path: '/',
    element: <AuthContainer />,
  },

   {
    path: '/dashboard',
    element: <Dashboard />,
  },
]);

export default router;
