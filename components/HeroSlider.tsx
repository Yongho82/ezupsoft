
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
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
      accentColor: 'bg-[#FF6B6B] text-white hover:bg-[#ff5252]',
    },
    {
      id: 1,
      titleKey: 'pdf.title',
      descKey: 'pdf.desc',
      ctaKey: 'pdf.start_btn',
      path: '/live-pdf',
      image: ASSETS.SLIDE_PDF,
      accentColor: 'bg-[#FFD700] text-slate-900 hover:bg-[#ffca28]',
    },
    {
      id: 2,
      titleKey: 'catch.title',
      descKey: 'catch.desc',
      ctaKey: 'catch.download_btn',
      path: '/catch-capture',
      image: ASSETS.SLIDE_CATCH,
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
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <style>
        {`
          @keyframes fillProgress { from { width: 0%; } to { width: 100%; } }
          .animate-progress { animation: fillProgress ${SLIDE_DURATION}ms linear forwards; }
        `}
      </style>

      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-50 blur-[3px] scale-110"
        >
          <source src="https://ezupsoft.com/img/main_hero.webm" type="video/webm" />
        </video>
      </div>

      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-black/50 z-0 pointer-events-none"></div>

      {/* Content Container */}
      <div className="relative w-full h-full z-10">
        <div className="max-w-[1440px] mx-auto h-full relative">

          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full flex items-center transition-opacity duration-700 ease-in-out px-8 sm:px-12 md:px-16 lg:px-20 ${index === currentSlide ? 'opacity-100 z-20 pointer-events-auto' : 'opacity-0 z-10 pointer-events-none'}`}
            >
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                {/* Text Content */}
                <div className="text-left pt-20 lg:pt-0 max-w-2xl">
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-6 md:mb-10 drop-shadow-2xl tracking-tight animate-fade-in-up">
                    {t(slide.titleKey)}
                  </h2>
                  <p className="text-lg md:text-2xl text-white/90 mb-8 md:mb-14 max-w-xl leading-relaxed font-medium drop-shadow-lg animate-fade-in-up">
                    {t(slide.descKey)}
                  </p>
                  <div className="animate-fade-in-up">
                    <NavLink to={slide.path}>
                      <Button size="lg" className={`w-full md:w-auto px-10 md:px-14 py-4 md:py-5 text-lg md:text-xl font-bold shadow-2xl border-none hover:scale-105 transition-all rounded-2xl ${slide.accentColor}`}>
                        {t(slide.ctaKey)}
                      </Button>
                    </NavLink>
                  </div>
                </div>

                {/* Image Content (3D Card) */}
                <div className="hidden lg:block relative perspective-1000 flex items-center justify-end animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border-[8px] border-white/20 transform rotate-y-[-8deg] rotate-x-[3deg] hover:rotate-0 transition-transform duration-700 ease-out aspect-[16/10] w-full max-w-4xl origin-right backdrop-blur-sm bg-white/5">
                    <img src={slide.image} alt="Preview" className="w-full h-full object-cover opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Controls */}
          <div className="absolute bottom-12 left-8 sm:left-12 md:left-16 lg:left-20 z-30">
            <div className="flex items-center gap-6 text-white font-medium select-none bg-black/20 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10 shadow-2xl">
              <div className="flex items-center gap-4 text-base min-w-[120px]">
                <span className="font-bold text-xl tracking-tighter">{currentSlide + 1}</span>
                <div className="flex-grow h-1 bg-white/20 relative overflow-hidden rounded-full">
                  {isPlaying && <div key={currentSlide} className="absolute inset-0 bg-white animate-progress"></div>}
                  {!isPlaying && <div className="absolute inset-0 bg-white w-full"></div>}
                </div>
                <span className="opacity-60 text-lg">{slides.length}</span>
              </div>
              <div className="w-px h-6 bg-white/20 mx-2"></div>
              <div className="flex items-center gap-3">
                <button onClick={prevSlide} className="p-2 hover:bg-white/20 rounded-full transition-colors active:scale-90"><Icon icon="solar:alt-arrow-left-bold" width="20" /></button>
                <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-full transition-colors active:scale-90">{isPlaying ? <Icon icon="solar:pause-circle-bold" width="18" /> : <Icon icon="solar:play-circle-bold" width="18" />}</button>
                <button onClick={nextSlide} className="p-2 hover:bg-white/20 rounded-full transition-colors active:scale-90"><Icon icon="solar:alt-arrow-right-bold" width="20" /></button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
