import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSettings, FONT_FAMILIES } from "../context/SettingsContext.jsx";

const SIZE_OPTIONS = [
  { id: "s", label: "A", hint: "Petit" },
  { id: "m", label: "A", hint: "Moyen", strong: true },
  { id: "l", label: "A", hint: "Grand", strong: true },
  { id: "xl", label: "A", hint: "Très grand", strong: true },
];

const LINE_OPTIONS = [
  { id: "compact", label: "Compact" },
  { id: "normal", label: "Normal" },
  { id: "relaxed", label: "Aéré" },
];

const FAMILY_OPTIONS = [
  { id: "sans", label: "Grotesk" },
  { id: "serif", label: "Serif" },
  { id: "dyslexic", label: "OpenDyslexic" },
];

export default function SettingsPanel() {
  const { settings, set } = useSettings();
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={`fab ${open ? "fab-open" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Réglages de lecture"
        aria-expanded={open}
      >
        <span className="fab-aa">Aa</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="settings-panel"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            <div className="settings-head">
              <span>Réglages de lecture</span>
              <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Fermer">
                ✕
              </button>
            </div>

            <div className="setting-row">
              <span className="setting-label">Taille du texte</span>
              <div className="seg">
                {SIZE_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    className={`seg-btn ${settings.fontSize === o.id ? "on" : ""}`}
                    onClick={() => set({ fontSize: o.id })}
                    title={o.hint}
                    style={{ fontSize: o.strong ? (o.id === "xl" ? 20 : 17) : 13 }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="setting-row">
              <span className="setting-label">Interligne</span>
              <div className="seg">
                {LINE_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    className={`seg-btn ${settings.lineHeight === o.id ? "on" : ""}`}
                    onClick={() => set({ lineHeight: o.id })}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="setting-row">
              <span className="setting-label">Police</span>
              <div className="seg">
                {FAMILY_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    className={`seg-btn ${settings.fontFamily === o.id ? "on" : ""}`}
                    onClick={() => set({ fontFamily: o.id })}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="setting-foot">
              <span>Préférences sauvegardées sur cet appareil</span>
              <button
                className="link-btn"
                onClick={() => set({ fontSize: "m", lineHeight: "normal", fontFamily: "sans" })}
              >
                Réinitialiser
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
