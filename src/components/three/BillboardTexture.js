import * as THREE from "three";

/**
 * Génère la texture d'un écran de panneau publicitaire (effet affiche LED néon)
 * entièrement en canvas — aucun asset externe requis.
 */
export function makeBillboardTexture(label, sub, accent) {
  const W = 1024;
  const H = 512;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Fond : dégradé nuit profonde (taupe café)
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#2a2113");
  bg.addColorStop(0.55, "#1d160c");
  bg.addColorStop(1, "#120d07");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Scanlines (effet écran LED)
  ctx.fillStyle = "rgba(0,0,0,0.16)";
  for (let y = 0; y < H; y += 5) ctx.fillRect(0, y, W, 2);

  // Bande d'accent néon
  ctx.fillStyle = accent;
  ctx.shadowColor = accent;
  ctx.shadowBlur = 60;
  ctx.fillRect(0, 0, 22, H);
  ctx.shadowBlur = 0;

  // Sous-titre mono (numéro d'étape)
  ctx.font = "700 34px 'Space Mono', monospace";
  ctx.fillStyle = "#d8c9a8";
  ctx.fillText(sub, 70, 84);

  // Ligne séparatrice
  ctx.fillStyle = "rgba(255,255,255,0.22)";
  ctx.fillRect(70, 110, 180, 3);

  // Libellé principal
  const sizes = label.length > 9 ? [92, 210] : [150, 300];
  ctx.font = `900 ${sizes[0]}px 'Archivo Black', Arial, sans-serif`;
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  // Halo néon derrière le texte
  ctx.shadowColor = accent;
  ctx.shadowBlur = 90;
  ctx.fillStyle = accent;
  ctx.fillText(label, 70, 300);
  ctx.shadowBlur = 30;
  ctx.fillStyle = "#ffffff";
  ctx.fillText(label, 70, 300);
  ctx.shadowBlur = 0;

  // Petite ligne bas de panneau
  ctx.font = "400 26px 'Space Mono', monospace";
  ctx.fillStyle = "#a3957c";
  ctx.fillText("FORMATION · DOMAINE PUBLIC", 70, 430);

  // Grain
  for (let i = 0; i < 2400; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.05})`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/**
 * Texture de PANNEAU DE LECON — rend le texte réel du cours en 3D.
 * Utilisée par le lecteur Atelier : chaque bloc devient un panneau
 * lumineux le long de la route, avec le contenu lisible.
 * Typographie soignée : titre auto-fit, ellipses propres, zéro scanline.
 */
export function makeLessonTexture({ title, tag, lines, accent = "#b4552d", day = false }) {
  const W = 1920;
  const H = 1080;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  // Fond dégradé (nuit ou jour)
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  if (day) {
    bg.addColorStop(0, "#f6f0e3");
    bg.addColorStop(0.55, "#e9e0ca");
    bg.addColorStop(1, "#d9cbaa");
  } else {
    bg.addColorStop(0, "#2c2314");
    bg.addColorStop(0.55, "#1e170c");
    bg.addColorStop(1, "#120d07");
  }
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Liseré d'accent discret (pas de halo néon)
  ctx.fillStyle = accent;
  ctx.fillRect(0, 0, 14, H);

  // Tag mono (type de bloc)
  ctx.font = "700 40px 'Space Mono', monospace";
  ctx.fillStyle = day ? "#6b5a36" : "#c8b894";
  ctx.textAlign = "left";
  ctx.fillText(tag, 96, 104);

  // Ligne séparatrice
  ctx.fillStyle = day ? "rgba(80,60,30,0.3)" : "rgba(255,240,210,0.22)";
  ctx.fillRect(96, 132, 200, 4);

  // Titre — auto-fit sur 2 lignes max, avec ellipse propre
  const maxTitleW = W - 220;
  const wrapTitle = (fontSize) => {
    ctx.font = `900 ${fontSize}px 'Archivo Black', Arial, sans-serif`;
    const words = String(title || "").split(" ");
    const out = [];
    let line = "";
    for (const w of words) {
      const test = line ? line + " " + w : w;
      if (ctx.measureText(test).width > maxTitleW && line) {
        out.push(line);
        line = w;
        if (out.length >= 2) break;
      } else line = test;
    }
    if (line && out.length < 2) out.push(line);
    // ellipse sur la dernière ligne
    if (words.join(" ") !== out.join(" ")) {
      let last = out[out.length - 1] || "";
      while (last.length > 1 && ctx.measureText(last + "…").width > maxTitleW) {
        last = last.slice(0, -1);
      }
      out[out.length - 1] = last + "…";
    }
    return out;
  };

  let size = 150;
  let titleLines = wrapTitle(size);
  if (titleLines.length > 1) {
    size = 116;
    titleLines = wrapTitle(size);
  }
  if (titleLines.length > 1) {
    size = 92;
    titleLines = wrapTitle(size);
  }

  ctx.font = `900 ${size}px 'Archivo Black', Arial, sans-serif`;
  ctx.fillStyle = day ? "#2b2318" : "#f2e8d2";
  titleLines.forEach((l, i) => ctx.fillText(l, 96, 260 + i * (size * 1.02)));

  // Corps : lignes du contenu
  ctx.font = "400 46px 'Space Grotesk', sans-serif";
  ctx.fillStyle = day ? "#4a3d28" : "#e2d5b8";
  const bodyY = 320 + (titleLines.length > 1 ? size * 1.02 : 0);
  lines.forEach((l, i) => {
    if (i >= 3) return;
    ctx.fillText(l.length > 62 ? l.slice(0, 62) + "…" : l, 96, bodyY + i * 64);
  });

  // Bas de panneau
  ctx.font = "400 30px 'Space Mono', monospace";
  ctx.fillStyle = day ? "#7d6b47" : "#a0927a";
  ctx.fillText("FORMATION · DOMAINE PUBLIC", 96, 1008);

  // Vignette légère
  const vg = ctx.createRadialGradient(W / 2, H / 2, H * 0.45, W / 2, H / 2, H * 1.05);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, day ? "rgba(70,55,30,0.14)" : "rgba(0,0,0,0.4)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, W, H);

  // Grain très léger (photo de nuit, pas écran LED)
  for (let i = 0; i < 2600; i++) {
    ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.03})`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 2, 2);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  return tex;
}

/** Texture de fenêtres éclairées pour la skyline. */
export function makeWindowsTexture() {
  const W = 256;
  const H = 512;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#201a10";
  ctx.fillRect(0, 0, W, H);

  const cols = 8;
  const rows = 22;
  const cw = W / cols;
  const ch = H / rows;
  for (let x = 0; x < cols; x++) {
    for (let y = 0; y < rows; y++) {
      if (Math.random() > 0.62) {
        const warm = Math.random() > 0.5;
        ctx.fillStyle = warm ? "rgba(255,206,130,0.85)" : "rgba(160,200,255,0.7)";
        ctx.fillRect(x * cw + 4, y * ch + 3, cw - 8, ch - 6);
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
