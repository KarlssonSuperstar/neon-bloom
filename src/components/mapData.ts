// ============================================================
// MAP DATA — Neon Bloom Interactive Tactical Map
// ============================================================
// Note: The actual map coordinate data (30MB) has been moved to 
// /public/assets/Map/mapData.json and is fetched asynchronously.
// ============================================================

// ----- Types -----

export type Faction = "bloom" | "crown" | "contested" | "neutral";

export type MarkerType =
  | "city"
  | "settlement"
  | "relay-station"
  | "outpost"
  | "harbor"
  | "industrial"
  | "poi"
  | "checkpoint";

export type RouteType =
  | "active-courier"
  | "hidden-courier"
  | "crown-highway"
  | "rail"
  | "canal"
  | "smuggling"
  | "blocked";

export interface MapMarkerData {
  id: string;
  name: string;
  x: number;
  y: number;
  type: MarkerType;
  faction: Faction;
  description: string;
}

export interface MapLabelData {
  id: string;
  text: string;
  x: number;
  y: number;
  faction: Faction;
  size: "lg" | "md" | "sm";
  subtitle?: string;
}

export interface MapRouteData {
  id: string;
  name: string;
  type: RouteType;
  /** Array of [x%, y%] pairs forming the polyline path */
  points: [number, number][];
}

export interface BlockedPointData {
  id: string;
  x: number;
  y: number;
}

export interface MapZoneData {
  id: string;
  name: string;
  faction: Faction;
  /** Array of [x%, y%] points forming the polygon boundary */
  points: [number, number][];
}

// ----- Constants -----

/** Faction → color mapping (CSS values) */
export const FACTION_COLORS: Record<Faction, string> = {
  bloom: "#f98fb9",
  crown: "#ffd60a",
  contested: "#ff6b3d",
  neutral: "#b4c6d8",
};

/** Icon file path per marker type */
export const ICON_MAP: Record<MarkerType, string> = {
  city: "/assets/Map/Icons/City.png",
  settlement: "/assets/Map/Icons/Vilage.png",
  "relay-station": "/assets/Map/Icons/Station.png",
  outpost: "/assets/Map/Icons/Fort.png",
  harbor: "/assets/Map/Icons/Harbor.png",
  industrial: "/assets/Map/Icons/Home.png",
  poi: "", // rendered as inline SVG
  checkpoint: "/assets/Map/Icons/Checkpoint.png",
};

/** Route visual styles */
export const ROUTE_STYLES: Record<
  RouteType,
  { color: string; dash: string; width: number; glow: string }
> = {
  "active-courier": { color: "#00e5ff", dash: "0", width: 2.0, glow: "0 0 6px #00e5ff88" },
  "hidden-courier": { color: "#f98fb9", dash: "8 5", width: 1.5, glow: "0 0 5px #f98fb966" },
  "crown-highway": { color: "#ffd60a", dash: "0", width: 2.0, glow: "0 0 5px #ffd60a66" },
  rail: { color: "#6b7a8d", dash: "4 4", width: 1.2, glow: "none" },
  canal: { color: "#2ec4b6", dash: "6 4", width: 1.2, glow: "0 0 4px #2ec4b644" },
  smuggling: { color: "#ff9f43", dash: "5 5", width: 1.2, glow: "0 0 4px #ff9f4344" },
  blocked: { color: "#ff3b3b", dash: "0", width: 2.0, glow: "0 0 6px #ff3b3b66" },
};

// ============================================================
// DUMMY DATA FOR AI CONTEXT
// The actual 30MB data is fetched at runtime from /assets/Map/mapData.json
// ============================================================

export const MAP_MARKERS: MapMarkerData[] = [];
export const MAP_LABELS: MapLabelData[] = [];
export const MAP_ROUTES: MapRouteData[] = [];
export const BLOCKED_POINTS: BlockedPointData[] = [];
export const MAP_ZONES: MapZoneData[] = [];