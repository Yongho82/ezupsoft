
import React, { useState } from 'react';
import { ShapeObject } from '../../types/editPageTypes';
import { useLanguage } from '../../contexts/LanguageContext';
import { ICONS } from '../Icons';
import { PaletteColorPicker } from './PaletteColorPicker';
import { EDITOR_FONTS } from '../../utils/fonts';

type ShapeOptionsPanelProps = {
    shape: ShapeObject;
    onUpdate: (props: Partial<ShapeObject>) => void;
};

// FIX: Explicitly type LineStyleButton as a React.FC to ensure TypeScript correctly handles special React props like 'key'.
type LineStyleButtonProps = {
    dashArray: number[];
    onClick: () => void;
    isSelected: boolean;
};

const LineStyleButton: React.FC<LineStyleButtonProps> = ({ dashArray, onClick, isSelected }) => (
    <button onClick={onClick} className={`w-full p-2 rounded-md ${isSelected ? 'bg-blue-100' : 'hover:bg-slate-100'}`}>
        <svg width="100%" height="10" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="5" x2="100%" y2="5" stroke="currentColor" strokeWidth="2" strokeDasharray={dashArray.join(' ')} />
        </svg>
    </button>
);

const FONTS = EDITOR_FONTS;

export const ShapeOptionsPanel = ({ shape, onUpdate }: ShapeOptionsPanelProps) => {
    const { t } = useLanguage();
    const [openPicker, setOpenPicker] = useState<'fill' | 'stroke' | 'text' | null>(null);

    const lineStyles = [
        { name: 'Solid', value: [] },
        { name: 'Dashed', value: [8, 4] },
        { name: 'Dotted', value: [2, 4] },
    ];

    return (
        <aside className="w-full h-full bg-white flex flex-col flex-shrink-0 p-4 overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3 sticky top-0 bg-white z-10">
                {t('shapeOptions.title')}
            </h3>
            
            <div className="space-y-3 text-sm">
                {/* Shape Properties */}
                <div className="grid grid-cols-5 gap-x-2 gap-y-3 items-center">
                    <label className="col-span-2 font-semibold text-slate-600">{t('shapeOptions.fillColor')}</label>
                    <div className="col-span-3 relative z-30">
                        <PaletteColorPicker
                            color={shape.fillColor}
                            onChange={color => onUpdate({ fillColor: color })}
                            title={t('shapeOptions.fillColor')}
                            showTitle={false}
                            isStandalone
                            isOpen={openPicker === 'fill'}
                            onToggle={() => setOpenPicker(p => p === 'fill' ? null : 'fill')}
                            onClose={() => setOpenPicker(null)}
                        />
                    </div>

                    <label className="col-span-2 font-semibold text-slate-600">{t('shapeOptions.lineColor')}</label>
                    <div className="col-span-3 relative z-20">
                         <PaletteColorPicker
                            color={shape.strokeColor}
                            onChange={color => onUpdate({ strokeColor: color })}
                            title={t('shapeOptions.lineColor')}
                            showTitle={false}
                            isStandalone
                            isOpen={openPicker === 'stroke'}
                            onToggle={() => setOpenPicker(p => p === 'stroke' ? null : 'stroke')}
                            onClose={() => setOpenPicker(null)}
                        />
                    </div>

                    <label htmlFor="stroke-width-slider" className="col-span-2 font-semibold text-slate-600">
                        {t('shapeOptions.lineThickness')}
                    </label>
                    <div className="col-span-3 flex items-center space-x-2">
                        <input
                            id="stroke-width-slider"
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            value={shape.strokeWidth}
                            onChange={e => onUpdate({ strokeWidth: parseInt(e.target.value, 10) })}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="w-10 text-right">{shape.strokeWidth}px</span>
                    </div>

                    <label htmlFor="shape-opacity-slider" className="col-span-2 font-semibold text-slate-600">
                        투명도
                    </label>
                    <div className="col-span-3 flex items-center space-x-2">
                        <input
                            id="shape-opacity-slider"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={shape.opacity ?? 1}
                            onChange={e => onUpdate({ opacity: parseFloat(e.target.value) })}
                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <span className="w-10 text-right">{Math.round((shape.opacity ?? 1) * 100)}%</span>
                    </div>
                </div>

                <div>
                    <label className="text-sm font-semibold text-slate-600 block mb-1">
                        선 스타일
                    </label>
                    <div className="grid grid-cols-3 gap-2 text-slate-700" style={{ color: shape.strokeColor === 'transparent' ? '#000000' : shape.strokeColor }}>
                        {lineStyles.map(style => (
                            <LineStyleButton 
                                key={style.name}
                                dashArray={style.value}
                                onClick={() => onUpdate({ strokeDashArray: style.value })}
                                isSelected={JSON.stringify(shape.strokeDashArray) === JSON.stringify(style.value)}
                            />
                        ))}
                    </div>
                </div>

                {/* Text Properties */}
                <div className="border-t border-slate-200 pt-3 mt-3 space-y-2">
                    <label className="font-semibold text-slate-600 block">도형 텍스트</label>
                    <textarea
                        value={shape.text || ''}
                        onChange={e => onUpdate({ text: e.target.value })}
                        className="w-full p-2 border border-slate-300 rounded-md text-sm"
                        rows={2}
                        placeholder="도형 안에 텍스트를 입력하세요..."
                    />
                    <div className="grid grid-cols-5 gap-x-2 gap-y-3 items-center">
                        <label className="col-span-2 font-semibold text-slate-600">글꼴</label>
                        <div className="col-span-3">
                            <select
                                value={shape.fontFamily || 'Noto Sans KR'}
                                onChange={e => onUpdate({ fontFamily: e.target.value })}
                                className="w-full text-sm border border-slate-300 rounded-md p-2"
                            >
                                {FONTS.map(font => <option key={font.name} value={font.name} style={{fontFamily: font.name}}>{font.label}</option>)}
                            </select>
                        </div>

                         <label className="col-span-2 font-semibold text-slate-600">텍스트 색상</label>
                         <div className="col-span-3 relative z-10">
                             <PaletteColorPicker
                                color={shape.textColor || '#000000'}
                                onChange={color => onUpdate({ textColor: color })}
                                title={'텍스트 색상'}
                                showTitle={false}
                                isStandalone
                                isOpen={openPicker === 'text'}
                                onToggle={() => setOpenPicker(p => p === 'text' ? null : 'text')}
                                onClose={() => setOpenPicker(null)}
                            />
                        </div>

                        <label htmlFor="shape-font-size-slider" className="col-span-2 font-semibold text-slate-600">
                            글자 크기
                        </label>
                        <div className="col-span-3 flex items-center space-x-2">
                            <input
                                id="shape-font-size-slider"
                                type="range" min="8" max="48" step="1"
                                value={shape.fontSize || 16}
                                onChange={e => onUpdate({ fontSize: parseInt(e.target.value, 10) })}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                            />
                            <span className="w-10 text-right">{shape.fontSize || 16}</span>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
