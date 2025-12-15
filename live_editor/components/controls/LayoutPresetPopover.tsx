import React, { useRef, useEffect, useState } from 'react';
import { TFunction } from '../../hooks/useTranslations';

const getLayouts = (t: TFunction) => [
    {
        name: t('layoutPresetPopover.singleBox'),
        html: `<div style="width: 300px; padding: 20px; border: 1px dashed #ccc; min-height: 100px; background-color: #f9f9f9; border-radius: 8px;">새로운 레이아웃 박스</div>`,
        preview: <div className="w-full h-full bg-gray-200 border border-dashed border-gray-400 rounded-sm"></div>
    },
    {
        name: t('layoutPresetPopover.twoCol'),
        html: `<div style="display: flex; gap: 20px; width: 500px; padding: 20px; border: 1px dashed #ccc; min-height: 200px; background-color: #f9f9f9; border-radius: 8px;">
    <div style="flex: 1; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>
    <div style="flex: 1; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>
</div>`,
        preview: <div className="w-full h-full flex gap-1 p-0.5">
            <div className="flex-1 bg-gray-200 border border-dashed border-gray-400 rounded-sm"></div>
            <div className="flex-1 bg-gray-200 border border-dashed border-gray-400 rounded-sm"></div>
        </div>
    },
    {
        name: t('layoutPresetPopover.threeCol'),
        html: `<div style="display: flex; gap: 20px; width: 600px; padding: 20px; border: 1px dashed #ccc; min-height: 150px; background-color: #f9f9f9; border-radius: 8px;">
    <div style="flex: 1; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>
    <div style="flex: 1; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>
    <div style="flex: 1; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>
</div>`,
        preview: <div className="w-full h-full flex gap-1 p-0.5">
            <div className="flex-1 bg-gray-200 border border-dashed border-gray-400 rounded-sm"></div>
            <div className="flex-1 bg-gray-200 border border-dashed border-gray-400 rounded-sm"></div>
            <div className="flex-1 bg-gray-200 border border-dashed border-gray-400 rounded-sm"></div>
        </div>
    },
    {
        name: t('layoutPresetPopover.contentSidebar'),
        html: `<div style="display: flex; gap: 20px; width: 500px; padding: 20px; border: 1px dashed #ccc; min-height: 250px; background-color: #f9f9f9; border-radius: 8px;">
    <div style="flex: 3; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>
    <div style="flex: 1; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>
</div>`,
        preview: <div className="w-full h-full flex gap-1 p-0.5">
            <div className="w-[66%] bg-gray-200 border border-dashed border-gray-400 rounded-sm"></div>
            <div className="flex-1 bg-gray-200 border border-dashed border-gray-400 rounded-sm"></div>
        </div>
    },
    {
        name: t('layoutPresetPopover.headerFooter'),
        html: `<div style="display: flex; flex-direction: column; gap: 15px; width: 400px; padding: 20px; border: 1px dashed #ccc; min-height: 300px; background-color: #f9f9f9; border-radius: 8px;">
    <div style="min-height: 50px; border: 1px dashed #aaa; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #666;">Header</div>
    <div style="flex-grow: 1; min-height: 100px; border: 1px dashed #aaa; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #666;">Content</div>
    <div style="min-height: 40px; border: 1px dashed #aaa; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 12px; color: #666;">Footer</div>
</div>`,
        preview: <div className="w-full h-full flex flex-col gap-1 p-0.5">
            <div className="h-2 bg-gray-200 border border-dashed border-gray-400 rounded-sm"></div>
            <div className="flex-1 bg-gray-200 border border-dashed border-gray-400 rounded-sm"></div>
            <div className="h-2 bg-gray-200 border border-dashed border-gray-400 rounded-sm"></div>
        </div>
    },
    {
        name: t('layoutPresetPopover.imageText'),
        html: `<div style="display: flex; align-items: center; gap: 20px; width: 500px; padding: 20px; border: 1px dashed #ccc; min-height: 180px; background-color: #f9f9f9; border-radius: 8px;">
    <div style="flex: 1; min-height: 120px; border: 1px dashed #aaa; border-radius: 4px; display: flex; align-items: center; justify-content: center; background: #eee; font-size: 12px; color: #666;">Image</div>
    <div style="flex: 1; min-height: 50px;">
        <h3 style="margin: 0 0 10px 0; font-family: sans-serif; font-size: 18px;">제목</h3>
        <p style="margin: 0; font-family: sans-serif; font-size: 14px; color: #555;">여기에 설명을 입력하세요.</p>
    </div>
</div>`,
        preview: <div className="w-full h-full flex items-center gap-1 p-0.5">
            <div className="w-1/2 h-full bg-gray-200 border border-dashed border-gray-400 rounded-sm"></div>
            <div className="w-1/2 h-full flex flex-col gap-1">
                <div className="h-2 w-3/4 bg-gray-200 rounded-sm"></div>
                <div className="h-1 w-full bg-gray-200 rounded-sm"></div>
                <div className="h-1 w-full bg-gray-200 rounded-sm"></div>
            </div>
        </div>
    },
];


export const LayoutPresetPopover: React.FC<{ 
    onInsert: (html: string) => void, 
    onClose: () => void,
    triggerRef: React.RefObject<HTMLElement>,
    t: TFunction,
}> = ({ onInsert, onClose, triggerRef, t }) => {
    const popoverRef = useRef<HTMLDivElement>(null);
    const [numRows, setNumRows] = useState(1);
    const [numColumns, setNumColumns] = useState(2);
    const [gap, setGap] = useState(20);

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

    const handleInsert = (html: string) => {
        onInsert(html);
        onClose();
    };

    const handleCustomInsert = () => {
        const sanitizedRows = Math.max(1, Math.min(12, numRows));
        const sanitizedColumns = Math.max(1, Math.min(12, numColumns));
        const sanitizedGap = Math.max(0, gap);

        const columnHtml = `<div style="flex: 1; min-height: 50px; border: 1px dashed #aaa; border-radius: 4px;"></div>`;

        const rowHtml = `<div style="display: flex; flex: 1; gap: ${sanitizedGap}px;">
            ${Array.from({ length: sanitizedColumns }, () => columnHtml).join('\n            ')}
        </div>`;

        const rowsHtml = Array.from({ length: sanitizedRows }, () => rowHtml).join('\n    ');

        const customHtml = `<div style="display: flex; flex-direction: column; gap: ${sanitizedGap}px; width: 600px; padding: 20px; border: 1px dashed #ccc; min-height: 200px; background-color: #f9f9f9; border-radius: 8px;">
    ${rowsHtml}
</div>`;
        
        handleInsert(customHtml);
    };

    return (
        <div ref={popoverRef} className="absolute top-full left-0 mt-2 w-80 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-3">
            <p className="text-sm font-medium text-gray-800 mb-2 px-1">{t('layoutPresetPopover.title')}</p>
            <div className="grid grid-cols-3 gap-2">
                {getLayouts(t).map(layout => (
                    <button
                        key={layout.name}
                        title={layout.name}
                        onClick={() => handleInsert(layout.html)}
                        className="flex flex-col items-center justify-center p-2 rounded-md hover:bg-gray-100 text-black gap-2 h-20 group"
                    >
                        <div className="h-8 w-12">{layout.preview}</div>
                        <span className="text-xs text-gray-600 group-hover:text-gray-800">{layout.name}</span>
                    </button>
                ))}
            </div>

            <div className="border-t border-gray-200 mt-3 pt-3">
                <p className="text-sm font-medium text-gray-800 mb-2 px-1">{t('layoutPresetPopover.custom')}</p>
                <div className="grid grid-cols-3 gap-3 px-1 mb-3">
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">{t('layoutPresetPopover.rows')}</label>
                        <input
                            type="number"
                            value={numRows}
                            onChange={(e) => setNumRows(parseInt(e.target.value, 10) || 1)}
                            min="1"
                            max="12"
                            className="w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">{t('layoutPresetPopover.cols')}</label>
                        <input
                            type="number"
                            value={numColumns}
                            onChange={(e) => setNumColumns(parseInt(e.target.value, 10) || 1)}
                            min="1"
                            max="12"
                            className="w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-600 mb-1">{t('layoutPresetPopover.gap')}</label>
                        <input
                            type="number"
                            value={gap}
                            onChange={(e) => setGap(parseInt(e.target.value, 10) || 0)}
                            min="0"
                            step="5"
                            className="w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>
                <button
                    onClick={handleCustomInsert}
                    className="w-full text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    {t('layoutPresetPopover.create')}
                </button>
            </div>
        </div>
    );
};