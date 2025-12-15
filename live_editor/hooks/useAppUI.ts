import { useState, useEffect, useRef } from 'react';

export const useAppUI = () => {
    const [view, setView] = useState<'split' | 'editor' | 'preview'>('split');
    const [isControlsVisible, setIsControlsVisible] = useState(true);
    const [isPreviewSizerOpen, setIsPreviewSizerOpen] = useState(false);
    const [previewScale, setPreviewScale] = useState(100);
    const [isGlobalTextHidden, setIsGlobalTextHidden] = useState(false);
    const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
    
    const previewSizerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (previewSizerRef.current && !previewSizerRef.current.contains(event.target as Node)) {
                setIsPreviewSizerOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    return {
        view, setView,
        isControlsVisible, setIsControlsVisible,
        isPreviewSizerOpen, setIsPreviewSizerOpen,
        previewScale, setPreviewScale,
        isGlobalTextHidden, setIsGlobalTextHidden,
        isMultiSelectMode, setIsMultiSelectMode,
        previewSizerRef,
    };
};