import React, { useState } from 'react';
import { PdfFile } from '../../types';
import { ICONS } from '../Icons';
import { Spinner } from '../Spinner';
import { PreviewModal } from './PreviewModal';
import { PageDetailModal } from './PageDetailModal';
import { getFileExtension } from '../../utils/filename';
import { useLanguage } from '../../contexts/LanguageContext';

type FilePreviewProps = {
    file: PdfFile;
    onRemoveFile: (id: string) => void;
    index: number;
    size?: 'normal' | 'large';
};

const GenericFilePlaceholder = ({ file }: { file: PdfFile }) => {
    const extension = getFileExtension(file.file.name);
    return (
        <div className="flex flex-col items-center justify-center w-full h-full bg-slate-50">
            <div className="w-24 h-24 text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <div className="mt-4 px-3 py-1.5 bg-blue-500 text-white text-lg font-bold rounded shadow">
                {extension}
            </div>
        </div>
    );
};

export const FilePreview = ({ file, onRemoveFile, index, size = 'normal' }: FilePreviewProps) => {
    const [rotation, setRotation] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const { t } = useLanguage();

    const renderPreviewContent = () => {
        if (file.isLoading) {
            return (
                <div className="flex items-center justify-center w-full h-full">
                    <Spinner />
                </div>
            );
        }

        if (file.previewUrl) {
            return (
                <img 
                    src={file.previewUrl} 
                    alt="File preview" 
                    className="max-w-full max-h-full object-contain transition-transform duration-200"
                    style={{ transform: `rotate(${rotation}deg)` }}
                />
            );
        }

        return <GenericFilePlaceholder file={file} />;
    };

    const containerClasses = size === 'large'
        ? "relative text-center w-80 h-80 group transition-transform duration-300 ease-in-out"
        : "relative text-center w-60 h-56 group transition-transform duration-300 ease-in-out";

    const previewBoxClasses = size === 'large'
        ? "w-full h-60 bg-white rounded-lg shadow-lg border border-slate-200 transition-all duration-300 overflow-hidden group-hover:shadow-xl group-hover:-translate-y-1 flex items-center justify-center"
        : "w-full h-36 bg-white rounded-lg shadow-lg border border-slate-200 transition-all duration-300 overflow-hidden group-hover:shadow-xl group-hover:-translate-y-1 flex items-center justify-center";


    return (
        <div className={containerClasses}>
            <span className="absolute -top-3 -left-3 bg-slate-600 text-white rounded-full w-8 h-8 flex justify-center items-center font-bold z-20">{index}</span>
            <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-slate-700 bg-opacity-50 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-grab z-10">
                <span className="w-6 h-6">{ICONS.dragHandle}</span>
            </div>
            <button 
                onClick={() => onRemoveFile(file.id)} 
                className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-8 h-8 flex justify-center items-center cursor-pointer transition-colors hover:bg-red-600 z-20" 
                aria-label={t('filePreview.removeAria')}
            >
                <span className="w-5 h-5">{ICONS.close}</span>
            </button>
            <div 
                className={previewBoxClasses}
            >
                {renderPreviewContent()}
            </div>

            {!file.isLoading && file.previewUrl && (
                <div className="absolute top-8 right-[-20px] flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button
                        onClick={() => setRotation(prev => (prev + 90) % 360)}
                        className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600"
                        aria-label={t('filePreview.rotateAria')}
                    >
                       <span className="w-6 h-6">{ICONS.rotate}</span>
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-10 h-10 bg-slate-700 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-800"
                        aria-label={t('filePreview.zoomInAria')}
                    >
                        <span className="w-6 h-6">{ICONS.zoomIn}</span>
                    </button>
                    <button
                        onClick={() => setIsDetailModalOpen(true)}
                        className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600"
                        aria-label={t('filePreview.viewPagesAria')}
                    >
                        <span className="w-6 h-6">{ICONS.viewPages}</span>
                    </button>
                </div>
            )}

            <p className="mt-2 text-sm text-slate-600 truncate">{file.file.name}</p>
            <p className="text-xs text-slate-500">{file.pageCount > 0 ? t(file.pageCount > 1 ? 'common.pages' : 'common.page', { count: file.pageCount }) : (file.isLoading ? t('filePreview.pageCountCalculating') : t('filePreview.noPreview'))}</p>
            
            {isModalOpen && file.previewUrl && (
                <PreviewModal 
                    imageUrl={file.previewUrl} 
                    onClose={() => setIsModalOpen(false)}
                    rotation={rotation}
                />
            )}
            {isDetailModalOpen && file.previewUrl && (
                <PageDetailModal
                    file={file}
                    onClose={() => setIsDetailModalOpen(false)}
                />
            )}
        </div>
    );
}