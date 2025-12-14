
import React from 'react';
import { PdfFile, Tool } from '../../../types';
import { usePdfHandler } from '../../../hooks/usePdfHandler';
import { ICONS } from '../../Icons';
import { Spinner } from '../../Spinner';
import { useLanguage } from '../../../contexts/LanguageContext';

type ConvertOptionsProps = {
    files: PdfFile[];
    activeSubTool: string | null;
    onProcessStart: (processFn: () => Promise<{ blob: Blob, filename: string } | null>, toolId: Tool['id'], subTool?: string) => void;
}

export const ConvertOptions = ({ files, activeSubTool, onProcessStart }: ConvertOptionsProps) => {
    const { convertPdfToImages, convertOfficeToPdf, convertImageToPdf, convertPdfToWord, convertPdfToText, convertPdfToPpt, convertPdfToExcel } = usePdfHandler();
    const { t } = useLanguage();

    const singleFile = files.length === 1 ? files[0] : null;

    const handlePdfToImages = (format: 'jpeg' | 'png') => {
        if (!singleFile || singleFile.file.type !== 'application/pdf') return;

        const subTool = format === 'jpeg' ? 'pdfToJpg' : 'pdfToPng';
        const processFn = async () => {
            return await convertPdfToImages(singleFile.file, format);
        };
        onProcessStart(processFn, 'convert', subTool);
    };

    const handlePdfToWord = () => {
        if (!singleFile || singleFile.file.type !== 'application/pdf') return;
        const processFn = async () => {
            return await convertPdfToWord(singleFile.file);
        };
        onProcessStart(processFn, 'convert', 'pdfToWord');
    };

    const handlePdfToText = () => {
        if (!singleFile || singleFile.file.type !== 'application/pdf') return;
        const processFn = async () => {
            return await convertPdfToText(singleFile.file);
        };
        onProcessStart(processFn, 'convert', 'pdfToText');
    };

    const handlePdfToPpt = () => {
        if (!singleFile || singleFile.file.type !== 'application/pdf') return;
        const processFn = async () => {
            return await convertPdfToPpt(singleFile.file);
        };
        onProcessStart(processFn, 'convert', 'pdfToPpt');
    };

    const handlePdfToExcel = () => {
        if (!singleFile || singleFile.file.type !== 'application/pdf') return;
        const processFn = async () => {
            return await convertPdfToExcel(singleFile.file);
        };
        onProcessStart(processFn, 'convert', 'pdfToExcel');
    };
    
    const handleOfficeToPdf = () => {
        if (!singleFile) return;
        
        const processFn = async () => {
            const pdfFile = await convertOfficeToPdf(singleFile.file);
            if (pdfFile) {
                return { blob: pdfFile, filename: pdfFile.name };
            }
            return null;
        };
        
        // Detect source type to set appropriate message if needed
        // But since it's generic office to pdf, no specific subtool forced here unless activeSubTool exists
        onProcessStart(processFn, 'convert', activeSubTool || undefined);
    };

    const handleImageToPdf = () => {
        if (!singleFile || !singleFile.file.type.startsWith('image/')) return;

        const processFn = async () => {
            const pdfFile = await convertImageToPdf(singleFile.file);
            if (pdfFile) {
                return { blob: pdfFile, filename: pdfFile.name };
            }
            return null;
        };
        onProcessStart(processFn, 'convert', 'jpgToPdf');
    }
    
    const renderContent = () => {
        if (!singleFile || singleFile.isLoading) {
            return <p className="text-slate-500 text-center mt-8">{t('convertOptions.selectFile')}</p>;
        }

        // If specific tool is selected from Home, show streamlined UI
        if (activeSubTool) {
            if (activeSubTool === 'pdfToPpt') {
                return (
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">{t('home.pdfToPptTitle')}</h3>
                         <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                             <p className="text-sm text-slate-500 mb-4">{t('home.pdfToPptDesc')}</p>
                             <button
                                onClick={handlePdfToPpt} 
                                className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-orange-600 text-white cursor-pointer transition-colors hover:bg-orange-700 flex items-center justify-center"
                            >
                                {t('home.pdfToPptTitle')}
                                <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                            </button>
                        </div>
                    </div>
                )
            }
             if (activeSubTool === 'pdfToExcel') {
                return (
                    <div>
                         <h3 className="text-lg font-bold text-slate-800 mb-4">{t('home.pdfToExcelTitle')}</h3>
                         <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                             <p className="text-sm text-slate-500 mb-4">{t('home.pdfToExcelDesc')}</p>
                             <button
                                onClick={handlePdfToExcel} 
                                className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-green-600 text-white cursor-pointer transition-colors hover:bg-green-700 flex items-center justify-center"
                            >
                                {t('home.pdfToExcelTitle')}
                                <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                            </button>
                        </div>
                    </div>
                );
            }
            if (activeSubTool === 'pdfToWord') {
                return (
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">{t('convertOptions.pdfToWord')}</h3>
                        <button onClick={handlePdfToWord} className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-blue-700 text-white hover:bg-blue-800 flex items-center justify-center">
                            {t('convertOptions.convertToWordButton')} <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                        </button>
                    </div>
                );
            }
             if (activeSubTool === 'pdfToJpg') {
                return (
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">{t('convertOptions.pdfToJpg')}</h3>
                         <button onClick={() => handlePdfToImages('jpeg')} className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center justify-center">
                            {t('convertOptions.convertToJpgButton')} <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                        </button>
                    </div>
                );
            }
             if (activeSubTool === 'pdfToPng') {
                return (
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">{t('convertOptions.pdfToPng')}</h3>
                         <button onClick={() => handlePdfToImages('png')} className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center justify-center">
                            {t('convertOptions.convertToPngButton')} <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                        </button>
                    </div>
                );
            }
             if (activeSubTool === 'pdfToText') {
                return (
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">{t('convertOptions.pdfToText')}</h3>
                         <button onClick={handlePdfToText} className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-slate-600 text-white hover:bg-slate-700 flex items-center justify-center">
                            {t('convertOptions.convertToTextButton')} <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                        </button>
                    </div>
                );
            }
            // For X to PDF tools (Word, PPT, Excel, HTML, Image -> PDF)
            if (['wordToPdf', 'pptToPdf', 'excelToPdf', 'htmlToPdf', 'jpgToPdf'].includes(activeSubTool)) {
                 const extension = singleFile.file.name.split('.').pop()?.toLowerCase();
                 const isImage = singleFile.file.type.startsWith('image/');
                 const handler = isImage ? handleImageToPdf : handleOfficeToPdf;
                 const fromType = activeSubTool.replace('ToPdf', '').toUpperCase();
                 
                 return (
                     <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">{t('convertOptions.toPdfTitle', { from: fromType })}</h3>
                        <button onClick={handler} className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-red-600 text-white hover:bg-red-700 flex items-center justify-center">
                            {t('convertOptions.convertToPdfButton')} <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                        </button>
                    </div>
                 )
            }
        }

        // Fallback to standard list if no subTool or generic
        const extension = singleFile.file.name.split('.').pop()?.toLowerCase();
        const isImage = singleFile.file.type.startsWith('image/');
        const isHtml = ['html', 'htm'].includes(extension || '');

        if (singleFile.file.type === 'application/pdf') {
            return (
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">{t('convertOptions.convertTo')}</h3>
                        
                        <div className="space-y-4">
                             {/* PDF to JPG */}
                            <div className="border border-slate-200 rounded-lg p-4">
                                <h4 className="font-semibold text-slate-700">{t('convertOptions.pdfToJpg')}</h4>
                                <p className="text-sm text-slate-500 mt-1 mb-4">{t('convertOptions.pdfToJpgDesc')}</p>
                                <button
                                    onClick={() => handlePdfToImages('jpeg')}
                                    className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-white border-2 border-red-600 text-red-600 cursor-pointer transition-colors hover:bg-red-50 flex items-center justify-center"
                                >
                                    {t('convertOptions.convertToJpgButton')}
                                    <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                                </button>
                            </div>

                             {/* PDF to PNG */}
                            <div className="border border-slate-200 rounded-lg p-4">
                                <h4 className="font-semibold text-slate-700">{t('convertOptions.pdfToPng')}</h4>
                                <p className="text-sm text-slate-500 mt-1 mb-4">{t('convertOptions.pdfToPngDesc')}</p>
                                <button
                                    onClick={() => handlePdfToImages('png')}
                                    className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-white border-2 border-blue-600 text-blue-600 cursor-pointer transition-colors hover:bg-blue-50 flex items-center justify-center"
                                >
                                    {t('convertOptions.convertToPngButton')}
                                    <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                                </button>
                            </div>

                            {/* PDF to Word */}
                            <div className="border border-slate-200 rounded-lg p-4">
                                <h4 className="font-semibold text-slate-700">{t('convertOptions.pdfToWord')}</h4>
                                <p className="text-sm text-slate-500 mt-1 mb-4">{t('convertOptions.pdfToWordDesc')}</p>
                                <button
                                    onClick={handlePdfToWord}
                                    className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-blue-700 text-white cursor-pointer transition-colors hover:bg-blue-800 flex items-center justify-center"
                                >
                                    {t('convertOptions.convertToWordButton')}
                                    <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                                </button>
                            </div>

                             {/* PDF to PowerPoint */}
                            <div className="border border-slate-200 rounded-lg p-4">
                                <h4 className="font-semibold text-slate-700">{t('home.pdfToPptTitle')}</h4>
                                <p className="text-sm text-slate-500 mt-1 mb-4">{t('home.pdfToPptDesc')}</p>
                                <button
                                    onClick={handlePdfToPpt}
                                    className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-orange-600 text-white cursor-pointer transition-colors hover:bg-orange-700 flex items-center justify-center"
                                >
                                    {t('home.pdfToPptTitle')}
                                    <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                                </button>
                            </div>

                            {/* PDF to Excel */}
                            <div className="border border-slate-200 rounded-lg p-4">
                                <h4 className="font-semibold text-slate-700">{t('home.pdfToExcelTitle')}</h4>
                                <p className="text-sm text-slate-500 mt-1 mb-4">{t('home.pdfToExcelDesc')}</p>
                                <button
                                    onClick={handlePdfToExcel}
                                    className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-green-600 text-white cursor-pointer transition-colors hover:bg-green-700 flex items-center justify-center"
                                >
                                    {t('home.pdfToExcelTitle')}
                                    <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                                </button>
                            </div>

                            {/* PDF to Text */}
                            <div className="border border-slate-200 rounded-lg p-4">
                                <h4 className="font-semibold text-slate-700">{t('convertOptions.pdfToText')}</h4>
                                <p className="text-sm text-slate-500 mt-1 mb-4">{t('convertOptions.pdfToTextDesc')}</p>
                                <button
                                    onClick={handlePdfToText}
                                    className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-slate-600 text-white cursor-pointer transition-colors hover:bg-slate-700 flex items-center justify-center"
                                >
                                    {t('convertOptions.convertToTextButton')}
                                    <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        
        if (isImage || ['docx', 'xls', 'xlsx', 'pptx', 'html', 'htm'].includes(extension || '')) {
            const fromType = (extension || '').toUpperCase();
            const handler = isImage ? handleImageToPdf : handleOfficeToPdf;
            
            let description = t('convertOptions.officeToPdfDesc');
            if (isImage) description = t('convertOptions.imageToPdfDesc');
            if (isHtml) description = t('convertOptions.htmlToPdfDesc');

            return (
                <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{t('convertOptions.convertTo')}</h3>
                    <div className="border border-slate-200 rounded-lg p-4">
                        <h4 className="font-semibold text-slate-700">{t('convertOptions.toPdfTitle', { from: fromType })}</h4>
                        <p className="text-sm text-slate-500 mt-1 mb-4">{description}</p>
                        <button
                            onClick={handler}
                            className="w-full p-3 text-lg font-semibold border-none rounded-lg bg-red-600 text-white cursor-pointer transition-colors hover:bg-red-700 flex items-center justify-center"
                        >
                            {t('convertOptions.convertToPdfButton')}
                            <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                        </button>
                    </div>
                </div>
            )
        }

        if (['doc', 'ppt'].includes(extension || '')) {
             return (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-sm text-yellow-800 flex items-start">
                    <span className="w-5 h-5 mr-2 mt-0.5 shrink-0 text-yellow-600">{ICONS.info}</span>
                    <span>{t('convertOptions.legacyFormatWarning', { ext: extension })}</span>
                </div>
            );
        }

        return <p className="text-slate-500 text-center mt-4">{t('convertOptions.unsupportedFormat')}</p>;
    };

    return (
        <div className="h-full flex flex-col overflow-y-auto">
            {renderContent()}
        </div>
    );
};
