import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'language';
const SUPPORTED = ['fr', 'en'];

function detectInitialLanguage() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (SUPPORTED.includes(stored)) return stored;
  const browser = navigator.language?.slice(0, 2);
  return SUPPORTED.includes(browser) ? browser : 'fr';
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(detectInitialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => {
    // Renvoie la traduction, ou la clé elle-même si elle manque : une clé
    // oubliée reste visible à l'écran plutôt que de rendre une chaîne vide.
    const t = (key, vars) => {
      const raw = translations[language]?.[key] ?? translations.fr[key] ?? key;
      if (!vars) return raw;
      return Object.entries(vars).reduce(
        (acc, [name, val]) => acc.replaceAll(`{${name}}`, val),
        raw
      );
    };
    const toggleLanguage = () => setLanguage((l) => (l === 'fr' ? 'en' : 'fr'));
    return { language, setLanguage, toggleLanguage, t };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside a LanguageProvider');
  return ctx;
}
