import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../services/authService';

const WithAuth = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default WithAuth;
