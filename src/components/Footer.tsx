"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full pt-exp-5 pb-exp-4 text-paper-dim relative max-w-[1480px] mx-auto px-exp-3 md:px-exp-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1.4fr] gap-exp-4 pb-exp-4 border-b border-line">
        
        <div>
          <div className="flex items-center gap-exp-2 font-display font-black text-sm tracking-wider text-paper">
            <Image src="/assets/Loggo.png" alt="NEON BLOOM Logo" width={24} height={24} className="h-6 w-auto object-contain" />
            NEON BLOOM
          </div>
          <p className="max-w-[340px] mt-exp-3 text-[13px] leading-[1.6] text-paper-dim">
            A fictional open-world cyberpunk action-adventure. Concept design for portfolio purposes only.
          </p>
        </div>

        <div className="flex flex-col gap-exp-3">
          <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-mute font-medium m-0">Network</h4>
          <ul className="flex flex-col gap-exp-2 text-[13px] m-0 p-0 list-none">
            <li><a href="#world" className="hover:text-paper transition-colors">World</a></li>
            <li><a href="#gameplay" className="hover:text-paper transition-colors">Gameplay</a></li>
            <li><a href="#story" className="hover:text-paper transition-colors">Story</a></li>
            <li><a href="#media" className="hover:text-paper transition-colors">Media</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-exp-3">
          <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-mute font-medium m-0">Signal</h4>
          <ul className="flex flex-col gap-exp-2 text-[13px] m-0 p-0 list-none">
            <li><a href="#" className="hover:text-paper transition-colors">Press Kit</a></li>
            <li><a href="#" className="hover:text-paper transition-colors">Bloom Devlog</a></li>
            <li><a href="#" className="hover:text-paper transition-colors">Discord</a></li>
            <li><a href="#" className="hover:text-paper transition-colors">X / Bluesky</a></li>
          </ul>
        </div>

        <div className="flex flex-col gap-exp-2">
          <h4 className="font-mono text-[11px] tracking-[0.2em] uppercase text-mute font-medium m-0 mb-exp-1">Join the Route</h4>
          <p className="text-[13px] text-paper-dim m-0 mb-exp-2">Mission updates. Cargo drops. No spam.</p>
          <input 
            type="email" 
            placeholder="OPERATIVE@NETWORK" 
            className="w-full bg-transparent border border-line-2 text-paper p-exp-3 px-exp-3 font-mono text-[11px] tracking-[0.16em] uppercase placeholder:text-mute-2 outline-none focus:border-bloom transition-colors"
          />
          <div className="flex gap-exp-2 mt-exp-2">
            <button className="h-[42px] px-4.5 rounded-sm bg-bloom text-ink-1 font-mono text-[11px] uppercase tracking-[0.22em] shadow-[0_0_0_1px_var(--color-bloom),0_6px_20px_rgba(255,61,138,0.25)] hover:bg-bloom-2 hover:-translate-y-[1px] hover:shadow-[0_0_0_1px_var(--color-bloom-2),0_8px_30px_rgba(255,61,138,0.4)] transition-all duration-250 flex items-center justify-center">
              Enlist →
            </button>
          </div>
        </div>

      </div>

      <div className="flex justify-between flex-wrap gap-exp-3 pt-exp-4 font-mono text-[10px] tracking-[0.18em] uppercase text-mute">
        <span>© 2027 BLOOM RUNTIME · ALL ROUTES RESERVED</span>
        <span>FICTIONAL CONCEPT · PORTFOLIO DESIGN</span>
        <span>BUILD 0.44 · NORTHWALL</span>
      </div>
    </footer>
  );
}
