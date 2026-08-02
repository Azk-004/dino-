import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_TEXT =
  "Panneautique — Formation sur la gestion des panneaux publicitaires en espace public.";

function currentUrl() {
  return typeof window !== "undefined" ? window.location.href : "";
}

async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    /* Fallback pour navigateurs sans Clipboard API */
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
  }
}

export default function ShareButton({ variant = "pill" }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef(null);

  const url = currentUrl();
  const shareText = `${BASE_TEXT}\n${url}`;

  const handleCopy = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await copyToClipboard(url);
    setCopied(true);
    if (variant === "pill") {
      setTimeout(() => setOpen(false), 700);
    }
    setTimeout(() => setCopied(false), 1800);
  };

  const handleNativeShare = async (e) => {
    e.preventDefault();
    if (!navigator.share) return;
    try {
      await navigator.share({ title: "Panneautique", text: BASE_TEXT, url });
    } catch {
      /* Partage annulé par l'utilisateur */
    }
    setOpen(false);
  };

  /* Fermeture au clic extérieur + touche Échap */
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  /* Variante menu mobile : copie directe du lien */
  if (variant === "menu") {
    return (
      <button className="mobile-link share-menu-link" onClick={handleCopy}>
        <span className="mono">↗</span>
        {copied ? "Lien copié !" : "Partager le lien"}
      </button>
    );
  }

  const wa = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const mail = `mailto:?subject=${encodeURIComponent(
    "Panneautique — Formation"
  )}&body=${encodeURIComponent(shareText)}`;

  return (
    <div className="share-wrap" ref={wrapRef}>
      <button
        className={`share-btn ${open ? "on" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Partager"
        aria-expanded={open}
      >
        <span className="share-icon">↗</span>
        <span className="share-label">Partager</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="share-popover"
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="share-head">
              <span>Partager Panneautique</span>
              <button
                className="icon-btn"
                onClick={() => setOpen(false)}
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>

            <button
              className={`share-option ${copied ? "done" : ""}`}
              onClick={handleCopy}
            >
              <span className="share-option-icon">⧉</span>
              <span className="share-option-label">
                {copied ? "Lien copié !" : "Copier le lien"}
              </span>
            </button>

            {typeof navigator !== "undefined" && navigator.share && (
              <button className="share-option" onClick={handleNativeShare}>
                <span className="share-option-icon">⌘</span>
                <span className="share-option-label">Partager… (natif)</span>
              </button>
            )}

            <a
              className="share-option"
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
            >
              <span className="share-option-icon">✆</span>
              <span className="share-option-label">WhatsApp</span>
            </a>

            <a className="share-option" href={mail} onClick={() => setOpen(false)}>
              <span className="share-option-icon">✉</span>
              <span className="share-option-label">E-mail</span>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
