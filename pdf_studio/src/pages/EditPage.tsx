
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PdfFile, Tool } from '../types';
import { PdfViewer } from '../components/edit_page/PdfViewer';
import { usePdfHandler } from '../hooks/usePdfHandler';
import { ICONS } from '../components/Icons';
import { Ribbon } from '../components/edit_page/Ribbon';
import { useLanguage } from '../contexts/LanguageContext';
import { ShapeType } from '../components/edit_page/ShapesDropdown';
import { RightSidebar } from '../components/edit_page/RightSidebar';
import { usePageObjects } from '../hooks/usePageObjects';
import { downloadPdf } from '../utils/pdfDownloader';
import { TextObject, ImageObject, ShapeObject, NormalizedLine } from '../types/editPageTypes';
import { WatermarkHeader } from '../components/edit_page/WatermarkHeader';
import { SignatureModal } from '../components/edit_page/SignatureModal';

declare const window: any;

type EditPageProps = {
    files: PdfFile[];
    onRemoveFile: (id: string) => void;
    onAddFiles: (files: FileList | null) => void;
    onUpdateFile: (fileId: string, newFile: File) => void;
    onSwitchTool: (toolId: Tool['id'], file: PdfFile) => void;
    activeToolId: Tool['id'];
    onDirtyChange?: (isDirty: boolean) => void;
}

const trimImage = (src: string): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (!ctx) {
                resolve(src); 
                return;
            }
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            let minX = canvas.width, minY = canvas.height, maxX = 0, maxY = 0;
            let found = false;

            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const alpha = data[(y * canvas.width + x) * 4 + 3];
                    if (alpha > 10) { 
                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                        found = true;
                    }
                }
            }

            if (!found) {
                resolve(src);
                return;
            }

            const padding = 2;
            const width = Math.min(canvas.width, (maxX - minX) + 1 + (padding * 2));
            const height = Math.min(canvas.height, (maxY - minY) + 1 + (padding * 2));
            
            if(width <= 0 || height <= 0) {
                resolve(src);
                return;
            }

            const trimCanvas = document.createElement('canvas');
            trimCanvas.width = width;
            trimCanvas.height = height;
            const trimCtx = trimCanvas.getContext('2d');
            if (!trimCtx) {
                resolve(src);
                return;
            }
            const drawX = Math.max(0, minX - padding);
            const drawY = Math.max(0, minY - padding);
            
            trimCtx.drawImage(canvas, drawX, drawY, width, height, 0, 0, width, height);
            resolve(trimCanvas.toDataURL('image/png'));
        };
        img.onerror = () => resolve(src);
        img.src = src;
    });
};

const tintImage = (src: string, color: string): Promise<string> => {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                resolve(src);
                return;
            }
            ctx.drawImage(img, 0, 0);
            ctx.globalCompositeOperation = 'source-in';
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = () => resolve(src);
        img.src = src;
    });
};

export const EditPage = ({ files, onRemoveFile, onAddFiles, onUpdateFile, onSwitchTool, activeToolId, onDirtyChange }: EditPageProps) => {
    const { t } = useLanguage();
    const { deletePage, duplicatePage, rotatePage } = usePdfHandler();
    const addFileInputRef = useRef<HTMLInputElement>(null);
    
    const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageRotations, setPageRotations] = useState<Record<number, number>>({});
    const [activeTool, setActiveTool] = useState('select');
    const [selectedObjectId, setSelectedObjectId] = useState<{ id: string, type: 'drawing' | 'text' | 'image' | 'shape' } | null>(null);
    const [modalMessage, setModalMessage] = useState<string | null>(null);
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState(false);
    const [rightSidebarView, setRightSidebarView] = useState<'files' | 'signatures'>('files');
    const [savedSignatures, setSavedSignatures] = useState<string[]>([]);
    
    const [pageDimensions, setPageDimensions] = useState<{width: number, height: number} | null>(null);

    const {
        drawingsByPage, textObjectsByPage, imageObjectsByPage, shapeObjectsByPage,
        addObject, updateObject, deleteObject,
        handleUndo, handleRedo, resetPageObjects,
        resetAllObjects, recordHistory, getCurrentPageState,
        canUndo, canRedo,
        isDirty
    } = usePageObjects();

    useEffect(() => {
        if (onDirtyChange) {
            onDirtyChange(isDirty);
        }
    }, [isDirty, onDirtyChange]);

    const [defaultTextStyle, setDefaultTextStyle] = useState<Omit<TextObject, 'id' | 'text' | 'x' | 'y' | 'width' | 'height'>>({
        fontFamily: 'NotoSansKR-Regular', fontSize: 16, color: '#000000', backgroundColor: 'transparent',
        isBold: false, isItalic: false, textAlign: 'left',
    });
    
    const [defaultDrawingStyle, setDefaultDrawingStyle] = useState({
        color: '#000000', strokeWidth: 2, dashArray: [] as number[],
    });

    const [defaultShapeStyle, setDefaultShapeStyle] = useState<Omit<ShapeObject, 'id' | 'shapeType' | 'x' | 'y' | 'width' | 'height'>>({
        fillColor: 'transparent', strokeColor: '#000000', strokeWidth: 2, rotation: 0, opacity: 1, strokeDashArray: [],
    });
    
    useEffect(() => { setSelectedFileId(files[0]?.id || null); }, [files]);
    useEffect(() => {
        setCurrentPage(1);
        setPageRotations({});
        setActiveTool('select');
        setSelectedObjectId(null);
        resetAllObjects();
        setRightSidebarView('files');
        setPageDimensions(null);
    }, [selectedFileId, resetAllObjects]);

    const handleUpdateObjectEnd = useCallback(() => {
        const currentState = getCurrentPageState(currentPage);
        recordHistory(currentPage, currentState);
    }, [currentPage, getCurrentPageState, recordHistory]);
    
    const handleDeleteObject = useCallback((id: string, type: 'drawing' | 'text' | 'image' | 'shape') => {
        deleteObject(currentPage, id, type);
        setSelectedObjectId(null);
    }, [currentPage, deleteObject]);

    const handleCopyObject = useCallback((id: string, type: 'drawing' | 'text' | 'image' | 'shape') => {
        let objectToCopy;
        if (type === 'text') objectToCopy = (textObjectsByPage[currentPage] || []).find(obj => obj.id === id);
        if (type === 'image') objectToCopy = (imageObjectsByPage[currentPage] || []).find(obj => obj.id === id);
        if (type === 'shape') objectToCopy = (shapeObjectsByPage[currentPage] || []).find(obj => obj.id === id);

        if (!objectToCopy) return;
        const newObject = {
            ...objectToCopy,
            id: crypto.randomUUID(),
            x: objectToCopy.x + 0.02,
            y: objectToCopy.y + 0.02,
        };
        addObject(currentPage, type, newObject as any);
        setSelectedObjectId({ id: newObject.id, type });
    }, [currentPage, textObjectsByPage, imageObjectsByPage, shapeObjectsByPage, addObject]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedObjectId) {
                const activeElement = document.activeElement as HTMLElement;
                if (activeElement && (activeElement.tagName === 'TEXTAREA' || activeElement.tagName === 'INPUT')) return;
                e.preventDefault(); 
                handleDeleteObject(selectedObjectId.id, selectedObjectId.type);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedObjectId, handleDeleteObject]);

    const handleAddDrawing = (newDrawing: Omit<NormalizedLine, 'id'>) => {
        addObject(currentPage, 'drawing', { ...newDrawing, id: crypto.randomUUID() });
    };
    
    const handleAddText = (newText: Omit<TextObject, 'id'>) => {
        const textWithId = { ...newText, id: crypto.randomUUID() };
        addObject(currentPage, 'text', textWithId);
        setSelectedObjectId({ id: textWithId.id, type: 'text' });
        setActiveTool('select');
    };
    
    const handleAddImage = useCallback(async (file: File) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const src = e.target?.result as string;
            if (!src) return;
            // Standard upload - trim whitespace
            addImageObjectToPage(src, false);
        };
        reader.readAsDataURL(file);
    }, []);

    const addImageObjectToPage = useCallback(async (imageSrc: string, skipTrim: boolean = false) => {
        const trimmedSrc = skipTrim ? imageSrc : await trimImage(imageSrc);
        
        const img = new Image();
        img.onload = () => {
            const imgRatio = img.width / img.height;
            
            const pageW = pageDimensions?.width || 600;
            const pageH = pageDimensions?.height || 840;
            const pageRatio = pageW / pageH;
            
            let targetWidthPct = 0.25; 
            let targetHeightPct = targetWidthPct * (pageRatio / imgRatio);

            if (targetHeightPct > 0.15) {
                targetHeightPct = 0.15;
                targetWidthPct = targetHeightPct * (imgRatio / pageRatio);
            }

            if (targetWidthPct < 0.05) targetWidthPct = 0.05; 
            if (targetWidthPct > 0.8) targetWidthPct = 0.8; 

            const newImage: ImageObject = {
                id: crypto.randomUUID(),
                originalSrc: trimmedSrc,
                displaySrc: trimmedSrc,
                x: 0.5 - (targetWidthPct / 2), 
                y: 0.5 - (targetHeightPct / 2), 
                width: targetWidthPct,
                height: targetHeightPct,
                fileType: 'image/png', 
                opacity: 1,
                isSignature: true,
            };
            addObject(currentPage, 'image', newImage);
            setSelectedObjectId({ id: newImage.id, type: 'image' });
            setActiveTool('select');
        };
        img.src = trimmedSrc;
    }, [addObject, currentPage, pageDimensions]);
    
    const handleAddSignature = (signatureImage: string) => {
        if (!savedSignatures.includes(signatureImage)) {
            setSavedSignatures(prev => [...prev, signatureImage]);
        }
        // SignatureModal images are already trimmed
        addImageObjectToPage(signatureImage, true);
        setIsSignatureModalOpen(false);
    };

    const handleDeleteSignature = (index: number) => {
        setSavedSignatures(prev => prev.filter((_, i) => i !== index));
    };
    
    const handleAddShape = (shapeType: ShapeType) => {
        let shapeProps: Partial<ShapeObject> = { width: 0.3, height: 0.3 };
        let styleOverride: Partial<ShapeObject> = {};

        if (shapeType === 'checkmark' || shapeType === 'crossmark') {
            shapeProps = { width: 0.05, height: 0.05 };
        }
        
        if (shapeType.startsWith('stamp-')) {
             shapeProps = { width: 0.3, height: 0.12 };
             let stampColor = '#000000';
             if (['stamp-approved', 'stamp-completed', 'stamp-paid'].includes(shapeType)) stampColor = '#16a34a';
             else if (['stamp-rejected', 'stamp-void', 'stamp-urgent'].includes(shapeType)) stampColor = '#dc2626';
             else if (['stamp-confidential', 'stamp-draft'].includes(shapeType)) stampColor = '#4b5563';
             
             const text = shapeType.replace('stamp-', '').toUpperCase();
             styleOverride = {
                 strokeColor: stampColor, textColor: stampColor, fillColor: 'transparent', strokeWidth: 5,
                 fontSize: 24, isBold: true, text: text, fontFamily: 'Black Han Sans', opacity: 0.8
             };
        }

        const newShape: ShapeObject = {
            id: crypto.randomUUID(), 
            shapeType, 
            x: 0.35, y: 0.35, 
            ...shapeProps, 
            ...defaultShapeStyle,
            ...styleOverride 
        } as ShapeObject;
        addObject(currentPage, 'shape', newShape);
        setSelectedObjectId({ id: newShape.id, type: 'shape' });
        setActiveTool('select');
    };

    const handleToolSelect = (tool: string) => {
        setActiveTool(prev => (prev === tool ? 'select' : tool));
        setSelectedObjectId(null);
        setRightSidebarView('files');
    };

    const handlePageAction = async (action: 'delete' | 'duplicate' | 'rotate', fileId: string, pageNumber: number) => {
        const fileToUpdate = files.find(f => f.id === fileId);
        if (!fileToUpdate) return;
        
        if (action === 'rotate') {
            setPageRotations(prev => ({ ...prev, [pageNumber]: ((prev[pageNumber] || 0) + 90) % 360 }));
        }
        
        let newFile: File | null = null;
        if (action === 'delete') {
            if (fileToUpdate.pageCount <= 1) {
                setModalMessage(t('alert.deleteLastPageError'));
                return;
            }
            newFile = await deletePage(fileToUpdate.file, pageNumber);
        } else if (action === 'duplicate') {
            newFile = await duplicatePage(fileToUpdate.file, pageNumber);
        } else if (action === 'rotate') {
            newFile = await rotatePage(fileToUpdate.file, pageNumber, 90);
        }

        if (newFile) {
            onUpdateFile(fileId, newFile);
            if (action === 'delete') {
                 const pdf = await window.pdfjsLib.getDocument(await newFile.arrayBuffer()).promise;
                 if (currentPage > pdf.numPages) setCurrentPage(Math.max(1, pdf.numPages));
            }
        }
    };

    const handleDownload = async () => {
        const fileToDownload = files.find(f => f.id === selectedFileId);
        if (!fileToDownload) {
            alert(t('alert.noFileToDownload'));
            return;
        }
        await downloadPdf(fileToDownload, { drawingsByPage, textObjectsByPage, imageObjectsByPage, shapeObjectsByPage });
    };

    const handleAddFile = () => {
        addFileInputRef.current?.click();
    };
    
    const handleAddFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            onAddFiles(e.target.files);
            e.target.value = '';
        }
    };
    
    const handleOpenFile = () => {
        const fileToClose = files.find(f => f.id === selectedFileId);
        if (fileToClose) {
            onRemoveFile(fileToClose.id);
        }
    };

    const selectedFile = files.find(f => f.id === selectedFileId) || null;
    const canReset = Object.values(getCurrentPageState(currentPage)).some((arr: unknown) => Array.isArray(arr) && arr.length > 0);

    const selectedTextObject = selectedObjectId?.type === 'text'
        ? (textObjectsByPage[currentPage] || []).find(t => t.id === selectedObjectId.id)
        : undefined;
    const selectedDrawingObject = selectedObjectId?.type === 'drawing'
        ? (drawingsByPage[currentPage] || []).find(d => d.id === selectedObjectId.id)
        : undefined;
    const selectedShapeObject = selectedObjectId?.type === 'shape'
        ? (shapeObjectsByPage[currentPage] || []).find(s => s.id === selectedObjectId.id)
        : undefined;
    const selectedImageObject = selectedObjectId?.type === 'image'
        ? (imageObjectsByPage[currentPage] || []).find(i => i.id === selectedObjectId.id)
        : undefined;

    const handleTextPropertyChange = (property: keyof TextObject, value: any) => {
        if (selectedTextObject) {
            updateObject(currentPage, selectedTextObject.id, 'text', { [property]: value });
            handleUpdateObjectEnd();
        } else if (activeTool === 'text') {
            setDefaultTextStyle(prev => ({ ...prev, [property]: value }));
        }
    };
    
    const handleDrawingPropertyChange = (property: keyof typeof defaultDrawingStyle, value: any) => {
        if (selectedDrawingObject) {
            updateObject(currentPage, selectedDrawingObject.id, 'drawing', { [property]: value });
            const updatedObject = (drawingsByPage[currentPage] || []).find(d => d.id === selectedDrawingObject.id);
            if (updatedObject) setDefaultDrawingStyle({ ...updatedObject, [property]: value });
            handleUpdateObjectEnd();
        } else {
            setDefaultDrawingStyle(prev => ({ ...prev, [property]: value }));
        }
    };
    
    const handleShapePropertyChange = (props: Partial<ShapeObject>) => {
        if (selectedShapeObject) {
            updateObject(currentPage, selectedShapeObject.id, 'shape', props);
            handleUpdateObjectEnd();
        }
    };

    const handleImagePropertyChange = (props: Partial<ImageObject>) => {
        if (selectedImageObject) {
            updateObject(currentPage, selectedImageObject.id, 'image', props);
            handleUpdateObjectEnd();
        }
    };
    
    return (
        <div className="flex flex-col flex-grow min-w-0 h-full bg-slate-200 overflow-hidden">
             <input
                type="file"
                ref={addFileInputRef}
                onChange={handleAddFileChange}
                className="hidden"
                accept=".pdf"
                multiple
            />
            <div className="relative z-30 flex-shrink-0 overflow-visible">
                 {activeToolId === 'edit' ? (
                    <>
                        <Ribbon 
                            activeTool={activeTool} onToolSelect={handleToolSelect}
                            onUndo={() => handleUndo(currentPage)} onRedo={() => handleRedo(currentPage)} onReset={() => resetPageObjects(currentPage)}
                            canUndo={canUndo(currentPage)} canRedo={canRedo(currentPage)} canReset={canReset}
                            selectedObjectType={selectedObjectId?.type}
                            selectedObjectProps={selectedTextObject || defaultTextStyle}
                            onTextPropertyChange={handleTextPropertyChange}
                            defaultDrawingStyle={selectedDrawingObject || defaultDrawingStyle}
                            onDrawingPropertyChange={handleDrawingPropertyChange}
                            onRibbonToolClick={(toolId) => selectedFile && onSwitchTool(toolId, selectedFile)}
                            onAddImage={(file) => handleAddImage(file)} onAddShape={handleAddShape}
                            onDownload={handleDownload}
                            isDownloadDisabled={!selectedFile || selectedFile.isLoading}
                            onOpenFile={handleOpenFile}
                            onAddFile={handleAddFile}
                         />
                    </>
                ) : (
                    <WatermarkHeader
                        activeTool={activeTool}
                        onToolSelect={handleToolSelect}
                        onAddText={handleAddText}
                        onAddShape={handleAddShape}
                        onUndo={() => handleUndo(currentPage)}
                        onRedo={() => handleRedo(currentPage)}
                        canUndo={canUndo(currentPage)}
                        canRedo={canRedo(currentPage)}
                        onDownload={handleDownload}
                        isDownloadDisabled={!selectedFile || selectedFile.isLoading}
                        onSignatureClick={() => {
                            if (savedSignatures.length === 0) {
                                setIsSignatureModalOpen(true);
                            } else {
                                setRightSidebarView('signatures');
                            }
                        }}
                    />
                )}
            </div>
            
            {/* Main Content Area: Stacked on mobile, Side-by-side on desktop */}
            <div className="relative z-0 flex flex-col lg:flex-row flex-grow min-h-0 overflow-hidden">
                <main className="flex-grow min-w-0 h-1/2 lg:h-full overflow-hidden relative border-b lg:border-b-0 lg:border-r border-slate-300">
                   <PdfViewer 
                        file={selectedFile} currentPage={currentPage} onCurrentPageChange={setCurrentPage} rotation={pageRotations[currentPage] || 0}
                        activeTool={activeTool}
                        drawings={drawingsByPage[currentPage] || []}
                        textObjects={textObjectsByPage[currentPage] || []}
                        imageObjects={imageObjectsByPage[currentPage] || []}
                        shapeObjects={shapeObjectsByPage[currentPage] || []}
                        onAddDrawing={handleAddDrawing} 
                        onAddText={handleAddText}
                        onUpdateObject={(id, type, props) => updateObject(currentPage, id, type, props)}
                        onUpdateObjectEnd={handleUpdateObjectEnd}
                        onSelectObject={setSelectedObjectId} selectedObjectId={selectedObjectId?.id}
                        defaultTextStyle={defaultTextStyle} defaultDrawingStyle={defaultDrawingStyle}
                        onCopyObject={handleCopyObject} onDeleteObject={handleDeleteObject}
                        onImageTint={async (id, color) => {
                            const image = (imageObjectsByPage[currentPage] || []).find(img => img.id === id);
                            if (image && image.originalSrc) {
                                const tintedSrc = await tintImage(image.originalSrc, color);
                                updateObject(currentPage, id, 'image', { displaySrc: tintedSrc, tintColor: color });
                            }
                        }}
                        onPageDimensionsLoad={(w, h) => setPageDimensions({width: w, height: h})}
                   />
                </main>
                
                {/* Right Sidebar */}
                <div className="w-full lg:w-80 h-1/2 lg:h-full flex-shrink-0 overflow-y-auto bg-white border-t lg:border-t-0">
                    <RightSidebar
                        files={files} selectedFileId={selectedFileId} onRemoveFile={onRemoveFile} onAddFiles={onAddFiles}
                        currentPage={currentPage} onGoToPage={setCurrentPage}
                        onPageAction={handlePageAction} pageRotations={pageRotations}
                        selectedShape={selectedShapeObject} onShapePropertyChange={handleShapePropertyChange}
                        selectedImage={selectedImageObject} onImagePropertyChange={handleImagePropertyChange}
                        selectedText={selectedTextObject} onTextPropertyChange={handleTextPropertyChange}
                        baseView={rightSidebarView}
                        onBaseViewChange={setRightSidebarView}
                        savedSignatures={savedSignatures}
                        onAddSavedSignature={(sig) => addImageObjectToPage(sig, true)}
                        onOpenSignatureModal={() => setIsSignatureModalOpen(true)}
                        onDeleteSavedSignature={handleDeleteSignature}
                    />
                </div>
            </div>
            
            {isSignatureModalOpen && (
                <SignatureModal
                    onClose={() => setIsSignatureModalOpen(false)}
                    onSignatureCreate={handleAddSignature}
                />
            )}
            {modalMessage && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={() => setModalMessage(null)}>
                    <div className="bg-white rounded-2xl p-8 shadow-2xl text-center w-full max-w-md mx-auto" onClick={(e) => e.stopPropagation()}>
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-5">
                            <span className="h-8 w-8 text-blue-600">{ICONS.info}</span>
                        </div>
                        <h3 className="text-2xl font-semibold text-slate-900 mb-4">{t('editPage.modal.title')}</h3>
                        <p className="text-slate-600 mb-8">{modalMessage}</p>
                        <button onClick={() => setModalMessage(null)} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                            {t('editPage.modal.confirm')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
