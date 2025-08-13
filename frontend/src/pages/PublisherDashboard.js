import { useEffect, useState } from 'react';
import { apiFetcher } from '../utils/fetcher';
import NavBar from '../components/NavBar';

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
      setPendingArticles(prev => prev.filter(article => article.id !== id));
    } catch (err) {
      console.error(`Error updating article ${id}:`, err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="p-6 max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">📚 Publisher Dashboard</h2>
        <p className="mb-6 text-gray-600">Review and approve submitted articles.</p>

        {loading ? (
          <p className="text-gray-500">Loading articles...</p>
        ) : pendingArticles.length === 0 ? (
          <p className="text-green-600">✅ No pending articles right now</p>
        ) : (
          <div className="space-y-4">
            {pendingArticles.map(({ id, title, content }) => (
              <div
                key={id}
                className="bg-white border rounded p-4 shadow hover:shadow-md transition"
              >
                <h4 className="text-lg font-semibold mb-2">{title}</h4>
                <p className="text-sm text-gray-700 mb-3">
                  {content.slice(0, 150)}...
                </p>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleDecision(id, 'Approved')}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => handleDecision(id, 'Rejected')}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                  >
                    ❌ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PublisherDashboard;
