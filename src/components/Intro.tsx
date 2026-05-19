"use client";

import { motion } from "framer-motion";

const cards = [
  { tag: "01 · WORLD", title: "Open World", text: "Explore megacities, rooftops, transit tunnels and wide bloomfields.", image: "/assets/Intro/Open%20World.png" },
  { tag: "02 · MOVEMENT", title: "High-Speed Routes", text: "Deliver cargo across hostile zones by foot, vehicle and instinct.", image: "/assets/Intro/High-Speed%20Routes.png" },
  { tag: "03 · NARRATIVE", title: "Story-Driven Action", text: "Uncover the truth behind Bloom and the faction trying to control it.", image: "/assets/Intro/Story-Driven%20Action.png" }
];

export default function Intro() {
  return (
    <section id="intro" className="w-full max-w-[1480px] mx-auto px-exp-3 md:px-exp-4 pb-exp-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-y-3 gap-x-exp-4 py-exp-5 pb-exp-4 border-b border-line">
        <div>
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">§ 01 · OVERVIEW</div>
          <h2 className="mt-exp-3 font-display font-bold text-[clamp(32px,4.2vw,56px)] leading-[1.02] tracking-[-0.02em] max-w-[900px]">
            A courier. A living network. A city under control.
          </h2>
        </div>
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute text-left md:text-right min-w-[200px] mt-2 md:mt-0">
          BLOOM NETWORK <span className="md:hidden">·</span> <br className="hidden md:inline" /> STATUS: ACTIVE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.1fr_2fr] gap-exp-4 py-exp-4">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute">
          — BRIEFING / 22:41 LOCAL
        </div>
        <p className="text-[17px] leading-[1.65] text-paper-dim max-w-[640px]">
          Neon Bloom is an open-world cyberpunk action-adventure set across towering cities, dangerous transit routes and vast bloomfields. You play as a freelance courier whose latest delivery makes him the target of The Crown Division.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 border-y border-line">
        {cards.map((c, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group relative p-exp-4 md:p-exp-4 border-b md:border-b-0 md:border-r border-line last:border-r-0 min-h-[260px] flex flex-col justify-between gap-exp-3 overflow-hidden"
          >
            {/* Background image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: `url(${c.image})` }}
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/15" />

            <div className="relative z-10 flex justify-between items-start gap-exp-3">
              <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-bloom">{c.tag}</span>
              <span className="font-mono text-[10px] tracking-[0.18em] text-mute">F·{String(i + 1).padStart(2, "0")}</span>
            </div>
            <div className="relative z-10">
              <h3 className="font-display font-bold text-2xl md:text-3xl tracking-[-0.01em] mt-exp-3 leading-[1.05]">{c.title}</h3>
              <p className="mt-exp-2 text-[14px] leading-[1.6] text-paper-dim max-w-[32ch]">{c.text}</p>
            </div>
            {/* Hover animated border strip */}
            <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-bloom transition-all duration-500 ease-out group-hover:w-full z-10" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
