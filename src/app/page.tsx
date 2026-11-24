"use client";

import { Grid3X3, Sparkles } from "lucide-react";
import { SceneCanvas } from "@/components/canvas/SceneCanvas";
import { ItemDock } from "@/components/ui/ItemDock";
import { ItemInspector } from "@/components/ui/ItemInspector";
import { StudioToolbar } from "@/components/ui/StudioToolbar";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { DESK_FINISH_PALETTE, DeskFinish } from "@/types/workspace";

const FINISH_OPTIONS: DeskFinish[] = ["oak", "walnut", "birch", "obsidian"];

export default function HomePage() {
  const deskFinish = useWorkspaceStore((s) => s.deskFinish);
  const setDeskFinish = useWorkspaceStore((s) => s.setDeskFinish);
  const gridVisible = useWorkspaceStore((s) => s.gridVisible);
  const toggleGrid = useWorkspaceStore((s) => s.toggleGrid);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0b0d12]">
      {/* Full-Viewport 3D Configurator Canvas */}
      <SceneCanvas />

      {/* Top Glassmorphic Studio Bar */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-20 flex flex-wrap items-center justify-between gap-3 p-4 sm:px-6">
        <div className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/75 px-4 py-2.5 shadow-xl backdrop-blur-md">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h1 className="text-sm font-semibold tracking-tight text-white">
              DeskCraft 3D
            </h1>
            <p className="text-[11px] text-zinc-400">
              Click & drag props on desk • Orbit around room
            </p>
          </div>
        </div>

        {/* Desk Surface Finish & Snap Grid Controls */}
        <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border border-white/10 bg-zinc-950/75 px-3 py-2 shadow-xl backdrop-blur-md">
          <span className="hidden px-1.5 text-xs font-medium text-zinc-400 sm:inline">
            Desk Finish:
          </span>
          {FINISH_OPTIONS.map((finishKey) => {
            const finish = DESK_FINISH_PALETTE[finishKey];
            const isActive = deskFinish === finishKey;
            return (
              <button
                key={finishKey}
                onClick={() => setDeskFinish(finishKey)}
                title={finish.name}
                className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium transition ${
                  isActive
                    ? "bg-white/15 text-white ring-1 ring-emerald-400/60"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                }`}
              >
                <span
                  className="h-3 w-3 rounded-full border border-white/25"
                  style={{ backgroundColor: finish.wood }}
                />
                <span className="hidden md:inline">{finish.name}</span>
              </button>
            );
          })}

          <div className="mx-1 h-4 w-px bg-white/10" />

          <button
            onClick={toggleGrid}
            title="Toggle Snap Alignment Grid"
            className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium transition ${
              gridVisible
                ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/40"
                : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
            }`}
          >
            <Grid3X3 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Grid</span>
          </button>
        </div>
      </header>

      {/* Left Floating Lighting & Camera Studio Toolbar */}
      <StudioToolbar />

      {/* Right Floating Inspector for Selected 3D Prop */}
      <ItemInspector />

      {/* Bottom Dock to Spawn / Reset / Clear 3D Props */}
      <ItemDock />
    </main>
  );
}