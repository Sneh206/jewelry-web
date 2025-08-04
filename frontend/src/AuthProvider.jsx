// AuthProvider.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('admin');
      if (saved && saved !== 'undefined') {
        return JSON.parse(saved);
      }
      return null;
    } catch (error) {
      console.error('❌ Failed to parse admin from localStorage:', error);
      localStorage.removeItem('admin');
      return null;
    }
  });

  const login = (adminData) => {
    setAdmin(adminData);
    localStorage.setItem('admin',adminData);
  };

  const logout = () => {
    setAdmin(null);
    localStorage.removeItem('admin');
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
