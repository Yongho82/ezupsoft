import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ProgressBar } from './ProgressBar';
import { TFunction } from '../hooks/useTranslations';

declare global {
  interface Window {
    kakaoadfit?: any;
  }
}

interface AdLoadingOverlayProps {
  isLoading: boolean;
  progress: number;
  message: string;
  onClose: () => void;
  operationType: 'Download' | 'Import' | null;
  t: TFunction;
}

export const AdLoadingOverlay: React.FC<AdLoadingOverlayProps> = ({
  isLoading,
  progress,
  message,
  onClose,
  operationType,
  t,
}) => {
  // Decide AdFit size. TEMP: force 300x250 because current unit appears to be 300x250-only
  const [adSize] = useState<{w:number,h:number}>({ w: 300, h: 250 });

  // Load Kakao AdFit script when the overlay opens
  useEffect(() => {
    if (!isLoading) return;
    const src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
    const already = document.querySelector(`script[src="${src}"]`) as HTMLScriptElement | null;
    if (!already) {
      const s = document.createElement('script');
      s.async = true;
      s.src = src;
      document.body.appendChild(s);
    }
  }, [isLoading]);

  const [openSeq, setOpenSeq] = useState(0);
  useEffect(() => {
    if (isLoading) setOpenSeq((s) => s + 1);
  }, [isLoading]);
  const adKey = useMemo(() => `${openSeq}-${adSize.w}x${adSize.h}`, [openSeq, adSize]);

  const slotContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ensureCmd = () => {
      try {
        (window as any).kakaoadfit = (window as any).kakaoadfit || {};
        (window as any).kakaoadfit.cmd = (window as any).kakaoadfit.cmd || [];
        return (window as any).kakaoadfit.cmd as any[];
      } catch { return [] as any[]; }
    };

    const clearSlotDom = () => {
      try {
        if (slotContainerRef.current) {
          while (slotContainerRef.current.firstChild) {
            slotContainerRef.current.removeChild(slotContainerRef.current.firstChild as Node);
          }
        }
      } catch { /* ignore */ }
    };

    if (!isLoading) {
      clearSlotDom();
      return;
    }

    // Open: create a fresh <ins> and request display (no SDK destroy)
    clearSlotDom();
    try {
      const ins = document.createElement('ins');
      ins.className = 'kakao_ad_area';
      ins.style.display = 'block';
      ins.style.width = `${adSize.w}px`;
      ins.style.height = `${adSize.h}px`;
      ins.setAttribute('data-ad-unit', 'DAN-vp72ZOLWoPvVx4NP');
      ins.setAttribute('data-ad-width', String(adSize.w));
      ins.setAttribute('data-ad-height', String(adSize.h));
      slotContainerRef.current?.appendChild(ins);
    } catch { /* ignore */ }

    const cmd = ensureCmd();
    const id = setTimeout(() => {
      try {
        console.info('[AdFit] display request', { adSize });
        cmd.push(function () {
          try {
            const k = (window as any).kakaoadfit || (window as any).adfit;
            if (k && k.display) k.display();
          } catch (e) { console.warn('[AdFit] display error', e); }
        });
      } catch { /* ignore */ }
    }, 0);
    return () => clearTimeout(id);
  }, [isLoading, adSize, openSeq]);

  if (!isLoading) {
    return null;
  }

  const modalPaddingX = 32; // p-6 ~ 24px, plus layout headroom
  const modalPaddingY = 24;
  const modalW = Math.max(420, adSize.w + modalPaddingX * 2);
  const topAreaMinH = 140; // title + message + progress
  const adAreaH = adSize.h + 8; // slight headroom
  const footerH = 18; // small helper text height
  const modalH = topAreaMinH + adAreaH + footerH + modalPaddingY * 2;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 backdrop-blur-sm">
      <div
        className="bg-white rounded-lg p-6 flex flex-col items-center shadow-2xl text-center justify-between"
        style={{ width: `${modalW}px`, height: `${modalH}px` }}
      >
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{operationType === 'Import' ? t('adLoading.titleImport') : t('adLoading.titleDownload')}</h3>
          <p className="text-md font-medium text-gray-600 mb-4 min-h-[24px]">{message}</p>
          <div className="w-full flex items-center gap-2">
            <div className="flex-grow">
              <ProgressBar progress={progress} />
            </div>
            <span className="text-sm font-semibold text-gray-700 w-10 text-right">{`${Math.round(progress)}%`}</span>
          </div>
        </div>
        {/* Kakao AdFit Ad Slot */}
        <div
          key={adKey}
          className="w-full rounded-md flex items-center justify-center overflow-hidden"
          style={{ height: adSize.h + 8 }}
        >
          <div ref={slotContainerRef} style={{ width: adSize.w, height: adSize.h }} />
        </div>
        {progress < 100 && (
          <p className="text-xs text-gray-400">
            {operationType === 'Import' ? t('adLoading.footerImport') : t('adLoading.footerDownload')}
          </p>
        )}
      </div>
    </div>
  );
};