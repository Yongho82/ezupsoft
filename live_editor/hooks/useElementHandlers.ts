// FIX: Import React to resolve errors with `React.Dispatch` and `React.RefObject` types.
import React, { useCallback } from 'react';
import { debounce } from '../utils';
import type { SelectedElementInfo } from '../types';
import type { EditorState } from './useEditorState';

type HistorySetter = React.Dispatch<React.SetStateAction<{
    past: EditorState[],
    present: EditorState,
    future: EditorState[],
}>>;

interface UseElementHandlersProps {
    setHistory: HistorySetter;
    present: EditorState;
    selectedElements: SelectedElementInfo[];
    setSelectedElements: React.Dispatch<React.SetStateAction<SelectedElementInfo[]>>;
    setBodyBgColor: React.Dispatch<React.SetStateAction<string>>;
    previewIframeRef: React.RefObject<HTMLIFrameElement>;
    pageWidth: number;
    pageHeight: number;
    setPageWidth: React.Dispatch<React.SetStateAction<number>>;
    setPageHeight: React.Dispatch<React.SetStateAction<number>>;
    lastActiveSlideSelector: string | null;
}

const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

export const useElementHandlers = ({
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
}: UseElementHandlersProps) => {

    const updateHtmlDOM = useCallback((modifier: (doc: Document) => void, addToHistory: boolean = true) => {
        setHistory(currentHistory => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(currentHistory.present.html, 'text/html');
            modifier(doc);
            const newHtml = `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;
            
            if (newHtml === currentHistory.present.html) {
                return currentHistory;
            }

            const newPresent = { ...currentHistory.present, html: newHtml };

            if (addToHistory) {
                return {
                    past: [...currentHistory.past, currentHistory.present],
                    present: newPresent,
                    future: []
                };
            } else {
                return { ...currentHistory, present: newPresent };
            }
        });
    }, [setHistory]);

    const handleDeleteElement = useCallback(() => {
        if (selectedElements.length === 0) return;
        const selectors = selectedElements.map(el => el.id);
        updateHtmlDOM(doc => {
            selectors.forEach(selector => {
                const elementToDelete = doc.querySelector(selector) as HTMLElement;
                if (elementToDelete && elementToDelete.parentNode && elementToDelete.tagName.toLowerCase() !== 'body' && !elementToDelete.classList.contains('slide-container')) {
                    const uniqueId = elementToDelete.dataset.liveEditorId;
                    if (uniqueId) {
                        const placeholder = doc.querySelector(`[data-placeholder-for="${uniqueId}"]`);
                        placeholder?.remove();
                    }
                    elementToDelete.parentNode.removeChild(elementToDelete);
                }
            });
        });
        setSelectedElements([]);
    }, [selectedElements, updateHtmlDOM, setSelectedElements]);

    const handleDuplicateElement = useCallback((selector: string, rect: { top: number, left: number }) => {
        if (!selector) return;
        updateHtmlDOM(doc => {
            const elementToClone = doc.querySelector(selector) as HTMLElement;
            if (!elementToClone || !elementToClone.parentNode) return;
            const clone = elementToClone.cloneNode(true) as HTMLElement;
            clone.removeAttribute('id');
            let scrollTop = 0;
            let scrollLeft = 0;
            if (previewIframeRef.current?.contentWindow) {
                const iframeWin = previewIframeRef.current.contentWindow;
                scrollTop = iframeWin.scrollY;
                scrollLeft = iframeWin.scrollX;
            }
            const top = rect.top + scrollTop + 20;
            const left = rect.left + scrollLeft + 20;
            clone.style.position = 'absolute';
            clone.style.top = `${top}px`;
            clone.style.left = `${left}px`;
            const currentZ = parseInt(clone.style.zIndex || '0');
            clone.style.zIndex = isNaN(currentZ) ? '100' : String(Math.max(currentZ, 100) + 1);
            const slideContainer = doc.querySelector('.slide-container') as HTMLElement;
            if (slideContainer) {
                const currentPosition = slideContainer.style.position;
                if (!currentPosition || currentPosition === 'static') {
                    slideContainer.style.position = 'relative';
                }
                slideContainer.appendChild(clone);
            } else {
                doc.body.appendChild(clone);
            }
        });
        setSelectedElements([]);
    }, [updateHtmlDOM, previewIframeRef, setSelectedElements]);

    const handleInsertElement = useCallback((elementString: string, scriptString?: string) => {
        setHistory(currentHistory => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(currentHistory.present.html, 'text/html');

            const tempDiv = doc.createElement('div');
            tempDiv.innerHTML = elementString.trim();
            const elementToInsert = tempDiv.firstChild as HTMLElement;
            if (!elementToInsert) return currentHistory;

            elementToInsert.style.position = 'absolute';
            elementToInsert.style.top = `50%`;
            elementToInsert.style.left = '50%';
            elementToInsert.style.transform = 'translate(-50%, -50%)';
            elementToInsert.style.zIndex = '100';

            let insertionTarget: HTMLElement | null = null;
            if (lastActiveSlideSelector) {
                try {
                    insertionTarget = doc.querySelector(lastActiveSlideSelector);
                } catch (e) {
                    console.error('Invalid selector for last active slide:', lastActiveSlideSelector, e);
                    insertionTarget = null;
                }
            }
            
            // Fallback logic if no active slide is found
            if (!insertionTarget) {
                const potentialSlides = doc.querySelectorAll('.slide-item, [class*="slide-"]');
                insertionTarget = Array.from(potentialSlides).find(el => !el.classList.contains('slide-container')) as HTMLElement;
            }
            
            // Final fallback to container or body
            if (!insertionTarget) {
                insertionTarget = doc.querySelector('.slide-container') || doc.body;
            }
    
            const currentPosition = insertionTarget.style.position;
            if (!currentPosition || currentPosition === 'static') {
                insertionTarget.style.position = 'relative';
            }
            insertionTarget.appendChild(elementToInsert);
            
            if (scriptString) {
                const scriptEl = doc.createElement('script');
                scriptEl.textContent = scriptString;
                doc.body.appendChild(scriptEl);
            }

            const newHtml = `<!DOCTYPE html>\n${doc.documentElement.outerHTML}`;

            const newPresent = { 
                ...currentHistory.present,
                html: newHtml,
            };
            
            if (newPresent.html === currentHistory.present.html) {
                return currentHistory;
            }

            return {
                past: [...currentHistory.past, currentHistory.present],
                present: newPresent,
                future: []
            };
        });
    }, [setHistory, lastActiveSlideSelector]);

    const handleUpdateText = useCallback((selector: string, newHtml: string) => {
        if (!selector) return;
        updateHtmlDOM(doc => {
            const element = doc.querySelector(selector);
            if (element) element.innerHTML = newHtml;
        });
        setSelectedElements([]);
    }, [updateHtmlDOM, setSelectedElements]);

    const handleStylesUpdate = useCallback((selector: string, styles: Record<string, string>) => {
        updateHtmlDOM(doc => {
            const element = doc.querySelector(selector) as HTMLElement;
            if (element) {
                Object.assign(element.style, styles);
                const uniqueId = element.dataset.liveEditorId;
                if (uniqueId) {
                    const placeholder = doc.querySelector(`[data-placeholder-for="${uniqueId}"]`) as HTMLElement;
                    if (placeholder) {
                        if (styles.width) placeholder.style.width = styles.width;
                        if (styles.height) placeholder.style.height = styles.height;
                    }
                }
            }
        });
        setSelectedElements(prev => {
            return prev.map(el => {
                if (el.id !== selector) return el;
                const newStyles = { ...el };
                if (styles.width) newStyles.currentWidth = parseInt(styles.width, 10);
                if (styles.height) newStyles.currentHeight = parseInt(styles.height, 10);
                if (styles.marginLeft) newStyles.marginLeft = parseInt(styles.marginLeft, 10);
                if (styles.marginTop) newStyles.marginTop = parseInt(styles.marginTop, 10);
                return newStyles;
            });
        });
    }, [updateHtmlDOM, setSelectedElements]);

    const handleMultipleStylesUpdate = useCallback((updates: { selector: string; styles: Record<string, string> }[]) => {
      if (updates.length === 0) return;
      updateHtmlDOM(doc => {
          updates.forEach(({ selector, styles }) => {
              if (!selector) return;
              try {
                  const element = doc.querySelector(selector) as HTMLElement;
                  if (element) {
                      Object.keys(styles).forEach(key => {
                          (element.style as any)[key] = styles[key];
                      });
                  }
              } catch(e) {
                  console.error(`Failed to apply styles to selector: ${selector}`, e);
              }
          });
      });
  }, [updateHtmlDOM]);

    const debouncedUpdateHtmlForStyle = useCallback(
        debounce((selectors: string[], styles: Record<string, string | number>) => {
            updateHtmlDOM(doc => {
              selectors.forEach(selector => {
                const element = doc.querySelector(selector) as HTMLElement;
                if (element) {
                    Object.entries(styles).forEach(([prop, value]) => {
                        (element.style as any)[prop] = value;
                    });
                    const uniqueId = element.dataset.liveEditorId;
                    if (uniqueId) {
                        const placeholder = doc.querySelector(`[data-placeholder-for="${uniqueId}"]`) as HTMLElement;
                        if (placeholder) {
                            if (styles.width) placeholder.style.width = styles.width as string;
                            if (styles.height) placeholder.style.height = styles.height as string;
                        }
                    }
                }
              });
            });
        }, 300),
        [updateHtmlDOM]
    );

    const handleGenericStyleChange = useCallback((
        property: keyof SelectedElementInfo,
        value: string | number
    ) => {
        if (selectedElements.length === 0) return;

        const isBecomingAbsolute = property === 'position' && value === 'absolute';
        const isLeavingAbsolute = property === 'position' && value !== 'absolute';
        const isAnimDistance = property === 'animDistance';
        
        const getStylesForElement = (currentElement: SelectedElementInfo): Record<string, string> => {
            const stylesToApply: Record<string, string> = {};
            const isNumeric = typeof value === 'number';
            const finalValue = isNumeric && !['opacity', 'zIndex', 'lineHeight'].includes(property as string) ? `${value}px` : String(value);
            if (!isAnimDistance) {
                stylesToApply[property as string] = finalValue;
            }

            if (property === 'zIndex' && currentElement.position === 'static') {
                stylesToApply.position = 'relative';
            }

            if (isBecomingAbsolute) {
                stylesToApply.width = `${currentElement.currentWidth}px`;
                stylesToApply.height = `${currentElement.currentHeight}px`;
                stylesToApply.top = `${currentElement.currentTop}px`;
                stylesToApply.left = `${currentElement.currentLeft}px`;
                stylesToApply.transform = 'none';
                stylesToApply.margin = '0';
            }
            return stylesToApply;
        };

        const updatesForDOM = selectedElements.map(el => ({
            selector: el.id,
            styles: getStylesForElement(el)
        }));

        setSelectedElements(prev => prev.map(el => {
            const stateUpdates: { [key: string]: any } = { [property]: value };
            if (property === 'zIndex' && el.position === 'static') {
                stateUpdates.position = 'relative';
            }
            return { ...el, ...stateUpdates };
        }));

        if (!isAnimDistance) {
            updatesForDOM.forEach(({ selector, styles }) => {
                Object.entries(styles).forEach(([prop, val]) => {
                    previewIframeRef.current?.contentWindow?.postMessage({
                        type: 'apply-style',
                        payload: { selector, property: prop, value: val }
                    }, '*');
                });
            });
        }

        updateHtmlDOM(doc => {
            selectedElements.forEach(selectedEl => {
                const element = doc.querySelector(selectedEl.id) as HTMLElement;
                if (!element) return;

                if (isBecomingAbsolute) {
                    const uniqueId = element.dataset.liveEditorId || `le-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
                    element.dataset.liveEditorId = uniqueId;

                    if (!doc.querySelector(`[data-placeholder-for="${uniqueId}"]`)) {
                        const placeholder = doc.createElement('div');
                        placeholder.dataset.placeholderFor = uniqueId;
                        placeholder.setAttribute('aria-hidden', 'true');
                        placeholder.style.cssText = `
                            width: ${selectedEl.currentWidth}px;
                            height: ${selectedEl.currentHeight}px;
                            margin-top: ${selectedEl.marginTop}px;
                            margin-right: ${selectedEl.marginRight}px;
                            margin-bottom: ${selectedEl.marginBottom}px;
                            margin-left: ${selectedEl.marginLeft}px;
                            flex-shrink: 0;
                            visibility: hidden;
                            pointer-events: none;
                        `;
                        element.parentNode?.insertBefore(placeholder, element);
                    }
                }

                if (isLeavingAbsolute) {
                    const uniqueId = element.dataset.liveEditorId;
                    if (uniqueId) {
                        const placeholder = doc.querySelector(`[data-placeholder-for="${uniqueId}"]`);
                        placeholder?.remove();
                    }
                }
                
                const styles = getStylesForElement(selectedEl);
                if (styles) {
                    Object.assign(element.style, styles);
                }
                // Set CSS variable for animation distance
                if (isAnimDistance) {
                    const isNumeric = typeof value === 'number';
                    const finalValue = isNumeric ? `${value}px` : String(value);
                    element.style.setProperty('--anim-distance', finalValue);
                }
            });

            if (isBecomingAbsolute) {
                const slideContainer = doc.querySelector('.slide-container') as HTMLElement;
                if (slideContainer) {
                    const currentPosition = slideContainer.style.position;
                    if (!currentPosition || currentPosition === 'static') {
                        slideContainer.style.position = 'relative';
                    }
                }
            }
        });
    }, [selectedElements, updateHtmlDOM, previewIframeRef, setSelectedElements]);


    const handleNumericStyleChange = useCallback((
        property: keyof SelectedElementInfo,
        value: number,
        unit: string = 'px'
    ) => {
        if (selectedElements.length === 0) return;

        const propertyMap: Record<string, string> = {
            currentFontSize: 'fontSize',
            currentWidth: 'width',
            currentHeight: 'height',
        };
        const cssProperty = propertyMap[property as string] || (property as string);
        const cssValue = `${value}${unit}`;

        const newStates = selectedElements.map(el => {
            const stateUpdates: { [key: string]: any } = { [property]: value };
             if (property === 'borderWidth' && value > 0 && el.borderStyle === 'none') {
                stateUpdates.borderStyle = 'solid';
            }
            return { ...el, ...stateUpdates };
        });
        setSelectedElements(newStates);

        const selectors = selectedElements.map(el => el.id);

        selectors.forEach((selector, index) => {
            const stylesToUpdate: Record<string, string> = { [cssProperty]: cssValue };
             if (property === 'borderWidth' && value > 0 && selectedElements[index].borderStyle === 'none') {
                stylesToUpdate.borderStyle = 'solid';
            }
            
            Object.entries(stylesToUpdate).forEach(([prop, val]) => {
                previewIframeRef.current?.contentWindow?.postMessage({
                    type: 'apply-style',
                    payload: { selector: selector, property: prop, value: val }
                }, '*');
            });
        });

        const allStylesToUpdate: Record<string, string> = { [cssProperty]: cssValue };
        if (property === 'borderWidth' && value > 0 && selectedElements.some(el => el.borderStyle === 'none')) {
            allStylesToUpdate.borderStyle = 'solid';
        }
        debouncedUpdateHtmlForStyle(selectors, allStylesToUpdate);
    }, [selectedElements, setSelectedElements, previewIframeRef, debouncedUpdateHtmlForStyle]);

    const handleTextAlignChange = useCallback((alignment: string) => {
      handleGenericStyleChange('textAlign', alignment);
    }, [handleGenericStyleChange]);

    const handleVerticalAlignChange = useCallback((alignment: 'flex-start' | 'center' | 'flex-end') => {
        if (selectedElements.length !== 1) return;
        
        const updates = selectedElements.map(el => {
            const styles: Record<string, string> = { display: 'flex' };
            if (el.flexDirection === 'column') {
                styles.justifyContent = alignment;
            } else {
                styles.alignItems = alignment;
            }
            return {
                selector: el.id,
                styles
            };
        });

        const newStates = selectedElements.map(el => {
            const stateUpdates: Record<string, string> = { display: 'flex' };
            if (el.flexDirection === 'column') {
                stateUpdates.justifyContent = alignment;
            } else {
                stateUpdates.alignItems = alignment;
            }
            return { ...el, ...stateUpdates };
        });
        setSelectedElements(newStates);

        updateHtmlDOM(doc => {
            updates.forEach(({selector, styles}) => {
                const element = doc.querySelector(selector) as HTMLElement;
                if (!element) return;
                Object.assign(element.style, styles);
            });
        });

        // For live preview
        updates.forEach(({ selector, styles }) => {
            Object.entries(styles).forEach(([prop, val]) => {
                previewIframeRef.current?.contentWindow?.postMessage({
                    type: 'apply-style',
                    payload: { selector, property: prop, value: val }
                }, '*');
            });
        });
    }, [selectedElements, updateHtmlDOM, previewIframeRef, setSelectedElements]);

    const handleTextStyleToggle = useCallback((
        property: 'fontWeight' | 'fontStyle' | 'textDecoration',
        value: 'bold' | 'italic' | 'underline' | 'line-through'
    ) => {
        if (selectedElements.length === 0) return;
        const firstEl = selectedElements[0];
        let finalValue: string;

        if (property === 'fontWeight') {
            finalValue = (firstEl.fontWeight === 'bold' || parseInt(firstEl.fontWeight) >= 700) ? 'normal' : 'bold';
        } else if (property === 'fontStyle') {
            finalValue = firstEl.fontStyle === 'italic' ? 'normal' : 'italic';
        } else {
            const currentDecorations = firstEl.textDecoration.split(' ').filter(d => d && d !== 'none');
            const valueStr = String(value);
            if (currentDecorations.includes(valueStr)) {
                finalValue = currentDecorations.filter(d => d !== valueStr).join(' ') || 'none';
            } else {
                finalValue = [...currentDecorations, valueStr].join(' ');
            }
        }
        handleGenericStyleChange(property, finalValue);
    }, [selectedElements, handleGenericStyleChange]);

    const handleTextColorChange = useCallback((color: string) => {
      handleGenericStyleChange('color', color);
    }, [handleGenericStyleChange]);

    const handleBgChange = useCallback((color: string) => {
        const isElementSelected = selectedElements.length > 0;
        
        if (isElementSelected) {
            handleGenericStyleChange('backgroundColor', color);
        } else {
            const finalColor = color === 'transparent' ? '#ffffff' : color;
            setBodyBgColor(finalColor);
            previewIframeRef.current?.contentWindow?.postMessage({
                type: 'apply-style',
                payload: { selector: 'body', property: 'backgroundColor', value: finalColor }
            }, '*');
            updateHtmlDOM(doc => {
                const element = doc.querySelector('body') as HTMLElement;
                if (element) element.style.backgroundColor = finalColor;
            });
        }
    }, [selectedElements, handleGenericStyleChange, setBodyBgColor, updateHtmlDOM, previewIframeRef]);

    const handleHoverStyleChange = useCallback((property: 'color' | 'backgroundColor', value: string) => {
        if (selectedElements.length !== 1) return;
        const selector = selectedElements[0].id;
        if (!selector) return;

        const cssProperty = property === 'backgroundColor' ? 'background-color' : property;

        setHistory(currentHistory => {
            let cssCode = currentHistory.present.css;
            const escapedSelector = selector.replace(/([.*+?^${}()|[\]\/\\])/g, '\\$1');
            const ruleRegex = new RegExp(`${escapedSelector}\\s*:\\s*hover\\s*\\{([^}]*)\\}`, 'im');
            const match = cssCode.match(ruleRegex);

            let newCssCode;

            if (match) {
                // Rule exists, let's modify it
                const existingStylesContent = match[1];
                const styleProps = new Map<string, string>();
                existingStylesContent.split(';').forEach(style => {
                    if (style.trim()) {
                        const firstColonIndex = style.indexOf(':');
                        if (firstColonIndex > -1) {
                            const key = style.substring(0, firstColonIndex).trim();
                            const val = style.substring(firstColonIndex + 1).trim();
                            if (key) styleProps.set(key, val);
                        }
                    }
                });

                if (value === 'transparent' || value === '') {
                    styleProps.delete(cssProperty);
                } else {
                    styleProps.set(cssProperty, `${value} !important`);
                }

                // Check if any meaningful properties remain besides transition
                const remainingColorProps = Array.from(styleProps.keys())
                    .filter(key => key !== 'transition');

                if (remainingColorProps.length === 0) {
                    // No color properties left, remove the entire rule
                    newCssCode = cssCode.replace(ruleRegex, '');
                } else {
                    // Rebuild the rule
                    if (!styleProps.has('transition')) {
                        styleProps.set('transition', 'background-color 0.3s ease, color 0.3s ease');
                    }
                    const newStyles = Array.from(styleProps.entries())
                        .map(([key, val]) => `  ${key}: ${val};`)
                        .join('\n');
                    
                    const newRule = `${selector}:hover {\n${newStyles}\n}`;
                    newCssCode = cssCode.replace(ruleRegex, newRule);
                }
            } else if (value !== 'transparent' && value !== '') {
                // Rule does not exist, and we have a valid color to add
                const newRule = `\n${selector}:hover {\n  ${cssProperty}: ${value} !important;\n  transition: background-color 0.3s ease, color 0.3s ease;\n}\n`;
                newCssCode = cssCode + newRule;
            } else {
                // Rule doesn't exist and the color is transparent, so do nothing.
                return currentHistory;
            }

            if (newCssCode.trim() === cssCode.trim()) return currentHistory;

            const newPresent = { ...currentHistory.present, css: newCssCode };
            return {
                past: [...currentHistory.past, currentHistory.present],
                present: newPresent,
                future: []
            };
        });

        // Also sync to selectedElements state so UI can read without parsing CSS
        setSelectedElements(prev => prev.map(el => {
            if (el.id !== selector) return el;
            if (property === 'color') {
                return { ...el, hoverColor: value === 'transparent' ? '' : value };
            } else {
                return { ...el, hoverBackgroundColor: value === 'transparent' ? '' : value };
            }
        }));
    }, [selectedElements, setHistory]);

    const debouncedUpdatePageSizeInHtml = useCallback(
        debounce((dimension: 'width' | 'height', value: number) => {
            updateHtmlDOM(doc => {
                const container = doc.querySelector('.slide-container') as HTMLElement;
                if (container) container.style[dimension] = `${value}px`;
            });
        }, 300),
        [updateHtmlDOM]
    );

    const handlePageSizeChange = useCallback((dimension: 'width' | 'height', value: number) => {
        const newWidth = dimension === 'width' ? value : pageWidth;
        const newHeight = dimension === 'height' ? value : pageHeight;
        if (dimension === 'width') setPageWidth(value);
        if (dimension === 'height') setPageHeight(value);
        previewIframeRef.current?.contentWindow?.postMessage({
            type: 'page-size-update',
            payload: { width: newWidth, height: newHeight }
        }, '*');
        debouncedUpdatePageSizeInHtml(dimension, value);
    }, [pageWidth, pageHeight, setPageWidth, setPageHeight, previewIframeRef, debouncedUpdatePageSizeInHtml]);

    const handleLinkUpdate = useCallback((url: string, target: string, remove: boolean = false) => {
        if (selectedElements.length === 0) return;
        const selector = selectedElements[0].id;

        updateHtmlDOM(doc => {
            const element = doc.querySelector(selector) as HTMLElement;
            if (!element) return;
            const existingLink = element.closest('a');

            if (remove) {
                if (existingLink && existingLink.parentNode) {
                    while (existingLink.firstChild) {
                        existingLink.parentNode.insertBefore(existingLink.firstChild, existingLink);
                    }
                    existingLink.parentNode.removeChild(existingLink);
                }
            } else {
                if (existingLink) {
                    existingLink.href = url;
                    existingLink.target = target;
                } else {
                    const newLink = doc.createElement('a');
                    newLink.href = url;
                    newLink.target = target;
                    element.parentNode?.insertBefore(newLink, element);
                    newLink.appendChild(element);
                }
            }
        });
    }, [selectedElements, updateHtmlDOM]);

    const handleApplyStylePreset = useCallback((styles: Record<string, string | number>) => {
        if (selectedElements.length === 0) return;
        updateHtmlDOM(doc => {
            selectedElements.forEach(selEl => {
                const element = doc.querySelector(selEl.id) as HTMLElement;
                if (element) {
                    element.style.border = '';
                    element.style.backgroundColor = '';
                    element.style.color = '';
                    element.style.padding = '';
                    element.style.borderRadius = '';
                    
                    Object.entries(styles).forEach(([prop, val]) => {
                        (element.style as any)[prop] = val;
                    });
                }
            });
        });
    }, [selectedElements, updateHtmlDOM]);

    const handleAlignmentChange = useCallback((alignment: 'left' | 'center' | 'right') => {
        if (selectedElements.length !== 1) return;
        const selectedEl = selectedElements[0];
        const selector = selectedEl.id;

        const stylesToApply: Record<string, string> = {};
        if (selectedEl.position === 'absolute') {
            switch (alignment) {
                case 'left':
                    stylesToApply.left = '0px';
                    stylesToApply.transform = 'translateX(0%)';
                    break;
                case 'center':
                    stylesToApply.left = '50%';
                    stylesToApply.transform = 'translateX(-50%)';
                    break;
                case 'right':
                    stylesToApply.left = '100%';
                    stylesToApply.transform = 'translateX(-100%)';
                    break;
            }
            stylesToApply.marginLeft = '';
            stylesToApply.marginRight = '';
        } else {
            switch (alignment) {
                case 'left':
                    stylesToApply.marginLeft = '0';
                    stylesToApply.marginRight = 'auto';
                    break;
                case 'center':
                    stylesToApply.marginLeft = 'auto';
                    stylesToApply.marginRight = 'auto';
                    break;
                case 'right':
                    stylesToApply.marginLeft = 'auto';
                    stylesToApply.marginRight = '0';
                    break;
            }
            stylesToApply.left = '';
            stylesToApply.transform = '';
        }
        
        updateHtmlDOM(doc => {
            const element = doc.querySelector(selector) as HTMLElement;
            if (element) {
                Object.assign(element.style, stylesToApply);
            }
        });
    }, [selectedElements, updateHtmlDOM]);

    const handleToggleElementVisibility = useCallback((selector: string) => {
        updateHtmlDOM(doc => {
            const element = doc.querySelector(selector) as HTMLElement;
            if (!element) return;
    
            const currentDisplay = element.style.display;
    
            if (currentDisplay === 'none') {
                element.style.display = '';
                if (element.style.length === 0) {
                    element.removeAttribute('style');
                }
            } else {
                element.style.display = 'none';
            }
        });
    }, [updateHtmlDOM]);

    const handleApplyAnimation = useCallback((animationClass: string) => {
        if (selectedElements.length === 0) return;
        updateHtmlDOM(doc => {
            selectedElements.forEach(selEl => {
                const element = doc.querySelector(selEl.id) as HTMLElement;
                if (element) {
                    const classesToRemove = Array.from(element.classList).filter(c => c.startsWith('anim-'));
                    element.classList.remove(...classesToRemove);
                    
                    if (animationClass) {
                        element.classList.add(animationClass);
                        if (!element.style.animationDuration || element.style.animationDuration === '0s') {
                            element.style.animationDuration = '0.7s';
                        }
                    } else {
                        element.style.animationDuration = '';
                    }
                }
            });
        });
    }, [selectedElements, updateHtmlDOM]);
    
    const handleElementDrop = useCallback((
        draggedSelector: string,
        targetContainerSelector: string,
        dropIndex: number
    ) => {
        updateHtmlDOM(doc => {
            const draggedElement = doc.querySelector(draggedSelector) as HTMLElement;
            const targetContainer = doc.querySelector(targetContainerSelector) as HTMLElement;

            if (!draggedElement || !targetContainer) {
                console.error("Drop failed: element or container not found.");
                return;
            }

            // Clean up styles that are irrelevant in a flow layout
            draggedElement.style.position = '';
            draggedElement.style.top = '';
            draggedElement.style.left = '';
            draggedElement.style.transform = '';
            
            // Remove style attribute if it becomes empty after cleaning up
            const stylePropsToKeep = ['width', 'height', 'color', 'background-color', 'font-size', 'font-family']; // etc.
            let hasNonPositionStyles = false;
            for (const prop of stylePropsToKeep) {
              if (draggedElement.style.getPropertyValue(prop)) {
                hasNonPositionStyles = true;
                break;
              }
            }
            // More robustly check if any style remains after cleanup
            let remainingStyles = draggedElement.style.cssText.split(';')
                .map(s => s.trim())
                .filter(s => s && !s.startsWith('position') && !s.startsWith('top') && !s.startsWith('left') && !s.startsWith('transform'));
            if(remainingStyles.length === 0) {
                 draggedElement.removeAttribute('style');
            }
            
            // Remove placeholder if it was used for absolute positioning before
            const uniqueId = draggedElement.dataset.liveEditorId;
            if (uniqueId) {
                const placeholder = doc.querySelector(`[data-placeholder-for="${uniqueId}"]`);
                placeholder?.remove();
                delete draggedElement.dataset.liveEditorId;
            }

            const targetChild = targetContainer.children[dropIndex];
            targetContainer.insertBefore(draggedElement, targetChild || null);
        });
        setSelectedElements([]); // Deselect after dropping for a clean state
    }, [updateHtmlDOM, setSelectedElements]);

    return {
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
    };
};