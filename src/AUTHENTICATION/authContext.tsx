import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// 1. Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. AuthProvider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadAuthState = async () => {
      const savedAuth = await AsyncStorage.getItem('isLoggedIn');
      if (savedAuth) {
        setIsLoggedIn(JSON.parse(savedAuth));
      }
    };
    loadAuthState();
  }, []);

  const login = async () => {
    setIsLoggedIn(true);
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
  };

  const logout = async () => {
    setIsLoggedIn(false);
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false));
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. useAuth hook
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


