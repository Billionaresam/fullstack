import { useEffect, useState } from 'react';
import { apiFetcher } from '../utils/fetcher';

const PublisherDashboard = () => {
  const [pendingArticles, setPendingArticles] = useState([]);

  useEffect(() => {
    const loadPending = async () => {
      const res = await apiFetcher('/articles?status=Draft'); // backend filters by status
      setPendingArticles(res);
    };
    loadPending();
  }, []);

  const handleDecision = async (id, decision) => {
    await apiFetcher(`/articles/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: decision }),
    });

    // Update UI
    setPendingArticles(prev => prev.filter(article => article.id !== id));
  };

  return (
    <div>
      <h2>📚 Publisher Dashboard</h2>
      <p>Review articles and publish with precision.</p>

      {pendingArticles.length === 0 ? (
        <p>No pending articles right now ✅</p>
      ) : (
        <ul>
          {pendingArticles.map(({ id, title, content }) => (
            <li key={id}>
              <h4>{title}</h4>
              <p>{content.slice(0, 150)}...</p>
              <button onClick={() => handleDecision(id, 'Approved')}>✅ Approve</button>
              <button onClick={() => handleDecision(id, 'Rejected')}>❌ Reject</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PublisherDashboard;
