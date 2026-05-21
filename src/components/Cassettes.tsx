"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const CASSETTE_DATA = [
  {
    id: "SG-01",
    label: "Territory Signal",
    title: "SIGNAL CONTROL",
    backTitle: "Signal Control",
    text: "The city is wired like a nervous system. When a district changes hands, its trees, buildings and route nodes change color with the network that controls it.",
    cta: "Read Signal",
    variant: "split",
    route: "CITY LAYER / ACTIVE",
    status: "CONTESTED",
    sig: "PX-YL-01",
    iconUrl: "/assets/Cassets/SIGNAL-CONTROL.png",
  },
  {
    id: "BL-02",
    label: "Relay Payload",
    title: "BLOOM RELAY CORE",
    backTitle: "Bloom Relay Core",
    text: "A faction-coded module carried by couriers to expand Bloom influence. Once installed in a relay point, it wakes dormant nodes, opens living routes and turns the district pink.",
    cta: "Inspect Core",
    variant: "bloom",
    route: "RELAY POINT / NORTHWALL",
    status: "SEALED",
    sig: "BL-CORE-01",
    iconUrl: "/assets/Cassets/BLOOM-RELAY-CORE.png",
  },
  {
    id: "CR-03",
    label: "Relay Payload",
    title: "CROWN RELAY CORE",
    backTitle: "Crown Relay Core",
    text: "A faction-coded module used by The Crown Division to expand control. Once installed in a relay point, it locks routes, syncs surveillance and turns the district yellow.",
    cta: "View Core",
    variant: "crown",
    route: "RELAY POINT / LOCKED",
    status: "HOSTILE",
    sig: "CR-CORE-01",
    iconUrl: "/assets/Cassets/CROWN-RELAY CORE.png",
  },
  {
    id: "RT-04",
    label: "Bloom Influence",
    title: "LIVING ZONES",
    backTitle: "Living Zones",
    text: "Pink zones are alive, hidden and unpredictable. Bloom influence opens rooftops, service tunnels, safehouses and forgotten paths that Crown maps cannot fully read.",
    cta: "Trace Route",
    variant: "bloom",
    route: "SAFE PATH / HIDDEN",
    status: "OPEN",
    sig: "RT-PINK",
    iconUrl: "/assets/Cassets/LIVING-ROUTES.png",
  },
  {
    id: "ZN-05",
    label: "Crown Influence",
    title: "CONTROLLED ZONES",
    backTitle: "Controlled Zones",
    text: "Yellow zones are scanned, locked and watched. Crown influence seals shortcuts, predicts movement, syncs drones and turns the environment into a control layer.",
    cta: "Scan Zone",
    variant: "crown",
    route: "GRID PATH / LOCKED",
    status: "RESTRICTED",
    sig: "ZN-YELLOW",
    iconUrl: "/assets/Cassets/CONTROLLED-ZONES.png",
  },
  {
    id: "CF-06",
    label: "Conflict Layer",
    title: "CONTESTED AREAS",
    backTitle: "Contested Areas",
    text: "Where Bloom and Crown Relay Cores fight for the same network, the city becomes unstable. Pink and yellow signals overlap as both sides try to claim the district.",
    cta: "View Conflict",
    variant: "split",
    route: "BORDERLINE / SHIFTING",
    status: "UNSTABLE",
    sig: "CF-MIXED",
    iconUrl: "/assets/Cassets/CONTESTED-AREAS.png",
  },
];

function CornerAccents() {
  return (
    <>
      <div className="absolute top-[-1px] left-[-1px] w-1.5 h-1.5 border-t border-l border-white/40" />
      <div className="absolute top-[-1px] right-[-1px] w-1.5 h-1.5 border-t border-r border-white/40" />
      <div className="absolute bottom-[-1px] left-[-1px] w-1.5 h-1.5 border-b border-l border-white/40" />
      <div className="absolute bottom-[-1px] right-[-1px] w-1.5 h-1.5 border-b border-r border-white/40" />
    </>
  );
}

function Cassette({ data }: { data: typeof CASSETTE_DATA[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandOffset, setExpandOffset] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isExpanded || isHovered) {
      setIsActive(true);
    } else {
      const t = setTimeout(() => setIsActive(false), 600); // Wait for un-expand animation to finish
      return () => clearTimeout(t);
    }
  }, [isExpanded, isHovered]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile && isExpanded) {
      document.body.style.overflow = "hidden";
      const preventDefault = (e: TouchEvent) => {
        e.preventDefault();
      };
      document.addEventListener("touchmove", preventDefault, { passive: false });
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("touchmove", preventDefault);
      };
    }
  }, [isMobile, isExpanded]);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const smoothX = useSpring(x, { stiffness: 300, damping: 30 });
  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(smoothY, [0, 1], [15, -15]);
  const rotateYBase = useTransform(smoothX, [0, 1], [-15, 15]);

  const flipAnimation = useSpring(0, { stiffness: 60, damping: 20 });
  const scaleAnimation = useSpring(0, { stiffness: 100, damping: 20 });
  const xAnimation = useSpring(0, { stiffness: 100, damping: 20 });
  const yAnimation = useSpring(0, { stiffness: 100, damping: 20 });

  const mobileBaseScale = 0.45;
  const expandedScale = 0.95;

  const targetScale = isMobile
    ? (isExpanded ? expandedScale : mobileBaseScale)
    : (isExpanded ? 1.35 : expandedScale);

  const targetFlip = isExpanded ? 180 : (isMobile ? 0 : (isHovered ? 180 : 0));

  useEffect(() => {
    flipAnimation.set(targetFlip);
    scaleAnimation.set(targetScale);
    xAnimation.set(isExpanded ? expandOffset.x : 0);
    yAnimation.set(isExpanded ? expandOffset.y : 0);
  }, [targetFlip, targetScale, expandOffset, isExpanded, flipAnimation, scaleAnimation, xAnimation, yAnimation]);

  const rotateY = useTransform(
    [rotateYBase, flipAnimation],
    ([base, flip]: any) => base + flip
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    if (isMobile) return;
    x.set(0.5);
    y.set(0.5);
    setIsHovered(false);
  }

  function handleTap(e: React.MouseEvent<HTMLDivElement>) {
    if (!isExpanded) {
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const screenCenterX = window.innerWidth / 2;
      const screenCenterY = window.innerHeight / 2;

      setExpandOffset({
        x: screenCenterX - centerX,
        y: screenCenterY - centerY
      });
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
    }
  }

  const isCrown = data.variant === "crown";
  const isSky = data.variant === "sky";
  const isSplit = data.variant === "split";

  // Box dimensions (maintaining exact 326 x 615 x 93 proportion from assets)
  const W = 326;
  const H = 615;
  const D = 93;
  const halfD = D / 2;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full transition-colors duration-300",
        isActive ? "z-50" : "z-10",
        "h-[340px] md:h-[780px]"
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onClick={handleTap}
    >
      {/* Dark backdrop overlay for expanded state */}
      <motion.div
        initial={false}
        animate={{ opacity: isExpanded ? 1 : 0 }}
        className={cn(
          "fixed inset-0 bg-ink-0/90 backdrop-blur-sm z-40 transition-opacity",
          isExpanded ? "pointer-events-auto" : "pointer-events-none"
        )}
        style={{ width: "100vw", height: "100vh", left: 0, top: 0 }}
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(false);
        }}
      />

      {/* Title under cassette on mobile */}
      <div className="absolute bottom-2 left-0 right-0 text-center md:hidden">
        <h4 className={cn(
          "font-display text-[12px] font-bold tracking-widest transition-opacity duration-300",
          isExpanded ? "opacity-0" : "opacity-100",
          isCrown ? "text-crown" : isSky ? "text-sky" : isSplit ? "text-split" : "text-bloom"
        )}>
          {data.title}
        </h4>
      </div>

      <div className="absolute top-1/2 left-1/2 -ml-[163px] -mt-[307.5px] [perspective:1400px] z-50 pointer-events-none" style={{ width: W, height: H }}>
        <motion.div
          style={{
            scale: scaleAnimation,
            rotateX,
            rotateY,
            x: xAnimation,
            y: yAnimation,
          }}
          className="relative w-full h-full [transform-style:preserve-3d] transition-shadow duration-300"
        >
          {/* FRONT FACE */}
          <div
            style={{ transform: `translateZ(${halfD}px)` }}
            className="absolute inset-0 [backface-visibility:hidden] bg-[#0d0f15]"
          >
            <img src="/assets/cart-frontPNG.png" alt="Front" className="absolute inset-0 z-20 w-full h-full object-cover pointer-events-none" />
            <div className="absolute inset-0 z-10 flex flex-col items-center text-center pl-[84px] pr-[76px] pt-[140px] pb-[125px]">

              {/* LOGO SECTION */}
              <div className="w-full aspect-square max-w-[100px] mx-auto relative flex items-center justify-center mb-2">
                <div className={cn("absolute inset-0", isCrown ? "bg-[repeating-linear-gradient(45deg,rgba(255,214,10,0)_0px,rgba(255,214,10,0)_6px,rgba(255,214,10,0.2)_6px,rgba(255,214,10,0.2)_12px)]" : isSky ? "bg-[repeating-linear-gradient(45deg,rgba(105,180,255,0)_0px,rgba(105,180,255,0)_6px,rgba(105,180,255,0.2)_6px,rgba(105,180,255,0.2)_12px)]" : isSplit ? "bg-[repeating-linear-gradient(45deg,rgba(255,107,61,0)_0px,rgba(255,107,61,0)_6px,rgba(255,107,61,0.2)_6px,rgba(255,107,61,0.2)_12px)]" : "bg-[repeating-linear-gradient(45deg,rgba(255,61,138,0)_0px,rgba(255,61,138,0)_6px,rgba(255,61,138,0.2)_6px,rgba(255,61,138,0.2)_12px)]")} />
                {data.iconUrl ? (
                  <img src={data.iconUrl} alt="Icon" className="w-[84px] h-[84px] relative z-10 object-contain" />
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className={cn("w-[84px] h-[84px] relative z-10", isCrown ? "text-crown" : isSky ? "text-sky" : isSplit ? "text-split" : "text-bloom")}>
                    {isCrown ? (
                      <path d="M12 2L15 8L22 10L16 15L18 22L12 18L6 22L8 15L2 10L9 8L12 2Z" />
                    ) : isSplit ? (
                      <path d="M11 2 L4.5 5.8 L4.5 18.2 L11 22 L11 19.5 L6.5 16.9 L6.5 7.1 L11 4.5 Z M13 2 L19.5 5.8 L19.5 18.2 L13 22 L13 19.5 L17.5 16.9 L17.5 7.1 L13 4.5 Z M11 7 h2 v3 h-2 Z M11 11 h2 v2 h-2 Z M11 14 h2 v3 h-2 Z" />
                    ) : (
                      <path d="M12 2C12 2 15 7 15 11C15 15 12 18 12 18C12 18 9 15 9 11C9 7 12 2 12 2ZM12 18C12 18 17 19 20 16C23 13 22 9 22 9C22 9 19 10 16 13C14 15 12 18 12 18ZM12 18C12 18 7 19 4 16C1 13 2 9 2 9C2 9 5 10 8 13C10 15 12 18 12 18Z" />
                    )}
                  </svg>
                )}
              </div>

              <div className={cn("font-display text-[11px] tracking-widest mb-0.5 font-bold", isCrown ? "text-crown" : isSky ? "text-sky" : isSplit ? "text-split" : "text-bloom")}>
                {isCrown ? "クラウン・ディビジョン" : isSky ? "スカイ・セクター" : isSplit ? "コンフリクト・エリア" : "ネオン・ブルーム"}
              </div>
              <div className={cn("font-mono text-[9px] tracking-[0.2em] uppercase mb-2", isCrown ? "text-crown" : isSky ? "text-sky" : isSplit ? "text-split" : "text-bloom")}>
                {isCrown ? "CROWN DIVISION" : isSky ? "SKY SECTOR" : isSplit ? "CONTESTED AREA" : "NEON BLOOM"}
              </div>

              {/* BOTTOM PANEL */}
              <div className={cn("flex-1 w-full border flex flex-col text-left p-3 relative mt-1 bg-[#0a0c12]/30 backdrop-blur-sm", isCrown ? "border-crown/40 rounded-t-lg rounded-b-sm" : isSky ? "border-sky/40 rounded-t-lg rounded-b-sm" : isSplit ? "border-split/40 rounded-t-lg rounded-b-sm" : "border-bloom/40 rounded-t-lg rounded-b-sm")}>

                <div className={cn("font-display text-[42px] font-bold leading-[0.8] mb-2 tracking-tighter", isCrown ? "text-crown" : isSky ? "text-sky" : isSplit ? "text-split" : "text-bloom")}>
                  {data.id.split('-')[1] || data.id}
                </div>

                <div className={cn("font-mono text-[14px] font-bold uppercase tracking-[0.08em] mb-1", isCrown ? "text-crown" : isSky ? "text-sky" : isSplit ? "text-split" : "text-bloom")}>
                  {data.label}
                </div>
                <div className={cn("font-display text-[11px] tracking-widest opacity-85 mb-2.5", isCrown ? "text-crown" : isSky ? "text-sky" : isSplit ? "text-split" : "text-bloom")}>
                  コアモジュール
                </div>

                {/* Fake Barcode */}
                <div className={cn("w-full h-[16px] mb-2 opacity-90", isCrown ? "text-crown" : isSky ? "text-sky" : isSplit ? "text-split" : "text-bloom")}>
                  <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 140 24" fill="currentColor">
                    <rect x="0" y="0" width="3" height="24" />
                    <rect x="5" y="0" width="1" height="24" />
                    <rect x="8" y="0" width="2" height="24" />
                    <rect x="12" y="0" width="4" height="24" />
                    <rect x="18" y="0" width="1" height="24" />
                    <rect x="21" y="0" width="3" height="24" />
                    <rect x="26" y="0" width="2" height="24" />
                    <rect x="30" y="0" width="1" height="24" />
                    <rect x="33" y="0" width="4" height="24" />
                    <rect x="39" y="0" width="2" height="24" />
                    <rect x="43" y="0" width="3" height="24" />
                    <rect x="48" y="0" width="1" height="24" />
                    <rect x="52" y="0" width="5" height="24" />
                    <rect x="59" y="0" width="2" height="24" />
                    <rect x="63" y="0" width="1" height="24" />
                    <rect x="66" y="0" width="3" height="24" />
                    <rect x="71" y="0" width="2" height="24" />
                    <rect x="75" y="0" width="4" height="24" />
                    <rect x="81" y="0" width="1" height="24" />
                    <rect x="84" y="0" width="2" height="24" />
                    <rect x="88" y="0" width="3" height="24" />
                    <rect x="93" y="0" width="1" height="24" />
                    <rect x="96" y="0" width="4" height="24" />
                    <rect x="102" y="0" width="2" height="24" />
                    <rect x="106" y="0" width="1" height="24" />
                    <rect x="109" y="0" width="3" height="24" />
                    <rect x="114" y="0" width="2" height="24" />
                    <rect x="118" y="0" width="1" height="24" />
                    <rect x="121" y="0" width="4" height="24" />
                    <rect x="127" y="0" width="2" height="24" />
                    <rect x="131" y="0" width="1" height="24" />
                    <rect x="134" y="0" width="3" height="24" />
                  </svg>
                </div>
                <div className={cn("font-mono text-[8px] tracking-widest mb-2", isCrown ? "text-crown" : isSky ? "text-sky" : isSplit ? "text-split" : "text-bloom")}>
                  NB-05-{data.id}
                </div>

                <div className={cn("mt-auto flex flex-col gap-0.5 font-mono text-[7px] tracking-widest", isCrown ? "text-crown" : isSky ? "text-sky" : isSplit ? "text-split" : "text-bloom")}>
                  <div>CLASS: <span className="opacity-80">{data.variant.toUpperCase()}</span></div>
                  <div>PRIORITY: <span className="opacity-80">{data.status === 'SEALED' ? 'HIGH' : data.status}</span></div>
                  <div>HANDLER ID</div>
                </div>

                {/* Bottom Corner Brackets */}
                <div className={cn("absolute bottom-1.5 left-1.5 w-1.5 h-1.5 border-b border-l", isCrown ? "border-crown/40" : isSky ? "border-sky/40" : isSplit ? "border-split/40" : "border-bloom/40")} />
                <div className={cn("absolute bottom-1.5 right-1.5 w-1.5 h-1.5 border-b border-r", isCrown ? "border-crown/40" : isSky ? "border-sky/40" : isSplit ? "border-split/40" : "border-bloom/40")} />
              </div>

            </div>
          </div>

          {/* BACK FACE */}
          <div
            style={{ transform: `rotateY(180deg) translateZ(${halfD}px)` }}
            className="absolute inset-0 [backface-visibility:hidden] bg-[#0a0c12] group"
          >
            <img src="/assets/cart-backPNG.png" alt="Back" className="absolute inset-0 z-20 w-full h-full object-cover pointer-events-none" />

            {/* Click Me Indicator */}
            <motion.div
              animate={{
                scale: [1, 1.08, 1],
                borderColor: ["rgba(255, 255, 255, 0.25)", "rgba(255, 255, 255, 0.65)", "rgba(255, 255, 255, 0.25)"],
                boxShadow: [
                  "0 0 0px rgba(255, 255, 255, 0)",
                  "0 0 10px rgba(255, 255, 255, 0.2)",
                  "0 0 0px rgba(255, 255, 255, 0)"
                ]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-[42px] left-1/2 -translate-x-1/2 z-30 flex items-center justify-center w-[58px] h-[58px] rounded-full border border-white/45 bg-[#0a0c12]/75 backdrop-blur-[2px] pointer-events-none"
            >
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/90 text-center leading-tight">
                Click<br />Me
              </span>
            </motion.div>

            <div className="absolute inset-0 z-10 pt-[110px] pb-[135px] pl-[35px] pr-[45px] flex flex-col gap-2 text-paper font-sans">

              {/* PANEL 1: MODULE OVERVIEW */}
              <div className="border border-white/10 rounded-sm p-2.5 flex gap-2 relative flex-1 bg-[#0a0c12]/50 backdrop-blur-sm">
                <CornerAccents />
                <div className="flex-1 flex flex-col">
                  <h3 className={cn("font-mono text-[10px] tracking-widest uppercase mb-2", isCrown ? "text-crown" : isSky ? "text-sky" : isSplit ? "text-split" : "text-bloom")}>MODULE OVERVIEW</h3>
                  <p className="text-[10.5px] leading-[1.6] text-white/70 mb-2">
                    {data.text}
                  </p>
                  <p className="text-[10.5px] leading-[1.6] text-white/70 mt-auto">
                    Handle only with verified {data.variant === "crown" ? "Crown" : data.variant === "split" ? "Contested" : "Bloom"} clearance.
                  </p>
                </div>
                <div className="w-[90px] flex flex-col items-center shrink-0 border-l border-white/10 pl-2">
                  <div className={cn("w-full aspect-square border p-1 mb-2 relative flex items-center justify-center", isCrown ? "border-crown/50" : isSky ? "border-sky/50" : isSplit ? "border-split/50" : "border-bloom/50")}>
                    <div className={cn("absolute inset-0 opacity-20", isCrown ? "bg-[repeating-linear-gradient(45deg,rgba(255,214,10,0)_0px,rgba(255,214,10,0)_4px,rgba(255,214,10,1)_4px,rgba(255,214,10,1)_8px)]" : isSky ? "bg-[repeating-linear-gradient(45deg,rgba(105,180,255,0)_0px,rgba(105,180,255,0)_4px,rgba(105,180,255,1)_4px,rgba(105,180,255,1)_8px)]" : isSplit ? "bg-[repeating-linear-gradient(45deg,rgba(255,107,61,0)_0px,rgba(255,107,61,0)_4px,rgba(255,107,61,1)_4px,rgba(255,107,61,1)_8px)]" : "bg-[repeating-linear-gradient(45deg,rgba(255,61,138,0)_0px,rgba(255,61,138,0)_4px,rgba(255,61,138,1)_4px,rgba(255,61,138,1)_8px)]")} />
                    {data.iconUrl ? (
                      <img src={data.iconUrl} alt="Icon" className="w-[76px] h-[76px] relative z-10 object-contain" />
                    ) : (
                      <svg viewBox="0 0 24 24" fill="currentColor" className={cn("w-[76px] h-[76px] relative z-10", isCrown ? "text-crown" : isSky ? "text-sky" : isSplit ? "text-split" : "text-bloom")}>
                        {isCrown ? (
                          <path d="M12 2L15 8L22 10L16 15L18 22L12 18L6 22L8 15L2 10L9 8L12 2Z" />
                        ) : isSplit ? (
                          <path d="M11 2 L4.5 5.8 L4.5 18.2 L11 22 L11 19.5 L6.5 16.9 L6.5 7.1 L11 4.5 Z M13 2 L19.5 5.8 L19.5 18.2 L13 22 L13 19.5 L17.5 16.9 L17.5 7.1 L13 4.5 Z M11 7 h2 v3 h-2 Z M11 11 h2 v2 h-2 Z M11 14 h2 v3 h-2 Z" />
                        ) : (
                          <path d="M12 2C12 2 15 7 15 11C15 15 12 18 12 18C12 18 9 15 9 11C9 7 12 2 12 2ZM12 18C12 18 7 19 4 16C1 13 2 9 2 9C2 9 5 10 8 13C10 15 12 18 12 18Z" />
                        )}
                      </svg>
                    )}
                  </div>
                  <div className={cn("font-mono text-[6.5px] tracking-wider text-center uppercase leading-tight mt-0.5", isCrown ? "text-crown" : isSky ? "text-sky" : isSplit ? "text-split" : "text-bloom")}>
                    {data.variant === 'bloom' ? 'NEON BLOOM' : data.variant === 'crown' ? 'CROWN DIV' : data.variant === 'sky' ? 'SKY SECTOR' : 'CONTESTED ZONE'}
                    <br />
                    <span className="text-white/40">COURIER DIV</span>
                  </div>
                </div>
              </div>

              {/* PANEL 2: PAYLOAD IDENTIFICATION */}
              <div className="border border-white/10 rounded-sm p-2 relative bg-[#0a0c12]/50 backdrop-blur-sm">
                <CornerAccents />
                <h3 className={cn("font-mono text-[8px] tracking-widest uppercase mb-1", isCrown ? "text-crown" : isSky ? "text-sky" : isSplit ? "text-split" : "text-bloom")}>PAYLOAD IDENTIFICATION</h3>
                <div className="font-mono text-[9px] text-white tracking-[0.15em] mb-1.5">
                  SN: BL-NB-05-{data.id}-77
                </div>
                <div className="flex justify-between items-end">
                  {/* Fake Barcode SVG */}
                  <div className="flex-1 opacity-80 h-[18px]">
                    <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 140 24" fill="currentColor" className="text-white">
                      <rect x="0" y="0" width="3" height="24" />
                      <rect x="5" y="0" width="1" height="24" />
                      <rect x="8" y="0" width="2" height="24" />
                      <rect x="12" y="0" width="4" height="24" />
                      <rect x="18" y="0" width="1" height="24" />
                      <rect x="21" y="0" width="3" height="24" />
                      <rect x="26" y="0" width="2" height="24" />
                      <rect x="30" y="0" width="1" height="24" />
                      <rect x="33" y="0" width="4" height="24" />
                      <rect x="39" y="0" width="2" height="24" />
                      <rect x="43" y="0" width="3" height="24" />
                      <rect x="48" y="0" width="1" height="24" />
                      <rect x="52" y="0" width="5" height="24" />
                      <rect x="59" y="0" width="2" height="24" />
                      <rect x="63" y="0" width="1" height="24" />
                      <rect x="66" y="0" width="3" height="24" />
                      <rect x="71" y="0" width="2" height="24" />
                      <rect x="75" y="0" width="4" height="24" />
                      <rect x="81" y="0" width="1" height="24" />
                      <rect x="84" y="0" width="2" height="24" />
                      <rect x="88" y="0" width="3" height="24" />
                      <rect x="93" y="0" width="1" height="24" />
                      <rect x="96" y="0" width="4" height="24" />
                      <rect x="102" y="0" width="2" height="24" />
                      <rect x="106" y="0" width="1" height="24" />
                      <rect x="109" y="0" width="3" height="24" />
                      <rect x="114" y="0" width="2" height="24" />
                      <rect x="118" y="0" width="1" height="24" />
                      <rect x="121" y="0" width="4" height="24" />
                      <rect x="127" y="0" width="2" height="24" />
                      <rect x="131" y="0" width="1" height="24" />
                      <rect x="134" y="0" width="3" height="24" />
                    </svg>
                  </div>
                  {/* Fake QR SVG */}
                  <div className="w-[22px] h-[22px] ml-4 border border-white p-0.5 shrink-0 opacity-80">
                    <svg width="100%" height="100%" viewBox="0 0 32 32" fill="currentColor" className="text-white">
                      <rect x="2" y="2" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="4" y="4" width="4" height="4" />
                      <rect x="22" y="2" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="24" y="4" width="4" height="4" />
                      <rect x="2" y="22" width="8" height="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      <rect x="4" y="24" width="4" height="4" />
                      <rect x="14" y="4" width="2" height="2" />
                      <rect x="18" y="2" width="2" height="2" />
                      <rect x="14" y="8" width="4" height="2" />
                      <rect x="22" y="14" width="2" height="4" />
                      <rect x="26" y="16" width="4" height="2" />
                      <rect x="28" y="12" width="2" height="2" />
                      <rect x="2" y="14" width="6" height="2" />
                      <rect x="4" y="18" width="2" height="2" />
                      <rect x="10" y="14" width="4" height="4" />
                      <rect x="16" y="14" width="2" height="2" />
                      <rect x="12" y="20" width="2" height="6" />
                      <rect x="16" y="22" width="4" height="2" />
                      <rect x="18" y="26" width="2" height="4" />
                      <rect x="22" y="24" width="4" height="2" />
                      <rect x="24" y="28" width="2" height="2" />
                      <rect x="28" y="22" width="2" height="6" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* PANEL 3: METRICS */}
              <div className="border border-white/10 rounded-sm p-2 relative flex justify-between font-mono text-[7.5px] tracking-widest text-white/70 bg-[#0a0c12]/50 backdrop-blur-sm">
                <CornerAccents />
                <div className="flex flex-col gap-1">
                  <div>CLASS: <span className="text-white">{data.variant.toUpperCase()}</span></div>
                  <div>PRIORITY: <span className="text-white">{data.status === 'SEALED' ? 'HIGH' : data.status}</span></div>
                  <div>SECURITY: <span className="text-white">0.4</span></div>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <div>MASS: <span className="text-white">0.356g</span></div>
                  <div>VOLUME: <span className="text-white">3.0cc</span></div>
                </div>
              </div>

            </div>
          </div>

          {/* LEFT FACE */}
          <div
            style={{ width: D, left: -halfD, transform: 'rotateY(-90deg)' }}
            className="absolute top-0 bottom-0 bg-[#0a0c12]"
          >
            <img src="/assets/cart-leftPNG.png" alt="Left" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          </div>

          {/* RIGHT FACE */}
          <div
            style={{ width: D, right: -halfD, transform: 'rotateY(90deg)' }}
            className="absolute top-0 bottom-0 bg-[#0a0c12]"
          >
            <img src="/assets/cart-rightPNG.png" alt="Right" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
          </div>

          {/* TOP FACE */}
          <div
            style={{ height: D, top: -halfD, transform: 'rotateX(90deg)' }}
            className="absolute left-0 right-0 bg-[#06070a]"
          />

          {/* BOTTOM FACE */}
          <div
            style={{ height: D, bottom: -halfD, transform: 'rotateX(-90deg)' }}
            className="absolute left-0 right-0 bg-[#06070a]"
          />

        </motion.div>
      </div>
    </div>
  );
}

export default function Cassettes() {
  return (
    <section id="cargo" className="w-full max-w-[1480px] mx-auto px-exp-3 md:px-exp-4 pb-exp-6 mb-[120px]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-y-3 gap-x-exp-4 py-exp-5 pb-exp-4 border-b border-line">
        <div>
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">§ 02 · COURIER PAYLOAD ARCHIVE</div>
          <h2 className="mt-exp-3 font-display font-bold text-[clamp(32px,4.2vw,56px)] leading-[1.02] tracking-[-0.02em]">
            Classified Cargo
          </h2>
        </div>
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute text-left md:text-right min-w-[200px] mt-2 md:mt-0">
          6 SEALED MODULES <span className="md:hidden">·</span> <br className="hidden md:inline" /> HOVER TO INSPECT
        </div>
      </div>

      <div className="pt-exp-4 pb-exp-2">
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute mb-exp-2">
          — PAYLOAD MANIFEST
        </div>
        <p className="text-[17px] leading-[1.65] text-paper-dim max-w-[640px]">
          Every delivery carries a fragment of the world. Hover each module to uncover the route, the threat, and the signal hidden inside.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6 md:gap-exp-4 py-exp-4">
        {CASSETTE_DATA.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Cassette data={d} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
