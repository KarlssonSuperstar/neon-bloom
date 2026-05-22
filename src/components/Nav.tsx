"use client";

import { motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Nav() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  
  // Use scroll direction to hide/show nav
  useEffect(() => {
    let lastY = 0;
    return scrollY.on("change", (latest) => {
      if (latest > lastY && latest > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY = latest;
    });
  }, [scrollY]);

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-40 bg-ink-0/60 backdrop-blur-md border-b border-line"
    >
      <div className="w-full max-w-[1480px] mx-auto flex items-center justify-between px-exp-3 md:px-exp-4 py-exp-3">
        <div className="flex items-center gap-exp-2 font-display font-black text-sm tracking-wider text-paper">
          <Image src="/assets/Loggo.png" alt="NEON BLOOM Logo" width={28} height={28} className="h-7 w-auto object-contain" />
          NEON BLOOM
        </div>

        <div className="hidden md:flex gap-exp-4 text-[13px] text-paper-dim">
          <a href="#world" className="hover:text-paper transition-colors">World</a>
          <a href="#cargo" className="hover:text-paper transition-colors">Cargo</a>
          <a href="#gameplay" className="hover:text-paper transition-colors">Gameplay</a>
          <a href="#story" className="hover:text-paper transition-colors">Story</a>
          <a href="#media" className="hover:text-paper transition-colors">Media</a>
        </div>

        <div className="flex items-center gap-exp-3">
          <div className="hidden sm:inline-flex items-center gap-exp-2 px-exp-2 py-exp-2 rounded-full border border-line-2 font-mono text-[10px] uppercase tracking-[0.16em] text-paper-dim">
            <div className="w-1.5 h-1.5 rounded-full bg-bloom shadow-[0_0_10px_var(--color-bloom)] animate-pulse" />
            Bloom network active
          </div>
          <button className="h-9 px-4 rounded-sm border border-paper/70 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/70 hover:bg-paper/10 transition-colors">
            Wishlist
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
