export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://asfar-portfolio-backend.onrender.com/api/v1';

export const fetchAPI = (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
  const timestampUrl = url.includes('?') ? `${url}&_t=${Date.now()}` : `${url}?_t=${Date.now()}`;

  return fetch(timestampUrl, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      ...(options.headers || {})
    },
    ...options
  });
};
