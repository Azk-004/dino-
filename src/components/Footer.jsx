import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

export default function Footer() {
  const { theme, toggle } = useTheme();
  return (
    <footer className="footer">
      <div className="footer-neon" />
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="logo">
            PANNEAUTIQUE<span className="logo-dot" />
          </div>
          <p>
            Formation en ligne — Gestion &amp; exploitation des panneaux
            publicitaires en espace public. Contenu académique du Module 1 :
            Domaine public.
          </p>
        </div>
        <div className="footer-col">
          <h4>Formation</h4>
          <Link to="/lecon/l1">Introduction</Link>
          <Link to="/lecon/l3">Les 7 étapes</Link>
          <Link to="/revision">Mode révision</Link>
          <Link to="/quiz">Questionnaire</Link>
        </div>
        <div className="footer-col">
          <h4>Ambiance</h4>
          <button className="link-btn" onClick={toggle}>
            {theme === "night" ? "🌙 Passer en jour" : "☀️ Passer en nuit"}
          </button>
          <span className="footer-muted">Transition lever / coucher de soleil</span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 Panneautique · Formation — Domaine public</span>
        <span className="mono">MODULE 01 / 01 — AUDIT → RÉGIES</span>
      </div>
    </footer>
  );
}
