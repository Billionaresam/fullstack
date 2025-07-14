import { useState, useEffect } from 'react';
import { apiFetcher } from '../utils/fetcher';

const EditorDashboard = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const loadArticles = async () => {
      const res = await apiFetcher('/articles'); // backend should filter by creator
      setArticles(res);
    };
    loadArticles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArticle = { title, content };
    await apiFetcher('/articles', {
      method: 'POST',
      body: JSON.stringify(newArticle),
    });
    setTitle('');
    setContent('');
  };

  return (
    <div>
      <h2>📝 Editor Dashboard</h2>

      <form onSubmit={handleSubmit}>
        <h4>Submit New Article</h4>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Submit Article</button>
      </form>

      <h4>Your Drafts</h4>
      <ul>
        {articles.map(({ id, title }) => (
          <li key={id}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default EditorDashboard;
