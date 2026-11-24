"use client";

import { RoundedBox } from "@react-three/drei";
import { DeskItemType } from "@/types/workspace";

interface DeskPropModelProps {
  type: DeskItemType;
  color: string;
}

export function DeskPropModel({ type, color }: DeskPropModelProps) {
  switch (type) {
    case "monitor":
      return (
        <group>
          {/* Heavy Weighted Base Plate */}
          <RoundedBox
            args={[0.26, 0.014, 0.16]}
            radius={0.005}
            position={[0, 0.007, 0.02]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color="#27272a" roughness={0.4} metalness={0.7} />
          </RoundedBox>
          {/* Vertical Aluminum Stand Neck */}
          <mesh position={[0, 0.16, -0.03]} castShadow>
            <boxGeometry args={[0.045, 0.3, 0.03]} />
            <meshStandardMaterial color="#3f3f46" roughness={0.35} metalness={0.8} />
          </mesh>
          {/* Ultrawide Chassis */}
          <RoundedBox
            args={[0.78, 0.34, 0.028]}
            radius={0.008}
            position={[0, 0.27, 0.01]}
            castShadow
          >
            <meshStandardMaterial color={color} roughness={0.45} metalness={0.4} />
          </RoundedBox>
          {/* Emissive Display Panel */}
          <mesh position={[0, 0.27, 0.025]}>
            <planeGeometry args={[0.74, 0.3]} />
            <meshStandardMaterial
              color="#0f172a"
              emissive="#1e293b"
              emissiveIntensity={0.8}
              roughness={0.18}
            />
          </mesh>
          {/* Simulated IDE / Code UI Accent Bars on Screen */}
          <mesh position={[-0.22, 0.33, 0.026]}>
            <planeGeometry args={[0.22, 0.018]} />
            <meshStandardMaterial
              color="#34d399"
              emissive="#34d399"
              emissiveIntensity={1.1}
            />
          </mesh>
          <mesh position={[-0.18, 0.29, 0.026]}>
            <planeGeometry args={[0.3, 0.014]} />
            <meshStandardMaterial
              color="#38bdf8"
              emissive="#38bdf8"
              emissiveIntensity={0.95}
            />
          </mesh>
          <mesh position={[-0.2, 0.25, 0.026]}>
            <planeGeometry args={[0.26, 0.014]} />
            <meshStandardMaterial
              color="#a78bfa"
              emissive="#a78bfa"
              emissiveIntensity={0.9}
            />
          </mesh>
          <mesh position={[0.16, 0.27, 0.026]}>
            <planeGeometry args={[0.28, 0.18]} />
            <meshStandardMaterial
              color="#10b981"
              emissive="#059669"
              emissiveIntensity={0.35}
            />
          </mesh>
        </group>
      );

    case "keyboard":
      return (
        <group>
          {/* CNC Aluminum Keyboard Frame */}
          <RoundedBox
            args={[0.36, 0.02, 0.135]}
            radius={0.005}
            position={[0, 0.01, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color={color} roughness={0.4} metalness={0.6} />
          </RoundedBox>
          {/* Keycap Cluster Rows */}
          {[-0.04, -0.013, 0.014, 0.041].map((zOff, idx) => (
            <mesh key={idx} position={[0, 0.023, zOff]} castShadow>
              <boxGeometry args={[0.33, 0.01, 0.02]} />
              <meshStandardMaterial color="#e4e4e7" roughness={0.65} />
            </mesh>
          ))}
          {/* Accent Escape Key */}
          <mesh position={[-0.155, 0.024, -0.04]} castShadow>
            <boxGeometry args={[0.022, 0.011, 0.02]} />
            <meshStandardMaterial color="#10b981" roughness={0.5} />
          </mesh>
        </group>
      );

    case "mouse":
      return (
        <group>
          <RoundedBox
            args={[0.064, 0.026, 0.11]}
            radius={0.012}
            position={[0, 0.013, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color={color} roughness={0.35} metalness={0.15} />
          </RoundedBox>
          {/* Scroll Wheel */}
          <mesh position={[0, 0.026, -0.026]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.006, 0.006, 0.01, 12]} />
            <meshStandardMaterial color="#10b981" roughness={0.4} />
          </mesh>
        </group>
      );

    case "lamp":
      return (
        <group>
          {/* Weighted Base */}
          <mesh position={[0, 0.012, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.085, 0.095, 0.024, 24]} />
            <meshStandardMaterial color={color} roughness={0.35} metalness={0.65} />
          </mesh>
          {/* Lower Arm */}
          <mesh position={[0, 0.16, -0.02]} rotation={[-0.2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.01, 0.012, 0.3, 12]} />
            <meshStandardMaterial color="#27272a" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Upper Arm */}
          <mesh position={[0, 0.34, 0.04]} rotation={[0.55, 0, 0]} castShadow>
            <cylinderGeometry args={[0.009, 0.01, 0.24, 12]} />
            <meshStandardMaterial color="#27272a" roughness={0.4} metalness={0.8} />
          </mesh>
          {/* Lamp Shade */}
          <mesh position={[0, 0.4, 0.12]} rotation={[0.35, 0, 0]} castShadow>
            <coneGeometry args={[0.075, 0.11, 20]} />
            <meshStandardMaterial color={color} roughness={0.35} metalness={0.5} />
          </mesh>
          {/* Warm Bulb Glow */}
          <mesh position={[0, 0.36, 0.13]}>
            <sphereGeometry args={[0.028, 16, 16]} />
            <meshStandardMaterial
              color="#fef3c7"
              emissive="#fbbf24"
              emissiveIntensity={2.2}
            />
          </mesh>
        </group>
      );

    case "speaker":
      return (
        <group>
          {/* Acoustic Cabinet */}
          <RoundedBox
            args={[0.14, 0.23, 0.16]}
            radius={0.012}
            position={[0, 0.115, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
          </RoundedBox>
          {/* Main Woofer Driver */}
          <mesh position={[0, 0.085, 0.081]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.046, 0.046, 0.008, 24]} />
            <meshStandardMaterial color="#d97706" roughness={0.35} metalness={0.6} />
          </mesh>
          <mesh position={[0, 0.085, 0.085]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.016, 0.016, 0.008, 16]} />
            <meshStandardMaterial color="#18181b" roughness={0.3} />
          </mesh>
          {/* Silk Tweeter */}
          <mesh position={[0, 0.175, 0.081]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.022, 0.022, 0.008, 20]} />
            <meshStandardMaterial color="#3f3f46" roughness={0.3} metalness={0.5} />
          </mesh>
        </group>
      );

    case "plant":
      return (
        <group>
          {/* Ceramic Planter Pot */}
          <mesh position={[0, 0.055, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.075, 0.058, 0.11, 20]} />
            <meshStandardMaterial color={color} roughness={0.6} />
          </mesh>
          {/* Rich Soil Disc */}
          <mesh position={[0, 0.105, 0]}>
            <cylinderGeometry args={[0.068, 0.068, 0.01, 16]} />
            <meshStandardMaterial color="#292524" roughness={0.95} />
          </mesh>
          {/* Sculpted Botanical Foliage */}
          {[
            [0, 0.16, 0, 0.055],
            [-0.04, 0.145, 0.025, 0.042],
            [0.042, 0.15, 0.02, 0.044],
            [0.01, 0.15, -0.04, 0.042],
            [-0.025, 0.185, -0.01, 0.038],
          ].map(([x, y, z, r], idx) => (
            <mesh key={idx} position={[x, y, z]} castShadow>
              <dodecahedronGeometry args={[r, 1]} />
              <meshStandardMaterial
                color={idx % 2 === 0 ? "#16a34a" : "#22c55e"}
                roughness={0.65}
              />
            </mesh>
          ))}
        </group>
      );

    case "mug":
      return (
        <group>
          {/* Ceramic Mug Body */}
          <mesh position={[0, 0.048, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.042, 0.038, 0.096, 20]} />
            <meshStandardMaterial color={color} roughness={0.35} />
          </mesh>
          {/* Warm Latte Surface Inside */}
          <mesh position={[0, 0.092, 0]}>
            <cylinderGeometry args={[0.037, 0.037, 0.005, 18]} />
            <meshStandardMaterial color="#92400e" roughness={0.2} />
          </mesh>
          {/* Curved Handle */}
          <mesh position={[0.046, 0.048, 0]} castShadow>
            <torusGeometry args={[0.024, 0.006, 10, 20, Math.PI]} />
            <meshStandardMaterial color={color} roughness={0.35} />
          </mesh>
        </group>
      );

    case "notebook":
      return (
        <group>
          {/* Hardcover Journal */}
          <RoundedBox
            args={[0.16, 0.016, 0.22]}
            radius={0.003}
            position={[0, 0.008, 0]}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial color={color} roughness={0.65} />
          </RoundedBox>
          {/* Paper Pages Block */}
          <mesh position={[0.004, 0.008, 0]}>
            <boxGeometry args={[0.15, 0.012, 0.21]} />
            <meshStandardMaterial color="#fafaf9" roughness={0.85} />
          </mesh>
          {/* Metallic Stylus Pen Resting on Top */}
          <mesh
            position={[0.02, 0.021, 0]}
            rotation={[Math.PI / 2, 0, -0.22]}
            castShadow
          >
            <cylinderGeometry args={[0.0045, 0.0045, 0.16, 12]} />
            <meshStandardMaterial color="#e4e4e7" roughness={0.25} metalness={0.85} />
          </mesh>
        </group>
      );
  }
}