
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ASSETS } from '../constants';

const TechMarquee: React.FC = () => {
    const { t } = useLanguage();
    const techItems = [
        { icon: "solar:file-text-bold", label: 'PDF/A' },
        { icon: "solar:layers-minimalistic-bold", label: 'Word' },
        { icon: "solar:file-check-bold", label: 'OCR' },
        { icon: "solar:lock-keyhole-bold", label: 'AES-256' },
        { icon: "solar:shield-check-bold", label: 'Secure' },
        { icon: "solar:bolt-circle-bold", label: 'Engine' }
    ];
    const scrollItems = [...techItems, ...techItems, ...techItems];

    return (
        <div className="w-full bg-[#00CEC9] py-6 overflow-hidden relative z-10">
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
                    {t('pdf.tech_tagline')}
                </h2>
                <p className="text-white/70 text-xs max-w-xl mx-auto font-medium leading-relaxed">
                    {t('pdf.security_promise')}
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
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#00CEC9] via-transparent to-[#00CEC9]" />
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
            category: t('faq.pdf.cat1'),
            items: [
                { q: t('faq.pdf.q1'), a: t('faq.pdf.a1') },
                { q: t('faq.pdf.q2'), a: t('faq.pdf.a2') },
                { q: t('faq.pdf.q3'), a: t('faq.pdf.a3') },
                { q: t('faq.pdf.q4'), a: t('faq.pdf.a4') },
                { q: t('faq.pdf.q5'), a: t('faq.pdf.a5') },
            ]
        },
        {
            category: t('faq.pdf.cat2'),
            items: [
                { q: t('faq.pdf.q6'), a: t('faq.pdf.a6') },
                { q: t('faq.pdf.q7'), a: t('faq.pdf.a7') },
                { q: t('faq.pdf.q15'), a: t('faq.pdf.a15') },
            ]
        },
        {
            category: t('faq.pdf.cat3'),
            items: [
                { q: t('faq.pdf.q8'), a: t('faq.pdf.a8') },
                { q: t('faq.pdf.q9'), a: t('faq.pdf.a9') },
                { q: t('faq.pdf.q10'), a: t('faq.pdf.a10') },
                { q: t('faq.pdf.q11'), a: t('faq.pdf.a11') },
                { q: t('faq.pdf.q12'), a: t('faq.pdf.a12') },
                { q: t('faq.pdf.q13'), a: t('faq.pdf.a13') },
                { q: t('faq.pdf.q18'), a: t('faq.pdf.a18') },
            ]
        },
        {
            category: t('faq.pdf.cat4'),
            items: [
                { q: t('faq.pdf.q14'), a: t('faq.pdf.a14') },
                { q: t('faq.pdf.q16'), a: t('faq.pdf.a16') },
                { q: t('faq.pdf.q17'), a: t('faq.pdf.a17') },
                { q: t('faq.pdf.q19'), a: t('faq.pdf.a19') },
                { q: t('faq.pdf.q20'), a: t('faq.pdf.a20') },
            ]
        }
    ];

    const toggleItem = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="max-w-4xl mx-auto px-4" key={language}>
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-100 text-[#00CEC9] mb-4">
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
                            ? 'bg-[#00CEC9] text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-200 ring-offset-2'
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
                                <span className={`flex-shrink-0 font-bold text-lg ${openIndex === idx ? 'text-[#00CEC9]' : 'text-slate-400'}`}>
                                    Q.
                                </span>
                                <span className={`text-base md:text-lg font-bold transition-colors ${openIndex === idx ? 'text-[#00CEC9]' : 'text-slate-900'}`}>
                                    {item.q}
                                </span>
                            </div>
                            {openIndex === idx ? <Icon icon="solar:alt-arrow-up-bold" className="text-[#00CEC9] shrink-0 mt-1" width="20" /> : <Icon icon="solar:alt-arrow-down-bold" className="text-slate-400 shrink-0 mt-1" width="20" />}
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-6 pb-6 pl-14 pr-8">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                    <span className="font-bold text-[#00CEC9] mr-2">A.</span>
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

export const LivePdfPage: React.FC = () => {
    const { t } = useLanguage();

    return (
        <div className="w-full bg-white selection:bg-cyan-100 selection:text-cyan-900 overflow-x-hidden">

            {/* 1. Hero Section */}
            <section className="relative pt-12 pb-16 md:pt-20 md:pb-28 overflow-hidden bg-slate-50 border-b border-slate-100">
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    <div className="absolute inset-0 bg-[radial-gradient(#00CEC9_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.05]"></div>
                    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-cyan-100 text-[#00CEC9] text-sm font-bold mb-6 shadow-sm animate-fade-in-up">
                        <Icon icon="solar:file-text-bold" width="16" /> {t('pdf.badge')}
                    </div>

                    <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-snug animate-fade-in-up">
                        {t('pdf.title')}
                    </h1>

                    <p className="text-base md:text-lg text-slate-500 max-w-3xl mb-8 leading-relaxed mx-auto animate-fade-in-up">
                        {t('pdf.desc')}
                    </p>

                    <div className="animate-fade-in-up">
                        <Link to="/live-pdf/app">
                            <Button size="lg" className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl shadow-xl shadow-cyan-500/20 gap-3 hover:scale-105 transition-transform duration-300">
                                {t('pdf.start_btn')} <Icon icon="solar:arrow-right-bold" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <TechMarquee />

            {/* 2. ULTIMATE BENTO GRID SECTION */}
            <section className="bg-[#f5f5f7] py-16 md:py-24 relative overflow-hidden">
                <div className="max-w-[1440px] mx-auto px-6 relative z-10">

                    <div className="text-center mb-16 md:mb-20">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">{t('pdf.feat_title')}</h2>
                        <p className="text-base md:text-lg text-slate-500 max-w-2xl mx-auto">{t('pdf.feat_subtitle')}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-12 gap-4 auto-rows-[minmax(120px,auto)] items-stretch">

                        {/* [ROW 1] */}
                        <div className="col-span-1 md:col-span-3 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200/60 flex flex-col justify-between group hover:shadow-md transition-all">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-[#00CEC9] group-hover:scale-110 transition-transform">
                                    <Icon icon="solar:file-check-bold" width="20" />
                                </div>
                                <h3 className="text-sm font-black text-slate-800 uppercase leading-tight tracking-tight">{t('pdf.bento.merge')}</h3>
                            </div>
                            <p className="text-slate-300 text-[9px] font-bold uppercase tracking-widest mt-4">{t('pdf.bento.fast_merge')}</p>
                        </div>

                        <div className="col-span-1 md:col-span-2 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200/60 flex flex-col justify-between group hover:shadow-md transition-all">
                            <div className="flex flex-col gap-2">
                                <Icon icon="solar:clapperboard-edit-bold" className="text-blue-500" width="22" />
                                <h3 className="text-[10px] font-black text-slate-800 leading-tight uppercase">{t('pdf.bento.office_to_pdf')}</h3>
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-4 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200/60 flex items-center justify-between group hover:shadow-md transition-all">
                            <div>
                                <h3 className="text-sm font-black text-slate-800 mb-1">{t('pdf.bento.split')}</h3>
                                <p className="text-slate-400 text-[9px] font-medium uppercase tracking-tighter">{t('pdf.bento.precision_split')}</p>
                            </div>
                            <Icon icon="solar:layers-minimalistic-bold" className="text-cyan-500" width="18" />
                        </div>

                        <div className="col-span-1 md:col-span-3 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200/60 flex flex-col justify-between group hover:shadow-md transition-all">
                            <h3 className="text-[11px] font-black text-slate-800 uppercase tracking-widest">{t('pdf.bento.compress')}</h3>
                            <div className="flex items-end gap-1 h-6">
                                {[20, 40, 80, 50, 40].map((h, i) => (
                                    <div key={i} className="flex-1 bg-cyan-100 rounded-sm group-hover:bg-cyan-500 transition-all duration-500" style={{ height: `${h}%` }}></div>
                                ))}
                            </div>
                        </div>

                        {/* [ROW 2: MIDDLE] */}
                        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200/60 flex-1 group hover:shadow-md transition-all flex flex-col justify-center">
                                <p className="text-[10px] font-black text-cyan-600 uppercase tracking-tighter mb-1">{t('pdf.bento.reverse')}</p>
                                <h3 className="text-sm font-black text-slate-800 leading-tight uppercase">{t('pdf.bento.pdf_to')}</h3>
                            </div>
                            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200/60 flex-1 group hover:shadow-md transition-all flex items-center justify-center overflow-hidden relative">
                                <h3 className="text-sm font-black text-slate-800 leading-tight uppercase">{t('pdf.bento.office')}</h3>
                            </div>
                        </div>

                        <div className="col-span-2 md:col-span-8 bg-white rounded-[3.5rem] p-2 shadow-xl shadow-slate-200/60 border border-white/80 relative overflow-hidden group">
                            <div className="relative z-10 w-full h-full rounded-[3.2rem] overflow-hidden flex flex-col items-center justify-center text-center p-16 md:p-20">
                                <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-[#00CEC9] to-teal-400 flex items-center justify-center text-white mb-8 shadow-2xl shadow-cyan-500/20 group-hover:rotate-6 transition-transform">
                                    <Icon icon="solar:play-circle-bold" width="40" />
                                </div>
                                <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tighter leading-tight">{t('pdf.start_btn')}</h3>
                                <p className="text-slate-400 text-sm md:text-base mb-10 font-medium">{t('pdf.security_promise')}</p>
                                <Link to="/live-pdf/app">
                                    <Button size="lg" className="!bg-slate-900 !text-white px-16 py-5 text-xl font-black rounded-[1.5rem] gap-3 shadow-2xl hover:scale-105 transition-transform">
                                        {t('common.launch_app')} <Icon icon="solar:arrow-right-bold" width="20" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
                            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200/60 flex-1 group hover:shadow-md transition-all flex flex-col justify-between">
                                <Icon icon="solar:pen-new-square-bold" width="22" className="text-slate-300 group-hover:text-cyan-500" />
                                <h3 className="text-sm font-black text-slate-800 uppercase">PDF</h3>
                            </div>
                            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200/60 flex-1 group hover:shadow-md transition-all flex flex-col justify-end">
                                <h3 className="text-sm font-black text-slate-800 uppercase">{t('pdf.bento.edit')}</h3>
                                <div className="h-1 w-full bg-cyan-400 mt-2 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]"></div>
                            </div>
                        </div>

                        {/* [ROW 3: BOTTOM] */}
                        <div className="col-span-1 md:col-span-3 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200/60 flex items-center gap-4 group hover:shadow-md transition-all">
                            <div className="w-10 h-10 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                                <Icon icon="solar:gallery-bold" width="20" />
                            </div>
                            <div>
                                <h3 className="text-[10px] font-black text-slate-800 uppercase tracking-tighter">{t('pdf.bento.jpg_to_pdf')}</h3>
                                <p className="text-[7px] font-bold text-slate-300 uppercase">{t('pdf.bento.image_convert')}</p>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200/60 flex flex-col items-center justify-center text-center group hover:shadow-md transition-all">
                            <Icon icon="solar:user-speak-bold" className="text-slate-300 mb-1 group-hover:text-cyan-500" width="18" />
                            <p className="text-[10px] font-black text-slate-800">{t('pdf.bento.sign')}</p>
                        </div>

                        <div className="col-span-1 md:col-span-2 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200/60 flex flex-col items-center justify-center text-center group hover:shadow-md transition-all">
                            <Icon icon="solar:shield-keyhole-bold" className="text-slate-300 mb-1 group-hover:text-emerald-500" width="18" />
                            <p className="text-[10px] font-black text-slate-800">{t('pdf.bento.security')}</p>
                        </div>

                        <div className="col-span-1 md:col-span-2 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200/60 flex flex-col items-center justify-center text-center group hover:shadow-md transition-all">
                            <Icon icon="solar:scanner-bold" className="text-slate-300 mb-1 group-hover:text-blue-500" width="18" />
                            <p className="text-[10px] font-black text-slate-800">{t('pdf.bento.ocr')}</p>
                        </div>

                        <div className="col-span-1 md:col-span-3 bg-white rounded-[2rem] p-6 shadow-sm border border-slate-200/60 flex flex-col justify-center items-center text-center group hover:shadow-md transition-all overflow-hidden">
                            <Icon icon="solar:waterdrops-bold" className="text-indigo-200 mb-1" width="20" />
                            <h3 className="text-[10px] font-black text-slate-800 italic tracking-tighter uppercase">{t('pdf.bento.watermark')}</h3>
                        </div>

                    </div>
                </div>
            </section>

            {/* 3. Workflow Steps */}
            <section className="bg-white py-16 md:py-32">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="bg-slate-50 rounded-[2.5rem] p-3 shadow-inner border border-slate-100 relative z-10 overflow-hidden aspect-video h-[300px] md:h-[425px]">
                                <img src={ASSETS.PREVIEW_PDF} alt="PDF Editor Preview" className="rounded-2xl w-full h-full object-cover" />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8 text-left">
                            <h2 className="text-3xl font-bold text-slate-900 leading-tight">{t('pdf.flow_title')}</h2>
                            <div className="space-y-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="flex gap-5 group">
                                        <div className="w-10 h-10 rounded-full bg-[#00CEC9] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-teal-200">{i}</div>
                                        <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">{t(`pdf.flow_${i}`)}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 md:py-24">
                <FAQBoard />
            </section>

            {/* 4. Final CTA */}
            <section className="relative py-16 md:py-20 overflow-hidden bg-[#00CEC9] isolate">
                <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-xl">{t('pdf.cta_title')}</h2>
                    <p className="text-teal-50 mb-10 text-lg font-medium drop-shadow-md">{t('pdf.cta_desc')}</p>
                    <Link to="/live-pdf/app">
                        <Button size="lg" className="relative !bg-white !text-[#00CEC9] hover:!bg-slate-50 border-none px-12 py-5 text-xl font-bold rounded-2xl shadow-xl transition-all transform group-hover:scale-[1.02]">
                            {t('pdf.cta_btn')}
                        </Button>
                    </Link>
                </div>
            </section>
        </div>
    );
};

export const LivePdfApp: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col bg-slate-100 overflow-hidden p-2 md:p-4">
            <div className="w-full h-full relative rounded-xl shadow-2xl border border-slate-200 bg-white overflow-hidden">
                <iframe
                    src="/pdf_studio/index.html"
                    title="Live PDF Tool"
                    className="absolute top-0 left-0 border-0"
                    style={{
                        width: '111.11%',
                        height: '111.11%',
                        transform: 'scale(0.9)',
                        transformOrigin: 'top left'
                    }}
                    allowFullScreen
                />
            </div>
        </div>
    );
};
