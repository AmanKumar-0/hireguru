import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export const AdminPrivateRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || (isAuthenticated && user?.isAdmin === false)) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
