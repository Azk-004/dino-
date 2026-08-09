import * as THREE from "three";
import {
  PAL, radialTexture, groundTexture, asphaltTexture, buildRibbon,
  buildPanel, buildBuilding, buildLamp, buildLampGlow, buildPalm,
  buildBench, buildCar, isLowPower,
} from "./world.js";

const TAU = Math.PI * 2;

let renderer = null;
let webglUnavailable = false;
function getRenderer() {
  if (webglUnavailable) return null;
  if (!renderer) {
    try {
      const canvas = document.createElement("canvas");
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    } catch (e) {
      webglUnavailable = true;
      console.warn("Illustrations 3D indisponibles (WebGL) — fallback 2D.", e);
      return null;
    }
  }
  return renderer;
}

// ---------------- Canvas texture helpers ----------------
function canvasTexture(draw, w = 1024, h = 1024) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  draw(ctx, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function rr(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

// ---------------- Generic poster (advertising billboard) ----------------
function posterTexture(seed = 0) {
  const styles = ["sunset", "waves", "dune", "rings", "prism", "ember"];
  const style = styles[seed % styles.length];
  return canvasTexture((ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, w * (seed % 2 ? 1 : -1), h);
    g.addColorStop(0, ["#8a6a4e", "#96745a", "#7d6350"][seed % 3]);
    g.addColorStop(1, ["#c29a78", "#c9a280", "#b08c6e"][(seed + 1) % 3]);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(242,232,212,0.9)";
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.38, h * 0.2, 0, TAU);
    ctx.fill();
    ctx.fillStyle = "rgba(232,163,92,0.95)";
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.38, h * 0.13, 0, TAU);
    ctx.fill();

    ctx.strokeStyle = "rgba(242,232,212,0.5)";
    ctx.lineWidth = 8;
    if (style === "waves" || style === "rings") {
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.arc(w * 0.5, h * 0.4, h * (0.24 + i * 0.08), 0, TAU);
        ctx.stroke();
      }
    } else {
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(w * 0.2, h * (0.72 - i * 0.14));
        ctx.quadraticCurveTo(w * 0.5, h * (0.6 - i * 0.14), w * 0.8, h * (0.72 - i * 0.14));
        ctx.stroke();
      }
    }
    ctx.fillStyle = "rgba(242,232,212,0.28)";
    ctx.fillRect(w * 0.16, h * 0.84, w * 0.68, 3);
  }, 512, 384);
}

// ---------------- Station poster on a billboard ----------------
function buildStationPanel(st, index) {
  const straight = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 0, -20),
    new THREE.Vector3(0, 0, 140),
  ]);
  const panel = buildPanel(st, straight, 0.5, 1, index);
  return panel.group;
}

function buildGenericPanel(tex, opts = {}) {
  const g = new THREE.Group();
  const frameMat = new THREE.MeshStandardMaterial({ color: PAL.walnut, roughness: 0.8, metalness: 0.05 });
  const edgeMat = new THREE.MeshStandardMaterial({ color: PAL.bronze, roughness: 0.55, metalness: 0.35 });
  const w = opts.w ?? 6.6, h = opts.h ?? 4.4;

  const frame = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.22), frameMat);
  frame.position.y = 3.0;
  frame.castShadow = true;
  g.add(frame);
  const t = new THREE.Mesh(new THREE.BoxGeometry(w + 0.4, 0.26, 0.3), edgeMat);
  t.position.y = h + 0.92;
  g.add(t);
  const b = new THREE.Mesh(new THREE.BoxGeometry(w + 0.4, 0.26, 0.3), edgeMat);
  b.position.y = 0.72;
  g.add(b);

  // Diffus pur : aucun reflet sur les panneaux du cours, lecture nette
  const face = new THREE.MeshLambertMaterial({
    map: tex,
  });
  const front = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.4, h - 0.4), face);
  front.position.set(0, 3.0, 0.13);
  g.add(front);
  return g;
}

function buildTotem(tex) {
  const g = new THREE.Group();
  const postMat = new THREE.MeshStandardMaterial({ color: PAL.walnutDark, roughness: 0.7, metalness: 0.2 });
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 3.4, 8), postMat);
  post.position.y = 1.7;
  post.castShadow = true;
  g.add(post);
  const face = new THREE.MeshLambertMaterial({ map: tex });
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 2.1), face);
  plane.position.y = 3.9;
  g.add(plane);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.1, 0.24, 8), postMat);
  cap.position.y = 5.15;
  g.add(cap);
  return g;
}

function buildShelter(tex) {
  const g = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color: 0x4a3a26, roughness: 0.5, metalness: 0.5 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x9db8bf, roughness: 0.15, metalness: 0.4, transparent: true, opacity: 0.5 });
  const roofMat = new THREE.MeshStandardMaterial({ color: PAL.bronze, roughness: 0.5, metalness: 0.45 });

  for (const x of [-2.2, 2.2]) {
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 2.8, 8), metal);
    pole.position.set(x, 1.4, 0);
    g.add(pole);
  }
  const roof = new THREE.Mesh(new THREE.BoxGeometry(5.4, 0.16, 2.6), roofMat);
  roof.position.y = 2.9;
  roof.rotation.x = 0.06;
  g.add(roof);

  const back = new THREE.Mesh(new THREE.BoxGeometry(5.4, 2.1, 0.1), glass);
  back.position.set(0, 1.75, -1.15);
  g.add(back);
  const benchSeat = new THREE.Mesh(new THREE.BoxGeometry(4.4, 0.08, 0.4), new THREE.MeshStandardMaterial({ color: 0x6b4a2c }));
  benchSeat.position.set(0, 0.5, -0.3);
  g.add(benchSeat);

  const face = new THREE.MeshLambertMaterial({ map: tex });
  const poster = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 2.0), face);
  poster.position.set(0, 1.9, 0.14);
  g.add(poster);
  return g;
}

function buildKiosk(tex) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.6, 2.6, 0.5), new THREE.MeshStandardMaterial({ color: PAL.walnut, roughness: 0.7 }));
  body.position.y = 1.3;
  g.add(body);
  const face = new THREE.MeshLambertMaterial({ map: tex });
  const poster = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.0), face);
  poster.position.set(0, 1.35, 0.27);
  g.add(poster);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.12, 1.0), new THREE.MeshStandardMaterial({ color: PAL.bronze, roughness: 0.5, metalness: 0.4 }));
  roof.position.y = 2.72;
  g.add(roof);
  return g;
}

// ---------------- Map parchment ----------------
function parchmentTexture(withZones = false) {
  return canvasTexture((ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#efe7d3");
    g.addColorStop(1, "#dcc9a6");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 70; i++) {
      const bw = 24 + Math.random() * 90, bh = 14 + Math.random() * 60;
      ctx.fillStyle = `rgba(178,166,138,${(0.1 + Math.random() * 0.22).toFixed(3)})`;
      ctx.fillRect(Math.random() * (w - bw), Math.random() * (h - bh), bw, bh);
    }
    ctx.fillStyle = "rgba(120,162,184,0.35)";
    ctx.fillRect(0, 0, w * 0.16, h * 0.12);
    ctx.fillRect(w * 0.82, h * 0.72, w * 0.18, h * 0.28);
    ctx.fillStyle = "rgba(109,168,124,0.35)";
    ctx.fillRect(w * 0.6, h * 0.08, w * 0.28, h * 0.18);

    ctx.strokeStyle = "rgba(120,104,80,0.5)";
    ctx.lineWidth = 3;
    for (let i = 0; i < 6; i++) {
      const y = h * (0.1 + i * 0.16);
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.bezierCurveTo(w * 0.3, y + 16, w * 0.6, y - 14, w, y + 8);
      ctx.stroke();
    }
    for (let i = 0; i < 7; i++) {
      const x = w * (0.08 + i * 0.14);
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.bezierCurveTo(x + 14, h * 0.3, x - 12, h * 0.62, x + 8, h);
      ctx.stroke();
    }

    if (withZones) {
      const zones = [
        [0.08, 0.12, 0.3, 0.34, "rgba(125,158,194,0.36)"],
        [0.44, 0.1, 0.3, 0.3, "rgba(192,138,104,0.38)"],
        [0.12, 0.52, 0.32, 0.32, "rgba(143,174,138,0.36)"],
        [0.5, 0.5, 0.36, 0.38, "rgba(207,165,116,0.38)"],
      ];
      zones.forEach(([x, y, zw, zh, col]) => {
        ctx.fillStyle = col;
        ctx.fillRect(w * x, h * y, w * zw, h * zh);
        ctx.strokeStyle = "rgba(50,40,28,0.6)";
        ctx.lineWidth = 4;
        ctx.setLineDash([12, 8]);
        ctx.strokeRect(w * x, h * y, w * zw, h * zh);
        ctx.setLineDash([]);
      });
    }
  }, 1024, 1024);
}

function buildPin(color) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.2, emissive: color, emissiveIntensity: 0.5 });
  const cone = new THREE.Mesh(new THREE.ConeGeometry(0.28, 0.7, 12), mat);
  cone.position.y = 0.7;
  g.add(cone);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), mat);
  ball.position.y = 1.15;
  g.add(ball);
  return g;
}

// ---------------- Desk / office ----------------
function buildDesk() {
  const g = new THREE.Group();
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x8a6b45, roughness: 0.6, metalness: 0.05 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x4a3a26, roughness: 0.8 });
  const top = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.14, 1.5), woodMat);
  top.position.y = 1.0;
  top.castShadow = true;
  g.add(top);
  for (const [x, z] of [[-1.5, -0.6], [1.5, -0.6], [-1.5, 0.6], [1.5, 0.6]]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.0, 0.12), darkMat);
    leg.position.set(x, 0.5, z);
    g.add(leg);
  }
  return g;
}

function buildDoc(w = 0.85, h = 1.15, rotY = 0) {
  const g = new THREE.Group();
  const paper = new THREE.Mesh(
    new THREE.BoxGeometry(w, 0.02, h),
    new THREE.MeshStandardMaterial({ color: 0xf4ead0, roughness: 0.85 })
  );
  g.add(paper);
  const lineMat = new THREE.MeshBasicMaterial({ color: 0x6b5638 });
  for (let i = 0; i < 5; i++) {
    const line = new THREE.Mesh(new THREE.BoxGeometry(w * 0.72, 0.005, 0.02), lineMat);
    line.position.set(0, 0.012, h * 0.32 - i * h * 0.14);
    g.add(line);
  }
  g.rotation.y = rotY;
  return g;
}

function buildClipboard() {
  const g = new THREE.Group();
  const board = new THREE.Mesh(
    new THREE.BoxGeometry(0.72, 0.03, 0.98),
    new THREE.MeshStandardMaterial({ color: 0xc9a86a, roughness: 0.6 })
  );
  g.add(board);
  const paper = new THREE.Mesh(
    new THREE.PlaneGeometry(0.62, 0.86),
    new THREE.MeshStandardMaterial({ color: 0xf4ead0, roughness: 0.9 })
  );
  paper.position.set(0, 0.02, 0.02);
  g.add(paper);
  const clip = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.06, 0.3), new THREE.MeshStandardMaterial({ color: 0x5c4a30, metalness: 0.6, roughness: 0.3 }));
  clip.position.set(0, 0.05, 0.42);
  g.add(clip);
  return g;
}

function buildMagnifier(rot = 0.2) {
  const g = new THREE.Group();
  const frame = new THREE.Mesh(
    new THREE.TorusGeometry(0.34, 0.05, 12, 28),
    new THREE.MeshStandardMaterial({ color: PAL.bronze, roughness: 0.3, metalness: 0.7 })
  );
  g.add(frame);
  const lens = new THREE.Mesh(
    new THREE.CircleGeometry(0.33, 28),
    new THREE.MeshStandardMaterial({ color: 0xbfe0e6, transparent: true, opacity: 0.35, roughness: 0.05, metalness: 0.4 })
  );
  g.add(lens);
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.05, 0.5, 10), new THREE.MeshStandardMaterial({ color: 0x4a3a26, roughness: 0.7 }));
  handle.position.set(-0.4, -0.15, 0);
  handle.rotation.z = 0.9;
  g.add(handle);
  g.rotation.x = rot;
  return g;
}

function buildDeskLamp(glowColor = 0xffb870) {
  const g = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color: 0x4a3a26, roughness: 0.4, metalness: 0.6 });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.1, 16), metal);
  base.position.y = 0.05;
  g.add(base);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.1, 10), metal);
  pole.position.y = 0.65;
  g.add(pole);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.05, 0.05), metal);
  arm.position.set(0.42, 1.25, 0);
  g.add(arm);
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.22, 14), metal);
  head.position.set(0.85, 1.28, 0);
  head.rotation.z = -Math.PI / 2;
  g.add(head);
  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.07, 10, 8), new THREE.MeshStandardMaterial({
    color: glowColor, emissive: glowColor, emissiveIntensity: 2.2,
  }));
  bulb.position.set(0.9, 1.18, 0);
  g.add(bulb);
  const light = new THREE.PointLight(glowColor, 1.6, 9, 2);
  light.position.set(0.9, 1.1, 0);
  g.add(light);
  return { g, light };
}

function buildPen() {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.8, 12), new THREE.MeshStandardMaterial({ color: 0x3a2f22, roughness: 0.4, metalness: 0.5 }));
  body.position.y = 0.4;
  g.add(body);
  const tip = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.16, 12), new THREE.MeshStandardMaterial({ color: PAL.bronze, metalness: 0.8, roughness: 0.3 }));
  tip.position.y = -0.02;
  tip.rotation.x = Math.PI;
  g.add(tip);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.18, 12), new THREE.MeshStandardMaterial({ color: 0xb96a45, roughness: 0.5 }));
  cap.position.y = 0.92;
  g.add(cap);
  return g;
}

function buildStamp(color = 0xb03a30, label = "CONCÉDÉ") {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.24, 20), new THREE.MeshStandardMaterial({ color, roughness: 0.5 }));
  g.add(body);
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 0.3, 12), new THREE.MeshStandardMaterial({ color: 0x4a3a26, roughness: 0.6 }));
  handle.position.y = 0.27;
  g.add(handle);
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.03, 8, 24), new THREE.MeshStandardMaterial({ color: 0xf4ead0, roughness: 0.6 }));
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.121;
  g.add(ring);
  return g;
}

function buildGavel() {
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: 0x8a6a3d, roughness: 0.5 });
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.06, 0.9, 12), wood);
  handle.rotation.z = Math.PI / 2;
  g.add(handle);
  const head = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 0.34, 12), wood);
  head.position.set(0.55, 0.12, 0);
  head.rotation.z = Math.PI / 2;
  g.add(head);
  return g;
}

function buildEnvelope(rot = 0) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.05, 0.42), new THREE.MeshStandardMaterial({ color: 0xf4ead0, roughness: 0.85 }));
  g.add(body);
  const wax = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.02, 12), new THREE.MeshStandardMaterial({ color: 0xb03a30, roughness: 0.4 }));
  wax.position.y = 0.035;
  g.add(wax);
  g.rotation.y = rot;
  return g;
}

// ---------------- Gauges ----------------
function gaugeTexture(pct, color, label) {
  return canvasTexture((ctx, w, h) => {
    ctx.fillStyle = "#f7f0de";
    rr(ctx, 6, 6, w - 12, h - 12, 20);
    ctx.fill();
    ctx.strokeStyle = "rgba(138,111,69,0.55)";
    ctx.lineWidth = 4;
    rr(ctx, 6, 6, w - 12, h - 12, 20);
    ctx.stroke();

    const cx = w / 2, cy = h * 0.56, r = h * 0.32;
    const start = Math.PI * 0.75, sweep = Math.PI * 1.5;
    ctx.lineCap = "round";
    ctx.lineWidth = 26;
    ctx.strokeStyle = "rgba(110,90,55,0.22)";
    ctx.beginPath();
    ctx.arc(cx, cy, r, start, start + sweep);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.arc(cx, cy, r, start, start + sweep * pct);
    ctx.stroke();

    ctx.fillStyle = "#3a2e1f";
    ctx.font = "800 90px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(Math.round(pct * 100) + "%", cx, cy + 22);
    ctx.fillStyle = "rgba(90,74,52,0.75)";
    ctx.font = "600 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
    ctx.fillText(label, cx, cy + r + 44);
  }, 512, 512);
}

// ---------------- Cranes ----------------
function buildCrane(scale = 1) {
  const g = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({ color: 0x4a3a26, roughness: 0.5, metalness: 0.4 });
  const accent = new THREE.MeshStandardMaterial({ color: PAL.terracotta, roughness: 0.6 });
  const h = 17 * scale;
  const tower = new THREE.Mesh(new THREE.BoxGeometry(0.5, h, 0.5), metal);
  tower.position.y = h / 2;
  tower.castShadow = true;
  g.add(tower);
  const jib = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 15 * scale), metal);
  jib.position.set(0, h + 0.6, 5 * scale);
  g.add(jib);
  const cab = new THREE.Mesh(new THREE.BoxGeometry(1.0, 1.0, 1.0), accent);
  cab.position.set(0, h, -1.6 * scale);
  g.add(cab);
  for (const x of [-0.2, 0.2]) {
    const tie = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 8 * scale, 6), metal);
    tie.position.set(x, h + 0.4, 6.6 * scale);
    tie.rotation.x = -0.35;
    g.add(tie);
  }
  const cableMat = new THREE.LineBasicMaterial({ color: 0x5c4a30 });
  const cablePts = [new THREE.Vector3(0, h + 0.5, 8 * scale), new THREE.Vector3(0, h - 3 * scale, 8 * scale)];
  const cableGeo = new THREE.BufferGeometry().setFromPoints(cablePts);
  g.add(new THREE.Line(cableGeo, cableMat));
  const hook = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), metal);
  hook.position.set(0, h - 3.4 * scale, 8 * scale);
  g.add(hook);
  return g;
}

// ---------------- Confetti ----------------
function buildConfetti(scene, count = 60) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const palette = [0xc08a68, 0xd2a878, 0xf4ead0, 0x8fae8a, 0xa08a64];
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = Math.random() * 9;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 14;
    const c = new THREE.Color(palette[i % palette.length]);
    colors[i * 3] = c.r; colors[i * 3 + 1] = c.g; colors[i * 3 + 2] = c.b;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  const mat = new THREE.PointsMaterial({ size: 0.16, vertexColors: true, transparent: true, opacity: 0.85 });
  const pts = new THREE.Points(geo, mat);
  scene.add(pts);
  return pts;
}

// ---------------- Scene stage ----------------
function stage(scene, opts = {}) {
  // Ciel plus réaliste : dégradé chaud, halo d'horizon et voile de nuages doux
  const skyTex = canvasTexture((ctx, w, h) => {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "#f8f1de");
    g.addColorStop(0.34, "#f4e9cf");
    g.addColorStop(0.6, "#efe1bf");
    g.addColorStop(0.82, "#e9d7ab");
    g.addColorStop(1, "#e1cc95");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
    // Brume lumineuse au ras de l'horizon
    const hg = ctx.createLinearGradient(0, h * 0.58, 0, h);
    hg.addColorStop(0, "rgba(255,238,205,0)");
    hg.addColorStop(1, "rgba(255,241,212,0.9)");
    ctx.fillStyle = hg;
    ctx.fillRect(0, h * 0.58, w, h * 0.42);
    // Nuages doux en suspension
    ctx.fillStyle = "rgba(255,252,244,0.5)";
    for (let i = 0; i < 12; i++) {
      const cx = Math.random() * w;
      const cy = Math.random() * h * 0.55;
      const cw = 26 + Math.random() * 48;
      for (let j = 0; j < 4; j++) {
        ctx.beginPath();
        ctx.ellipse(cx + (Math.random() - 0.5) * cw * 0.6, cy + (Math.random() - 0.5) * 10, cw * (0.3 + Math.random() * 0.25), 4 + Math.random() * 5, 0, 0, TAU);
        ctx.fill();
      }
    }
  }, 256, 1024);
  const skyMat = new THREE.MeshBasicMaterial({ map: skyTex, side: THREE.BackSide, fog: false, depthWrite: false });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(820, 24, 14), skyMat);
  scene.add(sky);

  const sun = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture(0.0, "rgba(240,180,110,0.95)"),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
  }));
  sun.position.set(opts.sunX ?? -180, opts.sunY ?? 90, -520);
  sun.scale.setScalar(opts.sunS ?? 130);
  scene.add(sun);
  const halo = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture(0.25, "rgba(235,165,95,0.35)"),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
  }));
  halo.position.set(opts.sunX ?? -180, opts.sunY ?? 90, -520);
  halo.scale.setScalar(460);
  scene.add(halo);
  scene.userData.sun = { sprite: sun, halo };

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(1400, 40),
    new THREE.MeshStandardMaterial({ map: groundTexture(), roughness: 1, metalness: 0 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.03;
  ground.receiveShadow = true;
  scene.add(ground);

  scene.add(new THREE.AmbientLight(0xb3a280, opts.ambient ?? 0.75));
  scene.add(new THREE.HemisphereLight(0xf2e6cc, 0xb8a67e, opts.hemi ?? 0.5));
  const sunLight = new THREE.DirectionalLight(0xffedc8, opts.sunI ?? 2.6);
  sunLight.position.set(-120, 140, -220);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(1024, 1024);
  sunLight.shadow.camera.left = -60;
  sunLight.shadow.camera.right = 60;
  sunLight.shadow.camera.top = 60;
  sunLight.shadow.camera.bottom = -60;
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 600;
  scene.add(sunLight);
  scene.add(sunLight.target);

  scene.fog = new THREE.Fog(opts.fogColor ?? PAL.skyHorizon, opts.fogNear ?? 40, opts.fogFar ?? 480);

  // Poussière atmosphérique en suspension : profondeur et vie dans toutes les scènes
  const dustCount = isLowPower() ? 70 : 140;
  const dpos = new Float32Array(dustCount * 3);
  for (let i = 0; i < dustCount; i++) {
    dpos[i * 3] = (Math.random() - 0.5) * 90;
    dpos[i * 3 + 1] = 0.4 + Math.random() * 9;
    dpos[i * 3 + 2] = -20 + Math.random() * 160;
  }
  const dgeo = new THREE.BufferGeometry();
  dgeo.setAttribute("position", new THREE.BufferAttribute(dpos, 3));
  const dustMat = new THREE.PointsMaterial({
    color: 0xf4ead0, transparent: true, opacity: 0.3,
    blending: THREE.AdditiveBlending, depthWrite: false, size: 0.09, sizeAttenuation: true,
  });
  const dust = new THREE.Points(dgeo, dustMat);
  scene.add(dust);
  scene.userData.dust = dust;
}

function addCity(scene, count = 12, startZ = 30, endZ = 170, lateral = 70) {
  for (let i = 0; i < count; i++) {
    const z = startZ + Math.random() * (endZ - startZ);
    const h = 9 + Math.random() * 22;
    const w = 5 + Math.random() * 4;
    const d = 5 + Math.random() * 4;
    const side = Math.random() > 0.5 ? 1 : -1;
    scene.add(buildBuilding(w, h, d, z, side * (lateral * 0.55 + Math.random() * lateral * 0.45)));
  }
}

function addPalms(scene, positions) {
  scene.userData.palms = scene.userData.palms || [];
  for (const [x, z, s] of positions) {
    const p = buildPalm(new THREE.Vector3(x, 0, z), s ?? 1);
    scene.userData.palms.push(p);
    scene.add(p);
  }
}

// ---------------- Scene composers ----------------
const SCENES = {
  presentation(scene, st, index) {
    stage(scene);
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, -30), new THREE.Vector3(0, 0, 140)]);
    const road = buildRibbon(curve, 4.4, PAL.path, asphaltTexture(), 400);
    road.position.y = 0.01;
    scene.add(road);

    const hero = buildStationPanel(st, index);
    hero.position.set(-5.2, 0, 46);
    hero.rotation.y = 0.42;
    scene.add(hero);

    const p2 = buildGenericPanel(posterTexture(1));
    p2.position.set(6.4, 0, 70);
    p2.rotation.y = -0.55;
    scene.add(p2);

    addCity(scene, 16);
    addPalms(scene, [[-9, 18, 1.2], [9, 22, 1.0], [-10, 62, 1.3], [10, 92, 1.1], [-11, 120, 1.25]]);
    for (let i = 0; i <= 4; i++) {
      const z = 8 + i * 26;
      const side = i % 2 === 0 ? 1 : -1;
      const lamp = buildLamp(new THREE.Vector3(side * 6, 0, z), side);
      scene.add(lamp);
      const lg = buildLampGlow(new THREE.Vector3(side * 6, 0, z), side);
      scene.add(lg.group);
    }
    for (const z of [30, 78]) {
      const car = buildCar();
      car.group.position.set(0, 0, z);
      car.group.rotation.y = Math.PI;
      car.group.userData.x0 = 0;
      (scene.userData.cars = scene.userData.cars || []).push(car.group);
      scene.add(car.group);
    }
    const cam = new THREE.PerspectiveCamera(46, 1280 / 760, 0.1, 2000);
    cam.position.set(6.5, 3.1, 14);
    cam.lookAt(-1.5, 3.4, 52);
    return cam;
  },

  "lecon1-importance"(scene, st, index) {
    stage(scene, { sunX: 60, sunY: 120, sunI: 2.4 });
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, -20), new THREE.Vector3(0, 0, 150)]);
    const road = buildRibbon(curve, 4.4, PAL.path, asphaltTexture(), 400);
    road.position.y = 0.01;
    scene.add(road);

    const panels = [
      { x: -5.6, z: 40, ry: 0.5 },
      { x: 5.8, z: 62, ry: -0.6 },
      { x: -5.9, z: 86, ry: 0.55 },
      { x: 5.9, z: 108, ry: -0.55 },
      { x: -5.8, z: 130, ry: 0.5 },
    ];
    panels.forEach((p, i) => {
      const g = i === 0 ? buildStationPanel(st, index) : buildGenericPanel(posterTexture(i + 2));
      g.position.set(p.x, 0, p.z);
      g.rotation.y = p.ry;
      scene.add(g);
    });

    addCity(scene, 14, 30, 190, 80);
    addPalms(scene, [[-9, 16, 1.0], [9, 50, 1.1], [-10, 96, 1.05], [10, 132, 1.15]]);
    for (let i = 0; i <= 5; i++) {
      const z = 12 + i * 24;
      const side = i % 2 === 0 ? 1 : -1;
      const lamp = buildLamp(new THREE.Vector3(side * 6, 0, z), side);
      scene.add(lamp);
      const lg = buildLampGlow(new THREE.Vector3(side * 6, 0, z), side);
      scene.add(lg.group);
    }
    for (const z of [28, 74, 118]) {
      const car = buildCar();
      car.group.position.set(0, 0, z);
      car.group.rotation.y = Math.PI;
      car.group.userData.x0 = 0;
      (scene.userData.cars = scene.userData.cars || []).push(car.group);
      scene.add(car.group);
    }
    const cam = new THREE.PerspectiveCamera(48, 1280 / 760, 0.1, 2000);
    cam.position.set(8, 5.4, 6);
    cam.lookAt(0, 3.2, 80);
    return cam;
  },

  "lecon2-constat"(scene, st, index) {
    stage(scene, { sunI: 1.3, ambient: 0.5, fogColor: 0xece0c4, fogNear: 24, fogFar: 220 });
    const spots = [
      [0, 20, 0.1, 1.15], [-7, 34, -0.35, 1.0], [6, 42, 0.55, 0.9],
      [-3, 52, -0.2, 1.25], [8, 60, -0.7, 0.85], [-8, 66, 0.3, 1.1],
      [3, 74, 0.65, 0.95], [-5, 84, -0.5, 1.05], [7, 90, 0.15, 0.8],
      [-9, 96, -0.8, 1.2],
    ];
    spots.forEach(([x, z, ry, s], i) => {
      const g = i === 0 ? buildStationPanel(st, index) : buildGenericPanel(posterTexture(i + 1));
      g.position.set(x, 0, z);
      g.scale.setScalar(s);
      g.rotation.y = ry;
      g.rotation.z = (i % 3) * 0.06 - 0.06;
      if (i % 4 === 3) g.rotation.x = -0.08;
      scene.add(g);
    });
    const fallen = buildGenericPanel(posterTexture(5));
    fallen.position.set(2, 0, 102);
    fallen.rotation.set(1.35, 0.4, 0.3);
    scene.add(fallen);

    addCity(scene, 10, 20, 150, 60);
    addPalms(scene, [[-9, 30, 0.9], [9, 55, 0.85], [-10, 88, 0.95]]);
    const cam = new THREE.PerspectiveCamera(52, 1280 / 760, 0.1, 2000);
    cam.position.set(11, 5.2, -8);
    cam.lookAt(-1, 2.6, 55);
    return cam;
  },

  audit(scene) {
    stage(scene, { sunI: 1.1, ambient: 0.65, fogNear: 30, fogFar: 200 });
    scene.fog = new THREE.Fog(0xece0c4, 30, 200);

    const back = new THREE.Mesh(new THREE.PlaneGeometry(90, 40), new THREE.MeshStandardMaterial({ color: 0xf3ead4 }));
    back.position.set(0, 14, -16);
    back.rotation.y = Math.PI;
    scene.add(back);

    const windowTex = canvasTexture((ctx, w, h) => {
      const g = ctx.createLinearGradient(0, 0, 0, h);
      g.addColorStop(0, "#d9e4e6"); g.addColorStop(1, "#f2e4c6");
      ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#c3ab7c";
      ctx.fillRect(0, h * 0.72, w, h * 0.28);
      ctx.fillStyle = "rgba(180,140,90,0.6)";
      for (let i = 0; i < 14; i++) {
        const bw = 16 + Math.random() * 40, bh = 20 + Math.random() * 60;
        ctx.fillRect(10 + Math.random() * (w - 50), h * 0.76, bw, bh);
      }
    }, 512, 320);
    const windowFrame = new THREE.Mesh(new THREE.PlaneGeometry(13, 7), new THREE.MeshStandardMaterial({ map: windowTex, emissiveMap: windowTex, emissive: new THREE.Color(0xfff0d8), emissiveIntensity: 0.12 }));
    windowFrame.position.set(0, 7.5, -15.6);
    scene.add(windowFrame);
    const crossMat = new THREE.MeshStandardMaterial({ color: 0x7a5f38 });
    const crossV = new THREE.Mesh(new THREE.BoxGeometry(0.4, 7, 0.3), crossMat);
    crossV.position.set(0, 7.5, -15.2);
    scene.add(crossV);
    const crossH = new THREE.Mesh(new THREE.BoxGeometry(13, 0.4, 0.3), crossMat);
    crossH.position.set(0, 7.5, -15.2);
    scene.add(crossH);

    const desk = buildDesk();
    scene.add(desk);
    for (const [dx, dz, ry] of [[0.7, 0.3, 0.35], [-0.6, 0.4, -0.4], [0.2, -0.5, 0.1]]) {
      const d = buildDoc(0.9, 1.2, ry);
      d.position.set(dx, 1.1, dz);
      scene.add(d);
    }
    const clip = buildClipboard();
    clip.position.set(-0.9, 1.09, 0.25);
    clip.rotation.y = 0.3;
    scene.add(clip);
    const mag = buildMagnifier(0.25);
    mag.position.set(0.55, 1.12, 0.5);
    mag.rotation.y = 0.4;
    mag.userData.y0 = 1.12; mag.userData.rz0 = 0;
    (scene.userData.floaters = scene.userData.floaters || []).push(mag);
    scene.add(mag);

    const lamp = buildDeskLamp();
    lamp.g.position.set(-1.6, 0, -0.5);
    scene.add(lamp.g);
    scene.add(lamp.light);

    const cam = new THREE.PerspectiveCamera(44, 1280 / 760, 0.1, 2000);
    cam.position.set(4.2, 3.4, 7.5);
    cam.lookAt(0, 1.6, -1);
    return cam;
  },

  "etat-lieux"(scene) {
    stage(scene, { sunI: 2.2, fogNear: 60, fogFar: 700 });
    const map = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 24),
      new THREE.MeshStandardMaterial({ map: parchmentTexture(), roughness: 0.9 })
    );
    map.rotation.x = -Math.PI / 2;
    map.position.y = 0.01;
    scene.add(map);

    const routePts = [
      new THREE.Vector3(-7, 0.5, 6),
      new THREE.Vector3(-3.5, 0.6, 1),
      new THREE.Vector3(1, 0.7, -4),
      new THREE.Vector3(5.5, 0.8, -7),
      new THREE.Vector3(9, 0.9, -10),
    ];
  const route = new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(routePts), 64, 0.12, 8, false),
    new THREE.MeshBasicMaterial({ color: 0xc08a68, transparent: true, opacity: 0.8 })
  );
    route.position.y = -0.01;
    scene.add(route);

    const pins = [
      [-7, 6, 0xc97a62], [-3.5, 1, 0x7d9ec2], [1, -4, 0xd2a878],
      [5.5, -7, 0x8fae8a], [9, -10, 0xc97a62],
    ];
    pins.forEach(([x, z, col]) => {
      const pin = buildPin(col);
      pin.position.set(x, 0, z);
      scene.add(pin);
    });

    const compass = canvasTexture((ctx, w, h) => {
      ctx.fillStyle = "rgba(255,255,255,0.75)";
      ctx.beginPath(); ctx.arc(w / 2, h / 2, w / 2 - 8, 0, TAU); ctx.fill();
      ctx.strokeStyle = "rgba(90,74,52,0.8)"; ctx.lineWidth = 5; ctx.stroke();
      ctx.fillStyle = "#c08a68";
      ctx.beginPath();
      ctx.moveTo(w / 2, h * 0.16); ctx.lineTo(w * 0.58, h * 0.6); ctx.lineTo(w * 0.42, h * 0.6);
      ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#5a4a34"; ctx.font = "800 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif"; ctx.textAlign = "center";
      ctx.fillText("N", w / 2, h * 0.2);
    }, 160, 160);
    const comp = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.2), new THREE.MeshBasicMaterial({ map: compass, transparent: true }));
    comp.position.set(-9.5, 0.05, 9.5);
    comp.rotation.x = -Math.PI / 2;
    scene.userData.compass = comp;
    scene.add(comp);

    const cam = new THREE.PerspectiveCamera(40, 1280 / 760, 0.1, 2000);
    cam.position.set(13, 20, 11);
    cam.lookAt(0, 0, 0);
    return cam;
  },

  zonage(scene) {
    stage(scene, { sunI: 2.0, fogNear: 60, fogFar: 700 });
    const map = new THREE.Mesh(
      new THREE.PlaneGeometry(24, 24),
      new THREE.MeshStandardMaterial({ map: parchmentTexture(true), roughness: 0.9 })
    );
    map.rotation.x = -Math.PI / 2;
    map.position.y = 0.01;
    scene.add(map);

    const zones = [
      [0, 0, 0x7d9ec2], [6, 0, 0xc08a68],
      [0, -6, 0x8fae8a], [6, -6, 0xd2a878],
    ];
    zones.forEach(([x, z, col]) => {
      const pin = buildPin(col);
      pin.position.set(x, 0, z);
      scene.add(pin);
    });

    const legendTex = canvasTexture((ctx, w, h) => {
      ctx.fillStyle = "rgba(240,236,220,0.95)";
      rr(ctx, 0, 0, w, h, 16); ctx.fill();
      const items = [["#7d9ec2", "Zone A"], ["#c08a68", "Zone B"], ["#8fae8a", "Zone C"], ["#d2a878", "Zone D"]];
      ctx.font = "700 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif"; ctx.textAlign = "left";
      items.forEach(([col, label], i) => {
        ctx.fillStyle = col;
        ctx.beginPath(); ctx.arc(46, 60 + i * 70, 16, 0, TAU); ctx.fill();
        ctx.fillStyle = "#3a2a18";
        ctx.fillText(label, 78, 72 + i * 70);
      });
    }, 360, 320);
    const legend = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 3.0), new THREE.MeshBasicMaterial({ map: legendTex, transparent: true }));
    legend.position.set(-8.8, 0.05, -8);
    legend.rotation.x = -Math.PI / 2;
    scene.add(legend);

    const cam = new THREE.PerspectiveCamera(40, 1280 / 760, 0.1, 2000);
    cam.position.set(-10, 21, 14);
    cam.lookAt(0, 0, -1);
    return cam;
  },

  "constitution-lots"(scene, st, index) {
    stage(scene, { sunX: 40, sunY: 130, sunI: 2.4 });
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, -20), new THREE.Vector3(0, 0, 150)]);
    const road = buildRibbon(curve, 4.4, PAL.path, asphaltTexture(), 400);
    road.position.y = 0.01;
    scene.add(road);

    const shelter = buildShelter(posterTexture(0));
    shelter.position.set(-6.4, 0, 42);
    shelter.rotation.y = 0.35;
    scene.add(shelter);

    const hero = buildGenericPanel(posterTexture(3));
    hero.position.set(6.6, 0, 64);
    hero.rotation.y = -0.5;
    scene.add(hero);

    const kiosk = buildKiosk(posterTexture(2));
    kiosk.position.set(-6.2, 0, 88);
    kiosk.rotation.y = 0.4;
    scene.add(kiosk);

    const totem = buildTotem(posterTexture(1));
    totem.position.set(6.4, 0, 108);
    totem.rotation.y = -0.45;
    scene.add(totem);

    addCity(scene, 12, 30, 180, 80);
    addPalms(scene, [[-9, 22, 1.1], [9, 34, 1.0], [-10, 78, 1.15], [10, 122, 1.05]]);
    for (let i = 0; i <= 4; i++) {
      const z = 20 + i * 24;
      const side = i % 2 === 0 ? 1 : -1;
      const lamp = buildLamp(new THREE.Vector3(side * 6, 0, z), side);
      scene.add(lamp);
      const lg = buildLampGlow(new THREE.Vector3(side * 6, 0, z), side);
      scene.add(lg.group);
    }
    for (const z of [58, 100]) {
      const b = buildBench(new THREE.Vector3(4.6, 0, z), 1);
      scene.add(b);
    }
    const cam = new THREE.PerspectiveCamera(46, 1280 / 760, 0.1, 2000);
    cam.position.set(8.5, 4.6, 4);
    cam.lookAt(-1, 3, 62);
    return cam;
  },

  "mise-concession"(scene) {
    stage(scene, { sunI: 1.2, ambient: 0.7, fogNear: 30, fogFar: 200 });
    scene.fog = new THREE.Fog(0xece0c4, 30, 200);
    const back = new THREE.Mesh(new THREE.PlaneGeometry(90, 40), new THREE.MeshStandardMaterial({ color: 0xf3ead4 }));
    back.position.set(0, 14, -16);
    back.rotation.y = Math.PI;
    scene.add(back);

    const desk = buildDesk();
    scene.add(desk);

    const contract = new THREE.Mesh(
      new THREE.PlaneGeometry(2.3, 1.6),
      new THREE.MeshStandardMaterial({ color: 0xf4ead0, roughness: 0.85 })
    );
    contract.position.set(0.1, 1.08, 0.15);
    contract.rotation.x = -0.18;
    scene.add(contract);

    const pen = buildPen();
    pen.position.set(1.05, 1.1, 0.5);
    pen.rotation.y = -0.5;
    pen.rotation.z = -0.12;
    pen.userData.y0 = 1.1; pen.userData.rz0 = -0.12;
    (scene.userData.floaters = scene.userData.floaters || []).push(pen);
    scene.add(pen);

    const stamp = buildStamp();
    stamp.position.set(-1.15, 1.05, -0.1);
    stamp.rotation.y = 0.3;
    stamp.userData.y0 = 1.05; stamp.userData.rz0 = 0;
    (scene.userData.floaters = scene.userData.floaters || []).push(stamp);
    scene.add(stamp);

    const key = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.04, 10, 24), new THREE.MeshStandardMaterial({ color: PAL.bronze, metalness: 0.8, roughness: 0.3 }));
    key.position.set(-0.7, 1.12, 0.6);
    key.rotation.x = Math.PI / 2.2;
    key.rotation.z = 0.3;
    scene.add(key);

    const lamp = buildDeskLamp();
    lamp.g.position.set(-1.7, 0, -0.6);
    scene.add(lamp.g);
    scene.add(lamp.light);

    const cam = new THREE.PerspectiveCamera(42, 1280 / 760, 0.1, 2000);
    cam.position.set(3.9, 3.6, 6.8);
    cam.lookAt(-0.1, 1.7, -0.4);
    return cam;
  },

  attribution(scene) {
    stage(scene, { sunI: 1.2, ambient: 0.7, fogNear: 30, fogFar: 200 });
    scene.fog = new THREE.Fog(0xece0c4, 30, 200);
    const back = new THREE.Mesh(new THREE.PlaneGeometry(90, 40), new THREE.MeshStandardMaterial({ color: 0xf3ead4 }));
    back.position.set(0, 14, -16);
    back.rotation.y = Math.PI;
    scene.add(back);

    const desk = buildDesk();
    scene.add(desk);

    const gavel = buildGavel();
    gavel.position.set(0.9, 1.12, 0.2);
    gavel.rotation.y = 0.7;
    gavel.userData.y0 = 1.12; gavel.userData.rz0 = 0;
    (scene.userData.floaters = scene.userData.floaters || []).push(gavel);
    scene.add(gavel);

    for (const [x, z, ry] of [[-1.2, 0.4, 0.5], [-0.5, -0.4, -0.6], [0.4, 0.6, 0.1]]) {
      const env = buildEnvelope(ry);
      env.position.set(x, 1.06, z);
      scene.add(env);
    }

    const stamp = buildStamp(0x3a703f, "ADMIS");
    stamp.position.set(-1.4, 1.05, -0.5);
    stamp.rotation.y = -0.4;
    scene.add(stamp);

    const medal = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.06, 12, 28), new THREE.MeshStandardMaterial({ color: 0xd2a878, metalness: 0.9, roughness: 0.25 }));
    medal.position.set(0.1, 1.15, -0.6);
    medal.rotation.x = Math.PI / 2.4;
    medal.userData.y0 = 1.15; medal.userData.rz0 = 0;
    (scene.userData.floaters = scene.userData.floaters || []).push(medal);
    scene.add(medal);

    const lamp = buildDeskLamp();
    lamp.g.position.set(-1.7, 0, -0.6);
    scene.add(lamp.g);
    scene.add(lamp.light);

    const cam = new THREE.PerspectiveCamera(42, 1280 / 760, 0.1, 2000);
    cam.position.set(4.1, 3.5, 7.2);
    cam.lookAt(0, 1.6, -0.2);
    return cam;
  },

  gestion(scene) {
    stage(scene, { sunX: 20, sunY: 150, sunI: 2.5 });
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, -20), new THREE.Vector3(0, 0, 150)]);
    const road = buildRibbon(curve, 4.4, PAL.path, asphaltTexture(), 400);
    road.position.y = 0.01;
    scene.add(road);

    // City hall
    const hall = new THREE.Group();
    const wallMat = new THREE.MeshStandardMaterial({ color: 0xe7dbbf, roughness: 0.85 });
    const block = new THREE.Mesh(new THREE.BoxGeometry(14, 10, 8), wallMat);
    block.position.y = 5;
    block.castShadow = true;
    hall.add(block);
    const ped = new THREE.Mesh(new THREE.CylinderGeometry(8, 8.6, 1.6, 4), wallMat);
    ped.position.y = 11;
    ped.rotation.y = Math.PI / 4;
    hall.add(ped);
    const columnMat = new THREE.MeshStandardMaterial({ color: 0xcfbe9f, roughness: 0.6 });
    for (const x of [-5, -3.3, -1.6, 0, 1.6, 3.3, 5]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 4.6, 10), columnMat);
      col.position.set(x, 2.3, 4.05);
      hall.add(col);
    }
    const windowTex = canvasTexture((ctx, w, h) => {
      ctx.fillStyle = "#d8c9a6"; ctx.fillRect(0, 0, w, h);
      for (let r = 0; r < 3; r++) for (let c = 0; c < 6; c++) {
        if (Math.random() < 0.75) {
          ctx.fillStyle = Math.random() < 0.4 ? "#b98a5a" : "#c9a25f";
          ctx.globalAlpha = 0.6;
          ctx.fillRect(10 + c * (w / 6), 10 + r * (h / 3.4), w / 8, h / 4.4);
          ctx.globalAlpha = 1;
        }
      }
    }, 512, 256);
    const winMesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 4.4), new THREE.MeshStandardMaterial({ map: windowTex, emissiveMap: windowTex, emissive: new THREE.Color(0xf5e2bd), emissiveIntensity: 0.15 }));
    winMesh.position.set(0, 6.2, 4.06);
    hall.add(winMesh);
    hall.position.set(0, 0, 58);
    hall.rotation.y = Math.PI;
    scene.add(hall);

    // Flag
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 8, 8), new THREE.MeshStandardMaterial({ color: 0x5c4a30 }));
    pole.position.set(-8, 4, 56);
    scene.add(pole);
    const flag = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.5), new THREE.MeshStandardMaterial({ color: PAL.terracotta, side: THREE.DoubleSide, roughness: 0.8 }));
    flag.position.set(-6.6, 7.4, 56);
    flag.rotation.y = 0.2;
    scene.userData.flag = flag;
    scene.add(flag);

    // Orderly furniture
    for (let i = 0; i < 3; i++) {
      const g = buildGenericPanel(posterTexture(i + 1));
      g.position.set(-6.4, 0, 30 + i * 22);
      g.rotation.y = 0.45;
      scene.add(g);
    }
    addCity(scene, 10, 80, 200, 90);
    addPalms(scene, [[-9, 20, 1.0], [9, 44, 1.1], [9.5, 92, 1.0]]);
    for (let i = 0; i <= 4; i++) {
      const z = 14 + i * 26;
      const side = i % 2 === 0 ? 1 : -1;
      const lamp = buildLamp(new THREE.Vector3(side * 6, 0, z), side);
      scene.add(lamp);
      const lg = buildLampGlow(new THREE.Vector3(side * 6, 0, z), side);
      scene.add(lg.group);
    }
    const cam = new THREE.PerspectiveCamera(44, 1280 / 760, 0.1, 2000);
    cam.position.set(10, 3.6, 18);
    cam.lookAt(0, 4.5, 58);
    return cam;
  },

  evaluation(scene) {
    stage(scene, { sunI: 1.0, ambient: 0.55, fogNear: 30, fogFar: 300 });
    scene.fog = new THREE.Fog(0xece0c4, 30, 300);

    const gaugeData = [
      { pct: 0.9, color: "#d2a878", label: "AUDIT", x: -4 },
      { pct: 0.78, color: "#c08a68", label: "CONCESSION", x: 0 },
      { pct: 0.86, color: "#7da878", label: "GESTION", x: 4 },
    ];
    gaugeData.forEach(({ pct, color, label, x }) => {
      const stand = new THREE.Mesh(new THREE.CylinderGeometry(1.5, 1.8, 0.3, 20), new THREE.MeshStandardMaterial({ color: 0x5c4a30, roughness: 0.7 }));
      stand.position.set(x, 0.15, 0);
      scene.add(stand);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 3.4, 10), new THREE.MeshStandardMaterial({ color: PAL.walnut, roughness: 0.6 }));
      pole.position.set(x, 1.85, 0);
      scene.add(pole);
      const gaugeTex = gaugeTexture(pct, color, label);
      const face = new THREE.Mesh(
        new THREE.PlaneGeometry(3.6, 3.6),
        new THREE.MeshStandardMaterial({ map: gaugeTex, emissiveMap: gaugeTex, emissive: new THREE.Color(0xffffff), emissiveIntensity: 0.08 })
      );
      face.position.set(x, 3.9, 0);
      face.rotation.x = 0.25;
      scene.add(face);
      const glow = new THREE.PointLight(0xe8a35c, 0.2, 8, 2);
      glow.position.set(x, 3.2, 2);
      scene.add(glow);
    });

    const trendPts = [
      new THREE.Vector3(-6, 0.8, 2.5),
      new THREE.Vector3(-3, 1.6, 1.4),
      new THREE.Vector3(0, 2.6, 0),
      new THREE.Vector3(3, 3.8, -1.2),
      new THREE.Vector3(6, 5.2, -2.4),
    ];
    const trend = new THREE.Mesh(
      new THREE.TubeGeometry(new THREE.CatmullRomCurve3(trendPts), 64, 0.1, 8, false),
      new THREE.MeshBasicMaterial({ color: 0x57a05f, transparent: true, opacity: 0.9 })
    );
    scene.add(trend);
    const arrow = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.8, 12), new THREE.MeshStandardMaterial({ color: 0x57a05f, emissive: 0x57a05f, emissiveIntensity: 0.6 }));
    arrow.position.set(6.4, 5.6, -2.7);
    arrow.rotation.z = -0.6;
    scene.add(arrow);

    const cam = new THREE.PerspectiveCamera(46, 1280 / 760, 0.1, 2000);
    cam.position.set(7, 3.4, 11);
    cam.lookAt(0, 3.2, -1);
    return cam;
  },

  "mise-a-jour"(scene) {
    stage(scene, { sunX: -80, sunY: 110, sunI: 2.2 });
    const curve = new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, -20), new THREE.Vector3(0, 0, 150)]);
    const road = buildRibbon(curve, 4.4, PAL.path, asphaltTexture(), 400);
    road.position.y = 0.01;
    scene.add(road);

    const crane1 = buildCrane(1.0);
    crane1.position.set(-8, 0, 52);
    scene.userData.cranes = [crane1];
    scene.add(crane1);
    const crane2 = buildCrane(0.7);
    crane2.position.set(8, 0, 84);
    scene.userData.cranes.push(crane2);
    scene.add(crane2);

    const building = new THREE.Mesh(new THREE.BoxGeometry(7, 9, 7), new THREE.MeshStandardMaterial({ color: 0x2a2016, roughness: 0.9 }));
    building.position.set(0, 4.5, 62);
    building.castShadow = true;
    scene.add(building);
    const scaffoldMat = new THREE.MeshStandardMaterial({ color: 0x6b5638, roughness: 0.8 });
    for (let i = 0; i < 4; i++) {
      const beam = new THREE.Mesh(new THREE.BoxGeometry(8, 0.14, 0.14), scaffoldMat);
      beam.position.set(0, 1.5 + i * 2.3, 3.6);
      scene.add(beam);
    }

    const hoisted = buildGenericPanel(posterTexture(4));
    hoisted.position.set(0, 14, 66);
    hoisted.rotation.x = 0.15;
    hoisted.userData.y0 = 14;
    scene.userData.hoisted = hoisted;
    scene.add(hoisted);
    const cableMat = new THREE.LineBasicMaterial({ color: 0x5c4a30 });
    const cablePts = [new THREE.Vector3(-8, 18, 52), new THREE.Vector3(0, 15, 65)];
    const cableGeo = new THREE.BufferGeometry().setFromPoints(cablePts);
    scene.add(new THREE.Line(cableGeo, cableMat));

    addCity(scene, 10, 90, 220, 85);
    addPalms(scene, [[-9, 30, 0.9], [9, 110, 1.0]]);
    const cam = new THREE.PerspectiveCamera(48, 1280 / 760, 0.1, 2000);
    cam.position.set(11, 5.5, 6);
    cam.lookAt(0, 8, 62);
    return cam;
  },

  quiz(scene) {
    stage(scene, { sunX: 0, sunY: 130, sunI: 2.0 });

    const qTex = canvasTexture((ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "rgba(253,250,242,0.92)";
      rr(ctx, 0, 0, w, h, 40);
      ctx.fill();
      ctx.strokeStyle = "rgba(138,111,69,0.5)";
      ctx.lineWidth = 8;
      rr(ctx, 8, 8, w - 16, h - 16, 36);
      ctx.stroke();
      ctx.shadowColor = "rgba(122,95,56,0.55)";
      ctx.shadowBlur = 40;
      ctx.fillStyle = "#7a5f38";
      ctx.font = "800 620px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("?", w / 2, h * 0.52);
      ctx.shadowBlur = 0;
    }, 640, 640);
    const q = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 7),
      new THREE.MeshBasicMaterial({ map: qTex, transparent: true })
    );
    q.position.set(0, 8.5, 30);
    scene.add(q);
    const qGlow = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialTexture(0.3, "rgba(232,163,92,0.28)"),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    qGlow.position.set(0, 8.5, 28.5);
    qGlow.scale.setScalar(18);
    scene.add(qGlow);

    // Trophy
    const trophy = new THREE.Group();
    const gold = new THREE.MeshStandardMaterial({ color: 0xd2a878, metalness: 0.85, roughness: 0.28 });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.0, 0.3, 16), gold);
    trophy.add(base);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.3, 1.2, 12), gold);
    stem.position.y = 0.75;
    trophy.add(stem);
    const cup = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.45, 1.1, 18), gold);
    cup.position.y = 1.7;
    trophy.add(cup);
    for (const s of [-1, 1]) {
      const h1 = new THREE.Mesh(new THREE.TorusGeometry(0.4, 0.07, 10, 20, Math.PI), gold);
      h1.position.set(s * 0.78, 1.5, 0);
      h1.rotation.z = s * Math.PI / 2;
      trophy.add(h1);
    }
    trophy.position.set(-3.6, 0, 40);
    scene.userData.trophy = trophy;
    scene.add(trophy);

    addCity(scene, 12, 60, 200, 90);
    addPalms(scene, [[-9, 60, 1.0], [9, 90, 1.1]]);
    scene.userData.confetti = buildConfetti(scene, 70);

    const cam = new THREE.PerspectiveCamera(46, 1280 / 760, 0.1, 2000);
    cam.position.set(6, 3.6, 8);
    cam.lookAt(0, 6.5, 34);
    return cam;
  },
};

// ---------------- Illustration 3D EN DIRECT (cours animé) ----------------
// Chaque section du cours affiche sa scène en temps réel : animation continue
// (poussière, voitures, grues, confettis, drapeaux, objets de bureau…) et
// parallaxe de caméra liée au scroll. course.js met la boucle en pause hors écran.
export function createLiveIllustration3D(st, index, canvas, w = 1280, h = 760) {
  if (webglUnavailable) return null;
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: !isLowPower(), alpha: false });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isLowPower();
    if (renderer.shadowMap.enabled) renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isLowPower() ? 1 : 1.25));
    renderer.setSize(w, h, false); // la taille d'affichage reste gérée par le CSS (aspect-ratio)
  } catch (e) {
    webglUnavailable = true;
    return null;
  }

  let scene = null;
  let camera = null;
  try {
    scene = new THREE.Scene();
    const composer = SCENES[st.id] || SCENES.presentation;
    camera = composer(scene, st, index);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  } catch (e) {
    console.warn("Illustration 3D en direct indisponible pour", st.id, e);
    renderer.dispose();
    return null;
  }

  const basePos = camera.position.clone();
  const fwd = new THREE.Vector3();
  camera.getWorldDirection(fwd);
  const baseTarget = basePos.clone().addScaledVector(fwd, 40);
  // L'amplitude de la parallaxe s'adapte à la profondeur de chaque scène :
  // plus la caméra est loin du centre de la scène, plus le travelling est ample.
  const distK = Math.min(3, Math.max(0.6, basePos.length() / 14));

  const dust = scene.userData.dust || null;
  const sunRef = scene.userData.sun || null;
  const palms = scene.userData.palms || [];
  const cars = scene.userData.cars || [];
  const cranes = scene.userData.cranes || [];
  const hoisted = scene.userData.hoisted || null;
  const trophy = scene.userData.trophy || null;
  const flag = scene.userData.flag || null;
  const compass = scene.userData.compass || null;
  const confetti = scene.userData.confetti || null;
  const floaters = scene.userData.floaters || [];

  function frame(time, dt, p) {
    // Poussière atmosphérique qui dérive
    if (dust) {
      dust.rotation.y += dt * 0.02;
      dust.position.y = Math.sin(time * 0.4) * 0.3;
      dust.material.opacity = 0.26 + Math.sin(time * 0.8) * 0.08;
    }
    // Soleil qui respire doucement
    if (sunRef) {
      sunRef.sprite.material.opacity = 0.82 + Math.sin(time * 0.5) * 0.1;
      sunRef.halo.material.opacity = 0.28 + Math.sin(time * 0.4 + 1) * 0.06;
    }
    // Palmiers qui se balancent
    for (let i = 0; i < palms.length; i++) {
      palms[i].rotation.z = Math.sin(time * 0.8 + i * 1.7) * 0.05;
    }
    // Voitures qui circulent sur la route
    for (let i = 0; i < cars.length; i++) {
      const c = cars[i];
      c.position.z -= dt * 0.9;
      c.position.x = (c.userData.x0 || 0) + Math.sin(time * 0.5 + i * 2.1) * 0.4;
      if (c.position.z < -14) {
        c.position.z = 132;
        c.position.x = (Math.random() - 0.5) * 6;
        c.userData.x0 = c.position.x;
      }
    }
    // Confettis qui tombent (quiz)
    if (confetti) {
      const pos = confetti.geometry.attributes.position;
      const arr = pos.array;
      for (let i = 0; i < pos.count; i++) {
        arr[i * 3 + 1] -= dt * 0.7;
        if (arr[i * 3 + 1] < 0.2) {
          arr[i * 3 + 1] = 6 + Math.random() * 3;
          arr[i * 3] = (Math.random() - 0.5) * 14;
          arr[i * 3 + 2] = (Math.random() - 0.5) * 14;
        }
      }
      pos.needsUpdate = true;
    }
    if (trophy) trophy.rotation.y = Math.sin(time * 0.6) * 0.12;
    // Grues qui pivotent lentement (chantier)
    for (let i = 0; i < cranes.length; i++) {
      const cr = cranes[i];
      cr.rotation.y = (cr.userData.baseY || 0) + Math.sin(time * 0.15 + i * 2.4) * 0.12;
    }
    if (hoisted) {
      hoisted.rotation.z = Math.sin(time * 1.1) * 0.03;
      hoisted.position.y = (hoisted.userData.y0 || 14) + Math.sin(time * 0.7) * 0.25;
    }
    if (flag) {
      flag.rotation.z = Math.sin(time * 1.8) * 0.16 + Math.sin(time * 3.1) * 0.05;
    }
    // Boussole qui tourne (carte)
    if (compass) compass.rotation.z = time * 0.15;
    // Objets de bureau qui respirent (loupe, tampon, marteau, médaille…)
    for (let i = 0; i < floaters.length; i++) {
      const f = floaters[i];
      f.position.y = (f.userData.y0 || f.position.y) + Math.sin(time * 1.2 + i * 1.3) * 0.03;
      f.rotation.z = (f.userData.rz0 || 0) + Math.sin(time * 0.9 + i) * 0.02;
    }
    // Parallaxe caméra : doux travelling lié à la position de la section dans l'écran
    camera.position.set(
      basePos.x + Math.sin(p * Math.PI) * 0.5 * distK + Math.sin(time * 0.3) * 0.06 * distK,
      basePos.y + Math.cos(p * Math.PI) * 0.25 * distK + Math.sin(time * 0.24) * 0.05 * distK,
      basePos.z + (p - 0.5) * 1.2 * distK + Math.cos(time * 0.21) * 0.07 * distK
    );
    camera.lookAt(baseTarget);
    renderer.render(scene, camera);
  }

  return {
    canvas: renderer.domElement,
    render: frame,
    dispose() {
      renderer.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          for (const m of mats) {
            if (m.map) m.map.dispose();
            m.dispose();
          }
        }
      });
    },
  };
}

// ---------------- Public API ----------------
const cache = new Map();

export function renderIllustration3D(st, index, w = 1280, h = 760) {
  if (cache.has(st.id)) return cache.get(st.id);
  const renderer = getRenderer();
  if (!renderer) return null;
  try {
    renderer.setPixelRatio(isLowPower() ? 1.0 : 1.5);
    renderer.setSize(w, h);
    const scene = new THREE.Scene();
    const composer = SCENES[st.id] || SCENES.presentation;
    const camera = composer(scene, st, index);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
    const url = renderer.domElement.toDataURL("image/jpeg", 0.85);
    disposeScene(scene);
    cache.set(st.id, url);
    return url;
  } catch (e) {
    console.warn("Illustration 3D indisponible pour", st.id, e);
    return null;
  }
}

function disposeScene(scene) {
  const seenTex = new Set();
  const seenMat = new Set();
  scene.traverse((obj) => {
    if (obj.geometry) obj.geometry.dispose();
    const mats = Array.isArray(obj.material) ? obj.material : obj.material ? [obj.material] : [];
    for (const m of mats) {
      if (seenMat.has(m)) continue;
      seenMat.add(m);
      for (const tex of [m.map, m.emissiveMap]) {
        if (tex && !seenTex.has(tex)) {
          seenTex.add(tex);
          tex.dispose();
        }
      }
      m.dispose();
    }
  });
}
