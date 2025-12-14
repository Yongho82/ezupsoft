

import React from 'react';
import { ICONS } from '../../Icons';
import { PdfFile, Tool } from '../../../types';
import { usePdfHandler } from '../../../hooks/usePdfHandler';
import { getFormattedFilename } from '../../../utils/filename';
import { useLanguage } from '../../../contexts/LanguageContext';

type MergeOptionsProps = {
    files: PdfFile[];
    onProcessStart: (processFn: () => Promise<{ blob: Blob, filename: string } | null>, toolId: Tool['id']) => void;
};

export const MergeOptions = ({ files, onProcessStart }: MergeOptionsProps) => {
    const { mergePdfs } = usePdfHandler();
    const { t } = useLanguage();

    const handleMerge = () => {
        if (files.length < 2) {
            alert(t('alert.mergeNeedTwoFiles'));
            return;
        }

        const processFn = async () => {
            const fileObjects = files.map(f => f.file);
            const mergedPdfBytes = await mergePdfs(fileObjects);
            if (mergedPdfBytes) {
                const blob = new Blob([mergedPdfBytes], { type: 'application/pdf' });
                const filename = getFormattedFilename(files[0].file.name, 'merged', 'pdf');
                return { blob, filename };
            }
            return null;
        };
        
        onProcessStart(processFn, 'merge');
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };
    
    const totalSize = files.reduce((acc, f) => acc + f.file.size, 0);

    return (
        <>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-lg mb-6 text-slate-700 space-y-3">
                <h3 className="text-md font-bold flex items-center text-slate-800">
                    <span className="w-5 h-5 mr-2 text-blue-600">{ICONS.info}</span>
                    {t('mergeOptions.usageTitle')}
                </h3>
                <div className="text-sm">
                    <p className="font-semibold mb-1">{t('mergeOptions.step1Title')}</p>
                    <p className="pl-4 text-slate-600">{t('mergeOptions.step1Desc')}</p>
                </div>
                <div className="text-sm">
                    <p className="font-semibold mb-1">{t('mergeOptions.step2Title')}</p>
                    <p className="pl-4 text-slate-600">{t('mergeOptions.step2Desc')}</p>
                </div>
                <div className="text-sm">
                    <p className="font-semibold mb-1">{t('mergeOptions.step3Title')}</p>
                    <p className="pl-4 text-slate-600">{t('mergeOptions.step3Desc')}</p>
                </div>
                <div className="text-sm">
                    <p className="font-semibold mb-1">{t('mergeOptions.step4Title')}</p>
                    <p className="pl-4 text-slate-600">{t('mergeOptions.step4Desc')}</p>
                </div>
            </div>
            <div className="text-sm text-slate-600 mb-6">
                <p>{t('mergeOptions.totalSize')}: <span className="font-semibold">{formatFileSize(totalSize)}</span></p>
            </div>
            <button
                className="w-full mt-auto p-3 text-lg font-semibold border-none rounded-lg bg-red-600 text-white cursor-pointer transition-colors hover:bg-red-700 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
                onClick={handleMerge}
                disabled={files.length < 2}
            >
                {t('mergeOptions.mergeButton')}
                <span className="w-6 h-6 ml-2">{ICONS.go}</span>
            </button>
        </>
    );
};