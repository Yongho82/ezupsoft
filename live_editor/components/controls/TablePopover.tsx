import React, { useState, useRef, useEffect } from 'react';
import { TFunction } from '../../hooks/useTranslations';

export const TablePopover: React.FC<{ onInsert: (html: string) => void, onClose: () => void, t: TFunction }> = ({ onInsert, onClose, t }) => {
    const [rows, setRows] = useState(3);
    const [cols, setCols] = useState(3);
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

    const generateTableHtml = (rowCount: number, colCount: number): string => {
        let tableHtml = '<table style="width: 400px; border-collapse: collapse; border: 1px solid #dee2e6;">';
        
        if (rowCount > 0) {
            tableHtml += '<thead><tr>';
            for (let i = 0; i < colCount; i++) {
                tableHtml += `<th style="border: 1px solid #dee2e6; padding: 12px; text-align: left; background-color: #f8f9fa;">헤더 ${i + 1}</th>`;
            }
            tableHtml += '</tr></thead>';
        }
        
        if (rowCount > 1) {
            tableHtml += '<tbody>';
            for (let i = 0; i < rowCount - 1; i++) {
                tableHtml += '<tr>';
                for (let j = 0; j < colCount; j++) {
                    tableHtml += `<td style="border: 1px solid #dee2e6; padding: 12px;">내용</td>`;
                }
                tableHtml += '</tr>';
            }
            tableHtml += '</tbody>';
        }
        tableHtml += '</table>';
        return tableHtml;
    };

    const handleInsert = () => {
        const tableHtml = generateTableHtml(rows, cols);
        onInsert(tableHtml);
        onClose();
    };

    return (
        <div ref={ref} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-4">
            <p className="text-sm font-medium text-gray-800 mb-3">{t('tablePopover.title')}</p>
            <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex-1">
                    <label className="block text-xs text-gray-600 mb-1">{t('tablePopover.rows')}</label>
                    <input
                        type="number"
                        value={rows}
                        onChange={e => setRows(Math.max(1, parseInt(e.target.value, 10) || 1))}
                        className="w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-xs text-gray-600 mb-1">{t('tablePopover.cols')}</label>
                    <input
                        type="number"
                        value={cols}
                        onChange={e => setCols(Math.max(1, parseInt(e.target.value, 10) || 1))}
                        className="w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        min="1"
                    />
                </div>
            </div>
            <button onClick={handleInsert} className="w-full text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {t('tablePopover.insert')}
            </button>
        </div>
    );
};