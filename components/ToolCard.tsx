
import React from 'react';
import { Icon } from '@iconify/react';
import { Tool } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ToolCardProps {
  tool: Tool;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
  const { t } = useLanguage();

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-[#6C5CE7]/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60 z-10" />
        <img 
          src={tool.imageUrl} 
          alt={t(tool.title)} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 z-20">
          <button className="p-2 bg-white/80 backdrop-blur-md rounded-full text-slate-400 hover:text-[#6C5CE7] transition-colors shadow-sm">
            <Icon icon="solar:star-bold" width="16" />
          </button>
        </div>
        {tool.isPaid !== undefined && (
          <div className="absolute top-3 left-3 z-20">
            <span className={`px-2 py-1 rounded-md text-xs font-bold backdrop-blur-md shadow-sm ${tool.isPaid ? 'bg-purple-500 text-white' : 'bg-teal-500 text-white'}`}>
              {tool.isPaid ? 'PAID' : 'FREE'}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-xs font-bold text-[#6C5CE7] uppercase tracking-wider">
            {tool.subcategory || tool.category}
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#6C5CE7] transition-colors">
          {t(tool.title)}
        </h3>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
          {t(tool.description)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
          <div className="flex gap-2">
            {tool.tags.slice(0, 2).map((tag, idx) => (
              <span key={idx} className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded font-medium">
                #{tag}
              </span>
            ))}
          </div>
          <a 
            href={tool.url}
            className="flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-[#6C5CE7] transition-colors"
          >
            Visit <Icon icon="solar:link-circle-bold" width="14" />
          </a>
        </div>
      </div>
    </div>
  );
};
