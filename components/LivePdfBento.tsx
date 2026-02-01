
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
    to?: string;
    onClick?: () => void;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, className = "", glowColor = "rgba(59, 130, 246, 0.15)", to, onClick }) => {
    const isClickable = to || onClick;
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    const cardContent = (
        <>
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />

            {/* Spotlight Effect */}
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 40%)`,
                }}
            />
            <div className="relative z-10 h-full w-full">{children}</div>
        </>
    );

    const baseClassName = `group relative overflow-hidden rounded-[2rem] bg-[#0A0A0A] border border-white/10 transition-all duration-500 hover:border-white/20 hover:-translate-y-1 ${isClickable ? 'cursor-pointer' : ''} ${className}`;

    if (to) {
        return (
            <Link
                to={to}
                className={baseClassName}
                onMouseMove={handleMouseMove}
            >
                {cardContent}
            </Link>
        );
    }

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onClick={onClick}
            className={baseClassName}
        >
            {cardContent}
        </div>
    );
};

export const LivePdfBento: React.FC = () => {
    const { t } = useLanguage();
    const [compressText, setCompressText] = useState(10.0);

    // PDF 도구로 직접 이동하는 함수
    const navigateToPdfTool = (tool: string, subTool?: string) => {
        const params = new URLSearchParams();
        params.set('tool', tool);
        if (subTool) params.set('sub', subTool);
        window.open(`/live-pdf/app?${params.toString()}`, '_blank');
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setCompressText(prev => {
                if (prev <= 1.0) return 10.0;
                return parseFloat((prev - 0.3).toFixed(1));
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min text-white mt-12">
            <style>
                {`
                @keyframes orbit-pdf {
                    from { transform: rotate(0deg) translateX(40px) rotate(0deg); }
                    to { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
                }
                @keyframes lock-shield {
                    0% { transform: scale(0.8); opacity: 0; }
                    50% { transform: scale(1.2); opacity: 0.5; }
                    100% { transform: scale(1.5); opacity: 0; }
                }
                @keyframes compress-box {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(0.4); }
                }
                @keyframes stack-merge {
                    0% { transform: translateY(20px) scale(0.8); opacity: 0; }
                    50% { transform: translateY(0) scale(1.1); opacity: 1; }
                    100% { transform: translateY(0) scale(1); }
                }
                @keyframes stack-split {
                    0% { transform: rotate(0); }
                    100% { transform: rotate(15deg) translateX(20px); }
                }
                @keyframes scan-heic {
                    0% { left: -10%; }
                    100% { left: 110%; }
                }
                @keyframes draw-sig {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes float-ui {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .sig-path {
                    stroke-dasharray: 200;
                    stroke-dashoffset: 200;
                    animation: draw-sig 3s ease-in-out infinite alternate;
                }
                .shield-ripple {
                    animation: lock-shield 2s ease-out infinite;
                }
                .compress-anim {
                    animation: compress-box 2s ease-in-out infinite;
                }
                .scan-bar {
                    animation: scan-heic 2s linear infinite;
                }
                `}
            </style>

            {/* A. 메인 히어로 - PDF Studio Preview (2x2) */}
            <BentoCard className="md:col-span-2 md:row-span-2 min-h-[450px]" glowColor="rgba(59, 130, 246, 0.2)" to="/live-pdf/app">
                <div className="absolute inset-0 p-8 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                                PDF STUDIO v1.5
                            </div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">0.8s Processed</span>
                        </div>
                        <h3 className="text-4xl font-black tracking-tighter leading-tight mb-4">
                            Next-Gen <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">PDF Management</span>
                        </h3>
                        <p className="text-slate-400 text-base max-w-sm leading-relaxed">
                            Experience ultimate performance and precision in local PDF editing and conversion.
                        </p>
                    </div>

                    <div className="relative mt-auto h-1/2 flex items-center justify-center">
                        <div className="relative w-full max-w-[340px] aspect-video bg-[#151515] rounded-2xl border border-white/10 shadow-2xl overflow-hidden group/screen">
                            <div className="absolute top-0 inset-x-0 h-6 bg-[#1a1a1a] flex items-center px-4 gap-1.5 border-b border-white/5">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-500/50" />
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
                            </div>
                            <div className="p-4 pt-10 flex flex-col gap-4">
                                <div className="h-24 w-full bg-white/5 rounded-lg border border-white/5 relative p-4">
                                    <div className="w-2/3 h-3 bg-white/10 rounded mb-2" />
                                    <div className="w-full h-3 bg-white/10 rounded mb-2" />
                                    {/* Auto Signature Animation */}
                                    <svg className="absolute bottom-4 right-8 w-24 h-12 overflow-visible">
                                        <path
                                            d="M 10,30 C 20,10 40,50 60,30 S 80,10 90,30"
                                            fill="none"
                                            stroke="#3B82F6"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            className="sig-path"
                                        />
                                    </svg>
                                </div>
                                <div className="flex gap-2">
                                    <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                                        <Icon icon="solar:text-field-focus-bold" width="16" />
                                    </div>
                                    <div className="p-2 rounded-lg bg-white/10 text-slate-400">
                                        <Icon icon="solar:pen-bold" width="16" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BentoCard>

            {/* B. 문서 변환 - Orbiting Icons (2x1) */}
            <BentoCard className="md:col-span-2 h-[220px]" glowColor="rgba(59, 130, 246, 0.15)" onClick={() => navigateToPdfTool('convert', 'wordToPdf')}>
                <div className="absolute inset-0 p-8 flex items-center justify-between">
                    <div className="max-w-[180px]">
                        <h4 className="text-xl font-bold mb-1">Office to PDF</h4>
                        <p className="text-slate-400 text-xs">Seamless conversion between any office formats and PDF.</p>
                        <span className="text-[12px] text-blue-400/50 font-mono mt-4 block">Fast & Secure</span>
                    </div>
                    <div className="relative w-32 h-32 flex items-center justify-center">
                        <div className="relative w-16 h-16 bg-blue-500/20 rounded-2xl border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <Icon icon="solar:file-text-bold" width="32" className="text-blue-400" />

                            {[
                                { icon: "solar:file-corrupt-bold", color: "text-blue-500" }, // Word
                                { icon: "solar:course-up-bold", color: "text-emerald-500" }, // Excel
                                { icon: "solar:play-stream-bold", color: "text-orange-500" } // PPT
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    className={`absolute w-8 h-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg flex items-center justify-center ${item.color}`}
                                    style={{
                                        animation: `orbit-pdf 8s linear infinite`,
                                        animationDelay: `-${i * 2.6}s`
                                    }}
                                >
                                    <Icon icon={item.icon} width="16" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </BentoCard>

            {/* C. 스마트 보안 - Lock (1x1) */}
            <BentoCard className="md:col-span-1 h-[214px]" glowColor="rgba(168, 85, 247, 0.15)" onClick={() => navigateToPdfTool('edit')}>
                <div className="absolute inset-0 p-6 flex flex-col justify-between overflow-hidden">
                    <div className="relative h-24 w-full flex items-center justify-center">
                        <div className="relative w-16 h-16 rounded-full flex items-center justify-center">
                            <div className="absolute inset-0 border-2 border-purple-500/30 rounded-full shield-ripple" />
                            <div className="absolute inset-0 border-2 border-purple-500/20 rounded-full shield-ripple" style={{ animationDelay: '0.6s' }} />
                            <div className="relative w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center text-white shadow-xl shadow-purple-500/50 group-hover:scale-110 transition-transform">
                                <Icon icon="solar:lock-keyhole-bold" width="24" className="group-hover:rotate-12 transition-transform" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold text-sm">Security Hub</h5>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Protect & Unlock</p>
                    </div>
                    <div className="absolute bottom-2 right-2 text-[8px] font-mono text-purple-400">0.4s Processed</div>
                </div>
            </BentoCard>

            {/* D. 무손실 압축 - Compress Box (1x1) */}
            <BentoCard className="md:col-span-1 h-[214px]" glowColor="rgba(34, 197, 94, 0.15)" onClick={() => navigateToPdfTool('compress')}>
                <div className="absolute inset-0 p-6 flex flex-col justify-between items-center text-center">
                    <div className="relative h-24 w-full flex flex-col items-center justify-center">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-lg border border-emerald-500/30 flex items-center justify-center text-emerald-400 compress-anim mb-2">
                            <Icon icon="solar:layers-minimalistic-bold" width="24" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black text-white">{compressText}MB</span>
                            <Icon icon="solar:alt-arrow-down-bold" width="12" className="text-emerald-500 my-0.5 self-center" />
                            <span className="text-sm font-bold text-emerald-500">1.0MB</span>
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold text-sm">Compression</h5>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">Lossless Quality</p>
                    </div>
                    <div className="absolute bottom-2 right-2 text-[8px] font-mono text-emerald-400">1.2s Processed</div>
                </div>
            </BentoCard>

            {/* E. 페이지 관리 - Stack Animation (2x1) */}
            <BentoCard className="md:col-span-2 h-[240px]" glowColor="rgba(59, 130, 246, 0.15)" onClick={() => navigateToPdfTool('merge')}>
                <div className="absolute inset-0 p-8 flex items-center justify-between group/stack">
                    {/* Technical Markers */}
                    <div className="absolute top-4 left-4 text-[8px] font-mono text-slate-700">COORD_SYS: STACK_GRID</div>
                    <div className="absolute bottom-4 left-4 flex gap-4">
                        <div className="text-[8px] font-mono text-slate-700 uppercase">Z-Index: Active</div>
                        <div className="text-[8px] font-mono text-slate-700 uppercase">Layers: 03</div>
                    </div>

                    <div className="z-20">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_#3B82F6] animate-pulse" />
                            <h4 className="text-2xl font-black">Page Manager</h4>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">Merge multiple files or split complex documents with zero data loss.</p>
                        <div className="flex gap-2 mt-6">
                            <button className="px-4 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 hover:bg-blue-500 hover:text-white transition-all">MERGE_FILES</button>
                            <button className="px-4 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-slate-500 hover:text-white transition-all">SPLIT_PAGES</button>
                        </div>
                    </div>

                    <div className="relative w-64 h-full flex items-center justify-center">
                        <div className="absolute inset-x-8 inset-y-12 border border-blue-500/10 rounded-xl bg-blue-500/[0.02] -skew-x-6" />

                        {[0, 1, 2].map(i => (
                            <div
                                key={i}
                                className="absolute w-28 h-36 bg-[#0F0F0F] border border-white/10 rounded-lg shadow-2xl backdrop-blur-md group-hover/stack:scale-105 transition-all duration-700 overflow-hidden"
                                style={{
                                    transform: `translateX(${i * 20 - 10}px) translateY(${i * -12 + 6}px)`,
                                    zIndex: 10 - i,
                                    animation: 'stack-merge 4s ease-in-out infinite',
                                    animationDelay: `${i * 0.3}s`
                                }}
                            >
                                <div className="absolute top-0 inset-x-0 h-1 bg-blue-500/50" />
                                <div className="p-3">
                                    <div className="w-full h-2 bg-white/5 rounded-full mb-2" />
                                    <div className="w-4/5 h-2 bg-white/5 rounded-full mb-2" />
                                    <div className="w-2/3 h-2 bg-white/5 rounded-full" />
                                    <div className="mt-4 flex gap-1">
                                        {[1, 2, 3, 4].map(j => (
                                            <div key={j} className="h-1 flex-1 bg-blue-500/20 rounded-full" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </BentoCard>

            {/* F. HEIC 엔진 - Scan (2x1) */}
            <BentoCard className="md:col-span-2 h-[240px]" glowColor="rgba(244, 63, 94, 0.15)" onClick={() => navigateToPdfTool('convert', 'jpgToPdf')}>
                <div className="absolute inset-0 p-8 flex items-center justify-between overflow-hidden group/heic">
                    {/* Structure Lines */}
                    <div className="absolute inset-x-0 top-1/2 h-px bg-white/[0.03]" />
                    <div className="absolute inset-y-0 right-1/2 w-px bg-white/[0.03]" />

                    <div className="z-20">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_#F43F5E] animate-pulse" />
                            <h5 className="text-2xl font-black">HEIC Engine</h5>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">Next-gen HEIC to JPG conversion. Powered by native WASM-accelerated imaging.</p>
                        <div className="mt-4 flex items-center gap-3">
                            <div className="px-2 py-0.5 rounded border border-rose-500/20 text-[8px] font-mono text-rose-500 uppercase">Format: Apple_Img</div>
                            <div className="px-2 py-0.5 rounded border border-blue-500/20 text-[8px] font-mono text-blue-500 uppercase">Output: JPG_Raw</div>
                        </div>
                    </div>

                    <div className="relative w-64 h-full flex items-center justify-center">
                        <div className="relative flex items-center gap-6">
                            <div className="relative w-24 h-24 bg-[#0F0F0F] border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
                                <span className="text-xs font-black text-slate-700 tracking-tighter">HEIC_FMT</span>
                                <div className="absolute inset-x-0 h-[2px] bg-rose-500 shadow-[0_0_15px_#F43F5E] scan-bar" />
                                <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent opacity-0 group-hover/heic:opacity-100 transition-opacity" />
                            </div>

                            <div className="flex flex-col gap-1 items-center">
                                <Icon icon="solar:double-alt-arrow-right-bold" className="text-slate-800 animate-pulse" width="20" />
                                <div className="text-[8px] font-mono text-slate-800 uppercase">Process</div>
                            </div>

                            <div className="relative w-24 h-24 bg-rose-500/5 border border-rose-500/20 rounded-2xl flex items-center justify-center shadow-2xl group-hover/heic:border-rose-500/50 transition-all duration-500">
                                <span className="text-sm font-black text-rose-500">JPG</span>
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full flex items-center justify-center">
                                    <Icon icon="solar:check-circle-bold" className="text-white" width="8" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-8 text-[10px] font-mono text-rose-500/40 uppercase tracking-widest font-bold">0.9s Processed</div>
                </div>
            </BentoCard>

            {/* G. 에디팅 도구 - Pencil (2x1) */}
            <BentoCard className="md:col-span-2 h-[240px]" glowColor="rgba(234, 179, 8, 0.15)" onClick={() => navigateToPdfTool('edit')}>
                <div className="absolute inset-0 p-8 flex items-center justify-between overflow-hidden group/draw">
                    <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/20" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-white/20" />

                    <div className="z-20">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-500 shadow-[0_0_8px_#EAB308] animate-pulse" />
                            <h4 className="text-2xl font-black">Creative Tools</h4>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">Enhanced annotation suite. Draw, highlight, and brand your documents with ease.</p>
                        <div className="flex gap-3 mt-6">
                            {["solar:pen-bold", "solar:highlighter-bold", "solar:text-bold", "solar:shapes-bold"].map((icon, i) => (
                                <div key={i} className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 hover:text-yellow-500 hover:border-yellow-500/50 transition-all cursor-pointer">
                                    <Icon icon={icon} width="20" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative w-72 h-44 bg-[#050505] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:10px_10px]" />

                        <div className="absolute top-0 inset-x-0 h-4 bg-white/5 border-b border-white/10 flex items-center px-2">
                            <div className="flex justify-between w-full opacity-30">
                                {[0, 50, 100, 150, 200, 250].map(v => (
                                    <span key={v} className="text-[6px] font-mono text-white">{v}</span>
                                ))}
                            </div>
                        </div>

                        <div className="relative w-full h-full p-6 pt-10">
                            <Icon
                                icon="solar:pen-new-square-bold"
                                width="32"
                                className="absolute top-1/2 left-1/4 text-yellow-500 drop-shadow-[0_0_15px_#EAB308] group-hover/draw:translate-x-32 group-hover/draw:-translate-y-4 transition-all duration-[2000ms] ease-in-out"
                            />
                            <div className="absolute top-12 right-12 w-16 h-16 bg-white/5 border border-dashed border-white/20 rounded-full group-hover/draw:scale-125 transition-transform duration-1000" />
                            <div className="absolute bottom-8 right-12 w-24 h-12 border border-yellow-500/20 bg-yellow-500/[0.02] rounded-lg" />
                            <div className="absolute bottom-10 left-10 px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[8px] font-bold rounded">REF_BOX_71</div>
                        </div>
                    </div>
                </div>
            </BentoCard>

            {/* H. 디지털 서명 - Signature (2x1) */}
            <BentoCard className="md:col-span-2 h-[240px]" glowColor="rgba(59, 130, 246, 0.15)" onClick={() => navigateToPdfTool('edit')}>
                <div className="absolute inset-0 p-8 flex items-center justify-between group/sig">
                    <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 rounded bg-blue-500/10 border border-blue-500/20">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-blue-400 uppercase tracking-widest font-bold">Encrypted Sign Vault</span>
                    </div>

                    <div className="z-20">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60A5FA] animate-pulse" />
                            <h5 className="text-2xl font-black">Digital Signature</h5>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed max-w-[240px]">Cloud-ready digital signatures. Sign any document with natural fluidity and legal compliance.</p>
                        <div className="mt-8 flex items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-[8px] font-mono text-slate-600 uppercase">Verification_ID</span>
                                <span className="text-[10px] font-mono text-blue-400 font-bold">#EZUP-SIGN-PREMIUM</span>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500 text-white shadow-lg shadow-blue-500/20 cursor-pointer hover:scale-105 transition-transform">
                                <Icon icon="solar:pen-2-bold" width="14" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Sign Now</span>
                            </div>
                        </div>
                    </div>

                    <div className="relative w-80 h-44 bg-[#0F0F0F] rounded-2xl border border-white/10 shadow-2xl p-4 flex flex-col justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#3B82F6_1px,transparent_1px)] bg-[size:12px_12px]" />
                        <div className="mb-2 flex justify-between items-center text-[8px] font-mono text-white/30 uppercase tracking-tighter">
                            <span>Signature Area // Native_Input</span>
                            <span className="text-blue-500/50">SECURE_CHANNEL</span>
                        </div>
                        <div className="w-full h-full bg-black/60 rounded-lg border border-white/5 flex items-center justify-center relative">
                            <svg className="w-full h-full p-4 overflow-visible">
                                <path
                                    d="M 20,40 Q 50,0 80,50 T 150,30 Q 180,60 220,10"
                                    fill="none"
                                    stroke="#3B82F6"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    className="sig-path"
                                />
                            </svg>
                            <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-blue-500/50" />
                            <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-blue-500/50" />
                        </div>
                    </div>
                    <div className="absolute bottom-4 right-8 text-[10px] font-mono text-blue-500/40 uppercase tracking-widest font-bold">0.2s Processed</div>
                </div>
            </BentoCard>
        </div>
    );
};
