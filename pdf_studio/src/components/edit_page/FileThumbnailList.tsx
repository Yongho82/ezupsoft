
import React, { useState, useEffect, useRef } from 'react';
import { PdfFile } from '../../types';
import { ICONS } from '../Icons';
import { Spinner } from '../Spinner';
import { usePdfHandler } from '../../hooks/usePdfHandler';
import { useLanguage } from '../../contexts/LanguageContext';

type FileThumbnailListProps = {
    files: PdfFile[];
    selectedFileId: string | null;
    onRemoveFile: (id: string) => void;
    onAddFiles: (files: FileList | null) => void;
    currentPage: number;
    onGoToPage: (page: number) => void;
    onPageAction: (action: 'delete' | 'duplicate' | 'rotate', fileId: string, pageNumber: number) => void;
    pageRotations: Record<number, number>;
}

export const FileThumbnailList = ({ files, selectedFileId, onRemoveFile, onAddFiles, currentPage, onGoToPage, onPageAction, pageRotations }: FileThumbnailListProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { generateAllPagesPreview } = usePdfHandler();
    const [previews, setPreviews] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useLanguage();
    
    const selectedFile = files.find(f => f.id === selectedFileId);

    useEffect(() => {
        if (selectedFile && !selectedFile.isLoading) {
            const generate = async () => {
                setIsLoading(true);
                setPreviews([]);
                const result = await generateAllPagesPreview(selectedFile.file);
                if (result) {
                    setPreviews(result);
                }
                setIsLoading(false);
            };
            generate();
        } else if (selectedFile && selectedFile.isLoading) {
             setIsLoading(true);
             setPreviews([]);
        } else {
            setPreviews([]);
            setIsLoading(false);
        }
    }, [selectedFile, generateAllPagesPreview]);


    const handleAddClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onAddFiles(e.target.files);
            e.target.value = ''; // Reset input
        }
    };

    return (
        <aside className="w-full h-full bg-white flex flex-col flex-shrink-0">
            {/* Header for the single file */}
            <div className="flex-shrink-0 bg-slate-100 border-b border-slate-300 p-2 flex items-center justify-between h-16 sticky top-0 z-10">
                <h3 className="text-md font-semibold text-slate-800 truncate pr-2" title={selectedFile?.file.name}>
                    {selectedFile ? selectedFile.file.name : t('editThumbnails.noFile')}
                </h3>
                <div className="flex items-center space-x-1 flex-shrink-0">
                    <button
                        onClick={handleAddClick}
                        className="p-2 text-slate-600 rounded-md hover:bg-slate-300 transition-colors"
                        title={t('editThumbnails.addFileTooltip')}
                    >
                        <span className="w-5 h-5 block">{ICONS.plus}</span>
                    </button>
                    <button
                        onClick={() => selectedFile && onRemoveFile(selectedFile.id)}
                        className="p-2 text-slate-600 rounded-md hover:bg-slate-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        title={t('editThumbnails.closeFileTooltip')}
                        disabled={!selectedFile}
                    >
                        <span className="w-5 h-5 block">{ICONS.trash}</span>
                    </button>
                </div>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange}
                    className="hidden" 
                    accept=".pdf" 
                    multiple 
                />
            </div>

            {/* Page Thumbnails */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {isLoading && <div className="flex justify-center pt-10"><Spinner /></div>}
                {!isLoading && previews.map((url, index) => {
                    const pageNumber = index + 1;
                    const isCurrent = currentPage === pageNumber;
                    const rotation = pageRotations[pageNumber] || 0;
                    return (
                        <div 
                            key={pageNumber} 
                            onClick={() => onGoToPage(pageNumber)} 
                            className={`p-1 rounded-md group/thumb relative cursor-pointer ${isCurrent ? 'bg-blue-100' : 'hover:bg-slate-100'}`}
                        >
                            <div className={`border-2 ${isCurrent ? 'border-blue-500' : 'border-transparent'} rounded-md p-0.5 transition-colors flex justify-center`}>
                                <img 
                                    src={url} 
                                    alt={`Page ${pageNumber}`} 
                                    className="max-w-full h-auto shadow-sm rounded-sm transition-transform duration-200 max-h-48 lg:max-h-none" 
                                    style={{ transform: `rotate(${rotation}deg)` }}
                                />
                            </div>
                            <p className="text-center text-xs text-slate-600 mt-1">{pageNumber}</p>
                            
                            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full flex justify-center items-center space-x-2 opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-200 z-10">
                               <button 
                                    onClick={(e) => { e.stopPropagation(); onPageAction('duplicate', selectedFileId!, pageNumber); }} 
                                    className="bg-white p-2 rounded-full shadow-md hover:bg-slate-200"
                                    title={t('editThumbnails.copyPageTooltip')}
                                >
                                    <span className="w-4 h-4 text-slate-700 block">{ICONS.copy}</span>
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onPageAction('rotate', selectedFileId!, pageNumber); }} 
                                    className="bg-white p-2 rounded-full shadow-md hover:bg-slate-200"
                                    title={t('editThumbnails.rotatePageTooltip')}
                                >
                                    <span className="w-4 h-4 text-slate-700 block">{ICONS.rotate}</span>
                                </button>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); onPageAction('delete', selectedFileId!, pageNumber); }} 
                                    className="bg-white p-2 rounded-full shadow-md hover:bg-red-200"
                                    title={t('editThumbnails.deletePageTooltip')}
                                >
                                    <span className="w-4 h-4 text-red-600 block">{ICONS.trash}</span>
                                </button>
                            </div>
                        </div>
                    )
                })}
                 {!isLoading && selectedFile && previews.length === 0 && (
                     <div className="text-center text-sm text-slate-500 pt-10" dangerouslySetInnerHTML={{ __html: t('editThumbnails.previewError') }}>
                    </div>
                )}
            </div>
            
            {/* Footer */}
            {selectedFile && (
                <div className="p-2 border-t border-slate-300 text-xs text-slate-600 truncate text-center sticky bottom-0 bg-white">
                    {t(selectedFile.pageCount > 1 ? 'common.pages' : 'common.page', { count: selectedFile.pageCount })}
                </div>
            )}
        </aside>
    );
};
