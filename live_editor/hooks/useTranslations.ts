import { useState, useEffect, useCallback } from 'react';
import { translations, Translation } from '../i18n';

export type Language = 'ko' | 'en';
export type TFunction = (key: string, options?: { [key: string]: string | number }) => string;

const getNestedValue = (obj: any, path: string): string | undefined => {
    return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

export const useTranslations = () => {
    const [language, setLanguage] = useState<Language>(() => {
        const savedLang = localStorage.getItem('editor-language');
        return (savedLang === 'en' || savedLang === 'ko') ? savedLang : 'ko';
    });

    useEffect(() => {
        localStorage.setItem('editor-language', language);
    }, [language]);

    const t: TFunction = useCallback((key, options) => {
        const currentLangTranslations: Translation = translations[language];
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
                translation = translation.replace(regex, String(options[optionKey]));
            });
        }

        return translation;
    }, [language]);

    return { language, setLanguage, t };
};
