import React, { useState, useCallback, useEffect, useRef } from 'react';

interface MainLayoutProps {
    view: 'split' | 'editor' | 'preview';
    editorPane: React.ReactNode;
    previewPane: React.ReactNode;
    previewScale: number;
    pageWidth: number;
    pageHeight: number;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
    view,
    editorPane,
    previewPane,
    previewScale,
    pageWidth,
    pageHeight,
}) => {
    const [editorWidth, setEditorWidth] = useState(30);
    const [isDragging, setIsDragging] = useState(false);
    const previewContainerRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (!isDragging) return;
        const newEditorWidth = (e.clientX / window.innerWidth) * 100;
        if (newEditorWidth > 10 && newEditorWidth < 90) {
            setEditorWidth(newEditorWidth);
        }
    }, [isDragging]);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, handleMouseMove, handleMouseUp]);
    
    const scaledPreview = (
        <div style={{
            width: `${pageWidth * (previewScale / 100)}px`,
            height: `${pageHeight * (previewScale / 100)}px`,
            flexShrink: 0,
        }}>
            <div style={{
                width: `${pageWidth}px`,
                height: `${pageHeight}px`,
                transform: `scale(${previewScale / 100})`,
                transformOrigin: 'top left',
            }}>
                {previewPane}
            </div>
        </div>
    );

    return (
        <main className="flex-grow flex flex-row p-4 overflow-hidden min-h-0">
            {view === 'editor' && <div className="w-full h-full">{editorPane}</div>}
            {view === 'preview' && <div ref={previewContainerRef} className="w-full h-full overflow-auto bg-gray-200 flex items-start justify-center p-8">{scaledPreview}</div>}
            {view === 'split' && (
                <>
                    <div className={`h-full ${isDragging ? 'pointer-events-none' : ''}`} style={{ width: `calc(${editorWidth}% - 4px)` }}>
                        {editorPane}
                    </div>
                    <div
                        className="w-2 cursor-col-resize bg-gray-300 hover:bg-blue-500 transition-colors rounded-full"
                        onMouseDown={handleMouseDown}
                    />
                    <div ref={previewContainerRef} className={`h-full overflow-auto bg-gray-200 flex items-start justify-center p-8 ${isDragging ? 'pointer-events-none' : ''}`} style={{ width: `calc(${100 - editorWidth}% - 4px)` }}>
                        {scaledPreview}
                    </div>
                </>
            )}
        </main>
    );
};