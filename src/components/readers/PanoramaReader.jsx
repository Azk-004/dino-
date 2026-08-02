import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blockTag, renderSegments } from "../../lib/reader.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

/* Une seule famille : l'ocre du panorama. Fini l'arc-en-ciel. */
const ACCENTS = ["#b08d2e", "#c9a64a", "#8a6d1f"];

const BOKEH = Array.from({ length: 9 }, (_, i) => ({
  left: `${(i * 41 + 13) % 100}%`,
  top: `${(i * 57 + 21) % 100}%`,
  size: 46 + ((i * 29) % 84),
  hue: [38, 42, 30, 45][i % 4],
  delay: `${(i % 7) * -2.4}s`,
}));

/**
 * UNIVERS 04 — PANORAMA (ocre).
 * On LIT le cours face à un belvédère sur la Ville : chaque bloc devient
 * une immense affiche dans le cadre du panorama. Un clic retourne
 * mécaniquement l'affiche vers le bloc suivant (flip 3D). La lecture se
 * fait au rythme du belvédère, comme si on visitait les affiches de la ville.
 */
export default function PanoramaReader({ blocks, rangesFor, speakingIdx, onMarkClick }) {
  const { theme } = useTheme();
  const day = theme === "day";
  const [idx, setIdx] = useState(0);
  const [visited, setVisited] = useState(() => new Set([0]));
  const [flipping, setFlipping] = useState(false);
  const wrapRef = useRef(null);

  /* Inclinaison 3D au curseur + clic pour retourner l'affiche */
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / Math.max(r.width, 1) - 0.5;
      const y = (e.clientY - r.top) / Math.max(r.height, 1) - 0.5;
      wrap.style.setProperty("--tilt-x", x.toFixed(3));
      wrap.style.setProperty("--tilt-y", y.toFixed(3));
    };
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) return;
      if (e.target && e.target.closest && e.target.closest("button, a, input, textarea, select, [role]")) return;
      const n = (idx + 1) % blocks.length;
      setFlipping(true);
      setVisited((v) => new Set(v).add(n));
      setIdx(n);
      setTimeout(() => setFlipping(false), 620);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [blocks.length, idx]);

  /* Suivi TTS : l'affiche se retourne vers le bloc en cours */
  useEffect(() => {
    if (speakingIdx == null || speakingIdx < 0 || speakingIdx >= blocks.length) return;
    setIdx(speakingIdx);
    setVisited((v) => new Set(v).add(speakingIdx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speakingIdx]);

  const go = (n) => {
    setFlipping(true);
    setIdx(((n % blocks.length) + blocks.length) % blocks.length);
    setVisited((v) => new Set(v).add(((n % blocks.length) + blocks.length) % blocks.length));
    setTimeout(() => setFlipping(false), 620);
  };

  const block = blocks[idx];
  const accent = ACCENTS[idx % ACCENTS.length];
  const textLen = block.text?.length ?? 0;
  const bodyFs =
    textLen > 320
      ? "clamp(0.78rem, 1.35vw, 1.05rem)"
      : textLen > 170
      ? "clamp(0.95rem, 1.7vw, 1.25rem)"
      : "clamp(1.15rem, 2.2vw, 1.6rem)";

  return (
    <div ref={wrapRef} className={`bb-reader ${day ? "day" : "night"}`} style={{ "--bb-accent": accent }}>
      {/* Bokeh de ville */}
      <div className="bb-bokeh">
        {BOKEH.map((b, i) => (
          <span
            key={i}
            className="bb-bokeh-dot"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              background: `radial-gradient(circle at 35% 35%, hsl(${b.hue} 45% 62% / 0.4), transparent 65%)`,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>

      {/* Silhouettes de ville */}
      <div className="bb-skyline">
        {Array.from({ length: 14 }, (_, i) => (
          <span
            key={i}
            style={{
              left: `${(i * 7.4 + 3) % 100}%`,
              height: `${22 + ((i * 37) % 60)}%`,
              width: `${3 + (i % 3) * 1.6}vw`,
              bottom: "0",
            }}
          />
        ))}
      </div>

      {/* Affiche géante du belvédère */}
      <div className="bb-board">
        <div className={`bb-board-frame${block.type === "steps" ? " tall" : ""}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              className={`bb-screen${flipping ? " flipping" : ""}`}
              initial={{ opacity: 0, rotateY: flipping ? -88 : 0, scaleY: flipping ? 0.5 : 1 }}
              animate={{ opacity: 1, rotateY: 0, scaleY: 1 }}
              exit={{ opacity: 0, rotateY: 88, scaleY: 0.5 }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            >
              <span className="bb-kicker mono">
                AFFICHE {String(idx + 1).padStart(2, "0")} · {blockTag(block).toUpperCase()}
              </span>

              {block.type === "h3" ? (
                <h2 className="bb-title" data-block={idx}>{block.text}</h2>
              ) : block.type === "steps" ? (
                <div className="bb-steps" data-block={idx}>
                  {block.items.map((s, k) => (
                    <div className="bb-step" key={s.n} style={{ "--bb-accent": ACCENTS[k % ACCENTS.length] }}>
                      <span className="bb-step-n mono">{s.n}</span>
                      <div className="bb-step-body">
                        <span className="bb-step-title mono">{s.title}</span>
                        <span className="bb-step-text">{renderSegments(s.text, rangesFor(idx), onMarkClick)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : block.type === "list" ? (
                <div className="bb-list" data-block={idx}>
                  {block.items.map((it, k) => (
                    <div className="bb-list-item" key={k}>
                      <span style={{ color: accent }}>▸</span>
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              ) : block.type === "quote" ? (
                <blockquote className="bb-quote" data-block={idx} style={{ "--bb-fs": bodyFs }}>
                  {renderSegments(block.text, rangesFor(idx), onMarkClick)}
                </blockquote>
              ) : block.type === "callout" ? (
                <div className="bb-callout" data-block={idx}>
                  <span className="bb-callout-title mono">{block.title || "À RETENIR"}</span>
                  <p className="bb-callout-text" style={{ "--bb-fs": bodyFs }}>
                    {renderSegments(block.text, rangesFor(idx), onMarkClick)}
                  </p>
                </div>
              ) : (
                <p className="bb-body" data-block={idx} style={{ "--bb-fs": bodyFs }}>
                  {renderSegments(block.text, rangesFor(idx), onMarkClick)}
                </p>
              )}

              <span className="bb-sub mono">PANNEAUTIQUE · LE MÉTIER QUI ÉCLAIRE LES VILLES</span>
              <div className="bb-sheen" />
            </motion.div>
          </AnimatePresence>

          {["tl", "tr", "bl", "br"].map((p) => (
            <span key={p} className={`bb-screw ${p}`} />
          ))}
        </div>
      </div>

      {/* Filmstrip + contrôles */}
      <div className="bb-controls mono">
        <button
          className="bb-arrow"
          onClick={(e) => {
            e.stopPropagation();
            go(idx - 1);
          }}
          aria-label="Affiche précédente"
        >
          ←
        </button>
        <div className="bb-film">
          {blocks.map((_, i) => (
            <span
              key={i}
              className={`bb-film-dot${i === idx ? " on" : ""}${visited.has(i) ? " seen" : ""}`}
              style={{ "--bb-accent": ACCENTS[i % ACCENTS.length] }}
            />
          ))}
        </div>
        <button
          className="bb-arrow"
          onClick={(e) => {
            e.stopPropagation();
            go(idx + 1);
          }}
          aria-label="Affiche suivante"
        >
          →
        </button>
      </div>
      <div className="bb-grain" />
      <div className="bb-vignette" />
      {speakingIdx != null && speakingIdx === idx && (
        <div className="bb-now mono">● LECTURE EN COURS — AFFICHE {String(idx + 1).padStart(2, "0")}</div>
      )}
    </div>
  );
}
