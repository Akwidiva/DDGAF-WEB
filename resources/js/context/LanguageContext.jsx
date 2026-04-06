import { createContext, useContext, useState, useEffect } from 'react';
import translations from '@/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('language') || 'en';
    }
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
    // Set cookie so Laravel backend knows the language
    document.cookie = `language=${language}; path=/; max-age=31536000`; // 1 year
  }, [language]);

  const t = (key, defaultValue = key) => {
    const keys = key.split('.');
    let value = translations[language] || translations.en;
    
    for (const k of keys) {
      value = value?.[k];
      if (value === undefined) return defaultValue;
    }
    
    return value || defaultValue;
  };

  const changeLanguage = (lang) => {
    if (['en', 'fr'].includes(lang)) {
      setLanguage(lang);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
