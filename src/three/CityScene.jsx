import { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';
import CityFallback from './CityFallback.jsx';
import { SceneBoundary, useWebGL } from './SceneGuard.jsx';

const GROUND_Y = -2;

// ── Palette sable Panotik (nuit) / sable Panotik (jour) — aucune couleur vive ──
const SCENE_MODES = {
  night: {
    bg: '#0a0806',
    fog: '#0a0806',
    fogNear: 18,
    fogFar: 95,
    ambient: '#3a2f22',
    ambientIntensity: 0.65,
    hemiSky: '#3a3022',
    hemiGround: '#0a0806',
    hemiIntensity: 0.6,
    dir: '#f3cf94',
    dirIntensity: 0.75,
    building: '#120e0a',
    windowOff: '#241c11',
    windowCols: ['#f3cf94', '#d9c2a0', '#d9a441', '#fdfaf2'],
    litChance: 0.55,
    grid: '#a5773f',
    rim: ['#f3cf94', '#d9a441'],
    hologramColors: ['#f3cf94', '#d9a441', '#d9c2a0', '#fdfaf2'],
    starCount: 3200,
    carHead: '#fff2d8',
    carTail: '#d95b43',
    rain: true,
    bloom: 0.55,
    vignette: 0.85,
    skyTop: '#120e0a',
    skyBottom: '#2a1e12',
  },
  day: {
    bg: '#efe4cd',
    fog: '#eee2c9',
    fogNear: 30,
    fogFar: 130,
    ambient: '#e8dcc8',
    ambientIntensity: 0.55,
    hemiSky: '#e8dcc8',
    hemiGround: '#9c7c4f',
    hemiIntensity: 0.5,
    dir: '#e8c98a',
    dirIntensity: 0.8,
    building: '#9c7c4f',
    windowOff: '#cbb381',
    windowCols: ['#fff6e4', '#e8c98a'],
    litChance: 0.14,
    grid: '#c4a26a',
    rim: ['#e8c98a'],
    hologramColors: ['#d9c2a0', '#f3cf94'],
    starCount: 0,
    carHead: '#fff2d8',
    carTail: '#c03138',
    rain: false,
    bloom: 0.35,
    vignette: 0.55,
    skyTop: '#f2e7d3',
    skyBottom: '#d9c2a0',
  },
};

// ── RNG déterministe pour textures de fenêtres stables par bâtiment ──
function mulberry32(seed) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Les textures de fenêtres sont mises en cache par (seed, mode, lite) :
// elles ne sont pas régénérées sur un changement jour/nuit, ni lors d'un
// remontage. L'ensemble est vidé (et les textures GPU libérées) à l'unmount.
const windowTexCache = new Map();

function makeWindowTexture(seed, mode, lite) {
  const key = seed + ':' + mode + ':' + (lite ? 1 : 0);
  const cached = windowTexCache.get(key);
  if (cached) return cached;
  const cfg = SCENE_MODES[mode];
  const canvas = document.createElement('canvas');
  const W = lite ? 64 : 128;
  const H = lite ? 128 : 256;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, W, H);
  const rng = mulberry32(seed);
  const cols = 6;
  const rows = 14;
  const colW = W / cols;
  const rowH = H / rows;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (rng() < cfg.litChance) {
        ctx.fillStyle = cfg.windowCols[Math.floor(rng() * cfg.windowCols.length)];
        ctx.fillRect(c * colW + 2, r * rowH + 2, colW - 5, rowH - 5);
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  windowTexCache.set(key, tex);
  return tex;
}

function makeRadialTexture(inner, outer) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, inner);
  g.addColorStop(1, outer);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeGridTexture(mode) {
  const cfg = SCENE_MODES[mode];
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = cfg.grid;
  ctx.lineWidth = 2;
  for (let i = 0; i <= 16; i += 1) {
    ctx.beginPath();
    ctx.moveTo(0, (i / 16) * 512);
    ctx.lineTo(512, (i / 16) * 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo((i / 16) * 512, 0);
    ctx.lineTo((i / 16) * 512, 512);
    ctx.stroke();
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(28, 28);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeTrailTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 0, 128);
  g.addColorStop(0, 'rgba(255,255,255,0)');
  g.addColorStop(1, 'rgba(255,255,255,0.85)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 128);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function buildCity(lite) {
  const items = [];
  const count = lite ? 40 : 84;
  for (let i = 0; i < count; i += 1) {
    const angle = (i / count) * Math.PI * 2 + Math.sin(i * 7.3) * 0.35;
    const radius = 13 + Math.random() * 27;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius - 14;
    const w = 1.1 + Math.random() * 1.6;
    const d = w * (0.75 + Math.random() * 0.6);
    const h = 2.2 + Math.pow(Math.random(), 1.8) * 3.3;
    items.push({
      x, z, w, d, h,
      seed: Math.floor(Math.random() * 1e9) + i,
      rimMix: Math.random(),
      beacon: Math.random() > 0.82 && h > 3.8,
    });
  }
  return items;
}

// ── Environnement (lumières + brouillard) ──
function Env({ mode, introRef }) {
  const cfg = SCENE_MODES[mode];
  const ambRef = useRef();
  const hemiRef = useRef();
  const dirRef = useRef();
  useFrame(() => {
    const p = introRef.current.p;
    const ramped = 0.06 + 0.94 * p;
    if (ambRef.current) ambRef.current.intensity = cfg.ambientIntensity * ramped;
    if (hemiRef.current) hemiRef.current.intensity = cfg.hemiIntensity * ramped;
    if (dirRef.current) dirRef.current.intensity = cfg.dirIntensity * ramped;
  });
  return (
    <>
      <fog attach="fog" args={[cfg.fog, cfg.fogNear, cfg.fogFar]} />
      <ambientLight ref={ambRef} intensity={cfg.ambientIntensity * 0.06} color={cfg.ambient} />
      <hemisphereLight ref={hemiRef} args={[cfg.hemiSky, cfg.hemiGround, cfg.hemiIntensity * 0.06]} />
      <directionalLight ref={dirRef} position={[6, 12, 6]} intensity={cfg.dirIntensity * 0.06} color={cfg.dir} />
    </>
  );
}

// ── Bâtiments (silhouettes + fenêtres allumées) ──
function CityBuildings({ mode, data, introRef, lite }) {
  const cfg = SCENE_MODES[mode];
  const white = useMemo(() => new THREE.Color('#ffffff'), []);
  return (
    <group>
      {data.map((b, i) => (
        <Building key={i} b={b} mode={mode} cfg={cfg} white={white} introRef={introRef} lite={lite} />
      ))}
    </group>
  );
}

function Building({ b, mode, cfg, white, introRef, lite }) {
  const texture = useMemo(() => makeWindowTexture(b.seed, mode, lite), [b.seed, mode, lite]);
  const matRef = useRef();
  const baseIntensity = mode === 'night' ? 0.7 : 0.3;
  const rimA = cfg.rim[0];
  const rimB = cfg.rim.length > 1 ? cfg.rim[1] : cfg.rim[0];
  const positionY = b.h / 2 + GROUND_Y;

  // Les fenêtres s'illuminent petit à petit pendant le zoom d'ouverture,
  // la ville « prend vie » autour du soleil.
  useFrame(() => {
    if (matRef.current) {
      matRef.current.emissiveIntensity = baseIntensity * (0.1 + 0.9 * introRef.current.p);
    }
  });

  return (
    <group position={[b.x, positionY, b.z]}>
      <mesh>
        <boxGeometry args={[b.w, b.h, b.d]} />
        <meshStandardMaterial
          ref={matRef}
          color={cfg.building}
          roughness={0.55}
          metalness={0.25}
          emissive={white}
          emissiveMap={texture}
          emissiveIntensity={baseIntensity * 0.1}
        />
      </mesh>
      {b.h > 4.8 && (
        <>
          <mesh position={[0, b.h / 2 + 0.02, b.d * (b.rimMix > 0.5 ? 0.45 : -0.45)]}>
            <boxGeometry args={[b.w * 0.98, 0.06, 0.06]} />
            <meshBasicMaterial color={b.rimMix > 0.5 ? rimA : rimB} blending={THREE.AdditiveBlending} />
          </mesh>
          <mesh position={[b.w * (b.rimMix > 0.5 ? 0.45 : -0.45), b.h / 2 - 0.4, 0]}>
            <boxGeometry args={[0.06, 1, 0.06]} />
            <meshBasicMaterial color={b.rimMix > 0.5 ? rimB : rimA} blending={THREE.AdditiveBlending} />
          </mesh>
        </>
      )}
      {b.h > 3.4 && (
        <mesh position={[b.w * (b.rimMix > 0.5 ? 0.3 : -0.3), b.h / 2 + 0.5, 0]}>
          <cylinderGeometry args={[0.025, 0.03, 1, 5]} />
          <meshStandardMaterial color={mode === 'night' ? '#3a2f22' : '#5c4a30'} roughness={0.7} metalness={0.3} />
        </mesh>
      )}
      {b.beacon && (
        <group position={[0, b.h / 2 + 0.12, 0]}>
          <BeaconLight />
        </group>
      )}
    </group>
  );
}

function BeaconLight() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const blink = Math.max(0, Math.sin(clock.elapsedTime * 1.7));
      ref.current.material.opacity = 0.12 + blink * 0.4;
    }
  });
  return <mesh ref={ref}><sphereGeometry args={[0.05, 8, 8]} /><meshBasicMaterial color="#f0a06a" transparent depthWrite={false} /></mesh>;
}

// ── Sol : dalle sombre + grille néon additive ──
function NeonGround({ mode }) {
  const gridTex = useMemo(() => makeGridTexture(mode), [mode]);
  const glowTex = useMemo(() => makeRadialTexture('rgba(255,255,255,0.4)', 'rgba(255,255,255,0)'), []);
  return (
    <group>
      <mesh position={[0, GROUND_Y, -14]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial color={mode === 'night' ? '#0d0a07' : '#6e5333'} roughness={0.7} metalness={0.1} />
      </mesh>
      <mesh position={[0, GROUND_Y + 0.01, -14]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshBasicMaterial
          map={gridTex}
          transparent
          opacity={mode === 'night' ? 0.3 : 0.22}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <mesh position={[0, GROUND_Y + 0.02, -18]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[10, 40]} />
        <meshBasicMaterial
          map={glowTex}
          color={mode === 'night' ? '#c19a6b' : '#e8c98a'}
          transparent
          opacity={mode === 'night' ? 0.22 : 0.15}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* Anneau-boulevard : boulevard circulaire qui entoure la place */}
      <mesh position={[0, GROUND_Y + 0.02, -14]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[12.8, 13.15, 64]} />
        <meshBasicMaterial
          color={mode === 'night' ? '#8a6435' : '#a5773f'}
          transparent
          opacity={mode === 'night' ? 0.5 : 0.3}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ── Lampadaires : halo chaud autour de la place, côté caméra ──
function StreetLights({ mode, lite }) {
  const lights = useMemo(() => {
    const arr = [];
    const count = lite ? 4 : 8;
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 + 0.35;
      const radius = 4.6;
      arr.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius - 14,
        flick: 1 + Math.floor(i * 1.7) * 0.37,
      });
    }
    return arr;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lite]);
  const refs = useRef([]);
  useFrame(({ clock }) => {
    refs.current.forEach((r, i) => {
      if (!r) return;
      r.material.opacity = 0.55 + Math.max(0, Math.sin(clock.elapsedTime * 2.2 + lights[i].flick)) * 0.35;
    });
  });
  return (
    <group>
      {lights.map((l, i) => (
        <group key={i} position={[l.x, 0, l.z]}>
          <mesh position={[0, 1.65, 0]}>
            <cylinderGeometry args={[0.05, 0.08, 3.3, 6]} />
            <meshStandardMaterial color={mode === 'night' ? '#1c150e' : '#6e5333'} roughness={0.7} metalness={0.2} />
          </mesh>
          {/* Ampoule */}
          <mesh position={[0, 3.4, 0]}>
            <sphereGeometry args={[0.13, 8, 8]} />
            <meshBasicMaterial color="#f3cf94" />
          </mesh>
          {/* Halo */}
          <mesh ref={(el) => (refs.current[i] = el)} position={[0, 3.4, 0]}>
            <sphereGeometry args={[0.55, 10, 10]} />
            <meshBasicMaterial color="#f3cf94" transparent opacity={0.55} blending={THREE.AdditiveBlending} depthWrite={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ── Enseignes holographiques flottantes dans le ciel ──
function Holograms({ mode, lite }) {
  const cfg = SCENE_MODES[mode];
  const holograms = useMemo(() => {
    const items = [];
    const count = lite ? 5 : 10;
    for (let i = 0; i < count; i += 1) {
      const angle = (i / count) * Math.PI * 2 + 0.6;
      items.push({
        angle,
        radius: 34 + Math.random() * 22,
        y: 9 + Math.random() * 9,
        w: 5.5 + Math.random() * 3,
        h: 3 + Math.random() * 2,
        color: cfg.hologramColors[i % cfg.hologramColors.length],
        opacity: 0.18 + Math.random() * 0.12,
        seed: i,
      });
    }
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);
  return (
    <group>
      {holograms.map((h, i) => (
        <HologramMesh hologram={h} key={i} />
      ))}
    </group>
  );
}

function HologramMesh({ hologram }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.elapsedTime * 0.08 + hologram.seed;
      ref.current.position.x = Math.cos(hologram.angle) * hologram.radius + Math.sin(t) * 1.2;
      ref.current.position.z = Math.sin(hologram.angle) * hologram.radius - 14 + Math.cos(t) * 1.2;
      ref.current.position.y = hologram.y + Math.sin(t * 1.3) * 0.8;
      const flick = 0.8 + Math.sin(clock.elapsedTime * 3 + hologram.seed) * 0.2;
      ref.current.material.opacity = hologram.opacity * flick;
      ref.current.rotation.y = -hologram.angle + Math.sin(t * 0.5) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={[Math.cos(hologram.angle) * hologram.radius, hologram.y, Math.sin(hologram.angle) * hologram.radius - 14]}>
      <planeGeometry args={[hologram.w, hologram.h]} />
      <meshBasicMaterial color={hologram.color} transparent opacity={hologram.opacity} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ── Drapeau du Bénin : dessiné à la volée, affiché sur les panneaux du
// boulevard (jamais en fond). Proportions officielles 2:3, couleurs 1960 :
// bande verte à la hampe (1/3), puis moitié supérieure jaune, moitié rouge.
// Le drapeau couvre tout le panneau (plein cadre) : aucune zone noire vide. ──
function makeFlagTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 430;
  const ctx = canvas.getContext('2d');
  const band = canvas.width / 3;
  ctx.fillStyle = '#00853F';
  ctx.fillRect(0, 0, band, canvas.height);
  ctx.fillStyle = '#FCD116';
  ctx.fillRect(band, 0, band * 2, canvas.height / 2);
  ctx.fillStyle = '#E8112D';
  ctx.fillRect(band, canvas.height / 2, band * 2, canvas.height / 2);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// ── Affiches Panotik pour le mur média : générées à la volée, uniquement
// dans la palette sable de la marque (aucune image externe). ──
const WALL_ADS = [
  { title: 'RALLUMEZ', sub: 'la lumière publique' },
  { title: 'aanid', sub: 'réseau mondial de mobilier urbain' },
  { title: 'CARTOGRAPHIEZ', sub: 'le mobilier urbain' },
  { title: 'SIGNALEZ', sub: 'pannes et anomalies' },
  { title: 'UN RÉSEAU MONDIAL', sub: 'de relais publicitaires' },
  { title: 'PANOTIK', sub: 'la publicité qui éclaire' },
];
const AD_TINTS = ['#c19a6b', '#d9a441', '#d9c2a0', '#f3cf94', '#9c7c4f', '#fdfaf2'];

function makeWallAdTexture(index) {
  const ad = WALL_ADS[index % WALL_ADS.length];
  const tint = AD_TINTS[index % AD_TINTS.length];
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 288;
  const ctx = canvas.getContext('2d');
  const g = ctx.createLinearGradient(0, 0, 512, 288);
  g.addColorStop(0, '#181310');
  g.addColorStop(0.5, '#241c14');
  g.addColorStop(1, '#0e0b08');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 512, 288);
  ctx.strokeStyle = 'rgba(193,154,107,0.35)';
  ctx.lineWidth = 6;
  ctx.strokeRect(12, 12, 488, 264);
  ctx.fillStyle = tint;
  ctx.font = '700 44px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(ad.title, 256, 126, 480);
  ctx.fillStyle = 'rgba(253,250,242,0.6)';
  ctx.font = '400 20px sans-serif';
  ctx.fillText(ad.sub, 256, 184, 480);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

// ── Mur média : grande grille d'écrans, première chose visible à l'ouverture.
// Aucune image externe : chaque écran affiche une affiche Panotik générée
// à la volée dans la palette sable (le drapeau, lui, va sur les panneaux). ──
function MediaWall({ lite }) {
  const screens = useMemo(() => {
    const items = [];
    const cols = lite ? 3 : 5;
    const rows = lite ? 2 : 3;
    const w = 8;
    const h = 4.5;
    const gx = w + 1.0;
    const gy = h + 1.4;
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        items.push({
          x: (c - (cols - 1) / 2) * gx,
          y: (r - (rows - 1) / 2) * gy,
          w,
          h,
          seed: r * cols + c,
        });
      }
    }
    return items;
  }, []);
  const ads = useMemo(
    () => Array.from({ length: 15 }, (_, i) => makeWallAdTexture(i)),
    []
  );
  const glowRef = useRef([]);
  useFrame(({ clock }) => {
    glowRef.current.forEach((m, i) => {
      if (!m) return;
      m.material.opacity = 0.16 + Math.sin(clock.elapsedTime * 1.2 + i * 0.7) * 0.05;
    });
  });
  return (
    <group position={[0, 0, -60]}>
      {/* Socle */}
      <mesh position={[0, 0.1, -0.4]}>
        <boxGeometry args={[46.5, 4.5, 7]} />
        <meshStandardMaterial color="#0d0a07" roughness={0.6} metalness={0.3} />
      </mesh>
      {/* Façade support */}
      <mesh position={[0, 11.35, -0.4]}>
        <boxGeometry args={[46.5, 17.5, 6]} />
        <meshStandardMaterial color="#0d0a07" roughness={0.5} metalness={0.35} />
      </mesh>
      {/* Écrans en grille, chaque écran affichant une affiche Panotik */}
      {screens.map((s, i) => (
        <group key={i} position={[s.x, s.y, 0.3]}>
          {/* Cadre */}
          <mesh position={[0, 0, -0.1]}>
            <boxGeometry args={[s.w + 0.3, s.h + 0.3, 0.2]} />
            <meshStandardMaterial color="#050403" roughness={0.5} metalness={0.4} />
          </mesh>
          {!lite && (
            /* Halo chaud (désactivé sur petit écran : gain de perf) */
            <mesh ref={(el) => (glowRef.current[i] = el)} position={[0, 0, -0.05]}>
              <planeGeometry args={[s.w + 0.8, s.h + 0.8]} />
              <meshBasicMaterial color="#f3cf94" transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} fog={false} />
            </mesh>
          )}
          {/* Écran : l'affiche */}
          <mesh>
            <planeGeometry args={[s.w, s.h]} />
            {/* color blanc : la teinte du matériau est multipliée par la texture,
                #000000 rendait l'affiche noire */}
            <meshBasicMaterial color="#ffffff" map={ads[i % ads.length]} toneMapped={false} fog={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ── Rangées alignées de panneaux sur le boulevard (nettes, pas au hasard).
// Le drapeau du Bénin s'affiche ici, sur les panneaux de la ville. ──
function BoulevardPanels({ mode, lite }) {
  const flagTex = useMemo(() => makeFlagTexture(), []);
  const panels = useMemo(() => {
    const items = [];
    // Mobile : panneaux rapprochés de l'axe + un rang de plus — en portrait le
    // champ horizontal est étroit et x=±9,5 sortait du cadre. Desktop inchangé.
    const zs = lite ? [-8, -16] : [-6, -14, -22];
    const xOff = lite ? 4.4 : 9.5;
    // Légère rotation supplémentaire pour tourner la face des panneaux vers
    // le spectateur : droite face au couloir, ils étaient vus de biais (la
    // caméra regarde devant, pas sur le côté). ~29° vers l'axe avant.
    const turn = 0.5;
    let n = 0;
    for (const side of [-1, 1]) {
      for (const z of zs) {
        items.push({
          x: side * xOff,
          z,
          rot: side < 0 ? Math.PI / 2 - turn : -(Math.PI / 2 - turn),
          w: 5,
          h: 2.8,
          y: 2.8,
          seed: n,
        });
        n += 1;
      }
    }
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lite]);
  const glowRef = useRef([]);
  useFrame(({ clock }) => {
    glowRef.current.forEach((m, i) => {
      if (!m) return;
      m.material.opacity = 0.18 + Math.sin(clock.elapsedTime * 1.6 + i) * 0.06;
    });
  });
  const frame = mode === 'night' ? '#0d0a07' : '#6e5333';
  return (
    <group>
      {panels.map((b, i) => (
        <group key={i} position={[b.x, b.y, b.z]} rotation={[0, b.rot, 0]}>
          <mesh position={[0, -b.y - 1, 0]}>
            <cylinderGeometry args={[0.08, 0.11, 2, 6]} />
            <meshStandardMaterial color={frame} roughness={0.7} metalness={0.2} />
          </mesh>
          <mesh position={[0, 0, -0.09]}>
            <boxGeometry args={[b.w + 0.34, b.h + 0.34, 0.16]} />
            <meshStandardMaterial color={frame} roughness={0.55} metalness={0.35} />
          </mesh>
          <mesh ref={(el) => (glowRef.current[i] = el)} position={[0, 0, -0.045]}>
            <planeGeometry args={[b.w + 0.7, b.h + 0.7]} />
            <meshBasicMaterial color="#f3cf94" transparent opacity={0.2} blending={THREE.AdditiveBlending} depthWrite={false} fog={false} />
          </mesh>
          <mesh>
            <planeGeometry args={[b.w, b.h]} />
            {/* color blanc : la teinte du matériau est multipliée par la texture,
                #000000 rendait le drapeau noir */}
            <meshBasicMaterial color="#ffffff" map={flagTex} toneMapped={false} fog={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
function FlyingCars({ mode, lite }) {
  const cfg = SCENE_MODES[mode];
  const trailTex = useMemo(() => makeTrailTexture(), []);
  const cars = useMemo(() => {
    const items = [];
    const count = lite ? 7 : 14;
    for (let i = 0; i < count; i += 1) {
      items.push({
        x: (Math.random() - 0.5) * 70,
        y: 15 + Math.random() * 14,
        z: 30 + Math.random() * 50 - 40,
        speed: (0.35 + Math.random() * 0.55) * (Math.random() > 0.5 ? 1 : -1),
        seed: i,
      });
    }
    return items;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lite]);
  const refs = useRef([]);
  useFrame((_, delta) => {
    refs.current.forEach((g, i) => {
      if (!g) return;
      g.position.z += cars[i].speed * delta * 10;
      if (g.position.z > 36) g.position.z = -70;
      if (g.position.z < -70) g.position.z = 36;
    });
  });
  return (
    <group>
      {cars.map((c, i) => (
        <group key={i} ref={(el) => (refs.current[i] = el)} position={[c.x, c.y, c.z]}>
          {/* Traînée */}
          <mesh position={[0, 0, 0.9]}>
            <planeGeometry args={[0.55, 2.6]} />
            <meshBasicMaterial
              map={trailTex}
              color={c.speed > 0 ? cfg.carHead : cfg.carTail}
              transparent
              opacity={0.4}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Carrosserie */}
          <mesh>
            <boxGeometry args={[0.5, 0.22, 0.85]} />
            <meshStandardMaterial color={mode === 'night' ? '#121a2c' : '#5c4a30'} roughness={0.3} metalness={0.6} />
          </mesh>
          {/* Phare */}
          <mesh position={[0.16, 0.02, 0.44]}>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-0.16, 0.02, 0.44]}>
            <sphereGeometry args={[0.05, 6, 6]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// ── Pluie ──
function Rain({ mode, lite }) {
  const cfg = SCENE_MODES[mode];
  const count = lite ? 240 : 520;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      arr[i * 3] = (Math.random() - 0.5) * 160;
      arr[i * 3 + 1] = Math.random() * 40 - 4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 120 - 14;
    }
    return arr;
  }, []);
  const speeds = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i += 1) arr[i] = 26 + Math.random() * 22;
    return arr;
  }, []);
  const geoRef = useRef();
  useFrame((_, delta) => {
    const attr = geoRef.current && geoRef.current.attributes.position;
    if (!attr) return;
    const a = attr.array;
    for (let i = 0; i < count; i += 1) {
      a[i * 3 + 1] -= speeds[i] * delta;
      if (a[i * 3 + 1] < GROUND_Y - 0.4) a[i * 3 + 1] = 38;
    }
    attr.needsUpdate = true;
  });
  return (
    <group>
      <points>
        <bufferGeometry ref={geoRef}>
          <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial
          size={0.035}
          sizeAttenuation
          color="#d9c2a0"
          transparent
          opacity={mode === 'night' ? 0.35 : 0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// ── Caméra : intro (zoom arrière depuis le fond/sun) puis dérive + parallaxe ──
const INTRO_DURATION = 8;
const INTRO_START = new THREE.Vector3(0, 24, -54);
const INTRO_MID = new THREE.Vector3(0, 16, -18);
const INTRO_DIVE = new THREE.Vector3(0, 4.6, -4);
const CAM_REST = new THREE.Vector3(0, 4.6, 9);
const LOOK_START = new THREE.Vector3(0, 14, -135);
const LOOK_REST = new THREE.Vector3(0, 2.4, -24);

function easeInOutQuart(k) {
  return k < 0.5 ? 8 * k * k * k * k : 1 - Math.pow(-2 * k + 2, 4) / 2;
}

function CameraRig({ introRef, started }) {
  const look = useMemo(() => new THREE.Vector3(...LOOK_REST.toArray()), []);
  const clamp = useMemo(() => new THREE.Vector3(), []);
  const now = useMemo(() => new THREE.Vector3(), []);
  const target = useMemo(() => new THREE.Vector3(), []);
  const smoothMouse = useRef({ x: 0, y: 0 });
  const startT = useRef(null);

  useFrame(({ camera, clock, mouse }) => {
    const t = clock.elapsedTime;
    // L'intro ne démarre qu'une fois le logo dessiné ; avant, la caméra reste
    // en place (image plein écran) et la ville demeure sombre et figée.
    let p;
    if (started) {
      if (startT.current === null) startT.current = t;
      p = Math.min(1, (t - startT.current) / INTRO_DURATION);
    } else {
      startT.current = null;
      p = 0;
    }

    // Souris : verrouillée au centre pendant l'intro, lissée ensuite
    const sm = p < 1 ? 1 : 0.04;
    smoothMouse.current.x += (mouse.x - smoothMouse.current.x) * sm;
    smoothMouse.current.y += (mouse.y - smoothMouse.current.y) * sm;

    if (p < 1) {
      // Phase intro : le « fond » (soleil plein écran) recule pendant que la
      // ville s'illumine. La caméra survole la ville puis plonge dans le
      // couloir vide situé au centre (aucun immeuble sur ce chemin).
      const ease = 1 - Math.pow(1 - p, 3);
      if (p < 0.5) {
        const k = easeInOutQuart(p / 0.5);
        now.lerpVectors(INTRO_START, INTRO_MID, k);
      } else if (p < 0.85) {
        const k = (p - 0.5) / 0.35;
        now.lerpVectors(INTRO_MID, INTRO_DIVE, easeInOutQuart(k));
      } else {
        const k = (p - 0.85) / 0.15;
        now.lerpVectors(INTRO_DIVE, CAM_REST, easeInOutQuart(k));
      }
      camera.position.copy(now);
      camera.lookAt(clamp.lerpVectors(LOOK_START, LOOK_REST, ease));
    } else {
      // Phase repos : respiration continue + parallaxe souris (vue surélevée,
      // au-dessus des toits → plus aucune collision avec les immeubles)
      target.set(
        Math.sin(t * 0.12) * 1.1 + smoothMouse.current.x * 1.4,
        CAM_REST.y + Math.cos(t * 0.15) * 0.4 - smoothMouse.current.y * 0.5,
        CAM_REST.z
      );
      camera.position.lerp(target, 0.045);
      camera.lookAt(look);
    }

    introRef.current.p = p;
  });
  return null;
}

export default function CityScene({ mode = 'night', started = false }) {
  const cfg = SCENE_MODES[mode] ?? SCENE_MODES.night;
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lite = typeof window !== 'undefined' && window.innerWidth < 768;
  // Machines modestes (portables bas de gamme, dimensions mémoire limitées) :
  // on coupe le post-traitement, de très loin le premier poste de coût GPU.
  const lowPower =
    lite ||
    (typeof navigator !== 'undefined' &&
      (navigator.hardwareConcurrency || 8) <= 4 &&
      (navigator.deviceMemory || 8) <= 4);
  const city = useMemo(() => buildCity(lite), [lite]);
  const introRef = useRef({ p: 0 });
  const fallback = useMemo(() => <CityFallback mode={mode} />, [mode]);
  const webglOk = useWebGL();

  // Libère les textures de fenêtres mises en cache quand la scène disparaît.
  useEffect(() => {
    return () => {
      for (const t of windowTexCache.values()) t.dispose();
      windowTexCache.clear();
    };
  }, []);

  // ── Adaptation à tous les écrans : angle de caméra + échelle du décor ──
  const aspect =
    typeof window !== 'undefined' && window.innerHeight > 0
      ? window.innerWidth / window.innerHeight
      : 16 / 9;
  const portrait = aspect < 0.9;
  const ultraWide = aspect > 1.9;
  const fov = portrait ? 70 : ultraWide ? 57 : 62;
  const sceneScale = portrait ? 0.78 : ultraWide ? 1.08 : 1;

  if (import.meta.env.DEV) {
    setTimeout(() => console.info('PANOTIK_SCENE_MODE=' + (webglOk ? 'webgl' : 'fallback')), 0);
  }

  if (prefersReduced) return fallback;

  if (!webglOk) return fallback;

  return (
    <div className="absolute inset-0" aria-hidden="true">
      <SceneBoundary name="city" fallback={fallback}>
        <Canvas
          dpr={lite ? [1, 1] : [1, 1.5]}
          camera={{ position: INTRO_START, fov }}
          gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
        >
          <Env mode={mode} introRef={introRef} />
          <Suspense fallback={null}>
            {/* Le décor est mis à l'échelle autour du centre de la ville
                (z = -14) selon le format d'écran : le cadrage reste juste
                en portrait, paysage et ultra-large. */}
            <group position={[0, 0, -14]} scale={sceneScale}>
              <group position={[0, 0, 14]}>
                <NeonGround mode={mode} />
                <Holograms mode={mode} lite={lite} />
                <CityBuildings mode={mode} data={city} introRef={introRef} lite={lite} />
                <MediaWall lite={lite} />
                <BoulevardPanels mode={mode} lite={lite} />
                <StreetLights mode={mode} lite={lite} />
                <FlyingCars mode={mode} lite={lite} />
                {cfg.rain && <Rain mode={mode} lite={lite} />}
              </group>
            </group>
            {/* Post-traitement coupé sur petit écran ET machines faibles :
                énorme gain de perf, rendu direct de la scène */}
            {!lowPower && (
              <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.32} mipmapBlur intensity={cfg.bloom} />
                <Vignette eskil={false} offset={0.12} darkness={cfg.vignette} />
              </EffectComposer>
            )}
          </Suspense>
          <CameraRig introRef={introRef} started={started} />
        </Canvas>
      </SceneBoundary>
    </div>
  );
}