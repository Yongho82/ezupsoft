import React, { useState, useRef } from 'react';
import { SelectedElementInfo } from '../types';
import { Template } from '../templates/templates';
import { NewFilePopover } from './controls/NewFilePopover';
import { Language, TFunction } from '../hooks/useTranslations';

interface AppHeaderProps {
    view: 'split' | 'editor' | 'preview';
    setView: (view: 'split' | 'editor' | 'preview') => void;
    isPreviewSizerOpen: boolean;
    setIsPreviewSizerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    previewSizerRef: React.RefObject<HTMLDivElement>;
    previewScale: number;
    setPreviewScale: React.Dispatch<React.SetStateAction<number>>;
    isControlsVisible: boolean;
    setIsControlsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    isGlobalTextHidden: boolean;
    setIsGlobalTextHidden: React.Dispatch<React.SetStateAction<boolean>>;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleFileOpen: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleOpenClick: (acceptType?: string) => void;
    isDownloading: boolean;
    libsLoadingState: 'loading' | 'loaded' | 'error';
    handleDownloadHTML: () => void;
    handleDownloadPPTX: () => void;
    handleDownloadPDF: () => void;
    handleDownloadImage: () => void;
    handleOpenInNewTab: () => void;
    setSelectedElements: React.Dispatch<React.SetStateAction<SelectedElementInfo[]>>;
    setIsManualOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isLayersPanelOpen: boolean;
    onToggleLayersPanel: () => void;
    onNewFile: (template: Template) => void;
    onExtractText: () => void;
    isOcrLoading: boolean;
    language: Language;
    setLanguage: React.Dispatch<React.SetStateAction<Language>>;
    t: TFunction;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
    view,
    setView,
    isPreviewSizerOpen,
    setIsPreviewSizerOpen,
    previewSizerRef,
    previewScale,
    setPreviewScale,
    isControlsVisible,
    setIsControlsVisible,
    isGlobalTextHidden,
    setIsGlobalTextHidden,
    fileInputRef,
    handleFileOpen,
    handleOpenClick,
    isDownloading,
    libsLoadingState,
    handleDownloadHTML,
    handleDownloadPPTX,
    handleDownloadPDF,
    handleDownloadImage,
    handleOpenInNewTab,
    setSelectedElements,
    setIsManualOpen,
    isLayersPanelOpen,
    onToggleLayersPanel,
    onNewFile,
    onExtractText,
    isOcrLoading,
    language,
    setLanguage,
    t,
}) => {
    const [isNewFilePopoverOpen, setIsNewFilePopoverOpen] = useState(false);
    const newFileButtonRef = useRef<HTMLButtonElement>(null);

    const getButtonClass = (buttonView: string) => {
        const base = "px-3 py-1 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150";
        if (view === buttonView) {
            return `${base} bg-blue-600 text-white`;
        }
        return `${base} bg-white text-gray-700 hover:bg-gray-100`;
    };

    const actionButtonClass = "px-3 py-1.5 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 bg-white text-gray-700 hover:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50";

    const downloadButtonClass = "flex flex-col items-center justify-center w-12 py-2 text-gray-700 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors duration-150";

    const getPptxButtonText = () => {
        if (isDownloading) return t('header.downloadPptx');
        switch (libsLoadingState) {
            case 'loading': return t('header.downloadPptxLoading');
            case 'error': return t('header.downloadPptxError');
            case 'loaded':
            default: return t('header.downloadPptx');
        }
    };

    const getPdfButtonText = () => {
        if (isDownloading) return t('header.downloadPdf');
        switch (libsLoadingState) {
            case 'loading': return t('header.downloadPdfLoading');
            case 'error': return t('header.downloadPdfError');
            case 'loaded':
            default: return t('header.downloadPdf');
        }
    };

    const handleInitiateDownload = async (downloadFn: () => void) => {
        setSelectedElements([]);
        await new Promise(resolve => setTimeout(resolve, 100)); // Allow time for deselection to render
        downloadFn();
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'ko' ? 'en' : 'ko');
    }

    return (
        <header className="bg-white shadow-sm px-4 py-1 flex justify-between items-center flex-shrink-0 z-20">
            <h1 className="text-2xl font-bold text-gray-700 flex items-center">
                {t('header.title')}
            </h1>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700">{t('header.languageChange')}</span>
                    <button onClick={toggleLanguage} title={t('header.languageToggleTooltip')} className={actionButtonClass}>
                        {language === 'ko' ? 'EN' : 'KO'}
                    </button>
                </div>
                <div className="h-6 w-px bg-gray-300 mx-1"></div> {/* Separator */}
                <button
                    onClick={() => setIsManualOpen(true)}
                    className="flex flex-col items-center justify-center w-16 py-1 text-gray-700 bg-white hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-150"
                    title={t('header.manual')}
                >
                    <div className="h-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <span className="text-xs font-medium">{t('header.manual')}</span>
                </button>
                <button
                    title={t('header.layers')}
                    onClick={onToggleLayersPanel}
                    className={`flex flex-col items-center justify-center w-16 py-1 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-150 ${isLayersPanelOpen ? 'bg-blue-100 text-blue-700' : 'bg-white hover:bg-gray-100'}`}
                >
                    <div className="h-6 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2-1a1 1 0 00-1 1v2h12V5a1 1 0 00-1-1H5zM4 9v6a1 1 0 001 1h10a1 1 0 001-1V9H4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <span className="text-xs font-medium">{t('header.layers')}</span>
                </button>
                <button
                    title={t('header.extractText')}
                    onClick={onExtractText}
                    disabled={isOcrLoading || libsLoadingState !== 'loaded'}
                    className="flex flex-col items-center justify-center w-16 py-1 text-gray-700 bg-white hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-150 disabled:cursor-wait disabled:bg-gray-50"
                >
                    <div className="h-6 flex items-center">
                        {isOcrLoading ? (
                            <svg className="animate-spin h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            <i className="fas fa-spell-check fa-lg text-teal-600"></i>
                        )}
                    </div>
                    <span className="text-xs font-medium">{t('header.extractText')}</span>
                </button>
                <div className="flex items-center gap-2 border-l border-gray-300 pl-2">
                    <div className="relative">
                        <button
                            ref={newFileButtonRef}
                            onClick={() => setIsNewFilePopoverOpen(p => !p)}
                            title={t('header.newFile')}
                            className="flex flex-col items-center justify-center w-16 py-1 text-gray-700 bg-white hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-colors duration-150"
                        >
                            <div className="h-6 flex items-center">
                                <i className="fas fa-file-circle-plus fa-lg text-green-600"></i>
                            </div>
                            <span className="text-xs font-medium">{t('header.newFile')}</span>
                        </button>
                        {isNewFilePopoverOpen && (
                            <NewFilePopover
                                onSelect={(template) => {
                                    onNewFile(template);
                                    setIsNewFilePopoverOpen(false);
                                }}
                                onClose={() => setIsNewFilePopoverOpen(false)}
                                triggerRef={newFileButtonRef}
                                t={t}
                            />
                        )}
                    </div>
                    <span className="text-sm font-medium text-gray-700">{t('header.import')}</span>
                    <div className="flex items-center gap-0">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileOpen}
                            accept=".html,.htm,.pdf,.pptx,image/*"
                            style={{ display: 'none' }}
                        />
                        <button onClick={() => handleOpenClick('.html,.htm')} title={t('header.import') + ' HTML'} className={downloadButtonClass}>
                            <div className="h-6 flex items-center">
                                <i className="fas fa-file-code fa-xl text-blue-600"></i>
                            </div>
                            <span className="text-xs font-medium">{t('header.importHtml')}</span>
                        </button>
                        <button onClick={() => handleOpenClick('.pdf')} title={t('header.import') + ' PDF'} className={downloadButtonClass}>
                            <div className="h-6 flex items-center">
                                <i className="fas fa-file-pdf fa-xl text-red-600"></i>
                            </div>
                            <span className="text-xs font-medium">{t('header.importPdf')}</span>
                        </button>
                        <button onClick={() => handleOpenClick('.pptx')} title={t('header.import') + ' PPTX'} className={downloadButtonClass}>
                            <div className="h-6 flex items-center">
                                <i className="fas fa-file-powerpoint fa-xl text-orange-600"></i>
                            </div>
                            <span className="text-xs font-medium">{t('header.importPptx')}</span>
                        </button>
                        <button onClick={() => handleOpenClick('image/*')} title={t('header.import') + ' IMG'} className={downloadButtonClass}>
                            <div className="h-6 flex items-center">
                                <i className="fas fa-file-image fa-xl text-green-600"></i>
                            </div>
                            <span className="text-xs font-medium">{t('header.importImg')}</span>
                        </button>
                    </div>
                </div>
                <div className="relative" ref={previewSizerRef}>
                    <button
                        onClick={() => setIsPreviewSizerOpen(prev => !prev)}
                        className={actionButtonClass}
                        title={t('header.previewSize')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                    </button>
                    {isPreviewSizerOpen && (
                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-4 origin-top">
                            <label htmlFor="preview-scale" className="block text-sm font-medium text-gray-700 mb-2">
                                {t('header.previewScale')}
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    id="preview-scale"
                                    type="range"
                                    min="25"
                                    max="200"
                                    step="5"
                                    value={previewScale}
                                    onChange={(e) => setPreviewScale(parseInt(e.target.value, 10))}
                                    className="w-full"
                                />
                                <span className="text-sm text-gray-600 w-12 text-right">{previewScale}%</span>
                            </div>
                        </div>
                    )}
                </div>

                <button
                    onClick={() => setIsControlsVisible(prev => !prev)}
                    className={actionButtonClass}
                >
                    {t('header.editControls')}
                </button>
                <button
                    onClick={() => setIsGlobalTextHidden(prev => !prev)}
                    className={actionButtonClass}
                >
                    {isGlobalTextHidden ? t('header.showAllText') : t('header.hideAllText')}
                </button>
                <div className="flex items-center gap-2 border-l border-gray-300 pl-2">
                    <button onClick={() => setView('split')} className={getButtonClass('split')}>{t('header.splitView')}</button>
                    <button onClick={() => setView('editor')} className={getButtonClass('editor')}>{t('header.editorView')}</button>
                    <button onClick={() => setView('preview')} className={getButtonClass('preview')}>{t('header.previewView')}</button>
                    <button onClick={handleOpenInNewTab} title="새 탭에서 미리보기 열기" className={actionButtonClass}>
                        {t('header.newTabView')}
                    </button>
                </div>

                <div className="flex items-center gap-2 border-l border-gray-300 pl-2">
                    <span className="text-sm font-medium text-gray-700">{t('header.download')}</span>
                    <div className="flex items-center gap-0">
                        <button onClick={() => handleInitiateDownload(handleDownloadHTML)} disabled={isDownloading} title={t('header.download') + ' HTML'} className={downloadButtonClass}>
                            <div className="h-6 flex items-center">
                                <i className="fas fa-file-code fa-xl text-blue-600"></i>
                            </div>
                            <span className="text-xs font-medium">{t('header.downloadHtml')}</span>
                        </button>
                        <button onClick={() => handleInitiateDownload(handleDownloadPDF)} title={getPdfButtonText()} disabled={isDownloading || libsLoadingState !== 'loaded'} className={downloadButtonClass}>
                            <div className="h-6 flex items-center">
                                <i className="fas fa-file-pdf fa-xl text-red-600"></i>
                            </div>
                            <span className="text-xs font-medium">{t('header.downloadPdf')}</span>
                        </button>
                        <button onClick={() => handleInitiateDownload(handleDownloadPPTX)} title={getPptxButtonText()} disabled={isDownloading || libsLoadingState !== 'loaded'} className={downloadButtonClass}>
                            <div className="h-6 flex items-center">
                                <i className="fas fa-file-powerpoint fa-xl text-orange-600"></i>
                            </div>
                            <span className="text-xs font-medium">{t('header.downloadPptx')}</span>
                        </button>
                        <button onClick={() => handleInitiateDownload(handleDownloadImage)} disabled={isDownloading} title={t('header.download') + ' ' + t('header.downloadImage')} className={downloadButtonClass}>
                            <div className="h-6 flex items-center">
                                <i className="fas fa-file-image fa-xl text-green-600"></i>
                            </div>
                            <span className="text-xs font-medium">{t('header.downloadImage')}</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};