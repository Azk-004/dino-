import { useEffect, useRef } from "react";
import { useTheme } from "../../context/ThemeContext.jsx";

const DPR_CAP = 2;
const hash = (n) => {
  const s = Math.sin(n * 127.1) * 43758.5453;
  return s - Math.floor(s);
};

/**
 * L5 — Horizon urbain (timeline).
 * FAITES DÉFILER la frise 2020 → 2040 : la ville grandit (démographie,
 * infrastructures, panneaux) mais reste EN PHASE avec l'urbanisation grâce
 * à la mise à jour continue. Un curseur tire la ligne du temps ; les courbes
 * démographie / infrastructures suivent. Leçon 5 en actes.
 */
const YEARS = [2020, 2025, 2030, 2035, 2040];
const CURVES = YEARS.map((y, i) => ({
  year: y,
  dem: 0.35 + i * 0.16,
  infra: 0.3 + i * 0.175,
  panels: 0.4 + i * 0.12,
}));

export default function HorizonExperience() {
  const ref = useRef(null);
  const { theme } = useTheme();
  const day = theme === "day";
  const t = useRef(0.5); // position 0..1 dans la frise
  const dragging = useRef(false);

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

    // Curseur de frise : glisser à gauche/droite fait avancer le temps
    const setFromX = (clientX) => {
      const rect = canvas.getBoundingClientRect();
      const x = clientX - rect.left;
      t.current = Math.min(Math.max(x / Math.max(rect.width, 1), 0), 1);
    };
    const onDown = (e) => {
      if (e.target && e.target.closest && e.target.closest("button, a, input, textarea, select, [role]")) return;
      const rect = canvas.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      if (px < 0 || py < 0 || px > rect.width || py > rect.height) return;
      // uniquement si on attrape le rail du bas (sinon on laisse le défilement)
      if (py > rect.height - 90) {
        dragging.current = true;
        setFromX(e.clientX);
      }
    };
    const onMove = (e) => {
      if (dragging.current) setFromX(e.clientX);
    };
    const onUp = () => (dragging.current = false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("blur", onUp);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const draw = (time) => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const p = t.current;
      // Courbes interpolées
      const v = (arr, idx, k) => arr[idx] + (arr[idx + 1] - arr[idx]) * k;
      const seg = p * (YEARS.length - 1);
      const i0 = Math.min(Math.floor(seg), YEARS.length - 2);
      const k = seg - i0;
      const dem = v(CURVES.map((c) => c.dem), i0, k);
      const infra = v(CURVES.map((c) => c.infra), i0, k);
      const year = Math.round(YEARS[i0] + (YEARS[i0 + 1] - YEARS[i0]) * k);

      // Fond
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

      const horizon = H * 0.62;
      const groundY = H * 0.8;

      // Skyline qui grandit avec la frise
      const buildings = 16;
      for (let b = 0; b < buildings; b++) {
        const hRaw = hash(b * 7.3);
        const bh = (0.12 + hRaw * 0.3) * (0.6 + infra) * H;
        const bw = W / buildings;
        const bx = b * bw;
        ctx.fillStyle = day ? "rgba(172,160,138,0.75)" : "rgba(26,21,13,0.92)";
        ctx.fillRect(bx + 2, groundY - bh, bw - 4, bh);
        // fenêtres
        ctx.fillStyle = day ? "rgba(80,60,35,0.4)" : "rgba(240,200,140,0.5)";
        for (let wy = 0; wy < Math.min(6, Math.floor(bh / 26)); wy++) {
          for (let wx = 0; wx < 2; wx++) {
            if (hash(b * 31 + wy * 7 + wx) > 0.45) {
              ctx.fillRect(bx + 6 + wx * (bw - 16) / 2, groundY - bh + 8 + wy * 24, Math.max(4, (bw - 16) / 3), 7);
            }
          }
        }
      }

      // Panneaux "en phase" : un petit panneau par quartier, qui se multiplie
      const panelCount = Math.round(4 + dem * 5);
      for (let i = 0; i < panelCount; i++) {
        const bx = 0.04 + hash(i * 3.9) * 0.92;
        const bh = 0.3 + hash(i * 5.1) * 0.3;
        const w = 0.05 + hash(i) * 0.03;
        ctx.fillStyle = day ? "#ffffff" : "#241d12";
        ctx.strokeStyle = "#b4552d";
        ctx.lineWidth = 1.2;
        ctx.strokeRect(bx * W, groundY - bh * H, Math.max(26, w * W), Math.max(18, w * W * 0.62));
      }

      // Sol
      ctx.fillStyle = day ? "#c4b594" : "#171209";
      ctx.fillRect(0, groundY, W, H - groundY);

      // Courbes démographie / infrastructures
      const chartX = 18;
      const chartW = Math.min(W * 0.5, 300);
      const chartY = 40;
      const chartH = 110;
      ctx.fillStyle = day ? "rgba(255,255,255,0.8)" : "rgba(24,19,12,0.78)";
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(chartX, chartY, chartW, chartH, 12) : ctx.rect(chartX, chartY, chartW, chartH);
      ctx.fill();

      const plot = (arr, color) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        arr.forEach((v, i) => {
          const x = chartX + 14 + (i / (arr.length - 1)) * (chartW - 28);
          const y = chartY + chartH - 16 - v * (chartH - 30);
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        });
        ctx.stroke();
      };
      plot(CURVES.map((c) => c.dem), "#7a2f33");
      plot(CURVES.map((c) => c.infra), "#b08d2e");
      // point courant
      const pxCur = chartX + 14 + (p) * (chartW - 28);
      ctx.fillStyle = "#7a2f33";
      ctx.beginPath();
      ctx.arc(pxCur, chartY + chartH - 16 - dem * (chartH - 30), 5, 0, 6.283);
      ctx.fill();
      ctx.fillStyle = "#b08d2e";
      ctx.beginPath();
      ctx.arc(pxCur, chartY + chartH - 16 - infra * (chartH - 30), 5, 0, 6.283);
      ctx.fill();

      ctx.fillStyle = day ? "#2b2318" : "#ece4d3";
      ctx.font = `700 12px "Space Mono", monospace`;
      ctx.textAlign = "left";
      ctx.fillText("DÉMOGRAPHIE", chartX + 14, chartY + 14);
      ctx.fillStyle = day ? "#7a6a4c" : "#c8b894";
      ctx.fillText("INFRASTRUCTURES", chartX + 110, chartY + 14);
      ctx.fillStyle = day ? "#2b2318" : "#ece4d3";
      ctx.font = `900 ${Math.max(20, W * 0.03)}px "Archivo Black", Arial, sans-serif`;
      ctx.fillText(String(year), chartX + 14, chartY + 90);
      ctx.fillStyle = day ? "#7a6a4c" : "#c8b894";
      ctx.font = `10px "Space Mono", monospace`;
      ctx.fillText("LA VILLE RESTE EN PHASE AVEC L'URBANISATION", chartX + 14, chartY + chartH - 4);

      // Rail de frise en bas
      const railY = H - 34;
      ctx.fillStyle = day ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.12)";
      ctx.fillRect(40, railY, W - 80, 6);
      const markX = 40 + p * (W - 80);
      ctx.fillStyle = day ? "#2b2318" : "#ece4d3";
      ctx.font = `10px "Space Mono", monospace`;
      ctx.textAlign = "left";
      ctx.fillText("2020", 40, railY - 8);
      ctx.textAlign = "right";
      ctx.fillText("2040", W - 40, railY - 8);
      // curseur
      ctx.fillStyle = "#b4552d";
      ctx.shadowColor = "#b4552d";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      ctx.arc(markX, railY + 3, 12, 0, 6.283);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "#f5ecdc";
      ctx.font = `700 9px "Space Mono", monospace`;
      ctx.textAlign = "center";
      ctx.fillText("↔", markX, railY + 6);
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
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("blur", onUp);
      ro.disconnect();
    };
  }, [day]);

  return <canvas ref={ref} className="exp-canvas" aria-hidden="true" />;
}
