// FIX: Import React to resolve errors with `React.Dispatch` type.
import React, { useEffect } from 'react';
import { rgbToHex } from '../utils';
import type { SelectedElementInfo } from '../types';

interface UsePreviewCommunicationProps {
    handleUpdateText: (selector: string, newHtml: string) => void;
    handleStylesUpdate: (selector: string, styles: Record<string, string>) => void;
    handleMultipleStylesUpdate: (updates: { selector: string, styles: Record<string, string> }[]) => void;
    updateHtmlDOM: (modifier: (doc: Document) => void, addToHistory?: boolean) => void;
    handleDuplicateElement: (selector: string, rect: { top: number, left: number }) => void;
    handleDeleteElement: () => void;
    handleUndo: () => void;
    handleRedo: () => void;
    setSelectedElements: React.Dispatch<React.SetStateAction<SelectedElementInfo[]>>;
    setBodyBgColor: React.Dispatch<React.SetStateAction<string>>;
    setIsControlsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setPageWidth: React.Dispatch<React.SetStateAction<number>>;
    setPageHeight: React.Dispatch<React.SetStateAction<number>>;
    setScrollToLine: React.Dispatch<React.SetStateAction<number | null>>;
    setLastActiveSlideSelector: React.Dispatch<React.SetStateAction<string | null>>;
    handleElementDrop: (draggedSelector: string, targetContainerSelector: string, dropIndex: number) => void;
    setIsPageSizeDefined: React.Dispatch<React.SetStateAction<boolean>>;
}

const processElementInfo = (info: any) => {
    if (!info) return null;
    const processed = { ...info };
    processed.backgroundColor = rgbToHex(info.backgroundColor);
    processed.color = rgbToHex(info.color);
    processed.borderColor = rgbToHex(info.borderColor);
    if (info.fontFamily) {
        processed.fontFamily = info.fontFamily.split(',')[0].replace(/['"]/g, '').trim();
    }
    return processed;
}

export const usePreviewCommunication = ({
    handleUpdateText,
    handleStylesUpdate,
    handleMultipleStylesUpdate,
    updateHtmlDOM,
    handleDuplicateElement,
    handleDeleteElement,
    handleUndo,
    handleRedo,
    setSelectedElements,
    setBodyBgColor,
    setIsControlsVisible,
    setPageWidth,
    setPageHeight,
    setScrollToLine,
    setLastActiveSlideSelector,
    handleElementDrop,
    setIsPageSizeDefined,
}: UsePreviewCommunicationProps) => {
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            const { type, payload } = event.data;
            switch (type) {
                case 'element-select': {
                    const processedInfo = processElementInfo(payload.info);
                    setSelectedElements(processedInfo ? [processedInfo] : []);
                    if (payload.slideSelector) {
                        setLastActiveSlideSelector(payload.slideSelector);
                    }
                    if (processedInfo?.lineNumber) {
                        setScrollToLine(processedInfo.lineNumber);
                    } else {
                        setScrollToLine(null);
                    }
                    if (processedInfo) {
                        setIsControlsVisible(true);
                    }
                    if (payload.bodyBg) {
                        setBodyBgColor(rgbToHex(payload.bodyBg));
                    }
                    break;
                }
                case 'elements-multiselect': {
                    const processedInfos = payload.infos.map(processElementInfo).filter(Boolean);
                    setSelectedElements(processedInfos);
                     if (processedInfos.length > 0) {
                        setIsControlsVisible(true);
                    }
                    break;
                }
                 case 'element-toggle-select': {
                    const processedInfo = processElementInfo(payload.info);
                    if (!processedInfo) break;
                    
                    if (payload.slideSelector) {
                        setLastActiveSlideSelector(payload.slideSelector);
                    }

                    setSelectedElements(prevElements => {
                        const index = prevElements.findIndex(el => el.id === processedInfo.id);
                        if (index > -1) {
                            return [...prevElements.slice(0, index), ...prevElements.slice(index + 1)];
                        } else {
                            return [...prevElements, processedInfo];
                        }
                    });
                    break;
                }
                case 'element-text-update':
                    handleUpdateText(payload.selector, payload.newHtml);
                    break;
                case 'element-styles-update':
                    handleStylesUpdate(payload.selector, payload.styles);
                    break;
                case 'elements-styles-update':
                    handleMultipleStylesUpdate(payload.updates);
                    break;
                case 'page-dimensions-init':
                    if (typeof payload.width === 'number') {
                        setPageWidth(payload.width);
                    }
                    if (typeof payload.height === 'number') {
                        setPageHeight(payload.height);
                    }
                    break;
                case 'page-resize-end':
                    const { width, height } = payload;
                    setPageWidth(width);
                    setPageHeight(height);
                    updateHtmlDOM(doc => {
                        const container = doc.querySelector('.slide-container') as HTMLElement;
                        if (container) {
                            container.style.width = `${width}px`;
                            container.style.height = `${height}px`;
                        }
                    });
                    break;
                case 'duplicate-element':
                    handleDuplicateElement(payload.selector, payload.rect);
                    break;
                case 'delete-element':
                    handleDeleteElement();
                    break;
                case 'element-drop':
                    handleElementDrop(payload.draggedSelector, payload.targetContainerSelector, payload.dropIndex);
                    break;
                case 'undo':
                    handleUndo();
                    break;
                case 'redo':
                    handleRedo();
                    break;
                case 'force-deselect':
                    setSelectedElements([]);
                    break;
                case 'page-info':
                    setIsPageSizeDefined(payload.isSizeDefined);
                    break;
                case 'content-size-response':
                    if (typeof payload.width === 'number' && payload.width > 0) {
                        setPageWidth(payload.width);
                    }
                    if (typeof payload.height === 'number' && payload.height > 0) {
                        setPageHeight(payload.height);
                    }
                    break;
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [
        handleUpdateText, handleStylesUpdate, handleMultipleStylesUpdate, updateHtmlDOM, handleDuplicateElement,
        handleDeleteElement, handleUndo, handleRedo, setSelectedElements,
        setBodyBgColor, setIsControlsVisible, setPageWidth, setPageHeight, setScrollToLine, setLastActiveSlideSelector,
        handleElementDrop, setIsPageSizeDefined
    ]);
};