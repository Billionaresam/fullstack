import { useEffect, useState } from 'react';
import { apiFetcher } from '../utils/fetcher';
import NavBar from '../components/NavBar';
import React from 'react';

const PublisherDashboard = () => {
  const [pendingArticles, setPendingArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPending = async () => {
      try {
        const res = await apiFetcher('/articles?status=Draft');
        setPendingArticles(res);
      } catch (err) {
        console.error('Error loading pending articles:', err);
      } finally {
        setLoading(false);
      }
    };
    loadPending();
  }, []);

  const handleDecision = async (id, decision) => {
    try {
      await apiFetcher(`/articles/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status: decision }),
      });
      setPendingArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (err) {
      console.error(`Error updating article ${id}:`, err);
    }
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(NavBar, null),
    React.createElement(
      'div',
      { className: 'p-6 max-w-5xl mx-auto' },
      React.createElement('h2', { className: 'text-2xl font-bold mb-4' }, '📚 Publisher Dashboard'),
      React.createElement(
        'p',
        { className: 'mb-6 text-gray-600' },
        'Review and approve submitted articles.'
      ),

      loading
        ? React.createElement('p', { className: 'text-gray-500' }, 'Loading articles...')
        : pendingArticles.length === 0
          ? React.createElement('p', { className: 'text-green-600' }, '✅ No pending articles right now')
          : React.createElement(
              'div',
              { className: 'space-y-4' },
              pendingArticles.map(({ id, title, content }) =>
                React.createElement(
                  'div',
                  {
                    key: id,
                    className: 'bg-white border rounded p-4 shadow hover:shadow-md transition',
                  },
                  React.createElement('h4', { className: 'text-lg font-semibold mb-2' }, title),
                  React.createElement(
                    'p',
                    { className: 'text-sm text-gray-700 mb-3' },
                    content.slice(0, 150) + '...'
                  ),
                  React.createElement(
                    'div',
                    { className: 'flex space-x-3' },
                    React.createElement(
                      'button',
                      {
                        onClick: () => handleDecision(id, 'Approved'),
                        className:
                          'bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200',
                      },
                      '✅ Approve'
                    ),
                    React.createElement(
                      'button',
                      {
                        onClick: () => handleDecision(id, 'Rejected'),
                        className:
                          'bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200',
                      },
                      '❌ Reject'
                    )
                  )
                )
              )
            )
    )
  );
};

export default PublisherDashboard;
