import { createBrowserRouter, Navigate } from 'react-router-dom';
import React from 'react';

// Components
import Test from '../test/Test';
import CardList from '../card/CardList';
import AllPosts from '../components/AllPosts';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Dashboard from '../components/Dashboard';
import CreatePost from '../components/CreatePost';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <Layout>
          <Dashboard />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: '/create',
    element: (
      <ProtectedRoute>
        <Layout>
          <CreatePost />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: '/posts',
    element: (
      <ProtectedRoute>
        <Layout>
          <AllPosts />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: '/cards',
    element: (
      <ProtectedRoute>
        <Layout>
          <CardList />
        </Layout>
      </ProtectedRoute>
    )
  },
  {
    path: '/test',
    element: <Test />
  }
]);

export default router;
