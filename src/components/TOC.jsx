import { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { curriculum, allLessons } from "../data/curriculum.js";
import { useLocalStorage } from "../lib/useLocalStorage.js";

export default function TOC({ onNavigate }) {
  const { id } = useParams();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 1024
  );
  const [openChapters, setOpenChapters] = useState(() => {
    const current = allLessons.find((l) => l.id === id);
    return new Set(current ? [current.chapterId] : []);
  });
  const [progress] = useLocalStorage("pnt-progress", {});

  const doneCount = allLessons.filter((l) => progress[l.id]?.done).length;
  const pct = Math.round((doneCount / allLessons.length) * 100);

  const toggleChapter = (cid) =>
    setOpenChapters((prev) => {
      const next = new Set(prev);
      next.has(cid) ? next.delete(cid) : next.add(cid);
      return next;
    });

  return (
    <aside className={`toc ${collapsed ? "toc-collapsed" : ""}`}>
      <div className="toc-head">
        <button
          className="toc-collapse-btn"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Ouvrir le sommaire" : "Réduire le sommaire"}
        >
          {collapsed ? "☰" : "«"}
        </button>
        {!collapsed && (
          <div className="toc-title">
            <span className="mono">SOMMAIRE</span>
            <div className="toc-progress">
              <div className="toc-progress-track">
                <div className="toc-progress-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="mono toc-pct">{pct}%</span>
            </div>
          </div>
        )}
      </div>

      <AnimatePresence>
        {!collapsed && (
          <motion.nav
            className="toc-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {curriculum.map((m) => (
              <div key={m.id} className="toc-module">
                <div className="toc-module-title">
                  <span className="mono">{m.module}</span> — {m.title}
                </div>
                {m.chapters.map((c) => (
                  <div key={c.id} className="toc-chapter">
                    <button
                      className="toc-chapter-btn"
                      onClick={() => toggleChapter(c.id)}
                      aria-expanded={openChapters.has(c.id)}
                    >
                      <span>{c.title}</span>
                      <span className="mono toc-chevron">
                        {openChapters.has(c.id) ? "▾" : "▸"}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openChapters.has(c.id) && (
                        <motion.ul
                          className="toc-lessons"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                        >
                          {c.lessons.map((l) => {
                            const active = l.id === id;
                            const done = progress[l.id]?.done;
                            return (
                              <li key={l.id}>
                                <Link
                                  to={`/lecon/${l.id}`}
                                  className={`toc-lesson ${active ? "active" : ""}`}
                                  onClick={onNavigate}
                                >
                                  <span className={`toc-check ${done ? "done" : ""}`}>
                                    {done ? "✓" : ""}
                                  </span>
                                  <span className="toc-lesson-title">
                                    <span className="mono toc-lesson-num">{l.num}</span>
                                    {l.title}
                                  </span>
                                  {active && <span className="toc-now">●</span>}
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            ))}
            <div className="toc-foot">
              <Link
                to="/quiz"
                className={`toc-quiz-link ${location.pathname === "/quiz" ? "active" : ""}`}
              >
                <span className="mono">Q</span> Questionnaire du module
              </Link>
              <Link
                to="/revision"
                className={`toc-quiz-link ${location.pathname === "/revision" ? "active" : ""}`}
              >
                <span className="mono">R</span> Mode révision
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </aside>
  );
}
