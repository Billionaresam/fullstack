<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>ProCMS Home</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 px-6 py-10 text-center">

  <h1 class="text-4xl font-bold text-gray-800 mb-2">📋 Welcome to ProCMS</h1>
  <p class="text-gray-600 max-w-xl mx-auto mb-6">
    Your publishing platform for editorial collaboration, role-based access, and real-time content delivery.
    Browse published articles below or log in to contribute.
  </p>

  <!-- Search -->
  <input
    id="searchInput"
    type="text"
    placeholder="Search articles..."
    class="w-full sm:w-1/2 mb-6 p-2 border rounded"
  />

  <!-- Categories -->
  <div id="categoryButtons" class="flex flex-wrap gap-3 justify-center mb-6"></div>

  <!-- Articles -->
  <div id="articlesContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"></div>

  <!-- Navigation -->
  <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 justify-center">
    <button onclick="navigate('/login')" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">🔐 Login</button>
    <button onclick="navigate('/editor')" class="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded">📝 Editor</button>
    <button onclick="navigate('/publisher')" class="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded">📚 Publisher</button>
    <button onclick="navigate('/admin')" class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">👑 Admin</button>
  </div>

  <footer class="mt-12 text-xs text-gray-500">
    Built by Billionare • Powered by Vite, Tailwind & PostgreSQL
  </footer>

  <script>
    const apiFetcher = async (endpoint) => {
      const res = await fetch(endpoint);
      return res.json();
    };

    const categories = ['All', 'Technology', 'Health', 'Education'];
    let articles = [];
    let activeCategory = 'All';
    let searchTerm = '';

    const categoryButtons = document.getElementById('categoryButtons');
    const articlesContainer = document.getElementById('articlesContainer');
    const searchInput = document.getElementById('searchInput');

    // Render category buttons
    function renderCategories() {
      categoryButtons.innerHTML = '';
      categories.forEach(cat => {
        const btn = document.createElement('button');
        btn.textContent = cat;
        btn.className = `px-3 py-1 rounded-full text-sm transition ${
          activeCategory === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
        }`;
        btn.addEventListener('click', () => {
          activeCategory = cat;
          renderCategories();
          renderArticles();
        });
        categoryButtons.appendChild(btn);
      });
    }

    // Render articles
    function renderArticles() {
      const filtered = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      const categoryFiltered = filtered.filter(article =>
        activeCategory === 'All' || article.category === activeCategory
      );

      articlesContainer.innerHTML = '';
      if (categoryFiltered.length === 0) {
        articlesContainer.innerHTML = '<p class="text-sm text-gray-600">🔍 No articles match your filters.</p>';
        return;
      }

      categoryFiltered.forEach(({ id, title, content, category, imageUrl }) => {
        const card = document.createElement('div');
        card.className = 'bg-white border rounded p-4 shadow hover:shadow-md transition text-left';

        if (imageUrl) {
          const img = document.createElement('img');
          img.src = imageUrl;
          img.alt = title;
          img.className = 'w-full h-40 object-cover rounded mb-3';
          card.appendChild(img);
        }

        const h3 = document.createElement('h3');
        h3.className = 'text-lg font-semibold mb-2';
        h3.textContent = title;
        card.appendChild(h3);

        const catTag = document.createElement('span');
        catTag.className = 'inline-block mb-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full';
        catTag.textContent = category;
        card.appendChild(catTag);

        const p = document.createElement('p');
        p.className = 'text-sm text-gray-700 mb-3';
        p.textContent = content.slice(0, 120) + '...';
        card.appendChild(p);

        const btn = document.createElement('button');
        btn.className = 'text-blue-600 hover:underline text-sm';
        btn.textContent = 'Read More →';
        btn.addEventListener('click', () => navigate(`/article/${id}`));
        card.appendChild(btn);

        articlesContainer.appendChild(card);
      });
    }

    // Navigation function
    function navigate(path) {
      window.location.href = path;
    }

    // Search event
    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value;
      renderArticles();
    });

    // Load articles
    async function loadPublished() {
      const res = await apiFetcher('/articles?status=Approved');
      console.log('💡 Article Response:', res);
      articles = res;
      renderCategories();
      renderArticles();
    }

    loadPublished();
  </script>
</body>
</html>
