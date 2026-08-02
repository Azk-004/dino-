import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "../../context/ModeContext.jsx";

/**
 * Wipe cinématique à chaque changement d'univers.
 * Deux panneaux accent balayent l'écran (comme un rideau), le nom du nouvel
 * univers s'affiche au centre, puis le rideau se rouvre sur le nouveau décor.
 */
export default function ModeWipe() {
  const { mode, meta } = useMode();
  const prev = useRef(mode);
  const [wipe, setWipe] = useState(null); // { mode, accent, accent2, num, name, tagline }

  useEffect(() => {
    if (prev.current === mode) return;
    prev.current = mode;
    setWipe({
      mode,
      accent: meta.accent,
      accent2: meta.accent2,
      num: meta.num,
      name: meta.name,
      tagline: meta.tagline,
    });
    const t = setTimeout(() => setWipe(null), 1250);
    return () => clearTimeout(t);
  }, [mode, meta]);

  return (
    <AnimatePresence>
      {wipe && (
        <motion.div
          key={wipe.mode + wipe.num}
          className="mode-wipe"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
          style={{ "--wipe-accent": wipe.accent, "--wipe-accent2": wipe.accent2 }}
        >
          {/* Rideau gauche */}
          <motion.div
            className="mode-wipe-panel left"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />
          {/* Rideau droit */}
          <motion.div
            className="mode-wipe-panel right"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
          />

          {/* Étiquette centrale */}
          <motion.div
            className="mode-wipe-label"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.22, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mode-wipe-num mono">{wipe.num}</span>
            <span className="mode-wipe-name">{wipe.name}</span>
            <span className="mode-wipe-tag mono">{wipe.tagline}</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
