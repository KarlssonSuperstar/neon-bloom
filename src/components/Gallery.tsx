"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

const ITEMS = [
  { c: "col-span-2 md:col-span-6 row-span-1 md:row-span-2", k: "CAP-001", t: "City Vista", id: "gal-1" },
  { c: "col-span-2 md:col-span-3 row-span-1", k: "CAP-002", t: "Bloomfields", id: "gal-2" },
  { c: "col-span-2 md:col-span-3 row-span-1", k: "CAP-003", t: "Courier · Action", id: "gal-3" },
  { c: "col-span-2 md:col-span-3 row-span-1", k: "CAP-004", t: "Vehicle Chase", id: "gal-4" },
  { c: "col-span-2 md:col-span-3 row-span-1", k: "CAP-005", t: "Crown Operative", id: "gal-5" },
  { c: "col-span-2 md:col-span-4 row-span-1 md:row-span-2", k: "CAP-006", t: "Courier · Close-Up", id: "gal-6" },
  { c: "col-span-2 md:col-span-4 row-span-1", k: "CAP-007", t: "Bloom Network", id: "gal-7" },
  { c: "col-span-2 md:col-span-4 row-span-1", k: "CAP-008", t: "Skyline · District 09", id: "gal-8" }
];

export default function Gallery() {
  return (
    <section id="media" className="w-full max-w-[1480px] mx-auto px-exp-3 md:px-exp-4 pb-exp-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-y-3 gap-x-exp-4 py-exp-5 pb-exp-4 border-b border-line">
        <div>
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">§ 07 · MEDIA</div>
          <h2 className="mt-exp-3 font-display font-bold text-[clamp(32px,4.2vw,56px)] leading-[1.02] tracking-[-0.02em] max-w-[900px]">
            Scenes from the route
          </h2>
        </div>
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute text-left md:text-right min-w-[200px] mt-2 md:mt-0">
          8 CAPTURES <span className="md:hidden">·</span> <br className="hidden md:inline" /> FIELD ARCHIVE
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-12 auto-rows-[200px] md:auto-rows-[160px] gap-exp-3 py-exp-4">
        {ITEMS.map((it, i) => (
          <motion.div 
            key={it.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={clsx(
              "relative overflow-hidden border border-line bg-[#0d0f15] group",
              it.c
            )}
          >
            <div className="absolute top-2.5 left-2.5 font-mono text-[9px] tracking-[0.2em] uppercase text-white bg-black/50 px-[7px] py-1 backdrop-blur-md z-20">
              {it.k}
            </div>
            
            <div className="absolute inset-0 bg-[#0c0e15] flex items-center justify-center border border-white/10 text-paper/40 font-mono text-xs z-10 group-hover:scale-105 transition-transform duration-700">
              [ {it.t} ]
            </div>
            
            <div className="absolute left-0 right-0 bottom-0 p-2.5 px-3.5 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.8))] flex justify-between items-end z-20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="font-display font-bold text-sm tracking-[0.01em]">{it.t}</span>
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-mute">{it.k}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
