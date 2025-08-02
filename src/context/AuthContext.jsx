// context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage if already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem('authUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signIn = async (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem('authUser'));

    if (
      storedUser &&
      storedUser.username === username &&
      storedUser.password === password
    ) {
      setUser(storedUser);
      return { success: true };
    } else {
      return { success: false, message: 'Invalid username or password' };
    }
  };

  const signUp = async (username, email, password) => {
    const newUser = { username, email, password };
    localStorage.setItem('authUser', JSON.stringify(newUser));
    setUser(newUser);
    return { success: true };
  };

  const signOut = () => {
    localStorage.removeItem('authUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
