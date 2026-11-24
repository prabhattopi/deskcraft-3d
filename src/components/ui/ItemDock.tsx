"use client";

import {
  BookOpen,
  Coffee,
  Flower2,
  Keyboard,
  LampDesk,
  Monitor,
  Mouse,
  RotateCcw,
  Speaker,
  Trash2,
} from "lucide-react";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { DeskItemType, ITEM_CATALOG } from "@/types/workspace";

const ICON_MAP: Record<DeskItemType, React.ComponentType<{ className?: string }>> = {
  monitor: Monitor,
  keyboard: Keyboard,
  mouse: Mouse,
  lamp: LampDesk,
  speaker: Speaker,
  plant: Flower2,
  mug: Coffee,
  notebook: BookOpen,
};

export function ItemDock() {
  const addItem = useWorkspaceStore((s) => s.addItem);
  const resetWorkspace = useWorkspaceStore((s) => s.resetWorkspace);
  const clearWorkspace = useWorkspaceStore((s) => s.clearWorkspace);
  const itemCount = useWorkspaceStore((s) => s.items.length);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-20 flex justify-center px-4">
      <div className="pointer-events-auto flex max-w-full items-center gap-1.5 overflow-x-auto rounded-2xl border border-white/10 bg-zinc-950/85 px-3 py-2 shadow-2xl backdrop-blur-md">
        {ITEM_CATALOG.map((item) => {
          const Icon = ICON_MAP[item.type];
          return (
            <button
              key={item.type}
              onClick={() => addItem(item.type)}
              title={`Add ${item.label}`}
              className="group flex shrink-0 flex-col items-center gap-1 rounded-xl px-2.5 py-1.5 text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5 text-emerald-400 transition group-hover:bg-emerald-500/20">
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-[10px] font-medium tracking-tight">
                {item.label}
              </span>
            </button>
          );
        })}

        <div className="mx-1 h-8 w-px shrink-0 bg-white/10" />

        <button
          onClick={resetWorkspace}
          title="Restore Starter Cozy Setup"
          className="flex shrink-0 flex-col items-center gap-1 rounded-xl px-2.5 py-1.5 text-zinc-400 transition hover:bg-white/10 hover:text-zinc-100"
        >
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5">
            <RotateCcw className="h-3.5 w-3.5" />
          </div>
          <span className="text-[10px] font-medium">Reset</span>
        </button>

        {itemCount > 0 && (
          <button
            onClick={clearWorkspace}
            title="Clear All Items from Desk"
            className="flex shrink-0 flex-col items-center gap-1 rounded-xl px-2.5 py-1.5 text-zinc-400 transition hover:bg-red-500/15 hover:text-red-300"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/5">
              <Trash2 className="h-3.5 w-3.5" />
            </div>
            <span className="text-[10px] font-medium">Clear</span>
          </button>
        )}
      </div>
    </div>
  );
}