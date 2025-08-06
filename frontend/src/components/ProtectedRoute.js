import { Navigate } from 'react-router-dom';
import { getToken, getUserRole } from '../utils/auth';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token = getToken();
  const role = getUserRole();

  // 🚫 Redirect if no token or role mismatch
  if (!token || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  // ✅ Authorized: render child component
  return children;
};

export default ProtectedRoute;
