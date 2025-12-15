import React, { useState, useEffect, useMemo, useRef } from 'react';
import { getCssPath } from '../utils';
import { TFunction } from '../hooks/useTranslations';

interface LayerNode {
  tagName: string;
  selector: string;
  children: LayerNode[];
  contentSample: string;
  isHidden: boolean;
}

interface LayersPanelProps {
  isOpen: boolean;
  onClose: () => void;
  htmlCode: string;
  selectedElementIds: string[];
  onSelectElement: (selector: string) => void;
  onToggleVisibility: (selector: string) => void;
  t: TFunction;
}

const parseHtmlToTree = (htmlCode: string): LayerNode[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlCode, 'text/html');

  const buildNode = (element: Element): LayerNode | null => {
    const tagName = element.tagName.toLowerCase();
    if (['script', 'style', 'head', 'meta', 'link', 'title'].includes(tagName)) {
      return null;
    }

    const selector = getCssPath(element);
    if (!selector) return null;

    const children = Array.from(element.children)
      .map(child => buildNode(child))
      .filter((child): child is LayerNode => child !== null);

    return {
      tagName,
      selector,
      children,
      contentSample: element.textContent?.trim().substring(0, 30) || '',
      isHidden: (element as HTMLElement).style.display === 'none',
    };
  };

  const rootElements = Array.from(doc.body.children);
  return rootElements.map(el => buildNode(el)).filter(Boolean) as LayerNode[];
};

const LayerItem: React.FC<{
  node: LayerNode;
  selectedElementIds: string[];
  onSelect: (selector: string) => void;
  onToggleVisibility: (selector: string) => void;
  level: number;
  t: TFunction;
}> = ({ node, selectedElementIds, onSelect, onToggleVisibility, level, t }) => {
  const isSelected = selectedElementIds.includes(node.selector);

  return (
    <div>
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.selector);
        }}
        className={`flex items-center justify-between py-1.5 pr-2 rounded cursor-pointer transition-colors ${
          isSelected ? 'bg-blue-100' : 'hover:bg-gray-100'
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
      >
        <div className="flex items-center gap-2 overflow-hidden">
            <span className="font-mono text-xs text-blue-600 flex-shrink-0">{node.tagName}</span>
            {node.contentSample && <span className="text-xs text-gray-500 truncate">{node.contentSample}</span>}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleVisibility(node.selector);
            }}
            className={`p-1 rounded-full text-xs ${node.isHidden ? 'text-gray-400' : 'text-gray-700'} hover:bg-gray-200`}
            title={node.isHidden ? t('layers.show') : t('layers.hide')}
          >
            <i className={`fas ${node.isHidden ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
      </div>
      {node.children.length > 0 && (
        <div className="border-l border-gray-200">
          {node.children.map(child => (
            <LayerItem
              key={child.selector}
              node={child}
              selectedElementIds={selectedElementIds}
              onSelect={onSelect}
              onToggleVisibility={onToggleVisibility}
              level={level + 1}
              t={t}
            />
          ))}
        </div>
      )}
    </div>
  );
};


export const LayersPanel: React.FC<LayersPanelProps> = ({
  isOpen,
  onClose,
  htmlCode,
  selectedElementIds,
  onSelectElement,
  onToggleVisibility,
  t
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: 150 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0 });
  
  const layerTree = useMemo(() => parseHtmlToTree(htmlCode), [htmlCode]);
  
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStartPos.current.x,
      y: e.clientY - dragStartPos.current.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);


  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="fixed bg-white rounded-lg shadow-2xl w-[400px] h-[600px] flex flex-col z-40 border border-gray-200"
      style={{ top: `${position.y}px`, left: `${position.x}px` }}
      onMouseDown={(e) => e.stopPropagation()}
    >
      <header
        onMouseDown={handleMouseDown}
        className="flex items-center justify-between p-3 border-b border-gray-200 cursor-move bg-gray-50 rounded-t-lg"
      >
        <h3 className="text-base font-semibold text-gray-800">
          <i className="fas fa-layer-group text-blue-500 mr-2"></i>
          {t('layers.title')}
        </h3>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </header>
      <main className="p-1 overflow-y-auto flex-grow">
        {layerTree.length > 0 ? (
            layerTree.map(node => (
                <LayerItem 
                    key={node.selector}
                    node={node}
                    selectedElementIds={selectedElementIds}
                    onSelect={onSelectElement}
                    onToggleVisibility={onToggleVisibility}
                    level={0}
                    t={t}
                />
            ))
        ) : (
            <div className="flex items-center justify-center h-full text-sm text-gray-400">
                {t('layers.empty')}
            </div>
        )}
      </main>
    </div>
  );
};
