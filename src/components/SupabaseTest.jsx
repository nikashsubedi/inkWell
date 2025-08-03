import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const SupabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [user, setUser] = useState(null);

  useEffect(() => {
    testConnection();
    checkUser();
  }, []);

  const testConnection = async () => {
    try {
      // Simple test query to check connection
      const { data, error } = await supabase
        .from('profiles')
        .select('count', { count: 'exact', head: true });

      if (error) {
        setConnectionStatus(`❌ Connection Failed: ${error.message}`);
      } else {
        setConnectionStatus('✅ Supabase Connected Successfully!');
      }
    } catch (err) {
      setConnectionStatus(`❌ Error: ${err.message}`);
    }
  };

  const checkUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (err) {
      console.error('Error checking user:', err);
    }
  };

  const handleSignUp = async () => {
    try {
      // Generate unique email for testing (avoiding + symbol)
      const timestamp = Date.now();
      const testEmail = `itsharishg@gmail.com`;
      
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'testpassword123',
        options: {
          data: {
            full_name: 'Test User'
          }
        }
      });

      if (error) {
        console.error('Signup error details:', error);
        alert(`Signup Error: ${error.message}\n\nThis might be because:\n1. Email confirmation is required (check Supabase Auth settings)\n2. Invalid email format\n3. Password too weak\n4. SMTP not configured`);
      } else {
        console.log('Signup data:', data);
        if (data.user && !data.user.email_confirmed_at) {
          alert(`Signup successful!\n\nUser created but email confirmation required.\nEmail: ${testEmail}\n\nTo disable email confirmation:\n1. Go to Supabase Dashboard > Authentication > Settings\n2. Turn OFF "Enable email confirmations"`);
        } else {
          alert('Signup successful and confirmed!');
        }
        // Refresh user state
        checkUser();
      }
    } catch (err) {
      console.error('Signup catch error:', err);
      alert(`Error: ${err.message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        alert(`Sign out error: ${error.message}`);
      } else {
        alert('Signed out successfully!');
        setUser(null);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">🧪 Supabase Connection Test</h1>
      
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Connection Status:</h2>
        <p className="text-lg">{connectionStatus}</p>
      </div>

      <div className="bg-blue-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-2">Current User:</h2>
        {user ? (
          <div>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Email Verified:</strong> {user.email_confirmed_at ? '✅' : '❌'}</p>
          </div>
        ) : (
          <p>No user logged in</p>
        )}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Test Actions:</h2>
        
        <div className="flex gap-4 flex-wrap">
          <button
            onClick={testConnection}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Test Database Connection
          </button>
          
          <button
            onClick={handleSignUp}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Test Sign Up
          </button>
          
          {user && (
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Sign Out
            </button>
          )}
        </div>
        
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Common Issues:</h3>
          <ul className="text-yellow-700 text-sm space-y-1">
            <li><strong>400 Bad Request on signup:</strong> Email confirmation is likely required</li>
            <li><strong>Fix:</strong> Go to Supabase Dashboard → Authentication → Settings → Disable "Enable email confirmations"</li>
            <li><strong>Or:</strong> Set up SMTP for email delivery</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">⚠️ Next Steps:</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>Run the SQL schema in your Supabase dashboard</li>
          <li>Enable email authentication in Supabase Auth settings</li>
          <li>Configure RLS policies</li>
          <li>Test user registration and login</li>
        </ol>
      </div>
    </div>
  );
};

export default SupabaseTest;
