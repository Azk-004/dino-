import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { blockTag, blockTitle, renderSegments } from "../../lib/reader.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

/* Palette STUDIO — sauge, ocre doux, olive, ardoise : une maquette
   d'observatoire urbain, sobre et professionnelle. Fini l'arc-en-ciel. */
const PALETTE = ["#5f7a5a", "#7a9470", "#4a5f45", "#8a9a6a", "#3f5c52", "#6b8463", "#94a67a", "#576b4e"];
const DPR_CAP = 2;
const hash = (n) => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

/**
 * UNIVERS 03 — OBSERVATOIRE URBAIN (sauge).
 * On LIT le cours en survolant une maquette de la Ville : chaque bloc est
 * un quartier coloré posé sur le plateau isométrique qui tourne au
 * mouvement de la souris. CLIQUEZ un quartier : il se soulève, son numéro
 * s'illumine et son contenu s'affiche sur la plaque d'observatoire en
 * dessous. Chaque quartier a des fenêtres, une ombre, et le plateau est
 * traversé d'avenues.
 */
export default function ObservatoireReader({ blocks, rangesFor, speakingIdx, onMarkClick }) {
  const { theme } = useTheme();
  const day = theme === "day";
  const canvasRef = useRef(null);
  const rot = useRef(0);
  const target = useRef(0);
  const hover = useRef(-1);
  const [active, setActive] = useState(0);
  const [visited, setVisited] = useState(() => new Set([0]));
  const pointer = useRef({ x: 0.5, y: 0.5, in: false });

  /* Scène canvas : maquette de la ville */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let running = true;
    let W = 0;
    let H = 0;
    let dpr = 1;

    const stars = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random() * 0.5,
      r: Math.random() * 1.6 + 0.4,
      tw: Math.random() * 6.28,
    }));

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(W * dpr));
      canvas.height = Math.max(1, Math.floor(H * dpr));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = (e.clientX - rect.left) / Math.max(rect.width, 1);
      pointer.current.y = (e.clientY - rect.top) / Math.max(rect.height, 1);
      pointer.current.in =
        e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;
    };
    const onLeave = () => (pointer.current.in = false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("blur", onLeave);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (t) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* Ciel + soleil (beige/écru le jour, taupe la nuit) */
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      if (day) {
        sky.addColorStop(0, "#ece4d1");
        sky.addColorStop(1, "#f5f0e4");
      } else {
        sky.addColorStop(0, "#1d1810");
        sky.addColorStop(1, "#12100a");
      }
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      if (!day) {
        ctx.fillStyle = "#f5ecdd";
        stars.forEach((s) => {
          const a = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.4 + s.tw));
          ctx.globalAlpha = a;
          ctx.beginPath();
          ctx.arc(s.x * W, s.y * H, s.r, 0, 6.283);
          ctx.fill();
        });
        ctx.globalAlpha = 1;
      } else {
        const sun = ctx.createRadialGradient(W * 0.8, H * 0.16, 6, W * 0.8, H * 0.16, 90);
        sun.addColorStop(0, "rgba(255,224,178,0.9)");
        sun.addColorStop(1, "rgba(255,224,178,0)");
        ctx.fillStyle = sun;
        ctx.fillRect(W * 0.6, 0, W * 0.4, H * 0.4);
      }

      const cx = W / 2;
      const cy = H * 0.58;
      const R = Math.min(W, H) * 0.3;

      if (pointer.current.in) target.current = (pointer.current.x - 0.5) * 1.8;
      rot.current += (target.current - rot.current) * 0.05;
      const rotv = rot.current;

      /* Plateau */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.42);
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.35, 0, 6.283);
      ctx.fillStyle = day ? "rgba(233,226,210,0.95)" : "rgba(38,32,21,0.95)";
      ctx.fill();
      ctx.strokeStyle = day ? "rgba(120,110,85,0.35)" : "rgba(230,214,170,0.14)";
      ctx.lineWidth = 2.5;
      ctx.stroke();
      for (let ring = 1; ring <= 3; ring++) {
        ctx.beginPath();
        ctx.arc(0, 0, R * 1.35 * (ring / 3), 0, 6.283);
        ctx.strokeStyle = day ? "rgba(120,110,85,0.2)" : "rgba(230,214,170,0.08)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      for (let i = 0; i < blocks.length; i++) {
        const a = rotv + (i * 6.283) / blocks.length;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * R * 1.35, Math.sin(a) * R * 1.35);
        ctx.strokeStyle = day ? "rgba(120,110,85,0.14)" : "rgba(230,214,170,0.07)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      /* Avenues croisées */
      ctx.strokeStyle = day ? "rgba(255,252,244,0.6)" : "rgba(235,220,180,0.14)";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(-R * 1.35, 0);
      ctx.lineTo(R * 1.35, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -R * 1.35);
      ctx.lineTo(0, R * 1.35);
      ctx.stroke();
      ctx.restore();

      /* Arbres autour du plateau */
      const s = Math.max(22, Math.min(W, H) * 0.042);
      for (let i = 0; i < 8; i++) {
        const a = rotv + i * 0.785 + 0.4;
        const r = R * 1.1;
        const tx = cx + Math.cos(a) * r;
        const ty = cy + Math.sin(a) * r * 0.42;
        ctx.fillStyle = day ? "rgba(110,100,75,0.18)" : "rgba(0,0,0,0.4)";
        ctx.beginPath();
        ctx.ellipse(tx, ty, s * 0.8, s * 0.3, 0, 0, 6.283);
        ctx.fill();
        ctx.fillStyle = day ? "#7a6a52" : "#2a2118";
        ctx.fillRect(tx - 2, ty - s * 0.5, 4, s * 0.5);
        ctx.fillStyle = day ? "#5f7a5a" : "#3a4a36";
        ctx.beginPath();
        ctx.arc(tx, ty - s * 0.65, s * 0.55, 0, 6.283);
        ctx.fill();
        ctx.fillStyle = day ? "#7a9470" : "#4a5f45";
        ctx.beginPath();
        ctx.arc(tx - s * 0.14, ty - s * 0.8, s * 0.38, 0, 6.283);
        ctx.fill();
      }

      /* Modules (quartiers) triés par profondeur */
      const sB = Math.max(26, Math.min(W, H) * 0.05);
      const items = blocks
        .map((b, i) => {
          const a = rotv + (i * 6.283) / blocks.length;
          return { i, a, px: Math.cos(a) * R * 0.82, py: Math.sin(a) * R * 0.82, depth: Math.cos(a) };
        })
        .sort((x, y) => x.depth - y.depth);

      /* Détection survol */
      let hov = -1;
      let hovD = Infinity;
      if (pointer.current.in) {
        const pxx = pointer.current.x * W;
        const pyy = pointer.current.y * H;
        items.forEach((m) => {
          const bx = cx + m.px;
          const by = cy + m.py * 0.42 - sB;
          const d = Math.hypot(pxx - bx, pyy - by);
          if (d < hovD) {
            hovD = d;
            hov = m.i;
          }
        });
        if (hovD > 100) hov = -1;
      }
      hover.current = hov;

      items.forEach((m) => {
        const accent = PALETTE[m.i % PALETTE.length];
        const front = m.depth > 0.35;
        const isHov = m.i === hover.current;
        const isActive = m.i === active;
        const lift = (isActive ? 18 : 0) + (isHov ? 9 : 0);
        const height = 40 + (hash(m.i * 3.1) * 30) + lift;
        const bx = cx + m.px;
        const by = cy + m.py * 0.42;
        const dark = shade(accent, -52);
        const mid = shade(accent, -24);
        const light = shade(accent, 4);
        const top = shade(accent, 28);

        /* Ombre portée */
        ctx.fillStyle = day ? "rgba(110,100,75,0.24)" : "rgba(0,0,0,0.55)";
        ctx.beginPath();
        ctx.ellipse(bx, by + 2, sB * 1.6, sB * 0.62, 0, 0, 6.283);
        ctx.fill();

        /* Faces */
        ctx.fillStyle = dark;
        ctx.beginPath();
        ctx.moveTo(bx - sB, by);
        ctx.lineTo(bx - sB, by - height);
        ctx.lineTo(bx, by - height + sB * 0.5);
        ctx.lineTo(bx, by + sB * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = mid;
        ctx.beginPath();
        ctx.moveTo(bx + sB, by);
        ctx.lineTo(bx + sB, by - height);
        ctx.lineTo(bx, by - height + sB * 0.5);
        ctx.lineTo(bx, by + sB * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = top;
        ctx.beginPath();
        ctx.moveTo(bx - sB, by - height);
        ctx.lineTo(bx, by - height - sB * 0.42);
        ctx.lineTo(bx + sB, by - height);
        ctx.lineTo(bx, by - height + sB * 0.5);
        ctx.closePath();
        ctx.fill();

        /* Fenêtres sur la face avant */
        const nw = Math.max(2, Math.floor(height / 14));
        for (let r = 0; r < nw; r++) {
          if (hash(m.i * 7.3 + r * 5.1) > 0.45) {
            const lit = !day && hash(m.i * 13.7 + r * 7.7) > 0.4;
            ctx.fillStyle = lit ? "rgba(255,222,160,0.95)" : day ? "rgba(255,252,244,0.65)" : "rgba(214,200,160,0.35)";
            const wy = by - height + sB * 0.5 + r * (height / nw) + 4;
            ctx.fillRect(bx + sB * 0.25, wy, sB * 0.5, height / nw - 7);
          }
        }

        /* Liseré */
        ctx.strokeStyle = isHov || isActive ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.5)";
        ctx.lineWidth = isHov || isActive ? 2 : 1;
        ctx.strokeRect(bx - sB, by - height, sB * 2, sB);

        /* Étiquette numéro */
        if (front || isHov || isActive) {
          ctx.fillStyle = day ? "rgba(70,80,55,0.9)" : "rgba(245,236,221,0.95)";
          ctx.font = `700 ${Math.max(9, sB * 0.36)}px "Space Mono", monospace`;
          ctx.textAlign = "center";
          ctx.fillText(String(m.i + 1).padStart(2, "0"), bx, by - height - 9);
        }

        /* Halo actif */
        if (isActive) {
          const hg = ctx.createRadialGradient(bx, by - height / 2, 0, bx, by - height / 2, 85);
          hg.addColorStop(0, day ? "rgba(255,255,255,0.55)" : "rgba(255,228,180,0.4)");
          hg.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = hg;
          ctx.beginPath();
          ctx.arc(bx, by - height / 2, 85, 0, 6.283);
          ctx.fill();
        }
      });

      /* Consigne */
      ctx.fillStyle = day ? "rgba(70,80,55,0.55)" : "rgba(245,236,221,0.6)";
      ctx.font = `600 ${Math.max(10, W * 0.011)}px "Space Mono", monospace`;
      ctx.textAlign = "left";
      ctx.fillText("CLIQUEZ UN QUARTIER — LISEZ LE BLOC", 14, 22);
    };

    const loop = (time) => {
      if (!running) return;
      if (reduced) {
        draw(0);
        return;
      }
      if (document.hidden) return;
      draw(time / 1000);
      raf = requestAnimationFrame(loop);
    };
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduced) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeave);
      ro.disconnect();
    };
  }, [day, blocks.length, active]);

  /* Clic : sélectionner le quartier survolé */
  const pick = (e) => {
    if (e.target && e.target.closest && e.target.closest("button, a, input, textarea, select, [role]")) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    if (px < 0 || py < 0 || px > rect.width || py > rect.height) return;
    if (hover.current >= 0) {
      setActive(hover.current);
      setVisited((v) => new Set(v).add(hover.current));
    }
  };

  /* Suivi TTS : le quartier lu vient en avant */
  useEffect(() => {
    if (speakingIdx == null || speakingIdx < 0 || speakingIdx >= blocks.length) return;
    if (speakingIdx !== active) {
      setActive(speakingIdx);
      setVisited((v) => new Set(v).add(speakingIdx));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speakingIdx]);

  const block = blocks[active];
  const accent = PALETTE[active % PALETTE.length];

  return (
    <div className="dr-reader" data-day={day ? "1" : "0"} style={{ "--dr-accent": accent }}>
      <div className="dr-stage">
        <canvas ref={canvasRef} className="exp-canvas" onClick={pick} aria-hidden="true" />
      </div>

      {/* Plaque d'observatoire de lecture */}
      <div className="dr-plaque">
        <div className="dr-plaque-head mono">
          <span className="dr-plaque-tag" style={{ color: accent }}>
            QUARTIER {String(active + 1).padStart(2, "0")} · {blockTag(block).toUpperCase()}
          </span>
          <span className="dr-plaque-nav">
            <button
              className="dr-nav mono"
              onClick={() => {
                const n = (active - 1 + blocks.length) % blocks.length;
                setActive(n);
                setVisited((v) => new Set(v).add(n));
              }}
              aria-label="Quartier précédent"
            >
              ←
            </button>
            <span className="dr-count mono">{active + 1}/{blocks.length}</span>
            <button
              className="dr-nav mono"
              onClick={() => {
                const n = (active + 1) % blocks.length;
                setActive(n);
                setVisited((v) => new Set(v).add(n));
              }}
              aria-label="Quartier suivant"
            >
              →
            </button>
          </span>
        </div>

        <AnimatePresence mode="wait">
          {/* PAS de classe block-* ici : l'élément sémantique interne
              porte la carte (sinon double boîte empilée) */}
          <motion.div
            key={active}
            className={`dr-plaque-body${speakingIdx === active ? " speaking" : ""}`}
            data-block={active}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {block.type === "h3" ? (
              <h3 className="block-h3">{block.text}</h3>
            ) : block.type === "list" ? (
              <ul className="block-list">
                {block.items.map((it, k) => (
                  <li key={k}>{it}</li>
                ))}
              </ul>
            ) : block.type === "steps" ? (
              <div className="step-blocks">
                {block.items.map((s, k) => (
                  <div className="step-item" key={s.n} style={{ "--step-accent": PALETTE[k % PALETTE.length] }}>
                    <span className="step-item-n mono">{s.n}</span>
                    <div>
                      <h4>{s.title}</h4>
                      <p>{renderSegments(s.text, rangesFor(active), onMarkClick)}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : block.type === "quote" ? (
              <blockquote className="block-quote">{renderSegments(block.text, rangesFor(active), onMarkClick)}</blockquote>
            ) : block.type === "callout" ? (
              <div className="block-callout">
                <span className="callout-bar" />
                <div>
                  <span className="callout-title mono">{block.title || "À RETENIR"}</span>
                  <p>{renderSegments(block.text, rangesFor(active), onMarkClick)}</p>
                </div>
              </div>
            ) : (
              <p>{renderSegments(block.text, rangesFor(active), onMarkClick)}</p>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Mini-carte des quartiers visités */}
        <div className="dr-map mono">
          {blocks.map((_, i) => (
            <button
              key={i}
              className={`dr-dot${i === active ? " active" : ""}${visited.has(i) ? " seen" : ""}`}
              style={{ "--dr-accent": PALETTE[i % PALETTE.length] }}
              title={blockTitle(blocks[i])}
              onClick={() => {
                setActive(i);
                setVisited((v) => new Set(v).add(i));
              }}
              aria-label={`Aller au quartier ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function shade(hex, amt) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
  const b = Math.max(0, Math.min(255, (n & 255) + amt));
  return `rgb(${r},${g},${b})`;
}
