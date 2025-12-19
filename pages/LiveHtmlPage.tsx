
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ASSETS } from '../constants';

const TechMarquee: React.FC = () => {
    const { t } = useLanguage();

    const techItems = [
        { icon: "solar:code-bold", label: 'HTML5' },
        { icon: "solar:layers-minimalistic-bold", label: 'CSS3' },
        { icon: "solar:atom-bold", label: 'React' },
        { icon: "solar:file-code-bold", label: 'JSON' },
        { icon: "solar:file-text-bold", label: 'PDF' },
        { icon: "solar:presentation-graph-bold", label: 'PPTX' },
        { icon: "solar:bolt-circle-bold", label: 'Vite' }
    ];

    const scrollItems = [...techItems, ...techItems, ...techItems];

    return (
        <div className="w-full bg-[#6C5CE7] py-6 overflow-hidden relative z-10">
            <style>
                {`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.33%); }
                }
                .animate-marquee {
                    animation: marquee 30s linear infinite;
                    display: flex;
                    width: max-content;
                }
                `}
            </style>

            <div className="max-w-7xl mx-auto px-4 text-center mb-4">
                <p className="text-white/80 font-bold uppercase tracking-[0.2em] text-[10px] mb-1">
                    {t('common.reliability_privacy')}
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-white max-w-2xl mx-auto leading-relaxed mb-1">
                    {t('html.tech_tagline')}
                </h2>
                <p className="text-white/70 text-xs max-w-xl mx-auto font-medium leading-relaxed">
                    {t('html.security_promise')}
                </p>
            </div>

            <div className="relative">
                <div className="animate-marquee flex gap-10 md:gap-16 items-center">
                    {scrollItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-white/40 grayscale hover:grayscale-0 hover:text-white transition-all duration-300">
                            <Icon icon={item.icon} width="28" />
                            <span className="text-base font-black italic tracking-tighter opacity-15 uppercase">{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#6C5CE7] via-transparent to-[#6C5CE7]" />
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
            category: t('faq.html.cat1'),
            items: [
                { q: t('faq.html.q1'), a: t('faq.html.a1') },
                { q: t('faq.html.q2'), a: t('faq.html.a2') },
                { q: t('faq.html.q3'), a: t('faq.html.a3') },
                { q: t('faq.html.q4'), a: t('faq.html.a4') },
                { q: t('faq.html.q5'), a: t('faq.html.a5') },
            ]
        },
        {
            category: t('faq.html.cat2'),
            items: [
                { q: t('faq.html.q6'), a: t('faq.html.a6') },
                { q: t('faq.html.q7'), a: t('faq.html.a7') },
                { q: t('faq.html.q8'), a: t('faq.html.a8') },
                { q: t('faq.html.q9'), a: t('faq.html.a9') },
                { q: t('faq.html.q10'), a: t('faq.html.a10') },
            ]
        },
        {
            category: t('faq.html.cat3'),
            items: [
                { q: t('faq.html.q11'), a: t('faq.html.a11') },
                { q: t('faq.html.q12'), a: t('faq.html.a12') },
                { q: t('faq.html.q13'), a: t('faq.html.a13') },
                { q: t('faq.html.q14'), a: t('faq.html.a14') },
                { q: t('faq.html.q15'), a: t('faq.html.a15') },
            ]
        },
        {
            category: t('faq.html.cat4'),
            items: [
                { q: t('faq.html.q16'), a: t('faq.html.a16') },
                { q: t('faq.html.q17'), a: t('faq.html.a17') },
                { q: t('faq.html.q18'), a: t('faq.html.a18') },
                { q: t('faq.html.q19'), a: t('faq.html.a19') },
                { q: t('faq.html.q20'), a: t('faq.html.a20') },
            ]
        }
    ];

    const toggleItem = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="max-w-4xl mx-auto px-4" key={language}>
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-[#6C5CE7] mb-4">
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
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 ${activeTab === idx
                            ? 'bg-[#6C5CE7] text-white shadow-lg shadow-purple-500/30 ring-2 ring-purple-200 ring-offset-2'
                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                            }`}
                    >
                        {section.category}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[300px]">
                {faqData[activeTab] && faqData[activeTab].items.map((item, idx) => (
                    <div key={idx} className="border-b border-slate-100 last:border-0">
                        <button
                            onClick={() => toggleItem(idx)}
                            className="w-full flex items-start justify-between p-6 text-left focus:outline-none hover:bg-slate-50/50 transition-colors"
                        >
                            <div className="flex gap-4">
                                <span className={`flex-shrink-0 font-bold text-lg ${openIndex === idx ? 'text-[#6C5CE7]' : 'text-slate-400'}`}>
                                    Q.
                                </span>
                                <span className={`text-base md:text-lg font-bold transition-colors ${openIndex === idx ? 'text-[#6C5CE7]' : 'text-slate-900'}`}>
                                    {item.q}
                                </span>
                            </div>
                            {openIndex === idx ? <Icon icon="solar:alt-arrow-up-bold" className="text-[#6C5CE7] shrink-0 mt-1" width="20" /> : <Icon icon="solar:alt-arrow-down-bold" className="text-slate-400 shrink-0 mt-1" width="20" />}
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-6 pb-6 pl-14 pr-8">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                    <span className="font-bold text-[#6C5CE7] mr-2">A.</span>
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

export const LiveHtmlPage: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="w-full pb-20 bg-white selection:bg-purple-100 selection:text-purple-900 overflow-x-hidden">

            {/* 1. Hero Section */}
            <section className="relative pt-12 pb-16 md:pt-20 md:pb-28 overflow-hidden bg-slate-50 border-b border-slate-100">
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(#6C5CE7_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05]"></div>
                    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-purple-100 text-[#6C5CE7] text-sm font-bold mb-6 shadow-sm animate-fade-in-up">
                        <Icon icon="solar:code-square-bold" width="16" /> {t('html.badge')}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-snug animate-fade-in-up">
                        {t('html.title')}
                    </h1>

                    <p className="text-base md:text-lg text-slate-500 max-w-3xl mb-8 leading-relaxed mx-auto animate-fade-in-up">
                        {t('html.desc')}
                    </p>

                    <div className="animate-fade-in-up">
                        <Link to="/live-html/app">
                            <Button size="lg" className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl shadow-xl shadow-purple-500/20 gap-3 hover:scale-105 transition-transform duration-300">
                                {t('html.start_btn')} <Icon icon="solar:arrow-right-bold" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <TechMarquee />

            {/* 2. Premium Bento Grid Section */}
            <section className="bg-white py-16 md:py-24 relative overflow-hidden isolate">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16 md:mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{t('html.feat_title')}</h2>
                        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">{t('html.feat_subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">

                        {/* Smart Variants */}
                        <div className="md:col-span-1 md:row-span-2 bg-slate-50/50 backdrop-blur-md rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl transition-all group flex flex-col min-h-[400px]">
                            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center text-[#6C5CE7] mb-8 shadow-inner">
                                <Icon icon="solar:layers-minimalistic-bold" width="24" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-4">{t('html.feat_1')}</h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{t('html.feat_1_desc')}</p>
                            <div className="mt-auto space-y-3 pt-10">
                                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                    <div className="h-full w-[70%] bg-[#6C5CE7] group-hover:w-full transition-all duration-700"></div>
                                </div>
                            </div>
                        </div>

                        {/* Main Center Preview */}
                        <div className="md:col-span-2 md:row-span-2 bg-slate-900 rounded-[3rem] p-1.5 shadow-2xl relative overflow-hidden group">
                            <div className="relative z-10 w-full aspect-video rounded-[2.8rem] overflow-hidden">
                                <img src={ASSETS.PREVIEW_HTML} alt="Main Interface" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-8 left-8 right-8 text-white">
                                    <h3 className="text-2xl font-bold mb-2">EZUP STUDIO v2.1</h3>
                                    <p className="text-white/60 text-sm font-medium uppercase tracking-widest">Client-Side Document Authoring</p>
                                </div>
                            </div>
                        </div>

                        {/* Stats Box */}
                        <div className="md:col-span-1 md:row-span-2 bg-purple-600 rounded-[2.5rem] p-10 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden group">
                            <div className="space-y-8 relative z-10">
                                <div>
                                    <p className="text-4xl font-black mb-1">3.8k+</p>
                                    <p className="text-purple-100 text-[10px] font-bold uppercase tracking-widest opacity-80">{t('html.ui_elements')}</p>
                                </div>
                                <div>
                                    <p className="text-4xl font-black mb-1">900+</p>
                                    <p className="text-purple-100 text-[10px] font-bold uppercase tracking-widest opacity-80">{t('html.smart_icons')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Row */}
                        <div className="md:col-span-1 md:row-span-1 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between min-h-[200px]">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{t('html.feat_2')}</h3>
                                <p className="text-slate-400 text-xs line-clamp-2">{t('html.feat_2_desc')}</p>
                            </div>
                        </div>

                        <div className="md:col-span-1 md:row-span-1 bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between min-h-[200px]">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{t('html.typography_system')}</h3>
                                <p className="text-slate-400 text-xs line-clamp-2">{t('html.typography_desc')}</p>
                            </div>
                        </div>

                        <div className="md:col-span-2 md:row-span-1 bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 flex items-center justify-between shadow-sm hover:shadow-xl transition-all group min-h-[200px]">
                            <div className="max-w-[150px]">
                                <h3 className="text-lg font-bold text-slate-900 mb-1">{t('html.auto_spacing')}</h3>
                                <p className="text-slate-400 text-xs">{t('html.auto_spacing_desc')}</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. Workflow Steps */}
            <section className="bg-slate-50 py-16 md:py-32">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="bg-white rounded-[2rem] p-4 shadow-2xl border border-slate-200 relative z-10 overflow-hidden h-[300px] md:h-[425px]">
                                <img src={ASSETS.THUMB_DEV} alt="HTML Editor Preview" className="rounded-xl w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8 text-left">
                            <h2 className="text-3xl font-bold text-slate-900 leading-tight">{t('html.flow_title')}</h2>
                            <div className="space-y-6">
                                <div className="flex gap-5 group">
                                    <div className="w-10 h-10 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-purple-200">1</div>
                                    <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">{t('html.flow_1')}</p>
                                </div>
                                <div className="flex gap-5 group">
                                    <div className="w-10 h-10 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-purple-200">2</div>
                                    <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">{t('html.flow_2')}</p>
                                </div>
                                <div className="flex gap-5 group">
                                    <div className="w-10 h-10 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-purple-200">3</div>
                                    <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">{t('html.flow_3')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 md:py-24">
                <FAQBoard />
            </section>

            {/* 4. Final CTA */}
            <section className="relative py-16 md:py-20 overflow-hidden bg-[#6C5CE7] isolate">
                <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-xl">{t('html.cta_title')}</h2>
                    <p className="text-purple-100 mb-10 text-lg font-medium drop-shadow-md">{t('html.cta_desc')}</p>
                    <Link to="/live-html/app">
                        <Button size="lg" className="relative !bg-white !text-[#6C5CE7] hover:!bg-slate-50 border-none px-12 py-5 text-xl font-bold rounded-2xl shadow-xl transition-all transform group-hover:scale-[1.02]">
                            {t('html.cta_btn')}
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export const LiveHtmlApp: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col bg-black overflow-hidden">
            <div className="w-full h-full relative overflow-hidden">
                <iframe
                    src="/live_editor/index.html"
                    title="Live HTML Studio"
                    className="absolute top-0 left-0 border-0"
                    style={{
                        width: '125%',
                        height: '125%',
                        transform: 'scale(0.8)',
                        transformOrigin: 'top left'
                    }}
                    allowFullScreen
                />
            </div>
        </div>
    );
};
