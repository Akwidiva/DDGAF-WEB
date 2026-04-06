import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Set the Accept-Language header and cookie based on user preference
const language = localStorage.getItem('language') || 'en';
window.axios.defaults.headers.common['Accept-Language'] = language;
document.cookie = `language=${language}; path=/; max-age=31536000`; // 1 year

// Update header and cookie when language changes in another tab
window.addEventListener('storage', (e) => {
  if (e.key === 'language') {
    const newLang = e.newValue || 'en';
    window.axios.defaults.headers.common['Accept-Language'] = newLang;
    document.cookie = `language=${newLang}; path=/; max-age=31536000`;
  }
});
