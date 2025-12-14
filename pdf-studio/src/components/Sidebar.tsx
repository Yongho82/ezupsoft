
import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from './Icons';
import { Tool, ToolID } from '../types';
import { useLanguage, Language } from '../contexts/LanguageContext';

type SidebarProps = {
    activeTool: ToolID;
    onToolSelect: (toolId: ToolID, subTool?: string) => void;
}

const LANGUAGES: { code: Language; label: string }[] = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' },
    { code: 'zh', label: '中文 (简体)' },
    { code: 'es', label: 'Español' },
    { code: 'fr', label: 'Français' },
    { code: 'de', label: 'Deutsch' },
];

export const Sidebar = ({ activeTool, onToolSelect }: SidebarProps) => {
    const { t, language, setLanguage } = useLanguage();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
    const langMenuRef = useRef<HTMLDivElement>(null);

    // Auto-collapse on mobile init
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setIsCollapsed(true);
        }
    }, []);

    const TOOLS: Tool[] = [
        { id: 'merge', name: t('sidebar.merge'), icon: ICONS.merge },
        { id: 'split', name: t('sidebar.split'), icon: ICONS.split },
        { id: 'compress', name: t('sidebar.compress'), icon: ICONS.compress },
        { id: 'convert', name: t('sidebar.convert'), icon: ICONS.convert },
        { id: 'watermark', name: t('sidebar.watermark'), icon: ICONS.watermark },
        { id: 'edit', name: t('sidebar.edit'), icon: ICONS.edit },
    ];

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setIsLangMenuOpen(false);
            }
        }
        if (isLangMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isLangMenuOpen]);

    const currentLangLabel = LANGUAGES.find(l => l.code === language)?.label || 'Language';

    return (
        <>
            {/* Mobile Overlay Background */}
            {!isCollapsed && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsCollapsed(true)}
                />
            )}
            
            {/* Sidebar Container */}
            <div className={`
                fixed lg:relative z-50 h-full flex flex-shrink-0 transition-all duration-300 ease-in-out
                ${isCollapsed ? '-translate-x-full lg:translate-x-0 lg:w-0' : 'translate-x-0 lg:w-60'}
            `}>
                <nav 
                    className={`
                        h-full w-60 bg-slate-800 text-white flex flex-col overflow-visible whitespace-nowrap shadow-xl lg:shadow-none
                        transition-transform duration-300 ease-in-out
                        ${isCollapsed ? 'lg:-translate-x-full' : 'lg:translate-x-0'}
                    `}
                >
                    <div 
                        className="text-2xl font-bold p-4 text-center cursor-pointer hover:text-blue-300 transition-colors flex-shrink-0"
                        onClick={() => { onToolSelect('home', undefined); if(window.innerWidth < 1024) setIsCollapsed(true); }}
                    >
                        {t('sidebar.title')}
                    </div>
                    <ul className="list-none p-4 m-0 flex-grow overflow-y-auto">
                        <li
                            className={`flex items-center p-3 my-1 cursor-pointer transition-colors rounded-lg ${activeTool === 'home' ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
                            onClick={() => { onToolSelect('home', undefined); if(window.innerWidth < 1024) setIsCollapsed(true); }}
                            role="button"
                            tabIndex={0}
                            aria-label={t('sidebar.home')}
                        >
                            <span className="w-6 h-6 mr-4 flex-shrink-0">{ICONS.home}</span>
                            <span>{t('sidebar.home')}</span>
                        </li>
                        {TOOLS.map(tool => (
                            <li
                                key={tool.id}
                                className={`flex items-center p-3 my-1 cursor-pointer transition-colors rounded-lg ${activeTool === tool.id ? 'bg-blue-600' : 'hover:bg-slate-700'}`}
                                onClick={() => { onToolSelect(tool.id, undefined); if(window.innerWidth < 1024) setIsCollapsed(true); }}
                                role="button"
                                tabIndex={0}
                                aria-label={tool.name}
                            >
                                <span className="w-6 h-6 mr-4 flex-shrink-0">{tool.icon}</span>
                                <span>{tool.name}</span>
                            </li>
                        ))}
                    </ul>
                    
                    <div className="p-4 border-t border-slate-700 flex-shrink-0 relative" ref={langMenuRef}>
                        <button 
                            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            className="flex items-center justify-between w-full px-3 py-2 text-sm font-semibold rounded-md transition-colors bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white"
                        >
                            <div className="flex items-center">
                                <span className="w-5 h-5 mr-2">{ICONS.globe}</span>
                                <span>{currentLangLabel}</span>
                            </div>
                            <span className={`w-4 h-4 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`}>{ICONS.chevronUp}</span>
                        </button>

                        {isLangMenuOpen && (
                            <div className="absolute bottom-full left-0 w-full mb-2 px-4 z-50">
                                <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-slate-200 max-h-[60vh] overflow-y-auto">
                                    {LANGUAGES.map((lang) => (
                                        <button
                                            key={lang.code}
                                            onClick={() => {
                                                setLanguage(lang.code);
                                                setIsLangMenuOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-3 text-sm transition-colors flex items-center justify-between
                                                ${language === lang.code ? 'bg-blue-50 text-blue-600 font-bold' : 'text-slate-700 hover:bg-slate-100'}
                                            `}
                                        >
                                            <span>{lang.label}</span>
                                            {language === lang.code && <span className="w-4 h-4 text-blue-600">{ICONS.check}</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
                
                {/* Toggle Button */}
                <button 
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`
                        absolute top-4 z-50 w-8 h-8 bg-white text-slate-600 rounded-full shadow-md border border-slate-200 flex items-center justify-center hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer
                        ${isCollapsed ? '-right-10 lg:-right-10' : '-right-4'}
                    `}
                    aria-label={isCollapsed ? "Show sidebar" : "Hide sidebar"}
                    title={isCollapsed ? "Show sidebar" : "Hide sidebar"}
                >
                    {isCollapsed ? <span className="w-5 h-5 block">{ICONS.chevronRight}</span> : <span className="w-5 h-5 block">{ICONS.chevronLeft}</span>}
                </button>
            </div>
        </>
    );
};
