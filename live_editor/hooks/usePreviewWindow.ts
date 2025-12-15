import React from 'react';
import { previewControlsHtml, previewControlsCss, previewControlsScript } from '../components/previewControlsAssets';


interface UsePreviewWindowProps {
  htmlCode: string;
  cssCode:string;
  jsCode: string;
  blobUrlMap: Record<string, string>;
  pageWidth: number;
  pageHeight: number;
}

export const usePreviewWindow = ({
  htmlCode,
  cssCode,
  jsCode,
  blobUrlMap,
  pageWidth,
  pageHeight,
}: UsePreviewWindowProps) => {

  const getCleanHtmlForPreview = () => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlCode, 'text/html');
    
    // Replace blob URLs with base64 data URLs for portability
    doc.querySelectorAll('img[src^="blob:"]').forEach(el => {
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

    const animationCss = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        .anim-fade-in { animation-name: fadeIn; animation-fill-mode: forwards; animation-timing-function: ease-out; }
        .anim-slide-up { animation-name: slideUp; animation-fill-mode: forwards; animation-timing-function: ease-out; }
        .anim-slide-in-left { animation-name: slideInLeft; animation-fill-mode: forwards; animation-timing-function: ease-out; }
    `;

    const combinedCss = `${cssCode}\n\n${animationCss}`;

    if (combinedCss.trim()) {
      const userStyle = document.createElement('style');
      userStyle.textContent = combinedCss;
      doc.head.appendChild(userStyle);
    }
    
    if (jsCode.trim()) {
        const userScript = document.createElement('script');
        userScript.textContent = jsCode;
        doc.body.appendChild(userScript);
    }

    doc.querySelectorAll('.selected-element-highlight').forEach(el => el.classList.remove('selected-element-highlight'));
    doc.getElementById('editor-script')?.remove();
    doc.getElementById('editor-style')?.remove();
    doc.getElementById('global-text-visibility-style')?.remove();
    doc.getElementById('user-styles')?.remove();
    doc.getElementById('user-script')?.remove();
    
    // Inject Presentation Controls
    const controlsStyle = doc.createElement('style');
    controlsStyle.id = 'preview-controls-style';
    controlsStyle.textContent = previewControlsCss;
    doc.head.appendChild(controlsStyle);
    
    doc.body.insertAdjacentHTML('beforeend', previewControlsHtml);
    
    const controlsScript = doc.createElement('script');
    controlsScript.id = 'preview-controls-script';
    controlsScript.textContent = previewControlsScript;
    doc.body.appendChild(controlsScript);

    return `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
  };

  const handleOpenInNewWindow = () => {
    const cleanHtml = getCleanHtmlForPreview();
    const parser = new DOMParser();
    const doc = parser.parseFromString(cleanHtml, 'text/html');

    const overrideStyle = doc.createElement('style');
    overrideStyle.textContent = `
      /* Enable scrolling for new tab preview */
      html, body {
        overflow: auto !important;
        height: auto !important;
      }
    `;
    doc.head.appendChild(overrideStyle);

    const finalHtml = `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
    const blob = new Blob([finalHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    
    const windowWidth = pageWidth;
    const windowHeight = pageHeight;
    const left = (window.screen.width - windowWidth) / 2;
    const top = (window.screen.height - windowHeight) / 2;

    const features = `width=${windowWidth},height=${windowHeight},top=${top},left=${left},scrollbars=yes,resizable=yes`;
    
    window.open(url, '_blank', features);
  };

  return {
    handleOpenInNewWindow,
  };
};