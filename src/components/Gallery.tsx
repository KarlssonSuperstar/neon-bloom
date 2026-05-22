"use client";

import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import Image from "next/image";
import { useState, useEffect } from "react";

const ITEMS = [
  { c: "col-span-2 md:col-span-6 row-span-1 md:row-span-2", k: "CAP-001", t: "Vast environments", id: "gal-1", src: "/assets/Media/Cliff.png" },
  { c: "col-span-2 md:col-span-3 row-span-1", k: "CAP-002", t: "Bloomfields", id: "gal-2", src: "/assets/Media/cave.png" },
  { c: "col-span-2 md:col-span-3 row-span-1", k: "CAP-003", t: "Courier · Action", id: "gal-3", src: "/assets/Media/Action.png" },
  { c: "col-span-2 md:col-span-3 row-span-1", k: "CAP-004", t: "Vehicle Chase", id: "gal-4", src: "/assets/Media/BikeRide.png" },
  { c: "col-span-2 md:col-span-3 row-span-1", k: "CAP-005", t: "Upgrades", id: "gal-5", src: "/assets/Media/Juno.png" },
  { c: "col-span-2 md:col-span-4 row-span-1 md:row-span-2", k: "CAP-006", t: "Courier · Close-Up", id: "gal-6", src: "/assets/Media/inventory.png" },
  { c: "col-span-2 md:col-span-4 row-span-1", k: "CAP-007", t: "Missions", id: "gal-7", src: "/assets/Media/Mission.png" },
  { c: "col-span-2 md:col-span-4 row-span-1", k: "CAP-008", t: "Vehicle", id: "gal-8", src: "/assets/Media/Transport.png" },
  { c: "col-span-2 md:col-span-4 row-span-1", k: "CAP-009", t: "Hunter unit", id: "gal-9", src: "/assets/Media/Hund.png" },
  { c: "col-span-2 md:col-span-4 row-span-1", k: "CAP-010", t: "Bossfight", id: "gal-10", src: "/assets/Media/Boss.png" }
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "Escape") setSelectedIndex(null);
      if (e.key === "ArrowLeft") setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : ITEMS.length - 1));
      if (e.key === "ArrowRight") setSelectedIndex((prev) => (prev! < ITEMS.length - 1 ? prev! + 1 : 0));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

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
          10 CAPTURES <span className="md:hidden">·</span> <br className="hidden md:inline" /> FIELD ARCHIVE
        </div>
      </div>

      <div className={clsx(
        "py-exp-4",
        "flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8", // Mobile carousel
        "-mx-exp-3 px-exp-3 md:mx-0 md:px-0", // Edge-to-edge on mobile
        "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]", // Hide scrollbar
        "md:grid md:grid-cols-12 md:auto-rows-[160px] md:gap-exp-3 md:pb-exp-4 md:flex-none" // Desktop grid
      )}>
        {ITEMS.map((it, i) => (
          <motion.div 
            key={it.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            onClick={() => setSelectedIndex(i)}
            className={clsx(
              "relative overflow-hidden border border-line bg-[#0d0f15] group cursor-pointer",
              "shrink-0 w-[85vw] aspect-video snap-center", // Mobile item sizing (16:9 ratio)
              "md:shrink md:w-full md:h-full md:aspect-auto md:min-h-0 md:max-h-none md:snap-align-none", // Desktop item sizing
              it.c
            )}
          >
            <div className="absolute top-2.5 left-2.5 font-mono text-[9px] tracking-[0.2em] uppercase text-white bg-black/50 px-[7px] py-1 backdrop-blur-md z-20">
              {it.k}
            </div>
            
            {!it.src && (
              <div className="absolute inset-0 bg-[#0c0e15] flex items-center justify-center border border-white/10 text-paper/40 font-mono text-xs z-10 group-hover:scale-105 transition-transform duration-700">
                [ {it.t} ]
              </div>
            )}

            {it.src && (
              <div className="absolute inset-0 z-10 overflow-hidden">
                <Image
                  src={it.src}
                  alt={it.t}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            
            <div className="absolute left-0 right-0 bottom-0 p-2.5 px-3.5 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.8))] flex justify-between items-end z-20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="font-display font-bold text-sm tracking-[0.01em]">{it.t}</span>
              <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-mute">{it.k}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0c12]/95 backdrop-blur-xl"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Top Bar */}
            <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start z-10 pointer-events-none">
              <div>
                <div className="font-mono text-[10px] tracking-[0.2em] uppercase text-white bg-black/50 px-3 py-1.5 backdrop-blur-md inline-block">
                  {ITEMS[selectedIndex].k}
                </div>
                <h3 className="font-display font-bold text-2xl mt-3 [text-shadow:_0_2px_8px_rgba(0,0,0,0.8)]">
                  {ITEMS[selectedIndex].t}
                </h3>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedIndex(null); }}
                className="pointer-events-auto text-white/50 hover:text-white transition-colors p-2"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>

            {/* Navigation Arrows */}
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setSelectedIndex(prev => prev! > 0 ? prev! - 1 : ITEMS.length - 1); 
              }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 z-10"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setSelectedIndex(prev => prev! < ITEMS.length - 1 ? prev! + 1 : 0); 
              }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 z-10"
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18l6-6-6-6"/></svg>
            </button>

            {/* Main Image */}
            <motion.div 
              key={selectedIndex}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full h-full max-w-[90vw] max-h-[85vh] p-8 md:p-16 flex items-center justify-center pointer-events-none"
            >
              <Image
                src={ITEMS[selectedIndex].src}
                alt={ITEMS[selectedIndex].t}
                fill
                className="object-contain drop-shadow-2xl"
                sizes="100vw"
                priority
              />
            </motion.div>

            {/* Footer counter */}
            <div className="absolute bottom-6 font-mono text-[10px] tracking-[0.2em] text-white/50">
              {String(selectedIndex + 1).padStart(2, '0')} / {ITEMS.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
