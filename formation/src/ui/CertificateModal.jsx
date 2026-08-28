import { useEffect } from "react";

// Certificat de formation délivré par la plateforme (Panotik) une fois le module
// validé (score ≥ 70 %). Le document est imprimable via @media print du style.css.
export default function CertificateModal({ cert, onClose }) {
  useEffect(() => {
    if (cert) document.documentElement.classList.add("cert-lock");
    else document.documentElement.classList.remove("cert-lock");
    return () => document.documentElement.classList.remove("cert-lock");
  }, [cert]);

  useEffect(() => {
    if (!cert) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cert, onClose]);

  return (
    <div id="ui-cert" className={"cert-wrap" + (cert ? " show" : "")} aria-hidden={!cert} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="cert-panel" data-lenis-prevent>
        <button id="cert-close" className="cert-close" aria-label="Fermer" onClick={onClose}>×</button>
        {cert && (
          <>
            <div className="cert-sheet">
              <div className="cert-seal">P</div>
              <div className="cert-brand">
                <span className="brand-mark"></span> Panneautique · Domaine public
              </div>
              <h2 className="cert-title">Certificat</h2>
              <div className="cert-rule"></div>
              <p className="cert-desc">Ceci certifie que</p>
              <div className="cert-name" id="cert-name">{cert.holder}</div>
              <div className="cert-module" id="cert-module">Module 1 - La Panneautique. Domaine public :</div>
              <div className="cert-score" id="cert-score">
                Score final : <strong>{cert.score} / {cert.total} ({cert.pct} %)</strong> - module validé par la plateforme
              </div>
              <div className="cert-meta">
                <div className="cert-meta-col">
                  <span className="cert-meta-label">Délivré par la plateforme</span>
                  <span className="cert-sig">Panotik</span>
                </div>
                <div className="cert-meta-col cert-meta-col--date">
                  <span className="cert-meta-label">Date</span>
                  <span id="cert-date" className="cert-sig">{cert.date}</span>
                </div>
              </div>
            </div>
            <button id="cert-print" className="cert-print" onClick={() => { onClose(); setTimeout(() => window.print(), 60); }}>
              Imprimer le certificat
            </button>
          </>
        )}
      </div>
    </div>
  );
}
