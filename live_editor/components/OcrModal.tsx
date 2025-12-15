import React, { useState, useEffect, useRef } from 'react';
import { TFunction } from '../hooks/useTranslations';

interface OcrModalProps {
  isOpen: boolean;
  onClose: () => void;
  extractedText: string;
  isLoading: boolean;
  t: TFunction;
}

export const OcrModal: React.FC<OcrModalProps> = ({ isOpen, onClose, extractedText, isLoading, t }) => {
  const [copyButtonText, setCopyButtonText] = useState(t('ocr.copy'));
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCopyButtonText(t('ocr.copy'));
    }
  }, [isOpen, t]);

  const handleCopy = () => {
    if (extractedText) {
        navigator.clipboard.writeText(extractedText).then(() => {
            setCopyButtonText(t('ocr.copied'));
            setTimeout(() => setCopyButtonText(t('ocr.copy')), 2000);
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy text.');
        });
    }
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
        onClick={handleBackdropClick}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col"
      >
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">{t('ocr.title')}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </header>
        <main className="p-6 overflow-y-auto bg-gray-50 flex-grow min-h-[200px]">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p className="text-md font-medium text-gray-700">{t('ocr.loading')}</p>
            </div>
          ) : (
            <pre className="whitespace-pre-wrap font-sans text-sm text-gray-800 p-2 bg-white border border-gray-200 rounded-md">
              {extractedText}
            </pre>
          )}
        </main>
        <footer className="p-4 border-t border-gray-200 bg-white rounded-b-lg flex justify-end">
          <button
            onClick={handleCopy}
            disabled={isLoading || !extractedText || extractedText === t('ocr.noTextFound')}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {copyButtonText}
          </button>
        </footer>
      </div>
    </div>
  );
};
