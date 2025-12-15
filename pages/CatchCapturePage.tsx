
import React, { useState } from 'react';
import { Crop, Monitor, HelpCircle, ChevronDown, ChevronUp, Download, ShieldCheck, Timer, Zap, Layers, Maximize2, AppWindow, MousePointerClick, ArrowDownToLine, Video, ScanText } from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { ASSETS } from '../constants';
import { Link } from 'react-router-dom';

const FeatureItem: React.FC<{ imageUrl: string; title: string; desc: string }> = ({ imageUrl, title, desc }) => (
  <div className="flex flex-col rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group h-full">
    <div className="h-56 overflow-hidden bg-slate-100">
       <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    </div>
    <div className="p-8">
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{desc}</p>
    </div>
  </div>
);

const TechMarquee: React.FC = () => {
    const { t } = useLanguage();
    
    // Icons mapped to the 11 features from the request
    const techItems = [
        { icon: Crop, label: 'Area' },              // 영역 캡처
        { icon: Timer, label: 'Delay' },            // 지연 캡처
        { icon: Zap, label: 'Instant' },            // 순간 캡처
        { icon: Layers, label: 'Multi' },           // 멀티 캡처
        { icon: Maximize2, label: 'Full Screen' },  // 전체화면
        { icon: AppWindow, label: 'Window' },       // 지정/창 캡처
        { icon: Monitor, label: 'Monitor' },        // 창 캡처 (General)
        { icon: MousePointerClick, label: 'Unit' }, // 단위 캡처
        { icon: ArrowDownToLine, label: 'Scroll' }, // 스크롤 캡처
        { icon: Video, label: 'Record' },           // 화면 녹화
        { icon: ScanText, label: 'OCR' }            // OCR 캡처
    ];

    const scrollItems = [...techItems, ...techItems, ...techItems];

    return (
        <div className="w-full bg-indigo-600 py-6 overflow-hidden relative">
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
                    ALL-IN-ONE CAPTURE SUITE
                </p>
                <h2 className="text-xl md:text-2xl font-bold text-white max-w-2xl mx-auto leading-relaxed mb-1">
                    {t('catch.tech_tagline')}
                </h2>
                <p className="text-white/80 text-xs max-w-xl mx-auto font-medium leading-relaxed">
                    {t('catch.security_promise')}
                </p>
            </div>

            <div className="relative">
                <div className="animate-marquee flex gap-16 items-center">
                    {scrollItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-white/40 grayscale hover:grayscale-0 hover:text-white transition-all duration-300">
                            <item.icon size={28} />
                            <span className="text-base font-black italic tracking-tighter opacity-20 uppercase whitespace-nowrap">{item.label}</span>
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-indigo-600 via-transparent to-indigo-600" />
            </div>
        </div>
    );
};

const FAQBoard: React.FC = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState(0);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const faqData = [
        {
            category: t('faq.catch.cat1'),
            items: [
                { q: t('faq.catch.q1'), a: t('faq.catch.a1') },
                { q: t('faq.catch.q2'), a: t('faq.catch.a2') },
                { q: t('faq.catch.q3'), a: t('faq.catch.a3') },
                { q: t('faq.catch.q4'), a: t('faq.catch.a4') },
                { q: t('faq.catch.q5'), a: t('faq.catch.a5') }
            ]
        },
        {
            category: t('faq.catch.cat2'),
            items: [
                { q: t('faq.catch.q6'), a: t('faq.catch.a6') },
                { q: t('faq.catch.q7'), a: t('faq.catch.a7') },
                { q: t('faq.catch.q8'), a: t('faq.catch.a8') },
                { q: t('faq.catch.q9'), a: t('faq.catch.a9') },
                { q: t('faq.catch.q10'), a: t('faq.catch.a10') }
            ]
        }
    ];

    const toggleItem = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
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
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                            activeTab === idx 
                            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-200 ring-offset-2' 
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
                                <span className={`flex-shrink-0 font-bold text-lg ${openIndex === idx ? 'text-indigo-600' : 'text-slate-400'}`}>
                                    Q.
                                </span>
                                <span className={`text-base md:text-lg font-bold transition-colors ${openIndex === idx ? 'text-indigo-600' : 'text-slate-900'}`}>
                                    {item.q}
                                </span>
                            </div>
                            {openIndex === idx ? <ChevronUp className="text-indigo-600 shrink-0 mt-1" size={20} /> : <ChevronDown className="text-slate-400 shrink-0 mt-1" size={20} />}
                        </button>
                        <div 
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-6 pb-6 pl-14 pr-8">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                    <span className="font-bold text-indigo-600 mr-2">A.</span>
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="mt-8 text-center">
                 <p className="text-sm text-slate-400">
                    <Link to="/contact" className="text-indigo-600 font-bold hover:underline">{t('nav.contact')}</Link>
                 </p>
            </div>
        </div>
    );
};

export const CatchCapturePage: React.FC = () => {
  const { t } = useLanguage();

  const features = [
    {
        imageUrl: ASSETS.THUMB_DEV,
        title: t('catch.feat_precision'),
        desc: t('catch.feat_precision_desc')
    },
    {
        imageUrl: ASSETS.PREVIEW_HTML,
        title: t('catch.feat_advanced'),
        desc: t('catch.feat_advanced_desc')
    },
    {
        imageUrl: ASSETS.THUMB_DESIGN,
        title: t('catch.feat_edit'),
        desc: t('catch.feat_edit_desc')
    },
    {
        imageUrl: ASSETS.THUMB_PROD,
        title: t('catch.feat_smart'),
        desc: t('catch.feat_smart_desc')
    },
    {
        imageUrl: ASSETS.PREVIEW_PDF,
        title: t('catch.feat_pro'),
        desc: t('catch.feat_pro_desc')
    },
    {
        imageUrl: ASSETS.SLIDE_CATCH,
        title: t('catch.feat_user'),
        desc: t('catch.feat_user_desc')
    }
  ];

  return (
    <div className="w-full overflow-hidden bg-white">
      {/* 1. Hero Section - Reduced padding from pt-24 pb-16 to pt-20 pb-16 */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-slate-50">
         
         <div className="absolute inset-0 w-full h-full pointer-events-none">
             <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
             <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
             <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
         </div>

         <div className="absolute inset-0 overflow-hidden pointer-events-none">
             <div className="absolute top-32 left-[5%] text-indigo-300 animate-float" style={{ animationDelay: '0s' }}>
                <Crop size={100} className="opacity-40 transform -rotate-12" />
             </div>
             <div className="absolute bottom-40 right-[10%] text-rose-300 animate-float" style={{ animationDelay: '2s' }}>
                <ScanText size={80} className="opacity-40 transform rotate-12" />
             </div>
             <div className="absolute top-1/4 right-1/4 w-32 h-20 border-2 border-dashed border-indigo-300/50 rounded-lg animate-pulse"></div>
         </div>

         <div className="max-w-[1600px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
            {/* Left Content (Text) */}
            <div className="lg:col-span-5 space-y-10 text-left lg:pl-16">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 text-indigo-600 text-sm font-bold shadow-sm animate-fade-in-up opacity-0">
                    <Crop size={16} /> {t('catch.badge')}
                </div>
                {/* REDUCED TEXT SIZE: text-4xl -> text-3xl, lg:text-6xl -> lg:text-5xl */}
                <h1 className="text-3xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-snug animate-fade-in-up opacity-0" style={{ animationDelay: '0.1s' }}>
                    {t('catch.title')}
                </h1>
                {/* REDUCED TEXT SIZE: text-lg -> text-base */}
                <p className="text-base text-slate-500 leading-relaxed max-w-lg animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
                    {t('catch.desc')}
                </p>
                <div className="flex flex-col sm:flex-row gap-5 pt-4 animate-fade-in-up opacity-0" style={{ animationDelay: '0.3s' }}>
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 text-lg h-16 px-10 rounded-2xl">
                        <Download className="mr-3" size={24} />
                        {t('catch.download_btn')}
                    </Button>
                </div>
                <div className="flex gap-8 text-sm text-slate-400 font-semibold animate-fade-in-up opacity-0" style={{ animationDelay: '0.4s' }}>
                    <span className="flex items-center gap-2 uppercase tracking-wide"><Monitor size={16} /> Windows 10/11</span>
                    <span className="flex items-center gap-2 uppercase tracking-wide"><ShieldCheck size={16} /> Professional Grade</span>
                </div>
            </div>

            {/* Right Content (Image) */}
            <div className="lg:col-span-7 relative animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s' }}>
                <div className="absolute -inset-8 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl border-4 border-white overflow-hidden group">
                     <img 
                       src={ASSETS.PREVIEW_CATCH} 
                       alt={t('catch.preview_alt')} 
                       className="w-full h-[395px] object-cover" 
                     />
                </div>
            </div>
         </div>
      </section>

      <TechMarquee />

      <section className="max-w-7xl mx-auto px-4 pt-24 pb-12 text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">{t('catch.feat_title')}</h2>
          <p className="text-lg text-slate-500 max-w-3xl mx-auto">{t('catch.feat_subtitle')}</p>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {features.map((feat, idx) => (
                  <FeatureItem key={idx} {...feat} />
              ))}
          </div>
      </section>

      <section className="bg-slate-50 py-32">
          <div className="max-w-7xl mx-auto px-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                  <div className="order-2 lg:order-1 relative">
                      <div className="bg-white rounded-[2rem] p-4 shadow-2xl border border-slate-200 relative z-10 overflow-hidden aspect-[16/10]">
                           <img src={ASSETS.THUMB_PROD} alt="Editor Preview" className="rounded-xl w-full h-full object-cover" />
                      </div>
                      <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl z-0"></div>
                  </div>
                  <div className="order-1 lg:order-2 space-y-8 text-left">
                      <h2 className="text-3xl font-bold text-slate-900 leading-tight">{t('catch.flow_title')}</h2>
                      <div className="space-y-6">
                          <div className="flex gap-5">
                              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-indigo-200">1</div>
                              <p className="text-slate-600 leading-relaxed text-lg font-medium">{t('catch.flow_1')}</p>
                          </div>
                          <div className="flex gap-5">
                              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-indigo-200">2</div>
                              <p className="text-slate-600 leading-relaxed text-lg font-medium">{t('catch.flow_2')}</p>
                          </div>
                          <div className="flex gap-5">
                              <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-indigo-200">3</div>
                              <p className="text-slate-600 leading-relaxed text-lg font-medium">{t('catch.flow_3')}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <section className="bg-slate-50/50 py-24">
          <FAQBoard />
      </section>

      <section className="relative py-20 overflow-hidden bg-[#6C5CE7] isolate">
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

           <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7] via-[#5D3FD3] to-[#4834d4] z-0"></div>
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 z-0 pointer-events-none"></div>

           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 opacity-60">
               <div className="absolute inset-0 rounded-full border-2 border-white/20 border-dashed" style={{ animation: 'spin-cw 60s linear infinite' }}></div>
               <div className="absolute inset-[80px] rounded-full border-2 border-white/30" style={{ animation: 'spin-ccw 40s linear infinite' }}></div>
               <div className="absolute inset-[160px] rounded-full border-4 border-white/10" style={{ animation: 'spin-cw 20s linear infinite' }}></div>
               <div className="absolute inset-0" style={{ animation: 'spin-cw 25s linear infinite' }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-6 h-6 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]"></div>
               </div>
           </div>
           
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 mix-blend-screen animate-blob"></div>
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 mix-blend-screen animate-blob animation-delay-2000"></div>

           <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
                    {t('catch.cta_title')}
                </h2>
                <p className="text-xl text-purple-100 mb-12 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg opacity-90">
                    {t('catch.cta_desc')}
                </p>
                
                <div className="relative inline-flex group">
                    <div className="absolute transition-all duration-1000 opacity-70 -inset-1 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-2xl blur-lg group-hover:opacity-100 group-hover:-inset-1.5 group-hover:duration-200 animate-tilt"></div>
                    <Button size="lg" className="relative !bg-white !text-[#6C5CE7] hover:!bg-slate-50 border-none px-12 py-5 text-xl font-bold rounded-2xl shadow-2xl transition-all transform group-hover:scale-[1.02] flex items-center gap-3">
                        {t('catch.cta_btn')}
                    </Button>
                </div>
           </div>
      </section>
    </div>
  );
};
