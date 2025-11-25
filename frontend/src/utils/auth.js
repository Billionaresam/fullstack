export function getToken() {
  return localStorage.getItem('token');
}

export function getUserRole() {
  const token = getToken();
  if (!token) return null;

  try {
    // Decode JWT payload (base64)
    const base64Payload = token.split('.')[1];
    const decodedPayload = atob(base64Payload);
    const payload = JSON.parse(decodedPayload);

    return payload.role || null;
  } catch (error) {
    console.error('Invalid token format:', error);
    return null;
  }
}

/**
 * Checks if the current user's role is included in allowedRoles
 * @param {string[]} allowedRoles - Array of roles allowed to access
 * @returns {boolean} true if allowed, false otherwise
 */
export function protectedRoute(allowedRoles = []) {
  const role = getUserRole();
  if (!role) return false;
  return allowedRoles.includes(role);
}
