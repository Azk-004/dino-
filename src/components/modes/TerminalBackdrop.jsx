const LINES = [
  "C> DIR PANNEAUTIQUE",
  "AUDIT.TXT     12KB",
  "ZONAGE.TXT     8KB",
  "CONCESSION.TXT  6KB",
  "C> TYPE COURS.MOD1",
  "GESTION DES REGIES...",
  "ATTRIBUTION.... OK",
  "POLLUTION VISUELLE...",
  "C> RUN FORMATION.EXE",
  "ÉVALUATION EN COURS...",
  "MISE À JOUR........ OK",
];

/**
 * UNIVERS 05 — TERMINAL IBM (phosphore vert).
 * Fond plein écran : un mainframe avec lignes de code vertes, scanlines
 * et halo phosphore. Fini l'arc-en-ciel — ici tout est vert.
 */
export default function TerminalBackdrop({ theme }) {
  const day = theme === "day";
  return (
    <div className={`tb-wrap ${day ? "day" : "night"}`} aria-hidden="true">
      <div className="tb-code">
        {LINES.map((l, i) => (
          <span key={i} className="tb-line" style={{ "--i": i }}>
            {l}
          </span>
        ))}
        <span className="tb-cursor" />
      </div>
      <div className="tb-scanlines" />
      <div className="tb-glow" />
      <div className="tb-vignette" />
    </div>
  );
}
