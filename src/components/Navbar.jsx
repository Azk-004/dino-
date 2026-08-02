import { useEffect, useState } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext.jsx";
import ModeSwitcher from "./modes/ModeSwitcher.jsx";
import ShareButton from "./ShareButton.jsx";

const LINKS = [
  { to: "/", label: "Accueil" },
  { to: "/lecon/l1", label: "Leçons" },
  { to: "/revision", label: "Révision" },
  { to: "/quiz", label: "Quiz" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const focus = document.documentElement.dataset.focus === "on";

  useEffect(() => setOpen(false), [location.pathname]);

  if (focus) return null;

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        PANNEAUTIQUE<span className="logo-dot" />
      </Link>

      <nav className="nav-links">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="nav-actions">
        <ModeSwitcher />
        <ShareButton />
        <button
          className="theme-toggle"
          onClick={toggle}
          aria-label={`Passer en mode ${theme === "night" ? "jour" : "nuit"}`}
        >
          <motion.span
            key={theme}
            initial={{ rotate: -120, opacity: 0, scale: 0.4 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 16 }}
            className="theme-icon"
          >
            {theme === "night" ? "🌙" : "☀️"}
          </motion.span>
          <span className="theme-label">{theme === "night" ? "Nuit" : "Jour"}</span>
        </button>
        <button
          className={`burger ${open ? "open" : ""}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24 }}
          >
            {LINKS.map((l, i) => (
              <NavLink key={l.to} to={l.to} className="mobile-link">
                <span className="mono">0{i + 1}</span> {l.label}
              </NavLink>
            ))}
            <button className="mobile-link" onClick={toggle}>
              <span className="mono">05</span>
              {theme === "night" ? "Passer en jour" : "Passer en nuit"}
            </button>
            <ShareButton variant="menu" />
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
