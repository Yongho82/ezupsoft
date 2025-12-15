import React, { useState, useEffect, useRef } from 'react';
import { TFunction } from '../hooks/useTranslations';

// Add this line to inform TypeScript about the global CodeMirror object
declare var CodeMirror: any;

interface EditorProps {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  onHtmlChange: (newCode: string) => void;
  onCssChange: (newCode: string) => void;
  onJsChange: (newCode: string) => void;
  onClearCode: (type: 'html' | 'css' | 'js') => void;
  scrollToLine: number | null;
  onScrollComplete: () => void;
  t: TFunction;
}

type EditorTab = 'html' | 'css' | 'js';

export const Editor: React.FC<EditorProps> = ({ 
  htmlCode, 
  cssCode, 
  jsCode, 
  onHtmlChange, 
  onCssChange, 
  onJsChange,
  onClearCode,
  scrollToLine,
  onScrollComplete,
  t,
}) => {
  const editorContainerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const isProgrammaticChange = useRef(false);

  const [activeTab, setActiveTab] = useState<EditorTab>('html');

  const codeForTab: Record<EditorTab, string> = {
    html: htmlCode,
    css: cssCode,
    js: jsCode,
  };

  const onChangeForTab: Record<EditorTab, (newCode: string) => void> = {
    html: onHtmlChange,
    css: onCssChange,
    js: onJsChange,
  };

  const modeForTab: Record<EditorTab, string> = {
    html: 'htmlmixed',
    css: 'css',
    js: 'javascript'
  };

  // Initialize CodeMirror editor
  useEffect(() => {
    if (!editorContainerRef.current) return;

    let editor: any;
    
    // Poll for CodeMirror since it's loaded from a CDN
    const intervalId = setInterval(() => {
      if (typeof CodeMirror !== 'undefined') {
        clearInterval(intervalId);

        editor = CodeMirror(editorContainerRef.current!, {
          lineNumbers: true,
          theme: 'material-darker',
          mode: modeForTab[activeTab],
          value: codeForTab[activeTab],
          lineWrapping: false,
        });

        editorRef.current = editor;

        editor.on('change', (instance: any) => {
          if (isProgrammaticChange.current) return;
          const value = instance.getValue();
          // This check is to ensure the correct onChange is called, especially during tab switches
          const currentOnChange = activeTab === 'html' ? onHtmlChange : (activeTab === 'css' ? onCssChange : onJsChange);
          currentOnChange(value);
        });
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
      if (editorRef.current) {
        const wrapper = editorRef.current.getWrapperElement();
        if (wrapper?.parentNode) {
          wrapper.parentNode.removeChild(wrapper);
        }
        editorRef.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  // Sync editor content and mode with React state
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const currentCode = codeForTab[activeTab];
    const currentMode = modeForTab[activeTab];

    // Check if mode needs to be changed
    if (editor.getOption('mode') !== currentMode) {
      editor.setOption('mode', currentMode);
    }
    
    // Check if value needs to be changed (e.g., on tab switch or undo/redo)
    if (editor.getValue() !== currentCode) {
      isProgrammaticChange.current = true;
      const cursor = editor.getCursor();
      editor.setValue(currentCode);
      editor.setCursor(cursor);
      
      // It's safer to reset the flag after a short timeout to let CM process the change
      setTimeout(() => {
        isProgrammaticChange.current = false;
      }, 20);
    }

  }, [activeTab, htmlCode, cssCode, jsCode, codeForTab, modeForTab]);

  // Handle scrolling to a specific line
  useEffect(() => {
    const editor = editorRef.current;
    if (editor && scrollToLine && activeTab === 'html') {
      // CodeMirror lines are 0-indexed
      const line = scrollToLine - 1;
      editor.scrollIntoView({ line, ch: 0 }, 100);
      
      // Highlight the line briefly
      editor.addLineClass(line, 'background', 'cm-line-highlight');
      setTimeout(() => {
        if(editor.getLineHandle(line)) { // Check if line still exists
          editor.removeLineClass(line, 'background', 'cm-line-highlight');
        }
      }, 1500);

      onScrollComplete();
    }
  }, [scrollToLine, activeTab, onScrollComplete]);

  const TabButton: React.FC<{ tab: EditorTab, label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`px-4 py-2 text-sm font-medium transition-colors ${
        activeTab === tab 
          ? 'text-white bg-[#282c34]' 
          : 'text-gray-400 hover:text-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <>
      <style>{`
        /* CodeMirror custom styles */
        .CodeMirror {
          height: 100%;
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
        }
        .CodeMirror-gutters {
          background-color: #21252b !important;
          border-right: 1px solid #3a3f4c;
        }
        .cm-line-highlight {
          background-color: rgba(255, 255, 0, 0.15);
        }
        /* Scrollbar styles for CodeMirror */
        .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
          background-color: #282c34;
        }
        .CodeMirror-vscrollbar::-webkit-scrollbar,
        .CodeMirror-hscrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        .CodeMirror-vscrollbar::-webkit-scrollbar-track,
        .CodeMirror-hscrollbar::-webkit-scrollbar-track {
          background: #282c34;
        }
        .CodeMirror-vscrollbar::-webkit-scrollbar-thumb,
        .CodeMirror-hscrollbar::-webkit-scrollbar-thumb {
          background-color: #555;
          border-radius: 4px;
          border: 2px solid #282c34;
        }
        .CodeMirror-vscrollbar::-webkit-scrollbar-thumb:hover,
        .CodeMirror-hscrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #777;
        }
      `}</style>
      <div className="flex flex-col h-full bg-[#282c34] rounded-lg shadow-inner">
        <div className="bg-gray-700 text-white px-2 rounded-t-lg font-medium flex items-center justify-between">
          <div className="flex items-center">
            <TabButton tab="html" label="HTML" />
            <TabButton tab="css" label="CSS" />
            <TabButton tab="js" label="JavaScript" />
          </div>
          <button
            onClick={() => onClearCode(activeTab)}
            title={t('editor.clearCode', { tab: activeTab.toUpperCase() })}
            className="text-gray-400 hover:text-white text-xs px-2 py-1 rounded-md flex items-center gap-1 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            {t('editor.clearCodeShort')}
          </button>
        </div>
        <div ref={editorContainerRef} className="flex-grow w-full rounded-b-lg overflow-hidden relative">
          {/* CodeMirror will be mounted here */}
        </div>
      </div>
    </>
  );
};