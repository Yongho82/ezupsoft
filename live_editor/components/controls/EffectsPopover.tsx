import React, { useState, useRef, useEffect } from 'react';
import type { SelectedElementInfo } from '../../types';
import { TFunction } from '../../hooks/useTranslations';

export const EffectsPopover: React.FC<{
  selectedElement: SelectedElementInfo;
  onClose: () => void;
  onNumericStyleChange: (property: keyof SelectedElementInfo, value: number, unit?: string) => void;
  onGenericStyleChange: (property: keyof SelectedElementInfo, value: string | number) => void;
  triggerRef: React.RefObject<HTMLElement>;
  t: TFunction;
}> = ({ selectedElement, onClose, onNumericStyleChange, onGenericStyleChange, triggerRef, t }) => {
  const popoverRef = useRef<HTMLDivElement>(null);

  const [effects, setEffects] = useState({
    currentWidth: selectedElement.currentWidth,
    currentHeight: selectedElement.currentHeight,
    opacity: selectedElement.opacity,
  });

  useEffect(() => {
    setEffects({
      currentWidth: selectedElement.currentWidth,
      currentHeight: selectedElement.currentHeight,
      opacity: selectedElement.opacity,
    });
  }, [selectedElement]);
  
  const handleNumericChange = (property: 'currentWidth' | 'currentHeight', value: number) => {
    setEffects(prev => ({ ...prev, [property]: value }));
    onNumericStyleChange(property, value);
  };
  
  const handleOpacityChange = (value: number) => {
    const opacityValue = value / 100;
    setEffects(prev => ({ ...prev, opacity: opacityValue }));
    onGenericStyleChange('opacity', opacityValue);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, triggerRef]);

  const handleReset = () => {
    // Note: We don't have a "default" size, so resetting size might not be intuitive.
    // Resetting opacity to full is safe.
    handleOpacityChange(100);
  };
  
  const SliderControl: React.FC<{label: string, value: number, onChange: (v:number) => void, min: number, max: number, unit: string}> = ({label, value, onChange, min, max, unit}) => (
    <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600 w-12">{label}</span>
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="relative w-20">
            <input
                type="number"
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
                className="w-full text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-400">{unit}</span>
        </div>
    </div>
  );

  const selectorText = selectedElement.id.length > 40 ? `...${selectedElement.id.slice(-37)}` : selectedElement.id;

  return (
    <div ref={popoverRef} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[400px] bg-white rounded-lg shadow-2xl z-40 ring-1 ring-black ring-opacity-5 p-4 animate-fade-in-down">
      <div className="flex justify-between items-center mb-4">
        <p className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded" title={selectedElement.id}>{selectorText}</p>
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-2">{t('effectsPopover.size')}</p>
          <div className="space-y-3 bg-gray-50 p-3 rounded-md">
            <SliderControl label={t('effectsPopover.width')} value={effects.currentWidth} onChange={(v) => handleNumericChange('currentWidth', v)} min={10} max={1280} unit="px" />
            <SliderControl label={t('effectsPopover.height')} value={effects.currentHeight} onChange={(v) => handleNumericChange('currentHeight', v)} min={10} max={1080} unit="px" />
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800 mb-2">{t('effectsPopover.effects')}</p>
          <div className="space-y-3 bg-gray-50 p-3 rounded-md">
            <SliderControl label={t('effectsPopover.opacity')} value={Math.round(effects.opacity * 100)} onChange={handleOpacityChange} min={0} max={100} unit="%" />
          </div>
        </div>
      </div>
       <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
          <button onClick={handleReset} className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">{t('effectsPopover.reset')}</button>
      </div>
    </div>
  );
};