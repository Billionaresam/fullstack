import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>⚠️ 404</h1>
      <p>The page you're looking for doesn’t exist.</p>
      <button onClick={() => navigate('/')}>🔙 Go Home</button>
    </div>
  );
};

export default NotFound;
