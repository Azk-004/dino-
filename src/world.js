import * as THREE from "three";

export const PAL = {
  skyTop: 0x1d1410,
  skyMid: 0x4a3220,
  skyHorizon: 0xb0703f,
  sun: 0xe8a35c,
  ground: 0xa5885e,
  groundDark: 0x8a6f4a,
  path: 0x7c5f3a,
  pathEdge: 0xb08a52,
  walnut: 0x241a12,
  walnutDark: 0x150f0a,
  bronze: 0x8a6a3d,
  ivory: 0xf2e8d4,
  ivoryDim: 0xcfbe9f,
  terracotta: 0xc1683f,
  amber: 0xe8a35c,
  city: 0x151009,
  hill: 0x1a130b,
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
  ctx.fillStyle = "#8a6f4a";
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 2600; i++) {
    const l = 105 + Math.random() * 45;
    ctx.fillStyle = `rgba(${l | 0},${(l * 0.78) | 0},${(l * 0.46) | 0},${(Math.random() * 0.22).toFixed(3)})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 2 + Math.random() * 4, 2 + Math.random() * 4);
  }
  for (let i = 0; i < 150; i++) {
    ctx.fillStyle = "rgba(30,22,14," + (0.2 + Math.random() * 0.3).toFixed(3) + ")";
    ctx.beginPath();
    ctx.arc(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2, 0, Math.PI * 2);
    ctx.fill();
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(90, 90);
  tex.anisotropy = 8;
  return tex;
}

export function asphaltTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#7c5f3a";
  ctx.fillRect(0, 0, 256, 256);
  for (let i = 0; i < 3200; i++) {
    ctx.fillStyle = `rgba(0,0,0,${(Math.random() * 0.18).toFixed(3)})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 3, 1 + Math.random() * 3);
  }
  for (let i = 0; i < 500; i++) {
    ctx.fillStyle = `rgba(180,150,110,${(Math.random() * 0.12).toFixed(3)})`;
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
  tex.anisotropy = 8;
  return tex;
}

export function buildRibbon(curve, width, color, tex) {
  const samples = 500;
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

  const edgeMat = new THREE.MeshStandardMaterial({ color: PAL.bronze, roughness: 0.55, metalness: 0.35 });
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
  const baseMat = new THREE.MeshStandardMaterial({ color: PAL.bronze, roughness: 0.6, metalness: 0.4 });
  for (const sx of [-2.5, 2.5]) {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.8, 0.32), postMat);
    post.position.set(sx, 0.4, 0);
    post.castShadow = true;
    group.add(post);
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.14, 0.7), baseMat);
    base.position.set(sx, 0.07, 0);
    group.add(base);
  }

  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 768;
  drawPanelCanvas(canvas.getContext("2d"), st, index);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;

  const frontMat = new THREE.MeshStandardMaterial({
    map: tex,
    emissiveMap: tex,
    emissive: PAL.ivory,
    emissiveIntensity: 0.24,
    roughness: 0.82,
    metalness: 0.02,
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

  const light = new THREE.PointLight(0xe8a35c, 0, 26, 2);
  light.position.set(0, 3.3, 2.4);
  group.add(light);

  const beaconMat = new THREE.MeshStandardMaterial({
    color: PAL.amber,
    emissive: PAL.amber,
    emissiveIntensity: 1.2,
  });
  const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), beaconMat);
  beacon.position.set(0, 5.52, 0);
  group.add(beacon);

  return { group, frontMat, light, beaconMat, front };
}

function drawPanelCanvas(ctx, st, index) {
  const w = 1024, h = 768;
  const grad = ctx.createLinearGradient(0, 0, 0, h);
  grad.addColorStop(0, "#2a1f14");
  grad.addColorStop(1, "#160f09");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  ctx.globalAlpha = 0.06;
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? "#000000" : "#ffffff";
    ctx.fillRect(Math.random() * w, Math.random() * h, 2, 2);
  }
  ctx.globalAlpha = 1;

  ctx.strokeStyle = "rgba(242,232,212,0.28)";
  ctx.lineWidth = 3;
  ctx.strokeRect(34, 34, w - 68, h - 68);

  ctx.fillStyle = "#c1683f";
  for (const [cx, cy, dirx, diry] of [
    [34, 34, 1, 1], [w - 34, 34, -1, 1], [34, h - 34, 1, -1], [w - 34, h - 34, -1, -1],
  ]) {
    ctx.fillRect(cx + dirx * 8, cy + diry * 8, 26 * dirx, 4 * diry);
    ctx.fillRect(cx + dirx * 8, cy + diry * 8, 4 * dirx, 26 * diry);
  }

  ctx.fillStyle = "#cfbe9f";
  ctx.font = "500 26px 'Avenir Next', 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.letterSpacing = "6px";
  ctx.fillText(st.kicker.toUpperCase(), 70, 96);
  ctx.letterSpacing = "0px";

  ctx.fillStyle = "rgba(232,163,92,0.18)";
  ctx.font = "600 300px 'Didot', Georgia, serif";
  ctx.textAlign = "right";
  ctx.fillText(st.num, w - 60, 360);

  ctx.fillStyle = "#c1683f";
  ctx.fillRect(70, 132, 90, 4);

  ctx.fillStyle = "#f2e8d4";
  ctx.font = "600 62px 'Didot', Georgia, serif";
  ctx.textAlign = "left";
  const titleLines = wrapText(ctx, st.title, 860);
  let y = 210;
  titleLines.slice(0, 4).forEach((ln) => { ctx.fillText(ln, 70, y); y += 70; });
  y += 18;

  if (st.id !== "quiz" && st.bullets.length) {
    ctx.fillStyle = "rgba(242,232,212,0.55)";
    ctx.fillRect(70, y - 6, 60, 2);
    y += 26;
    ctx.font = "400 30px 'Avenir Next', 'Helvetica Neue', Arial, sans-serif";
    const bulletLines = [];
    st.bullets.slice(0, 4).forEach((b) => bulletLines.push(...wrapText(ctx, b, 840)));
    bulletLines.slice(0, 5).forEach((ln) => {
      ctx.fillStyle = "#c1683f";
      ctx.beginPath();
      ctx.arc(78, y - 10, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#cfbe9f";
      ctx.fillText(ln, 100, y);
      y += 40;
    });
  }

  ctx.fillStyle = "rgba(242,232,212,0.4)";
  ctx.font = "400 22px 'Avenir Next', 'Helvetica Neue', Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.letterSpacing = "3px";
  ctx.fillText("MODULE 1 · DOMAINE PUBLIC", 70, h - 62);
  ctx.fillStyle = "rgba(232,163,92,0.85)";
  ctx.textAlign = "right";
  ctx.fillText(String(index + 1).padStart(2, "0") + " / 13", w - 70, h - 62);
  ctx.letterSpacing = "0px";

  const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.3, w / 2, h / 2, w * 0.62);
  vig.addColorStop(0, "rgba(255,220,170,0.1)");
  vig.addColorStop(0.6, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(0,0,0,0.42)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, w, h);
}

export function buildBuilding(w, h, d, z, lateral) {
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 128;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#151009";
  ctx.fillRect(0, 0, 64, 128);
  const seed = Math.random();
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 4; col++) {
      const r = Math.random();
      if (r < 0.32) {
        ctx.fillStyle = Math.random() < 0.3 ? "#c1683f" : "#e8a35c";
        ctx.globalAlpha = 0.5 + Math.random() * 0.5;
        ctx.fillRect(4 + col * 14 + Math.random() * 4, 6 + row * 13 + Math.random() * 3, 5, 7);
        ctx.globalAlpha = 1;
      } else if (r < 0.4) {
        ctx.fillStyle = "#f2e8d4";
        ctx.globalAlpha = 0.25;
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

  const mat = new THREE.MeshStandardMaterial({
    map: tex,
    emissiveMap: tex,
    emissive: new THREE.Color(seed > 0.5 ? 0xffd9a0 : 0xffb870),
    emissiveIntensity: 0.85,
    roughness: 0.9,
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
  const lampMat = new THREE.MeshStandardMaterial({ color: PAL.amber, emissive: PAL.amber, emissiveIntensity: 0.9 });
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
  const mat = new THREE.MeshStandardMaterial({ color: 0x6b5638, roughness: 0.95, flatShading: true });
  const m = new THREE.Mesh(new THREE.DodecahedronGeometry(size, 0), mat);
  m.position.set(pos.x, size * 0.4, pos.z);
  m.rotation.set(Math.random(), Math.random() * Math.PI, Math.random());
  return m;
}

export function buildDust() {
  const count = 420;
  const positions = new Float32Array(count * 3);
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
  for (let i = 0; i < count; i++) {
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
    color: 0x1a120a,
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
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6b4a2c, roughness: 0.95, flatShading: true });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.18, 3.2, 6), trunkMat);
  trunk.position.y = 1.6;
  trunk.rotation.z = (Math.random() - 0.5) * 0.22;
  trunk.castShadow = true;
  g.add(trunk);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x2f4a2c, roughness: 1, flatShading: true });
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
  const mat = new THREE.MeshStandardMaterial({ color: 0x37502e, roughness: 1, flatShading: true });
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
    color: 0x4a3a28,
    roughness: 1,
    flatShading: true,
    transparent: true,
    opacity: 0.8,
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

  const c = document.createElement("canvas");
  c.width = 512;
  c.height = 320;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#241a12";
  ctx.fillRect(0, 0, 512, 320);
  ctx.strokeStyle = "rgba(232,163,92,0.65)";
  ctx.lineWidth = 8;
  ctx.strokeRect(12, 12, 488, 296);
  const grad = ctx.createLinearGradient(0, 0, 512, 0);
  grad.addColorStop(0, "#c1683f");
  grad.addColorStop(1, "#e8a35c");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 52, 512, 10);
  ctx.textAlign = "center";
  ctx.fillStyle = "#f2e8d4";
  ctx.font = "700 42px 'Avenir Next', 'Helvetica Neue', Arial, sans-serif";
  lines.forEach((ln, i) => ctx.fillText(ln, 256, 122 + i * 50));
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  const plateMat = new THREE.MeshStandardMaterial({
    map: tex,
    emissiveMap: tex,
    emissive: new THREE.Color(0x8a6a3d),
    emissiveIntensity: 0.35,
    roughness: 0.75,
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
    map: radialTexture(0.0, "rgba(255,190,120,0.75)"),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
  }));
  glow.scale.setScalar(3.6);
  glow.position.set(side * 1.7, 5.5, 0);
  g.add(glow);
  const pool = new THREE.Mesh(
    new THREE.CircleGeometry(3.8, 24),
    new THREE.MeshBasicMaterial({
      map: radialTexture(0.12, "rgba(255,180,110,0.85)"),
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
  const accent = Math.random() < 0.5 ? 0xc1683f : (Math.random() < 0.5 ? 0xe8a35c : 0x5a4632);
  const paint = new THREE.MeshStandardMaterial({ color: accent, roughness: 0.3, metalness: 0.55 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1c1510, roughness: 0.5, metalness: 0.4 });

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

  const glass = new THREE.MeshStandardMaterial({ color: 0x16242f, roughness: 0.15, metalness: 0.6 });
  for (const [x, z] of [[0, -0.95], [0, 0.5]]) {
    const wG = new THREE.Mesh(new THREE.BoxGeometry(1.14, 0.38, 0.05), glass);
    wG.position.set(x, 0.96, z);
    g.add(wG);
  }

  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0d0a07, roughness: 0.9 });
  for (const [x, z] of [[-0.78, 1.05], [0.78, 1.05], [-0.78, -1.05], [0.78, -1.05]]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.22, 14), wheelMat);
    wheel.rotation.x = Math.PI / 2;
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, 0.32, z);
    g.add(wheel);
  }

  const hlMat = new THREE.MeshStandardMaterial({ color: 0xfff2cf, emissive: 0xffe0a0, emissiveIntensity: 2.2 });
  for (const x of [-0.55, 0.55]) {
    const hl = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 8), hlMat);
    hl.position.set(x, 0.55, 1.6);
    g.add(hl);
  }
  const tlMat = new THREE.MeshStandardMaterial({ color: 0x8a1e16, emissive: 0x8a1e16, emissiveIntensity: 1.2 });
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
  const wood = new THREE.MeshStandardMaterial({ color: 0x6b4a2c, roughness: 0.85 });
  const iron = new THREE.MeshStandardMaterial({ color: 0x241a12, roughness: 0.7, metalness: 0.4 });
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
