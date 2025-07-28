import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetcher } from '../utils/fetcher';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await apiFetcher('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      if (!res.token) {
        setError(res.message || 'Invalid credentials');
        return;
      }

      localStorage.setItem('token', res.token);

      // 🎯 Decode token to get role (optional)
      const payload = JSON.parse(atob(res.token.split('.')[1]));
      const role = payload.role;

      // 🎯 Route based on role
      if (role === 'Admin') {
        navigate('/admin');
      } else if (role === 'Editor') {
        navigate('/editor');
      } else if (role === 'Publisher') {
        navigate('/publisher');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Login failed');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login to CMS</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
        <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
