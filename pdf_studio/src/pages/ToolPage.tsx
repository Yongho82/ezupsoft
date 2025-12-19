
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Tool, PdfFile } from '../types';
import { FilePreview } from '../components/tool_page/FilePreview';
import { PageGridView } from '../components/tool_page/PageGridView';
import { OptionsPanel } from '../components/tool_page/OptionsPanel';
import { FloatingActionButtons } from '../components/tool_page/FloatingActionButtons';
import { useLanguage } from '../contexts/LanguageContext';

type ToolPageProps = {
    files: PdfFile[];
    activeToolId: Tool['id'];
    activeSubTool: string | null;
    onRemoveFile: (id: string) => void;
    onAddFiles: (files: FileList | null) => void;
    onReorderFiles: (dragIndex: number, hoverIndex: number) => void;
    onProcessStart: (processFn: () => Promise<{ blob: Blob, filename: string } | null>, toolId: Tool['id'], subTool?: string) => void;
}

export const ToolPage = ({ files, activeToolId, activeSubTool, onRemoveFile, onAddFiles, onReorderFiles, onProcessStart }: ToolPageProps) => {
    const dragItemIndex = useRef<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const throttleTimer = useRef<number | null>(null);

    const [activeSplitTab, setActiveSplitTab] = useState<'range' | 'page' | 'size'>('range');
    const [selectedPages, setSelectedPages] = useState<number[]>([]);
    const { t } = useLanguage();

    useEffect(() => {
        if (activeToolId === 'split') {
            setActiveSplitTab('page');
        } else {
            setActiveSplitTab('range');
        }
        setSelectedPages([]);
    }, [activeToolId, files[0]?.id]);

    const handlePageSelect = (pageNumber: number) => {
        setSelectedPages(prev =>
            prev.includes(pageNumber)
                ? prev.filter(p => p !== pageNumber)
                : [...prev, pageNumber].sort((a, b) => a - b)
        );
    };

    const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const previousPositions = useRef<{ [key: string]: DOMRect }>({});

    useEffect(() => {
        const fileIds = new Set(files.map(f => f.id));
        Object.keys(itemRefs.current).forEach(id => {
            if (!fileIds.has(id)) {
                delete itemRefs.current[id];
                delete previousPositions.current[id];
            }
        });
    }, [files]);

    useLayoutEffect(() => {
        files.forEach(file => {
            const id = file.id;
            const element = itemRefs.current[id];
            if (!element) return;

            const newBoundingBox = element.getBoundingClientRect();
            const prevBoundingBox = previousPositions.current[id];

            if (prevBoundingBox) {
                const deltaX = prevBoundingBox.left - newBoundingBox.left;
                const deltaY = prevBoundingBox.top - newBoundingBox.top;

                if (Math.abs(deltaX) > 1 || Math.abs(deltaY) > 1) {
                    requestAnimationFrame(() => {
                        element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
                        element.style.transition = 'transform 0s';

                        requestAnimationFrame(() => {
                            element.style.transform = '';
                            element.style.transition = 'transform 300ms ease-in-out';
                        });
                    });
                }
            }
            previousPositions.current[id] = newBoundingBox;
        });
    }, [files]);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        dragItemIndex.current = index;
        const img = new Image();
        img.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        e.dataTransfer.setDragImage(img, 0, 0);

        setTimeout(() => {
            setIsDragging(true);
        }, 0);

        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, hoverIndex: number) => {
        e.preventDefault();

        if (throttleTimer.current) {
            return;
        }

        const dragIndex = dragItemIndex.current;
        if (dragIndex === null || dragIndex === hoverIndex) {
            return;
        }

        onReorderFiles(dragIndex, hoverIndex);
        dragItemIndex.current = hoverIndex;

        throttleTimer.current = window.setTimeout(() => {
            throttleTimer.current = null;
        }, 200);
    };

    const handleDragEnd = () => {
        dragItemIndex.current = null;
        setIsDragging(false);
        if (throttleTimer.current) {
            clearTimeout(throttleTimer.current);
            throttleTimer.current = null;
        }
    };

    const singleFile = files.length === 1 ? files[0] : null;

    const renderMainContent = () => {
        if (activeToolId === 'split' && activeSplitTab === 'page' && singleFile && !singleFile.isLoading) {
            return <PageGridView file={singleFile} selectedPages={selectedPages} onPageSelect={handlePageSelect} />;
        }

        const isSingleFileLargeLayout = (
            (activeToolId === 'compress' || activeToolId === 'convert' || activeToolId === 'watermark') ||
            (activeToolId === 'split' && activeSplitTab !== 'page')
        ) && singleFile;

        if (isSingleFileLargeLayout) {
            return (
                <div className="flex justify-center items-center w-full h-full">
                    <FilePreview file={singleFile} onRemoveFile={onRemoveFile} index={1} size="large" />
                </div>
            );
        }

        return (
            <div className="flex flex-wrap gap-x-8 gap-y-12 justify-center w-full h-full content-start">
                {files.map((file, index) => (
                    <div
                        key={file.id}
                        ref={el => { if (el) itemRefs.current[file.id] = el; }}
                        draggable={activeToolId === 'merge'}
                        onDragStart={(e) => activeToolId === 'merge' && handleDragStart(e, index)}
                        onDragOver={(e) => activeToolId === 'merge' && handleDragOver(e, index)}
                        onDragEnd={activeToolId === 'merge' ? handleDragEnd : undefined}
                        className={`transition-opacity duration-300 ${activeToolId === 'merge' ? 'cursor-move' : ''} ${isDragging && dragItemIndex.current === index ? 'opacity-40' : ''}`}
                    >
                        <FilePreview file={file} onRemoveFile={onRemoveFile} index={index + 1} />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="flex flex-col lg:flex-row w-full h-full relative overflow-hidden">
            <main className="flex-grow flex p-4 lg:p-8 overflow-auto bg-white relative">
                {renderMainContent()}

                {(activeToolId === 'merge' || (['compress', 'split', 'watermark'].includes(activeToolId) && files.length > 0)) &&
                    <FloatingActionButtons
                        onAddFiles={onAddFiles}
                        fileCount={files.length}
                        activeToolId={activeToolId}
                    />
                }
            </main>

            <OptionsPanel
                files={files}
                activeToolId={activeToolId}
                activeSubTool={activeSubTool}
                activeSplitTab={activeSplitTab}
                onSplitTabChange={setActiveSplitTab}
                selectedPages={selectedPages}
                setSelectedPages={setSelectedPages}
                onProcessStart={onProcessStart}
            />
        </div>
    );
};
