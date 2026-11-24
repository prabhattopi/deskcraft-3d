"use client";

import { ComponentRef, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { CameraPreset } from "@/types/workspace";

const CAMERA_VIEWS: Record<
  CameraPreset,
  { pos: [number, number, number]; target: [number, number, number] }
> = {
  hero: {
    pos: [2.15, 1.85, 2.25],
    target: [0, 0.82, -0.45],
  },
  top: {
    pos: [0.01, 2.85, 0.15],
    target: [0, 0.76, -0.52],
  },
  closeup: {
    pos: [0.95, 1.32, 0.88],
    target: [0, 0.86, -0.55],
  },
};

export function CameraRig() {
  const controlsRef = useRef<ComponentRef<typeof OrbitControls>>(null);
  const cameraPreset = useWorkspaceStore((s) => s.cameraPreset);
  const isDraggingItem = useWorkspaceStore((s) => s.isDraggingItem);

  const isTransitioning = useRef(false);
  const desiredPos = useRef(new THREE.Vector3(...CAMERA_VIEWS.hero.pos));
  const desiredTarget = useRef(new THREE.Vector3(...CAMERA_VIEWS.hero.target));

  const { camera } = useThree();

  useEffect(() => {
    const view = CAMERA_VIEWS[cameraPreset];
    desiredPos.current.set(...view.pos);
    desiredTarget.current.set(...view.target);
    isTransitioning.current = true;
  }, [cameraPreset]);

  useFrame((_state, delta) => {
    if (!isTransitioning.current || !controlsRef.current) return;

    const alpha = Math.min(1, delta * 5.5);
    camera.position.lerp(desiredPos.current, alpha);
    controlsRef.current.target.lerp(desiredTarget.current, alpha);
    controlsRef.current.update();

    if (
      camera.position.distanceTo(desiredPos.current) < 0.015 &&
      controlsRef.current.target.distanceTo(desiredTarget.current) < 0.015
    ) {
      isTransitioning.current = false;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enabled={!isDraggingItem}
      enableDamping
      dampingFactor={0.06}
      target={[0, 0.82, -0.45]}
      minDistance={1.05}
      maxDistance={5.2}
      minPolarAngle={0.08}
      maxPolarAngle={Math.PI / 2 - 0.04}
      onStart={() => {
        isTransitioning.current = false;
      }}
    />
  );
}