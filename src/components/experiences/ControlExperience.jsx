import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";

const DPR_CAP = 2;

/**
 * L4 — Salle de contrôle (évaluation & pilotage).
 * Un tableau de bord surveille l'ensemble du processus (audit → régies) :
 * jauges animées (évaluation, autonomie, prévention des dérapages,
 * sécurisation des intérêts), balayage scan permanent, lignes de données.
 * Leçon 4 en actes : un mécanisme scientifiquement soutenable, piloté avec
 * autonomie, prévient les risques et sécurise les acteurs à long terme.
 */
const GAUGES = [
  { label: "ÉVALUATION", val: 92, unit: "%", accent: "#5f7a5a", hint: "Mécanisme scientifiquement soutenable, couvrant tout le processus" },
  { label: "AUTONOMIE", val: 88, unit: "%", accent: "#b4552d", hint: "Autonomie certaine dans le pilotage du mécanisme" },
  { label: "PRÉVENTION DÉRAPAGES", val: 95, unit: "%", accent: "#b08d2e", hint: "L'évaluation prévient les risques de dérapage" },
  { label: "SÉCURISATION INTÉRÊTS", val: 90, unit: "%", accent: "#7a2f33", hint: "Sécurise les acteurs du secteur et les populations à long terme" },
];

export default function ControlExperience() {
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
    // Le curseur pilote la salle : survoler une jauge la met en avant-plan
    // et révèle l'indicateur détaillé (le système répond à l'opérateur).
    // Objet simple (pas un hook) : toutes les lectures/écritures restent dans
    // la même closure de l'effet, aucune re-render.
    const pointer = { x: -999, y: -999, in: false };
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.in = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= rect.width && pointer.y <= rect.height;
    };
    const onLeave = () => {
      pointer.x = -999;
      pointer.y = -999;
      pointer.in = false;
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("blur", onLeave);

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

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (t) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      if (day) {
        bg.addColorStop(0, "#f2ecdf");
        bg.addColorStop(1, "#d8cbaa");
      } else {
        bg.addColorStop(0, "#15110b");
        bg.addColorStop(1, "#1f1910");
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const horizon = H * 0.3;

      // Grille de sol en perspective
      ctx.lineWidth = 1;
      ctx.strokeStyle = day ? "rgba(95,122,90,0.14)" : "rgba(143,163,134,0.1)";
      for (let i = -12; i <= 12; i++) {
        ctx.beginPath();
        ctx.moveTo(cx + i * 34, horizon);
        ctx.lineTo(cx + i * 190, H + 40);
        ctx.stroke();
      }
      for (let j = 0; j < 14; j++) {
        const y = horizon + Math.pow(j / 13, 2.1) * (H - horizon);
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Coins HUD
      ctx.strokeStyle = day ? "#5f7a5a" : "#8fa386";
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.8;
      const cr = 28;
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

      // Titre
      ctx.fillStyle = day ? "#3a4a38" : "#b5c9ae";
      ctx.font = `600 ${Math.max(13, W * 0.016)}px "Space Mono", monospace`;
      ctx.textAlign = "left";
      ctx.fillText("SALLE DE CONTRÔLE · ÉVALUATION DU PROCESSUS", 26, 34);
      ctx.fillStyle = day ? "#7a6a4c" : "#c8b894";
      ctx.font = `${Math.max(10, W * 0.011)}px "Space Mono", monospace`;
      ctx.fillText("AUDIT → ÉTAT DES LIEUX → ZONAGE → LOTS → CONCESSION → ATTRIBUTION → RÉGIES", 26, 56);

      // Jauges (4 quadrant : 2x2)
      const cols = W < 560 ? 1 : 2;
      const rows = 2;
      const gap = 18;
      const gw = Math.min((W - 52 - gap * (cols - 1)) / cols, 260);
      const gh = Math.min((H - 170) / rows, 150);
      const gx0 = cx - (cols * gw + (cols - 1) * gap) / 2;
      const gy0 = 78;

      let hovered = -1;
      let hoverDist = Infinity;
      GAUGES.forEach((g, i) => {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = gx0 + col * (gw + gap);
        const y = gy0 + row * (gh + 12);
        const v = g.val * (0.92 + 0.08 * Math.sin(t * 0.7 + i * 1.3));

        // survol : la jauge la plus proche du curseur s'allume
        if (pointer.in) {
          const d = Math.hypot(pointer.x - (x + gw / 2), pointer.y - (y + gh / 2));
          if (d < hoverDist) {
            hoverDist = d;
            hovered = i;
          }
        }
        const hot = pointer.in && hovered === i && hoverDist < gw * 0.8;

        // fond de la jauge
        ctx.fillStyle = day ? "rgba(255,255,255,0.75)" : "rgba(24,19,12,0.72)";
        ctx.strokeStyle = hot ? g.accent : day ? "rgba(95,122,90,0.4)" : "rgba(143,163,134,0.35)";
        ctx.lineWidth = hot ? 2.4 : 1.2;
        ctx.shadowColor = g.accent;
        ctx.shadowBlur = hot ? 22 : 0;
        ctx.beginPath();
        ctx.roundRect ? ctx.roundRect(x, y, gw, gh, 12) : ctx.rect(x, y, gw, gh);
        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;

        ctx.fillStyle = day ? "#2b2318" : "#ece4d3";
        ctx.font = `700 ${Math.max(11, gw * 0.075)}px "Space Mono", monospace`;
        ctx.textAlign = "left";
        ctx.fillText(g.label, x + 14, y + 24);

        // chiffre + unité
        ctx.fillStyle = g.accent;
        ctx.font = `900 ${Math.max(22, gw * 0.22)}px "Archivo Black", Arial, sans-serif`;
        ctx.fillText(String(Math.round(v)).padStart(2, "0"), x + 14, y + 62);
        ctx.font = `700 ${Math.max(11, gw * 0.08)}px "Space Mono", monospace`;
        ctx.fillText(g.unit, x + 14 + ctx.measureText(String(Math.round(v)).padStart(2, "0")).width + 8, y + 62);

        // barre
        ctx.fillStyle = day ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.1)";
        ctx.fillRect(x + 14, y + gh - 26, gw - 28, 7);
        ctx.fillStyle = g.accent;
        ctx.fillRect(x + 14, y + gh - 26, (gw - 28) * (v / 100), 7);

        // hint au survol — petit texte permanent sous la barre
        ctx.fillStyle = hot ? g.accent : day ? "#7a6a4c" : "#b8ab90";
        ctx.font = `${Math.max(8, gw * 0.052)}px "Space Mono", monospace`;
        ctx.fillText(g.hint.length > 44 ? g.hint.slice(0, 44) + "…" : g.hint, x + 14, y + gh - 6);
      });

      // Balayage scan
      const sy = ((t * 60) % (H + 220)) - 110;
      const sg = ctx.createLinearGradient(0, sy - 80, 0, sy + 80);
      sg.addColorStop(0, "rgba(52,211,153,0)");
      sg.addColorStop(0.5, day ? "rgba(95,122,90,0.12)" : "rgba(143,163,134,0.14)");
      sg.addColorStop(1, "rgba(52,211,153,0)");
      ctx.fillStyle = sg;
      ctx.fillRect(0, sy - 80, W, 160);

      // Lignes de données entre les jauges
      ctx.lineWidth = 1.3;
      for (let i = 0; i < 6; i++) {
        const a = i * 60 + 20;
        const b = (i * 5 + 3) % GAUGES.length * 60 + 20;
        const ax = gx0 + (a % (cols * 2)) * ((gw + gap) / 2) + gw / 2;
        const ay = gy0 + Math.floor((a % (cols * 2)) / cols) * (gh + 12) + gh / 2;
        const bx2 = gx0 + (b % (cols * 2)) * ((gw + gap) / 2) + gw / 2;
        const by2 = gy0 + Math.floor((b % (cols * 2)) / cols) * (gh + 12) + gh / 2;
        ctx.strokeStyle = i % 2 ? "#b08d2e" : "#5f7a5a";
        ctx.globalAlpha = 0.4;
        ctx.setLineDash([4, 8]);
        ctx.lineDashOffset = -t * 30;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.quadraticCurveTo(cx, Math.min(ay, by2) - 30, bx2, by2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
      }

      // Bas de l'écran : lecture du mécanisme
      ctx.fillStyle = day ? "rgba(255,255,255,0.92)" : "rgba(24,19,12,0.88)";
      ctx.strokeStyle = "#5f7a5a";
      ctx.lineWidth = 1.5;
      const by = H - 66;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(16, by, W - 32, 50, 12) : ctx.rect(16, by, W - 32, 50);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = day ? "#2b2318" : "#ece4d3";
      ctx.font = "600 13px 'Space Grotesk', sans-serif";
      ctx.textAlign = "left";
      const baseMsg = "L'évaluation prévient les risques de dérapage et sécurise les intérêts";
      ctx.fillText(baseMsg, 30, by + 21);
      ctx.fillStyle = day ? "#7a6a4c" : "#c8b894";
      ctx.font = `11px "Space Mono", monospace`;
      const hoveredMsg =
        pointer.in && hovered >= 0 && hoverDist < gw * 0.8
          ? `→ ${GAUGES[hovered].hint}`
          : "des acteurs du secteur et des populations — sur le long terme.";
      ctx.fillText(hoveredMsg, 30, by + 40);
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
  }, [day]);

  return <canvas ref={ref} className="exp-canvas" aria-hidden="true" />;
}
