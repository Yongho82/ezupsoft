
import React, { useState } from 'react';
import { FileJson, Presentation, FileText, Zap, Code2, HelpCircle, ChevronDown, ChevronUp, ArrowRight, Layout, Atom, FileCode, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { ASSETS } from '../constants';

// --- DATA: FAQ Items (Requested 20 items split into 3 categories) ---
const HTML_FAQ_DATA = [
    {
        category: "기본 사용 (Basic)",
        items: [
            { q: "Q1. 라이브 HTML 편집기는 어떤 프로그램인가요?", a: "코딩 지식이 없어도 웹 브라우저상에서 HTML 문서를 마치 파워포인트처럼 시각적으로 편집할 수 있는 도구입니다. 빈 캔버스는 물론, PDF나 PPT 파일을 불러와 웹 콘텐츠로 변환하거나 수정할 수도 있습니다." },
            { q: "Q2. 프로그램을 사용하려면 회원가입이나 로그인이 필요한가요?", a: "아니요, 별도의 회원가입이나 로그인 절차 없이 바로 이용하실 수 있습니다. 접속하는 즉시 모든 기능을 자유롭게 활용해 보세요." },
            { q: "Q3. 사용료는 무료인가요?", a: "네, 현재 제공되는 모든 편집 및 변환 기능은 무료로 제공됩니다. (추후 정책 변경 시 공지 예정)" },
            { q: "Q4. 코딩(HTML/CSS)을 전혀 몰라도 사용할 수 있나요?", a: "네, 가능합니다! 화면 오른쪽의 '컨트롤 패널'을 통해 글꼴, 색상, 크기, 배치 등을 마우스 클릭만으로 조정할 수 있습니다. 물론 코딩이 편하신 분들은 에디터 창에서 직접 코드를 수정할 수도 있습니다." },
            { q: "Q5. 어떤 브라우저에서 사용하는 것이 가장 좋나요?", a: "최신 웹 기술이 적용되어 있으므로 Chrome(크롬), Edge(엣지), 또는 Whale(웨일) 브라우저 사용을 권장합니다." }
        ]
    },
    {
        category: "파일 불러오기 & 내보내기",
        items: [
            { q: "Q6. PDF 파일을 수정할 수 있나요?", a: "네, '불러오기' 기능을 통해 PDF를 선택하면, AI 엔진이 문서의 배경과 텍스트를 자동으로 분리하여 편집 가능한 상태로 변환해 줍니다." },
            { q: "Q7. 파워포인트(PPTX) 파일도 불러올 수 있나요?", a: "네, 가능합니다. PPTX 파일을 업로드하면 각 슬라이드를 웹 페이지 형태로 변환하여 텍스트와 이미지를 수정하거나 재배치할 수 있습니다." },
            { q: "Q8. 작업한 내용을 다시 파워포인트(PPT)로 저장할 수 있나요?", a: "네, 작업하신 HTML 결과물을 텍스트와 차트가 살아있는 네이티브 PPTX 파일로 다운로드할 수 있습니다. 발표 자료를 웹에서 급하게 수정해야 할 때 유용합니다." },
            { q: "Q9. 저장할 수 있는 파일 형식은 무엇인가요?", a: "표준 웹 문서인 HTML, 문서 공유를 위한 PDF, 발표용 PPTX, 그리고 이미지 파일인 PNG 형식으로 다운로드가 가능합니다." },
            { q: "Q10. 불러온 문서의 폰트나 레이아웃이 원본과 조금 달라요.", a: "웹 환경과 문서 환경의 차이로 인해 100% 완벽하게 동일하지 않을 수 있습니다. 하지만 편집 도구를 사용하여 깨진 부분을 손쉽게 보정할 수 있도록 다양한 기능을 제공하고 있습니다." }
        ]
    },
    {
        category: "편집 및 고급 기능",
        items: [
            { q: "Q11. 텍스트는 어떻게 수정하나요?", a: "미리보기 화면에서 텍스트를 더블 클릭하면 바로 내용을 수정할 수 있는 편집 모드로 전환됩니다." },
            { q: "Q12. 여러 요소를 한 번에 선택해서 옮길 수 있나요?", a: "네, Shift 키를 누른 상태로 요소를 클릭하거나, 컨트롤 패널의 **'다중 선택 모드'**를 켜고 마우스로 드래그하여 여러 요소를 선택 및 이동할 수 있습니다." },
            { q: "Q13. 이미지나 동영상도 넣을 수 있나요?", a: "네, 상단 메뉴의 '삽입' 기능을 통해 이미지, 유튜브 동영상, 아이콘, 표, 차트 등 다양한 멀티미디어 요소를 추가할 수 있습니다." },
            { q: "Q14. 이미지 속에 있는 글자를 텍스트로 바꾸고 싶어요 (OCR).", a: "헤더의 '문자추출(OCR)' 기능을 사용해 보세요. 화면에 있는 이미지를 분석하여 텍스트를 자동으로 추출해 줍니다." },
            { q: "Q15. 요소가 겹쳐서 선택하기 힘들어요.", a: "화면 상단의 '레이어' 버튼을 눌러보세요. 포토샵처럼 문서의 구조를 트리 형태로 볼 수 있어, 숨겨지거나 겹친 요소를 쉽게 선택하고 제어할 수 있습니다." },
            { q: "Q16. 애니메이션 효과를 줄 수 있나요?", a: "네, 요소를 선택한 후 컨트롤 패널의 '애니메이션' 탭에서 '나타나기', '올라오기' 등의 효과를 적용할 수 있습니다." },
            { q: "Q17. 모바일 화면이나 태블릿 크기로 미리볼 수 있나요?", a: "네, 상단의 '미리보기 크기 조정' 기능을 사용하거나 '새 탭에서 미리보기'를 클릭하면 다양한 디바이스 환경에 맞춰 결과물을 확인할 수 있습니다." },
            { q: "Q18. 실수로 내용을 지웠는데 되돌릴 수 있나요?", a: "걱정하지 마세요. Ctrl + Z (실행 취소) 키를 누르거나 상단 메뉴의 되돌리기 버튼을 통해 이전 상태로 복구할 수 있습니다." },
            { q: "Q19. 내 데이터나 업로드한 파일이 서버에 저장되나요?", a: "아니요, 본 프로그램은 클라이언트 사이드(Client-side) 방식으로 동작합니다. 즉, 모든 작업은 사용자의 브라우저 내에서만 이루어지며 서버로 파일이 전송되거나 저장되지 않아 보안상 안전합니다." },
            { q: "Q20. 사용 중 오류가 발생하면 어떻게 하나요?", a: "브라우저를 새로고침(F5) 해보시고, 문제가 지속된다면 '설명서(Manual)'를 확인해 주세요. 버그 제보는 하단의 문의하기 링크를 통해 보내주시면 빠르게 개선하겠습니다." }
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
        { icon: Code2, label: 'HTML5' },
        { icon: Layout, label: 'CSS3' },
        { icon: Atom, label: 'React' },
        { icon: FileCode, label: 'JSON' },
        { icon: FileText, label: 'PDF' },
        { icon: Presentation, label: 'PPTX' },
        { icon: Zap, label: 'Vite' }
    ];

    const scrollItems = [...techItems, ...techItems, ...techItems];

    return (
        <div className="w-full bg-[#6C5CE7] py-6 overflow-hidden relative z-10">
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
                    RELIABILITY & PRIVACY
                </p>
                <h2 className="text-2xl font-bold text-white max-w-2xl mx-auto leading-relaxed mb-1">
                    {t('html.tech_tagline')}
                </h2>
                <p className="text-white/70 text-xs max-w-xl mx-auto font-medium leading-relaxed">
                    {t('html.security_promise')}
                </p>
            </div>

            <div className="relative">
                <div className="animate-marquee flex gap-10 md:gap-16 items-center">
                    {scrollItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-white/40 grayscale hover:grayscale-0 hover:text-white transition-all duration-300">
                            <item.icon size={32} />
                            <span className="text-lg font-black italic tracking-tighter opacity-15 uppercase">{item.label}</span>
                        </div>
                    ))}
                </div>

                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#6C5CE7] via-transparent to-[#6C5CE7]" />
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
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-100 text-[#6C5CE7] mb-4">
                    <HelpCircle size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">FAQ & Help Center</h2>
                <p className="text-slate-500 mt-2">자주 묻는 질문을 확인하고 빠르게 문제를 해결하세요.</p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {HTML_FAQ_DATA.map((section, idx) => (
                    <button
                        key={idx}
                        onClick={() => { setActiveTab(idx); setOpenIndex(null); }}
                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-200 ${activeTab === idx
                            ? 'bg-[#6C5CE7] text-white shadow-lg shadow-purple-500/30 ring-2 ring-purple-200 ring-offset-2'
                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                            }`}
                    >
                        {section.category}
                    </button>
                ))}
            </div>

            {/* Questions List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                {HTML_FAQ_DATA[activeTab].items.map((item, idx) => (
                    <div key={idx} className="border-b border-slate-100 last:border-0">
                        <button
                            onClick={() => toggleItem(idx)}
                            className="w-full flex items-start justify-between p-6 text-left focus:outline-none hover:bg-slate-50/50 transition-colors"
                        >
                            <div className="flex gap-4">
                                <span className={`flex-shrink-0 font-bold text-lg ${openIndex === idx ? 'text-[#6C5CE7]' : 'text-slate-400'}`}>
                                    Q.
                                </span>
                                <span className={`text-base md:text-lg font-bold transition-colors ${openIndex === idx ? 'text-[#6C5CE7]' : 'text-slate-900'}`}>
                                    {item.q.replace(/^Q\d+\.\s/, '')}
                                </span>
                            </div>
                            {openIndex === idx ? <ChevronUp className="text-[#6C5CE7] shrink-0 mt-1" size={20} /> : <ChevronDown className="text-slate-400 shrink-0 mt-1" size={20} />}
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-6 pb-6 pl-14 pr-8">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                    <span className="font-bold text-[#6C5CE7] mr-2">A.</span>
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-400">
                    다른 질문이 있으신가요? <Link to="/contact" className="text-[#6C5CE7] font-bold hover:underline">문의하기</Link>
                </p>
            </div>
        </div>
    );
};

export const LiveHtmlPage: React.FC = () => {
    const { t } = useLanguage();

    const features = [
        { imageUrl: ASSETS.THUMB_DEV, title: t('html.feat_1'), desc: t('html.feat_1_desc') },
        { imageUrl: ASSETS.PREVIEW_HTML, title: t('html.feat_2'), desc: t('html.feat_2_desc') },
        { imageUrl: ASSETS.THUMB_DESIGN, title: t('html.feat_3'), desc: t('html.feat_3_desc') },
        { imageUrl: ASSETS.PREVIEW_PDF, title: t('html.feat_4'), desc: t('html.feat_4_desc') },
        { imageUrl: ASSETS.THUMB_PROD, title: t('html.feat_5'), desc: t('html.feat_5_desc') },
        { imageUrl: ASSETS.SLIDE_HTML, title: t('html.feat_6'), desc: t('html.feat_6_desc') }
    ];

    return (
        <div className="w-full pb-20 bg-white">
            {/* 1. Hero Section with Grid & Floating Elements */}
            <section className="relative pt-32 pb-48 overflow-hidden bg-slate-50 selection:bg-purple-100">

                {/* Background Elements */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Grid Pattern - Reverted to Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>

                    {/* Gradient Orbs - Moving Blobs */}
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                {/* Floating Shapes - Developer Themed */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Code Bracket Left */}
                    <div className="absolute top-20 left-[10%] text-slate-200 animate-float" style={{ animationDelay: '0s' }}>
                        <Code2 size={120} strokeWidth={1} className="transform -rotate-12 opacity-60" />
                    </div>

                    {/* Curly Brace Right */}
                    <div className="absolute top-40 right-[10%] text-slate-200 animate-float" style={{ animationDelay: '2s' }}>
                        <span className="text-9xl font-mono font-bold opacity-30 rotate-12 block">{`}`}</span>
                    </div>

                    {/* Geometric Circle */}
                    <div className="absolute bottom-20 left-[15%] w-24 h-24 border-4 border-slate-200/60 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>

                    {/* Dotted Square */}
                    <div className="absolute top-1/3 right-[20%] w-16 h-16 border-2 border-dashed border-slate-300/60 rounded-lg animate-spin-slow"></div>

                    {/* Small scattered dots */}
                    <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-purple-400 rounded-full opacity-40 animate-pulse"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-indigo-400 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-purple-100 text-[#6C5CE7] text-sm font-bold mb-8 shadow-sm animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
                        <Code2 size={16} /> {t('html.badge')}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight animate-fade-in-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.1s' }}>
                        {t('html.title')}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mb-12 leading-relaxed mx-auto animate-fade-in-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.2s' }}>
                        {t('html.desc')}
                    </p>
                    <div className="animate-fade-in-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.3s' }}>
                        <a href="/live_editor/dist/index.html">
                            <Button size="lg" className="h-16 px-12 text-xl shadow-xl shadow-purple-500/30 gap-3 hover:scale-105 transition-transform duration-300 relative overflow-hidden group">
                                <span className="relative z-10 flex items-center gap-2">{t('html.start_btn')} <ArrowRight /></span>
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                            </Button>
                        </a>
                    </div>
                </div>
            </section>

            <TechMarquee />

            <section className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('html.feat_title')}</h2>
                    <p className="text-lg text-slate-500">{t('html.feat_subtitle')}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feat, idx) => (
                        <FeatureCard key={idx} {...feat} />
                    ))}
                </div>
            </section>

            {/* Workflow Steps Section */}
            <section className="bg-slate-50 py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            {/* Fixed height 425px for consistency */}
                            <div className="bg-white rounded-[2rem] p-4 shadow-2xl border border-slate-200 relative z-10 overflow-hidden h-[425px]">
                                <img src={ASSETS.PREVIEW_HTML} alt="HTML Editor Preview" className="rounded-xl w-full h-full object-cover" />
                            </div>
                            <div className="absolute -top-12 -left-12 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl z-0 animate-pulse-slow"></div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8 text-left">
                            <h2 className="text-4xl font-bold text-slate-900 leading-tight">{t('html.flow_title')}</h2>
                            <div className="space-y-6">
                                <div className="flex gap-5 group">
                                    <div className="w-10 h-10 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">1</div>
                                    <p className="text-slate-600 leading-relaxed text-lg font-medium">{t('html.flow_1')}</p>
                                </div>
                                <div className="flex gap-5 group">
                                    <div className="w-10 h-10 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">2</div>
                                    <p className="text-slate-600 leading-relaxed text-lg font-medium">{t('html.flow_2')}</p>
                                </div>
                                <div className="flex gap-5 group">
                                    <div className="w-10 h-10 rounded-full bg-[#6C5CE7] text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-purple-200 group-hover:scale-110 transition-transform">3</div>
                                    <p className="text-slate-600 leading-relaxed text-lg font-medium">{t('html.flow_3')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* REPLACED FAQ SECTION with FAQBoard */}
            <section className="bg-slate-50/50 py-24">
                <FAQBoard />
            </section>

            {/* Final CTA */}
            <section className="relative py-20 overflow-hidden bg-[#6C5CE7] isolate">
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
                <div className="absolute inset-0 bg-gradient-to-br from-[#6C5CE7] via-[#5D3FD3] to-[#4834d4] z-0"></div>

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

                {/* 4. Floating Light Orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 mix-blend-screen animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-400/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 mix-blend-screen animate-blob animation-delay-2000"></div>

                <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6 drop-shadow-xl">{t('html.cta_title')}</h2>
                    <p className="text-purple-100 mb-10 text-lg font-medium drop-shadow-md">{t('html.cta_desc')}</p>
                    <div className="relative inline-flex group">
                        <div className="absolute transition-all duration-1000 opacity-70 -inset-1 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-2xl blur-lg group-hover:opacity-100 group-hover:-inset-1.5 group-hover:duration-200 animate-tilt"></div>
                        <a href="/live_editor/dist/index.html">
                            <Button size="lg" className="relative !bg-white !text-[#6C5CE7] hover:!bg-slate-50 border-none px-12 py-5 text-xl font-bold rounded-2xl shadow-xl transition-all transform group-hover:scale-[1.02]">
                                {t('html.cta_btn')}
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export const LiveHtmlApp: React.FC = () => {
    return (
        <div className="w-full h-full flex flex-col bg-white">
            <iframe src="https://ezupsoft.com/editor.php?lang=ko" title="Live HTML Studio" className="w-full flex-grow border-0" allowFullScreen />
        </div>
    );
};
