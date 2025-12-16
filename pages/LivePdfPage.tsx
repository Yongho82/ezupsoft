
import React, { useState, useEffect } from 'react';
import { FileText, Layers, Minimize2, Lock, Palette, HelpCircle, ChevronDown, ChevronUp, ArrowRight, UploadCloud, ShieldCheck, PenTool, Layout, FileSearch, Zap } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ASSETS } from '../constants';

const FeatureCard: React.FC<{ imageUrl: string; title: string; desc: string }> = ({ imageUrl, title, desc }) => (
  <div className="flex flex-col rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full text-left">
    <div className="h-56 overflow-hidden bg-slate-100 relative">
       <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
       <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
    </div>
    <div className="p-8">
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const TechMarquee: React.FC = () => {
    const { t } = useLanguage();
    
    const techItems = [
        { icon: FileText, label: 'PDF/A' },
        { icon: Layout, label: 'Word' },
        { icon: FileSearch, label: 'OCR' },
        { icon: Lock, label: 'AES-256' },
        { icon: ShieldCheck, label: 'Secure' },
        { icon: Zap, label: 'Engine' }
    ];

    const scrollItems = [...techItems, ...techItems, ...techItems];

    return (
        <div className="w-full bg-[#00CEC9] py-6 overflow-hidden relative">
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
                    PRIVACY & FIDELITY
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-white max-w-2xl mx-auto leading-relaxed mb-1">
                    {t('pdf.tech_tagline')}
                </h2>
                <p className="text-white/80 text-xs max-w-xl mx-auto font-medium leading-relaxed">
                    {t('pdf.security_promise')}
                </p>
            </div>

            <div className="relative">
                <div className="animate-marquee flex gap-16 items-center">
                    {scrollItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-white/40 grayscale hover:grayscale-0 hover:text-white transition-all duration-300">
                            <item.icon size={28} />
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
            ]
        },
        {
            category: t('faq.pdf.cat4'),
            items: [
                { q: t('faq.pdf.q14'), a: t('faq.pdf.a14') }, 
                { q: t('faq.pdf.q15'), a: t('faq.pdf.a15') }, 
                { q: t('faq.pdf.q16'), a: t('faq.pdf.a16') }, 
                { q: t('faq.pdf.q17'), a: t('faq.pdf.a17') }, 
                { q: t('faq.pdf.q18'), a: t('faq.pdf.a18') }, 
                { q: t('faq.pdf.q19'), a: t('faq.pdf.a19') }, 
                { q: t('faq.pdf.q20'), a: t('faq.pdf.a20') }, 
            ]
        },
    ];

    const toggleItem = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="max-w-4xl mx-auto px-4" key={language}>
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-100 text-[#00CEC9] mb-4">
                    <HelpCircle size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">FAQ & Help Center</h2>
                <p className="text-slate-500 mt-2">{t('contact.subtitle')}</p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {faqData.map((section, idx) => (
                    <button
                        key={idx}
                        onClick={() => { setActiveTab(idx); setOpenIndex(null); }}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 ${
                            activeTab === idx 
                            ? 'bg-[#00CEC9] text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-200 ring-offset-2' 
                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                        }`}
                    >
                        {section.category}
                    </button>
                ))}
            </div>

            {/* Questions List */}
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
                            {openIndex === idx ? <ChevronUp className="text-[#00CEC9] shrink-0 mt-1" size={20} /> : <ChevronDown className="text-slate-400 shrink-0 mt-1" size={20} />}
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
            
            <div className="mt-8 text-center">
                 <p className="text-sm text-slate-400">
                    <Link to="/contact" className="text-[#00CEC9] font-bold hover:underline">{t('nav.contact')}</Link>
                 </p>
            </div>
        </div>
    );
};

export const LivePdfPage: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    { imageUrl: ASSETS.PREVIEW_PDF, title: t('pdf.feat_1'), desc: t('pdf.feat_1_desc') },
    { imageUrl: ASSETS.THUMB_DESIGN, title: t('pdf.feat_2'), desc: t('pdf.feat_2_desc') },
    { imageUrl: ASSETS.SLIDE_PDF, title: t('pdf.feat_3'), desc: t('pdf.feat_3_desc') },
    { imageUrl: ASSETS.THUMB_DEV, title: t('pdf.feat_4'), desc: t('pdf.feat_4_desc') },
    { imageUrl: ASSETS.PREVIEW_HTML, title: t('pdf.feat_5'), desc: t('pdf.feat_5_desc') },
    { imageUrl: ASSETS.THUMB_PROD, title: t('pdf.feat_6'), desc: t('pdf.feat_6_desc') }
  ];

  return (
    <div className="w-full pb-20 bg-white">
      {/* 1. Hero Section - Mobile Optimized Padding */}
      <section className="relative pt-12 pb-16 md:pt-20 md:pb-28 overflow-hidden bg-slate-50">
        
        {/* Background Elements */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
             <div className="absolute inset-0 bg-[radial-gradient(#00CEC9_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]"></div>
             <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
             <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-24 right-[15%] text-cyan-200 animate-float" style={{ animationDelay: '0s' }}>
                <FileText size={140} className="transform rotate-12 opacity-50 scale-75 md:scale-100" />
             </div>
             {/* Other shapes... */}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-cyan-100 text-[#00CEC9] text-sm font-bold mb-6 shadow-sm animate-fade-in-up opacity-0">
              <UploadCloud size={16} /> {t('pdf.badge')}
           </div>
           
           <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-snug animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
             {t('pdf.title')}
           </h1>
           
           <p className="text-base md:text-lg text-slate-500 max-w-3xl mb-8 leading-relaxed mx-auto animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
             {t('pdf.desc')}
           </p>
           
           <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
              <Link to="/live-pdf/app">
                  <Button size="lg" variant="secondary" className="h-14 md:h-16 px-8 md:px-12 text-lg md:text-xl shadow-xl shadow-cyan-500/30 gap-3 hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
                    <span className="relative z-10 flex items-center gap-2">{t('pdf.start_btn')} <ArrowRight /></span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </Button>
              </Link>
           </div>
        </div>
      </section>

      <TechMarquee />

      <section className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center mb-12 md:mb-20 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">{t('pdf.feat_title')}</h2>
              <p className="text-lg text-slate-500">{t('pdf.feat_subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {features.map((feat, idx) => (
                  <FeatureCard key={idx} {...feat} />
              ))}
          </div>
      </section>

      {/* Workflow Steps Section */}
      <section className="bg-slate-50 py-16 md:py-32">
          <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div className="order-2 lg:order-1 relative">
                      <div className="bg-white rounded-[2rem] p-4 shadow-2xl border border-slate-200 relative z-10 overflow-hidden h-[300px] md:h-[425px]">
                           <img src={ASSETS.PREVIEW_PDF} alt="PDF Editor Preview" className="rounded-xl w-full h-full object-cover" />
                      </div>
                      <div className="absolute -top-12 -left-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl z-0 animate-pulse-slow"></div>
                  </div>
                  <div className="order-1 lg:order-2 space-y-8 text-left">
                      <h2 className="text-3xl font-bold text-slate-900 leading-tight">{t('pdf.flow_title')}</h2>
                      <div className="space-y-6">
                          <div className="flex gap-5 group">
                              <div className="w-10 h-10 rounded-full bg-[#00CEC9] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform">1</div>
                              <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">{t('pdf.flow_1')}</p>
                          </div>
                          <div className="flex gap-5 group">
                              <div className="w-10 h-10 rounded-full bg-[#00CEC9] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform">2</div>
                              <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">{t('pdf.flow_2')}</p>
                          </div>
                          <div className="flex gap-5 group">
                              <div className="w-10 h-10 rounded-full bg-[#00CEC9] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform">3</div>
                              <p className="text-slate-600 leading-relaxed text-base md:text-lg font-medium">{t('pdf.flow_3')}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section className="bg-slate-50/50 py-16 md:py-24">
          <FAQBoard />
      </section>

      <section className="relative py-16 md:py-20 overflow-hidden bg-[#00CEC9] isolate">
           <style>{`
             @keyframes spin-cw { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
             @keyframes spin-ccw { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
             @keyframes tilt {
                0%, 50%, 100% { transform: rotate(0deg); }
                25% { transform: rotate(0.5deg); }
                75% { transform: rotate(-0.5deg); }
             }
             .animate-tilt { animation: tilt 10s infinite linear; }
           `}</style>

           <div className="absolute inset-0 bg-gradient-to-br from-[#00CEC9] via-[#00B5B0] to-[#008E8A] z-0"></div>
           
           {/* Restored Spiral/Circular Animations */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/10 rounded-full animate-spin-slow opacity-30 pointer-events-none"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse] opacity-30 pointer-events-none"></div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-white/10 rounded-full animate-spin-slow opacity-30 pointer-events-none"></div>

           <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-white mb-6 drop-shadow-xl">{t('pdf.cta_title')}</h2>
                <p className="text-cyan-100 mb-10 text-lg font-medium drop-shadow-md">{t('pdf.cta_desc')}</p>
                <div className="relative inline-flex group">
                    <div className="absolute transition-all duration-1000 opacity-70 -inset-1 bg-gradient-to-r from-cyan-400 via-white to-teal-400 rounded-2xl blur-lg group-hover:opacity-100 group-hover:-inset-1.5 group-hover:duration-200 animate-tilt"></div>
                    <Link to="/live-pdf/app">
                        <Button size="lg" className="relative !bg-white !text-[#00CEC9] hover:!bg-slate-50 border-none px-12 py-5 text-xl font-bold rounded-2xl shadow-xl transition-all transform group-hover:scale-[1.02]">
                            {t('pdf.cta_btn')}
                        </Button>
                    </Link>
                </div>
           </div>
      </section>
    </div>
  );
};

export const LivePdfApp: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col bg-white">
      <iframe src="https://ezupsoft.com/pdf" title="Live PDF Tool" className="w-full flex-grow border-0" allowFullScreen />
    </div>
  );
};
