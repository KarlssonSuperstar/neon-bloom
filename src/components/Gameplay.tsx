"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "framer-motion";

const PILLARS = [
  { tag: "PILLAR 01", n: "01", title: "Traversal", text: "Move through rooftops, alleys, tunnels and vertical city structures with speed and precision.", image: "/assets/Gameplay/Traversal.png" },
  { tag: "PILLAR 02", n: "02", title: "Vehicle Chases", text: "Escape Crown pursuit across city streets, open roads and hostile transit lines.", image: "/assets/Gameplay/Vehicle%20Chases.png" },
  { tag: "PILLAR 03", n: "03", title: "Combat", text: "Fight with mobility, gadgets and precision while protecting high-value cargo.", image: "/assets/Gameplay/Combat.png" },
  { tag: "PILLAR 04", n: "04", title: "Exploration", text: "Discover lost routes, hidden bloom zones, abandoned stations and fragments of the world's history.", image: "/assets/Gameplay/Exploration.png" }
];

/* ================================================================
   SVG ICONS
   ================================================================ */

const IconPlay = () => (
  <svg viewBox="0 0 24 24"><polygon points="6,3 20,12 6,21" /></svg>
);
const IconPause = () => (
  <svg viewBox="0 0 24 24"><rect x="5" y="3" width="4" height="18" /><rect x="15" y="3" width="4" height="18" /></svg>
);
const IconVolume = () => (
  <svg viewBox="0 0 24 24"><polygon points="6,9 2,9 2,15 6,15 11,19 11,5" /><path d="M14 8.5a4 4 0 010 7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M16.5 6a7.5 7.5 0 010 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
);
const IconMute = () => (
  <svg viewBox="0 0 24 24"><polygon points="6,9 2,9 2,15 6,15 11,19 11,5" /><line x1="16" y1="9" x2="22" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><line x1="22" y1="9" x2="16" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
);
const IconFullscreen = () => (
  <svg viewBox="0 0 24 24"><polyline points="15,3 21,3 21,9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><polyline points="9,21 3,21 3,15" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><polyline points="21,15 21,21 15,21" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><polyline points="3,9 3,3 9,3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

/* ================================================================
   FORMAT TIME
   ================================================================ */

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

/* ================================================================
   VIDEO PLAYER
   ================================================================ */

function VideoPlayer({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
      setStarted(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    const v = videoRef.current;
    if (v) setCurrentTime(v.currentTime);
  }, []);

  const handleLoadedMetadata = useCallback(() => {
    const v = videoRef.current;
    if (v) setDuration(v.duration);
  }, []);

  const handleEnded = useCallback(() => {
    setPlaying(false);
    setStarted(false);
  }, []);

  const seekTo = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = progressRef.current;
    if (!v || !bar) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.currentTime = pct * v.duration;
  }, []);

  const changeVolume = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    const bar = e.currentTarget;
    if (!v) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    v.volume = pct;
    setVolume(pct);
    if (pct > 0 && muted) { v.muted = false; setMuted(false); }
  }, [muted]);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen();
    }
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (v) v.volume = volume;
  }, [volume]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7 }}
    >
      {/* HUD label strip */}
      <div className="vp__label">
        <span className="vp__label-title">⊙ GAMEPLAY PREVIEW</span>
        <span>FEED · LIVE</span>
      </div>

      {/* Player container */}
      <div ref={wrapRef} className={`vp ${!playing ? "vp--paused" : ""}`}>
        <video
          ref={videoRef}
          className="vp__video"
          src={src}
          preload="metadata"
          playsInline
          onClick={togglePlay}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
        />

        {/* Big centred play button */}
        <div
          className={`vp__big-play ${started && playing ? "vp__big-play--hidden" : ""}`}
          onClick={togglePlay}
        >
          <div className="vp__big-play-btn">
            <IconPlay />
          </div>
        </div>

        {/* Bottom controls */}
        <div className="vp__controls">
          {/* Play / Pause */}
          <button className="vp__btn" onClick={togglePlay} aria-label={playing ? "Pause" : "Play"}>
            {playing ? <IconPause /> : <IconPlay />}
          </button>

          {/* Progress bar */}
          <div className="vp__progress-wrap" ref={progressRef} onClick={seekTo}>
            <div className="vp__progress-track">
              <div className="vp__progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>

          {/* Time */}
          <div className="vp__time">
            {fmt(currentTime)} / {fmt(duration)}
          </div>

          {/* Volume */}
          <div className="vp__volume">
            <button className="vp__btn" onClick={toggleMute} aria-label={muted ? "Unmute" : "Mute"}>
              {muted || volume === 0 ? <IconMute /> : <IconVolume />}
            </button>
            <div className="vp__volume-track" onClick={changeVolume}>
              <div className="vp__volume-fill" style={{ width: `${muted ? 0 : volume * 100}%` }} />
            </div>
          </div>

          {/* Fullscreen */}
          <button className="vp__btn" onClick={toggleFullscreen} aria-label="Fullscreen">
            <IconFullscreen />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function Gameplay() {
  return (
    <section id="gameplay" className="w-full max-w-[1480px] mx-auto px-exp-3 md:px-exp-4 pb-exp-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-y-3 gap-x-exp-4 py-exp-5 pb-exp-4 border-b border-line">
        <div>
          <div className="font-mono text-[11px] tracking-[0.22em] uppercase text-mute">§ 04 · GAMEPLAY PILLARS</div>
          <h2 className="mt-exp-3 font-display font-bold text-[clamp(32px,4.2vw,56px)] leading-[1.02] tracking-[-0.02em] max-w-[900px]">
            Run the routes. Break the system.
          </h2>
        </div>
        <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-mute text-left md:text-right min-w-[200px] mt-2 md:mt-0">
          4 PILLARS <span className="md:hidden">·</span> <br className="hidden md:inline" /> SYSTEMIC PLAY
        </div>
      </div>

      <div className="flex flex-col gap-exp-4 my-exp-5">
        {PILLARS.map((c, i) => {
          const isEven = i % 2 === 0;
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group relative min-h-[280px] md:min-h-[320px] border border-line overflow-hidden bg-[#0a0c12] flex flex-col md:flex-row"
            >
              {/* Desktop Image */}
              <div 
                className={`hidden md:block absolute inset-y-0 ${isEven ? "left-0" : "right-0"} w-[58%] z-0`}
                style={{
                  clipPath: isEven 
                    ? "polygon(0 0, 100% 0, calc(100% - 80px) 100%, 0 100%)" 
                    : "polygon(80px 0, 100% 0, 100% 100%, 0 100%)"
                }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${c.image})` }}
                />
                {/* Subtle gradient so the image isn't too raw against the dark theme */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Mobile Image */}
              <div className="md:hidden relative w-full h-[240px] overflow-hidden z-0">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ backgroundImage: `url(${c.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c12] via-black/40 to-transparent" />
              </div>

              {/* Text Container */}
              <div className={`relative z-10 w-full md:w-1/2 py-exp-3 md:py-exp-4 px-exp-4 md:px-exp-5 lg:px-exp-6 flex flex-col justify-center ${isEven ? "md:ml-auto" : "md:mr-auto"}`}>
                <div className="flex justify-between items-start mb-exp-3 md:mb-exp-4">
                  <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-bloom">{c.tag}</span>
                  <span className="font-mono text-5xl font-medium text-white/5 leading-none tracking-[-0.04em] transition-colors duration-500 group-hover:text-bloom/20">{c.n}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-[28px] md:text-[36px] m-0 tracking-[-0.01em]">{c.title}</h3>
                  <p className="mt-exp-3 text-[14.5px] leading-[1.65] text-paper-dim max-w-[42ch]">{c.text}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Video Player */}
      <VideoPlayer src="/assets/Gameplay/Video/Bloom.mp4" />
    </section>
  );
}
