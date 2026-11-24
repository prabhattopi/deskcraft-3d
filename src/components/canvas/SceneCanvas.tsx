"use client";

import { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { RoomEnvironment } from "./RoomEnvironment";
import { DeskAssembly } from "./DeskAssembly";
import { DeskItemsLayer } from "./DeskItemsLayer";
import { CameraRig } from "./CameraRig";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { LightingMood } from "@/types/workspace";

const SKY_BACKDROP: Record<LightingMood, string> = {
  daylight: "#0b0d12",
  sunset: "#140c14",
  cyberpunk: "#060814",
};

export function SceneCanvas() {
  const selectItem = useWorkspaceStore((s) => s.selectItem);
  const lightingMood = useWorkspaceStore((s) => s.lightingMood);
  const bgHex = SKY_BACKDROP[lightingMood];

  return (
    <div className="relative h-full w-full">
      <Canvas
        shadows={{ type: THREE.PCFShadowMap }}
        dpr={[1, 2]}
        camera={{ position: [2.15, 1.85, 2.25], fov: 42, near: 0.1, far: 50 }}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        onPointerMissed={() => selectItem(null)}
      >
        <color attach="background" args={[bgHex]} />
        <fog attach="fog" args={[bgHex, 6.5, 14]} />

        <Suspense fallback={null}>
          <RoomEnvironment />
          <DeskAssembly />
          <DeskItemsLayer />
        </Suspense>

        <CameraRig />
      </Canvas>
    </div>
  );
}