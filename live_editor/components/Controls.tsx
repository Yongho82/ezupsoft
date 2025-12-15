import React, { useState, useRef, useEffect, useMemo } from 'react';
import type { SelectedElementInfo } from '../types';
import { ColorPicker } from './controls/ColorPicker';
import { ImagePopover } from './controls/ImagePopover';
import { VideoPopover } from './controls/VideoPopover';
import { IconPopover } from './controls/IconPopover';
import { TablePopover } from './controls/TablePopover';
import { ShapePopover } from './controls/ShapePopover';
import { ChartPopover } from './controls/ChartPopover';
import { LayoutPopover } from './controls/LayoutPopover';
import { EffectsPopover } from './controls/EffectsPopover';
import { LinkPopover } from './controls/LinkPopover';
import { LayoutPresetPopover } from './controls/LayoutPresetPopover';
import { InteractionPopover } from './controls/InteractionPopover';
import { LineHeightPopover } from './controls/LineHeightPopover';
import { TFunction } from '../hooks/useTranslations';

interface ControlsProps {
  selectedElements: SelectedElementInfo[];
  setSelectedElements: React.Dispatch<React.SetStateAction<SelectedElementInfo[]>>;
  onNumericStyleChange: (property: keyof SelectedElementInfo, value: number, unit?: string) => void;
  onGenericStyleChange: (property: keyof SelectedElementInfo, value: string | number) => void;
  onTextAlignChange: (alignment: string) => void;
  onVerticalAlignChange: (alignment: string) => void;
  onTextStyleToggle: (property: 'fontWeight' | 'fontStyle' | 'textDecoration', value: 'bold' | 'italic' | 'underline' | 'line-through') => void;
  onTextColorChange: (color: string) => void;
  onBgChange: (color: string) => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  onInsertElement: (elementString: string, scriptString?: string) => void;
  bodyBgColor: string;
  pageWidth: number;
  pageHeight: number;
  onPageSizeChange: (dimension: 'width' | 'height', value: number) => void;
  isMultiSelectMode: boolean;
  setIsMultiSelectMode: React.Dispatch<React.SetStateAction<boolean>>;
  setBlobUrlMap: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onLinkUpdate: (url: string, target: string, remove?: boolean) => void;
  onApplyStylePreset: (styles: Record<string, string | number>) => void;
  onAlignmentChange: (alignment: 'left' | 'center' | 'right') => void;
  onApplyAnimation: (animationClass: string) => void;
  onAutoResize: () => void;
  isPageSizeDefined: boolean;
  onHoverStyleChange: (property: 'color' | 'backgroundColor', value: string) => void;
  cssCode: string;
  t: TFunction;
}

const SHADOW_PRESETS = (t: TFunction) => ({
  [t('controls.shadow.presets.none')]: 'none',
  [t('controls.shadow.presets.sm')]: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  [t('controls.shadow.presets.md')]: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  [t('controls.shadow.presets.lg')]: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
});

const BUTTON_PRESETS = (t: TFunction) => ({
  [t('controls.buttonStyle.presets.basic')]: { backgroundColor: '#3b82f6', color: '#ffffff', border: '1px solid transparent', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
  [t('controls.buttonStyle.presets.outline')]: { backgroundColor: 'transparent', color: '#3b82f6', border: '1px solid #3b82f6', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
  [t('controls.buttonStyle.presets.text')]: { backgroundColor: 'transparent', color: '#3b82f6', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
});

const BORDER_STYLES = (t: TFunction) => [
  { value: 'solid', label: t('controls.style.borderStyles.solid') },
  { value: 'dashed', label: t('controls.style.borderStyles.dashed') },
  { value: 'dotted', label: t('controls.style.borderStyles.dotted') },
  { value: 'double', label: t('controls.style.borderStyles.double') },
  { value: 'groove', label: t('controls.style.borderStyles.groove') },
  { value: 'ridge', label: t('controls.style.borderStyles.ridge') },
  { value: 'inset', label: t('controls.style.borderStyles.inset') },
  { value: 'outset', label: t('controls.style.borderStyles.outset') },
  { value: 'none', label: t('controls.style.borderStyles.none') },
];

const FONT_FAMILIES = [
  // --- Korean Fonts ---
  'Noto Sans KR',
  'Nanum Gothic',
  'Nanum Myeongjo',
  'Gowun Dodum',
  // --- Recommended Web Fonts ---
  'Google Sans',
  'Roboto',
  'Poppins',
  'Montserrat',
  'Open Sans',
  'Lato',
  'Source Sans Pro',
  'Merriweather',
  'Oswald',
  'Playfair Display',
  // --- Monospace ---
  'JetBrains Mono',
  'Courier New',
  // --- System UI Fonts (Sans-serif) ---
  'Arial',
  'Helvetica',
  'Verdana',
  'Tahoma',
  'Trebuchet MS',
  // --- System UI Fonts (Serif) ---
  'Times New Roman',
  'Georgia',
  'Garamond',
  // --- Cursive ---
  'Brush Script MT',
];

const FONT_SIZES = [8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36, 48, 60, 72];

const loginFormHtml = `
<div style="width: 320px; padding: 24px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.05); font-family: sans-serif;">
    <h2 style="font-size: 22px; margin-top: 0; margin-bottom: 20px; text-align: center;">로그인</h2>
    <div style="margin-bottom: 16px;">
        <label for="email" style="display: block; font-size: 14px; margin-bottom: 6px; color: #555;">이메일</label>
        <input type="email" id="email" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
    </div>
    <div style="margin-bottom: 20px;">
        <label for="password" style="display: block; font-size: 14px; margin-bottom: 6px; color: #555;">비밀번호</label>
        <input type="password" id="password" style="width: 100%; padding: 10px; font-size: 14px; border: 1px solid #ccc; border-radius: 4px; box-sizing: border-box;">
    </div>
    <button style="width: 100%; padding: 12px; font-size: 16px; border: none; border-radius: 4px; background-color: #007bff; color: white; cursor: pointer;">로그인</button>
</div>
`;

export const Controls: React.FC<ControlsProps> = ({
  selectedElements,
  setSelectedElements,
  onNumericStyleChange,
  onGenericStyleChange,
  onTextAlignChange,
  onVerticalAlignChange,
  onTextStyleToggle,
  onTextColorChange,
  onBgChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  onInsertElement,
  bodyBgColor,
  pageWidth,
  pageHeight,
  onPageSizeChange,
  isMultiSelectMode,
  setIsMultiSelectMode,
  setBlobUrlMap,
  onLinkUpdate,
  onApplyStylePreset,
  onAlignmentChange,
  onApplyAnimation,
  onAutoResize,
  isPageSizeDefined,
  onHoverStyleChange,
  cssCode,
  t,
}) => {
  const isDisabled = selectedElements.length === 0;
  const isMultiSelect = selectedElements.length > 1;
  const selectedElement = selectedElements[0] || null;

  const hoverStyles = useMemo(() => {
    if (!selectedElement || !cssCode) {
      return { color: '', backgroundColor: '' };
    }

    const selector = selectedElement.id;
    const escapedSelector = selector.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
    // Match across newlines and allow additional selectors before the rule block
    // e.g., "#id:hover, #id:focus { ... }"
    const ruleRegex = new RegExp(`${escapedSelector}\\s*:\\s*hover\\b[^\\{]*\\{([\\s\\S]*?)\\}`, 'i');
    const match = cssCode.match(ruleRegex);

    if (!match) {
      return { color: '', backgroundColor: '' };
    }

    const stylesContent = match[1];
    const colorMatch = stylesContent.match(/(?:^|;)\s*color\s*:\s*([^;]+)/i);
    // Prefer background-color; fallback to background
    const bgColorMatch =
      stylesContent.match(/(?:^|;)\s*background-color\s*:\s*([^;]+)/i) ||
      stylesContent.match(/(?:^|;)\s*background\s*:\s*([^;]+)/i);

    const normalize = (val?: string) => (val ? val.replace(/!important/i, '').trim() : '');

    return {
      color: normalize(colorMatch?.[1]),
      backgroundColor: normalize(bgColorMatch?.[1]),
    };
  }, [cssCode, selectedElement]);

  const [isImagePopoverOpen, setIsImagePopoverOpen] = useState(false);
  const [isVideoPopoverOpen, setIsVideoPopoverOpen] = useState(false);
  const [isIconPopoverOpen, setIsIconPopoverOpen] = useState(false);
  const [isTablePopoverOpen, setIsTablePopoverOpen] = useState(false);
  const [isShapePopoverOpen, setIsShapePopoverOpen] = useState(false);
  const [isChartPopoverOpen, setIsChartPopoverOpen] = useState(false);
  const [isLayoutPopoverOpen, setIsLayoutPopoverOpen] = useState(false);
  const [isEffectsPopoverOpen, setIsEffectsPopoverOpen] = useState(false);
  const [isLinkPopoverOpen, setIsLinkPopoverOpen] = useState(false);
  const [isFontSizeDropdownOpen, setIsFontSizeDropdownOpen] = useState(false);
  const [isLayoutPresetPopoverOpen, setIsLayoutPresetPopoverOpen] = useState(false);
  const [isInteractionPopoverOpen, setIsInteractionPopoverOpen] = useState(false);
  const [isLineHeightPopoverOpen, setIsLineHeightPopoverOpen] = useState(false);

  const layoutButtonRef = useRef<HTMLButtonElement>(null);
  const effectsButtonRef = useRef<HTMLButtonElement>(null);
  const linkButtonRef = useRef<HTMLButtonElement>(null);
  const fontSizeRef = useRef<HTMLDivElement>(null);
  const insertLayoutButtonRef = useRef<HTMLButtonElement>(null);
  const interactionButtonRef = useRef<HTMLButtonElement>(null);
  const lineHeightButtonRef = useRef<HTMLButtonElement>(null);
  
  const [localPageWidth, setLocalPageWidth] = useState<number | string>(pageWidth);
  const [localPageHeight, setLocalPageHeight] = useState<number | string>(pageHeight);
  const [localFontSize, setLocalFontSize] = useState<number | string>('');
  const [localAnimationDuration, setLocalAnimationDuration] = useState<number | string>('');
  const [localAnimDistance, setLocalAnimDistance] = useState<number | string>('');

  useEffect(() => {
    if (selectedElements.length === 1) {
      setLocalFontSize(selectedElements[0].currentFontSize);
      const duration = parseFloat(selectedElements[0].animationDuration);
      if (!isNaN(duration) && duration > 0) {
        setLocalAnimationDuration(duration.toFixed(1));
      } else {
        setLocalAnimationDuration('');
      }
      // Init animation distance (px) from state like "20px"
      const dist = selectedElements[0].animDistance;
      if (dist && typeof dist === 'string') {
        const num = parseFloat(dist);
        setLocalAnimDistance(!isNaN(num) ? num : '');
      } else {
        setLocalAnimDistance('');
      }
    } else {
      setLocalFontSize('');
      setLocalAnimationDuration('');
      setLocalAnimDistance('');
    }
  }, [selectedElements]);

  const handleDurationChange = (newDuration: number) => {
    if (isDisabled || !selectedElement?.animationDuration) return;
    const clampedDuration = Math.max(0.1, newDuration);
    const formattedDuration = `${clampedDuration.toFixed(1)}s`;
    setLocalAnimationDuration(clampedDuration.toFixed(1));
    onGenericStyleChange('animationDuration', formattedDuration);
  };

  const handleAnimDistanceChange = (newDistance: number) => {
    if (isDisabled) return;
    const clamped = Math.max(0, newDistance);
    setLocalAnimDistance(clamped);
    onGenericStyleChange('animDistance' as any, `${clamped}px`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (fontSizeRef.current && !fontSizeRef.current.contains(event.target as Node)) {
            setIsFontSizeDropdownOpen(false);
        }
    };
    // Use click instead of mousedown to avoid premature close before inner clicks run
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleFontSizeSelect = (size: number) => {
      setLocalFontSize(size);
      onNumericStyleChange('currentFontSize', size);
      setIsFontSizeDropdownOpen(false);
  };

  const handleFontSizeCommit = () => {
    const newSize = parseInt(String(localFontSize), 10);
    if (!isNaN(newSize) && newSize > 0) {
        onNumericStyleChange('currentFontSize', newSize);
    } else {
        if (selectedElements.length === 1) {
            setLocalFontSize(selectedElements[0].currentFontSize);
        } else {
            setLocalFontSize('');
        }
    }
  };

  useEffect(() => {
    setLocalPageWidth(pageWidth);
  }, [pageWidth]);

  useEffect(() => {
    setLocalPageHeight(pageHeight);
  }, [pageHeight]);

  const handleLocalSizeChange = (
    dimension: 'width' | 'height',
    value: string
  ) => {
    const setter = dimension === 'width' ? setLocalPageWidth : setLocalPageHeight;
    setter(value);
  };

  const handleApplyPageSize = () => {
      const newWidth = parseInt(String(localPageWidth), 10);
      if (!isNaN(newWidth) && newWidth > 0 && newWidth !== pageWidth) {
          onPageSizeChange('width', newWidth);
      }
      
      const newHeight = parseInt(String(localPageHeight), 10);
      if (!isNaN(newHeight) && newHeight > 0 && newHeight !== pageHeight) {
          onPageSizeChange('height', newHeight);
      }
  };

  const handleAnimationDurationCommit = () => {
    if (isDisabled) return;
    const newDur = parseFloat(String(localAnimationDuration));
    if (!isNaN(newDur) && newDur > 0) {
      handleDurationChange(newDur);
    } else {
      if (selectedElement) {
        const currentDur = parseFloat(selectedElement.animationDuration);
        setLocalAnimationDuration(isNaN(currentDur) ? '' : currentDur.toFixed(1));
      } else {
        setLocalAnimationDuration('');
      }
    }
  };

  const getToggleButtonClass = (isActive: boolean) => {
    const base = "p-1.5 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed";
    return isActive ? `${base} bg-blue-100 text-blue-700` : `${base} hover:bg-gray-200`;
  };
  
  const getPresetButtonClass = (isActive: boolean) => {
    const base = "px-2 py-1 text-xs rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed";
     return isActive ? `${base} bg-blue-100 text-blue-700` : `${base} bg-gray-200 hover:bg-gray-300`;
  }

  const ControlGroup: React.FC<{ title?: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`flex items-center gap-1 ${className}`}>
      {title && <label className="text-xs whitespace-nowrap break-keep font-medium text-gray-700 w-16 text-right flex-shrink-0">{title}</label>}
      <div className="flex items-center gap-1 flex-wrap">{children}</div>
    </div>
  );
  
  const PositionOptions = [
    { value: 'static', label: t('controls.layout.positions.static') },
    { value: 'relative', label: t('controls.layout.positions.relative') },
    { value: 'absolute', label: t('controls.layout.positions.absolute') },
    { value: 'fixed', label: t('controls.layout.positions.fixed') },
    { value: 'sticky', label: t('controls.layout.positions.sticky') },
  ];

  const handleToggleMultiSelect = () => {
    const newMode = !isMultiSelectMode;
    setIsMultiSelectMode(newMode);
    if (!newMode && selectedElements.length > 1) {
        setSelectedElements([]);
    }
  };
  
  const getBgColorForPicker = () => {
    if (selectedElement) {
      return selectedElement.backgroundColor;
    }
    return bodyBgColor ?? '#ffffff';
  };

  const isVAlignActive = (alignment: string) => {
    if (!selectedElement) return false;
    if (selectedElement.flexDirection === 'column') {
        return selectedElement.justifyContent === alignment;
    }
    return selectedElement.alignItems === alignment;
  }

  return (
    <>
      <style>{`
        @keyframes fade-in-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-down { animation: fade-in-down 0.2s ease-out forwards; }
        .control-separator { height: auto; align-self: stretch; width: 1px; background-color: #e5e7eb; margin: 0 0.5rem; }
        .control-separator-sm { height: 1.5rem; width: 1px; background-color: #d1d5db; margin: 0 0.25rem; }
      `}</style>
      <div className="bg-white/95 p-2 shadow-md z-10 border-b border-gray-200 animate-fade-in-down flex-shrink-0">
        <div className="max-w-full mx-auto flex flex-col gap-y-2 px-2">
            {/* --- Row 1: Global and primary element controls --- */}
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                <ControlGroup title={t('controls.history.title')}>
                  <div className="flex items-center rounded-md bg-gray-100 p-0.5">
                    <button title={t('controls.history.undo')} onClick={onUndo} className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50" disabled={!canUndo}>
                      <i className="fas fa-undo-alt"></i>
                    </button>
                    <button title={t('controls.history.redo')} onClick={onRedo} className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50" disabled={!canRedo}>
                      <i className="fas fa-redo-alt"></i>
                    </button>
                  </div>
                </ControlGroup>
                <ControlGroup title={t('controls.pageSize.title')}>
                    <div className="relative">
                        <input type="number" value={localPageWidth} onChange={(e) => handleLocalSizeChange('width', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleApplyPageSize()} className="w-20 text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">{t('controls.pageSize.width')}</label>
                    </div>
                    <div className="relative">
                        <input type="number" value={localPageHeight} onChange={(e) => handleLocalSizeChange('height', e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleApplyPageSize()} className="w-20 text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">{t('controls.pageSize.height')}</label>
                    </div>
                    <button onClick={handleApplyPageSize} className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500" title={t('controls.pageSize.title') + ' ' + t('controls.pageSize.apply')}>{t('controls.pageSize.apply')}</button>
                </ControlGroup>
                
                <ControlGroup title={t('controls.insert.title')}>
                    <div className="flex items-center rounded-md bg-gray-100 p-0.5">
                        {/* Core */}
                        <div className="relative">
                            <button ref={insertLayoutButtonRef} title={t('controls.insert.layoutBox')} onClick={() => setIsLayoutPresetPopoverOpen(p => !p)} className="p-1.5 rounded hover:bg-gray-200"><i className="fas fa-th-large text-blue-500"></i></button>
                            {isLayoutPresetPopoverOpen && <LayoutPresetPopover onInsert={onInsertElement} onClose={() => setIsLayoutPresetPopoverOpen(false)} triggerRef={insertLayoutButtonRef} t={t} />}
                        </div>
                        <button title={t('controls.insert.text')} onClick={() => onInsertElement('<p style="width: 250px; padding: 10px; font-size: 16px; border: 1px dashed #ccc; cursor: text;">새로운 텍스트 박스</p>')} className="p-1.5 rounded hover:bg-gray-200"><i className="fas fa-font text-gray-700"></i></button>
                        <button title={t('controls.insert.button')} onClick={() => onInsertElement('<button style="padding: 10px 20px; font-size: 16px; border-radius: 5px; border: 1px solid #ccc; background-color: #f0f0f0; cursor: pointer;">클릭하세요</button>')} className="p-1.5 rounded hover:bg-gray-200"><i className="far fa-square-check text-gray-700"></i></button>
                        <button title={t('controls.insert.loginForm')} onClick={() => onInsertElement(loginFormHtml)} className="p-1.5 rounded hover:bg-gray-200"><i className="fas fa-right-to-bracket text-gray-700"></i></button>
                        
                        <div className="control-separator-sm"></div>

                        {/* Data */}
                        <div className="relative">
                          <button title={t('controls.insert.table')} onClick={() => setIsTablePopoverOpen(p => !p)} className="p-1.5 rounded hover:bg-gray-200"><i className="fas fa-table text-green-600"></i></button>
                          {isTablePopoverOpen && <TablePopover onInsert={onInsertElement} onClose={() => setIsTablePopoverOpen(false)} t={t} />}
                        </div>
                        <div className="relative">
                          <button title={t('controls.insert.chart')} onClick={() => setIsChartPopoverOpen(p => !p)} className="p-1.5 rounded hover:bg-gray-200"><i className="fas fa-chart-pie text-purple-600"></i></button>
                          {isChartPopoverOpen && <ChartPopover onInsert={onInsertElement} onClose={() => setIsChartPopoverOpen(false)} t={t} />}
                        </div>

                        <div className="control-separator-sm"></div>

                        {/* Media */}
                        <div className="relative">
                            <button title={t('controls.insert.image')} onClick={() => setIsImagePopoverOpen(p => !p)} className="p-1.5 rounded hover:bg-gray-200"><i className="fas fa-image text-orange-500"></i></button>
                            {isImagePopoverOpen && <ImagePopover onInsert={onInsertElement} onClose={() => setIsImagePopoverOpen(false)} setBlobUrlMap={setBlobUrlMap} t={t} />}
                        </div>
                        <div className="relative">
                            <button title={t('controls.insert.video')} onClick={() => setIsVideoPopoverOpen(p => !p)} className="p-1.5 rounded hover:bg-gray-200"><i className="fas fa-video text-red-600"></i></button>
                            {isVideoPopoverOpen && <VideoPopover onInsert={onInsertElement} onClose={() => setIsVideoPopoverOpen(false)} t={t} />}
                        </div>
                        
                        <div className="control-separator-sm"></div>

                        {/* Graphics */}
                        <div className="relative">
                            <button title={t('controls.insert.icon')} onClick={() => setIsIconPopoverOpen(p => !p)} className="p-1.5 rounded hover:bg-gray-200"><i className="fas fa-star text-yellow-500"></i></button>
                            {isIconPopoverOpen && <IconPopover onInsert={onInsertElement} onClose={() => setIsIconPopoverOpen(false)} t={t} />}
                        </div>
                        <div className="relative">
                            <button title={t('controls.insert.shape')} onClick={() => setIsShapePopoverOpen(p => !p)} className="p-1.5 rounded hover:bg-gray-200"><i className="fas fa-shapes text-indigo-500"></i></button>
                            {isShapePopoverOpen && <ShapePopover onInsert={onInsertElement} onClose={() => setIsShapePopoverOpen(false)} t={t} />}
                        </div>
                    </div>
                </ControlGroup>
                
                <ControlGroup title={t('controls.alignment.title')}>
                    <div className="flex items-center rounded-md bg-gray-100 p-0.5">
                      <button title={t('controls.alignment.left')} onClick={() => onAlignmentChange('left')} disabled={isDisabled} className={getToggleButtonClass(false)}><i className="fas fa-align-left"></i></button>
                      <button title={t('controls.alignment.center')} onClick={() => onAlignmentChange('center')} disabled={isDisabled} className={getToggleButtonClass(false)}><i className="fas fa-align-center"></i></button>
                      <button title={t('controls.alignment.right')} onClick={() => onAlignmentChange('right')} disabled={isDisabled} className={getToggleButtonClass(false)}><i className="fas fa-align-right"></i></button>
                    </div>
                </ControlGroup>
                <ControlGroup title={t('controls.layout.title')}>
                    <div className="relative">
                        <input type="number" title={t('controls.layout.zIndex')} value={selectedElement?.zIndex ?? 0} onChange={(e) => onGenericStyleChange('zIndex', parseInt(e.target.value, 10) || 0)} disabled={isDisabled} className="w-16 text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" />
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">{t('controls.layout.zIndex')}</label>
                    </div>
                    <div className="relative">
                       <select title={t('controls.layout.position')} value={selectedElement?.position ?? 'static'} onChange={(e) => onGenericStyleChange('position', e.target.value)} disabled={isDisabled} className="w-28 text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 bg-white">
                          {PositionOptions.map(pos => <option key={pos.value} value={pos.value}>{pos.label}</option>)}
                        </select>
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">{t('controls.layout.position')}</label>
                    </div>
                </ControlGroup>
                <ControlGroup title={t('controls.format.title')}>
                    <select value={selectedElement?.fontFamily ?? 'Arial'} onChange={(e) => onGenericStyleChange('fontFamily', e.target.value)} disabled={isDisabled} title={t('controls.format.font')} className="w-32 text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 bg-white">
                        {FONT_FAMILIES.map(font => <option key={font} value={font}>{font}</option>)}
                    </select>
                    <div ref={fontSizeRef} className="relative" onMouseDown={(e)=>e.stopPropagation()}>
                        <div className="flex items-center border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 bg-white">
                            <input type="number" value={localFontSize} onChange={(e) => { setLocalFontSize(e.target.value); const newSize = parseInt(e.target.value, 10); if (!isNaN(newSize) && newSize > 0) { onNumericStyleChange('currentFontSize', newSize); } }} onBlur={handleFontSizeCommit} onKeyDown={(e) => { if (e.key === 'Enter') { handleFontSizeCommit();(e.target as HTMLInputElement).blur(); } }} disabled={isDisabled} title={t('controls.format.fontSize')} placeholder={isMultiSelect ? '...' : ''} className="w-16 text-sm p-1 border-none rounded-l-md focus:outline-none disabled:bg-gray-100 text-center"/>
                            <span className="text-xs text-gray-400 pr-1 select-none">px</span>
                            <button onClick={() => setIsFontSizeDropdownOpen(p => !p)} disabled={isDisabled} className="p-1 border-l border-gray-300 text-gray-500 hover:bg-gray-100 focus:outline-none disabled:opacity-50 border-r-0 border-t-0 border-b-0" style={{ height: '14px' }} title={t('controls.format.selectFontSize')}>
                              <i className="fas fa-chevron-down text-xs"></i>
                            </button>
                        </div>
                        {isFontSizeDropdownOpen && (
                            <ul className="absolute top-full mt-1 w-full bg-white rounded-md shadow-lg z-50 max-h-48 overflow-y-auto ring-1 ring-black ring-opacity-5">
                                {FONT_SIZES.map(size => (
                                    <li key={size} onClick={() => handleFontSizeSelect(size)} className="px-3 py-1.5 text-sm text-center hover:bg-blue-100 cursor-pointer">{size}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="flex items-center rounded-md bg-gray-100 p-0.5 gap-0.5">
                      <ColorPicker value={selectedElement?.color ?? '#000000'} onChange={onTextColorChange} disabled={isDisabled} title={t('controls.format.color')} t={t} />
                      <button title={t('controls.format.bold')} onClick={() => onTextStyleToggle('fontWeight', 'bold')} className={getToggleButtonClass(selectedElement?.fontWeight === 'bold' || parseInt(selectedElement?.fontWeight ?? '400') >= 700)} disabled={isDisabled}><i className="fas fa-bold"></i></button>
                      <button title={t('controls.format.italic')} onClick={() => onTextStyleToggle('fontStyle', 'italic')} className={getToggleButtonClass(selectedElement?.fontStyle === 'italic')} disabled={isDisabled}><i className="fas fa-italic"></i></button>
                      <button title={t('controls.format.underline')} onClick={() => onTextStyleToggle('textDecoration', 'underline')} className={getToggleButtonClass(selectedElement?.textDecoration.includes('underline') ?? false)} disabled={isDisabled}><i className="fas fa-underline"></i></button>
                      <button title={t('controls.format.strikethrough')} onClick={() => onTextStyleToggle('textDecoration', 'line-through')} className={getToggleButtonClass(selectedElement?.textDecoration.includes('line-through') ?? false)} disabled={isDisabled}><i className="fas fa-strikethrough"></i></button>
                      <div className="relative">
                        <button ref={linkButtonRef} title={t('controls.format.link')} onClick={() => setIsLinkPopoverOpen(p => !p)} className={getToggleButtonClass(selectedElement?.isLink ?? false)} disabled={isDisabled || isMultiSelect}><i className="fas fa-link"></i></button>
                        {isLinkPopoverOpen && <LinkPopover selectedElement={selectedElement} onClose={() => setIsLinkPopoverOpen(false)} onUpdate={onLinkUpdate} triggerRef={linkButtonRef} t={t} />}
                      </div>
                      <button title={t('controls.format.alignLeft')} onClick={() => onTextAlignChange('left')} className={getToggleButtonClass(selectedElement?.textAlign === 'left')} disabled={isDisabled}><i className="fas fa-align-left"></i></button>
                      <button title={t('controls.format.alignCenter')} onClick={() => onTextAlignChange('center')} className={getToggleButtonClass(selectedElement?.textAlign === 'center')} disabled={isDisabled}><i className="fas fa-align-center"></i></button>
                      <button title={t('controls.format.alignRight')} onClick={() => onTextAlignChange('right')} className={getToggleButtonClass(selectedElement?.textAlign === 'right')} disabled={isDisabled}><i className="fas fa-align-right"></i></button>
                      <div className="control-separator-sm"></div>
                      <button title={t('controls.format.alignTop')} onClick={() => onVerticalAlignChange('flex-start')} className={getToggleButtonClass(isVAlignActive('flex-start'))} disabled={isDisabled}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path d="M2 2.6665H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M5.33333 6.6665H10.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M5.33333 10.6665H10.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>
                      <button title={t('controls.format.alignMiddle')} onClick={() => onVerticalAlignChange('center')} className={getToggleButtonClass(isVAlignActive('center'))} disabled={isDisabled}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path d="M2 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M5.33333 4H10.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M5.33333 12H10.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>
                      <button title={t('controls.format.alignBottom')} onClick={() => onVerticalAlignChange('flex-end')} className={getToggleButtonClass(isVAlignActive('flex-end'))} disabled={isDisabled}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4"><path d="M2 13.3335H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M5.33333 5.3335H10.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M5.33333 9.3335H10.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg></button>
                      <div className="control-separator-sm"></div>
                      <div className="relative">
                        <button
                            ref={lineHeightButtonRef}
                            title={t('controls.format.lineHeight')}
                            onClick={() => setIsLineHeightPopoverOpen(p => !p)}
                            className={`${getToggleButtonClass(isLineHeightPopoverOpen)} flex items-center gap-1 px-2`}
                            disabled={isDisabled || isMultiSelect}
                        >
                            <i className="fas fa-mouse-pointer"></i>
                            <span className="text-sm">{t('controls.format.lineHeight')}</span>
                        </button>
                        {isLineHeightPopoverOpen && (
                            <LineHeightPopover
                                selectedElement={selectedElement}
                                onClose={() => setIsLineHeightPopoverOpen(false)}
                                onGenericStyleChange={onGenericStyleChange}
                                triggerRef={lineHeightButtonRef}
                                t={t}
                            />
                        )}
                   </div>
                    </div>
                </ControlGroup>
                <ControlGroup title={t('controls.background.title')}>
                  <ColorPicker value={getBgColorForPicker()} onChange={onBgChange} disabled={isDisabled} title={selectedElement ? t('controls.background.elementBg') : t('controls.background.pageBg')} t={t} />
                </ControlGroup>
                <ControlGroup title={t('controls.multiSelect.title')}>
                  <button title={t('controls.multiSelect.mode')} onClick={handleToggleMultiSelect} className={getToggleButtonClass(isMultiSelectMode)}>
                    <i className="far fa-square"></i>
                  </button>
                </ControlGroup>
            </div>

            <div className="w-full h-px bg-gray-200"></div>

            {/* --- Row 2: Detailed element controls --- */}
            <div className={`flex items-center flex-wrap gap-x-3 gap-y-2 w-full transition-opacity duration-200 ${isDisabled ? 'opacity-40 pointer-events-none' : ''}`}>
                <ControlGroup title={t('controls.spacing.title')}>
                  <div className="relative">
                    <button ref={layoutButtonRef} title={t('controls.spacing.marginPadding')} onClick={() => setIsLayoutPopoverOpen(p => !p)} className={getToggleButtonClass(isLayoutPopoverOpen)} disabled={isDisabled || isMultiSelect}>
                      <i className="fas fa-ruler-combined"></i>
                    </button>
                    {isLayoutPopoverOpen && selectedElement && <LayoutPopover selectedElement={selectedElement} onClose={() => setIsLayoutPopoverOpen(false)} onNumericStyleChange={onNumericStyleChange} onGenericStyleChange={onGenericStyleChange} triggerRef={layoutButtonRef}/>}
                  </div>
                   <div className="relative">
                    <button ref={effectsButtonRef} title={t('controls.effects.title')} onClick={() => setIsEffectsPopoverOpen(p => !p)} className={getToggleButtonClass(isEffectsPopoverOpen)} disabled={isDisabled || isMultiSelect}>
                      <i className="fas fa-vector-square"></i>
                    </button>
                    {isEffectsPopoverOpen && selectedElement && <EffectsPopover selectedElement={selectedElement} onClose={() => setIsEffectsPopoverOpen(false)} onNumericStyleChange={onNumericStyleChange} onGenericStyleChange={onGenericStyleChange} triggerRef={effectsButtonRef} t={t} />}
                  </div>
                </ControlGroup>
                <ControlGroup title={t('controls.style.title')}>
                    <span className="text-xs font-medium text-gray-500">{t('controls.style.border')}</span>
                    <input type="number" value={selectedElement?.borderWidth ?? 0} onChange={(e) => onNumericStyleChange('borderWidth', parseInt(e.target.value,10))} disabled={isDisabled} className="w-14 text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100" />
                    <select value={selectedElement?.borderStyle ?? 'none'} onChange={(e) => onGenericStyleChange('borderStyle', e.target.value)} disabled={isDisabled} className="text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100">
                        {BORDER_STYLES(t).map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                   <ColorPicker value={selectedElement?.borderColor ?? '#000000'} onChange={(c) => onGenericStyleChange('borderColor', c)} disabled={isDisabled} title={t('controls.style.borderColor')} t={t} />
                   <div className="control-separator-sm"></div>
                   <span className="text-xs font-medium text-gray-500">{t('controls.style.corner')}</span>
                   <input type="range" min="0" max="100" value={selectedElement?.borderRadius ?? 0} onChange={(e) => onNumericStyleChange('borderRadius', parseInt(e.target.value, 10))} className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" disabled={isDisabled} />
                   <span className="text-sm text-gray-600 w-12 text-left">{selectedElement?.borderRadius ?? 0}px</span>
                   <div className="control-separator-sm"></div>
                   <div className="relative">
                      <button
                        ref={interactionButtonRef}
                        title={t('controls.interaction.hoverEdit')}
                        onClick={() => setIsInteractionPopoverOpen(p => !p)}
                        className={`${getToggleButtonClass(isInteractionPopoverOpen)} flex items-center gap-1 px-2`}
                        disabled={isDisabled || isMultiSelect}
                      >
                        <i className="fas fa-mouse-pointer"></i>
                        <span className="text-sm">{t('controls.interaction.hoverEdit')}</span>
                      </button>
                      {isInteractionPopoverOpen && (
                        <InteractionPopover
                          onClose={() => setIsInteractionPopoverOpen(false)}
                          onHoverStyleChange={onHoverStyleChange}
                          triggerRef={interactionButtonRef}
                          initialColor={hoverStyles.color}
                          initialBackgroundColor={hoverStyles.backgroundColor}
                          t={t}
                        />
                      )}
                   </div>
                </ControlGroup>
                <ControlGroup title={t('controls.buttonStyle.title')}>
                   <div className="flex items-center rounded-md bg-gray-100 p-0.5 gap-0.5">
                        {Object.entries(BUTTON_PRESETS(t)).map(([name, styles]) => (
                            <button key={name} title={name} onClick={() => onApplyStylePreset(styles)} className={getPresetButtonClass(false)} disabled={isDisabled}>{name}</button>
                        ))}
                    </div>
                </ControlGroup>
                <ControlGroup title={t('controls.shadow.title')}>
                   <div className="flex items-center rounded-md bg-gray-100 p-0.5 gap-0.5">
                        {Object.entries(SHADOW_PRESETS(t)).map(([name, value]) => (
                            <button key={name} title={name} onClick={() => onGenericStyleChange('boxShadow', value)} className={getPresetButtonClass(selectedElement?.boxShadow === value)} disabled={isDisabled}>{name}</button>
                        ))}
                    </div>
                </ControlGroup>
                <ControlGroup title={t('controls.animation.title')}>
                    <div className="flex items-center rounded-md bg-gray-100 p-0.5 gap-0.5">
                        <button title={t('controls.animation.presets.fadeIn')} onClick={() => onApplyAnimation('anim-fade-in')} className={getPresetButtonClass(false)} disabled={isDisabled}>{t('controls.animation.presets.fadeIn')}</button>
                        <button title={t('controls.animation.presets.slideUp')} onClick={() => onApplyAnimation('anim-slide-up')} className={getPresetButtonClass(false)} disabled={isDisabled}>{t('controls.animation.presets.slideUp')}</button>
                        <button title={t('controls.animation.presets.slideInLeft')} onClick={() => onApplyAnimation('anim-slide-in-left')} className={getPresetButtonClass(false)} disabled={isDisabled}>{t('controls.animation.presets.slideInLeft')}</button>
                        <button title={t('controls.animation.presets.slideDown')} onClick={() => onApplyAnimation('anim-slide-down')} className={getPresetButtonClass(false)} disabled={isDisabled}>{t('controls.animation.presets.slideDown')}</button>
                        <button title={t('controls.animation.presets.slideInRight')} onClick={() => onApplyAnimation('anim-slide-in-right')} className={getPresetButtonClass(false)} disabled={isDisabled}>{t('controls.animation.presets.slideInRight')}</button>
                        <button title={t('controls.animation.presets.remove')} onClick={() => onApplyAnimation('')} className={getToggleButtonClass(false)} disabled={isDisabled}><i className="fas fa-ban"></i></button>
                    </div>
                </ControlGroup>
                <ControlGroup title={t('controls.speed.title')}>
                    <div className="flex items-center">
                        <div className="relative">
                            <input
                              type="number"
                              step="0.1"
                              value={localAnimationDuration}
                              onChange={(e) => setLocalAnimationDuration(e.target.value)}
                              onBlur={handleAnimationDurationCommit}
                              onKeyDown={(e) => { if (e.key === 'Enter') { handleAnimationDurationCommit();(e.target as HTMLInputElement).blur(); } }}
                              disabled={isDisabled || !selectedElement?.animationDuration}
                              title={t('controls.speed.duration')}
                              placeholder="..."
                              className="w-16 h-8 text-sm p-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-center pr-5"
                            />
                            <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 select-none pointer-events-none">s</span>
                        </div>
                        <div className="flex flex-col -ml-px">
                            <button onClick={() => handleDurationChange(Number(localAnimationDuration || '0.7') + 0.1)} disabled={isDisabled || !selectedElement?.animationDuration} className="px-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none disabled:opacity-50 border border-gray-300 rounded-tr-md border-b-0 border-l-0" style={{ height: '16px', lineHeight: '14px' }} title={t('controls.speed.slower')}><i className="fas fa-chevron-up text-xs"></i></button>
                            <button onClick={() => handleDurationChange(Number(localAnimationDuration || '0.7') - 0.1)} disabled={isDisabled || !selectedElement?.animationDuration} className="px-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none disabled:opacity-50 border border-gray-300 rounded-br-md border-l-0" style={{ height: '16px', lineHeight: '14px' }} title={t('controls.speed.faster')}><i className="fas fa-chevron-down text-xs"></i></button>
                        </div>
                    </div>
                </ControlGroup>
                <ControlGroup title={t('controls.distance.title')}>
                  <div className="flex items-center">
                    <div className="relative">
                      <input
                        type="number"
                        value={localAnimDistance}
                        onChange={(e) => setLocalAnimDistance(e.target.value)}
                        onBlur={() => { const v = parseFloat(String(localAnimDistance)); if (!isNaN(v)) handleAnimDistanceChange(v); }}
                        onKeyDown={(e) => { if (e.key === 'Enter') { const v = parseFloat(String(localAnimDistance)); if (!isNaN(v)) { handleAnimDistanceChange(v); (e.target as HTMLInputElement).blur(); } } }}
                        disabled={isDisabled}
                        title={t('controls.distance.pixels')}
                        placeholder="..."
                        className="w-16 h-8 text-sm p-1 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-center pr-5"
                      />
                      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 select-none pointer-events-none">px</span>
                    </div>
                    <div className="flex flex-col -ml-px">
                      <button
                        onClick={() => handleAnimDistanceChange(Number(localAnimDistance || '20') + 5)}
                        disabled={isDisabled}
                        className="px-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none disabled:opacity-50 border border-gray-300 rounded-tr-md border-b-0 border-l-0"
                        style={{ height: '16px', lineHeight: '14px' }}
                        title={t('controls.distance.more')}
                      >
                        <i className="fas fa-chevron-up text-xs"></i>
                      </button>
                      <button
                        onClick={() => handleAnimDistanceChange(Math.max(0, Number(localAnimDistance || '20') - 5))}
                        disabled={isDisabled}
                        className="px-1.5 text-gray-600 hover:bg-gray-100 focus:outline-none disabled:opacity-50 border border-gray-300 rounded-br-md border-l-0"
                        style={{ height: '16px', lineHeight: '14px' }}
                        title={t('controls.distance.less')}
                      >
                        <i className="fas fa-chevron-down text-xs"></i>
                      </button>
                    </div>
                  </div>
                </ControlGroup>
            </div>
        </div>
      </div>
    </>
  );
};