import React, { useState, useRef, useEffect } from 'react';
import { TFunction } from '../../hooks/useTranslations';

const PALETTE_COLORS = [
  'transparent',
  '#000000', '#495057', '#ced4da', '#f1f3f5', '#ffffff',
  '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5',
  '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e',
  '#f59f00', '#f76707'
];

const ColorSwatch: React.FC<{ color: string }> = ({ color }) => {
  if (color === 'transparent') {
    return (
      <div 
        title="Transparent"
        className="w-full h-full bg-white relative"
      >
        <div 
          className="absolute w-[150%] h-[1.5px] bg-red-500 top-1/2 left-1/2"
          style={{ transform: 'translate(-50%, -50%) rotate(-45deg)' }}
        />
      </div>
    );
  }
  return <div style={{ backgroundColor: color }} className="w-full h-full"></div>;
};

export const ColorPicker: React.FC<{
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
  title: string;
  t: TFunction;
}> = ({ value, onChange, disabled, title, t }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [tempColor, setTempColor] = useState<string>(value || '#000000');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    // Use 'click' instead of 'mousedown' to avoid premature close
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTempColor(value || '#000000');
    }
  }, [isOpen, value]);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(prev => !prev)}
        disabled={disabled}
        title={title}
        className="w-7 h-7 p-0.5 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="w-full h-full rounded-[3px] border border-gray-200 overflow-hidden">
            <ColorSwatch color={value} />
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white rounded-md shadow-lg z-50 ring-1 ring-black ring-opacity-5" onMouseDown={(e)=>e.stopPropagation()}>
          <div className="grid grid-cols-5 gap-2 p-2">
            {PALETTE_COLORS.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => { setTempColor(color); }}
                className={`w-full h-7 rounded border hover:scale-110 transition-transform overflow-hidden ${tempColor === color ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'}`}
                title={color}
              >
                <ColorSwatch color={color} />
              </button>
            ))}
          </div>
          <div className="border-t border-gray-200 p-2 space-y-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="w-full text-sm text-center px-2 py-1.5 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t('colorPicker.custom')}
            </button>
            <input
              ref={inputRef}
              type="color"
              value={tempColor === 'transparent' ? '#ffffff' : tempColor}
              onChange={(e) => setTempColor(e.target.value)}
              className="opacity-0 w-0 h-0 absolute"
            />
            <button
              type="button"
              onClick={() => { onChange(tempColor); setIsOpen(false); }}
              className="w-full text-sm text-center px-2 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {t('colorPicker.confirm')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};