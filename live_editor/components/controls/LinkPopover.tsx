import React, { useState, useRef, useEffect } from 'react';
import type { SelectedElementInfo } from '../../types';
import { TFunction } from '../../hooks/useTranslations';

export const LinkPopover: React.FC<{
  selectedElement: SelectedElementInfo | null;
  onClose: () => void;
  onUpdate: (url: string, target: string, remove?: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
  t: TFunction;
}> = ({ selectedElement, onClose, onUpdate, triggerRef, t }) => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [url, setUrl] = useState('');
  const [target, setTarget] = useState('_self');

  useEffect(() => {
    if (selectedElement?.isLink) {
      setUrl(selectedElement.linkHref);
      setTarget(selectedElement.linkTarget || '_self');
    } else {
      setUrl('');
      setTarget('_self');
    }
  }, [selectedElement]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, triggerRef]);

  const handleApply = () => {
    let finalUrl = url.trim();
    if (finalUrl) {
      // Prepend http:// if no protocol is specified to prevent relative paths.
      if (!/^(https?:\/\/|mailto:|tel:)/i.test(finalUrl)) {
        finalUrl = `http://${finalUrl}`;
      }
      onUpdate(finalUrl, target);
      onClose();
    }
  };

  const handleRemove = () => {
    onUpdate('', '', true);
    onClose();
  };

  return (
    <div ref={popoverRef} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-lg shadow-2xl z-40 ring-1 ring-black ring-opacity-5 p-4 animate-fade-in-down">
      <p className="text-sm font-semibold text-gray-800 mb-3">{t('linkPopover.title')}</p>
      <div className="space-y-3">
        <div>
          <label htmlFor="link-url" className="block text-xs text-gray-600 mb-1">{t('linkPopover.urlLabel')}</label>
          <input
            id="link-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label htmlFor="link-target" className="block text-xs text-gray-600 mb-1">{t('linkPopover.targetLabel')}</label>
          <select
            id="link-target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="_self">{t('linkPopover.currentTab')}</option>
            <option value="_blank">{t('linkPopover.newTab')}</option>
            <option value="_parent">{t('linkPopover.parentFrame')}</option>
            <option value="_top">{t('linkPopover.topFrame')}</option>
          </select>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <button onClick={handleRemove} disabled={!selectedElement?.isLink} className="text-sm text-red-600 hover:text-red-800 disabled:opacity-50 disabled:cursor-not-allowed">
          {t('linkPopover.remove')}
        </button>
        <button onClick={handleApply} className="text-sm bg-blue-600 text-white px-4 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500">
          {t('linkPopover.apply')}
        </button>
      </div>
    </div>
  );
};