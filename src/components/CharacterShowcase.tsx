"use client";

import { useState, useEffect, CSSProperties } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import clsx from "clsx";

const MotionImage = motion.create(Image);

type Character = {
  id: string;
  name: string;
  faction: "Neon Bloom" | "Crown Division";
  factionColor: string;
  lineupImage: string;
  heroImage: string;
  description: string;
  quote: string;
  age: string;
  height: string;
  weight: string;
  role: string;
  desktopPosition: {
    left: string;
    bottom: string;
    height: string;
    scale: number; // Visual scale multiplier (1 = normal, 1.2 = 20% bigger, 0.8 = 20% smaller)
    zIndex: number;
    selectedX?: string; // Optional custom horizontal offset for selected state
  };
};

// ============================================================================
// CHARACTER DATA
// You can easily swap images, names, and descriptions here.
// The desktopPosition controls where they stand in the cinematic lineup.
//
// POSITIONING GUIDE:
//   left   → horizontal position (0% = far left, 100% = far right)
//   bottom → vertical offset from floor (0% = on the ground)
//   height → how tall the character container is (% of section height)
//   scale  → visual size multiplier (1 = normal, 1.3 = 30% bigger, 0.7 = 30% smaller)
//   zIndex → layering order (higher = in front)
// ============================================================================
const CHARACTERS: Character[] = [
  // ── NEON BLOOM (left cluster, ~0%–28%) ──────────────────────────────
  {
    id: "neon-1",
    name: "Mira Vale",
    faction: "Neon Bloom",
    factionColor: "#ff2f91", // Pink
    lineupImage: "/assets/characters/BloomMira.png",
    heroImage: "/assets/characters/Profile/BloomProfileMira.png",
    description: "A calm and strategic route broker who manages safehouses, contacts and hidden paths across the city. Mira knows which routes are open, which ones are watched and who can be trusted. She is the person couriers go to when a delivery becomes too dangerous to plan alone.",
    quote: "They won't know what hit them until it's too late.",
    age: "32",
    height: "172 cm",
    weight: "65 kg",
    role: "Handler / Route Broker",
    // Back-left of the group, medium height
    desktopPosition: { left: "-4%", bottom: "0%", height: "90%", scale: 0.7, zIndex: 12 }
  },
  {
    id: "neon-2",
    name: "Juno Sparks",
    faction: "Neon Bloom",
    factionColor: "#ff2f91",
    lineupImage: "/assets/characters/BloomJuno.png",
    heroImage: "/assets/characters/Profile/BloomProfileJuno.png",
    description: "A chaotic but brilliant mechanic who repairs drones, vehicles and courier gear for the Bloom network. Juno grew up around broken machines and black-market parts, turning her garage into a noisy safehouse where almost anything can be fixed, upgraded or rebuilt.",
    quote: "Watch the fireworks. I coded them myself.",
    age: "24",
    height: "164 cm",
    weight: "62 kg",
    role: "Mechanic / Vehicle Specialist",
    // Behind Mira, elevated — her head/arm pokes above the group
    desktopPosition: { left: "8%", bottom: "6%", height: "100%", scale: 0.7, zIndex: 6 }
  },
  {
    id: "neon-3",
    name: "Rafe Calder",
    faction: "Neon Bloom",
    factionColor: "#ff2f91",
    lineupImage: "/assets/characters/BloomRafe.png",
    heroImage: "/assets/characters/Profile/BloomProfileRafe.png",
    description: "A reckless Bloom ally with a talent for turning bad situations into survivable ones. Rafe is loud, impulsive and often impossible to control, but his loyalty runs deep. He handles dangerous routes, forced entries and missions where subtlety has already failed.",
    quote: "I'll break the front door down.",
    age: "34",
    height: "188 cm",
    weight: "94 kg",
    role: "Route Runner / Heavy Support",
    // Center of the left group, overlapping Juno
    desktopPosition: { left: "0%", bottom: "0%", height: "68%", scale: 0.7, zIndex: 22 }
  },
  {
    id: "neon-4",
    name: "The Courier ( You )",
    faction: "Neon Bloom",
    factionColor: "#ff2f91",
    lineupImage: "/assets/characters/BloomCurior.png",
    heroImage: "/assets/characters/Profile/BloomProfileCurrior.png",
    description: "A fast and highly skilled courier who moves sealed cargo through restricted routes, rooftops and hidden city paths. Guarded, precise and difficult to track, The Courier becomes the center of a larger conflict when a routine delivery turns into a fight for control of the city network.",
    quote: "Every delivery has a cost. I just stopped pretending it was only money.",
    age: "27",
    height: "178 cm",
    weight: "72 kg",
    role: "Freelance Courier / Route Runner",
    // Front-right of Bloom group, shorter, closest to camera
    desktopPosition: { left: "16%", bottom: "0%", height: "55%", scale: 0.7, zIndex: 28 }
  },
  // ── CROWN DIVISION (right cluster, ~50%–78%) ────────────────────────
  {
    id: "crown-1",
    name: "Maximus Vane",
    faction: "Crown Division",
    factionColor: "#facc15", // Yellow
    lineupImage: "/assets/characters/CrownMaximus.png",
    heroImage: "/assets/characters/Profile/CrownProfileMaximus.png",
    description: "The ideological leader of The Crown Division. Vane believes that freedom creates disorder and that every route, signal and movement should be controlled. Calm, severe and highly disciplined, he is the face of the system Bloom is fighting against.",
    quote: "Order is absolute. Chaos will be purged.",
    age: "51",
    height: "190 cm",
    weight: "88 kg",
    role: "Commander / Crown Division Leader",
    // Front-left of Crown group
    desktopPosition: { left: "60%", bottom: "0%", height: "55%", scale: 0.7, zIndex: 28 }
  },
  {
    id: "crown-2",
    name: "Vera Kestrel",
    faction: "Crown Division",
    factionColor: "#facc15",
    lineupImage: "/assets/characters/CrownVera.png",
    heroImage: "/assets/characters/Profile/CrownProfileVera.png",
    description: "A precise long-range assassin trained by The Crown Division to control open routes from a distance. Vera is calm, elegant and terrifyingly patient. Her presence turns rooftops, streets and exposed paths into places where the player never feels completely safe.",
    quote: "I see every move before you even make it.",
    age: "36",
    height: "176 cm",
    weight: "61 kg",
    role: "Elite Sniper",
    // Right-center, in front of Goliath
    desktopPosition: { left: "65%", bottom: "0%", height: "72%", scale: 0.7, zIndex: 18, selectedX: "-33%" }
  },
  {
    id: "crown-3",
    name: "Kairo Sable",
    faction: "Crown Division",
    factionColor: "#facc15",
    lineupImage: "/assets/characters/CrownKairo.png",
    heroImage: "/assets/characters/Profile/CrownProfileKairo.png",
    description: "A cybernetically enhanced execution unit sent into places The Crown cannot reach openly. Kairo specializes in infiltration, silent capture and close-range combat. He represents the terrifying idea that even hidden Bloom routes can be found.",
    quote: "My blade is faster than your code.",
    age: "29",
    height: "182 cm",
    weight: "78 kg",
    role: "Cybernetic Stealth Unit",
    // Behind Maximus, elevated — sword/head visible above
    desktopPosition: { left: "55%", bottom: "2%", height: "82%", scale: 0.7, zIndex: 6 }
  },
  {
    id: "crown-4",
    name: "Bastion Kroll",
    faction: "Crown Division",
    factionColor: "#facc15",
    lineupImage: "/assets/characters/CrownBastion.png",
    heroImage: "/assets/characters/Profile/CrownProfileBastion.png",
    description: "A massive genetically modified enforcer used when The Crown Division wants something destroyed rather than investigated. Bastion is built for breaching safehouses, breaking barricades and forcing his way through resistance zones. He is less a soldier than a walking threat.",
    quote: "TARGET ACQUIRED. INITIATING PACIFICATION.",
    age: "42",
    height: "230 cm",
    weight: "210 kg",
    role: "Siege Enforcer",
    // Tallest character, anchors the right side of the composition
    desktopPosition: { left: "72%", bottom: "0%", height: "120%", scale: 0.7, zIndex: 10 }
  }
];

// Custom display order for the Bloom faction panel (top → bottom)
const BLOOM_DISPLAY_ORDER = ["The Courier ( You )", "Rafe Calder", "Mira Vale", "Juno Sparks"];

// Custom portrait alignment helper for mobile circles to perfectly center characters' faces
const getMobilePortraitStyle = (name: string): CSSProperties => {
  const baseStyle: CSSProperties = {
    transform: "scale(2.7)",
    transformOrigin: "top center",
  };

  switch (name) {
    case "Maximus Vane":
      return {
        transform: "scale(3.4)",
        transformOrigin: "top center",
      };
    case "The Courier ( You )":
      return {
        transform: "scale(2.7) translateX(-18%)",
        transformOrigin: "top center",
      };
    case "Mira Vale":
      return {
        transform: "scale(2.7) translateX(12%)",
        transformOrigin: "top center",
      };
    case "Kairo Sable":
    case "Bastion Kroll":
      return {
        transform: "scale(2.7) translateX(10%)",
        transformOrigin: "top center",
      };
    default:
      return baseStyle;
  }
};

export default function CharacterShowcase() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check screen size to switch between absolute positioning (desktop) and scrollable row (mobile)
  useEffect(() => {
    const checkMobile = () => setIsDesktop(window.innerWidth >= 768);
    checkMobile(); // Check immediately on mount
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNameClick = (id: string) => {
    setSelectedId(prev => (prev === id ? null : id));
  };

  const selectedCharacter = CHARACTERS.find(c => c.id === selectedId);
  const selectedIndex = CHARACTERS.findIndex(c => c.id === selectedId);

  return (
    <section className="relative w-full pt-16 md:pt-20 lg:pt-24 pb-16 md:pb-24 overflow-x-hidden bg-black/40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-y-3 gap-x-8 pb-12 mb-8 border-b border-line">
          <div>
            <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">§ 06.1 · OPERATIVES</div>
            <h2 className="mt-3 font-display font-bold text-[clamp(32px,4.2vw,56px)] leading-[1.02] tracking-[-0.02em] max-w-[900px]">
              Know your allies.<br className="hidden md:inline" /> Fear your enemies.
            </h2>
          </div>
          <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute text-left md:text-right min-w-[200px] mt-2 md:mt-0">
            8 OPERATIVES LOGGED <span className="md:hidden">·</span> <br className="hidden md:inline" /> SELECT TO INSPECT
          </div>
        </div>

        {/* ========================================================================
            1. CHARACTER LINEUP CONTAINER
            ======================================================================== */}
        <div className="hidden md:block relative w-full h-[400px] md:h-[600px] lg:h-[700px] mb-12">

          <div className={clsx(
            "w-full h-full",
            isDesktop ? "relative" : "flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8"
          )}>

            {isDesktop && (
              <MotionImage
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 0.1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                src="/assets/characters/bloomCrown.png"
                alt="Bloom vs Crown"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[40%] w-auto object-contain z-0 pointer-events-none"
                width={800} height={800}
              />
            )}

            <AnimatePresence>
              {CHARACTERS.map((char, i) => {
                const isSelected = selectedId === char.id;
                const isHovered = hoveredId === char.id;
                const hasSelection = selectedId !== null;

                // Pushing characters outward relative to the selected one
                const direction = i < selectedIndex ? -1 : 1;

                // The base scale from the data array
                const baseScale = char.desktopPosition.scale;

                // ---------------------------------------------------------
                // DESKTOP ANIMATIONS (Absolute Overlapping Composition)
                // ---------------------------------------------------------
                const desktopVariants = {
                  idle: {
                    left: char.desktopPosition.left,
                    bottom: char.desktopPosition.bottom,
                    height: char.desktopPosition.height,
                    x: "0%",
                    scale: baseScale,
                    filter: "brightness(1) drop-shadow(0px 0px 0px rgba(0,0,0,0))",
                    opacity: 1,
                    zIndex: char.desktopPosition.zIndex,
                  },
                  hovered: {
                    left: char.desktopPosition.left,
                    bottom: char.desktopPosition.bottom,
                    height: char.desktopPosition.height,
                    x: "0%",
                    scale: baseScale * 1.02,
                    filter: `brightness(1.1) drop-shadow(0px 0px 20px ${char.factionColor}80)`,
                    opacity: 1,
                    zIndex: char.desktopPosition.zIndex,
                  },
                  dimmedHover: {
                    left: char.desktopPosition.left,
                    bottom: char.desktopPosition.bottom,
                    height: char.desktopPosition.height,
                    x: "0%",
                    scale: baseScale,
                    filter: "brightness(0.6) drop-shadow(0px 0px 0px rgba(0,0,0,0))",
                    opacity: 0.8,
                    zIndex: char.desktopPosition.zIndex,
                  },
                  selected: {
                    left: "50%",
                    bottom: "0%",
                    height: "100%",
                    x: char.desktopPosition.selectedX || "-50%",
                    scale: 1.05,
                    filter: `brightness(1) drop-shadow(0px 20px 40px ${char.factionColor}40)`,
                    opacity: 1,
                    zIndex: 50,
                  },
                  pushedAway: {
                    left: char.desktopPosition.left,
                    bottom: char.desktopPosition.bottom,
                    height: char.desktopPosition.height,
                    x: `${direction * 25}%`,
                    scale: baseScale * 0.95,
                    filter: "brightness(0.3) drop-shadow(0px 0px 0px rgba(0,0,0,0))",
                    opacity: 0.4,
                    zIndex: char.desktopPosition.zIndex,
                  }
                };

                // ---------------------------------------------------------
                // MOBILE ANIMATIONS (Flex Row)
                // ---------------------------------------------------------
                const mobileVariants = {
                  idle: { scale: 1, filter: "brightness(1)", opacity: 1 },
                  hovered: { scale: 1.02, filter: `brightness(1.1) drop-shadow(0px 0px 10px ${char.factionColor}80)`, opacity: 1 },
                  dimmedHover: { scale: 0.95, filter: "brightness(0.6)", opacity: 0.8 },
                  selected: { scale: 1.05, filter: `brightness(1) drop-shadow(0px 10px 20px ${char.factionColor}40)`, opacity: 1 },
                  pushedAway: { scale: 0.9, filter: "brightness(0.3)", opacity: 0.4 }
                };

                let animateState = "idle";
                if (hasSelection) {
                  animateState = isSelected ? "selected" : "pushedAway";
                } else if (hoveredId) {
                  animateState = isHovered ? "hovered" : "dimmedHover";
                }


                return (
                  <motion.div
                    key={char.id}
                    onClick={() => handleNameClick(char.id)}
                    onMouseEnter={() => setHoveredId(char.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    variants={isDesktop ? desktopVariants : mobileVariants}
                    initial="idle"
                    animate={animateState}
                    transition={{ type: "spring", stiffness: 200, damping: 25, mass: 1 }}
                    className={clsx(
                      "cursor-pointer origin-bottom flex-shrink-0 snap-center",
                      isDesktop ? "absolute w-auto" : "relative w-[80vw] sm:w-[60vw] h-full flex justify-center items-end"
                    )}
                  >
                    <div className="relative h-full w-auto flex justify-center">
                      {/* Name tag / Badge above head on hover */}
                      <AnimatePresence>
                        {isHovered && !isSelected && isDesktop && (
                          <motion.div
                            initial={ char.name === "Bastion Kroll" ? { opacity: 0, x: 12, scale: 0.8 } : { opacity: 0, y: 12, scale: 0.8 } }
                            animate={ char.name === "Bastion Kroll" ? { opacity: 1, x: 0, scale: 1 } : { opacity: 1, y: 0, scale: 1 } }
                            exit={ char.name === "Bastion Kroll" ? { opacity: 0, x: 6, scale: 0.85 } : { opacity: 0, y: 6, scale: 0.85 } }
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className={clsx(
                              "absolute z-40 pointer-events-none flex items-center",
                              char.name === "Bastion Kroll"
                                ? "flex-row left-[5%] lg:left-[10%] top-[18%] -translate-x-full" 
                                : "flex-col -top-[68px] left-1/2 -translate-x-1/2"
                            )}
                          >
                            <div className={clsx(
                              "px-7 py-3 text-base md:text-lg font-mono font-bold uppercase tracking-[0.3em] rounded-sm border shadow-2xl backdrop-blur-md whitespace-nowrap",
                              char.faction === "Neon Bloom"
                                ? "bg-black/95 border-[#ff2f91]/80 text-[#ff2f91] shadow-[#ff2f91]/30"
                                : "bg-black/95 border-[#facc15]/80 text-[#facc15] shadow-[#facc15]/30"
                            )}>
                              {char.name}
                            </div>
                            <div className={clsx(
                              "w-3.5 h-3.5 rotate-45 bg-black/95",
                              char.name === "Bastion Kroll"
                                ? "border-t border-r -ml-[8px]"
                                : "border-r border-b -mt-[8px]",
                              char.faction === "Neon Bloom" ? "border-[#ff2f91]/80" : "border-[#facc15]/80"
                            )} />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* LINEUP IMAGE */}
                      <MotionImage
                        src={char.lineupImage}
                        alt={`${char.name} lineup`}
                        className="h-full w-auto max-w-none"
                        width={800} height={1200}
                        initial={false}
                        animate={{
                          opacity: isSelected ? 0 : 1,
                          scale: isSelected ? 0.95 : 1,
                          filter: isSelected ? "blur(4px)" : "blur(0px)",
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                      />
                      {/* PROFILE (HERO) IMAGE - Overlays during selection */}
                      <MotionImage
                        src={char.heroImage}
                        alt={`${char.name} profile`}
                        className="absolute inset-0 h-full w-auto max-w-none"
                        width={800} height={1200}
                        initial={false}
                        animate={{
                          opacity: isSelected ? 1 : 0,
                          scale: isSelected ? 1 : 1.05,
                          filter: isSelected ? "blur(0px)" : "blur(8px)",
                        }}
                        transition={{
                          duration: 0.6,
                          ease: "easeOut",
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Desktop Info Panel */}
            <AnimatePresence>
              {selectedCharacter && isDesktop && (
                <motion.div
                  initial={{ opacity: 0, x: selectedIndex < 4 ? 50 : -50, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: selectedIndex < 4 ? 50 : -50, filter: "blur(10px)" }}
                  transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.1 }}
                  className={clsx(
                    "absolute bottom-[12%] z-[60] max-w-sm p-6 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md",
                    selectedIndex < 4 ? "right-[5%] lg:right-[10%]" : "left-[5%] lg:left-[10%]"
                  )}
                >
                  <h3 className="text-4xl font-bold uppercase tracking-wider text-white mb-1">
                    {selectedCharacter.name}
                  </h3>
                  <div
                    className="text-sm font-semibold tracking-widest uppercase mb-4"
                    style={{ color: selectedCharacter.factionColor }}
                  >
                    {selectedCharacter.faction}
                  </div>

                  {/* Designation */}
                  <div className="mb-4 font-mono text-[11px]">
                    <span className="text-white/30 uppercase tracking-widest block text-[9px] mb-0.5">Role / Designation</span>
                    <span className="text-white font-semibold tracking-wider uppercase text-xs" style={{ color: selectedCharacter.factionColor }}>
                      {selectedCharacter.role}
                    </span>
                  </div>

                  {/* Physical Specs HUD */}
                  <div className="grid grid-cols-3 gap-2 mb-5 border-y border-white/10 py-3 font-mono text-[11px]">
                    <div>
                      <span className="text-white/30 uppercase tracking-widest block text-[8px] mb-0.5">Age</span>
                      <span className="text-white font-bold text-xs">{selectedCharacter.age}</span>
                    </div>
                    <div className="border-l border-white/10 pl-3">
                      <span className="text-white/30 uppercase tracking-widest block text-[8px] mb-0.5">Height</span>
                      <span className="text-white font-bold text-xs">{selectedCharacter.height}</span>
                    </div>
                    <div className="border-l border-white/10 pl-3">
                      <span className="text-white/30 uppercase tracking-widest block text-[8px] mb-0.5">Weight</span>
                      <span className="text-white font-bold text-xs">{selectedCharacter.weight}</span>
                    </div>
                  </div>

                  <p className="text-white/80 leading-relaxed mb-6 text-sm">
                    {selectedCharacter.description}
                  </p>
                  <div className="pl-4 border-l-2 border-white/20 italic text-white/60 text-sm">
                    &quot;{selectedCharacter.quote}&quot;
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>


        {/* ========================================================================
            2. NAME / FACTION INTERACTIVE PANEL — Cassette-Screen Style
            ======================================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-8">

          {/* ── BLOOM PANEL ─────────────────────────────────────────── */}
          <div className="relative border border-[#ff2f91]/30 rounded-sm bg-[#0a0c12]/80 backdrop-blur-sm overflow-hidden">
            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.06]"
              style={{ background: "repeating-linear-gradient(0deg, rgba(255,255,255,.08) 0 1px, transparent 1px 3px)" }} />

            {/* Corner brackets */}
            <div className="absolute top-[-1px] left-[-1px] w-2 h-2 border-t border-l border-[#ff2f91]/60" />
            <div className="absolute top-[-1px] right-[-1px] w-2 h-2 border-t border-r border-[#ff2f91]/60" />
            <div className="absolute bottom-[-1px] left-[-1px] w-2 h-2 border-b border-l border-[#ff2f91]/60" />
            <div className="absolute bottom-[-1px] right-[-1px] w-2 h-2 border-b border-r border-[#ff2f91]/60" />

            {/* Top glow bleed */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff2f91]/50 to-transparent" />

            {/* Header */}
            <div className="relative z-20 px-4 pt-4 pb-3 border-b border-[#ff2f91]/15 flex items-center gap-3">
              <div className="w-8 h-8 border border-[#ff2f91]/40 rounded-sm flex items-center justify-center relative shrink-0">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,61,138,0)_0px,rgba(255,61,138,0)_4px,rgba(255,61,138,0.15)_4px,rgba(255,61,138,0.15)_8px)]" />
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#ff2f91] relative z-10">
                  <path d="M12 2C12 2 15 7 15 11C15 15 12 18 12 18C12 18 9 15 9 11C9 7 12 2 12 2ZM12 18C12 18 17 19 20 16C23 13 22 9 22 9C22 9 19 10 16 13C14 15 12 18 12 18ZM12 18C12 18 7 19 4 16C1 13 2 9 2 9C2 9 5 10 8 13C10 15 12 18 12 18Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-[10px] tracking-widest text-[#ff2f91] font-bold">ネオン・ブルーム</span>
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#ff2f91]">NEON BLOOM</span>
              </div>
              <div className="ml-auto font-mono text-[8px] tracking-widest text-[#ff2f91]/50 text-right">
                OPERATIVES: 04<br />STATUS: ACTIVE
              </div>
            </div>

            {/* Character list */}
            <div className="relative z-20 p-3 flex flex-col gap-1.5">
              {CHARACTERS.filter(c => c.faction === "Neon Bloom").sort((a, b) => BLOOM_DISPLAY_ORDER.indexOf(a.name) - BLOOM_DISPLAY_ORDER.indexOf(b.name)).map((char, idx) => {
                const isSelected = selectedId === char.id;
                const isHovered = hoveredId === char.id;
                const isDimmed = (selectedId !== null && !isSelected) || (isDesktop && hoveredId !== null && !isHovered);

                return (
                  <div key={char.id} className="flex flex-col">
                    <button
                      onMouseEnter={() => setHoveredId(char.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => handleNameClick(char.id)}
                      className={clsx(
                        "relative group w-full px-3 py-2.5 text-left transition-all duration-300 border rounded-sm flex items-center gap-3",
                        isSelected
                          ? "bg-[#ff2f91]/10 border-[#ff2f91]/40 shadow-[0_0_15px_rgba(255,47,145,0.15),inset_0_0_15px_rgba(255,47,145,0.05)]"
                          : "bg-transparent border-white/5 hover:bg-[#ff2f91]/5 hover:border-[#ff2f91]/20",
                        isDimmed && !isSelected && "opacity-40"
                      )}
                    >
                      {/* Left accent bar */}
                      <div
                        className={clsx(
                          "absolute left-0 top-1 bottom-1 w-[2px] rounded-full transition-all duration-300",
                          isSelected ? "opacity-100 shadow-[0_0_6px_rgba(255,47,145,0.6)]" : isHovered ? "opacity-80" : "opacity-0"
                        )}
                        style={{ backgroundColor: "#ff2f91" }}
                      />
                      {/* Index */}
                      <span className={clsx(
                        "font-mono text-[10px] tracking-widest transition-colors duration-300 w-6 shrink-0",
                        isSelected || isHovered ? "text-[#ff2f91]" : "text-white/20"
                      )}>
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      {/* Mobile Portrait */}
                      <div className="md:hidden w-14 h-14 rounded-full overflow-hidden border border-white/20 shrink-0">
                        <Image src={char.heroImage} alt={char.name} width={500} height={500} className="w-full h-full object-cover object-top" style={getMobilePortraitStyle(char.name)} />
                      </div>
                      {/* Name */}
                      <span className={clsx(
                        "text-sm md:text-base font-bold tracking-wider text-white uppercase transition-all duration-300",
                        isSelected && "text-shadow-bloom"
                      )}>
                        {char.name}
                      </span>
                      {/* Status dot */}
                      <div className={clsx(
                        "ml-auto w-1.5 h-1.5 rounded-full transition-all duration-300",
                        isSelected ? "bg-[#ff2f91] shadow-[0_0_6px_rgba(255,47,145,0.8)]" : isHovered ? "bg-[#ff2f91]/60" : "bg-white/10"
                      )} />
                    </button>

                    {/* Mobile Accordion */}
                    <AnimatePresence>
                      {isSelected && !isDesktop && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden md:hidden"
                        >
                          <div className="p-4 border-x border-b border-[#ff2f91]/20 bg-[#0a0c12]/90 flex flex-col gap-3 rounded-b-sm">
                            <div className="w-full h-[180px] relative rounded-sm overflow-hidden border border-white/10">
                              <Image src={char.heroImage} alt={char.name} className="absolute inset-0 w-full h-full object-cover object-top" fill />
                            </div>
                            <div className="text-xs font-semibold tracking-widest uppercase text-[#ff2f91]">
                              {char.faction}
                            </div>
                            {/* Designation */}
                            <div className="font-mono text-[10px] border-t border-b border-[#ff2f91]/15 py-2">
                              <span className="text-white/30 uppercase tracking-widest block text-[8px] mb-0.5">Role / Designation</span>
                              <span className="text-[#ff2f91] font-semibold tracking-wider uppercase text-[11px]">{char.role}</span>
                            </div>
                            {/* Physical Specs HUD */}
                            <div className="grid grid-cols-3 gap-2 border-b border-[#ff2f91]/15 pb-2.5 font-mono text-[10px]">
                              <div>
                                <span className="text-white/30 uppercase tracking-widest block text-[8px] mb-0.5">Age</span>
                                <span className="text-white font-bold">{char.age}</span>
                              </div>
                              <div className="border-l border-[#ff2f91]/15 pl-2">
                                <span className="text-white/30 uppercase tracking-widest block text-[8px] mb-0.5">Height</span>
                                <span className="text-white font-bold">{char.height}</span>
                              </div>
                              <div className="border-l border-[#ff2f91]/15 pl-2">
                                <span className="text-white/30 uppercase tracking-widest block text-[8px] mb-0.5">Weight</span>
                                <span className="text-white font-bold">{char.weight}</span>
                              </div>
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed">
                              {char.description}
                            </p>
                            <div className="pl-3 border-l-2 border-[#ff2f91]/40 italic text-white/60 text-sm">
                              &quot;{char.quote}&quot;
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Bottom barcode strip */}
            <div className="relative z-20 px-4 py-2 border-t border-[#ff2f91]/10 flex items-center justify-between">
              <div className="font-mono text-[7px] tracking-widest text-[#ff2f91]/30">SIG: 0xA7-BLOOM</div>
              <div className="h-[10px] w-[60px] opacity-40">
                <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 140 24" fill="currentColor" className="text-[#ff2f91]">
                  <rect x="0" y="0" width="3" height="24" /><rect x="5" y="0" width="1" height="24" />
                  <rect x="8" y="0" width="2" height="24" /><rect x="12" y="0" width="4" height="24" />
                  <rect x="18" y="0" width="1" height="24" /><rect x="21" y="0" width="3" height="24" />
                  <rect x="26" y="0" width="2" height="24" /><rect x="30" y="0" width="1" height="24" />
                  <rect x="33" y="0" width="4" height="24" /><rect x="39" y="0" width="2" height="24" />
                  <rect x="43" y="0" width="3" height="24" /><rect x="48" y="0" width="1" height="24" />
                </svg>
              </div>
            </div>
          </div>

          {/* ── CROWN DIVISION PANEL ────────────────────────────────── */}
          <div className="relative border border-[#facc15]/30 rounded-sm bg-[#0a0c12]/80 backdrop-blur-sm overflow-hidden">
            {/* Scanline overlay */}
            <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.06]"
              style={{ background: "repeating-linear-gradient(0deg, rgba(255,255,255,.08) 0 1px, transparent 1px 3px)" }} />

            {/* Corner brackets */}
            <div className="absolute top-[-1px] left-[-1px] w-2 h-2 border-t border-l border-[#facc15]/60" />
            <div className="absolute top-[-1px] right-[-1px] w-2 h-2 border-t border-r border-[#facc15]/60" />
            <div className="absolute bottom-[-1px] left-[-1px] w-2 h-2 border-b border-l border-[#facc15]/60" />
            <div className="absolute bottom-[-1px] right-[-1px] w-2 h-2 border-b border-r border-[#facc15]/60" />

            {/* Top glow bleed */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#facc15]/50 to-transparent" />

            {/* Header */}
            <div className="relative z-20 px-4 pt-4 pb-3 border-b border-[#facc15]/15 flex items-center gap-3">
              <div className="w-8 h-8 border border-[#facc15]/40 rounded-sm flex items-center justify-center relative shrink-0">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,214,10,0)_0px,rgba(255,214,10,0)_4px,rgba(255,214,10,0.15)_4px,rgba(255,214,10,0.15)_8px)]" />
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#facc15] relative z-10">
                  <path d="M12 2L15 8L22 10L16 15L18 22L12 18L6 22L8 15L2 10L9 8L12 2Z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-display text-[10px] tracking-widest text-[#facc15] font-bold">クラウン・ディビジョン</span>
                <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#facc15]">CROWN DIVISION</span>
              </div>
              <div className="ml-auto font-mono text-[8px] tracking-widest text-[#facc15]/50 text-right">
                OPERATIVES: 04<br />STATUS: HOSTILE
              </div>
            </div>

            {/* Character list */}
            <div className="relative z-20 p-3 flex flex-col gap-1.5">
              {CHARACTERS.filter(c => c.faction === "Crown Division").map((char) => {
                const isSelected = selectedId === char.id;
                const isHovered = hoveredId === char.id;
                const isDimmed = (selectedId !== null && !isSelected) || (isDesktop && hoveredId !== null && !isHovered);

                return (
                  <div key={char.id} className="flex flex-col">
                    <button
                      onMouseEnter={() => setHoveredId(char.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => handleNameClick(char.id)}
                      className={clsx(
                        "relative group w-full px-3 py-2.5 text-left transition-all duration-300 border rounded-sm flex items-center gap-3",
                        isSelected
                          ? "bg-[#facc15]/10 border-[#facc15]/40 shadow-[0_0_15px_rgba(250,204,21,0.15),inset_0_0_15px_rgba(250,204,21,0.05)]"
                          : "bg-transparent border-white/5 hover:bg-[#facc15]/5 hover:border-[#facc15]/20",
                        isDimmed && !isSelected && "opacity-40"
                      )}
                    >
                      {/* Left accent bar */}
                      <div
                        className={clsx(
                          "absolute left-0 top-1 bottom-1 w-[2px] rounded-full transition-all duration-300",
                          isSelected ? "opacity-100 shadow-[0_0_6px_rgba(250,204,21,0.6)]" : isHovered ? "opacity-80" : "opacity-0"
                        )}
                        style={{ backgroundColor: "#facc15" }}
                      />
                      {/* Index */}
                      <span className={clsx(
                        "font-mono text-[10px] tracking-widest transition-colors duration-300 w-6 shrink-0",
                        isSelected || isHovered ? "text-[#facc15]" : "text-white/20"
                      )}>
                        {String(CHARACTERS.filter(c => c.faction === "Crown Division").indexOf(char) + 1).padStart(2, "0")}
                      </span>
                      {/* Mobile Portrait */}
                      <div className="md:hidden w-14 h-14 rounded-full overflow-hidden border border-white/20 shrink-0">
                        <Image src={char.heroImage} alt={char.name} width={500} height={500} className="w-full h-full object-cover object-top" style={getMobilePortraitStyle(char.name)} />
                      </div>
                      {/* Name */}
                      <span className={clsx(
                        "text-sm md:text-base font-bold tracking-wider text-white uppercase transition-all duration-300",
                        isSelected && "drop-shadow-[0_0_10px_rgba(250,204,21,0.4)]"
                      )}>
                        {char.name}
                      </span>
                      {/* Status dot */}
                      <div className={clsx(
                        "ml-auto w-1.5 h-1.5 rounded-full transition-all duration-300",
                        isSelected ? "bg-[#facc15] shadow-[0_0_6px_rgba(250,204,21,0.8)]" : isHovered ? "bg-[#facc15]/60" : "bg-white/10"
                      )} />
                    </button>

                    {/* Mobile Accordion */}
                    <AnimatePresence>
                      {isSelected && !isDesktop && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden md:hidden"
                        >
                          <div className="p-4 border-x border-b border-[#facc15]/20 bg-[#0a0c12]/90 flex flex-col gap-3 rounded-b-sm">
                            <div className="w-full h-[180px] relative rounded-sm overflow-hidden border border-white/10">
                              <Image src={char.heroImage} alt={char.name} className="absolute inset-0 w-full h-full object-cover object-top" fill />
                            </div>
                            <div className="text-xs font-semibold tracking-widest uppercase text-[#facc15]">
                              {char.faction}
                            </div>
                            {/* Designation */}
                            <div className="font-mono text-[10px] border-t border-b border-[#facc15]/15 py-2">
                              <span className="text-white/30 uppercase tracking-widest block text-[8px] mb-0.5">Role / Designation</span>
                              <span className="text-[#facc15] font-semibold tracking-wider uppercase text-[11px]">{char.role}</span>
                            </div>
                            {/* Physical Specs HUD */}
                            <div className="grid grid-cols-3 gap-2 border-b border-[#facc15]/15 pb-2.5 font-mono text-[10px]">
                              <div>
                                <span className="text-white/30 uppercase tracking-widest block text-[8px] mb-0.5">Age</span>
                                <span className="text-white font-bold">{char.age}</span>
                              </div>
                              <div className="border-l border-[#facc15]/15 pl-2">
                                <span className="text-white/30 uppercase tracking-widest block text-[8px] mb-0.5">Height</span>
                                <span className="text-white font-bold">{char.height}</span>
                              </div>
                              <div className="border-l border-[#facc15]/15 pl-2">
                                <span className="text-white/30 uppercase tracking-widest block text-[8px] mb-0.5">Weight</span>
                                <span className="text-white font-bold">{char.weight}</span>
                              </div>
                            </div>
                            <p className="text-white/80 text-sm leading-relaxed">
                              {char.description}
                            </p>
                            <div className="pl-3 border-l-2 border-[#facc15]/40 italic text-white/60 text-sm">
                              &quot;{char.quote}&quot;
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Bottom barcode strip */}
            <div className="relative z-20 px-4 py-2 border-t border-[#facc15]/10 flex items-center justify-between">
              <div className="font-mono text-[7px] tracking-widest text-[#facc15]/30">SIG: CR-OMEGA-DIV</div>
              <div className="h-[10px] w-[60px] opacity-40">
                <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 140 24" fill="currentColor" className="text-[#facc15]">
                  <rect x="0" y="0" width="3" height="24" /><rect x="5" y="0" width="1" height="24" />
                  <rect x="8" y="0" width="2" height="24" /><rect x="12" y="0" width="4" height="24" />
                  <rect x="18" y="0" width="1" height="24" /><rect x="21" y="0" width="3" height="24" />
                  <rect x="26" y="0" width="2" height="24" /><rect x="30" y="0" width="1" height="24" />
                  <rect x="33" y="0" width="4" height="24" /><rect x="39" y="0" width="2" height="24" />
                  <rect x="43" y="0" width="3" height="24" /><rect x="48" y="0" width="1" height="24" />
                </svg>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
