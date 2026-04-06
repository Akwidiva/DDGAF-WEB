import { useLanguage } from '@/context/LanguageContext';

export default function InputLabel({ value, className = '', children, required = false, ...props }) {
    const { t } = useLanguage();
    
    return (
        <label {...props} className={`block font-medium text-sm text-gray-700 dark:text-gray-300 ` + className}>
            {value ? value : children}
            {required && <span className="text-red-600 ml-1">*</span>}
        </label>
    );
}
