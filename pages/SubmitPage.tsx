
import React, { useState } from 'react';
import { Button } from '../components/Button';
import { Icon } from '@iconify/react';
import { useLanguage } from '../contexts/LanguageContext';

export const SubmitPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => setSubmitted(true), 1000);
  };

  if (submitted) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-20 text-center mt-8">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon icon="solar:check-circle-bold" className="text-green-600" width="40" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">{t('submit.received')}</h2>
        <p className="text-slate-500 mb-8">
          {t('submit.received_desc')}
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          {t('submit.btn_another')}
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 mt-8">
      <div className="py-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-slate-900">{t('submit.title')}</h1>
        <p className="text-xl text-slate-500">
          {t('submit.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t('submit.label_name')} *</label>
            <input 
              required
              type="text" 
              placeholder="e.g., Figma"
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7] focus:outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">{t('submit.label_url')} *</label>
            <input 
              required
              type="url" 
              placeholder="https://..."
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7] focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">{t('submit.label_cat')} *</label>
          <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7] focus:outline-none transition-all appearance-none">
            <option>Developer Tools</option>
            <option>Design Tools</option>
            <option>Productivity</option>
            <option>Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">{t('submit.label_why')} *</label>
          <textarea 
            required
            rows={4}
            placeholder="..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7] focus:outline-none transition-all resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">{t('submit.label_email')}</label>
          <input 
            type="email" 
            placeholder=""
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#6C5CE7] focus:ring-1 focus:ring-[#6C5CE7] focus:outline-none transition-all"
          />
        </div>

        <div className="pt-4">
          <Button type="submit" size="lg" className="w-full gap-2">
            <Icon icon="solar:plain-3-bold" width="18" /> {t('submit.btn_submit')}
          </Button>
          <p className="text-center text-xs text-slate-400 mt-4">
            {t('submit.footer_note')}
          </p>
        </div>
      </form>
    </div>
  );
};
