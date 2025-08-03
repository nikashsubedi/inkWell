import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import router from './routes/Routes';
import { loadSamplePosts } from './data/samplePosts';
import './App.css'

function App() {
  useEffect(() => {
    // Load sample posts on app startup
    loadSamplePosts();
  }, []);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;