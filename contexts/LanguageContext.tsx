
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language } from '../types';
import { translations } from '../i18n';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Helper to detect system/browser language
  const getInitialLanguage = (): Language => {
    // Check if we have a saved preference first
    const savedLang = localStorage.getItem('ezup_language') as Language;
    if (savedLang && ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de'].includes(savedLang)) {
      return savedLang;
    }

    const browserLang = navigator.language.split('-')[0].toLowerCase();
    const supportedLanguages: Language[] = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de'];

    if (supportedLanguages.includes(browserLang as Language)) {
      return browserLang as Language;
    }

    return 'en'; // Default to English for all other languages
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('ezup_language', lang);
  };

  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = translations[language];

    for (const key of keys) {
      if (!current || current[key] === undefined) {
        // Fallback to English if key is missing in other languages
        let fallback: any = translations['en'];
        for (const fKey of keys) {
          if (!fallback || fallback[fKey] === undefined) {
            console.warn(`Translation missing for key: ${path}`);
            return path;
          }
          fallback = fallback[fKey];
        }
        return fallback as string;
      }
      current = current[key];
    }

    return current as string;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
