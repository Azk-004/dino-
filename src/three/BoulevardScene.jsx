import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Text, Sparkles, Stars, Cloud } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { useScrollProgress } from '../hooks/useScrollProgress.js';
import { SceneBoundary, useWebGL } from './SceneGuard.jsx';
import centuryGothicFont from '../assets/fonts/CenturyGothic.ttf';

// Palette "Sable" - chaque panneau s'allume dans une de ces teintes
// en passant du gris éteint à la couleur de marque, comme une enseigne
// qui s'active au passage de la caméra.
const WARM_COLORS = ['#c19a6b', '#8c6a43', '#d9c2a0', '#9c7c4f', '#d9a441'];
const OFF_COLOR = new THREE.Color('#242019');
const OFF_TEXT = new THREE.Color('#5c5346');
const LIT_TEXT = new THREE.Color('#fff6e4');
const STEEL = '#0c0a08';

const COPY = [
  'aanid',
  'Panotik',
  'Signalez.',
  'Cartographiez.',
  'Relais pub',
  'Formations',
  'États des lieux',
  'Carte',
  'Consultation',
  'Citoyens',
  'Autorités',
  'Rallumez',
];

const START_Z = 2;
const END_Z = -75; // Plus étalé pour réduire la surcharge
const PANEL_COUNT = 12; // Moins de panneaux pour un meilleur équilibre
const GROUND_Y = -1.95;

// Deux ambiances pour le même boulevard : la nuit (comportement d'origine,
// inchangé) et un "matin" doré qui reprend uniquement des teintes déjà
// présentes dans la palette "Sable" (cream-alt, primary-light, glow…).
// Les couleurs de marque des panneaux (WARM_COLORS, OFF_COLOR, LIT_TEXT)
// ne sont jamais touchées par le mode.
const SCENE_MODES = {
  night: {
    bgColor: '#120e0a',
    fogColor: '#0a0806',
    fogNear: 4,
    fogFar: 35,
    ambientColor: '#3a2f22',
    ambientIntensity: 0.22,
    hemiSky: '#4a4038',
    hemiGround: '#0a0806',
    hemiIntensity: 0.35,
    dirColor: '#f3cf94',
    dirIntensity: 0.35,
    sparkleColor: '#f3cf94',
    sparkleOpacity: 0.6,
    sparkleCount: 260,
    sparkleCountLight: 90,
    dustColor: '#d9c2a0',
    dustOpacity: 0.4,
    buildingColor: '#0b0907',
    windowOnColor: '#f3cf94',
    windowOffColor: '#2a2218',
    windowLitChance: 0.3,
    roadColor: '#0a0806',
    bloomIntensity: 1.5,
    vignetteDarkness: 1.1,
    skyTop: '#120e0a',   // --color-night
    skyBottom: '#261b12', // --color-night-alt
    sunColor: '#f3cf94', // --color-glow
    sunGlowOpacity: 0.5,
    sunGlowScale: 6,
    lampGlowOpacity: 0.9,
  },
  day: {
    bgColor: '#f2e7d3',      // --color-cream-alt (moins criard que cream pur)
    fogColor: '#f2e7d3',     // --color-cream-alt
    fogNear: 9,
    fogFar: 55,
    ambientColor: '#e8dcc8', // --color-sand-border, plus doux que glow pur
    ambientIntensity: 0.55,
    hemiSky: '#f2e7d3',      // --color-cream-alt
    hemiGround: '#9c7c4f',   // --color-primary-dark
    hemiIntensity: 0.45,
    dirColor: '#d9c2a0',     // --color-primary-light, moins éblouissant que glow
    dirIntensity: 0.75,
    sparkleColor: '#f3cf94', // --color-glow - poussière dorée, pas du blanc générique
    sparkleOpacity: 0.35,
    sparkleCount: 180,
    sparkleCountLight: 60,
    dustColor: '#d9c2a0',    // --color-primary-light
    dustOpacity: 0.4,
    buildingColor: '#9c7c4f',   // --color-primary-dark, silhouette chaude
    windowOnColor: '#f3cf94',   // --color-glow, vitres qui accrochent le levant
    windowOffColor: '#e8dcc8',  // --color-sand-border
    windowLitChance: 0.08,
    roadColor: '#6e5333',    // --color-secondary-dark
    bloomIntensity: 0.4,
    vignetteDarkness: 0.55,
    skyTop: '#f2e7d3',       // --color-cream-alt, moins blanc
    skyBottom: '#d9c2a0',    // --color-primary-light, horizon doré adouci
    sunColor: '#e8c98a',
    sunGlowOpacity: 0.55,
    sunGlowScale: 8,
    lampGlowOpacity: 0.15,
  },
};

function buildLayout(count) {
  const layout = [];
  for (let i = 0; i < count; i += 1) {
    const t = i / (count - 1);
    const z = THREE.MathUtils.lerp(START_Z - 5, END_Z, t);
    const side = i % 2 === 0 ? -1 : 1;
    const isBillboard = i % 3 !== 0;
    const laneOffset = isBillboard ? 3.4 : 2.5;
    const x = side * (laneOffset + Math.sin(i * 0.9) * 0.35);
    const y = 0.55 + Math.sin(i * 0.65) * 0.2;
    const wobble = 0.92 + (Math.sin(i * 5.7) * 0.5 + 0.5) * 0.16;
    const scale = THREE.MathUtils.lerp(1, 0.58, t) * wobble;
    const jitter = (Math.sin(i * 12.9) * 0.5 + 0.5) * 0.1 - 0.05;
    const rotationY = -side * (isBillboard ? 0.34 : 0.22) + jitter;
    const tiltX = isBillboard ? -0.035 - (Math.sin(i * 4.1) * 0.5 + 0.5) * 0.02 : 0;

    layout.push({
      z,
      x,
      y,
      scale,
      rotationY,
      tiltX,
      type: isBillboard ? 'billboard' : 'citylight',
      color: WARM_COLORS[i % WARM_COLORS.length],
      copy: COPY[i % COPY.length],
      threshold: t,
      seed: i * 7.13,
    });
  }
  return layout;
}

// Fusionne toutes les fenêtres d'un immeuble en une seule géométrie BufferGeometry
// avec vertexColors → 1 draw call par immeuble au lieu de 4-16.
function buildWindowsGeometry(windows, side, onColor, offColor) {
  const on = new THREE.Color(onColor);
  const off = new THREE.Color(offColor);
  const geos = windows.map((w) => {
    const g = new THREE.PlaneGeometry(0.15, 0.25);
    // Rotation Y selon le côté (identique à l'ancien mesh individuel)
    g.rotateY(side > 0 ? -Math.PI / 2 : Math.PI / 2);
    g.translate(w.x, w.y, w.z);
    const color = w.lit ? on : off;
    const colors = new Float32Array(g.attributes.position.count * 3);
    for (let k = 0; k < colors.length; k += 3) {
      colors[k] = color.r;
      colors[k + 1] = color.g;
      colors[k + 2] = color.b;
    }
    g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return g;
  });
  return mergeGeometries(geos);
}

function Panel({ x, y, z, scale, rotationY, tiltX, type, color, copy, threshold, seed, progressRef }) {
  const faceMat = useRef();
  const glowMat = useRef();
  const glowMesh = useRef();
  const lampMatA = useRef();
  const lampMatB = useRef();
  const textRef = useRef();
  const litRef = useRef(0);
  const targetColor = useMemo(() => new THREE.Color(color), [color]);
  const textColorScratch = useMemo(() => new THREE.Color(), []);

  const isBillboard = type === 'billboard';
  const width = isBillboard ? 2.3 : 1.05;
  const height = isBillboard ? 1.15 : 1.55;
  const bottomEdge = -height / 2 - 0.05;
  const poleBottomLocalY = (GROUND_Y - y) / scale;
  const poleLength = Math.max(bottomEdge - poleBottomLocalY, 0.4);
  const poleCenterY = (bottomEdge + poleBottomLocalY) / 2;

  useFrame((state) => {
    const p = progressRef.current;
    const target = THREE.MathUtils.smoothstep(p, threshold - 0.09, threshold + 0.02);
    litRef.current = THREE.MathUtils.lerp(litRef.current, target, 0.08);
    const lit = litRef.current;

    const flicker = 1;

    if (faceMat.current) {
      faceMat.current.color.copy(OFF_COLOR).lerp(targetColor, lit);
      faceMat.current.emissive.copy(targetColor);
      faceMat.current.emissiveIntensity = lit * 0.6 * flicker;
    }
    if (glowMat.current) {
      glowMat.current.opacity = lit * (isBillboard ? 0.32 : 0.22) * flicker;
    }
    if (glowMesh.current) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 1.4 + z) * 0.03 * lit;
      glowMesh.current.scale.setScalar(pulse);
    }
    if (lampMatA.current) {
      lampMatA.current.emissiveIntensity = lit * 1.4 * flicker;
    }
    if (lampMatB.current) {
      lampMatB.current.emissiveIntensity = lit * 1.4 * flicker;
    }
    if (textRef.current) {
      textColorScratch.copy(OFF_TEXT).lerp(LIT_TEXT, lit);
      textRef.current.color = textColorScratch.getHex();
      textRef.current.fillOpacity = THREE.MathUtils.clamp(lit * 1.3, 0, 1) * flicker;
    }
  });

  return (
    <group position={[x, y, z]} rotation={[tiltX, rotationY, 0]} scale={scale}>
      <RoundedBox args={[width, height, 0.07]} radius={0.06} smoothness={4}>
        <meshStandardMaterial ref={faceMat} color={OFF_COLOR} roughness={0.5} metalness={0.1} />
      </RoundedBox>
      <Text
        ref={textRef}
        font={centuryGothicFont}
        position={[0, 0, 0.045]}
        fontSize={isBillboard ? width * 0.16 : width * 0.22}
        maxWidth={width * 0.86}
        lineHeight={1.05}
        letterSpacing={0.01}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        fontWeight={800}
        color="#5c5346"
        fillOpacity={0}
      >
        {copy}
      </Text>
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[width + 0.1, height + 0.11, 0.02]} />
        <meshStandardMaterial color={STEEL} roughness={0.9} />
      </mesh>
      <mesh ref={glowMesh} position={[0, 0, 0.02]}>
        <planeGeometry args={[width * 1.5, height * 1.5]} />
        <meshBasicMaterial
          ref={glowMat}
          color={targetColor}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {isBillboard ? (
        <>
          <mesh position={[-(width / 2 - 0.18), poleCenterY, -0.03]}>
            <cylinderGeometry args={[0.045, 0.05, poleLength, 10]} />
            <meshStandardMaterial color={STEEL} roughness={0.7} metalness={0.2} />
          </mesh>
          <mesh position={[width / 2 - 0.18, poleCenterY, -0.03]}>
            <cylinderGeometry args={[0.045, 0.05, poleLength, 10]} />
            <meshStandardMaterial color={STEEL} roughness={0.7} metalness={0.2} />
          </mesh>
          <mesh
            position={[0, poleCenterY - poleLength * 0.18, -0.03]}
            rotation={[0, 0, Math.atan2(poleLength * 0.55, width - 0.36)]}
          >
            <boxGeometry args={[Math.hypot(width - 0.36, poleLength * 0.55), 0.025, 0.025]} />
            <meshStandardMaterial color={STEEL} roughness={0.7} metalness={0.2} />
          </mesh>
          <mesh
            position={[0, poleCenterY - poleLength * 0.18, -0.03]}
            rotation={[0, 0, -Math.atan2(poleLength * 0.55, width - 0.36)]}
          >
            <boxGeometry args={[Math.hypot(width - 0.36, poleLength * 0.55), 0.025, 0.025]} />
            <meshStandardMaterial color={STEEL} roughness={0.7} metalness={0.2} />
          </mesh>
          <mesh position={[0, bottomEdge - 0.03, 0.12]}>
            <boxGeometry args={[width * 0.92, 0.05, 0.22]} />
            <meshStandardMaterial color={STEEL} roughness={0.8} />
          </mesh>
          <mesh position={[0, height / 2 + 0.1, 0.16]}>
            <boxGeometry args={[width * 0.85, 0.05, 0.05]} />
            <meshStandardMaterial color={STEEL} roughness={0.8} />
          </mesh>
          <mesh position={[-width * 0.28, height / 2 + 0.06, 0.28]} rotation={[0.5, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.045, 0.16, 8]} />
            <meshStandardMaterial ref={lampMatA} color={STEEL} emissive={targetColor} emissiveIntensity={0} />
          </mesh>
          <mesh position={[width * 0.28, height / 2 + 0.06, 0.28]} rotation={[0.5, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.045, 0.16, 8]} />
            <meshStandardMaterial ref={lampMatB} color={STEEL} emissive={targetColor} emissiveIntensity={0} />
          </mesh>
        </>
      ) : (
        <mesh position={[0, poleCenterY, -0.03]}>
          <cylinderGeometry args={[0.032, 0.036, poleLength, 10]} />
          <meshStandardMaterial color={STEEL} roughness={0.6} metalness={0.3} />
        </mesh>
      )}
    </group>
  );
}

function Skyline({ mode, isLightweight }) {
  const config = SCENE_MODES[mode];
  const groupRef = useRef();
  useFrame(({ mouse }) => {
    if (isLightweight) return; // parallax souris inutile sur tactile
    if (groupRef.current) {
      // Parallax léger : la skyline dérive doucement à l'inverse de la souris,
      // pour renforcer la profondeur du fond de ville.
      groupRef.current.position.x += (mouse.x * -0.4 - groupRef.current.position.x) * 0.04;
      groupRef.current.position.y += (mouse.y * 0.2 - groupRef.current.position.y) * 0.04;
    }
  });

  // Géométrie des buildings ET position des fenêtres figées une seule fois
  // (indépendant du mode) : seul l'état allumé/éteint de chaque fenêtre
  // est recalculé au changement de mode. Avant, tout se régénérait au
  // hasard à chaque bascule (fenêtres qui sautent, comptage différent) -
  // c'était la source de l'incohérence visuelle entre jour et nuit.
  const count = isLightweight ? 12 : 26;
  const buildingsGeo = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i += 1) {
      const z = THREE.MathUtils.lerp(START_Z + 4, END_Z - 20, i / (count - 1)) + (Math.sin(i * 3.3) * 2);
      const side = i % 2 === 0 ? -1 : 1;
      const dist = 9 + Math.sin(i * 1.7) * 2.2;
      const h = 2 + Math.abs(Math.sin(i * 2.1)) * 5.5;
      const w = 1.6 + Math.sin(i * 0.8) * 0.6;

      const windows = [];
      const windowCount = Math.floor(Math.random() * 12) + 4;
      for (let j = 0; j < windowCount; j++) {
        windows.push({
          x: side > 0 ? -w / 2 - 0.01 : w / 2 + 0.01,
          y: Math.random() * (h - 0.5) - h / 2 + 0.25,
          z: (Math.random() - 0.5) * (w - 0.4),
          litRoll: Math.random(), // valeur figée, comparée au seuil du mode courant
        });
      }

      items.push({ x: side * dist, z, h, w, side, windows });
    }
    return items;
  }, [count]);

  // Géométrie fusionnée des fenêtres par immeuble (vertexColors → 1 draw call / bâti)
  const windowsGeo = useMemo(() => {
    return buildingsGeo.map((b) =>
      buildWindowsGeometry(
        b.windows.map((w) => ({
          ...w,
          lit: w.litRoll > 1 - config.windowLitChance,
        })),
        b.side,
        config.windowOnColor,
        config.windowOffColor,
      ),
    );
  }, [buildingsGeo, config.windowLitChance, config.windowOnColor, config.windowOffColor]);

  return (
    <group ref={groupRef}>
      {buildingsGeo.map((b, i) => (
        <group key={i} position={[b.x, b.h / 2 + GROUND_Y, b.z]}>
          <mesh>
            <boxGeometry args={[b.w, b.h, b.w]} />
            <meshBasicMaterial color={config.buildingColor} />
          </mesh>
          <mesh geometry={windowsGeo[i]}>
            <meshBasicMaterial vertexColors transparent opacity={0.8} />
          </mesh>
          {i % 4 === 0 && b.h > 5 && <Beacon position={[0, b.h / 2 + 0.15, 0]} phase={i} />}
        </group>
      ))}
    </group>
  );
}

function LightTrails({ isLightweight }) {
  if (isLightweight) return null;
  const trails = useMemo(() => {
    return Array.from({ length: 24 }).map(() => {
      const isOncoming = Math.random() > 0.5;
      return {
        x: (isOncoming ? -1 : 1) * (1.5 + Math.random() * 2), // voies de gauche ou de droite
        z: START_Z - Math.random() * Math.abs(START_Z - END_Z),
        speed: (isOncoming ? 1 : -1) * (0.2 + Math.random() * 0.3), // un peu plus rapides !
        length: 1.5 + Math.random() * 5,
        color: isOncoming ? '#ffebd6' : '#ff2a00', // phares blancs ou feux arrières rouges
      };
    });
  }, []);

  const refs = useRef([]);

  useFrame(() => {
    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.position.z += trails[i].speed;
      if (mesh.position.z > START_Z + 10) {
        mesh.position.z = END_Z - 10;
      } else if (mesh.position.z < END_Z - 10) {
        mesh.position.z = START_Z + 10;
      }
    });
  });

  return (
    <group position={[0, GROUND_Y + 0.15, 0]}>
      {trails.map((t, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)} position={[t.x, 0, t.z]}>
          <boxGeometry args={[0.1, 0.1, t.length]} />
          <meshBasicMaterial color={t.color} blending={THREE.AdditiveBlending} />
        </mesh>
      ))}
    </group>
  );
}

function SkyDome({ mode }) {
  const target = SCENE_MODES[mode];
  const meshRef = useRef();
  // Figées au montage sur le mode réel de départ : plus de flash noir
  // ni de décalage jour/nuit pendant la première seconde.
  const topColor = useMemo(() => new THREE.Color(target.skyTop), []);
  const botColor = useMemo(() => new THREE.Color(target.skyBottom), []);
  const sunRef = useRef();
  const sunGlowRef = useRef();
  const scratch = useMemo(() => new THREE.Color(), []);

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(90, 24, 16);
    const colors = new Float32Array(geo.attributes.position.count * 3);
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geo;
  }, []);

  useFrame(({ clock, camera }) => {
    const speed = 0.06;
    topColor.lerp(scratch.set(target.skyTop), speed);
    botColor.lerp(scratch.set(target.skyBottom), speed);

    const posAttr = geometry.attributes.position;
    const colorAttr = geometry.attributes.color;
    for (let i = 0; i < posAttr.count; i += 1) {
      const y = posAttr.getY(i);
      const t = THREE.MathUtils.clamp((y + 90) / 180, 0, 1);
      scratch.copy(botColor).lerp(topColor, t);
      colorAttr.setXYZ(i, scratch.r, scratch.g, scratch.b);
    }
    colorAttr.needsUpdate = true;

    if (meshRef.current) {
      meshRef.current.position.set(camera.position.x, 0, camera.position.z);
    }

    // Le soleil (jour) ou la lune (nuit) dérive lentement dans le ciel en continu,
    // pour que la scène reste vivante même pendant la transition entre les deux modes.
    const t = clock.elapsedTime * 0.015;
    const arcX = Math.sin(t) * 45;
    const arcY = 18 + Math.cos(t * 0.6) * 6;
    if (sunRef.current) {
      sunRef.current.position.set(camera.position.x + arcX, arcY, camera.position.z - 60);
      sunRef.current.material.color.lerp(scratch.set(target.sunColor), speed);
    }
    if (sunGlowRef.current) {
      sunGlowRef.current.position.copy(sunRef.current.position);
      sunGlowRef.current.material.color.lerp(scratch.set(target.sunColor), speed);
      sunGlowRef.current.material.opacity = target.sunGlowOpacity;
      const pulse = 1 + Math.sin(clock.elapsedTime * 0.8) * 0.06;
      sunGlowRef.current.scale.setScalar(target.sunGlowScale * pulse);
    }
  });

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry} scale={[1, 1, 1]}>
        <meshBasicMaterial vertexColors side={THREE.BackSide} fog={false} depthWrite={false} />
      </mesh>
      <mesh ref={sunGlowRef}>
        <circleGeometry args={[3, 32]} />
        <meshBasicMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={sunRef}>
        <circleGeometry args={[1.1, 32]} />
        <meshBasicMaterial depthWrite={false} />
      </mesh>
    </group>
  );
}

function Beacon({ position, phase }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const blink = Math.max(0, Math.sin(clock.elapsedTime * 1.6 + phase));
      ref.current.material.opacity = 0.25 + blink * 0.75;
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.06, 8, 8]} />
      <meshBasicMaterial color="#ff6a4a" transparent depthWrite={false} />
    </mesh>
  );
}

function LampGlow({ color, baseOpacity, phase }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const pulse = 0.85 + Math.sin(clock.elapsedTime * 1.2 + phase) * 0.15;
      ref.current.material.opacity = baseOpacity * pulse;
    }
  });
  return (
    <mesh ref={ref} position={[0, 2.25, 0]}>
      <sphereGeometry args={[0.09, 8, 8]} />
      <meshBasicMaterial color={color} transparent opacity={baseOpacity} />
    </mesh>
  );
}

function StreetLamps({ mode }) {
  const config = SCENE_MODES[mode];
  const lamps = useMemo(() => {
    const items = [];
    for (let z = START_Z + 4; z > END_Z - 8; z -= 7) {
      items.push({ z, side: -1 });
      items.push({ z, side: 1 });
    }
    return items;
  }, []);

  return (
    <group>
      {lamps.map((l, i) => (
        <group key={i} position={[l.side * 6.6, GROUND_Y, l.z]}>
          <mesh position={[0, 1.1, 0]}>
            <cylinderGeometry args={[0.04, 0.05, 2.2, 6]} />
            <meshStandardMaterial color="#2a2218" roughness={0.8} />
          </mesh>
          <LampGlow color={config.sunColor} baseOpacity={config.lampGlowOpacity} phase={i} />
        </group>
      ))}
    </group>
  );
}

function Plane({ mode }) {
  const config = SCENE_MODES[mode];
  const groupRef = useRef();
  const lightRef = useRef();

  useFrame(({ clock }) => {
    const t = (clock.elapsedTime * 0.03) % 1;
    if (groupRef.current) {
      groupRef.current.position.set(THREE.MathUtils.lerp(-55, 55, t), 22, -85);
    }
    if (lightRef.current) {
      lightRef.current.material.opacity = Math.max(0, Math.sin(clock.elapsedTime * 3)) * 0.9 + 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <capsuleGeometry args={[0.06, 0.5, 4, 8]} />
        <meshBasicMaterial color={config.buildingColor} />
      </mesh>
      <mesh ref={lightRef} position={[0.3, 0, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color="#ff6a4a" transparent depthWrite={false} />
      </mesh>
    </group>
  );
}

function ShootingStar() {
  const ref = useRef();
  const matRef = useRef();
  useFrame(({ clock }) => {
    const cycle = 3.2; // une étoile filante toutes les ~3s, ciel plus vivant
    const t = (clock.elapsedTime % cycle) / cycle;
    const active = t < 0.18;
    if (ref.current) {
      const p = active ? t / 0.18 : 0;
      ref.current.position.set(THREE.MathUtils.lerp(-25, 15, p), THREE.MathUtils.lerp(20, 8, p), -55);
    }
    if (matRef.current) {
      matRef.current.opacity = active ? Math.sin(Math.PI * (t / 0.18)) * 0.9 : 0;
    }
  });
  return (
    <mesh ref={ref} rotation={[0, 0, -0.6]}>
      <planeGeometry args={[1.4, 0.03]} />
      <meshBasicMaterial ref={matRef} color="#fff6e4" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

function SkyDetails({ mode, isLightweight }) {
  if (mode === 'night') {
    return (
      <>
      <ShootingStar />
      <Stars
        radius={70}
        depth={30}
        count={isLightweight ? 1600 : 3800}
        factor={3.2}
        saturation={0}
        fade
        speed={1.2}
      />
      </>
    );
  }

  // Nuages dorés qui dérivent doucement, dans les tons "glow"/"cream-alt"
  // de la charte - pas de blanc générique.
  const cloudProps = {
    opacity: 0.4,
    speed: 0.25,
    width: 18,
    depth: 1.2,
    segments: isLightweight ? 14 : 24,
    color: '#f2e7d3',
  };
  return (
    <group>
      <Cloud {...cloudProps} position={[-14, 12, -40]} />
      <Cloud {...cloudProps} position={[10, 15, -55]} scale={0.8} />
      <Cloud {...cloudProps} position={[-4, 9, -70]} scale={0.6} />
      <Cloud {...cloudProps} position={[18, 10, -35]} scale={0.55} />
      <Cloud {...cloudProps} position={[-20, 16, -65]} scale={0.7} />
    </group>
  );
}

function CursorGlow({ mode, isLightweight }) {
  if (isLightweight) return null;
  const config = SCENE_MODES[mode];
  const ref = useRef();
  const target = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const scratch = useMemo(() => new THREE.Color(), []);

  useFrame(({ camera, mouse, clock }) => {
    if (!ref.current) return;
    // Le halo suit la souris dans l'espace 3D, à une distance fixe devant
    // la caméra : ça crée une lueur chaude qui accompagne le curseur,
    // cohérente avec les lueurs du soleil/lampadaires/sparkles.
    dir.set(mouse.x, mouse.y, 0.5).unproject(camera).sub(camera.position).normalize();
    target.copy(camera.position).addScaledVector(dir, 9);
    ref.current.position.lerp(target, 0.08);
    ref.current.quaternion.copy(camera.quaternion);
    const pulse = 1 + Math.sin(clock.elapsedTime * 1.8) * 0.12;
    ref.current.scale.setScalar(pulse);
    ref.current.material.color.lerp(scratch.set(config.sunColor), 0.04);
  });

  return (
    <mesh ref={ref}>
      <circleGeometry args={[1.6, 24]} />
      <meshBasicMaterial
        transparent
        opacity={0.16}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        color={config.sunColor}
      />
    </mesh>
  );
}

function SceneEnvironment({ mode }) {
  const target = SCENE_MODES[mode];
  // Valeurs de départ figées sur le mode réel au montage (jour OU nuit) :
  // avant, on partait toujours de la nuit puis on dérivait lentement,
  // ce qui créait une incohérence visible avec le SkyDome au chargement.
  const initial = useRef(SCENE_MODES[mode]).current;
  const ambientRef = useRef();
  const hemiRef = useRef();
  const dirRef = useRef();
  const fogRef = useRef();
  const scratch = useMemo(() => new THREE.Color(), []);

  useFrame(({ scene }) => {
    const speed = 0.06;
    if (ambientRef.current) {
      ambientRef.current.color.lerp(scratch.set(target.ambientColor), speed);
      ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, target.ambientIntensity, speed);
    }
    if (hemiRef.current) {
      hemiRef.current.color.lerp(scratch.set(target.hemiSky), speed);
      hemiRef.current.groundColor.lerp(scratch.set(target.hemiGround), speed);
      hemiRef.current.intensity = THREE.MathUtils.lerp(hemiRef.current.intensity, target.hemiIntensity, speed);
    }
    if (dirRef.current) {
      dirRef.current.color.lerp(scratch.set(target.dirColor), speed);
      dirRef.current.intensity = THREE.MathUtils.lerp(dirRef.current.intensity, target.dirIntensity, speed);
    }
    if (fogRef.current) {
      fogRef.current.color.lerp(scratch.set(target.fogColor), speed);
      fogRef.current.near = THREE.MathUtils.lerp(fogRef.current.near, target.fogNear, speed);
      fogRef.current.far = THREE.MathUtils.lerp(fogRef.current.far, target.fogFar, speed);
    }
    if (scene.background) {
      scene.background.lerp(scratch.set(target.bgColor), speed);
    }
  });

  return (
    <>
      <color attach="background" args={[initial.bgColor]} />
      <ambientLight ref={ambientRef} intensity={initial.ambientIntensity} color={initial.ambientColor} />
      <hemisphereLight ref={hemiRef} args={[initial.hemiSky, initial.hemiGround, initial.hemiIntensity]} />
      <directionalLight ref={dirRef} position={[2, 5, 4]} intensity={initial.dirIntensity} color={initial.dirColor} />
      <fog ref={fogRef} attach="fog" args={[initial.fogColor, initial.fogNear, initial.fogFar]} />
    </>
  );
}

function DustParticles({ mode, isLightweight }) {
  if (isLightweight) return null;
  const config = SCENE_MODES[mode];
  const count = 220;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 10 - 2;
      pos[i * 3 + 2] = START_Z - Math.random() * 50;
    }
    return pos;
  }, []);
  
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.35) * 1.2;
      ref.current.position.x = Math.cos(state.clock.elapsedTime * 0.2) * 1.0;
      ref.current.rotation.y = state.clock.elapsedTime * 0.14;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color={config.dustColor} transparent opacity={config.dustOpacity} sizeAttenuation={true} blending={THREE.AdditiveBlending} depthWrite={false} />
    </points>
  );
}

function GroundAndRoad({ mode }) {
  const config = SCENE_MODES[mode];
  const dashes = useMemo(() => {
    const items = [];
    for (let z = START_Z + 8; z > END_Z - 12; z -= 1.6) {
      items.push(z);
    }
    return items;
  }, []);

  return (
    <group>
      <mesh position={[0, GROUND_Y, (START_Z + END_Z) / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[13, Math.abs(START_Z - END_Z) + 30]} />
        <meshStandardMaterial color={config.roadColor} roughness={0.85} metalness={0.05} />
      </mesh>
      {dashes.map((z, i) => (
        <mesh key={i} position={[0, GROUND_Y + 0.005, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.12, 0.7]} />
          <meshStandardMaterial color="#4a3f30" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig({ progressRef, isLightweight }) {
  useFrame(({ camera, mouse, clock }) => {
    const p = progressRef.current;
    const z = THREE.MathUtils.lerp(START_Z, END_Z + 6, p);
    // Respiration décorative coupée sur mobile : seul le scroll + mouse restent.
    const x = isLightweight
      ? Math.sin(p * Math.PI * 1.6) * 1.1 + mouse.x * 0.6
      : Math.sin(p * Math.PI * 1.6) * 1.1 + mouse.x * 0.6 + Math.sin(clock.elapsedTime * 0.3) * 0.12;
    const y = isLightweight
      ? 0.35 + Math.sin(p * Math.PI * 2.1) * 0.2 - mouse.y * 0.4
      : 0.35 + Math.sin(p * Math.PI * 2.1) * 0.2 - mouse.y * 0.4 + Math.sin(clock.elapsedTime * 0.3 * 1.7) * 0.06;

    camera.position.x += (x - camera.position.x) * 0.06;
    camera.position.y += (y - camera.position.y) * 0.06;
    camera.position.z += (z - camera.position.z) * 0.06;
    camera.lookAt(Math.sin((p + 0.05) * Math.PI * 1.6) * 1.1, 0.2, z - 8);
  });
  return null;
}

export default function BoulevardScene({ className = '', mode = 'night' }) {
  const config = SCENE_MODES[mode] ?? SCENE_MODES.night;
  const progress = useScrollProgress();
  const prefersReduced =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isLightweight = typeof window !== 'undefined' && window.innerWidth < 768;
  // Machines modestes (portables bas de gamme) : on coupe le post-traitement,
  // de très loin le premier poste de coût GPU sur la scène.
  const lowPower =
    isLightweight ||
    (typeof navigator !== 'undefined' &&
      (navigator.hardwareConcurrency || 8) <= 4 &&
      (navigator.deviceMemory || 8) <= 4);
  const webglOk = useWebGL();

  const layout = useMemo(() => buildLayout(isLightweight ? 8 : PANEL_COUNT), [isLightweight]);

  if (prefersReduced) return null;
  if (!webglOk) return null;

  return (
    <div className={className} aria-hidden="true">
      <SceneBoundary name="blvd" fallback={null}>
        <Canvas
        dpr={isLightweight ? [1, 1] : [1, 1.5]}
        camera={{ position: [0, 0.35, START_Z], fov: 50 }}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
      >
        <SceneEnvironment mode={mode} />
        <SkyDome mode={mode} />
        <SkyDetails mode={mode} isLightweight={isLightweight} />
        
        <Suspense fallback={null}>
          <Skyline mode={mode} isLightweight={isLightweight} />
          <StreetLamps mode={mode} />
          {!isLightweight && <Plane mode={mode} />}
          <GroundAndRoad mode={mode} />
          <LightTrails isLightweight={isLightweight} />
          <DustParticles mode={mode} isLightweight={isLightweight} />
          {layout.map((panel, i) => (
            <Panel key={i} {...panel} progressRef={progress} />
          ))}
          <CursorGlow mode={mode} isLightweight={isLightweight} />
          <Sparkles
            count={isLightweight ? config.sparkleCountLight : config.sparkleCount}
            scale={[14, 7, Math.abs(START_Z - END_Z) + 10]}
            position={[0, 1.5, (START_Z + END_Z) / 2]}
            size={2.8}
            speed={1.1}
            opacity={config.sparkleOpacity}
            color={config.sparkleColor}
          />
          {!lowPower && (
          <EffectComposer disableNormalPass>
            <Bloom luminanceThreshold={0.2} mipmapBlur intensity={config.bloomIntensity} />
            <Vignette eskil={false} offset={0.1} darkness={config.vignetteDarkness} />
          </EffectComposer>
          )}
        </Suspense>
        <CameraRig progressRef={progress} isLightweight={isLightweight} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}

