import { useState, useCallback, useEffect } from 'react';
import { initialHtmlKo, initialHtmlEn } from '../templates/initialHtml';
import { Language } from './useTranslations';

export interface EditorState {
  html: string;
  css: string;
  js: string;
}

interface History {
  past: EditorState[];
  present: EditorState;
  future: EditorState[];
}

export const useEditorState = (language: Language) => {
  const [history, setHistory] = useState<History>({
    past: [],
    present: { html: language === 'ko' ? initialHtmlKo : initialHtmlEn, css: '', js: '' },
    future: [],
  });

  useEffect(() => {
    setHistory(current => {
        const currentHtml = current.present.html.trim();
        const koHtml = initialHtmlKo.trim();
        const enHtml = initialHtmlEn.trim();

        if (currentHtml === koHtml && language === 'en') {
            const newPresent = { ...current.present, html: initialHtmlEn };
            return { ...current, present: newPresent };
        }
        if (currentHtml === enHtml && language === 'ko') {
            const newPresent = { ...current.present, html: initialHtmlKo };
            return { ...current, present: newPresent };
        }
        return current;
    });
  }, [language]);

  const { past, present, future } = history;

  const updatePresentState = useCallback((newState: Partial<EditorState>, addToHistory: boolean = true) => {
    setHistory(currentHistory => {
      const { past, present } = currentHistory;
      const newPresent = { ...present, ...newState };

      if (newPresent.html === present.html && newPresent.css === present.css && newPresent.js === present.js) {
        return currentHistory;
      }

      if (addToHistory) {
        return { past: [...past, present], present: newPresent, future: [] };
      } else {
        return { ...currentHistory, present: newPresent };
      }
    });
  }, []);

  const setHtmlCode = (newHtml: string) => updatePresentState({ html: newHtml });
  const setCssCode = (newCss: string) => updatePresentState({ css: newCss });
  const setJsCode = (newJs: string) => updatePresentState({ js: newJs });

  const handleClearCode = (type: 'html' | 'css' | 'js') => {
    switch (type) {
      case 'html':
        // FIX: Set to a minimal valid HTML document instead of an empty string.
        // This ensures the preview iframe correctly clears its content and resizes,
        // preventing issues where old content or dimensions would persist.
        setHtmlCode('<!DOCTYPE html><html><head></head><body></body></html>');
        break;
      case 'css': setCssCode(''); break;
      case 'js': setJsCode(''); break;
    }
  };

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const handleUndo = useCallback(() => {
    setHistory(current => {
      if (current.past.length === 0) return current;
      const previous = current.past[current.past.length - 1];
      const newPast = current.past.slice(0, current.past.length - 1);
      return { past: newPast, present: previous, future: [current.present, ...current.future] };
    });
  }, []);

  const handleRedo = useCallback(() => {
    setHistory(current => {
      if (current.future.length === 0) return current;
      const next = current.future[0];
      const newFuture = current.future.slice(1);
      return { past: [...current.past, current.present], present: next, future: newFuture };
    });
  }, []);

  return {
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
  };
};