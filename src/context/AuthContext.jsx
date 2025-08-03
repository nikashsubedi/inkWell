import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    const savedUser = localStorage.getItem('inkwell_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('inkwell_users') || '[]');
    
    // Find user with matching credentials
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const userSession = {
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        avatar: foundUser.avatar || foundUser.name.split(' ').map(n => n[0]).join('').toUpperCase()
      };
      
      setUser(userSession);
      localStorage.setItem('inkwell_user', JSON.stringify(userSession));
      return { success: true };
    } else {
      return { success: false, error: 'Invalid email or password' };
    }
  };

  const signup = (name, email, password) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('inkwell_users') || '[]');
    
    // Check if user already exists
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'User with this email already exists' };
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };
    
    // Save to localStorage
    users.push(newUser);
    localStorage.setItem('inkwell_users', JSON.stringify(users));
    
    // Auto login the new user
    const userSession = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.name.split(' ').map(n => n[0]).join('').toUpperCase()
    };
    
    setUser(userSession);
    localStorage.setItem('inkwell_user', JSON.stringify(userSession));
    
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('inkwell_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
