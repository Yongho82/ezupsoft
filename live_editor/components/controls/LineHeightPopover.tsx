import React, { useState, useRef, useEffect } from 'react';
import type { SelectedElementInfo } from '../../types';
import { TFunction } from '../../hooks/useTranslations';

const PRESET_LINE_HEIGHTS = [1.0, 1.5, 2.0, 3.0];

export const LineHeightPopover: React.FC<{
  selectedElement: SelectedElementInfo;
  onClose: () => void;
  onGenericStyleChange: (property: keyof SelectedElementInfo, value: string | number) => void;
  triggerRef: React.RefObject<HTMLElement>;
  t: TFunction;
}> = ({ selectedElement, onClose, onGenericStyleChange, triggerRef, t }) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [lineHeight, setLineHeight] = useState(selectedElement.lineHeight || 1.5);

  useEffect(() => {
    setLineHeight(selectedElement.lineHeight || 1.5);
  }, [selectedElement.lineHeight]);

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

  const handleLineHeightChange = (value: number) => {
    const newHeight = Math.max(0.5, Math.round(value * 10) / 10); // round to 1 decimal place, min 0.5
    setLineHeight(newHeight);
    onGenericStyleChange('lineHeight', newHeight);
  };

  const handleReset = () => {
    handleLineHeightChange(1.5);
  };
  
  const handlePresetClick = (value: number) => {
    handleLineHeightChange(value);
  };
  
  const getPresetButtonClass = (value: number) => {
    const base = "flex-1 px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400";
    // Use a tolerance for float comparison
    const isActive = Math.abs(lineHeight - value) < 0.05;
    return isActive ? `${base} bg-blue-600 text-white` : `${base} bg-gray-200 hover:bg-gray-300 text-gray-800`;
  }

  return (
    <div ref={popoverRef} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-lg shadow-2xl z-40 ring-1 ring-black ring-opacity-5 p-4 animate-fade-in-down">
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-800">{t('lineHeightPopover.title')}</p>
      </div>
      
      <div className="flex items-center justify-between gap-2 mb-4">
        {PRESET_LINE_HEIGHTS.map(value => (
          <button key={value} onClick={() => handlePresetClick(value)} className={getPresetButtonClass(value)}>
            {value.toFixed(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <input
          type="range"
          min="0.5"
          max="3"
          step="0.1"
          value={lineHeight}
          onChange={(e) => handleLineHeightChange(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="relative w-20">
          <input
            type="number"
            step="0.1"
            value={lineHeight.toFixed(1)}
            onChange={(e) => handleLineHeightChange(parseFloat(e.target.value) || 1.5)}
            className="w-full text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="flex justify-end mt-4 pt-4 border-t border-gray-200">
        <button onClick={handleReset} className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
          {t('lineHeightPopover.default')}
        </button>
      </div>
    </div>
  );
};