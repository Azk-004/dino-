import { useCallback, useEffect, useRef, useState } from "react";
import { QUIZ, CHAPTER_QUIZZES } from "../data.js";
import { db } from "../lib/local.js";
import { celebrate } from "./confetti.js";

// Questionnaire : rendu React pour le quiz final (12 questions) ET les quiz intermédiaires par chapitre.
// Props:
//   quizData    – tableau de questions (défaut : QUIZ final)
//   chapterIndex – index du chapitre si c'est un quiz intermédiaire (null = quiz final)
//   quizTitle    – titre du quiz (personnalisable)
export default function Quiz({
  quizShown,
  isShownRef,
  accessGranted,
  openAuthForAccess,
  onReady,
  onValidated,
  onRestart,
  quizData,
  chapterIndex,
  quizTitle,
}) {
  const questions = quizData || QUIZ;
  const totalQ = questions.length;
  const isFinal = chapterIndex === null || chapterIndex === undefined;
  const title = quizTitle || (isFinal ? "Douze questions pour valider la formation." : `Quiz du chapitre ${chapterIndex + 1}`);
  const answeredRef = useRef(new Set());
  const marksRef = useRef({});
  const scoreRef = useRef(0);
  const [answered, setAnswered] = useState(new Set());
  const [marks, setMarks] = useState({});
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(null);
  const listRef = useRef(null);

  const showResult = useCallback(
    (total, sc) => {
      const pct = Math.round((sc / totalQ) * 100);
      let msg;
      if (pct >= 90) msg = "Excellent ! Vous maîtrisez le contenu sur le bout des doigts.";
      else if (pct >= 70) msg = "Très bien ! Quelques points à consolider, mais la base est solide.";
      else if (pct >= 50) msg = "Bien. Relisez les leçons indiquées pour consolider vos acquis.";
      else msg = "Ce chapitre mérite une seconde lecture : remontez le parcours et revivez les étapes.";

      const wrong = totalQ - sc;
      setResult({
        passed: pct >= 70,
        title: isFinal
          ? (pct >= 70 ? "Formation validée." : "Formation à revoir.")
          : (pct >= 70 ? "Chapitre validé !" : "Chapitre à revoir."),
        text: `Score : ${sc} / ${totalQ} - ${msg}`,
        breakdown: `${sc} bonne${sc > 1 ? "s" : ""} réponse${sc > 1 ? "s" : ""} · ${wrong} à revoir`,
      });
      if (pct >= 70) {
        celebrate();
        onValidated?.(sc, totalQ);
      }
      db.saveQuizResult(sc, totalQ);
    },
    [totalQ, isFinal, onValidated]
  );

  useEffect(() => {
    if (answeredRef.current.size === totalQ && !result) showResult(totalQ, scoreRef.current);
  }, [answered, result, showResult, totalQ]);

  const handleAnswer = useCallback(
    (qi, oi) => {
      if (answeredRef.current.has(qi)) return;
      if (!accessGranted()) {
        openAuthForAccess();
        return;
      }
      const correct = oi === questions[qi].correct;
      answeredRef.current = new Set(answeredRef.current).add(qi);
      marksRef.current = { ...marksRef.current, [qi]: oi };
      if (correct) scoreRef.current += 1;
      setAnswered(answeredRef.current);
      setMarks(marksRef.current);
      setScore(scoreRef.current);
    },
    [accessGranted, openAuthForAccess]
  );

  // Réponse pilotée par le clavier (touches 1-4) depuis le moteur.
  const answer = useCallback(
    (optionIndex) => {
      if (!isShownRef?.current) return;
      const cards = listRef.current?.querySelectorAll(".quiz-card");
      if (!cards) return;
      for (const card of cards) {
        if (card.classList.contains("done")) continue;
        const opts = card.querySelectorAll(".quiz-opt");
        if (optionIndex < opts.length) opts[optionIndex].click();
        return;
      }
    },
    [isShownRef]
  );

  useEffect(() => {
    onReady?.({ answer });
  }, [onReady, answer]);

  const retry = useCallback(() => {
    answeredRef.current = new Set();
    marksRef.current = {};
    scoreRef.current = 0;
    setAnswered(answeredRef.current);
    setMarks(marksRef.current);
    setScore(0);
    setResult(null);
  }, []);

  const progressPct = answered.size === 0 ? 0 : (answered.size / totalQ) * 100;

  return (
    <div id="ui-quiz" className={quizShown ? "show" : ""} data-lenis-prevent>
      <div className="quiz-head">
        <div className="quiz-kicker">{isFinal ? "Questionnaire - Module 1 :" : `Quiz - Chapitre ${chapterIndex + 1} :`}</div>
        <h2 className="quiz-title">{title}</h2>
        <div className="quiz-score">
          Score : <strong id="quiz-score">{score}</strong> / {totalQ}
        </div>
      </div>
      <div id="quiz-progress">
        <div id="quiz-progress-fill" style={{ width: progressPct.toFixed(2) + "%" }}></div>
      </div>
      <div id="quiz-list" ref={listRef}>
        {questions.map((item, qi) => {
          const done = answered.has(qi);
          const myPick = marks[qi];
          const correct = done ? item.correct : -1;
          return (
            <div key={qi} className={`quiz-card${done ? " done" : ""}${done ? (myPick === item.correct ? " correct-q" : " wrong-q") : ""}`}>
              <div className="quiz-num">Question {String(qi + 1).padStart(2, "0")}</div>
              <div className="quiz-q">{item.q}</div>
              <div className="quiz-opts">
                {item.options.map((opt, oi) => {
                  let cls = "quiz-opt";
                  if (done) {
                    if (oi === correct) cls += " correct";
                    else if (oi === myPick) cls += " wrong";
                    else cls += " dim";
                  }
                  return (
                    <button key={oi} type="button" className={cls} onClick={() => handleAnswer(qi, oi)}>
                      <span className="opt-letter">{String.fromCharCode(65 + oi)}.</span>{" "}
                      <span className="opt-text">{opt}</span>
                    </button>
                  );
                })}
              </div>
              {done && (
                <div className="quiz-explain show">{item.explain}</div>
              )}
            </div>
          );
        })}
      </div>
      <div id="quiz-result" className={result ? "" : "hide"}>
        {result && (
          <>
            <div className="result-mark"></div>
            <h3 className="result-title">{result.title}</h3>
            <p className="result-text">
              <strong>{result.text.split(" - ")[0]}</strong> - {result.text.split(" - ").slice(1).join(" - ")}
              <br />
              <span className="result-breakdown">{result.breakdown}</span>
            </p>
            <div className="result-actions">
              <button id="quiz-retry" className="result-btn" onClick={retry}>
                Recommencer
              </button>
              <button id="quiz-restart" className="result-btn ghost" onClick={onRestart}>
                Revenir au début du parcours
              </button>
            </div>
          </>
        )}
      </div>
      <div className="quiz-end">C'est terminé. Re-scrollez pour revoir le parcours, ou remontez pour réviser.</div>
    </div>
  );
}
