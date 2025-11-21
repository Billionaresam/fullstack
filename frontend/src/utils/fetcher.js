// utils/fetcher.js

const backendUrl =
  import.meta.env.VITE_BACKEND_URL || 'https://fullstack-waxv.onrender.com';

export const apiFetcher = async (endpoint, options = {}) => {
  try {
    const res = await fetch(`${backendUrl}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      ...options,
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
