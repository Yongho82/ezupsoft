import React, { useRef, useEffect } from 'react';
import { TFunction } from '../../hooks/useTranslations';

export const ShapePopover: React.FC<{ onInsert: (html: string) => void, onClose: () => void, t: TFunction }> = ({ onInsert, onClose, t }) => {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const shapes = {
        'rectangle': {
            name: t('shapePopover.rectangle'),
            html: '<div data-shape-type="rectangle" style="width: 150px; height: 100px; background-color: #4c6ef5; border-radius: 8px;"></div>',
            preview: <div className="w-10 h-7 bg-blue-500 rounded"></div>
        },
        'circle': {
            name: t('shapePopover.circle'),
            html: '<div data-shape-type="circle" style="width: 100px; height: 100px; background-color: #12b886; border-radius: 50%;"></div>',
            preview: <div className="w-8 h-8 bg-green-500 rounded-full"></div>
        },
        'oval': {
            name: t('shapePopover.oval'),
            html: '<div data-shape-type="oval" style="width: 150px; height: 80px; background-color: #be4bdb; border-radius: 50%;"></div>',
            preview: <div className="w-12 h-8 bg-purple-500 rounded-full"></div>
        },
        'triangle': {
            name: t('shapePopover.triangle'),
            html: '<div data-shape-type="triangle" style="width: 0; height: 0; border-left: 50px solid transparent; border-right: 50px solid transparent; border-bottom: 100px solid #f76707;"></div>',
            preview: <div style={{ width: 0, height: 0, borderLeft: '16px solid transparent', borderRight: '16px solid transparent', borderBottom: '28px solid #f76707' }}></div>
        },
        'line': {
            name: t('shapePopover.line'),
            html: '<div data-shape-type="line" style="width: 150px; height: 4px; background-color: #495057; border-radius: 2px;"></div>',
            preview: <div className="w-10 h-1 bg-gray-700 rounded-full"></div>
        }
    };

    const handleInsert = (html: string) => {
        onInsert(html);
        onClose();
    };

    return (
        <div ref={ref} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-3">
             <p className="text-sm font-medium text-gray-800 mb-2 px-1">{t('shapePopover.title')}</p>
            <div className="grid grid-cols-3 gap-2">
                {Object.values(shapes).map((shape) => (
                    <button
                        key={shape.name}
                        title={shape.name}
                        onClick={() => handleInsert(shape.html)}
                        className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 text-black gap-2 h-20"
                    >
                        {shape.preview}
                        <span className="text-xs text-gray-600">{shape.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};