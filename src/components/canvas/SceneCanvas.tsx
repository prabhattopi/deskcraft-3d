"use client";

import { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { RoomEnvironment } from "./RoomEnvironment";
import { DeskAssembly } from "./DeskAssembly";
import { DeskItemsLayer } from "./DeskItemsLayer";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";

export function SceneCanvas() {
  const selectItem = useWorkspaceStore((s) => s.selectItem);
  const isDraggingItem = useWorkspaceStore((s) => s.isDraggingItem);

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
        <color attach="background" args={["#0b0d12"]} />
        <fog attach="fog" args={["#0b0d12", 6.5, 14]} />

        <Suspense fallback={null}>
          <RoomEnvironment />
          <DeskAssembly />
          <DeskItemsLayer />
        </Suspense>

        <OrbitControls
          makeDefault
          enabled={!isDraggingItem}
          enableDamping
          dampingFactor={0.06}
          target={[0, 0.82, -0.45]}
          minDistance={1.25}
          maxDistance={5.2}
          minPolarAngle={0.2}
          maxPolarAngle={Math.PI / 2 - 0.04}
        />
      </Canvas>
    </div>
  );
}