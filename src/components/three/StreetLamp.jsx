import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext.jsx";
import { mixHex } from "../../lib/color.js";

/**
 * Lampadaire avec faisceau volumétrique (cône lumineux additif).
 * Nuit : halo chaud + cône de lumière. Jour : éteint.
 * tint : couleur d'accent de l'univers actif (le halo se teinte).
 */
export function StreetLamp({ position, lit = false, side = 1, tint = null }) {
  const lampColor = tint ? mixHex("#e8a85e", tint, 0.55) : "#e8a85e";
  const coneRef = useRef(null);
  const glowRef = useRef(null);
  const { theme } = useTheme();
  const day = theme === "day";

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Micro-scintillement de la tête émissive la nuit
    if (glowRef.current && !day) {
      const mat = glowRef.current.material;
      mat.emissiveIntensity = 3 + Math.sin(t * 7 + position[2] * 3) * 0.5;
    }
    // Le cône respire légèrement
    if (coneRef.current) {
      coneRef.current.material.opacity = (day ? 0 : 0.14) * (0.9 + 0.1 * Math.sin(t * 1.5 + position[2]));
    }
  });

  return (
    <group position={position}>
      {/* Mât */}
      <mesh position={[0, 3, 0]}>
        <cylinderGeometry args={[0.09, 0.13, 6, 12]} />
        <meshPhysicalMaterial color="#2e2619" metalness={0.88} roughness={0.35} clearcoat={0.5} clearcoatRoughness={0.5} envMapIntensity={1.5} />
      </mesh>
      {/* Bras */}
      <mesh position={[side * 0.7, 5.9, 0]} rotation={[0, 0, side * -0.55]}>
        <boxGeometry args={[1.7, 0.12, 0.12]} />
        <meshPhysicalMaterial color="#2e2619" metalness={0.88} roughness={0.35} clearcoat={0.5} clearcoatRoughness={0.5} envMapIntensity={1.5} />
      </mesh>
      {/* Tête émissive — intensité pilotée par l'Atmosphère (jour/nuit) */}
      <mesh ref={glowRef} userData={{ lamp: true }} position={[side * 1.15, 5.85, 0]}>
        <boxGeometry args={[0.5, 0.22, 0.32]} />
        <meshStandardMaterial
          color={tint ? mixHex("#f5d9a8", tint, 0.45) : "#f5d9a8"}
          emissive={lampColor}
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>
      {lit && (
        <pointLight
          position={[side * 1.4, 5.4, 0]}
          color={lampColor}
          intensity={14}
          distance={22}
          decay={2}
          userData={{ lampLight: true }}
        />
      )}
      {/* Faisceau volumétrique — cône de lumière descendant */}
      {lit && (
        <mesh ref={coneRef} position={[side * 1.4, 2.4, 0]} rotation={[0, 0, side * 0.06]}>
          <coneGeometry args={[1.5, 6, 24, 1, true]} />
          <meshBasicMaterial
            color={tint ? mixHex("#f0c078", tint, 0.45) : "#f0c078"}
            transparent
            opacity={0.14}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      )}
    </group>
  );
}
