import React, { useRef, useEffect, useState } from 'react';
import { getTemplates, Template, createTemplateHtml } from '../../templates/templates';
import { TFunction } from '../../hooks/useTranslations';

interface NewFilePopoverProps {
    onSelect: (template: Template) => void;
    onClose: () => void;
    triggerRef: React.RefObject<HTMLElement>;
    t: TFunction;
}

export const NewFilePopover: React.FC<NewFilePopoverProps> = ({ onSelect, onClose, triggerRef, t }) => {
    const popoverRef = useRef<HTMLDivElement>(null);
    const [customWidth, setCustomWidth] = useState(1280);
    const [customHeight, setCustomHeight] = useState(720);
    
    const templates = getTemplates(t);

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
    
    const handleCustomCreate = () => {
        console.log(`[Debug] Creating custom template with size: ${customWidth}x${customHeight}`);
        const customTemplate: Template = {
            name: t('templates.custom.name'),
            description: t('templates.custom.description', { width: customWidth, height: customHeight }),
            icon: 'fas fa-ruler-combined',
            width: customWidth,
            height: customHeight,
            html: createTemplateHtml(customWidth, customHeight, t('templates.custom.content') as string),
        };
        onSelect(customTemplate);
    };

    return (
        <div
            ref={popoverRef}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-2 animate-fade-in-down"
        >
            <p className="text-sm font-semibold text-gray-800 mb-2 px-2 pt-1">{t('newFilePopover.title')}</p>
            <div className="grid grid-cols-2 gap-2">
                {templates.map(template => (
                    <button
                        key={template.name}
                        onClick={() => onSelect(template)}
                        className="flex flex-col items-center justify-center text-center p-3 rounded-lg hover:bg-gray-100 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <i className={`${template.icon} fa-2x text-gray-600 mb-2`}></i>
                        <span className="text-sm font-medium text-gray-800">{template.name}</span>
                        <span className="text-xs text-gray-500">{template.description}</span>
                    </button>
                ))}
            </div>
            
            <div className="border-t border-gray-200 mt-2 pt-2 px-2">
                 <p className="text-sm font-semibold text-gray-800 mb-2">{t('newFilePopover.customSize')}</p>
                 <div className="flex items-center gap-2 mb-2">
                     <div className="relative flex-1">
                         <input
                            type="number"
                            value={customWidth}
                            onChange={(e) => setCustomWidth(parseInt(e.target.value, 10) || 0)}
                            className="w-full text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         />
                         <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">W</label>
                     </div>
                      <div className="relative flex-1">
                         <input
                            type="number"
                            value={customHeight}
                            onChange={(e) => setCustomHeight(parseInt(e.target.value, 10) || 0)}
                            className="w-full text-center text-sm p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                         />
                         <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">H</label>
                     </div>
                 </div>
                 <button
                    onClick={handleCustomCreate}
                    className="w-full text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                 >
                    {t('newFilePopover.create')}
                 </button>
            </div>
        </div>
    );
};