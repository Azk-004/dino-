// Palette douce « plein jour » : beige clair, couleurs adoucies
const PAL = {
  sky0: "#f6edd8",
  sky1: "#f2e6ca",
  sky2: "#eee0bf",
  sky3: "#eadab4",
  sky4: "#e6d3a6",
  sky5: "#e2cc9a",
  sun: "#f0c078",
  asphalt0: "#b39a6e",
  asphalt1: "#c4ab7e",
  asphalt2: "#d0b98c",
  wall: "#f3ead4",
  wallDark: "#e6d8ba",
  bronze: "#9a8157",
  ivory: "#fdf8ec",
  ivoryDim: "#efe2c9",
  terracotta: "#c08a68",
  amber: "#cfa574",
  leaf: "#5f7a4a",
  paper: "#f7efda",
  ink: "#3a2e1f",
};

const TAU = Math.PI * 2;

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function center(ctx, text, x, y, font, fill) {
  ctx.font = font;
  ctx.textAlign = "center";
  ctx.fillStyle = fill;
  ctx.fillText(text, x, y);
}

function sky(ctx, w, h) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, PAL.sky0);
  g.addColorStop(0.3, PAL.sky1);
  g.addColorStop(0.58, PAL.sky2);
  g.addColorStop(0.78, PAL.sky3);
  g.addColorStop(0.9, PAL.sky4);
  g.addColorStop(1, PAL.sky5);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  const hg = ctx.createRadialGradient(w / 2, h * 0.6, 10, w / 2, h * 0.6, w * 0.72);
  hg.addColorStop(0, "rgba(240,196,126,0.5)");
  hg.addColorStop(0.5, "rgba(238,184,118,0.18)");
  hg.addColorStop(1, "rgba(238,184,118,0)");
  ctx.fillStyle = hg;
  ctx.fillRect(0, 0, w, h);
}

function cityLayer(ctx, w, horizon, { minH, maxH, alpha, body, win, density, tall = 0.14 }) {
  let x = -12;
  while (x < w + 12) {
    const bw = 22 + Math.random() * 52;
    const bh = minH + Math.random() * (maxH - minH);
    ctx.fillStyle = body;
    ctx.globalAlpha = alpha;
    ctx.fillRect(x, horizon - bh, bw, bh);
    if (Math.random() < tall) {
      ctx.fillRect(x + bw / 2 - 1, horizon - bh - 12, 2, 12);
      if (Math.random() < 0.5) ctx.fillStyle = "rgba(196,138,104,0.85)";
      ctx.fillRect(x + bw / 2 - 1, horizon - bh - 12, 2, 2);
    }
    const cols = Math.floor(bw / 14);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < Math.floor(bh / 17); r++) {
        if (Math.random() < density) {
          const wx = x + 5 + c * 14;
          const wy = horizon - bh + 7 + r * 17;
          ctx.fillStyle = win;
          ctx.globalAlpha = alpha * (0.4 + Math.random() * 0.6);
          ctx.fillRect(wx, wy, 4.5, 6.5);
          if (Math.random() < 0.28) {
            ctx.fillStyle = "rgba(170,130,80,0.45)";
            ctx.fillRect(wx - 1.5, wy - 1.5, 7.5, 9.5);
          }
        }
      }
    }
    ctx.globalAlpha = 1;
    x += bw + 4 + Math.random() * 9;
  }
}

function cityBase(ctx, w, h) {
  const horizon = h * 0.6;
  sky(ctx, w, h);
  cityLayer(ctx, w, horizon, { minH: 34, maxH: 92, alpha: 0.45, body: "#d6c095", win: "#8f7a4e", density: 0.3 });
  cityLayer(ctx, w, horizon, { minH: 20, maxH: 62, alpha: 0.6, body: "#c9b184", win: "#7a663c", density: 0.5 });
  cityLayer(ctx, w, horizon, { minH: 13, maxH: 44, alpha: 0.85, body: "#bda375", win: "#665430", density: 0.68 });
  road(ctx, w, horizon);
  return horizon;
}

function road(ctx, w, horizon) {
  const h = ctx.canvas.height;
  const vx = w / 2;
  const g = ctx.createLinearGradient(0, horizon, 0, h);
  g.addColorStop(0, PAL.asphalt0);
  g.addColorStop(0.5, PAL.asphalt1);
  g.addColorStop(1, PAL.asphalt2);
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(vx - 1, horizon);
  ctx.lineTo(-40, h + 20);
  ctx.lineTo(w + 40, h + 20);
  ctx.lineTo(vx + 1, horizon);
  ctx.closePath();
  ctx.fill();

  const lg = ctx.createRadialGradient(w / 2, horizon + (h - horizon) * 0.38, 6, w / 2, horizon + (h - horizon) * 0.38, w * 0.24);
  lg.addColorStop(0, "rgba(160,120,60,0.18)");
  lg.addColorStop(1, "rgba(160,120,60,0)");
  ctx.fillStyle = lg;
  ctx.fillRect(0, horizon, w, h - horizon);

  ctx.strokeStyle = "rgba(90,70,40,0.55)";
  ctx.lineWidth = 2;
  ctx.setLineDash([16, 30]);
  ctx.beginPath();
  ctx.moveTo(vx, horizon + 2);
  ctx.lineTo(vx, h + 20);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.strokeStyle = "rgba(90,70,40,0.25)";
  ctx.lineWidth = 3;
  for (const s of [-1, 1]) {
    ctx.beginPath();
    ctx.moveTo(vx + s * 1.2, horizon + 2);
    ctx.lineTo(w / 2 + s * w * 0.48, h + 10);
    ctx.stroke();
  }
}

function panel(ctx, cx, baseY, s, tilt) {
  ctx.save();
  ctx.translate(cx, baseY);
  ctx.rotate(tilt || 0);

  ctx.globalAlpha = 0.34;
  ctx.fillStyle = "#000";
  ctx.beginPath();
  ctx.ellipse(0, 0, 62 * s, 10 * s, 0, 0, TAU);
  ctx.fill();
  ctx.globalAlpha = 1;

  const pg = ctx.createLinearGradient(-46 * s, 0, -38 * s, 0);
  pg.addColorStop(0, "#6b5230");
  pg.addColorStop(1, "#8a6f45");
  ctx.fillStyle = pg;
  ctx.fillRect(-46 * s, -80 * s, 9 * s, 80 * s);
  ctx.fillRect(37 * s, -80 * s, 9 * s, 80 * s);

  const fw = 134 * s, fh = 98 * s;
  const fx = -fw / 2, fy = -186 * s;
  rr(ctx, fx, fy, fw, fh, 7 * s);
  ctx.fillStyle = "#f7eeda";
  ctx.fill();
  ctx.lineWidth = 5 * s;
  ctx.strokeStyle = PAL.bronze;
  ctx.stroke();

  const face = ctx.createLinearGradient(0, fy, 0, fy + fh);
  face.addColorStop(0, "#fdf8ec");
  face.addColorStop(1, "#f1e6cb");
  rr(ctx, fx + 7 * s, fy + 7 * s, fw - 14 * s, fh - 14 * s, 5 * s);
  ctx.fillStyle = face;
  ctx.fill();

  ctx.fillStyle = PAL.terracotta;
  ctx.fillRect(fx + 7 * s, fy + 7 * s, fw - 14 * s, 5 * s);

  ctx.strokeStyle = "rgba(90,70,40,0.3)";
  ctx.lineWidth = 1.5 * s;
  rr(ctx, fx + 13 * s, fy + 15 * s, fw - 26 * s, fh - 26 * s, 4 * s);
  ctx.stroke();

  center(ctx, "PANNEAUTIQUE · DOMAINE PUBLIC", 0, fy + 34 * s, `600 ${Math.max(7, 9 * s)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`, "#7a5f38");
  center(ctx, "PUBLICITÉ & AFFICHAGE", 0, fy + 60 * s, `700 ${Math.max(10, 15 * s)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`, "#3a2e1f");
  center(ctx, "RÈGLES · ZONES · CONCESSIONS", 0, fy + 80 * s, `700 ${Math.max(6, 8 * s)}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`, "#b3825e");

  ctx.fillStyle = PAL.amber;
  ctx.shadowColor = PAL.amber;
  ctx.shadowBlur = 16 * s;
  ctx.beginPath();
  ctx.arc(0, fy - 6 * s, 3 * s, 0, TAU);
  ctx.fill();
  ctx.shadowBlur = 0;

  const ug = ctx.createRadialGradient(0, -70 * s, 4, 0, -70 * s, 48 * s);
  ug.addColorStop(0, "rgba(232,163,92,0.2)");
  ug.addColorStop(1, "rgba(232,163,92,0)");
  ctx.fillStyle = ug;
  ctx.fillRect(-64 * s, -124 * s, 128 * s, 64 * s);

  ctx.restore();
}

function palm(ctx, x, baseY, hgt, flip) {
  ctx.save();
  ctx.translate(x, baseY);
  if (flip) ctx.scale(-1, 1);
  ctx.strokeStyle = "#6b5230";
  ctx.lineCap = "round";
  ctx.lineWidth = Math.max(3, hgt * 0.035);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(10, -hgt * 0.5, 5, -hgt * 0.94);
  ctx.stroke();
  ctx.fillStyle = "#5f7a4a";
  for (let i = 0; i < 6; i++) {
    const a = -Math.PI * 0.95 + (i / 5) * Math.PI * 0.62;
    ctx.beginPath();
    ctx.ellipse(Math.cos(a) * hgt * 0.34, -hgt * 0.97 + Math.sin(a) * hgt * 0.1, hgt * 0.3, hgt * 0.05, a - Math.PI / 2, 0, TAU);
    ctx.fill();
  }
  ctx.restore();
}

function banner(ctx, text, y, size) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.fillStyle = "rgba(253,250,242,0.9)";
  ctx.fillRect(0, y, w, h - y);
  ctx.fillStyle = "rgba(138,111,69,0.35)";
  ctx.fillRect(0, y, w, 2);
  center(ctx, text, w / 2, y + size * 1.45, `700 ${size}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`, "#7a5f38");
}

function finish(ctx, w, h, horizon) {
  const hb = ctx.createRadialGradient(w / 2, horizon, 4, w / 2, horizon, h * 0.6);
  hb.addColorStop(0, "rgba(240,200,140,0.2)");
  hb.addColorStop(1, "rgba(240,200,140,0)");
  ctx.fillStyle = hb;
  ctx.fillRect(0, 0, w, h);

  const vg = ctx.createRadialGradient(w / 2, h * 0.45, w * 0.2, w / 2, h * 0.5, w * 0.74);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(140,115,75,0.3)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);

  const nt = ctx.createLinearGradient(0, 0, 0, h * 0.42);
  nt.addColorStop(0, "rgba(120,95,55,0.14)");
  nt.addColorStop(1, "rgba(120,95,55,0)");
  ctx.fillStyle = nt;
  ctx.fillRect(0, 0, w, h * 0.42);

  ctx.globalAlpha = 0.055;
  for (let i = 0; i < 420; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#000";
    ctx.fillRect(Math.random() * w, Math.random() * h, 1, 1);
  }
  ctx.globalAlpha = 1;
}

function officeBack(ctx, w, h) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#f3ead4");
  g.addColorStop(0.7, "#e6d8ba");
  g.addColorStop(1, "#d9c8a2");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  ctx.fillStyle = "rgba(120,95,55,0.18)";
  for (let i = 0; i < 5; i++) ctx.fillRect(w * (0.04 + i * 0.2), h * 0.05, w * 0.14, h * 0.44);

  const wx = w * 0.6, wy = h * 0.1, ww = w * 0.26, wh = h * 0.36;
  rr(ctx, wx, wy, ww, wh, 8);
  const wg = ctx.createLinearGradient(0, wy, 0, wy + wh);
  wg.addColorStop(0, "#cfe0e2");
  wg.addColorStop(1, "#f0e2c0");
  ctx.fillStyle = wg;
  ctx.fill();
  ctx.strokeStyle = "#7a5f38";
  ctx.lineWidth = 6;
  rr(ctx, wx, wy, ww, wh, 8);
  ctx.stroke();
  ctx.strokeStyle = "rgba(90,70,40,0.4)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(wx + ww / 2, wy);
  ctx.lineTo(wx + ww / 2, wy + wh);
  ctx.moveTo(wx, wy + wh / 2);
  ctx.lineTo(wx + ww, wy + wh / 2);
  ctx.stroke();
}

function desk(ctx, w, h) {
  const topY = h * 0.64;
  const g = ctx.createLinearGradient(0, topY, 0, h);
  g.addColorStop(0, "#b08a5c");
  g.addColorStop(0.2, "#96714a");
  g.addColorStop(1, "#6b4f30");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.moveTo(w * 0.05, topY);
  ctx.lineTo(w * 0.95, topY);
  ctx.lineTo(w * 0.85, h);
  ctx.lineTo(w * 0.15, h);
  ctx.fill();
  ctx.fillStyle = "#7a5f3c";
  ctx.beginPath();
  ctx.moveTo(w * 0.12, h * 0.8);
  ctx.lineTo(w * 0.88, h * 0.8);
  ctx.lineTo(w * 0.85, h);
  ctx.lineTo(w * 0.15, h);
  ctx.fill();
  ctx.fillStyle = "rgba(255,240,210,0.35)";
  ctx.beginPath();
  ctx.moveTo(w * 0.05, topY);
  ctx.lineTo(w * 0.95, topY);
  ctx.lineTo(w * 0.93, topY + 10);
  ctx.lineTo(w * 0.07, topY + 10);
  ctx.fill();
}

function doc(ctx, cx, cy, cw, ch, rot, lines) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(rot || 0);
  ctx.shadowColor = "rgba(0,0,0,0.4)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 10;
  rr(ctx, -cw / 2, -ch / 2, cw, ch, 4);
  ctx.fillStyle = "#f4ead0";
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(120,100,70,0.5)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = PAL.terracotta;
  ctx.fillRect(-cw / 2, -ch / 2, cw, ch * 0.06);
  if (lines) {
    const count = typeof lines === "number" ? lines : lines.length;
    ctx.fillStyle = "rgba(60,50,34,0.5)";
    for (let i = 0; i < count; i++) {
      ctx.fillRect(-cw * 0.36, -ch * 0.26 + i * ch * 0.09, cw * 0.72, ch * 0.02);
    }
  }
  ctx.restore();
}

function mapBase(ctx, w, h) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#efe7d3");
  g.addColorStop(1, "#e0d3b6");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);

  for (let i = 0; i < 80; i++) {
    const bw = 22 + Math.random() * 64, bh = 14 + Math.random() * 42;
    ctx.fillStyle = `rgba(178,166,138,${(0.12 + Math.random() * 0.2).toFixed(3)})`;
    ctx.fillRect(Math.random() * (w - bw), Math.random() * (h - bh), bw, bh);
  }

  ctx.fillStyle = "rgba(120,162,184,0.4)";
  ctx.beginPath();
  ctx.moveTo(0, h * 0.06);
  ctx.bezierCurveTo(w * 0.3, h * 0.0, w * 0.62, h * 0.12, w * 0.8, h * 0.05);
  ctx.lineTo(w * 0.88, 0);
  ctx.lineTo(0, 0);
  ctx.fill();

  ctx.strokeStyle = "rgba(120,104,80,0.55)";
  ctx.lineWidth = 2.5;
  for (let i = 0; i < 7; i++) {
    const y = h * (0.13 + i * 0.13);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(w * 0.3, y + 20, w * 0.6, y - 20, w, y + 8);
    ctx.stroke();
  }
  for (let i = 0; i < 9; i++) {
    const x = w * (0.1 + i * 0.1);
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.bezierCurveTo(x + 16, h * 0.3, x - 16, h * 0.62, x + 10, h);
    ctx.stroke();
  }

  ctx.lineWidth = 5;
  ctx.strokeStyle = "rgba(193,104,63,0.4)";
  ctx.beginPath();
  ctx.moveTo(0, h * 0.2);
  ctx.bezierCurveTo(w * 0.35, h * 0.26, w * 0.55, h * 0.55, w * 0.84, h * 0.72);
  ctx.stroke();

  ctx.save();
  ctx.translate(w * 0.06, h * 0.09);
  ctx.fillStyle = "rgba(255,255,255,0.65)";
  ctx.beginPath();
  ctx.arc(0, 0, 26, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "rgba(90,74,52,0.6)";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = PAL.terracotta;
  ctx.beginPath();
  ctx.moveTo(0, -18);
  ctx.lineTo(5, 0);
  ctx.lineTo(-5, 0);
  ctx.closePath();
  ctx.fill();
  center(ctx, "N", 0, -32, "700 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "rgba(90,74,52,0.9)");
  ctx.restore();
}

function pin(ctx, x, y, color, label) {
  ctx.save();
  ctx.shadowColor = "rgba(0,0,0,0.4)";
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 4;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - 34);
  ctx.quadraticCurveTo(x + 16, y - 4, x + 12, y - 2);
  ctx.lineTo(x, y + 6);
  ctx.lineTo(x - 12, y - 2);
  ctx.quadraticCurveTo(x - 16, y - 4, x, y - 34);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(x, y - 30, 7.5, 0, TAU);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y - 30, 3.5, 0, TAU);
  ctx.fill();
  if (label) {
    ctx.font = "800 19px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
    ctx.lineWidth = 4;
    ctx.strokeStyle = "rgba(240,236,220,0.9)";
    ctx.strokeText(label, x + 17, y - 22);
    ctx.fillStyle = "#2a2118";
    ctx.fillText(label, x + 17, y - 22);
  }
  ctx.restore();
}

function gauge(ctx, cx, cy, r, color, pct, label, val) {
  const start = Math.PI * 0.75;
  const sweep = Math.PI * 1.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(cx, cy, r, start, start + sweep);
  ctx.strokeStyle = "rgba(110,90,55,0.22)";
  ctx.lineWidth = 14;
  ctx.stroke();
  const g = ctx.createLinearGradient(cx - r, 0, cx + r, 0);
  g.addColorStop(0, PAL.terracotta);
  g.addColorStop(1, color);
  ctx.beginPath();
  ctx.arc(cx, cy, r, start, start + sweep * pct);
  ctx.strokeStyle = g;
  ctx.lineWidth = 14;
  ctx.stroke();
  center(ctx, String(Math.round(pct * 100)) + "%", cx, cy + 8, "800 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#3a2e1f");
  center(ctx, label, cx, cy + r * 0.78 + 8, "700 18px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "rgba(90,74,52,0.75)");
}

// ---------------- Scenes ----------------

function drawPresentation(ctx, w, h) {
  const horizon = cityBase(ctx, w, h);
  palm(ctx, w * 0.1, horizon + 20, h * 0.5, false);
  panel(ctx, w * 0.5, horizon + 2, 1.12, 0);
  banner(ctx, "LE PARCOURS DE LA PANNEAUTIQUE SUR LE DOMAINE PUBLIC", h * 0.86, h * 0.03);
  finish(ctx, w, h, horizon);
}

function drawImportance(ctx, w, h) {
  const horizon = cityBase(ctx, w, h);
  const n = 5;
  for (let i = 0; i < n; i++) {
    const near = i === 2;
    const x = w * (0.14 + i * 0.18);
    const baseY = horizon + ((h - horizon) * 0.82) * Math.pow(1 - i / (n - 1), 0.7) * 0.85 + horizon * 0.12;
    const s = 0.5 + 0.18 * i + (near ? 0.12 : 0);
    panel(ctx, x, Math.min(baseY, h - 10), s, near ? 0 : (i - 2) * 0.05);
  }
  center(ctx, "LA PANNEAUTIQUE, LEVIER ÉCONOMIQUE DU DOMAINE PUBLIC", w / 2, h * 0.3, "700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#3a2e1f");
  ctx.shadowColor = "rgba(255,255,255,0.75)";
  ctx.shadowBlur = 12;
  center(ctx, "CHAQUE SUPPORT EST UNE RESSOURCE", w / 2, h * 0.34, "600 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#b3825e");
  ctx.shadowBlur = 0;
  finish(ctx, w, h, horizon);
}

function drawConstat(ctx, w, h) {
  const horizon = cityBase(ctx, w, h);
  panel(ctx, w * 0.2, horizon + 2, 1.0, -0.1);
  panel(ctx, w * 0.46, horizon - 6, 0.9, 0.12);
  panel(ctx, w * 0.68, horizon + 2, 0.75, -0.26);
  panel(ctx, w * 0.3, horizon + (h - horizon) * 0.7, 0.55, 0.38);

  const by = horizon + (h - horizon) * 0.92;
  ctx.fillStyle = "rgba(253,250,242,0.92)";
  rr(ctx, w * 0.05, by, w * 0.34, h * 0.05, 4);
  ctx.fill();
  for (let i = 0; i < 12; i++) {
    if (i % 2 === 0) ctx.fillStyle = "#cfa574";
    else ctx.fillStyle = "#7a5f38";
    ctx.fillRect(w * 0.055 + i * w * 0.027, by + h * 0.008, w * 0.027, h * 0.034);
  }
  center(ctx, "PANNEAUX ANARCHIQUES - LE CONSTAT", w / 2, by - h * 0.02, "700 28px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#3a2e1f");
  finish(ctx, w, h, horizon);
}

function drawAudit(ctx, w, h) {
  officeBack(ctx, w, h);
  desk(ctx, w, h);
  doc(ctx, w * 0.3, h * 0.56, w * 0.3, h * 0.3, -0.04, 8);
  doc(ctx, w * 0.48, h * 0.6, w * 0.26, h * 0.26, 0.03, 6);
  const cx = w * 0.74, cy = h * 0.56;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.shadowColor = "rgba(0,0,0,0.45)";
  ctx.shadowBlur = 16;
  ctx.shadowOffsetY = 8;
  rr(ctx, -w * 0.14, -h * 0.14, w * 0.28, h * 0.28, 6);
  ctx.fillStyle = "#e8d9b8";
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(150,120,70,0.5)";
  ctx.stroke();
  ctx.fillStyle = PAL.terracotta;
  ctx.fillRect(-w * 0.14, -h * 0.14, w * 0.28, h * 0.035);
  ctx.fillStyle = "#3a2a18";
  for (let i = 0; i < 6; i++) {
    ctx.fillRect(-w * 0.11, -h * 0.08 + i * h * 0.045, w * 0.22, h * 0.012);
  }
  ctx.fillStyle = "#57a05f";
  for (let i = 0; i < 4; i++) {
    ctx.beginPath();
    ctx.arc(-w * 0.11, -h * 0.08 + i * h * 0.045, h * 0.014, 0, TAU);
    ctx.fill();
  }
  center(ctx, "LISTE DE CONTRÔLE", 0, h * 0.11, "700 " + h * 0.028 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#2a2118");
  ctx.restore();

  ctx.save();
  ctx.translate(w * 0.5, h * 0.42);
  ctx.rotate(0.05);
  ctx.shadowColor = "rgba(0,0,0,0.4)";
  ctx.shadowBlur = 14;
  ctx.fillStyle = "#4a3a26";
  rr(ctx, -w * 0.11, -h * 0.02, w * 0.09, h * 0.05, 6);
  ctx.fill();
  ctx.shadowBlur = 0;
  ctx.fillStyle = "#f4ead0";
  rr(ctx, -w * 0.1, -h * 0.016, w * 0.012, h * 0.044, 3);
  ctx.fill();
  ctx.restore();
  banner(ctx, "AUDIT : COMPRENDRE AVANT D'AGIR", h * 0.9, h * 0.032);
  finish(ctx, w, h, h * 0.5);
}

function drawEtatLieux(ctx, w, h) {
  mapBase(ctx, w, h);
  ctx.strokeStyle = "rgba(193,104,63,0.85)";
  ctx.lineWidth = 4;
  ctx.setLineDash([12, 9]);
  ctx.beginPath();
  ctx.moveTo(w * 0.16, h * 0.2);
  ctx.bezierCurveTo(w * 0.38, h * 0.34, w * 0.55, h * 0.5, w * 0.84, h * 0.74);
  ctx.stroke();
  ctx.setLineDash([]);
  pin(ctx, w * 0.16, h * 0.2, "#c97a62", "P1");
  pin(ctx, w * 0.32, h * 0.42, "#7d9ec2", "P2");
  pin(ctx, w * 0.5, h * 0.58, "#d2a878", "P3");
  pin(ctx, w * 0.7, h * 0.72, "#8fae8a", "P4");
  pin(ctx, w * 0.85, h * 0.8, "#c97a62", "P5");
  ctx.fillStyle = "rgba(240,236,220,0.92)";
  rr(ctx, w * 0.62, h * 0.07, w * 0.3, h * 0.22, 6);
  ctx.fill();
  ctx.strokeStyle = "rgba(150,120,70,0.5)";
  ctx.stroke();
  center(ctx, "ÉTAT DES LIEUX - GPS", w * 0.77, h * 0.12, "700 " + h * 0.03 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#2a2118");
  const legend = [["#c97a62", "Support signalé"], ["#7d9ec2", "À vérifier"], ["#8fae8a", "Conforme"]];
  legend.forEach(([c, t], i) => {
    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.arc(w * 0.66, h * 0.16 + i * h * 0.038, h * 0.013, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "#4a3a28";
    ctx.font = "500 " + h * 0.02 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(t, w * 0.69, h * 0.166 + i * h * 0.038);
  });
  banner(ctx, "RELEVÉ GPS DE TOUS LES SUPPORTS", h * 0.88, h * 0.032);
  finish(ctx, w, h, h * 0.8);
}

function drawZonage(ctx, w, h) {
  mapBase(ctx, w, h);
  const zones = [
    [0.05, 0.1, 0.3, 0.34, "rgba(125,158,194,0.38)", "ZONE A"],
    [0.39, 0.06, 0.32, 0.3, "rgba(192,138,104,0.4)", "ZONE B"],
    [0.11, 0.5, 0.34, 0.34, "rgba(143,174,138,0.38)", "ZONE C"],
    [0.5, 0.44, 0.36, 0.42, "rgba(207,165,116,0.4)", "ZONE D"],
  ];
  zones.forEach(([x, y, zw, zh, col, label]) => {
    ctx.fillStyle = col;
    ctx.fillRect(w * x, h * y, w * zw, h * zh);
    ctx.strokeStyle = "rgba(50,40,28,0.55)";
    ctx.lineWidth = 2.5;
    ctx.setLineDash([9, 6]);
    ctx.strokeRect(w * x, h * y, w * zw, h * zh);
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(20,14,8,0.65)";
    rr(ctx, w * x + w * 0.012, h * y + h * 0.02, w * 0.09, h * 0.045, 4);
    ctx.fill();
    center(ctx, label, w * x + w * 0.057, h * y + h * 0.052, "800 " + h * 0.026 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#fff");
  });
  ctx.fillStyle = "rgba(240,236,220,0.94)";
  rr(ctx, w * 0.05, h * 0.86, w * 0.9, h * 0.11, 6);
  ctx.fill();
  ctx.strokeStyle = "rgba(150,120,70,0.5)";
  ctx.stroke();
  center(ctx, "ZONAGE : LE TERRITOIRE DÉCOUPÉ EN ZONES RÉGLEMENTÉES", w * 0.5, h * 0.925, "700 " + h * 0.035 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#2a2118");
  finish(ctx, w, h, h * 0.85);
}

function drawLots(ctx, w, h) {
  const horizon = cityBase(ctx, w, h);
  const by = horizon + (h - horizon) * 0.72;
  panel(ctx, w * 0.74, by, 0.72, -0.04);

  const bx = w * 0.3, byy = horizon + (h - horizon) * 0.6;
  ctx.fillStyle = "#f7eeda";
  rr(ctx, bx - w * 0.16, byy - h * 0.06, w * 0.32, h * 0.06, 4);
  ctx.fill();
  ctx.strokeStyle = PAL.bronze;
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.fillStyle = "rgba(90,70,40,0.35)";
  for (let i = 0; i < 5; i++) ctx.fillRect(bx - w * 0.14 + i * w * 0.06, byy - h * 0.052, w * 0.045, h * 0.044);
  center(ctx, "MOBILIER URBAIN DE PUBLICITÉ - LOT N° 01", bx, byy - h * 0.09, "700 " + h * 0.034 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#3a2e1f");

  center(ctx, "DES LOTS COHÉRENTS POUR UN FINANCEMENT MAÎTRISÉ", w / 2, h * 0.24, "700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#3a2e1f");
  finish(ctx, w, h, horizon);
}

function drawConcession(ctx, w, h) {
  officeBack(ctx, w, h);
  desk(ctx, w, h);
  doc(ctx, w * 0.42, h * 0.55, w * 0.46, h * 0.4, -0.02, 10);
  center(ctx, "CONVENTION DE CONCESSION", w * 0.42, h * 0.34, "700 " + h * 0.036 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#2a2118");
  const sx = w * 0.62, sy = h * 0.66;
  ctx.save();
  ctx.translate(sx, sy);
  ctx.rotate(-0.14);
  ctx.fillStyle = "#b03a30";
  rr(ctx, -w * 0.07, -h * 0.028, w * 0.14, h * 0.056, 6);
  ctx.fill();
  ctx.strokeStyle = "#7c241c";
  ctx.lineWidth = 3;
  rr(ctx, -w * 0.07, -h * 0.028, w * 0.14, h * 0.056, 6);
  ctx.stroke();
  center(ctx, "CONCÉDÉ", 0, h * 0.012, "800 " + h * 0.03 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#f4ead0");
  ctx.restore();

  ctx.save();
  ctx.translate(w * 0.26, h * 0.62);
  ctx.rotate(0.12);
  ctx.strokeStyle = "#2a2118";
  ctx.lineWidth = 3;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(-w * 0.02, h * 0.05);
  ctx.lineTo(0, 0);
  ctx.lineTo(w * 0.012, -h * 0.06);
  ctx.moveTo(0, 0);
  ctx.lineTo(-w * 0.02, -h * 0.02);
  ctx.stroke();
  ctx.restore();
  banner(ctx, "MISE EN CONCESSION DES ESPACES PUBLICITAIRES", h * 0.9, h * 0.032);
  finish(ctx, w, h, h * 0.5);
}

function drawAttribution(ctx, w, h) {
  officeBack(ctx, w, h);
  desk(ctx, w, h);
  doc(ctx, w * 0.34, h * 0.56, w * 0.42, h * 0.36, -0.02, 8);
  center(ctx, "CAHIER DES CHARGES", w * 0.34, h * 0.36, "700 " + h * 0.034 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#2a2118");
  const sx = w * 0.55, sy = h * 0.62;
  ctx.save();
  ctx.translate(sx, sy);
  ctx.rotate(-0.2);
  ctx.fillStyle = "#57a05f";
  rr(ctx, -w * 0.1, -h * 0.042, w * 0.2, h * 0.084, 8);
  ctx.fill();
  ctx.strokeStyle = "#3a703f";
  ctx.lineWidth = 4;
  rr(ctx, -w * 0.1, -h * 0.042, w * 0.2, h * 0.084, 8);
  ctx.stroke();
  center(ctx, "ADMIS", 0, h * 0.012, "800 " + h * 0.055 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#f4f0d8");
  ctx.restore();
  banner(ctx, "ATTRIBUTION DES LOTS PAR APPEL D'OFFRES", h * 0.9, h * 0.032);
  finish(ctx, w, h, h * 0.5);
}

function drawGestion(ctx, w, h) {
  const horizon = cityBase(ctx, w, h);
  const cx = w / 2, bw = w * 0.42, bh = h * 0.46;
  ctx.fillStyle = "#d3bd92";
  ctx.fillRect(cx - bw / 2, horizon - bh, bw, bh);
  ctx.fillStyle = "#c9b184";
  for (let i = 0; i < 5; i++) {
    ctx.fillRect(cx - bw / 2 + i * bw / 5 + 4, horizon - bh, bw / 5 - 8, bh);
  }
  ctx.fillStyle = "rgba(160,120,60,0.55)";
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 2; j++) {
      if (Math.random() < 0.7) {
        ctx.fillRect(cx - bw / 2 + j * bw / 2 + bw * 0.08, horizon - bh + bh * 0.1 + i * bh * 0.13, bw * 0.18, bh * 0.06);
      }
    }
  }
  const dy = horizon - bh * 0.18;
  ctx.fillStyle = "#6b5230";
  ctx.fillRect(cx - w * 0.03, dy - h * 0.045, w * 0.06, h * 0.045);
  center(ctx, "RÉGIE PUBLICITAIRE", cx, dy - h * 0.055, "700 " + h * 0.026 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#3a2e1f");

  const fx = cx, fy = horizon - bh - h * 0.08;
  ctx.strokeStyle = "#4a3a26";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(fx, fy + h * 0.14);
  ctx.lineTo(fx, fy);
  ctx.stroke();
  ctx.fillStyle = "#c08a68";
  ctx.beginPath();
  ctx.moveTo(fx, fy - h * 0.03);
  ctx.lineTo(fx - w * 0.012, fy);
  ctx.lineTo(fx + w * 0.012, fy);
  ctx.fill();
  center(ctx, "GESTION PAR LES RÉGIES : UN SERVICE EN RÈGIE DIRECTE", w / 2, h * 0.22, "700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#3a2e1f");
  finish(ctx, w, h, horizon);
}

function drawEvaluation(ctx, w, h) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, "#efe5cd");
  g.addColorStop(1, "#e4d5b4");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#faf3e2";
  rr(ctx, w * 0.05, h * 0.08, w * 0.9, h * 0.84, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(138,111,69,0.5)";
  ctx.lineWidth = 3;
  ctx.stroke();

  gauge(ctx, w * 0.25, h * 0.38, h * 0.14, PAL.amber, 0.9, "AUDIT", "AUDIT");
  gauge(ctx, w * 0.5, h * 0.38, h * 0.14, PAL.terracotta, 0.78, "CONCESSION", "CONCESSION");
  gauge(ctx, w * 0.75, h * 0.38, h * 0.14, "#7da878", 0.86, "GESTION", "GESTION");

  ctx.strokeStyle = "#7da878";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(w * 0.12, h * 0.68);
  ctx.bezierCurveTo(w * 0.24, h * 0.6, w * 0.3, h * 0.66, w * 0.42, h * 0.55);
  ctx.bezierCurveTo(w * 0.55, h * 0.62, w * 0.6, h * 0.5, w * 0.72, h * 0.5);
  ctx.bezierCurveTo(w * 0.8, h * 0.48, w * 0.86, h * 0.42, w * 0.9, h * 0.4);
  ctx.stroke();
  ctx.fillStyle = "#7da878";
  ctx.beginPath();
  ctx.arc(w * 0.9, h * 0.4, 7, 0, TAU);
  ctx.fill();

  center(ctx, "ÉVALUATION DU SYSTÈME", w / 2, h * 0.93, "700 " + h * 0.036 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#7a5f38");
  finish(ctx, w, h, h * 0.5);
}

function drawMiseAJour(ctx, w, h) {
  const horizon = cityBase(ctx, w, h);
  const cranes = [[w * 0.24, h * 0.4], [w * 0.62, h * 0.5], [w * 0.84, h * 0.34]];
  cranes.forEach(([cx, ch]) => {
    const topY = horizon - ch;
    ctx.strokeStyle = "#5c4a30";
    ctx.lineWidth = 6;
    ctx.lineCap = "butt";
    ctx.beginPath();
    ctx.moveTo(cx - 18, horizon);
    ctx.lineTo(cx + 12, topY);
    ctx.lineTo(cx + 46, topY + 16);
    ctx.moveTo(cx + 12, topY);
    ctx.lineTo(cx + 12, topY + 60);
    ctx.moveTo(cx + 12, topY + 14);
    ctx.lineTo(cx + 58, topY + 26);
    ctx.stroke();
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#4a3a26";
    ctx.beginPath();
    ctx.moveTo(cx - 8, topY + 26);
    ctx.lineTo(cx + 58, topY + 32);
    ctx.stroke();
  });
  panel(ctx, w * 0.5, horizon + (h - horizon) * 0.78, 0.62, -0.1);
  center(ctx, "LE SECTEUR SE MODERNISE, LE PARC S'ADAPTE", w / 2, h * 0.24, "700 28px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#3a2e1f");
  finish(ctx, w, h, horizon);
}

function drawQuiz(ctx, w, h) {
  const horizon = cityBase(ctx, w, h);
  ctx.fillStyle = "rgba(253,250,242,0.93)";
  rr(ctx, w * 0.2, h * 0.12, w * 0.6, h * 0.72, 18);
  ctx.fill();
  ctx.strokeStyle = "rgba(138,111,69,0.5)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "rgba(201,143,78,0.16)";
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.42, h * 0.22, 0, TAU);
  ctx.fill();
  ctx.strokeStyle = "rgba(201,143,78,0.4)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.fillStyle = "#7a5f38";
  ctx.font = "800 " + h * 0.26 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("?", w * 0.5, h * 0.52);
  center(ctx, "12 QUESTIONS - VALIDEZ VOS ACQUIS", w * 0.5, h * 0.72, "700 " + h * 0.034 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#3a2e1f");
  center(ctx, "DÉFINITIONS · ZONES · CONCESSIONS · RÈGIES", w * 0.5, h * 0.79, "500 " + h * 0.02 + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif", "#b3825e");
  finish(ctx, w, h, horizon);
}

const SCENES = {
  presentation: drawPresentation,
  "lecon1-importance": drawImportance,
  "lecon2-constat": drawConstat,
  audit: drawAudit,
  "etat-lieux": drawEtatLieux,
  zonage: drawZonage,
  "constitution-lots": drawLots,
  "mise-concession": drawConcession,
  attribution: drawAttribution,
  gestion: drawGestion,
  evaluation: drawEvaluation,
  "mise-a-jour": drawMiseAJour,
  quiz: drawQuiz,
};

export function renderIllustration(canvas, id, w, h) {
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  const fn = SCENES[id] || drawPresentation;
  fn(ctx, w, h);
}
