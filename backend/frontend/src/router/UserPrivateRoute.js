import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";

export const UserPrivateRoute = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated || (isAuthenticated && user?.isAdmin === true)) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};
