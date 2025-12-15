
import React, { useState } from 'react';
import { ICONS } from '../components/Icons';
import { useLanguage } from '../contexts/LanguageContext';
import { Tool } from '../types';
import { getFileExtension } from '../utils/filename';

type ProcessingResult = {
    blob: Blob;
    filename: string;
};

type ProcessingPageProps = {
    toolId: Tool['id'];
    subTool: string | null;
    result: ProcessingResult | null;
    onReset: () => void;
};

export const ProcessingPage = ({ toolId, subTool, result, onReset }: ProcessingPageProps) => {
    const { t } = useLanguage();
    const [showDeleted, setShowDeleted] = useState(false);

    const handleDownload = () => {
        if (!result) return;
        const url = URL.createObjectURL(result.blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = result.filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };
    
    const handleDelete = () => {
        setShowDeleted(true);
        setTimeout(() => {
            onReset();
        }, 1500);
    };

    const LoadingView = () => {
        let message = t('processing.converting');

        if (toolId === 'convert' && subTool) {
             if (subTool === 'pdfToPpt') message = t('processing.convertingToPpt');
             else if (subTool === 'pdfToExcel') message = t('processing.convertingToExcel');
             else if (subTool === 'pdfToWord') message = t('processing.convertingToWord');
             else if (subTool === 'pdfToJpg') message = t('processing.convertingToJpg');
             else if (subTool === 'pdfToPng') message = t('processing.convertingToPng');
             else if (subTool === 'pdfToText') message = t('processing.convertingToText');
        } else {
             const messages: Record<Tool['id'], string> = {
                home: '',
                merge: t('processing.merging'),
                split: t('processing.splitting'),
                compress: t('processing.compressing'),
                convert: t('processing.converting'),
                watermark: t('processing.watermarking'),
                edit: '', // Not used here
            };
            message = messages[toolId];
        }

        const toolIcons: Record<Tool['id'], React.ReactNode> = {
            home: null,
            merge: ICONS.merge,
            split: ICONS.split,
            compress: ICONS.compress,
            convert: ICONS.convert,
            watermark: ICONS.watermark,
            edit: ICONS.edit,
        };

        return (
            <div className="flex flex-col items-center justify-center w-full h-full text-center">
                <div className="relative w-32 h-32">
                    <div className="absolute inset-0 border-8 border-slate-200 rounded-full"></div>
                    <div className="absolute inset-0 border-8 border-t-blue-600 border-l-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                        <span className="w-16 h-16">{toolIcons[toolId]}</span>
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-slate-800 mt-6 mb-4">{message}</h1>
                <p className="text-lg text-slate-600">{t('processing.pleaseWait')}</p>
            </div>
        );
    };

    const SuccessView = () => {
        const getSuccessText = () => {
            if (toolId === 'convert' && result) {
                const ext = getFileExtension(result.filename).toLowerCase();
                if (['ppt', 'pptx'].includes(ext)) return { title: t('processing.pptSuccessTitle'), btn: t('processing.downloadButtonPpt') };
                if (['xls', 'xlsx'].includes(ext)) return { title: t('processing.excelSuccessTitle'), btn: t('processing.downloadButtonExcel') };
                if (['doc', 'docx'].includes(ext)) return { title: t('processing.wordSuccessTitle'), btn: t('processing.downloadButtonWord') };
                if (['jpg', 'jpeg'].includes(ext)) return { title: t('processing.jpgSuccessTitle'), btn: t('processing.downloadButtonJpg') };
                if (['png'].includes(ext)) return { title: t('processing.pngSuccessTitle'), btn: t('processing.downloadButtonPng') };
                if (['txt'].includes(ext)) return { title: t('processing.textSuccessTitle'), btn: t('processing.downloadButtonText') };
                if (['zip'].includes(ext)) return { title: t('processing.zipSuccessTitle'), btn: t('processing.downloadButtonZip') };
            }

            const titles: Record<Tool['id'], string> = {
                home: '',
                merge: t('processing.mergeSuccessTitle'),
                split: t('processing.splitSuccessTitle'),
                compress: t('processing.compressSuccessTitle'),
                convert: t('processing.convertSuccessTitle'),
                watermark: t('processing.watermarkSuccessTitle'),
                edit: '', // Not used here
            };
            const downloadTexts: Record<Tool['id'], string> = {
                home: '',
                merge: t('processing.downloadButtonMerge'),
                split: t('processing.downloadButtonSplit'),
                compress: t('processing.downloadButtonCompress'),
                convert: t('processing.downloadButtonConvert'),
                watermark: t('processing.downloadButtonWatermark'),
                edit: '', // Not used here
            };

            return { title: titles[toolId], btn: downloadTexts[toolId] };
        };

        const { title, btn } = getSuccessText();

        return (
            <div className="flex flex-col items-center justify-center w-full h-full text-center">
                <h1 className="text-4xl font-bold text-slate-800 mb-12">{title}</h1>
                <div className="flex items-center space-x-4">
                    <button 
                        onClick={onReset} 
                        className="w-16 h-16 bg-slate-200 text-slate-700 rounded-full flex items-center justify-center shadow-lg hover:bg-slate-300 transition-colors" 
                        aria-label={t('processing.backAria')}
                    >
                        <span className="w-8 h-8">{ICONS.backArrow}</span>
                    </button>
                    <button 
                        onClick={handleDownload} 
                        className="px-8 py-4 bg-red-600 text-white font-bold text-xl rounded-lg flex items-center space-x-3 hover:bg-red-700 transition-transform transform hover:scale-105"
                    >
                        <span className="w-8 h-8">{ICONS.download}</span>
                        <span>{btn}</span>
                    </button>
                    <button 
                        onClick={handleDelete} 
                        className="w-16 h-16 bg-slate-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-800 transition-colors" 
                        aria-label={t('processing.trashAria')}
                    >
                        <span className="w-8 h-8">{ICONS.trash}</span>
                    </button>
                </div>
            </div>
        );
    };
    
    const DeletedView = () => (
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
             <div className="w-24 h-24 mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <span className="w-16 h-16 text-green-500">{ICONS.check}</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-800">{t('processing.deleted')}</h1>
        </div>
    );

    return (
        <main className="flex-grow flex p-8 items-center justify-center bg-white">
            {showDeleted ? <DeletedView /> : (result ? <SuccessView /> : <LoadingView />)}
        </main>
    );
};
