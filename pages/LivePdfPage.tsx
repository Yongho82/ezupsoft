
import React, { useState } from 'react';
import { FileText, Layers, Minimize2, Lock, Palette, HelpCircle, ChevronDown, ChevronUp, ArrowRight, UploadCloud, ShieldCheck, PenTool, Layout, FileSearch, Zap } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ASSETS } from '../constants';

// --- DATA: FAQ Items (20 items split into 4 categories) ---
const PDF_FAQ_DATA = [
    {
        category: "일반 및 서비스 이용",
        items: [
            { q: "Q1. PDF STUDIO는 어떤 서비스인가요?", a: "PDF STUDIO는 별도의 프로그램 설치 없이 웹 브라우저에서 바로 PDF를 병합, 분할, 압축, 변환(Word, Excel, PPT 등), 편집할 수 있는 올인원 PDF 유틸리티 도구입니다." },
            { q: "Q2. 이 서비스는 무료인가요?", a: "네, PDF STUDIO의 기본 기능들은 누구나 무료로 이용하실 수 있습니다. 복잡한 PDF 작업도 간편하게 처리해 보세요." },
            { q: "Q3. 회원가입이나 로그인이 필요한가요?", a: "아니요, 번거로운 회원가입이나 로그인 절차 없이 사이트에 접속하자마자 모든 기능을 즉시 사용할 수 있습니다." },
            { q: "Q4. 프로그램을 다운로드하고 설치해야 하나요?", a: "PDF STUDIO는 100% 웹 기반 서비스입니다. PC, Mac, 태블릿 등 인터넷이 연결된 환경이라면 다운로드 없이 브라우저에서 바로 작동합니다." },
            { q: "Q5. 스마트폰(모바일)에서도 사용할 수 있나요?", a: "네, 반응형 웹 기술이 적용되어 있어 아이폰, 갤럭시 등 스마트폰과 태블릿 환경에서도 PC와 동일하게 PDF 작업을 수행할 수 있습니다." }
        ]
    },
    {
        category: "보안 및 프라이버시",
        items: [
            { q: "Q6. 업로드한 제 파일은 안전한가요?", a: "네, 강력한 보안을 자랑합니다. PDF STUDIO는 대부분의 작업을 사용자의 브라우저 내에서 직접 처리(Client-side processing)하므로, 파일이 외부 서버로 전송되지 않아 정보 유출 걱정 없이 안전하게 사용할 수 있습니다." },
            { q: "Q7. 작업이 끝난 파일은 서버에 저장되나요?", a: "아니요, 저희는 사용자의 개인정보 보호를 최우선으로 합니다. 작업이 완료된 파일은 저장되지 않으며, 브라우저를 닫는 즉시 작업 내역은 사라집니다." }
        ]
    },
    {
        category: "PDF 변환 및 편집 기능",
        items: [
            { q: "Q8. PDF를 오피스 문서(Word, Excel, PPT)로 변환할 수 있나요?", a: "네, PDF 파일을 편집 가능한 Word, Excel, PowerPoint 문서로 변환할 수 있습니다. 또한 반대로 오피스 문서를 PDF로 변환하는 것도 가능합니다." },
            { q: "Q9. 여러 개의 이미지 파일을 하나의 PDF로 만들 수 있나요?", a: "가능합니다. 'JPG PDF 변환' 또는 '병합' 기능을 사용하여 여러 장의 JPG, PNG 이미지를 하나의 PDF 문서로 손쉽게 합칠 수 있습니다." },
            { q: "Q10. PDF 압축 시 화질이 많이 저하되나요?", a: "PDF STUDIO는 '강력 압축', '권장 압축', '품질 우선' 등 다양한 옵션을 제공합니다. 용도에 맞춰 화질과 파일 크기의 균형을 선택할 수 있습니다." },
            { q: "Q11. PDF 파일의 기존 글자를 수정할 수 있나요?", a: "현재 제공되는 편집 기능은 PDF 위에 새로운 텍스트, 이미지, 도형을 '추가'하거나 하이라이트 주석을 다는 기능입니다. PDF 원본의 기존 텍스트를 직접 지우거나 수정하는 기능은 제공하지 않습니다." },
            { q: "Q12. PDF 문서에 전자 서명을 넣을 수 있나요?", a: "네, '편집' 또는 '서명' 도구를 통해 직접 서명을 그리거나, 서명 이미지를 업로드하여 문서의 원하는 위치에 삽입할 수 있습니다." },
            { q: "Q13. HWP(한글) 파일도 변환이 가능한가요?", a: "현재는 PDF, Word, Excel, PPT, JPG, PNG, HTML 형식 간의 변환을 지원합니다. HWP 변환 기능은 추후 업데이트될 예정입니다." }
        ]
    },
    {
        category: "문제 해결 및 기술적 질문",
        items: [
            { q: "Q14. 파일 변환이나 업로드가 실패해요. 이유가 무엇인가요?", a: "파일이 손상되었거나 암호가 걸려있는 경우, 또는 일시적인 네트워크 문제일 수 있습니다. 파일의 상태를 확인하시고 페이지를 새로고침한 후 다시 시도해 주세요." },
            { q: "Q15. 암호가 걸린 PDF 파일도 작업할 수 있나요?", a: "암호가 설정된 파일은 작업 전 사용자가 암호를 해제해야 합니다. 보안상의 이유로 암호를 강제로 해제하는 기능은 제공하지 않습니다." },
            { q: "Q16. 한 번에 몇 개의 파일까지 병합할 수 있나요?", a: "병합 가능한 파일 개수에 엄격한 제한은 없으나, 사용하시는 기기의 메모리 성능에 따라 처리 속도가 달라질 수 있습니다. 대량의 파일은 나누어서 작업하는 것을 권장합니다." },
            { q: "Q17. 변환된 문서의 레이아웃이 원본과 달라요.", a: "PDF에 복잡한 표나 이미지가 많을 경우, Word나 Excel로 변환 시 레이아웃이 일부 변경될 수 있습니다. 텍스트 위주의 문서는 높은 정확도로 변환됩니다." },
            { q: "Q18. PDF에서 특정 페이지만 추출할 수 있나요?", a: "네, '분할' 기능을 사용하여 원하는 페이지 범위를 지정하거나, 특정 페이지만 쏙 뽑아서 별도의 PDF로 저장할 수 있습니다." },
            { q: "Q19. 파일 용량 제한이 있나요?", a: "웹 브라우저의 성능을 활용하므로 대용량 파일도 처리가 가능하지만, 100MB 이상의 초고용량 파일은 브라우저 환경에 따라 처리가 지연될 수 있습니다." },
            { q: "Q20. 사용 중 오류를 발견하거나 기능을 제안하고 싶어요.", a: "서비스 이용 중 불편한 점이나 필요한 기능이 있다면 고객센터 메일(또는 문의하기 메뉴)로 보내주세요. PDF STUDIO는 사용자의 피드백을 통해 지속적으로 발전하고 있습니다." }
        ]
    }
];

const FeatureCard: React.FC<{ imageUrl: string; title: string; desc: string }> = ({ imageUrl, title, desc }) => (
    <div className="flex flex-col rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full text-left">
        <div className="h-56 overflow-hidden bg-slate-100 relative">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        </div>
        <div className="p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
        </div>
    </div>
);

const TechMarquee: React.FC = () => {
    const { t } = useLanguage();

    const techItems = [
        { icon: FileText, label: 'PDF/A' },
        { icon: Layout, label: 'Word' },
        { icon: FileSearch, label: 'OCR' },
        { icon: Lock, label: 'AES-256' },
        { icon: ShieldCheck, label: 'Secure' },
        { icon: Zap, label: 'Engine' }
    ];

    const scrollItems = [...techItems, ...techItems, ...techItems];

    return (
        <div className="w-full bg-[#00CEC9] py-6 overflow-hidden relative">
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
                    PRIVACY & FIDELITY
                </p>
                <h2 className="text-2xl font-bold text-white max-w-2xl mx-auto leading-relaxed mb-1">
                    {t('pdf.tech_tagline')}
                </h2>
                <p className="text-white/80 text-xs max-w-xl mx-auto font-medium leading-relaxed">
                    {t('pdf.security_promise')}
                </p>
            </div>

            <div className="relative">
                <div className="animate-marquee flex gap-16 items-center">
                    {scrollItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-white/40 grayscale hover:grayscale-0 hover:text-white transition-all duration-300">
                            <item.icon size={32} />
                            <span className="text-lg font-black italic tracking-tighter opacity-15 uppercase">{item.label}</span>
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#00CEC9] via-transparent to-[#00CEC9]" />
            </div>
        </div>
    );
};

const FAQBoard: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleItem = (idx: number) => {
        setOpenIndex(openIndex === idx ? null : idx);
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-cyan-100 text-[#00CEC9] mb-4">
                    <HelpCircle size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">FAQ & Help Center</h2>
                <p className="text-slate-500 mt-2">자주 묻는 질문을 확인하고 빠르게 문제를 해결하세요.</p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {PDF_FAQ_DATA.map((section, idx) => (
                    <button
                        key={idx}
                        onClick={() => { setActiveTab(idx); setOpenIndex(null); }}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 ${activeTab === idx
                            ? 'bg-[#00CEC9] text-white shadow-lg shadow-cyan-500/30 ring-2 ring-cyan-200 ring-offset-2'
                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                            }`}
                    >
                        {section.category}
                    </button>
                ))}
            </div>

            {/* Questions List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                {PDF_FAQ_DATA[activeTab].items.map((item, idx) => (
                    <div key={idx} className="border-b border-slate-100 last:border-0">
                        <button
                            onClick={() => toggleItem(idx)}
                            className="w-full flex items-start justify-between p-6 text-left focus:outline-none hover:bg-slate-50/50 transition-colors"
                        >
                            <div className="flex gap-4">
                                <span className={`flex-shrink-0 font-bold text-lg ${openIndex === idx ? 'text-[#00CEC9]' : 'text-slate-400'}`}>
                                    Q.
                                </span>
                                <span className={`text-base md:text-lg font-bold transition-colors ${openIndex === idx ? 'text-[#00CEC9]' : 'text-slate-900'}`}>
                                    {item.q.replace(/^Q\d+\.\s/, '')}
                                </span>
                            </div>
                            {openIndex === idx ? <ChevronUp className="text-[#00CEC9] shrink-0 mt-1" size={20} /> : <ChevronDown className="text-slate-400 shrink-0 mt-1" size={20} />}
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-6 pb-6 pl-14 pr-8">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                    <span className="font-bold text-[#00CEC9] mr-2">A.</span>
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-400">
                    다른 질문이 있으신가요? <Link to="/contact" className="text-[#00CEC9] font-bold hover:underline">문의하기</Link>
                </p>
            </div>
        </div>
    );
};

export const LivePdfPage: React.FC = () => {
    const { t } = useLanguage();

    const features = [
        { imageUrl: ASSETS.PREVIEW_PDF, title: t('pdf.feat_1'), desc: t('pdf.feat_1_desc') },
        { imageUrl: ASSETS.THUMB_DESIGN, title: t('pdf.feat_2'), desc: t('pdf.feat_2_desc') },
        { imageUrl: ASSETS.SLIDE_PDF, title: t('pdf.feat_3'), desc: t('pdf.feat_3_desc') },
        { imageUrl: ASSETS.THUMB_DEV, title: t('pdf.feat_4'), desc: t('pdf.feat_4_desc') },
        { imageUrl: ASSETS.PREVIEW_HTML, title: t('pdf.feat_5'), desc: t('pdf.feat_5_desc') },
        { imageUrl: ASSETS.THUMB_PROD, title: t('pdf.feat_6'), desc: t('pdf.feat_6_desc') }
    ];

    return (
        <div className="w-full pb-20 bg-white">
            {/* 1. Hero Section with Dotted Pattern & PDF Theme */}
            <section className="relative pt-32 pb-48 overflow-hidden bg-slate-50">

                {/* Background Elements */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Dotted Pattern */}
                    <div className="absolute inset-0 bg-[radial-gradient(#00CEC9_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.15]"></div>

                    {/* Gradient Blobs (Cyan/Teal) */}
                    <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-cyan-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                {/* Floating Icons (PDF Context) */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Floating PDF Doc - Right */}
                    <div className="absolute top-24 right-[15%] text-cyan-200 animate-float" style={{ animationDelay: '0s' }}>
                        <FileText size={140} className="transform rotate-12 opacity-50" />
                    </div>

                    {/* Floating Shield - Left */}
                    <div className="absolute bottom-24 left-[10%] text-teal-200 animate-float" style={{ animationDelay: '1.5s' }}>
                        <ShieldCheck size={100} className="transform -rotate-12 opacity-50" />
                    </div>

                    {/* Abstract Floating Page */}
                    <div className="absolute top-1/3 left-[20%] w-24 h-32 border-2 border-cyan-200/50 rounded-lg animate-spin-slow bg-white/10 backdrop-blur-sm"></div>

                    {/* Small particles */}
                    <div className="absolute top-1/4 right-1/3 w-3 h-3 bg-cyan-400 rounded-full opacity-40 animate-pulse"></div>
                    <div className="absolute bottom-1/3 left-1/4 w-4 h-4 bg-teal-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-cyan-100 text-[#00CEC9] text-sm font-bold mb-8 shadow-sm animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
                        <UploadCloud size={16} /> {t('pdf.badge')}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight animate-fade-in-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.1s' }}>
                        {t('pdf.title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mb-12 leading-relaxed mx-auto animate-fade-in-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.2s' }}>
                        {t('pdf.desc')}
                    </p>
                    <div className="animate-fade-in-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.3s' }}>
                        <Link to="/live-pdf/app">
                            <Button size="lg" variant="secondary" className="h-16 px-12 text-xl shadow-xl shadow-cyan-500/30 gap-3 hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
                                <span className="relative z-10 flex items-center gap-2">{t('pdf.start_btn')} <ArrowRight /></span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <TechMarquee />

            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('pdf.feat_title')}</h2>
                    <p className="text-lg text-slate-500">{t('pdf.feat_subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feat, idx) => (
                        <FeatureCard key={idx} {...feat} />
                    ))}
                </div>
            </section>

            {/* Workflow Steps Section */}
            <section className="bg-slate-50 py-32">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* Fixed height 425px for consistency with other pages */}
                            <div className="bg-white rounded-[2rem] p-4 shadow-2xl border border-slate-200 relative z-10 overflow-hidden h-[425px]">
                                <img src={ASSETS.PREVIEW_PDF} alt="PDF Editor Preview" className="rounded-xl w-full h-full object-cover" />
                            </div>
                            <div className="absolute -top-12 -left-12 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl z-0 animate-pulse-slow"></div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8 text-left">
                            <h2 className="text-4xl font-bold text-slate-900 leading-tight">{t('pdf.flow_title')}</h2>
                            <div className="space-y-6">
                                <div className="flex gap-5 group">
                                    <div className="w-10 h-10 rounded-full bg-[#00CEC9] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform">1</div>
                                    <p className="text-slate-600 leading-relaxed text-lg font-medium">{t('pdf.flow_1')}</p>
                                </div>
                                <div className="flex gap-5 group">
                                    <div className="w-10 h-10 rounded-full bg-[#00CEC9] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform">2</div>
                                    <p className="text-slate-600 leading-relaxed text-lg font-medium">{t('pdf.flow_2')}</p>
                                </div>
                                <div className="flex gap-5 group">
                                    <div className="w-10 h-10 rounded-full bg-[#00CEC9] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-cyan-200 group-hover:scale-110 transition-transform">3</div>
                                    <p className="text-slate-600 leading-relaxed text-lg font-medium">{t('pdf.flow_3')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Replaced old FAQ with new FAQBoard */}
            <section className="bg-slate-50/50 py-24">
                <FAQBoard />
            </section>

            {/* Final CTA */}
            <section className="relative py-20 overflow-hidden bg-[#00CEC9] isolate">
                {/* Custom Styles for this section */}
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

                {/* 1. Dynamic Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00CEC9] via-[#00B5B0] to-[#008E8A] z-0"></div>

                {/* 2. Grid Texture Overlay */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 z-0 pointer-events-none"></div>

                {/* 3. Animated Spiral/Rings Effect - Reduced size */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 opacity-60">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 border-dashed" style={{ animation: 'spin-cw 60s linear infinite' }}></div>
                    {/* Middle Ring */}
                    <div className="absolute inset-[80px] rounded-full border-2 border-white/30" style={{ animation: 'spin-ccw 40s linear infinite' }}></div>
                    {/* Inner Ring */}
                    <div className="absolute inset-[160px] rounded-full border-4 border-white/10" style={{ animation: 'spin-cw 20s linear infinite' }}></div>
                    {/* Satellite */}
                    <div className="absolute inset-0" style={{ animation: 'spin-cw 25s linear infinite' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-6 h-6 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]"></div>
                    </div>
                </div>

                {/* 4. Floating Light Orbs (Cyan/Teal Theme) */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-200/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 mix-blend-screen animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-200/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 mix-blend-screen animate-blob animation-delay-2000"></div>

                <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-xl">{t('pdf.cta_title')}</h2>
                    <p className="text-cyan-100 mb-10 text-lg font-medium drop-shadow-md">{t('pdf.cta_desc')}</p>
                    <div className="relative inline-flex group">
                        <div className="absolute transition-all duration-1000 opacity-70 -inset-1 bg-gradient-to-r from-cyan-400 via-white to-teal-400 rounded-2xl blur-lg group-hover:opacity-100 group-hover:-inset-1.5 group-hover:duration-200 animate-tilt"></div>
                        <Link to="/live-pdf/app">
                            <Button size="lg" className="relative !bg-white !text-[#00CEC9] hover:!bg-slate-50 border-none px-12 py-5 text-xl font-bold rounded-2xl shadow-xl transition-all transform group-hover:scale-[1.02]">
                                {t('pdf.cta_btn')}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export const LivePdfApp: React.FC = () => {
    return (
        <div className="fixed top-[72px] left-0 right-0 bottom-0 bg-white z-0">
            <iframe
                src={`/pdf-studio/index.html?v=${new Date().getTime()}`}
                title="Live PDF Tool"
                className="w-full h-full border-0"
                allowFullScreen
            />
        </div>
    );
};
