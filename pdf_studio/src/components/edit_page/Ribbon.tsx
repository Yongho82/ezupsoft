
import React, { useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ICONS } from '../Icons';
import { useLanguage } from '../../contexts/LanguageContext';
import { TextObject, ShapeObject, NormalizedLine } from '../../types/editPageTypes';
import { ShapeType, ShapesDropdown } from './ShapesDropdown';
import { PaletteColorPicker } from './PaletteColorPicker';
import { ToolID } from '../../types';

type RibbonProps = {
    activeTool: string;
    onToolSelect: (tool: string) => void;
    onUndo: () => void;
    onRedo: () => void;
    onReset: () => void;
    canUndo: boolean;
    canRedo: boolean;
    canReset: boolean;
    selectedObjectType?: 'text' | 'image' | 'shape' | 'drawing';
    selectedObjectProps?: any;
    onTextPropertyChange?: (property: keyof TextObject, value: any) => void;
    defaultDrawingStyle?: any;
    onDrawingPropertyChange?: (property: 'color' | 'strokeWidth' | 'dashArray', value: any) => void;
    onRibbonToolClick?: (toolId: ToolID) => void;
    onAddImage?: (file: File) => void;
    onAddShape?: (shapeType: ShapeType) => void;
    onDownload: () => void;
    isDownloadDisabled: boolean;
    onOpenFile: () => void;
    onAddFile: () => void;
};

const RibbonButton = ({ icon, label, onClick, isActive = false, disabled = false, dropdown = false, children }: { icon: React.ReactNode, label: string, onClick?: () => void, isActive?: boolean, disabled?: boolean, dropdown?: boolean, children?: React.ReactNode }) => (
    <div className="relative flex flex-col items-center justify-center">
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative flex flex-col items-center justify-center text-slate-700 rounded-md p-2 min-w-[60px] h-[70px] transition-colors ${isActive ? 'bg-blue-100 text-blue-700' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}`}
        >
            <span className="w-6 h-6 mb-1">{icon}</span>
            <span className="text-xs text-center leading-tight">{label}</span>
            {dropdown && <span className="absolute bottom-0.5 text-[10px]">▼</span>}
        </button>
        {children}
    </div>
);

const ToolGroup = ({ title, children }: { title: string, children?: React.ReactNode }) => (
    <div className="flex flex-col px-2 border-r border-slate-200 last:border-r-0">
        <div className="flex items-center justify-center space-x-1 h-[75px]">
            {children}
        </div>
        <div className="text-[10px] text-slate-500 text-center mt-1 font-medium">{title}</div>
    </div>
);

export const Ribbon = ({ 
    activeTool, onToolSelect, 
    onUndo, onRedo, onReset, 
    canUndo, canRedo, canReset,
    selectedObjectType, selectedObjectProps, onTextPropertyChange,
    defaultDrawingStyle, onDrawingPropertyChange,
    onRibbonToolClick, onAddImage, onAddShape,
    onDownload, isDownloadDisabled,
    onOpenFile, onAddFile
}: RibbonProps) => {
    const { t } = useLanguage();
    const [isShapesOpen, setIsShapesOpen] = useState(false);
    const imageInputRef = useRef<HTMLInputElement>(null);
    const shapesWrapperRef = useRef<HTMLDivElement>(null);

    return (
        <div className="bg-white border-b border-slate-300 shadow-sm flex items-start overflow-x-auto py-1 relative z-40">
            
            {/* File Operations */}
            <ToolGroup title={t('editHeader.openFile')}>
                 <RibbonButton icon={ICONS.close} label={t('editThumbnails.closeFileTooltip')} onClick={onOpenFile} />
                 <RibbonButton icon={ICONS.addFile} label={t('editHeader.addFile')} onClick={onAddFile} />
            </ToolGroup>

             {/* Edit History */}
             <ToolGroup title={t('editRibbon.group.edit')}>
                <RibbonButton icon={ICONS.undo} label={t('editRibbon.undo')} onClick={() => { if (onUndo) onUndo(); }} disabled={!canUndo} />
                <RibbonButton icon={ICONS.redo} label={t('editRibbon.redo')} onClick={() => { if (onRedo) onRedo(); }} disabled={!canRedo} />
                <RibbonButton icon={ICONS.reset} label={t('editRibbon.reset')} onClick={() => { if (onReset) onReset(); }} disabled={!canReset}/>
            </ToolGroup>

            {/* Insert Tools */}
            <ToolGroup title={t('editRibbon.group.create')}>
                <RibbonButton 
                    icon={ICONS.select} 
                    label={t('editRibbon.select')} 
                    onClick={() => onToolSelect('select')} 
                    isActive={activeTool === 'select'} 
                />
                <RibbonButton 
                    icon={ICONS.textInsert} 
                    label={t('editRibbon.textInsert')} 
                    onClick={() => onToolSelect('text')} 
                    isActive={activeTool === 'text'} 
                />
                <RibbonButton 
                    icon={ICONS.image} 
                    label={t('editRibbon.imageInsert')} 
                    onClick={() => imageInputRef.current?.click()} 
                />
                <input 
                    type="file" 
                    ref={imageInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0] && onAddImage) {
                            onAddImage(e.target.files[0]);
                            e.target.value = '';
                        }
                    }} 
                />
                <div className="relative" ref={shapesWrapperRef}>
                    <RibbonButton 
                        icon={ICONS.shapes} 
                        label={t('editRibbon.shapes')} 
                        onClick={() => setIsShapesOpen(!isShapesOpen)} 
                        isActive={isShapesOpen}
                        dropdown
                    />
                    {isShapesOpen && createPortal(
                        <div 
                            className="fixed z-[100]" 
                            style={{ 
                                top: shapesWrapperRef.current ? shapesWrapperRef.current.getBoundingClientRect().bottom : 0, 
                                left: shapesWrapperRef.current ? shapesWrapperRef.current.getBoundingClientRect().left : 0 
                            }}
                        >
                            <ShapesDropdown onShapeSelect={(shape) => {
                                if (onAddShape) onAddShape(shape);
                                setIsShapesOpen(false);
                            }} />
                            {/* Overlay to close dropdown */}
                            <div className="fixed inset-0 z-[-1]" onClick={() => setIsShapesOpen(false)} />
                        </div>,
                        document.body
                    )}
                </div>
                 <RibbonButton 
                    icon={ICONS.draw} 
                    label={t('editRibbon.lineDraw')} 
                    onClick={() => onToolSelect('draw')} 
                    isActive={activeTool === 'draw'} 
                />
            </ToolGroup>

             {/* PDF Tools */}
            <ToolGroup title={t('editRibbon.group.tools')}>
                 <RibbonButton icon={ICONS.merge} label={t('editRibbon.pdfMerge')} onClick={() => onRibbonToolClick && onRibbonToolClick('merge')} />
                 <RibbonButton icon={ICONS.split} label={t('editRibbon.pdfSplit')} onClick={() => onRibbonToolClick && onRibbonToolClick('split')} />
                 <RibbonButton icon={ICONS.compress} label={t('editRibbon.pdfCompress')} onClick={() => onRibbonToolClick && onRibbonToolClick('compress')} />
                 <RibbonButton icon={ICONS.convert} label={t('editRibbon.pdfConvert')} onClick={() => onRibbonToolClick && onRibbonToolClick('convert')} />
            </ToolGroup>

             {/* Download */}
            <ToolGroup title={t('common.download')}>
                 <RibbonButton icon={ICONS.download} label={t('common.download')} onClick={onDownload} disabled={isDownloadDisabled} />
            </ToolGroup>

        </div>
    );
};
