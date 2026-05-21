"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Parallax effects
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "20%"]);
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[min(100vh,1080px)] min-h-[850px] overflow-hidden bg-[#d51b62] border-b border-line isolate"
    >
      {/* Background with Parallax */}
      <motion.div 
        style={{ y: bgY }}
        className="absolute inset-0 z-0"
      >
        <div 
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-[58%] lg:left-auto lg:right-[12%] lg:translate-x-0 h-[82%] w-auto"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 25%, black 80%, transparent 95%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%, black 80%, transparent 95%)"
          }}
        >
          <video 
            autoPlay 
            muted 
            loop 
            playsInline
            className="h-full w-auto max-w-none"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)"
            }}
          >
            <source src="/assets/HeroVideo.mp4" type="video/mp4" />
          </video>
        </div>
      </motion.div>
      
      {/* Left shadow gradient */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[linear-gradient(90deg,rgba(8,4,10,0.78)_0%,rgba(8,4,10,0.55)_22%,rgba(8,4,10,0.18)_44%,transparent_60%),linear-gradient(180deg,rgba(8,4,10,0.45)_0%,transparent_18%,transparent_78%,rgba(8,4,10,0.55)_100%)]" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none grid-bg" />
      
      {/* Scanlines */}
      <div className="absolute inset-0 z-30 pointer-events-none scanlines" />

      {/* Signal Line */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[linear-gradient(180deg,transparent,var(--color-bloom),transparent)] z-40 animate-[sig_3.5s_ease-in-out_infinite]" />

      {/* Corner Brackets */}
      <div className="absolute top-[18px] left-[18px] w-[22px] h-[22px] border border-bloom border-r-0 border-b-0 z-40" />
      <div className="absolute top-[18px] right-[18px] w-[22px] h-[22px] border border-bloom border-l-0 border-b-0 z-40" />
      <div className="absolute bottom-[18px] left-[18px] w-[22px] h-[22px] border border-bloom border-r-0 border-t-0 z-40" />
      <div className="absolute bottom-[18px] right-[18px] w-[22px] h-[22px] border border-bloom border-l-0 border-t-0 z-40" />

      {/* Content Inner */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-50 w-full max-w-[1480px] mx-auto px-exp-3 md:px-exp-4 h-full flex flex-col justify-between pt-[80px]"
      >
        {/* Top Strip */}
        <div className="flex justify-between items-center flex-wrap gap-exp-3 py-[18px] border-b border-white/10 font-mono text-[10px] uppercase tracking-[0.2em] text-paper-dim">
          <span>OPERATIVE · COURIER-07 // SECTOR 04 · NORTHWALL</span>
          <span className="hidden md:flex items-center gap-exp-2 text-paper">
            <span className="w-[7px] h-[7px] rounded-full bg-bloom shadow-[0_0_10px_var(--color-bloom)] animate-pulse" /> 
            LIVE FEED · 22:41 LOCAL
          </span>
          <span className="hidden md:inline text-crown">⚠ CROWN PROXIMITY · 1.2KM</span>
        </div>

        {/* Hero Copy */}
        <div className="flex-1 flex flex-col justify-center max-w-[780px] py-exp-4">
          <div className="hidden md:flex items-center flex-wrap gap-exp-3 mb-exp-3 font-mono text-[11px] tracking-[0.18em] uppercase text-mute">
            <span className="text-bloom-2">● SIGNAL DETECTED · FREQ 0xA7</span>
            <span>FILE · PX-01 / SEALED</span>
          </div>
          
          <h1 className="font-display font-black text-[clamp(56px,7.2vw,124px)] leading-[1em] tracking-[-0.03em] mt-exp-2 mb-exp-4 text-shadow-hero">
            <span className="block glitch-text" data-text="NEON" style={{ display: "block" }}>NEON</span>
            <span className="block bg-bloom-gradient bg-clip-text text-transparent text-shadow-bloom glitch-bloom" data-text="BLOOM" style={{ display: "block" }}>BLOOM</span>
          </h1>
          
          <p className="font-display font-medium text-2xl tracking-[0.005em] text-paper max-w-[600px] mb-exp-3 text-shadow-hero">
            Deliver the signal. <em className="not-italic text-bloom-2">Defy the Crown.</em>
          </p>
          
          <p className="max-w-[520px] text-[15.5px] leading-[1.65] text-paper/85 mb-exp-4 text-shadow-hero">
            A vibrant open-world cyberpunk adventure where a lone courier is pulled into a conflict over the living network known as Bloom.
          </p>
          
          <div className="flex flex-wrap gap-exp-3">
            <button className="h-12 px-[22px] rounded-sm bg-bloom text-ink-1 font-mono text-[11px] uppercase tracking-[0.22em] shadow-[0_0_0_1px_var(--color-bloom),0_10px_40px_rgba(255,61,138,0.35),inset_0_0_0_1px_rgba(255,255,255,0.15)] hover:bg-bloom-2 hover:-translate-y-[1px] hover:shadow-[0_0_0_1px_var(--color-bloom-2),0_14px_50px_rgba(255,61,138,0.55)] transition-all duration-250 flex items-center gap-exp-3">
              Watch Trailer <span className="opacity-70">▶</span>
            </button>
            <button className="h-12 px-[22px] rounded-sm border border-paper text-paper font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-paper/10 transition-colors flex items-center gap-exp-3">
              Explore the World <span className="opacity-70">→</span>
            </button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-exp-3 py-[18px] pb-exp-3 border-t border-white/10 backdrop-blur-md">
          <div className="flex flex-col gap-exp-1">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/55">Genre</span>
            <span className="font-mono font-medium text-[12.5px] tracking-[0.08em] text-paper">Open-World Action</span>
          </div>
          <div className="flex flex-col gap-exp-1">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/55">Engine</span>
            <span className="font-mono font-medium text-[12.5px] tracking-[0.08em] text-paper">Bloom Runtime</span>
          </div>
          <div className="flex flex-col gap-exp-1">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/55">Release</span>
            <span className="font-mono font-medium text-[12.5px] tracking-[0.08em] text-paper">2027 · Q2</span>
          </div>
          <div className="flex flex-col gap-exp-1">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/55">Platforms</span>
            <span className="font-mono font-medium text-[12.5px] tracking-[0.08em] text-paper">PC · PS · XB</span>
          </div>
          <div className="flex flex-col gap-exp-1">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/55">Cargo</span>
            <span className="font-mono font-medium text-[12.5px] tracking-[0.08em] text-bloom-2">PX-01 · SEALED</span>
          </div>
          <div className="flex flex-col gap-exp-1">
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/55">Route</span>
            <span className="font-mono font-medium text-[12.5px] tracking-[0.08em] text-crown">RT-44 → DISTRICT 09</span>
          </div>
        </div>
      </motion.div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes sig {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 1; }
        }
      `}} />
    </section>
  );
}
