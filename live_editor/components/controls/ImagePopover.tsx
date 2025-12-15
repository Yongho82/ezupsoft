import React, { useState, useRef, useEffect } from 'react';
import { resizeImage } from '../../utils';
import { TFunction } from '../../hooks/useTranslations';

export const ImagePopover: React.FC<{
  onInsert: (html: string) => void,
  onClose: () => void,
  setBlobUrlMap: React.Dispatch<React.SetStateAction<Record<string, string>>>,
  t: TFunction,
}> = ({ onInsert, onClose, setBlobUrlMap, t }) => {
    const [url, setUrl] = useState('');
    const ref = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleUrlInsert = () => {
        if (url.trim()) {
            onInsert(`<div class="image-wrapper" style="width: 300px; height: 200px; overflow: hidden;"><img src="${url}" alt="사용자 이미지" style="display: block; width: 100%; height: 100%; object-fit: cover;" /></div>`);
            onClose();
        }
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const blobUrl = URL.createObjectURL(file);
                const base64Url = await resizeImage(file);
                setBlobUrlMap(prev => ({ ...prev, [blobUrl]: base64Url }));
                onInsert(`<div class="image-wrapper" style="width: 300px; height: 200px; overflow: hidden;"><img src="${blobUrl}" alt="${file.name}" style="display: block; width: 100%; height: 100%; object-fit: cover;" /></div>`);
                onClose();
            } catch (error) {
                console.error("Image processing failed:", error);
                alert('이미지 처리 중 오류가 발생했습니다. 다른 파일을 시도해주세요.');
            }
        }
    };

    return (
        <div ref={ref} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-4">
            <p className="text-sm font-medium text-gray-800 mb-2">{t('imagePopover.title')}</p>
            <div className="flex gap-2">
                <input 
                    type="text"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder="https://..."
                    className="flex-grow text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={e => e.key === 'Enter' && handleUrlInsert()}
                />
                <button onClick={handleUrlInsert} className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex-shrink-0">
                    {t('imagePopover.insert')}
                </button>
            </div>

            <div className="relative my-3 flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-2 text-xs text-gray-400">{t('imagePopover.or')}</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
            />
            <button 
                onClick={() => fileInputRef.current?.click()} 
                className="w-full text-sm bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {t('imagePopover.upload')}
            </button>
        </div>
    );
};