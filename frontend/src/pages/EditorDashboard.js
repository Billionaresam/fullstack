import { useState, useEffect } from 'react';
import { apiFetcher } from '../utils/fetcher';
import NavBar from '../components/NavBar';
import React from 'react';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000';

function EditorDashboard() {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        const res = await apiFetcher('/articles');
        setArticles(res);
      } catch (err) {
        setError('Failed to load articles');
      }
    };
    loadArticles();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      const response = await fetch(`${backendUrl}/articles`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error: ${response.status} - ${text}`);
      }

      // Optionally reload articles or show success message here
      const newArticle = await response.json();
      setArticles((prev) => [newArticle, ...prev]);

      // Reset form
      setTitle('');
      setContent('');
      setImageFile(null);
      setPreviewUrl('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(NavBar, null),
    React.createElement(
      'div',
      { className: 'p-6 max-w-3xl mx-auto' },
      React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, '📝 Editor Dashboard'),

      error &&
        React.createElement(
          'div',
          { className: 'mb-4 p-3 bg-red-100 text-red-700 rounded' },
          error
        ),

      React.createElement(
        'form',
        { onSubmit: handleSubmit, className: 'bg-white border p-6 rounded shadow mb-8' },
        React.createElement('h4', { className: 'text-xl font-semibold mb-4' }, 'Submit New Article'),
        React.createElement('input', {
          type: 'text',
          placeholder: 'Title',
          className: 'w-full mb-4 p-2 border rounded focus:outline-none focus:ring focus:border-blue-400',
          value: title,
          onChange: (e) => setTitle(e.target.value),
          required: true
        }),
        React.createElement('textarea', {
          placeholder: 'Content',
          className: 'w-full mb-4 p-2 border rounded h-32 resize-none focus:outline-none focus:ring focus:border-blue-400',
          value: content,
          onChange: (e) => setContent(e.target.value),
          required: true
        }),
        React.createElement('input', {
          type: 'file',
          accept: 'image/*',
          onChange: handleImageChange,
          className: 'mb-4'
        }),
        previewUrl &&
          React.createElement('img', {
            src: previewUrl,
            alt: 'Preview',
            className: 'w-full h-40 object-cover rounded mb-4 shadow'
          }),
        React.createElement(
          'button',
          {
            className: `bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-200`,
            disabled: loading,
          },
          loading ? 'Submitting...' : 'Submit Article'
        )
      ),
      React.createElement('h4', { className: 'text-lg font-semibold mb-2' }, '📂 Your Drafts'),
      React.createElement(
        'ul',
        { className: 'space-y-2' },
        articles.map(({ id, title }) =>
          React.createElement(
            'li',
            {
              key: id,
              className: 'bg-gray-50 border rounded p-3 shadow hover:bg-gray-100 transition'
            },
            title
          )
        )
      )
    )
  );
}

export default EditorDashboard;
