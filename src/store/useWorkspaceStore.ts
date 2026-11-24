import { create } from "zustand";
import { ShareableWorkspacePayload } from "@/lib/workspaceShare";
import {
  CameraPreset,
  DESK_DIMENSIONS,
  DESK_SURFACE_Y,
  DeskFinish,
  DeskItem,
  DeskItemType,
  ITEM_CATALOG,
  LightingMood,
} from "@/types/workspace";

const STARTER_ITEMS: DeskItem[] = [
  {
    id: "starter-monitor",
    type: "monitor",
    label: 'Ultrawide 34"',
    position: [0, DESK_SURFACE_Y, -0.24],
    rotationY: 0,
    color: "#18181b",
  },
  {
    id: "starter-keyboard",
    type: "keyboard",
    label: "Mech 75%",
    position: [-0.08, DESK_SURFACE_Y, 0.16],
    rotationY: 0,
    color: "#3f3f46",
  },
  {
    id: "starter-mouse",
    type: "mouse",
    label: "Pro Mouse",
    position: [0.32, DESK_SURFACE_Y, 0.16],
    rotationY: 0,
    color: "#f4f4f5",
  },
  {
    id: "starter-lamp",
    type: "lamp",
    label: "Desk Lamp",
    position: [-0.72, DESK_SURFACE_Y, -0.24],
    rotationY: 0.45,
    color: "#f59e0b",
  },
  {
    id: "starter-plant",
    type: "plant",
    label: "Monstera Pot",
    position: [0.76, DESK_SURFACE_Y, -0.22],
    rotationY: 0.3,
    color: "#ea580c",
  },
  {
    id: "starter-mug",
    type: "mug",
    label: "Coffee Mug",
    position: [0.56, DESK_SURFACE_Y, 0.16],
    rotationY: -0.4,
    color: "#10b981",
  },
];

function clampToDesk(x: number, z: number, snap: boolean): [number, number] {
  const maxX = DESK_DIMENSIONS.WIDTH / 2 - 0.16;
  const maxZ = DESK_DIMENSIONS.DEPTH / 2 - 0.14;
  const step = DESK_DIMENSIONS.GRID_STEP;

  let nextX = Math.max(-maxX, Math.min(maxX, x));
  let nextZ = Math.max(-maxZ, Math.min(maxZ, z));

  if (snap) {
    nextX = Math.round(nextX / step) * step;
    nextZ = Math.round(nextZ / step) * step;
  }

  return [Number(nextX.toFixed(3)), Number(nextZ.toFixed(3))];
}

interface WorkspaceState {
  deskFinish: DeskFinish;
  lightingMood: LightingMood;
  cameraPreset: CameraPreset;
  gridVisible: boolean;
  items: DeskItem[];
  selectedItemId: string | null;
  isDraggingItem: boolean;

  setDeskFinish: (finish: DeskFinish) => void;
  setLightingMood: (mood: LightingMood) => void;
  setCameraPreset: (preset: CameraPreset) => void;
  toggleGrid: () => void;
  selectItem: (id: string | null) => void;
  setIsDraggingItem: (dragging: boolean) => void;
  setItems: (items: DeskItem[]) => void;
  hydrateWorkspace: (payload: ShareableWorkspacePayload) => void;

  addItem: (type: DeskItemType) => void;
  moveItem: (id: string, x: number, z: number) => void;
  rotateItem: (id: string, deltaRadians: number) => void;
  updateItemColor: (id: string, color: string) => void;
  duplicateItem: (id: string) => void;
  removeItem: (id: string) => void;
  resetWorkspace: () => void;
  clearWorkspace: () => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  deskFinish: "oak",
  lightingMood: "daylight",
  cameraPreset: "hero",
  gridVisible: true,
  items: STARTER_ITEMS,
  selectedItemId: null,
  isDraggingItem: false,

  setDeskFinish: (deskFinish) => set({ deskFinish }),
  setLightingMood: (lightingMood) => set({ lightingMood }),
  setCameraPreset: (cameraPreset) => set({ cameraPreset }),
  toggleGrid: () => set((state) => ({ gridVisible: !state.gridVisible })),
  selectItem: (selectedItemId) => set({ selectedItemId }),
  setIsDraggingItem: (isDraggingItem) => set({ isDraggingItem }),
  setItems: (items) => set({ items }),

    hydrateWorkspace: (payload) =>
    set({
      deskFinish: payload.deskFinish,
      lightingMood: payload.lightingMood,
      cameraPreset: payload.cameraPreset,
      gridVisible: payload.gridVisible,
      items: payload.items,
      selectedItemId: null,
    }),

  addItem: (type) => {
    const meta = ITEM_CATALOG.find((item) => item.type === type);
    if (!meta) return;

    const count = get().items.length;
    const offset = ((count % 5) - 2) * 0.16;
    const [x, z] = clampToDesk(offset, 0.08, get().gridVisible);

    const newItem: DeskItem = {
      id: `${type}-${Date.now().toString(36)}`,
      type,
      label: meta.label,
      position: [x, DESK_SURFACE_Y, z],
      rotationY: 0,
      color: meta.defaultColor,
    };

    set((state) => ({
      items: [...state.items, newItem],
      selectedItemId: newItem.id,
    }));
  },

  moveItem: (id, rawX, rawZ) => {
    const snap = get().gridVisible;
    const [x, z] = clampToDesk(rawX, rawZ, snap);
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, position: [x, DESK_SURFACE_Y, z] }
          : item
      ),
    }));
  },

  rotateItem: (id, deltaRadians) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, rotationY: item.rotationY + deltaRadians }
          : item
      ),
    })),

  updateItemColor: (id, color) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, color } : item
      ),
    })),

  duplicateItem: (id) => {
    const source = get().items.find((i) => i.id === id);
    if (!source) return;
    const [x, z] = clampToDesk(
      source.position[0] + 0.16,
      source.position[2] + 0.12,
      get().gridVisible
    );
    const copy: DeskItem = {
      ...source,
      id: `${source.type}-${Date.now().toString(36)}`,
      position: [x, DESK_SURFACE_Y, z],
    };
    set((state) => ({
      items: [...state.items, copy],
      selectedItemId: copy.id,
    }));
  },

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
      selectedItemId: state.selectedItemId === id ? null : state.selectedItemId,
    })),

  resetWorkspace: () =>
    set({
      items: STARTER_ITEMS,
      selectedItemId: null,
      deskFinish: "oak",
      lightingMood: "daylight",
    }),

  clearWorkspace: () =>
    set({
      items: [],
      selectedItemId: null,
    }),
}));