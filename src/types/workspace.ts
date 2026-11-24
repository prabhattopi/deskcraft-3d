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

export const DESK_DIMENSIONS = {
  WIDTH: 2.4,
  DEPTH: 1.1,
  THICKNESS: 0.06,
  TOP_Y: 0.76,
  MAT_WIDTH: 0.92,
  MAT_DEPTH: 0.42,
  MAT_THICKNESS: 0.004,
  GRID_STEP: 0.08,
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