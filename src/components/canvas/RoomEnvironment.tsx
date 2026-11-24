"use client";

import { ContactShadows, Environment, Lightformer } from "@react-three/drei";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import { LightingMood } from "@/types/workspace";

interface MoodLightingSpec {
  ambientColor: string;
  ambientIntensity: number;
  keyColor: string;
  keyIntensity: number;
  keyPosition: [number, number, number];
  rimColor: string;
  rimIntensity: number;
  windowColor: string;
  windowEmissive: string;
  windowIntensity: number;
  topLightformer: string;
  sideLightformer: string;
  pointGlowColor: string;
  pointGlowIntensity: number;
}

const MOOD_SPECS: Record<LightingMood, MoodLightingSpec> = {
  daylight: {
    ambientColor: "#f8fafc",
    ambientIntensity: 0.48,
    keyColor: "#fffbeb",
    keyIntensity: 1.6,
    keyPosition: [3.5, 5.5, 3.2],
    rimColor: "#93c5fd",
    rimIntensity: 0.45,
    windowColor: "#fef3c7",
    windowEmissive: "#fde68a",
    windowIntensity: 0.65,
    topLightformer: "#fff7ed",
    sideLightformer: "#bae6fd",
    pointGlowColor: "#fef3c7",
    pointGlowIntensity: 0.15,
  },
  sunset: {
    ambientColor: "#fed7aa",
    ambientIntensity: 0.36,
    keyColor: "#fb923c",
    keyIntensity: 1.75,
    keyPosition: [-3.8, 3.2, 2.6],
    rimColor: "#c084fc",
    rimIntensity: 0.65,
    windowColor: "#fdba74",
    windowEmissive: "#f97316",
    windowIntensity: 1.15,
    topLightformer: "#fed7aa",
    sideLightformer: "#f472b6",
    pointGlowColor: "#fb923c",
    pointGlowIntensity: 0.55,
  },
  cyberpunk: {
    ambientColor: "#1e1b4b",
    ambientIntensity: 0.34,
    keyColor: "#38bdf8",
    keyIntensity: 1.25,
    keyPosition: [2.8, 4.8, 2.5],
    rimColor: "#e879f9",
    rimIntensity: 1.15,
    windowColor: "#312e81",
    windowEmissive: "#6366f1",
    windowIntensity: 0.85,
    topLightformer: "#38bdf8",
    sideLightformer: "#e879f9",
    pointGlowColor: "#34d399",
    pointGlowIntensity: 0.9,
  },
};

export function RoomEnvironment() {
  const lightingMood = useWorkspaceStore((s) => s.lightingMood);
  const spec = MOOD_SPECS[lightingMood];

  return (
    <group name="room-diorama">
      {/* Procedural HDR Environment Reflections (100% offline GPU-generated) */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={2.0}
          color={spec.topLightformer}
          position={[0, 4.5, 2]}
          scale={[6, 3, 1]}
          rotation={[Math.PI / 3, 0, 0]}
        />
        <Lightformer
          form="rect"
          intensity={1.1}
          color={spec.sideLightformer}
          position={[-4, 2.5, 0]}
          scale={[4, 3, 1]}
          rotation={[0, Math.PI / 2, 0]}
        />
        <Lightformer
          form="rect"
          intensity={0.9}
          color="#ddd6fe"
          position={[4, 2, -2]}
          scale={[4, 3, 1]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      </Environment>

      {/* Dynamic Mood Lighting */}
      <ambientLight color={spec.ambientColor} intensity={spec.ambientIntensity} />
      <directionalLight
        position={spec.keyPosition}
        intensity={spec.keyIntensity}
        color={spec.keyColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={15}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
        shadow-bias={-0.0004}
      />
      <directionalLight
        position={[-3, 2.5, -2]}
        intensity={spec.rimIntensity}
        color={spec.rimColor}
      />

      {/* Ambient Desk Back-Wall Glow Light */}
      <pointLight
        position={[0, 1.05, -1.25]}
        color={spec.pointGlowColor}
        intensity={spec.pointGlowIntensity}
        distance={3.2}
      />

      {/* Room Floor Slab */}
      <mesh position={[0, -0.04, 0]} receiveShadow>
        <boxGeometry args={[4.4, 0.08, 3.8]} />
        <meshStandardMaterial color="#181b22" roughness={0.85} metalness={0.05} />
      </mesh>

      {/* Cozy Woven Area Rug under Desk */}
      <mesh position={[0, 0.003, 0.12]} receiveShadow>
        <boxGeometry args={[2.9, 0.006, 1.85]} />
        <meshStandardMaterial color="#272b36" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.004, 0.12]} receiveShadow>
        <boxGeometry args={[2.76, 0.006, 1.71]} />
        <meshStandardMaterial color="#313644" roughness={0.95} />
      </mesh>

      {/* Back Architectural Wall */}
      <mesh position={[0, 1.35, -1.86]} receiveShadow>
        <boxGeometry args={[4.4, 2.7, 0.08]} />
        <meshStandardMaterial color="#1f2430" roughness={0.9} />
      </mesh>

      {/* Left Architectural Wall */}
      <mesh position={[-2.16, 1.35, 0]} receiveShadow>
        <boxGeometry args={[0.08, 2.7, 3.8]} />
        <meshStandardMaterial color="#1b202b" roughness={0.9} />
      </mesh>

      {/* Floor Baseboard Trim */}
      <mesh position={[0, 0.05, -1.81]} receiveShadow>
        <boxGeometry args={[4.32, 0.1, 0.02]} />
        <meshStandardMaterial color="#2e3444" roughness={0.7} />
      </mesh>
      <mesh position={[-2.11, 0.05, 0.04]} receiveShadow>
        <boxGeometry args={[0.02, 0.1, 3.72]} />
        <meshStandardMaterial color="#2e3444" roughness={0.7} />
      </mesh>

      {/* Architectural Window on Left Wall */}
      <group position={[-2.11, 1.55, -0.15]}>
        <mesh>
          <boxGeometry args={[0.04, 1.25, 1.45]} />
          <meshStandardMaterial color="#111318" roughness={0.5} />
        </mesh>
        <mesh position={[0.015, 0, 0]}>
          <boxGeometry args={[0.02, 1.13, 1.33]} />
          <meshStandardMaterial
            color={spec.windowColor}
            emissive={spec.windowEmissive}
            emissiveIntensity={spec.windowIntensity}
            roughness={0.2}
          />
        </mesh>
        <mesh position={[0.025, 0, 0]}>
          <boxGeometry args={[0.02, 1.15, 0.035]} />
          <meshStandardMaterial color="#111318" roughness={0.5} />
        </mesh>
        <mesh position={[0.025, 0.08, 0]}>
          <boxGeometry args={[0.02, 0.035, 1.35]} />
          <meshStandardMaterial color="#111318" roughness={0.5} />
        </mesh>
      </group>

      {/* Grounded Floor Contact Shadows */}
      <ContactShadows
        position={[0, 0.008, 0]}
        opacity={0.55}
        scale={6.5}
        blur={2.1}
        far={2.8}
        color="#050608"
      />
    </group>
  );
}