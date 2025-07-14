import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>📋 Welcome to ProCMS</h1>
      <p>Built for seamless publishing and editorial collaboration.</p>

      <div style={{ marginTop: '2rem' }}>
        <button onClick={() => navigate('/login')}>🔐 Login</button>
        <button onClick={() => navigate('/editor')}>📝 Editor Dashboard</button>
        <button onClick={() => navigate('/publisher')}>📚 Publisher Dashboard</button>
        <button onClick={() => navigate('/admin')}>👑 Admin Dashboard</button>
      </div>
    </div>
  );
};

export default Home;
