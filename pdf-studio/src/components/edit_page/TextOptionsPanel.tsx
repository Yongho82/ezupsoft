
import React, { useState } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { ICONS } from '../Icons';
import { PaletteColorPicker } from './PaletteColorPicker';
import { EDITOR_FONTS } from '../../utils/fonts';
import { TextObject } from '../../types/editPageTypes';

type TextOptionsPanelProps = {
    textObject: TextObject;
    onUpdate: (property: keyof TextObject, value: any) => void;
};

const FONTS = EDITOR_FONTS;
const FONT_SIZES = [8, 10, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72];

export const TextOptionsPanel = ({ textObject, onUpdate }: TextOptionsPanelProps) => {
    const { t } = useLanguage();
    const [openPicker, setOpenPicker] = useState<'color' | 'bg' | null>(null);

    return (
        <aside className="w-full h-full bg-white flex flex-col flex-shrink-0 p-4 overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3 sticky top-0 bg-white z-10">
                {t('textOptions.title')}
            </h3>

            <div className="space-y-4 text-sm">
                
                {/* Font Family */}
                <div>
                    <label className="font-semibold text-slate-600 block mb-1">{t('textOptions.font')}</label>
                    <select
                        value={textObject.fontFamily || 'Noto Sans KR'}
                        onChange={(e) => onUpdate('fontFamily', e.target.value)}
                        className="w-full border border-slate-300 rounded-md p-2"
                    >
                        {FONTS.map(font => <option key={font.name} value={font.name} style={{fontFamily: font.name}}>{font.label}</option>)}
                    </select>
                </div>

                {/* Font Size & Style */}
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="font-semibold text-slate-600 block mb-1">{t('textOptions.size')}</label>
                        <select
                            value={textObject.fontSize || 16}
                            onChange={(e) => onUpdate('fontSize', parseInt(e.target.value, 10))}
                            className="w-full border border-slate-300 rounded-md p-2"
                        >
                            {FONT_SIZES.map(size => <option key={size} value={size}>{size}</option>)}
                        </select>
                    </div>
                    <div className="flex items-end space-x-1">
                        <button 
                            onClick={() => onUpdate('isBold', !textObject.isBold)}
                            className={`flex-1 h-[38px] rounded-md border border-slate-300 ${textObject.isBold ? 'bg-blue-100 border-blue-400 text-blue-700' : 'hover:bg-slate-100 text-slate-700'}`}
                            title={t('textOptions.bold')}
                        >
                            <span className="font-bold">B</span>
                        </button>
                        <button 
                            onClick={() => onUpdate('isItalic', !textObject.isItalic)}
                            className={`flex-1 h-[38px] rounded-md border border-slate-300 ${textObject.isItalic ? 'bg-blue-100 border-blue-400 text-blue-700' : 'hover:bg-slate-100 text-slate-700'}`}
                            title="Italic"
                        >
                            <span className="italic">I</span>
                        </button>
                    </div>
                </div>

                {/* Colors */}
                <div className="grid grid-cols-2 gap-2">
                     <div className="relative z-20">
                        <label className="font-semibold text-slate-600 block mb-1">{t('editRibbon.textColor')}</label>
                         <PaletteColorPicker
                            color={textObject.color || '#000000'}
                            onChange={(c) => onUpdate('color', c)}
                            title={t('editRibbon.textColor')}
                            showTitle={false}
                            isStandalone
                            isOpen={openPicker === 'color'}
                            onToggle={() => setOpenPicker(p => p === 'color' ? null : 'color')}
                            onClose={() => setOpenPicker(null)}
                         />
                    </div>
                    <div className="relative z-10">
                        <label className="font-semibold text-slate-600 block mb-1">{t('editRibbon.backgroundColor')}</label>
                         <PaletteColorPicker
                            color={textObject.backgroundColor || 'transparent'}
                            onChange={(c) => onUpdate('backgroundColor', c)}
                            title={t('editRibbon.backgroundColor')}
                            showTitle={false}
                            isStandalone
                            isOpen={openPicker === 'bg'}
                            onToggle={() => setOpenPicker(p => p === 'bg' ? null : 'bg')}
                            onClose={() => setOpenPicker(null)}
                         />
                    </div>
                </div>

                {/* Alignment */}
                <div>
                    <label className="font-semibold text-slate-600 block mb-1">{t('textOptions.align')}</label>
                    <div className="flex border border-slate-300 rounded-md overflow-hidden">
                        {['left', 'center', 'right'].map((align) => (
                            <button
                                key={align}
                                onClick={() => onUpdate('textAlign', align)}
                                className={`flex-1 p-2 hover:bg-slate-100 ${textObject.textAlign === align ? 'bg-blue-100' : 'bg-white'}`}
                            >
                                <span className="block w-5 h-5 mx-auto text-slate-600">
                                    {align === 'left' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7h18v2H3V7zm0 4h12v2H3v-2zm0 4h18v2H3v-2z"/></svg>}
                                    {align === 'center' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7h18v2H3V7zm3 4h12v2H6v-2zm-3 4h18v2H3v-2z"/></svg>}
                                    {align === 'right' && <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 7h18v2H3V7zm6 4h12v2H9v-2zm-6 4h18v2H3v-2z"/></svg>}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Opacity */}
                <div>
                    <label className="font-semibold text-slate-600 block mb-1">
                        {t('textOptions.opacity')} ({Math.round((textObject.opacity ?? 1) * 100)}%)
                    </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={textObject.opacity ?? 1}
                        onChange={e => onUpdate('opacity', parseFloat(e.target.value))}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

            </div>
        </aside>
    );
};
