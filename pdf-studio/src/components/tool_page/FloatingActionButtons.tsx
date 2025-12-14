
import React, { useRef } from 'react';
import { ICONS } from '../Icons';
import { Tool } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

type FloatingActionButtonsProps = {
    onAddFiles: (files: FileList | null) => void;
    fileCount: number;
    activeToolId: Tool['id'];
};

export const FloatingActionButtons = ({ onAddFiles, fileCount, activeToolId }: FloatingActionButtonsProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useLanguage();

    const handleFileAddClick = () => {
        inputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            onAddFiles(e.target.files);
            e.target.value = '';
        }
    };
    
    const accept = activeToolId === 'merge' ? '.pdf,.jpg,.jpeg,.png' : '.pdf';
    const multiple = activeToolId === 'merge';

    return (
        <div className="fixed bottom-24 right-6 lg:bottom-auto lg:top-24 lg:right-[26rem] flex flex-col items-center space-y-3 z-20">
            <button
                onClick={handleFileAddClick}
                className="relative w-14 h-14 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-transform transform hover:scale-110"
                aria-label={t('fab.addFilesAria')}
            >
                <span className="w-8 h-8">{ICONS.plus}</span>
                {fileCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-white text-red-500 text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-red-500">
                        {fileCount}
                    </span>
                )}
            </button>
            <input
                type="file"
                ref={inputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept={accept}
                multiple={multiple}
            />
        </div>
    );
};
