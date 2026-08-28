import { useEffect, useRef } from "react";
import { initCourse } from "../course.js";

// Mode lecture illustré (#ui-course) : le moteur course.js construit le sommaire
// et les sections dans le DOM et gère lui-même les transitions.
// On monte l'instance dans courseRef pour le contrôleur.
export default function CourseOverlay({ courseRef, onExit, onScrollTo, onQuiz }) {
  const cbRef = useRef({ onExit, onScrollTo, onQuiz });
  cbRef.current = { onExit, onScrollTo, onQuiz };

  useEffect(() => {
    if (courseRef.current) return;
    courseRef.current = initCourse({
      onExit: () => cbRef.current.onExit(),
      onScrollTo: (top, behavior) => cbRef.current.onScrollTo(top, behavior),
      onQuiz: () => cbRef.current.onQuiz(),
    });
    return () => {
      courseRef.current?.close();
      courseRef.current = null;
    };
  }, [courseRef]);

  return (
    <div id="ui-course">
      <header className="course-header">
        <div className="course-header-brand">
          <span className="brand-mark"></span>
          <span>Panneautique · Domaine public - Mode lecture</span>
        </div>
        <select id="course-toc-select" aria-label="Sommaire"></select>
        <button id="course-close" className="course-close">← Retour au parcours 3D</button>
      </header>
      <aside className="course-toc" id="course-toc" data-lenis-prevent></aside>
      <main className="course-main" data-lenis-prevent>
        <header className="course-cover" id="course-cover"></header>
        <div id="course-sections"></div>
        <footer className="course-foot">
          <button id="course-quiz-btn" className="course-cta">Faire le questionnaire du parcours 3D →</button>
        </footer>
      </main>
    </div>
  );
}
