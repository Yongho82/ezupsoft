import React, { useState, useEffect } from 'react';
import { Star, Quote } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface Review {
  id: number;
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  product: string;
}

export const TestimonialSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useLanguage();

  const reviews: Review[] = [
    {
      id: 1,
      name: "Sarah Jenkins",
      role: t('testimonials.roles.frontend'),
      company: "TechFlow",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      content: t('testimonials.r1'),
      rating: 5,
      product: "HTML Studio"
    },
    {
      id: 2,
      name: "David Chen",
      role: t('testimonials.roles.pm'),
      company: "Nexus Sol",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      content: t('testimonials.r2'),
      rating: 5,
      product: "Catch Capture"
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: t('testimonials.roles.legal'),
      company: "Global Law",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop",
      content: t('testimonials.r3'),
      rating: 5,
      product: "PDF Tool"
    },
    {
      id: 4,
      name: "Michael Chang",
      role: t('testimonials.roles.ux'),
      company: "Creative Studio",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
      content: t('testimonials.r4'),
      rating: 4,
      product: "HTML Studio"
    },
    {
      id: 5,
      name: "Emily White",
      role: t('testimonials.roles.marketing'),
      company: "Growth.io",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      content: t('testimonials.r5'),
      rating: 5,
      product: "PDF Tool"
    },
    {
      id: 6,
      name: "James Wilson",
      role: t('testimonials.roles.freelancer'),
      company: "Self-Employed",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
      content: t('testimonials.r6'),
      rating: 5,
      product: "Catch Capture"
    },
    {
      id: 7,
      name: "Lisa Park",
      role: t('testimonials.roles.student'),
      company: "Design Univ",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
      content: t('testimonials.r7'),
      rating: 5,
      product: "PDF Tool"
    },
    {
      id: 8,
      name: "Robert Fox",
      role: t('testimonials.roles.qa'),
      company: "SoftSystems",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
      content: t('testimonials.r8'),
      rating: 4,
      product: "Catch Capture"
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (reviews.length / 2)); // Loop through sets
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, reviews.length]);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
           <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight whitespace-pre-line">
             {t('testimonials.title')}
           </h2>
           <p className="text-lg text-slate-500 max-w-2xl mx-auto">
             {t('testimonials.subtitle')}
           </p>
        </div>

        {/* Slider Track */}
        <div 
          className="relative w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Increased vertical padding (py-12 -my-12) to ensure shadows are not clipped */}
          <div className="relative overflow-hidden py-12 -my-12 px-4 -mx-4">
             <div 
               className="flex gap-6 md:gap-8 transition-transform duration-1000 ease-in-out"
               style={{ 
                 transform: `translateX(-${activeIndex * (100 / (window.innerWidth >= 1280 ? 4 : window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1))}%)` 
               }}
             >
                {/* We render reviews twice to handle loop smoothly if needed, but for simple request: */}
                {[...reviews, ...reviews].map((review, index) => (
                   <div 
                     key={`${review.id}-${index}`} 
                     className="flex-shrink-0 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-21px)] xl:w-[calc(25%-24px)]"
                   >
                      <div className="relative mt-10 pt-12 pb-8 px-4 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 h-full flex flex-col hover:-translate-y-2 transition-transform duration-300 group">
                         {/* Avatar */}
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                            <div className="w-20 h-20 rounded-full border-[6px] border-white shadow-lg overflow-hidden bg-slate-100 group-hover:scale-105 transition-transform">
                               <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                            </div>
                         </div>
                         
                         {/* Rating */}
                         <div className="flex justify-center gap-1 mb-6 text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-yellow-400" : "text-slate-200"} />
                            ))}
                         </div>

                         {/* Content */}
                         <div className="text-center flex-grow px-2">
                            <p className="text-slate-600 font-medium leading-relaxed italic mb-6 text-lg max-w-[90%] mx-auto">
                              "{review.content}"
                            </p>
                         </div>

                         {/* Footer */}
                         <div className="text-center pt-6 border-t border-slate-50 mt-auto">
                            <h4 className="text-slate-900 font-bold text-lg">{review.name}</h4>
                            <p className="text-slate-400 text-xs uppercase tracking-wider font-bold mt-1">
                              {review.role} @ {review.company}
                            </p>
                            <span className="inline-block mt-3 px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wide">
                               {review.product}
                            </span>
                         </div>
                      </div>
                   </div>
                ))}
             </div>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center gap-2 mt-20">
             {Array.from({ length: Math.ceil(reviews.length / 1) }).slice(0, 8).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeIndex % reviews.length === idx ? 'bg-[#6C5CE7] w-8' : 'bg-slate-300 hover:bg-slate-400'}`}
                />
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};
