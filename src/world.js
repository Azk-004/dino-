import * as THREE from "three";

let LOW = false;
export function setLowPower(v) {
  LOW = v;
}
export function isLowPower() {
  return LOW;
}

// Palette douce « plein jour » : beige clair, couleurs adoucies pour une lecture confortable
export const PAL = {
  skyTop: 0xeadcc0,
  skyMid: 0xf0e3c8,
  skyHorizon: 0xf5ecd6,
  sun: 0xe9b96b,
  ground: 0xd5c193,
  groundDark: 0xc3ab7c,
  path: 0xc0a677,
  pathEdge: 0xd3ba8b,
  walnut: 0x5a4a36,
  walnutDark: 0x42352a,
  bronze: 0x9a8157,
  ivory: 0xfdf8ec,
  ivoryDim: 0xefe2c9,
  terracotta: 0xc08a68,
  amber: 0xcfa574,
  city: 0xd8c9a6,
  hill: 0xc6b893,
};

export function radialTexture(inner, color) {
  const c = document.createElement("canvas");
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 64 * inner, 64, 64, 64);
  g.addColorStop(0, color);
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function wrapText(ctx, text, maxWidth) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const word of words) {
    const test = line ? line + " " + word : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function groundTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#cdb98c";
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) {
    const l = 168 + Math.random() * 42;
    ctx.fillStyle = `rgba(${l | 0},${(l * 0.92) | 0},${(l * 0.72) | 0},${(Math.random() * 0.2).toFixed(3)})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 2 + Math.random() * 4, 2 + Math.random() * 4);
  }
  for (let i = 0; i < 150; i++) {
    ctx.fillStyle = "rgba(110,86,52," + (0.14 + Math.random() * 0.26).toFixed(3) + ")";
    ctx.beginPath();
    ctx.arc(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(LOW ? 48 : 90, LOW ? 48 : 90);
  tex.anisotropy = LOW ? 2 : 8;
  return tex;
}

export function asphaltTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#c2a878";
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 3200; i++) {
    ctx.fillStyle = `rgba(90,68,40,${(Math.random() * 0.16).toFixed(3)})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 3, 1 + Math.random() * 3);
  }
  for (let i = 0; i < 500; i++) {
    ctx.fillStyle = `rgba(255,252,244,${(Math.random() * 0.12).toFixed(3)})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
  const g = ctx.createLinearGradient(112, 0, 144, 256);
  g.addColorStop(0, "rgba(255,255,255,0)");
  g.addColorStop(0.5, "rgba(255,255,255,0.07)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 60);
  tex.anisotropy = LOW ? 2 : 8;
  return tex;
}

export function buildRibbon(curve, width, color, tex, samples = 500) {
  const pts = curve.getSpacedPoints(samples);
  const positions = new Float32Array((samples + 1) * 6);
  const uvs = new Float32Array((samples + 1) * 4);
  const indices = new Uint32Array(samples * 6);

  for (let i = 0; i <= samples; i++) {
    const p = pts[Math.min(i, samples - 1)];
    const p1 = pts[Math.min(i + 1, samples - 1)];
    const dir = new THREE.Vector3().subVectors(p1, p).normalize();
    const perp = new THREE.Vector3(-dir.z, 0, dir.x).normalize();
    const l = p.clone().add(perp.clone().multiplyScalar(-width / 2));
    const r = p.clone().add(perp.clone().multiplyScalar(width / 2));
    const idx = i * 6;
    positions[idx] = l.x; positions[idx + 1] = l.y; positions[idx + 2] = l.z;
    positions[idx + 3] = r.x; positions[idx + 4] = r.y; positions[idx + 5] = r.z;
    uvs[i * 4] = 0; uvs[i * 4 + 1] = i / samples;
    uvs[i * 4 + 2] = 1; uvs[i * 4 + 3] = i / samples;
    if (i < samples) {
      const a = i * 2, b = i * 2 + 1, c = i * 2 + 2, d = i * 2 + 3;
      const o = i * 6;
      indices[o] = a; indices[o + 1] = c; indices[o + 2] = b;
      indices[o + 3] = b; indices[o + 4] = c; indices[o + 5] = d;
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geo.setIndex(new THREE.BufferAttribute(indices, 1));
  geo.computeVertexNormals();

  const mesh = new THREE.Mesh(
    geo,
    new THREE.MeshStandardMaterial({ color, roughness: 0.95, metalness: 0.02, map: tex || null })
  );
  mesh.receiveShadow = true;
  return mesh;
}

export function buildPanel(st, curve, t, side, index) {
  const group = new THREE.Group();
  const p = curve.getPointAt(t);
  const tg = curve.getTangentAt(t);
  const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
  const lateral = perp.clone().multiplyScalar(side * 5.4);
  const zJitter = (index % 3) - 1;
  group.position.set(p.x + lateral.x + zJitter * 0.9, 0, p.z + lateral.z + zJitter * 0.9);

  const approach = curve.getPointAt(Math.max(0, t - 0.035));
  const dir = new THREE.Vector3().subVectors(approach, group.position).normalize();
  const restRot = Math.atan2(dir.x, dir.z);
  group.rotation.y = restRot;

  const frameMat = new THREE.MeshStandardMaterial({ color: PAL.walnut, roughness: 0.8, metalness: 0.05 });
  const frame = new THREE.Mesh(new THREE.BoxGeometry(6.6, 4.4, 0.22), frameMat);
  frame.position.y = 3.0;
  frame.castShadow = true;
  group.add(frame);

  // Socle en pierre (ancrage réaliste du panneau au sol)
  const plinthMat = new THREE.MeshStandardMaterial({ color: 0xb7a47e, roughness: 0.92 });
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.4, 0.8), plinthMat);
  plinth.position.y = 0.2;
  plinth.castShadow = true;
  group.add(plinth);

  // Jardinières fleuries au pied du panneau
  const planterMat = new THREE.MeshStandardMaterial({ color: 0x9a8157, roughness: 0.9 });
  const soilMat = new THREE.MeshStandardMaterial({ color: 0x42352a, roughness: 1 });
  const foliageMat = new THREE.MeshStandardMaterial({ color: 0x5f7a4a, roughness: 1, flatShading: true });
  for (const sx of [-2.9, 2.9]) {
    const planter = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.34, 0.5), planterMat);
    planter.position.set(sx, 0.17, 0.55);
    group.add(planter);
    const soil = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.1, 0.42), soilMat);
    soil.position.set(sx, 0.34, 0.55);
    group.add(soil);
    for (const fx of [-0.1, 0.12]) {
      const foliage = new THREE.Mesh(new THREE.IcosahedronGeometry(0.14, 1), foliageMat);
      foliage.position.set(sx + fx, 0.42, 0.55);
      group.add(foliage);
      const flower = new THREE.Mesh(
        new THREE.SphereGeometry(0.05, 6, 5),
        new THREE.MeshStandardMaterial({ color: sx < 0 ? 0xc08a68 : 0xcfa574, roughness: 0.9 })
      );
      flower.position.set(sx + fx, 0.52, 0.55);
      group.add(flower);
    }
  }

  const edgeMat = new THREE.MeshStandardMaterial({ color: PAL.bronze, roughness: 0.75, metalness: 0.12 });
  const edgeTop = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.26, 0.3), edgeMat);
  edgeTop.position.y = 5.32;
  group.add(edgeTop);
  const edgeBottom = new THREE.Mesh(new THREE.BoxGeometry(7.0, 0.26, 0.3), edgeMat);
  edgeBottom.position.y = 0.72;
  group.add(edgeBottom);
  for (const sx of [-3.5, 3.5]) {
    const edgeSide = new THREE.Mesh(new THREE.BoxGeometry(0.26, 4.8, 0.3), edgeMat);
    edgeSide.position.set(sx, 3.0, 0);
    group.add(edgeSide);
  }

  const postMat = new THREE.MeshStandardMaterial({ color: PAL.walnutDark, roughness: 0.7, metalness: 0.1 });
  for (const sx of [-2.5, 2.5]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.8, 0.32), postMat);
    post.position.set(sx, 0.4, 0);
    post.castShadow = true;
    group.add(post);
  }

  const cw = LOW ? 640 : 1024;
  const ch = LOW ? 480 : 768;
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  drawPanelCanvas(canvas.getContext("2d"), st, index, cw, ch);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = LOW ? 2 : 8;

  // Face en matériau diffus pur (Lambert) : aucune réflexion spéculaire, aucun reflet solaire — lecture parfaite
  const frontMat = new THREE.MeshLambertMaterial({
    map: tex,
  });
  const front = new THREE.Mesh(new THREE.PlaneGeometry(6.2, 4.0), frontMat);
  front.position.set(0, 3.0, 0.125);
  group.add(front);

  const back = new THREE.Mesh(
    new THREE.PlaneGeometry(6.2, 4.0),
    new THREE.MeshStandardMaterial({ color: PAL.walnutDark, roughness: 0.9 })
  );
  back.position.set(0, 3.0, -0.125);
  back.rotation.y = Math.PI;
  group.add(back);

  const light = LOW
    ? null
    : new THREE.PointLight(0xe8a35c, 0, 26, 2);
  if (light) {
    light.position.set(0, 3.3, 2.4);
    group.add(light);
  }

  const beaconMat = new THREE.MeshStandardMaterial({
    color: PAL.amber,
    emissive: PAL.amber,
    emissiveIntensity: 0.22,
  });
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), beaconMat);
  beacon.position.set(0, 5.52, 0);
  group.add(beacon);

  return { group, frontMat, light, beaconMat, front };
}

function drawPanelCanvas(ctx, st, index, cw = 1024, ch = 768) {
  const w = cw, h = ch;
  ctx.scale(cw / 1024, ch / 768);
  // Fond clair « parchemin beige » : lisible, doux pour les yeux
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#fdf8ec");
  grad.addColorStop(1, "#f1e6cb");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.globalAlpha = 0.045;
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? "#7a5f38" : "#ffffff";
    ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
  }
  ctx.globalAlpha = 1;

  ctx.strokeStyle = "rgba(122,95,56,0.3)";
  ctx.lineWidth = 3;
  ctx.strokeRect(34, 34, w - 68, h - 68);

  ctx.fillStyle = "#c08a68";
  for (const [cx, cy, dirx, diry] of [
    [34, 34, 1, 1], [w - 34, 34, -1, 1], [34, h - 34, 1, -1], [w - 34, h - 34, -1, -1],
  ]) {
    ctx.fillRect(cx + dirx * 8, cy + diry * 8, 26 * dirx, 4 * diry);
    ctx.fillRect(cx + dirx * 8, cy + diry * 8, 4 * dirx, 26 * diry);
  }

  ctx.fillStyle = "#7a5f38";
  ctx.font = "500 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.letterSpacing = "6px";
  ctx.fillText(st.kicker.toUpperCase(), 70, 96);
  ctx.letterSpacing = "0px";

  ctx.fillStyle = "rgba(207,165,116,0.18)";
  ctx.font = "600 300px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(st.num, w - 60, 360);

  ctx.fillStyle = "#c08a68";
  ctx.fillRect(70, 132, 90, 4);

  ctx.fillStyle = "#3a2e1f";
  ctx.font = "600 62px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.textAlign = "left";
  const titleLines = wrapText(ctx, st.title, 860);
  let y = 210;
  titleLines.slice(0, 4).forEach((ln) => { ctx.fillText(ln, 70, y); y += 70; });
  y += 18;

  if (st.id !== "quiz" && st.bullets.length) {
    ctx.fillStyle = "rgba(122,95,56,0.45)";
    ctx.fillRect(70, y - 6, 60, 2);
    y += 26;
    ctx.font = "400 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
    const bulletLines = [];
    st.bullets.slice(0, 4).forEach((b) => bulletLines.push(...wrapText(ctx, b, 840)));
    bulletLines.slice(0, 5).forEach((ln) => {
      ctx.fillStyle = "#c08a68";
      ctx.beginPath();
      ctx.arc(78, y - 10, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#4c3d28";
      ctx.fillText(ln, 100, y);
      y += 40;
    });
  }

  ctx.fillStyle = "rgba(122,95,56,0.7)";
  ctx.font = "400 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.letterSpacing = "3px";
  ctx.fillText("MODULE 1 · DOMAINE PUBLIC", 70, h - 62);
  ctx.fillStyle = "rgba(170,120,85,0.8)";
  ctx.textAlign = "right";
  ctx.fillText(String(index + 1).padStart(2, "0") + " / 13", w - 70, h - 62);
  ctx.letterSpacing = "0px";

  // Vignette légère sur les bords uniquement — plus aucune lueur chaude au centre (fini les faux reflets)
  const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.62);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(0.6, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(150,120,75,0.22)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);
}

export function buildBuilding(w, h, d, z, lateral) {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 128;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#dccda8";
  ctx.fillRect(0, 0, 64, 128);
  const seed = Math.random();
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 4; col++) {
      const r = Math.random();
      if (r < 0.3) {
        ctx.fillStyle = Math.random() < 0.3 ? "#c08a68" : "#c9a25f";
        ctx.globalAlpha = 0.35 + Math.random() * 0.35;
        ctx.fillRect(4 + col * 14 + Math.random() * 4, 6 + row * 13 + Math.random() * 3, 5, 7);
        ctx.globalAlpha = 1;
      } else if (r < 0.42) {
        ctx.fillStyle = "#6a5a38";
        ctx.globalAlpha = 0.35;
        ctx.fillRect(4 + col * 14, 6 + row * 13, 5, 7);
        ctx.globalAlpha = 1;
      }
    }
  }

  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.repeat.set(1, Math.max(1, Math.round(h / 6)));
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = LOW ? 1 : 4;

  const mat = new THREE.MeshStandardMaterial({
    map: tex,
    roughness: 0.9,
    metalness: 0.0,
  });
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(lateral, h / 2 - 0.3, z);
  m.rotation.y = (Math.random() - 0.5) * 0.5;
  m.castShadow = true;
  return m;
}

export function buildLamp(pos, side) {
  const group = new THREE.Group();
  group.position.copy(pos);
  const poleMat = new THREE.MeshStandardMaterial({ color: PAL.walnutDark, roughness: 0.6, metalness: 0.3 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.1, 5.6, 8), poleMat);
  pole.position.y = 2.8;
  group.add(pole);
  const arm = new THREE.Mesh(new THREE.BoxGeometry(1.7, 0.1, 0.1), poleMat);
  arm.position.set(side * 0.85, 5.5, 0);
  group.add(arm);
  const lampMat = new THREE.MeshStandardMaterial({ color: PAL.amber, emissive: PAL.amber, emissiveIntensity: 0.25 });
  const lamp = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), lampMat);
  lamp.position.set(side * 1.7, 5.5, 0);
  group.add(lamp);
  return group;
}

export function buildDune(pos, size) {
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(PAL.groundDark).lerp(new THREE.Color(PAL.ground), Math.random()),
    roughness: 1,
    flatShading: true,
  });
  const m = new THREE.Mesh(new THREE.IcosahedronGeometry(size, 1), mat);
  m.position.set(pos.x, -0.15, pos.z);
  m.scale.set(1, 0.32, 1);
  m.rotation.y = Math.random() * Math.PI;
  return m;
}

export function buildRock(pos, size) {
  const mat = new THREE.MeshStandardMaterial({ color: 0x9a8a68, roughness: 0.95, flatShading: true });
  const m = new THREE.Mesh(new THREE.DodecahedronGeometry(size, 0), mat);
  m.position.set(pos.x, size * 0.4, pos.z);
  m.rotation.set(Math.random(), Math.random() * Math.PI, Math.random());
  return m;
}

export function buildDust(count = 420) {
  const N = count;
  const positions = new Float32Array(N * 3);
  const line = new THREE.CatmullRomCurve3(
    [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 120),
      new THREE.Vector3(0, 0, 240),
      new THREE.Vector3(0, 0, 360),
      new THREE.Vector3(0, 0, 468),
    ],
    false,
    "centripetal"
  );
  for (let i = 0; i < N; i++) {
    const t = Math.random();
    const p = line.getPointAt(t);
    positions[i * 3] = p.x + (Math.random() - 0.5) * 24;
    positions[i * 3 + 1] = 0.4 + Math.random() * 6;
    positions[i * 3 + 2] = p.z + (Math.random() - 0.5) * 24;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const mat = new THREE.PointsMaterial({
    color: PAL.amber,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    size: 0.35,
    sizeAttenuation: true,
  });
  return new THREE.Points(geo, mat);
}

export function buildBird() {
  const g = new THREE.Group();
  const mat = new THREE.MeshBasicMaterial({
    color: 0x4a3a26,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide,
  });
  const wingGeo = new THREE.PlaneGeometry(0.55, 0.18);
  const l = new THREE.Mesh(wingGeo, mat);
  l.position.x = -0.3;
  const r = new THREE.Mesh(wingGeo, mat);
  r.position.x = 0.3;
  const body = new THREE.Mesh(new THREE.PlaneGeometry(0.34, 0.07), mat);
  body.rotation.z = Math.PI / 2;
  g.add(l, r, body);
  g.scale.setScalar(1.3);
  return { g, l, r };
}

export function buildPalm(pos, scale = 1) {
  const g = new THREE.Group();
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x8a6b45, roughness: 0.95, flatShading: true });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.18, 3.2, 6), trunkMat);
  trunk.position.y = 1.6;
  trunk.rotation.z = (Math.random() - 0.5) * 0.22;
  trunk.castShadow = true;
  g.add(trunk);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x5f7a4a, roughness: 1, flatShading: true });
  const fronds = 7;
  for (let i = 0; i < fronds; i++) {
    const a = (i / fronds) * Math.PI * 2;
    const frond = new THREE.Mesh(new THREE.SphereGeometry(1, 7, 5), leafMat);
    frond.position.set(Math.cos(a) * 1.15, 3.05, Math.sin(a) * 1.15);
    frond.scale.set(1.15, 0.28, 0.55);
    frond.rotation.y = a;
    g.add(frond);
  }
  const crown = new THREE.Mesh(new THREE.SphereGeometry(0.28, 8, 6), leafMat);
  crown.position.y = 3.15;
  g.add(crown);
  g.position.copy(pos);
  g.scale.setScalar(scale);
  return g;
}

export function buildBush(pos, scale = 1) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x6b8353, roughness: 1, flatShading: true });
  for (let i = 0; i < 5; i++) {
    const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3 + Math.random() * 0.24, 1), mat);
    b.position.set((Math.random() - 0.5) * 0.7, 0.22 + Math.random() * 0.3, (Math.random() - 0.5) * 0.7);
    g.add(b);
  }
  g.position.copy(pos);
  g.scale.setScalar(scale);
  return g;
}

export function buildCloud(pos, scale = 1) {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({
    color: 0xf6efdd,
    roughness: 1,
    flatShading: true,
    transparent: true,
    opacity: 0.92,
  });
  for (let i = 0; i < 6; i++) {
    const b = new THREE.Mesh(new THREE.SphereGeometry(1.1 + Math.random() * 1.4, 9, 7), mat);
    b.position.set(i * 1.6 - 4, Math.random() * 0.9, (Math.random() - 0.5) * 2);
    b.scale.y = 0.5;
    g.add(b);
  }
  g.position.copy(pos);
  g.scale.setScalar(scale);
  return g;
}

export function buildSign(pos, angle, lines) {
  const g = new THREE.Group();
  g.position.copy(pos);
  const wood = new THREE.MeshStandardMaterial({ color: PAL.walnutDark, roughness: 0.7, metalness: 0.2 });
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.14, 2.1, 8), wood);
  post.position.y = 1.05;
  post.castShadow = true;
  g.add(post);
  const brace = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.08, 0.14), wood);
  brace.position.set(0, 1.85, 0);
  brace.rotation.z = Math.PI / 2;
  g.add(brace);

  const sw = LOW ? 256 : 512;
  const sh = LOW ? 160 : 320;
  const c = document.createElement("canvas");
  c.width = sw;
  c.height = sh;
  const ctx = c.getContext("2d");
  ctx.scale(sw / 512, sh / 320);
  ctx.fillStyle = "#f7eeda";
  ctx.fillRect(0, 0, 512, 320);
  ctx.strokeStyle = "rgba(138,111,69,0.6)";
  ctx.lineWidth = 8;
  ctx.strokeRect(12, 12, 488, 296);
  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, "#c08a68");
  grad.addColorStop(1, "#cfa574");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 52, 512, 10);
  ctx.textAlign = "center";
  ctx.fillStyle = "#3a2e1f";
  ctx.font = "700 42px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  lines.forEach((ln, i) => ctx.fillText(ln, 256, 122 + i * 50));
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = LOW ? 2 : 8;
  // Matériau diffus pur : les panneaux directionnels ne réfléchissent plus le soleil
  const plateMat = new THREE.MeshLambertMaterial({
    map: tex,
  });
  const sign = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.06), plateMat);
  sign.position.y = 2.28;
  const plate = new THREE.Group();
  plate.add(sign);
  plate.rotation.y = angle;
  g.add(plate);
  return { group: g, sign };
}

export function buildMountain(pos, w, h, zScale) {
  const mat = new THREE.MeshStandardMaterial({ color: PAL.hill, roughness: 1, flatShading: true });
  const m = new THREE.Mesh(new THREE.IcosahedronGeometry(1, 2), mat);
  m.scale.set(w, h, zScale);
  m.position.set(pos.x, pos.y, pos.z);
  m.rotation.y = Math.random() * Math.PI;
  m.castShadow = true;
  return m;
}

export function buildLampGlow(pos, side) {
  const g = new THREE.Group();
  g.position.copy(pos);
  const glow = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture(0.0, "rgba(255,190,120,0.3)"),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
  }));
  glow.scale.setScalar(3.6);
  glow.position.set(side * 1.7, 5.5, 0);
  g.add(glow);
  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(3.8, 24),
    new THREE.MeshBasicMaterial({
      map: radialTexture(0.12, "rgba(255,180,110,0.32)"),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    })
  );
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = 0.03;
  g.add(pool);
  return { group: g, glow, pool };
}

export function buildCar() {
  const g = new THREE.Group();
  const accent = Math.random() < 0.5 ? 0xc08a68 : (Math.random() < 0.5 ? 0xd2a878 : 0x6b5a42);
  const paint = new THREE.MeshStandardMaterial({ color: accent, roughness: 0.45, metalness: 0.35 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x3a2f22, roughness: 0.5, metalness: 0.4 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 3.2), paint);
  body.position.y = 0.5;
  body.castShadow = true;
  g.add(body);

  const hood = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.24, 1.0), dark);
  hood.position.set(0, 0.72, 1.15);
  g.add(hood);

  const cabin = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.46, 1.5), dark);
  cabin.position.set(0, 0.95, -0.2);
  cabin.castShadow = true;
  g.add(cabin);

  const glass = new THREE.MeshStandardMaterial({ color: 0x7fa3ad, roughness: 0.15, metalness: 0.6 });
  for (const [x, z] of [[0, -0.95], [0, 0.5]]) {
    const wG = new THREE.Mesh(new THREE.BoxGeometry(1.14, 0.38, 0.05), glass);
    wG.position.set(x, 0.96, z);
    g.add(wG);
  }

  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x2e2418, roughness: 0.9 });
  for (const [x, z] of [[-0.78, 1.05], [0.78, 1.05], [-0.78, -1.05], [0.78, -1.05]]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 14), wheelMat);
    wheel.rotation.x = Math.PI / 2;
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, 0.32, z);
    g.add(wheel);
  }

  const hlMat = new THREE.MeshStandardMaterial({ color: 0xfff2cf, emissive: 0xffe0a0, emissiveIntensity: 0.5 });
  for (const x of [-0.55, 0.55]) {
    const hl = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), hlMat);
    hl.position.set(x, 0.55, 1.6);
    g.add(hl);
  }
  const tlMat = new THREE.MeshStandardMaterial({ color: 0x8a1e16, emissive: 0x8a1e16, emissiveIntensity: 0.3 });
  for (const x of [-0.55, 0.55]) {
    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.1, 0.04), tlMat);
    tl.position.set(x, 0.55, -1.6);
    g.add(tl);
  }

  const cone = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture(0.0, "rgba(255,226,175,0.4)"),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
  }));
  cone.scale.set(3.4, 3.4, 1);
  cone.position.set(0, 0.55, 2.8);
  g.add(cone);

  return { group: g, cone };
}

export function buildBench(pos, side) {
  const g = new THREE.Group();
  g.position.copy(pos);
  g.rotation.y = side > 0 ? Math.PI : 0;
  const wood = new THREE.MeshStandardMaterial({ color: 0x8a6b45, roughness: 0.85 });
  const iron = new THREE.MeshStandardMaterial({ color: 0x4a3a26, roughness: 0.7, metalness: 0.4 });
  const seat = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.42), wood);
  seat.position.y = 0.42;
  g.add(seat);
  const back = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.4), wood);
  back.position.set(0, 0.72, 0.18);
  g.add(back);
  for (const x of [-0.6, 0.6]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.42, 0.5), iron);
    leg.position.set(x, 0.21, 0);
    g.add(leg);
  }
  return g;
}

export function sidewalkTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#d3c096";
  ctx.fillRect(0, 0, 256, 256);
  // joints de dalles
  ctx.strokeStyle = "rgba(122,95,56,0.35)";
  ctx.lineWidth = 2;
  ctx.strokeRect(2, 2, 252, 252);
  for (let x = 64; x < 256; x += 64) {
    ctx.beginPath(); ctx.moveTo(x, 2); ctx.lineTo(x, 254); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(2, x); ctx.lineTo(254, x); ctx.stroke();
  }
  // variation des dalles
  for (let i = 0; i < 900; i++) {
    const l = 180 + Math.random() * 36;
    ctx.fillStyle = `rgba(${l | 0},${(l * 0.9) | 0},${(l * 0.72) | 0},${(Math.random() * 0.16).toFixed(3)})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 3, 1 + Math.random() * 3);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(LOW ? 1 : 2, 90);
  tex.anisotropy = LOW ? 2 : 8;
  return tex;
}

export function buildTree(pos, scale = 1) {
  const g = new THREE.Group();
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6b4a2c, roughness: 0.95, flatShading: true });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.16, 2.6, 7), trunkMat);
  trunk.position.y = 1.3;
  trunk.castShadow = true;
  g.add(trunk);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x55703f, roughness: 1, flatShading: true });
  for (let i = 0; i < 3; i++) {
    const canopy = new THREE.Mesh(new THREE.SphereGeometry(1.05 - i * 0.18, 8, 6), leafMat);
    canopy.position.set((Math.random() - 0.5) * 0.5, 2.6 + i * 0.65, (Math.random() - 0.5) * 0.5);
    canopy.scale.y = 0.85;
    canopy.castShadow = true;
    g.add(canopy);
  }
  g.position.copy(pos);
  g.scale.setScalar(scale);
  return g;
}

export function buildFlowers(pos, scale = 1, seed = 0) {
  const g = new THREE.Group();
  const greens = [0x55703f, 0x647c46];
  const petals = [0xc08a68, 0xcfa574, 0x9db87f, 0xe0c9a0];
  const rng = (n) => {
    const x = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  for (let i = 0; i < 6; i++) {
    const stem = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.02, 0.32, 4),
      new THREE.MeshStandardMaterial({ color: greens[i % 2], roughness: 1 })
    );
    stem.position.set((rng(i) - 0.5) * 0.5, 0.16, (rng(i + 13) - 0.5) * 0.5);
    g.add(stem);
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 5, 4),
      new THREE.MeshStandardMaterial({ color: petals[(i + seed) % petals.length], roughness: 0.9 })
    );
    head.position.set(stem.position.x, 0.34, stem.position.z);
    g.add(head);
  }
  g.position.copy(pos);
  g.scale.setScalar(scale);
  return g;
}

export function buildBin(pos) {
  const g = new THREE.Group();
  g.position.copy(pos);
  const metal = new THREE.MeshStandardMaterial({ color: 0x4a3a26, roughness: 0.6, metalness: 0.5 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.2, 0.72, 10), metal);
  body.position.y = 0.36;
  body.castShadow = true;
  g.add(body);
  const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.27, 0.27, 0.05, 10), metal);
  lid.position.y = 0.75;
  g.add(lid);
  return g;
}

export function buildPigeon() {
  const g = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0x9a8a7a, roughness: 0.95, flatShading: true });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), mat);
  body.scale.set(1, 0.8, 1.4);
  body.position.y = 0.12;
  g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.055, 8, 6), mat);
  head.position.set(0, 0.22, 0.1);
  g.add(head);
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.02, 0.05, 4), mat);
  beak.rotation.x = Math.PI / 2;
  beak.position.set(0, 0.22, 0.16);
  g.add(beak);
  g.rotation.y = Math.random() * Math.PI * 2;
  return g;
}

export function buildContactShadow(pos, w = 4.6, d = 3.2) {
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(w, d),
    new THREE.MeshBasicMaterial({
      map: radialTexture(0.35, "rgba(90,70,42,0.34)"),
      transparent: true, depthWrite: false,
    })
  );
  m.rotation.x = -Math.PI / 2;
  m.position.set(pos.x, 0.02, pos.z);
  return m;
}

export function buildMorrisColumn(pos, angle = 0, posterLines = ["PUBLICITÉ", "URBAINE"]) {
  // Colonne publicitaire classique (style colonne Morris), tons crème/terracotta doux
  const g = new THREE.Group();
  g.position.copy(pos);
  g.rotation.y = angle;
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xeadfc2, roughness: 0.85 });
  const trimMat = new THREE.MeshStandardMaterial({ color: 0xa58f68, roughness: 0.7, metalness: 0.15 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.68, 2.5, 18), bodyMat);
  body.position.y = 1.25;
  body.castShadow = true;
  g.add(body);
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.8, 0.22, 18), trimMat);
  base.position.y = 0.11;
  g.add(base);
  const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.66, 0.72, 0.16, 18), trimMat);
  cap.position.y = 2.58;
  g.add(cap);
  const top = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 8), trimMat);
  top.position.y = 2.75;
  g.add(top);
  // Affiche publicitaire douce
  const sw = 256, sh = 640;
  const c = document.createElement("canvas");
  c.width = sw; c.height = sh;
  const ctx = c.getContext("2d");
  const grad = ctx.createLinearGradient(0, 0, 0, sh);
  grad.addColorStop(0, "#f5ecd6");
  grad.addColorStop(1, "#ead9b4");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, sw, sh);
  ctx.strokeStyle = "rgba(138,111,69,0.5)";
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, sw - 20, sh - 20);
  ctx.fillStyle = "#c08a68";
  ctx.fillRect(0, sh * 0.14, sw, 14);
  ctx.textAlign = "center";
  ctx.fillStyle = "#3a2e1f";
  ctx.font = "700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  posterLines.forEach((ln, i) => ctx.fillText(ln, sw / 2, sh * 0.3 + i * 56));
  ctx.fillStyle = "#8a6a4e";
  ctx.font = "400 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.fillText("DOMAINE PUBLIC", sw / 2, sh * 0.78);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = LOW ? 2 : 8;
  // Affiche légèrement plus étroite que le cylindre : elle épouse la courbure sans flotter sur les bords
  const poster = new THREE.Mesh(
    new THREE.PlaneGeometry(0.92, 2.5),
    new THREE.MeshLambertMaterial({ map: tex })
  );
  poster.position.set(0, 1.25, 0.55);
  g.add(poster);
  return g;
}

export function buildBusShelter(pos, side = 1) {
  // Abribus léger : toit, vitre teintée, affiche publicitaire, banc
  const g = new THREE.Group();
  g.position.copy(pos);
  g.rotation.y = side > 0 ? 0 : Math.PI;
  const metal = new THREE.MeshStandardMaterial({ color: 0x4a3a26, roughness: 0.6, metalness: 0.45 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0xb8a475, roughness: 0.7, metalness: 0.2 });
  for (const x of [-1.7, 1.7]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.3, 0.12), metal);
    post.position.set(x, 1.15, 0.4);
    post.castShadow = true;
    g.add(post);
  }
  const roof = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.1, 1.7), roofMat);
  roof.position.y = 2.4;
  roof.castShadow = true;
  g.add(roof);
  const glass = new THREE.MeshStandardMaterial({ color: 0xa8c4c9, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.35 });
  const backGlass = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 1.5), glass);
  backGlass.position.set(0, 1.5, -0.42);
  g.add(backGlass);
  const sideGlass = new THREE.Mesh(new THREE.PlaneGeometry(1.3, 1.5), glass);
  sideGlass.position.set(1.9, 1.5, 0);
  sideGlass.rotation.y = Math.PI / 2;
  g.add(sideGlass);
  // Affiche publicitaire (côté route)
  const sw = 320, sh = 200;
  const c = document.createElement("canvas");
  c.width = sw; c.height = sh;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#f2e7cd";
  ctx.fillRect(0, 0, sw, sh);
  ctx.fillStyle = "#cfa574";
  ctx.fillRect(0, 0, sw, 40);
  ctx.textAlign = "center";
  ctx.fillStyle = "#3a2e1f";
  ctx.font = "700 30px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.fillText("VOTRE ESPACE PUBLICITAIRE", sw / 2, 105);
  ctx.font = "400 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.fillStyle = "#7a5f38";
  ctx.fillText("MODULE 1 · PANNEAUTIQUE", sw / 2, 150);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = LOW ? 2 : 8;
  const poster = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 1.4),
    new THREE.MeshLambertMaterial({ map: tex })
  );
  poster.position.set(0, 1.45, 0.42);
  g.add(poster);
  // Banc intégré
  const wood = new THREE.MeshStandardMaterial({ color: 0x8a6b45, roughness: 0.85 });
  const seat = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.07, 0.35), wood);
  seat.position.set(0, 0.42, -0.1);
  g.add(seat);
  return g;
}

export function buildCafeTable(pos, parasolColor = 0xc9a87c, rot = 0) {
  // Table de bistrot avec parasol
  const g = new THREE.Group();
  g.position.copy(pos);
  g.rotation.y = rot;
  const iron = new THREE.MeshStandardMaterial({ color: 0x5a4632, roughness: 0.6, metalness: 0.4 });
  const topMat = new THREE.MeshStandardMaterial({ color: 0x8a6b45, roughness: 0.8 });
  const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.75, 8), iron);
  leg.position.y = 0.38;
  g.add(leg);
  const top = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.06, 14), topMat);
  top.position.y = 0.76;
  g.add(top);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 1.5, 8), iron);
  pole.position.y = 1.1;
  g.add(pole);
  const parasol = new THREE.Mesh(
    new THREE.ConeGeometry(1.1, 0.28, 10),
    new THREE.MeshLambertMaterial({ color: parasolColor })
  );
  parasol.position.y = 1.95;
  g.add(parasol);
  for (const [cx, cz] of [[-0.5, 0.5], [0.5, 0.5], [-0.5, -0.5], [0.5, -0.5]]) {
    const chair = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.1, 0.4), topMat);
    chair.position.set(cx, 0.42, cz);
    g.add(chair);
    const leg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.42, 6), iron);
    leg1.position.set(cx, 0.21, cz);
    g.add(leg1);
  }
  // Refs pour le ballant du parasol dans la brise
  g.userData = { parasol };
  return g;
}

export function buildBicycle(pos, rot = 0) {
  // Vélo stationné, couleurs douces
  const g = new THREE.Group();
  g.position.copy(pos);
  g.rotation.y = rot;
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x8a6a4e, roughness: 0.6, metalness: 0.2 });
  const tireMat = new THREE.MeshStandardMaterial({ color: 0x3a2f22, roughness: 0.95 });
  const r = 0.34;
  for (const z of [-0.35, 0.35]) {
    const wheel = new THREE.Mesh(new THREE.TorusGeometry(r, 0.035, 8, 20), tireMat);
    wheel.position.set(0, r, z);
    g.add(wheel);
  }
  const bar = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.03, 0.72), frameMat);
  bar.position.set(0, 0.66, 0);
  g.add(bar);
  const topTube = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.62, 6), frameMat);
  topTube.position.set(0, 0.82, 0);
  topTube.rotation.x = Math.PI / 2;
  g.add(topTube);
  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.34, 6), frameMat);
  stem.position.set(0, 0.98, 0.35);
  g.add(stem);
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.03, 0.08), frameMat);
  seat.position.set(0, 0.84, -0.32);
  g.add(seat);
  return g;
}

export function buildRoadSign(pos, angle = 0, dir = "D" ) {
  // Petit panneau directionnel urbain
  const g = new THREE.Group();
  g.position.copy(pos);
  g.rotation.y = angle;
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x4a3a26, roughness: 0.6, metalness: 0.4 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.05, 1.8, 8), poleMat);
  pole.position.y = 0.9;
  pole.castShadow = true;
  g.add(pole);
  const c = document.createElement("canvas");
  c.width = 128; c.height = 64;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#e3d6b4";
  ctx.fillRect(0, 0, 128, 64);
  ctx.fillStyle = dir === "D" ? "#c08a68" : "#7d9a68";
  ctx.fillRect(0, 0, 26, 64);
  ctx.strokeStyle = "rgba(138,111,69,0.6)";
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, 124, 60);
  ctx.textAlign = "center";
  ctx.fillStyle = "#3a2e1f";
  ctx.font = "700 26px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.fillText(dir, 76, 42);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = LOW ? 2 : 8;
  const plate = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 0.35),
    new THREE.MeshLambertMaterial({ map: tex })
  );
  plate.position.y = 1.9;
  g.add(plate);
  return g;
}

export function buildHedge(pos, w = 1.8, h = 0.6) {
  // Haie taillée douce
  const g = new THREE.Group();
  g.position.copy(pos);
  const mat = new THREE.MeshStandardMaterial({ color: 0x5f7a4a, roughness: 1, flatShading: true });
  const base = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.5), mat);
  base.position.y = h / 2;
  base.castShadow = true;
  g.add(base);
  const n = Math.max(2, Math.round(w / 0.7));
  for (let i = 0; i < n; i++) {
    const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.3, 1), mat);
    b.position.set(-w / 2 + 0.3 + i * (w - 0.6) / (n - 1), h + 0.18, 0);
    g.add(b);
  }
  return g;
}

export function buildPerson() {
  // Passant stylisé (jambes animables séparément)
  const g = new THREE.Group();
  const skin = new THREE.MeshStandardMaterial({ color: 0xd9b08c, roughness: 0.9 });
  const shirtColors = [0xc9a87c, 0x8faa7d, 0xcfa574, 0xa8a4c8, 0x9db8bf, 0xd2a678];
  const shirt = new THREE.MeshStandardMaterial({
    color: shirtColors[(Math.random() * shirtColors.length) | 0],
    roughness: 0.85,
  });
  const pants = new THREE.MeshStandardMaterial({ color: 0x5c4a3a, roughness: 0.9 });
  // Tête
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.13, 10, 8), skin);
  head.position.y = 1.62;
  g.add(head);
  // Torse
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.5, 0.2), shirt);
  torso.position.y = 1.2;
  torso.castShadow = true;
  g.add(torso);
  // Jambes animables
  const legGeo = new THREE.BoxGeometry(0.12, 0.55, 0.14);
  const legL = new THREE.Mesh(legGeo, pants);
  legL.position.set(-0.09, 0.55, 0);
  const legR = new THREE.Mesh(legGeo, pants);
  legR.position.set(0.09, 0.55, 0);
  g.add(legL, legR);
  const arms = new THREE.Group();
  const armGeo = new THREE.BoxGeometry(0.07, 0.42, 0.07);
  const armL = new THREE.Mesh(armGeo, shirt);
  armL.position.set(-0.24, 1.05, 0);
  const armR = new THREE.Mesh(armGeo, shirt);
  armR.position.set(0.24, 1.05, 0);
  arms.add(armL, armR);
  g.add(arms);
  return { g, legL, legR, arms, phase: Math.random() * Math.PI * 2 };
}

export function buildFountain() {
  // Fontaine de place : bassin rond, jet central, eau claire
  const g = new THREE.Group();
  const stone = new THREE.MeshStandardMaterial({ color: 0xc9b891, roughness: 0.9 });
  const stoneDark = new THREE.MeshStandardMaterial({ color: 0xa8966c, roughness: 0.9 });
  const water = new THREE.MeshStandardMaterial({
    color: 0xa8c4c9,
    roughness: 0.1,
    metalness: 0.2,
    transparent: true,
    opacity: 0.75,
  });
  const basin = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.9, 0.5, 20), stone);
  basin.position.y = 0.25;
  basin.castShadow = true;
  g.add(basin);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(1.8, 0.14, 8, 24), stoneDark);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.5;
  g.add(rim);
  const pool = new THREE.Mesh(new THREE.CircleGeometry(1.62, 20), water);
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = 0.31;
  g.add(pool);
  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.22, 0.8, 10), stoneDark);
  column.position.y = 0.9;
  g.add(column);
  const dish = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.35, 0.14, 12), stoneDark);
  dish.position.y = 1.25;
  g.add(dish);
  const jet = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.55, 8), water);
  jet.position.y = 1.6;
  g.add(jet);
  // Refs pour l'animation de l'eau (jet pulsant, surface qui tourne)
  g.userData = { jet, pool, dish };
  return g;
}

export function buildBillboard(pos, angle = 0, lines = ["ESPACE", "PUBLICITAIRE"]) {
  // Grand panneau publicitaire 4x3, le long de la route
  const g = new THREE.Group();
  g.position.copy(pos);
  g.rotation.y = angle;
  const postMat = new THREE.MeshStandardMaterial({ color: 0x6b5a42, roughness: 0.7, metalness: 0.2 });
  const backMat = new THREE.MeshStandardMaterial({ color: 0xe8dcc0, roughness: 0.85 });
  for (const x of [-2.6, 2.6]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.22, 3.4, 0.22), postMat);
    post.position.set(x, 1.7, 0);
    post.castShadow = true;
    g.add(post);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.12, 0.6), postMat);
    foot.position.set(x, 0.06, 0);
    g.add(foot);
  }
  const board = new THREE.Mesh(new THREE.BoxGeometry(5.6, 3.1, 0.14), backMat);
  board.position.y = 3.6;
  board.castShadow = true;
  g.add(board);
  // Affiche douce
  const cw = LOW ? 320 : 640;
  const ch = LOW ? 180 : 360;
  const c = document.createElement("canvas");
  c.width = cw; c.height = ch;
  const ctx = c.getContext("2d");
  const grad = ctx.createLinearGradient(0, 0, 0, ch);
  grad.addColorStop(0, "#f3e8cd");
  grad.addColorStop(1, "#e6d3a9");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, cw, ch);
  ctx.fillStyle = "#c08a68";
  ctx.fillRect(0, 0, cw, ch * 0.22);
  ctx.textAlign = "center";
  ctx.fillStyle = "#3a2e1f";
  ctx.font = "700 " + (ch * 0.11) + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  lines.forEach((ln, i) => ctx.fillText(ln, cw / 2, ch * 0.42 + i * (ch * 0.16)));
  ctx.fillStyle = "#7a5f38";
  ctx.font = "400 " + (ch * 0.06) + "px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.fillText("PANNEAUTIQUE · DOMAINE PUBLIC", cw / 2, ch * 0.86);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = LOW ? 2 : 8;
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(5.3, 2.8),
    new THREE.MeshLambertMaterial({ map: tex })
  );
  face.position.set(0, 3.6, 0.09);
  g.add(face);
  return g;
}

export function buildKiosk(pos, angle = 0) {
  // Petit kiosque de presse au bord de la rue
  const g = new THREE.Group();
  g.position.copy(pos);
  g.rotation.y = angle;
  const wood = new THREE.MeshStandardMaterial({ color: 0x8a6b45, roughness: 0.85 });
  const metal = new THREE.MeshStandardMaterial({ color: 0x5c4a30, roughness: 0.5, metalness: 0.4 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(1.9, 2.2, 1.5), wood);
  body.position.y = 1.1;
  body.castShadow = true;
  g.add(body);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.14, 2.0), metal);
  roof.position.y = 2.27;
  g.add(roof);
  // Petit drapeau qui flotte au vent (animation, loin des panneaux de lecture)
  const flag = new THREE.Mesh(
    new THREE.PlaneGeometry(0.34, 0.2),
    new THREE.MeshLambertMaterial({ color: 0xcfa574, side: THREE.DoubleSide })
  );
  flag.position.set(1.05, 2.42, 0.55);
  flag.rotation.y = Math.PI / 2;
  g.add(flag);
  // Comptoir / vitrine
  const counter = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.5, 0.25), metal);
  counter.position.set(0, 0.9, 0.82);
  g.add(counter);
  const canopy = new THREE.Mesh(
    new THREE.BoxGeometry(2.2, 0.06, 0.7),
    new THREE.MeshStandardMaterial({ color: 0xc08a68, roughness: 0.9 })
  );
  canopy.position.set(0, 1.65, 0.85);
  g.add(canopy);
  // Petite affiche
  const c = document.createElement("canvas");
  c.width = 128; c.height = 96;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#f2e7cd";
  ctx.fillRect(0, 0, 128, 96);
  ctx.strokeStyle = "rgba(138,111,69,0.6)";
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 120, 88);
  ctx.textAlign = "center";
  ctx.fillStyle = "#3a2e1f";
  ctx.font = "700 20px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.fillText("LE QUOTIDIEN", 64, 40);
  ctx.font = "400 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.fillStyle = "#7a5f38";
  ctx.fillText("0,50 €", 64, 66);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = LOW ? 2 : 8;
  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 0.5),
    new THREE.MeshLambertMaterial({ map: tex })
  );
  sign.position.set(0, 1.35, 0.82);
  g.add(sign);
  g.userData = { flag };
  return g;
}

export function buildLeaf() {
  // Feuille portée par le vent (animation ambiante, aucun impact sur la lecture)
  const colors = [0x8faa7d, 0x6b8353, 0xc9a87c, 0xd2a678];
  const g = new THREE.Group();
  const leaf = new THREE.Mesh(
    new THREE.PlaneGeometry(0.16, 0.1),
    new THREE.MeshLambertMaterial({
      color: colors[(Math.random() * colors.length) | 0],
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.72,
    })
  );
  g.add(leaf);
  return g;
}
