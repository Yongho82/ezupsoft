import React, { useState } from 'react';
import { PdfFile } from '../../types';
import { ICONS } from '../Icons';
import { PageThumbnail } from './PageThumbnail';
import { PreviewModal } from './PreviewModal';
import { useLanguage } from '../../contexts/LanguageContext';

type PageDetailModalProps = {
    file: PdfFile;
    onClose: () => void;
};

export const PageDetailModal = ({ file, onClose }: PageDetailModalProps) => {
    const [zoomedImageUrl, setZoomedImageUrl] = useState<string | null>(null);
    const { t } = useLanguage();

    const getGridColsClass = (count: number) => {
        if (count === 1) {
            return 'grid-cols-1';
        }
        if (count <= 3) { // 2 or 3 items
            return 'grid-cols-1 sm:grid-cols-2';
        }
        if (count <= 6) { // 4, 5, 6 items
            return 'grid-cols-2 md:grid-cols-3';
        }
        if (count <= 12) { // 7-12 items
            return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4';
        }
        // more than 12 items
        return 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6';
    };

    const pageNumbers = Array.from({ length: file.pageCount }, (_, i) => i + 1);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div 
                className="bg-slate-100 rounded-lg w-full max-w-6xl h-[90vh] flex flex-col p-6" 
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4 flex-shrink-0">
                    <h2 className="text-xl font-bold text-slate-800 truncate pr-4">{file.file.name} - {t(file.pageCount > 1 ? 'common.pages' : 'common.page', { count: file.pageCount })}</h2>
                    <button
                        onClick={onClose}
                        className="bg-white text-slate-800 rounded-full w-10 h-10 flex items-center justify-center shadow-lg cursor-pointer hover:bg-slate-200"
                        aria-label={t('pageDetail.closeAria')}
                    >
                        <span className="w-6 h-6">{ICONS.close}</span>
                    </button>
                </div>
                <div className="flex-grow overflow-auto p-4 rounded-md">
                    <div className={`grid ${getGridColsClass(pageNumbers.length)} gap-4`}>
                        {pageNumbers.map((pageNumber) => (
                            <PageThumbnail 
                                key={pageNumber}
                                file={file}
                                pageNumber={pageNumber}
                                onZoom={setZoomedImageUrl}
                            />
                        ))}
                    </div>
                </div>
            </div>
            {zoomedImageUrl && (
                <PreviewModal 
                    imageUrl={zoomedImageUrl} 
                    onClose={() => setZoomedImageUrl(null)}
                    rotation={0}
                />
            )}
        </div>
    );
};
