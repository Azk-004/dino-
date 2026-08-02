import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MODES, useMode } from "../../context/ModeContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import { useLocalStorage } from "../../lib/useLocalStorage.js";
import AtelierBackdrop from "./AtelierBackdrop.jsx";
import ArchivesBackdrop from "./ArchivesBackdrop.jsx";
import ObservatoireBackdrop from "./ObservatoireBackdrop.jsx";
import PanoramaBackdrop from "./PanoramaBackdrop.jsx";
import TerminalBackdrop from "./TerminalBackdrop.jsx";
import CarnetBackdrop from "./CarnetBackdrop.jsx";
import ImaginationBackdrop from "./ImaginationBackdrop.jsx";

/* Aperçus vivants (mini versions des illustrations plein écran) */
function LivePreview({ modeId, theme }) {
  if (modeId === "archives") return <ArchivesBackdrop theme={theme} />;
  if (modeId === "observatoire") return <ObservatoireBackdrop theme={theme} />;
  if (modeId === "panorama") return <PanoramaBackdrop theme={theme} compact />;
  if (modeId === "terminal") return <TerminalBackdrop theme={theme} />;
  if (modeId === "carnet") return <CarnetBackdrop theme={theme} />;
  if (modeId === "imagination") return <ImaginationBackdrop theme={theme} compact />;
  return <AtelierBackdrop theme={theme} />;
}

/**
 * Écran de choix des univers : s'ouvre à la première visite (localStorage)
 * ou à la demande depuis le sélecteur. Chaque carte montre un aperçu vivant.
 */
export default function ModeIntro() {
  const { mode, setMode, introOpen, setIntroOpen } = useMode();
  const { theme } = useTheme();
  const [hasSeen, setHasSeen] = useLocalStorage("pnt-intro-seen", false);

  // Première visite → ouvre l'intro
  useEffect(() => {
    if (!hasSeen) {
      const t = setTimeout(() => setIntroOpen(true), 900);
      return () => clearTimeout(t);
    }
  }, [hasSeen, setIntroOpen]);

  // Bloque le scroll de fond pendant l'intro (Lenis respecte data-lenis-prevent)
  useEffect(() => {
    document.documentElement.style.overflow = introOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [introOpen]);

  const close = () => {
    setHasSeen(true);
    setIntroOpen(false);
  };

  const choose = (id) => {
    setMode(id);
    close();
  };

  return (
    <AnimatePresence>
      {introOpen && (
        <motion.div
          className="mode-intro"
          data-lenis-prevent
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: "easeInOut" }}
        >
          <div className="mode-intro-glow" />
          <header className="mode-intro-head">
            <span className="kicker mono">PANNEAUTIQUE · CHOISISSEZ VOTRE UNIVERS</span>
            <h1>
              {MODES.length} façons de <em>vivre</em> la formation
            </h1>
            <p className="lead">
              Sept univers, sept manières de lire le même cours : marcher dans
              un village de panneaux, consulter un registre, piloter un
              mainframe IBM, feuilleter un carnet illustré ou dériver dans un
              cosmos génératif. Changez d'univers à tout moment depuis la barre
              de navigation.
            </p>
          </header>

          <div className="mode-intro-grid">
            {MODES.map((m, i) => {
              const active = m.id === mode;
              return (
                <motion.button
                  key={m.id}
                  className={`mode-intro-card ${active ? "active" : ""}`}
                  style={{ "--m-accent": m.accent, "--m-accent2": m.accent2, "--i": i }}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 + i * 0.09, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => choose(m.id)}
                  aria-label={`Choisir l'univers ${m.name}`}
                >
                  <div className="mode-intro-preview">
                    <LivePreview modeId={m.id} theme={theme} />
                    <span className="mode-intro-num mono">{m.num}</span>
                  </div>
                  <div className="mode-intro-body">
                    <h3>{m.name}</h3>
                    <span className="mono mode-intro-tag">{m.tagline}</span>
                    <p>{m.desc}</p>
                    <span className="mono mode-intro-interact" style={{ "--i-accent": m.accent }}>
                      ✦ {m.interact}
                    </span>
                    <span className="mode-intro-cta">
                      {active ? "Univers actuel ✓" : "Choisir cet univers →"}
                    </span>
                  </div>
                </motion.button>
              );
            })}
          </div>

          <button className="btn btn-ghost mode-intro-skip" onClick={close}>
            <span>Continuer avec l'univers actuel</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
