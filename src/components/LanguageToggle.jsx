import { useLanguage } from '../i18n/LanguageContext';

/**
 * Bascule FR / EN. Affiche les deux langues, celle en cours étant mise en
 * évidence, pour que l'utilisateur voie vers quoi il bascule.
 */
export default function LanguageToggle({ className = '' }) {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      title={t('header.switchLanguage')}
      aria-label={t('header.switchLanguage')}
      className={`flex items-center rounded-full border border-gray-300 dark:border-gray-600 overflow-hidden text-xs font-semibold ${className}`}
    >
      {['fr', 'en'].map((code) => (
        <span
          key={code}
          className={`px-2.5 py-1 transition-colors ${
            language === code
              ? 'bg-indigo-600 text-white'
              : 'text-gray-600 dark:text-gray-300'
          }`}
        >
          {code.toUpperCase()}
        </span>
      ))}
    </button>
  );
}
