/* eslint-disable react-hooks/rules-of-hooks */
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-native'; // or your navigation solution
import { useEffect } from 'react';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('./Signin');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) {
    return null; // Prevent rendering the children if the user is not logged in
  }

  return <>{children}</>;
};