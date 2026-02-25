import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AdminContext } from "../context/AdminContext";

const ProtectedRoute = ({ element }) => {
  const { isLoggedIn } = useContext(AdminContext);

  if (!isLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return element;
};

export default ProtectedRoute;
