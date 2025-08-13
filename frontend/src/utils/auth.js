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
