import React, { useState, useRef, useEffect } from 'react';
import { TFunction } from '../../hooks/useTranslations';

export const VideoPopover: React.FC<{ onInsert: (html: string) => void, onClose: () => void, t: TFunction }> = ({ onInsert, onClose, t }) => {
    const [url, setUrl] = useState('');
    const ref = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const getEmbedUrl = (url: string): { type: 'iframe' | 'video', url: string } | null => {
        let videoId;
        // YouTube
        let match = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        if (match && match[1]) {
            videoId = match[1];
            return { type: 'iframe', url: `https://www.youtube.com/embed/${videoId}` };
        }
        // Vimeo
        match = url.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|album\/(?:\d+)\/video\/|)(\d+)/);
        if (match && match[1]) {
            videoId = match[1];
            return { type: 'iframe', url: `https://player.vimeo.com/video/${videoId}` };
        }
        // Direct video file
        if (url.match(/\.(mp4|webm|ogv)$/i)) {
            return { type: 'video', url: url };
        }
        return null;
    };

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
        if (!url.trim()) return;
        
        const embedInfo = getEmbedUrl(url);
        
        if (embedInfo) {
            if (embedInfo.type === 'iframe') {
                onInsert(`<div class="video-wrapper" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 560px; background: #000; border-radius: 8px;">
                            <iframe src="${embedInfo.url}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style="position: absolute; top: 2%; left: 2%; width: 96%; height: 96%; border-radius: 6px;"></iframe>
                          </div>`);
            } else { // 'video' type
                onInsert(`<div class="video-wrapper" style="width: 560px; height: 315px; background: #000; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                            <video controls src="${embedInfo.url}" style="width: calc(100% - 20px); height: calc(100% - 20px); border-radius: 6px;"></video>
                          </div>`);
            }
            onClose();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64Url = e.target?.result as string;
                if (base64Url) {
                    onInsert(`<div class="video-wrapper" style="width: 560px; height: 315px; background: #000; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
                                <video controls src="${base64Url}" style="width: calc(100% - 20px); height: calc(100% - 20px); border-radius: 6px;"></video>
                              </div>`);
                    onClose();
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div ref={ref} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-4">
            <p className="text-sm font-medium text-gray-800 mb-2">{t('videoPopover.title')}</p>
            <div className="flex gap-2">
                <input 
                    type="text"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                    placeholder={t('videoPopover.placeholder')}
                    className="flex-grow text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={e => e.key === 'Enter' && handleUrlInsert()}
                />
                <button onClick={handleUrlInsert} className="text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex-shrink-0">
                    {t('videoPopover.insert')}
                </button>
            </div>

            <div className="relative my-3 flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-2 text-xs text-gray-400">{t('videoPopover.or')}</span>
                <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="video/*"
                className="hidden"
            />
            <button 
                onClick={() => fileInputRef.current?.click()} 
                className="w-full text-sm bg-white border border-gray-300 text-gray-700 px-3 py-1.5 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center justify-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                {t('videoPopover.upload')}
            </button>
        </div>
    );
};