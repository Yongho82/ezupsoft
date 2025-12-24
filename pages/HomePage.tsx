
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { HeroSlider } from '../components/HeroSlider';
import { ASSETS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { TestimonialSlider } from '../components/TestimonialSlider';
import { CatchBento } from '../components/CatchBento';
import { LiveHtmlBento } from '../components/LiveHtmlBento';
import { LivePdfBento } from '../components/LivePdfBento';

export const HomePage: React.FC = () => {
   const { t } = useLanguage();
   const [activeBentoIndex, setActiveBentoIndex] = useState(0);
   const [isPaused, setIsPaused] = useState(false);
   const [progress, setProgress] = useState(0);

   // Bento Grid Data Configuration - Keys replaced
   const bentoSlides = [
      {
         id: 'html',
         themeColor: '#6C5CE7',
         gradient: 'from-[#6C5CE7] to-[#a363d9]',
         bgGlow: 'bg-purple-500/20',
         title: t('html.title'),
         tagline: t('home.bento.html_tagline'),
         desc: t('html.desc'),
         mainImage: ASSETS.PREVIEW_HTML,
         path: '/live-html',
         version: "v2.1",
         gridItems: [
            { label: t('home.bento.item_free'), sub: "100%", icon: "solar:check-circle-bold" },
            { label: t('home.bento.item_format'), sub: "HTML/PPT", icon: "solar:file-code-bold" },
            { label: t('home.bento.item_nocode'), sub: t('home.bento.item_dragdrop'), icon: "solar:cursor-bold" },
            { label: t('home.bento.item_export'), sub: t('home.bento.item_highres'), icon: "solar:download-square-bold" }
         ],
         features: [
            { title: t('html.ui_elements'), icon: "solar:bolt-circle-bold" },
            { title: t('html.smart_icons'), icon: "solar:palette-bold" },
         ]
      },
      {
         id: 'pdf',
         themeColor: '#00CEC9',
         gradient: 'from-[#00CEC9] to-[#00b5b0]',
         bgGlow: 'bg-cyan-500/20',
         title: t('pdf.title'),
         tagline: t('home.bento.pdf_tagline'),
         desc: t('pdf.desc'),
         mainImage: ASSETS.PREVIEW_PDF,
         path: '/live-pdf',
         version: "v1.5",
         gridItems: [
            { label: t('home.bento.item_privacy'), sub: t('home.bento.item_local'), icon: "solar:shield-check-bold" },
            { label: t('home.bento.item_limit'), sub: t('home.bento.item_unlimited'), icon: "solar:layers-bold" },
            { label: t('home.bento.item_convert'), sub: t('home.bento.item_any'), icon: "solar:file-text-bold" },
            { label: t('home.bento.item_merge'), sub: t('home.bento.item_dragsort'), icon: "solar:share-circle-bold" }
         ],
         features: [
            { title: t('pdf.bento.edit'), icon: "solar:magic-stick-3-bold" },
            { title: t('pdf.bento.security'), icon: "solar:lock-keyhole-bold" },
         ]
      },
      {
         id: 'catch',
         themeColor: '#F43F5E',
         gradient: 'from-[#F43F5E] to-[#e11d48]',
         bgGlow: 'bg-rose-500/20',
         title: t('catch.title'),
         tagline: t('home.bento.catch_tagline'),
         desc: t('catch.desc'),
         mainImage: ASSETS.PREVIEW_CATCH,
         path: '/catch-capture',
         version: "v3.0",
         gridItems: [
            { label: "OS", sub: "Windows", icon: "solar:monitor-play-bold" },
            { label: "Type", sub: "Native", icon: "solar:command-bold" },
            { label: t('home.bento.item_ocr'), sub: t('home.bento.item_aitext'), icon: "solar:code-bold" },
            { label: t('home.bento.item_scroll'), sub: t('home.bento.item_fullpage'), icon: "solar:arrow-right-bold" }
         ],
         features: [
            { title: "Record", icon: "solar:videocamera-record-bold" },
            { title: "Capture", icon: "solar:crop-minimalistic-bold" },
         ]
      }
   ];

   // Auto-slide Logic with Progress Bar
   useEffect(() => {
      let interval: any;
      let progressInterval: any;

      if (!isPaused) {
         setProgress(0);
         interval = setInterval(() => {
            setActiveBentoIndex((prev) => (prev + 1) % bentoSlides.length);
            setProgress(0);
         }, 4000);

         progressInterval = setInterval(() => {
            setProgress((prev) => Math.min(prev + (100 / (4000 / 50)), 100));
         }, 50);
      }

      return () => {
         clearInterval(interval);
         clearInterval(progressInterval);
      };
   }, [isPaused, bentoSlides.length]);

   const currentSlide = bentoSlides[activeBentoIndex];

   return (
      <div className="w-full pb-0 bg-[#050505]">

         {/* 1. Hero Slider */}
         <div className="w-full">
            <HeroSlider />
         </div>

         {/* 2. Premium Bento Grid Section */}
         <section
            className="w-full py-24 bg-[#050505] text-white overflow-hidden relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
         >
            {/* Background Ambient Glow */}
            <div className={`absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black via-black to-[#0a0a0a]`}></div>
            <div className={`absolute top-1/2 left-0 w-[800px] h-[800px] rounded-full blur-[150px] opacity-10 transition-colors duration-1000 -translate-y-1/2 -translate-x-1/4 ${currentSlide.bgGlow}`}></div>

            <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">

               <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-6">
                  <div>
                     <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
                        {t('home.core_tech')} <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentSlide.gradient} transition-all duration-700`}>{t('home.core_tech_suffix')}</span>
                     </h2>
                     <p className="text-slate-400 text-lg">{t('home.core_desc')}</p>
                  </div>

                  {/* Mini Buttons Navigation */}
                  <div className="flex gap-3 bg-white/5 p-2 rounded-full border border-white/10">
                     {bentoSlides.map((slide, idx) => {
                        const isActive = activeBentoIndex === idx;
                        return (
                           <button
                              key={slide.id}
                              onClick={() => { setActiveBentoIndex(idx); setIsPaused(true); }}
                              className={`relative px-6 py-3 rounded-full text-sm font-bold uppercase transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-500 hover:text-white'}`}
                           >
                              {isActive && (
                                 <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${slide.gradient} opacity-20`}></div>
                              )}
                              {slide.title}
                              {isActive && (
                                 <div className="absolute bottom-1 left-4 right-4 h-0.5 bg-white/30 rounded-full overflow-hidden">
                                    <div className="h-full bg-white" style={{ width: `${progress}%`, transition: 'width 50ms linear' }}></div>
                                 </div>
                              )}
                           </button>
                        );
                     })}
                  </div>
               </div>

               <div className="w-full">
                  {currentSlide.id === 'catch' ? (
                     <div key="catch-bento" className="animate-fade-in-up">
                        <CatchBento />
                     </div>
                  ) : currentSlide.id === 'html' ? (
                     <div key="html-bento" className="animate-fade-in-up">
                        <LiveHtmlBento />
                     </div>
                  ) : currentSlide.id === 'pdf' ? (
                     <div key="pdf-bento" className="animate-fade-in-up">
                        <LivePdfBento />
                     </div>
                  ) : (
                     <div key="other-bento" className="grid grid-cols-1 md:grid-cols-4 grid-rows-auto md:grid-rows-[200px_200px_100px_80px] gap-4 animate-fade-in-up">

                        {/* Main Image Card */}
                        <div className="col-span-1 md:col-span-2 md:row-span-3 relative overflow-hidden rounded-[32px] bg-[#0A0A0A] border border-white/10 group shadow-2xl">
                           <div className="absolute inset-0 bg-slate-900/50 z-10 group-hover:bg-slate-900/30 transition-colors duration-500"></div>
                           <img
                              src={currentSlide.mainImage}
                              alt="Preview"
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                           />

                           <div className="absolute top-6 left-6 z-20">
                              <div className={`px-4 py-2 rounded-full backdrop-blur-md bg-black/40 border border-white/10 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2`}>
                                 <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentSlide.gradient} animate-pulse`}></div>
                                 {t('common.live_preview')}
                              </div>
                           </div>

                           <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/90 to-transparent z-20 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              <div className="flex items-center justify-between gap-4">
                                 <div className="flex items-center gap-4">
                                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${currentSlide.gradient} text-white shadow-lg shadow-black/50`}>
                                       <Icon icon={currentSlide.id === 'html' ? "solar:code-bold" : "solar:file-text-bold"} width="24" />
                                    </div>
                                    <div>
                                       <p className="text-white font-bold text-xl">{currentSlide.title}</p>
                                       <p className="text-slate-300 text-sm">{currentSlide.tagline}</p>
                                    </div>
                                 </div>

                                 <NavLink to={currentSlide.path} className="hidden md:block">
                                    <button className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white hover:text-black transition-all duration-300 shadow-xl`}>
                                       {t('common.launch_app')} <Icon icon="solar:arrow-right-bold" width="16" />
                                    </button>
                                 </NavLink>
                              </div>
                           </div>
                        </div>

                        {/* Title Box */}
                        <div className="col-span-1 md:col-span-2 md:row-span-1 relative overflow-hidden rounded-[32px] bg-[#111] border border-white/10 p-8 flex flex-col justify-center group hover:bg-[#161616] transition-colors">
                           <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${currentSlide.gradient} opacity-20 rounded-full blur-[50px]`}></div>
                           <div className="relative z-10">
                              <div className="flex justify-between items-start mb-2">
                                 <h3 className="text-3xl font-black text-white">{currentSlide.tagline}</h3>
                                 <Icon icon="solar:arrow-right-bold" className={`text-slate-500 group-hover:text-white transition-colors duration-300`} />
                              </div>
                              <p className="text-slate-400 text-sm line-clamp-2 max-w-md">
                                 {currentSlide.desc}
                              </p>
                           </div>
                        </div>

                        {/* Feature Box 1 */}
                        <div className="col-span-1 md:row-span-1 relative overflow-hidden rounded-[24px] bg-[#111] border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-all group">
                           <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-colors`}>
                              <Icon icon={currentSlide.features[0].icon} width="20" />
                           </div>
                           <div>
                              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{t('common.feature')}</p>
                              <p className="text-white font-bold">{currentSlide.features[0].title}</p>
                           </div>
                        </div>

                        {/* Feature Box 2 */}
                        <div className="col-span-1 md:row-span-1 relative overflow-hidden rounded-[24px] bg-[#111] border border-white/10 p-6 flex flex-col justify-between hover:border-white/20 transition-all group">
                           <div className={`w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-white/10 transition-colors`}>
                              <Icon icon={currentSlide.features[1].icon} width="20" />
                           </div>
                           <div>
                              <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">{t('common.feature')}</p>
                              <p className="text-white font-bold">{currentSlide.features[1].title}</p>
                           </div>
                        </div>

                        {/* Small Version Info */}
                        <div className="col-span-1 md:col-span-2 md:row-span-1 grid grid-cols-2 gap-4">
                           <div className="rounded-[24px] bg-[#111] border border-white/10 p-5 flex items-center gap-4 hover:bg-white/5 transition-colors">
                              <div className={`text-transparent bg-clip-text bg-gradient-to-r ${currentSlide.gradient} font-black text-3xl`}>
                                 {currentSlide.version}
                              </div>
                              <div className="h-8 w-px bg-white/10"></div>
                              <div>
                                 <p className="text-xs text-slate-500 font-bold uppercase">{t('common.latest')}</p>
                                 <p className="text-white font-bold text-sm">{t('common.release')}</p>
                              </div>
                           </div>
                           <div className="rounded-[24px] bg-[#111] border border-white/10 p-5 flex items-center justify-between hover:bg-white/5 transition-colors group cursor-pointer">
                              <div>
                                 <p className="text-xs text-slate-500 font-bold uppercase mb-1">{t('common.status')}</p>
                                 <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                    <p className="text-white font-bold text-sm">{t('common.stable')}</p>
                                 </div>
                              </div>
                              <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all`}>
                                 <Icon icon="solar:maximize-square-bold" width="14" />
                              </div>
                           </div>
                        </div>

                        {/* Bottom Row Stats */}
                        <div className="col-span-1 md:col-span-4 md:row-span-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                           {currentSlide.gridItems.map((item, idx) => (
                              <div key={idx} className="rounded-[20px] bg-[#0F0F0F] border border-white/5 p-4 flex items-center gap-3 hover:bg-[#1a1a1a] transition-colors">
                                 <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400`}>
                                    <Icon icon={item.icon} width="16" />
                                 </div>
                                 <div>
                                    <p className="text-white font-bold text-sm">{item.label}</p>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-wide font-bold">{item.sub}</p>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}
               </div>


            </div>
         </section>

         <TestimonialSlider />

      </div>
   );
};
