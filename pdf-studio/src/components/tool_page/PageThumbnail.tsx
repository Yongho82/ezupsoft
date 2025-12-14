import React, { useState, useEffect } from 'react';
import { usePdfHandler } from '../../hooks/usePdfHandler';
import { ICONS } from '../Icons';
import { PdfFile } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

export type PageThumbnailProps = {
    file: PdfFile;
    pageNumber: number;
    onZoom: (imageUrl: string) => void;
};

export const PageThumbnail: React.FC<PageThumbnailProps> = ({ file, pageNumber, onZoom }) => {
    const { generateSinglePagePreview } = usePdfHandler();
    const [pageData, setPageData] = useState<{ url: string; width: number; height: number } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const { t } = useLanguage();

    useEffect(() => {
        const generate = async () => {
            setIsLoading(true);
            setHasError(false);
            const result = await generateSinglePagePreview(file.file, pageNumber);
            if (result) {
                setPageData(result);
            } else {
                setHasError(true);
            }
            setIsLoading(false);
        };
        generate();
    }, [file, pageNumber, generateSinglePagePreview]);
    
    const aspectRatio = pageData ? pageData.width / pageData.height : 1 / 1.414;

    return (
        <div className="text-center">
            <div 
                className="relative w-full border border-slate-300 rounded-md shadow-sm group/thumb bg-slate-200 overflow-hidden"
                style={{ aspectRatio: `${aspectRatio}`}}
            >
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                )}
                {hasError && !isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                         <p className="text-red-500 text-sm">{t('common.error')}</p>
                    </div>
                )}
                {pageData && !isLoading && (
                    <>
                        <img src={pageData.url} alt={`Page ${pageNumber}`} className="w-full h-full object-contain block bg-white" />
                        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300">
                            <button
                                onClick={() => onZoom(pageData.url)}
                                className="w-10 h-10 bg-slate-800 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-900"
                                aria-label={t('pageThumbnail.zoomAria', { pageNumber })}
                            >
                                <span className="w-6 h-6">{ICONS.zoomIn}</span>
                            </button>
                        </div>
                    </>
                )}
            </div>
            <p className="mt-1 text-sm text-slate-600">{t('common.pageSingle')} {pageNumber}</p>
        </div>
    );
};
