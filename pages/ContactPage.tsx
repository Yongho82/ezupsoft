
import React, { useState } from 'react';
import { Send, CheckCircle, Mail, Clock, MessageSquare } from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to backend (GNUBOARD or other service)
    setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
    }, 1200);
  };

  if (submitted) {
    return (
      <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-white px-4">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-fade-in-up">
          <CheckCircle className="text-green-500" size={48} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {t('contact.success_title')}
        </h2>
        <p className="text-slate-500 mb-8 text-center max-w-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {t('contact.success_desc')}
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline" className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-slate-50 pb-20">
      
      {/* Header */}
      <div className="bg-[#6C5CE7] py-20 px-4 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 blur-[80px] animate-blob" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-900 opacity-20 blur-[80px] animate-blob animation-delay-2000" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold mb-4">{t('contact.title')}</h1>
              <p className="text-purple-100 text-lg md:text-xl font-medium">{t('contact.subtitle')}</p>
          </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Contact Info Cards */}
              <div className="lg:col-span-1 space-y-6">
                  <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="w-12 h-12 bg-purple-50 text-[#6C5CE7] rounded-xl flex items-center justify-center mb-4">
                          <Mail size={24} />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">{t('contact.info_email')}</h3>
                      <p className="text-slate-500 font-medium text-sm">support@ezup.com</p>
                  </div>

                  <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                      <div className="w-12 h-12 bg-teal-50 text-teal-500 rounded-xl flex items-center justify-center mb-4">
                          <Clock size={24} />
                      </div>
                      <h3 className="font-bold text-slate-900 text-lg mb-1">{t('contact.info_time')}</h3>
                      <p className="text-slate-500 font-medium text-sm">{t('contact.info_time_val')}</p>
                  </div>
              </div>

              {/* Main Form */}
              <div className="lg:col-span-2">
                  <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 h-full flex flex-col">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="space-y-2">
                              <label className="text-sm font-bold text-slate-700">{t('contact.label_name')} *</label>
                              <input 
                                  required
                                  type="text" 
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 focus:outline-none transition-all font-medium"
                              />
                          </div>
                          <div className="space-y-2">
                              <label className="text-sm font-bold text-slate-700">{t('contact.label_email')} *</label>
                              <input 
                                  required
                                  type="email" 
                                  className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 focus:outline-none transition-all font-medium"
                              />
                          </div>
                      </div>

                      <div className="space-y-2 mb-6">
                          <label className="text-sm font-bold text-slate-700">{t('contact.label_subject')} *</label>
                          <input 
                              required
                              type="text" 
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 focus:outline-none transition-all font-medium"
                          />
                      </div>

                      <div className="space-y-2 mb-8 flex-grow">
                          <label className="text-sm font-bold text-slate-700">{t('contact.label_message')} *</label>
                          <textarea 
                              required
                              rows={6}
                              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 focus:outline-none transition-all resize-none font-medium"
                          />
                      </div>

                      <Button 
                          type="submit" 
                          size="lg" 
                          disabled={isSubmitting}
                          className="w-full gap-2 text-lg font-bold shadow-lg shadow-purple-500/20"
                      >
                          {isSubmitting ? (
                              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                              <>
                                  <Send size={20} /> {t('contact.btn_send')}
                              </>
                          )}
                      </Button>
                  </form>
              </div>
          </div>
      </div>
    </div>
  );
};
