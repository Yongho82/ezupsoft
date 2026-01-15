
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';

export const ContactPage: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const { t } = useLanguage();

    // Form state
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        email: '',
        subject: '',
        message: '',
        files: [] as { name: string, data: string, type: string }[]
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []) as File[];

        if (formData.files.length + selectedFiles.length > 2) {
            setError(t('contact.err_file_count'));
            return;
        }

        const maxSizeBytes = 2 * 1024 * 1024; // 2MB

        selectedFiles.forEach((file: File) => {
            if (!file.type.startsWith('image/') && file.type !== 'text/plain') {
                setError(t('contact.err_file_type'));
                return;
            }
            if (file.size > maxSizeBytes) {
                setError(t('contact.err_file_size'));
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target?.result as string;
                setFormData(prev => ({
                    ...prev,
                    files: [...prev.files, {
                        name: file.name,
                        data: base64.split(',')[1],
                        type: file.type
                    }]
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const removeFile = (index: number) => {
        setFormData(prev => ({
            ...prev,
            files: prev.files.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycby50LxbEI_uhH2P8cbj1owEeFvze43go3zUb8YuyfBr8lY77KivHSnQspfezXCKxANS/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            setIsSubmitting(false);
            setSubmitted(true);

            setFormData({
                category: '',
                name: '',
                email: '',
                subject: '',
                message: '',
                files: []
            });

        } catch (err) {
            setIsSubmitting(false);
            setError('Failed to send message. Please try again.');
            console.error('Form submission error:', err);
        }
    };

    if (submitted) {
        return (
            <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-white px-4">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-fade-in-up">
                    <Icon icon="solar:check-circle-bold" className="text-green-500" width="48" />
                </div>
                <h2 className="text-3xl font-bold text-slate-900 mb-4 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                    {t('contact.success_title')}
                </h2>
                <p className="text-slate-500 mb-8 text-center max-w-md animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    {t('contact.success_desc')}
                </p>
                <Button onClick={() => setSubmitted(false)} variant="outline" className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                    {t('contact.btn_another')}
                </Button>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-slate-50 pb-20">

            {/* Header/Hero Section */}
            <div className="bg-white py-16 px-4 text-center relative overflow-hidden border-b border-slate-100">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#6C5CE7_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.07]"></div>

                {/* Natural Symbol */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.03]">
                    <Icon icon="solar:chat-round-bold" className="text-slate-900" width="300" />
                </div>

                <div className="relative z-10 max-w-3xl mx-auto pt-2">
                    <h1 className="text-3xl md:text-5xl font-black mb-3 tracking-tight text-slate-900">{t('contact.title')}</h1>
                    <p className="text-slate-500 text-base md:text-lg font-medium">{t('contact.subtitle')}</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-8 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Contact Info Cards */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                            <div className="w-10 h-10 bg-purple-50 text-[#6C5CE7] rounded-xl flex items-center justify-center mb-4">
                                <Icon icon="solar:letter-bold" width="20" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-1">{t('contact.info_email')}</h3>
                            <p className="text-slate-500 font-medium text-sm">ezupsoft@gmail.com</p>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
                            <div className="w-10 h-10 bg-teal-50 text-teal-500 rounded-xl flex items-center justify-center mb-4">
                                <Icon icon="solar:clock-circle-bold" width="20" />
                            </div>
                            <h3 className="font-bold text-slate-900 text-lg mb-1">{t('contact.info_time')}</h3>
                            <p className="text-slate-500 font-medium text-sm">{t('contact.info_time_val')}</p>
                        </div>
                    </div>

                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100 h-full flex flex-col">

                            {/* Error Message */}
                            {error && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2 animate-shake">
                                    <Icon icon="solar:danger-bold" width="20" />
                                    {error}
                                </div>
                            )}

                            {/* Inquiry Category */}
                            <div className="space-y-2 mb-6">
                                <label className="text-sm font-bold text-slate-700">{t('contact.label_category')} *</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 focus:outline-none transition-all font-medium appearance-none text-sm"
                                >
                                    <option value="">{t('contact.cat_select')}</option>
                                    <option value={t('contact.cat_program')}>{t('contact.cat_program')}</option>
                                    <option value={t('contact.cat_partner')}>{t('contact.cat_partner')}</option>
                                    <option value={t('contact.cat_other')}>{t('contact.cat_other')}</option>
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">{t('contact.label_name')} *</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 focus:outline-none transition-all font-medium text-sm"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700">{t('contact.label_email')} *</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 focus:outline-none transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                <label className="text-sm font-bold text-slate-700">{t('contact.label_subject')} *</label>
                                <input
                                    required
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 focus:outline-none transition-all font-medium text-sm"
                                />
                            </div>

                            <div className="space-y-2 mb-6 flex-grow">
                                <label className="text-sm font-bold text-slate-700">{t('contact.label_message')} *</label>
                                <textarea
                                    required
                                    rows={5}
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 focus:border-[#6C5CE7] focus:ring-2 focus:ring-[#6C5CE7]/20 focus:outline-none transition-all resize-none font-medium text-sm"
                                />
                            </div>

                            {/* File Attachment - Prominent Drag & Drop Style */}
                            <div className="space-y-2 mb-4">
                                <label className="text-sm font-bold text-slate-700 flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <Icon icon="solar:paperclip-bold" width="16" /> {t('contact.label_file')} (Max 2)
                                    </span>
                                </label>

                                <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 hover:border-purple-200 transition-colors cursor-pointer group">
                                    <input
                                        type="file"
                                        multiple
                                        onChange={handleFileChange}
                                        disabled={formData.files.length >= 2}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                                    />
                                    <div className="pointer-events-none">
                                        <div className="w-10 h-10 bg-purple-50 text-[#6C5CE7] rounded-full flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                                            <Icon icon="solar:cloud-upload-bold" width="20" />
                                        </div>
                                        <p className="text-xs text-slate-700 font-bold mb-1">
                                            {t('contact.limit_warning')}
                                        </p>
                                    </div>
                                </div>

                                {/* File Preview List */}
                                {formData.files.length > 0 && (
                                    <div className="mt-3 space-y-2">
                                        {formData.files.map((file, idx) => (
                                            <div key={idx} className="flex items-center justify-between bg-white border border-slate-100 rounded-lg px-3 py-2 shadow-sm">
                                                <div className="flex items-center gap-3 overflow-hidden">
                                                    <Icon icon={file.type.startsWith('image/') ? "solar:gallery-bold" : "solar:file-text-bold"} className="text-[#6C5CE7] shrink-0" width="18" />
                                                    <span className="text-xs font-bold text-slate-700 truncate">{file.name}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeFile(idx)}
                                                    className="p-1 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors"
                                                >
                                                    <Icon icon="solar:close-circle-bold" width="18" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Direct Email Note */}
                            <div className="mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                <p className="text-[11px] leading-relaxed text-slate-500 font-medium">
                                    <Icon icon="solar:info-circle-bold" className="inline mr-1 text-[#6C5CE7]" width="14" />
                                    {t('contact.direct_email_note')}
                                </p>
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
                                        <Icon icon="solar:plain-3-bold" width="20" /> {t('contact.btn_send')}
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
