import LZString from "lz-string";
import {
  CameraPreset,
  DESK_FINISH_PALETTE,
  DESK_SURFACE_Y,
  DeskFinish,
  DeskItem,
  DeskItemType,
  ITEM_CATALOG,
  LightingMood,
} from "@/types/workspace";

export interface ShareableWorkspacePayload {
  deskFinish: DeskFinish;
  lightingMood: LightingMood;
  cameraPreset: CameraPreset;
  gridVisible: boolean;
  items: DeskItem[];
}

const VALID_FINISHES = Object.keys(DESK_FINISH_PALETTE) as DeskFinish[];
const VALID_MOODS: LightingMood[] = ["daylight", "sunset", "cyberpunk"];
const VALID_CAMERAS: CameraPreset[] = ["hero", "top", "closeup"];
const VALID_ITEM_TYPES = ITEM_CATALOG.map((item) => item.type);

export function encodeWorkspaceState(
  payload: ShareableWorkspacePayload
): string {
  return LZString.compressToEncodedURIComponent(JSON.stringify(payload));
}

export function decodeWorkspaceState(
  encoded: string
): ShareableWorkspacePayload | null {
  try {
    const rawJson = LZString.decompressFromEncodedURIComponent(encoded);
    if (!rawJson) return null;

    const parsed = JSON.parse(rawJson) as Partial<ShareableWorkspacePayload>;
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !VALID_FINISHES.includes(parsed.deskFinish as DeskFinish) ||
      !VALID_MOODS.includes(parsed.lightingMood as LightingMood) ||
      !Array.isArray(parsed.items)
    ) {
      return null;
    }

    const cameraPreset: CameraPreset = VALID_CAMERAS.includes(
      parsed.cameraPreset as CameraPreset
    )
      ? (parsed.cameraPreset as CameraPreset)
      : "hero";

    const gridVisible: boolean =
      typeof parsed.gridVisible === "boolean" ? parsed.gridVisible : true;

    const sanitizedItems: DeskItem[] = parsed.items
      .filter(
        (item): item is DeskItem =>
          Boolean(item) &&
          typeof item.id === "string" &&
          VALID_ITEM_TYPES.includes(item.type as DeskItemType) &&
          typeof item.label === "string" &&
          Array.isArray(item.position) &&
          item.position.length === 3 &&
          item.position.every((n) => typeof n === "number" && Number.isFinite(n)) &&
          typeof item.rotationY === "number" &&
          Number.isFinite(item.rotationY) &&
          typeof item.color === "string"
      )
      .slice(0, 40)
      .map((item) => ({
        ...item,
        position: [item.position[0], DESK_SURFACE_Y, item.position[2]],
      }));

    return {
      deskFinish: parsed.deskFinish as DeskFinish,
      lightingMood: parsed.lightingMood as LightingMood,
      cameraPreset,
      gridVisible,
      items: sanitizedItems,
    };
  } catch {
    return null;
  }
}

export function exportCanvasSnapshot(
  filename = "deskcraft-3d-workspace.png"
): Promise<boolean> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      const canvas = document.querySelector("canvas");
      if (!canvas) {
        resolve(false);
        return;
      }

      try {
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        resolve(true);
      } catch {
        resolve(false);
      }
    });
  });
}