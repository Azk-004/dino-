import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { questionnaire, terms } from "../data/curriculum.js";
import { useLocalStorage } from "../lib/useLocalStorage.js";

/* ------------------------------------------------------------------ */
/* Données de révision                                                 */
/* ------------------------------------------------------------------ */
const CARDS = [
  { front: "Panneautique", back: terms.panneautique.def },
  { front: "Zonage", back: terms.zonage.def },
  { front: "Mobilier Urbain de Publicité", back: terms.mup.def },
  { front: "Régie publicitaire", back: terms.regie.def },
  { front: "Pollution visuelle", back: terms.pollution.def },
  { front: "Audit", back: terms.audit.def },
  { front: "Mise en concession", back: terms.concession.def },
  { front: "Cahier des charges", back: terms.cahier.def },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/* ------------------------------------------------------------------ */
/* Mode 1 — Texte à trous                                              */
/* ------------------------------------------------------------------ */
function FillInTheBlanks({ defs }) {
  const [revealed, setRevealed] = useLocalStorage("pnt-trous", {});
  const [showAll, setShowAll] = useState(false);

  const stats = useMemo(() => {
    let total = 0;
    let shown = 0;
    defs.forEach((d) => {
      const occ = d.answer.split(new RegExp(`(${escapeRegExp(d.term)})`, "gi")).filter((p, i) => i % 2 === 1);
      total += occ.length;
      shown += occ.filter((_, i) => revealed[`${d.id}:${i}`] || showAll).length;
    });
    return { total, shown };
  }, [defs, revealed, showAll]);

  const reveal = (key) =>
    setRevealed((r) => ({ ...r, [key]: true }));

  const reset = () => {
    setRevealed({});
    setShowAll(false);
  };

  return (
    <div className="rev-trous">
      <div className="rev-stats mono">
        <span>{stats.shown} / {stats.total} termes révélés</span>
        <div className="rev-bar">
          <div className="rev-bar-fill" style={{ width: stats.total ? `${(stats.shown / stats.total) * 100}%` : "0%" }} />
        </div>
        <button className="link-btn" onClick={() => setShowAll((v) => !v)}>
          {showAll ? "Masquer" : "Tout révéler"}
        </button>
        <button className="link-btn" onClick={reset}>Réinitialiser</button>
      </div>

      {defs.map((d, di) => {
        const parts = d.answer.split(new RegExp(`(${escapeRegExp(d.term)})`, "gi"));
        return (
          <motion.div
            key={d.id}
            className="trous-def"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: di * 0.05 }}
          >
            <div className="trous-head mono">
              <span>DÉFINITION 0{di + 1}</span>
              <span className="trous-target">{d.term}</span>
            </div>
            <p className="trous-text">
              {parts.map((part, i) =>
                i % 2 === 1 ? (
                  revealed[`${d.id}:${(i - 1) / 2}`] || showAll ? (
                    <button
                      key={i}
                      className="blank blank-revealed"
                      onClick={() => setRevealed((r) => {
                        const copy = { ...r };
                        delete copy[`${d.id}:${(i - 1) / 2}`];
                        return copy;
                      })}
                      title="Cliquer pour masquer à nouveau"
                    >
                      {part}
                    </button>
                  ) : (
                    <button
                      key={i}
                      className="blank"
                      onClick={() => reveal(`${d.id}:${(i - 1) / 2}`)}
                      title="Cliquer pour révéler"
                    >
                      ••••••
                    </button>
                  )
                ) : (
                  <span key={i}>{part}</span>
                )
              )}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Mode 2 — Cartes flash                                               */
/* ------------------------------------------------------------------ */
function FlashCards() {
  const [deck, setDeck] = useState(() => shuffle(CARDS.map((c, i) => ({ ...c, key: i }))));
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(0);
  const [review, setReview] = useState(0);
  const [result, setResult] = useState(null);

  const current = deck[0];

  const grade = (ok) => {
    if (ok) setKnown((k) => k + 1);
    else setReview((r) => r + 1);
    setFlipped(false);
    setDeck((d) => d.slice(1));
    if (deck.length === 1) setResult(ok ? "known" : "review");
  };

  const restart = () => {
    setDeck(shuffle(CARDS.map((c, i) => ({ ...c, key: i }))));
    setFlipped(false);
    setKnown(0);
    setReview(0);
    setResult(null);
  };

  return (
    <div className="rev-cards">
      <div className="rev-stats mono">
        <span>{deck.length} cartes restantes · ✓ {known} · ↻ {review}</span>
      </div>

      <AnimatePresence mode="wait">
        {current && !result ? (
          <motion.div
            key={current.key}
            className="flashcard-wrap"
            initial={{ opacity: 0, x: 60, rotateY: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            onClick={() => setFlipped((f) => !f)}
          >
            <motion.div
              className="flashcard"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flash-face flash-front" style={{ backfaceVisibility: "hidden" }}>
                <span className="mono flash-kicker">QUESTION</span>
                <h3>{current.front}</h3>
                <span className="mono flash-hint">Cliquez pour révéler</span>
              </div>
              <div className="flash-face flash-back" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                <span className="mono flash-kicker">DÉFINITION</span>
                <p>{current.back}</p>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            className="flash-result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flash-result-ring">
              <strong>{Math.round((known / (known + review)) * 100)}%</strong>
              <span className="mono">maîtrisé</span>
            </div>
            <p>
              <span className="mono">✓ {known} connues</span> ·{" "}
              <span className="mono">↻ {review} à revoir</span>
            </p>
            <button className="btn btn-primary" onClick={restart}>
              <span>Recommencer</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {current && !result && (
        <div className="flash-actions">
          <button className="btn btn-ghost" onClick={() => grade(false)}>↻ À revoir</button>
          <button className="btn btn-primary" onClick={() => grade(true)}>✓ Je connais</button>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */
export default function Revision() {
  const [mode, setMode] = useState("trous");

  const defs = questionnaire.definitions;

  return (
    <div className="page revision-page">
      <header className="page-head">
        <span className="kicker mono">MODE RÉVISION</span>
        <h1>
          Testez votre <em>mémoire</em>
        </h1>
        <p className="lead">
          Les définitions clés du module, masquées pour être révélées au clic —
          le réflexe des étudiants en panneautique.
        </p>
        <div className="rev-tabs">
          <button className={`tab-btn ${mode === "trous" ? "active" : ""}`} onClick={() => setMode("trous")}>
            <span className="mono">01</span> Texte à trous
          </button>
          <button className={`tab-btn ${mode === "cards" ? "active" : ""}`} onClick={() => setMode("cards")}>
            <span className="mono">02</span> Cartes flash
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
        >
          {mode === "trous" ? <FillInTheBlanks defs={defs} /> : <FlashCards />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
