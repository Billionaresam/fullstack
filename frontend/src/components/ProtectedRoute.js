import { getToken, getUserRole } from '../utils/auth.js';

/**
 * Protects a route in plain JS by checking token & allowed roles
 * @param {string[]} allowedRoles - Roles allowed to access the page
 * @param {string} redirectPath - Path to redirect if unauthorized
 */
export function protectedRoute(allowedRoles = [], redirectPath = '/login') {
  const token = getToken();
  const role = getUserRole();

  // 🚫 No token → redirect
  if (!token) {
    window.location.href = redirectPath;
    return false;
  }

  // 🚫 Role mismatch → redirect
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    window.location.href = redirectPath;
    return false;
  }

  // ✅ Authorized
  return true;
}
