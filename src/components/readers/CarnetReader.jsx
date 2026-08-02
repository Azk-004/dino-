import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blockTag, blockTitle, renderSegments } from "../../lib/reader.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

const ACCENTS = ["#4a5cb8", "#5a6fd8", "#39489e"];

/* ------------------------------------------------------------------ */
/* Illustration procédurale par type de bloc (SVG)                     */
/* ------------------------------------------------------------------ */
function BlockIllustration({ block, accent }) {
  const common = { viewBox: "0 0 320 240", className: "cn-illus-svg" };
  if (block.type === "h3") {
    return (
      <svg {...common} role="img" aria-label="Section">
        <rect x="20" y="20" width="280" height="200" rx="14" fill="none" stroke={accent} strokeWidth="3" />
        <line x1="20" y1="58" x2="300" y2="58" stroke={accent} strokeWidth="2" opacity="0.5" />
        <rect x="40" y="90" width="240" height="26" rx="6" fill={accent} opacity="0.85" />
        <rect x="60" y="140" width="180" height="14" rx="7" fill={accent} opacity="0.45" />
        <rect x="60" y="168" width="140" height="14" rx="7" fill={accent} opacity="0.3" />
      </svg>
    );
  }
  if (block.type === "list") {
    return (
      <svg {...common} role="img" aria-label="Liste">
        <rect x="20" y="20" width="280" height="200" rx="14" fill="none" stroke={accent} strokeWidth="3" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="44" y={44 + i * 40} width="18" height="18" rx="5" fill={accent} opacity={0.85 - i * 0.15} />
            <rect x="78" y={48 + i * 40} width="150" height="10" rx="5" fill={accent} opacity={0.5 - i * 0.1} />
          </g>
        ))}
      </svg>
    );
  }
  if (block.type === "steps") {
    return (
      <svg {...common} role="img" aria-label="Étapes">
        <rect x="20" y="20" width="280" height="200" rx="14" fill="none" stroke={accent} strokeWidth="3" />
        <path d="M60 190 L60 130 L110 130 L110 90 L160 90 L160 60" fill="none" stroke={accent} strokeWidth="5" strokeLinecap="round" />
        {block.items.slice(0, 4).map((s, i) => (
          <g key={s.n}>
            <circle cx={60 + i * 50} cy={190 - i * 30} r="16" fill={accent} opacity={0.9} />
            <text x={60 + i * 50} y={196 - i * 30} textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff">
              {s.n}
            </text>
          </g>
        ))}
      </svg>
    );
  }
  if (block.type === "quote") {
    return (
      <svg {...common} role="img" aria-label="Citation">
        <rect x="20" y="20" width="280" height="200" rx="14" fill="none" stroke={accent} strokeWidth="3" />
        <text x="52" y="120" fontSize="110" fontWeight="900" fill={accent} opacity="0.85">“</text>
        <line x1="120" y1="90" x2="270" y2="90" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.7" />
        <line x1="120" y1="120" x2="250" y2="120" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.45" />
        <line x1="120" y1="150" x2="230" y2="150" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity="0.25" />
      </svg>
    );
  }
  if (block.type === "callout") {
    return (
      <svg {...common} role="img" aria-label="À retenir">
        <rect x="20" y="20" width="280" height="200" rx="14" fill="none" stroke={accent} strokeWidth="3" />
        <g transform="rotate(-8 160 120)">
          <rect x="52" y="86" width="216" height="68" rx="12" fill={accent} opacity="0.9" stroke="#fff" strokeWidth="3" />
          <text x="160" y="120" textAnchor="middle" fontSize="20" fontWeight="900" fill="#fff" letterSpacing="2">
            À RETENIR
          </text>
        </g>
        <circle cx="270" cy="46" r="22" fill="none" stroke={accent} strokeWidth="4" opacity="0.6" />
        <text x="270" y="53" textAnchor="middle" fontSize="18" fill={accent} fontWeight="800" opacity="0.7">!</text>
      </svg>
    );
  }
  /* paragraphe par défaut → panneau publicitaire */
  return (
    <svg {...common} role="img" aria-label="Panneau publicitaire">
      <rect x="20" y="20" width="280" height="200" rx="14" fill="none" stroke={accent} strokeWidth="3" />
      {/* panneau */}
      <rect x="70" y="52" width="180" height="104" rx="8" fill={accent} opacity="0.88" />
      <rect x="80" y="62" width="160" height="14" rx="4" fill="#fff" opacity="0.85" />
      <rect x="80" y="86" width="120" height="10" rx="4" fill="#fff" opacity="0.6" />
      <rect x="80" y="104" width="140" height="10" rx="4" fill="#fff" opacity="0.45" />
      {/* pieds */}
      <rect x="130" y="156" width="8" height="40" fill={accent} />
      <rect x="182" y="156" width="8" height="40" fill={accent} />
      <rect x="116" y="196" width="88" height="10" rx="4" fill={accent} opacity="0.7" />
    </svg>
  );
}

/* Question éclair générée depuis le bloc */
function quickQuestion(block) {
  if (block.type === "h3") return { q: "Quel est le titre de cette section ?", a: block.text };
  if (block.type === "steps") return { q: "Combien d'étapes sont décrites ici ?", a: `${block.items.length} étapes : ${block.items.map((s) => s.title).join(", ")}.` };
  if (block.type === "list") return { q: "Combien d'éléments cette liste contient-elle ?", a: `${block.items.length} éléments.` };
  if (block.type === "quote") return { q: "Quelle idée retenir de cette citation ?", a: block.text };
  if (block.type === "callout") return { q: "Que faut-il retenir de cet encadré ?", a: block.text };
  const words = block.text.split(" ");
  const k = words.slice(0, Math.min(6, words.length)).join(" ");
  return { q: "Résumez l'idée essentielle en une phrase.", a: `${k}…` };
}

/**
 * UNIVERS 06 — CARNET ILLUSTRÉ (indigo).
 * On LIT le cours comme un carnet d'étude : chaque bloc devient une
 * planche avec un dessin de synthèse, le texte à côté, puis une
 * question éclair à retourner pour vérifier la compréhension.
 */
export default function CarnetReader({ blocks, rangesFor, speakingIdx, onMarkClick }) {
  const { theme } = useTheme();
  const day = theme === "day";
  const [idx, setIdx] = useState(0);
  const [visited, setVisited] = useState(() => new Set([0]));
  const [flipped, setFlipped] = useState(false);

  const go = (n) => {
    const next = ((n % blocks.length) + blocks.length) % blocks.length;
    setIdx(next);
    setFlipped(false);
    setVisited((v) => new Set(v).add(next));
  };

  /* Navigation clavier */
  useEffect(() => {
    const onKey = (e) => {
      if (e.target && e.target.closest && e.target.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        go(idx + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        go(idx - 1);
      } else if (e.key === "f" || e.key === "F" || e.key === "Enter") {
        setFlipped((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx, blocks.length]);

  /* Suivi TTS */
  useEffect(() => {
    if (speakingIdx == null || speakingIdx < 0 || speakingIdx >= blocks.length) return;
    setIdx(speakingIdx);
    setFlipped(false);
    setVisited((v) => new Set(v).add(speakingIdx));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speakingIdx]);

  const block = blocks[idx];
  const accent = ACCENTS[idx % ACCENTS.length];
  const q = quickQuestion(block);

  return (
    <div className="cn-reader" data-day={day ? "1" : "0"} style={{ "--cn-accent": accent }}>
      {/* Reliure du carnet */}
      <div className="cn-spine" />
      <div className="cn-top mono">
        <span>CARNET D'ÉTUDE — PLANCHE {String(idx + 1).padStart(2, "0")}/{String(blocks.length).padStart(2, "0")}</span>
        <span className="cn-top-right">
          <span className="cn-dots">
            {blocks.map((_, i) => (
              <span key={i} className={`cn-dot${i === idx ? " on" : ""}${visited.has(i) ? " seen" : ""}`} />
            ))}
          </span>
        </span>
      </div>

      {/* Planche */}
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          className="cn-planche"
          initial={{ opacity: 0, y: 24, rotateX: 4 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -24, rotateX: -4 }}
          transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cn-illus">
            <BlockIllustration block={block} accent={accent} />
            <span className="cn-illus-tag mono" style={{ color: accent }}>
              PLAN 0{idx + 1} · {blockTag(block).toUpperCase()}
            </span>
          </div>

          <div className="cn-text" data-block={idx}>
            {block.type === "h3" ? (
              <h3 className="block-h3 cn-title">{block.text}</h3>
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
                      <p>{renderSegments(s.text, rangesFor(idx), onMarkClick)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : block.type === "quote" ? (
              <blockquote className="block-quote">{renderSegments(block.text, rangesFor(idx), onMarkClick)}</blockquote>
            ) : block.type === "callout" ? (
              <div className="block-callout">
                <span className="callout-bar" />
                <div>
                  <span className="callout-title mono">{block.title || "À RETENIR"}</span>
                  <p>{renderSegments(block.text, rangesFor(idx), onMarkClick)}</p>
                </div>
              </div>
            ) : (
              <p>{renderSegments(block.text, rangesFor(idx), onMarkClick)}</p>
            )}

            {/* Note de bas de planche */}
            <div className="cn-note mono" style={{ "--cn-accent": accent }}>
              <span className="cn-note-k">NOTE</span>
              <span className="cn-note-v">{blockTitle(block).slice(0, 64)}{blockTitle(block).length > 64 ? "…" : ""}</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Question éclair (carte à retourner) */}
      <button
        className={`cn-quiz${flipped ? " flipped" : ""}`}
        onClick={() => setFlipped((v) => !v)}
        aria-label="Retourner la question éclair"
      >
        <span className="cn-quiz-face front">
          <span className="cn-quiz-tag mono">QUESTION ÉCLAIR</span>
          <span className="cn-quiz-q">{q.q}</span>
          <span className="cn-quiz-hint mono">CLIQUEZ POUR LA RÉPONSE</span>
        </span>
        <span className="cn-quiz-face back">
          <span className="cn-quiz-tag mono" style={{ color: accent }}>RÉPONSE</span>
          <span className="cn-quiz-a">{q.a}</span>
          <span className="cn-quiz-hint mono">✓ BIEN VU</span>
        </span>
      </button>

      {/* Navigation */}
      <div className="cn-nav mono">
        <button className="cn-nav-btn" onClick={() => go(idx - 1)} aria-label="Planche précédente">← PRÉCÉDENT</button>
        <span className="cn-nav-center">{speakingIdx === idx ? "● LECTURE" : "PLANCHE SUIVANTE"}</span>
        <button className="cn-nav-btn" onClick={() => go(idx + 1)} aria-label="Planche suivante">SUIVANT →</button>
      </div>
    </div>
  );
}
