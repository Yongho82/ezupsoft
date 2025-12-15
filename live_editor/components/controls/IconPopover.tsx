import React, { useState, useRef, useEffect } from 'react';
import { TFunction } from '../../hooks/useTranslations';

const FONT_AWESOME_ICONS = [
  'fas fa-star', 'fas fa-heart', 'fas fa-user', 'fas fa-check', 'fas fa-times', 'fas fa-cog',
  'fas fa-home', 'fas fa-envelope', 'fas fa-phone', 'fas fa-search', 'fas fa-link', 'fas fa-cloud',
  'fas fa-arrow-right', 'fas fa-arrow-left', 'fas fa-arrow-up', 'fas fa-arrow-down', 'fas fa-play',
  'fas fa-pause', 'fas fa-stop', 'fas fa-edit', 'fas fa-trash', 'fas fa-plus', 'fas fa-minus',
  'fas fa-info-circle', 'fas fa-question-circle', 'fas fa-exclamation-triangle', 'fas fa-calendar-alt',
  'fas fa-clock', 'fas fa-camera', 'fas fa-image', 'fas fa-video', 'fas fa-music', 'fas fa-file',
  'fas fa-folder', 'fas fa-map-marker-alt', 'fas fa-lightbulb', 'fas fa-comment', 'fas fa-thumbs-up',
  'fas fa-thumbs-down', 'fas fa-gift', 'fas fa-shopping-cart', 'fas fa-credit-card', 'fas fa-globe'
];

export const IconPopover: React.FC<{ onInsert: (html: string) => void, onClose: () => void, t: TFunction }> = ({ onInsert, onClose, t }) => {
    const [searchTerm, setSearchTerm] = useState('');
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
    
    const filteredIcons = FONT_AWESOME_ICONS.filter(icon => icon.includes(searchTerm.toLowerCase()));

    const handleInsert = (iconClass: string) => {
        onInsert(`<i class="${iconClass}" style="font-size: 24px;"></i>`);
        onClose();
    };

    return (
        <div ref={ref} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-3">
            <input 
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder={t('iconPopover.search')}
                className="w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
            />
            <div className="max-h-48 overflow-y-auto grid grid-cols-6 gap-2">
                {filteredIcons.map(iconClass => (
                    <button
                        key={iconClass}
                        title={iconClass.replace('fas fa-', '')}
                        onClick={() => handleInsert(iconClass)}
                        className="flex items-center justify-center p-2 rounded-md hover:bg-gray-100 text-black"
                    >
                        <i className={iconClass} style={{ fontSize: '20px' }}></i>
                    </button>
                ))}
            </div>
        </div>
    );
};