import React, { useState, useEffect } from 'react';
import { PdfFile } from '../../types';
import { usePdfHandler } from '../../hooks/usePdfHandler';
import { Spinner } from '../Spinner';
import { ICONS } from '../Icons';
import { useLanguage } from '../../contexts/LanguageContext';

type PageGridViewProps = {
    file: PdfFile;
    selectedPages: number[];
    onPageSelect: (pageNumber: number) => void;
};

export const PageGridView = ({ file, selectedPages, onPageSelect }: PageGridViewProps) => {
    const { generateAllPagesPreview } = usePdfHandler();
    const [previews, setPreviews] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { t } = useLanguage();

    useEffect(() => {
        const generate = async () => {
            setIsLoading(true);
            const result = await generateAllPagesPreview(file.file);
            if (result) {
                setPreviews(result);
            }
            setIsLoading(false);
        };
        generate();
    }, [file, generateAllPagesPreview]);
    
    if (isLoading) {
        return <div className="w-full flex flex-col items-center justify-center"><Spinner /><p className="mt-4 text-slate-600">{t('pageGrid.loading')}</p></div>;
    }

    const getGridColsClass = (count: number) => {
        if (count <= 2) {
            return 'grid-cols-6';
        }
        if (count === 3) {
            return 'grid-cols-3';
        }
        if (count === 4) {
            return 'grid-cols-2 md:grid-cols-4';
        }
        if (count <= 8) { // For 5-8 pages
            return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
        }
        // For 9+ pages
        return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6';
    };

    return (
        <div className="w-full h-full overflow-auto">
            <div className={`grid ${getGridColsClass(previews.length)} gap-x-6 gap-y-8 pt-4`}>
                {previews.map((url, index) => {
                    const pageNumber = index + 1;
                    const isSelected = selectedPages.includes(pageNumber);
                    return (
                        <div key={pageNumber} className="relative text-center cursor-pointer group" onClick={() => onPageSelect(pageNumber)}>
                            <div className={`relative w-full border-2 rounded-lg shadow-sm bg-white transition-all duration-200 overflow-hidden ${isSelected ? 'border-red-500' : 'border-slate-300 group-hover:border-red-400'}`}>
                                <img src={url} alt={`Page ${pageNumber}`} className="w-full h-full object-contain rounded-md" />
                                <span className="absolute bottom-1 right-2 text-xs font-bold text-white bg-black bg-opacity-40 px-1.5 py-0.5 rounded">
                                    {pageNumber}
                                </span>
                            </div>
                            {isSelected && (
                                <div className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg border-2 border-white">
                                    <span className="w-5 h-5">{ICONS.check}</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
