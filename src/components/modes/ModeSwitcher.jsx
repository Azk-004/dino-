import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MODES, useMode } from "../../context/ModeContext.jsx";

export default function ModeSwitcher() {
  const { mode, setMode, meta, setIntroOpen } = useMode();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="mode-switcher" ref={ref}>
      <button
        className="mode-switcher-btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Changer d'univers visuel"
      >
        <span className="mode-dot" style={{ background: meta.accent, boxShadow: `0 0 10px ${meta.accent}` }} />
        <span className="mode-label mono">{meta.num} · {meta.name}</span>
        <span className={`mode-chev ${open ? "up" : ""}`}>▾</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mode-panel"
            role="listbox"
            aria-label="Univers visuels"
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mode-panel-head mono">UNIVERS VISUEL</div>
            {MODES.map((m) => {
              const active = m.id === mode;
              return (
                <button
                  key={m.id}
                  role="option"
                  aria-selected={active}
                  className={`mode-option ${active ? "active" : ""}`}
                  onClick={() => {
                    setMode(m.id);
                    setOpen(false);
                  }}
                  style={{ "--m-accent": m.accent, "--m-accent2": m.accent2 }}
                >
                  <span className="mode-option-num mono">{m.num}</span>
                  <span className="mode-option-body">
                    <span className="mode-option-name">{m.name}</span>
                    <span className="mode-option-tag mono">{m.tagline}</span>
                    <span className="mode-option-desc">{m.desc}</span>
                    <span className="mono mode-option-interact">✦ {m.interact}</span>
                  </span>
                  <span className="mode-option-check">{active ? "✓" : ""}</span>
                </button>
              );
            })}
            <button
              className="mode-panel-showall"
              onClick={() => {
                setOpen(false);
                setIntroOpen(true);
              }}
            >
              <span className="mono">✦</span> Voir les univers en plein écran
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
