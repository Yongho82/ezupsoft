import React from 'react';
import { ICONS } from '../Icons';

const ToolbarButton = ({ icon, label, dropdown = false }: { icon: React.ReactNode, label: string, dropdown?: boolean }) => (
    <button className="flex flex-col items-center justify-center text-slate-700 hover:bg-slate-200 rounded-md p-2 w-20 transition-colors">
        <span className="w-6 h-6">{icon}</span>
        <span className="text-xs mt-1">{label}</span>
        {dropdown && <span className="absolute bottom-1 right-1 w-2 h-2">▼</span>}
    </button>
);

const ToolbarDivider = () => <div className="w-px h-10 bg-slate-300 mx-2"></div>;

type EditToolbarProps = {
    onDownload: () => void;
    isDownloadDisabled: boolean;
};

export const EditToolbar = ({ onDownload, isDownloadDisabled }: EditToolbarProps) => {
    return (
        <header className="bg-slate-100 border-b border-slate-300 p-2 flex items-center shadow-sm flex-shrink-0 z-10">
            <div className="flex items-center space-x-1">
                <ToolbarButton icon={ICONS.text} label="텍스트" />
                <ToolbarButton icon={ICONS.image} label="이미지" />
                <ToolbarButton icon={ICONS.shapes} label="도형" />
                <ToolbarButton icon={ICONS.draw} label="그리기" />
            </div>
            <ToolbarDivider />
            <div className="flex items-center space-x-1">
                 <button className="text-slate-700 hover:bg-slate-200 rounded-md p-2 transition-colors" title="실행 취소">
                    <span className="w-6 h-6">{ICONS.undo}</span>
                </button>
                <button className="text-slate-700 hover:bg-slate-200 rounded-md p-2 transition-colors" title="다시 실행">
                    <span className="w-6 h-6">{ICONS.redo}</span>
                </button>
            </div>
            
            <div className="ml-auto flex items-center pr-4">
                <button
                    onClick={onDownload}
                    disabled={isDownloadDisabled}
                    className="flex items-center bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed"
                >
                    <span className="w-5 h-5 mr-2">{ICONS.download}</span>
                    다운로드
                </button>
            </div>
        </header>
    );
};