
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from './Button';
import { useLanguage } from '../contexts/LanguageContext';
import { ASSETS } from '../constants';

const SLIDE_DURATION = 5000;

export const HeroSlider: React.FC = () => {
  const { t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides = [
    {
      id: 0,
      titleKey: 'html.title',
      descKey: 'html.desc',
      ctaKey: 'html.start_btn',
      path: '/live-html',
      image: ASSETS.SLIDE_HTML,
      bgClass: 'bg-gradient-to-r from-[#240b4c] to-[#6C5CE7]', 
      accentColor: 'bg-[#FF6B6B] text-white hover:bg-[#ff5252]',
    },
    {
      id: 1,
      titleKey: 'pdf.title',
      descKey: 'pdf.desc',
      ctaKey: 'pdf.start_btn',
      path: '/live-pdf',
      image: ASSETS.SLIDE_PDF,
      bgClass: 'bg-gradient-to-r from-[#004d40] to-[#00CEC9]', 
      accentColor: 'bg-[#FFD700] text-slate-900 hover:bg-[#ffca28]',
    },
    {
      id: 2,
      titleKey: 'catch.title',
      descKey: 'catch.desc',
      ctaKey: 'catch.download_btn',
      path: '/catch-capture',
      image: ASSETS.SLIDE_CATCH,
      bgClass: 'bg-gradient-to-r from-[#4a0404] to-[#B91C1C]', 
      accentColor: 'bg-slate-900 text-white hover:bg-black',
    },
  ];

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, SLIDE_DURATION);
    }
    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(false);
  };

  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="w-full bg-slate-50 pb-8 pt-0 -mt-1">
      <style>
        {`
          @keyframes fillProgress { from { width: 0%; } to { width: 100%; } }
          .animate-progress { animation: fillProgress ${SLIDE_DURATION}ms linear forwards; }
        `}
      </style>

      <div className="w-[95%] max-w-[1440px] mx-auto px-2 md:px-6">
        {/* Adjusted height for mobile: h-[500px] to lg:h-[700px] */}
        <div className="relative w-full h-[520px] lg:h-[700px] rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-slate-900/10 bg-slate-900">
          
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'} ${slide.bgClass}`}
            >
              <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
              
              <div className="absolute inset-0 flex items-center">
                 <div className="w-full px-6 md:px-20 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    
                    <div className="text-left z-20 pt-8 lg:pt-0">
                        {/* Responsive Typography */}
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 md:mb-10 drop-shadow-xl tracking-tight">
                            {t(slide.titleKey)}
                        </h2>
                        <p className="text-base md:text-xl text-white/90 mb-8 md:mb-14 max-w-lg leading-relaxed font-medium drop-shadow-md">
                            {t(slide.descKey)}
                        </p>
                        <NavLink to={slide.path}>
                            <Button size="lg" className={`w-full md:w-auto px-8 md:px-12 py-4 md:py-5 text-lg md:text-xl font-bold shadow-2xl border-none hover:scale-105 transition-all rounded-xl md:rounded-2xl ${slide.accentColor}`}>
                                {t(slide.ctaKey)}
                            </Button>
                        </NavLink>
                    </div>

                    <div className="hidden lg:block relative z-20 perspective-1000 h-full flex items-center justify-end">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[8px] border-white/10 transform rotate-y-[-8deg] rotate-x-[3deg] hover:rotate-0 transition-transform duration-700 ease-out bg-slate-900 aspect-[16/10] w-full max-w-4xl xl:max-w-5xl origin-right">
                            <img src={slide.image} alt="Preview" className="w-full h-full object-cover opacity-95" />
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                 </div>
              </div>
            </div>
          ))}

          <div className="absolute bottom-6 md:bottom-12 left-6 md:left-20 lg:left-24 z-30">
             <div className="flex items-center gap-4 md:gap-8 text-white font-medium select-none bg-black/30 backdrop-blur-xl px-4 md:px-8 py-2 md:py-4 rounded-full border border-white/10 shadow-2xl scale-90 md:scale-100 origin-bottom-left">
                <div className="flex items-center gap-3 md:gap-5 text-base min-w-[100px] md:min-w-[120px]">
                   <span className="font-bold text-xl md:text-2xl tracking-tighter">{currentSlide + 1}</span>
                   <div className="flex-grow h-1.5 bg-white/20 relative overflow-hidden rounded-full">
                       {isPlaying && <div key={currentSlide} className="absolute inset-0 bg-white animate-progress"></div>}
                       {!isPlaying && <div className="absolute inset-0 bg-white w-full"></div>}
                   </div>
                   <span className="opacity-60 text-base md:text-lg">{slides.length}</span>
                </div>
                <div className="w-px h-6 bg-white/20 mx-1 md:mx-2"></div>
                <div className="flex items-center gap-2 md:gap-3">
                   <button onClick={prevSlide} className="p-1.5 md:p-2 hover:bg-white/20 rounded-full transition-colors active:scale-90"><ChevronLeft size={20} /></button>
                   <button onClick={togglePlay} className="p-1.5 md:p-2 hover:bg-white/20 rounded-full transition-colors active:scale-90">{isPlaying ? <Pause size={18} /> : <Play size={18} />}</button>
                   <button onClick={nextSlide} className="p-1.5 md:p-2 hover:bg-white/20 rounded-full transition-colors active:scale-90"><ChevronRight size={20} /></button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
