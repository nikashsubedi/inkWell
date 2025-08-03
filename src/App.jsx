import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/SupabaseAuthContext';
import router from './routes/Routes';
import './App.css'

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;