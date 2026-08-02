import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { getLesson, allLessons, lessonSegments } from "../data/curriculum.js";
import { useLocalStorage } from "../lib/useLocalStorage.js";
import TOC from "../components/TOC.jsx";
import { useLenis } from "../lib/smooth.jsx";
import { useMode } from "../context/ModeContext.jsx";
import LessonExperience from "../components/experiences/LessonExperience.jsx";
import ModeLessonContent from "../components/readers/ModeLessonContent.jsx";

/* ------------------------------------------------------------------ */
/* Helpers surlignage                                                  */
/* ------------------------------------------------------------------ */
function offsetsInBlock(el, range) {
  const pre = range.cloneRange();
  pre.selectNodeContents(el);
  pre.setEnd(range.startContainer, range.startOffset);
  const start = pre.toString().length;
  const end = start + range.toString().length;
  return { start, end };
}

const HL_COLORS = [
  { id: "yellow", css: "#fde047" },
  { id: "green", css: "#86efac" },
  { id: "pink", css: "#f9a8d4" },
  { id: "blue", css: "#93c5fd" },
];

/* ------------------------------------------------------------------ */
/* Hook TTS                                                            */
/* ------------------------------------------------------------------ */
function useTTS(segments, lessonId) {
  const [playing, setPlaying] = useState(false);
  const [idx, setIdx] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [rate, setRate] = useState(1);
  const [voices, setVoices] = useState([]);
  const speakingRef = useRef({ idx, rate, segments });
  speakingRef.current = { idx, rate, segments };

  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const load = () => setVoices(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const stop = useCallback(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setPlaying(false);
    setPaused(false);
    setIdx(-1);
  }, []);

  const speakFrom = useCallback(
    (i) => {
      if (!("speechSynthesis" in window)) return;
      const { segments: segs } = speakingRef.current;
      if (i >= segs.length) {
        setPlaying(false);
        setIdx(-1);
        return;
      }
      setIdx(i);
      setPlaying(true);
      setPaused(false);
      const u = new SpeechSynthesisUtterance(segs[i].text);
      u.lang = "fr-FR";
      u.rate = speakingRef.current.rate;
      const fr = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith("fr"));
      if (fr) u.voice = fr;
      u.onend = () => speakFrom(i + 1);
      u.onerror = () => setPlaying(false);
      window.speechSynthesis.speak(u);
    },
    [voices]
  );

  const toggle = useCallback(() => {
    if (!("speechSynthesis" in window)) return;
    if (!playing) {
      speakFrom(speakingRef.current.idx >= 0 ? speakingRef.current.idx : 0);
    } else if (paused) {
      window.speechSynthesis.resume();
      setPaused(false);
    } else {
      window.speechSynthesis.pause();
      setPaused(true);
    }
  }, [playing, paused, speakFrom]);

  const setRateSafe = useCallback(
    (r) => {
      setRate(r);
      speakingRef.current.rate = r;
      if (playing && !paused && speakingRef.current.idx >= 0) {
        // relit le segment courant à la nouvelle vitesse
        if ("speechSynthesis" in window) window.speechSynthesis.cancel();
        speakFrom(speakingRef.current.idx);
      }
    },
    [playing, paused, speakFrom]
  );

  const jump = useCallback(
    (delta) => {
      if (!playing) return;
      const next = Math.max(0, Math.min(speakingRef.current.idx + delta, speakingRef.current.segments.length - 1));
      if ("speechSynthesis" in window) window.speechSynthesis.cancel();
      speakFrom(next);
    },
    [playing, speakFrom]
  );

  useEffect(() => stop, [stop]);

  return { playing, paused, idx, rate, setRateSafe, toggle, stop, jump };
}

/* ------------------------------------------------------------------ */
/* Page leçon                                                          */
/* ------------------------------------------------------------------ */
export default function Lesson() {
  const { id } = useParams();
  const lesson = getLesson(id);
  const lenis = useLenis();
  const { meta } = useMode();
  const articleRef = useRef(null);

  const [highlights, setHighlights] = useLocalStorage("pnt-highlights", []);
  const [progress, setProgress] = useLocalStorage("pnt-progress", {});
  const [focus, setFocus] = useState(false);
  const [sel, setSel] = useState(null);
  const [toolbarNote, setToolbarNote] = useState(false);
  const [activeMark, setActiveMark] = useState(null);

  const segments = useMemo(() => (lesson ? lessonSegments(lesson) : []), [lesson]);
  const tts = useTTS(segments, id);

  useEffect(() => {
    setSel(null);
    setToolbarNote(false);
    setActiveMark(null);
    tts.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    document.documentElement.dataset.focus = focus ? "on" : "off";
    return () => {
      document.documentElement.dataset.focus = "off";
    };
  }, [focus]);

  /* Marquer la leçon comme terminée à 85 % du scroll */
  useEffect(() => {
    if (!lesson) return;
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const bottom = el.getBoundingClientRect().bottom;
      if (bottom < window.innerHeight * 1.15) {
        setProgress((p) => (p[lesson.id]?.done ? p : { ...p, [lesson.id]: { done: true } }));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lesson, setProgress]);

  if (!lesson) return <Navigate to="/lecon/l1" replace />;

  const lessonRanges = highlights.filter((h) => h.lessonId === lesson.id);

  const addHighlight = (color, note = "") => {
    if (!sel) return;
    const h = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      lessonId: lesson.id,
      blockIndex: sel.blockIndex,
      start: sel.start,
      end: sel.end,
      text: sel.text,
      color,
      note,
      createdAt: Date.now(),
    };
    setHighlights((arr) => [...arr, h]);
    setSel(null);
    setToolbarNote(false);
  };

  const removeHighlight = (hid) => setHighlights((arr) => arr.filter((h) => h.id !== hid));

  const onMouseUp = () => {
    setTimeout(() => {
      const s = window.getSelection();
      if (!s || s.isCollapsed) {
        setSel(null);
        return;
      }
      const range = s.getRangeAt(0);
      const node = range.startContainer.nodeType === 3 ? range.startContainer.parentElement : range.startContainer;
      const blockEl = node?.closest?.("[data-block]");
      if (!blockEl || !articleRef.current?.contains(blockEl)) return;
      const blockIndex = Number(blockEl.dataset.block);
      const { start, end } = offsetsInBlock(blockEl, range);
      if (end - start < 2 || end - start > 600) return;
      const rect = range.getBoundingClientRect();
      setSel({
        blockIndex,
        start,
        end,
        text: s.toString().trim(),
        x: Math.min(Math.max(rect.left + rect.width / 2, 140), window.innerWidth - 140),
        y: Math.max(rect.top, 100),
      });
    }, 20);
  };

  const order = allLessons.findIndex((l) => l.id === lesson.id);
  const prev = allLessons[order - 1];
  const next = allLessons[order + 1];
  const isDone = !!progress[lesson.id]?.done;

  const scrollToTop = () => lenis?.current?.scrollTo(0, { duration: 0.6 });

  return (
    <div className={`lesson-layout ${focus ? "lesson-focus" : ""}`}>
      <TOC onNavigate={scrollToTop} />

      <article className="lesson-main" ref={articleRef} onMouseUp={onMouseUp}>
        <header className="lesson-header">
          <div className="lesson-chapter mono">
            <span
              className="lesson-universe-chip"
              style={{ "--uni-accent": meta.accent }}
              title={meta.desc}
            >
              {meta.num} — {meta.name}
            </span>
            {lesson.module} · {lesson.chapter}
          </div>
          <h1 className="lesson-title">{lesson.title}</h1>
          <div className="lesson-meta mono">
            <span>{lesson.num}</span>
            <span className="dot">·</span>
            <span>⏱ {lesson.duration}</span>
            <span className="dot">·</span>
            <span className={`lesson-done ${isDone ? "done" : ""}`}>
              {isDone ? "✓ Terminée" : "En cours"}
            </span>
          </div>

          <div className="lesson-actions">
            <button
              className={`icon-btn ${tts.playing ? "playing" : ""}`}
              onClick={tts.toggle}
              aria-label={tts.playing ? (tts.paused ? "Reprendre la lecture" : "Mettre en pause") : "Écouter le cours"}
            >
              {tts.playing ? (tts.paused ? "▶" : "⏸") : "🔊"}
              <span className="icon-btn-label">{tts.playing ? (tts.paused ? "Reprendre" : "Pause") : "Écouter le cours"}</span>
            </button>
            {tts.playing && (
              <button className="icon-btn" onClick={tts.stop} aria-label="Arrêter">
                ⏹<span className="icon-btn-label">Arrêter</span>
              </button>
            )}
            <button
              className={`icon-btn ${focus ? "on" : ""}`}
              onClick={() => setFocus((f) => !f)}
              aria-label="Mode focus plein écran"
            >
              ⛶<span className="icon-btn-label">{focus ? "Quitter le focus" : "Mode focus"}</span>
            </button>
          </div>
        </header>

        {/* Expérience d'apprentissage propre à cette leçon */}
        <LessonExperience lessonId={lesson.id} />

        {/* Le cours se lit À TRAVERS le mode actif : chaque univers a sa
            propre expérience de lecture (atelier 3D, archives, observatoire,
            panorama). Le TTS suit le bloc lu partout. */}
        <ModeLessonContent
          lesson={lesson}
          lessonRanges={lessonRanges}
          speakingIdx={tts.playing ? segments[tts.idx]?.blockIndex : null}
          onMarkClick={setActiveMark}
        />

        {/* Navigation leçon suivante / précédente */}
        <div className="lesson-nav">
          {prev ? (
            <Link to={`/lecon/${prev.id}`} className="lesson-nav-card prev">
              <span className="mono">← PRÉCÉDENT</span>
              <strong>{prev.num} — {prev.title}</strong>
            </Link>
          ) : <span />}
          {next ? (
            <Link to={`/lecon/${next.id}`} className="lesson-nav-card next">
              <span className="mono">SUIVANT →</span>
              <strong>{next.num} — {next.title}</strong>
            </Link>
          ) : (
            <Link to="/quiz" className="lesson-nav-card next">
              <span className="mono">TERMINER →</span>
              <strong>Questionnaire du module</strong>
            </Link>
          )}
        </div>

        {/* Vos notes et surlignages */}
        <section className="notes-panel">
          <h3 className="mono">VOS SURlIGNAGES & NOTES ({lessonRanges.length})</h3>
          {lessonRanges.length === 0 && (
            <p className="notes-empty">
              Sélectionnez un passage du cours puis choisissez une couleur pour
              le surligner, ou ajoutez une note personnelle.
            </p>
          )}
          <div className="notes-list">
            <AnimatePresence>
              {lessonRanges.map((h) => (
                <motion.div
                  key={h.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  className="notes-item"
                >
                  <span className={`note-swatch hl-${h.color}`} />
                  <div className="notes-item-body">
                    <p className="notes-text">« {h.text} »</p>
                    {h.note && <p className="notes-note">{h.note}</p>}
                  </div>
                  <button className="icon-btn small" onClick={() => removeHighlight(h.id)} aria-label="Supprimer">
                    ✕
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </article>

      {/* Barre TTS */}
      <AnimatePresence>
        {tts.playing && (
          <motion.div
            className="tts-bar"
            initial={{ y: 90, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 90, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
          >
            <div className="tts-now">
              <span className="tts-pulse" />
              <span className="tts-text">
                {segments[tts.idx]?.text.slice(0, 110)}
                {segments[tts.idx]?.text.length > 110 ? "…" : ""}
              </span>
            </div>
            <div className="tts-controls">
              <button className="icon-btn" onClick={() => tts.jump(-1)} aria-label="Segment précédent">⏮</button>
              <button className="icon-btn" onClick={tts.toggle} aria-label={tts.paused ? "Reprendre" : "Pause"}>
                {tts.paused ? "▶" : "⏸"}
              </button>
              <button className="icon-btn" onClick={() => tts.jump(1)} aria-label="Segment suivant">⏭</button>
              <button className="icon-btn" onClick={tts.stop} aria-label="Arrêter">⏹</button>
              <select
                className="tts-rate mono"
                value={tts.rate}
                onChange={(e) => tts.setRateSafe(Number(e.target.value))}
                aria-label="Vitesse de lecture"
              >
                {[0.75, 1, 1.25, 1.5].map((r) => (
                  <option key={r} value={r}>{r}×</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Barre de surlignage */}
      <AnimatePresence>
        {sel && (
          <motion.div
            className="highlight-toolbar"
            style={{ left: sel.x, top: sel.y - 52 }}
            initial={{ opacity: 0, scale: 0.8, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 6 }}
          >
            {HL_COLORS.map((c) => (
              <button
                key={c.id}
                className="hl-dot"
                style={{ background: c.css }}
                onClick={() => addHighlight(c.id)}
                aria-label={`Surligner en ${c.id}`}
              />
            ))}
            <button
              className={`hl-note-btn ${toolbarNote ? "on" : ""}`}
              onClick={() => setToolbarNote((v) => !v)}
              aria-label="Ajouter une note"
            >
              ✎
            </button>
            <button className="hl-cancel" onClick={() => setSel(null)} aria-label="Annuler">
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saisie de note */}
      <AnimatePresence>
        {sel && toolbarNote && (
          <motion.form
            className="note-input"
            style={{
              left: Math.max(12, Math.min(sel.x - 150, window.innerWidth - 330)),
              top: Math.max(12, sel.y - 110),
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onSubmit={(e) => {
              e.preventDefault();
              const note = new FormData(e.currentTarget).get("note")?.toString() ?? "";
              addHighlight("yellow", note);
            }}
          >
            <input name="note" placeholder="Votre note personnelle…" autoFocus />
            <button className="btn btn-primary small-btn" type="submit">OK</button>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Inspecteur de surlignage existant */}
      <AnimatePresence>
        {activeMark && (
          <motion.div
            className="mark-inspector"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
          >
            <p className="mark-inspector-text">« {activeMark.text} »</p>
            {activeMark.note && <p className="mark-inspector-note">📝 {activeMark.note}</p>}
            <button className="link-btn danger" onClick={() => { removeHighlight(activeMark.id); setActiveMark(null); }}>
              Supprimer ce surlignage
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
