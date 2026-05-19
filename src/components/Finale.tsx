"use client";

import { motion } from "framer-motion";

const TICKER_ITEMS = [
  "BLOOM NETWORK ACTIVE", "● SIGNAL DETECTED", "ROUTE UNSTABLE", "⚠ CROWN PROXIMITY",
  "CARGO SEALED", "COURIER-07 LIVE", "FREQ 0xA7", "SECTOR 04 NORTHWALL",
  "RT-44 → DISTRICT 09", "FOLLOW THE SIGNAL"
];

export default function Finale() {
  return (
    <section className="relative mt-exp-5 border-y border-line overflow-hidden bg-[radial-gradient(800px_400px_at_30%_50%,rgba(255,61,138,0.22),transparent_60%),radial-gradient(700px_360px_at_80%_60%,rgba(105,180,255,0.10),transparent_60%),var(--color-ink-0)]">
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" />
      
      <div className="max-w-[1480px] mx-auto px-exp-3 md:px-exp-4 pt-exp-6 pb-exp-6 text-center relative z-10 flex flex-col items-center gap-exp-4">
        <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute">§ 08 · ENLIST</span>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display font-black text-[clamp(48px,7vw,124px)] tracking-[-0.03em] leading-[0.92] m-0 max-w-[18ch]"
        >
          The signal is moving. <em className="not-italic text-bloom text-[0.8em]">Are you?</em>
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[17px] leading-[1.65] text-paper-dim max-w-[560px] m-0"
        >
          Join the route, uncover the truth behind Bloom, and stay one step ahead of The Crown Division.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-exp-3 mt-exp-2"
        >
          <button className="h-12 px-[22px] rounded-sm bg-bloom text-ink-1 font-mono text-[11px] uppercase tracking-[0.22em] shadow-[0_0_0_1px_var(--color-bloom),0_10px_40px_rgba(255,61,138,0.35),inset_0_0_0_1px_rgba(255,255,255,0.15)] hover:bg-bloom-2 hover:-translate-y-[1px] hover:shadow-[0_0_0_1px_var(--color-bloom-2),0_14px_50px_rgba(255,61,138,0.55)] transition-all duration-250 flex items-center gap-exp-3">
            Wishlist Now <span className="opacity-70">→</span>
          </button>
          <button className="h-12 px-[22px] rounded-sm border border-paper text-paper font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-paper/10 transition-colors flex items-center gap-exp-3">
            Watch Trailer <span className="opacity-70">▶</span>
          </button>
          <button className="h-12 px-[22px] rounded-sm bg-transparent text-paper/70 font-mono text-[11px] uppercase tracking-[0.22em] hover:bg-paper/10 transition-colors">
            Join the Newsletter
          </button>
        </motion.div>
      </div>

      <div className="absolute left-0 right-0 bottom-0 w-full max-w-full border-t border-line py-exp-3 flex gap-exp-4 overflow-hidden font-mono text-[11px] tracking-[0.22em] uppercase text-mute z-20 bg-ink-0/50 backdrop-blur-sm">
        <div className="flex gap-exp-4 whitespace-nowrap animate-[tick_38s_linear_infinite]">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((t, i) => (
            <span key={i} className="flex items-center gap-exp-3">
              <span className="w-1.5 h-1.5 rounded-full bg-bloom" />
              {t}
            </span>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes tick {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}} />
    </section>
  );
}
