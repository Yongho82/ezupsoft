
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
    <div className="w-full bg-white py-8">
      <style>
        {`
          @keyframes fillProgress { from { width: 0%; } to { width: 100%; } }
          .animate-progress { animation: fillProgress ${SLIDE_DURATION}ms linear forwards; }
        `}
      </style>

      <div className="w-[95%] max-w-[1440px] mx-auto px-4 sm:px-6">
        <div className="relative w-full h-[700px] rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-slate-900/10">

          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'} ${slide.bgClass}`}
            >
              <div className="absolute top-0 right-0 w-[900px] h-[900px] bg-white/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>

              <div className="absolute inset-0 flex items-center">
                <div className="w-full px-12 md:px-20 lg:px-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                  <div className="text-left z-20 pt-12 lg:pt-0">
                    {/* Title with animation */}
                    <div key={`title-${index}-${currentSlide === index}`} className={currentSlide === index ? "animate-fade-in-up" : ""}>
                      <h2 className="text-4xl lg:text-7xl font-black text-white leading-[1.1] mb-10 drop-shadow-xl tracking-tight">
                        {t(slide.titleKey)}
                      </h2>
                    </div>

                    {/* Description with delayed animation */}
                    <div key={`desc-${index}-${currentSlide === index}`} className={currentSlide === index ? "animate-fade-in-up [animation-delay:200ms] opacity-0 [animation-fill-mode:forwards]" : ""}>
                      <p className="text-xl text-white/90 mb-14 max-w-lg leading-relaxed font-medium drop-shadow-md">
                        {t(slide.descKey)}
                      </p>
                    </div>

                    {/* Button with more delayed animation */}
                    <NavLink to={slide.path} key={`btn-${index}-${currentSlide === index}`} className={`inline-block ${currentSlide === index ? "animate-fade-in-up [animation-delay:400ms] opacity-0 [animation-fill-mode:forwards]" : ""}`}>
                      <Button size="lg" className={`px-12 py-5 text-xl font-bold shadow-2xl border-none hover:scale-105 transition-all rounded-2xl ${slide.accentColor}`}>
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

          <div className="absolute bottom-12 left-12 md:left-20 lg:left-24 z-30">
            <div className="flex items-center gap-8 text-white font-medium select-none bg-black/30 backdrop-blur-xl px-8 py-4 rounded-full border border-white/10 shadow-2xl">
              <div className="flex items-center gap-5 text-base min-w-[120px]">
                <span className="font-bold text-2xl tracking-tighter">{currentSlide + 1}</span>
                <div className="flex-grow h-1.5 bg-white/20 relative overflow-hidden rounded-full">
                  {isPlaying && <div key={currentSlide} className="absolute inset-0 bg-white animate-progress"></div>}
                  {!isPlaying && <div className="absolute inset-0 bg-white w-full"></div>}
                </div>
                <span className="opacity-60 text-lg">{slides.length}</span>
              </div>
              <div className="w-px h-6 bg-white/20 mx-2"></div>
              <div className="flex items-center gap-3">
                <button onClick={prevSlide} className="p-2 hover:bg-white/20 rounded-full transition-colors active:scale-90"><ChevronLeft size={24} /></button>
                <button onClick={togglePlay} className="p-2 hover:bg-white/20 rounded-full transition-colors active:scale-90">{isPlaying ? <Pause size={22} /> : <Play size={22} />}</button>
                <button onClick={nextSlide} className="p-2 hover:bg-white/20 rounded-full transition-colors active:scale-90"><ChevronRight size={24} /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
