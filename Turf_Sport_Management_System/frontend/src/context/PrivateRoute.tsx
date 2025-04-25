import React from 'react';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  element: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const token = localStorage.getItem('authToken'); // Or however you check for auth

  // Redirect to login if no token
  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{element}</>;
};

export default PrivateRoute;
