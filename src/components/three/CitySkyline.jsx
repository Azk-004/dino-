import { useMemo } from "react";
import { makeWindowsTexture } from "./BillboardTexture.js";
import { mixHex } from "../../lib/color.js";

function Building({ position, size, texture, emissiveColor }) {
  return (
    <mesh position={position} userData={{ windows: true, base: 0.9 }}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        color="#1d170e"
        map={texture}
        emissiveMap={texture}
        emissive={emissiveColor}
        emissiveIntensity={0.9}
        roughness={0.9}
        metalness={0.2}
      />
    </mesh>
  );
}

export function CitySkyline({ count = 26, radius = 60, far = 70, tint = null }) {
  const texture = useMemo(() => makeWindowsTexture(), []);

  // Fenêtres légèrement teintées : blanc → accent de l'univers (hex, type stable)
  const emissiveColor = useMemo(
    () => (tint ? mixHex("#ffe8c0", tint, 0.35) : "#ffe8c0"),
    [tint]
  );

  const buildings = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      const z = -far - Math.random() * 34;
      const x = side * (radius + Math.random() * 16);
      const height = 6 + Math.random() * 22;
      arr.push({
        position: [x, height / 2, z],
        size: [4 + Math.random() * 7, height, 4 + Math.random() * 7],
      });
    }
    return arr;
  }, [count, radius, far]);

  return (
    <group>
      {buildings.map((b, i) => (
        <Building key={i} position={b.position} size={b.size} texture={texture} emissiveColor={emissiveColor} />
      ))}
    </group>
  );
}
