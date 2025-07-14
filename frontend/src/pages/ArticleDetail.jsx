import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { apiFetcher } from '../utils/fetcher';

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

  if (!article) return <p>Loading...</p>;

  const getBadgeColor = (status) => {
    if (status === 'Draft') return 'gold';
    if (status === 'Approved') return 'green';
    if (status === 'Rejected') return 'red';
    return 'gray';
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h2>{article.title}</h2>

      <p>
        <strong>Status:</strong>{' '}
        <span style={{ color: getBadgeColor(article.status) }}>
          {article.status}
        </span>
      </p>

      <p><strong>Author ID:</strong> {article.staffId}</p>
      <p><strong>Created:</strong> {new Date(article.createdAt).toLocaleDateString()}</p>
      
      <hr />

      <p>{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
