import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blockTag, renderSegments, blockTitle } from "../../lib/reader.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

/* Une seule couleur : le bordeaux des archives. Fini l'arc-en-ciel. */
const ACCENTS = ["#7a2f33"];

/**
 * UNIVERS 02 — ARCHIVES DU MÉTIER (bordeaux).
 * On LIT le cours comme on consulte un registre officiel : un dossier
 * s'ouvre à la fois (le bloc en cours), une liasse de dossiers sur la
 * droite (état de chaque bloc), une ligne de commande en bas.
 * Navigation au clavier ← →, ou en cliquant un dossier de la liasse.
 */
export default function ArchivesReader({ blocks, rangesFor, speakingIdx, onMarkClick }) {
  const { theme } = useTheme();
  const day = theme === "day";
  const [idx, setIdx] = useState(0);
  const [visited, setVisited] = useState(() => new Set([0]));
  const [clock, setClock] = useState("00:00:00");
  const rackRef = useRef(null);

  const go = (n) => {
    const next = ((n % blocks.length) + blocks.length) % blocks.length;
    setIdx(next);
    setVisited((v) => new Set(v).add(next));
  };

  /* Horloge système */
  useEffect(() => {
    const fmt = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const d = new Date();
      setClock(`${fmt(d.getHours())}:${fmt(d.getMinutes())}:${fmt(d.getSeconds())}`);
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  /* Navigation clavier (← → seulement, pas Espace pour ne pas voler le scroll) */
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        go(idx + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        go(idx - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, blocks.length]);

  /* Suivi TTS : le dossier lu s'affiche sur l'écran principal */
  useEffect(() => {
    if (speakingIdx == null || speakingIdx < 0 || speakingIdx >= blocks.length) return;
    setIdx(speakingIdx);
    setVisited((v) => new Set(v).add(speakingIdx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speakingIdx]);

  /* Défiler la liasse vers le dossier actif */
  useEffect(() => {
    const rack = rackRef.current;
    if (!rack) return;
    const el = rack.children[idx];
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [idx]);

  const block = blocks[idx];
  const accent = ACCENTS[idx % ACCENTS.length];

  return (
    <div className="ct-reader" data-day={day ? "1" : "0"} style={{ "--ct-accent": accent }}>
      {/* Bandeau registre */}
      <div className="ct-session mono">
        <span className="ct-session-live">
          <span className="ct-led" />
          REGISTRE OUVERT
        </span>
        <span className="ct-session-clock">{clock}</span>
      </div>

      <div className="ct-console">
        {/* Dossier ouvert */}
        <div className="ct-screen">
          <span className="ct-corner tl" />
          <span className="ct-corner tr" />
          <span className="ct-corner bl" />
          <span className="ct-corner br" />

          <div className="ct-screen-head mono">
            <span>DOSSIER {String(idx + 1).padStart(2, "0")} / {String(blocks.length).padStart(2, "0")} · {blockTag(block).toUpperCase()}</span>
            <span className="ct-screen-bloc">
              <span className="ct-cursor" />
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              className="ct-screen-body"
              data-block={idx}
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -14, filter: "blur(4px)" }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {block.type === "h3" ? (
                <h3 className="ct-h3">{block.text}<span className="ct-cursor" /></h3>
              ) : block.type === "list" ? (
                <ul className="ct-list">
                  {block.items.map((it, k) => (
                    <li key={k}>{it}</li>
                  ))}
                </ul>
              ) : block.type === "steps" ? (
                <div className="ct-steps">
                  {block.items.map((s, k) => (
                    <div className="ct-step" key={s.n} style={{ "--ct-accent": ACCENTS[k % ACCENTS.length] }}>
                      <span className="ct-step-n mono">{s.n}</span>
                      <div>
                        <h4>{s.title}</h4>
                        <p>{renderSegments(s.text, rangesFor(idx), onMarkClick)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : block.type === "quote" ? (
                <blockquote className="ct-quote">{renderSegments(block.text, rangesFor(idx), onMarkClick)}</blockquote>
              ) : block.type === "callout" ? (
                <div className="ct-callout">
                  <span className="ct-callout-title mono">{block.title || "À RETENIR"}</span>
                  <p className="ct-callout-text">{renderSegments(block.text, rangesFor(idx), onMarkClick)}</p>
                </div>
              ) : (
                <p className="ct-p">{renderSegments(block.text, rangesFor(idx), onMarkClick)}</p>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="ct-scanline" />
        </div>

        {/* Liasse de dossiers */}
        <aside className="ct-rack">
          <div className="ct-rack-head mono">
            <span>DOSSIERS</span>
            <span>{visited.size}/{blocks.length} LUS</span>
          </div>
          <div className="ct-rack-list" ref={rackRef}>
            {blocks.map((b, i) => {
              const active = i === idx;
              const seen = visited.has(i);
              const speaking = speakingIdx === i;
              return (
                <button
                  key={i}
                  className={`ct-mod${active ? " active" : ""}${seen ? " seen" : ""}${speaking ? " speaking" : ""}`}
                  onClick={() => go(i)}
                  style={{ "--ct-accent": ACCENTS[i % ACCENTS.length] }}
                >
                  <span className="ct-mod-led" />
                  <span className="ct-mod-num mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="ct-mod-tag">{blockTitle(b).slice(0, 26)}{blockTitle(b).length > 26 ? "…" : ""}</span>
                  <span className="ct-mod-state mono">{active ? "▸" : seen ? "✓" : ""}</span>
                </button>
              );
            })}
          </div>
        </aside>
      </div>

      {/* Ligne de commande */}
      <div className="ct-command mono">
        <span className="ct-prompt">&gt;</span>
        <span className="ct-cmd">CONSULTER DOSSIER {String(idx + 1).padStart(2, "0")} — {blockTag(block).toUpperCase()}</span>
        <span className="ct-cursor" />
        <span className="ct-hint">← → NAVIGUER</span>
      </div>
    </div>
  );
}
