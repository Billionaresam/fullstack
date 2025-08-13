// utils/fetcher.js
export const apiFetcher = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // include cookies/session if needed
      ...options
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }

    return res.json();
  } catch (err) {
    console.error('API Fetch Error:', err);
    throw err;
  }
};
