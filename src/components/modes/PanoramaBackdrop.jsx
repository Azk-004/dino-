import { useEffect, useRef, useState } from "react";

const ADS = [
  { title: "AUDIT", sub: "ÉTAPE 01" },
  { title: "ÉTAT DES LIEUX", sub: "ÉTAPE 02" },
  { title: "ZONAGE", sub: "ÉTAPE 03" },
  { title: "LOTS", sub: "ÉTAPE 04" },
  { title: "CONCESSION", sub: "ÉTAPE 05" },
  { title: "ATTRIBUTION", sub: "ÉTAPE 06" },
  { title: "RÉGIES", sub: "ÉTAPE 07" },
];

const BOKEH = Array.from({ length: 14 }, (_, i) => ({
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 23) % 100}%`,
  size: 40 + ((i * 29) % 90),
  hue: [40, 30, 20, 45][i % 4],
  delay: `${(i % 6) * -2}s`,
}));

/**
 * UNIVERS 04 — PANORAMA (ocre).
 * Signature : l'affiche du belvédère s'incline en 3D vers le curseur, un clic
 * retourne l'affiche (cycle des 7 étapes du métier), le bokeh suit en parallaxe.
 * Palette ocre sur fond beige/taupe.
 */
export default function PanoramaBackdrop({ theme, compact = false }) {
  const day = theme === "day";
  const wrapRef = useRef(null);
  const [ad, setAd] = useState(0);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      const x = (e.clientX - r.left) / Math.max(r.width, 1) - 0.5;
      const y = (e.clientY - r.top) / Math.max(r.height, 1) - 0.5;
      wrap.style.setProperty("--tilt-x", x.toFixed(3));
      wrap.style.setProperty("--tilt-y", y.toFixed(3));
    };
    const onDown = (e) => {
      if (e.target && e.target.closest && e.target.closest("button, a, input, textarea, select, label, [role]")) return;
      setFlipping(true);
      setAd((a) => (a + 1) % ADS.length);
      setTimeout(() => setFlipping(false), 560);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  const current = ADS[ad];

  return (
    <div
      ref={wrapRef}
      className={`bb-wrap ${day ? "day" : "night"}${compact ? " compact" : ""}`}
      aria-hidden="true"
    >
      {/* bokeh de nuit — parallaxe inversée */}
      <div className="bb-bokeh">
        {BOKEH.map((b, i) => (
          <span
            key={i}
            className="bb-bokeh-dot"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              background: `radial-gradient(circle at 35% 35%, hsl(${b.hue} 50% 62% / 0.45), transparent 65%)`,
              animationDelay: b.delay,
            }}
          />
        ))}
      </div>

      {/* cadre du belvédère — inclinaison 3D au curseur */}
      <div className="bb-frame">
        <div className={`bb-screen${flipping ? " flipping" : ""}`} key={ad}>
          <span className="bb-kicker mono">AFFICHAGE NUMÉRIQUE · {current.sub}</span>
          <h2 className="bb-title">{current.title}</h2>
          <span className="bb-sub mono">LE MÉTIER QUI ÉCLAIRE LES VILLES</span>
          <div className="bb-sheen" />
        </div>
        {["tl", "tr", "bl", "br"].map((p) => (
          <span key={p} className={`bb-screw ${p}`} />
        ))}
      </div>

      {/* grain film + vignette */}
      <div className="bb-grain" />
      <div className="bb-vignette" />
    </div>
  );
}
