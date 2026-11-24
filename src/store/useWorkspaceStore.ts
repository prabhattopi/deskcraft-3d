import { create } from "zustand";
import {
  CameraPreset,
  DeskFinish,
  DeskItem,
  LightingMood,
} from "@/types/workspace";

interface WorkspaceState {
  deskFinish: DeskFinish;
  lightingMood: LightingMood;
  cameraPreset: CameraPreset;
  gridVisible: boolean;
  items: DeskItem[];
  selectedItemId: string | null;

  setDeskFinish: (finish: DeskFinish) => void;
  setLightingMood: (mood: LightingMood) => void;
  setCameraPreset: (preset: CameraPreset) => void;
  toggleGrid: () => void;
  selectItem: (id: string | null) => void;
  setItems: (items: DeskItem[]) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
  deskFinish: "oak",
  lightingMood: "daylight",
  cameraPreset: "hero",
  gridVisible: true,
  items: [],
  selectedItemId: null,

  setDeskFinish: (deskFinish) => set({ deskFinish }),
  setLightingMood: (lightingMood) => set({ lightingMood }),
  setCameraPreset: (cameraPreset) => set({ cameraPreset }),
  toggleGrid: () => set((state) => ({ gridVisible: !state.gridVisible })),
  selectItem: (selectedItemId) => set({ selectedItemId }),
  setItems: (items) => set({ items }),
}));