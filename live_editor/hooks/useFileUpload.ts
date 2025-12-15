import React, { useRef } from 'react';
import type { SelectedElementInfo } from '../types';
import type { EditorState } from './useEditorState';
import { convertPptxToHtml } from '../pptxConverter';
import { TFunction } from './useTranslations';
import { AdLoadingState } from '../App';
import { createTemplateHtml } from '../templates/templates';

type HistorySetter = React.Dispatch<React.SetStateAction<{
    past: EditorState[],
    present: EditorState,
    future: EditorState[],
}>>;

interface UseFileUploadProps {
    setHistory: HistorySetter;
    setSelectedElements: React.Dispatch<React.SetStateAction<SelectedElementInfo[]>>;
    setAdLoadingState: React.Dispatch<React.SetStateAction<AdLoadingState>>;
    setPreviewScale: React.Dispatch<React.SetStateAction<number>>;
    setBlobUrlMap: React.Dispatch<React.SetStateAction<Record<string, string>>>;
    t: TFunction;
}

export const useFileUpload = ({
    setHistory,
    setSelectedElements,
    setAdLoadingState,
    setPreviewScale,
    setBlobUrlMap,
    t,
}: UseFileUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const withAdImportDelay = (
        task: (onProgress: (message: string, progress?: number) => void) => Promise<any>,
        fileType: 'PDF' | 'PPTX' | 'Image'
    ) => async () => {
        const MIN_AD_TIME_MS = 10000;
        const startTime = Date.now();
        
        setAdLoadingState({ isLoading: true, progress: 0, message: t('adLoading.preparing'), operationType: 'Import', fileType });
        
        let taskCompleted = false;
        let taskResult: any = null;
        let progressInterval: number | null = null;
        let taskError: Error | null = null;
        let taskFinishTime = 0; // To record when the main task finishes
        
        const onProgressUpdate = (message: string, progress?: number) => {
            setAdLoadingState(prev => ({ ...prev, message, progress: progress ? Math.min(90, progress) : prev.progress }));
        };
    
        task(onProgressUpdate).then((data) => {
            taskResult = data;
        }).catch(error => {
            taskError = error;
        }).finally(() => {
            taskCompleted = true;
            taskFinishTime = Date.now(); // Record finish time
            setAdLoadingState(prev => ({
                ...prev,
                progress: Math.max(prev.progress, 90),
                message: t('adLoading.finalizing')
            }));
        });
    
        const timerPromise = new Promise(resolve => setTimeout(resolve, MIN_AD_TIME_MS));
    
        progressInterval = window.setInterval(() => {
            if (taskCompleted) {
                // Smoothly animate progress from 90 to 99 over the remaining ad wait time.
                const totalWaitTimeAfterFinish = (startTime + MIN_AD_TIME_MS) - taskFinishTime;
                if (totalWaitTimeAfterFinish > 0) {
                    const timeSinceTaskFinished = Date.now() - taskFinishTime;
                    const animationProgress = Math.min(1, timeSinceTaskFinished / totalWaitTimeAfterFinish);
                    const newProgress = 90 + (animationProgress * 9); // This animates from 90 to 99.
                    setAdLoadingState(prev => ({ ...prev, progress: Math.min(99, newProgress) }));
                } else {
                    // If the task took longer than the ad time, just set to 99.
                    setAdLoadingState(prev => ({ ...prev, progress: 99 }));
                }
            } else {
                // While the task is running, animate up to 90% based on elapsed ad time.
                const elapsed = Date.now() - startTime;
                const progress = Math.min(90, (elapsed / MIN_AD_TIME_MS) * 100);
                setAdLoadingState(prev => ({ ...prev, progress: Math.max(prev.progress, progress) }));
            }
        }, 100); // Update frequently for a smoother bar
    
        try {
            await timerPromise;
            // Now wait for task too if it's not done
            await new Promise<void>(resolve => {
                const check = () => {
                    if (taskCompleted) resolve();
                    else setTimeout(check, 100);
                };
                check();
            });
    
            if (progressInterval) clearInterval(progressInterval);
    
            if (taskError) {
                console.error(`${fileType} import failed:`, taskError);
                alert(taskError.message);
                throw taskError;
            }
            
            setAdLoadingState(prev => ({ ...prev, progress: 100, message: t('importLoading.complete') }));
    
            setTimeout(() => {
                setAdLoadingState({ isLoading: false, progress: 0, message: '', operationType: null, fileType: null });
            }, 2000);
            
            return taskResult;
    
        } catch (error) {
            if (progressInterval) clearInterval(progressInterval);
            setAdLoadingState({ isLoading: false, progress: 0, message: '', operationType: null, fileType: null });
            return null;
        }
    };


    const handlePdfUpload = async (file: File) => {
        const task = (onProgress: (message: string, progress?: number) => void) => new Promise<string>(async (resolve, reject) => {
            const pdfjsLib = (window as any).pdfjsLib;
            if (!pdfjsLib) {
                return reject(new Error(t('errors.pdfLibrary')));
            }
            
            onProgress(t('loading.pdfAnalysis'));

            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const data = new Uint8Array(e.target?.result as ArrayBuffer);
                    const pdf = await pdfjsLib.getDocument({ data }).promise;
                    
                    const PIXELS_PER_POINT = 96 / 72;
                    let allSlidesHtml = '';

                    for (let i = 1; i <= pdf.numPages; i++) {
                        const progress = (i / pdf.numPages) * 90;
                        onProgress(t('loading.pdfPage', { current: i, total: pdf.numPages }), progress);
                        
                        const page = await pdf.getPage(i);
                        const bgRenderScale = 2;
                        const viewportForBg = page.getViewport({ scale: bgRenderScale });
                        const viewportForCoords = page.getViewport({ scale: 1 });

                        const canvas = document.createElement('canvas');
                        const context = canvas.getContext('2d');
                        canvas.height = viewportForBg.height;
                        canvas.width = viewportForBg.width;

                        await page.render({ canvasContext: context!, viewport: viewportForBg }).promise;
                        
                        const textContent = await page.getTextContent();
                        
                        context!.globalCompositeOperation = 'destination-out';
                        textContent.items.forEach((item: any) => {
                            if (!item.str.trim()) return;
                            const tx = item.transform;
                            const canvasX = tx[4] * bgRenderScale;
                            const canvasY = viewportForBg.height - (tx[5] * bgRenderScale);
                            const canvasWidth = item.width * bgRenderScale;
                            const canvasHeight = item.height * bgRenderScale;
                            const fudge = 1.0 * bgRenderScale; 
                            context!.fillRect(canvasX - fudge, canvasY - canvasHeight - fudge, canvasWidth + (fudge * 2), canvasHeight + (fudge * 2));
                        });
                        context!.globalCompositeOperation = 'source-over';
                        
                        const bgImageDataUrl = canvas.toDataURL('image/png');
                        
                        const styles = textContent.styles;
                        let textElementsHtml = '';

                        const lines = new Map<number, any[]>();
                        const yTolerance = 2;

                        textContent.items.forEach((item: any) => {
                            if (!item.str.trim()) return;
                            const y = Math.round(item.transform[5] / yTolerance) * yTolerance;
                            if (!lines.has(y)) lines.set(y, []);
                            lines.get(y)!.push(item);
                        });

                        const sortedLines = Array.from(lines.values()).sort((a, b) => b[0].transform[5] - a[0].transform[5]);

                        sortedLines.forEach(lineItems => {
                            if (lineItems.length === 0) return;
                            lineItems.sort((a, b) => a.transform[4] - b.transform[4]);

                            const heights = lineItems.map(item => item.height);
                            const heightCounts = heights.reduce((acc, h) => {
                                const roundedH = Math.round(h);
                                acc[roundedH] = (acc[roundedH] || 0) + 1;
                                return acc;
                            }, {} as Record<number, number>);

                            const dominantHeight = parseFloat(Object.keys(heightCounts).reduce((a, b) => heightCounts[parseInt(a)] > heightCounts[parseInt(b)] ? a : b, '10'));

                            const mergedItems = [];
                            if (lineItems.length > 0) {
                                let currentMergedItem = { ...lineItems[0] };
                                for (let j = 1; j < lineItems.length; j++) {
                                    const prevItem = lineItems[j - 1];
                                    const currentItem = lineItems[j];
                                    const prevItemRight = prevItem.transform[4] + prevItem.width;
                                    const gap = currentItem.transform[4] - prevItemRight;
                                    const isSameStyle = prevItem.fontName === currentItem.fontName;
                                    const spaceThreshold = dominantHeight * 0.3;
                                    const mergeThreshold = dominantHeight * 1.0;

                                    if (isSameStyle && gap > -5 && gap < mergeThreshold) {
                                        const separator = (gap > spaceThreshold) ? ' ' : '';
                                        currentMergedItem.str += separator + currentItem.str;
                                        currentMergedItem.width = (currentItem.transform[4] + currentItem.width) - currentMergedItem.transform[4];
                                    } else {
                                        mergedItems.push(currentMergedItem);
                                        currentMergedItem = { ...currentItem };
                                    }
                                }
                                mergedItems.push(currentMergedItem);
                            }

                            mergedItems.forEach(item => {
                                const style = styles[item.fontName];
                                const tx = item.transform;
                                const left = tx[4] * PIXELS_PER_POINT;
                                const top = (viewportForCoords.height - tx[5] - item.height) * PIXELS_PER_POINT;
                                const fontSize = item.height * PIXELS_PER_POINT;
                                const width = item.width * PIXELS_PER_POINT;
                                const cssStyle = `position: absolute; background-color: transparent; left: ${left}px; top: ${top}px; width: ${width}px; font-size: ${fontSize}px; font-family: "${style?.fontFamily || 'sans-serif'}", sans-serif; line-height: 1.0;`;
                                const content = item.str.replace(/ /g, '&nbsp;');
                                textElementsHtml += `<div style="${cssStyle}">${content}</div>`;
                            });
                        });
                        
                        const slideWidth = viewportForCoords.width * PIXELS_PER_POINT;
                        const slideHeight = viewportForCoords.height * PIXELS_PER_POINT;

                        const slideHtml = `
                            <div class="slide-item" style="position: relative; width: ${slideWidth}px; height: ${slideHeight}px; box-shadow: 0 10px 30px rgba(0,0,0,0.2); background-color: white; overflow: hidden; flex-shrink: 0;">
                                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url(${bgImageDataUrl}); background-size: cover;"></div>
                                ${textElementsHtml}
                            </div>`;
                        allSlidesHtml += slideHtml;
                    }

                    const finalHtml = `<!DOCTYPE html><html><head><meta charset="UTF-8" /><style>body { margin: 0; }.slide-container {display: flex; flex-direction: column; align-items: center; gap: 2rem; padding: 2rem 0; margin: 0 auto; width: fit-content;}</style></head><body><div class="slide-container">${allSlidesHtml}</div></body></html>`;
                    resolve(finalHtml);
                } catch (error) {
                    const message = error instanceof Error ? error.message : t('errors.unknown');
                    reject(new Error(t('errors.pdfProcess', { message })));
                }
            };
            reader.readAsArrayBuffer(file);
        });

        const delayedTask = withAdImportDelay(task, 'PDF');
        const finalHtml = await delayedTask();

        if (finalHtml) {
            setHistory({ past: [], present: { html: finalHtml, css: '', js: '' }, future: [] });
            setSelectedElements([]);
            setPreviewScale(100);
        }
    };

    const handlePptxUpload = async (file: File) => {
        const task = (onProgress: (message: string, progress?: number) => void) => {
            return convertPptxToHtml(file, onProgress, t);
        };

        const delayedTask = withAdImportDelay(task, 'PPTX');
        const result = await delayedTask();

        if (result) {
            const { html, blobMap } = result;
            setHistory({ past: [], present: { html, css: '', js: '' }, future: [] });
            setBlobUrlMap(prev => ({ ...prev, ...blobMap }));
            setSelectedElements([]);
            setPreviewScale(100);
        }
    };

    const handleImageUpload = async (file: File) => {
        const task = (onProgress: (message: string, progress?: number) => void) => new Promise<{ html: string, blobMap: Record<string, string> }>(async (resolve, reject) => {
            onProgress(t('loading.imageImport'), 20);
            try {
                const img = new Image();
                const url = URL.createObjectURL(file);
    
                img.onload = async () => {
                    onProgress(t('loading.imageImport'), 50);
                    const { naturalWidth: width, naturalHeight: height } = img;
                    
                    const base64Url = await new Promise<string>((resolve, reject) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve(reader.result as string);
                        reader.onerror = reject;
                        reader.readAsDataURL(file);
                    });
    
                    const newBlobMap = { [url]: base64Url };
    
                    const imageHtml = `<img src="${url}" alt="${file.name}" style="display: block; max-width: 100%; max-height: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.15); border-radius: 8px;" />`;
                    
                    const finalHtml = createTemplateHtml(width, height, imageHtml);
                    
                    onProgress(t('loading.imageImport'), 90);
                    resolve({ html: finalHtml, blobMap: newBlobMap });
                };
                img.onerror = (err) => {
                    URL.revokeObjectURL(url);
                    reject(new Error(t('errors.imageProcessError')));
                };
                img.src = url;
            } catch (error) {
                reject(error);
            }
        });

        const delayedTask = withAdImportDelay(task, 'Image');
        const result = await delayedTask();

        if (result) {
            const { html, blobMap } = result;
            setHistory({ past: [], present: { html, css: '', js: '' }, future: [] });
            setBlobUrlMap(prev => ({ ...prev, ...blobMap }));
            setSelectedElements([]);
            setPreviewScale(100);
        }
    };

    const handleFileOpen = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.type.startsWith('text/html')) {
            const task = (onProgress: (message: string, progress?: number) => void) => new Promise<void>((resolve, reject) => {
                try {
                    onProgress(t('loading.htmlImport'), 30);
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const content = e.target?.result as string;
                        if (typeof content === 'string') {
                            setHistory({ past: [], present: { html: content, css: '', js: '' }, future: [] });
                            setSelectedElements([]);
                            onProgress(t('loading.htmlImport'), 90);
                            resolve();
                        } else {
                            reject(new Error('파일 내용을 읽을 수 없습니다.'));
                        }
                    };
                    reader.onerror = () => reject(new Error('파일을 읽는 중 오류가 발생했습니다.'));
                    reader.readAsText(file);
                } catch (e) {
                    reject(e as Error);
                }
            });
            const delayed = withAdImportDelay(task, 'PDF'); /* type label not used for HTML; reuse */
            delayed();
        } else if (file.type === 'application/pdf') {
            handlePdfUpload(file);
        } else if (file.name.endsWith('.pptx')) {
            handlePptxUpload(file);
        } else if (file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
        else {
            console.error('지원하지 않는 파일 형식입니다.');
        }
        event.target.value = '';
    };

    const handleOpenClick = (acceptType: string) => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = acceptType;
            fileInputRef.current.click();
        }
    };

    return {
        fileInputRef,
        handleFileOpen,
        handleOpenClick,
    };
};