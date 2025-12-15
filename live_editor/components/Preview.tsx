

import React, { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { injectedStyles } from './injectedStyles';
import { injectedScript } from './injectedScript';

interface PreviewProps {
  htmlCode: string;
  cssCode: string;
  jsCode: string;
  selectedElementIds: string[];
}

const addOrUpdateMetaTag = (doc: Document) => {
    let meta = doc.querySelector('meta[charset="UTF-8"]');
    if (!meta) {
        meta = doc.createElement('meta');
        meta.setAttribute('charset', 'UTF-8');
        doc.head.prepend(meta);
    }
};

const addLineNumbersToHtml = (htmlStr: string): string => {
  const lines = htmlStr.split('\n');
  const processedLines = lines.map((line, index) => {
    const lineNumber = index + 1;
    // Add data-line-number to the first opening tag on each line
    return line.replace(
      /(^\s*<([a-zA-Z1-6]+))/g,
      (match, start, tagName) => {
        if (['!DOCTYPE', 'html', 'head', 'body', 'script', 'style', 'meta', 'link', 'title'].includes(tagName.toLowerCase())) {
          return match;
        }
        return `${start} data-line-number="${lineNumber}"`;
      }
    );
  });
  return processedLines.join('\n');
};


const processHtmlForPreview = (html: string, css: string, js: string): string => {
  const htmlWithLines = addLineNumbersToHtml(html);
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlWithLines, 'text/html');

  addOrUpdateMetaTag(doc);
  
  // Inject Google Fonts link to ensure fonts are available in the preview
  const preconnect1 = doc.createElement('link');
  preconnect1.rel = 'preconnect';
  preconnect1.href = 'https://fonts.googleapis.com';
  doc.head.appendChild(preconnect1);

  const preconnect2 = doc.createElement('link');
  preconnect2.rel = 'preconnect';
  preconnect2.href = 'https://fonts.gstatic.com';
  preconnect2.setAttribute('crossorigin', '');
  doc.head.appendChild(preconnect2);

  const fontLink = doc.createElement('link');
  fontLink.rel = 'stylesheet';
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Gowun+Dodum&family=Google+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500&family=Lato:wght@400;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;500;700&family=Nanum+Gothic&family=Nanum+Myeongjo&family=Noto+Sans+KR:wght@400;500;700&family=Open+Sans:wght@400;700&family=Oswald:wght@400;500;700&family=Playfair+Display:wght@400;700&family=Poppins:wght@400;500;700&family=Roboto:wght@400;500;700&family=Source+Sans+Pro:wght@400;700&display=swap';
  doc.head.appendChild(fontLink);


  const editorStyle = doc.createElement('style');
  editorStyle.id = 'editor-style';
  editorStyle.textContent = injectedStyles;
  doc.head.appendChild(editorStyle);

  const userStyle = doc.createElement('style');
  userStyle.id = 'user-styles';
  userStyle.textContent = css;
  doc.head.appendChild(userStyle);

  const editorScript = doc.createElement('script');
  editorScript.id = 'editor-script';
  editorScript.textContent = injectedScript;
  doc.body.appendChild(editorScript);

  const userScript = doc.createElement('script');
  userScript.id = 'user-script';
  userScript.textContent = js;
  doc.body.appendChild(userScript);

  return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
};

export const Preview = forwardRef<HTMLIFrameElement, PreviewProps>(({ htmlCode, cssCode, jsCode, selectedElementIds }, ref) => {
  const internalIframeRef = useRef<HTMLIFrameElement>(null);
  useImperativeHandle(ref, () => internalIframeRef.current as HTMLIFrameElement);

  const scrollPosRef = useRef({ x: 0, y: 0 });
  const isInitialLoad = useRef(true);

  const handleIframeLoad = useCallback(() => {
    const iframe = internalIframeRef.current;
    if (iframe && iframe.contentWindow) {
      if (!isInitialLoad.current) {
        setTimeout(() => {
          iframe.contentWindow?.scrollTo({
            top: scrollPosRef.current.y,
            left: scrollPosRef.current.x,
            behavior: 'instant'
          });
        }, 50);
      }
      isInitialLoad.current = false;
    }
  }, []);

  useEffect(() => {
    const iframe = internalIframeRef.current;
    if (iframe) {
      if (iframe.contentWindow) {
        scrollPosRef.current = {
          x: iframe.contentWindow.scrollX,
          y: iframe.contentWindow.scrollY,
        };
      }
      const processedHtml = processHtmlForPreview(htmlCode, cssCode, jsCode);
      iframe.srcdoc = processedHtml;
    }
  }, [htmlCode, cssCode, jsCode]);
  
  useEffect(() => {
    const iframe = internalIframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage({
        type: 'highlight-element',
        payload: { ids: selectedElementIds },
      }, '*');
    }
  }, [selectedElementIds]);


  return (
    <iframe
      ref={internalIframeRef}
      title="HTML Preview"
      className="w-full h-full bg-white shadow-lg border-none"
      sandbox="allow-scripts allow-same-origin"
      onLoad={handleIframeLoad}
    />
  );
});