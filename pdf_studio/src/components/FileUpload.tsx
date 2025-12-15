
import React, { useState, useCallback, useRef } from 'react';
import { ICONS } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

type FileUploadProps = {
    onFilesSelect: (files: FileList | null) => void;
    activeTool: string;
    activeSubTool: string | null;
}

const getAcceptTypes = (tool: string, subTool: string | null) => {
    if (subTool) {
        if (['pdfToWord', 'pdfToPpt', 'pdfToExcel', 'pdfToJpg', 'pdfToPng', 'pdfToText'].includes(subTool)) return '.pdf';
        if (subTool === 'wordToPdf') return '.doc,.docx';
        if (subTool === 'pptToPdf') return '.ppt,.pptx';
        if (subTool === 'excelToPdf') return '.xls,.xlsx';
        if (subTool === 'htmlToPdf') return '.html,.htm';
        if (subTool === 'jpgToPdf') return '.jpg,.jpeg,.png';
    }

    if (tool === 'merge') {
        return '.pdf,.jpg,.jpeg,.png';
    }
    if (['split', 'compress', 'edit', 'watermark'].includes(tool)) {
        return '.pdf';
    }
    return '.pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.html,.htm';
};



export const FileUpload = ({ onFilesSelect, activeTool, activeSubTool }: FileUploadProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useLanguage();

    const getSupportedFormatsInfo = (tool: string, subTool: string | null) => {
        if (subTool) {
            if (['pdfToWord', 'pdfToPpt', 'pdfToExcel', 'pdfToJpg', 'pdfToPng', 'pdfToText'].includes(subTool)) {
                 return { description: t('fileUpload.pdfOnlyDescription'), tags: ["PDF"] };
            }
            if (subTool === 'wordToPdf') return { description: t('home.wordToPdfDesc'), tags: ["DOC", "DOCX"] };
            if (subTool === 'pptToPdf') return { description: t('home.pptToPdfDesc'), tags: ["PPT", "PPTX"] };
            if (subTool === 'excelToPdf') return { description: t('home.excelToPdfDesc'), tags: ["XLS", "XLSX"] };
            if (subTool === 'htmlToPdf') return { description: t('home.htmlToPdfDesc'), tags: ["HTML"] };
            if (subTool === 'jpgToPdf') return { description: t('home.jpgToPdfDesc'), tags: ["JPG", "PNG"] };
        }

        if (tool === 'merge') {
            return {
                description: t('fileUpload.mergeDescription'),
                tags: ["PDF", "JPG", "PNG"]
            };
        }
        if (['split', 'compress', 'edit', 'watermark'].includes(tool)) {
             return {
                description: t('fileUpload.pdfOnlyDescription'),
                tags: ["PDF"]
            };
        }
        return {
            description: t('fileUpload.allDescription'),
            tags: ["PDF", "DOC", "XLS", "PPT", "PNG", "JPG", "HTML"]
        };
    };


    const handleFiles = (files: FileList | null) => {
        if (files && files.length > 0) {
            onFilesSelect(files);
        }
    };

    const onDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);
    
    const onDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    }, [onFilesSelect]);

    const accept = getAcceptTypes(activeTool, activeSubTool);
    const multiple = activeTool === 'merge' || activeTool === 'edit';
    const supportedFormats = getSupportedFormatsInfo(activeTool, activeSubTool);

    return (
        <div 
            className={`text-center p-8 rounded-xl w-full max-w-2xl mx-auto ${isDragging ? 'bg-blue-100' : ''}`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <div className="text-blue-500 w-16 h-16 mx-auto mb-6">{ICONS.upload}</div>
            <button className="inline-flex items-center text-lg font-semibold px-6 py-3 rounded-lg border-none bg-blue-600 text-white cursor-pointer transition-colors hover:bg-blue-700" onClick={() => inputRef.current?.click()}>
                <span className="w-6 h-6 mr-2">{ICONS.plus}</span>
                {t('fileUpload.selectFile')}
            </button>
            <input
                type="file"
                ref={inputRef}
                onChange={(e) => handleFiles(e.target.files)}
                style={{ display: 'none' }}
                accept={accept}
                multiple={multiple}
            />
            <div className="mt-6 text-slate-500">
                <p>{supportedFormats.description}</p>
                {supportedFormats.tags.map(tag => (
                     <span key={tag} className="inline-block bg-slate-200 text-slate-800 px-2 py-1 rounded-md text-sm m-1">{tag}</span>
                ))}
            </div>
        </div>
    );
};
