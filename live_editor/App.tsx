import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Editor } from './components/Editor';
import { Preview } from './components/Preview';
import { Controls } from './components/Controls';
import { AppHeader } from './components/AppHeader';
import { MainLayout } from './components/MainLayout';
import { ManualModal } from './components/ManualModal';
import { OcrModal } from './components/OcrModal';
import { LayersPanel } from './components/LayersPanel';
import type { SelectedElementInfo } from './types';
import { useEditorState } from './hooks/useEditorState';
import { useElementHandlers } from './hooks/useElementHandlers';
import { useAppUI } from './hooks/useAppUI';
import { useFileUpload } from './hooks/useFileUpload';
import { useDownloadHandlers } from './hooks/useDownloadHandlers';
import { usePreviewCommunication } from './hooks/usePreviewCommunication';
import { usePreviewWindow } from './hooks/usePreviewWindow';
import { debounce, loadScriptWithFallbacks, rgbToHex, ensureIframeContentReady } from './utils';
import { JSZIP_URLS, HTML2CANVAS_URLS, PPTXGENJS_URLS, JSPDF_URLS, PDFJS_URLS, TESSERACT_URLS } from './constants';
import { Template } from './templates/templates';
import { useTranslations } from './hooks/useTranslations';
import { AdLoadingOverlay } from './components/AdLoadingOverlay';

// Define a new state type for the ad loading overlay
export interface AdLoadingState {
  isLoading: boolean;
  progress: number;
  message: string;
  operationType: 'Download' | 'Import' | null;
  fileType: 'HTML' | 'PDF' | 'PPTX' | 'Image' | null;
}

const App: React.FC = () => {
  const [blobUrlMap, setBlobUrlMap] = useState<Record<string, string>>({});
  const [selectedElements, setSelectedElements] = useState<SelectedElementInfo[]>([]);
  const [libsLoadingState, setLibsLoadingState] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [bodyBgColor, setBodyBgColor] = useState<string>('#f9f9f9');
  const [pageWidth, setPageWidth] = useState(1280);
  const [pageHeight, setPageHeight] = useState(720);
  const [isManualOpen, setIsManualOpen] = useState(false); // State for the manual modal
  const [isLayersPanelOpen, setIsLayersPanelOpen] = useState(false);
  const [scrollToLine, setScrollToLine] = useState<number | null>(null);
  const [lastActiveSlideSelector, setLastActiveSlideSelector] = useState<string | null>(null);
  const [isPageSizeDefined, setIsPageSizeDefined] = useState(true);

  // OCR Modal State
  const [isOcrModalOpen, setIsOcrModalOpen] = useState(false);
  const [ocrText, setOcrText] = useState('');
  const [isOcrLoading, setIsOcrLoading] = useState(false);

  // New state for the ad loading overlay
  const [adLoadingState, setAdLoadingState] = useState<AdLoadingState>({
    isLoading: false,
    progress: 0,
    message: '',
    operationType: null,
    fileType: null,
  });
  
  const { language, setLanguage, t } = useTranslations();

  const previewIframeRef = useRef<HTMLIFrameElement>(null);
  
  const {
    history,
    setHistory,
    present,
    setHtmlCode,
    setCssCode,
    setJsCode,
    handleClearCode,
    canUndo,
    canRedo,
    handleUndo,
    handleRedo,
  } = useEditorState(language);
  
  const handleClearCodeAndReset = useCallback((type: 'html' | 'css' | 'js') => {
    handleClearCode(type);
    if (type === 'html' || type === 'css') {
      // If HTML or CSS is cleared, the layout might drastically change.
      // Reset the page height to a small default. The auto-sizing logic
      // in the preview will correct it if there's still content.
      // Resetting width to default is also a good idea.
      setPageHeight(150); // A small but non-zero default
      setPageWidth(1280);
    }
  }, [handleClearCode, setPageHeight, setPageWidth]);

  const { html: htmlCode, css: cssCode, js: jsCode } = present;
  
  const {
    view, setView,
    isControlsVisible, setIsControlsVisible,
    isPreviewSizerOpen, setIsPreviewSizerOpen,
    previewScale, setPreviewScale,
    isGlobalTextHidden, setIsGlobalTextHidden,
    isMultiSelectMode, setIsMultiSelectMode,
    previewSizerRef,
  } = useAppUI();

  const {
    updateHtmlDOM,
    handleDeleteElement,
    handleDuplicateElement,
    handleInsertElement,
    handleUpdateText,
    handleStylesUpdate,
    handleMultipleStylesUpdate,
    handleNumericStyleChange,
    handleGenericStyleChange,
    handleTextAlignChange,
    handleVerticalAlignChange,
    handleTextStyleToggle,
    handleTextColorChange,
    handleBgChange,
    handlePageSizeChange,
    handleLinkUpdate,
    handleApplyStylePreset,
    handleAlignmentChange,
    handleToggleElementVisibility,
    handleApplyAnimation,
    handleElementDrop,
    handleHoverStyleChange,
  } = useElementHandlers({
      setHistory,
      present,
      selectedElements,
      setSelectedElements,
      setBodyBgColor,
      previewIframeRef,
      pageWidth,
      pageHeight,
      setPageWidth,
      setPageHeight,
      lastActiveSlideSelector,
  });

  const {
    fileInputRef,
    handleFileOpen,
    handleOpenClick,
  } = useFileUpload({
      setHistory,
      setSelectedElements,
      setAdLoadingState,
      setPreviewScale,
      setBlobUrlMap,
      t,
  });
  
  const {
    handleDownloadHTML,
    handleDownloadPPTX,
    handleDownloadPDF,
    handleDownloadImage,
  } = useDownloadHandlers({
    htmlCode,
    cssCode,
    jsCode,
    previewIframeRef,
    setAdLoadingState,
    blobUrlMap,
    t,
  });

  const { handleOpenInNewWindow } = usePreviewWindow({
    htmlCode,
    cssCode,
    jsCode,
    blobUrlMap,
    pageWidth,
    pageHeight,
  });

  usePreviewCommunication({
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
  });
  
  useEffect(() => {
    previewIframeRef.current?.contentWindow?.postMessage({
        type: 'toggle-global-text',
        payload: { isHidden: isGlobalTextHidden }
    }, '*');
  }, [isGlobalTextHidden]);

  useEffect(() => {
    previewIframeRef.current?.contentWindow?.postMessage({
        type: 'set-multi-select-mode',
        payload: { enabled: isMultiSelectMode }
    }, '*');
  }, [isMultiSelectMode]);
  
  useEffect(() => {
    Promise.all([
        loadScriptWithFallbacks(JSZIP_URLS),
        loadScriptWithFallbacks(HTML2CANVAS_URLS),
        loadScriptWithFallbacks(JSPDF_URLS),
        loadScriptWithFallbacks(PDFJS_URLS),
        loadScriptWithFallbacks(TESSERACT_URLS),
    ]).then(() => {
        return loadScriptWithFallbacks(PPTXGENJS_URLS);
    }).then(() => {
        const pdfjsLib = (window as any).pdfjsLib;
        if (pdfjsLib) {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;
        }
        setLibsLoadingState('loaded');
    }).catch(error => {
        console.error("외부 라이브러리 로딩 최종 실패:", error);
        setLibsLoadingState('error');
    });
  }, []);

  useEffect(() => {
    // Cleanup blob URLs when the component unmounts.
    return () => {
      Object.keys(blobUrlMap).forEach(url => URL.revokeObjectURL(url));
    };
  }, [blobUrlMap]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return;
      }

      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const modKey = isMac ? event.metaKey : event.ctrlKey;

      if (modKey && event.key.toLowerCase() === 'z') {
        event.preventDefault();
        if (event.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
        return;
      }
      
      if (!isMac && modKey && event.key.toLowerCase() === 'y') {
        event.preventDefault();
        handleRedo();
      }
      
      if (event.key === 'Escape' && selectedElements.length > 0) {
        event.preventDefault();
        setSelectedElements([]);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleUndo, handleRedo, selectedElements]);

  const handleSelectElementBySelector = (selector: string) => {
    previewIframeRef.current?.contentWindow?.postMessage({
      type: 'select-element-by-selector',
      payload: { selector },
    }, '*');
  };
  
  const onScrollComplete = useCallback(() => {
    setScrollToLine(null);
  }, []);

  const handleNewFileFromTemplate = (template: Template) => {
    // Sandboxed environments often block window.confirm, causing buttons to appear unresponsive.
    // We'll proceed without confirmation for now to ensure functionality.
    // A custom modal could be a future enhancement if confirmation is strictly needed.
    console.log("Creating new file from template:", template.name, `(${template.width}x${template.height})`);
    setHistory({
      past: [],
      present: {
        html: template.html,
        css: template.css || '',
        js: '',
      },
      future: [],
    });
    setSelectedElements([]);
    setPageWidth(template.width);
    setPageHeight(template.height);
  };

  const handleAutoResize = useCallback(() => {
    previewIframeRef.current?.contentWindow?.postMessage({
        type: 'get-content-size',
    }, '*');
  }, [previewIframeRef]);

  const handleExtractText = async () => {
    if (isOcrLoading) return;

    setIsOcrModalOpen(true);
    setIsOcrLoading(true);
    setOcrText('');

    if (!previewIframeRef.current?.contentDocument?.body) {
        setOcrText(t('errors.ocrPreviewError'));
        setIsOcrLoading(false);
        return;
    }

    try {
        await ensureIframeContentReady(previewIframeRef.current);
        const html2canvas = (window as any).html2canvas;
        const Tesseract = (window as any).Tesseract;

        if (!html2canvas || !Tesseract) {
            throw new Error(t('errors.ocrLibraryError'));
        }
        
        const iframeBody = previewIframeRef.current.contentDocument.body;
        const canvas = await html2canvas(iframeBody, {
            scale: 2, // Higher scale for better OCR accuracy
            useCORS: true,
            allowTaint: true,
            logging: false,
        });

        const worker = await Tesseract.createWorker('kor+eng', 1, {
            logger: (m: any) => {
                if (m.status === 'recognizing text') {
                    // console.log(`Recognizing: ${Math.round(m.progress * 100)}%`);
                }
            },
        });

        const { data: { text } } = await worker.recognize(canvas);
        await worker.terminate();
        
        setOcrText(text || t('ocr.noTextFound'));

    } catch (error) {
        console.error("OCR process failed:", error);
        setOcrText(error instanceof Error ? error.message : t('errors.ocrProcessError'));
    } finally {
        setIsOcrLoading(false);
    }
  };

  const editorPane = (
    <div className="h-full flex flex-col">
      <Editor 
        htmlCode={htmlCode}
        cssCode={cssCode}
        jsCode={jsCode}
        onHtmlChange={setHtmlCode}
        onCssChange={setCssCode}
        onJsChange={setJsCode}
        onClearCode={handleClearCodeAndReset}
        scrollToLine={scrollToLine}
        onScrollComplete={onScrollComplete}
        t={t}
      />
    </div>
  );
  
  const previewPane = (
    <div className="w-full h-full flex flex-col">
      <Preview 
        ref={previewIframeRef} 
        htmlCode={htmlCode} 
        cssCode={cssCode}
        jsCode={jsCode}
        selectedElementIds={selectedElements.map(el => el.id)} 
      />
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen text-gray-800 flex flex-col h-screen overflow-hidden">
      <AdLoadingOverlay 
        isLoading={adLoadingState.isLoading}
        progress={adLoadingState.progress}
        message={adLoadingState.message}
        onClose={() => setAdLoadingState(prev => ({ ...prev, isLoading: false }))}
        operationType={adLoadingState.operationType}
        t={t}
      />
      <ManualModal isOpen={isManualOpen} onClose={() => setIsManualOpen(false)} t={t} />
      <OcrModal 
        isOpen={isOcrModalOpen}
        onClose={() => setIsOcrModalOpen(false)}
        extractedText={ocrText}
        isLoading={isOcrLoading}
        t={t}
      />
      
      <AppHeader
        view={view}
        setView={setView}
        isPreviewSizerOpen={isPreviewSizerOpen}
        setIsPreviewSizerOpen={setIsPreviewSizerOpen}
        previewSizerRef={previewSizerRef}
        previewScale={previewScale}
        setPreviewScale={setPreviewScale}
        isControlsVisible={isControlsVisible}
        setIsControlsVisible={setIsControlsVisible}
        isGlobalTextHidden={isGlobalTextHidden}
        setIsGlobalTextHidden={setIsGlobalTextHidden}
        fileInputRef={fileInputRef}
        handleFileOpen={handleFileOpen}
        handleOpenClick={handleOpenClick}
        isDownloading={adLoadingState.isLoading}
        libsLoadingState={libsLoadingState}
        handleDownloadHTML={handleDownloadHTML}
        handleDownloadPPTX={handleDownloadPPTX}
        handleDownloadPDF={handleDownloadPDF}
        handleDownloadImage={handleDownloadImage}
        handleOpenInNewTab={handleOpenInNewWindow}
        setSelectedElements={setSelectedElements}
        setIsManualOpen={setIsManualOpen}
        isLayersPanelOpen={isLayersPanelOpen}
        onToggleLayersPanel={() => setIsLayersPanelOpen(p => !p)}
        onNewFile={handleNewFileFromTemplate}
        onExtractText={handleExtractText}
        isOcrLoading={isOcrLoading}
        language={language}
        setLanguage={setLanguage}
        t={t}
      />
      
      {isControlsVisible && (
         <Controls 
            selectedElements={selectedElements}
            setSelectedElements={setSelectedElements}
            onNumericStyleChange={handleNumericStyleChange}
            onGenericStyleChange={handleGenericStyleChange}
            onTextAlignChange={handleTextAlignChange}
            onVerticalAlignChange={handleVerticalAlignChange}
            onTextStyleToggle={handleTextStyleToggle}
            onTextColorChange={handleTextColorChange}
            onBgChange={handleBgChange}
            // FIX: Pass `handleUndo` and `handleRedo` functions to the `Controls` component instead of the undefined `onUndo` and `onRedo`.
            onUndo={handleUndo}
            onRedo={handleRedo}
            canUndo={canUndo}
            canRedo={canRedo}
            onInsertElement={handleInsertElement}
            bodyBgColor={bodyBgColor}
            pageWidth={pageWidth}
            pageHeight={pageHeight}
            onPageSizeChange={handlePageSizeChange}
            isMultiSelectMode={isMultiSelectMode}
            setIsMultiSelectMode={setIsMultiSelectMode}
            setBlobUrlMap={setBlobUrlMap}
            onLinkUpdate={handleLinkUpdate}
            onApplyStylePreset={handleApplyStylePreset}
            onAlignmentChange={handleAlignmentChange}
            onApplyAnimation={handleApplyAnimation}
            onAutoResize={handleAutoResize}
            isPageSizeDefined={isPageSizeDefined}
            onHoverStyleChange={handleHoverStyleChange}
            cssCode={cssCode}
            t={t}
          />
      )}
      
      <MainLayout
        view={view}
        editorPane={editorPane}
        previewPane={previewPane}
        previewScale={previewScale}
        pageWidth={pageWidth}
        pageHeight={pageHeight}
      />
      
      <LayersPanel
        isOpen={isLayersPanelOpen}
        onClose={() => setIsLayersPanelOpen(false)}
        htmlCode={htmlCode}
        selectedElementIds={selectedElements.map(el => el.id)}
        onSelectElement={handleSelectElementBySelector}
        onToggleVisibility={handleToggleElementVisibility}
        t={t}
      />
    </div>
  );
};

export default App;