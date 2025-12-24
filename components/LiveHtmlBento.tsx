
import React, { useState, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import { useLanguage } from '../contexts/LanguageContext';

interface BentoCardProps {
    children: React.ReactNode;
    className?: string;
    glowColor?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ children, className = "", glowColor = "rgba(168, 85, 247, 0.15)" }) => {
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

export const LiveHtmlBento: React.FC = () => {
    const { t } = useLanguage();
    const [typingText, setTypingText] = useState("");
    const fullCode = `<div className="hero">\n  <h1>Live Edit</h1>\n  <button>Click</button>\n</div>`;

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setTypingText(fullCode.slice(0, i));
            i++;
            if (i > fullCode.length) i = 0;
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min text-white mt-12">
            <style>
                {`
                @keyframes scan-neon {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100%); opacity: 0; }
                }
                @keyframes explode {
                    0% { transform: translateZ(0) rotateX(0); }
                    100% { transform: translateZ(50px) rotateX(5deg); }
                }
                @keyframes glitch {
                  0% { transform: translate(0); }
                  20% { transform: translate(-2px, 2px); }
                  40% { transform: translate(-2px, -2px); }
                  60% { transform: translate(2px, 2px); }
                  80% { transform: translate(2px, -2px); }
                  100% { transform: translate(0); }
                }
                @keyframes bounce-graph {
                    0%, 100% { height: 30%; }
                    50% { height: 80%; }
                }
                @keyframes orbit {
                    from { transform: rotate(0deg) translateX(40px) rotate(0deg); }
                    to { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
                }
                @keyframes progress-flash {
                    0% { width: 0%; box-shadow: 0 0 0px transparent; }
                    80% { width: 100%; box-shadow: 0 0 20px rgba(168, 85, 247, 0.5); }
                    100% { width: 100%; box-shadow: 0 0 0px transparent; }
                }
                .glitch-text {
                    animation: glitch 1s infinite linear alternate-reverse;
                }
                .scan-line-neon {
                    animation: scan-neon 3s ease-in-out infinite;
                }
                .layer-explode {
                    transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .group:hover .layer-explode {
                    transform: perspective(1000px) rotateY(-15deg) rotateX(10deg);
                }
                .export-progress {
                    animation: progress-flash 3s infinite ease-in-out;
                }
                `}
            </style>

            {/* 1. Main Visual Card (2x2) - Live Engine */}
            <BentoCard className="md:col-span-2 md:row-span-2 min-h-[450px]" glowColor="rgba(168, 85, 247, 0.15)">
                <div className="absolute inset-0 p-8 flex flex-col">
                    <div className="mb-6">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-400 text-[10px] font-bold uppercase tracking-widest">
                                Hybrid Engine
                            </div>
                        </div>
                        <h3 className="text-3xl font-black tracking-tighter leading-tight mb-2">
                            Real-time Hybrid <br />Development
                        </h3>
                        <p className="text-slate-400 text-sm max-w-sm">Bridge the gap between code and visual design with our instant-sync rendering technology.</p>
                    </div>

                    <div className="flex-1 flex gap-4 mt-4 relative">
                        {/* Code Side */}
                        <div className="flex-1 bg-[#050505] rounded-xl border border-white/5 p-4 font-mono text-[10px] text-purple-400/80 overflow-hidden relative">
                            <div className="absolute top-2 right-2 flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-slate-800" />
                                <div className="w-2 h-2 rounded-full bg-slate-800" />
                            </div>
                            <pre className="whitespace-pre-wrap">{typingText}<span className="animate-pulse">|</span></pre>
                        </div>
                        {/* UI Preview Side */}
                        <div className="flex-1 bg-white/5 rounded-xl border border-white/5 p-4 flex flex-col gap-4 items-center justify-center relative overflow-hidden group/preview">
                            <div className="w-full h-8 bg-purple-500/10 rounded-lg flex items-center justify-center text-[10px] font-bold text-purple-400 tracking-tighter border border-purple-500/20 group-hover/preview:scale-105 group-hover/preview:bg-purple-500 group-hover/preview:text-white transition-all duration-500">
                                DASHBOARD HERO
                            </div>
                            <div className="w-full flex gap-2">
                                <div className="h-12 flex-1 bg-white/5 rounded-lg border border-dashed border-white/10" />
                                <div className="h-12 w-12 bg-white/5 rounded-lg border border-dashed border-white/10" />
                            </div>
                            {/* Floating Interactive Cursor */}
                            <div className="absolute pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover/preview:translate-x-10 group-hover/preview:-translate-y-4 transition-all duration-1000 ease-in-out">
                                <Icon icon="solar:cursor-bold" className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" width="24" />
                                <div className="absolute top-6 left-6 px-2 py-1 bg-purple-500 text-[8px] font-bold rounded shadow-lg whitespace-nowrap">
                                    top: 124px
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BentoCard>

            {/* 2. Top Right Wide (2x1) - Conversion */}
            <BentoCard className="md:col-span-2 h-[220px]" glowColor="rgba(59, 130, 246, 0.15)">
                <div className="absolute inset-0 p-8 flex items-center justify-between overflow-hidden">
                    <div className="max-w-[220px] relative z-20">
                        <h4 className="text-xl font-bold mb-2">Intelligent Conversion</h4>
                        <p className="text-slate-400 text-xs">Analyze documents and explode layers with AI-precision scanning.</p>
                    </div>
                    {/* Visual: Layers Exploding */}
                    <div className="relative w-48 h-32 mr-4">
                        <div className="absolute inset-0 border border-white/10 bg-white/5 rounded-lg layer-explode z-30 translate-z-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/20 to-transparent flex items-center justify-center">
                            <Icon icon="solar:file-text-bold" width="32" className="text-blue-400" />
                        </div>
                        <div className="absolute inset-x-2 inset-y-2 border border-blue-500/20 bg-blue-500/5 rounded-lg layer-explode z-20 translate-z-10 translate-x-4 -translate-y-4" />
                        <div className="absolute inset-x-4 inset-y-4 border border-blue-500/10 bg-blue-500/5 rounded-lg layer-explode z-10 translate-z-0 translate-x-8 -translate-y-8" />

                        {/* Scanning Line */}
                        <div className="absolute inset-x-0 h-[2px] bg-blue-400 shadow-[0_0_15px_#3B82F6] z-40 scan-line-neon" />
                    </div>
                </div>
            </BentoCard>

            {/* 3. OCR (1x1) */}
            <BentoCard className="h-[214px]" glowColor="rgba(16, 185, 129, 0.15)">
                <div className="absolute inset-0 p-6 flex flex-col justify-between overflow-hidden">
                    <div className="relative h-20 w-full mb-4 group/ocr">
                        <div className="absolute inset-0 flex items-center justify-center opacity-30 grayscale group-hover/ocr:opacity-100 group-hover/ocr:grayscale-0 transition-all">
                            <span className="text-4xl font-black italic tracking-tighter glitch-text">TEXT</span>
                        </div>
                        <div className="absolute inset-0 border border-emerald-500/30 bg-emerald-500/5 rounded-lg group-hover/ocr:scale-110 transition-transform">
                            <div className="absolute inset-2 border border-dashed border-emerald-500/40" />
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold text-sm">Smart AI OCR</h5>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Pixel to Data</p>
                    </div>
                    <div className="absolute top-2 right-2">
                        <Icon icon="solar:scanner-bold" width="20" className="text-emerald-500 animate-pulse" />
                    </div>
                </div>
            </BentoCard>

            {/* 4. Icon Library (1x1) */}
            <BentoCard className="h-[214px]" glowColor="rgba(245, 158, 11, 0.15)">
                <div className="absolute inset-0 p-6 flex flex-col justify-between overflow-hidden">
                    <div className="relative h-24 w-full flex items-center justify-center">
                        <div className="relative w-16 h-16 bg-orange-500/10 rounded-full border border-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                            <Icon icon="solar:star-bold" width="32" className="text-orange-400" />

                            {[
                                "solar:heart-bold",
                                "solar:bell-bold",
                                "solar:settings-bold",
                                "solar:camera-bold"
                            ].map((icon, i) => (
                                <div
                                    key={i}
                                    className="absolute w-6 h-6 bg-[#111] border border-white/10 rounded-lg flex items-center justify-center text-slate-500"
                                    style={{
                                        animation: `orbit 10s linear infinite`,
                                        animationDelay: `-${i * 2.5}s`
                                    }}
                                >
                                    <Icon icon={icon} width="12" />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h5 className="font-bold text-sm">Asset Library</h5>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">SVG & Icons</p>
                    </div>
                </div>
            </BentoCard>

            {/* 5. Chart Engine (1x1) */}
            <BentoCard className="h-[214px]" glowColor="rgba(236, 72, 153, 0.15)">
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                    <div className="h-24 w-full flex items-end gap-1.5 px-2">
                        {[0.6, 0.8, 0.4, 0.9, 0.5, 0.7].map((h, i) => (
                            <div
                                key={i}
                                className="flex-1 bg-gradient-to-t from-pink-600 to-pink-400 rounded-t-sm"
                                style={{
                                    animation: 'bounce-graph 2s ease-in-out infinite alternate',
                                    animationDelay: `${i * 0.2}s`,
                                    height: `${h * 100}%`
                                }}
                            />
                        ))}
                    </div>
                    <div>
                        <h5 className="font-bold text-sm">Chart Engine</h5>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Real-time Data</p>
                    </div>
                </div>
            </BentoCard>

            {/* 6. No-code Drag & Drop (2x1) */}
            <BentoCard className="md:col-span-2 h-[214px]" glowColor="rgba(59, 130, 246, 0.15)">
                <div className="absolute inset-0 p-8 flex items-center justify-between">
                    <div className="z-20">
                        <h4 className="text-xl font-bold mb-1">No-code Control</h4>
                        <p className="text-slate-400 text-sm">Visualize layout flow with <br />Smart snapping & Grid guides.</p>
                    </div>
                    <div className="relative w-48 h-32 bg-[#050505] rounded-xl border border-white/5 p-4 flex items-center justify-center group/drag overflow-hidden">
                        {/* Grid lines */}
                        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:10px_10px]" />

                        <div className="w-20 h-20 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center relative group-hover/drag:scale-110 group-hover/drag:rotate-3 transition-all duration-500">
                            <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500" />
                            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500" />
                            <Icon icon="solar:layers-bold" width="24" className="text-blue-400" />
                        </div>

                        {/* Snap indicators */}
                        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-blue-500/50 opacity-0 group-hover/drag:opacity-100 transition-opacity" />
                        <div className="absolute inset-y-0 left-1/2 w-[1px] bg-blue-500/50 opacity-0 group-hover/drag:opacity-100 transition-opacity" />
                    </div>
                </div>
            </BentoCard>

            {/* 7. Export Card (1x1) */}
            <BentoCard className="h-[214px]" glowColor="rgba(168, 85, 247, 0.15)">
                <div className="absolute inset-0 p-6 flex flex-col justify-between group/export">
                    <div className="relative h-24 w-full flex items-center justify-center">
                        <div className="w-16 h-20 bg-[#151515] border border-white/10 rounded-lg shadow-2xl flex flex-col items-center justify-center group-hover/export:-translate-y-2 transition-transform duration-500">
                            <div className="w-8 h-8 rounded bg-purple-500 flex items-center justify-center text-white mb-2">
                                <Icon icon="solar:file-download-bold" width="20" />
                            </div>
                            <span className="text-[10px] font-black text-white/50">PPTX</span>
                        </div>
                    </div>
                    <div>
                        <div className="w-full h-1 bg-white/5 rounded-full mb-3 overflow-hidden">
                            <div className="h-full bg-purple-500 export-progress" />
                        </div>
                        <h5 className="font-bold text-sm">Native Export</h5>
                        <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">PPTX & PDF</p>
                    </div>
                </div>
            </BentoCard>
        </div>
    );
};
