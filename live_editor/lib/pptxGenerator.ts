import React from 'react';
import { ensureIframeContentReady, robustColorToHex } from '../utils';
import { TFunction } from '../hooks/useTranslations';

const urlToBase64 = (url: string): Promise<string> => {
    return new Promise((resolve) => {
      
      const loadViaProxy = () => {
        console.warn(`Direct image load failed for ${url}. Trying a CORS proxy fallback.`);
        const proxyUrl = `https://corsproxy.io/?${encodeURIComponent(url)}`;
        
        const proxyImg = new Image();
        proxyImg.crossOrigin = 'Anonymous';
  
        proxyImg.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = proxyImg.naturalWidth;
          canvas.height = proxyImg.naturalHeight;
          const ctx = canvas.getContext('2d');
          if (!ctx) {
            console.error('Could not get canvas context for proxied image.');
            resolve('');
            return;
          }
          ctx.drawImage(proxyImg, 0, 0);
          try {
            const dataURL = canvas.toDataURL('image/png');
            resolve(dataURL);
          } catch (e) {
            console.error(`Canvas tainted for proxied URL ${proxyUrl}.`, e);
            resolve('');
          }
        };
  
        proxyImg.onerror = () => {
          console.error(`CORS proxy also failed for ${url}. The image will be captured from the screen, which may have lower quality.`);
          resolve(''); // Final failure
        };
  
        proxyImg.src = proxyUrl;
      };
  
      const directImg = new Image();
      directImg.crossOrigin = 'Anonymous';
  
      directImg.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = directImg.naturalWidth;
        canvas.height = directImg.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          console.error('Could not get canvas context for image conversion.');
          resolve('');
          return;
        }
        ctx.drawImage(directImg, 0, 0);
        try {
          const dataURL = canvas.toDataURL('image/png');
          resolve(dataURL);
        } catch (e) {
          // This catch block is important for tainted canvas with crossOrigin attribute
          console.warn(`Canvas may be tainted for ${url} despite crossOrigin attribute. This usually means the server does not send correct CORS headers.`, e);
          loadViaProxy();
        }
      };
  
      directImg.onerror = () => {
        loadViaProxy();
      };
  
      directImg.src = url;
    });
};

export const generatePptx = async (
  previewIframeRef: React.RefObject<HTMLIFrameElement>,
  onProgressUpdate: (message: string, progress?: number) => void,
  t: TFunction,
): Promise<Blob> => {
    if (!previewIframeRef.current?.contentDocument?.body) {
        throw new Error('미리보기를 분석할 수 없습니다.');
    }
    
    const PPTX_SCALE_FACTOR = 1.13;
    const DPI = 96; // Standard pixels per inch for conversion

    const iframeDoc = previewIframeRef.current.contentDocument;
    const iframeWin = previewIframeRef.current.contentWindow as any;
    
    const tempStyle = iframeDoc.createElement('style');
    tempStyle.textContent = `
    *:hover { outline: none !important; }
    .selected-element-highlight { outline: none !important; box-shadow: none !important; }
    i[class*="fa-"], svg.svg-inline--fa {
      transform: translateY(-9px);
    }
  `;
    iframeDoc.head.appendChild(tempStyle);

    // Helper function to intelligently select the best font from a font-family stack, prioritizing Korean fonts.
    const getPreferredFont = (fontFamilyString: string): string => {
        const KOREAN_FONTS = ['Noto Sans KR', 'Nanum Gothic', 'Nanum Myeongjo', 'Gowun Dodum', 'Malgun Gothic'];
        const fonts = fontFamilyString.split(',').map(f => f.trim().replace(/['"]/g, ''));
        
        const koreanFont = fonts.find(fontInStack => 
            KOREAN_FONTS.some(koreanFontName => 
                fontInStack.toLowerCase() === koreanFontName.toLowerCase()
            )
        );
    
        if (koreanFont) {
            return koreanFont;
        }
        
        return fonts[0] || 'Arial';
    };

    try {
        await ensureIframeContentReady(previewIframeRef.current);
        const html2canvas = (window as any).html2canvas;
        const PptxGenJS = (window as any).PptxGenJS;

        if (!html2canvas || !PptxGenJS) {
            throw new Error('PPTX 생성에 필요한 라이브러리가 로드되지 않았습니다.');
        }

        const pptx = new PptxGenJS();
        
        let slideElements: HTMLElement[] = [];

        const getSlideNumber = (el: Element) => {
            const cls = Array.from(el.classList).find(c => /^slide-\d+$/.test(c));
            return cls ? parseInt(cls.split('-')[1], 10) : Infinity;
        };

        const specificSlides = Array.from(iframeDoc.querySelectorAll('.slide-item, div[class*="slide-"]'))
            .filter((el: Element) => {
                return Array.from(el.classList).some(cls => cls === 'slide-item' || /^slide-\d+$/.test(cls));
            }) as HTMLElement[];

        if (specificSlides.length > 0) {
            slideElements = specificSlides.sort((a, b) => getSlideNumber(a) - getSlideNumber(b));
        } else {
            const slideContainer = iframeDoc.querySelector('.slide-container') as HTMLElement;
            if (slideContainer && slideContainer.offsetWidth > 0 && slideContainer.offsetHeight > 0) {
                slideElements = [slideContainer];
            }
        }

        if (slideElements.length === 0) {
            slideElements = Array.from(iframeDoc.body.children).filter(
                c => c instanceof HTMLElement && 
                     c.tagName.toLowerCase() !== 'script' && 
                     c.tagName.toLowerCase() !== 'style' &&
                     !['mini-toolbar', 'resizer-handle', 'page-resize-handle'].includes(c.id) &&
                     !c.querySelector('parsererror')
            ) as HTMLElement[];
        }

        if (slideElements.length === 0 && iframeDoc.body.innerHTML.trim() !== '') {
            const tempBody = iframeDoc.body.cloneNode(true) as HTMLElement;
            tempBody.querySelectorAll('script, style, #mini-toolbar, #resizer-handle, #page-resize-handle').forEach(el => el.remove());
            if (tempBody.innerHTML.trim() !== '') {
                slideElements = [iframeDoc.body as HTMLElement];
            }
        }

        if (slideElements.length === 0) {
            throw new Error(t('errors.slideElementNotFound'));
        }

        const firstVisibleSlide = slideElements.find(el => el.offsetWidth > 0 && el.offsetHeight > 0);
        
        const LAYOUT_NAME = 'AISTUDIO_CUSTOM_LAYOUT';
        if (firstVisibleSlide) {
            const presentationWidth = firstVisibleSlide.offsetWidth;
            const presentationHeight = firstVisibleSlide.offsetHeight;
            pptx.defineLayout({
                name: LAYOUT_NAME,
                width: (presentationWidth * PPTX_SCALE_FACTOR) / 96,
                height: (presentationHeight * PPTX_SCALE_FACTOR) / 96,
            });
        } else {
            console.warn("No visible slides found, using default 1280x720 presentation size.");
            pptx.defineLayout({
                name: LAYOUT_NAME,
                width: (1280 * PPTX_SCALE_FACTOR) / 96,
                height: (720 * PPTX_SCALE_FACTOR) / 96,
            });
        }
        pptx.layout = LAYOUT_NAME;

        const isElementTrulyVisible = (element: Element | null): boolean => {
            if (!element) return false;
            let el = element;
            while (el && el.nodeName.toLowerCase() !== 'body') {
                const style = iframeWin.getComputedStyle(el);
                if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity) < 0.1) {
                    return false;
                }
                el = el.parentElement as Element;
            }
            return true;
        };

        const normalizeTextAlign = (align: string) => {
            const validAlignments = ['left', 'right', 'center', 'justify'];
            if (validAlignments.includes(align)) return align;
            if (align === 'start') return 'left';
            if (align === 'end') return 'right';
            return 'left';
        };
        
        for (let i = 0; i < slideElements.length; i++) {
            const slideElement = slideElements[i];
            const progress = 10 + (i / slideElements.length) * 70;
            onProgressUpdate(t('pptxConverter.slideProcess', { current: i + 1, total: slideElements.length }), progress);
            
            if (slideElement.offsetWidth <= 0 || slideElement.offsetHeight <= 0) continue;
            const slideRect = slideElement.getBoundingClientRect();

            const temporaryWrappers: HTMLSpanElement[] = [];
            const pptxChartData: any[] = [];
            const pptxTableData: any[] = [];
            const pptxImageData: any[] = [];
            const pptxShapeData: any[] = []; // for html2canvas images
            const pptxNativeShapeData: any[] = [];
            const pptxIconData: any[] = [];
            
            const slideOriginalCanvasStyles: { element: HTMLCanvasElement, display: string }[] = [];
            const slideOriginalShapeStyles: { element: HTMLElement, visibility: string }[] = [];
            const processedForShape = new Set();


            try {
              // 1. Image Processing
              const images = Array.from(slideElement.querySelectorAll('img'));
              const imagePromises = images.map(async (img) => {
                  if (isElementTrulyVisible(img)) {
                      const imgRect = img.getBoundingClientRect();
                      if (imgRect.width > 0 && imgRect.height > 0 && img.src && !img.src.startsWith('data:image/gif')) {
                          // In PPTX conversion, we can directly use the potentially blob URL,
                          // as html2canvas will handle it within the same document context.
                          const base64Data = img.src.startsWith('data:') 
                              ? img.src 
                              : await urlToBase64(img.src);

                          if (base64Data) {
                              pptxImageData.push({
                                  data: base64Data,
                                  x: `${((imgRect.left - slideRect.left) / slideRect.width) * 100}%`,
                                  y: `${((imgRect.top - slideRect.top) / slideRect.height) * 100}%`,
                                  w: `${(imgRect.width / slideRect.width) * 100}%`,
                                  h: `${(imgRect.height / slideRect.height) * 100}%`,
                              });
                              
                              const originalVisibility = img.style.visibility;
                              img.style.visibility = 'hidden';
                              slideOriginalShapeStyles.push({ element: img, visibility: originalVisibility });
                              processedForShape.add(img);
                          }
                      }
                  }
              });
              await Promise.all(imagePromises);

              // 2. Text Processing
              const textNodesInfo: any[] = [];
              const walker = iframeDoc.createTreeWalker(slideElement, NodeFilter.SHOW_TEXT, null);
              let node;
              while (node = walker.nextNode()) {
                  if (!node.nodeValue?.trim()) continue;
                  const parentElement = node.parentElement;
                  if (!parentElement || ['SCRIPT', 'STYLE'].includes(parentElement.tagName) || parentElement.closest('svg, table, canvas')) continue;
                  if (!isElementTrulyVisible(parentElement)) continue;
                  
                  const range = iframeDoc.createRange();
                  range.selectNode(node);
                  const rect = range.getBoundingClientRect();
                  if (rect.width < 1 || rect.height < 1) continue;
                  const style = iframeWin.getComputedStyle(parentElement);
                  textNodesInfo.push({ text: node.nodeValue.trim(), rect, style, node });
              }
              
              textNodesInfo.forEach(info => {
                  const wrapper = iframeDoc.createElement('span');
                  wrapper.style.visibility = 'hidden';
                  info.node.parentNode.insertBefore(wrapper, info.node);
                  wrapper.appendChild(info.node);
                  temporaryWrappers.push(wrapper);
              });
              
              // 3. Chart Processing
              const ChartJS = iframeWin.Chart;
              if (ChartJS) {
                  const canvases = Array.from(slideElement.querySelectorAll('canvas'));
                  canvases.forEach((canvas: HTMLCanvasElement) => {
                      const chartInstance = ChartJS.getChart(canvas);
                      if (chartInstance && isElementTrulyVisible(canvas)) {
                          const chartRect = canvas.getBoundingClientRect();
                          const chartConfig = chartInstance.config;
                          const chartTypeMap: { [key: string]: any } = { bar: pptx.ChartType.bar, line: pptx.ChartType.line, pie: pptx.ChartType.pie, doughnut: pptx.ChartType.doughnut, radar: pptx.ChartType.radar };
                          const pptxChartType = chartTypeMap[chartConfig.type];
                          if (pptxChartType) {
                              const chartData = chartConfig.data.datasets.map((dataset: any) => ({ name: dataset.label || `Series`, labels: chartConfig.data.labels, values: dataset.data }));
                              
                              let pptxColors: string[] | undefined;
                              const chartJsType = chartConfig.type;
                              
                              if (chartJsType === 'pie' || chartJsType === 'doughnut') {
                                  const sliceColors = chartConfig.data.datasets[0]?.backgroundColor;
                                  if (Array.isArray(sliceColors)) {
                                      pptxColors = sliceColors.map((c: string) => robustColorToHex(c));
                                  }
                              } else {
                                  pptxColors = chartConfig.data.datasets.map((dataset: any) => 
                                      robustColorToHex(dataset.backgroundColor || '#4A90E2')
                                  );
                              }

                              const chartOptions = {
                                  x: ((chartRect.left - slideRect.left) * PPTX_SCALE_FACTOR) / DPI,
                                  y: ((chartRect.top - slideRect.top) * PPTX_SCALE_FACTOR) / DPI,
                                  w: (chartRect.width * PPTX_SCALE_FACTOR) / DPI,
                                  h: (chartRect.height * PPTX_SCALE_FACTOR) / DPI,
                                  chartColors: pptxColors,
                                  showLegend: chartConfig.options?.plugins?.legend?.display !== false,
                                  title: chartConfig.options?.plugins?.title?.text
                              };
                              pptxChartData.push({ type: pptxChartType, data: chartData, options: chartOptions });
                              // FIX: Store original display style BEFORE changing it.
                              const originalDisplay = canvas.style.display;
                              canvas.style.display = 'none';
                              slideOriginalCanvasStyles.push({ element: canvas, display: originalDisplay });
                          }
                      }
                  });
              }

              // 4. Table Processing
              const tables = Array.from(slideElement.querySelectorAll('table'));
              for (const table of tables) {
                  if (!isElementTrulyVisible(table)) continue;
                  const tableRect = table.getBoundingClientRect();
                  const tableRowsData: any[] = [];
                  const rows = Array.from(table.querySelectorAll('tr'));
                  for (const row of rows) {
                      const rowCellsData: any[] = [];
                      const cells = Array.from(row.querySelectorAll('th, td'));
                      for (const cell of cells) {
                          // FIX: Cast the element to HTMLTableCellElement to access cell-specific properties like colSpan and rowSpan.
                          const cellEl = cell as HTMLTableCellElement;
                          const iconsInCell = Array.from(cellEl.querySelectorAll('i[class*="fa-"], svg.svg-inline--fa'));
                          const iconCapturePromises = iconsInCell.map(async (iconEl: HTMLElement) => {
                              if (processedForShape.has(iconEl) || !isElementTrulyVisible(iconEl)) return;
                              const iconRect = iconEl.getBoundingClientRect();
                              if (iconRect.width < 1 || iconRect.height < 1) return;
                              try {
                                  const verticalPadding = 11; // Add 4px padding top and bottom to prevent clipping
                                  const canvas = await html2canvas(iconEl, {
                                      backgroundColor: null,
                                      useCORS: true,
                                      scale: 2,
                                      logging: false,
                                      width: iconRect.width,
                                      height: iconRect.height + verticalPadding * 2,
                                      x: 0,
                                      y: -verticalPadding,
                                      scrollX: 0,
                                      scrollY: 0,
                                  });
                                  const base64Data = canvas.toDataURL('image/png');
                                  if (base64Data) {
                                      const newHeight = iconRect.height + verticalPadding * 2;
                                      const newTop = iconRect.top - verticalPadding;
                                      pptxIconData.push({
                                          data: base64Data,
                                          x: `${((iconRect.left - slideRect.left) / slideRect.width) * 100}%`,
                                          y: `${((newTop - slideRect.top) / slideRect.height) * 100}%`,
                                          w: `${(iconRect.width / slideRect.width) * 100}%`,
                                          h: `${(newHeight / slideRect.height) * 100}%`,
                                      });
                                      const originalVisibility = iconEl.style.visibility;
                                      iconEl.style.visibility = 'hidden';
                                      slideOriginalShapeStyles.push({ element: iconEl, visibility: originalVisibility });
                                      processedForShape.add(iconEl);
                                  }
                              } catch (e) {
                                  console.warn("테이블 셀의 아이콘을 이미지로 캡처하지 못했습니다:", iconEl, e);
                              }
                          });
                          await Promise.all(iconCapturePromises);
                          
                          const cellClone = cellEl.cloneNode(true) as HTMLElement;
                          cellClone.querySelectorAll('i[class*="fa-"], svg.svg-inline--fa').forEach(icon => icon.remove());

                          const style = iframeWin.getComputedStyle(cellEl);
                          const fontSizePx = parseFloat(style.fontSize);
                          const finalFontSize = !isNaN(fontSizePx) ? Math.max(1, Math.round(fontSizePx * 0.75 * PPTX_SCALE_FACTOR) + 1) : Math.round(12 * PPTX_SCALE_FACTOR);
                          const computedBgColor = style.backgroundColor;
                          let fillOpt: { color: string } | undefined = undefined;
                          const match = computedBgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
                          let isTransparent = (!match || (match[4] && parseFloat(match[4]) < 0.1)) || computedBgColor === 'transparent' || computedBgColor === 'rgba(0, 0, 0, 0)';
                          if (!isTransparent) fillOpt = { color: robustColorToHex(computedBgColor) };
                          const richText = cellClone.innerText.trim().split('\n').map(line => ({ text: line || ' ', options: { paraSpaceBefore: 0, paraSpaceAfter: 0 } }));
                          if (richText.length === 0) richText.push({ text: ' ', options: { paraSpaceBefore: 0, paraSpaceAfter: 0 } });
                          const cellOptions = {
                              margin: [4, 0, 4, 0],
                              align: normalizeTextAlign(style.textAlign) as any,
                              valign: (style.verticalAlign || 'middle') as any,
                              bold: parseInt(style.fontWeight, 10) >= 600,
                              italic: style.fontStyle === 'italic',
                              fontFace: getPreferredFont(style.fontFamily),
                              fontSize: finalFontSize,
                              color: robustColorToHex(style.color),
                              fill: fillOpt,
                              colspan: cellEl.colSpan > 1 ? cellEl.colSpan : undefined,
                              rowspan: cellEl.rowSpan > 1 ? cellEl.rowSpan : undefined
                          };
                          rowCellsData.push({ text: richText, options: cellOptions });
                      }
                      tableRowsData.push(rowCellsData);
                  }
                  const tableOptions = { x: `${((tableRect.left - slideRect.left) / slideRect.width) * 100}%`, y: `${((tableRect.top - slideRect.top) / slideRect.height) * 100}%`, w: `${(tableRect.width / slideRect.width) * 100}%` };
                  pptxTableData.push({ rows: tableRowsData, options: tableOptions });
                  const originalVisibility = table.style.visibility;
                  table.style.visibility = 'hidden';
                  slideOriginalShapeStyles.push({ element: table, visibility: originalVisibility });
                  processedForShape.add(table);
              }
              
              // 5. Standalone Icon Processing
              const icons = Array.from(slideElement.querySelectorAll('i[class*="fa-"], svg.svg-inline--fa'));
              const iconPromises = icons.map(async (iconEl: HTMLElement) => {
                  if (processedForShape.has(iconEl) || !isElementTrulyVisible(iconEl) || iconEl.closest('table')) {
                      return;
                  }

                  const iconRect = iconEl.getBoundingClientRect();
                  if (iconRect.width < 1 || iconRect.height < 1) return;

                  try {
                      const verticalPadding = 11; // Add 4px padding top and bottom to prevent clipping
                      const canvas = await html2canvas(iconEl, {
                          backgroundColor: null,
                          useCORS: true,
                          scale: 2,
                          logging: false,
                          width: iconRect.width,
                          height: iconRect.height + verticalPadding * 2,
                          x: 0,
                          y: -verticalPadding,
                          scrollX: 0,
                          scrollY: 0,
                      });
                      const base64Data = canvas.toDataURL('image/png');

                      if (base64Data) {
                          const newHeight = iconRect.height + verticalPadding * 2;
                          const newTop = iconRect.top - verticalPadding;
                          pptxIconData.push({
                              data: base64Data,
                              x: `${((iconRect.left - slideRect.left) / slideRect.width) * 100}%`,
                              y: `${((newTop - slideRect.top) / slideRect.height) * 100}%`,
                              w: `${(iconRect.width / slideRect.width) * 100}%`,
                              h: `${(newHeight / slideRect.height) * 100}%`,
                          });

                          const originalVisibility = iconEl.style.visibility;
                          iconEl.style.visibility = 'hidden';
                          slideOriginalShapeStyles.push({ element: iconEl, visibility: originalVisibility });
                          processedForShape.add(iconEl);
                      }
                  } catch (e) {
                      console.warn("Failed to capture icon as image:", iconEl, e);
                  }
              });
              await Promise.all(iconPromises);

              // 6. Generic Shape, Container, and Icon Processing
              const potentialShapes = Array.from(slideElement.querySelectorAll('div, span, section, header, footer, main, article'));
              for (const el of potentialShapes) {
                  if (processedForShape.has(el) || !isElementTrulyVisible(el) || el.closest('table, canvas, img')) continue;
              
                  const styledEl = el as HTMLElement;
                  const style = iframeWin.getComputedStyle(styledEl);
                  const rect = styledEl.getBoundingClientRect();
                  if (rect.width < 1 || rect.height < 1) continue;
              
                  const slideArea = slideRect.width * slideRect.height;
                  const elementArea = rect.width * rect.height;

                  if (elementArea > slideArea * 0.25) {
                      continue; // Skip large layout containers
                  }

                  const hasBg = style.backgroundColor && style.backgroundColor !== 'rgba(0, 0, 0, 0)' && style.backgroundColor !== 'transparent';
                  const hasBorder = style.borderWidth && parseFloat(style.borderWidth) > 0;
                  
                  if (!hasBg && !hasBorder) continue;
      
                  const hideAndProcess = (elementToHide: HTMLElement) => {
                      const originalVisibility = elementToHide.style.visibility;
                      elementToHide.style.visibility = 'hidden';
                      slideOriginalShapeStyles.push({ element: elementToHide, visibility: originalVisibility });
                      processedForShape.add(elementToHide);
                  };
              
                  const hasVisibleChildren = Array.from(styledEl.children).some(child => {
                      const childEl = child as HTMLElement;
                      return childEl.style.visibility !== 'hidden' && getComputedStyle(childEl).display !== 'none';
                  });
                  const hasVisibleTextNodes = Array.from(styledEl.childNodes).some(node => node.nodeType === 3 && node.textContent.trim().length > 0);
                  const isSimpleShape = !hasVisibleChildren && !hasVisibleTextNodes;
      
                  if (isSimpleShape) {
                      const shapeOptions: any = {
                          x: `${((rect.left - slideRect.left) / slideRect.width) * 100}%`,
                          y: `${((rect.top - slideRect.top) / slideRect.height) * 100}%`,
                          w: `${(rect.width / slideRect.width) * 100}%`,
                          h: `${(rect.height / slideRect.height) * 100}%`,
                          fill: hasBg ? { color: robustColorToHex(style.backgroundColor) } : undefined,
                      };
                      if (hasBorder) {
                          shapeOptions.line = {
                              color: robustColorToHex(style.borderColor),
                              width: Math.max(0.75, parseFloat(style.borderWidth) * 0.75)
                          };
                      }
              
                      const borderRadius = parseFloat(style.borderRadius);
                      const isCircle = style.borderRadius === '50%' || (borderRadius >= Math.min(rect.width, rect.height) / 2 - 1);
                      let shapeType = isCircle ? pptx.shapes.OVAL : pptx.shapes.RECTANGLE;
              
                      if (shapeType === pptx.shapes.RECTANGLE && borderRadius > 0) {
                          shapeType = pptx.shapes.ROUNDED_RECTANGLE;
                          shapeOptions.rectRadius = Math.min(0.5, borderRadius / Math.min(rect.width, rect.height));
                      }
                      
                      pptxNativeShapeData.push({ type: shapeType, options: shapeOptions });
                      hideAndProcess(styledEl);
                  } else { 
                       try {
                          const shapeCanvas = await html2canvas(styledEl, { backgroundColor: null, useCORS: true, allowTaint: true, logging: false, scale: 2 });
                          const shapeImageData = shapeCanvas.toDataURL('image/png');
                          pptxShapeData.push({
                              data: shapeImageData,
                              x: `${((rect.left - slideRect.left) / slideRect.width) * 100}%`,
                              y: `${((rect.top - slideRect.top) / slideRect.height) * 100}%`,
                              w: `${(rect.width / slideRect.width) * 100}%`,
                              h: `${(rect.height / slideRect.height) * 100}%`,
                          });
                          hideAndProcess(styledEl);
                          styledEl.querySelectorAll('*').forEach(child => processedForShape.add(child));
                       } catch (e) {
                           console.error("복합 도형 캡처 실패:", el, e);
                       }
                  }
              }
              
              // 7. Background Capture
              const canvas = await html2canvas(slideElement, {
                useCORS: true,
                allowTaint: true,
                logging: false,
                letterRendering: true,
                backgroundColor: null, // prevent default gray background
                scale: 2,               // make output independent of browser zoom / devicePixelRatio
                width: slideRect.width,
                height: slideRect.height,
                x: 0,
                y: 0,
                scrollX: 0,
                scrollY: 0,
              });
              // Use JPEG for the slide background image to reduce PPTX size (alpha not needed here)
              const imageData = canvas.toDataURL('image/jpeg', 0.92);

              // 8. Assemble PPTX Slide
              const slide = pptx.addSlide();

              slide.addImage({ data: imageData, x: 0, y: 0, w: '100%', h: '100%' });
              pptxNativeShapeData.forEach(shape => slide.addShape(shape.type, shape.options));
              pptxShapeData.forEach(shapeData => slide.addImage(shapeData));
              pptxImageData.forEach(imgData => slide.addImage(imgData));
              pptxIconData.forEach(iconData => slide.addImage(iconData));
              pptxTableData.forEach(tableData => slide.addTable(tableData.rows, tableData.options));
              pptxChartData.forEach(chartData => slide.addChart(chartData.type, chartData.data, chartData.options));

              textNodesInfo.forEach(info => {
                  const { text, rect, style } = info;
                  if (rect.width <= 1 || rect.height <= 1) return;
                  const fontSizePx = parseFloat(style.fontSize);
                  if (isNaN(fontSizePx) || fontSizePx <= 0) return;
                  
                  const isBold = parseInt(style.fontWeight, 10) >= 600;
                  let boxWidth = rect.width * 1.05;
                  if (isBold) {
                      boxWidth *= 1.4;
                  }

                  const boxHeight = rect.height * 1.4;
                  slide.addText(text, { 
                      x: `${((rect.left - slideRect.left) / slideRect.width) * 100}%`, 
                      y: `${((rect.top - slideRect.top) / slideRect.height) * 100}%`, 
                      w: `${(boxWidth / slideRect.width) * 100}%`, 
                      h: `${(boxHeight / slideRect.height) * 100}%`, 
                      fontSize: Math.max(1, Math.round(fontSizePx * 0.75 * PPTX_SCALE_FACTOR)), 
                      fontFace: getPreferredFont(style.fontFamily), 
                      color: robustColorToHex(style.color), 
                      align: normalizeTextAlign(style.textAlign) as any, 
                      valign: 'middle', 
                      bold: isBold, 
                      italic: style.fontStyle === 'italic' 
                  });
              });

            } finally {
              temporaryWrappers.forEach(wrapper => { if(wrapper.firstChild) wrapper.parentNode?.insertBefore(wrapper.firstChild, wrapper); wrapper.remove(); });
              slideOriginalCanvasStyles.forEach(styleInfo => { styleInfo.element.style.display = styleInfo.display; });
              slideOriginalShapeStyles.forEach(styleInfo => { styleInfo.element.style.visibility = styleInfo.visibility; });
            }
        }

        return pptx.write('blob');

    } finally {
        if (tempStyle.parentNode) {
            iframeDoc.head.removeChild(tempStyle);
        }
    }
};