const STROKES = Array.from({ length: 9 }, (_, i) => ({
  top: `${(i * 37 + 11) % 92}%`,
  left: `${(i * 53 + 23) % 92}%`,
  rot: (i * 47) % 360,
  s: 0.5 + ((i * 13) % 10) / 9,
}));

/**
 * UNIVERS 06 — CARNET ILLUSTRÉ (indigo).
 * Fond plein écran : une page de carnet d'étude — papier, filet à dessin,
 * quelques tracés d'encre. La gamme est papier/indigo.
 */
export default function CarnetBackdrop({ theme }) {
  const day = theme === "day";
  return (
    <div className={`cnb-wrap ${day ? "day" : "night"}`} aria-hidden="true">
      <div className="cnb-grid" />
      <div className="cnb-rule" />
      <div className="cnb-hole tl" />
      <div className="cnb-hole tr" />
      <div className="cnb-hole bl" />
      <div className="cnb-hole br" />
      {STROKES.map((s, i) => (
        <svg
          key={i}
          className="cnb-stroke"
          style={{
            top: s.top,
            left: s.left,
            transform: `rotate(${s.rot}deg) scale(${s.s})`,
            animationDelay: `${(i % 5) * 1.3}s`,
          }}
          viewBox="0 0 120 120"
        >
          <path
            d="M20 60 C 40 30, 80 30, 100 60 C 80 90, 40 90, 20 60 Z"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ))}
      <div className="cnb-vignette" />
    </div>
  );
}
