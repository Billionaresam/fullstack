import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ allowedRoles, element }) {
  // Example: Replace with your own auth logic
  const userRole = localStorage.getItem("role");

  if (!userRole) {
    return React.createElement(Navigate, { to: "/login" });
  }

  if (!allowedRoles.includes(userRole)) {
    return React.createElement(Navigate, { to: "/" });
  }

  return element;
}

export default ProtectedRoute;
