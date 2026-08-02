import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";

const DPR_CAP = 2;
const hash = (n) => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

/**
 * L1 — Village de panneaux (scroll 3D).
 * La caméra avance le long d'une route de village : chaque panneau est un
 * argument de la leçon (concurrence, consommation, équité, embellissement,
 * support par excellence). Le scroll déplace le village ; les panneaux
 * s'éclairent au passage et une bulle affiche l'argument du panneau actif.
 */
const PANELS = [
  { label: "CONCURRENCE", sub: "BOOSTE L'ÉCONOMIE", accent: "#b4552d", text: "L'exploitation des panneaux booste la concurrence et propulse l'économie grâce à la compétitivité des acteurs." },
  { label: "CONSOMMATION", sub: "STIMULE LA DEMANDE", accent: "#7a2f33", text: "Vecteur de publicité, le panneau stimule et encourage la consommation." },
  { label: "ÉQUITÉ", sub: "NORMES & CADRAGE", accent: "#5f7a5a", text: "Bien encadrée, l'activité garantit l'équité dans la gestion du secteur par les autorités compétentes." },
  { label: "EMBELLISSEMENT", sub: "DÉCOR URBAIN", accent: "#b08d2e", text: "Par leurs aménagements, les panneaux contribuent à l'embellissement des Villes et à un cadre de vie plus agréable." },
  { label: "SUPPORT PAR EXCELLENCE", sub: "INTEMPOREL", accent: "#6f5a2f", text: "On ne paie pas pour regarder un panneau : c'est le support de publicité par excellence, populaire depuis toujours." },
];

export default function VillageExperience() {
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
    let scrollY = 0; // progression 0..1 pilotée par le scroll de la page

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

    // Le scroll de la page pilote l'avancée dans le village (caméra + panneaux)
    const onScroll = () => {
      const rect = canvas.getBoundingClientRect();
      const zone = Math.max(rect.height, 1);
      const vh = window.innerHeight;
      // 0 quand le canvas entre par le bas, 1 quand il sort par le haut
      const raw = 1 - (rect.top + rect.height * 0.5) / (vh + zone);
      scrollY = Math.min(Math.max(raw, 0), 1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (t) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      if (day) {
        bg.addColorStop(0, "#f0e9d8");
        bg.addColorStop(1, "#d8cbaa");
      } else {
        bg.addColorStop(0, "#15110b");
        bg.addColorStop(1, "#1f1910");
      }
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const horizon = H * 0.52;
      const roadX = W / 2;
      const spread = Math.max(W * 0.34, 120);
      const advance = scrollY * 2.4; // défilement des panneaux le long de la route

      // Route en perspective
      ctx.fillStyle = day ? "#c4b594" : "#241c10";
      ctx.beginPath();
      ctx.moveTo(roadX - spread * 0.12, horizon);
      ctx.lineTo(roadX + spread * 0.12, horizon);
      ctx.lineTo(W + 40, H + 40);
      ctx.lineTo(-40, H + 40);
      ctx.closePath();
      ctx.fill();
      // Ligne médiane pointillée animée
      ctx.strokeStyle = day ? "rgba(255,255,255,0.7)" : "rgba(255,233,168,0.5)";
      ctx.lineWidth = 3;
      ctx.setLineDash([26, 34]);
      ctx.lineDashOffset = -(t * 120 + advance * 200);
      ctx.beginPath();
      ctx.moveTo(roadX, horizon);
      ctx.lineTo(roadX, H + 40);
      ctx.stroke();
      ctx.setLineDash([]);

      // Ciel : étoiles la nuit
      if (!day) {
        for (let i = 0; i < 40; i++) {
          const x = hash(i * 3.7) * W;
          const y = hash(i * 9.1) * horizon * 0.8;
          ctx.fillStyle = `rgba(255,255,255,${0.2 + 0.4 * Math.abs(Math.sin(t + i))})`;
          ctx.beginPath();
          ctx.arc(x, y, 1 + hash(i) * 1.4, 0, 6.283);
          ctx.fill();
        }
      }

      // Village : panneaux des deux côtés, cycliques le long de la route
      // On calcule d'abord la profondeur de chaque panneau pour désigner un
      // unique panneau actif (le plus proche de la caméra) — la bulle et la
      // flèche utilisent le MÊME index, pas deux formules différentes.
      const total = 5;
      const depths = [];
      for (let i = 0; i < total; i++) {
        const side = i % 2 === 0 ? -1 : 1;
        const base = i / total + advance / 5;
        let z = base % 1;
        if (z < 0) z += 1;
        depths.push({ i, side, depth: 1 - z });
      }
      const activeIdx = depths.reduce((best, cur) => (cur.depth > best.depth ? cur : best), depths[0]).i;
      for (let i = 0; i < total; i++) {
        const side = depths[i].side;
        const depth = depths[i].depth;
        const scale = 0.35 + depth * 0.85;
        const y = horizon - 20 + (1 - depth) * 10 - scale * (H * 0.22);
        const x = roadX + side * spread * (0.25 + depth * 0.9);
        const w = Math.max(70, W * 0.16 * scale);
        const h = Math.max(50, H * 0.26 * scale);

        const active = i === activeIdx;
        const p = PANELS[i];

        ctx.save();
        ctx.globalAlpha = 0.25 + depth * 0.75;

        // Pied métallique
        ctx.fillStyle = day ? "#a89a80" : "#2a2115";
        ctx.fillRect(x - w * 0.02, y + h, w * 0.04, horizon + 20 - y - h);

        // Cadre
        ctx.fillStyle = day ? "#d5c8a8" : "#3a2f1f";
        ctx.fillRect(x - w / 2, y, w, h);

        // Écran
        const glow = active ? 30 : 8;
        const g = ctx.createLinearGradient(x - w / 2, y, x - w / 2, y + h);
        g.addColorStop(0, day ? "#f7f1e4" : "#2a2113");
        g.addColorStop(1, day ? "#e9e0ca" : "#120d07");
        ctx.fillStyle = g;
        ctx.shadowColor = p.accent;
        ctx.shadowBlur = glow * (day ? 0.4 : 1);
        ctx.fillRect(x - w / 2 + 6, y + 6, w - 12, h - 12);
        ctx.shadowBlur = 0;

        // Libellé
        ctx.fillStyle = day ? "#2b2318" : p.accent;
        ctx.font = `900 ${Math.max(13, w * 0.13)}px "Archivo Black", Arial, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.label, x, y + h * 0.42);
        ctx.font = `${Math.max(9, w * 0.07)}px "Space Mono", monospace`;
        ctx.fillStyle = day ? "#7a6a4c" : "#c8b894";
        ctx.fillText(p.sub, x, y + h * 0.66);
        ctx.restore();

        // Flèche d'éclairage quand actif
        if (active) {
          ctx.fillStyle = p.accent;
          ctx.font = "16px monospace";
          ctx.textAlign = "center";
          ctx.fillText("▼", x, y - 16);
        }
      }

      // Bulle d'argument du panneau actif (bas de l'écran)
      const ap = PANELS[activeIdx];
      const bw = Math.min(W * 0.8, 560);
      const bx = roadX - bw / 2;
      const by = H - 116;
      ctx.fillStyle = day ? "rgba(255,255,255,0.92)" : "rgba(24,19,12,0.88)";
      ctx.strokeStyle = ap.accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(bx, by, bw, 92, 16) : ctx.rect(bx, by, bw, 92);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = ap.accent;
      ctx.font = `700 12px "Space Mono", monospace`;
      ctx.textAlign = "left";
      ctx.fillText(`● ${ap.label}`, bx + 18, by + 24);
      ctx.fillStyle = day ? "#2b2318" : "#ece4d3";
      ctx.font = "600 14px 'Space Grotesk', sans-serif";
      const words = ap.text.split(" ");
      let line = "";
      let ly = by + 48;
      for (const wd of words) {
        if (ctx.measureText(line + " " + wd).width > bw - 36) {
          ctx.fillText(line, bx + 18, ly);
          line = wd;
          ly += 19;
        } else line = line ? line + " " + wd : wd;
      }
      ctx.fillText(line, bx + 18, ly);

      // Indicateur de progression (le scroll avance dans le village)
      ctx.fillStyle = day ? "#7a6a4c" : "#c8b894";
      ctx.font = `11px "Space Mono", monospace`;
      ctx.textAlign = "right";
      ctx.fillText(`SCROLL ${String(Math.round(scrollY * 100)).padStart(3, "0")}/100`, W - 16, 24);
      ctx.fillStyle = ap.accent;
      ctx.fillRect(0, H - 6, W * scrollY, 6);
    };

    const loop = (time) => {
      if (!running) return;
      if (reduced) {
        scrollY = 0.5;
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
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [day]);

  return <canvas ref={ref} className="exp-canvas" aria-hidden="true" />;
}
