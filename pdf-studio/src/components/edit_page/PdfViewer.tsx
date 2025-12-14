import React, { useState, useEffect, useRef } from 'react';
import { PdfFile } from '../../types';
import { Spinner } from '../Spinner';
import { ICONS } from '../Icons';
import { useLanguage } from '../../contexts/LanguageContext';
import { TextObject, NormalizedLine, ImageObject, ShapeObject } from '../../types/editPageTypes';
import { getShapePath } from '../../utils/shapePaths';
import { PaletteColorPicker } from './PaletteColorPicker';

// FIX: Declare window as any to account for globally loaded libraries like pdfjsLib.
declare const window: any;

type PdfViewerProps = {
    file: PdfFile | null;
    currentPage: number;
    onCurrentPageChange: (page: number) => void;
    rotation: number;
    activeTool: string;
    drawings: NormalizedLine[];
    textObjects: TextObject[];
    imageObjects: ImageObject[];
    shapeObjects: ShapeObject[];
    onAddDrawing: (drawing: Omit<NormalizedLine, 'id'>) => void;
    onAddText: (text: Omit<TextObject, 'id'>) => void;
    onUpdateObject: (id: string, type: 'drawing' | 'text' | 'image' | 'shape', props: Partial<NormalizedLine | TextObject | ImageObject | ShapeObject>) => void;
    onUpdateObjectEnd: () => void;
    onSelectObject: (selection: { id: string, type: 'drawing' | 'text' | 'image' | 'shape' } | null) => void;
    selectedObjectId: string | null;
    defaultTextStyle: Omit<TextObject, 'id' | 'text' | 'x' | 'y' | 'width' | 'height'>;
    defaultDrawingStyle: { color: string; strokeWidth: number; dashArray: number[] };
    onCopyObject: (id: string, type: 'drawing' | 'text' | 'image' | 'shape') => void;
    onDeleteObject: (id: string, type: 'drawing' | 'text' | 'image' | 'shape') => void;
    onImageTint: (id: string, color: string) => Promise<void>;
    onPageDimensionsLoad?: (width: number, height: number) => void;
};

type ResizeHandle = 'top-left' | 'top' | 'top-right' | 'left' | 'right' | 'bottom-left' | 'bottom' | 'bottom-right';

const MIN_TEXT_WIDTH = 100; // pixels

const isPointInPolygon = (point: {x: number, y: number}, polygon: {x: number, y: number}[]) => {
    let isInside = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const xi = polygon[i].x, yi = polygon[i].y;
        const xj = polygon[j].x, yj = polygon[j].y;
        const intersect = ((yi > point.y) !== (yj > point.y)) && (point.x < (xj - xi) * (point.y - yi) / (yj - yi) + xi);
        if (intersect) isInside = !isInside;
    }
    return isInside;
};

const ObjectActionToolbar = ({ onCopy, onDelete, zoom, color, onColorChange }: { 
    onCopy: () => void; 
    onDelete: () => void; 
    zoom: number; 
    color?: string;
    onColorChange?: (color: string) => void;
}) => {
    const { t } = useLanguage();
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);

    const handleColorChange = (newColor: string) => {
        if (onColorChange) {
            onColorChange(newColor);
        }
        setIsPaletteOpen(false);
    };
    
    return (
        <div
            className="absolute bg-white rounded-md shadow-lg p-1 flex items-center space-x-1 z-30"
            style={{ 
                bottom: `100%`, 
                left: `50%`,
                transform: `translateX(-50%) scale(${1 / zoom})`,
                marginBottom: '4px',
                transformOrigin: 'bottom center',
             }}
            onMouseDown={(e) => e.stopPropagation()}
        >
            {color && onColorChange && (
                <div className="relative">
                    <PaletteColorPicker
                        color={color}
                        onChange={handleColorChange}
                        isOpen={isPaletteOpen}
                        onToggle={() => setIsPaletteOpen(p => !p)}
                        onClose={() => setIsPaletteOpen(false)}
                        title={t('objectToolbar.color')}
                        showTitle={false}
                        icon={
                            <div className="w-5 h-5 rounded-full" style={{ backgroundColor: color, border: '1px solid #ccc' }}>
                                {color === 'transparent' && <div className="w-full h-full relative"><svg className="absolute inset-0 w-full h-full" viewBox="0 0 10 10" preserveAspectRatio="none"><line x1="0" y1="10" x2="10" y2="0" stroke="red" strokeWidth="1" /></svg></div>}
                            </div>
                        }
                    />
                </div>
            )}
            <button
                onClick={onCopy}
                className="p-1.5 text-slate-700 hover:bg-slate-200 rounded-md"
                title={t('objectToolbar.copy')}
            >
                <span className="w-5 h-5 block">{ICONS.copy}</span>
            </button>
            <button
                onClick={onDelete}
                className="p-1.5 text-slate-700 hover:bg-slate-200 rounded-md"
                title={t('objectToolbar.delete')}
            >
                <span className="w-5 h-5 block">{ICONS.trash}</span>
            </button>
        </div>
    );
};

export const PdfViewer = ({ file, currentPage, onCurrentPageChange, rotation, activeTool, drawings, textObjects, imageObjects, shapeObjects, onAddDrawing, onAddText, onUpdateObject, onUpdateObjectEnd, onSelectObject, selectedObjectId, defaultTextStyle, defaultDrawingStyle, onCopyObject, onDeleteObject, onImageTint, onPageDimensionsLoad }: PdfViewerProps) => {
    const [isPageLoading, setIsPageLoading] = useState(false);
    const [zoom, setZoom] = useState(1);
    const [baseDimensions, setBaseDimensions] = useState({ width: 0, height: 0 });
    const { t } = useLanguage();

    const [pdfPage, setPdfPage] = useState<any | null>(null);

    const viewerContainerRef = useRef<HTMLDivElement>(null);
    const pdfCanvasRef = useRef<HTMLCanvasElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const textOverlayRef = useRef<HTMLDivElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentPoints, setCurrentPoints] = useState<{ x: number; y: number }[]>([]);

    const [dragState, setDragState] = useState<{ id: string, type: 'drawing' | 'text' | 'image' | 'shape', startX: number, startY: number, objStartX: number, objStartY: number, initialPoints?: {x:number, y:number}[] } | null>(null);
    const [resizeState, setResizeState] = useState<{
        id: string;
        type: 'image' | 'text' | 'shape';
        handle: ResizeHandle;
        startX: number;
        startY: number;
        objStart: { x: number; y: number; width: number; height: number; rotation: number; };
    } | null>(null);
    const [rotationState, setRotationState] = useState<{
        id: string;
        type: 'shape';
        startAngle: number;
        objStartRotation: number;
    } | null>(null);

    useEffect(() => {
        if (file && !file.isLoading && currentPage > 0) {
            const loadPdfPage = async () => {
                setIsPageLoading(true);
                setPdfPage(null);
                setBaseDimensions({ width: 0, height: 0 });
                try {
                    const arrayBuffer = await file.file.arrayBuffer();
                    const pdfDoc = await window.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
                    if (currentPage > pdfDoc.numPages) {
                        onCurrentPageChange(pdfDoc.numPages);
                        return;
                    }
                    const page = await pdfDoc.getPage(currentPage);
                    setPdfPage(page);
                    
                    // Notify parent of dimensions
                    const viewport = page.getViewport({ scale: 1.0 });
                    if (onPageDimensionsLoad) {
                        onPageDimensionsLoad(viewport.width, viewport.height);
                    }
                } catch (error) {
                    console.error("Failed to load PDF page:", error);
                    setPdfPage(null);
                } finally {
                    setIsPageLoading(false);
                }
            };
            loadPdfPage();
        } else {
            setPdfPage(null);
            setBaseDimensions({ width: 0, height: 0 });
        }
    }, [file, currentPage]);


    useEffect(() => {
        if (!pdfPage || !pdfCanvasRef.current) {
            if (!file || file.isLoading) {
                setBaseDimensions({ width: 0, height: 0 });
            }
            return;
        }

        const canvas = pdfCanvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const dpr = window.devicePixelRatio || 1;
        const viewport = pdfPage.getViewport({ scale: zoom * dpr, rotation: 0 });
        
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        
        const baseViewport = pdfPage.getViewport({ scale: 1.0 });
        setBaseDimensions({ width: baseViewport.width, height: baseViewport.height });

        const renderTask = pdfPage.render({
            canvasContext: ctx,
            viewport: viewport,
        });

        return () => {
            renderTask.cancel();
        };
    }, [pdfPage, zoom]);

    useEffect(() => {
        if (file) setZoom(1);
    }, [file?.id]);
    
    const getOverlayCoordinates = (e: React.MouseEvent): { x: number, y: number } | null => {
        const overlay = textOverlayRef.current;
        if (!overlay) return null;
        const rect = overlay.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleResizeMouseDown = (e: React.MouseEvent, id: string, type: 'image' | 'text' | 'shape', handle: ResizeHandle, obj: ImageObject | TextObject | ShapeObject) => {
        e.stopPropagation();
        e.preventDefault();
        setDragState(null);
        setResizeState({
            id,
            type,
            handle,
            startX: e.clientX,
            startY: e.clientY,
            objStart: { x: obj.x, y: obj.y, width: obj.width, height: obj.height, rotation: (obj as ShapeObject).rotation || 0 },
        });
    };
    
    const handleRotationMouseDown = (e: React.MouseEvent, obj: ShapeObject) => {
        e.stopPropagation();
        e.preventDefault();
        const overlay = textOverlayRef.current;
        if (!overlay) return;

        const objRect = {
            left: obj.x * overlay.offsetWidth,
            top: obj.y * overlay.offsetHeight,
            width: obj.width * overlay.offsetWidth,
            height: obj.height * overlay.offsetHeight,
        };
        const centerX = objRect.left + objRect.width / 2;
        const centerY = objRect.top + objRect.height / 2;
        
        const coords = getOverlayCoordinates(e);
        if (!coords) return;
        
        const startAngle = Math.atan2(coords.y - centerY, coords.x - centerX) * (180 / Math.PI);
        
        setRotationState({
            id: obj.id,
            type: 'shape',
            startAngle: startAngle,
            objStartRotation: obj.rotation,
        });
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return;

        if (activeTool === 'pan' && viewerContainerRef.current) {
            e.preventDefault();
            const ele = viewerContainerRef.current;
            ele.style.cursor = 'grabbing';
            ele.style.userSelect = 'none';
            const pos = { left: ele.scrollLeft, top: ele.scrollTop, x: e.clientX, y: e.clientY };
            
            const handlePanMouseMove = (moveEvent: MouseEvent) => {
                const dx = moveEvent.clientX - pos.x;
                const dy = moveEvent.clientY - pos.y;
                ele.scrollTop = pos.top - dy;
                ele.scrollLeft = pos.left - dx;
            };
            const handlePanMouseUp = () => {
                ele.style.cursor = 'grab';
                ele.style.removeProperty('user-select');
                document.removeEventListener('mousemove', handlePanMouseMove);
                document.removeEventListener('mouseup', handlePanMouseUp);
            };
            document.addEventListener('mousemove', handlePanMouseMove);
            document.addEventListener('mouseup', handlePanMouseUp);
            return;
        }

        const coords = getOverlayCoordinates(e);
        if (!coords) return;
        const overlay = textOverlayRef.current;
        if (!overlay) return;

        if (activeTool === 'select') {
            for (const obj of [...shapeObjects].reverse()) {
                const objWidthPx = obj.width * overlay.offsetWidth;
                const objHeightPx = obj.height * overlay.offsetHeight;
                const objXPx = obj.x * overlay.offsetWidth;
                const objYPx = obj.y * overlay.offsetHeight;
                const centerX = objXPx + objWidthPx / 2;
                const centerY = objYPx + objHeightPx / 2;
                const translatedX = coords.x - centerX;
                const translatedY = coords.y - centerY;
                const angleRad = -obj.rotation * (Math.PI / 180);
                const cos = Math.cos(angleRad);
                const sin = Math.sin(angleRad);
                const rotatedX = translatedX * cos - translatedY * sin;
                const rotatedY = translatedX * sin + translatedY * cos;
            
                if (rotatedX >= -objWidthPx / 2 && rotatedX <= objWidthPx / 2 && rotatedY >= -objHeightPx / 2 && rotatedY <= objHeightPx / 2) {
                    onSelectObject({ id: obj.id, type: 'shape' });
                    setDragState({ id: obj.id, type: 'shape', startX: e.clientX, startY: e.clientY, objStartX: obj.x, objStartY: obj.y });
                    return;
                }
            }
             for (const obj of [...imageObjects].reverse()) {
                 const objRect = { x: obj.x * overlay.offsetWidth, y: obj.y * overlay.offsetHeight, width: obj.width * overlay.offsetWidth, height: obj.height * overlay.offsetHeight };
                 if (coords.x >= objRect.x && coords.x <= objRect.x + objRect.width && coords.y >= objRect.y && coords.y <= objRect.y + objRect.height) {
                    onSelectObject({ id: obj.id, type: 'image' });
                    setDragState({ id: obj.id, type: 'image', startX: e.clientX, startY: e.clientY, objStartX: obj.x, objStartY: obj.y });
                    return;
                }
            }
            for (const obj of [...textObjects].reverse()) {
                 const objRect = { x: obj.x * overlay.offsetWidth, y: obj.y * overlay.offsetHeight, width: obj.width * overlay.offsetWidth, height: obj.height * overlay.offsetHeight };
                 if (coords.x >= objRect.x && coords.x <= objRect.x + objRect.width && coords.y >= objRect.y && coords.y <= objRect.y + objRect.height) {
                    onSelectObject({ id: obj.id, type: 'text' });
                    setDragState({ id: obj.id, type: 'text', startX: e.clientX, startY: e.clientY, objStartX: obj.x, objStartY: obj.y });
                    return;
                }
            }
            for (const drawing of [...drawings].reverse()) {
                const bounds = getDrawingBounds(drawing.points, overlay.offsetWidth, overlay.offsetHeight, 5);
                if (isPointInPolygon(coords, bounds)) {
                    onSelectObject({ id: drawing.id, type: 'drawing' });
                    setDragState({ id: drawing.id, type: 'drawing', startX: e.clientX, startY: e.clientY, objStartX: 0, objStartY: 0, initialPoints: drawing.points });
                    return;
                }
            }
            onSelectObject(null);

        } else if (activeTool === 'draw') {
            setIsDrawing(true);
            setCurrentPoints([coords]);
            onSelectObject(null);
        } else if (activeTool === 'text') {
            const normalizedCoords = { x: coords.x / overlay.offsetWidth, y: coords.y / overlay.offsetHeight };
            onAddText({
                text: t('pdfViewer.defaultText'),
                x: normalizedCoords.x,
                y: normalizedCoords.y,
                width: MIN_TEXT_WIDTH / (baseDimensions.width * zoom),
                height: (defaultTextStyle.fontSize * 1.5) / (baseDimensions.height * zoom),
                ...defaultTextStyle,
            });
        }
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (activeTool === 'pan') return;
        const overlay = textOverlayRef.current;
        if (!overlay) return;
        const coords = getOverlayCoordinates(e);
        if (!coords) return;

        if (isDrawing) {
            setCurrentPoints(prev => [...prev, coords]);
            return;
        }

        if (rotationState) {
            const shape = shapeObjects.find(s => s.id === rotationState.id);
            if (!shape) return;

            const objRect = {
                left: shape.x * overlay.offsetWidth, top: shape.y * overlay.offsetHeight,
                width: shape.width * overlay.offsetWidth, height: shape.height * overlay.offsetHeight,
            };
            const centerX = objRect.left + objRect.width / 2;
            const centerY = objRect.top + objRect.height / 2;
            
            const currentAngle = Math.atan2(coords.y - centerY, coords.x - centerX) * (180 / Math.PI);
            const deltaAngle = currentAngle - rotationState.startAngle;
            let newRotation = rotationState.objStartRotation + deltaAngle;
            
            if (e.shiftKey) newRotation = Math.round(newRotation / 15) * 15;

            onUpdateObject(rotationState.id, rotationState.type, { rotation: newRotation });
            return;
        }
        
        if (resizeState) {
            const dx = (e.clientX - resizeState.startX) / overlay.offsetWidth;
            const dy = (e.clientY - resizeState.startY) / overlay.offsetHeight;
            
            let { x, y, width, height, rotation } = resizeState.objStart;
            const angleRad = rotation * (Math.PI / 180);
            const cos = Math.cos(angleRad), sin = Math.sin(angleRad);
            const localDx = dx * cos + dy * sin, localDy = -dx * sin + dy * cos;
            
            let newX = x, newY = y, newWidth = width, newHeight = height;
            const minSize = 20 / (baseDimensions.width * zoom);

            if (resizeState.handle.includes('right')) newWidth = Math.max(minSize, width + localDx);
            if (resizeState.handle.includes('left')) {
                newWidth = Math.max(minSize, width - localDx);
                newX = x + (width - newWidth) * cos;
                newY = y + (width - newWidth) * sin;
            }
            if (resizeState.handle.includes('bottom')) newHeight = Math.max(minSize, height + localDy);
            if (resizeState.handle.includes('top')) {
                newHeight = Math.max(minSize, height - localDy);
                newX += (height - newHeight) * sin;
                newY -= (height - newHeight) * cos;
            }

            onUpdateObject(resizeState.id, resizeState.type, { x: newX, y: newY, width: newWidth, height: newHeight });
            return;
        }
        
        if (dragState) {
            const dx = (e.clientX - dragState.startX) / overlay.offsetWidth;
            const dy = (e.clientY - dragState.startY) / overlay.offsetHeight;
            
            if(['text', 'image', 'shape'].includes(dragState.type)) {
                 onUpdateObject(dragState.id, dragState.type as 'text' | 'image' | 'shape', { x: dragState.objStartX + dx, y: dragState.objStartY + dy });
            } else if (dragState.type === 'drawing' && dragState.initialPoints) {
                 const movedPoints = dragState.initialPoints.map(p => ({ x: p.x + dx, y: p.y + dy }));
                 onUpdateObject(dragState.id, 'drawing', { points: movedPoints });
            }
        }
    };

    const handleMouseUp = () => {
        if (activeTool === 'pan') return;

        const overlay = textOverlayRef.current;
        if (!overlay) return;

        const wasInteracting = !!(dragState || resizeState || rotationState);

        if (isDrawing) {
            setIsDrawing(false);
            if (currentPoints.length > 1) {
                const normalizedPoints = currentPoints.map(p => ({
                    x: p.x / overlay.offsetWidth,
                    y: p.y / overlay.offsetHeight,
                }));
                onAddDrawing({ 
                    points: normalizedPoints, 
                    color: defaultDrawingStyle.color, 
                    strokeWidth: defaultDrawingStyle.strokeWidth,
                    dashArray: defaultDrawingStyle.dashArray,
                });
            }
            setCurrentPoints([]);
        }
        if (dragState) setDragState(null);
        if (resizeState) setResizeState(null);
        if (rotationState) setRotationState(null);

        if (wasInteracting) {
            onUpdateObjectEnd();
        }
    };
    
    const getDrawingBounds = (points: {x:number, y:number}[], width: number, height: number, padding: number) => {
        if (points.length === 0) return [];
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        points.forEach(p => {
            const px = p.x * width;
            const py = p.y * height;
            minX = Math.min(minX, px);
            minY = Math.min(minY, py);
            maxX = Math.max(maxX, px);
            maxY = Math.max(maxY, py);
        });
        return [
            { x: minX - padding, y: minY - padding },
            { x: maxX + padding, y: minY - padding },
            { x: maxX + padding, y: maxY + padding },
            { x: minX - padding, y: maxY + padding },
        ];
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx || !pdfCanvasRef.current || baseDimensions.width === 0) return;

        if (canvas.width !== pdfCanvasRef.current.width || canvas.height !== pdfCanvasRef.current.height) {
            canvas.width = pdfCanvasRef.current.width;
            canvas.height = pdfCanvasRef.current.height;
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const scaleFactor = canvas.width / (baseDimensions.width * zoom);
        
        drawings.forEach(drawing => {
            if (drawing.points.length < 2) return;
            ctx.beginPath();
            drawing.points.forEach((p, i) => {
                const px = p.x * canvas.width, py = p.y * canvas.height;
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            });
            ctx.strokeStyle = drawing.color;
            ctx.lineWidth = drawing.strokeWidth * scaleFactor;
            ctx.setLineDash((drawing.dashArray || []).map(d => d * scaleFactor));
            ctx.stroke();
        });

        if (isDrawing && currentPoints.length > 1) {
            ctx.beginPath();
            currentPoints.forEach((p, i) => {
                 const px = p.x * (canvas.width / (baseDimensions.width * zoom));
                 const py = p.y * (canvas.height / (baseDimensions.height * zoom));
                if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            });
            ctx.strokeStyle = defaultDrawingStyle.color;
            ctx.lineWidth = defaultDrawingStyle.strokeWidth * scaleFactor;
            ctx.setLineDash((defaultDrawingStyle.dashArray || []).map(d => d * scaleFactor));
            ctx.stroke();
        }
        ctx.setLineDash([]);
    }, [drawings, isDrawing, currentPoints, defaultDrawingStyle, zoom, baseDimensions]);

    const totalPages = file?.pageCount || 0;
    const goToPage = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) onCurrentPageChange(pageNumber);
    };
    
    const showSpinner = file?.isLoading || isPageLoading;
    const spinnerText = file?.isLoading ? t('pdfViewer.loadingFile') : t('pdfViewer.loadingPage');

    const getHandleStyle = (handle: ResizeHandle, zoom: number): React.CSSProperties => {
        const style: React.CSSProperties = {
            position: 'absolute', width: `${10 / zoom}px`, height: `${10 / zoom}px`, backgroundColor: 'white',
            border: `${1 / zoom}px solid #3b82f6`, borderRadius: '50%', transform: 'translate(-50%, -50%)', zIndex: 40, pointerEvents: 'auto',
        };
        if (handle.includes('top')) style.top = '0%';
        if (handle.includes('bottom')) style.top = '100%';
        if (handle.includes('left')) style.left = '0%';
        if (handle.includes('right')) style.left = '100%';
        if (!handle.includes('left') && !handle.includes('right')) style.left = '50%';
        if (!handle.includes('top') && !handle.includes('bottom')) style.top = '50%';
        if (handle === 'top-left' || handle === 'bottom-right') style.cursor = 'nwse-resize';
        if (handle === 'top-right' || handle === 'bottom-left') style.cursor = 'nesw-resize';
        if (handle === 'top' || handle === 'bottom') style.cursor = 'ns-resize';
        if (handle === 'left' || handle === 'right') style.cursor = 'ew-resize';
        return style;
    };
    
    const renderContent = () => {
        if (showSpinner) {
            return (
                <div className="flex flex-col items-center justify-center">
                    <Spinner />
                    <p className="mt-4 text-slate-600">{spinnerText}</p>
                </div>
            );
        }

        if (!pdfPage) {
            return (
                <div className="place-self-center">
                    <p>{file ? t('pdfViewer.pageError') : t('pdfViewer.noFile')}</p>
                </div>
            );
        }

        return (
            <div 
                className="relative"
                style={{
                    width: `${baseDimensions.width * zoom}px`,
                    height: `${baseDimensions.height * zoom}px`,
                    transform: `rotate(${rotation}deg)`,
                }}
            >
                <canvas 
                    ref={pdfCanvasRef}
                    style={{
                        width: `${baseDimensions.width * zoom}px`,
                        height: `${baseDimensions.height * zoom}px`,
                    }}
                    className="block bg-white rounded-md shadow-lg select-none"
                    onDragStart={(e) => e.preventDefault()} 
                />
                {baseDimensions.width > 0 && (
                    <div 
                        ref={textOverlayRef}
                        className="absolute top-0 left-0"
                        style={{
                            width: `${baseDimensions.width * zoom}px`,
                            height: `${baseDimensions.height * zoom}px`,
                            cursor: activeTool === 'draw' ? 'crosshair' : activeTool === 'text' ? 'text' : 'default',
                        }}
                        onMouseDown={activeTool !== 'pan' ? handleMouseDown : undefined}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none z-10" />

                        {imageObjects.map(obj => {
                            const isSelected = selectedObjectId === obj.id;
                            const handles: ResizeHandle[] = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
                            return (
                                <div 
                                    key={obj.id} 
                                    className="flex items-center justify-center"
                                    style={{
                                        position: 'absolute', left: `${obj.x * 100}%`, top: `${obj.y * 100}%`, width: `${obj.width * 100}%`, height: `${obj.height * 100}%`,
                                        border: isSelected ? `${2/zoom}px dashed #3b82f6` : 'none', cursor: 'move', pointerEvents: isSelected ? 'auto' : 'none', boxSizing: 'border-box', zIndex: 20,
                                        opacity: obj.opacity ?? 1,
                                    }}
                                >
                                    <div className="w-full h-full" style={{ pointerEvents: isSelected ? 'none' : 'auto' }}/>
                                    {isSelected && <>
                                        <ObjectActionToolbar
                                            onCopy={() => onCopyObject(obj.id, 'image')}
                                            onDelete={() => onDeleteObject(obj.id, 'image')}
                                            zoom={zoom}
                                            {...(obj.isSignature && {
                                                color: obj.tintColor || '#000000',
                                                onColorChange: async (newColor) => {
                                                    await onImageTint(obj.id, newColor);
                                                    onUpdateObjectEnd();
                                                }
                                            })}
                                        />
                                        {handles.map(handle => <div key={handle} style={getHandleStyle(handle, zoom)} onMouseDown={(e) => handleResizeMouseDown(e, obj.id, 'image', handle, obj)} />)}
                                    </>}
                                    <img src={obj.displaySrc} className="w-full h-full object-contain pointer-events-none" draggable="false" />
                                </div>
                            );
                        })}
                        
                        {shapeObjects.map(obj => {
                            const isSelected = selectedObjectId === obj.id;
                            const isLine = obj.shapeType.startsWith('line');
                            const handles: ResizeHandle[] = isLine ? ['left', 'right'] : ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
                            return (
                                <div
                                    key={obj.id}
                                    style={{
                                        position: 'absolute', left: `${obj.x * 100}%`, top: `${obj.y * 100}%`, width: `${obj.width * 100}%`, height: `${obj.height * 100}%`,
                                        transform: `rotate(${obj.rotation}deg)`, cursor: 'move', pointerEvents: isSelected ? 'auto' : 'none',
                                        zIndex: 21, opacity: obj.opacity ?? 1,
                                    }}
                                >
                                    <div className="w-full h-full" style={{ pointerEvents: isSelected ? 'none' : 'auto' }}/>
                                    <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" className="overflow-visible pointer-events-none absolute top-0 left-0">
                                        <path d={getShapePath(obj.shapeType)} fill={obj.fillColor} stroke={obj.strokeColor === 'transparent' ? 'none' : obj.strokeColor} strokeWidth={obj.strokeWidth} vectorEffect="non-scaling-stroke" strokeDasharray={obj.strokeDashArray?.join(' ')} />
                                        {obj.text && (
                                            <foreignObject x="5" y="5" width="90" height="90" style={{ pointerEvents: 'none' }}>
                                                <div
                                                    style={{
                                                        width: '100%',
                                                        height: '100%',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        textAlign: 'center',
                                                        color: obj.textColor || '#000000',
                                                        fontSize: `${(obj.fontSize || 16)}px`,
                                                        fontFamily: obj.fontFamily || 'NotoSansKR-Regular',
                                                        fontWeight: obj.isBold ? 'bold' : 'normal',
                                                        fontStyle: obj.isItalic ? 'italic' : 'normal',
                                                        lineHeight: 1.2,
                                                        wordBreak: 'break-word',
                                                        whiteSpace: 'pre-wrap',
                                                        boxSizing: 'border-box',
                                                    }}
                                                >
                                                    {obj.text}
                                                </div>
                                            </foreignObject>
                                        )}
                                    </svg>
                                    {isSelected && (
                                        <>
                                            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: `${2 / zoom}px dashed #3b82f6`, boxSizing: 'border-box', pointerEvents: 'none' }} />
                                            <ObjectActionToolbar
                                                onCopy={() => onCopyObject(obj.id, 'shape')}
                                                onDelete={() => onDeleteObject(obj.id, 'shape')}
                                                zoom={zoom}
                                                color={obj.textColor || '#000000'}
                                                onColorChange={(color) => {
                                                    onUpdateObject(obj.id, 'shape', { textColor: color });
                                                    onUpdateObjectEnd();
                                                }}
                                            />
                                            
                                            <div className="absolute top-1/2" style={{ left: `calc(100% + ${20 / zoom}px)`, transform: `translateY(-50%) scale(${1 / zoom})`, pointerEvents: 'auto' }} onMouseDown={(e) => handleRotationMouseDown(e, obj)}>
                                                <div className="w-6 h-6 bg-white rounded-full shadow-md cursor-grab flex items-center justify-center border border-slate-200 hover:bg-slate-50">
                                                    <span className="w-4 h-4 text-slate-700">{ICONS.rotateRight}</span>
                                                </div>
                                            </div>
                                            
                                            {handles.map(handle => <div key={handle} style={getHandleStyle(handle, zoom)} onMouseDown={(e) => handleResizeMouseDown(e, obj.id, 'shape', handle, obj)} />)}
                                        </>
                                    )}
                                </div>
                            );
                        })}

                        {textObjects.map(obj => {
                            const isSelected = selectedObjectId === obj.id;
                            const handles: ResizeHandle[] = ['top-left', 'top', 'top-right', 'left', 'right', 'bottom-left', 'bottom', 'bottom-right'];
                            return (
                                <div key={obj.id}
                                    className="flex items-center"
                                    style={{
                                        position: 'absolute',
                                        left: `${obj.x * 100}%`,
                                        top: `${obj.y * 100}%`,
                                        width: `${obj.width * 100}%`,
                                        height: `${obj.height * 100}%`,
                                        border: isSelected ? `${2 / zoom}px dashed #3b82f6` : 'none',
                                        cursor: 'move',
                                        pointerEvents: isSelected ? 'auto' : 'none',
                                        zIndex: 22
                                    }}
                                >
                                     <div className="absolute inset-0" style={{ pointerEvents: isSelected ? 'none' : 'auto' }}/>
                                    {isSelected &&
                                        <>
                                            <ObjectActionToolbar
                                                onCopy={() => onCopyObject(obj.id, 'text')}
                                                onDelete={() => onDeleteObject(obj.id, 'text')}
                                                zoom={zoom}
                                                color={obj.color}
                                                onColorChange={(color) => {
                                                    onUpdateObject(obj.id, 'text', { color });
                                                    onUpdateObjectEnd();
                                                }}
                                            />
                                            {handles.map(handle => <div key={handle} style={getHandleStyle(handle, zoom)} onMouseDown={(e) => handleResizeMouseDown(e, obj.id, 'text', handle, obj)} />)}
                                        </>
                                    }
                                    <textarea id={obj.id} value={obj.text} onChange={(e) => onUpdateObject(obj.id, 'text', { text: e.target.value })}
                                        onFocus={(e) => { if (obj.text === t('pdfViewer.defaultText')) e.currentTarget.select(); }}
                                        onBlur={onUpdateObjectEnd}
                                        onMouseDown={e => e.stopPropagation()}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            fontSize: `${obj.fontSize * zoom}px`, fontFamily: obj.fontFamily, color: obj.color, backgroundColor: obj.backgroundColor,
                                            fontWeight: obj.isBold ? 'bold' : 'normal', fontStyle: obj.isItalic ? 'italic' : 'normal', textAlign: obj.textAlign,
                                            border: 'none',
                                            resize: 'none', overflow: 'hidden', padding: '2px', cursor: 'text',
                                            whiteSpace: 'pre-wrap', lineHeight: 1.2, boxSizing: 'border-box', pointerEvents: 'auto',
                                        }}
                                    />
                                </div>
                            );
                        })}

                        {drawings.map(d => {
                            if (selectedObjectId !== d.id) return null;
                            const overlay = textOverlayRef.current; if (!overlay) return null;
                            const centerX = d.points.reduce((acc, p) => acc + p.x * overlay.offsetWidth, 0) / d.points.length;
                            const centerY = d.points.reduce((acc, p) => acc + p.y * overlay.offsetHeight, 0) / d.points.length;
                            return (
                                <div key={`${d.id}-delete`} className="absolute p-1 bg-white rounded-full shadow-lg cursor-pointer hover:bg-red-100 z-30" 
                                    style={{ left: centerX, top: centerY, transform: `translate(-50%, -50%) scale(${1 / zoom})` }}
                                    onMouseDown={e => e.stopPropagation()} onClick={() => onDeleteObject(d.id, 'drawing')}>
                                    <span className="w-5 h-5 block text-red-600">{ICONS.trash}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="w-full h-full flex flex-col relative min-h-0">
            <div 
                ref={viewerContainerRef}
                className="flex-grow w-full h-full overflow-auto flex relative bg-slate-200/50"
                onMouseDown={activeTool === 'pan' ? handleMouseDown : undefined}
                style={{ cursor: activeTool === 'pan' ? 'grab' : 'default' }}
            >
                 <div className="relative m-auto p-8 box-border flex-none">
                    {renderContent()}
                 </div>
            </div>
             {totalPages > 0 && (
                <div className="flex-shrink-0 bg-slate-100 border-t border-slate-300 w-full p-2 flex items-center justify-center shadow-inner relative">
                    <div className="flex items-center">
                        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1} className="px-3 py-1 rounded-md disabled:opacity-50 hover:bg-slate-200">
                            &lt;
                        </button>
                        <span className="mx-4 text-sm font-semibold text-slate-700">{currentPage} / {totalPages}</span>
                        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages} className="px-3 py-1 rounded-md disabled:opacity-50 hover:bg-slate-200">
                            &gt;
                        </button>
                    </div>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                        <button onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.2))} className="p-1 rounded-md hover:bg-slate-200" title={t('pdfViewer.zoomOutTooltip')}>
                            <span className="w-5 h-5 block text-slate-600">{ICONS.zoomOut}</span>
                        </button>
                        <input type="range" min="0.2" max="3" step="0.05" value={zoom} onChange={(e) => setZoom(parseFloat(e.target.value))} className="w-24 cursor-pointer" />
                        <button onClick={() => setZoom(prev => Math.min(prev + 0.1, 3))} className="p-1 rounded-md hover:bg-slate-200" title={t('pdfViewer.zoomInTooltip')}>
                            <span className="w-5 h-5 block text-slate-600">{ICONS.zoomIn}</span>
                        </button>
                        <span className="text-sm font-semibold text-slate-600 w-12 text-center">{Math.round(zoom * 100)}%</span>
                    </div>
                </div>
            )}
        </div>
    );
};