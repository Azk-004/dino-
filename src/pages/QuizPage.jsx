import { useEffect, useState } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import { mcq, questionnaire } from "../data/curriculum.js";
import { useLocalStorage } from "../lib/useLocalStorage.js";

function useCountUp(target, active) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const controls = animate(0, target, {
      duration: 1.2,
      ease: "easeOut",
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [target, active]);
  return value;
}

/* ------------------------------------------------------------------ */
/* QCM                                                                */
/* ------------------------------------------------------------------ */
function MCQs() {
  const [answers, setAnswers] = useState({});
  const [best, setBest] = useLocalStorage("pnt-quiz-best", null);
  const [showScore, setShowScore] = useState(false);

  const answered = Object.keys(answers).length;
  const score = mcq.reduce((acc, q) => (answers[q.id] === q.correct ? acc + 1 : acc), 0);
  const allDone = answered === mcq.length;

  useEffect(() => {
    if (allDone && best === null) setBest(score);
    else if (allDone && score > (best ?? 0)) setBest(score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allDone, score]);

  const animatedScore = useCountUp(score, showScore);
  const animatedPct = useCountUp(Math.round((score / mcq.length) * 100), showScore);

  const retry = () => {
    setAnswers({});
    setShowScore(false);
  };

  return (
    <div className="quiz-body">
      <div className="quiz-progress mono">
        <span>{answered} / {mcq.length} répondues</span>
        <div className="quiz-progress-track">
          <div className="quiz-progress-fill" style={{ width: `${(answered / mcq.length) * 100}%` }} />
        </div>
        <button className="link-btn" onClick={() => setShowScore((s) => !s)} disabled={!allDone}>
          {showScore ? "Masquer le score" : "Voir mon score"}
        </button>
      </div>

      <div className="mcq-list">
        {mcq.map((q, qi) => {
          const picked = answers[q.id];
          const answeredQ = picked !== undefined;
          return (
            <motion.div
              key={q.id}
              className={`mcq-item ${answeredQ ? "answered" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (qi % 5) * 0.05 }}
            >
              <div className="mcq-q mono">
                <span>Q{qi + 1}</span>
                <p>{q.question}</p>
              </div>
              <div className="mcq-options">
                {q.options.map((opt, oi) => {
                  const isCorrect = oi === q.correct;
                  const isPicked = picked === oi;
                  let cls = "mcq-option";
                  if (answeredQ) {
                    if (isCorrect) cls += " correct";
                    else if (isPicked) cls += " wrong";
                    else cls += " dim";
                  }
                  return (
                    <button
                      key={oi}
                      className={cls}
                      disabled={answeredQ}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                    >
                      <span className="mcq-letter mono">{String.fromCharCode(65 + oi)}</span>
                      <span>{opt}</span>
                      {answeredQ && isCorrect && <span className="mcq-verdict">✓</span>}
                      {answeredQ && isPicked && !isCorrect && <span className="mcq-verdict">✕</span>}
                    </button>
                  );
                })}
              </div>
              <AnimatePresence>
                {answeredQ && (
                  <motion.p
                    className="mcq-explain"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    💡 {q.explain}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence>
        {showScore && (
          <motion.div
            className="score-panel"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92 }}
          >
            <span className="mono">RÉSULTAT DU QCM</span>
            <div className="score-big">
              <strong>{animatedScore}</strong>
              <span className="mono">/ {mcq.length}</span>
            </div>
            <div className="score-ring-bar">
              <div className="score-ring-fill" style={{ width: `${(score / mcq.length) * 100}%` }} />
            </div>
            <p className="mono">{animatedPct}% de bonnes réponses</p>
            <p className="score-msg">
              {score / mcq.length >= 0.8
                ? "Excellent, le métier n'a plus de secrets pour vous !"
                : score / mcq.length >= 0.5
                ? "Bien joué ! Relisez les leçons 1 et 3 pour viser l'excellence."
                : "La révision est votre amie : repassez les flashcards puis retentez."}
            </p>
            {best !== null && (
              <p className="mono score-best">MEILLEUR SCORE : {best} / {mcq.length}</p>
            )}
            <button className="btn btn-primary" onClick={retry}>
              <span>Refaire le quiz</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Questions ouvertes                                                  */
/* ------------------------------------------------------------------ */
function OpenQuestions() {
  const [drafts, setDrafts] = useState({});
  const [submitted, setSubmitted] = useState({});
  const [grades, setGrades] = useState({});

  const graded = Object.keys(grades).length;
  const okCount = Object.values(grades).filter((g) => g === "ok").length;

  return (
    <div className="quiz-body">
      <div className="quiz-progress mono">
        <span>{graded} / {questionnaire.openQuestions.length} auto-évaluées · ✓ {okCount}</span>
        <div className="quiz-progress-track">
          <div className="quiz-progress-fill" style={{ width: `${(graded / questionnaire.openQuestions.length) * 100}%` }} />
        </div>
      </div>

      <div className="open-list">
        {questionnaire.openQuestions.map((q, qi) => {
          const done = !!submitted[q.id];
          const g = grades[q.id];
          return (
            <motion.div
              key={q.id}
              className={`open-item ${done ? "done" : ""}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: (qi % 5) * 0.04 }}
            >
              <div className="open-q mono">
                <span>Q{qi + 1}</span>
                <p>{q.text}</p>
              </div>
              {!done ? (
                <form
                  className="open-form"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted((s) => ({ ...s, [q.id]: true }));
                  }}
                >
                  <textarea
                    rows={3}
                    placeholder="Votre réponse… (comparez ensuite avec la réponse modèle)"
                    value={drafts[q.id] ?? ""}
                    onChange={(e) => setDrafts((d) => ({ ...d, [q.id]: e.target.value }))}
                  />
                  <button className="btn btn-ghost" type="submit" disabled={!drafts[q.id]?.trim()}>
                    <span>Révéler la réponse modèle</span>
                  </button>
                </form>
              ) : (
                <div className="open-answer">
                  <div className="open-model">
                    <span className="mono open-model-label">RÉPONSE MODÈLE</span>
                    <p>{q.answer}</p>
                  </div>
                  {g ? (
                    <p className="mono open-grade">
                      {g === "ok" ? "✓ Compris" : "↻ À revoir"}
                    </p>
                  ) : (
                    <div className="open-self">
                      <span className="mono">Auto-évaluation :</span>
                      <button className="btn btn-ghost small-btn" onClick={() => setGrades((gr) => ({ ...gr, [q.id]: "review" }))}>
                        ↻ À revoir
                      </button>
                      <button className="btn btn-primary small-btn" onClick={() => setGrades((gr) => ({ ...gr, [q.id]: "ok" }))}>
                        ✓ Compris
                      </button>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */
export default function QuizPage() {
  const [tab, setTab] = useState("mcq");

  return (
    <div className="page quiz-page">
      <header className="page-head">
        <span className="kicker mono">QUESTIONNAIRE · MODULE 1</span>
        <h1>
          Validez le <em>module</em>
        </h1>
        <p className="lead">
          QCM avec feedback immédiat et questions ouvertes à comparer aux
          réponses modèles. Vous pouvez refaire le quiz autant de fois que
          nécessaire.
        </p>
        <div className="rev-tabs quiz-tabs">
          <button className={`tab-btn ${tab === "mcq" ? "active" : ""}`} onClick={() => setTab("mcq")}>
            <span className="mono">A</span> QCM ({mcq.length})
          </button>
          <button className={`tab-btn ${tab === "open" ? "active" : ""}`} onClick={() => setTab("open")}>
            <span className="mono">B</span> Questions ouvertes ({questionnaire.openQuestions.length})
          </button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
        >
          {tab === "mcq" ? <MCQs /> : <OpenQuestions />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
