
import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../contexts/LanguageContext';

interface LegalModalProps {
  type: 'privacy' | 'terms';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const { t } = useLanguage();
  const titleKey = type === 'privacy' ? 'legal.privacy_title' : 'legal.terms_title';
  const contentKey = type === 'privacy' ? 'legal.privacy_content' : 'legal.terms_content';

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div 
        className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-2xl font-bold text-slate-900">{t(titleKey)}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-900">
            <Icon icon="solar:close-circle-bold" width="24" />
          </button>
        </div>
        
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="prose prose-slate max-w-none">
            <div className="whitespace-pre-wrap text-slate-600 leading-relaxed text-sm md:text-base">
              {t(contentKey)}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button 
            onClick={onClose}
            className="px-8 py-3 bg-[#6C5CE7] text-white rounded-xl font-bold hover:bg-[#5a4bd4] transition-colors shadow-lg shadow-purple-200"
          >
            {t('legal.close')}
          </button>
        </div>
      </div>
    </div>
  );
};
