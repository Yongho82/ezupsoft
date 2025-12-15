import React from 'react';
import { ensureIframeContentReady } from '../utils';
import { generatePptx } from '../lib/pptxGenerator';
import { generatePdf } from '../lib/pdfGenerator';
import { TFunction } from './useTranslations';
import { AdLoadingState } from '../App';

interface UseDownloadHandlersProps {
  htmlCode: string;
  cssCode:string;
  jsCode: string;
  previewIframeRef: React.RefObject<HTMLIFrameElement>;
  setAdLoadingState: React.Dispatch<React.SetStateAction<AdLoadingState>>;
  blobUrlMap: Record<string, string>;
  t: TFunction;
}

// Filename helpers
const getEditorLanguage = (): 'en' | 'ko' => {
  try {
    const v = localStorage.getItem('editor-language');
    return v === 'en' ? 'en' : 'ko';
  } catch {
    return 'ko';
  }
};

const getFilenameBase = () => {
  return getEditorLanguage() === 'en' ? 'EzupEditor' : '이지업에디터';
};

const pad2 = (n: number) => String(n).padStart(2, '0');
const formatTimestamp = () => {
  const d = new Date();
  return `${d.getFullYear()}${pad2(d.getMonth() + 1)}${pad2(d.getDate())}_${pad2(d.getHours())}${pad2(d.getMinutes())}`;
};

const buildFilename = (ext: string) => `${getFilenameBase()}_${formatTimestamp()}.${ext}`;

// Helper to trigger the download after the delay
const triggerDownload = (data: Blob | string, filename: string) => {
  const url = (data instanceof Blob) ? URL.createObjectURL(data) : data;
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  if (data instanceof Blob) {
    URL.revokeObjectURL(url);
  }
};


export const useDownloadHandlers = ({
  htmlCode,
  cssCode,
  jsCode,
  previewIframeRef,
  setAdLoadingState,
  blobUrlMap,
  t,
}: UseDownloadHandlersProps) => {

  const withAdDelay = (
    task: (onProgress: (message: string, progress?: number) => void) => Promise<Blob | string | null>,
    fileType: AdLoadingState['fileType'],
    fileName: string
  ) => async () => {
    const MIN_AD_TIME_MS = 10000;
    const startTime = Date.now();
    
    setAdLoadingState({ isLoading: true, progress: 0, message: t('adLoading.preparing'), operationType: 'Download', fileType });
    
    let taskCompleted = false;
    let downloadable: Blob | string | null = null;
    let progressInterval: number | null = null;
    let taskError: Error | null = null;
    let taskFinishTime = 0; // To record when the main task finishes
    
    const onProgressUpdate = (message: string, progress?: number) => {
        setAdLoadingState(prev => ({ ...prev, message, progress: progress ? Math.min(90, progress) : prev.progress }));
    };

    task(onProgressUpdate).then((data) => {
        downloadable = data;
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
            console.error(`${fileType} generation failed:`, taskError);
            alert(taskError.message);
            throw taskError;
        }

        if (downloadable) {
            triggerDownload(downloadable, fileName);
        }
        
        setAdLoadingState(prev => ({ ...prev, progress: 100, message: t('adLoading.downloadComplete') }));

        setTimeout(() => {
            setAdLoadingState({ isLoading: false, progress: 0, message: '', operationType: null, fileType: null });
        }, 2000);

    } catch (error) {
        if (progressInterval) clearInterval(progressInterval);
        setAdLoadingState({ isLoading: false, progress: 0, message: '', operationType: null, fileType: null });
    }
  };


  const getCleanHtml = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');
    
    // Replace blob URLs with base64 data URLs for portability
    doc.querySelectorAll('img[src^="blob:"]').forEach(el => {
        // FIX: Cast element to HTMLImageElement to access 'src' property.
        const img = el as HTMLImageElement;
        const base64Url = blobUrlMap[img.src];
        if (base64Url) {
            img.src = base64Url;
        } else {
            console.warn(`Could not find a base64 replacement for blob URL: ${img.src}`);
        }
    });
   
    doc.querySelectorAll('[style*="blob:"]').forEach(el => {
        const element = el as HTMLElement;
        let styleAttr = element.getAttribute('style');
        if (styleAttr) {
            const blobMatches = styleAttr.match(/blob:[^"';)]+/g) || [];
            blobMatches.forEach(blobUrl => {
                const base64Url = blobUrlMap[blobUrl];
                if (base64Url) {
                    styleAttr = styleAttr.replace(blobUrl, base64Url);
                }
            });
            element.setAttribute('style', styleAttr);
        }
    });

    let viewport = doc.querySelector('meta[name="viewport"]');
    if (!viewport) {
      viewport = document.createElement('meta');
      viewport.setAttribute('name', 'viewport');
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      doc.head.prepend(viewport);
    }
    
    let charset = doc.querySelector('meta[charset]');
    if (!charset) {
        charset = document.createElement('meta');
        charset.setAttribute('charset', 'UTF-8');
        doc.head.prepend(charset);
    }

    // FIX: Add animation keyframes and classes to the exported CSS.
    const animationCss = `
        /* Animation Keyframes */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-20px); }
            to { opacity: 1; transform: translateX(0); }
        }
        /* Animation Classes */
        .anim-fade-in {
            animation-name: fadeIn;
            animation-fill-mode: forwards;
            animation-timing-function: ease-out;
        }
        .anim-slide-up {
            animation-name: slideUp;
            animation-fill-mode: forwards;
            animation-timing-function: ease-out;
        }
        .anim-slide-in-left {
            animation-name: slideInLeft;
            animation-fill-mode: forwards;
            animation-timing-function: ease-out;
        }
    `;

    const combinedCss = `${cssCode}\n\n${animationCss}`;

    // Inject user CSS and animation CSS
    if (combinedCss.trim()) {
      const userStyle = document.createElement('style');
      userStyle.textContent = combinedCss;
      doc.head.appendChild(userStyle);
    }
    
    // Inject user JS
    if (jsCode.trim()) {
        const userScript = document.createElement('script');
        userScript.textContent = jsCode;
        doc.body.appendChild(userScript);
    }

    doc.querySelectorAll('.selected-element-highlight').forEach(el => el.classList.remove('selected-element-highlight'));
    doc.getElementById('editor-script')?.remove();
    doc.getElementById('editor-style')?.remove();
    doc.getElementById('global-text-visibility-style')?.remove();
    doc.getElementById('user-styles')?.remove(); // remove preview-only styles if they exist
    doc.getElementById('user-script')?.remove(); // remove preview-only script if it exists
    
    return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
  };

  const handleDownloadHTML = withAdDelay(async (onProgress) => {
    onProgress(t('adLoading.generating', { fileType: 'HTML' }), 30);
    const cleanHtml = getCleanHtml();
    const blob = new Blob([cleanHtml], { type: 'text/html;charset=utf-8' });
    onProgress(t('adLoading.generating', { fileType: 'HTML' }), 80);
    return blob;
  }, 'HTML', buildFilename('html'));

  const handleDownloadPPTX = withAdDelay(async (onProgress) => {
    return await generatePptx(previewIframeRef, (msg, prog) => onProgress(msg, prog), t);
  }, 'PPTX', buildFilename('pptx'));

  const handleDownloadPDF = withAdDelay(async (onProgress) => {
    return await generatePdf(previewIframeRef, (msg, prog) => onProgress(msg, prog), t);
  }, 'PDF', buildFilename('pdf'));

  const handleDownloadImage = withAdDelay(async (onProgress) => {
    if (!previewIframeRef.current?.contentDocument?.body) {
        throw new Error('미리보기를 분석할 수 없습니다.');
    }
    onProgress(t('adLoading.generating', { fileType: 'Image' }), 20);

    const iframeDoc = previewIframeRef.current.contentDocument;
    const tempStyle = iframeDoc.createElement('style');
    tempStyle.textContent = `
      *:hover { outline: none !important; }
      .selected-element-highlight { outline: none !important; box-shadow: none !important; }
      i[class*="fa-"], svg.svg-inline--fa {
        transform: translateY(-7px);
      }
    `;

    try {
        iframeDoc.head.appendChild(tempStyle);
        await ensureIframeContentReady(previewIframeRef.current);
        const html2canvas = (window as any).html2canvas;
        if (!html2canvas) {
            throw new Error(t('errors.imageLibrary'));
        }
        onProgress(t('adLoading.generating', { fileType: 'Image' }), 50);

        const iframeBody = previewIframeRef.current.contentDocument.body;
        const canvas = await html2canvas(iframeBody, {
            useCORS: true,
            allowTaint: true,
            logging: false,
            letterRendering: true,
            width: iframeBody.scrollWidth,
            height: iframeBody.scrollHeight,
        });

        onProgress(t('adLoading.generating', { fileType: 'Image' }), 80);

        return canvas.toDataURL('image/png');
    } finally {
      if (tempStyle.parentNode) {
        iframeDoc.head.removeChild(tempStyle);
      }
    }
  }, 'Image', buildFilename('png'));

  return {
    handleDownloadHTML,
    handleDownloadPPTX,
    handleDownloadPDF,
    handleDownloadImage,
  };
};