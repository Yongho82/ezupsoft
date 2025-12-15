import React from 'react';
import { ICONS } from '../../Icons';
import { PdfFile, Tool } from '../../../types';
import { useLanguage } from '../../../contexts/LanguageContext';

type WatermarkOptionsProps = {
    files: PdfFile[];
    onProcessStart: (processFn: () => Promise<{ blob: Blob, filename: string } | null>, toolId: Tool['id']) => void;
};

export const WatermarkOptions = ({ files, onProcessStart }: WatermarkOptionsProps) => {
    const { t } = useLanguage();
    const singleFile = files.length === 1 ? files[0] : null;

    return (
        <div className="flex flex-col h-full">
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-800 flex items-start">
                <span className="w-5 h-5 mr-2 mt-0.5 shrink-0 text-blue-600">{ICONS.info}</span>
                <span>{t('watermarkOptions.comingSoon')}</span>
            </div>
            
            <button
                className="w-full mt-auto p-3 text-lg font-semibold border-none rounded-lg bg-slate-400 text-white cursor-not-allowed flex items-center justify-center"
                disabled={true}
            >
                {t('sidebar.watermark')}
                <span className="w-6 h-6 ml-2">{ICONS.go}</span>
            </button>
        </div>
    );
};