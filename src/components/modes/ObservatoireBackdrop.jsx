import { useEffect, useRef } from "react";

const DPR_CAP = 2;

const hash = (n) => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

const MODULES = [
  { label: "AUDIT", h: 1.55, c: "#5f7a5a" },
  { label: "ZONAGE", h: 1.15, c: "#7a9470" },
  { label: "LOTS", h: 1.75, c: "#4a5f45" },
  { label: "CONCESSION", h: 1.3, c: "#8a9a6a" },
  { label: "ATTRIBUTION", h: 1.62, c: "#6b8463" },
  { label: "RÉGIES", h: 1.4, c: "#576b4e" },
];

const shade = (hex, amt) => {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + amt));
  const b = Math.max(0, Math.min(255, (n & 255) + amt));
  return `rgb(${r},${g},${b})`;
};

/**
 * UNIVERS 02 — OBSERVATOIRE URBAIN (sauge).
 * Signature : le plateau de la maquette tourne avec la souris, le module
 * survolé se soulève et brille, la distance du curseur zoome la caméra.
 * Palette sauge sur fond beige/écru.
 */
export default function ObservatoireBackdrop({ theme }) {
  const ref = useRef(null);
  const day = theme === "day";
  const pointer = useRef({ x: 0.5, y: 0.5, in: false });
  const targetExtra = useRef(0);
  const extra = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let running = true;
    let W = 0;
    let H = 0;
    let dpr = 1;

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
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
    };
    const onLeave = () => {
      pointer.current.in = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("blur", onLeave);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (t) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      /* fond beige/écru (jour) ou taupe (nuit) */
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      if (day) {
        bg.addColorStop(0, "#f4eee0");
        bg.addColorStop(1, "#e6dcc6");
      } else {
        bg.addColorStop(0, "#221c13");
        bg.addColorStop(1, "#12100a");
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H * 0.56;
      const R = 150;

      if (pointer.current.in) {
        targetExtra.current = (pointer.current.x - 0.5) * 1.4;
      }
      extra.current += (targetExtra.current - extra.current) * 0.05;
      const rot = t * 0.05 + extra.current;

      const dx = (pointer.current.x - 0.5) * 2;
      const dy = (pointer.current.y - 0.5) * 2;
      const dist = Math.min(Math.hypot(dx, dy), 1);
      const zoom = 1 + (1 - dist) * 0.18;
      const k = (Math.min(W, H) / 620) * zoom;

      /* plateau (ellipse) + rayons tournants */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.42);
      for (let ring = 1; ring <= 3; ring++) {
        ctx.beginPath();
        ctx.arc(0, 0, R * 1.28 * (ring / 3), 0, 6.283);
        ctx.strokeStyle = day ? "rgba(95,122,90,0.3)" : "rgba(160,180,130,0.16)";
        ctx.lineWidth = ring === 3 ? 2.5 : 1;
        ctx.stroke();
      }
      for (let i = 0; i < 12; i++) {
        const a = rot + (i * 6.283) / 12;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(a) * R * 1.28, Math.sin(a) * R * 1.28);
        ctx.strokeStyle = day ? "rgba(95,122,90,0.18)" : "rgba(160,180,130,0.1)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();

      /* halo studio au centre du plateau */
      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.3 * k);
      halo.addColorStop(0, day ? "rgba(255,255,255,0.5)" : "rgba(200,215,170,0.2)");
      halo.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.ellipse(cx, cy, R * 1.35 * k, R * 1.35 * k * 0.42, 0, 0, 6.283);
      ctx.fill();

      const proj = (x, y, z) => {
        const X = cx + (x - y) * k;
        const Y = cy + (x + y) * k * 0.5 - z * k;
        return [X, Y];
      };

      /* modules (boîtes iso) sur le plateau tournant */
      const s = 30;
      const items = MODULES.map((m, i) => {
        const a = rot + (i * 6.283) / MODULES.length;
        const px = Math.cos(a) * R * 0.82;
        const py = Math.sin(a) * R * 0.82;
        const hgt = 60 + m.h * 30 + Math.sin(t * 1.1 + i * 1.7) * 3;
        return { ...m, i, a, px, py, hgt, depth: px + py };
      }).sort((a, b) => a.depth - b.depth);

      let hoverIdx = -1;
      let hoverDist = Infinity;
      if (pointer.current.in) {
        const pxx = pointer.current.x * W;
        const pyy = pointer.current.y * H;
        items.forEach((b) => {
          const [bxx, byy] = proj(b.px, b.py, b.hgt);
          const d = Math.hypot(pxx - bxx, pyy - byy);
          if (d < hoverDist) {
            hoverDist = d;
            hoverIdx = b.i;
          }
        });
        if (hoverDist > 90) hoverIdx = -1;
      }

      items.forEach((b) => {
        const { px, py, c } = b;
        let hgt = b.hgt;
        const hovered = b.i === hoverIdx;
        if (hovered) hgt += 14;

        const [ox, oy] = proj(px, py, 0);
        ctx.fillStyle = day ? "rgba(95,122,90,0.25)" : "rgba(0,0,0,0.45)";
        ctx.beginPath();
        ctx.ellipse(ox, oy, s * 1.7 * k, s * 0.8 * k, 0, 0, 6.283);
        ctx.fill();

        const [ax, ay] = proj(px - s, py - s, hgt);
        const [bx, by] = proj(px + s, py - s, hgt);
        const [dxx, dy] = proj(px + s, py + s, hgt);
        const [ex, ey] = proj(px - s, py + s, hgt);
        const [ax0, ay0] = proj(px - s, py - s, 0);
        const [bx0, by0] = proj(px + s, py - s, 0);
        const [dxx0, dy0] = proj(px + s, py + s, 0);
        const [ex0, ey0] = proj(px - s, py + s, 0);

        ctx.save();
        ctx.fillStyle = shade(c, -46);
        ctx.beginPath();
        ctx.moveTo(ax0, ay0);
        ctx.lineTo(ex0, ey0);
        ctx.lineTo(ex, ey);
        ctx.lineTo(ax, ay);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = shade(c, -18);
        ctx.beginPath();
        ctx.moveTo(bx0, by0);
        ctx.lineTo(dxx0, dy0);
        ctx.lineTo(dxx, dy);
        ctx.lineTo(bx, by);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = shade(c, 10);
        ctx.beginPath();
        ctx.moveTo(ex0, ey0);
        ctx.lineTo(dxx0, dy0);
        ctx.lineTo(dxx, dy);
        ctx.lineTo(ex, ey);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = shade(c, 26);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.lineTo(dxx, dy);
        ctx.lineTo(ex, ey);
        ctx.closePath();
        ctx.fill();
        ctx.restore();

        ctx.strokeStyle = hovered
          ? "rgba(255,255,255,0.95)"
          : day
          ? "rgba(255,255,255,0.75)"
          : "rgba(235,220,185,0.55)";
        ctx.lineWidth = hovered ? 2 : 1.2;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.lineTo(dxx, dy);
        ctx.lineTo(ex, ey);
        ctx.closePath();
        ctx.stroke();

        if (hovered) {
          const [hx, hy] = proj(px, py, hgt);
          const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 60 * k);
          hg.addColorStop(0, day ? "rgba(255,255,255,0.5)" : "rgba(210,225,180,0.4)");
          hg.addColorStop(1, "rgba(255,255,255,0)");
          ctx.fillStyle = hg;
          ctx.beginPath();
          ctx.arc(hx, hy, 60 * k, 0, 6.283);
          ctx.fill();
        }

        const [tx, ty] = proj(px, py, hgt + 6);
        ctx.fillStyle = day ? "rgba(45,58,40,0.85)" : "rgba(240,232,210,0.92)";
        ctx.font = `700 ${Math.max(9, Math.min(13, k * 22))}px "Space Mono", monospace`;
        ctx.textAlign = "center";
        ctx.fillText(b.label, tx, ty + 4);
      });

      /* poussière dorée */
      for (let i = 0; i < 34; i++) {
        const pxx = hash(i * 3.7) * W;
        const pyy = (hash(i * 9.1) * H + t * (9 + hash(i) * 20)) % H;
        ctx.fillStyle = day ? "rgba(150,120,60,0.5)" : "rgba(201,168,106,0.5)";
        ctx.globalAlpha = 0.3 + 0.4 * Math.abs(Math.sin(t * 0.9 + i));
        ctx.beginPath();
        ctx.arc(pxx, pyy, 1 + hash(i * 5.3) * 1.8, 0, 6.283);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
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
