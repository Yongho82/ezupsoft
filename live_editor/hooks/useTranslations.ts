import { useState, useEffect, useCallback } from 'react';
import { translations, Translation } from '../i18n';

export type Language = 'ko' | 'en' | 'ja' | 'zh' | 'es' | 'fr' | 'de';
export type TFunction = (key: string, options?: { [key: string]: string | number }) => string;

const getNestedValue = (obj: any, path: string): string | undefined => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const useTranslations = () => {
    const getInitialLanguage = (): Language => {
        // 1. Check URL query param (priority)
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang') as Language;
        if (langParam && ['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de'].includes(langParam)) {
            return langParam;
        }

        // 2. Check local storage
        const savedLang = localStorage.getItem('editor-language') as Language;
        if (savedLang && ['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de'].includes(savedLang)) {
            return savedLang;
        }

        return 'ko';
    };

    const [language, setLanguageState] = useState<Language>(getInitialLanguage());

    const setLanguage = useCallback((lang: Language) => {
        setLanguageState(lang);
    }, []);

    useEffect(() => {
        localStorage.setItem('editor-language', language);
    }, [language]);

    // Sync from parent container (postMessage)
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data && event.data.type === 'changeLanguage') {
                const newLang = event.data.language as Language;
                if (['ko', 'en', 'ja', 'zh', 'es', 'fr', 'de'].includes(newLang)) {
                    setLanguageState(newLang);
                }
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const t: TFunction = useCallback((key, options) => {
        const currentLangTranslations: Translation = translations[language] || translations.en;
        const englishTranslations: Translation = translations.en;

        let translation = getNestedValue(currentLangTranslations, key);

        if (!translation) {
            translation = getNestedValue(englishTranslations, key);
        }

        if (!translation) {
            console.warn(`Translation not found for key: ${key}`);
            return key;
        }

        if (options) {
            Object.keys(options).forEach(optionKey => {
                const regex = new RegExp(`{{${optionKey}}}`, 'g');
                translation = (translation as string).replace(regex, String(options[optionKey]));
            });
        }

        return translation as string;
    }, [language]);

    return { language, setLanguage, t };
};
