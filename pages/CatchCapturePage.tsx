
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { ASSETS } from '../constants';
import { Link } from 'react-router-dom';

const TechMarquee: React.FC = () => {
    const { t } = useLanguage();
    const techItems = [
        { icon: "solar:crop-minimalistic-bold", label: 'Area' },
        { icon: "solar:stopwatch-bold", label: 'Delay' },
        { icon: "solar:bolt-circle-bold", label: 'Instant' },
        { icon: "solar:layers-bold", label: 'Multi' },
        { icon: "solar:maximize-square-bold", label: 'Full Screen' },
        { icon: "solar:window-frame-bold", label: 'Window' },
        { icon: "solar:monitor-bold", label: 'Monitor' },
        { icon: "solar:cursor-square-bold", label: 'Unit' },
        { icon: "solar:download-square-bold", label: 'Scroll' },
        { icon: "solar:videocamera-record-bold", label: 'Record' },
        { icon: "solar:scanner-bold", label: 'OCR' }
    ];
    const scrollItems = [...techItems, ...techItems, ...techItems];

    return (
        <div className="w-full bg-[#4F46E5] py-4 overflow-hidden relative z-10 border-b border-white/10">
            <style>
                {`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                    display: flex;
                    width: max-content;
                }
                `}
            </style>
            <div className="relative">
                <div className="animate-marquee flex gap-12 items-center">
                    {scrollItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-white/30 grayscale hover:grayscale-0 hover:text-white transition-all duration-300">
                            <Icon icon={item.icon} width="18" />
                            <span className="text-[10px] font-black italic tracking-tighter uppercase">{item.label}</span>
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#4F46E5] via-transparent to-[#4F46E5] opacity-50" />
            </div>
        </div>
    );
};

const FAQBoard: React.FC = () => {
    const { t, language } = useLanguage();
    const [activeTab, setActiveTab] = useState(0);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    useEffect(() => {
        setOpenIndex(null);
    }, [language]);

    const faqData = [
        {
            category: t('faq.catch.cat1'),
            items: [
                { q: t('faq.catch.q1'), a: t('faq.catch.a1') },
                { q: t('faq.catch.q2'), a: t('faq.catch.a2') },
                { q: t('faq.catch.q3'), a: t('faq.catch.a3') },
                { q: t('faq.catch.q4'), a: t('faq.catch.a4') },
                { q: t('faq.catch.q5'), a: t('faq.catch.a5') },
            ]
        },
        {
            category: t('faq.catch.cat2'),
            items: [
                { q: t('faq.catch.q6'), a: t('faq.catch.a6') },
                { q: t('faq.catch.q7'), a: t('faq.catch.a7') },
                { q: t('faq.catch.q8'), a: t('faq.catch.a8') },
                { q: t('faq.catch.q9'), a: t('faq.catch.a9') },
                { q: t('faq.catch.q10'), a: t('faq.catch.a10') },
                { q: t('faq.catch.q11'), a: t('faq.catch.a11') },
                { q: t('faq.catch.q12'), a: t('faq.catch.a12') },
            ]
        },
        {
            category: t('faq.catch.cat3'),
            items: [
                { q: t('faq.catch.q13'), a: t('faq.catch.a13') },
                { q: t('faq.catch.q14'), a: t('faq.catch.a14') },
                { q: t('faq.catch.q15'), a: t('faq.catch.a15') },
                { q: t('faq.catch.q16'), a: t('faq.catch.a16') },
                { q: t('faq.catch.q17'), a: t('faq.catch.a17') },
            ]
        },
        {
            category: t('faq.catch.cat4'),
            items: [
                { q: t('faq.catch.q18'), a: t('faq.catch.a18') },
                { q: t('faq.catch.q19'), a: t('faq.catch.a19') },
            ]
        },
        {
            category: t('faq.catch.cat5'),
            items: [
                { q: t('faq.catch.q20'), a: t('faq.catch.a20') },
                { q: t('faq.catch.q21'), a: t('faq.catch.a21') },
                { q: t('faq.catch.q22'), a: t('faq.catch.a22') },
                { q: t('faq.catch.q23'), a: t('faq.catch.a23') },
                { q: t('faq.catch.q24'), a: t('faq.catch.a24') },
                { q: t('faq.catch.q25'), a: t('faq.catch.a25') },
                { q: t('faq.catch.q26'), a: t('faq.catch.a26') },
            ]
        },
        {
            category: t('faq.catch.cat6'),
            items: [
                { q: t('faq.catch.q27'), a: t('faq.catch.a27') },
                { q: t('faq.catch.q28'), a: t('faq.catch.a28') },
                { q: t('faq.catch.q29'), a: t('faq.catch.a29') },
                { q: t('faq.catch.q30'), a: t('faq.catch.a30') },
            ]
        }
    ];

    const toggleItem = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="max-w-4xl mx-auto px-4" key={language}>
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-[#4F46E5] mb-4">
                    <Icon icon="solar:question-circle-bold" width="24" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">{t('common.faq_title')}</h2>
                <p className="text-slate-500 mt-2">{t('contact.subtitle')}</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {faqData.map((section, idx) => (
                    <button
                        key={idx}
                        onClick={() => { setActiveTab(idx); setOpenIndex(null); }}
                        className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-200 ${activeTab === idx
                            ? 'bg-[#4F46E5] text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-200 ring-offset-2'
                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                            }`}
                    >
                        {section.category}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                {faqData[activeTab] && faqData[activeTab].items.map((item, idx) => (
                    <div key={idx} className="border-b border-slate-100 last:border-0">
                        <button
                            onClick={() => toggleItem(idx)}
                            className="w-full flex items-start justify-between p-6 text-left focus:outline-none hover:bg-slate-50/50 transition-colors"
                        >
                            <div className="flex gap-4">
                                <span className={`flex-shrink-0 font-bold text-lg ${openIndex === idx ? 'text-[#4F46E5]' : 'text-slate-400'}`}>
                                    Q.
                                </span>
                                <span className={`text-base font-bold transition-colors ${openIndex === idx ? 'text-[#4F46E5]' : 'text-slate-900'}`}>
                                    {item.q}
                                </span>
                            </div>
                            {openIndex === idx ? <Icon icon="solar:alt-arrow-up-bold" className="text-[#4F46E5] shrink-0 mt-1" width="20" /> : <Icon icon="solar:alt-arrow-down-bold" className="text-slate-400 shrink-0 mt-1" width="20" />}
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-6 pb-6 pl-14 pr-8">
                                <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100 text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                    <span className="font-bold text-[#4F46E5] mr-2">A.</span>
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const CatchCapturePage: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="w-full bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">

            {/* 1. Hero Section - Refined Features & Balanced Layout */}
            <section className="bg-slate-50/50 py-12 relative overflow-hidden">
                <div className="max-w-[1500px] mx-auto px-6 relative z-10">

                    {/* Grid: 12 Cols, Auto Rows ~120px */}
                    <div className="grid grid-cols-2 lg:grid-cols-12 auto-rows-[120px] gap-5">

                        {/* [ROW 1] - Top Header Row */}

                        {/* 1.1 Left: Title Card (4 Cols) */}
                        <div className="col-span-2 lg:col-span-4 lg:row-span-1 bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col justify-center relative overflow-hidden group animate-fade-in-up">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-indigo-100" />
                            <h1 className="relative text-3xl lg:text-4xl font-black text-slate-800 leading-[1.1] tracking-tighter">
                                Ultimate<br />
                                <span className="text-slate-400">Capture Suite</span>
                            </h1>
                        </div>

                        {/* 1.2 Mid: Main Features Strip (4 Cols) - CENTERED */}
                        <div className="col-span-2 lg:col-span-4 lg:row-span-1 bg-white rounded-[2.5rem] px-6 py-4 shadow-sm border border-slate-100 flex items-center justify-around animate-fade-in-up">
                            <div className="flex flex-col items-center gap-2 group cursor-pointer hover:-translate-y-1 transition-transform">
                                <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-indigo-50 transition-colors">
                                    <Icon icon="solar:crop-minimalistic-bold" width="24" className="text-slate-600 group-hover:text-indigo-600" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Area</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 group cursor-pointer hover:-translate-y-1 transition-transform">
                                <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-rose-50 transition-colors">
                                    <Icon icon="solar:record-circle-bold" width="24" className="text-slate-600 group-hover:text-rose-600" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Record</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 group cursor-pointer hover:-translate-y-1 transition-transform">
                                <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-emerald-50 transition-colors">
                                    <Icon icon="solar:text-field-focus-bold" width="24" className="text-slate-600 group-hover:text-emerald-600" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">OCR</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 group cursor-pointer hover:-translate-y-1 transition-transform">
                                <div className="p-2 rounded-xl bg-slate-50 group-hover:bg-blue-50 transition-colors">
                                    <Icon icon="solar:alt-arrow-down-bold" width="24" className="text-slate-600 group-hover:text-blue-600" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Scroll</span>
                            </div>
                        </div>

                        {/* 1.3 Right: Editing Tools (4 Cols) */}
                        <div className="col-span-2 lg:col-span-4 lg:row-span-1 bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100 flex flex-col justify-center pl-8 relative overflow-hidden group animate-fade-in-up">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                <Icon icon="solar:pallete-2-bold" width="80" className="text-slate-100" />
                            </div>
                            <p className="text-lg font-black text-slate-800 leading-tight relative z-10">Instant<br />Editor Tools</p>
                            <div className="flex gap-2 mt-3 relative z-10">
                                {['solar:pen-new-square-bold', 'solar:eraser-square-bold', 'solar:text-square-bold', 'solar:sticker-smile-square-bold'].map((icon, i) => (
                                    <Icon key={i} icon={icon} width="20" className="text-slate-400 hover:text-indigo-500 transition-colors" />
                                ))}
                            </div>
                        </div>


                        {/* [ROW 2 & 3 - MAIN CONTENT] */}

                        {/* 2.1 Left Column: Capture Modes (3 Cols Width) */}
                        <div className="col-span-2 lg:col-span-3 lg:row-span-3 flex flex-col gap-5 animate-fade-in-up">

                            {/* Top: 3-Stack Capture Options */}
                            <div className="flex-1 bg-white rounded-[2.5rem] shadow-sm border border-slate-200 p-6 flex flex-col gap-4">
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                                        <Icon icon="solar:stopwatch-bold" width="20" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-700 text-sm">Delay Capture</p>
                                        <p className="text-[10px] text-slate-400 font-bold">1-10 Seconds</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform">
                                        <Icon icon="solar:layers-bold" width="20" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-700 text-sm">Multi Capture</p>
                                        <p className="text-[10px] text-slate-400 font-bold">Batch Processing</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 group cursor-pointer">
                                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                                        <Icon icon="solar:window-frame-bold" width="20" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-700 text-sm">Window Mode</p>
                                        <p className="text-[10px] text-slate-400 font-bold">Auto Detect</p>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom: Tray Mode (Standard White Card) */}
                            <div className="h-[120px] bg-white rounded-[2.5rem] p-6 flex flex-col justify-center border border-slate-200 shadow-sm relative overflow-hidden group cursor-pointer hover:border-slate-300 transition-colors">
                                <div className="relative z-10 flex items-center gap-3">
                                    <div className="p-3 bg-slate-50 rounded-2xl group-hover:bg-blue-50 transition-colors">
                                        <Icon icon="solar:minimize-square-bold" className="text-slate-700 group-hover:text-blue-600" width="28" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 leading-tight">Tray<br /><span className="text-blue-500">Mode</span></h3>
                                </div>
                            </div>
                        </div>


                        {/* 2.2 CENTER HERO: Main App Image (6 Cols Width - Perfectly Centered) */}
                        <div className="col-span-2 lg:col-span-6 lg:row-span-3 bg-white rounded-[3.5rem] shadow-xl shadow-slate-200/50 border border-slate-200 relative overflow-hidden group z-10 animate-fade-in-up">
                            <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white" />

                            {/* Background Elements */}
                            <div className="absolute top-0 left-0 w-full h-full opacity-50 z-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/50 via-white to-transparent" />

                            <div className="w-full h-full flex items-center justify-center relative z-10 p-8">
                                <img
                                    src="/img/catch_hero.jpg"
                                    alt="CatchCapture UI"
                                    className="w-[110%] max-w-none shadow-2xl rounded-xl border border-slate-200/50 transform group-hover:scale-[1.01] transition-transform duration-700"
                                />

                                {/* Microsoft Store Download Button */}
                                <a 
                                    href="https://apps.microsoft.com/detail/9NRGS99PG892?hl=ko-kr&gl=KR&ocid=pdpshare"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute bottom-8 right-8 z-20"
                                >
                                    <Button className="!bg-white !text-slate-900 !rounded-[1.5rem] pl-5 pr-8 py-4 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_-10px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-300 border border-slate-100 flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white shadow-lg">
                                            <Icon icon="solar:bag-4-bold" width="22" />
                                        </div>
                                        <div className="text-left flex flex-col">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Get it from</span>
                                            <span className="font-black text-xl text-slate-800 leading-none">Microsoft Store</span>
                                        </div>
                                    </Button>
                                </a>
                            </div>
                        </div>


                        {/* 2.3 Right Column: Utility (3 Cols Width) */}
                        <div className="col-span-2 lg:col-span-3 lg:row-span-3 flex flex-col gap-5 animate-fade-in-up">

                            {/* Editor Toolbar Preview */}
                            <div className="flex-1 bg-white rounded-[2.5rem] border border-slate-200 p-6 flex flex-col justify-center items-center shadow-sm relative overflow-hidden">
                                <p className="text-[10px] font-bold text-slate-400 uppercase mb-4 tracking-widest text-center">Smart Toolbar</p>
                                <div className="w-full bg-slate-50 rounded-2xl p-3 flex flex-wrap gap-2 justify-center border border-slate-200">
                                    {['solar:pen-bold', 'solar:text-bold', 'solar:gallery-bold', 'solar:scanner-bold'].map((icon, idx) => (
                                        <div key={idx} className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:scale-110 transition-all cursor-pointer border border-slate-100">
                                            <Icon icon={icon} width="20" />
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span>Ready to Edit</span>
                                </div>
                            </div>

                            {/* Instant Edit Toggle (White Card Style) */}
                            <div className="h-[120px] bg-white rounded-[2.5rem] p-6 flex flex-row items-center justify-between border border-slate-200 shadow-sm group cursor-pointer relative overflow-hidden hover:border-indigo-200 transition-colors">
                                <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-50 rounded-bl-[4rem] transition-transform group-hover:scale-110" />
                                <div className="relative z-10">
                                    <p className="text-slate-400 text-xs font-bold mb-1 uppercase">Feature</p>
                                    <h3 className="text-xl font-black text-slate-800 leading-tight">Instant<br />Edit</h3>
                                </div>
                                <div className="relative z-10 w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group-hover:scale-110 transition-transform">
                                    <Icon icon="solar:magic-stick-3-bold" width="24" />
                                </div>
                            </div>

                        </div>


                        {/* [ROW 3 - BOTTOM ROW] - Extra Features */}

                        {/* 3.1 Color Palette (4 cols) */}
                        <div className="col-span-2 lg:col-span-4 lg:row-span-1 bg-white rounded-[2.5rem] p-6 flex items-center justify-between border border-slate-200 shadow-sm animate-fade-in-up">
                            <div>
                                <h4 className="font-bold text-slate-800">Rich Colors</h4>
                                <p className="text-xs text-slate-400 font-bold">For Highlights</p>
                            </div>
                            <div className="flex -space-x-2">
                                {['bg-yellow-400', 'bg-green-400', 'bg-blue-400', 'bg-pink-400'].map((c, i) => (
                                    <div key={i} className={`w-8 h-8 rounded-full border-2 border-white ${c} shadow-sm`} />
                                ))}
                            </div>
                        </div>

                        {/* 3.2 Global Shortcuts (4 cols) - White Card Fix */}
                        <div className="col-span-2 lg:col-span-4 lg:row-span-1 bg-white rounded-[2.5rem] p-6 flex flex-col justify-center border border-slate-200 text-center relative overflow-hidden shadow-sm animate-fade-in-up">
                            <div className="flex justify-center gap-2 mb-2 font-mono text-sm font-bold text-slate-600">
                                <span className="px-2 py-1 bg-slate-50 rounded border border-slate-200">Ctrl</span>
                                <span className="opacity-50">+</span>
                                <span className="px-2 py-1 bg-slate-50 rounded border border-slate-200">Shift</span>
                                <span className="opacity-50">+</span>
                                <span className="px-2 py-1 bg-slate-50 rounded border border-slate-200 text-indigo-600">S</span>
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global Shortcut</p>
                        </div>

                        {/* 3.3 Pin Mode (4 cols) */}
                        <div className="col-span-2 lg:col-span-4 lg:row-span-1 bg-white rounded-[2.5rem] p-6 flex items-center gap-4 border border-slate-200 shadow-sm group animate-fade-in-up">
                            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center text-rose-500 group-hover:rotate-12 transition-transform">
                                <Icon icon="solar:pin-bold" width="24" />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800">Pin Mode</h4>
                                <p className="text-xs text-slate-400 font-bold">Always on Top</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <TechMarquee />

            {/* 2. Workflow Steps */}
            <section className="bg-white py-20">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="relative group">
                            <div className="bg-slate-50 rounded-[3rem] p-3 shadow-inner border border-slate-100 relative z-10 overflow-hidden aspect-video">
                                <img src="/img/catch_hero.jpg" alt="Workflow" className="rounded-[2.5rem] w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="space-y-10">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">{t('catch.flow_title')}</h2>
                            <div className="space-y-8">
                                {[
                                    { step: 1, text: t('catch.flow_1'), icon: "solar:keyboard-bold", color: "bg-indigo-600" },
                                    { step: 2, text: t('catch.flow_2'), icon: "solar:magic-stick-3-bold", color: "bg-rose-500" },
                                    { step: 3, text: t('catch.flow_3'), icon: "solar:cloud-download-bold", color: "bg-blue-600" }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-6 group items-center">
                                        <div className={`w-14 h-14 rounded-2xl ${item.color} text-white flex items-center justify-center shadow-xl shrink-0`}>
                                            <Icon icon={item.icon} width="24" />
                                        </div>
                                        <p className="text-xl text-slate-700 font-black">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. FAQ Section */}
            <section className="bg-slate-50 py-20 md:py-28">
                <FAQBoard />
            </section>

            {/* 4. Final CTA */}
            <section className="relative py-24 md:py-32 overflow-hidden bg-slate-900">
                <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">{t('catch.cta_title')}</h2>
                    <p className="text-slate-400 mb-14 text-xl font-medium max-w-xl mx-auto">{t('catch.cta_desc')}</p>
                    <Button size="lg" className="relative !bg-white !text-slate-900 border-none px-16 py-6 text-2xl font-black rounded-2xl shadow-2xl transition-all transform group-hover:scale-[1.05]">
                        {t('catch.cta_btn')}
                    </Button>
                </div>
            </section>
        </div>
    );
};
