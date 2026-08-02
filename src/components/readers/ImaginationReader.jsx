import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { blockTag, blockTitle, renderSegments } from "../../lib/reader.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";

const ACCENTS = ["#8b5cf6", "#a78bfa", "#6d28d9", "#c4b5fd"];
const DPR_CAP = 2;

/* Formules qui défilent : le « calcul infini » du cosmos */
const FORMULAS = ["Σ", "∞", "π", "E=mc²", "λ", "Δ", "ƒ(x)", "01", "Ω", "√", "θ", "x²", "∝", "∫", "Ψ", "α"];

/**
 * UNIVERS 07 — IMAGINATION (violet).
 * On LIT le cours dans un cosmos génératif : un écran d'étoiles reste
 * collé à la vue (parallaxe) pendant que les visions du cours dérivent
 * au scroll. Fond génératif (nébuleuse, formules infinies) + texte en
 * apesanteur : imagination illimitée, calcul infini.
 */
export default function ImaginationReader({ blocks, rangesFor, speakingIdx, onMarkClick }) {
  const { theme } = useTheme();
  const day = theme === "day";
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const progressRef = useRef(0);
  const [cur, setCur] = useState(0);
  const [visited, setVisited] = useState(() => new Set([0]));
  const pointer = useRef({ x: 0.5, y: 0.5 });

  /* Scène canvas générative */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let running = true;
    let W = 0;
    let H = 0;
    let dpr = 1;

    const stars = Array.from({ length: 190 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      r: Math.random() * 1.8 + 0.4,
      tw: Math.random() * 6.28,
    }));
    const formulas = Array.from({ length: 26 }, () => ({
      x: Math.random(),
      y: Math.random(),
      t: Math.random() * 6.28,
      s: 0.6 + Math.random() * 1.2,
      f: FORMULAS[Math.floor(Math.random() * FORMULAS.length)],
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
    };
    window.addEventListener("pointermove", onMove);

    const draw = (t) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const p = progressRef.current;
      const px = pointer.current.x;

      const hue = day ? 250 : 260 + p * 40;
      const sky = ctx.createRadialGradient(W * (0.4 + p * 0.3), H * (0.35 - p * 0.2), 40, W / 2, H / 2, Math.max(W, H) * 0.8);
      if (day) {
        sky.addColorStop(0, `hsl(${hue} 55% 88%)`);
        sky.addColorStop(1, "#efe7d6");
      } else {
        sky.addColorStop(0, `hsl(${hue} 60% 14%)`);
        sky.addColorStop(1, "#0b0714");
      }
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      const g = ctx.createRadialGradient(W * (0.25 + px * 0.4), H * (0.3 + Math.sin(t * 0.2) * 0.08), 10, W * 0.5, H * 0.45, W * 0.6);
      g.addColorStop(0, `hsla(${hue + 30} 90% ${day ? 80 : 60}% / ${day ? 0.28 : 0.16})`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      stars.forEach((s) => {
        const drift = (s.z - 0.5) * p * 220;
        const sx = ((s.x * W + drift + px * s.z * 30) % W + W) % W;
        const sy = ((s.y * H + drift * 0.4) % H + H) % H;
        const a = 0.2 + 0.6 * (0.5 + 0.5 * Math.sin(t * (0.8 + s.z) + s.tw));
        ctx.globalAlpha = day ? a * 0.35 : a;
        ctx.fillStyle = day ? "#6a5fc0" : "#e9e2ff";
        ctx.beginPath();
        ctx.arc(sx, sy, s.r * (0.7 + s.z * 0.8), 0, 6.283);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      ctx.font = "600 15px 'Space Mono', monospace";
      ctx.textAlign = "center";
      formulas.forEach((f) => {
        const fy = ((f.y * H + t * (8 + f.s * 6) * (day ? 0.2 : 1)) % (H + 60)) - 30;
        const fx = ((f.x * W + Math.sin(t * 0.3 + f.t) * 26) % W + W) % W;
        ctx.globalAlpha = day ? 0.18 : 0.24;
        ctx.fillStyle = day ? "#4a5cb8" : "#b9a4ff";
        ctx.fillText(f.f, fx, fy);
      });
      ctx.globalAlpha = 1;
    };

    const loop = (time) => {
      if (!running) return;
      if (document.hidden) return;
      draw(time / 1000);
      raf = requestAnimationFrame(loop);
    };
    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
    };
  }, [day]);

  /* Progression au scroll de la page : naviguer entre les constellations */
  useEffect(() => {
    const onScroll = () => {
      const el = stageRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = Math.max(el.offsetHeight - window.innerHeight, 1);
      const p = Math.min(Math.max(-rect.top / total, 0), 1);
      progressRef.current = p;
      const idx = Math.min(blocks.length - 1, Math.floor(p * Math.max(blocks.length, 1)));
      setCur((c) => {
        if (c !== idx) setVisited((v) => new Set(v).add(idx));
        return c === idx ? c : idx;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [blocks.length]);

  /* Suivi TTS : la vision lue dérive au centre de l'écran */
  useEffect(() => {
    if (speakingIdx == null || speakingIdx < 0 || speakingIdx >= blocks.length) return;
    const vision = stageRef.current?.children[speakingIdx + 1]; // +1 : le canvas wrap
    if (vision && vision.scrollIntoView) {
      vision.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speakingIdx]);

  const stageH = `${Math.max(blocks.length * 72, 100)}vh`;

  return (
    <div className="im-reader" data-day={day ? "1" : "0"}>
      <div className="im-stage" ref={stageRef} style={{ height: stageH }}>
        {/* Écran d'étoiles collé à la vue */}
        <div className="im-canvas-wrap">
          <canvas ref={canvasRef} className="exp-canvas" aria-hidden="true" />
          <div className="im-vignette" />
          <div className="im-hud mono">
            <span>CONSTELLATION {String(cur + 1).padStart(2, "0")}/{String(blocks.length).padStart(2, "0")}</span>
            <span className="im-hud-formula">{FORMULAS[cur % FORMULAS.length]}</span>
          </div>
          <div className="im-progress">
            {blocks.map((_, i) => (
              <span key={i} className={`im-progress-dot${i === cur ? " on" : ""}${visited.has(i) ? " seen" : ""}`} />
            ))}
          </div>
        </div>

        {/* Les visions : une par bloc, en apesanteur */}
        {blocks.map((block, i) => {
          const accent = ACCENTS[i % ACCENTS.length];
          const active = i === cur;
          const speaking = speakingIdx === i;
          return (
            <motion.div
              key={i}
              className={`im-vision${active ? " active" : ""}${speaking ? " speaking" : ""}`}
              style={{ "--im-accent": accent, top: `${i * 72}vh` }}
              initial={false}
              animate={{
                opacity: active ? 1 : 0.18,
                scale: active ? 1 : 0.94,
                filter: active ? "blur(0px)" : "blur(3px)",
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="im-vision-head mono">
                <span style={{ color: accent }}>✦ VISION {String(i + 1).padStart(2, "0")} · {blockTag(block).toUpperCase()}</span>
              </div>
              {block.type === "h3" ? (
                <h2 className="im-vision-title" data-block={i}>{block.text}</h2>
              ) : block.type === "steps" ? (
                <div className="im-vision-steps" data-block={i}>
                  {block.items.map((s, k) => (
                    <div className="im-step" key={s.n} style={{ "--im-accent": ACCENTS[k % ACCENTS.length] }}>
                      <span className="im-step-n mono">{s.n}</span>
                      <div className="im-step-body">
                        <span className="im-step-title mono">{s.title}</span>
                        <span className="im-step-text">{renderSegments(s.text, rangesFor(i), onMarkClick)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : block.type === "list" ? (
                <div className="im-vision-list" data-block={i}>
                  {block.items.map((it, k) => (
                    <div className="im-list-item" key={k}>
                      <span style={{ color: accent }}>✦</span>
                      <span>{it}</span>
                    </div>
                  ))}
                </div>
              ) : block.type === "quote" ? (
                <blockquote className="im-quote" data-block={i} style={{ "--im-accent": accent }}>
                  {renderSegments(block.text, rangesFor(i), onMarkClick)}
                </blockquote>
              ) : block.type === "callout" ? (
                <div className="im-callout" data-block={i} style={{ "--im-accent": accent }}>
                  <span className="im-callout-title mono">{block.title || "À RETENIR"}</span>
                  <p>{renderSegments(block.text, rangesFor(i), onMarkClick)}</p>
                </div>
              ) : (
                <p className="im-body" data-block={i}>
                  {renderSegments(block.text, rangesFor(i), onMarkClick)}
                </p>
              )}
              <div className="im-vision-foot mono" style={{ color: accent }}>
                {blockTitle(block).slice(0, 46)}{blockTitle(block).length > 46 ? "…" : ""}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
