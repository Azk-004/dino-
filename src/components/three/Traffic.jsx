import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext.jsx";
import { mixHex } from "../../lib/color.js";

/**
 * Trafic du boulevard : voitures qui roulent dans les deux sens avec feux
 * avant (blancs) et arrière (rouges) émissifs. La nuit les feux sont vifs,
 * le jour ils s'éteignent presque (phares éteints, carrosseries mates).
 * tint : les phares se teintent très légèrement de l'accent de l'univers.
 */
export function Traffic({ count = 9, tint = null }) {
  const { theme } = useTheme();
  const day = theme === "day";
  const headColor = tint ? mixHex("#f8e6b8", tint, 0.3) : "#f8e6b8";

  const cars = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const dir = i % 2 === 0 ? 1 : -1; // deux sens de circulation
      const lane = dir === 1 ? 2.6 : -2.6;
      arr.push({
        dir,
        lane,
        z: -6 - ((i * 9.7) % 74),
        speed: 6.5 + (i * 1.7) % 5, // vitesses variées
        body: ["#2e2a24", "#262019", "#322a1e", "#2b2118", "#241f18"][i % 5],
        w: 1.55,
        h: 0.9,
      });
    }
    return arr;
  }, [count]);

  const ref = useRef(null);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g || !g.children.length) return;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < cars.length; i++) {
      const c = cars[i];
      const car = g.children[i];
      c.z += c.dir * c.speed * delta;
      // Boucle : la voiture revient de l'autre bout du boulevard
      if (c.z > 16) c.z = -76;
      if (c.z < -76) c.z = 16;
      car.position.z = c.z;
      car.position.x = c.lane;
      // Léger hochement organique
      car.position.y = 0 + Math.sin(t * 3 + i) * 0.008;
      // Pas de rotation de groupe : les feux avant/arrière sont déjà
      // placés selon le sens de circulation en espace local (dir).
      // Phares/feux : intensité pilotée par le thème
      const target = day ? 0.12 : 1.6;
      car.traverse((o) => {
        if (o.userData.lamp && o.material) {
          o.material.opacity += (target - o.material.opacity) * Math.min(delta * 4, 1);
        }
      });
    }
  });

  return (
    <group ref={ref}>
      {cars.map((c, i) => (
        <group key={i}>
          {/* Carrosserie */}
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[c.w, c.h, 2.3]} />
            <meshStandardMaterial color={c.body} metalness={0.85} roughness={0.35} envMapIntensity={1.1} />
          </mesh>
          {/* Habitacle */}
          <mesh position={[0, 0.55, -0.35]}>
            <boxGeometry args={[c.w * 0.78, c.h * 0.5, 1.2]} />
            <meshStandardMaterial color="#0a0e1a" metalness={0.4} roughness={0.6} envMapIntensity={0.6} />
          </mesh>
          {/* Feu avant (blanc) — face +z quand dir=1 */}
          <mesh position={[0, 0.42, c.dir === 1 ? 1.16 : -1.16]} rotation={[0, c.dir === 1 ? 0 : Math.PI, 0]}>
            <planeGeometry args={[c.w * 0.6, 0.16]} />
            <meshBasicMaterial
              color={headColor}
              transparent
              opacity={day ? 0.12 : 1.6}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
              userData={{ lamp: true }}
            />
          </mesh>
          {/* Feu arrière (rouge) */}
          <mesh position={[0, 0.42, c.dir === 1 ? -1.16 : 1.16]} rotation={[0, c.dir === 1 ? Math.PI : 0, 0]}>
            <planeGeometry args={[c.w * 0.55, 0.13]} />
            <meshBasicMaterial
              color="#ff2a2a"
              transparent
              opacity={day ? 0.1 : 0.9}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
              userData={{ lamp: true }}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}
