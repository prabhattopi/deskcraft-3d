"use client";

import {
  Copy,
  RotateCcw,
  RotateCw,
  Trash2,
  X,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { ITEM_COLOR_SWATCHES } from "@/types/workspace";

export function ItemInspector() {
  const items = useWorkspaceStore((s) => s.items);
  const selectedItemId = useWorkspaceStore((s) => s.selectedItemId);
  const selectItem = useWorkspaceStore((s) => s.selectItem);
  const rotateItem = useWorkspaceStore((s) => s.rotateItem);
  const updateItemColor = useWorkspaceStore((s) => s.updateItemColor);
  const duplicateItem = useWorkspaceStore((s) => s.duplicateItem);
  const removeItem = useWorkspaceStore((s) => s.removeItem);

  const selectedItem = items.find((i) => i.id === selectedItemId);
  if (!selectedItem) return null;

  return (
    <aside className="pointer-events-auto fixed right-4 top-20 z-20 w-64 rounded-2xl border border-white/10 bg-zinc-950/85 p-4 shadow-2xl backdrop-blur-md">
      <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-400">
            Selected Prop
          </span>
          <h2 className="text-sm font-semibold text-white">
            {selectedItem.label}
          </h2>
        </div>
        <button
          onClick={() => selectItem(null)}
          title="Deselect (Esc)"
          className="rounded-lg p-1 text-zinc-400 transition hover:bg-white/10 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Rotation Controls */}
      <div className="mt-3">
        <span className="text-xs font-medium text-zinc-400">
          Rotate (Q / E)
        </span>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <button
            onClick={() => rotateItem(selectedItem.id, -Math.PI / 4)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/10"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>-45°</span>
          </button>
          <button
            onClick={() => rotateItem(selectedItem.id, Math.PI / 4)}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/10"
          >
            <RotateCw className="h-3.5 w-3.5" />
            <span>+45°</span>
          </button>
        </div>
      </div>

      {/* Material Color Swatches */}
      <div className="mt-3.5">
        <span className="text-xs font-medium text-zinc-400">Accent Finish</span>
        <div className="mt-1.5 flex items-center justify-between gap-1.5">
          {ITEM_COLOR_SWATCHES.map((swatch) => {
            const active =
              selectedItem.color.toLowerCase() === swatch.hex.toLowerCase();
            return (
              <button
                key={swatch.hex}
                onClick={() => updateItemColor(selectedItem.id, swatch.hex)}
                title={swatch.name}
                className={`h-6 w-6 rounded-full border transition ${
                  active
                    ? "scale-110 border-white ring-2 ring-emerald-400"
                    : "border-white/25 hover:scale-105"
                }`}
                style={{ backgroundColor: swatch.hex }}
              />
            );
          })}
        </div>
      </div>

      {/* Duplicate & Delete */}
      <div className="mt-4 grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
        <button
          onClick={() => duplicateItem(selectedItem.id)}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/10"
        >
          <Copy className="h-3.5 w-3.5" />
          <span>Duplicate</span>
        </button>
        <button
          onClick={() => removeItem(selectedItem.id)}
          className="flex items-center justify-center gap-1.5 rounded-xl border border-red-500/25 bg-red-500/10 py-1.5 text-xs font-medium text-red-300 transition hover:bg-red-500/20"
        >
          <Trash2 className="h-3.5 w-3.5" />
          <span>Remove</span>
        </button>
      </div>
    </aside>
  );
}