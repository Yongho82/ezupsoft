import React, { useState, useEffect } from 'react';
import { ICONS } from './Icons';
import { useLanguage } from '../contexts/LanguageContext';

type LoadingScreenProps = {
    onComplete: () => void;
};

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
    const [progress, setProgress] = useState(0);
    const { t } = useLanguage();

    useEffect(() => {
        const duration = 3000; // 3 seconds
        let startTime: number | null = null;
        let animationFrameId: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (elapsed < duration) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                onComplete();
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [onComplete]);

    return (
        <div className="flex flex-col items-center justify-center w-full h-full text-center">
            <div className="text-red-500 w-20 h-20 mb-6">
                {ICONS.pdfFile} 
            </div>
            <h1 className="text-2xl font-bold text-slate-800 mb-4">EZUP PDF STUDIO</h1>
            <p className="text-lg text-slate-600 mb-8">
                {t('loadingScreen.message')}
            </p>
            <div className="w-full max-w-md bg-slate-200 rounded-full h-2 relative">
                <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <p className="mt-2 text-slate-500 text-sm">{Math.round(progress)}%</p>
        </div>
    );
};