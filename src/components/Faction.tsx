"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Faction() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const leftX = useTransform(smoothProgress, [0, 1], ["-100%", "0%"]);
  const rightX = useTransform(smoothProgress, [0, 1], ["100%", "0%"]);

  return (
    <section id="faction" className="w-full pb-exp-6 overflow-x-hidden">
      {/* Header Container */}
      <div className="w-full max-w-[1480px] mx-auto px-exp-3 md:px-exp-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-y-3 gap-x-exp-4 py-exp-5 pb-exp-4 border-b border-line">
          <div>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">§ 06 · FACTIONS</div>
            <h2 className="mt-exp-3 font-display font-bold text-[clamp(32px,4.2vw,56px)] leading-[1.02] tracking-[-0.02em] max-w-[900px]">
              Power has a color
            </h2>
          </div>
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute text-left md:text-right min-w-[200px] mt-2 md:mt-0">
            BLOOM vs CROWN <span className="md:hidden">·</span> <br className="hidden md:inline" /> READ THE FIELD
          </div>
        </div>
      </div>

      {/* Split Background & Content */}
      <div ref={containerRef} className="relative w-full mt-exp-4">
        
        {/* Animated Backgrounds */}
        <div className="absolute inset-0 flex flex-col lg:flex-row pointer-events-none">
          {/* Bloom Background */}
          <motion.div 
            style={{ x: leftX }}
            className="w-full lg:w-1/2 h-1/2 lg:h-full flex justify-center lg:justify-start origin-left min-h-[300.5px] lg:min-h-0 bg-transparent will-change-transform"
          >
            <div className="hidden min-[550px]:block flex-1 h-full bg-[#eb367b]" />
            <img src="/assets/runPNG.png" alt="Bloom Faction" className="h-full w-auto max-w-none object-contain -ml-[2px] shrink-0 min-h-[300.5px] lg:min-h-0" />
          </motion.div>
          {/* Crown Background */}
          <motion.div 
            style={{ x: rightX }}
            className="w-full lg:w-1/2 h-1/2 lg:h-full flex justify-center lg:justify-start origin-right min-h-[300.5px] lg:min-h-0 bg-transparent will-change-transform"
          >
            <img src="/assets/run2PNG.png" alt="Crown Faction" className="h-full w-auto max-w-none object-contain shrink-0 min-h-[300.5px] lg:min-h-0" />
            <div className="hidden min-[550px]:block flex-1 h-full bg-[#fbb504] -ml-[2px]" />
          </motion.div>
        </div>

        {/* Overlay Content (Constrained Grid) */}
        <div className="relative z-10 w-full max-w-[1480px] mx-auto grid grid-cols-1 lg:grid-cols-2 min-h-[520px] pointer-events-none">
          
          {/* Bloom Faction Text */}
          <div className="relative p-exp-4 flex flex-col justify-end gap-exp-4 pointer-events-auto border-x border-y lg:border-r-0 border-white/10 min-h-[300.5px] lg:min-h-0">
            <div className="absolute left-exp-4 top-exp-4 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-1 font-bold border border-line-2 px-exp-2 py-exp-2 bg-bloom shadow-lg shadow-bloom/20">
              FRIENDLY · NETWORK
            </div>

            <div className="mt-auto flex flex-col items-end text-right">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-bloom [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">
                THE LIVING SIGNAL —
              </span>
              <h3 className="font-display font-black text-[clamp(40px,5vw,72px)] m-0 tracking-[-0.025em] leading-[0.95] text-bloom mt-exp-2 [text-shadow:_0_4px_16px_rgba(0,0,0,0.6)] lg:min-h-[1.9em]">
                BLOOM
              </h3>
              <p className="text-[15px] leading-[1.7] text-paper max-w-[46ch] mt-exp-3 mb-0 [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)] font-medium">
                The living network pulsing through cities, machines and landscapes. A source of energy, memory and freedom.
              </p>
            </div>

            <div className="font-mono flex justify-between border-t border-line pt-exp-3 text-[10px] tracking-[0.18em] uppercase text-white/70 [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">
              <span>FREQ · 0xA7</span>
              <span>PINK · WHITE · CYAN</span>
            </div>
          </div>

          {/* Crown Faction Text */}
          <div className="relative p-exp-4 flex flex-col justify-end gap-exp-4 pointer-events-auto border-x border-y lg:border-l border-white/10 lg:border-l-white/20 min-h-[300.5px] lg:min-h-0">
            <div className="absolute right-exp-4 top-exp-4 font-mono text-[10px] tracking-[0.2em] uppercase text-ink-1 bg-crown border-crown font-bold px-exp-2 py-exp-2 shadow-sm">
              HOSTILE · ARMED
            </div>

            <div>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-crown [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">
                — AUTHORITARIAN CONTROL
              </span>
              <h3 className="font-display font-black text-[clamp(40px,5vw,72px)] m-0 tracking-[-0.025em] leading-[0.95] text-crown mt-exp-2 [text-shadow:_0_4px_16px_rgba(0,0,0,0.6)] lg:min-h-[1.9em]">
                THE CROWN DIVISION
              </h3>
              <p className="text-[15px] leading-[1.7] text-paper max-w-[46ch] mt-exp-3 mb-0 [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)] font-medium">
                A militarized authority built on surveillance, transit control and force. If yellow appears, danger is near.
              </p>
            </div>

            <div className="font-mono flex justify-between border-t border-line pt-exp-3 text-[10px] tracking-[0.18em] uppercase text-white/70 [text-shadow:_0_2px_8px_rgba(0,0,0,0.6)]">
              <span>BLACK · GRAY · YELLOW</span>
              <span>FREQ · CR-Ω</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
