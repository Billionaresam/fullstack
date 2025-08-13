import { getUserRole } from '../utils/auth.js';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const role = getUserRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-100 border-b border-gray-300 py-3 px-6 flex justify-between items-center shadow">
      <h2 className="text-lg font-semibold text-gray-700">
        🔐 ProCMS <span className="text-xs text-gray-500">by Billionare</span>
      </h2>

      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-600">
          <span className="font-medium">Role:</span> {role}
        </span>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition duration-200"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
