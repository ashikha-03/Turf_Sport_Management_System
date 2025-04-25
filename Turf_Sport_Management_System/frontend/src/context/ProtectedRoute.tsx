// // src/context/ProtectedRoute.tsx
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// //import { useAuth } from './AuthContext'; // Assuming useAuth provides the logged-in status

// interface ProtectedRouteProps {
//   children: React.ReactNode; // This is the type for the wrapped components (TurfManagementPage in your case)
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const { isLoggedIn } = useAuth();

//   if (!isLoggedIn) {
//     // If not logged in, redirect to login page
//     return <Navigate to="/login" />;
//   }

//   // If logged in, render the children (i.e., the wrapped components)
//   return <>{children}</>;
// };

// export default ProtectedRoute;
