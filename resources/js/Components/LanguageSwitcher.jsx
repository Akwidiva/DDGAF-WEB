import { useLanguage } from '@/context/LanguageContext';
import { BsGlobe } from 'react-icons/bs';

export default function LanguageSwitcher() {
  const { language, changeLanguage, t } = useLanguage();

  const handleLanguageChange = (lang) => {
    changeLanguage(lang);
    
    // Set cookie so Laravel backend knows the language
    document.cookie = `language=${lang}; path=/; max-age=31536000`; // 1 year
    
    // Update axios header for API requests
    window.axios.defaults.headers.common['Accept-Language'] = lang;
  };

  return (
    <div className="flex items-center gap-2">
      <BsGlobe className="text-gray-600 dark:text-gray-300" />
      <select
        value={language}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-300 border border-emerald-200 dark:border-emerald-700 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
      >
        <option value="en">{t('english')}</option>
        <option value="fr">{t('french')}</option>
      </select>
    </div>
  );
}
