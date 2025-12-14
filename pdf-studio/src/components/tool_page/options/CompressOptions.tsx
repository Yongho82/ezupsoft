import React, { useState, useEffect } from 'react';
import { ICONS } from '../../Icons';
import { PdfFile, Tool } from '../../../types';
import { usePdfHandler, CompressionLevel } from '../../../hooks/usePdfHandler';
import { useLanguage } from '../../../contexts/LanguageContext';

type CompressOptionsProps = {
    files: PdfFile[];
    onProcessStart: (processFn: () => Promise<{ blob: Blob, filename: string } | null>, toolId: Tool['id']) => void;
};

export const CompressOptions = ({ files, onProcessStart }: CompressOptionsProps) => {
    const { compressPdf } = usePdfHandler();
    const [compressionLevel, setCompressionLevel] = useState<CompressionLevel>('recommended');
    const { t } = useLanguage();

    const singleFile = files.length === 1 ? files[0] : null;

    useEffect(() => {
        setCompressionLevel('recommended');
    }, [singleFile?.id]);

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleCompress = () => {
        if (!singleFile) return;

        const processFn = async () => {
            return await compressPdf(singleFile.file, compressionLevel);
        };
        
        onProcessStart(processFn, 'compress');
    };

    const compressionLevels: { id: CompressionLevel; name: string; description: string; }[] = [
        { id: 'strong', name: t('compressOptions.strong'), description: t('compressOptions.strongDesc') },
        { id: 'recommended', name: t('compressOptions.recommended'), description: t('compressOptions.recommendedDesc') },
        { id: 'quality', name: t('compressOptions.quality'), description: t('compressOptions.qualityDesc') },
    ];

    return (
        <>
            <h3 className="text-lg font-bold text-slate-800 mb-4">{t('compressOptions.levelTitle')}</h3>
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg mb-4 text-sm text-blue-800 flex items-start">
                <span className="w-5 h-5 mr-2 mt-0.5 shrink-0 text-blue-600">{ICONS.info}</span>
                <span>{t('compressOptions.infoText')}</span>
            </div>

            <div className="border border-slate-200 rounded-lg mb-6">
                {compressionLevels.map((level) => {
                    const isSelected = compressionLevel === level.id;
                    return (
                        <div
                            key={level.id}
                            onClick={() => singleFile && !singleFile.isLoading && setCompressionLevel(level.id)}
                            role="button"
                            tabIndex={0}
                            className={`p-4 cursor-pointer flex items-center border-b border-slate-200 last:border-b-0 transition-all duration-200 ${isSelected ? 'bg-blue-50' : 'hover:bg-slate-50'} ${!singleFile || singleFile.isLoading ? 'cursor-not-allowed opacity-60' : ''}`}
                        >
                            <div className="flex-grow">
                                <p className="font-semibold block text-slate-800">{level.name}</p>
                                <p className="text-sm text-slate-500 block">{level.description}</p>
                                {isSelected && singleFile && !singleFile.isLoading && (
                                    <p className="text-sm text-slate-500 mt-1">
                                        {t('compressOptions.original')}: {formatFileSize(singleFile.file.size)}
                                    </p>
                                )}
                            </div>
                            {isSelected && <span className="text-green-500 w-6 h-6 shrink-0">{ICONS.check}</span>}
                        </div>
                    );
                })}
            </div>
            <button 
                className="w-full mt-auto p-3 text-lg font-semibold border-none rounded-lg bg-red-600 text-white cursor-pointer transition-colors hover:bg-red-700 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center"
                onClick={handleCompress}
                disabled={!singleFile || singleFile.isLoading}
            >
                {t('compressOptions.compressButton')}
                <span className="w-6 h-6 ml-2">{ICONS.go}</span>
            </button>
        </>
    );
};