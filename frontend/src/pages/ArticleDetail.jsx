import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiFetcher } from '../utils/fetcher';
import NavBar from '../components/NavBar';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const loadArticle = async () => {
      const res = await apiFetcher(`/articles/${id}`);
      setArticle(res);
    };
    loadArticle();
  }, [id]);

  if (!article) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  const getStatusBadge = (status) => {
    const base = 'px-2 py-1 rounded text-xs font-semibold';
    if (status === 'Draft') return `${base} bg-yellow-100 text-yellow-600`;
    if (status === 'Approved') return `${base} bg-green-100 text-green-600`;
    if (status === 'Rejected') return `${base} bg-red-100 text-red-600`;
    return `${base} bg-gray-100 text-gray-600`;
  };

  return (
    <>
      <NavBar />
      <div className="max-w-3xl mx-auto p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 hover:underline mb-4"
        >
          ← Back
        </button>

        {/* 🖼️ Featured Image */}
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full max-h-80 object-cover rounded mb-4 shadow"
          />
        )}

        <h2 className="text-3xl font-bold mb-2">{article.title}</h2>

        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <span>
            <strong>Author:</strong> {article.staffId}
          </span>
          <span>
            <strong>Created:</strong>{' '}
            {new Date(article.createdAt).toLocaleDateString()}
          </span>
          <span className={getStatusBadge(article.status)}>
            {article.status}
          </span>
        </div>

        <hr className="mb-6" />

        <div className="text-gray-800 leading-relaxed whitespace-pre-line">
          {article.content}
        </div>
      </div>
    </>
  );
};

export default ArticleDetail;
