// articleDetail.js
import { apiFetcher } from '../utils/fetcher.js';
import { renderNavBar } from '../components/NavBar.js';

export function loadArticleDetail(id) {
  const root = document.getElementById('root');
  root.innerHTML = ''; // Clear the container

  // NavBar
  root.appendChild(renderNavBar());

  const container = document.createElement('div');
  container.className = 'max-w-3xl mx-auto p-6';

  // Back Button
  const backBtn = document.createElement('button');
  backBtn.textContent = '← Back';
  backBtn.className = 'text-sm text-blue-600 hover:underline mb-4';
  backBtn.addEventListener('click', () => window.history.back());
  container.appendChild(backBtn);

  // Loading message
  const loading = document.createElement('p');
  loading.textContent = 'Loading...';
  loading.className = 'text-center mt-10 text-gray-500';
  container.appendChild(loading);

  root.appendChild(container);

  // Fetch and render article
  apiFetcher(`/articles/${id}`).then(article => {
    container.removeChild(loading);

    if (article.imageUrl) {
      const img = document.createElement('img');
      img.src = article.imageUrl;
      img.alt = article.title;
      img.className = 'w-full max-h-80 object-cover rounded mb-4 shadow';
      container.appendChild(img);
    }

    const title = document.createElement('h2');
    title.textContent = article.title;
    title.className = 'text-3xl font-bold mb-2';
    container.appendChild(title);

    const meta = document.createElement('div');
    meta.className = 'flex items-center space-x-4 text-sm text-gray-600 mb-4';

    const author = document.createElement('span');
    author.innerHTML = `<strong>Author:</strong> ${article.staffId}`;
    meta.appendChild(author);

    const created = document.createElement('span');
    created.innerHTML = `<strong>Created:</strong> ${new Date(article.createdAt).toLocaleDateString()}`;
    meta.appendChild(created);

    const status = document.createElement('span');
    status.textContent = article.status;
    status.className = getStatusBadge(article.status);
    meta.appendChild(status);

    container.appendChild(meta);

    container.appendChild(document.createElement('hr'));

    const content = document.createElement('div');
    content.textContent = article.content;
    content.className = 'text-gray-800 leading-relaxed whitespace-pre-line';
    container.appendChild(content);
  });
}

function getStatusBadge(status) {
  const base = 'px-2 py-1 rounded text-xs font-semibold';
  if (status === 'Draft') return `${base} bg-yellow-100 text-yellow-600`;
  if (status === 'Approved') return `${base} bg-green-100 text-green-600`;
  if (status === 'Rejected') return `${base} bg-red-100 text-red-600`;
  return `${base} bg-gray-100 text-gray-600`;
}
