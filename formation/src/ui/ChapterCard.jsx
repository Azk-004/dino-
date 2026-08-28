import { useRef, useEffect, useState } from "react";

/**
 * Carte de transition entre chapitres, style IBM Learning.
 * Affiche le numéro, le nom, la description, les objectifs et le nombre de leçons.
 * Apparaît avec une animation de fondu quand elle entre dans le viewport.
 */
export default function ChapterCard({ chapter, index, totalStations, stationsCount }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!chapter) return null;

  return (
    <div
      ref={ref}
      className={`chapter-card ${visible ? "chapter-card--visible" : ""}`}
      style={{ "--accent": chapter.color || "var(--terracotta)" }}
    >
      {/* Bandeau coloré en haut */}
      <div className="chapter-card__banner">
        <span className="chapter-card__icon">{chapter.icon}</span>
        <span className="chapter-card__number">Chapitre {String(index + 1).padStart(2, "0")}</span>
      </div>

      {/* Corps de la carte */}
      <div className="chapter-card__body">
        <h2 className="chapter-card__title">{chapter.label}</h2>
        <div className="chapter-card__rule"></div>
        <p className="chapter-card__desc">{chapter.description}</p>

        {/* Objectifs */}
        {chapter.objectives && chapter.objectives.length > 0 && (
          <div className="chapter-card__objectives">
            <span className="chapter-card__objectives-label">Objectifs du chapitre</span>
            <ul className="chapter-card__objectives-list">
              {chapter.objectives.map((obj, i) => (
                <li key={i} className="chapter-card__objective">
                  <span className="chapter-card__objective-check">✓</span>
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Méta */}
        <div className="chapter-card__meta">
          <span className="chapter-card__meta-chip">
            {stationsCount} leçon{stationsCount > 1 ? "s" : ""}
          </span>
          <span className="chapter-card__meta-chip">
            Quiz de chapitre inclus
          </span>
        </div>
      </div>

      {/* Coins décoratifs */}
      <div className="chapter-card__corner chapter-card__corner--tl"></div>
      <div className="chapter-card__corner chapter-card__corner--br"></div>
    </div>
  );
}
