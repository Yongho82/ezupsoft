import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../contexts/LanguageContext';
import { ICONS } from '../Icons';

const PALETTE_COLORS = [
    'transparent', '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
    '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
    '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc',
    '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#9fc5e8', '#b4a7d6', '#d5a6bd',
    '#cc4125', '#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6d9eeb', '#6fa8dc', '#8e7cc3', '#c27ba0',
    '#a61c00', '#cc0000', '#e69138', '#f1c232', '#6aa84f', '#45818e', '#3c78d8', '#3d85c6', '#674ea7', '#a64d79',
    '#85200c', '#990000', '#b45f06', '#bf9000', '#38761d', '#134f5c', '#0b5394', '#073763', '#351c75', '#741b47'
];

const THEME_COLORS = [
    ['#ffffff', '#000000', '#eeece1', '#1f497d', '#4f81bd', '#c0504d', '#9bbb59', '#8064a2', '#4bacc6', '#f79646'],
    ['#f2f2f2', '#7f7f7f', '#ddd9c3', '#c6d9f0', '#dbe5f1', '#f2dcdb', '#ebf1dd', '#e5e0ec', '#dbeef3', '#fdeada'],
    ['#d8d8d8', '#595959', '#c4bd97', '#8db3e2', '#b8cce4', '#e5b9b7', '#d7e3bc', '#ccc1d9', '#b7dde8', '#fbd5b5'],
    ['#bfbfbf', '#3f3f3f', '#938953', '#548dd4', '#95b3d7', '#d99694', '#c3d69b', '#b2a2c7', '#92cddc', '#fac08f'],
    ['#a5a5a5', '#262626', '#494429', '#17365d', '#366092', '#953734', '#76923c', '#5f497a', '#31859b', '#e36c09'],
    ['#7f7f7f', '#0c0c0c', '#1d1b10', '#0f243e', '#244061', '#632423', '#4f6128', '#3f3151', '#205867', '#974806'],
];
const STANDARD_COLORS = ['#c00000', '#ff0000', '#ffc000', '#ffff00', '#92d050', '#00b050', '#00b0f0', '#0070c0', '#002060', '#7030a0'];


const TransparentIcon = () => (
    <div className="w-full h-full relative bg-white border border-slate-300">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 10 10" preserveAspectRatio="none">
            <line x1="0" y1="10" x2="10" y2="0" stroke="red" strokeWidth="1.5" />
        </svg>
    </div>
);

export const PaletteColorPicker = ({ color, onChange, icon, title, showTitle=true, isStandalone=false, isOpen, onToggle, onClose }: { color: string; onChange: (color: string) => void; icon?: React.ReactNode; title: string, showTitle?: boolean, isStandalone?:boolean, isOpen: boolean, onToggle: () => void, onClose: () => void }) => {
    const { t } = useLanguage();
    const buttonRef = useRef<HTMLButtonElement>(null);
    const paletteRef = useRef<HTMLDivElement>(null);
    const [paletteStyle, setPaletteStyle] = useState<React.CSSProperties>({});

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
                return;
            }
            if (paletteRef.current && !paletteRef.current.contains(event.target as Node)) {
                onClose();
            }
        }
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPaletteStyle({
                position: 'fixed',
                top: `${rect.bottom + 4}px`,
                left: `${rect.left + rect.width / 2}px`,
                transform: 'translateX(-50%)',
                zIndex: 50,
            });
        }
    }, [isOpen]);

    const handleColorSelect = (c: string) => {
        onChange(c);
        onClose();
    }

    const simplePalette = (
        <div className="grid grid-cols-11 gap-1">
            {PALETTE_COLORS.map(c => (
                <button 
                    key={c}
                    className={`w-6 h-6 rounded-md border-2 ${color.toLowerCase() === c.toLowerCase() ? 'border-blue-500' : 'border-transparent'} p-0.5`}
                    onClick={() => handleColorSelect(c)}
                >
                    <div className="w-full h-full rounded" style={{ backgroundColor: c }}>
                        {c === 'transparent' && <TransparentIcon />}
                    </div>
                </button>
            ))}
        </div>
    );

    const advancedPalette = (
         <div className="w-64">
            <div className="px-1 text-xs text-slate-500 mb-1">{t('colorPicker.themeColors')}</div>
            <div className="grid grid-cols-10 gap-1 px-1 mb-2">
                {THEME_COLORS.flat().map((c, i) => (
                    <button key={i} onClick={() => handleColorSelect(c)} className={`w-5 h-5 rounded-sm ring-1 ring-inset ring-slate-200 ${color === c ? 'ring-2 ring-blue-500' : ''}`} style={{ backgroundColor: c }} />
                ))}
            </div>
            <div className="px-1 text-xs text-slate-500 mb-1">{t('colorPicker.standardColors')}</div>
            <div className="grid grid-cols-10 gap-1 px-1">
                {STANDARD_COLORS.map(c => (
                    <button key={c} onClick={() => handleColorSelect(c)} className={`w-5 h-5 rounded-sm ring-1 ring-inset ring-slate-200 ${color === c ? 'ring-2 ring-blue-500' : ''}`} style={{ backgroundColor: c }} />
                ))}
            </div>
        </div>
    );
    
    const PaletteContent = (
        <div ref={paletteRef} style={paletteStyle} className="bg-white border border-slate-300 shadow-lg rounded-lg p-3">
            {isStandalone ? advancedPalette : simplePalette}
        </div>
    );


    return (
        <>
            {isStandalone ? (
                <button ref={buttonRef} onClick={onToggle} className="w-full p-2 border border-slate-300 rounded-md flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-6 h-6 rounded-md border border-slate-300 mr-2 p-0.5">
                             <div className="w-full h-full rounded-sm" style={{ backgroundColor: color }}>
                                {color === 'transparent' && <TransparentIcon />}
                            </div>
                        </div>
                        <span className="text-sm">{color}</span>
                    </div>
                    <span className="text-xs">▼</span>
                </button>
            ) : (
                 <button 
                    ref={buttonRef}
                    onClick={onToggle}
                    className="relative p-1 rounded-md hover:bg-slate-200 flex flex-col items-center"
                    title={title}
                >
                    {showTitle ? <span className="text-xs">{title}</span> : <span className="w-5 h-5 block text-slate-700">{icon}</span>}
                    <div 
                        className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-1" 
                        style={{ backgroundColor: color === 'transparent' ? '#FFFFFF' : color, border: color === 'transparent' ? '0.5px solid #ccc' : 'none' }}
                    ></div>
                </button>
            )}

            {isOpen && createPortal(PaletteContent, document.body)}
        </>
    );
};