"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import InteractiveMap from "./InteractiveMap";

/* ================================================================
   IMAGE CAROUSEL — auto-advance + click navigation
   ================================================================ */

interface CarouselImage {
  src: string;
  alt: string;
}

function ImageCarousel({ images, interval = 5000 }: { images: CarouselImage[]; interval?: number }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, interval);
  }, [images.length, interval]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const goTo = useCallback((index: number) => {
    setActive(index);
    resetTimer();
  }, [resetTimer]);

  const next = useCallback(() => {
    setActive((prev) => (prev + 1) % images.length);
    resetTimer();
  }, [images.length, resetTimer]);

  return (
    <div
      className="absolute inset-0 cursor-pointer"
      onClick={next}
      role="region"
      aria-label="Image carousel"
    >
      {images.map((img, i) => (
        <div
          key={img.src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority={i === 0}
            draggable={false}
          />
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-[6px] z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); goTo(i); }}
            className="w-[7px] h-[7px] rounded-full border border-white/40 transition-all duration-300"
            style={{
              background: i === active ? "rgba(249, 143, 185, 0.9)" : "rgba(255,255,255,0.15)",
              boxShadow: i === active ? "0 0 6px rgba(249, 143, 185, 0.5)" : "none",
              transform: i === active ? "scale(1.25)" : "scale(1)",
            }}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   CAROUSEL DATA
   ================================================================ */

const CITY_IMAGES: CarouselImage[] = [
  { src: "/assets/Map/Places/LumenCity.png", alt: "Lumen City — neon vertical metropolis" },
  { src: "/assets/Map/Places/CrownSpire.png", alt: "Crown Spire — fortified command district" },
];

const BLOOMFIELD_IMAGES: CarouselImage[] = [
  { src: "/assets/Map/Places/OpenField.png", alt: "Bloomfields — vast pink frontier terrain" },
  { src: "/assets/Map/Places/OpenField2.png", alt: "Bloomfields — relay stations and forgotten routes" },
];

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function World() {
  return (
    <section id="world" className="w-full max-w-[1480px] mx-auto px-exp-3 md:px-exp-4 pb-exp-5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-y-3 gap-x-exp-4 py-exp-5 pb-exp-4 border-b border-line">
        <div>
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">§ 03 · TERRAIN</div>
          <h2 className="mt-exp-3 font-display font-bold text-[clamp(32px,4.2vw,56px)] leading-[1.02] tracking-[-0.02em] max-w-[900px]">
            A world between neon towers and open bloomfields
          </h2>
        </div>
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute text-left md:text-right min-w-[200px] mt-2 md:mt-0">
          CITIES · BLOOMFIELDS <span className="md:hidden">·</span> <br className="hidden md:inline" /> SCAN COMPLETE
        </div>
      </div>

      {/* Interactive Tactical Map */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full overflow-hidden"
      >
        <InteractiveMap />
      </motion.div>

      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-2 gap-exp-4 -mt-12 lg:-mt-20 mb-exp-4 px-4 md:px-8 xl:px-16">
        {/* Panel 1: The Cities */}
        <motion.article 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative border border-line-2 overflow-hidden min-h-[520px] flex flex-col bg-[#0d0f15]"
        >
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-bloom z-10" />
          
          <div className="relative flex-1 min-h-[340px] bg-[#10131c] overflow-hidden">
            <div className="absolute top-3.5 left-5 right-5 flex justify-between font-mono text-[10px] tracking-[0.16em] uppercase text-white/60 z-20 pointer-events-none">
              <span>ZONE · INNER CITY</span>
              <span>SCAN 09·44·12N</span>
            </div>
            
            <ImageCarousel images={CITY_IMAGES} />
          </div>
          
          <div className="p-exp-4 pb-exp-4 border-t border-line flex flex-col gap-exp-2 h-auto min-h-[180px]">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-bloom">· THE CITIES</span>
            <h3 className="font-display font-bold text-4xl tracking-[-0.02em] m-0 leading-none">The Cities</h3>
            <p className="text-[14.5px] leading-[1.6] text-paper-dim max-w-[54ch] m-0">
              Dense vertical districts, crowded markets, rooftop routes and surveillance-heavy transit zones. The city is beautiful, fast, and always watching.
            </p>
          </div>
        </motion.article>

        {/* Panel 2: The Bloomfields */}
        <motion.article 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative border border-line-2 overflow-hidden min-h-[520px] flex flex-col bg-[#0d0f15]"
        >
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-bloom-2 z-10" />
          
          <div className="relative flex-1 min-h-[340px] bg-[#10131c] overflow-hidden">
            <div className="absolute top-3.5 left-5 right-5 flex justify-between font-mono text-[10px] tracking-[0.16em] uppercase text-white/60 z-20 pointer-events-none">
              <span>ZONE · OUTER FRONTIER</span>
              <span>RELAY · OFFLINE</span>
            </div>
            
            <ImageCarousel images={BLOOMFIELD_IMAGES} />
          </div>
          
          <div className="p-exp-4 pb-exp-4 border-t border-line flex flex-col gap-exp-2 h-auto min-h-[180px]">
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-bloom">· THE BLOOMFIELDS</span>
            <h3 className="font-display font-bold text-4xl tracking-[-0.02em] m-0 leading-none">The Bloomfields</h3>
            <p className="text-[14.5px] leading-[1.6] text-paper-dim max-w-[54ch] m-0">
              Beyond the towers lies a vast open frontier of pink terrain, giant trees, relay stations and forgotten routes shaped by the living network.
            </p>
          </div>
        </motion.article>
      </div>
    </section>
  );
}

