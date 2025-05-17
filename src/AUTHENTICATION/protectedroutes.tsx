/* eslint-disable react-hooks/rules-of-hooks */
import { useAuth } from './authContext';
import { useNavigate } from 'react-router-native'; // or your navigation solution
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Signin from '../../src/Sign/Signin';
export const ProtectedRoute: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    const navigate = useNavigate();
    navigate('./Signin');
    return null;
  }

  return <>{children}</>;
};
