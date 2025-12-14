
import React, { useState } from 'react';
import { Crop, Monitor, HelpCircle, ChevronDown, ChevronUp, Download, ShieldCheck, Timer, Zap, Layers, Maximize2, AppWindow, MousePointerClick, ArrowDownToLine, Video, ScanText } from 'lucide-react';
import { Button } from '../components/Button';
import { useLanguage } from '../contexts/LanguageContext';
import { ASSETS } from '../constants';
import { Link } from 'react-router-dom';

// --- DATA: FAQ Items (30 items split into 5 categories) ---
const CATCH_FAQ_DATA = [
    {
        category: "일반 / 시작하기",
        items: [
            { q: "Q1. CatchCapture는 어떤 프로그램인가요?", a: "화면 캡처, 스크롤 캡처, 화면 녹화(MP4, GIF)부터 이미지 내 텍스트 추출(OCR)까지 가능한 올인원 화면 캡처 도구입니다. 캡처 후 즉시 이미지를 편집하거나 공유할 수 있습니다." },
            { q: "Q2. 프로그램을 사용하려면 회원가입이나 로그인이 필요한가요?", a: "아니요, 별도의 회원가입이나 로그인 절차 없이 설치 후 즉시 모든 기능을 자유롭게 이용하실 수 있습니다." },
            { q: "Q3. 지원하는 운영체제는 무엇인가요?", a: "Windows 10 및 Windows 11 환경에서 최적화되어 작동합니다." },
            { q: "Q4. 윈도우 시작 시 자동으로 실행되게 할 수 있나요?", a: "네, 설정 메뉴에서 'Windows 시작 시 자동 실행' 옵션을 켜면 부팅 시 프로그램이 트레이 아이콘으로 자동 실행되어 언제든 캡처할 준비가 됩니다." },
            { q: "Q5. 프로그램 설치는 복잡한가요?", a: "제공되는 설치 파일을 실행하기만 하면 자동으로 설치가 완료되며, 바로가기 아이콘을 통해 쉽게 실행할 수 있습니다." }
        ]
    },
    {
        category: "화면 캡처 기능",
        items: [
            { q: "Q6. 원하는 영역만 선택해서 캡처할 수 있나요?", a: "네, '영역 캡처' 기능을 사용하면 드래그하여 원하는 사각형 영역만큼만 깔끔하게 저장할 수 있습니다." },
            { q: "Q7. 스크롤이 있는 긴 웹페이지도 캡처 가능한가요?", a: "네, '스크롤 캡처' 기능을 지원합니다. 웹 브라우저나 긴 문서의 스크롤을 자동으로 내려가며 하나의 긴 이미지로 이어붙여 캡처해 줍니다." },
            { q: "Q8. 전체 화면을 한 번에 캡처하고 싶어요.", a: "단축키(Ctrl+F)를 누르거나 메뉴에서 '전체 화면 캡처'를 선택하면 모니터 전체 화면을 즉시 저장할 수 있습니다." },
            { q: "Q9. 특정 창만 깔끔하게 찍는 기능이 있나요?", a: "네, 마우스를 가져다 대면 자동으로 창 영역을 감지하는 '창 캡처(지정 캡처)' 기능을 통해 윈도우 창이나 버튼 단위로 정확하게 캡처할 수 있습니다." },
            { q: "Q10. 듀얼 모니터 환경에서도 사용할 수 있나요?", a: "네, 다중 모니터를 지원하며 모니터 간 이동이나 걸쳐 있는 영역도 문제없이 캡처됩니다." },
            { q: "Q11. 캡처한 이미지가 자동으로 클립보드에 복사되나요?", a: "네, 캡처 후 자동으로 클립보드에 복사되도록 설정할 수 있어 메신저나 문서에 바로 붙여넣기(Ctrl+V) 할 수 있습니다. (기본 설정 확인 필요)" },
            { q: "Q12. 메뉴가 닫히지 않고 열린 상태로 캡처할 수 있나요?", a: "네, 단축키를 활용하면 마우스 클릭 시 사라지는 팝업 메뉴나 툴팁도 손쉽게 캡처할 수 있습니다." },
            { q: "Q13. 간편 모드(Simple Mode)란 무엇인가요?", a: "바탕화면에 작은 툴바 형태로 항상 띄워두고, 필요할 때 즉시 캡처 버튼을 누를 수 있는 미니멀한 모드입니다." }
        ]
    },
    {
        category: "이미지 편집 및 그리기",
        items: [
            { q: "Q14. 캡처한 이미지 위에 바로 낙서를 하거나 표시를 할 수 있나요?", a: "네, 펜 도구와 형광펜 도구를 제공하여 중요한 부분을 강조하거나 필기할 수 있습니다." },
            { q: "Q15. 선의 굵기나 색상을 바꿀 수 있나요?", a: "펜과 형광펜 모두 다양한 색상 팔레트와 두께 조절 옵션을 제공하며, 사용자 지정 색상도 추가하여 사용할 수 있습니다." },
            { q: "Q16. 도형(네모, 동그라미)을 그릴 수 있나요?", a: "사각형, 원형, 화살표, 선 등 다양한 도형 도구를 이용해 깔끔하게 영역을 표시할 수 있습니다." },
            { q: "Q17. 이미지에 텍스트를 넣을 수 있나요?", a: "텍스트 도구를 선택하여 원하는 위치에 글자를 입력하고, 폰트 크기나 색상을 변경할 수 있습니다." },
            { q: "Q18. 잘못 그린 내용을 지울 수 있나요?", a: "지우개 도구로 특정 부분을 지우거나, 실행 취소(Ctrl+Z) 기능을 통해 이전 상태로 되돌릴 수 있습니다." },
            { q: "Q19. 이미지를 자르거나 크기를 조절할 수 있나요?", a: "캡처 후 편집 창에서 불필요한 배경을 잘라내거나(Crop), 이미지 해상도를 변경하는 리사이즈 기능을 지원합니다." },
            { q: "Q20. 편집한 내용을 다시 수정할 수 있나요? (레이어)", a: "그리기 객체들은 원본 이미지 위에 별도로 그려지므로, 저장하기 전까지는 언제든 위치를 옮기거나 수정할 수 있습니다." }
        ]
    },
    {
        category: "화면 녹화 및 미디어",
        items: [
            { q: "Q21. 화면을 동영상으로 녹화할 수 있나요?", a: "네, 화면 녹화 기능을 통해 PC 화면의 움직임을 고화질 비디오로 저장할 수 있습니다." },
            { q: "Q22. 움짤(GIF)도 만들 수 있나요?", a: "네, 녹화 포맷을 GIF로 설정하면 별도의 변환 작업 없이 바로 움직이는 이미지를 생성할 수 있습니다." },
            { q: "Q23. 컴퓨터에서 나는 소리도 같이 녹음되나요?", a: "네, 시스템 사운드 녹음을 지원하여 영상과 함께 PC에서 나오는 소리도 선명하게 담을 수 있습니다." },
            { q: "Q24. 녹화 시간 제한이 있나요?", a: "디스크 용량이 허용하는 한 별도의 시간 제한 없이 장시간 녹화가 가능합니다." },
            { q: "Q25. 녹화 파일의 화질을 선택할 수 있나요?", a: "설정에서 프레임 레이트(FPS)와 녹화 품질(High/Medium/Low)을 사용자의 환경에 맞춰 조절할 수 있습니다." }
        ]
    },
    {
        category: "OCR 및 기타 기능",
        items: [
            { q: "Q26. 이미지 속 글자를 텍스트로 변환할 수 있나요? (OCR)", a: "네, OCR(광학 문자 인식) 기능을 통해 캡처한 이미지 내의 글자를 자동으로 인식하여 텍스트로 추출해 줍니다." },
            { q: "Q27. 추출한 텍스트는 어떻게 활용하나요?", a: "추출된 텍스트는 별도의 결과 창에 표시되며, 복사하여 번역기나 문서 작성에 바로 활용할 수 있습니다." },
            { q: "Q28. 이미지는 어떤 파일 형식으로 저장되나요?", a: "기본적으로 PNG, JPG 등 범용적인 이미지 포맷을 지원하며 설정에서 기본 저장 형식을 변경할 수 있습니다." },
            { q: "Q29. 단축키를 내 마음대로 바꿀 수 있나요?", a: "네, 환경 설정에서 캡처, 녹화 등 주요 기능에 대한 단축키를 사용자 편의에 맞춰 변경할 수 있습니다." },
            { q: "Q30. 캡처한 파일은 어디에 저장되나요?", a: "기본 설정된 폴더에 자동으로 저장되며, 설정 메뉴에서 원하는 저장 경로로 자유롭게 변경할 수 있습니다." }
        ]
    }
];

const FeatureItem: React.FC<{ imageUrl: string; title: string; desc: string }> = ({ imageUrl, title, desc }) => (
    <div className="flex flex-col rounded-2xl bg-white border border-slate-100 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 group h-full">
        <div className="h-56 overflow-hidden bg-slate-100">
            <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-8">
            <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed whitespace-pre-line">{desc}</p>
        </div>
    </div>
);

const TechMarquee: React.FC = () => {
    const { t } = useLanguage();

    // Icons mapped to the 11 features from the request
    const techItems = [
        { icon: Crop, label: 'Area' },              // 영역 캡처
        { icon: Timer, label: 'Delay' },            // 지연 캡처
        { icon: Zap, label: 'Instant' },            // 순간 캡처
        { icon: Layers, label: 'Multi' },           // 멀티 캡처
        { icon: Maximize2, label: 'Full Screen' },  // 전체화면
        { icon: AppWindow, label: 'Window' },       // 지정/창 캡처
        { icon: Monitor, label: 'Monitor' },        // 창 캡처 (General)
        { icon: MousePointerClick, label: 'Unit' }, // 단위 캡처
        { icon: ArrowDownToLine, label: 'Scroll' }, // 스크롤 캡처
        { icon: Video, label: 'Record' },           // 화면 녹화
        { icon: ScanText, label: 'OCR' }            // OCR 캡처
    ];

    const scrollItems = [...techItems, ...techItems, ...techItems];

    return (
        <div className="w-full bg-indigo-600 py-6 overflow-hidden relative">
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
                    ALL-IN-ONE CAPTURE SUITE
                </p>
                <h2 className="text-2xl font-bold text-white max-w-2xl mx-auto leading-relaxed mb-1">
                    {t('catch.tech_tagline')}
                </h2>
                <p className="text-white/80 text-xs max-w-xl mx-auto font-medium leading-relaxed">
                    {t('catch.security_promise')}
                </p>
            </div>

            <div className="relative">
                <div className="animate-marquee flex gap-16 items-center">
                    {scrollItems.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-white/40 grayscale hover:grayscale-0 hover:text-white transition-all duration-300">
                            <item.icon size={32} />
                            <span className="text-lg font-black italic tracking-tighter opacity-20 uppercase whitespace-nowrap">{item.label}</span>
                        </div>
                    ))}
                </div>
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-indigo-600 via-transparent to-indigo-600" />
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
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
                    <HelpCircle size={24} />
                </div>
                <h2 className="text-3xl font-bold text-slate-900">FAQ & Help Center</h2>
                <p className="text-slate-500 mt-2">자주 묻는 질문을 확인하고 빠르게 문제를 해결하세요.</p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
                {CATCH_FAQ_DATA.map((section, idx) => (
                    <button
                        key={idx}
                        onClick={() => { setActiveTab(idx); setOpenIndex(null); }}
                        className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${activeTab === idx
                                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-200 ring-offset-2'
                                : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                            }`}
                    >
                        {section.category}
                    </button>
                ))}
            </div>

            {/* Questions List */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                {CATCH_FAQ_DATA[activeTab].items.map((item, idx) => (
                    <div key={idx} className="border-b border-slate-100 last:border-0">
                        <button
                            onClick={() => toggleItem(idx)}
                            className="w-full flex items-start justify-between p-6 text-left focus:outline-none hover:bg-slate-50/50 transition-colors"
                        >
                            <div className="flex gap-4">
                                <span className={`flex-shrink-0 font-bold text-lg ${openIndex === idx ? 'text-indigo-600' : 'text-slate-400'}`}>
                                    Q.
                                </span>
                                <span className={`text-base md:text-lg font-bold transition-colors ${openIndex === idx ? 'text-indigo-600' : 'text-slate-900'}`}>
                                    {item.q.replace(/^Q\d+\.\s/, '')}
                                </span>
                            </div>
                            {openIndex === idx ? <ChevronUp className="text-indigo-600 shrink-0 mt-1" size={20} /> : <ChevronDown className="text-slate-400 shrink-0 mt-1" size={20} />}
                        </button>
                        <div
                            className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                            <div className="px-6 pb-6 pl-14 pr-8">
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 leading-relaxed text-sm md:text-base whitespace-pre-line">
                                    <span className="font-bold text-indigo-600 mr-2">A.</span>
                                    {item.a}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 text-center">
                <p className="text-sm text-slate-400">
                    다른 질문이 있으신가요? <Link to="/contact" className="text-indigo-600 font-bold hover:underline">문의하기</Link>
                </p>
            </div>
        </div>
    );
};

export const CatchCapturePage: React.FC = () => {
    const { t } = useLanguage();

    const features = [
        {
            imageUrl: ASSETS.THUMB_DEV,
            title: t('catch.feat_precision'),
            desc: t('catch.feat_precision_desc')
        },
        {
            imageUrl: ASSETS.PREVIEW_HTML,
            title: t('catch.feat_advanced'),
            desc: t('catch.feat_advanced_desc')
        },
        {
            imageUrl: ASSETS.THUMB_DESIGN,
            title: t('catch.feat_edit'),
            desc: t('catch.feat_edit_desc')
        },
        {
            imageUrl: ASSETS.THUMB_PROD,
            title: t('catch.feat_smart'),
            desc: t('catch.feat_smart_desc')
        },
        {
            imageUrl: ASSETS.PREVIEW_PDF,
            title: t('catch.feat_pro'),
            desc: t('catch.feat_pro_desc')
        },
        {
            imageUrl: ASSETS.SLIDE_CATCH,
            title: t('catch.feat_user'),
            desc: t('catch.feat_user_desc')
        }
    ];

    return (
        <div className="w-full overflow-hidden bg-white">
            {/* 1. Hero Section with Graphics */}
            <section className="relative pt-24 pb-16 overflow-hidden bg-slate-50">

                {/* Background Graphics */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    {/* Crosshair/Grid Pattern */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                    {/* Animated Blobs (Indigo/Rose Theme) */}
                    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-32 left-[5%] text-indigo-300 animate-float" style={{ animationDelay: '0s' }}>
                        <Crop size={100} className="opacity-40 transform -rotate-12" />
                    </div>
                    <div className="absolute bottom-40 right-[10%] text-rose-300 animate-float" style={{ animationDelay: '2s' }}>
                        <ScanText size={80} className="opacity-40 transform rotate-12" />
                    </div>
                    {/* Dashed Selection Box */}
                    <div className="absolute top-1/4 right-1/4 w-32 h-20 border-2 border-dashed border-indigo-300/50 rounded-lg animate-pulse"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
                    {/* Left Content (Text) - 5 Columns */}
                    {/* Added lg:pl-16 to move text to the right */}
                    <div className="lg:col-span-5 space-y-10 text-left lg:pl-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-indigo-100 text-indigo-600 text-sm font-bold shadow-sm animate-fade-in-up opacity-0 [animation-fill-mode:forwards]">
                            <Crop size={16} /> {t('catch.badge')}
                        </div>
                        <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] animate-fade-in-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.1s' }}>
                            {t('catch.title')}
                        </h1>
                        <p className="text-xl text-slate-500 leading-relaxed max-w-lg animate-fade-in-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.2s' }}>
                            {t('catch.desc')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5 pt-4 animate-fade-in-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.3s' }}>
                            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-200 text-lg h-16 px-10 rounded-2xl">
                                <Download className="mr-3" size={24} />
                                {t('catch.download_btn')}
                            </Button>
                        </div>
                        <div className="flex gap-8 text-sm text-slate-400 font-semibold animate-fade-in-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.4s' }}>
                            <span className="flex items-center gap-2 uppercase tracking-wide"><Monitor size={16} /> Windows 10/11</span>
                            <span className="flex items-center gap-2 uppercase tracking-wide"><ShieldCheck size={16} /> Professional Grade</span>
                        </div>
                    </div>

                    {/* Right Content (Image) - 7 Columns (Wider) */}
                    <div className="lg:col-span-7 relative animate-fade-in-up opacity-0 [animation-fill-mode:forwards]" style={{ animationDelay: '0.2s' }}>
                        <div className="absolute -inset-8 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none"></div>
                        {/* Image Height Reduced to 395px */}
                        <div className="relative bg-white rounded-3xl shadow-2xl border-4 border-white overflow-hidden group">
                            <img
                                src={ASSETS.PREVIEW_CATCH}
                                alt={t('catch.preview_alt')}
                                className="w-full h-[395px] object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Tech Marquee Section */}
            <TechMarquee />

            {/* 3. Feature Grid Section Header */}
            <section className="max-w-7xl mx-auto px-4 pt-24 pb-12 text-center">
                <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('catch.feat_title')}</h2>
                <p className="text-lg text-slate-500 max-w-3xl mx-auto">{t('catch.feat_subtitle')}</p>
            </section>

            {/* 4. Feature Grid */}
            <section className="max-w-7xl mx-auto px-4 pb-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {features.map((feat, idx) => (
                        <FeatureItem key={idx} {...feat} />
                    ))}
                </div>
            </section>

            {/* 5. Steps Section */}
            <section className="bg-slate-50 py-32">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="bg-white rounded-[2rem] p-4 shadow-2xl border border-slate-200 relative z-10 overflow-hidden aspect-[16/10]">
                                <img src={ASSETS.THUMB_PROD} alt="Editor Preview" className="rounded-xl w-full h-full object-cover" />
                            </div>
                            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl z-0"></div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8 text-left">
                            <h2 className="text-4xl font-bold text-slate-900 leading-tight">{t('catch.flow_title')}</h2>
                            <div className="space-y-6">
                                <div className="flex gap-5">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-indigo-200">1</div>
                                    <p className="text-slate-600 leading-relaxed text-lg font-medium">{t('catch.flow_1')}</p>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-indigo-200">2</div>
                                    <p className="text-slate-600 leading-relaxed text-lg font-medium">{t('catch.flow_2')}</p>
                                </div>
                                <div className="flex gap-5">
                                    <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0 shadow-lg shadow-indigo-200">3</div>
                                    <p className="text-slate-600 leading-relaxed text-lg font-medium">{t('catch.flow_3')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. FAQ Section */}
            <section className="bg-slate-50/50 py-24">
                <FAQBoard />
            </section>

            {/* 7. Final CTA (Professional Design Upgrade) */}
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

                {/* 2. Grid Texture Overlay (High Contrast) */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:60px_60px] opacity-20 z-0 pointer-events-none"></div>

                {/* 3. Animated Spiral/Rings Effect - Centered Container */}
                {/* Reduced container size from 800px to 600px */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none z-0 opacity-60">
                    {/* Outer Ring - Slow Clockwise */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 border-dashed" style={{ animation: 'spin-cw 60s linear infinite' }}></div>

                    {/* Middle Ring - Medium Counter-Clockwise (Insets adjusted for smaller container) */}
                    <div className="absolute inset-[80px] rounded-full border-2 border-white/30" style={{ animation: 'spin-ccw 40s linear infinite' }}></div>

                    {/* Inner Ring - Fast Clockwise (Insets adjusted for smaller container) */}
                    <div className="absolute inset-[160px] rounded-full border-4 border-white/10" style={{ animation: 'spin-cw 20s linear infinite' }}></div>

                    {/* Orbiting Satellite */}
                    <div className="absolute inset-0" style={{ animation: 'spin-cw 25s linear infinite' }}>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-6 h-6 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]"></div>
                    </div>
                </div>

                {/* 4. Floating Light Orbs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 mix-blend-screen animate-blob"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-400/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 mix-blend-screen animate-blob animation-delay-2000"></div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight drop-shadow-2xl">
                        {t('catch.cta_title')}
                    </h2>
                    <p className="text-xl text-purple-100 mb-12 font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg opacity-90">
                        {t('catch.cta_desc')}
                    </p>

                    {/* Glowing Button Wrapper */}
                    <div className="relative inline-flex group">
                        <div className="absolute transition-all duration-1000 opacity-70 -inset-1 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-2xl blur-lg group-hover:opacity-100 group-hover:-inset-1.5 group-hover:duration-200 animate-tilt"></div>
                        <Button size="lg" className="relative !bg-white !text-[#6C5CE7] hover:!bg-slate-50 border-none px-12 py-5 text-xl font-bold rounded-2xl shadow-2xl transition-all transform group-hover:scale-[1.02] flex items-center gap-3">
                            {t('catch.cta_btn')}
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};
