"use client";

import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FACTION_COLORS, ICON_MAP, ROUTE_STYLES,
  type MapMarkerData, type MapLabelData, type MapRouteData,
  type BlockedPointData, type MapZoneData, type Faction,
} from "./mapData";

// ============================================================
// INTERACTIVE MAP — Neon Bloom Tactical Map
// ============================================================

/* ---- Fetched data shape ---- */
interface MapDataPayload {
  markers: MapMarkerData[];
  labels: MapLabelData[];
  routes: MapRouteData[];
  blockedPoints: BlockedPointData[];
  zones: MapZoneData[];
}

/* ---- Filter state shape ---- */
interface Filters {
  bloom: boolean;
  crown: boolean;
  neutral: boolean;
  contested: boolean;
  routes: boolean;
  icons: boolean;
}

const DEFAULT_FILTERS: Filters = {
  bloom: true, crown: true, neutral: true, contested: true,
  routes: true, icons: true,
};

/* ---- Filter button config ---- */
const FILTER_BUTTONS: { key: keyof Filters; label: string; color: string }[] = [
  { key: "bloom",     label: "Bloom",     color: "#f98fb9" },
  { key: "crown",     label: "Crown",     color: "#ffd60a" },
  { key: "neutral",   label: "Neutral",   color: "#b4c6d8" },
  { key: "contested", label: "Contested", color: "#ff6b3d" },
  { key: "routes",    label: "Routes",    color: "#00e5ff" },
  { key: "icons",     label: "Icons",     color: "#ffffff" },
];

/* ================================================================
   MAIN COMPONENT
   ================================================================ */

export default function InteractiveMap() {
  /* ---- Map data from JSON ---- */
  const [mapData, setMapData] = useState<MapDataPayload | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/assets/Map/mapData.json")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: MapDataPayload) => {
        if (!cancelled) setMapData(data);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message);
      });
    return () => { cancelled = true; };
  }, []);

  /* Destructure with fallback empty arrays while loading */
  const markers = mapData?.markers ?? [];
  const labels = mapData?.labels ?? [];
  const routes = mapData?.routes ?? [];
  const blockedPoints = mapData?.blockedPoints ?? [];
  const zones = mapData?.zones ?? [];

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const [activeMarker, setActiveMarker] = useState<string | null>(null);

  /* ---- Tracing Mode (dev tool) ---- */
  const [tracingMode, setTracingMode] = useState(false);
  const [tracedPoints, setTracedPoints] = useState<[number, number][]>([]);
  const [traceCopied, setTraceCopied] = useState(false);
  const [traceCursor, setTraceCursor] = useState<{ x: number; y: number; px: number; py: number } | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const filterBar = filterBarRef.current;
    if (!section || !filterBar) return;

    const handleScroll = () => {
      // Only apply transform on mobile (<768px) where horizontal scroll is active
      if (window.innerWidth <= 768) {
        // Keeps the filter bar pinned to the left edge of the visible scroll area
        filterBar.style.transform = `translateX(${section.scrollLeft}px)`;
      } else {
        filterBar.style.transform = 'none';
      }
    };

    section.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    
    // Initial call
    handleScroll();

    return () => {
      section.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const handleTracingClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tracingMode) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 1000) / 10;
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 1000) / 10;
      setTracedPoints((prev) => [...prev, [x, y]]);
      e.stopPropagation();
    },
    [tracingMode]
  );

  const handleTracingMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!tracingMode) { setTraceCursor(null); return; }
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 1000) / 10;
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 1000) / 10;
      setTraceCursor({ x, y, px: e.clientX - rect.left, py: e.clientY - rect.top });
    },
    [tracingMode]
  );

  const traceArrayString = useMemo(() => {
    if (tracedPoints.length === 0) return "[]";
    const inner = tracedPoints.map(([x, y]) => `[${x}, ${y}]`).join(", ");
    return `[${inner}]`;
  }, [tracedPoints]);

  const copyTraceToClipboard = useCallback(() => {
    navigator.clipboard.writeText(traceArrayString).then(() => {
      setTraceCopied(true);
      setTimeout(() => setTraceCopied(false), 1500);
    });
  }, [traceArrayString]);

  const undoLastPoint = useCallback(() => {
    setTracedPoints((prev) => prev.slice(0, -1));
  }, []);

  const toggleFilter = useCallback((key: keyof Filters) => {
    setFilters((f) => ({ ...f, [key]: !f[key] }));
  }, []);

  const activeData = useMemo(
    () => markers.find((m) => m.id === activeMarker) ?? null,
    [markers, activeMarker]
  );

  const hoveredData = useMemo(
    () => markers.find((m) => m.id === hoveredMarker) ?? null,
    [markers, hoveredMarker]
  );

  /* Visibility helpers */
  // Labels: ALWAYS visible regardless of filters
  // Icons: only toggled by the "Icons" button
  // Zones: toggled by faction buttons (Bloom / Crown / Neutral / Contested)
  const isMarkerVisible = (_m: MapMarkerData) => filters.icons;
  const isZoneVisible = (f: Faction) => filters[f];

  return (
    <div className="map-section" id="interactive-map" ref={sectionRef}>
      {/* ---- Loading / Error Overlay ---- */}
      {!mapData && !loadError && (
        <div className="map-loading-overlay">
          <div className="map-loading-spinner" />
          <span>LOADING MAP DATA…</span>
        </div>
      )}
      {loadError && (
        <div className="map-loading-overlay map-loading-overlay--error">
          <span>⚠ MAP DATA UNAVAILABLE</span>
          <span className="map-loading-detail">{loadError}</span>
        </div>
      )}

      {/* ---- HUD Panel (above map) ---- */}
      <div className="map-hud">
        {/* Branding + Compass column */}
        <div className="map-hud__brand">
          <div className="map-hud__header">
            <div className="map-hud__title">NEON BLOOM</div>
            <div className="map-hud__subtitle">
              REGIONAL MAP <span className="map-hud__line" />
            </div>
            <div className="map-hud__version">⊙ v.2.5.1</div>
          </div>
          <div className="map-hud__compass">
            <svg viewBox="0 0 60 60" className="map-hud__compass-svg">
              <circle cx="30" cy="30" r="28" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
              <circle cx="30" cy="30" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              <line x1="30" y1="6" x2="30" y2="14" stroke="#00e5ff" strokeWidth="1.5" />
              <line x1="30" y1="46" x2="30" y2="54" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <line x1="6" y1="30" x2="14" y2="30" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <line x1="46" y1="30" x2="54" y2="30" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
              <text x="30" y="12" textAnchor="middle" fill="#00e5ff" fontSize="7" fontFamily="monospace">N</text>
              <text x="30" y="56" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">S</text>
              <text x="8" y="32" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">W</text>
              <text x="52" y="32" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="6" fontFamily="monospace">E</text>
              <polygon points="30,22 36,30 30,38 24,30" fill="none" stroke="#00e5ff" strokeWidth="0.8" opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Divider */}
        <div className="map-hud__vdivider" />

        {/* Faction Control */}
        <div className="map-hud__section">
          <div className="map-hud__group-title">FACTION CONTROL</div>
          {([
            ["Bloom Network", "#f98fb9"],
            ["Crown Division", "#ffd60a"],
            ["The Fray / Coalition", "#ff6b3d"],
            ["Neutral / Abandoned", "#b4c6d8"],
          ] as [string, string][]).map(([name, color]) => (
            <div key={name} className="map-hud__legend-item">
              <span className="map-hud__legend-swatch" style={{ background: color }} />
              <span>{name}</span>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="map-hud__vdivider" />

        {/* Routes */}
        <div className="map-hud__section">
          <div className="map-hud__group-title">ROUTES &amp; INFRASTRUCTURE</div>
          {([
            ["Active Courier Route", "#00e5ff", ""],
            ["Hidden Courier Paths", "#f98fb9", "6 4"],
            ["Crown Highways", "#ffd60a", ""],
            ["Rail Lines", "#6b7a8d", "4 4"],
            ["Smuggling Paths", "#ff9f43", "4 4"],
          ] as [string, string, string][]).map(([name, color, dash]) => (
            <div key={name} className="map-hud__legend-item">
              <svg width="24" height="8" viewBox="0 0 24 8" className="map-hud__legend-route">
                <line x1="0" y1="4" x2="24" y2="4" stroke={color} strokeWidth="2" strokeDasharray={dash} strokeLinecap="round" />
              </svg>
              <span>{name}</span>
            </div>
          ))}
          <div className="map-hud__legend-item">
            <svg width="24" height="12" viewBox="0 0 24 12" className="map-hud__legend-route">
              <line x1="4" y1="2" x2="12" y2="10" stroke="#ff3b3b" strokeWidth="2" strokeLinecap="round" />
              <line x1="12" y1="2" x2="4" y2="10" stroke="#ff3b3b" strokeWidth="2" strokeLinecap="round" />
              <line x1="14" y1="2" x2="22" y2="10" stroke="#ff3b3b" strokeWidth="2" strokeLinecap="round" />
              <line x1="22" y1="2" x2="14" y2="10" stroke="#ff3b3b" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span>Blocked / Dangerous Route</span>
          </div>
        </div>

        {/* Divider */}
        <div className="map-hud__vdivider" />

        {/* POI */}
        <div className="map-hud__section">
          <div className="map-hud__group-title">POINTS OF INTEREST</div>
          {([
            ["Major City", "city"],
            ["Settlement", "settlement"],
            ["Relay Station", "relay-station"],
            ["Outpost", "outpost"],
            ["Harbor / Port", "harbor"],
            ["Industrial Facility", "industrial"],
          ] as [string, string][]).map(([name, type]) => (
            <div key={name} className="map-hud__legend-item">
              <img
                src={ICON_MAP[type as keyof typeof ICON_MAP]}
                alt=""
                className="map-hud__legend-icon"
                draggable={false}
              />
              <span>{name}</span>
            </div>
          ))}
          <div className="map-hud__legend-item">
            <svg viewBox="0 0 24 24" className="map-hud__legend-icon map-hud__legend-icon--svg">
              <path d="M12 2L20 12L12 22L4 12Z" fill="none" stroke="#b4c6d8" strokeWidth="1.5" />
            </svg>
            <span>View / POI / Landmark</span>
          </div>
        </div>

      </div>

      {/* ---- Map Viewport (16:9 aspect) ---- */}
      <div
        ref={viewportRef}
        className={`map-viewport ${tracingMode ? "map-viewport--tracing" : ""}`}
        onClick={(e) => {
          if (tracingMode) {
            handleTracingClick(e);
          } else {
            setActiveMarker(null);
          }
        }}
        onMouseMove={handleTracingMouseMove}
        onMouseLeave={() => setTraceCursor(null)}
      >
        {/* Base map image */}
        <img
          src="/assets/Map/Map.png"
          alt="Neon Bloom Regional Map"
          className="map-bg"
          draggable={false}
        />

        {/* Scanline & grid overlay */}
        <div className="map-scanline-overlay" />
        <div className="map-grid-overlay" />

        {/* ---- Scale Bar Overlay (top-left) ---- */}
        <div className="map-viewport-scale">
          <div className="map-hud__scale-bar">
            <div className="map-hud__scale-seg map-hud__scale-seg--filled" />
            <div className="map-hud__scale-seg" />
            <div className="map-hud__scale-seg map-hud__scale-seg--filled" />
            <div className="map-hud__scale-seg" />
          </div>
          <div className="map-hud__scale-labels">
            <span>0</span><span>5KM</span><span>10KM</span><span>20KM</span><span>30KM</span>
          </div>
        </div>

        {/* ---- SVG Zones + Routes Layer ---- */}
        <svg
          className="map-routes-layer"
          viewBox="0 0 1600 900"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <filter id="glow-pink" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          {/* ---- Territory Zone Polygons ---- */}
          {zones.map((zone) => {
            const color = FACTION_COLORS[zone.faction];
            const pts = zone.points
              .map(([x, y]) => `${x * 16},${y * 9}`)
              .join(" ");
            return (
              <polygon
                key={zone.id}
                points={pts}
                fill={color}
                fillOpacity={0.06}
                stroke={color}
                strokeWidth={1.8}
                strokeOpacity={0.7}
                strokeLinejoin="round"
                className="map-zone-polygon"
                style={{ opacity: isZoneVisible(zone.faction) ? 1 : 0 }}
              />
            );
          })}

          {/* ---- Route Lines ---- */}
          <g style={{ opacity: filters.routes ? 1 : 0, transition: "opacity 0.4s ease" }}>
            {routes.map((route) => {
              const style = ROUTE_STYLES[route.type];
              const pts = route.points
                .map(([x, y]) => `${x * 16},${y * 9}`)
                .join(" ");
              return (
                <polyline
                  key={route.id}
                  points={pts}
                  fill="none"
                  stroke={style.color}
                  strokeWidth={style.width}
                  strokeDasharray={style.dash}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter={route.type === "active-courier" ? "url(#glow-cyan)" : route.type === "hidden-courier" ? "url(#glow-pink)" : undefined}
                  className="map-route-line"
                />
              );
            })}

            {/* Blocked route X markers */}
            {blockedPoints.map((bp) => {
              const cx = bp.x * 16;
              const cy = bp.y * 9;
              const s = 8;
              return (
                <g key={bp.id}>
                  <line x1={cx - s} y1={cy - s} x2={cx + s} y2={cy + s} stroke="#ff3b3b" strokeWidth={2.5} strokeLinecap="round" />
                  <line x1={cx + s} y1={cy - s} x2={cx - s} y2={cy + s} stroke="#ff3b3b" strokeWidth={2.5} strokeLinecap="round" />
                </g>
              );
            })}
          </g>
        </svg>

        {/* ---- Labels Layer ---- */}
        <div className="map-labels-layer">
          {labels.map((label) => (
            <div
              key={label.id}
              className={`map-label map-label--${label.size}`}
              style={{
                left: `${label.x}%`,
                top: `${label.y}%`,
                color: FACTION_COLORS[label.faction],
              }}
            >
              <span className="map-label__text">{label.text}</span>
              {label.subtitle && (
                <span className="map-label__sub">{label.subtitle}</span>
              )}
            </div>
          ))}
        </div>

        {/* ---- Markers Layer ---- */}
        <div className="map-markers-layer">
          {markers.map((marker) => {
            const iconSrc = ICON_MAP[marker.type];
            const visible = isMarkerVisible(marker);
            return (
              <button
                key={marker.id}
                className={`map-marker ${hoveredMarker === marker.id ? "map-marker--hovered" : ""} ${activeMarker === marker.id ? "map-marker--active" : ""}`}
                style={{
                  left: `${marker.x}%`,
                  top: `${marker.y}%`,
                  opacity: visible ? 1 : 0,
                  pointerEvents: visible ? "auto" : "none",
                  "--marker-color": FACTION_COLORS[marker.faction],
                } as React.CSSProperties}
                onMouseEnter={() => setHoveredMarker(marker.id)}
                onMouseLeave={() => setHoveredMarker(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMarker(
                    activeMarker === marker.id ? null : marker.id
                  );
                }}
                aria-label={marker.name}
              >
                {iconSrc ? (
                  <img
                    src={iconSrc}
                    alt=""
                    className="map-marker__icon"
                    draggable={false}
                  />
                ) : (
                  /* POI inline SVG fallback */
                  <svg viewBox="0 0 24 24" className="map-marker__poi">
                    <path d="M12 2L20 12L12 22L4 12Z" fill="currentColor" opacity="0.8" stroke="currentColor" strokeWidth="1" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>

        {/* ---- Tooltip (hover) ---- */}
        <AnimatePresence>
          {hoveredData && hoveredMarker !== activeMarker && (
            <motion.div
              className="map-tooltip"
              style={{
                left: `${hoveredData.x}%`,
                top: `${hoveredData.y}%`,
                borderColor: FACTION_COLORS[hoveredData.faction],
              }}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
            >
              <div className="map-tooltip__name">{hoveredData.name}</div>
              <div
                className="map-tooltip__faction"
                style={{ color: FACTION_COLORS[hoveredData.faction] }}
              >
                {hoveredData.faction.toUpperCase()}
              </div>
              <div className="map-tooltip__desc">{hoveredData.description.slice(0, 80)}…</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- Info Card (click) ---- */}
        <AnimatePresence>
          {activeData && (
            <motion.div
              key="backdrop"
              className="map-info-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveMarker(null)}
            />
          )}
          {activeData && (
            <motion.div
              key="card"
              className="map-info-card"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="map-info-card__close"
                onClick={() => setActiveMarker(null)}
                aria-label="Close"
              >
                ×
              </button>
              <div
                className="map-info-card__accent"
                style={{ background: FACTION_COLORS[activeData.faction] }}
              />
              <div className="map-info-card__type">
                {activeData.type.replace("-", " ").toUpperCase()}
              </div>
              <div className="map-info-card__name">{activeData.name}</div>
              <div
                className="map-info-card__faction"
                style={{ color: FACTION_COLORS[activeData.faction] }}
              >
                <span
                  className="map-info-card__dot"
                  style={{ background: FACTION_COLORS[activeData.faction] }}
                />
                {activeData.faction.toUpperCase()} CONTROL
              </div>
              <p className="map-info-card__desc">{activeData.description}</p>
              <div className="map-info-card__coords">
                LOC {activeData.x.toFixed(1)}°N · {activeData.y.toFixed(1)}°E
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ---- Filter Bar ---- */}
        <div className="map-filter-bar" ref={filterBarRef}>
          {FILTER_BUTTONS.map((fb) => (
            <button
              key={fb.key}
              className={`map-filter-btn ${filters[fb.key] ? "map-filter-btn--active" : ""}`}
              style={{
                "--filter-color": fb.color,
                borderColor: filters[fb.key] ? fb.color : "rgba(255,255,255,0.15)",
              } as React.CSSProperties}
              onClick={(e) => {
                e.stopPropagation();
                toggleFilter(fb.key);
              }}
            >
              <span
                className="map-filter-btn__dot"
                style={{ background: filters[fb.key] ? fb.color : "rgba(255,255,255,0.2)" }}
              />
              {fb.label}
            </button>
          ))}
        </div>

        {/* ---- Tracing Dots + Lines Layer ---- */}
        {tracingMode && tracedPoints.length > 0 && (
          <>
            {/* SVG connecting lines */}
            <svg className="map-trace-lines" viewBox="0 0 100 100" preserveAspectRatio="none">
              <polyline
                points={tracedPoints.map(([x, y]) => `${x},${y}`).join(" ")}
                fill="none"
                stroke="#00e5ff"
                strokeWidth="0.25"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {/* Dots */}
            {tracedPoints.map(([x, y], i) => (
              <div
                key={i}
                className={`map-trace-dot ${i === 0 ? "map-trace-dot--first" : ""} ${i === tracedPoints.length - 1 ? "map-trace-dot--last" : ""}`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <span className="map-trace-dot__index">{i + 1}</span>
              </div>
            ))}
          </>
        )}

        {/* ---- Cursor coordinate readout ---- */}
        {tracingMode && traceCursor && (
          <div
            className="map-trace-cursor"
            style={{ left: traceCursor.px + 14, top: traceCursor.py - 10 }}
          >
            {traceCursor.x}, {traceCursor.y}
          </div>
        )}

        {/* ---- Branding (bottom-right) ---- */}
        <div className="map-branding">
          <div className="map-branding__title">NEON BLOOM</div>
          <div className="map-branding__sub">RC 3BH · MK 5 · AD 3.18</div>
        </div>
      </div>



      {/* ---- Tracing Mode Panel (Hidden for production) ---- */}
      {false && (
        <div className={`map-trace-panel ${tracingMode ? "map-trace-panel--active" : ""}`} onClick={(e) => e.stopPropagation()}>
          <div className="map-trace-panel__header">
            <button
              className={`map-trace-panel__toggle ${tracingMode ? "map-trace-panel__toggle--on" : ""}`}
              onClick={() => {
                setTracingMode((t) => !t);
                if (tracingMode) setTraceCursor(null);
              }}
            >
              <span className="map-trace-panel__toggle-dot" />
              {tracingMode ? "TRACING ON" : "TRACING OFF"}
            </button>
            <span className="map-trace-panel__count">
              {tracedPoints.length} {tracedPoints.length === 1 ? "PT" : "PTS"}
            </span>
          </div>

          {tracingMode && (
            <>
              <pre className="map-trace-panel__output">{traceArrayString}</pre>
              <div className="map-trace-panel__actions">
                <button
                  className="map-trace-panel__btn map-trace-panel__btn--undo"
                  onClick={undoLastPoint}
                  disabled={tracedPoints.length === 0}
                >
                  ↩ UNDO
                </button>
                <button
                  className="map-trace-panel__btn map-trace-panel__btn--copy"
                  onClick={copyTraceToClipboard}
                  disabled={tracedPoints.length === 0}
                >
                  {traceCopied ? "✓ COPIED" : "⎘ COPY"}
                </button>
                <button
                  className="map-trace-panel__btn map-trace-panel__btn--clear"
                  onClick={() => setTracedPoints([])}
                  disabled={tracedPoints.length === 0}
                >
                  ✕ CLEAR
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
