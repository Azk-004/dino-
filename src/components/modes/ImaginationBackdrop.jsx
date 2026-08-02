import { useEffect, useRef } from "react";

const FORMULAS = ["Σ", "∞", "π", "λ", "Ψ", "Ω", "∫", "ƒ(x)", "01", "Δ", "x²", "θ", "∝", "√", "α"];
const DPR_CAP = 1.6;

/**
 * UNIVERS 07 — IMAGINATION (violet).
 * Fond plein écran : cosmos génératif animé — nébuleuse violette,
 * étoiles, formules qui dérivent (le « calcul infini »).
 */
export default function ImaginationBackdrop({ theme, compact = false }) {
  const canvasRef = useRef(null);
  const day = theme === "day";

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let running = true;
    let W = 0;
    let H = 0;
    let dpr = 1;

    const stars = Array.from({ length: compact ? 60 : 150 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random(),
      r: Math.random() * 1.6 + 0.4,
      tw: Math.random() * 6.28,
    }));
    const formulas = Array.from({ length: compact ? 8 : 18 }, () => ({
      x: Math.random(),
      y: Math.random(),
      t: Math.random() * 6.28,
      s: 0.6 + Math.random() * 1.1,
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

    const draw = (t) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const hue = day ? 250 : 262;
      const sky = ctx.createRadialGradient(W * 0.5, H * 0.4, 20, W * 0.5, H * 0.5, Math.max(W, H) * 0.75);
      if (day) {
        sky.addColorStop(0, `hsl(${hue} 50% 86%)`);
        sky.addColorStop(1, "#efe7d6");
      } else {
        sky.addColorStop(0, `hsl(${hue} 60% 13%)`);
        sky.addColorStop(1, "#0b0714");
      }
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      const g = ctx.createRadialGradient(W * (0.3 + Math.sin(t * 0.18) * 0.12), H * 0.32, 8, W * 0.5, H * 0.5, W * 0.62);
      g.addColorStop(0, `hsla(${hue + 28} 90% ${day ? 78 : 58}% / ${day ? 0.25 : 0.16})`);
      g.addColorStop(1, "transparent");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      stars.forEach((s) => {
        const sx = (s.x * W + Math.sin(t * 0.2 + s.tw) * 18) % W;
        const sy = (s.y * H + Math.cos(t * 0.15 + s.tw) * 14) % H;
        const a = 0.2 + 0.55 * (0.5 + 0.5 * Math.sin(t * 0.9 + s.tw));
        ctx.globalAlpha = day ? a * 0.3 : a;
        ctx.fillStyle = day ? "#6a5fc0" : "#e9e2ff";
        ctx.beginPath();
        ctx.arc(sx, sy, s.r * (0.7 + s.z), 0, 6.283);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      ctx.font = "600 14px 'Space Mono', monospace";
      ctx.textAlign = "center";
      formulas.forEach((f) => {
        const fy = ((f.y * H + t * (6 + f.s * 4) * (day ? 0.15 : 1)) % (H + 50)) - 25;
        const fx = ((f.x * W + Math.sin(t * 0.25 + f.t) * 20) % W + W) % W;
        ctx.globalAlpha = day ? 0.16 : 0.22;
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
      ro.disconnect();
    };
  }, [day, compact]);

  return <canvas ref={canvasRef} className="mode-canvas" aria-hidden="true" />;
}
