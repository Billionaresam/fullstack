import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetcher } from '../utils/fetcher';

const Home = () => {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Technology', 'Health', 'Education'];

  const filtered = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const categoryFiltered = filtered.filter(article =>
    activeCategory === 'All' || article.category === activeCategory
  );

  useEffect(() => {
    const loadPublished = async () => {
      const res = await apiFetcher('/articles?status=Approved');
      console.log('💡 Article Response:', res); // Verify imageUrl, category, etc.
      setArticles(res);
    };
    loadPublished();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-6 py-10 text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">📋 Welcome to ProCMS</h1>
      <p className="text-gray-600 max-w-xl mx-auto mb-6">
        Your publishing platform for editorial collaboration, role-based access, and real-time content delivery.
        Browse published articles below or log in to contribute.
      </p>

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search articles..."
        className="w-full sm:w-1/2 mb-6 p-2 border rounded"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* 🏷️ Category Filters */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-full text-sm transition ${
              activeCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 📰 Articles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categoryFiltered.length > 0 ? (
          categoryFiltered.map(({ id, title, content, category, imageUrl }) => (
            <div
              key={id}
              className="bg-white border rounded p-4 shadow hover:shadow-md transition text-left"
            >
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
              )}
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <span className="inline-block mb-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {category}
              </span>
              <p className="text-sm text-gray-700 mb-3">
                {content.slice(0, 120)}...
              </p>
              <button
                onClick={() => navigate(`/article/${id}`)}
                className="text-blue-600 hover:underline text-sm"
              >
                Read More →
              </button>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-600">🔍 No articles match your filters.</p>
        )}
      </div>

      {/* 🚪 Role Navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
        <button
          onClick={() => navigate('/login')}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          🔐 Login
        </button>
        <button
          onClick={() => navigate('/editor')}
          className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded"
        >
          📝 Editor
        </button>
        <button
          onClick={() => navigate('/publisher')}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          📚 Publisher
        </button>
        <button
          onClick={() => navigate('/admin')}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          👑 Admin
        </button>
      </div>

      <footer className="mt-12 text-xs text-gray-500">
        Built by Billionare • Powered by Vite, Tailwind & PostgreSQL
      </footer>
    </div>
  );
};

export default Home;
