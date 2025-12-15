import React, { useState, useEffect } from 'react';
import { ICONS } from '../../Icons';
import { PdfFile, SplitRange, Tool } from '../../../types';
import { usePdfHandler } from '../../../hooks/usePdfHandler';
import { useLanguage } from '../../../contexts/LanguageContext';

type SplitOptionsProps = {
    files: PdfFile[];
    activeSplitTab: 'range' | 'page' | 'size';
    onSplitTabChange: (tab: 'range' | 'page' | 'size') => void;
    selectedPages: number[];
    setSelectedPages: React.Dispatch<React.SetStateAction<number[]>>;
    onProcessStart: (processFn: () => Promise<{ blob: Blob, filename: string } | null>, toolId: Tool['id']) => void;
}

const parsePagesInput = (input: string, maxPage: number): number[] => {
    const pages = new Set<number>();
    if (!maxPage) return [];

    input.split(',').forEach(part => {
        part = part.trim();
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(p => parseInt(p.trim(), 10));
            if (!isNaN(start) && !isNaN(end) && start <= end) {
                for (let i = start; i <= end; i++) {
                    if (i > 0 && i <= maxPage) pages.add(i);
                }
            }
        } else {
            const page = parseInt(part, 10);
            if (!isNaN(page) && page > 0 && page <= maxPage) {
                pages.add(page);
            }
        }
    });
    return Array.from(pages).sort((a, b) => a - b);
};

const formatPagesArray = (pages: number[]): string => {
    if (pages.length === 0) return '';
    const sorted = [...pages].sort((a, b) => a - b);
    const ranges: string[] = [];
    let start = sorted[0];
    let end = sorted[0];

    for (let i = 1; i < sorted.length; i++) {
        if (sorted[i] === end + 1) {
            end = sorted[i];
        } else {
            ranges.push(start === end ? `${start}` : `${start}-${end}`);
            start = end = sorted[i];
        }
    }
    ranges.push(start === end ? `${start}` : `${start}-${end}`);
    return ranges.join(', ');
};

export const SplitOptions = ({ files, activeSplitTab, onSplitTabChange, selectedPages, setSelectedPages, onProcessStart }: SplitOptionsProps) => {
    const { splitPdfByRanges, splitPdfByPages, splitPdfBySize } = usePdfHandler();
    const { t } = useLanguage();

    // State for split tool (range mode)
    const [rangeSplitMode, setRangeSplitMode] = useState<'custom' | 'fixed'>('custom');
    const [fixedRangeSize, setFixedRangeSize] = useState<number>(1);
    const [ranges, setRanges] = useState<SplitRange[]>([{ id: crypto.randomUUID(), from: 1, to: 1 }]);
    const [mergeSplitRanges, setMergeSplitRanges] = useState(false);
    
    // State for split tool (page mode)
    const [extractMode, setExtractMode] = useState<'select' | 'all'>('select');
    const [pagesInput, setPagesInput] = useState('');
    const [mergePages, setMergePages] = useState(false);

    // State for split tool (size mode)
    const [splitSizeValue, setSplitSizeValue] = useState<number>(859);
    const [splitSizeUnit, setSplitSizeUnit] = useState<'KB' | 'MB'>('KB');
    const [allowCompression, setAllowCompression] = useState(true);

    const singleFile = files.length === 1 ? files[0] : null;
    
    useEffect(() => {
        if (singleFile && singleFile.pageCount > 0 && !singleFile.isLoading) {
             setRanges([{ id: crypto.randomUUID(), from: 1, to: singleFile.pageCount }]);
             setFixedRangeSize(1);
        } else {
             setRanges([{ id: crypto.randomUUID(), from: 1, to: 1 }]);
             setFixedRangeSize(1);
        }
        setRangeSplitMode('custom');
        setExtractMode('select');
        setMergePages(false);
        setSplitSizeValue(859);
        setSplitSizeUnit('KB');
        setAllowCompression(true);
    }, [singleFile?.id, singleFile?.pageCount, singleFile?.isLoading]);
    
    useEffect(() => {
        setPagesInput(formatPagesArray(selectedPages));
    }, [selectedPages]);

    const handleAddRange = () => {
        const newRange: SplitRange = { id: crypto.randomUUID(), from: 1, to: singleFile?.pageCount || 1 };
        setRanges(prev => [...prev, newRange]);
    };

    const handleRemoveRange = (idToRemove: string) => {
        setRanges(prev => prev.filter(r => r.id !== idToRemove));
    };

    const handleRangeChange = (id: string, field: 'from' | 'to', value: string) => {
        const numValue = parseInt(value, 10);
        setRanges(prev => prev.map(r => r.id === id ? { ...r, [field]: isNaN(numValue) || numValue < 1 ? 1 : numValue } : r));
    };
    
    const handleRangeSplit = () => {
        if (!singleFile) return;
        
        const processFn = async () => {
            if (rangeSplitMode === 'custom') {
                for (const range of ranges) {
                    if (range.from <= 0 || range.to <= 0) {
                        alert(t('alert.pageNumberMin'));
                        return null;
                    }
                    if (range.from > range.to) {
                        alert(t('alert.rangeStartEndError', { index: ranges.indexOf(range) + 1 }));
                        return null;
                    }
                    if (range.to > singleFile.pageCount) {
                        alert(t('alert.rangeOutOfBounds', { index: ranges.indexOf(range) + 1, pageCount: singleFile.pageCount }));
                        return null;
                    }
                }
                return await splitPdfByRanges(singleFile.file, ranges, mergeSplitRanges);
            } else { // Fixed range mode
                if (fixedRangeSize <= 0) {
                    alert(t('alert.pageRangeMin'));
                    return null;
                }
                if (fixedRangeSize > singleFile.pageCount) {
                    alert(t('alert.splitPageCountError', { pageCount: singleFile.pageCount }));
                    return null;
                }
                const calculatedRanges: { from: number; to: number }[] = [];
                for (let i = 1; i <= singleFile.pageCount; i += fixedRangeSize) {
                    const to = Math.min(i + fixedRangeSize - 1, singleFile.pageCount);
                    calculatedRanges.push({ from: i, to });
                }
                return await splitPdfByRanges(singleFile.file, calculatedRanges, false);
            }
        };

        onProcessStart(processFn, 'split');
    };

    const handlePagesInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setPagesInput(newText);
        const parsed = parsePagesInput(newText, singleFile?.pageCount || 0);
        if (JSON.stringify(parsed) !== JSON.stringify(selectedPages)) {
            setSelectedPages(parsed);
        }
    };
    
    const handlePageSplit = () => {
        if (!singleFile) return;
        
        const processFn = async () => {
            let pagesToSplit = extractMode === 'all' && singleFile 
                ? Array.from({length: singleFile.pageCount}, (_, i) => i + 1)
                : selectedPages;
            return await splitPdfByPages(singleFile.file, pagesToSplit, mergePages);
        };

        onProcessStart(processFn, 'split');
    }

    const handleSizeSplit = () => {
        if (!singleFile) return;

        const processFn = async () => {
            const multiplier = splitSizeUnit === 'KB' ? 1024 : 1024 * 1024;
            const maxBytes = splitSizeValue * multiplier;
            if (maxBytes <= 0) {
                alert(t('alert.maxSizeMin'));
                return null;
            }
            return await splitPdfBySize(singleFile.file, maxBytes, allowCompression);
        };
        
        onProcessStart(processFn, 'split');
    };
    
    const getSplitButtonHandler = () => {
        switch (activeSplitTab) {
            case 'range': return handleRangeSplit;
            case 'page': return handlePageSplit;
            case 'size': return handleSizeSplit;
            default: return () => {};
        }
    }
    
    const isSplitButtonDisabled = () => {
        if (!singleFile || singleFile.isLoading) return true;
        if (activeSplitTab === 'page' && extractMode === 'select' && selectedPages.length === 0) return true;
        return false;
    }

    return (
        <>
            <div className="flex border border-slate-200 rounded-lg mb-4 text-center">
                <button onClick={() => onSplitTabChange('range')} className={`relative flex-1 p-3 rounded-l-lg border-r border-slate-200 transition-colors ${activeSplitTab === 'range' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>
                    {activeSplitTab === 'range' && <span className="absolute top-2 right-2 text-green-500 w-5 h-5">{ICONS.check}</span>}
                    <span className={`w-6 h-6 mx-auto block ${activeSplitTab === 'range' ? 'text-blue-600' : 'text-slate-500'}`}>{ICONS.splitRange}</span>
                    <span className={`text-sm font-semibold ${activeSplitTab === 'range' ? 'text-blue-600' : 'text-slate-600'}`}>{t('splitOptions.rangeTab')}</span>
                </button>
                <button onClick={() => onSplitTabChange('page')} className={`relative flex-1 p-3 border-r border-slate-200 transition-colors ${activeSplitTab === 'page' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>
                    {activeSplitTab === 'page' && <span className="absolute top-2 right-2 text-green-500 w-5 h-5">{ICONS.check}</span>}
                    <span className={`w-6 h-6 mx-auto block ${activeSplitTab === 'page' ? 'text-blue-600' : 'text-slate-500'}`}>{ICONS.splitPage}</span>
                    <span className={`text-sm font-semibold ${activeSplitTab === 'page' ? 'text-blue-600' : 'text-slate-600'}`}>{t('splitOptions.pageTab')}</span>
                </button>
                <button onClick={() => onSplitTabChange('size')} className={`relative flex-1 p-3 rounded-r-lg cursor-pointer transition-colors ${activeSplitTab === 'size' ? 'bg-slate-100' : 'hover:bg-slate-50'}`}>
                    {activeSplitTab === 'size' && <span className="absolute top-2 right-2 text-green-500 w-5 h-5">{ICONS.check}</span>}
                    <span className={`w-6 h-6 mx-auto block ${activeSplitTab === 'size' ? 'text-blue-600' : 'text-slate-500'}`}>{ICONS.splitSize}</span>
                    <span className={`text-sm font-semibold ${activeSplitTab === 'size' ? 'text-blue-600' : 'text-slate-600'}`}>{t('splitOptions.sizeTab')}</span>
                 </button>
            </div>
            
            <div className="flex-grow flex flex-col">
                {activeSplitTab === 'range' && (
                    <>
                        <div className="text-sm font-semibold text-slate-700 mb-2">{t('splitOptions.rangeMode')}:</div>
                        <div className="flex space-x-2 mb-4">
                            <button 
                                onClick={() => setRangeSplitMode('custom')}
                                className={`flex-1 p-2 rounded-md text-sm ${rangeSplitMode === 'custom' ? 'border-2 border-red-500 bg-red-50 text-red-700 font-bold' : 'border border-slate-300 bg-slate-50 text-slate-500 font-semibold hover:bg-slate-100'}`}
                            >
                                {t('splitOptions.customRange')}
                            </button>
                            <button 
                                onClick={() => setRangeSplitMode('fixed')}
                                className={`flex-1 p-2 rounded-md text-sm ${rangeSplitMode === 'fixed' ? 'border-2 border-red-500 bg-red-50 text-red-700 font-bold' : 'border border-slate-300 bg-slate-50 text-slate-500 font-semibold hover:bg-slate-100'}`}
                            >
                                {t('splitOptions.fixedRange')}
                            </button>
                        </div>
                        
                        {rangeSplitMode === 'custom' ? (
                            <>
                                <div className="flex-grow overflow-auto pr-2 -mr-2 space-y-3 mb-4">
                                    {ranges.map((range, index) => (
                                        <div key={range.id} className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-semibold text-slate-600">{t('splitOptions.rangeLabel', { index: index + 1 })}</span>
                                                {ranges.length > 1 && (
                                                    <button onClick={() => handleRemoveRange(range.id)} className="text-slate-400 hover:text-red-500">
                                                        <span className="w-5 h-5">{ICONS.close}</span>
                                                    </button>
                                                )}
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <input type="number" value={range.from} onChange={(e) => handleRangeChange(range.id, 'from', e.target.value)} className="w-full p-2 border border-slate-300 rounded-md text-center" min="1" max={singleFile?.pageCount} disabled={!singleFile || singleFile.isLoading}/>
                                                <span className="text-slate-500">-</span>
                                                <input type="number" value={range.to} onChange={(e) => handleRangeChange(range.id, 'to', e.target.value)} className="w-full p-2 border border-slate-300 rounded-md text-center" min="1" max={singleFile?.pageCount} disabled={!singleFile || singleFile.isLoading}/>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <button onClick={handleAddRange} className="w-full p-2 mb-4 text-sm font-semibold border-dashed border-2 border-slate-300 text-slate-600 rounded-lg hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400" disabled={!singleFile || singleFile.isLoading}>
                                    {t('splitOptions.addRange')}
                                </button>
                                <div className="mb-6">
                                    <label className="flex items-center text-sm text-slate-700">
                                        <input type="checkbox" checked={mergeSplitRanges} onChange={e => setMergeSplitRanges(e.target.checked)} className="w-4 h-4 mr-2 accent-blue-600" disabled={!singleFile || singleFile.isLoading} />
                                        {t('splitOptions.mergeRanges')}
                                    </label>
                                </div>
                            </>
                        ) : (
                            <div className="flex-grow mb-4">
                                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                    <label htmlFor="fixed-range-input" className="font-semibold text-slate-600 block mb-2">{t('splitOptions.fixedRangeLabel')}</label>
                                    <div className="flex items-center space-x-2">
                                        <input id="fixed-range-input" type="number" value={fixedRangeSize} onChange={(e) => setFixedRangeSize(parseInt(e.target.value, 10) || 1)} className="w-full p-2 border border-slate-300 rounded-md text-center" min="1" max={singleFile?.pageCount} disabled={!singleFile || singleFile.isLoading} />
                                        <span className="text-slate-500 shrink-0">{t('splitOptions.pagesPerSplit')}</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
                
                {activeSplitTab === 'page' && (
                    <>
                        <div className="text-sm font-semibold text-slate-700 mb-2">{t('splitOptions.extractMode')}:</div>
                        <div className="flex space-x-2 mb-4">
                            <button onClick={() => setExtractMode('all')} className={`flex-1 p-2 rounded-md text-sm ${extractMode === 'all' ? 'border-2 border-red-500 bg-red-50 text-red-700 font-bold' : 'border border-slate-300 bg-slate-50 text-slate-500 font-semibold hover:bg-slate-100'}`}>
                                {t('splitOptions.extractAll')}
                            </button>
                            <button onClick={() => setExtractMode('select')} className={`flex-1 p-2 rounded-md text-sm ${extractMode === 'select' ? 'border-2 border-red-500 bg-red-50 text-red-700 font-bold' : 'border border-slate-300 bg-slate-50 text-slate-500 font-semibold hover:bg-slate-100'}`}>
                                {t('splitOptions.selectPages')}
                            </button>
                        </div>
                        
                        {extractMode === 'select' && (
                            <div className="mb-4">
                                <label htmlFor="pages-input" className="text-sm font-semibold text-slate-700 mb-2 block">{t('splitOptions.pagesToExtract')}:</label>
                                <input id="pages-input" type="text" value={pagesInput} onChange={handlePagesInputChange} placeholder={t('splitOptions.pagesPlaceholder')} className="w-full p-2 border border-slate-300 rounded-md" disabled={!singleFile || singleFile.isLoading} />
                            </div>
                        )}
                        
                        <div className="mb-4">
                            <label className="flex items-center text-sm text-slate-700">
                                <input type="checkbox" checked={mergePages} onChange={e => setMergePages(e.target.checked)} className="w-4 h-4 mr-2 accent-blue-600" disabled={!singleFile || singleFile.isLoading} />
                                {t('splitOptions.mergeExtracted')}
                            </label>
                        </div>

                        {(() => {
                            const pagesToProcess = extractMode === 'all' ? (singleFile ? Array.from({length: singleFile.pageCount}, (_, i) => i + 1) : []) : selectedPages;
                            const numFilesToCreate = mergePages ? (pagesToProcess.length > 0 ? 1 : 0) : pagesToProcess.length;
                            
                            if (numFilesToCreate > 0) {
                                return (
                                    <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-lg mb-4">
                                    {mergePages 
                                            ? t('splitOptions.mergeResult', { count: pagesToProcess.length })
                                            : t('splitOptions.separateResult', { count: numFilesToCreate })}
                                    </div>
                                );
                            }
                            return null;
                        })()}
                    </>
                )}

                {activeSplitTab === 'size' && (
                    <>
                        <div className="flex-grow space-y-4 mb-4">
                            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                                <label htmlFor="size-split-input" className="font-semibold text-slate-600 block mb-2">{t('splitOptions.maxSizePerFile')}:</label>
                                <div className="flex items-center space-x-2">
                                    <input 
                                        id="size-split-input" 
                                        type="number" 
                                        value={splitSizeValue} 
                                        onChange={(e) => setSplitSizeValue(parseInt(e.target.value, 10) || 0)} 
                                        className="w-full p-2 border border-slate-300 rounded-md text-center" 
                                        min="1" 
                                        disabled={!singleFile || singleFile.isLoading} 
                                    />
                                    <div className="flex rounded-md border border-slate-300 overflow-hidden">
                                        <button 
                                            onClick={() => setSplitSizeUnit('KB')} 
                                            className={`px-3 py-2 text-sm font-semibold ${splitSizeUnit === 'KB' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                                        >
                                            KB
                                        </button>
                                        <button 
                                            onClick={() => setSplitSizeUnit('MB')} 
                                            className={`px-3 py-2 text-sm font-semibold border-l border-slate-300 ${splitSizeUnit === 'MB' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'}`}
                                        >
                                            MB
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-lg">
                                {t('splitOptions.sizeSplitInfo', { size: splitSizeValue, unit: splitSizeUnit })}
                            </div>

                            <div className="mb-6">
                                <label className="flex items-center text-sm text-slate-700">
                                    <input 
                                        type="checkbox" 
                                        checked={allowCompression} 
                                        onChange={e => setAllowCompression(e.target.checked)} 
                                        className="w-4 h-4 mr-2 accent-blue-600" 
                                        disabled={!singleFile || singleFile.isLoading} 
                                    />
                                    {t('splitOptions.allowCompression')}
                                </label>
                            </div>
                        </div>
                    </>
                )}
                 <button onClick={getSplitButtonHandler()} disabled={isSplitButtonDisabled()} className="w-full mt-auto p-3 text-lg font-semibold border-none rounded-lg bg-red-600 text-white cursor-pointer transition-colors hover:bg-red-700 disabled:bg-slate-400 disabled:cursor-not-allowed flex items-center justify-center">
                    {t('splitOptions.splitButton')}
                    <span className="w-6 h-6 ml-2">{ICONS.go}</span>
                </button>
            </div>
        </>
    );
};