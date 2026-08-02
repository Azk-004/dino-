import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";

const DPR_CAP = 2;
const hash = (n) => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

/**
 * L2 — Paysage de la pollution (assainir la Ville).
 * Une ville étouffe sous une pléthore de panneaux anarchiques : pollution
 * visuelle, insalubrité, insécurité. CLIQUEZ sur les panneaux pour les
 * retirer un à un — à mesure que la Ville respire, le compteur de pollution
 * chute et le ciel s'éclaircit. Leçon 2 en actes.
 */
export default function PollutionExperience() {
  const ref = useRef(null);
  const { theme } = useTheme();
  const day = theme === "day";

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let raf = 0;
    let running = true;
    let W = 0;
    let H = 0;
    let dpr = 1;
    const removed = new Set();

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

    // Génération des panneaux anarchiques
    const panels = [];
    for (let i = 0; i < 26; i++) {
      panels.push({
        id: i,
        x: 0.04 + hash(i * 3.1) * 0.92,
        y: 0.12 + hash(i * 7.7) * 0.6,
        w: 0.1 + hash(i * 11.3) * 0.14,
        h: 0.07 + hash(i * 13.9) * 0.1,
        rot: (hash(i * 5.3) - 0.5) * 0.5, // certaines sont de travers : l'anarchie
        hue: Math.floor(hash(i * 17.1) * 360),
        label: ["PUB", "VENTE", "!"][i % 3],
        fading: false,
      });
    }

    // Clic = retirer un panneau (sauf si on clique sur de la vraie UI)
    const onDown = (e) => {
      if (e.target && e.target.closest && e.target.closest("button, a, input, textarea, select, [role]")) return;
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      if (px < 0 || py < 0 || px > rect.width || py > rect.height) return;
      // trouver le panneau le plus proche du clic
      let best = -1;
      let bestDist = 9999;
      panels.forEach((p, i) => {
        if (removed.has(i)) return;
        const cx = p.x * W;
        const cy = p.y * H;
        const d = Math.hypot(px - cx, py - cy);
        if (d < bestDist && d < Math.max(p.w * W, 90)) {
          bestDist = d;
          best = i;
        }
      });
      if (best >= 0) removed.add(best);
    };
    window.addEventListener("pointerdown", onDown);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (t) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const pollution = 1 - removed.size / panels.length;

      // Ciel : s'éclaircit à mesure que la ville respire
      const sky = ctx.createLinearGradient(0, 0, 0, H * 0.62);
      if (day) {
        sky.addColorStop(0, `rgb(${Math.round(225 + 25 * (1 - pollution))}, ${Math.round(214 + 30 * (1 - pollution))}, ${Math.round(190 + 35 * (1 - pollution))})`);
        sky.addColorStop(1, "#d8cbaa");
      } else {
        sky.addColorStop(0, `rgb(${Math.round(21 + 25 * (1 - pollution))}, ${Math.round(17 + 25 * (1 - pollution))}, ${Math.round(11 + 30 * (1 - pollution))})`);
        sky.addColorStop(1, "#1f1910");
      }
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);

      // Bâtiments
      const buildings = 14;
      for (let b = 0; b < buildings; b++) {
        const bw = W / buildings;
        const bh = H * (0.18 + hash(b * 5.7) * 0.3);
        const bx = b * bw;
        ctx.fillStyle = day ? "rgba(180,168,145,0.7)" : "rgba(26,21,13,0.92)";
        ctx.fillRect(bx + 2, H - bh - H * 0.2, bw - 4, bh + H * 0.2);
        // fenêtres
        ctx.fillStyle = day ? "rgba(80,60,35,0.4)" : "rgba(240,200,140,0.5)";
        for (let wy = 0; wy < 4; wy++) {
          for (let wx = 0; wx < 3; wx++) {
            if (hash(b * 31 + wy * 7 + wx) > 0.4) {
              ctx.fillRect(bx + 8 + wx * (bw - 20) / 3, H - bh - H * 0.2 + 8 + wy * (bh / 4.5), Math.max(4, (bw - 20) / 4), 6);
            }
          }
        }
      }

      // Sol
      ctx.fillStyle = day ? "#c4b594" : "#171209";
      ctx.fillRect(0, H * 0.8, W, H * 0.2);

      // Panneaux anarchiques (cliquables)
      panels.forEach((p, i) => {
        if (removed.has(i)) return;
        const cx = p.x * W;
        const cy = p.y * H;
        const w = Math.max(30, p.w * W);
        const h = Math.max(22, p.h * H);

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(p.rot + Math.sin(t * 2 + i) * 0.01);
        // ombre
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.shadowBlur = 8;
        ctx.fillStyle = "#241d12";
        ctx.fillRect(-w / 2, -h / 2, w, h);
        ctx.shadowBlur = 0;
        // écran criard
        ctx.fillStyle = `hsl(${p.hue}, 55%, 52%)`;
        ctx.fillRect(-w / 2 + 3, -h / 2 + 3, w - 6, h - 6);
        ctx.fillStyle = "#fff";
        ctx.font = `900 ${Math.max(9, w * 0.28)}px "Archivo Black", Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.label, 0, 0);
        ctx.restore();
      });

      // Compteur de pollution + consigne
      const bw = Math.min(W * 0.5, 260);
      const bx = 16;
      const by = 16;
      ctx.fillStyle = day ? "rgba(255,255,255,0.9)" : "rgba(24,19,12,0.88)";
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(bx, by, bw, 92, 14) : ctx.rect(bx, by, bw, 92);
      ctx.fill();
      ctx.fillStyle = "#b4552d";
      ctx.font = `700 12px "Space Mono", monospace`;
      ctx.textAlign = "left";
      ctx.fillText("POLLUTION VISUELLE", bx + 16, by + 22);
      ctx.font = `900 ${Math.max(22, W * 0.028)}px "Archivo Black", Arial, sans-serif`;
      ctx.fillStyle = day ? "#2b2318" : "#ece4d3";
      ctx.fillText(`${Math.round(pollution * 100)}%`, bx + 16, by + 56);
      ctx.fillStyle = day ? "#7a6a4c" : "#c8b894";
      ctx.font = `11px "Space Mono", monospace`;
      ctx.fillText(`RETIREZ LES PANNEAUX — CLIC`, bx + 16, by + 80);

      // Barre de pollution
      ctx.fillStyle = day ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.12)";
      ctx.fillRect(bx, by + 96, bw, 6);
      ctx.fillStyle = pollution > 0.5 ? "#b4552d" : pollution > 0.2 ? "#b08d2e" : "#5f7a5a";
      ctx.fillRect(bx, by + 96, bw * pollution, 6);

      // Message de victoire
      if (pollution <= 0.02) {
        ctx.fillStyle = day ? "rgba(255,255,255,0.94)" : "rgba(24,19,12,0.92)";
        ctx.strokeStyle = "#5f7a5a";
        ctx.lineWidth = 2;
        const mw = Math.min(W * 0.82, 480);
        const mh = 110;
        const mx = W / 2 - mw / 2;
        const my = H * 0.42 - mh / 2;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(mx, my, mw, mh, 18) : ctx.rect(mx, my, mw, mh);
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = "#5f7a5a";
        ctx.font = `700 13px "Space Mono", monospace`;
        ctx.textAlign = "center";
        ctx.fillText("✓ VILLE ASSAINIE", W / 2, my + 30);
        ctx.fillStyle = day ? "#2b2318" : "#ece4d3";
        ctx.font = "600 14px 'Space Grotesk', sans-serif";
        ctx.fillText("Un secteur encadré embellit la Ville :", W / 2, my + 58);
        ctx.fillStyle = day ? "#7a6a4c" : "#c8b894";
        ctx.font = "13px 'Space Grotesk', sans-serif";
        ctx.fillText("mesures adéquates = rayonnement du secteur.", W / 2, my + 84);
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
      if (document.hidden) cancelAnimationFrame(raf);
      else if (!reduced) raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointerdown", onDown);
      ro.disconnect();
    };
  }, [day]);

  return <canvas ref={ref} className="exp-canvas" aria-hidden="true" />;
}
