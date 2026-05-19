"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Story() {
  return (
    <section id="story" className="w-full max-w-[1480px] mx-auto px-exp-3 md:px-exp-4 py-exp-4 pb-exp-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-exp-4 items-stretch">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="py-exp-4 flex flex-col gap-exp-4 justify-center"
        >
          <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute">§ 05 · NARRATIVE HOOK</span>
          <h2 className="font-display font-bold text-[clamp(36px,4.6vw,64px)] m-0 tracking-[-0.02em] leading-[1.02]">
            One delivery <em className="not-italic text-bloom">changed everything</em>
          </h2>
          <p className="text-[17px] leading-[1.7] text-paper-dim max-w-[560px] m-0">
            You were supposed to move cargo — not start a war. But when a sealed module reveals a link to Bloom, your route becomes a target, your clients disappear, and The Crown Division begins to close in.
          </p>
          <div className="flex gap-exp-3 mt-exp-2 flex-wrap">
            <button className="h-12 px-[22px] rounded-sm bg-bloom text-ink-1 font-mono text-[11px] uppercase tracking-[0.22em] shadow-[0_0_0_1px_var(--color-bloom),0_10px_40px_rgba(255,61,138,0.35),inset_0_0_0_1px_rgba(255,255,255,0.15)] hover:bg-bloom-2 hover:-translate-y-[1px] hover:shadow-[0_0_0_1px_var(--color-bloom-2),0_14px_50px_rgba(255,61,138,0.55)] transition-all duration-250 flex items-center gap-exp-3">
              Follow the Signal <span className="opacity-70">→</span>
            </button>
            <button className="h-12 px-[22px] rounded-sm bg-transparent text-paper/70 font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-paper/10 transition-colors flex items-center gap-exp-3">
              Read Lore Brief
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative min-h-[520px] border border-line-2 overflow-hidden bg-[#0d0f15] scanlines"
        >
          <div className="absolute top-3.5 left-[18px] right-[18px] flex justify-between font-mono text-[10px] tracking-[0.16em] uppercase text-white/70 z-20">
            <span>SURVEILLANCE LOG · 03:18</span>
            <span className="text-crown">⚠ CROWN PROXIMITY</span>
          </div>
          
          <div className="absolute inset-0 z-10 overflow-hidden">
            <Image
              src="/assets/Story/StoryBig.png"
              alt="Tense courier scene showing sealed module delivery under pursuit"
              fill
              className="object-cover hover:scale-[1.03] transition-transform duration-1000 ease-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>
          

          
          {/* Warning Strip */}
          <div className="absolute left-0 right-0 bottom-0 h-[18px] bg-[repeating-linear-gradient(135deg,var(--color-crown)_0_14px,#000_14px_28px)] opacity-70 z-30" />
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes flicker {
          0%, 100% { opacity: 1; }
          48% { opacity: 1; }
          50% { opacity: 0.45; }
          52% { opacity: 1; }
        }
      `}} />
    </section>
  );
}
