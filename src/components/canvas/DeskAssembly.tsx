"use client";

import { ContactShadows, Grid, RoundedBox } from "@react-three/drei";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import {
  DESK_DIMENSIONS,
  DESK_FINISH_PALETTE,
  DESK_SURFACE_Y,
  LightingMood,
} from "@/types/workspace";

const LED_MOOD_STYLE: Record<
  LightingMood,
  { color: string; emissive: string; intensity: number }
> = {
  daylight: { color: "#52525b", emissive: "#34d399", intensity: 0.2 },
  sunset: { color: "#fdba74", emissive: "#f97316", intensity: 1.6 },
  cyberpunk: { color: "#67e8f9", emissive: "#10b981", intensity: 2.3 },
};

export function DeskAssembly() {
  const deskFinish = useWorkspaceStore((s) => s.deskFinish);
  const lightingMood = useWorkspaceStore((s) => s.lightingMood);
  const gridVisible = useWorkspaceStore((s) => s.gridVisible);
  const selectItem = useWorkspaceStore((s) => s.selectItem);

  const palette = DESK_FINISH_PALETTE[deskFinish];
  const ledStyle = LED_MOOD_STYLE[lightingMood];

  const {
    WIDTH,
    DEPTH,
    THICKNESS,
    TOP_Y,
    MAT_WIDTH,
    MAT_DEPTH,
    MAT_THICKNESS,
    GRID_STEP,
    DESK_Z_OFFSET,
  } = DESK_DIMENSIONS;

  const tabletopCenterY = TOP_Y - THICKNESS / 2;
  const legHeight = TOP_Y - THICKNESS;
  const legCenterY = legHeight / 2;
  const legXOffset = WIDTH / 2 - 0.24;

  return (
    <group name="desk-assembly" position={[0, 0, DESK_Z_OFFSET]}>
      {/* Main Beveled Wooden Tabletop */}
      <RoundedBox
        args={[WIDTH, THICKNESS, DEPTH]}
        radius={0.015}
        smoothness={4}
        position={[0, tabletopCenterY, 0]}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          selectItem(null);
        }}
      >
        <meshStandardMaterial
          color={palette.wood}
          roughness={0.52}
          metalness={0.06}
        />
      </RoundedBox>

      {/* Rear Desk Edge RGB / Warm LED Light Strip */}
      <mesh position={[0, tabletopCenterY, -DEPTH / 2 - 0.004]}>
        <boxGeometry args={[WIDTH - 0.2, 0.016, 0.008]} />
        <meshStandardMaterial
          color={ledStyle.color}
          emissive={ledStyle.emissive}
          emissiveIntensity={ledStyle.intensity}
          roughness={0.2}
        />
      </mesh>

      {/* Left & Right Industrial T-Frame Legs */}
      {[-legXOffset, legXOffset].map((xPos, idx) => (
        <group key={idx} position={[xPos, 0, 0]}>
          <mesh position={[0, legCenterY, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.065, legHeight, 0.085]} />
            <meshStandardMaterial
              color={palette.leg}
              roughness={0.35}
              metalness={0.75}
            />
          </mesh>
          <mesh position={[0, legHeight - 0.015, 0]} castShadow>
            <boxGeometry args={[0.09, 0.03, DEPTH - 0.26]} />
            <meshStandardMaterial
              color={palette.leg}
              roughness={0.35}
              metalness={0.75}
            />
          </mesh>
          <mesh position={[0, 0.018, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.08, 0.036, DEPTH - 0.18]} />
            <meshStandardMaterial
              color={palette.leg}
              roughness={0.35}
              metalness={0.75}
            />
          </mesh>
        </group>
      ))}

      {/* Structural Steel Crossbar */}
      <mesh position={[0, 0.56, -0.18]} castShadow>
        <boxGeometry args={[legXOffset * 2, 0.04, 0.04]} />
        <meshStandardMaterial
          color={palette.leg}
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* Under-Desk Rear Cable Tray */}
      <mesh position={[0, legHeight - 0.07, -DEPTH / 2 + 0.14]} castShadow>
        <boxGeometry args={[1.35, 0.08, 0.12]} />
        <meshStandardMaterial
          color={palette.leg}
          roughness={0.5}
          metalness={0.6}
        />
      </mesh>

      {/* Large Felt Desk Mat */}
      <RoundedBox
        args={[MAT_WIDTH, MAT_THICKNESS, MAT_DEPTH]}
        radius={0.002}
        smoothness={2}
        position={[0, TOP_Y + MAT_THICKNESS / 2, 0.16]}
        receiveShadow
      >
        <meshStandardMaterial
          color={palette.mat}
          roughness={0.92}
          metalness={0.02}
        />
      </RoundedBox>

      {/* Subtle Snap-to-Grid Alignment Helper on Desk Surface */}
      {gridVisible && (
        <Grid
          position={[0, DESK_SURFACE_Y + 0.001, 0]}
          args={[WIDTH - 0.12, DEPTH - 0.12]}
          cellSize={GRID_STEP}
          cellThickness={0.5}
          cellColor="#ffffff"
          sectionSize={GRID_STEP * 4}
          sectionThickness={0.8}
          sectionColor="#34d399"
          fadeDistance={4.5}
          fadeStrength={1}
          infiniteGrid={false}
        />
      )}

      {/* Desk-Surface Contact Shadows for Placed Props */}
      <ContactShadows
        position={[0, DESK_SURFACE_Y + 0.001, 0]}
        opacity={0.42}
        scale={2.6}
        blur={1.6}
        far={1.2}
        color="#050608"
      />
    </group>
  );
}