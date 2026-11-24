"use client";

import { useEffect, useState } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { useWorkspaceStore } from "@/store/useWorkspaceStore";
import {
  DESK_DIMENSIONS,
  DESK_SURFACE_Y,
  ITEM_CATALOG,
} from "@/types/workspace";
import { DeskPropModel } from "./DeskPropModel";

export function DeskItemsLayer() {
  const items = useWorkspaceStore((s) => s.items);
  const selectedItemId = useWorkspaceStore((s) => s.selectedItemId);
  const selectItem = useWorkspaceStore((s) => s.selectItem);
  const moveItem = useWorkspaceStore((s) => s.moveItem);
  const rotateItem = useWorkspaceStore((s) => s.rotateItem);
  const removeItem = useWorkspaceStore((s) => s.removeItem);
  const setIsDraggingItem = useWorkspaceStore((s) => s.setIsDraggingItem);

  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Update cursor feedback on hover/drag
  useEffect(() => {
    if (draggingId) {
      document.body.style.cursor = "grabbing";
    } else if (hoveredId) {
      document.body.style.cursor = "grab";
    } else {
      document.body.style.cursor = "auto";
    }
    return () => {
      document.body.style.cursor = "auto";
    };
  }, [draggingId, hoveredId]);

  // Keyboard shortcuts for selected item: Q/E rotate, Delete/Backspace remove, Escape deselect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItemId) return;
      if (e.key === "e" || e.key === "E" || e.key === "r" || e.key === "R") {
        rotateItem(selectedItemId, Math.PI / 4);
      } else if (e.key === "q" || e.key === "Q") {
        rotateItem(selectedItemId, -Math.PI / 4);
      } else if (e.key === "Delete" || e.key === "Backspace") {
        removeItem(selectedItemId);
      } else if (e.key === "Escape") {
        selectItem(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItemId, rotateItem, removeItem, selectItem]);

  // Global pointer-up safety net so OrbitControls always unlock
  useEffect(() => {
    const handleGlobalUp = () => {
      if (draggingId) {
        setDraggingId(null);
        setIsDraggingItem(false);
      }
    };
    window.addEventListener("pointerup", handleGlobalUp);
    return () => window.removeEventListener("pointerup", handleGlobalUp);
  }, [draggingId, setIsDraggingItem]);

  const handlePlaneMove = (e: ThreeEvent<PointerEvent>) => {
    if (!draggingId) return;
    e.stopPropagation();
    // Convert world hit point to desk-local [x, z]
    const localX = e.point.x;
    const localZ = e.point.z - DESK_DIMENSIONS.DESK_Z_OFFSET;
    moveItem(draggingId, localX, localZ);
  };

  return (
    <group name="desk-items-layer" position={[0, 0, DESK_DIMENSIONS.DESK_Z_OFFSET]}>
      {/* Invisible Wide Raycast Plane Active Only During Drag */}
      {draggingId && (
        <mesh
          position={[0, DESK_SURFACE_Y + 0.002, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          onPointerMove={handlePlaneMove}
          onPointerUp={(e) => {
            e.stopPropagation();
            setDraggingId(null);
            setIsDraggingItem(false);
          }}
        >
          <planeGeometry args={[6, 6]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      )}

      {items.map((item) => {
        const isSelected = item.id === selectedItemId;
        const isHovered = item.id === hoveredId;
        const meta = ITEM_CATALOG.find((m) => m.type === item.type);
        const ringRadius = meta?.ringRadius ?? 0.16;

        return (
          <group
            key={item.id}
            position={item.position}
            rotation={[0, item.rotationY, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredId(item.id);
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              if (hoveredId === item.id) setHoveredId(null);
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
              selectItem(item.id);
              setDraggingId(item.id);
              setIsDraggingItem(true);
            }}
          >
            <DeskPropModel type={item.type} color={item.color} />

            {/* Tactile Selection / Hover Ring on Desk Surface */}
            {(isSelected || isHovered) && (
              <mesh
                position={[0, 0.002, 0]}
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <ringGeometry args={[ringRadius - 0.012, ringRadius, 36]} />
                <meshBasicMaterial
                  color={isSelected ? "#34d399" : "#94a3b8"}
                  transparent
                  opacity={isSelected ? 0.9 : 0.45}
                />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}