import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetcher } from '../utils/fetcher';
import React from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await apiFetcher('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.success) {
        navigate('/dashboard');
      } else {
        setError(response.message || 'Invalid login credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Something went wrong. Please try again.');
    }
  };

  return React.createElement(
    'div',
    { className: 'min-h-screen flex items-center justify-center bg-gray-100 p-4' },
    React.createElement(
      'form',
      {
        onSubmit: handleSubmit,
        className: 'bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md',
      },
      React.createElement(
        'h2',
        { className: 'text-2xl font-bold mb-6 text-center' },
        'Sign In'
      ),
      error &&
        React.createElement(
          'p',
          { className: 'text-red-600 text-sm mb-4 text-center' },
          error
        ),
      React.createElement('input', {
        type: 'email',
        placeholder: 'Email',
        className:
          'w-full mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-blue-400',
        value: email,
        onChange: (e) => setEmail(e.target.value),
        required: true,
      }),
      React.createElement('input', {
        type: 'password',
        placeholder: 'Password',
        className:
          'w-full mb-6 p-2 border rounded focus:outline-none focus:ring focus:border-blue-400',
        value: password,
        onChange: (e) => setPassword(e.target.value),
        required: true,
      }),
      React.createElement(
        'button',
        {
          type: 'submit',
          className:
            'w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition',
        },
        'Log In'
      )
    )
  );
};

export default LoginForm;
