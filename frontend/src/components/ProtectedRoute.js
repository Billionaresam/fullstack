import React from "react";
import { protectedRoute } from "../utils/auth.js";

/**
 * React component that wraps your plain JS protectedRoute logic
 * @param {Array} allowedRoles - roles allowed to access this route
 * @param {JSX.Element} element - component to render if authorized
 */
export default function ProtectedRoute({ allowedRoles = [], element }) {
  // Check authorization using your JS function
  const isAuthorized = protectedRoute(allowedRoles);

  // If not authorized, don't render the element (or you can return null)
  if (!isAuthorized) {
    // Optionally, render a redirect or a message here
    return null;
  }

  // Authorized: render the element
  return element;
}
