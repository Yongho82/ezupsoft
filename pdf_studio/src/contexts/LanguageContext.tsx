
import React, { createContext, useState, useContext, useCallback } from 'react';
import { translations } from '../locales/translations';

export type Language = 'ko' | 'en' | 'ja' | 'zh' | 'es' | 'fr' | 'de';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string, values?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
    children: React.ReactNode;
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('ko');

    const t = useCallback((key: string, values?: Record<string, string | number>): string => {
        // Directly access the translation from the flat object structure.
        const langTranslations = translations[language] as Record<string, string>;
        let translation = langTranslations[key];

        // Fallback to English if translation is missing for the selected language
        if (!translation && language !== 'en') {
             const enTranslations = translations['en'] as Record<string, string>;
             translation = enTranslations[key];
        }
        
        // Fallback to key if still missing
        if (!translation) {
            translation = key;
        }

        if (values) {
            Object.keys(values).forEach(valueKey => {
                const regex = new RegExp(`{${valueKey}}`, 'g');
                translation = translation.replace(regex, String(values[valueKey]));
            });
        }
        return translation;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
