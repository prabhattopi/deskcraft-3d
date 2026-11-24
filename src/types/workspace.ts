export type DeskFinish = "oak" | "walnut" | "birch" | "obsidian";

export type LightingMood = "daylight" | "sunset" | "cyberpunk";

export type CameraPreset = "hero" | "top" | "closeup";

export type DeskItemType =
  | "monitor"
  | "keyboard"
  | "mouse"
  | "lamp"
  | "speaker"
  | "plant"
  | "mug"
  | "notebook";

export interface DeskItem {
  id: string;
  type: DeskItemType;
  label: string;
  position: [number, number, number];
  rotationY: number; // radians
  color: string;
}

export interface CatalogItemMeta {
  type: DeskItemType;
  label: string;
  defaultColor: string;
  ringRadius: number;
}

export const DESK_DIMENSIONS = {
  WIDTH: 2.4,
  DEPTH: 1.1,
  THICKNESS: 0.06,
  TOP_Y: 0.76,
  MAT_WIDTH: 0.92,
  MAT_DEPTH: 0.42,
  MAT_THICKNESS: 0.004,
  GRID_STEP: 0.08,
  DESK_Z_OFFSET: -0.55,
} as const;

export const DESK_SURFACE_Y =
  DESK_DIMENSIONS.TOP_Y + DESK_DIMENSIONS.MAT_THICKNESS;

export const DESK_FINISH_PALETTE: Record<
  DeskFinish,
  { name: string; wood: string; edge: string; mat: string; leg: string }
> = {
  oak: {
    name: "Warm Oak",
    wood: "#c68b59",
    edge: "#a97142",
    mat: "#27272a",
    leg: "#18181b",
  },
  walnut: {
    name: "Dark Walnut",
    wood: "#5c3a21",
    edge: "#462b18",
    mat: "#1e293b",
    leg: "#09090b",
  },
  birch: {
    name: "Nordic Birch",
    wood: "#e6ccb2",
    edge: "#d4b496",
    mat: "#3f3f46",
    leg: "#e4e4e7",
  },
  obsidian: {
    name: "Matte Carbon",
    wood: "#262932",
    edge: "#1b1d24",
    mat: "#111827",
    leg: "#10b981",
  },
};

export const ITEM_CATALOG: CatalogItemMeta[] = [
  { type: "monitor", label: "Ultrawide 34\"", defaultColor: "#18181b", ringRadius: 0.28 },
  { type: "keyboard", label: "Mech 75%", defaultColor: "#3f3f46", ringRadius: 0.22 },
  { type: "mouse", label: "Pro Mouse", defaultColor: "#f4f4f5", ringRadius: 0.09 },
  { type: "lamp", label: "Desk Lamp", defaultColor: "#f59e0b", ringRadius: 0.13 },
  { type: "speaker", label: "Studio Monitor", defaultColor: "#27272a", ringRadius: 0.13 },
  { type: "plant", label: "Monstera Pot", defaultColor: "#d97706", ringRadius: 0.12 },
  { type: "mug", label: "Coffee Mug", defaultColor: "#10b981", ringRadius: 0.08 },
  { type: "notebook", label: "Dot Journal", defaultColor: "#3b82f6", ringRadius: 0.14 },
];

export const ITEM_COLOR_SWATCHES = [
  { name: "Obsidian", hex: "#18181b" },
  { name: "Arctic", hex: "#f4f4f5" },
  { name: "Emerald", hex: "#10b981" },
  { name: "Amber", hex: "#f59e0b" },
  { name: "Terracotta", hex: "#ea580c" },
  { name: "Cobalt", hex: "#3b82f6" },
] as const;