
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ICONS } from '../Icons';
import { SIGNATURE_FONTS } from '../../utils/fonts';

type SignatureModalProps = {
    onClose: () => void;
    onSignatureCreate: (dataUrl: string) => void;
};

type Tab = 'draw' | 'type' | 'upload';

const FONT_STYLES = SIGNATURE_FONTS;

const DRAW_COLORS = ['#000000', '#2563EB', '#DC2626', '#16A34A', '#F97316', '#9333EA', '#4B5563', '#4338CA'];

export const SignatureModal = ({ onClose, onSignatureCreate }: SignatureModalProps) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<Tab>('draw');
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [drawColor, setDrawColor] = useState('#000000');
    const [paths, setPaths] = useState<[number, number][][]>([]);
    const [typedText, setTypedText] = useState('');
    const [selectedFont, setSelectedFont] = useState(FONT_STYLES[0].style);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const isActionable = (paths.length > 0 && activeTab==='draw') || (typedText && activeTab==='type') || (uploadedImage && activeTab==='upload');

    // Drawing Logic
    const getCoords = (e: MouseEvent | TouchEvent): [number, number] | null => {
        const canvas = canvasRef.current;
        if (!canvas) return null;
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const event = 'touches' in e ? e.touches[0] : e;
        return [(event.clientX - rect.left) * scaleX, (event.clientY - rect.top) * scaleY];
    };

    const startDrawing = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        const coords = getCoords(e.nativeEvent);
        if (coords) {
            setIsDrawing(true);
            setPaths(prev => [...prev, [coords]]);
        }
    }, []);

    const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        if (!isDrawing) return;
        e.preventDefault();
        const coords = getCoords(e.nativeEvent);
        if (coords) {
            setPaths(prev => {
                const newPaths = [...prev];
                newPaths[newPaths.length - 1].push(coords);
                return newPaths;
            });
        }
    }, [isDrawing]);

    const stopDrawing = useCallback(() => {
        setIsDrawing(false);
    }, []);
    
    const clearCanvas = () => setPaths([]);
    const undoLastPath = () => setPaths(prev => prev.slice(0, -1));

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.strokeStyle = drawColor;
        ctx.lineWidth = 3;

        paths.forEach(path => {
            if (path.length < 2) return;
            ctx.beginPath();
            ctx.moveTo(path[0][0], path[0][1]);
            for (let i = 1; i < path.length; i++) {
                ctx.lineTo(path[i][0], path[i][1]);
            }
            ctx.stroke();
        });
    }, [paths, drawColor]);

    // Upload Logic
    const handleFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = e => setUploadedImage(e.target?.result as string);
            reader.readAsDataURL(file);
        }
    };
    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        handleFile(e.dataTransfer.files[0]);
    };

    // Robust trim function using Pixel Scanning
    const getTrimmedCanvasDataUrl = (sourceCanvas: HTMLCanvasElement): string => {
        const ctx = sourceCanvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return sourceCanvas.toDataURL();

        const w = sourceCanvas.width;
        const h = sourceCanvas.height;
        const imageData = ctx.getImageData(0, 0, w, h);
        const data = imageData.data;

        let minX = w, minY = h, maxX = 0, maxY = 0;
        let found = false;

        for (let y = 0; y < h; y++) {
            for (let x = 0; x < w; x++) {
                // Alpha channel is the 4th byte
                const alpha = data[(y * w + x) * 4 + 3];
                if (alpha > 0) { 
                    if (x < minX) minX = x;
                    if (x > maxX) maxX = x;
                    if (y < minY) minY = y;
                    if (y > maxY) maxY = y;
                    found = true;
                }
            }
        }

        if (!found) return ''; 

        // Add slight padding
        const padding = 4;
        const cropX = Math.max(0, minX - padding);
        const cropY = Math.max(0, minY - padding);
        const cropW = Math.min(w, maxX + padding) - cropX + padding;
        const cropH = Math.min(h, maxY + padding) - cropY + padding;

        if (cropW <= 0 || cropH <= 0) return '';

        const trimCanvas = document.createElement('canvas');
        trimCanvas.width = cropW;
        trimCanvas.height = cropH;
        const trimCtx = trimCanvas.getContext('2d');
        if (!trimCtx) return sourceCanvas.toDataURL();

        trimCtx.drawImage(sourceCanvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
        return trimCanvas.toDataURL('image/png');
    };

    // Create Logic
    const handleCreate = () => {
        if (!isActionable) return;
        
        if (activeTab === 'draw') {
             // Even for drawing, use pixel scanning to be safe against anti-aliasing spreads
            const canvas = canvasRef.current;
            if (canvas) {
                const trimmedUrl = getTrimmedCanvasDataUrl(canvas);
                onSignatureCreate(trimmedUrl);
            }
        } else if (activeTab === 'type') {
            const tempCanvas = document.createElement('canvas');
            // Create a large enough canvas to hold text
            tempCanvas.width = 2000; 
            tempCanvas.height = 500;
            const ctx = tempCanvas.getContext('2d');
            
            if (ctx) {
                const fontSize = 150;
                ctx.font = `${fontSize}px ${selectedFont}`;
                ctx.fillStyle = '#000000';
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                // Draw text in center
                ctx.fillText(typedText, tempCanvas.width / 2, tempCanvas.height / 2);
                
                const trimmedData = getTrimmedCanvasDataUrl(tempCanvas);
                onSignatureCreate(trimmedData);
            }
        } else if (activeTab === 'upload' && uploadedImage) {
             const img = new Image();
             img.onload = () => {
                 const tempCanvas = document.createElement('canvas');
                 tempCanvas.width = img.width;
                 tempCanvas.height = img.height;
                 const ctx = tempCanvas.getContext('2d');
                 if(ctx) {
                     ctx.drawImage(img, 0, 0);
                     const trimmedData = getTrimmedCanvasDataUrl(tempCanvas);
                     onSignatureCreate(trimmedData);
                 }
             };
             img.src = uploadedImage;
        }
    };
    
    const TabButton = ({ tab, icon, label }: { tab: Tab, icon: React.ReactNode, label: string }) => (
        <button 
            onClick={() => setActiveTab(tab)} 
            className={`flex-1 p-3 text-sm font-semibold border-r border-slate-200 last:border-r-0 flex items-center justify-center transition-colors ${activeTab === tab ? 'bg-white text-blue-600' : 'bg-slate-50 text-slate-600 hover:bg-slate-100'}`}
        >
            <span className="w-5 h-5 inline-block align-middle mr-2">{icon}</span>
            {label}
        </button>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-lg w-full max-w-2xl flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
                <header className="flex justify-between items-center p-4 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-slate-800">{t('signatureModal.title')}</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><span className="w-6 h-6">{ICONS.close}</span></button>
                </header>

                <div className="flex border-b border-slate-200">
                    <TabButton tab="draw" icon={ICONS.draw} label={t('signatureModal.draw')} />
                    <TabButton tab="type" icon={ICONS.textInsert} label={t('signatureModal.type')} />
                    <TabButton tab="upload" icon={ICONS.uploadSimple} label={t('signatureModal.upload')} />
                </div>
                
                <main className="p-6 bg-slate-50">
                    {activeTab === 'draw' && (
                        <div className="flex space-x-6">
                            <div className="flex flex-col space-y-4 w-28">
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-600 mb-2">{t('signatureModal.color')}</h4>
                                    <div className="grid grid-cols-4 gap-2">
                                        {DRAW_COLORS.map(color => (
                                            <button key={color} onClick={() => setDrawColor(color)} className={`w-6 h-6 rounded-full border-2 transition-transform transform hover:scale-110 ${drawColor === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-white'}`} style={{ backgroundColor: color }} />
                                        ))}
                                    </div>
                                </div>
                                <div className="border-t border-slate-200 pt-4">
                                     <button onClick={undoLastPath} disabled={paths.length === 0} className="w-full flex items-center justify-center p-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md disabled:opacity-50">
                                        <span className="w-5 h-5 mr-1">{ICONS.undo}</span>
                                    </button>
                                     <button onClick={clearCanvas} className="w-full mt-2 text-sm font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 p-2 rounded-md">{t('signatureModal.clear')}</button>
                                </div>
                            </div>
                            <div className="flex-1">
                                <canvas ref={canvasRef} width="500" height="200" className="bg-white border border-slate-300 w-full cursor-crosshair rounded-md shadow-inner"
                                    onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing}
                                    onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing}
                                />
                                <div className="h-px bg-slate-300 w-full mt-2"></div>
                                <p className="text-center text-xs text-slate-400 mt-1">{t('signatureModal.drawPlaceholder')}</p>
                            </div>
                        </div>
                    )}
                    {activeTab === 'type' && (
                        <div>
                             <input type="text" value={typedText} onChange={e => setTypedText(e.target.value)} placeholder={t('signatureModal.typePlaceholder')}
                                className="w-full p-3 border border-slate-300 rounded-md mb-4 text-3xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500" style={{ fontFamily: selectedFont }}/>
                            
                            <h4 className="text-sm font-semibold text-slate-600 mb-2">{t('signatureModal.selectStyle')}</h4>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                {FONT_STYLES.map(font => (
                                    <button key={font.name} onClick={() => setSelectedFont(font.style)}
                                        className={`w-full p-4 border rounded-md text-2xl text-center truncate ${selectedFont === font.style ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'bg-white hover:border-blue-400'}`} style={{ fontFamily: font.style }}>
                                        {typedText || font.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'upload' && (
                        <div onDragOver={e => e.preventDefault()} onDrop={onDrop}
                            className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 bg-white"
                            onClick={() => document.getElementById('sig-upload-input')?.click()}>
                            {uploadedImage ? (
                                <img src={uploadedImage} alt="Signature preview" className="max-h-40 mx-auto" />
                            ) : (
                                <>
                                    <span className="w-12 h-12 mx-auto text-slate-400 block">{ICONS.uploadSimple}</span>
                                    <p className="mt-2 text-sm text-slate-500">{t('signatureModal.uploadPrompt')}</p>
                                </>
                            )}
                            <input type="file" id="sig-upload-input" accept="image/*" className="hidden" onChange={e => e.target.files && handleFile(e.target.files[0])}/>
                        </div>
                    )}
                </main>
                
                <footer className="flex justify-end p-4 border-t border-slate-200 bg-slate-50 space-x-2">
                    <button onClick={onClose} className="px-5 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100">{t('signatureModal.cancel')}</button>
                    <button onClick={handleCreate} disabled={!isActionable} className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-slate-400 disabled:cursor-not-allowed">{t('signatureModal.create')}</button>
                </footer>
            </div>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Caveat&family=Dancing+Script&family=Kalam&family=Satisfy&family=Great+Vibes&family=Sacramento&family=Nanum+Pen+Script&family=Pacifico&display=swap');
            </style>
        </div>
    );
};
