import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blockTag, blockTitle, renderSegments } from "../../lib/reader.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

const GREEN = "#3ddc84";

/* Typewriter : révèle progressivement le texte d'un bloc (2-3 car/frame). */
function useTypewriter(text, playing) {
  const [count, setCount] = useState(0);
  const speed = text.length > 380 ? 3 : text.length > 160 ? 2 : 1;
  useEffect(() => {
    setCount(0);
    if (!playing) return;
    const iv = setInterval(() => {
      setCount((c) => {
        if (c >= text.length) {
          clearInterval(iv);
          return c;
        }
        return c + speed;
      });
    }, 14);
    return () => clearInterval(iv);
  }, [text, playing, speed]);
  return Math.min(count, text.length);
}

/* Impression d'un bloc dans le terminal (avec surlignage quand terminé). */
function TypeBlock({ block, typed, rangesFor, onMarkClick, idx }) {
  const done = typed >= blockText(block).length;
  const cur = !done && <span className="tm-cursor" />;
  if (block.type === "h3") {
    return <h3 className="tm-h3" data-block={idx}>{blockText(block).slice(0, typed)}{cur}</h3>;
  }
  if (block.type === "list") {
    return (
      <ul className="tm-list" data-block={idx}>
        {block.items.map((it, k) => {
          if (!done && k * 4 >= typed) return null;
          const slice = done ? it : it.slice(0, Math.max(0, typed - k * 4));
          return (
            <li key={k}>
              <span style={{ color: GREEN }}>▸ </span>{slice}{!done && k === Math.min(Math.floor(typed / 4), block.items.length - 1) && <span className="tm-cursor" />}
            </li>
          );
        })}
      </ul>
    );
  }
  if (block.type === "steps") {
    if (done) {
      return (
        <div className="tm-steps" data-block={idx}>
          {block.items.map((s, k) => (
            <div className="tm-step" key={s.n}>
              <span className="tm-step-n mono">{s.n}</span>
              <span className="tm-step-txt">
                <span className="tm-step-title">{s.title} — </span>
                {renderSegments(s.text, rangesFor(idx), onMarkClick)}
              </span>
            </div>
          ))}
        </div>
      );
    }
    const per = Math.max(1, Math.floor(typed / block.items.length));
    return (
      <div className="tm-steps" data-block={idx}>
        {block.items.map((s, k) => {
          if (k > Math.floor(typed / block.items.length)) return null;
          const txt = `${s.title}. ${s.text}`;
          const slice = k < Math.floor(typed / block.items.length) ? txt : txt.slice(0, per * 4);
          const done2 = k < Math.floor(typed / block.items.length);
          return (
            <div className="tm-step" key={s.n}>
              <span className="tm-step-n mono">{s.n}</span>
              <span className="tm-step-txt">
                {slice}{!done2 && <span className="tm-cursor" />}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  if (block.type === "quote") {
    return (
      <blockquote className="tm-quote" data-block={idx}>
        {done ? renderSegments(block.text, rangesFor(idx), onMarkClick) : blockText(block).slice(0, typed)}
        {cur}
      </blockquote>
    );
  }
  if (block.type === "callout") {
    const t = blockText(block);
    return (
      <div className="tm-callout" data-block={idx}>
        <span className="tm-callout-title mono">[ {block.title || "À RETENIR"} ]</span>
        <p>{done ? renderSegments(block.text, rangesFor(idx), onMarkClick) : t.slice(0, typed)}{cur}</p>
      </div>
    );
  }
  const t = blockText(block);
  return (
    <p className="tm-p" data-block={idx}>
      {done ? renderSegments(block.text, rangesFor(idx), onMarkClick) : t.slice(0, typed)}
      {cur}
    </p>
  );
}

const blockText = (b) =>
  b.type === "steps" ? b.items.map((it) => `${it.title}. ${it.text}`).join(" ") : b.type === "list" ? b.items.join(" ") : b.text || "";

const BOOT = [
  "PANNEAUTIQUE.EXE — FORMATION MODULE 1",
  "BIOS MEMORY CHECK ....... 640K OK",
  "CHARGEMENT DU COURS ....... OK",
  "DOSSIERS DETECTES: ",
];

/**
 * UNIVERS 05 — TERMINAL IBM (phosphore vert).
 * On LIT le cours comme sur un vieux mainframe : chaque bloc s'imprime
 * caractère par caractère sur l'écran phosphore, dossier par dossier.
 * Navigation au clavier ← →, ou en cliquant un dossier de la liste.
 */
export default function TerminalReader({ blocks, rangesFor, speakingIdx, onMarkClick }) {
  const { theme } = useTheme();
  const day = theme === "day";
  const [idx, setIdx] = useState(0);
  const [visited, setVisited] = useState(() => new Set([0]));
  const [clock, setClock] = useState("00:00:00");
  const [typing, setTyping] = useState(true);
  const listRef = useRef(null);

  const block = blocks[idx];
  const text = blockText(block);
  const typed = useTypewriter(text, typing);

  const go = (n) => {
    const next = ((n % blocks.length) + blocks.length) % blocks.length;
    setTyping(false);
    setIdx(next);
    setVisited((v) => new Set(v).add(next));
    setTimeout(() => setTyping(true), 40);
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

  /* Navigation clavier */
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "Enter") {
        e.preventDefault();
        go(idx + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        go(idx - 1);
      } else if (e.key === " ") {
        // Espace = « imprimer le dossier suivant » SANS voler le scroll de page
        e.preventDefault();
        go(idx + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, blocks.length]);

  /* Suivi TTS : le dossier en lecture s'imprime */
  useEffect(() => {
    if (speakingIdx == null || speakingIdx < 0 || speakingIdx >= blocks.length) return;
    setTyping(false);
    setIdx(speakingIdx);
    setVisited((v) => new Set(v).add(speakingIdx));
    setTimeout(() => setTyping(true), 40);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speakingIdx]);

  /* Défiler la liste de dossiers vers l'actif */
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const el = list.children[idx];
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [idx]);

  return (
    <div className="tm-reader" data-day={day ? "1" : "0"} style={{ "--tm-green": GREEN }}>
      {/* Bandeau système */}
      <div className="tm-top mono">
        <span className="tm-led-group">
          <span className="tm-led" />
          IBM 5150 · PANNEAUTIQUE.EXE
        </span>
        <span className="tm-top-right">
          <span className="tm-ver">SYSTEM v2.4</span>
          <span className="tm-clock">{clock}</span>
        </span>
      </div>

      <div className="tm-console">
        {/* Écran principal */}
        <div className="tm-screen">
          {/* séquence de boot (une fois par leçon) */}
          <div className="tm-boot mono">
            {BOOT.map((l, i) => (
              <div key={i} className="tm-boot-line">
                {l}
                {i === BOOT.length - 1 && <span className="tm-boot-count">{[blocks.length]}</span>}
              </div>
            ))}
          </div>

          {/* en-tête du dossier en cours */}
          <div className="tm-head mono">
            <span className="tm-prompt">&gt;</span>
            <span>TYPE DOSSIER-{String(idx + 1).padStart(2, "0")}.TXT — {blockTag(block).toUpperCase()}</span>
          </div>

          {/* corps tapé */}
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              className={`tm-body${speakingIdx === idx ? " speaking" : ""}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <TypeBlock block={block} typed={typed} rangesFor={rangesFor} onMarkClick={onMarkClick} idx={idx} />
            </motion.div>
          </AnimatePresence>

          <div className="tm-scanline" />
        </div>

        {/* Liste des dossiers */}
        <aside className="tm-files">
          <div className="tm-files-head mono">
            <span>DOSSIERS</span>
            <span>{visited.size}/{blocks.length}</span>
          </div>
          <div className="tm-files-list mono" ref={listRef}>
            {blocks.map((b, i) => {
              const active = i === idx;
              const seen = visited.has(i);
              const speaking = speakingIdx === i;
              return (
                <button
                  key={i}
                  className={`tm-file${active ? " active" : ""}${seen ? " seen" : ""}${speaking ? " speaking" : ""}`}
                  onClick={() => go(i)}
                >
                  <span className="tm-file-led" />
                  <span className="tm-file-name">{blockTitle(b).slice(0, 24)}{blockTitle(b).length > 24 ? "…" : ""}</span>
                  <span className="tm-file-state">{active ? "▸" : seen ? "✓" : ""}</span>
                </button>
              );
            })}
          </div>
        </aside>
      </div>

      {/* Ligne de commande */}
      <div className="tm-command mono">
        <span className="tm-prompt">C:\PANNEAUTIQUE&gt;</span>
        <span className="tm-cmd">TYPE DOSSIER-{String(idx + 1).padStart(2, "0")}.TXT</span>
        <span className="tm-cursor-block" />
        <span className="tm-hint">← → IMPRIMER · ESPACE SUIVANT</span>
      </div>

      <div className="tm-glow" />
    </div>
  );
}
