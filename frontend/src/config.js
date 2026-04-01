// In dev, Vite proxies /api → http://localhost:5000 (see vite.config.js)
// In production, uses VITE_API_URL or defaults to the deployed backend URL
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? '/api' : 'https://vi-notes-ad30.onrender.com');

export default API_BASE;
