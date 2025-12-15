
import React from 'react';
import { ImageObject } from '../../types/editPageTypes';
import { useLanguage } from '../../contexts/LanguageContext';

type ImageOptionsPanelProps = {
    image: ImageObject;
    onUpdate: (props: Partial<ImageObject>) => void;
};

export const ImageOptionsPanel = ({ image, onUpdate }: ImageOptionsPanelProps) => {
    const { t } = useLanguage();

    return (
        <aside className="w-full h-full bg-white flex flex-col flex-shrink-0 p-4 space-y-4 overflow-y-auto">
            <h3 className="text-lg font-bold text-slate-800 border-b border-slate-200 pb-2 sticky top-0 bg-white z-10">
                {t('imageOptions.title')}
            </h3>
            <div className="space-y-3">
                <div>
                    <label htmlFor="opacity-slider" className="text-sm font-semibold text-slate-600 block mb-1">
                        {t('imageOptions.opacity')} ({Math.round((image.opacity ?? 1) * 100)}%)
                    </label>
                    <input
                        id="opacity-slider"
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={image.opacity ?? 1}
                        onChange={e => onUpdate({ opacity: parseFloat(e.target.value) })}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </aside>
    );
};
