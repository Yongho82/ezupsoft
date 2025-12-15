import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ICONS } from '../Icons';
import { PaletteColorPicker } from './PaletteColorPicker';
import { EDITOR_FONTS } from '../../utils/fonts';

type TextObject = {
  id: string;
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fontSize: number;
  fontFamily: string;
  color: string;
  backgroundColor: string;
  isBold: boolean;
  isItalic: boolean;
  textAlign: 'left' | 'center' | 'right';
  opacity?: number;
};

type TextOptionsToolbarProps = {
    selectedObjectProps?: Partial<TextObject>;
    onTextPropertyChange?: (property: keyof TextObject, value: any) => void;
};

const FONTS = EDITOR_FONTS;

const FONT_SIZES = [8, 10, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72];

export const TextOptionsToolbar = ({ selectedObjectProps, onTextPropertyChange }: TextOptionsToolbarProps) => {
    const { t } = useLanguage();
    const props = selectedObjectProps || {};
    const handlePropChange = onTextPropertyChange || (() => {});
    const [isPaletteOpen, setIsPaletteOpen] = useState(false);

    return (
        <div className="bg-slate-50 border-b border-slate-300 px-4 py-2 flex items-center justify-center space-x-4">
            {/* Font Selector */}
            <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-slate-600 mr-1">{t('textOptions.font')}:</span>
                <select
                    value={props.fontFamily || 'Noto Sans KR'}
                    onChange={(e) => handlePropChange('fontFamily', e.target.value)}
                    className="text-sm border border-slate-300 rounded-md p-1 w-32"
                >
                    {FONTS.map(font => <option key={font.name} value={font.name} style={{fontFamily: font.name}}>{font.label}</option>)}
                </select>
            </div>

            {/* Font Size Selector */}
            <div className="flex items-center space-x-1">
                <span className="text-sm font-semibold text-slate-600 mr-1">{t('textOptions.size')}:</span>
                <select
                    value={props.fontSize || 16}
                    onChange={(e) => handlePropChange('fontSize', parseInt(e.target.value, 10))}
                    className="text-sm border border-slate-300 rounded-md p-1 w-16"
                >
                    {FONT_SIZES.map(size => <option key={size} value={size}>{size}</option>)}
                </select>
            </div>

            <div className="h-6 w-px bg-slate-300" />

            {/* Color Picker */}
            <div className={`relative ${isPaletteOpen ? 'z-10' : ''}`}>
                 <PaletteColorPicker
                    color={props.color || '#000000'}
                    onChange={(c) => handlePropChange('color', c)}
                    icon={ICONS.text}
                    title={t('editRibbon.textColor')}
                    showTitle={false}
                    isOpen={isPaletteOpen}
                    onToggle={() => setIsPaletteOpen(p => !p)}
                    onClose={() => setIsPaletteOpen(false)}
                 />
            </div>

            {/* Bold Button */}
            <button 
                onClick={() => handlePropChange('isBold', !props.isBold)}
                className={`p-2 rounded-md ${props.isBold ? 'bg-blue-200' : 'hover:bg-slate-200'}`}
                title={t('textOptions.bold')}
            >
                <span className="font-bold w-5 h-5 flex items-center justify-center">B</span>
            </button>
            
            {/* Text Align Button */}
            <button 
                onClick={() => handlePropChange('textAlign', props.textAlign === 'left' ? 'center' : props.textAlign === 'center' ? 'right' : 'left')}
                className="p-2 rounded-md hover:bg-slate-200"
                title={t('textOptions.align')}
            >
                <span className="w-5 h-5 block">{ICONS.textAlign}</span>
            </button>
            
            <div className="h-6 w-px bg-slate-300" />

            {/* Opacity Slider */}
            <div className="flex items-center space-x-2">
                <label htmlFor="text-opacity-slider" className="text-sm font-semibold text-slate-600">
                    {t('textOptions.opacity')}
                </label>
                <input
                    id="text-opacity-slider"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={props.opacity ?? 1}
                    onChange={e => handlePropChange('opacity', parseFloat(e.target.value))}
                    className="w-24 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
            </div>
        </div>
    );
};