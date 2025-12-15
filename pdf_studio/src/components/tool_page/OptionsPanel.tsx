
import React from 'react';
import { ICONS } from '../Icons';
import { Tool, PdfFile } from '../../types';
import { MergeOptions } from './options/MergeOptions';
import { CompressOptions } from './options/CompressOptions';
import { SplitOptions } from './options/SplitOptions';
import { ConvertOptions } from './options/ConvertOptions';
import { WatermarkOptions } from './options/WatermarkOptions';
import { useLanguage } from '../../contexts/LanguageContext';

type OptionsPanelProps = {
    files: PdfFile[];
    activeToolId: Tool['id'];
    activeSubTool: string | null;
    activeSplitTab: 'range' | 'page' | 'size';
    onSplitTabChange: (tab: 'range' | 'page' | 'size') => void;
    selectedPages: number[];
    setSelectedPages: React.Dispatch<React.SetStateAction<number[]>>;
    onProcessStart: (processFn: () => Promise<{ blob: Blob, filename: string } | null>, toolId: Tool['id'], subTool?: string) => void;
}

export const OptionsPanel = (props: OptionsPanelProps) => {
    const { activeToolId, activeSubTool, files, onProcessStart } = props;
    const { t } = useLanguage();

    const getTool = () => {
        const toolList = [
            { id: 'merge', name: t('sidebar.merge'), icon: ICONS.merge },
            { id: 'split', name: t('sidebar.split'), icon: ICONS.split },
            { id: 'compress', name: t('sidebar.compress'), icon: ICONS.compress },
            { id: 'convert', name: t('sidebar.convert'), icon: ICONS.convert },
            { id: 'watermark', name: t('sidebar.watermark'), icon: ICONS.watermark },
            { id: 'edit', name: t('sidebar.edit'), icon: ICONS.edit },
        ];
        return toolList.find(t => t.id === activeToolId);
    };

    const tool = getTool();

    const renderOptions = () => {
        switch (activeToolId) {
            case 'merge':
                return <MergeOptions files={files} onProcessStart={onProcessStart} />;
            case 'compress':
                return <CompressOptions files={files} onProcessStart={onProcessStart} />;
            case 'split':
                return <SplitOptions 
                            files={files}
                            activeSplitTab={props.activeSplitTab}
                            onSplitTabChange={props.onSplitTabChange}
                            selectedPages={props.selectedPages}
                            setSelectedPages={props.setSelectedPages}
                            onProcessStart={onProcessStart}
                        />;
            case 'convert':
                 return <ConvertOptions files={files} onProcessStart={onProcessStart} activeSubTool={activeSubTool} />;
            case 'watermark':
                 return <WatermarkOptions files={files} onProcessStart={onProcessStart} />;
            default:
                return <p className="text-slate-500">{t('options.noOptions')}</p>;
        }
    }

    return (
      <aside className="w-full lg:w-96 bg-white border-t lg:border-t-0 lg:border-l border-slate-200 p-6 flex-shrink-0 flex flex-col h-auto lg:h-full overflow-y-auto max-h-[50vh] lg:max-h-full shadow-inner lg:shadow-none z-10">
        <div className="flex items-center text-xl font-semibold mb-6 sticky top-0 bg-white z-10 py-2">
            <span className="w-7 h-7 mr-3 text-blue-600">{tool?.icon}</span>
            <span>{tool?.name}</span>
        </div>
        <div className="flex-grow flex flex-col">
           {renderOptions()}
        </div>
      </aside>
    );
};
