
import React, { useState } from 'react';
import { Zap, ShieldCheck, HeartHandshake, ArrowRight, Layers, MousePointer2, Code2, Lock, Crop, FileCode, FileText, Monitor, Cpu, FileType, LayoutTemplate } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { Button } from '../components/Button';
import { HeroSlider } from '../components/HeroSlider';
import { ScrollReveal } from '../components/ScrollReveal';
import { TOOLS, ASSETS } from '../constants';
import { useLanguage } from '../contexts/LanguageContext';
import { TestimonialSlider } from '../components/TestimonialSlider';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const [activeProduct, setActiveProduct] = useState<'html' | 'pdf' | 'catch'>('html');

  // Product Data for the new Line-up Section
  const productData = {
    html: {
      id: 'html',
      label: t('home.product_html_label'),
      subLabel: t('home.product_html_sub'),
      title: t('home.product_html_title'),
      desc: t('home.product_html_desc'),
      image: ASSETS.PREVIEW_HTML,
      path: '/live-html',
      icons: [
        { icon: Code2, label: 'HTML5' },
        { icon: FileCode, label: 'CSS3' },
        { icon: LayoutTemplate, label: 'React' }
      ]
    },
    pdf: {
      id: 'pdf',
      label: t('home.product_pdf_label'),
      subLabel: t('home.product_pdf_sub'),
      title: t('home.product_pdf_title'),
      desc: t('home.product_pdf_desc'),
      image: ASSETS.PREVIEW_PDF,
      path: '/live-pdf',
      icons: [
        { icon: Lock, label: '256-bit' },
        { icon: FileText, label: 'PDF/A' },
        { icon: FileType, label: 'Word' }
      ]
    },
    catch: {
      id: 'catch',
      label: t('home.product_catch_label'),
      subLabel: t('home.product_catch_sub'),
      title: t('home.product_catch_title'),
      desc: t('home.product_catch_desc'),
      image: ASSETS.PREVIEW_CATCH,
      path: '/catch-capture',
      icons: [
        { icon: Monitor, label: 'Win 11' },
        { icon: Crop, label: 'OCR' },
        { icon: Cpu, label: 'AI' }
      ]
    }
  };

  const currentProduct = productData[activeProduct];

  return (
    <div className="w-full pb-0 bg-white">
      
      {/* 1. Hero Slider */}
      <div className="w-full">
        <HeroSlider />
      </div>

      {/* 2. Product Line-up Section (Full Page Experience) */}
      <section className="w-full min-h-[auto] lg:min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-50 relative py-12 lg:py-20">
           {/* Background Diagonal Shape */}
           <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <div className="w-[200%] h-[100%] bg-white -rotate-6 transform translate-y-32 shadow-sm origin-center"></div>
           </div>

           <div className="relative z-10 w-full max-w-[1600px] mx-auto px-4 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full">
              
              {/* Left Column: Navigation */}
              <div className="lg:col-span-3 space-y-8 lg:space-y-16 pl-2 lg:pl-8">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-6 lg:mb-10 border-l-4 border-[#6C5CE7] pl-3">{t('home.lineup_header')}</h3>
                    <div className="space-y-4 lg:space-y-6 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 items-center lg:items-start gap-6 lg:gap-0">
                        {Object.values(productData).map((prod) => (
                           <button 
                             key={prod.id}
                             onClick={() => setActiveProduct(prod.id as any)}
                             className={`text-xl md:text-2xl lg:text-4xl font-bold transition-all duration-300 text-left leading-tight whitespace-nowrap ${
                               activeProduct === prod.id 
                               ? 'text-[#6C5CE7] lg:translate-x-4' 
                               : 'text-slate-300 hover:text-slate-400'
                             }`}
                           >
                              {prod.label}
                           </button>
                        ))}
                    </div>
                  </div>
                  
                  {/* Category Indicator */}
                  <div className="hidden lg:block pt-4">
                     <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                        {t('home.category_prefix')} <span className="text-slate-600">{currentProduct.subLabel}</span>
                     </p>
                  </div>
              </div>

              {/* Center Column: Image & Icons */}
              <div className="lg:col-span-6 relative h-[300px] md:h-[400px] lg:h-[60vh] min-h-[300px] lg:min-h-[500px] flex items-center justify-center group w-full p-4 lg:p-12">
                   {/* Supported Symbols (Moved to Top Right, Non-overlapping) */}
                   <div className="absolute top-0 right-0 z-20 flex gap-2 lg:gap-3 animate-fade-in-up">
                       {currentProduct.icons.map((item, idx) => (
                          <div key={idx} className="w-10 h-10 lg:w-14 lg:h-14 bg-[#FF4757] text-white flex items-center justify-center shadow-xl transform hover:-translate-y-1 transition-transform duration-300 rounded-lg">
                             <item.icon size={20} className="lg:w-[26px] lg:h-[26px]" strokeWidth={2} />
                          </div>
                       ))}
                   </div>

                   {/* Main Image */}
                   <img 
                      key={currentProduct.id}
                      src={currentProduct.image} 
                      alt={currentProduct.label} 
                      className="w-full h-full object-contain drop-shadow-2xl transform transition-transform duration-700 ease-out group-hover:scale-105"
                   />
              </div>

              {/* Right Column: Details & Link */}
              <div className="lg:col-span-3 flex flex-col justify-center h-full text-center lg:text-right pr-2 lg:pr-8 space-y-6 lg:space-y-12">
                  <div className="space-y-3 lg:space-y-4">
                      <h4 className="text-xl lg:text-2xl font-bold text-slate-900 uppercase tracking-tight">{currentProduct.title}</h4>
                      <p className="text-slate-500 font-medium text-base lg:text-lg leading-relaxed">{currentProduct.desc}</p>
                  </div>
                  
                  {/* Sub-list (Visual Decoration) */}
                  <div className="hidden lg:flex flex-col gap-3 items-end text-base font-bold text-slate-300">
                      {Object.values(productData).filter(p => p.id !== activeProduct).map(p => (
                          <span key={p.id} className="hover:text-slate-400 transition-colors cursor-default">{p.title}</span>
                      ))}
                  </div>

                  <div className="flex justify-center lg:justify-end pt-4">
                      <NavLink to={currentProduct.path}>
                          <button className="flex items-center gap-3 text-slate-900 font-bold text-base lg:text-lg hover:text-[#6C5CE7] transition-all group bg-white border border-slate-200 px-6 py-3 rounded-full hover:shadow-lg hover:border-[#6C5CE7]">
                              {t('home.read_more')} 
                              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                          </button>
                      </NavLink>
                  </div>
              </div>

           </div>
      </section>

      {/* 3. Features Sections */}
      <div className="w-full mt-12 lg:mt-24">
          
        {/* Feature 1: HTML Studio - Light Theme */}
        <section className="w-full py-12 lg:py-20 bg-white border-t border-slate-100 overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <ScrollReveal direction="left" className="w-full">
              {/* Changed Grid to 12 columns for wider image (5 col text / 7 col image) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-center">
                  <div className="order-2 lg:order-1 lg:col-span-5 space-y-6 lg:space-y-8 lg:pl-10 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-50 text-[#6C5CE7] text-sm font-bold uppercase tracking-wide">
                        <Code2 size={16} /> {t('home.feat_html_badge')}
                      </div>
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                          {t('home.feat_html_title')}
                      </h2>
                      <p className="text-base lg:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                          {t('home.feat_html_desc')}
                      </p>
                      <div className="flex flex-col gap-3 lg:gap-4 pt-4 items-center lg:items-start">
                          <span className="flex items-center gap-4 text-slate-700 font-bold text-base lg:text-lg"><Layers className="text-[#6C5CE7]" size={24}/> {t('home.feat_html_item1')}</span>
                          <span className="flex items-center gap-4 text-slate-700 font-bold text-base lg:text-lg"><MousePointer2 className="text-[#6C5CE7]" size={24}/> {t('home.feat_html_item2')}</span>
                      </div>
                      <div className="pt-6 lg:pt-8">
                        <NavLink to="/live-html">
                            <Button variant="outline" size="lg" className="gap-3 px-8 lg:px-10 py-3 lg:py-4 text-base lg:text-lg border-2 border-[#6C5CE7] text-[#6C5CE7] hover:bg-[#6C5CE7] hover:text-white rounded-full">
                                {t('home.feat_html_btn')} <ArrowRight size={20}/>
                            </Button>
                        </NavLink>
                      </div>
                  </div>
                  <div className="order-1 lg:order-2 lg:col-span-7">
                      {/* Straightened Image with slight hover lift */}
                      <div className="relative group rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-purple-200/50 border-[4px] lg:border-[8px] border-slate-900/5 hover:-translate-y-2 transition-all duration-500 ease-out">
                          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity duration-500" />
                          <img 
                            src={ASSETS.PREVIEW_HTML} 
                            alt="HTML Studio" 
                            className="w-full h-[250px] md:h-[380px] object-cover" 
                          />
                      </div>
                  </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Feature 2: PDF Tool - Light Theme (Slate-50) */}
        <section className="w-full py-12 lg:py-20 bg-slate-50 relative overflow-hidden">
           {/* Adjusted Background Decorations for Light Theme */}
           <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-cyan-100/50 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
           <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-purple-100/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

          <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative z-10">
            <ScrollReveal direction="right" className="w-full">
              {/* Changed Grid to 12 columns for wider image (7 col image / 5 col text) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-center">
                  <div className="lg:col-span-7">
                       {/* Straightened Image with slight hover lift */}
                       <div className="relative group rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-cyan-900/10 border-[4px] lg:border-[8px] border-slate-900/5 hover:-translate-y-2 transition-all duration-500 ease-out">
                           <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 blur opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                           <img 
                             src={ASSETS.PREVIEW_PDF} 
                             alt="PDF Tool" 
                             className="relative w-full h-[250px] md:h-[380px] object-cover" 
                           />
                       </div>
                  </div>
                  <div className="lg:col-span-5 space-y-6 lg:space-y-8 lg:pr-10 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-50 text-[#00CEC9] border border-cyan-100 text-sm font-bold uppercase tracking-wide">
                        <Lock size={16} /> {t('home.feat_pdf_badge')}
                      </div>
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                          {t('home.feat_pdf_title')}
                      </h2>
                      <p className="text-base lg:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                          {t('home.feat_pdf_desc')}
                      </p>
                      <div className="flex flex-col gap-3 lg:gap-4 pt-4 items-center lg:items-start">
                          <span className="flex items-center gap-4 text-slate-700 font-bold text-base lg:text-lg"><ShieldCheck className="text-[#00CEC9]" size={24}/> {t('home.feat_pdf_item1')}</span>
                          <span className="flex items-center gap-4 text-slate-700 font-bold text-base lg:text-lg"><Zap className="text-[#00CEC9]" size={24}/> {t('home.feat_pdf_item2')}</span>
                      </div>
                      <div className="pt-6 lg:pt-8">
                        <NavLink to="/live-pdf">
                            <Button variant="primary" size="lg" className="gap-3 px-8 lg:px-10 py-3 lg:py-4 text-base lg:text-lg bg-[#00CEC9] hover:bg-[#00b5b0] text-white shadow-lg shadow-cyan-500/20 rounded-full">
                                {t('home.feat_pdf_btn')} <ArrowRight size={20}/>
                            </Button>
                        </NavLink>
                      </div>
                  </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Feature 3: Catch Capture - White Theme */}
        <section className="w-full py-12 lg:py-20 bg-white border-t border-slate-100 overflow-hidden">
          <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
            <ScrollReveal direction="left" className="w-full">
              {/* Changed Grid to 12 columns for wider image (5 col text / 7 col image) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-24 items-center">
                  <div className="order-2 lg:order-1 lg:col-span-5 space-y-6 lg:space-y-8 lg:pl-10 text-center lg:text-left">
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 text-rose-500 text-sm font-bold uppercase tracking-wide">
                        <Crop size={16} /> {t('home.feat_catch_badge')}
                      </div>
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                          {t('home.feat_catch_title')}
                      </h2>
                      <p className="text-base lg:text-lg text-slate-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                          {t('home.feat_catch_desc')}
                      </p>
                      <div className="flex flex-col gap-3 lg:gap-4 pt-4 items-center lg:items-start">
                          <span className="flex items-center gap-4 text-slate-700 font-bold text-base lg:text-lg"><Layers className="text-rose-500" size={24}/> {t('home.feat_catch_item1')}</span>
                          <span className="flex items-center gap-4 text-slate-700 font-bold text-base lg:text-lg"><Code2 className="text-rose-500" size={24}/> {t('home.feat_catch_item2')}</span>
                      </div>
                      <div className="pt-6 lg:pt-8">
                        <NavLink to="/catch-capture">
                            <Button variant="outline" size="lg" className="gap-3 px-8 lg:px-10 py-3 lg:py-4 text-base lg:text-lg border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white rounded-full">
                                {t('home.feat_catch_btn')} <ArrowRight size={20}/>
                            </Button>
                        </NavLink>
                      </div>
                  </div>
                  <div className="order-1 lg:order-2 lg:col-span-7">
                      {/* Straightened Image with slight hover lift */}
                      <div className="relative group rounded-2xl lg:rounded-3xl overflow-hidden shadow-2xl shadow-rose-200/50 border-[4px] lg:border-[8px] border-slate-900/5 hover:-translate-y-2 transition-all duration-500 ease-out">
                          <img 
                            src={ASSETS.PREVIEW_CATCH} 
                            alt="Catch Capture" 
                            className="w-full h-[250px] md:h-[380px] object-cover" 
                          />
                      </div>
                  </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

      </div>

      {/* 4. Testimonials Section (New) */}
      <TestimonialSlider />

    </div>
  );
};
