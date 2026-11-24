"use client";

import {
  Camera,
  Eye,
  Flame,
  LayoutGrid,
  Sun,
  Zap,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { CameraPreset, LightingMood } from "@/types/workspace";

const MOOD_ITEMS: {
  key: LightingMood;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  activeClass: string;
}[] = [
  {
    key: "daylight",
    label: "Daylight",
    icon: Sun,
    activeClass: "bg-amber-400/20 text-amber-200 ring-1 ring-amber-400/50",
  },
  {
    key: "sunset",
    label: "Sunset",
    icon: Flame,
    activeClass: "bg-orange-500/20 text-orange-200 ring-1 ring-orange-400/50",
  },
  {
    key: "cyberpunk",
    label: "Cyberpunk",
    icon: Zap,
    activeClass: "bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-400/50",
  },
];

const CAMERA_ITEMS: {
  key: CameraPreset;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}[] = [
  { key: "hero", label: "Hero", icon: Camera },
  { key: "top", label: "Top Grid", icon: LayoutGrid },
  { key: "closeup", label: "Close-Up", icon: Eye },
];

export function StudioToolbar() {
  const lightingMood = useWorkspaceStore((s) => s.lightingMood);
  const setLightingMood = useWorkspaceStore((s) => s.setLightingMood);
  const cameraPreset = useWorkspaceStore((s) => s.cameraPreset);
  const setCameraPreset = useWorkspaceStore((s) => s.setCameraPreset);

  return (
    <div className="pointer-events-none fixed left-4 top-20 z-20 flex flex-col gap-2 sm:left-6">
      {/* Lighting Mood Switcher */}
      <div className="pointer-events-auto flex flex-col gap-1 rounded-2xl border border-white/10 bg-zinc-950/80 p-2 shadow-xl backdrop-blur-md">
        <span className="px-2 pt-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Lighting Mood
        </span>
        <div className="flex items-center gap-1">
          {MOOD_ITEMS.map(({ key, label, icon: Icon, activeClass }) => {
            const active = lightingMood === key;
            return (
              <button
                key={key}
                onClick={() => setLightingMood(key)}
                className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium transition ${
                  active
                    ? activeClass
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Camera View Presets */}
      <div className="pointer-events-auto flex flex-col gap-1 rounded-2xl border border-white/10 bg-zinc-950/80 p-2 shadow-xl backdrop-blur-md">
        <span className="px-2 pt-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          Camera Angle
        </span>
        <div className="flex items-center gap-1">
          {CAMERA_ITEMS.map(({ key, label, icon: Icon }) => {
            const active = cameraPreset === key;
            return (
              <button
                key={key}
                onClick={() => setCameraPreset(key)}
                className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/50"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}