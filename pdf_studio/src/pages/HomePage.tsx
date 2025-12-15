
import React, { useState } from 'react';
import { ICONS } from '../components/Icons';
import { Tool, ToolID } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

type HomePageProps = {
    onToolSelect: (toolId: ToolID, subTool?: string) => void;
};

type ToolCategory = 'all' | 'organize' | 'optimize' | 'convert' | 'edit';

export const HomePage = ({ onToolSelect }: HomePageProps) => {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState<ToolCategory>('all');

    const categories: { id: ToolCategory; label: string }[] = [
        { id: 'all', label: t('home.categoryAll') },
        { id: 'organize', label: t('home.categoryOrganize') },
        { id: 'optimize', label: t('home.categoryOptimize') },
        { id: 'convert', label: t('home.categoryConvert') },
        { id: 'edit', label: t('home.categoryEdit') },
    ];

    const tools: { 
        id: string; // unique ID for the card
        toolId: ToolID; // which actual tool it maps to
        subTool?: string; // specific mode for the tool
        category: ToolCategory;
        icon: React.ReactNode; 
        title: string; 
        description: string; 
        color: string 
    }[] = [
        { id: 'merge', toolId: 'merge', category: 'organize', icon: ICONS.merge, title: t('home.mergeTitle'), description: t('home.mergeDesc'), color: 'text-red-500' },
        { id: 'split', toolId: 'split', category: 'organize', icon: ICONS.split, title: t('home.splitTitle'), description: t('home.splitDesc'), color: 'text-red-500' },
        { id: 'compress', toolId: 'compress', category: 'optimize', icon: ICONS.compress, title: t('home.compressTitle'), description: t('home.compressDesc'), color: 'text-green-500' },
        
        // Conversions Mapping to 'convert' tool with subTools
        { id: 'pdfToWord', toolId: 'convert', subTool: 'pdfToWord', category: 'convert', icon: ICONS.word, title: t('home.pdfToWordTitle'), description: t('home.pdfToWordDesc'), color: 'text-blue-600' },
        { id: 'pdfToPpt', toolId: 'convert', subTool: 'pdfToPpt', category: 'convert', icon: ICONS.ppt, title: t('home.pdfToPptTitle'), description: t('home.pdfToPptDesc'), color: 'text-orange-600' },
        { id: 'pdfToExcel', toolId: 'convert', subTool: 'pdfToExcel', category: 'convert', icon: ICONS.excel, title: t('home.pdfToExcelTitle'), description: t('home.pdfToExcelDesc'), color: 'text-green-600' },
        
        { id: 'wordToPdf', toolId: 'convert', subTool: 'wordToPdf', category: 'convert', icon: ICONS.word, title: t('home.wordToPdfTitle'), description: t('home.wordToPdfDesc'), color: 'text-blue-600' },
        { id: 'pptToPdf', toolId: 'convert', subTool: 'pptToPdf', category: 'convert', icon: ICONS.ppt, title: t('home.pptToPdfTitle'), description: t('home.pptToPdfDesc'), color: 'text-orange-600' },
        { id: 'excelToPdf', toolId: 'convert', subTool: 'excelToPdf', category: 'convert', icon: ICONS.excel, title: t('home.excelToPdfTitle'), description: t('home.excelToPdfDesc'), color: 'text-green-600' },
        { id: 'htmlToPdf', toolId: 'convert', subTool: 'htmlToPdf', category: 'convert', icon: ICONS.html, title: t('home.htmlToPdfTitle'), description: t('home.htmlToPdfDesc'), color: 'text-yellow-600' },
        
        { id: 'edit', toolId: 'edit', category: 'edit', icon: ICONS.edit, title: t('home.editPdfTitle'), description: t('home.editPdfDesc'), color: 'text-indigo-500' },
        
        { id: 'pdfToJpg', toolId: 'convert', subTool: 'pdfToJpg', category: 'convert', icon: ICONS.jpgIcon, title: t('home.pdfToJpgTitle'), description: t('home.pdfToJpgDesc'), color: 'text-yellow-500' },
        { id: 'jpgToPdf', toolId: 'convert', subTool: 'jpgToPdf', category: 'convert', icon: ICONS.jpgIcon, title: t('home.jpgToPdfTitle'), description: t('home.jpgToPdfDesc'), color: 'text-yellow-500' },
        
        { id: 'watermark', toolId: 'watermark', category: 'edit', icon: ICONS.watermark, title: t('home.watermarkTitle'), description: t('home.watermarkDesc'), color: 'text-red-400' },
    ];

    const filteredTools = activeCategory === 'all' 
        ? tools 
        : tools.filter(tool => tool.category === activeCategory);

    return (
        <div className="flex-grow bg-slate-50 overflow-y-auto p-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">PDF STUDIO</h2>
                
                {/* Category Filter Pills */}
                <div className="flex justify-center flex-wrap gap-3 mb-10">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-6 py-2 rounded-full font-medium text-sm transition-all duration-200 border ${
                                activeCategory === cat.id
                                    ? 'bg-slate-800 text-white border-slate-800 shadow-md transform -translate-y-0.5'
                                    : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50 hover:border-slate-400'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTools.map((tool) => (
                        <div 
                            key={tool.id}
                            onClick={() => onToolSelect(tool.toolId, tool.subTool)}
                            className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer border border-slate-100 hover:-translate-y-1 flex flex-col h-full group"
                        >
                            <div className={`w-12 h-12 mb-4 ${tool.color} transition-transform duration-200 group-hover:scale-110`}>
                                {tool.icon}
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">{tool.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{tool.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
