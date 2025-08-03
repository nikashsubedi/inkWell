import { createBrowserRouter, Navigate } from 'react-router-dom';
import React from 'react';

// Components
import Test from '../test/Test';
import CardList from '../card/CardList';
import AllPosts from '../components/AllPosts';
import Home from '../components/Home';
import PostView from '../components/PostView';
import SlidingAuthTest from '../components/auth/SlidingAuthTest';
import Dashboard from '../components/Dashboard';
import CreatePost from '../components/CreatePost';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SlidingAuthTest />
  },
  {
    path: '/login',
    element: <SlidingAuthTest />
  },
  {
    path: '/signup',
    element: <SlidingAuthTest />
  },
  {
    path: '/home',
    element: (
      <ProtectedRoute>
        <Layout>
          <Home />
        </Layout>
      </ProtectedRoute>
    )
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
    path: '/post/:id',
    element: (
      <ProtectedRoute>
        <Layout>
          <PostView />
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
