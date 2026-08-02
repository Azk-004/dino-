import { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshReflectorMaterial, Stars } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import { makeLessonTexture, makeWindowsTexture } from "../three/BillboardTexture.js";
import { blockTag, blockLines, renderSegments } from "../../lib/reader.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

/* Une seule famille : le terracotta du village. */
const ACCENTS = ["#b4552d", "#c96a3f", "#a34a26"];

/**
 * UNIVERS 01 — LE VILLAGE (terracotta).
 * On LIT le cours en traversant un village de panneaux : des maisons
 * bordent la rue, et chaque bloc du cours est imprimé SUR un grand
 * panneau posé devant sa façade. Au scroll, on marche dans le village,
 * le panneau qu'on croise s'allume ; le TTS lit la leçon à voix haute.
 * Sous la scène : le plan de masse (texte complet, TTS / surlignage).
 */

/* Facade texturée d'une maison du village */
function House({ position, rotationY = 0, scale = 1, windows, day }) {
  const tex = useMemo(() => windows, [windows]);
  return (
    <group position={position} rotation={[0, rotationY, 0]} scale={scale}>
      {/* corps */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[3.2, 3.6, 2.6]} />
        <meshPhysicalMaterial
          map={day ? null : tex}
          emissiveMap={day ? null : tex}
          emissive={day ? "#000000" : "#ffd9a0"}
          emissiveIntensity={day ? 0 : 0.85}
          color={day ? "#d9c9a6" : "#2a2217"}
          roughness={0.95}
        />
      </mesh>
      {/* toit */}
      <mesh position={[0, 4.05, 0]} rotation={[0, 0, 0]}>
        <coneGeometry args={[2.7, 1.5, 4]} />
        <meshStandardMaterial color={day ? "#b4652f" : "#4a2f1a"} roughness={0.85} />
      </mesh>
      {/* porte */}
      <mesh position={[0, 0.75, 1.31]}>
        <boxGeometry args={[0.7, 1.5, 0.06]} />
        <meshStandardMaterial color={day ? "#7c4a24" : "#3a2514"} />
      </mesh>
      {/* liseré d'accent */}
      <mesh position={[0, 0.14, 1.32]}>
        <boxGeometry args={[3.3, 0.14, 0.08]} />
        <meshBasicMaterial color="#b4552d" toneMapped={false} />
      </mesh>
    </group>
  );
}

/* Panneau de cours posé dans la rue du village */
function LessonPanel({ position, rotationY, block, accent, active, day }) {
  const texture = useMemo(
    () =>
      makeLessonTexture({
        title:
          block.type === "h3" || block.type === "quote"
            ? block.text
            : block.type === "callout"
            ? block.title || "À RETENIR"
            : blockTag(block),
        tag: block.type === "h3" ? "SECTION" : `VILLAGE · ${blockTag(block)}`,
        lines: blockLines(block, 3),
        accent,
        day,
      }),
    [block, accent, day]
  );
  const screenRef = useRef(null);

  useEffect(() => {
    if (screenRef.current) screenRef.current.emissiveIntensity = active ? 1.7 : 0.75;
  }, [active]);

  return (
    <group position={position} rotation={[0, rotationY, 0]}>
      {/* pieds */}
      <mesh position={[0, -2.2, 0]}>
        <boxGeometry args={[0.16, 4.4, 0.16]} />
        <meshPhysicalMaterial color="#3a2f22" metalness={0.85} roughness={0.4} clearcoat={0.6} clearcoatRoughness={0.45} envMapIntensity={1.2} />
      </mesh>
      <mesh position={[0, -4.5, 0]}>
        <boxGeometry args={[2.0, 0.24, 1.5]} />
        <meshPhysicalMaterial color="#2e251b" metalness={0.8} roughness={0.5} clearcoat={0.5} clearcoatRoughness={0.55} envMapIntensity={1.1} />
      </mesh>
      {/* panneau */}
      <mesh position={[0, 0.3, 0]}>
        <boxGeometry args={[4.6, 3.0, 0.16]} />
        <meshPhysicalMaterial color={day ? "#cbb38c" : "#4a3c29"} metalness={0.9} roughness={0.3} clearcoat={0.9} clearcoatRoughness={0.25} envMapIntensity={1.4} />
      </mesh>
      <mesh position={[0, 0.3, 0.09]}>
        <planeGeometry args={[4.4, 2.8]} />
        <meshStandardMaterial
          ref={screenRef}
          map={texture}
          emissiveMap={texture}
          emissive="#ffffff"
          emissiveIntensity={1.0}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, -1.2, 0.11]}>
        <boxGeometry args={[4.5, 0.05, 0.03]} />
        <meshBasicMaterial color={accent} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* Caméra qui descend la rue du village au scroll */
function DriveCam({ progressRef }) {
  useFrame((state, delta) => {
    const p = Math.min(Math.max(progressRef.current ?? 0, 0), 1);
    const e = 1 - Math.pow(1 - p, 1.6);
    const cam = state.camera;
    const t = state.clock.elapsedTime;
    const sway = Math.sin(t * 0.4) * 0.3;
    const targetZ = 15 - e * 78;
    cam.position.z += (targetZ - cam.position.z) * Math.min(delta * 2.4, 1);
    cam.position.x += (Math.sin(e * Math.PI) * 1.6 + sway - cam.position.x) * Math.min(delta * 2.4, 1);
    cam.position.y += (3.4 - e * 1.2 - cam.position.y) * Math.min(delta * 2.4, 1);
    cam.lookAt(0, 2.1, cam.position.z - 30);
  });
  return null;
}

const LAYOUT = [
  { side: -1, z: -8, y: 0.5, rot: 0.3 },
  { side: 1, z: -17, y: 1.0, rot: -0.3 },
  { side: -1, z: -26, y: 0.5, rot: 0.3 },
  { side: 1, z: -35, y: 1.1, rot: -0.32 },
  { side: -1, z: -44, y: 0.6, rot: 0.28 },
  { side: 1, z: -53, y: 0.9, rot: -0.3 },
  { side: -1, z: -62, y: 0.5, rot: 0.31 },
  { side: 1, z: -71, y: 1.0, rot: -0.29 },
];

/* Maisons qui bordent la rue (une par panneau, plus loin en arrière-plan) */
const HOUSE_LAYOUT = [
  { side: -1, z: -4, rot: 0.06, s: 0.9 },
  { side: 1, z: -12, rot: -0.05, s: 1.0 },
  { side: -1, z: -20, rot: 0.05, s: 1.1 },
  { side: 1, z: -28, rot: -0.06, s: 0.95 },
  { side: -1, z: -37, rot: 0.07, s: 1.05 },
  { side: 1, z: -46, rot: -0.05, s: 1.0 },
  { side: -1, z: -55, rot: 0.06, s: 0.9 },
  { side: 1, z: -64, rot: -0.06, s: 1.1 },
  { side: -1, z: -73, rot: 0.05, s: 1.0 },
];

export default function AtelierReader({ blocks, rangesFor, speakingIdx, onMarkClick }) {
  const { theme } = useTheme();
  const day = theme === "day";
  const stageRef = useRef(null);
  const progressRef = useRef(0);
  const pctRef = useRef(null);
  const [cur, setCur] = useState(0);
  const [transcript, setTranscript] = useState(true);
  const windowsTex = useMemo(() => makeWindowsTexture(), []);

  /* Progression au scroll + panneau courant */
  useEffect(() => {
    const onScroll = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const zone = Math.max(rect.height, 1);
      const vh = window.innerHeight;
      const raw = 1 - (rect.top + rect.height * 0.45) / (vh + zone);
      const p = Math.min(Math.max(raw, 0), 1);
      progressRef.current = p;
      if (pctRef.current) pctRef.current.textContent = Math.round(p * 100);
      const idx = Math.min(blocks.length - 1, Math.floor(p * Math.max(blocks.length, 1)));
      setCur((c) => (c === idx ? c : idx));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [blocks.length]);

  return (
    <div className="bv-reader" data-day={day ? "1" : "0"}>
      <div className="bv-stage" ref={stageRef}>
        <Canvas
          dpr={[1, 1.6]}
          gl={{ antialias: true, powerPreference: "high-performance", toneMappingExposure: 1.12 }}
          camera={{ fov: 58, near: 0.1, far: 300, position: [0, 3.4, 15] }}
        >
          <fog attach="fog" args={[day ? "#e6dcc6" : "#1a1510", 24, 130]} />
          <ambientLight intensity={day ? 1.15 : 0.14} />
          <directionalLight position={[20, 8, -30]} intensity={day ? 2.1 : 0.16} color={day ? "#ffe9c9" : "#d9a05e"} />

          {/* Sol */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -45]}>
            <planeGeometry args={[180, 140]} />
            <meshStandardMaterial color={day ? "#d9ccab" : "#1c1710"} roughness={1} />
          </mesh>

          {/* Chaussée du village */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -44]}>
            <planeGeometry args={[9.6, 130]} />
            <MeshReflectorMaterial
              blur={[220, 70]}
              resolution={512}
              mixBlur={0.9}
              mixStrength={0.9}
              roughness={0.6}
              depthScale={1}
              minDepthThreshold={0.4}
              maxDepthThreshold={1.4}
              color={day ? "#c4b28e" : "#221b13"}
              metalness={0.2}
              mirror={0.35}
            />
          </mesh>

          {/* Ligne médiane */}
          {Array.from({ length: 16 }).map((_, i) => (
            <mesh key={i} position={[0, 0.02, -4 - i * 8.4]}>
              <boxGeometry args={[0.16, 0.02, 2.4]} />
              <meshBasicMaterial color={day ? "#8a6d4a" : "#c9a86a"} toneMapped={false} />
            </mesh>
          ))}

          {/* Maisons du village */}
          {HOUSE_LAYOUT.map((h, i) => (
            <House
              key={i}
              position={[h.side * 8.6, 0, h.z]}
              rotationY={h.rot * h.side}
              scale={h.s}
              windows={windowsTex}
              day={day}
            />
          ))}

          {/* Panneaux du cours */}
          {blocks.slice(0, 8).map((block, i) => {
            const p = LAYOUT[i % LAYOUT.length];
            return (
              <LessonPanel
                key={i}
                position={[p.side * 5.6, p.y, p.z]}
                rotationY={p.side * p.rot}
                block={block}
                accent={ACCENTS[i % ACCENTS.length]}
                active={i === cur}
                day={day}
              />
            );
          })}

          {/* Lampadaires chauds */}
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
            <group key={i} position={[i % 2 === 0 ? -4.2 : 4.2, 0, -5 - i * 9]}>
              <mesh position={[0, 3, 0]}>
                <cylinderGeometry args={[0.08, 0.12, 6, 10]} />
                <meshPhysicalMaterial color="#3a2f22" metalness={0.8} roughness={0.45} envMapIntensity={1.1} />
              </mesh>
              <mesh position={[0, 6, 0]}>
                <sphereGeometry args={[0.18, 12, 12]} />
                <meshStandardMaterial
                  color="#ffe3b0"
                  emissive="#ffcf8e"
                  emissiveIntensity={day ? 0.5 : 3.6}
                  toneMapped={false}
                />
              </mesh>
              {!day && <pointLight position={[0, 6, 0]} intensity={1.0} distance={14} color="#ffcf8e" />}
            </group>
          ))}

          {!day && <Stars radius={120} depth={60} count={1400} factor={4} saturation={0} fade speed={0.4} />}
          <DriveCam progressRef={progressRef} />

          <EffectComposer multisampling={0}>
            <Bloom intensity={day ? 0.28 : 0.6} luminanceThreshold={0.72} luminanceSmoothing={0.6} mipmapBlur radius={0.7} />
            <Vignette eskil={false} offset={0.3} darkness={day ? 0.24 : 0.45} />
          </EffectComposer>
        </Canvas>

        <div className="bv-hud mono">
          <span>VILLAGE {String(cur + 1).padStart(2, "0")}/{String(blocks.length).padStart(2, "0")}</span>
          <span className="bv-hud-pct" ref={pctRef}>0</span>
        </div>
        <div className="bv-rail">
          {blocks.slice(0, 8).map((_, i) => (
            <span key={i} className={`bv-rail-stop${i === cur ? " on" : ""}${i < cur ? " passed" : ""}`} />
          ))}
        </div>
        <button className="bv-toggle mono" onClick={() => setTranscript((v) => !v)}>
          {transcript ? "MASQUER" : "PLAN DE MASSE"}
        </button>
      </div>

      {/* Plan de masse : le texte complet du cours */}
      {transcript && (
        <div className="bv-route">
          <div className="bv-route-head mono">
            <span>PLAN DE MASSE — {blocks.length} ÉTAPES</span>
            <span>MODULE 1 · DOMAINE PUBLIC</span>
          </div>
          {blocks.map((block, i) => (
            <div
              key={i}
              className={`bv-stop${speakingIdx === i ? " speaking" : ""}${i === cur ? " at" : ""}`}
            >
              <div className="bv-stop-rail">
                <span className="bv-stop-num mono">{String(i + 1).padStart(2, "0")}</span>
                <span className="bv-stop-line" />
              </div>
              <div className="bv-stop-body">
                <span className="bv-stop-tag mono">{blockTag(block)}</span>
                <div data-block={i}>
                  {block.type === "h3" ? (
                    <h3 className="block-h3">{block.text}</h3>
                  ) : block.type === "list" ? (
                    <ul className="block-list">
                      {block.items.map((it, k) => (
                        <li key={k}>{it}</li>
                      ))}
                    </ul>
                  ) : block.type === "steps" ? (
                    <div className="step-blocks">
                      {block.items.map((s, k) => (
                        <div className="step-item" key={s.n} style={{ "--step-accent": ACCENTS[k % ACCENTS.length] }}>
                          <span className="step-item-n mono">{s.n}</span>
                          <div>
                            <h4>{s.title}</h4>
                            <p>{renderSegments(s.text, rangesFor(i), onMarkClick)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : block.type === "quote" ? (
                    <blockquote className="block-quote">{renderSegments(block.text, rangesFor(i), onMarkClick)}</blockquote>
                  ) : block.type === "callout" ? (
                    <div className="block-callout">
                      <span className="callout-bar" />
                      <div>
                        <span className="callout-title mono">{block.title || "À RETENIR"}</span>
                        <p>{renderSegments(block.text, rangesFor(i), onMarkClick)}</p>
                      </div>
                    </div>
                  ) : (
                    <p>{renderSegments(block.text, rangesFor(i), onMarkClick)}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
