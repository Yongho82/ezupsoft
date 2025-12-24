
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../contexts/LanguageContext';

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, className = "", glowColor = "rgba(255, 255, 255, 0.05)" }) => {
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

    return (
        <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className={`group relative overflow-hidden rounded-[2rem] bg-[#0A0A0A] border border-white/10 transition-all duration-500 hover:border-white/20 hover:-translate-y-1 ${className}`}
        >
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
        </div>
    );
};


export const CatchBento: React.FC = () => {
    const { t } = useLanguage();
    const [fps, setFps] = useState(60);

    useEffect(() => {
        const interval = setInterval(() => {
            setFps(prev => (prev === 60 ? (Math.random() > 0.5 ? 59 : 60) : 60));
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min text-white mt-12 pb-20">
            <style>
                {`
                @keyframes dash {
                    to { stroke-dashoffset: 0; }
                }
                @keyframes pulse-red {
                    0%, 100% { transform: scale(1); opacity: 1; box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
                    50% { transform: scale(1.1); opacity: 0.8; box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
                }
                @keyframes scan-line {
                    0% { top: 0; }
                    100% { top: 100%; }
                }
                @keyframes float-ui {
                    0%, 100% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-10px) translateX(5px); }
                }
                @keyframes marquee-up {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                @keyframes radar-beam {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                @keyframes slider-move {
                    0%, 100% { left: 10%; }
                    50% { left: 90%; }
                }
                @keyframes ai-scan {
                    0% { transform: translateY(-100%) scaleX(1.5); opacity: 0; }
                    50% { opacity: 0.5; }
                    100% { transform: translateY(100%) scaleX(1.5); opacity: 0; }
                }
                @keyframes rotate-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .sig-path {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: dash 5s linear infinite;
                }
                .mask-fade-edges {
                    mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
                }
                .animate-spin-slow {
                    animation: spin-slow 12s linear infinite;
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                @keyframes marquee-horizontal {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-50% - 0.5rem)); }
                }
                .animate-marquee-horizontal {
                    animation: marquee-horizontal 40s linear infinite;
                }
                .group:hover .animate-marquee-horizontal {
                    animation-play-state: paused;
                }
                `}
            </style>

            {/* 1. Main Visual Card (2x2) - Technical Focus */}
            <BentoCard className="md:col-span-2 md:row-span-2 min-h-[500px]" growColor="rgba(244, 63, 94, 0.15)">
                <div className="absolute inset-0 p-8 flex flex-col">
                    <div className="absolute top-4 left-4 text-[8px] font-mono text-slate-700">KERNEL_ID: RX-93_V3</div>
                    <div className="absolute top-4 right-4 flex gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                        <span className="text-[8px] font-mono text-rose-500">LIVE_SYSTEM</span>
                    </div>

                    <div className="mb-8">
                        <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold uppercase tracking-[0.2em] w-fit mb-4">
                            High-Speed Capture
                        </div>
                        <h3 className="text-4xl font-black tracking-tighter leading-tight mb-4">
                            Precision <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500">Screen Logic</span>
                        </h3>
                        <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                            Catch Capture delivers pixel-perfect results with zero-latency visual processing. Engineered for professionals.
                        </p>
                    </div>

                    <div className="relative flex-1 flex items-center justify-center">
                        <div className="relative w-full max-w-[400px] aspect-video bg-[#050505] rounded-2xl border border-white/10 shadow-2xl overflow-hidden group/screen">
                            {/* Technical UI Grid */}
                            <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:15px_15px]" />

                            {/* Central Focus Area */}
                            <div className="absolute inset-4 border border-rose-500/20 rounded-lg flex items-center justify-center">
                                <div className="w-full h-full p-4 relative">
                                    <svg className="w-full h-full opacity-30">
                                        <circle cx="50%" cy="50%" r="40" fill="none" stroke="#F43F5E" strokeWidth="0.5" strokeDasharray="4 4" />
                                        <line x1="0" y1="50%" x2="100%" y2="50%" stroke="#F43F5E" strokeWidth="0.5" />
                                        <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#F43F5E" strokeWidth="0.5" />
                                    </svg>

                                    {/* Rotating Radar */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-white/5 overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-transparent to-rose-500/20 origin-center animate-[radar-beam_4s_linear_infinite]" />
                                    </div>

                                    {/* Floating Tool Bubbles */}
                                    <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-500 shadow-xl animate-bounce">
                                        <Icon icon="solar:camera-bold" width="20" />
                                    </div>
                                    <div className="absolute bottom-4 left-4 w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-purple-500 shadow-xl animate-pulse" style={{ animationDelay: '1s' }}>
                                        <Icon icon="solar:videocamera-record-bold" width="20" />
                                    </div>
                                </div>
                            </div>

                            {/* Info Overlay */}
                            <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/60 rounded border border-white/10 text-[8px] font-mono text-slate-500">
                                COMP_RATIO: 1.2% | RENDER: VULKAN
                            </div>
                        </div>
                    </div>
                </div>
            </BentoCard>

            {/* 2. Top Mode Card (2x1) - Simple & Tray Mode Mockups */}
            <BentoCard className="md:col-span-2 h-[260px]" glowColor="rgba(59, 130, 246, 0.15)">
                <div className="absolute inset-0 p-8 flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-xl font-black mb-1">Modern Interfaces</h3>
                            <p className="text-slate-500 text-xs text-nowrap">Switch between optimized control modes</p>
                        </div>
                        <div className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] font-mono text-blue-500">UI_LAYER: OVERLAY</div>
                    </div>

                    <div className="flex gap-6 items-center flex-1">
                        {/* Simple Mode Mockup (Ultra Sleek Version) */}
                        <div className="flex-1 flex flex-col group/simple drop-shadow-2xl">
                            {/* Pro Title Bar - Ultra Thin */}
                            <div className="h-6 w-full bg-[#080808] rounded-t-xl border border-white/5 flex items-center px-4 justify-between relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

                                <div className="flex items-center gap-2.5 z-10">
                                    <div className="w-4 h-2 bg-green-500 rounded-full flex items-center px-0.5 shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all">
                                        <div className="w-1 h-1 rounded-full bg-white ml-auto" />
                                    </div>
                                    <span className="text-[6px] font-black text-slate-500 font-mono tracking-widest leading-none">A+</span>
                                </div>

                                {/* Minimalist Orange Emblem */}
                                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 flex items-center justify-center">
                                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-sm rotate-45 shadow-[0_0_8px_rgba(249,115,22,1)]" />
                                </div>

                                <div className="flex items-center gap-2 opacity-30 group-hover/simple:opacity-100 transition-opacity z-10 scale-75 origin-right">
                                    <Icon icon="solar:scanner-bold" width="12" className="text-slate-400" />
                                    <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-white shadow-lg">
                                        <Icon icon="solar:alt-arrow-right-bold" width="10" />
                                    </div>
                                    <Icon icon="solar:close-square-bold" width="12" className="text-slate-600" />
                                </div>
                            </div>

                            {/* Minimalist Tool Space - Ultra Slim Horizontal Row */}
                            <div className="bg-[#080808]/98 backdrop-blur-3xl rounded-b-xl border-x border-b border-white/5 px-4 py-3 flex items-center justify-between relative">
                                {[
                                    { icon: "solar:crop-minimalistic-bold", color: "text-blue-400" },
                                    { icon: "solar:clock-circle-bold", color: "text-emerald-400" },
                                    { icon: "solar:maximize-bold", color: "text-cyan-400" },
                                    { icon: "solar:target-bold", color: "text-indigo-400" },
                                    { icon: "solar:bolt-bold", color: "text-yellow-400" },
                                    { icon: "solar:monitor-bold", color: "text-sky-400" },
                                    { icon: "solar:settings-bold", color: "text-slate-500" }
                                ].map((tool, i) => (
                                    <div key={i} className={`flex items-center justify-center ${tool.color} hover:scale-125 transition-all cursor-pointer group/item`}>
                                        <Icon icon={tool.icon} width="24" className="relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
                                    </div>
                                ))}
                            </div>
                            <span className="mt-3 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] group-hover/simple:text-blue-500 transition-colors text-center">Simple Mode</span>
                        </div>

                        {/* Tray Mode Mockup (Realistic Version) */}
                        <div className="w-20 h-full flex flex-col items-center justify-center group/tray">
                            <div className="w-9 h-32 bg-[#0D0D0D] rounded-2xl border border-white/10 flex flex-col items-center py-3 justify-between shadow-2xl group-hover/tray:border-blue-500/30 transition-all shrink-0">
                                <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 cursor-pointer hover:scale-110 transition-transform">
                                    <Icon icon="solar:maximize-square-bold" width="14" />
                                </div>
                                <div className="w-px h-6 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-40 shadow-[0_0_8px_rgba(239,68,68,0.3)]" />
                                <span className="text-[12px] font-black text-slate-200 font-mono tracking-tighter">0</span>
                                <div className="w-px h-6 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-40 shadow-[0_0_8px_rgba(239,68,68,0.3)]" />
                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-orange-500 hover:bg-white/10 cursor-pointer">
                                    <Icon icon="solar:power-bold" width="12" />
                                </div>
                            </div>
                            <span className="mt-3 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] group-hover/tray:text-blue-500 transition-colors text-center">Tray Mode</span>
                        </div>
                    </div>
                </div>
            </BentoCard>

            {/* 3. Record Card (1x1) - MP4, GIF, MP3 Icons as Main */}
            <BentoCard className="h-[240px]" glowColor="rgba(244, 63, 94, 0.2)">
                <div className="p-6 h-full flex flex-col justify-between relative overflow-hidden group/record">
                    <div className="flex justify-between items-start z-10">
                        <div className="flex flex-col">
                            <p className="text-white font-black text-xl leading-tight">Multi-Format</p>
                            <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">Record Engine</p>
                        </div>
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                            <span className="text-[8px] font-mono text-red-500 font-bold">REC_LIVE</span>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-around py-4">
                        {[
                            { label: "MP4", icon: "solar:videocamera-record-bold", color: "text-rose-500" },
                            { label: "GIF", icon: "solar:album-bold", color: "text-emerald-500" },
                            { label: "MP3", icon: "solar:music-note-bold", color: "text-blue-500" }
                        ].map((fmt, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 group/fmt cursor-pointer transition-transform hover:-translate-y-2">
                                <div className={`w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${fmt.color} shadow-xl group-hover/fmt:border-white/20 transition-all`}>
                                    <Icon icon={fmt.icon} width="24" />
                                </div>
                                <span className="text-[10px] font-black text-slate-500 group-hover/fmt:text-white">{fmt.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 mt-2">
                        {/* Quality Slider Animation */}
                        <div className="space-y-1">
                            <div className="flex justify-between text-[8px] font-mono text-slate-500">
                                <span>QUALITY_RENDER</span>
                                <span>ULTRA_HD</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full relative overflow-hidden">
                                <div className="absolute inset-y-0 left-0 bg-rose-500/50 w-full animate-pulse" />
                                <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-lg animate-[slider-move_4s_ease-in-out_infinite]" />
                            </div>
                        </div>
                        {/* FPS Indicator Animation */}
                        <div className="flex items-center justify-between">
                            <span className="text-[8px] font-mono text-slate-500 uppercase">System_FPS</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-lg font-black text-white tabular-nums">{fps}</span>
                                <span className="text-[8px] font-bold text-slate-600">FR/S</span>
                            </div>
                        </div>
                    </div>
                </div>
            </BentoCard >

            {/* 4. Smart Unit (1x1) - Distinctive Animation */}
            < BentoCard className="h-[240px]" glowColor="rgba(168, 85, 247, 0.15)" >
                <div className="p-6 h-full flex flex-col justify-between overflow-hidden group/unit">
                    <div className="relative h-28 w-full bg-[#050505] rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
                        {/* Background Scanning Grid */}
                        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:10px_10px]" />

                        {/* Rotating Outer Ring */}
                        <div className="absolute w-24 h-24 border border-dashed border-rose-500/30 rounded-full animate-[rotate-slow_10s_linear_infinite]" />

                        {/* Precision Target Animation */}
                        <div className="relative w-24 h-16 flex items-center justify-center">
                            <div className="absolute inset-0 border-2 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.3)] rounded-sm" />
                            {/* Corner Accents */}
                            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white" />
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white" />

                            {/* Scanning Pulse Line */}
                            <div className="absolute inset-x-0 h-px bg-rose-500/50 animate-[scan-line_2s_ease-in-out_infinite] blur-[1px]" />

                            <div className="flex flex-col items-center">
                                <span className="text-[10px] font-black tracking-tighter text-white uppercase italic">Target Locked</span>
                                <span className="text-[6px] font-mono text-rose-500">COORD_X: 1920</span>
                            </div>
                        </div>

                        {/* Coordinate Markers */}
                        <div className="absolute top-2 left-2 text-[6px] font-mono text-slate-600">UNIT_DET: 0.12ms</div>
                        <div className="absolute bottom-2 right-2 text-[6px] font-mono text-slate-600">SYS_AUTH: CORE.EXE</div>
                    </div>
                    <div>
                        <p className="text-white font-black mb-0.5">Smart Unit</p>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-[0.2em]">Precision Target AI</p>
                    </div>
                </div>
            </BentoCard >

            {/* 5. Combined Capture Tool Suite (2x1) */}
            < BentoCard className="md:col-span-2 min-h-[160px]" glowColor="rgba(34, 197, 94, 0.15)" >
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="flex items-baseline gap-3">
                        <h4 className="text-xl font-black whitespace-nowrap">Various Smart Capture</h4>
                        <span className="text-slate-700">|</span>
                        <p className="text-slate-500 text-xs whitespace-nowrap">Everything from scroll capture to OCR text extraction</p>
                    </div>

                    <div className="flex-1 grid grid-cols-5 md:grid-cols-10 gap-2 bg-white/5 p-4 rounded-2xl border border-white/5 mt-4">
                        {[
                            { icon: "solar:crop-minimalistic-bold", label: "Area" },
                            { icon: "solar:clock-circle-bold", label: "Delay" },
                            { icon: "solar:bolt-bold", label: "Instant" },
                            { icon: "solar:layers-bold", label: "Multi" },
                            { icon: "solar:maximize-bold", label: "Full" },
                            { icon: "solar:target-bold", label: "Fixed" },
                            { icon: "solar:monitor-bold", label: "Window" },
                            { icon: "solar:widget-bold", label: "Element" },
                            { icon: "solar:mouse-circle-bold", label: "Scroll" },
                            { icon: "solar:album-bold", label: "OCR" }
                        ].map((tool, i) => (
                            <div key={i} className="flex flex-col items-center gap-1.5 group/tool cursor-pointer min-w-0">
                                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-500 group-hover/tool:text-white group-hover/tool:bg-green-500/20 group-hover/tool:border-green-500/50 transition-all">
                                    <Icon icon={tool.icon} width="18" />
                                </div>
                                <span className="text-[9px] font-black text-slate-500 uppercase group-hover/tool:text-green-500 tracking-tighter text-center line-clamp-1">{tool.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </BentoCard >

            {/* 6. AI Intelligence Card - More Distinctive Animation */}
            < BentoCard className="md:col-span-2 h-[140px]" glowColor="rgba(59, 130, 246, 0.2)" >
                <div className="absolute inset-0 p-6 flex flex-row items-center justify-between overflow-hidden">
                    <div className="z-20">
                        <h4 className="text-lg font-black mb-1">AI Intelligence</h4>
                        <p className="text-slate-500 text-xs">Advanced image-to-data neural bridge</p>
                    </div>

                    <div className="relative flex-1 h-full mx-8 flex items-center justify-center">
                        {/* Neural Hub Decoration */}
                        <div className="absolute w-20 h-20 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
                        <div className="relative z-10 w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                            <Icon icon="solar:globus-bold" width="24" className="animate-spin-slow" />
                        </div>
                        {/* Scanning Beams */}
                        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-32 border-x border-blue-500/10 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent animate-[ai-scan_3s_infinite]" />
                    </div>

                    <div className="flex gap-3 z-20">
                        <div className="relative group/ai">
                            <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-1 hover:border-blue-500/50 cursor-pointer transition-all hover:bg-white/10">
                                <Icon icon="solar:rounded-magnifer-bold" className="text-blue-500 group-hover/ai:scale-110 transition-transform" width="20" />
                                <span className="text-[8px] font-black text-slate-500 group-hover/ai:text-white uppercase tracking-widest">Search</span>
                            </div>
                        </div>
                        <div className="relative group/ai">
                            <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center gap-1 hover:border-blue-500/50 cursor-pointer transition-all hover:bg-white/10">
                                <Icon icon="solar:global-bold" className="text-cyan-500 group-hover/ai:scale-110 transition-transform" width="20" />
                                <span className="text-[8px] font-black text-slate-500 group-hover/ai:text-white uppercase tracking-widest">Translate</span>
                            </div>
                        </div>
                    </div>
                </div>
            </BentoCard >

            {/* 7. Advanced Localization (2x1) - Photo 4 Style */}
            < BentoCard className="md:col-span-2 h-[160px]" glowColor="rgba(234, 179, 8, 0.15)" >
                <div className="absolute inset-0 p-8 flex items-center justify-between">
                    <div className="max-w-[160px]">
                        <h4 className="text-xl font-black mb-1">Global Scale</h4>
                        <p className="text-slate-400 text-xs leading-relaxed">Native support for 15+ world languages, including Korean.</p>
                        <div className="mt-4 flex gap-2">
                            <div className="px-2 py-0.5 rounded border border-yellow-500/30 text-[8px] font-mono text-yellow-500">I18N_ENGINE: READY</div>
                        </div>
                    </div>

                    <div className="relative w-44 h-full overflow-hidden mask-fade-edges bg-[#121212] rounded-xl border border-white/5 group/list">
                        <div className="p-4 flex flex-col gap-2 animate-[marquee-up_20s_linear_infinite] group-hover/list:[animation-play-state:paused]">
                            {[
                                "English", "한국어", "日本語", "简体中文", "繁體中文",
                                "Español", "Deutsch", "Français", "Português", "Русский",
                                "Italiano", "Tiếng Việt", "Bahasa Indonesia", "Thai", "Türkçe"
                            ].concat([
                                "English", "한국어", "日本語", "简体中文", "繁體中文",
                                "Español", "Deutsch", "Français", "Português", "Русский"
                            ]).map((lang, i) => (
                                <div key={i} className="flex items-center gap-3 px-2 py-1.5 rounded hover:bg-white/5 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40" />
                                    <span className="text-[10px] font-bold text-slate-400">{lang}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </BentoCard >

            {/* 8. Editing Powerhouse (2x1) - Photo 5 Insight */}
            < BentoCard className="md:col-span-2 h-[160px]" glowColor="rgba(168, 85, 247, 0.15)" >
                <div className="absolute inset-0 p-8 flex items-center justify-between">
                    <div className="flex-1">
                        <h4 className="text-xl font-black mb-1">Editing Power</h4>
                        <div className="flex flex-col gap-4 mt-4">
                            <div className="flex items-center gap-3 group/edit cursor-pointer">
                                <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center text-green-400 group-hover:bg-green-500 group-hover:text-white transition-all shadow-lg">
                                    <Icon icon="solar:pen-bold" width="16" />
                                </div>
                                <div>
                                    <p className="text-xs font-black">Instant Edit Mode</p>
                                    <p className="text-[8px] text-slate-500 uppercase tracking-tighter">Capture & Edit Simultaneously</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 group/edit cursor-pointer">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-lg">
                                    <Icon icon="solar:palette-bold" width="16" />
                                </div>
                                <div>
                                    <p className="text-xs font-black">Pro Image Editor</p>
                                    <p className="text-[8px] text-slate-500 uppercase tracking-tighter">Rich annotation suite</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-48 h-full flex flex-col justify-center">
                        <div className="w-full h-8 bg-[#2A2A2A] rounded-md border border-white/10 flex items-center px-2 gap-1.5 shadow-xl scale-75 origin-right">
                            <div className="w-4 h-2 bg-green-500 rounded-full" />
                            <span className="text-[8px] font-black mr-auto">Instant Edit</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="w-3 h-3 rounded bg-white/5 border border-white/5" />
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col gap-2">
                            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 w-3/4" />
                            </div>
                            <div className="h-1.5 w-2/3 bg-white/5 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 w-1/2" />
                            </div>
                        </div>
                    </div>
                </div>
            </BentoCard >

        </div >
    );
};
