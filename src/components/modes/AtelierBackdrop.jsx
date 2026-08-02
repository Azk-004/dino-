const SKYLINE = [
  { w: 9, h: 40, neon: false },
  { w: 6, h: 62, neon: true },
  { w: 7, h: 34, neon: false },
  { w: 10, h: 78, neon: true },
  { w: 6, h: 48, neon: false },
  { w: 8, h: 30, neon: false },
  { w: 7, h: 55, neon: true },
  { w: 9, h: 70, neon: false },
  { w: 6, h: 38, neon: false },
  { w: 8, h: 52, neon: true },
  { w: 7, h: 66, neon: false },
  { w: 9, h: 44, neon: true },
];

const STARS = Array.from({ length: 46 }, (_, i) => ({
  left: `${(i * 61) % 100}%`,
  top: `${(i * 37) % 60}%`,
  size: 1 + ((i * 13) % 3),
  delay: `${(i % 8) * 0.7}s`,
}));

/**
 * UNIVERS 01 — ATELIER DU PLAN (terracotta).
 * Fond plein écran : skyline de la Ville vue de l'atelier, liseré d'accent
 * terracotta sur les façades, route et brume. Les couleurs vivent dans
 * modes.css (.bd-*), la gamme est beige/taupe.
 */
export default function AtelierBackdrop({ theme }) {
  const day = theme === "day";

  return (
    <div className={`bd-wrap ${day ? "day" : "night"}`} aria-hidden="true">
      <div className="bd-sky" />
      {!day && (
        <div className="bd-stars">
          {STARS.map((s, i) => (
            <span
              key={i}
              style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDelay: s.delay }}
            />
          ))}
        </div>
      )}

      <div className="bd-city">
        {SKYLINE.map((b, i) => (
          <div
            key={i}
            className="bd-building"
            style={{ width: `${b.w}%`, height: `${b.h}%` }}
          >
            {b.neon && <span className="bd-neon" />}
          </div>
        ))}
      </div>

      <div className="bd-road">
        <div className="bd-reflect" />
      </div>
      <div className="bd-fog" />
    </div>
  );
}
