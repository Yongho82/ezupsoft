export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<F>): void => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

export const loadScriptWithFallbacks = (urls: string[]) => {
  return new Promise((resolve, reject) => {
    const tryLoad = (index: number) => {
      if (index >= urls.length) {
        reject(new Error(`Failed to load script from all provided sources.`));
        return;
      }
      const url = urls[index];
      const script = document.createElement('script');
      script.src = url;
      script.async = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => resolve(true);
      script.onerror = (e) => {
        console.warn(`Failed to load script from ${url}, trying next fallback. Error:`, e);
        script.remove();
        tryLoad(index + 1);
      };
      document.body.appendChild(script);
    };
    tryLoad(0);
  });
};

export const ensureIframeContentReady = async (iframe: HTMLIFrameElement | null): Promise<void> => {
    if (!iframe?.contentWindow?.document) return;
    const iframeDoc = iframe.contentWindow.document;
    const iframeWin = iframe.contentWindow as any;

    const promises: Promise<any>[] = [];

    // Wait for all images to load
    const images = Array.from(iframeDoc.getElementsByTagName('img'));
    images.forEach(img => {
        if (!img.complete) {
            promises.push(new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = () => {
                    console.warn(`Failed to load image: ${img.src}`);
                    resolve(null); // Resolve anyway to not block the process
                };
            }));
        }
    });

    // Wait for Font Awesome SVG replacement to complete
    const faScript = Array.from(iframeDoc.scripts).find(s => s.src.includes('fontawesome'));
    if (faScript) {
        promises.push(new Promise((resolve) => {
            const timeout = 5000;
            const interval = 100;
            let elapsedTime = 0;
            const checkInterval = setInterval(() => {
                if (iframeDoc.documentElement.dataset.faI2svg !== undefined) {
                    clearInterval(checkInterval);
                    // Short delay for SVGs to render fully after being injected
                    setTimeout(() => resolve(null), 250);
                } else if (elapsedTime >= timeout) {
                    clearInterval(checkInterval);
                    console.warn('Font Awesome SVG replacement timed out.');
                    resolve(null); // Resolve to not block the process
                }
                elapsedTime += interval;
            }, interval);
        }));
    }
    
    // Wait for all fonts to be loaded and ready
    if (iframe.contentWindow.document.fonts) {
        try {
            promises.push(iframe.contentWindow.document.fonts.ready);
        } catch (error) {
            console.warn('Error waiting for iframe fonts to be ready:', error);
        }
    }
    
    // Wait for Chart.js charts to render
    const chartCanvases = Array.from(iframeDoc.getElementsByTagName('canvas'))
        .filter((c: HTMLCanvasElement) => c.parentElement?.classList.contains('chart-container'));

    if (chartCanvases.length > 0 && iframeWin.Chart) {
        chartCanvases.forEach((canvas: HTMLCanvasElement) => {
            promises.push(new Promise((resolve) => {
                const timeout = 3000; // 3-second timeout
                const interval = 100;
                let elapsedTime = 0;
                const checkInterval = setInterval(() => {
                    const chartInstance = iframeWin.Chart.getChart(canvas);
                    // A chart is ready if an instance exists and it's not animating
                    if (chartInstance && !chartInstance.animating) {
                        clearInterval(checkInterval);
                        resolve(null);
                    } else if (elapsedTime >= timeout) {
                        clearInterval(checkInterval);
                        console.warn('Chart rendering timed out for canvas:', canvas.id);
                        resolve(null); // Don't block forever
                    }
                    elapsedTime += interval;
                }, interval);
            }));
        });
    }
    
    await Promise.all(promises);

    // A final small delay for rendering after all resources are loaded
    await new Promise(resolve => setTimeout(resolve, 300));
};

export const robustColorToHex = (colorStr: any): string => {
  if (typeof colorStr !== 'string') {
    // Chart.js can return color objects or arrays. For simplicity, we'll try to extract the first color if it's an array,
    // otherwise, we can't process it and will return a default black. This handles gradients/patterns gracefully.
    if (Array.isArray(colorStr) && colorStr.length > 0 && typeof colorStr[0] === 'string') {
        colorStr = colorStr[0];
    } else {
        return '000000'; // Default to black for unparsable color types
    }
  }

  if (!colorStr || colorStr === 'transparent') return '000000';
  if (colorStr.startsWith('#')) return colorStr.substring(1);

  const temp = document.createElement('div');
  temp.style.color = colorStr;
  document.body.appendChild(temp);
  const computedColor = window.getComputedStyle(temp).color;
  document.body.removeChild(temp);
  
  const matches = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
  if (matches) {
      const toHex = (c: string) => ('0' + parseInt(c, 10).toString(16)).slice(-2);
      return `${toHex(matches[1])}${toHex(matches[2])}${toHex(matches[3])}`;
  }
  return '000000';
};

export const rgbToHex = (rgbStr: string): string => {
  if (!rgbStr || rgbStr === 'transparent') return 'transparent';
  const match = rgbStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!match) return '#ffffff'; // Default to white if parsing fails
  
  const alpha = match[4] ? parseFloat(match[4]) : 1;
  if (alpha < 0.1) {
    return 'transparent';
  }

  const toHex = (c: string) => ('0' + parseInt(c, 10).toString(16)).slice(-2);
  return `#${toHex(match[1])}${toHex(match[2])}${toHex(match[3])}`;
};

export const resizeImage = (file: File, maxWidth: number = 1280, quality: number = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);

      const canvas = document.createElement('canvas');
      let { width, height } = img;

      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxWidth) {
          width *= maxWidth / height;
          height = maxWidth;
        }
      }
      
      canvas.width = Math.round(width);
      canvas.height = Math.round(height);

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('Could not get canvas context'));
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
      resolve(canvas.toDataURL(mimeType, quality));
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };

    img.src = url;
  });
};

export function getCssPath(el: Element): string {
    if (!(el instanceof Element)) return '';
    const path = [];
    while (el && el.nodeType === Node.ELEMENT_NODE) {
        let selector = el.nodeName.toLowerCase();
        if (el.id) {
            selector = '#' + el.id;
            path.unshift(selector);
            break;
        } else {
            let sib: Element | null = el;
            let nth = 1;
            while (sib = sib.previousElementSibling) {
                if (sib.nodeName.toLowerCase() === selector) nth++;
            }
            if (nth !== 1) selector += `:nth-of-type(${nth})`;
        }
        path.unshift(selector);
        
        if (!el.parentNode || el.parentNode.nodeType !== Node.ELEMENT_NODE) break;
        
        el = el.parentNode as Element;
    }
    return path.join(" > ");
}