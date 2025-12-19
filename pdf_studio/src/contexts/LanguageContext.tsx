
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
    const getInitialLanguage = (): Language => {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang') as Language;
        if (langParam && ['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de'].includes(langParam)) {
            return langParam;
        }
        return 'ko';
    };

    const [language, setLanguageState] = useState<Language>(getInitialLanguage());

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
    }, []);

    const t = useCallback((key: string, values?: Record<string, string | number>): string => {
        // Directly access the translation from the flat object structure.
        const langTranslations = (translations[language] || translations['en']) as Record<string, string>;
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

    // Handle language sync from parent
    React.useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data && event.data.type === 'changeLanguage') {
                const newLang = event.data.language as Language;
                if (['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de'].includes(newLang)) {
                    setLanguageState(newLang);
                }
            }
        };

        window.addEventListener('message', handleMessage);

        // Also check if initial language is passed via URL or parent's shared state if needed
        // For now, just message listener is enough for real-time synchronization.

        return () => window.removeEventListener('message', handleMessage);
    }, []);

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
