
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ICONS } from '../Icons';

type SignatureListPanelProps = {
    savedSignatures: string[];
    onAddSignature: (signature: string) => void;
    onGoBack: () => void;
    onNewSignature: () => void;
    onDeleteSignature: (index: number) => void;
};

export const SignatureListPanel = ({ savedSignatures, onAddSignature, onGoBack, onNewSignature, onDeleteSignature }: SignatureListPanelProps) => {
    const { t } = useLanguage();

    return (
        <aside className="w-full h-full bg-white flex flex-col flex-shrink-0">
            <div className="flex-shrink-0 bg-slate-100 border-b border-slate-300 p-2 flex items-center h-16 sticky top-0 z-10">
                <button onClick={onGoBack} className="p-2 text-slate-600 rounded-md hover:bg-slate-300 transition-colors" title={t('signatureList.back')}>
                    <span className="w-5 h-5 block">{ICONS.backArrow}</span>
                </button>
                <h3 className="text-md font-semibold text-slate-800 ml-2">
                    {t('signatureList.title')}
                </h3>
            </div>

            <div className="flex-grow overflow-y-auto p-4 space-y-2">
                {savedSignatures.length === 0 ? (
                    <div className="text-center text-sm text-slate-500 pt-10">
                        {t('signatureList.empty')}
                    </div>
                ) : (
                    savedSignatures.map((sig, index) => (
                        <div key={index} className="group relative p-2 border border-slate-200 rounded-md hover:bg-blue-50 bg-white transition-colors">
                            <div 
                                className="h-16 flex items-center justify-center cursor-pointer"
                                onClick={() => onAddSignature(sig)}
                            >
                                <img src={sig} alt={`Saved signature ${index + 1}`} className="max-h-full max-w-full object-contain" />
                            </div>
                             <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onDeleteSignature(index);
                                }}
                                className="absolute top-1 right-1 p-1 bg-white border border-slate-200 rounded-full shadow-sm text-slate-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                                title={t('objectToolbar.delete')}
                            >
                                <span className="w-3 h-3 block">{ICONS.close}</span>
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="p-4 border-t border-slate-200 sticky bottom-0 bg-white">
                <button
                    onClick={onNewSignature}
                    className="w-full flex items-center justify-center p-3 text-sm font-semibold border-2 border-dashed border-slate-400 text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
                >
                    <span className="w-5 h-5 mr-2">{ICONS.plus}</span>
                    {t('signatureList.new')}
                </button>
            </div>
        </aside>
    );
};
