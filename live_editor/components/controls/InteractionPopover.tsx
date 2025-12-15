import React, { useRef, useEffect, useState } from 'react';
import { ColorPicker } from './ColorPicker';
import { TFunction } from '../../hooks/useTranslations';

export const InteractionPopover: React.FC<{
  onClose: () => void;
  onHoverStyleChange: (property: 'color' | 'backgroundColor', value: string) => void;
  triggerRef: React.RefObject<HTMLElement>;
  initialColor?: string;
  initialBackgroundColor?: string;
  t: TFunction;
}> = ({ onClose, onHoverStyleChange, triggerRef, initialColor, initialBackgroundColor, t }) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  
  // Internal state for immediate UI feedback
  const [hoverTextColor, setHoverTextColor] = useState(initialColor || 'transparent');
  const [hoverBgColor, setHoverBgColor] = useState(initialBackgroundColor || 'transparent');

  // Sync with prop changes if the selected element changes while popover is open
  useEffect(() => {
    setHoverTextColor(initialColor || 'transparent');
    setHoverBgColor(initialBackgroundColor || 'transparent');
  }, [initialColor, initialBackgroundColor]);

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

  const handleTextColorChange = (color: string) => {
    setHoverTextColor(color);
    onHoverStyleChange('color', color);
  };

  const handleBgColorChange = (color: string) => {
    setHoverBgColor(color);
    onHoverStyleChange('backgroundColor', color);
  };

  return (
    <div ref={popoverRef} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-lg shadow-2xl z-40 ring-1 ring-black ring-opacity-5 p-4 animate-fade-in-down">
      <p className="text-sm font-semibold text-gray-800 mb-3">{t('interactionPopover.title')}</p>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-600">{t('interactionPopover.hoverTextColor')}</label>
          <ColorPicker 
            value={hoverTextColor}
            onChange={handleTextColorChange}
            title={t('interactionPopover.hoverTextColor')}
            t={t}
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-600">{t('interactionPopover.hoverBgColor')}</label>
          <ColorPicker 
            value={hoverBgColor}
            onChange={handleBgColorChange}
            title={t('interactionPopover.hoverBgColor')}
            t={t}
          />
        </div>
      </div>
    </div>
  );
};