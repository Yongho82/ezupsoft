import React from 'react';
import { ensureIframeContentReady } from '../utils';
import { TFunction } from '../hooks/useTranslations';

export const generatePdf = async (
  previewIframeRef: React.RefObject<HTMLIFrameElement>,
  onProgressUpdate: (message: string, progress?: number) => void,
  t: TFunction,
): Promise<Blob> => {
    if (!previewIframeRef.current?.contentDocument?.body) {
        throw new Error('미리보기를 분석할 수 없습니다.');
    }
    
    const iframeDoc = previewIframeRef.current.contentDocument;

    const tempStyle = iframeDoc.createElement('style');
    tempStyle.textContent = `
      *:hover { outline: none !important; }
      .selected-element-highlight { outline: none !important; box-shadow: none !important; }
      i[class*="fa-"], svg.svg-inline--fa {
        transform: translateY(-6px);
      }
    `;
    iframeDoc.head.appendChild(tempStyle);

    try {
        await ensureIframeContentReady(previewIframeRef.current);
        const { jsPDF } = (window as any).jspdf;
        const html2canvas = (window as any).html2canvas;

        if (!jsPDF || !html2canvas) {
            throw new Error('PDF 생성에 필요한 라이브러리가 로드되지 않았습니다.');
        }

        const getSlideNumber = (el: Element) => {
            const cls = Array.from(el.classList).find(c => /^slide-\d+$/.test(c));
            return cls ? parseInt(cls.split('-')[1], 10) : Infinity;
        };

        const slideElements = (Array.from(iframeDoc.querySelectorAll('.slide-item, div[class*="slide-"]'))
            .filter((el: Element) => {
                return Array.from(el.classList).some(cls => cls === 'slide-item' || /^slide-\d+$/.test(cls));
            }) as HTMLElement[])
            .sort((a, b) => getSlideNumber(a) - getSlideNumber(b));
        
        if (slideElements.length > 1) {
            const firstSlide = slideElements[0];
            const slideWidth = firstSlide.offsetWidth;
            const slideHeight = firstSlide.offsetHeight;
            
            const pdf = new jsPDF({
                orientation: slideWidth > slideHeight ? 'l' : 'p',
                unit: 'px',
                format: [slideWidth, slideHeight],
                hotfixes: ['px_scaling'],
            });

            for (let i = 0; i < slideElements.length; i++) {
                const slide = slideElements[i];
                const progress = 10 + (i / slideElements.length) * 70;
                onProgressUpdate(t('pptxConverter.slideProcess', { current: i + 1, total: slideElements.length }), progress);

                const canvas = await html2canvas(slide, {
                    scale: 3,
                    useCORS: true,
                    allowTaint: true,
                    logging: false,
                    letterRendering: true,
                    width: slide.offsetWidth,
                    height: slide.offsetHeight,
                });

                const imgData = canvas.toDataURL('image/jpeg', 0.9);
                
                if (i > 0) {
                    pdf.addPage([slide.offsetWidth, slide.offsetHeight], slide.offsetWidth > slide.offsetHeight ? 'l' : 'p');
                }
                
                pdf.addImage(imgData, 'JPEG', 0, 0, slide.offsetWidth, slide.offsetHeight);
            }
            return pdf.output('blob');

        } else {
            onProgressUpdate(t('adLoading.generating', { fileType: 'PDF' }), 30);
            const iframeBody = iframeDoc.body;
            const canvas = await html2canvas(iframeBody, {
                scale: 3,
                useCORS: true,
                allowTaint: true,
                logging: false,
                letterRendering: true,
                width: iframeBody.scrollWidth,
                height: iframeBody.scrollHeight,
            });

            onProgressUpdate(t('adLoading.generating', { fileType: 'PDF' }), 70);
            const imgData = canvas.toDataURL('image/jpeg', 0.9);
            const bodyWidth = iframeBody.scrollWidth;
            const bodyHeight = iframeBody.scrollHeight;

            const pdf = new jsPDF({
                orientation: bodyWidth > bodyHeight ? 'l' : 'p',
                unit: 'px',
                format: [bodyWidth, bodyHeight],
                hotfixes: ['px_scaling'],
            });

            pdf.addImage(imgData, 'JPEG', 0, 0, bodyWidth, bodyHeight);
            return pdf.output('blob');
        }

    } finally {
        if (tempStyle.parentNode) {
            iframeDoc.head.removeChild(tempStyle);
        }
    }
};