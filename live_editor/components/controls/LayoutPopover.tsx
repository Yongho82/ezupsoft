import React, { useState, useRef, useEffect } from 'react';
import type { SelectedElementInfo } from '../../types';

export const LayoutPopover: React.FC<{
  selectedElement: SelectedElementInfo;
  onClose: () => void;
  onNumericStyleChange: (property: keyof SelectedElementInfo, value: number, unit?: string) => void;
  onGenericStyleChange: (property: keyof SelectedElementInfo, value: string | number) => void;
  triggerRef: React.RefObject<HTMLElement>;
}> = ({ selectedElement, onClose, onNumericStyleChange, onGenericStyleChange, triggerRef }) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  
  const [spacing, setSpacing] = useState({
    marginTop: selectedElement.marginTop,
    marginRight: selectedElement.marginRight,
    marginBottom: selectedElement.marginBottom,
    marginLeft: selectedElement.marginLeft,
    paddingTop: selectedElement.paddingTop,
    paddingRight: selectedElement.paddingRight,
    paddingBottom: selectedElement.paddingBottom,
    paddingLeft: selectedElement.paddingLeft,
  });

  useEffect(() => {
    setSpacing({
      marginTop: selectedElement.marginTop,
      marginRight: selectedElement.marginRight,
      marginBottom: selectedElement.marginBottom,
      marginLeft: selectedElement.marginLeft,
      paddingTop: selectedElement.paddingTop,
      paddingRight: selectedElement.paddingRight,
      paddingBottom: selectedElement.paddingBottom,
      paddingLeft: selectedElement.paddingLeft,
    });
  }, [selectedElement]);

  const handleSpacingChange = (property: keyof typeof spacing, value: number) => {
    setSpacing(prev => ({ ...prev, [property]: value }));
    onNumericStyleChange(property as keyof SelectedElementInfo, value);
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

  const handleResetMargin = () => {
    handleSpacingChange('marginTop', 0);
    handleSpacingChange('marginRight', 0);
    handleSpacingChange('marginBottom', 0);
    handleSpacingChange('marginLeft', 0);
  };

  const handleResetPadding = () => {
    handleSpacingChange('paddingTop', 0);
    handleSpacingChange('paddingRight', 0);
    handleSpacingChange('paddingBottom', 0);
    handleSpacingChange('paddingLeft', 0);
  };

  const SpacingRow: React.FC<{
      label1: string;
      value1: number;
      onChange1: (v: number) => void;
      label2: string;
      value2: number;
      onChange2: (v: number) => void;
  }> = ({ label1, value1, onChange1, label2, value2, onChange2 }) => {
    const SpacingControl: React.FC<{label: string, value: number, onChange: (v:number) => void}> = ({label, value, onChange}) => (
        <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 w-12">{label}</span>
            <input
                type="range"
                min={-50}
                max={150}
                value={value}
                onChange={(e) => onChange(parseInt(e.target.value, 10))}
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="relative w-16">
                <input
                    type="number"
                    value={value}
                    onChange={(e) => onChange(parseInt(e.target.value, 10) || 0)}
                    className="w-full text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
    );
    return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
           <SpacingControl label={label1} value={value1} onChange={onChange1} />
           <SpacingControl label={label2} value={value2} onChange={onChange2} />
        </div>
    )
  };

  const selectorText = selectedElement.id.length > 40 ? `...${selectedElement.id.slice(-37)}` : selectedElement.id;

  return (
    <div ref={popoverRef} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white rounded-lg shadow-2xl z-40 ring-1 ring-black ring-opacity-5 p-4 animate-fade-in-down">
        <div className="flex justify-between items-center mb-4">
            <p className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded" title={selectedElement.id}>{selectorText}</p>
        </div>
        
        <div className="space-y-4">
            <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">Margin</p>
                <div className="space-y-3 bg-gray-50 p-3 rounded-md">
                    <SpacingRow
                        label1="Top" value1={spacing.marginTop} onChange1={(v) => handleSpacingChange('marginTop', v)}
                        label2="Right" value2={spacing.marginRight} onChange2={(v) => handleSpacingChange('marginRight', v)}
                    />
                    <SpacingRow
                        label1="Bottom" value1={spacing.marginBottom} onChange1={(v) => handleSpacingChange('marginBottom', v)}
                        label2="Left" value2={spacing.marginLeft} onChange2={(v) => handleSpacingChange('marginLeft', v)}
                    />
                </div>
            </div>

            <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">Padding</p>
                 <div className="space-y-3 bg-gray-50 p-3 rounded-md">
                    <SpacingRow
                        label1="Top" value1={spacing.paddingTop} onChange1={(v) => handleSpacingChange('paddingTop', v)}
                        label2="Right" value2={spacing.paddingRight} onChange2={(v) => handleSpacingChange('paddingRight', v)}
                    />
                    <SpacingRow
                        label1="Bottom" value1={spacing.paddingBottom} onChange1={(v) => handleSpacingChange('paddingBottom', v)}
                        label2="Left" value2={spacing.paddingLeft} onChange2={(v) => handleSpacingChange('paddingLeft', v)}
                    />
                </div>
            </div>
        </div>

        <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-200">
            <button onClick={handleResetMargin} className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">Reset Margin</button>
            <button onClick={handleResetPadding} className="text-xs bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">Reset Padding</button>
        </div>
    </div>
  );
};