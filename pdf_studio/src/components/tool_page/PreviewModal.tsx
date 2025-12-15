import React from 'react';
import { ICONS } from '../Icons';
import { useLanguage } from '../../contexts/LanguageContext';

type PreviewModalProps = {
    imageUrl: string;
    onClose: () => void;
    rotation: number;
};

export const PreviewModal = ({ imageUrl, onClose, rotation }: PreviewModalProps) => {
    const { t } = useLanguage();
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60]" onClick={onClose}>
            <div className="relative max-w-4xl max-h-[90vh] p-4" onClick={(e) => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 bg-white text-slate-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer hover:bg-slate-200 z-10"
                    aria-label={t('previewModal.closeAria')}
                >
                    <span className="w-6 h-6">{ICONS.close}</span>
                </button>
                <img
                    src={imageUrl}
                    alt="Enlarged preview"
                    className="max-w-full max-h-[85vh] object-contain"
                    style={{ transform: `rotate(${rotation}deg)` }}
                />
            </div>
        </div>
    );
};
