import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from '../Icons';
import { useLanguage } from '../../contexts/LanguageContext';
import { TextObject } from '../../types/editPageTypes';
import { ShapeType } from './ShapesDropdown';
import { CheckmarkDropdown } from './CheckmarkDropdown';

type WatermarkHeaderProps = {
    activeTool: string;
    onToolSelect: (tool: string) => void;
    onAddText: (text: Omit<TextObject, 'id'>) => void;
    onAddShape: (shapeType: ShapeType) => void;
    onUndo: () => void;
    onRedo: () => void;
    canUndo: boolean;
    canRedo: boolean;
    onDownload: () => void;
    isDownloadDisabled: boolean;
    onSignatureClick: () => void;
};

const ToolbarButton = ({ icon, label, onClick, isActive = false, disabled = false, children }: { icon: React.ReactNode, label: string, onClick?: () => void, isActive?: boolean, disabled?: boolean, children?: React.ReactNode }) => (
    <div className="relative">
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center justify-center text-slate-700 rounded-md p-2 h-12 w-14 transition-colors ${isActive ? 'bg-blue-100' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}`}
            title={label}
        >
            <span className="w-6 h-6">{icon}</span>
        </button>
        {children}
    </div>
);

const ToolbarButtonWithText = ({ icon, label, onClick, isActive = false, disabled = false, children }: { icon: React.ReactNode, label: string, onClick?: () => void, isActive?: boolean, disabled?: boolean, children?: React.ReactNode }) => (
    <div className="relative">
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex items-center text-slate-700 rounded-md p-2 h-12 transition-colors ${isActive ? 'bg-blue-100' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-100'}`}
            title={label}
        >
            <span className="w-6 h-6 mr-1">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </button>
        {children}
    </div>
);


export const WatermarkHeader = ({ activeTool, onToolSelect, onAddText, onAddShape, onUndo, onRedo, canUndo, canRedo, onDownload, isDownloadDisabled, onSignatureClick }: WatermarkHeaderProps) => {
    const { t } = useLanguage();
    const [isCheckmarkDropdownOpen, setCheckmarkDropdownOpen] = useState(false);
    const checkmarkBtnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (checkmarkBtnRef.current && !checkmarkBtnRef.current.contains(event.target as Node)) {
                setCheckmarkDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleAddDate = () => {
        const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').slice(0, -1);
        onAddText({
            text: today, x: 0.4, y: 0.4, width: 0.2, height: 0.05,
            fontFamily: 'NotoSansKR-Regular', fontSize: 16, color: '#000000', backgroundColor: 'transparent',
            isBold: false, isItalic: false, textAlign: 'left',
        });
    };

    const handleAddTextDefault = () => {
        onAddText({
            text: t('pdfViewer.defaultText'),
            x: 0.4, y: 0.45, width: 0.2, height: 0.05,
            fontFamily: 'NotoSansKR-Regular', fontSize: 16, color: '#000000', backgroundColor: 'transparent',
            isBold: false, isItalic: false, textAlign: 'left',
        });
    };

    return (
        <header className="relative bg-white border-b border-slate-300 px-4 py-1 flex items-center justify-between shadow-sm flex-shrink-0">
            <div className="flex items-center space-x-1">
                <ToolbarButton icon={ICONS.select} label={t('watermarkHeader.select')} onClick={() => onToolSelect('select')} isActive={activeTool === 'select'} />
                <div className="w-px h-8 bg-slate-200 mx-2" />
                <ToolbarButtonWithText icon={ICONS.signature} label={t('watermarkHeader.signature')} onClick={onSignatureClick} />
                <ToolbarButton icon={ICONS.calendar} label={t('watermarkHeader.date')} onClick={handleAddDate} />
                <ToolbarButton icon={ICONS.textInsert} label={t('watermarkHeader.text')} onClick={handleAddTextDefault} />
                <div ref={checkmarkBtnRef}>
                    <ToolbarButton icon={ICONS.checkmark_tool} label={t('watermarkHeader.stamps')} onClick={() => setCheckmarkDropdownOpen(p => !p)} isActive={isCheckmarkDropdownOpen}>
                         {isCheckmarkDropdownOpen && <CheckmarkDropdown onShapeSelect={(shape) => { onAddShape(shape); setCheckmarkDropdownOpen(false); }} />}
                    </ToolbarButton>
                </div>
                <div className="w-px h-8 bg-slate-200 mx-2" />
                <ToolbarButton icon={ICONS.undo} label={t('editRibbon.undo')} onClick={onUndo} disabled={!canUndo} />
                <ToolbarButton icon={ICONS.redo} label={t('editRibbon.redo')} onClick={onRedo} disabled={!canRedo} />
            </div>
            <div className="flex items-center">
                 <button
                    onClick={onDownload}
                    disabled={isDownloadDisabled}
                    className="flex items-center bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    <span className="w-5 h-5 mr-2">{ICONS.download}</span>
                    {t('common.download')}
                </button>
            </div>
        </header>
    );
};