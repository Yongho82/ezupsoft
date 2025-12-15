import React, { useState, useRef, useEffect } from 'react';
import { ColorPicker } from './ColorPicker';
import { TFunction } from '../../hooks/useTranslations';

const getChartTypes = (t: TFunction) => [
    { value: 'bar', label: t('chartPopover.bar') },
    { value: 'line', label: t('chartPopover.line') },
    { value: 'pie', label: t('chartPopover.pie') },
    { value: 'doughnut', label: t('chartPopover.doughnut') },
];

const COLOR_PALETTES: Record<string, { background: string[], border: string[] }> = {
    vivid: {
        background: [ '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40' ],
        border: [ '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40' ],
    },
    pastel: {
        background: [ '#FFB6C1', '#ADD8E6', '#FFFFE0', '#98FB98', '#E6E6FA', '#FFDAB9' ],
        border: [ '#FFB6C1', '#ADD8E6', '#FFFFE0', '#98FB98', '#E6E6FA', '#FFDAB9' ],
    },
    office: {
        background: [ '#4A698A', '#8A9A8A', '#C3996B', '#666666', '#9985A8', '#7794AD' ],
        border: [ '#4A698A', '#8A9A8A', '#C3996B', '#666666', '#9985A8', '#7794AD' ],
    },
    black: {
        background: [ '#00FFFF', '#FF00FF', '#FFFF00', '#00FF00', '#FFA500', '#BF00FF' ],
        border: [ '#00FFFF', '#FF00FF', '#FFFF00', '#00FF00', '#FFA500', '#BF00FF' ],
    },
    primary: {
        background: [ '#FF0000', '#0000FF', '#FFFF00', '#008000', '#FFA500', '#800080' ],
        border: [ '#FF0000', '#0000FF', '#FFFF00', '#008000', '#FFA500', '#800080' ],
    },
    simple: {
        background: [ '#696969', '#708090', '#778899', '#A9A9A9', '#C0C0C0', '#D3D3D3' ],
        border: [ '#696969', '#708090', '#778899', '#A9A9A9', '#C0C0C0', '#D3D3D3' ],
    }
};

const getThemeLabels = (t: TFunction): Record<string, string> => ({
    vivid: t('chartPopover.themes.vivid'),
    pastel: t('chartPopover.themes.pastel'),
    office: t('chartPopover.themes.office'),
    black: t('chartPopover.themes.black'),
    primary: t('chartPopover.themes.primary'),
    simple: t('chartPopover.themes.simple'),
    custom: t('chartPopover.themes.custom'),
});

export const ChartPopover: React.FC<{ 
    onInsert: (html: string, script: string) => void, 
    onClose: () => void,
    t: TFunction,
}> = ({ onInsert, onClose, t }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [chartType, setChartType] = useState('bar');
    const [title, setTitle] = useState(t('chartPopover.chartTitlePlaceholder'));
    const [labels, setLabels] = useState('1월, 2월, 3월, 4월, 5월, 6월');
    const [datasets, setDatasets] = useState([
      { seriesLabel: '매출액 (백만원)', data: '65, 59, 80, 81, 56, 55' },
    ]);
    const [colorTheme, setColorTheme] = useState('vivid');
    const [customColors, setCustomColors] = useState<string[]>(COLOR_PALETTES.vivid.background);
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [onClose]);

    const handleCustomColorChange = (index: number, color: string) => {
        setCustomColors(prev => {
            const newColors = [...prev];
            newColors[index] = color;
            return newColors;
        });
    };
    
    const handleDatasetChange = (index: number, field: 'seriesLabel' | 'data', value: string) => {
        setDatasets(prev => {
            const newDatasets = [...prev];
            newDatasets[index] = { ...newDatasets[index], [field]: value };
            return newDatasets;
        });
    };

    const handleAddDataset = () => {
        setDatasets(prev => [...prev, { seriesLabel: `데이터 ${prev.length + 1}`, data: '' }]);
    };

    const handleRemoveDataset = (index: number) => {
        setDatasets(prev => prev.filter((_, i) => i !== index));
    };


    const handleInsert = () => {
        const canvasId = `chart-canvas-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const html = `<div class="chart-container" style="width: 450px; height: 300px;"><canvas id="${canvasId}"></canvas></div>`;

        const parsedLabels = labels.split(',').map(l => l.trim());
        
        const selectedPalette = colorTheme === 'custom' 
            ? { background: customColors, border: customColors }
            : COLOR_PALETTES[colorTheme];

        const isMultiColorChart = chartType === 'pie' || chartType === 'doughnut';

        const chartConfig = {
            type: chartType,
            data: {
                labels: parsedLabels,
                datasets: datasets.map((ds, index) => ({
                    label: ds.seriesLabel,
                    data: ds.data.split(',').map(d => parseFloat(d.trim()) || 0),
                    backgroundColor: isMultiColorChart 
                        ? selectedPalette.background 
                        : selectedPalette.background[index % selectedPalette.background.length],
                    borderColor: isMultiColorChart
                        ? selectedPalette.border
                        : selectedPalette.border[index % selectedPalette.border.length],
                    borderWidth: 1
                }))
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: !!title.trim(),
                        text: title.trim()
                    },
                    legend: {
                        position: 'top',
                    },
                }
            }
        };
        
        const safeVarName = `chartInstance_${canvasId.replace(/-/g, '_')}`;
        const script = `
document.addEventListener('DOMContentLoaded', function() {
    const canvasEl = document.getElementById('${canvasId}');
    if (canvasEl) {
        const ctx = canvasEl.getContext('2d');
        const ${safeVarName} = new Chart(ctx, ${JSON.stringify(chartConfig, null, 2)});
    }
});
`;
        onInsert(html, script);
        onClose();
    };
    
    const InputField: React.FC<{label: string, value: string, onChange: (v:string) => void, placeholder?: string}> = ({label, value, onChange, placeholder}) => (
        <div>
            <label className="block text-xs text-gray-600 mb-1">{label}</label>
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full text-sm p-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
        </div>
    );

    return (
        <div ref={ref} className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-md shadow-lg z-30 ring-1 ring-black ring-opacity-5 p-4 max-h-[80vh] flex flex-col">
            <p className="text-sm font-medium text-gray-800 mb-3 flex-shrink-0">{t('chartPopover.title')}</p>
            <div className="space-y-3 overflow-y-auto pr-2 flex-grow">
                <div className="flex items-center justify-between gap-2">
                    {getChartTypes(t).map(type => (
                        <button 
                            key={type.value}
                            onClick={() => setChartType(type.value)}
                            className={`flex-1 text-sm py-1 rounded ${chartType === type.value ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            {type.label}
                        </button>
                    ))}
                </div>
                <InputField label={t('chartPopover.chartTitle')} value={title} onChange={setTitle} placeholder={t('chartPopover.chartTitlePlaceholder')} />
                <InputField label={t('chartPopover.dataLabels')} value={labels} onChange={setLabels} placeholder={t('chartPopover.dataLabelsPlaceholder')} />
                
                <div className="space-y-2 border-t border-gray-200 pt-3 mt-3">
                    <label className="block text-xs text-gray-600">{t('chartPopover.datasets')}</label>
                    {datasets.map((dataset, index) => (
                        <div key={index} className="p-2 border border-gray-200 rounded-md space-y-2 relative">
                            <InputField label={t('chartPopover.seriesName', { index: index + 1 })} value={dataset.seriesLabel} onChange={(val) => handleDatasetChange(index, 'seriesLabel', val)} />
                            <InputField label={t('chartPopover.dataValues')} value={dataset.data} onChange={(val) => handleDatasetChange(index, 'data', val)} />
                            {datasets.length > 1 && (
                                <button
                                    onClick={() => handleRemoveDataset(index)}
                                    className="absolute top-1 right-1 text-gray-400 hover:text-red-500 p-1"
                                    title={t('chartPopover.removeSeries')}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        onClick={handleAddDataset}
                        className="w-full text-xs text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md"
                    >
                        {t('chartPopover.addSeries')}
                    </button>
                </div>

                <div>
                    <label className="block text-xs text-gray-600 mb-1">{t('chartPopover.colorTheme')}</label>
                    <div className="grid grid-cols-3 gap-2">
                        {Object.keys(getThemeLabels(t)).map(themeKey => (
                             <button 
                                key={themeKey}
                                onClick={() => setColorTheme(themeKey)}
                                className={`text-sm py-1 rounded ${colorTheme === themeKey ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                            >
                                {getThemeLabels(t)[themeKey]}
                            </button>
                        ))}
                    </div>
                </div>
                {colorTheme === 'custom' && (
                    <div className="mt-3">
                        <label className="block text-xs text-gray-600 mb-1">{t('chartPopover.customColors')}</label>
                        <div className="grid grid-cols-6 gap-2 bg-gray-50 p-2 rounded-md">
                            {customColors.map((color, index) => (
                                <ColorPicker
                                    key={index}
                                    value={color}
                                    onChange={(newColor) => handleCustomColorChange(index, newColor)}
                                    title={t('chartPopover.colorN', { index: index + 1 })}
                                    t={t}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <button onClick={handleInsert} className="mt-4 w-full text-sm bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex-shrink-0">
                {t('chartPopover.insert')}
            </button>
        </div>
    );
};