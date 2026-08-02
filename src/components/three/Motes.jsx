import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext.jsx";
import { mixHex } from "../../lib/color.js";

/**
 * Poussières / lucioles en suspension le long du boulevard.
 * Nuit : braises chaudes qui montent — Jour : fine poussière dorée.
 * La couleur suit le thème et se teinte de l'accent de l'univers.
 */
export function Motes({ count = 420, tint = null }) {
  const { theme } = useTheme();
  const day = theme === "day";
  const baseColor = day ? "#e8cfa0" : "#e8b878";
  const color = tint ? mixHex(baseColor, tint, 0.45) : baseColor;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const side = i % 2 === 0 ? -1 : 1;
      pos[i * 3] = side * (3 + Math.random() * 26);
      pos[i * 3 + 1] = 0.3 + Math.random() * 6.5;
      pos[i * 3 + 2] = 2 - Math.random() * 78;
      seed[i] = Math.random() * Math.PI * 2;
    }
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.userData.seed = seed;
    return geo;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.05,
        color,
        transparent: true,
        opacity: day ? 0.35 : 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
        toneMapped: false,
      }),
    [color]
  );

  useFrame((state, delta) => {
    const attr = geometry.getAttribute("position");
    const arr = attr.array;
    const seed = geometry.userData.seed;
    const t = state.clock.elapsedTime;
    const drift = day ? 0.06 : 0.14;

    for (let i = 0; i < count; i++) {
      // Les braises montent la nuit, retombent doucement le jour
      arr[i * 3 + 1] += (day ? -1 : 1) * drift * delta;
      if (arr[i * 3 + 1] > 7) arr[i * 3 + 1] = 0.3;
      if (arr[i * 3 + 1] < 0.2) arr[i * 3 + 1] = 6.8;
      // Légère ondulation latérale
      arr[i * 3] += Math.sin(t * 0.4 + seed[i]) * delta * 0.25;
    }
    attr.needsUpdate = true;

    // Scintillement
    material.opacity = (day ? 0.35 : 0.85) * (0.75 + 0.25 * Math.sin(t * 2.2));
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}
