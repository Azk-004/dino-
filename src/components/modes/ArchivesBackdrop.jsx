import { useEffect, useRef } from "react";

const DPR_CAP = 2;

const hash = (n) => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

const COL = 6;
const ROWS = 2;

/* fallback pour ctx.roundRect (API plus récente) */
function rr(ctx, x, y, w, h, r) {
  if (typeof ctx.roundRect === "function") {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    return;
  }
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

/**
 * UNIVERS 03 — ARCHIVES DU MÉTIER (bordeaux).
 * Signature : le registre vous suit. Les lignes de données courbent vers le
 * curseur, les dossiers s'allument au survol, un réticule + coordonnées TRK
 * traquent la souris. Palette bordeaux sur fond taupe/beige.
 */
export default function ArchivesBackdrop({ theme }) {
  const ref = useRef(null);
  const day = theme === "day";
  const pointer = useRef({ x: -999, y: -999, in: false });

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let running = true;
    let W = 0;
    let H = 0;
    let dpr = 1;

    const P = day
      ? {
          bg0: "#f1e9d8",
          bg1: "#e2d5bc",
          grid: "rgba(122, 47, 51, 0.12)",
          screen: "rgba(255, 250, 240, 0.85)",
          border: "rgba(122, 47, 51, 0.55)",
          line: "#7a2f33",
          line2: "#5c2126",
          text: "rgba(74, 28, 30, 0.92)",
          faint: "rgba(74, 28, 30, 0.5)",
          glow: "rgba(122, 47, 51, 0.45)",
        }
      : {
          bg0: "#1d1810",
          bg1: "#15110b",
          grid: "rgba(192, 138, 94, 0.1)",
          screen: "rgba(34, 27, 18, 0.88)",
          border: "rgba(192, 138, 94, 0.4)",
          line: "#c08a5e",
          line2: "#7a2f33",
          text: "rgba(236, 220, 200, 0.95)",
          faint: "rgba(236, 220, 200, 0.45)",
          glow: "rgba(192, 138, 94, 0.6)",
        };

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
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      pointer.current.x = x;
      pointer.current.y = y;
      pointer.current.in = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    };
    const onLeave = () => {
      pointer.current.x = -999;
      pointer.current.y = -999;
      pointer.current.in = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("blur", onLeave);

    const screens = [];
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COL; c++) {
        const i = r * COL + c;
        screens.push({
          r,
          c,
          i,
          live: hash(i * 7 + 3) > 0.45,
          off: hash(i * 13 + 5) > 0.82,
          wave: 0.6 + hash(i * 31) * 1.4,
          phase: hash(i * 17) * 6.28,
        });
      }
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (t) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, P.bg0);
      bg.addColorStop(1, P.bg1);
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const horizon = H * 0.42;
      const px = pointer.current.x;
      const py = pointer.current.y;
      const hasPointer = pointer.current.in && px > 0 && py > 0;

      /* grille de sol en perspective */
      ctx.lineWidth = 1;
      ctx.strokeStyle = P.grid;
      for (let i = -14; i <= 14; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + i * 46, horizon);
        ctx.lineTo(cx + i * 200, H + 40);
        ctx.stroke();
      }
      for (let j = 0; j < 16; j++) {
        const y = horizon + Math.pow(j / 15, 2.1) * (H - horizon);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      /* coins HUD */
      ctx.strokeStyle = P.line;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.85;
      const cr = 34;
      [
        [10, 10, 1, 1],
        [W - 10, 10, -1, 1],
        [10, H - 10, 1, -1],
        [W - 10, H - 10, -1, -1],
      ].forEach(([x, y, dx, dy]) => {
        ctx.beginPath();
        ctx.moveTo(x + cr * dx, y);
        ctx.lineTo(x, y);
        ctx.lineTo(x, y + cr * dy);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;

      /* titre + status */
      ctx.fillStyle = P.text;
      ctx.font = `600 ${Math.max(13, Math.min(20, W * 0.016))}px "Space Mono", monospace`;
      ctx.textAlign = "left";
      ctx.fillText("ARCHIVES DU MÉTIER · RÉGIE PUB", 26, 38);
      ctx.fillStyle = P.faint;
      ctx.font = `${Math.max(10, W * 0.011)}px "Space Mono", monospace`;
      ctx.fillText("MODULE 1 — DOMAINE PUBLIC", 26, 60);

      /* statut live */
      ctx.fillStyle = P.line;
      ctx.font = `${Math.max(10, W * 0.011)}px "Space Mono", monospace`;
      ctx.textAlign = "right";
      ctx.fillText("● REGISTRE OUVERT", W - 26, 38);
      ctx.fillStyle = P.faint;
      ctx.textAlign = "left";

      /* compteurs */
      const zone = Math.floor((t * 2) % 13);
      const lots = Math.floor((t * 8) % 49);
      ctx.textAlign = "left";
      ctx.fillStyle = P.faint;
      ctx.font = `${Math.max(10, W * 0.011)}px "Space Mono", monospace`;
      ctx.fillText("ZONAGE", 26, horizon - 66);
      ctx.fillStyle = P.line;
      ctx.font = `700 ${Math.max(26, Math.min(52, W * 0.038))}px "Space Mono", monospace`;
      ctx.fillText(String(zone).padStart(2, "0"), 26, horizon - 30);
      ctx.fillStyle = P.faint;
      ctx.font = `${Math.max(10, W * 0.011)}px "Space Mono", monospace`;
      ctx.fillText("LOTS ATTRIBUÉS", W * 0.3, horizon - 66);
      ctx.fillStyle = P.line2;
      ctx.font = `700 ${Math.max(26, Math.min(52, W * 0.038))}px "Space Mono", monospace`;
      ctx.fillText(String(lots).padStart(2, "0"), W * 0.3, horizon - 30);

      /* mini-écrans (lots) */
      const gap = Math.max(10, W * 0.014);
      const gridW = W - gap * (COL + 1);
      const sw = gridW / COL;
      const sh = Math.max(40, (H * 0.4) / ROWS);
      const gy = H * 0.52;

      let hovered = null;
      screens.forEach((s) => {
        const x = gap + s.c * (sw + gap);
        const y = gy + s.r * (sh + gap);
        const sx = x + sw / 2;
        const sy = y + sh / 2;
        const dist = hasPointer ? Math.hypot(px - sx, py - sy) : 9999;
        const near = dist < sw * 0.85;

        ctx.save();
        ctx.shadowColor = P.glow;
        ctx.shadowBlur = near ? 26 : s.live ? 12 : 0;
        ctx.fillStyle = P.screen;
        ctx.strokeStyle = near ? P.line : P.border;
        ctx.lineWidth = near ? 2 : 1.2;
        rr(ctx, x, y, sw, sh, 8);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        /* label */
        ctx.fillStyle = s.off ? P.faint : P.text;
        ctx.font = `${Math.max(8, sw * 0.06)}px "Space Mono", monospace`;
        ctx.fillText(`LOT ${String(s.i + 1).padStart(2, "0")}`, x + 8, y + 14);

        if (s.off) return;

        /* pastille live */
        if (s.live) {
          ctx.fillStyle = P.line;
          ctx.beginPath();
          ctx.arc(x + sw - 12, y + 12, 3, 0, 6.283);
          ctx.fill();
        }

        /* onde / barres */
        ctx.strokeStyle = s.live ? P.line : P.line2;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        const amp = sh * 0.16;
        const base = y + sh * 0.72;
        for (let px2 = x + 6; px2 <= x + sw - 6; px2 += 3) {
          const v = Math.sin(px2 * 0.045 * s.wave + t * 2.2 + s.phase);
          const yy = base + v * amp;
          if (px2 === x + 6) ctx.moveTo(px2, yy);
          else ctx.lineTo(px2, yy);
        }
        ctx.stroke();

        /* jauge */
        const gv = 0.25 + 0.5 * (0.5 + 0.5 * Math.sin(t * 0.9 + s.phase));
        ctx.fillStyle = P.faint;
        ctx.fillRect(x + 8, y + sh - 12, sw - 16, 3);
        ctx.fillStyle = s.live ? P.line : P.line2;
        ctx.fillRect(x + 8, y + sh - 12, (sw - 16) * gv, 3);

        if (near && hasPointer) {
          hovered = s;
        }
      });

      /* lignes de données — elles courbent vers le curseur (le registre vous suit) */
      ctx.lineWidth = 1.4;
      for (let i = 0; i < screens.length; i++) {
        const a = screens[i];
        const b = screens[(i * 3 + 2) % screens.length];
        const ax = gap + a.c * (sw + gap) + sw / 2;
        const ay = gy + a.r * (sh + gap) + sh / 2;
        const bx = gap + b.c * (sw + gap) + sw / 2;
        const by = gy + b.r * (sh + gap) + sh / 2;
        let mx = (ax + bx) / 2 + Math.sin(t * 0.8 + i) * 46;
        let my = Math.min(ay, by) - 40 - hash(i * 11) * 30;
        if (hasPointer) {
          mx += (px - mx) * 0.22;
          my += (py - my) * 0.18;
        }
        ctx.strokeStyle = i % 2 ? P.line2 : P.line;
        ctx.globalAlpha = hasPointer ? 0.75 : 0.55;
        ctx.setLineDash([5, 9]);
        ctx.lineDashOffset = -t * 42;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(mx, my, bx, by);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      /* balayage */
      const sy = ((t * 70) % (H + 260)) - 130;
      const sg = ctx.createLinearGradient(0, sy - 90, 0, sy + 90);
      sg.addColorStop(0, "rgba(192,138,94,0)");
      sg.addColorStop(0.5, day ? "rgba(122,47,51,0.12)" : "rgba(192,138,94,0.12)");
      sg.addColorStop(1, "rgba(192,138,94,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(0, sy - 90, W, 180);

      /* particules */
      for (let i = 0; i < 26; i++) {
        const pxx = hash(i * 3) * W;
        const pyy = (hash(i * 5) * H + t * (8 + hash(i) * 22)) % H;
        ctx.fillStyle = P.line;
        ctx.globalAlpha = 0.25 + 0.3 * Math.abs(Math.sin(t * 1.1 + i));
        ctx.beginPath();
        ctx.arc(pxx, pyy, 1 + hash(i * 7) * 1.6, 0, 6.283);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      /* réticule + coordonnées TRK */
      if (hasPointer) {
        ctx.strokeStyle = P.line2;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = 0.9;
        ctx.beginPath();
        ctx.arc(px, py, 14, 0, 6.283);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px - 20, py);
        ctx.lineTo(px - 8, py);
        ctx.moveTo(px + 8, py);
        ctx.lineTo(px + 20, py);
        ctx.moveTo(px, py - 20);
        ctx.lineTo(px, py - 8);
        ctx.moveTo(px, py + 8);
        ctx.lineTo(px, py + 20);
        ctx.stroke();
        ctx.fillStyle = P.line2;
        ctx.font = `${Math.max(9, W * 0.01)}px "Space Mono", monospace`;
        ctx.textAlign = "left";
        const trk = `TRK ${Math.round((px / W) * 100).toString().padStart(3, "0")} · ${Math.round((py / H) * 100).toString().padStart(3, "0")}`;
        ctx.fillText(trk, Math.min(px + 26, W - 140), Math.max(py - 22, 30));

        if (hovered) {
          ctx.fillStyle = P.line;
          ctx.textAlign = "center";
          ctx.font = `700 ${Math.max(10, W * 0.012)}px "Space Mono", monospace`;
          const hx = gap + hovered.c * (sw + gap) + sw / 2;
          const hy = gy + hovered.r * (sh + gap) - 14;
          ctx.fillText(`LOT ${String(hovered.i + 1).padStart(2, "0")} · ${hovered.live ? "ACTIF" : "SCAN"}`, hx, hy);
        }
      }
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
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        raf = requestAnimationFrame(loop);
      }
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
  }, [day]);

  return <canvas ref={ref} className="mode-canvas" aria-hidden="true" />;
}
