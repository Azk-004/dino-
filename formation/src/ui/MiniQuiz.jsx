import { useState, useCallback } from "react";

/**
 * Mini-quiz de verrouillage — style IBM Learning.
 * Seuil de validation : 90%.
 * - Échec → on ne peut PAS passer à la leçon suivante, bouton "Recommencer" affiché.
 * - Réussite → débloque la navigation vers la leçon suivante.
 *
 * Props :
 *   questions  – tableau [{ q, options, correct, explain }]
 *   onPassed   – appelé (true) quand le seuil est atteint (débloque le Reader)
 */
export default function MiniQuiz({ questions, onPassed }) {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [done, setDone] = useState(false);
  const [score, setScore] = useState(0);
  const [passed, setPassed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const total = questions?.length || 0;

  const computeScore = useCallback(
    (allAnswers) => {
      let sc = 0;
      questions.forEach((q, i) => {
        if (allAnswers[i] === q.correct) sc++;
      });
      return sc;
    },
    [questions]
  );

  const handleAnswer = useCallback(
    (qi, oi) => {
      if (answers[qi] !== undefined) return;
      const q = questions[qi];
      const correct = oi === q.correct;
      const newAnswers = { ...answers, [qi]: oi };
      setAnswers(newAnswers);
      setShowExplanation(true);

      // Dernière question → calculer le résultat
      if (qi === questions.length - 1) {
        const sc = computeScore(newAnswers);
        setScore(sc);
        setDone(true);
        const pct = Math.round((sc / total) * 100);
        const isPassed = pct >= 90;
        setPassed(isPassed);
        if (isPassed) onPassed?.();
      } else {
        setCurrentQ(qi + 1);
      }
    },
    [answers, questions, computeScore, total, onPassed]
  );

  const retry = useCallback(() => {
    setCurrentQ(0);
    setAnswers({});
    setDone(false);
    setScore(0);
    setPassed(false);
    setShowExplanation(false);
  }, []);

  if (!questions || total === 0) return null;

  const q = questions[currentQ];
  const progressPct = ((currentQ + (answers[currentQ] !== undefined ? 1 : 0)) / total) * 100;
  const pct = done ? Math.round((score / total) * 100) : 0;

  return (
    <div className={"mini-quiz" + (passed ? " mini-quiz--passed" : done && !passed ? " mini-quiz--locked" : "")}>
      {/* Header */}
      <div className="mini-quiz__header">
        <span className="mini-quiz__badge">
          {!done ? "🧪 Vérification rapide" : passed ? "✅ Leçon validée" : "🔒 Test non validé"}
        </span>
        {!done && (
          <span className="mini-quiz__progress">
            Question {currentQ + 1} / {total}
          </span>
        )}
      </div>

      {/* Barre de progression */}
      <div className="mini-quiz__bar">
        <div
          className={"mini-quiz__bar-fill" + (done ? (passed ? " success" : " fail") : "")}
          style={{ width: progressPct + "%" }}
        ></div>
      </div>

      {/* Questions */}
      {!done ? (
        <div className="mini-quiz__card">
          <div className="mini-quiz__question">{q.q}</div>
          <div className="mini-quiz__options">
            {q.options.map((opt, oi) => {
              const answered = answers[currentQ] !== undefined;
              let cls = "mini-quiz__opt";
              if (answered) {
                if (oi === q.correct) cls += " correct";
                else if (oi === answers[currentQ]) cls += " wrong";
                else cls += " dim";
              }
              return (
                <button
                  key={oi}
                  type="button"
                  className={cls}
                  onClick={() => handleAnswer(currentQ, oi)}
                  disabled={answered}
                >
                  <span className="mini-quiz__opt-letter">
                    {String.fromCharCode(65 + oi)}.
                  </span>{" "}
                  {opt}
                </button>
              );
            })}
          </div>
          {showExplanation && answers[currentQ] !== undefined && (
            <div className="mini-quiz__explain">{q.explain}</div>
          )}
        </div>
      ) : (
        /* Résultat */
        <div className={"mini-quiz__result" + (passed ? " pass" : " fail")}>
          <div className="mini-quiz__result-icon">
            {passed ? "🎉" : "🔒"}
          </div>
          <div className="mini-quiz__result-score">
            {score} / {total} — {pct}%
          </div>
          <div className="mini-quiz__result-text">
            {passed
              ? "Parfait ! Vous maîtrisez cette leçon. Navigation débloquée."
              : pct >= 50
              ? `Il vous faut 90% pour débloquer la leçon suivante. Réessayez (${pct}% actuellement).`
              : "Le seuil n'est pas atteint. Relisez la leçon et réessayez."}
          </div>

          {!passed && (
            <button type="button" className="mini-quiz__retry-btn" onClick={retry}>
              🔄 Recommencer le quiz
            </button>
          )}
          {passed && (
            <div className="mini-quiz__unlock-msg">
              ↳ Vous pouvez passer à la leçon suivante
            </div>
          )}
        </div>
      )}
    </div>
  );
}
