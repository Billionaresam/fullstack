import { getUserRole } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const role = getUserRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
      <h2>🔐 ProCMS by Billionare</h2>
      <div>
        <span style={{ marginRight: '1rem' }}>Role: {role}</span>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default NavBar;
