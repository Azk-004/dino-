import { useMemo, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { makeBillboardTexture } from "./BillboardTexture.js";
import { ADS } from "./ads.js";

/* Cache de textures partagé entre tous les panneaux :
 * 7 panneaux × 7 affiches = 49 canvas sinon — ici seulement les uniques. */
const textureCache = new Map();
function getTexture(ad) {
  const key = `${ad.label}|${ad.sub}|${ad.accent}`;
  if (!textureCache.has(key)) {
    textureCache.set(key, makeBillboardTexture(ad.label, ad.sub, ad.accent));
  }
  return textureCache.get(key);
}

/**
 * Panneau publicitaire "façon C4D" :
 *  - cadre métallique MeshPhysicalMaterial (clearcoat + reflets studio)
 *  - bascule mécanique au passage de la caméra (effet panneau déroulant)
 *  - signalétique numérique : l'affiche change toutes les ~5 s (flip mécanique),
 *    décalée d'un panneau à l'autre pour un boulevard vivant
 *  - léger hochement (breathing) permanent
 */
export function Billboard({ label, sub, accent, position, rotationY = 0, w = 3.4, h = 2.1, progressRef }) {
  // Séquence d'affiches de la signalétique numérique : la première est
  // teintée par l'univers actif, les 6 suivantes viennent de la séquence
  // partagée (ads.js) — aucune donnée dupliquée.
  const ads = useMemo(() => [{ label, sub, accent }, ...ADS.slice(1)], [label, sub, accent]);

  const textures = useMemo(() => ads.map(getTexture), [ads]);

  const group = useRef(null);
  const screenRef = useRef(null);
  const baseRot = rotationY;
  const [adIdx, setAdIdx] = useState(() => Math.abs(position[2]) % ads.length);
  const flipping = useRef(false);
  const flipTimer = useRef(null);

  const zPos = position[2]; // stable : position est un tableau neuf à chaque render

  // Cycle des affiches toutes les 5 s, décalé par panneau (position.z)
  useEffect(() => {
    const delay = 5000 + Math.abs(zPos) * 130;
    const timer = setInterval(() => {
      flipping.current = true;
      setAdIdx((i) => (i + 1) % ads.length);
      flipTimer.current = setTimeout(() => (flipping.current = false), 900);
    }, delay);
    return () => {
      clearInterval(timer);
      if (flipTimer.current) clearTimeout(flipTimer.current);
    };
  }, [ads.length, zPos]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    const t = state.clock.elapsedTime;

    // Bascule mécanique : quand la caméra passe devant, le panneau
    // pivote brièvement face à elle puis repart (effet flip).
    if (progressRef) {
      const p = Math.min(Math.max(progressRef.current ?? 0, 0), 1);
      const e = 1 - Math.pow(1 - p, 1.6);
      const camZ = 13 - e * 62;
      const z = position[2];
      const dist = Math.abs(camZ - z);
      const flip = Math.exp(-((dist - 4) * (dist - 4)) / 60);
      g.rotation.y = baseRot + (flip > 0.02 ? Math.sin(flip * Math.PI) * 0.55 : 0);
    }

    // Flip mécanique de l'affiche : seule l'ÉCRAN se compresse/re-déploie,
    // jamais le pied ni le cadre (scale sur le mesh écran, pas le groupe).
    const scr = screenRef.current;
    if (scr) {
      if (flipping.current) {
        const k = 0.12 + 0.88 * Math.abs(Math.sin(t * 9));
        scr.scale.y = k;
        scr.scale.z = 1 + (1 - k) * 0.5;
      } else {
        scr.scale.y += (1 - scr.scale.y) * 0.12;
        scr.scale.z += (1 - scr.scale.z) * 0.12;
      }
    }

    // Respiration légère permanente (micro-mouvement organique)
    g.position.y = position[1] + Math.sin(t * 0.7 + position[2]) * 0.02;
  });

  const current = ads[adIdx];

  return (
    <group ref={group} position={position} rotation={[0, rotationY, 0]}>
      {/* Pied */}
      <mesh position={[0, -2.6, 0]} castShadow>
        <boxGeometry args={[0.16, 4.8, 0.16]} />
        <meshPhysicalMaterial color="#2a2115" metalness={0.9} roughness={0.35} clearcoat={0.6} clearcoatRoughness={0.4} envMapIntensity={1.4} />
      </mesh>
      {/* Socle */}
      <mesh position={[0, -4.9, 0]}>
        <boxGeometry args={[1.6, 0.22, 1.4]} />
        <meshPhysicalMaterial color="#221a10" metalness={0.85} roughness={0.45} clearcoat={0.5} clearcoatRoughness={0.5} envMapIntensity={1.3} />
      </mesh>
      {/* Cadre métallique brossé — reflets studio */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[w + 0.2, h + 0.2, 0.14]} />
        <meshPhysicalMaterial
          color="#3a2f1f"
          metalness={0.95}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.18}
          envMapIntensity={1.8}
        />
      </mesh>
      {/* Écran émissif — l'intensité est pilotée par l'Atmosphère (jour/nuit) */}
      <mesh
        ref={screenRef}
        userData={{ screen: true, baseIntensity: 1.8 }}
        position={[0, 0.2, 0.09]}
      >
        <planeGeometry args={[w, h]} />
        <meshStandardMaterial
          map={textures[adIdx]}
          emissiveMap={textures[adIdx]}
          emissive="#ffffff"
          emissiveIntensity={1.8}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
