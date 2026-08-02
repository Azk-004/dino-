import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { MeshReflectorMaterial } from "@react-three/drei";
import * as THREE from "three";
import { Billboard } from "./Billboard.jsx";
import { StreetLamp } from "./StreetLamp.jsx";
import { CitySkyline } from "./CitySkyline.jsx";
import { Effects } from "./Effects.jsx";
import { StudioEnv } from "./StudioEnv.jsx";
import { Motes } from "./Motes.jsx";
import { Traffic } from "./Traffic.jsx";
import { ADS } from "./ads.js";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useMode } from "../../context/ModeContext.jsx";
import { mixHex } from "../../lib/color.js";

/* ------------------------------------------------------------------ */
/* Profil des panneaux le long du boulevard                           */
/* ------------------------------------------------------------------ */
const PANELS = ADS;

const PANEL_LAYOUT = [
  { idx: 0, side: -1, z: -6, y: 0.6, rot: 0.34 },
  { idx: 1, side: 1, z: -15, y: 1.2, rot: -0.3 },
  { idx: 2, side: -1, z: -24, y: 0.4, rot: 0.28 },
  { idx: 3, side: 1, z: -33, y: 1.0, rot: -0.32 },
  { idx: 4, side: -1, z: -42, y: 0.8, rot: 0.3 },
  { idx: 5, side: 1, z: -51, y: 0.5, rot: -0.28 },
  { idx: 6, side: -1, z: -60, y: 1.1, rot: 0.33 },
];

const LAMP_LAYOUT = [
  { z: -3, side: 1, lit: true },
  { z: -12, side: -1 },
  { z: -20, side: 1 },
  { z: -28, side: -1, lit: true },
  { z: -36, side: 1 },
  { z: -45, side: -1 },
  { z: -54, side: 1, lit: true },
  { z: -63, side: -1 },
];

/* ------------------------------------------------------------------ */
/* Contrôleur d'ambiance : anime couleurs, lumières et bloom           */
/* entre nuit et jour, avec interpolation lissée.                      */
/* ------------------------------------------------------------------ */
function Atmosphere({ bloomRef, tint = null }) {
  const { theme } = useTheme();
  const refs = useRef({});
  const day = theme === "day";
  // Teinte très subtile de la nuit selon l'univers actif
  const bgHex = useMemo(() => {
    if (day || !tint) return day ? "#efe7d6" : "#15110b";
    return mixHex("#15110b", tint, 0.12);
  }, [day, tint]);
  const target = useMemo(
    () => ({
      bg: new THREE.Color(bgHex),
      fog: new THREE.Color(bgHex),
      fogNear: day ? 40 : 26,
      fogFar: day ? 220 : 118,
      ambient: day ? 1.2 : 0.1,
      sun: day ? 3.4 : 0.0,
      bloom: day ? 0.3 : 0.8,
      screen: day ? 0.5 : 1.7,
      windows: day ? 0.25 : 0.8,
      lamps: day ? 0.06 : 2.6,
      lampLight: day ? 0 : 12,
      stars: day ? 0 : 1,
      moon: day ? 0 : 1,
    }),
    [day, bgHex]
  );

  useFrame((state, delta) => {
    const s = state.scene;
    const cur = refs.current;
    const t = Math.min(delta * 3, 1);

    cur.bg = THREE.Color.lerpColors(cur.bg ?? target.bg, target.bg, t);
    cur.fog = THREE.Color.lerpColors(cur.fog ?? target.fog, target.fog, t);
    s.background = cur.bg;
    if (s.fog) {
      s.fog.color = cur.fog;
      s.fog.near += (target.fogNear - s.fog.near) * t;
      s.fog.far += (target.fogFar - s.fog.far) * t;
    }

    // Lumières
    if (cur.ambient) cur.ambient.intensity += (target.ambient - cur.ambient.intensity) * t;
    if (cur.sunLight) {
      cur.sunLight.intensity += (target.sun - cur.sunLight.intensity) * t;
      const sunY = 2 + target.sun * 12;
      cur.sunLight.position.y += (sunY - cur.sunLight.position.y) * t;
    }
    if (cur.moon) cur.moon.position.y += ((target.moon > 0.5 ? 16 : 2) - cur.moon.position.y) * t;

    // Bloom
    if (bloomRef.current) {
      bloomRef.current.intensity += (target.bloom - bloomRef.current.intensity) * t;
    }

    // Matériaux : écrans, fenêtres, lampadaires, lumières, étoiles
    s.traverse((obj) => {
      if (obj.userData.screen && obj.userData.baseIntensity && obj.material) {
        const targetI = target.screen * obj.userData.baseIntensity;
        obj.material.emissiveIntensity += (targetI - obj.material.emissiveIntensity) * t;
      } else if (obj.userData.windows && obj.userData.base && obj.material) {
        obj.material.emissiveIntensity += (target.windows - obj.material.emissiveIntensity) * t;
      } else if (obj.userData.lamp && obj.material) {
        obj.material.emissiveIntensity += (target.lamps - obj.material.emissiveIntensity) * t;
      }
      if (obj.isPointLight && obj.userData.lampLight) {
        obj.intensity += (target.lampLight - obj.intensity) * t;
      }
      if (obj.userData.starsOpacity != null && obj.material) {
        obj.material.opacity += (target.stars - obj.material.opacity) * t;
      }
    });
  });

  return (
    <>
      <ambientLight ref={(r) => (refs.current.ambient = r)} intensity={0.09} />
      <directionalLight
        ref={(r) => (refs.current.sunLight = r)}
        position={[30, 2, -40]}
        intensity={0}
        color="#ffe8c2"
      />
      <mesh ref={(r) => (refs.current.moon = r)} position={[-26, 2, -78]}>
        <sphereGeometry args={[2.4, 24, 24]} />
        <meshBasicMaterial color="#f2ead8" toneMapped={false} />
      </mesh>
      <Stars
        radius={130}
        depth={70}
        count={2600}
        factor={4.5}
        saturation={0}
        fade
        speed={0.4}
        onCreated={({ object }) => {
          object.userData.starsOpacity = 1;
          object.material.transparent = true;
          object.material.opacity = 1;
        }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* La route (bitume mouillé avec reflets) + lampadaires + panneaux     */
/* ------------------------------------------------------------------ */
function Boulevard({ progressRef, mobile, tint, tint2 }) {
  const group = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const prevP = useRef(0);
  const fovBase = useRef(58);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const target = state.camera;
    const t = state.clock.elapsedTime;

    // Progression au scroll : la caméra avance le long du boulevard
    const p = Math.min(Math.max(progressRef.current ?? 0, 0), 1);
    const e = 1 - Math.pow(1 - p, 1.6); // ease-out
    const targetZ = 13 - e * 62;

    // Parallaxe souris (desktop)
    if (!mobile) {
      pointer.current.x += (state.pointer.x - pointer.current.x) * delta * 3;
      pointer.current.y += (state.pointer.y - pointer.current.y) * delta * 3;
    }

    // Léger hochement de caméra permanent (stabilisateur imparfait, très C4D)
    const swayX = Math.sin(t * 0.5) * 0.35;
    const swayY = Math.sin(t * 0.32 + 1.7) * 0.12;

    // Kick de vitesse au scroll : FOV qui s'élargit quand on avance vite,
    // dérive latérale proportionnelle à la vitesse de scroll (effet caméra épaule)
    const vel = p - prevP.current;
    prevP.current = p;
    const speedKick = Math.min(Math.abs(vel) / Math.max(delta, 0.0001) * 0.055, 7);
    const targetFov = 58 + speedKick;
    if (Math.abs(targetFov - fovBase.current) > 0.01) {
      fovBase.current += (targetFov - fovBase.current) * Math.min(delta * 6, 1);
      target.fov = fovBase.current;
      target.updateProjectionMatrix();
    }
    const driftX = vel * 34; // la caméra dérive avec l'inertie du scroll

    target.position.z += (targetZ - target.position.z) * Math.min(delta * 2.4, 1);
    target.position.x += (Math.sin(e * Math.PI) * 1.8 + pointer.current.x * 1.1 + swayX + driftX - target.position.x) * Math.min(delta * 2.4, 1);
    target.position.y += (3.1 - e * 1.4 + pointer.current.y * 0.4 + swayY - target.position.y) * Math.min(delta * 2.4, 1);
    target.lookAt(0, 2.2 + swayY, target.position.z - 26);
  });

  return (
    <group ref={group}>
      {/* Sol large */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -45]}>
        <planeGeometry args={[160, 130]} />
        <meshStandardMaterial color="#1a140d" roughness={1} />
      </mesh>

      {/* Chaussée bitume mouillé */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -42]}>
        <planeGeometry args={[10.4, 120]} />
        <MeshReflectorMaterial
          blur={[280, 90]}
          resolution={mobile ? 256 : 512}
          mixBlur={0.92}
          mixStrength={mobile ? 0.4 : 1.1}
          roughness={0.6}
          depthScale={1}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#1c150d"
          metalness={0.25}
          mirror={0.42}
        />
      </mesh>

      {/* Ligne médiane */}
      <group>
        {Array.from({ length: 16 }).map((_, i) => (
          <mesh key={i} position={[0, 0.02, -4 - i * 7.2]}>
            <boxGeometry args={[0.16, 0.02, 2.4]} />
            <meshBasicMaterial color="#ffe9a8" toneMapped={false} />
          </mesh>
        ))}
      </group>

      {/* Panneaux publicitaires — teintés par l'univers actif */}
      {PANEL_LAYOUT.map((p) => {
        const panel = PANELS[p.idx];
        return (
          <Billboard
            key={p.z}
            label={panel.label}
            sub={panel.sub}
            accent={tint ? mixHex(panel.accent, tint, 0.38) : panel.accent}
            position={[p.side * 6.4, p.y, p.z]}
            rotationY={p.side * p.rot}
            progressRef={progressRef}
          />
        );
      })}

      {/* Trafic — voitures aux phares allumés */}
      <Traffic tint={tint} />

      {/* Lampadaires — halo teinté par l'univers */}
      {LAMP_LAYOUT.map((l, i) => (
        <StreetLamp key={i} position={[l.side * 4.6, 0, l.z]} lit={l.lit} side={l.side} tint={tint} />
      ))}

      {/* Skyline */}
      <CitySkyline tint={tint} tint2={tint2} />

      {/* Brume légère près du sol */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.03, -60]}>
        <planeGeometry args={[60, 110]} />
        <meshBasicMaterial color="#221b10" transparent opacity={0.2} depthWrite={false} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Scène exportée                                                      */
/* ------------------------------------------------------------------ */
export default function BoulevardScene({ progressRef }) {
  const bloomRef = useRef(null);
  const { theme } = useTheme();
  const { meta } = useMode();
  const mobile = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(max-width: 767px)").matches,
    []
  );

  return (      <Canvas
        dpr={mobile ? [1, 1.4] : [1, 1.75]}
        gl={{
          antialias: !mobile,
          powerPreference: "high-performance",
          stencil: false,
          toneMappingExposure: mobile ? 1.05 : 1.18,
        }}
        camera={{ fov: 58, near: 0.1, far: 300, position: [0, 3.1, 13] }}
        className="boulevard-canvas"
      >
        <fog attach="fog" args={["#15110b", 26, 118]} />
        <Suspense fallback={null}>
          <Boulevard progressRef={progressRef} mobile={mobile} tint={meta.accent} tint2={meta.accent2} />
          <Atmosphere bloomRef={bloomRef} tint={meta.accent} />
          <StudioEnv day={theme === "day"} accent={meta.accent} accent2={meta.accent2} />
          <Motes tint={meta.accent} />
          <Effects bloomRef={bloomRef} mobile={mobile} progressRef={progressRef} />
        </Suspense>
      </Canvas>
  );
}
