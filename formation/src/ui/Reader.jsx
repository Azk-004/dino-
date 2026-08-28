import { useEffect, useRef, useState, useCallback } from "react";
import { STATIONS, MINI_QUIZZES } from "../data.js";
import MiniQuiz from "./MiniQuiz.jsx";

/**
 * Lecteur de leçon (#ui-reader) avec système de verrouillage IBM Learning.
 *
 * Si une leçon possède un mini-quiz (MINI_QUIZZES[id]), la navigation
 * vers la leçon suivante est BLOQUÉE jusqu'à ce que l'apprenant
 * obtienne au moins 90% au quiz.
 *
 * - Le bouton « Suivant → » est grisé et affiche un cadenas 🔒
 * - Un bandeau d'avertissement s'affiche sous le quiz si échec
 * - Seul le bouton « Fermer » reste actif à tout moment
 */
export default function Reader({ reader, index, open, onClose, onNav }) {
  const panelRef = useRef(null);
  const [quizPassed, setQuizPassed] = useState(false);
  const [quizRequired, setQuizRequired] = useState(false);

  // Réinitialiser l'état du quiz quand on ouvre une nouvelle leçon
  useEffect(() => {
    if (open && reader) {
      setQuizPassed(false);
      setQuizRequired(!!MINI_QUIZZES[reader.id]);
    }
  }, [open, reader?.id]);

  // Scroll en haut à l'ouverture
  useEffect(() => {
    if (open && panelRef.current) panelRef.current.scrollTop = 0;
  }, [open, reader?.id]);

  // Barre de progression
  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const updateProgress = () => {
      const fill = document.getElementById("reader-progress-fill");
      if (!fill) return;
      const max = el.scrollHeight - el.clientHeight;
      fill.style.width = (max > 0 ? (el.scrollTop / max) * 100 : 100) + "%";
    };
    el.addEventListener("scroll", updateProgress, { passive: true });
    return () => el.removeEventListener("scroll", updateProgress);
  }, [open]);

  const handleQuizPassed = useCallback(() => {
    setQuizPassed(true);
  }, []);

  const countText = reader
    ? `${String(index + 1).padStart(2, "0")} / ${String(STATIONS.length).padStart(2, "0")}`
    : "";

  const isLastLesson = index >= STATIONS.length - 1;
  const canNavigateNext = !quizRequired || quizPassed;

  return (
    <div id="ui-reader" className={open ? "show" : ""}>
      <div className="reader-panel" ref={panelRef} data-lenis-prevent>
        <div className="reader-progress">
          <div id="reader-progress-fill" className="reader-progress-fill"></div>
        </div>

        <button id="reader-close" className="reader-close" aria-label="Fermer" onClick={onClose}>
          ×
        </button>

        {reader && (
          <>
            <div className="reader-kicker">{reader.kicker}</div>
            <h2 className="reader-title">{reader.title}</h2>
            <div className="reader-rule"></div>

            <div className="reader-body">
              {reader.id === "quiz" ? (
                <>
                  <ul className="reader-bullets">
                    {reader.bullets.map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                  <button className="reader-quiz-btn" onClick={onClose}>
                    Lancer le questionnaire
                  </button>
                </>
              ) : (
                reader.content.map((block, i) => (
                  <p key={i}>
                    <span className="body-t">{block.t}</span>
                    {block.b}
                  </p>
                ))
              )}
            </div>

            {/* ── Mini-quiz de verrouillage ── */}
            {reader.id !== "quiz" && MINI_QUIZZES[reader.id] && (
              <MiniQuiz questions={MINI_QUIZZES[reader.id]} onPassed={handleQuizPassed} />
            )}

            {/* ── Navigation ── */}
            <div className="reader-nav">
              <button
                id="reader-prev"
                className="reader-nav-btn"
                onClick={() => onNav(-1)}
              >
                ← Précédent
              </button>

              <div id="reader-count" className="reader-count">{countText}</div>

              {!isLastLesson && (
                <button
                  id="reader-next"
                  className={"reader-nav-btn" + (canNavigateNext ? "" : " locked")}
                  disabled={!canNavigateNext}
                  title={
                    canNavigateNext
                      ? "Passer à la leçon suivante"
                      : "Passez le quiz (90%) pour débloquer la leçon suivante"
                  }
                  onClick={() => {
                    if (canNavigateNext) onNav(1);
                  }}
                >
                  {canNavigateNext ? (
                    "Suivant →"
                  ) : (
                    <span className="reader-nav-locked">
                      <span className="lock-icon">🔒</span> Suivant
                    </span>
                  )}
                </button>
              )}
            </div>

            {/* ── Message de blocage sous la navigation ── */}
            {quizRequired && !canNavigateNext && !isLastLesson && (
              <div className="reader-gate-msg">
                <span className="reader-gate-icon">🔒</span>
                Passez le quiz avec au moins <strong>90%</strong> pour débloquer la leçon suivante.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
