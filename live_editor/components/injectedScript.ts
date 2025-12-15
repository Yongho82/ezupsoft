

export const injectedScript = `
    // Wrap script in a DOMContentLoaded listener to ensure everything is ready.
    document.addEventListener('DOMContentLoaded', () => {
      let currentSelectedSelectors = [];
      let resizerDiv = null;
      let miniToolbar = null;
      let ignoreNextClick = false;
      let selectionBox = null;
      let isSelecting = false;
      let startX = 0;
      let startY = 0;
      let isMultiSelectModeEnabled = false;

      function getCssPath(el) {
        if (!(el instanceof Element) || el.id?.startsWith('resizer-handle') || el.id === 'page-resize-handle' || el.closest('#mini-toolbar')) return null;
        const path = [];
        while (el && el.nodeType === Node.ELEMENT_NODE) {
            let selector = el.nodeName.toLowerCase();
            // FIX for Font Awesome SVG replacement: treat FA SVGs as <i> tags for path generation.
            if (selector === 'svg' && el.classList.contains('svg-inline--fa')) {
                selector = 'i';
            }

            if (el.id) {
                selector = '#' + el.id;
                path.unshift(selector);
                break;
            } else {
                let sib = el, nth = 1;
                while (sib = sib.previousElementSibling) {
                    let sibSelector = sib.nodeName.toLowerCase();
                    if (sibSelector === 'svg' && sib.classList.contains('svg-inline--fa')) {
                        sibSelector = 'i';
                    }
                    if (sibSelector === selector) nth++;
                }
                if (nth !== 1) selector += ":nth-of-type(" + nth + ")";
            }
            path.unshift(selector);
            if (el.parentNode && el.parentNode.nodeType !== Node.ELEMENT_NODE) break;
            el = el.parentNode;
        }
        return path.join(" > ");
      }
      
      const findTargetElement = (startEl) => {
          let finalTarget = startEl;
          const imageWrapper = finalTarget.closest('.image-wrapper');
          const chartContainer = finalTarget.closest('.chart-container');
          const table = finalTarget.closest('table');
          
          if (imageWrapper && imageWrapper.contains(finalTarget)) {
              finalTarget = imageWrapper;
          } else if (chartContainer && chartContainer.contains(finalTarget)) {
              finalTarget = chartContainer;
          } else if (table && table.contains(finalTarget) && finalTarget.tagName !== 'TABLE') {
              finalTarget = table;
          }
          return finalTarget;
      };

      function createOrUpdateMiniToolbar(element) {
          if (!miniToolbar) {
              miniToolbar = document.createElement('div');
              miniToolbar.id = 'mini-toolbar';
              miniToolbar.style.opacity = '0';

              const duplicateButton = document.createElement('button');
              duplicateButton.title = '요소 복제';
              duplicateButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2 2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>';
              duplicateButton.onclick = (e) => {
                  e.stopPropagation();
                  if (currentSelectedSelectors.length === 1) {
                      const elToDupe = document.querySelector(currentSelectedSelectors[0]);
                      if (elToDupe) {
                          const rect = elToDupe.getBoundingClientRect();
                          const serializableRect = { top: rect.top, left: rect.left };
                          window.parent.postMessage({ type: 'duplicate-element', payload: { selector: currentSelectedSelectors[0], rect: serializableRect } }, '*');
                      }
                  }
              };
              miniToolbar.appendChild(duplicateButton);

              const deleteButton = document.createElement('button');
              deleteButton.title = '요소 삭제';
              deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>';
              deleteButton.onclick = (e) => {
                  e.stopPropagation();
                  if (currentSelectedSelectors.length > 0) {
                      window.parent.postMessage({ type: 'delete-element' }, '*');
                  }
              };
              miniToolbar.appendChild(deleteButton);
              document.body.appendChild(miniToolbar);
          }

          if (element) {
              const rect = element.getBoundingClientRect();
              miniToolbar.style.left = (rect.left + window.scrollX) + 'px';
              miniToolbar.style.top = (rect.top + window.scrollY) + 'px';
              miniToolbar.style.opacity = '1';
          } else {
              miniToolbar.style.opacity = '0';
          }
      }
      
      function buildElementInfo(element) {
        const computedStyle = getComputedStyle(element);
        const link = element.closest('a');
        const lineHeightStr = computedStyle.lineHeight;
        let lineHeight = 1.5; // default for 'normal'
        if (lineHeightStr !== 'normal') {
            const lhPx = parseFloat(lineHeightStr);
            const fsPx = parseFloat(computedStyle.fontSize);
            if (fsPx > 0 && !isNaN(lhPx)) {
                lineHeight = parseFloat((lhPx / fsPx).toFixed(2));
            }
        }

        return {
          id: getCssPath(element),
          tagName: element.tagName,
          text: element.innerHTML,
          currentFontSize: Math.round(parseFloat(computedStyle.fontSize)),
          currentWidth: Math.round(element.offsetWidth),
          currentHeight: Math.round(element.offsetHeight),
          currentTop: element.offsetTop,
          currentLeft: element.offsetLeft,
          color: computedStyle.color,
          backgroundColor: computedStyle.backgroundColor,
          fontWeight: computedStyle.fontWeight,
          fontStyle: computedStyle.fontStyle,
          textDecoration: computedStyle.textDecorationLine,
          textAlign: computedStyle.textAlign,
          fontFamily: computedStyle.fontFamily,
          isLink: !!link,
          linkHref: link ? link.getAttribute('href') || '' : '',
          linkTarget: link ? link.getAttribute('target') || '' : '',
          paddingTop: Math.round(parseFloat(computedStyle.paddingTop)),
          paddingRight: Math.round(parseFloat(computedStyle.paddingRight)),
          paddingBottom: Math.round(parseFloat(computedStyle.paddingBottom)),
          paddingLeft: Math.round(parseFloat(computedStyle.paddingLeft)),
          marginTop: Math.round(parseFloat(computedStyle.marginTop)),
          marginRight: Math.round(parseFloat(computedStyle.marginRight)),
          marginBottom: Math.round(parseFloat(computedStyle.marginBottom)),
          marginLeft: Math.round(parseFloat(computedStyle.marginLeft)),
          borderWidth: Math.round(parseFloat(computedStyle.borderTopWidth)),
          borderStyle: computedStyle.borderTopStyle,
          borderColor: computedStyle.borderTopColor,
          borderRadius: Math.round(parseFloat(computedStyle.borderRadius)),
          boxShadow: computedStyle.boxShadow,
          opacity: parseFloat(computedStyle.opacity),
          zIndex: computedStyle.zIndex === 'auto' ? 0 : parseInt(computedStyle.zIndex, 10),
          position: computedStyle.position,
          display: computedStyle.display,
          flexDirection: computedStyle.flexDirection,
          alignItems: computedStyle.alignItems,
          justifyContent: computedStyle.justifyContent,
          lineNumber: element.dataset.lineNumber ? parseInt(element.dataset.lineNumber, 10) : 0,
          animationDuration: computedStyle.animationDuration,
          lineHeight: lineHeight,
        };
      }

      document.addEventListener('click', (e) => {
          if (ignoreNextClick) {
              ignoreNextClick = false;
              e.preventDefault();
              e.stopPropagation();
              return;
          }

          const target = e.target;
          if (!target || target.id?.startsWith('resizer-handle') || target.id === 'page-resize-handle' || target.isContentEditable || target.closest('#mini-toolbar')) {
              return;
          }
          
          e.preventDefault();
          e.stopPropagation();

          const bodyBg = getComputedStyle(document.body).backgroundColor;
          const isShiftPressed = e.shiftKey;
          
          // Find containing slide for context
          const containingSlide = target.closest('.slide-item, [class*="slide-"]');
          const slideSelector = containingSlide ? getCssPath(containingSlide) : null;

          if (target === document.body || target === document.documentElement) {
              if(!isMultiSelectModeEnabled && !isShiftPressed) window.parent.postMessage({ type: 'element-select', payload: { info: null, bodyBg, slideSelector: null } }, '*');
              return;
          }
          
          const finalTarget = findTargetElement(target);
          const selector = getCssPath(finalTarget);

          if (!selector) {
              if(!isMultiSelectModeEnabled && !isShiftPressed) window.parent.postMessage({ type: 'element-select', payload: { info: null, bodyBg, slideSelector } }, '*');
              return;
          }

          const info = buildElementInfo(finalTarget);
          
          if (isMultiSelectModeEnabled || isShiftPressed) {
              window.parent.postMessage({ type: 'element-toggle-select', payload: { info, slideSelector } }, '*');
          } else {
              window.parent.postMessage({ type: 'element-select', payload: { info, bodyBg, slideSelector } }, '*');
          }
      }, true);
      
      document.addEventListener('dblclick', (e) => {
          const target = e.target;
          if (!target || target.id?.startsWith('resizer-handle') || target.id === 'page-resize-handle') return;

          e.preventDefault();
          e.stopPropagation();

          const finalTarget = findTargetElement(target);

          finalTarget.contentEditable = true;
          finalTarget.focus();
          
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(finalTarget);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);

          const originalHtml = finalTarget.innerHTML;

          const cleanup = () => {
              finalTarget.contentEditable = false;
              finalTarget.removeEventListener('blur', onBlur);
              finalTarget.removeEventListener('keydown', onKeydown);
          };

          const onBlur = () => {
              cleanup();
              const newHtml = finalTarget.innerHTML;
              if (newHtml !== originalHtml) {
                const selector = getCssPath(finalTarget);
                if(selector) {
                    window.parent.postMessage({
                        type: 'element-text-update',
                        payload: { selector: selector, newHtml: newHtml }
                    }, '*');
                }
              }
          };
          
          const onKeydown = (ev) => {
            if (ev.key === 'Enter' && !ev.shiftKey) {
              ev.preventDefault();
              finalTarget.blur();
            } else if (ev.key === 'Escape') {
              finalTarget.innerHTML = originalHtml;
              finalTarget.blur();
            }
          };

          finalTarget.addEventListener('blur', onBlur);
          finalTarget.addEventListener('keydown', onKeydown);
      });

      function createOrUpdateResizer(element) {
          if (resizerDiv) resizerDiv.remove();
          if (!element) return;

          resizerDiv = document.createElement('div');
          resizerDiv.style.position = 'absolute';
          resizerDiv.style.pointerEvents = 'none';
          resizerDiv.style.zIndex = '9998';
          resizerDiv.style.border = '1px solid #3b82f6';

          const rect = element.getBoundingClientRect();
          resizerDiv.style.left = (rect.left + window.scrollX) + 'px';
          resizerDiv.style.top = (rect.top + window.scrollY) + 'px';
          resizerDiv.style.width = rect.width + 'px';
          resizerDiv.style.height = rect.height + 'px';
          document.body.appendChild(resizerDiv);
          
          const updateResizerPosition = (el) => {
              if (!resizerDiv) return;
              const currentRect = el.getBoundingClientRect();
              resizerDiv.style.left = (currentRect.left + window.scrollX) + 'px';
              resizerDiv.style.top = (currentRect.top + window.scrollY) + 'px';
              resizerDiv.style.width = currentRect.width + 'px';
              resizerDiv.style.height = currentRect.height + 'px';
          };

          const handles = [
              { name: 'tl', cursor: 'nwse-resize', top: '-4px', left: '-4px' },
              { name: 'tc', cursor: 'ns-resize', top: '-4px', left: '50%', transform: 'translateX(-50%)' },
              { name: 'tr', cursor: 'nesw-resize', top: '-4px', right: '-4px' },
              { name: 'ml', cursor: 'ew-resize', top: '50%', left: '-4px', transform: 'translateY(-50%)' },
              { name: 'mr', cursor: 'ew-resize', top: '50%', right: '-4px', transform: 'translateY(-50%)' },
              { name: 'bl', cursor: 'nesw-resize', bottom: '-4px', left: '-4px' },
              { name: 'bc', cursor: 'ns-resize', bottom: '-4px', left: '50%', transform: 'translateX(-50%)' },
              { name: 'br', cursor: 'nwse-resize', bottom: '-4px', right: '-4px' },
          ];
          
          handles.forEach(handleInfo => {
              const handle = document.createElement('div');
              handle.id = 'resizer-handle-' + handleInfo.name;
              Object.assign(handle.style, {
                  position: 'absolute', width: '8px', height: '8px',
                  backgroundColor: '#3b82f6', border: '1px solid white',
                  cursor: handleInfo.cursor, pointerEvents: 'all', zIndex: '9999',
                  top: handleInfo.top, bottom: handleInfo.bottom,
                  left: handleInfo.left, right: handleInfo.right,
                  transform: handleInfo.transform || ''
              });
              
              handle.addEventListener('mousedown', (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  
                  const computedStyle = getComputedStyle(element);
                  const isAbsolute = computedStyle.position === 'absolute';

                  const startX = e.clientX;
                  const startY = e.clientY;
                  const startWidth = element.offsetWidth;
                  const startHeight = element.offsetHeight;
                  const startTop = element.offsetTop;
                  const startLeft = element.offsetLeft;
                  const cs = window.getComputedStyle(element);
                  const startMarginLeft = parseFloat(cs.marginLeft);
                  const startMarginTop = parseFloat(cs.marginTop);
                  let needsPositionUpdate = false;

                  if (isAbsolute) {
                      if (cs.transform !== 'none') {
                          needsPositionUpdate = true;
                          const parent = element.offsetParent || document.body;
                          const parentRect = parent.getBoundingClientRect();
                          const rect = element.getBoundingClientRect();
                          const newTop = rect.top - parentRect.top;
                          const newLeft = rect.left - parentRect.left;
                          element.style.top = newTop + 'px';
                          element.style.left = newLeft + 'px';
                          element.style.transform = 'none';
                          element.style.margin = '0px';
                      }
                  }

                  const onMouseMove = (moveEvent) => {
                      const dx = moveEvent.clientX - startX;
                      const dy = moveEvent.clientY - startY;

                      if (isAbsolute) {
                          let newWidth = startWidth, newHeight = startHeight, newTop = startTop, newLeft = startLeft;
                          
                          const isCornerHandle = ['tl', 'tr', 'bl', 'br'].includes(handleInfo.name);
                          const maintainAspectRatio = isCornerHandle && (element.tagName === 'IMG' || element.classList.contains('image-wrapper'));

                          if (element.classList.contains('image-wrapper')) {
                              const img = element.querySelector('img');
                              if (img) img.style.objectFit = maintainAspectRatio ? 'cover' : 'fill';
                          }

                          if (maintainAspectRatio) {
                              const aspectRatio = startWidth / startHeight;
                              let widthChange = 0;
                              if (handleInfo.name.includes('r')) widthChange = dx;
                              if (handleInfo.name.includes('l')) widthChange = -dx;
                              let heightChange = 0;
                              if (handleInfo.name.includes('b')) heightChange = dy;
                              if (handleInfo.name.includes('t')) heightChange = -dy;
                              
                              if (Math.abs(widthChange) / startWidth > Math.abs(heightChange) / startHeight) {
                                  newWidth = startWidth + widthChange;
                                  newHeight = newWidth / aspectRatio;
                              } else {
                                  newHeight = startHeight + heightChange;
                                  newWidth = newHeight * aspectRatio;
                              }
                              if (handleInfo.name.includes('l')) newLeft = startLeft + (startWidth - newWidth);
                              if (handleInfo.name.includes('t')) newTop = startTop + (startHeight - newHeight);
                          } else {
                              if (handleInfo.name.includes('r')) newWidth = startWidth + dx;
                              if (handleInfo.name.includes('l')) { newWidth = startWidth - dx; newLeft = startLeft + dx; }
                              if (handleInfo.name.includes('b')) newHeight = startHeight + dy;
                              if (handleInfo.name.includes('t')) { newHeight = startHeight - dy; newTop = startTop + dy; }
                          }

                          if (newWidth > 10) { element.style.width = newWidth + 'px'; element.style.left = newLeft + 'px'; }
                          if (newHeight > 10) { element.style.height = newHeight + 'px'; element.style.top = newTop + 'px'; }
                      } else {
                          const parent = element.parentElement;
                          const isFlexChild = parent && getComputedStyle(parent).display === 'flex';
                          let newWidth = startWidth, newHeight = startHeight, newMarginLeft = startMarginLeft, newMarginTop = startMarginTop;
                          
                          if (handleInfo.name.includes('r')) newWidth = startWidth + dx;
                          if (handleInfo.name.includes('l')) { newWidth = startWidth - dx; newMarginLeft = startMarginLeft + dx; }
                          if (handleInfo.name.includes('b')) newHeight = startHeight + dy;
                          if (handleInfo.name.includes('t')) { newHeight = startHeight - dy; newMarginTop = startMarginTop + dy; }

                          if (newWidth > 10) {
                              if (isFlexChild) {
                                  element.style.flexBasis = newWidth + 'px';
                                  element.style.flexGrow = '0';
                                  element.style.flexShrink = '0';
                              } else {
                                  element.style.width = newWidth + 'px';
                              }
                              element.style.marginLeft = newMarginLeft + 'px';
                          }
                          if (newHeight > 10) {
                              element.style.height = newHeight + 'px';
                              element.style.marginTop = newMarginTop + 'px';
                          }
                      }
                      updateResizerPosition(element);
                  };
                  
                  const onMouseUp = () => {
                      document.removeEventListener('mousemove', onMouseMove);
                      document.removeEventListener('mouseup', onMouseUp);

                      const elementSelector = getCssPath(element);
                      let stylesToUpdate = {};
                      const updates = [];
                      
                      if (isAbsolute) {
                          stylesToUpdate = { 
                              width: element.style.width, height: element.style.height,
                              top: element.style.top, left: element.style.left
                          };
                          if (needsPositionUpdate) {
                              stylesToUpdate.transform = 'none';
                              stylesToUpdate.margin = '0px';
                          }
                          updates.push({ selector: elementSelector, styles: stylesToUpdate });
                          if (element.classList.contains('image-wrapper')) {
                              const img = element.querySelector('img');
                              if (img) {
                                  const isCornerHandle = ['tl', 'tr', 'bl', 'br'].includes(handleInfo.name);
                                  updates.push({
                                      selector: getCssPath(img),
                                      styles: { objectFit: isCornerHandle ? 'cover' : 'fill' }
                                  });
                              }
                          }
                      } else {
                          const parent = element.parentElement;
                          const isFlexChild = parent && getComputedStyle(parent).display === 'flex';
                          stylesToUpdate = { 
                              height: element.style.height,
                              marginLeft: element.style.marginLeft,
                              marginTop: element.style.marginTop
                          };
                          if (isFlexChild) {
                              stylesToUpdate.flexBasis = element.style.flexBasis;
                              stylesToUpdate.flexGrow = '0';
                              stylesToUpdate.flexShrink = '0';
                          } else {
                              stylesToUpdate.width = element.style.width;
                          }
                          updates.push({ selector: elementSelector, styles: stylesToUpdate });
                      }
                      
                      Object.keys(stylesToUpdate).forEach(key => {
                          if (stylesToUpdate[key] === '') delete stylesToUpdate[key];
                      });

                      if (updates.length > 1) {
                          window.parent.postMessage({ type: 'elements-styles-update', payload: { updates } }, '*');
                      } else if (updates.length === 1 && updates[0].selector) {
                          window.parent.postMessage({ type: 'element-styles-update', payload: updates[0] }, '*');
                      }
                  };

                  document.addEventListener('mousemove', onMouseMove);
                  document.addEventListener('mouseup', onMouseUp, { once: true });
              });
              resizerDiv.appendChild(handle);
          });
      }

      function onDragStart(e) {
          const element = e.currentTarget;
          if (e.button !== 0 || e.target.isContentEditable || e.target.id.startsWith('resizer-handle-')) return;
      
          e.preventDefault();
          e.stopPropagation();
      
          let isDragging = false;
          const isAbsolute = getComputedStyle(element).position === 'absolute';
          const startX = e.clientX;
          const startY = e.clientY;
      
          const rect = element.getBoundingClientRect();
          const docInitialTop = rect.top + window.scrollY;
          const docInitialLeft = rect.left + window.scrollX;
      
          let ghost, placeholder, dropTargets, currentDropTarget;
          let accumulatedX = 0;
          let accumulatedY = 0;
      
          function onDragMove(moveEvent) {
              if (!isDragging) {
                  if (Math.abs(moveEvent.clientX - startX) < 5 && Math.abs(moveEvent.clientY - startY) < 5) {
                      return;
                  }
                  isDragging = true;
                  document.body.classList.add('is-dragging');
      
                  ghost = element.cloneNode(true);
                  ghost.classList.add('drag-ghost');
                  ghost.style.border = '2px dashed #3b82f6';
                  Object.assign(ghost.style, {
                      boxSizing: 'border-box',
                      width: rect.width + 'px',
                      height: rect.height + 'px',
                      left: docInitialLeft + 'px',
                      top: docInitialTop + 'px',
                  });
                  document.body.appendChild(ghost);
      
                  if (!isAbsolute) {
                      element.style.opacity = '0.4';
                      dropTargets = Array.from(document.querySelectorAll('div, section, header, footer, main, article, aside')).filter(dz => {
                          const style = getComputedStyle(dz);
                          return dz !== element && !element.contains(dz) && (style.display === 'flex' || style.display === 'grid' || style.display === 'block');
                      });
                  }
              }
      
              moveEvent.preventDefault();
              accumulatedX += moveEvent.movementX;
              accumulatedY += moveEvent.movementY;
      
              ghost.style.left = (docInitialLeft + accumulatedX) + 'px';
              ghost.style.top = (docInitialTop + accumulatedY) + 'px';
      
              if (!isAbsolute) {
                  ghost.style.display = 'none';
                  const elUnder = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
                  ghost.style.display = '';
      
                  let foundTarget = null;
                  let parent = elUnder;
                  while (parent) {
                      if (dropTargets && dropTargets.includes(parent)) {
                          foundTarget = parent;
                          break;
                      }
                      parent = parent.parentElement;
                  }
      
                  if (currentDropTarget && currentDropTarget !== foundTarget) {
                      currentDropTarget.classList.remove('drop-zone-highlight');
                      if (placeholder) placeholder.remove();
                      placeholder = null;
                  }
      
                  currentDropTarget = foundTarget;
      
                  if (currentDropTarget) {
                      currentDropTarget.classList.add('drop-zone-highlight');
      
                      if (!placeholder) {
                          placeholder = document.createElement('div');
                          placeholder.classList.add('drop-placeholder');
                          Object.assign(placeholder.style, { width: rect.width + 'px', height: rect.height + 'px' });
                      }
      
                      const children = [...currentDropTarget.children].filter(c => c !== ghost && c !== placeholder);
                      let nextEl = null;
                      for (const child of children) {
                          const childRect = child.getBoundingClientRect();
                          if (moveEvent.clientY < childRect.top + childRect.height / 2) {
                              nextEl = child;
                              break;
                          }
                      }
                      currentDropTarget.insertBefore(placeholder, nextEl);
                  }
              }
          }
      
          function onDragEnd(upEvent) {
              document.removeEventListener('mousemove', onDragMove);
              document.removeEventListener('mouseup', onDragEnd);
              if (!isAbsolute) element.style.opacity = '';
      
              if (isDragging) {
                  ignoreNextClick = true;
                  document.body.classList.remove('is-dragging');
      
                  if (isAbsolute && !currentDropTarget) {
                      const offsetParent = element.offsetParent || document.body;
                      const parentRect = offsetParent.getBoundingClientRect();
                      const finalViewportTop = rect.top + accumulatedY;
                      const finalViewportLeft = rect.left + accumulatedX;
                      
                      const newTop = finalViewportTop - parentRect.top - (parseFloat(getComputedStyle(offsetParent).borderTopWidth) || 0);
                      const newLeft = finalViewportLeft - parentRect.left - (parseFloat(getComputedStyle(offsetParent).borderLeftWidth) || 0);
      
                      element.style.top = newTop + 'px';
                      element.style.left = newLeft + 'px';
                      element.style.transform = 'none';
                      element.style.margin = '0';
                      
                      const selector = getCssPath(element);
                      if (selector) {
                          window.parent.postMessage({
                              type: 'element-styles-update',
                              payload: { 
                                  selector, 
                                  styles: { 
                                      position: 'absolute', 
                                      top: element.style.top, 
                                      left: element.style.left,
                                      transform: 'none',
                                      margin: '0',
                                  }
                              }
                          }, '*');
                      }
                  } else if (currentDropTarget && placeholder) {
                      if (isAbsolute && getComputedStyle(currentDropTarget).position === 'static') {
                          const confirmed = confirm('자유형 요소를 일반 레이아웃에 추가하면 위치가 초기화되고 기본 요소로 변경됩니다. 계속하시겠습니까?');
                          if (!confirmed) {
                              if (ghost) ghost.remove();
                              if (placeholder) placeholder.remove();
                              if (currentDropTarget) currentDropTarget.classList.remove('drop-zone-highlight');
                              return;
                          }
                      }
                      
                      const children = [...currentDropTarget.children];
                      const dropIndex = children.indexOf(placeholder);
                      window.parent.postMessage({
                          type: 'element-drop',
                          payload: {
                              draggedSelector: getCssPath(element),
                              targetContainerSelector: getCssPath(currentDropTarget),
                              dropIndex
                          }
                      }, '*');
                  }
              }
      
              if (ghost) ghost.remove();
              if (placeholder) placeholder.remove();
              if (currentDropTarget) currentDropTarget.classList.remove('drop-zone-highlight');
          }
      
          document.addEventListener('mousemove', onDragMove);
          document.addEventListener('mouseup', onDragEnd, { once: true });
      }

      let globalTextStyleTag = null;
      function updateGlobalTextStyle(isHidden) {
        if (!globalTextStyleTag) {
            globalTextStyleTag = document.createElement('style');
            globalTextStyleTag.id = 'global-text-visibility-style';
            document.head.appendChild(globalTextStyleTag);
        }
        globalTextStyleTag.textContent = isHidden ? 'body, body * { color: transparent !important; text-shadow: none !important; }' : '';
      }
      
      const slideContainer = document.querySelector('.slide-container');
      if (slideContainer) {
          const pageResizeHandle = document.createElement('div');
          pageResizeHandle.id = 'page-resize-handle';
          pageResizeHandle.style.position = 'fixed';
          pageResizeHandle.style.width = '15px';
          pageResizeHandle.style.height = '15px';
          pageResizeHandle.style.borderRight = '4px solid #3b82f6';
          pageResizeHandle.style.borderBottom = '4px solid #3b82f6';
          pageResizeHandle.style.cursor = 'se-resize';
          pageResizeHandle.style.zIndex = '10001';
          pageResizeHandle.style.borderRadius = '2px';

          document.body.appendChild(pageResizeHandle);

          const positionHandle = () => {
              const rect = slideContainer.getBoundingClientRect();
              pageResizeHandle.style.left = (rect.right - 10) + 'px';
              pageResizeHandle.style.top = (rect.bottom - 10) + 'px';
          };
          
          positionHandle();
          
          new ResizeObserver(positionHandle).observe(slideContainer);
          window.addEventListener('scroll', positionHandle, { passive: true, capture: true });

          pageResizeHandle.addEventListener('mousedown', (e) => {
              e.preventDefault();
              e.stopPropagation();

              const startX = e.clientX;
              const startY = e.clientY;
              const startWidth = slideContainer.offsetWidth;
              const startHeight = slideContainer.offsetHeight;

              const onMouseMove = (e) => {
                  const newWidth = Math.max(200, startWidth + (e.clientX - startX));
                  const newHeight = Math.max(100, startHeight + (e.clientY - startY));
                  slideContainer.style.width = newWidth + 'px';
                  slideContainer.style.height = newHeight + 'px';
              };

              const onMouseUp = () => {
                  document.removeEventListener('mousemove', onMouseMove);
                  document.removeEventListener('mouseup', onMouseUp);
                  const newWidth = parseInt(slideContainer.style.width, 10);
                  const newHeight = parseInt(slideContainer.style.height, 10);
                  window.parent.postMessage({
                      type: 'page-resize-end',
                      payload: { width: newWidth, height: newHeight }
                  }, '*');
              };

              document.addEventListener('mousemove', onMouseMove);
              document.addEventListener('mouseup', onMouseUp, { once: true });
          });
      }
      
      document.addEventListener('keydown', (event) => {
        if (document.activeElement && ['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName) && document.activeElement.isContentEditable === false) {
            return;
        }
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const modKey = isMac ? event.metaKey : event.ctrlKey;

        if (modKey && event.key.toLowerCase() === 'z') {
          event.preventDefault();
          if (event.shiftKey) {
            window.parent.postMessage({ type: 'redo' }, '*');
          } else {
            window.parent.postMessage({ type: 'undo' }, '*');
          }
          return;
        }
        
        if (!isMac && modKey && event.key.toLowerCase() === 'y') {
          event.preventDefault();
          window.parent.postMessage({ type: 'redo' }, '*');
        }
        
        if (event.key === 'Delete' && currentSelectedSelectors.length > 0) {
          const activeEl = document.activeElement;
          if (activeEl && (activeEl.isContentEditable || activeEl.tagName === 'INPUT' || activeEl.tagName === 'TEXTAREA')) {
            return;
          }
          event.preventDefault();
          window.parent.postMessage({ type: 'delete-element' }, '*');
        }

        if (event.key === 'Escape' && currentSelectedSelectors.length > 0) {
          event.preventDefault();
          const bodyBg = getComputedStyle(document.body).backgroundColor;
          window.parent.postMessage({ type: 'element-select', payload: { info: null, bodyBg } }, '*');
        }
      });
      
      const onSelectionMove = (e) => {
        if (!isSelecting || !selectionBox) return;
        const currentX = e.clientX;
        const currentY = e.clientY;
        
        const left = Math.min(startX, currentX) + window.scrollX;
        const top = Math.min(startY, currentY) + window.scrollY;
        const width = Math.abs(currentX - startX);
        const height = Math.abs(currentY - startY);

        selectionBox.style.left = left + 'px';
        selectionBox.style.top = top + 'px';
        selectionBox.style.width = width + 'px';
        selectionBox.style.height = height + 'px';
      }

      const onSelectionUp = () => {
        isSelecting = false;
        document.removeEventListener('mousemove', onSelectionMove);
        document.removeEventListener('mouseup', onSelectionUp);
        
        if (selectionBox) {
            const selectionRect = selectionBox.getBoundingClientRect();
            selectionBox.remove();
            selectionBox = null;

            if (selectionRect.width > 5 || selectionRect.height > 5) {
                const selectedInfos = [];
                const slideContainer = document.querySelector('.slide-container');
                if (slideContainer) {
                    const elements = slideContainer.querySelectorAll('*:not(script):not(style)');
                    elements.forEach(el => {
                        if (el.id === 'resizer-handle' || el.closest('#mini-toolbar') || el.closest('#page-resize-handle')) return;
                        const elRect = el.getBoundingClientRect();
                        if (
                            selectionRect.left < elRect.right &&
                            selectionRect.right > elRect.left &&
                            selectionRect.top < elRect.bottom &&
                            selectionRect.bottom > elRect.top
                        ) {
                            const finalTarget = findTargetElement(el);
                            if(finalTarget && !selectedInfos.some(info => info.id === getCssPath(finalTarget))) {
                                selectedInfos.push(buildElementInfo(finalTarget));
                            }
                        }
                    });
                }
                window.parent.postMessage({ type: 'elements-multiselect', payload: { infos: selectedInfos } }, '*');
            }
        }
      }

      document.body.addEventListener('mousedown', (e) => {
          if (isMultiSelectModeEnabled && e.button === 0 && !e.target.isContentEditable) {
            let isClickOnSelected = false;
            let target = e.target;
            while(target && target !== document.body) {
                if (target.classList.contains('selected-element-highlight')) {
                    isClickOnSelected = true;
                    break;
                }
                target = target.parentElement;
            }

            if (isClickOnSelected) {
                // Multi-drag logic would go here
                return;
            }

              isSelecting = true;
              startX = e.clientX;
              startY = e.clientY;

              selectionBox = document.createElement('div');
              selectionBox.style.position = 'absolute';
              selectionBox.style.border = '1px solid #3b82f6';
              selectionBox.style.backgroundColor = 'rgba(59, 130, 246, 0.2)';
              selectionBox.style.zIndex = '10000';
              selectionBox.style.pointerEvents = 'none';
              selectionBox.style.left = (startX + window.scrollX) + 'px';
              selectionBox.style.top = (startY + window.scrollY) + 'px';
              selectionBox.style.width = '0px';
              selectionBox.style.height = '0px';
              document.body.appendChild(selectionBox);

              document.addEventListener('mousemove', onSelectionMove);
              document.addEventListener('mouseup', onSelectionUp, { once: true });
          }
      });

      window.addEventListener('message', (event) => {
        const { type, payload } = event.data;
        if (type === 'highlight-element') {
          const { ids } = payload;
          
          document.querySelectorAll('.selected-element-highlight').forEach(el => {
            el.classList.remove('selected-element-highlight');
          });

          document.querySelectorAll('[data-drag-listener="true"]').forEach(el => {
              el.removeEventListener('mousedown', onDragStart);
              el.removeAttribute('data-drag-listener');
              el.style.cursor = '';
          });
          
          createOrUpdateResizer(null); 
          createOrUpdateMiniToolbar(null);

          if (ids && ids.length > 0) {
            const elements = ids.map(selector => {
                try {
                    return document.querySelector(selector);
                } catch(e) { console.error('Invalid selector for highlight:', selector); return null; }
            }).filter(Boolean);

            elements.forEach(el => el.classList.add('selected-element-highlight'));
            
            if (ids.length === 1) {
                const el = elements[0];
                if (el) {
                   createOrUpdateResizer(el);
                   createOrUpdateMiniToolbar(el);
                   el.setAttribute('data-drag-listener', 'true');
                   el.addEventListener('mousedown', onDragStart);
                   el.style.cursor = 'move';
                }
            } else if (ids.length > 1) {
                // Multi-select drag logic would attach listeners here
            }
          }
          currentSelectedSelectors = ids || [];
        } else if (type === 'apply-style') {
            const { selector, property, value } = payload;
            try {
                const el = document.querySelector(selector);
                if (el) {
                    el.style[property] = value;
                    if(currentSelectedSelectors.length === 1 && currentSelectedSelectors[0] === selector) {
                        createOrUpdateResizer(el);
                        createOrUpdateMiniToolbar(el);
                    }
                }
            } catch (e) {
                console.error('Failed to apply style', e);
            }
        } else if (type === 'toggle-global-text') {
          updateGlobalTextStyle(payload.isHidden);
        } else if (type === 'set-multi-select-mode') {
            isMultiSelectModeEnabled = payload.enabled;
            document.body.style.setProperty('user-select', isMultiSelectModeEnabled ? 'none' : '', 'important');
        } else if (type === 'page-size-update') {
            const { width, height } = payload;
            const container = document.querySelector('.slide-container');
            if (container) {
                container.style.width = width + 'px';
                container.style.height = height + 'px';
            }
        } else if (type === 'select-element-by-selector') {
            const { selector } = payload;
            try {
                const element = document.querySelector(selector);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    const info = buildElementInfo(element);
                    const bodyBg = getComputedStyle(document.body).backgroundColor;
                    window.parent.postMessage({ type: 'element-select', payload: { info, bodyBg } }, '*');
                }
            } catch (e) {
                console.error('Failed to select element by selector', selector, e);
            }
        } else if (type === 'get-content-size') {
            let width = 0;
            let height = 0;
            const PADDING = 32; // 16px on each side

            const contentBox = document.querySelector('.slide-container') || document.querySelector('main');
            
            if (contentBox) {
                const rect = contentBox.getBoundingClientRect();
                width = Math.ceil(rect.width);
                height = Math.ceil(rect.height);
            } else {
                let minX = Infinity, minY = Infinity, maxX = 0, maxY = 0;
                const children = Array.from(document.body.children).filter(el => 
                    el.tagName.toLowerCase() !== 'script' && !el.id.startsWith('editor-') && !el.id.startsWith('resizer-') && el.id !== 'page-resize-handle' && el.id !== 'mini-toolbar'
                );
                if (children.length > 0) {
                    children.forEach(child => {
                        const rect = child.getBoundingClientRect();
                        if (rect.width > 0 || rect.height > 0) { // Check if element is visible
                            minX = Math.min(minX, rect.left);
                            minY = Math.min(minY, rect.top);
                            maxX = Math.max(maxX, rect.right);
                            maxY = Math.max(maxY, rect.bottom);
                        }
                    });

                    if (isFinite(minX)) {
                        width = Math.ceil(maxX - minX);
                        height = Math.ceil(maxY - minY);
                    }
                }
            }

            if (width === 0 || height === 0) {
                width = document.body.scrollWidth;
                height = document.body.scrollHeight;
            }
            
            window.parent.postMessage({
                type: 'content-size-response',
                payload: { 
                    width: width + PADDING,
                    height: height + PADDING
                }
            }, '*');
        }
      });

      // Auto-sizing logic to ensure the parent iframe container is correctly sized
      let lastKnownWidth = 0;
      let lastKnownHeight = 0;
      
      const updateParentDimensions = () => {
          const docEl = document.documentElement;
          const bodyEl = document.body;

          requestAnimationFrame(() => {
              const slideContainer = document.querySelector('.slide-container');
              
              const messagePayload = {};
              let hasUpdates = false;

              // To get accurate scroll dimensions, temporarily override overflow and height styles
              const originalDocOverflow = docEl.style.overflow;
              const originalBodyOverflow = bodyEl.style.overflow;
              const originalBodyHeight = bodyEl.style.height;
              
              docEl.style.overflow = 'visible';
              bodyEl.style.overflow = 'visible';
              bodyEl.style.height = 'auto'; 

              const newHeight = bodyEl.scrollHeight;

              // Restore original styles
              docEl.style.overflow = originalDocOverflow;
              bodyEl.style.overflow = originalBodyOverflow;
              bodyEl.style.height = originalBodyHeight;

              if (newHeight > 0 && newHeight !== lastKnownHeight) {
                  lastKnownHeight = newHeight;
                  messagePayload.height = newHeight;
                  hasUpdates = true;
              }

              // Only measure and report width IF a slide-container with fixed size exists.
              // Otherwise, the parent container dictates the width for responsive content.
              if (slideContainer) {
                  const newWidth = slideContainer.scrollWidth;
                  if (newWidth > 0 && newWidth !== lastKnownWidth) {
                      lastKnownWidth = newWidth;
                      messagePayload.width = newWidth;
                      hasUpdates = true;
                  }
              } else {
                  // If no slide container, reset our known width. This ensures that if the user
                  // later adds a slide-container, its width will be reported correctly.
                  lastKnownWidth = 0;
              }

              if (hasUpdates) {
                  window.parent.postMessage({
                      type: 'page-dimensions-init',
                      payload: messagePayload
                  }, '*');
              }
          });
      };
      
      // A ResizeObserver is the most reliable way to catch size changes from any source
      // (CSS changes, content changes, image loading, etc.)
      const observer = new ResizeObserver(updateParentDimensions);
      observer.observe(document.documentElement);

      // We also add a 'load' listener as a fallback for slow-loading resources like images
      // that might not trigger the observer immediately.
      window.addEventListener('load', () => {
        // A small timeout after load allows for final rendering paints.
        setTimeout(updateParentDimensions, 150);
      });
      
      // An initial call to set the size as soon as possible.
      requestAnimationFrame(updateParentDimensions);

      // Report if page size is defined by a template structure
      const initialSlideContainer = document.querySelector('.slide-container');
      window.parent.postMessage({
          type: 'page-info',
          payload: { isSizeDefined: !!initialSlideContainer }
      }, '*');
    });
`