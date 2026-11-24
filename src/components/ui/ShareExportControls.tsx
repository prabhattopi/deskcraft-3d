"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Download, Share2 } from "lucide-react";
import {
  decodeWorkspaceState,
  encodeWorkspaceState,
  exportCanvasSnapshot,
} from "@/lib/workspaceShare";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

const AUTOSAVE_STORAGE_KEY = "deskcraft-3d-autosave-v2";

export function ShareExportControls() {
  const deskFinish = useWorkspaceStore((s) => s.deskFinish);
  const lightingMood = useWorkspaceStore((s) => s.lightingMood);
  const cameraPreset = useWorkspaceStore((s) => s.cameraPreset);
  const gridVisible = useWorkspaceStore((s) => s.gridVisible);
  const items = useWorkspaceStore((s) => s.items);
  const hydrateWorkspace = useWorkspaceStore((s) => s.hydrateWorkspace);

  const [copiedLink, setCopiedLink] = useState(false);
  const [savedSnapshot, setSavedSnapshot] = useState(false);
  const hasHydrated = useRef(false);

  // Hydrate once on mount from ?setup= query param or localStorage autosave
  useEffect(() => {
    if (hasHydrated.current) return;
    hasHydrated.current = true;

    const params = new URLSearchParams(window.location.search);
    const sharedParam = params.get("setup");
    if (sharedParam) {
      const decoded = decodeWorkspaceState(sharedParam);
      if (decoded) {
        hydrateWorkspace(decoded);
        return;
      }
    }

    const localSaved = window.localStorage.getItem(AUTOSAVE_STORAGE_KEY);
    if (localSaved) {
      const decodedLocal = decodeWorkspaceState(localSaved);
      if (decodedLocal) {
        hydrateWorkspace(decodedLocal);
      }
    }
  }, [hydrateWorkspace]);

  // Persist workspace edits automatically to localStorage
  useEffect(() => {
    if (!hasHydrated.current) return;
    const encoded = encodeWorkspaceState({
      deskFinish,
      lightingMood,
      cameraPreset,
      gridVisible,
      items,
    });
    window.localStorage.setItem(AUTOSAVE_STORAGE_KEY, encoded);
  }, [deskFinish, lightingMood, cameraPreset, gridVisible, items]);

  const handleShareLink = async () => {
    const encoded = encodeWorkspaceState({
      deskFinish,
      lightingMood,
      cameraPreset,
      gridVisible,
      items,
    });
    const url = new URL(window.location.href);
    url.searchParams.set("setup", encoded);
    window.history.replaceState({}, "", url.toString());

    try {
      await navigator.clipboard.writeText(url.toString());
    } catch {
      // Clipboard fallback if browser blocks non-HTTPS copy
    }

    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleDownloadSnapshot = async () => {
    const ok = await exportCanvasSnapshot(
      `deskcraft-3d-${lightingMood}-${cameraPreset}.png`
    );
    if (ok) {
      setSavedSnapshot(true);
      setTimeout(() => setSavedSnapshot(false), 2000);
    }
  };

  return (
    <div className="pointer-events-auto flex items-center gap-1.5 rounded-2xl border border-white/10 bg-zinc-950/75 px-2.5 py-2 shadow-xl backdrop-blur-md">
      <button
        onClick={handleDownloadSnapshot}
        title="Export High-Res 3D Studio PNG Snapshot"
        className="flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/15 hover:text-white"
      >
        {savedSnapshot ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-emerald-300">Saved PNG</span>
          </>
        ) : (
          <>
            <Download className="h-3.5 w-3.5 text-emerald-400" />
            <span>Snapshot</span>
          </>
        )}
      </button>

      <button
        onClick={handleShareLink}
        title="Encode 3D Setup into Shareable URL & Copy"
        className="flex items-center gap-1.5 rounded-xl bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-200 ring-1 ring-emerald-400/40 transition hover:bg-emerald-500/30"
      >
        {copiedLink ? (
          <>
            <Check className="h-3.5 w-3.5 text-emerald-300" />
            <span>Link Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="h-3.5 w-3.5" />
            <span>Share Setup</span>
          </>
        )}
      </button>
    </div>
  );
}