import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";
import { getLesson } from "../../data/curriculum.js";

const DPR_CAP = 2;

/**
 * L3 — Plateau des 7 étapes (tourniquet cliquable).
 * Les 7 étapes de la réorganisation tournent sur un plateau. CLIQUEZ sur un
 * module : il vient en avant-plan, se soulève et son détail s'affiche.
 * Un rail de progression suit les étapes déjà ouvertes. Leçon 3 en actes.
 *
 * Les étapes (numéro + titre) viennent de curriculum.js (source unique) ;
 * seules les annotations courtes d'affichage sont propres à l'expérience.
 */
const ACCENTS = ["#b4552d", "#5f7a5a", "#7a2f33", "#b08d2e", "#a06a35", "#8a6d2a", "#6f5a2f"];

// Annotations courtes (lisibles dans le plateau), indexées par NUMÉRO d'étape
// (robuste aux évolutions de titres) — le texte intégral reste dans curriculum.js
const ANNOTATIONS = {
  "01": "Liste exhaustive des acteurs + examen du mécanisme d'attribution et du cahier des charges.",
  "02": "Relevé GPS détaillé de tous les panneaux + plan piquet géolocalisable.",
  "03": "Délimitations selon des normes du territoire, supports d'embellissement et grilles tarifaires adaptées.",
  "04": "Équilibre des espaces et des types de support entre les régies, pour les appels d'offres.",
  "05": "Technique variable selon les réalités économiques, politico-administratives et législatives.",
  "06": "Attribution des espaces aux régies sur la base du cahier des charges du dossier d'appel d'offres.",
  "07": "Collectivités ou Ministère selon les pays ; transparence, professionnalisme, efficience.",
};

const STEPS = (getLesson("l3")?.content.find((b) => b.type === "steps")?.items ?? []).map((it, i) => ({
  n: it.n,
  title: it.title,
  accent: ACCENTS[i % ACCENTS.length],
  text: ANNOTATIONS[it.n] ?? it.text,
}));

export default function StepsExperience() {
  const ref = useRef(null);
  const { theme } = useTheme();
  const day = theme === "day";
  const target = useRef(0); // rotation cible (0..6)
  const rot = useRef(0);
  const opened = useRef(new Set());

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

    const angleDiff = (a, b) => {
      let d = a - b;
      while (d > Math.PI) d -= 6.283;
      while (d < -Math.PI) d += 6.283;
      return d;
    };

    // Clic sur un module → le faire venir en avant
    const onDown = (e) => {
      if (e.target && e.target.closest && e.target.closest("button, a, input, textarea, select, [role]")) return;
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      if (px < 0 || py < 0 || px > rect.width || py > rect.height) return;
      const cx = W / 2;
      const cy = H * 0.5;
      const R = Math.min(W, H) * 0.3;
      // angle du clic
      const ang = Math.atan2(py - cy, px - cx);
      // le module le plus proche de cet angle (dans le repère tournant)
      const slot = 6.283 / STEPS.length;
      let best = -1;
      let bestDiff = 99;
      for (let i = 0; i < STEPS.length; i++) {
        const a = -rot.current + i * slot;
        const d = Math.abs(angleDiff(a, ang));
        if (d < bestDiff) {
          bestDiff = d;
          best = i;
        }
      }
      if (bestDiff < 1.2) {
        target.current = best;
        opened.current.add(best);
      }
    };
    window.addEventListener("pointerdown", onDown);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (t) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Fond
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      if (day) {
        bg.addColorStop(0, "#fdeed7");
        bg.addColorStop(1, "#e8cfae");
      } else {
        bg.addColorStop(0, "#1a0f06");
        bg.addColorStop(1, "#0c0603");
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const cx = W / 2;
      const cy = H * 0.52;
      const R = Math.min(W, H) * 0.3;
      const slot = 6.283 / STEPS.length;

      // Lissage de la rotation vers la cible
      rot.current += (target.current - rot.current) * 0.06;

      // Plateau (ellipse)
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(1, 0.42);
      ctx.strokeStyle = day ? "rgba(150,110,60,0.3)" : "rgba(220,170,90,0.22)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.15, 0, 6.283);
      ctx.stroke();
      ctx.restore();

      // Modules en cercle autour du plateau
      const proj = (i) => {
        const a = -rot.current + i * slot;
        const x = cx + Math.cos(a) * R;
        const y = cy + Math.sin(a) * R * 0.42;
        const front = Math.cos(a) > 0.6; // en avant-plan
        return { x, y, a, front, dist: Math.cos(a) };
      };

      const order = STEPS.map((_, i) => ({ i, ...proj(i) })).sort((p, q) => p.dist - q.dist);

      order.forEach((m) => {
        const s = STEPS[m.i];
        const size = Math.max(52, Math.min(W, H) * 0.12) * (0.6 + Math.max(m.dist, 0) * 0.55);
        const isOpen = opened.current.has(m.i);
        const lift = m.front && isOpen ? 16 : 0;

        // ombre
        ctx.fillStyle = day ? "rgba(120,90,50,0.25)" : "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.ellipse(m.x, cy + R * 0.42, size * 0.9, size * 0.22, 0, 0, 6.283);
        ctx.fill();

        // corps du module (plaque)
        const my = m.y - size * 0.5 - lift;
        ctx.save();
        ctx.shadowColor = m.front ? s.accent : "rgba(0,0,0,0.4)";
        ctx.shadowBlur = m.front ? 26 : 10;
        ctx.fillStyle = day
          ? m.front ? "#fff8ec" : "#e8d5b5"
          : m.front ? "#241709" : "#150e06";
        ctx.strokeStyle = s.accent;
        ctx.lineWidth = m.front ? 2.5 : 1.2;
        ctx.beginPath();
        ctx.roundRect
          ? ctx.roundRect(m.x - size / 2, my, size, size * 0.72, 12)
          : ctx.rect(m.x - size / 2, my, size, size * 0.72);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        ctx.fillStyle = s.accent;
        ctx.font = `900 ${Math.max(14, size * 0.2)}px "Archivo Black", Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(s.n, m.x, my + size * 0.2);
        ctx.fillStyle = day ? "#5a4632" : "#f2e6c8";
        ctx.font = `700 ${Math.max(9, size * 0.11)}px "Space Mono", monospace`;
        ctx.fillText(s.title.length > 12 ? s.title.slice(0, 12) + "…" : s.title, m.x, my + size * 0.44);
      });

      // Détail du module actif (bas de l'écran)
      const cur = STEPS[Math.round(rot.current) % STEPS.length];
      const bw = Math.min(W * 0.86, 620);
      const bx = cx - bw / 2;
      const by = H - 128;
      ctx.fillStyle = day ? "rgba(255,255,255,0.94)" : "rgba(24,19,12,0.9)";
      ctx.strokeStyle = cur.accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(bx, by, bw, 104, 16) : ctx.rect(bx, by, bw, 104);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = cur.accent;
      ctx.font = `700 13px "Space Mono", monospace`;
      ctx.textAlign = "left";
      ctx.fillText(`ÉTAPE ${cur.n} · ${cur.title.toUpperCase()}`, bx + 18, by + 26);
      ctx.fillStyle = day ? "#2b2318" : "#ece4d3";
      ctx.font = "600 14px 'Space Grotesk', sans-serif";
      const words = cur.text.split(" ");
      let line = "";
      let ly = by + 50;
      for (const wd of words) {
        if (ctx.measureText(line + " " + wd).width > bw - 36) {
          ctx.fillText(line, bx + 18, ly);
          line = wd;
          ly += 19;
        } else line = line ? line + " " + wd : wd;
      }
      ctx.fillText(line, bx + 18, ly);

      // Rail de progression des étapes ouvertes
      const openedCount = opened.current.size;
      ctx.fillStyle = day ? "#7a6a4c" : "#c8b894";
      ctx.font = `11px "Space Mono", monospace`;
      ctx.textAlign = "left";
      ctx.fillText(`ÉTAPES DÉCOUVERTES ${openedCount}/7`, 16, 24);
      const railW = Math.min(W * 0.4, 240);
      ctx.fillStyle = day ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.12)";
      ctx.fillRect(16, 30, railW, 5);
      ctx.fillStyle = "#5f7a5a";
      ctx.fillRect(16, 30, railW * (openedCount / STEPS.length), 5);
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
