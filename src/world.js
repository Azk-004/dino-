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
  skyTop: 0xe3d2b2,
  skyMid: 0xece0c2,
  skyHorizon: 0xf5ecd6,
  sun: 0xe9b96b,
  ground: 0xd2bd8d,
  groundDark: 0xbfa678,
  walnut: 0x5a4a36,
  walnutDark: 0x42352a,
  bronze: 0x9a8157,
  ivory: 0xfdf8ec,
  ivoryDim: 0xefe2c9,
  terracotta: 0xc08a68,
  amber: 0xcfa574,
  city: 0xd5c49f,
  hill: 0xc2b28d,
  // Route en vrai bitume : blanc pur = laisse la texture d'asphalte s'exprimer
  path: 0xffffff,
  // Lignes de rive : blanc cassé chaud
  pathEdge: 0xf0ece0,
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

// Titre auto-ajusté : réduit la graisse jusqu'à tenir dans `maxLines`, pour que
// jamais un long titre ne soit tronqué sur le panneau, quel que soit l'écran.
function fitTitle(ctx, text, maxW, startSize, minSize, maxLines) {
  let size = startSize;
  ctx.font = `600 ${size}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`;
  let lines = wrapText(ctx, text, maxW);
  while (lines.length > maxLines && size > minSize) {
    size -= 4;
    ctx.font = `600 ${size}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`;
    lines = wrapText(ctx, text, maxW);
  }
  return { lines, size };
}

export function groundTexture() {
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#cdb98c";
  ctx.fillRect(0, 0, 256, 256);
  // Variations tonales douces à grande échelle (le sol n'est pas une plage de bruit)
  for (let i = 0; i < 26; i++) {
    const l = 172 + Math.random() * 34;
    ctx.fillStyle = `rgba(${l | 0},${(l * 0.93) | 0},${(l * 0.74) | 0},${(0.05 + Math.random() * 0.1).toFixed(3)})`;
    ctx.beginPath();
    ctx.ellipse(Math.random() * 256, Math.random() * 256, 14 + Math.random() * 30, 10 + Math.random() * 22, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  for (let i = 0; i < 2200; i++) {
    const l = 168 + Math.random() * 42;
    ctx.fillStyle = `rgba(${l | 0},${(l * 0.92) | 0},${(l * 0.72) | 0},${(Math.random() * 0.16).toFixed(3)})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 2 + Math.random() * 4, 2 + Math.random() * 4);
  }
  for (let i = 0; i < 120; i++) {
    ctx.fillStyle = "rgba(110,86,52," + (0.12 + Math.random() * 0.2).toFixed(3) + ")";
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
  // Bitume noir assorti au thème : gris charbon chaud, granulat fin, bandes de roulement et usure
  const c = document.createElement("canvas");
  c.width = 256;
  c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#212429";
  ctx.fillRect(0, 0, 256, 256);
  // Granulat sombre (pierre fine)
  for (let i = 0; i < 4600; i++) {
    const l = 26 + Math.random() * 40;
    ctx.fillStyle = `rgba(${l | 0},${(l * 0.98) | 0},${(l * 1.04) | 0},${(Math.random() * 0.28).toFixed(3)})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
  // Micro-points clairs discrets (usure du revêtement)
  for (let i = 0; i < 700; i++) {
    ctx.fillStyle = `rgba(118,124,134,${(Math.random() * 0.1).toFixed(3)})`;
    ctx.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2, 1 + Math.random() * 2);
  }
  // Bandes de roulement plus sombres (traces de pneus), une par voie
  for (const bx of [42, 178]) {
    const g = ctx.createLinearGradient(bx, 0, bx + 34, 256);
    g.addColorStop(0, "rgba(8,10,12,0)");
    g.addColorStop(0.5, "rgba(8,10,12,0.5)");
    g.addColorStop(1, "rgba(8,10,12,0)");
    ctx.fillStyle = g;
    ctx.fillRect(bx, 0, 34, 256);
  }
  // Joint de revêtement au centre
  ctx.fillStyle = "rgba(6,8,11,0.38)";
  ctx.fillRect(127, 0, 2, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1, 60);
  tex.anisotropy = LOW ? 2 : 8;
  return tex;
}

export function buildRibbon(curve, width, color, tex, samples = 500, basic = false) {
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

  // DoubleSide : le winding des triangles est inversé (faces vers le bas) — sans ça,
  // la route / les trottoirs / les lignes étaient invisibles vus d'en haut (sol nu beige).
  const mesh = new THREE.Mesh(
    geo,
    basic
      ? new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide })
      : new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0.02, map: tex || null, side: THREE.DoubleSide })
  );
  mesh.receiveShadow = true;
  return mesh;
}

export function buildPanel(st, curve, t, side, index) {
  const group = new THREE.Group();
  const p = curve.getPointAt(t);
  const tg = curve.getTangentAt(t);
  const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
  // Espacement régulier le long de la route : panneaux bien décalés sur le côté
  // (hors de la chaussée et du trottoir) — l'animation et la route restent au centre.
  const lateral = perp.clone().multiplyScalar(side * 7.4);
  const zJitter = (index % 3) - 1;
  group.position.set(p.x + lateral.x + zJitter * 0.5, 0, p.z + lateral.z + zJitter * 0.5);

  const approach = curve.getPointAt(Math.max(0, t - 0.035));
  const dir = new THREE.Vector3().subVectors(approach, group.position).normalize();
  const restRot = Math.atan2(dir.x, dir.z);
  group.rotation.y = restRot;

  const frameMat = new THREE.MeshStandardMaterial({ color: PAL.walnut, roughness: 0.8, metalness: 0.05 });
  // La nuit, le cadre s'éclaire très légèrement pour que la silhouette du panneau reste visible
  // (ton bleu nuit : il se fond dans l'ambiance au lieu de ressortir en brun chaud)
  frameMat.emissive = new THREE.Color(0x3a3f4d);
  frameMat.emissiveIntensity = 0;
  const frame = new THREE.Mesh(new THREE.BoxGeometry(6.6, 4.4, 0.22), frameMat);
  frame.position.y = 3.0;
  frame.castShadow = false;
  group.add(frame);

  // Socle en pierre (ancrage réaliste du panneau au sol)
  const plinthMat = new THREE.MeshStandardMaterial({ color: 0xb7a47e, roughness: 0.92 });
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(5.6, 0.4, 0.8), plinthMat);
  plinth.position.y = 0.2;
  plinth.castShadow = false;
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
    post.castShadow = false;
    group.add(post);
  }

  // Ratio 6.2/4.0 = 1.55 : le canvas doit avoir exactement le même ratio que la face 3D,
  // sinon le texte est étiré horizontalement (~16% avant ce correctif).
  const cw = LOW ? 768 : 1280;
  const ch = Math.round(cw * (660 / 1024)); // 495 / 825 — même ratio que la face (1.55)
  const dayTex = makePanelTex(st, index, cw, ch, false);
  const nightTex = makePanelTex(st, index, cw, ch, true);

  // Face en matériau diffus pur (Lambert) : aucune réflexion spéculaire, aucun reflet solaire — lecture parfaite.
  // Le jour : texture parchemin clair + encre sombre (émissive éteinte).
  // La nuit : la scène bascule sur la texture « enseigne » (fond sombre + texte clair lumineux) et monte
  // l'émissive chaude : le texte brille, la face reste sombre — jamais blanche, toujours lisible.
  const frontMat = new THREE.MeshLambertMaterial({
    map: dayTex,
    // Parchemin mat, nettement assombri : le soleil du matin (intensité 2.2) ne
    // « cramé » plus la face. La nuit repose sur l'émissif (indépendant du color).
    color: 0x948d74,
  });
  frontMat.emissive = new THREE.Color(0xf0cf90);
  frontMat.emissiveIntensity = 0;
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

  return { group, frontMat, light, beaconMat, front, restRot, frameMat, dayTex, nightTex };
}

function makePanelTex(st, index, cw, ch, night) {
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  try {
    drawPanelCanvas(canvas.getContext("2d"), st, index, cw, ch, night);
  } catch (err) {
    console.error("[panelTex]", index, night, err && err.stack ? err.stack : err);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = LOW ? 2 : 8;
  return tex;
}

function drawPanelCanvas(ctx, st, index, cw = 1024, ch = 660, night = false) {
  // Espace de conception 1024×660 = ratio 1.55 = ratio de la face 3D (6.2×4.0) :
  // le texte n'est plus étiré horizontalement sur aucun écran.
  ctx.scale(cw / 1024, ch / 660);
  // Tout le dessin utilise l'espace de conception constant : plus aucun élément
  // (filets, pagination, vignette) n'est coupé ou n'arrive à mi-chemin, quel que soit cw/ch.
  const DW = 1024, DH = 660;

  // ---- Version nuit : enseigne rétroéclairée (fond bleu profond, texte ivoire lumineux) ----
  if (night) {
    const grad = ctx.createLinearGradient(0, 0, 0, DH);
    grad.addColorStop(0, "#2c3347");
    grad.addColorStop(0.55, "#252c3d");
    grad.addColorStop(1, "#1a2130");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, DW, DH);
    const halo = ctx.createRadialGradient(DW / 2, DH * 0.42, 40, DW / 2, DH * 0.42, DW * 0.55);
    halo.addColorStop(0, "rgba(140,160,210,0.10)");
    halo.addColorStop(1, "rgba(140,160,210,0)");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, DW, DH);

    // Filets discrets
    ctx.strokeStyle = "rgba(150,165,200,0.22)";
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, DW - 60, DH - 60);
    ctx.strokeStyle = "rgba(150,165,200,0.14)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(45, 45, DW - 90, DH - 90);

    // Bandeau supérieur
    ctx.fillStyle = "rgba(210,170,110,0.16)";
    ctx.fillRect(64, 48, DW - 128, 46);
    ctx.fillStyle = "rgba(220,180,120,0.4)";
    ctx.fillRect(64, 92, DW - 128, 2);

    ctx.fillStyle = "#d8c9a3";
    ctx.font = "500 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.letterSpacing = "5px";
    ctx.fillText(st.kicker.toUpperCase(), 64, 78);
    ctx.letterSpacing = "0px";

    // Numéro en filigrane
    ctx.fillStyle = "rgba(220,205,170,0.10)";
    ctx.font = "600 220px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(st.num, DW - 56, 270);
    ctx.fillStyle = "rgba(220,180,120,0.35)";
    ctx.font = "600 40px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
    ctx.fillText(st.num, DW - 56, 298);

    ctx.fillStyle = "#c9a25f";
    ctx.fillRect(64, 108, 90, 4);

    // Titre lumineux (halo chaud derrière = effet enseigne)
    ctx.save();
    ctx.shadowColor = "rgba(255,205,120,0.55)";
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#f6e7c0";
    ctx.textAlign = "left";
    const fit = fitTitle(ctx, st.title, 850, 56, 38, 4);
    let y = 176;
    const tStep = Math.round(fit.size * 1.1);
    fit.lines.forEach((ln) => { ctx.fillText(ln, 64, y); y += tStep; });
    ctx.restore();
    ctx.textAlign = "left";
    y += 14;

    if (st.id !== "quiz" && st.bullets.length) {
      ctx.fillStyle = "rgba(200,170,120,0.35)";
      ctx.fillRect(64, y - 4, 60, 2);
      y += 22;
      const footerTop = DH - 104;
      let bSize = 26;
      const wrapBullets = (size) => {
        ctx.font = `400 ${size}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`;
        const bl = [];
        st.bullets.forEach((b) => bl.push(...wrapText(ctx, b, 830)));
        return bl;
      };
      let bulletLines = wrapBullets(bSize);
      while (bulletLines.length * Math.round(bSize * 1.38) > footerTop - y && bSize > 19) {
        bSize -= 1;
        bulletLines = wrapBullets(bSize);
      }
      const bStep = Math.round(bSize * 1.38);
      bulletLines.forEach((ln) => {
        ctx.fillStyle = "#c9a25f";
        ctx.beginPath();
        ctx.arc(74, y - 9, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.save();
        ctx.shadowColor = "rgba(255,205,120,0.4)";
        ctx.shadowBlur = 8;
        ctx.fillStyle = "#e8dab4";
        ctx.fillText(ln, 98, y);
        ctx.restore();
        y += bStep;
      });
    }

    // Bandeau de pied
    ctx.fillStyle = "rgba(200,170,120,0.25)";
    ctx.fillRect(64, DH - 90, DW - 128, 2);
    ctx.fillStyle = "rgba(200,190,215,0.55)";
    ctx.font = "400 19px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
    ctx.textAlign = "left";
    ctx.letterSpacing = "3px";
    ctx.fillText("MODULE 1 · DOMAINE PUBLIC", 64, DH - 60);
    ctx.fillStyle = "rgba(210,170,110,0.6)";
    ctx.textAlign = "right";
    ctx.fillText(String(index + 1).padStart(2, "0") + " / " + String(13).padStart(2, "0"), DW - 64, DH - 60);
    ctx.letterSpacing = "0px";
    return;
  }

  // Fond « parchemin beige » raffiné : dégradé doux + halo central chaleureux
  const grad = ctx.createLinearGradient(0, 0, 0, DH);
  grad.addColorStop(0, "#fdf8ec");
  grad.addColorStop(0.55, "#f7eed7");
  grad.addColorStop(1, "#efe1c2");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, DW, DH);
  const halo = ctx.createRadialGradient(DW / 2, DH * 0.42, 40, DW / 2, DH * 0.42, DW * 0.55);
  halo.addColorStop(0, "rgba(255,244,216,0.55)");
  halo.addColorStop(1, "rgba(255,244,216,0)");
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, DW, DH);

  // Grain de papier très léger
  ctx.globalAlpha = 0.05;
  for (let i = 0; i < 900; i++) {
    ctx.fillStyle = Math.random() > 0.5 ? "#7a5f38" : "#ffffff";
    ctx.fillRect(Math.random() * DW, Math.random() * DH, 2, 2);
  }
  ctx.globalAlpha = 1;

  // Filet doré extérieur + double cadre intérieur
  ctx.strokeStyle = "rgba(122,95,56,0.28)";
  ctx.lineWidth = 3;
  ctx.strokeRect(30, 30, DW - 60, DH - 60);
  ctx.strokeStyle = "rgba(192,138,104,0.22)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(45, 45, DW - 90, DH - 90);

  // Coins façon « repère de dossier »
  ctx.fillStyle = "#c08a68";
  for (const [cx, cy, dirx, diry] of [
    [30, 30, 1, 1], [DW - 30, 30, -1, 1], [30, DH - 30, 1, -1], [DW - 30, DH - 30, -1, -1],
  ]) {
    ctx.fillRect(cx + dirx * 8, cy + diry * 8, 26 * dirx, 4 * diry);
    ctx.fillRect(cx + dirx * 8, cy + diry * 8, 4 * dirx, 26 * diry);
  }

  // Bandeau supérieur terracotta avec filet doré
  ctx.fillStyle = "rgba(192,138,104,0.14)";
  ctx.fillRect(64, 48, DW - 128, 46);
  ctx.fillStyle = "rgba(207,165,116,0.55)";
  ctx.fillRect(64, 92, DW - 128, 2);

  ctx.fillStyle = "#8a6a4e";
  ctx.font = "500 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.letterSpacing = "5px";
  ctx.fillText(st.kicker.toUpperCase(), 64, 78);
  ctx.letterSpacing = "0px";

  // Numéro en filigrane, plus élégant
  ctx.fillStyle = "rgba(207,165,116,0.16)";
  ctx.font = "600 220px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(st.num, DW - 56, 270);
  ctx.fillStyle = "rgba(192,138,104,0.5)";
  ctx.font = "600 40px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.fillText(st.num, DW - 56, 298);

  ctx.fillStyle = "#c08a68";
  ctx.fillRect(64, 108, 90, 4);

  // Halo lumineux discret derrière le texte : l'encre sombre se détache nettement du parchemin,
  // même à distance ou la nuit (lisible quelle que soit la lumière ambiante).
  const inkHalo = () => {
    ctx.save();
    ctx.shadowColor = "rgba(255,246,220,0.72)";
    ctx.shadowBlur = 5;
  };
  const inkEnd = () => ctx.restore();

  inkHalo();
  ctx.fillStyle = "#241a0e";
  ctx.textAlign = "left";
  const fit = fitTitle(ctx, st.title, 850, 56, 38, 4);
  let y = 176;
  const tStep = Math.round(fit.size * 1.1);
  fit.lines.forEach((ln) => { ctx.fillText(ln, 64, y); y += tStep; });
  inkEnd();
  ctx.textAlign = "left";
  y += 14;

  if (st.id !== "quiz" && st.bullets.length) {
    ctx.fillStyle = "rgba(122,95,56,0.45)";
    ctx.fillRect(64, y - 4, 60, 2);
    y += 22;
    const footerTop = DH - 104;
    let bSize = 26;
    const wrapBullets = (size) => {
      ctx.font = `400 ${size}px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif`;
      const bl = [];
      st.bullets.forEach((b) => bl.push(...wrapText(ctx, b, 830)));
      return bl;
    };
    let bulletLines = wrapBullets(bSize);
    while (bulletLines.length * Math.round(bSize * 1.38) > footerTop - y && bSize > 19) {
      bSize -= 1;
      bulletLines = wrapBullets(bSize);
    }
    const bStep = Math.round(bSize * 1.38);
    bulletLines.forEach((ln) => {
      ctx.fillStyle = "#c08a68";
      ctx.beginPath();
      ctx.arc(74, y - 9, 3.5, 0, Math.PI * 2);
      ctx.fill();
      inkHalo();
      ctx.fillStyle = "#2e2314";
      ctx.fillText(ln, 98, y);
      inkEnd();
      y += bStep;
    });
  }

  // Bandeau de pied : module + pagination, séparé par un filet doré
  ctx.fillStyle = "rgba(207,165,116,0.35)";
  ctx.fillRect(64, DH - 90, DW - 128, 2);
  ctx.fillStyle = "rgba(122,95,56,0.7)";
  ctx.font = "400 19px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.textAlign = "left";
  ctx.letterSpacing = "3px";
  ctx.fillText("MODULE 1 · DOMAINE PUBLIC", 64, DH - 60);
  ctx.fillStyle = "rgba(170,120,85,0.8)";
  ctx.textAlign = "right";
  ctx.fillText(String(index + 1).padStart(2, "0") + " / " + String(13).padStart(2, "0"), DW - 64, DH - 60);
  ctx.letterSpacing = "0px";

  // Vignette légère sur les bords uniquement
  const vig = ctx.createRadialGradient(DW / 2, DH / 2, DW * 0.3, DW / 2, DH / 2, DW * 0.62);
  vig.addColorStop(0, "rgba(0,0,0,0)");
  vig.addColorStop(0.6, "rgba(0,0,0,0)");
  vig.addColorStop(1, "rgba(150,120,75,0.24)");
  ctx.fillStyle = vig;
  ctx.fillRect(0, 0, DW, DH);
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
  // Fenêtres qui s'illuminent la nuit (même texture en émissive, intensité pilotée depuis la scène)
  mat.emissive = new THREE.Color(0xffc98a);
  mat.emissiveMap = tex;
  mat.emissiveIntensity = 0;
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(lateral, h / 2 - 0.3, z);
  m.rotation.y = (Math.random() - 0.5) * 0.5;
  m.castShadow = true;

  // Détails de toiture : château d'eau, antenne ou machinerie d'ascenseur
  // (réalisme de la skyline : rien de plat, chaque immeuble a son « chapeau »)
  const roofY = h / 2;
  const roofMat = new THREE.MeshStandardMaterial({ color: 0xb7a47e, roughness: 0.85 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x6a5a38, roughness: 0.8 });
  const r = Math.random();
  if (r < 0.34 && h > 8) {
    // Château d'eau : cylindre + cône, pieds fins
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(Math.min(1.1, w * 0.24), Math.min(1.1, w * 0.24), h * 0.12 + 0.7, 10), roofMat);
    tank.position.y = roofY + (h * 0.06 + 0.55);
    m.add(tank);
    const lid = new THREE.Mesh(new THREE.ConeGeometry(Math.min(1.1, w * 0.24), 0.55, 10), darkMat);
    lid.position.y = roofY + (h * 0.06 + 0.55) + (h * 0.06 + 0.35) + 0.27;
    m.add(lid);
    for (const [fx, fz] of [[-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5], [0.5, 0.5]]) {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.7, 6), darkMat);
      leg.position.set(fx * Math.min(0.7, w * 0.16), roofY + 0.35, fz * Math.min(0.7, d * 0.16));
      m.add(leg);
    }
  } else if (r < 0.6) {
    // Antenne radio / relais : mât + croisillons + feu clignotant
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.07, h * 0.22 + 2.2, 6), darkMat);
    mast.position.y = roofY + (h * 0.11 + 1.1);
    m.add(mast);
    for (let i = 0; i < 3; i++) {
      const arm = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.04, 0.04), darkMat);
      arm.position.y = roofY + (h * 0.11 + 0.5 + i * 0.55);
      m.add(arm);
    }
    const tip = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0xc0392b, emissive: 0xc0392b, emissiveIntensity: 0.4 })
    );
    tip.position.y = roofY + h * 0.11 + 2.25;
    m.add(tip);
  } else if (r < 0.78 && h > 6) {
    // Machinerie d'ascenseur + trappe
    const box = new THREE.Mesh(new THREE.BoxGeometry(w * 0.3, 0.9, d * 0.3), roofMat);
    box.position.y = roofY + 0.45;
    m.add(box);
    const hatch = new THREE.Mesh(new THREE.BoxGeometry(w * 0.16, 0.1, d * 0.16), darkMat);
    hatch.position.y = roofY + 0.95;
    m.add(hatch);
  } else {
    // Cheminée ou gaine technique : simple cylindre discret
    const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.26, 1.3, 8), roofMat);
    stack.position.y = roofY + 0.65;
    m.add(stack);
  }
  return m;
}

export function buildDuck(pos) {
  // Canard colvert miniature pour l'étang du parc
  const g = new THREE.Group();
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xe8e0c8, roughness: 0.75 });
  const headMat = new THREE.MeshStandardMaterial({ color: 0x2e5e3a, roughness: 0.7, metalness: 0.1 });
  const beakMat = new THREE.MeshStandardMaterial({ color: 0xd98a3a, roughness: 0.6 });
  const body = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), bodyMat);
  body.scale.set(1, 0.78, 1.35);
  body.position.y = 0.14;
  g.add(body);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 8), headMat);
  head.position.set(0, 0.3, 0.14);
  g.add(head);
  const beak = new THREE.Mesh(new THREE.ConeGeometry(0.035, 0.1, 6), beakMat);
  beak.rotation.x = Math.PI / 2;
  beak.position.set(0, 0.29, 0.25);
  g.add(beak);
  const tail = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), bodyMat);
  tail.position.set(0, 0.2, -0.18);
  tail.scale.set(1, 0.7, 1.4);
  g.add(tail);
  g.position.copy(pos);
  return { g, head, tail };
}

export function buildPond(pos) {
  // Étang du parc : eau calme, bord de pierre, nénuphars
  const g = new THREE.Group();
  g.position.copy(pos);
  const water = new THREE.Mesh(
    new THREE.CircleGeometry(4.4, 28),
    new THREE.MeshStandardMaterial({ color: 0x7fa8b0, roughness: 0.08, metalness: 0.25, transparent: true, opacity: 0.82 })
  );
  water.rotation.x = -Math.PI / 2;
  water.position.y = 0.05;
  g.add(water);
  const bank = new THREE.Mesh(
    new THREE.TorusGeometry(4.4, 0.28, 8, 32),
    new THREE.MeshStandardMaterial({ color: 0xb7a47e, roughness: 0.9 })
  );
  bank.rotation.x = Math.PI / 2;
  bank.position.y = 0.02;
  g.add(bank);
  const lilyMat = new THREE.MeshStandardMaterial({ color: 0x4e7a4a, roughness: 0.9, side: THREE.DoubleSide });
  const bloomMat = new THREE.MeshStandardMaterial({ color: 0xe8c8a8, roughness: 0.8, side: THREE.DoubleSide });
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2 + Math.random() * 0.5;
    const rr = 1.2 + Math.random() * 2.2;
    const lily = new THREE.Mesh(new THREE.CircleGeometry(0.3 + Math.random() * 0.18, 8), lilyMat);
    lily.rotation.x = -Math.PI / 2;
    lily.position.set(Math.cos(a) * rr, 0.1, Math.sin(a) * rr);
    g.add(lily);
    if (i % 2 === 0) {
      const bloom = new THREE.Mesh(new THREE.SphereGeometry(0.1, 6, 5), bloomMat);
      bloom.position.set(Math.cos(a) * rr + 0.12, 0.2, Math.sin(a) * rr);
      bloom.scale.y = 0.6;
      g.add(bloom);
    }
  }
  return { g, water };
}

export function buildButterfly(pos) {
  // Papillon : deux ailes fines qui battent vite, corps discret
  const g = new THREE.Group();
  const colors = [0xc08a68, 0xcfa574, 0x9db87f, 0x8a9ab8, 0xd98a6a, 0xb8a4c8];
  const col = colors[(Math.random() * colors.length) | 0];
  const wingMat = new THREE.MeshBasicMaterial({ color: col, side: THREE.DoubleSide, transparent: true, opacity: 0.92 });
  const wingGeo = new THREE.PlaneGeometry(0.16, 0.11);
  const lw = new THREE.Mesh(wingGeo, wingMat);
  lw.position.x = -0.09;
  const rw = new THREE.Mesh(wingGeo, wingMat);
  rw.position.x = 0.09;
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.04, 0.08), new THREE.MeshBasicMaterial({ color: 0x3a2e1f }));
  g.add(lw, rw, body);
  g.position.copy(pos);
  return { g, lw, rw };
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

  return { group: g, cone, body };
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
  const petals = [0xc08a68, 0xcfa574, 0x9db87f, 0xe0c9a0, 0xd98a6a, 0x8a9ab8, 0xb8a4c8, 0xd2b48c];
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

// Jardinière de rue : bac en bois avec terre + fleurs (mobilier urbain fleuri)
export function buildPlanterBox(pos, rot = 0, flowerSeed = 0) {
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: 0x7a5c3e, roughness: 0.9, flatShading: true });
  const box = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.5, 0.7), wood);
  box.position.y = 0.25;
  box.castShadow = true;
  g.add(box);
  const soil = new THREE.Mesh(
    new THREE.BoxGeometry(0.95, 0.07, 0.55),
    new THREE.MeshStandardMaterial({ color: 0x4a3624, roughness: 1 })
  );
  soil.position.y = 0.52;
  g.add(soil);
  g.add(buildFlowers(new THREE.Vector3(0, 0.5, 0), 1, flowerSeed));
  g.position.copy(pos);
  g.rotation.y = rot;
  return g;
}

// Caisse de marché : bois + fruits (épicerie de plein air près des étals)
export function buildCrate(pos, rot = 0, fruit = 0xc9a24a) {
  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: 0x8a6a44, roughness: 0.9, flatShading: true });
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.4, 0.5), wood);
  box.position.y = 0.2;
  box.castShadow = true;
  g.add(box);
  const fruitMat = new THREE.MeshStandardMaterial({ color: fruit, roughness: 0.5 });
  const fruits = [0xc9a24a, 0xb0483a, 0x6f7f56, 0xd98a6a];
  for (let i = 0; i < 5; i++) {
    const f = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 6, 5),
      new THREE.MeshStandardMaterial({ color: fruits[(i + Math.round(fruit)) % fruits.length], roughness: 0.5 })
    );
    f.position.set((i % 3) * 0.16 - 0.16, 0.44, Math.floor(i / 3) * 0.14 - 0.07);
    g.add(f);
  }
  g.position.copy(pos);
  g.rotation.y = rot;
  return g;
}

// Horloge de ville sur pied (deux faces, aiguilles réelles)
function clockFaceTexture() {
  const c = document.createElement("canvas");
  c.width = 256; c.height = 256;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#f6eeda";
  ctx.beginPath(); ctx.arc(128, 128, 118, 0, Math.PI * 2); ctx.fill();
  ctx.strokeStyle = "#8a6a4e"; ctx.lineWidth = 10;
  ctx.beginPath(); ctx.arc(128, 128, 118, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = "#6b4a2c"; ctx.lineWidth = 6; ctx.lineCap = "round";
  for (let i = 0; i < 12; i++) {
    const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(128 + Math.cos(a) * 94, 128 + Math.sin(a) * 94);
    ctx.lineTo(128 + Math.cos(a) * 110, 128 + Math.sin(a) * 110);
    ctx.stroke();
  }
  const now = new Date();
  const ha = ((now.getHours() % 12) + now.getMinutes() / 60) * (Math.PI * 2 / 12) - Math.PI / 2;
  const ma = (now.getMinutes() / 60) * Math.PI * 2 - Math.PI / 2;
  ctx.strokeStyle = "#241a0e"; ctx.lineWidth = 11;
  ctx.beginPath(); ctx.moveTo(128, 128); ctx.lineTo(128 + Math.cos(ha) * 54, 128 + Math.sin(ha) * 54); ctx.stroke();
  ctx.lineWidth = 6;
  ctx.beginPath(); ctx.moveTo(128, 128); ctx.lineTo(128 + Math.cos(ma) * 82, 128 + Math.sin(ma) * 82); ctx.stroke();
  ctx.fillStyle = "#b96a45";
  ctx.beginPath(); ctx.arc(128, 128, 8, 0, Math.PI * 2); ctx.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

export function buildStreetClock(pos, rot = 0) {
  const g = new THREE.Group();
  const iron = new THREE.MeshStandardMaterial({ color: 0x4a3a26, roughness: 0.7, metalness: 0.4 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.09, 3.6, 8), iron);
  pole.position.y = 1.8;
  pole.castShadow = true;
  g.add(pole);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 0.75, 12), iron);
  body.position.y = 3.5;
  g.add(body);
  const finial = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.3, 10), iron);
  finial.position.y = 4.05;
  g.add(finial);
  const faceMat = new THREE.MeshStandardMaterial({ map: clockFaceTexture(), roughness: 0.4 });
  const faceP = new THREE.Mesh(new THREE.CircleGeometry(0.27, 22), faceMat);
  faceP.position.set(0, 3.5, 0.34);
  const faceN = faceP.clone();
  faceN.position.z = -0.34;
  faceN.rotation.y = Math.PI;
  g.add(faceP, faceN);
  g.position.copy(pos);
  g.rotation.y = rot;
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
  g.userData = { body };
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
  // Affiche publicitaire douce — canvas au ratio de la face (0.92/2.5 = 0.368) pour un texte non étiré
  const sw = 236, sh = 640;
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
  // Éclairage nocturne doux : émissif ivoire crémeux piloté depuis la scène (lisibilité sans blanchir)
  poster.material.emissive = new THREE.Color(0xece2c8);
  poster.material.emissiveIntensity = 0;
  poster.position.set(0, 1.25, 0.55);
  g.add(poster);
  g.userData = { body, poster };
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
  // Affiche publicitaire (côté route) — canvas au ratio de la face (3.4/1.4 = 2.43) pour un texte non étiré
  const sw = 340, sh = 140;
  const c = document.createElement("canvas");
  c.width = sw; c.height = sh;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#f2e7cd";
  ctx.fillRect(0, 0, sw, sh);
  ctx.fillStyle = "#cfa574";
  ctx.fillRect(0, 0, sw, 30);
  ctx.textAlign = "center";
  ctx.fillStyle = "#3a2e1f";
  ctx.font = "700 24px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.fillText("VOTRE ESPACE PUBLICITAIRE", sw / 2, 72);
  ctx.font = "400 15px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.fillStyle = "#7a5f38";
  ctx.fillText("MODULE 1 · PANNEAUTIQUE", sw / 2, 104);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = LOW ? 2 : 8;
  const poster = new THREE.Mesh(
    new THREE.PlaneGeometry(3.4, 1.4),
    new THREE.MeshLambertMaterial({ map: tex })
  );
  // Affiche d'abribus éclairée la nuit, ivoire crémeux (comme un vrai panneau lumineux, sans blanchir)
  poster.material.emissive = new THREE.Color(0xece2c8);
  poster.material.emissiveIntensity = 0;
  poster.position.set(0, 1.45, 0.42);
  g.add(poster);
  g.userData = { poster };
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

// Palette partagée entre tous les passants (réutilisée : ~25 matériaux au lieu de ~130, moins de temps de compilation sur mobile)
const PERSON_SKIN = [0xd9b08c, 0xc89a72, 0xb0835c, 0x8a6048, 0xe0b898].map(
  (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 })
);
const PERSON_HAIR = [0x2e2418, 0x4a3624, 0x7d5c34, 0xc9a878, 0x22201e].map(
  (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 })
);
const PERSON_SHIRT = [0xc9a87c, 0x8faa7d, 0xcfa574, 0xa8a4c8, 0x9db8bf, 0xd2a678, 0xe0b4a0, 0xb8c4a0].map(
  (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.85 })
);
const PERSON_PANTS = [0x4a3c2e, 0x5c4a3a, 0x3f4654, 0x6a5a44, 0x55443c].map(
  (c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 })
);
const PERSON_SHOE = new THREE.MeshStandardMaterial({ color: 0x2e2418, roughness: 0.8 });
const PERSON_HAT = new THREE.MeshStandardMaterial({ color: 0xcfae74, roughness: 0.9 });

const PICK = (arr) => arr[(Math.random() * arr.length) | 0];

export function buildPerson() {
  // Passant réaliste : silhouettes variées, membres articulés (hanches, genoux, épaules, coudes)
  const g = new THREE.Group();
  // Variations de silhouette (taille / corpulence) et de tons de peau / cheveux
  const tall = 0.92 + Math.random() * 0.18;
  const wide = 0.85 + Math.random() * 0.32;
  const skin = PICK(PERSON_SKIN);
  const hairMat = PICK(PERSON_HAIR);
  const shirt = PICK(PERSON_SHIRT);
  const pants = PICK(PERSON_PANTS);
  const shoeMat = PERSON_SHOE;
  const isSkirt = Math.random() < 0.22;
  const hasHat = Math.random() < 0.14;
  const hasBag = Math.random() < 0.16;

  // -------- Membres inférieurs : hanches -> cuisse -> genou -> tibia -> pied --------
  const hipY = 0.9 * tall;
  const hipX = 0.105 * wide;
  const makeLeg = (x) => {
    const leg = new THREE.Group();
    leg.position.set(x, hipY, 0);
    const thigh = new THREE.Mesh(new THREE.CylinderGeometry(0.064, 0.05, 0.46 * tall, 8), pants);
    thigh.position.y = -0.23 * tall;
    thigh.castShadow = true;
    leg.add(thigh);
    const knee = new THREE.Group();
    knee.position.y = -0.46 * tall;
    const shin = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.04, 0.44 * tall, 8), pants);
    shin.position.y = -0.22 * tall;
    knee.add(shin);
    const foot = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.07, 0.17), shoeMat);
    foot.position.set(0, -0.44 * tall, 0.045);
    knee.add(foot);
    leg.add(knee);
    return { leg, knee };
  };
  const lL = makeLeg(-hipX);
  const lR = makeLeg(hipX);
  g.add(lL.leg, lR.leg);

  // -------- Haut du corps (pivot au niveau des hanches : inclinaison naturelle en marchant) --------
  const lean = new THREE.Group();
  g.add(lean);

  // Robe / jupe évasée (par-dessus les jambes qui marchent dessous)
  if (isSkirt) {
    const skirt = new THREE.Mesh(new THREE.ConeGeometry(0.21 * wide, 0.34, 12), shirt);
    skirt.position.y = 0.78 * tall;
    skirt.castShadow = true;
    lean.add(skirt);
  }
  // Torse légèrement conique (épaules plus larges que la taille) + ventre
  const torso = new THREE.Mesh(
    new THREE.CylinderGeometry(0.175 * wide, 0.215 * wide, 0.54 * tall, 12),
    shirt
  );
  torso.position.y = 1.2 * tall;
  torso.castShadow = true;
  lean.add(torso);
  // Épaules arrondies
  const shoulderMat = shirt;
  for (const sx of [-0.19 * wide, 0.19 * wide]) {
    const sh = new THREE.Mesh(new THREE.SphereGeometry(0.075 * wide, 8, 6), shoulderMat);
    sh.position.set(sx, 1.42 * tall, 0);
    lean.add(sh);
  }
  // Sac à bandoulière (parfois)
  if (hasBag) {
    const bag = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.17, 0.06), pants);
    bag.position.set(0.3 * wide, 1.16 * tall, 0);
    bag.rotation.z = 0.18;
    lean.add(bag);
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.3, 0.02), pants);
    strap.position.set(0.26 * wide, 1.32 * tall, 0);
    strap.rotation.z = 0.4;
    lean.add(strap);
  }
  // Cou + tête + cheveux
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.055, 0.12, 8), skin);
  neck.position.y = 1.5 * tall;
  lean.add(neck);
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.135, 12, 10), skin);
  head.position.y = 1.64 * tall;
  head.castShadow = true;
  lean.add(head);
  // Chevelure : calotte au-dessus/arrière de la tête (le visage reste visible)
  const hair = new THREE.Mesh(new THREE.SphereGeometry(0.15, 10, 8), hairMat);
  hair.position.set(0, 1.66 * tall, -0.02);
  hair.scale.set(1.0, 0.78, 1.06);
  lean.add(hair);
  // Petit chapeau de paille (parfois)
  if (hasHat) {
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(0.19, 0.2, 0.03, 12), PERSON_HAT);
    brim.position.y = 1.74 * tall;
    lean.add(brim);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), PERSON_HAT);
    dome.position.y = 1.78 * tall;
    dome.scale.set(1, 0.85, 1);
    lean.add(dome);
  }

  // -------- Bras articulés : épaule -> bras -> coude -> avant-bras -> main --------
  const makeArm = (x) => {
    const arm = new THREE.Group();
    arm.position.set(x, 1.4 * tall, 0);
    const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.062, 0.26, 8), shirt);
    upper.position.y = -0.13;
    upper.castShadow = true;
    arm.add(upper);
    const elbow = new THREE.Group();
    elbow.position.y = -0.26;
    const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.05, 0.24, 8), skin);
    lower.position.y = -0.12;
    elbow.add(lower);
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 6), skin);
    hand.position.y = -0.24;
    elbow.add(hand);
    arm.add(elbow);
    return { arm, elbow };
  };
  const aL = makeArm(-0.235 * wide);
  const aR = makeArm(0.235 * wide);
  lean.add(aL.arm, aR.arm);

  return { g, legL: lL.leg, legR: lR.leg, kneeL: lL.knee, kneeR: lR.knee, armL: aL.arm, armR: aR.arm, elbowL: aL.elbow, elbowR: aR.elbow, lean, phase: Math.random() * Math.PI * 2 };
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
  // Affiche douce — canvas au ratio de la face (5.3/2.8 = 1.893) pour un texte non étiré
  const cw = LOW ? 320 : 640;
  const ch = Math.round(cw * (2.8 / 5.3)); // 169 / 338
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
  // Affiche qui s'illumine la nuit (émissive douce, pilotée depuis la scène)
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(5.3, 2.8),
    new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffd9a0, emissiveMap: tex, emissiveIntensity: 0 })
  );
  face.position.set(0, 3.6, 0.09);
  g.add(face);
  g.userData = { face };
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
  // Petite affiche — canvas au ratio de la face (0.7/0.5 = 1.4) pour un texte non étiré
  const c = document.createElement("canvas");
  c.width = 128; c.height = 91;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#f2e7cd";
  ctx.fillRect(0, 0, 128, 91);
  ctx.strokeStyle = "rgba(138,111,69,0.6)";
  ctx.lineWidth = 4;
  ctx.strokeRect(4, 4, 120, 83);
  ctx.textAlign = "center";
  ctx.fillStyle = "#3a2e1f";
  ctx.font = "700 18px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.fillText("LE QUOTIDIEN", 64, 40);
  ctx.font = "400 14px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.fillStyle = "#7a5f38";
  ctx.fillText("0,50 €", 64, 64);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = LOW ? 2 : 8;
  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 0.5),
    new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffd9a0, emissiveMap: tex, emissiveIntensity: 0 })
  );
  sign.position.set(0, 1.35, 0.82);
  g.add(sign);
  g.userData = { flag, sign };
  return g;
}

export function buildMarketStall(pos, angle = 0, color = 0xc98f6a) {
  // Étal de marché : table, paniers de fruits, auvent rayé et enseigne éclairée la nuit
  const g = new THREE.Group();
  g.position.copy(pos);
  g.rotation.y = angle;
  const wood = new THREE.MeshStandardMaterial({ color: 0x8a6b45, roughness: 0.85 });
  for (const x of [-1.0, 1.0]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.0, 0.08), wood);
    leg.position.set(x, 0.5, 0);
    leg.castShadow = true;
    g.add(leg);
  }
  const basket = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 0.8), wood);
  basket.position.y = 0.97;
  g.add(basket);
  const table = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.06, 0.9), wood);
  table.position.y = 1.03;
  g.add(table);
  // Panier de fruits
  const fruitColors = [0xc05a4a, 0xcfa574, 0x7d9a68, 0x8a9ab8, 0xd2a678];
  for (let i = 0; i < 5; i++) {
    const f = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), new THREE.MeshStandardMaterial({ color: fruitColors[i % fruitColors.length], roughness: 0.7 }));
    f.position.set(-0.8 + i * 0.4, 1.12, 0);
    f.scale.y = 0.85;
    g.add(f);
  }
  // Auvent rayé
  const awning = buildAwningStripes(2.4, 0.9, color);
  awning.position.set(0, 2.1, 0.3);
  g.add(awning);
  // Enseigne éclairée la nuit
  const c = document.createElement("canvas");
  c.width = 256; c.height = 98;
  const ctx = c.getContext("2d");
  ctx.fillStyle = "#f7eeda";
  ctx.fillRect(0, 0, 256, 98);
  ctx.strokeStyle = "rgba(138,111,69,0.6)";
  ctx.lineWidth = 6;
  ctx.strokeRect(4, 4, 248, 90);
  ctx.fillStyle = "#3a2e1f";
  ctx.textAlign = "center";
  ctx.font = "700 34px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.fillText("MARCHÉ", 128, 60);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sign = new THREE.Mesh(
    new THREE.PlaneGeometry(1.3, 0.5),
    new THREE.MeshStandardMaterial({ map: tex, emissive: 0xffd9a0, emissiveMap: tex, emissiveIntensity: 0 })
  );
  sign.position.set(0, 2.32, 0.05);
  g.add(sign);
  g.userData = { sign, awning };
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

// ---------------- Nouveaux éléments « rue vivante » ----------------

export function buildGarland(a, b, colors = [0xc08a68, 0xcfa574, 0x9db87f, 0x8a9ab8, 0xd2a678], count = 10, sag = 0.7) {
  // Guirlande de fanions tendue au-dessus de la rue, entre deux points a et b
  const g = new THREE.Group();
  const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
  g.position.copy(mid);
  const dir = new THREE.Vector3().subVectors(b, a);
  const mats = colors.map((c) => new THREE.MeshLambertMaterial({ color: c, side: THREE.DoubleSide }));
  const flagGeo = new THREE.PlaneGeometry(0.42, 0.3);
  const angle = Math.atan2(dir.x, dir.z);
  const ropePts = [];
  const n = count * 2;
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const x = THREE.MathUtils.lerp(a.x, b.x, u) - mid.x;
    const y = THREE.MathUtils.lerp(a.y, b.y, u) - sag * Math.sin(Math.PI * u) - mid.y;
    const z = THREE.MathUtils.lerp(a.z, b.z, u) - mid.z;
    ropePts.push(new THREE.Vector3(x, y, z));
    if (i % 2 === 0) {
      const flag = new THREE.Mesh(flagGeo, mats[(i / 2) % mats.length]);
      flag.position.set(x, y - 0.15, z);
      flag.rotation.y = angle;
      g.add(flag);
    }
  }
  const rope = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(ropePts),
    new THREE.LineBasicMaterial({ color: 0x8a6a4e })
  );
  g.add(rope);
  return g;
}

function buildAwningStripes(width, depth, color) {
  // Toile d'auvent rayée (canvas) sur un pan incliné + rabat avant
  const cw = 256, ch = 128;
  const c = document.createElement("canvas");
  c.width = cw; c.height = ch;
  const ctx = c.getContext("2d");
  const hex = "#" + color.toString(16).padStart(6, "0");
  const n = 8;
  for (let i = 0; i < n; i++) {
    ctx.fillStyle = i % 2 === 0 ? hex : "#f7eeda";
    ctx.fillRect(i * (cw / n), 0, cw / n, ch);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = LOW ? 1 : 4;
  const mat = new THREE.MeshLambertMaterial({ map: tex, side: THREE.DoubleSide });
  const g = new THREE.Group();
  // Pan incliné : haut contre la façade, bas qui déborde sur le trottoir
  const slope = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), mat);
  slope.rotation.x = -0.5;
  slope.position.set(0, 0.15, 0.45);
  g.add(slope);
  // Rabat avant
  const flap = new THREE.Mesh(new THREE.PlaneGeometry(width, 0.2), mat);
  flap.position.set(0, 0.1, depth * 0.85);
  flap.rotation.x = -0.15;
  g.add(flap);
  return g;
}

export function buildStorefront(pos, angle = 0, color = 0xc98f6a, label = "BOUTIQUE") {
  // Boutique basse avec vitrine, auvent rayé et enseigne — deuxième rangée de la rue
  const g = new THREE.Group();
  g.position.copy(pos);
  g.rotation.y = angle;
  const w = 5.0, h = 3.3, d = 2.8;
  const wallMat = new THREE.MeshLambertMaterial({ color: 0xe6d9bb });
  const wall = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), wallMat);
  wall.position.y = h / 2;
  wall.castShadow = true;
  g.add(wall);
  const cornice = new THREE.Mesh(new THREE.BoxGeometry(w + 0.24, 0.2, d + 0.24), wallMat);
  cornice.position.y = h + 0.1;
  g.add(cornice);

  // Vitrine (canvas) — même ratio que la face (4.0×1.98 → 2.02) : texte et étagères non étirés
  const cw = LOW ? 256 : 512;
  const ch = Math.round(cw * (h * 0.6) / (w * 0.8)); // 253 / 127
  const c = document.createElement("canvas");
  c.width = cw; c.height = ch;
  const ctx = c.getContext("2d");
  ctx.scale(cw / 512, ch / 253);
  const grad = ctx.createLinearGradient(0, 0, 0, 253);
  grad.addColorStop(0, "#f2e6c9");
  grad.addColorStop(1, "#dccaa3");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 253);
  // Étagères et produits
  const shelfColors = ["#c08a68", "#7d9a68", "#cfa574"];
  for (let s = 0; s < 3; s++) {
    const sx = 30 + s * 160;
    ctx.fillStyle = "rgba(122,95,56,0.5)";
    ctx.fillRect(sx, 152, 120, 8);
    ctx.fillStyle = shelfColors[s];
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.arc(sx + 22 + i * 26, 141, 9, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  // Reflet vitre
  ctx.fillStyle = "rgba(255,255,255,0.2)";
  ctx.beginPath();
  ctx.moveTo(300, 0); ctx.lineTo(430, 0); ctx.lineTo(230, 253); ctx.lineTo(100, 253);
  ctx.closePath(); ctx.fill();
  // Cadre
  ctx.strokeStyle = "#8a6a4e";
  ctx.lineWidth = 12;
  ctx.strokeRect(6, 6, 500, 241);
  // Enseigne (Century Gothic, comme partout)
  ctx.fillStyle = "#3a2e1f";
  ctx.font = "700 36px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, 256, 44);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = LOW ? 2 : 8;
  // Vitrine qui s'illumine la nuit (émissive = la vitrine dessinée devient un vrai éclairage)
  const winMat = new THREE.MeshStandardMaterial({
    map: tex,
    emissive: 0xffd9a0,
    emissiveMap: tex,
    emissiveIntensity: 0,
  });
  const win = new THREE.Mesh(new THREE.PlaneGeometry(w * 0.8, h * 0.6), winMat);
  win.position.set(0, h * 0.52, d / 2 + 0.03);
  g.add(win);

  // Auvent rayé (accroché sous la corniche, au-dessus de la vitrine)
  const awning = buildAwningStripes(w * 0.84, 0.9, color);
  awning.position.set(0, h - 0.55, d / 2 - 0.2);
  g.add(awning);
  g.userData = { window: win, awning };
  return g;
}

export function buildBus() {
  // Bus urbain (transports en commun) — même logique d'animation que les voitures
  const g = new THREE.Group();
  const paint = new THREE.MeshStandardMaterial({ color: 0xc08a68, roughness: 0.5, metalness: 0.25 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x4a3a26, roughness: 0.5, metalness: 0.3 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x8fb0b8, roughness: 0.15, metalness: 0.5 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.3, 5.6), paint);
  body.position.y = 1.15;
  body.castShadow = true;
  g.add(body);
  const roof = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.16, 5.4), paint);
  roof.position.y = 1.9;
  g.add(roof);
  const winBand = new THREE.Mesh(new THREE.BoxGeometry(1.72, 0.52, 5.2), glass);
  winBand.position.y = 1.56;
  g.add(winBand);
  const front = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.5, 0.06), glass);
  front.position.set(0, 1.5, 2.8);
  g.add(front);
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x2e2418, roughness: 0.9 });
  for (const [x, z] of [[-0.95, 1.7], [0.95, 1.7], [-0.95, -1.7], [0.95, -1.7]]) {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.26, 14), wheelMat);
    wheel.rotation.x = Math.PI / 2;
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, 0.36, z);
    g.add(wheel);
  }
  const hlMat = new THREE.MeshStandardMaterial({ color: 0xfff2cf, emissive: 0xffe0a0, emissiveIntensity: 0.5 });
  for (const x of [-0.7, 0.7]) {
    const hl = new THREE.Mesh(new THREE.SphereGeometry(0.1, 8, 8), hlMat);
    hl.position.set(x, 1.05, 2.82);
    g.add(hl);
  }
  const cone = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture(0.0, "rgba(255,226,175,0.4)"),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
  }));
  cone.scale.set(4.2, 4.2, 1);
  cone.position.set(0, 1.1, 4.6);
  g.add(cone);
  return { group: g, cone, body };
}

export function buildDog() {
  // Chien stylisé (queue animable)
  const g = new THREE.Group();
  const fur = new THREE.MeshLambertMaterial({ color: 0xb98a5e });
  const furDark = new THREE.MeshLambertMaterial({ color: 0x8a6240 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.22, 0.55), fur);
  body.position.y = 0.24;
  body.castShadow = true;
  g.add(body);
  const head = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.15, 0.18), fur);
  head.position.set(0, 0.36, 0.33);
  g.add(head);
  const ear = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.09, 0.11), furDark);
  ear.position.set(0, 0.45, 0.34);
  g.add(ear);
  const tail = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.2), fur);
  tail.position.set(0, 0.36, -0.37);
  g.add(tail);
  for (const [x, z] of [[-0.11, 0.18], [0.11, 0.18], [-0.11, -0.18], [0.11, -0.18]]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 0.06), fur);
    leg.position.set(x, 0.09, z);
    g.add(leg);
  }
  g.userData = { tail };
  return g;
}

export function buildBalloons(pos) {
  // Ballons colorés sur une tige (devant le kiosque)
  const g = new THREE.Group();
  g.position.copy(pos);
  const stick = new THREE.Mesh(
    new THREE.CylinderGeometry(0.025, 0.025, 1.1, 6),
    new THREE.MeshStandardMaterial({ color: 0x8a6a4e, roughness: 0.8 })
  );
  stick.position.y = 0.55;
  g.add(stick);
  const colors = [0xc05a4a, 0xcfa574, 0x7d9a68];
  const balloons = [];
  for (let i = 0; i < 3; i++) {
    const b = new THREE.Mesh(
      new THREE.SphereGeometry(0.21, 10, 8),
      new THREE.MeshLambertMaterial({ color: colors[i], emissive: colors[i], emissiveIntensity: 0.08 })
    );
    b.position.set((i - 1) * 0.22, 1.2 + Math.sin(i * 2.1) * 0.05, (i % 2) * 0.12 - 0.06);
    b.scale.set(1, 1.2, 1);
    g.add(b);
    balloons.push(b);
  }
  g.userData = { balloons };
  return g;
}

export function buildTrafficLight(pos, angle = 0) {
  // Feu tricolore urbain avec feu piéton, posé au bord des passages piétons
  const g = new THREE.Group();
  g.position.copy(pos);
  g.rotation.y = angle;
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x2e2a26, roughness: 0.5, metalness: 0.5 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.07, 3.4, 8), poleMat);
  pole.position.y = 1.7;
  pole.castShadow = true;
  g.add(pole);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x3a3d42, roughness: 0.6, metalness: 0.3 });
  const body = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.9, 0.26), bodyMat);
  body.position.y = 2.9;
  g.add(body);
  const specs = [
    { c: 0xc94f42, y: 3.24, on: 0.9 },
    { c: 0xe0a83a, y: 2.9, on: 0.2 },
    { c: 0x5f9c58, y: 2.56, on: 0.2 },
  ];
  const bulbs = [];
  specs.forEach((s) => {
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.095, 10, 8),
      new THREE.MeshStandardMaterial({ color: 0x1a1c20, emissive: s.c, emissiveIntensity: s.on, roughness: 0.4 })
    );
    bulb.position.set(0, s.y, 0.14);
    g.add(bulb);
    bulbs.push(bulb);
  });
  // Feu piéton rouge/vert sous le feu principal
  const pedBody = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.55, 0.14), bodyMat);
  pedBody.position.set(0, 1.15, 0);
  g.add(pedBody);
  const peds = [];
  for (const [c, y] of [[0xc94f42, 1.32], [0x5f9c58, 1.05]]) {
    const ped = new THREE.Mesh(
      new THREE.SphereGeometry(0.05, 8, 6),
      new THREE.MeshStandardMaterial({ color: 0x1a1c20, emissive: c, emissiveIntensity: 0.7, roughness: 0.4 })
    );
    ped.position.set(0, y, 0.08);
    g.add(ped);
    peds.push(ped);
  }
  // Ampoules exposées pour l'animation du cycle tricolore
  g.userData = { bulbs, peds };
  return g;
}

export function buildBollard(pos) {
  // Borne urbaine anti-stationnement (crème, lisible sur bitume et trottoir)
  const g = new THREE.Group();
  g.position.copy(pos);
  const mat = new THREE.MeshStandardMaterial({ color: 0xe3d9ba, roughness: 0.7, metalness: 0.2 });
  const b = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.11, 0.5, 8), mat);
  b.position.y = 0.25;
  b.castShadow = true;
  g.add(b);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), mat);
  cap.position.y = 0.51;
  g.add(cap);
  return g;
}

export function buildHydrant(pos) {
  // Bouche d'incendie rouge classique
  const g = new THREE.Group();
  g.position.copy(pos);
  const red = new THREE.MeshStandardMaterial({ color: 0xb5503c, roughness: 0.6, metalness: 0.35 });
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.52, 10), red);
  body.position.y = 0.26;
  body.castShadow = true;
  g.add(body);
  const cap = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), red);
  cap.position.y = 0.55;
  g.add(cap);
  for (const a of [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]) {
    const nub = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, 0.07, 8), red);
    nub.position.set(Math.cos(a) * 0.13, 0.38, Math.sin(a) * 0.13);
    nub.rotation.z = Math.PI / 2;
    nub.rotation.y = a;
    g.add(nub);
  }
  return g;
}

export function buildMailbox(pos) {
  // Boîte aux lettres urbaine
  const g = new THREE.Group();
  g.position.copy(pos);
  const blue = new THREE.MeshStandardMaterial({ color: 0x6a7d94, roughness: 0.6, metalness: 0.4 });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.045, 1.15, 8), blue);
  pole.position.y = 0.58;
  pole.castShadow = true;
  g.add(pole);
  const box = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.42, 0.17), blue);
  box.position.y = 1.02;
  box.castShadow = true;
  g.add(box);
  const slot = new THREE.Mesh(
    new THREE.BoxGeometry(0.22, 0.045, 0.02),
    new THREE.MeshStandardMaterial({ color: 0x1a1c20, roughness: 0.7 })
  );
  slot.position.set(0, 1.2, 0.095);
  g.add(slot);
  return g;
}

export function buildSucette(pos, angle = 0, lines = ["ESPACE", "PUBLICITAIRE"]) {
  // Sucette publicitaire (affichage libre-service), thème panneautique
  const g = new THREE.Group();
  g.position.copy(pos);
  g.rotation.y = angle;
  const iron = new THREE.MeshStandardMaterial({ color: 0x3a332b, roughness: 0.55, metalness: 0.5 });
  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.1, 10), iron);
  base.position.y = 0.05;
  g.add(base);
  const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 1.0, 8), iron);
  post.position.y = 0.6;
  post.castShadow = true;
  g.add(post);
  // Canvas au ratio de la face (1.35/2.0 = 0.675) pour un texte non étiré
  const sw = 270, sh = 400;
  const c = document.createElement("canvas");
  c.width = sw; c.height = sh;
  const ctx = c.getContext("2d");
  const grad = ctx.createLinearGradient(0, 0, 0, sh);
  grad.addColorStop(0, "#fbf4e0");
  grad.addColorStop(1, "#efdfba");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, sw, sh);
  ctx.strokeStyle = "rgba(138,111,69,0.55)";
  ctx.lineWidth = 10;
  ctx.strokeRect(10, 10, sw - 20, sh - 20);
  ctx.fillStyle = "#c08a68";
  ctx.fillRect(0, 0, sw, 36);
  ctx.textAlign = "center";
  ctx.fillStyle = "#3a2e1f";
  ctx.font = "700 40px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  lines.forEach((ln, i) => ctx.fillText(ln, sw / 2, 172 + i * 58));
  ctx.fillStyle = "#8a6a4e";
  ctx.font = "400 22px 'Century Gothic', 'CenturyGothic', 'AppleGothic', Arial, sans-serif";
  ctx.fillText("DOMAINE PUBLIC", sw / 2, sh - 34);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = LOW ? 2 : 8;
  const mat = new THREE.MeshLambertMaterial({ map: tex });
  // Éclairage nocturne doux, ivoire crémeux (intensité pilotée depuis la scène)
  mat.emissive = new THREE.Color(0xece2c8);
  mat.emissiveIntensity = 0;
  const front = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 2.0), mat);
  front.position.set(0, 1.95, 0.02);
  g.add(front);
  const back = front.clone();
  back.position.z = -0.02;
  back.rotation.y = Math.PI;
  g.add(back);
  g.userData = { front };
  return g;
}

export function buildPlanterTree(pos, scale = 1) {
  // Arbre en bac de pierre, alignement de rue soigné
  const g = new THREE.Group();
  g.position.copy(pos);
  g.scale.setScalar(scale);
  const stone = new THREE.MeshStandardMaterial({ color: 0xb7a47e, roughness: 0.9 });
  const planter = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.48, 1.0), stone);
  planter.position.y = 0.24;
  planter.castShadow = true;
  g.add(planter);
  const rim = new THREE.Mesh(new THREE.BoxGeometry(1.08, 0.08, 1.08), stone);
  rim.position.y = 0.48;
  g.add(rim);
  const soil = new THREE.Mesh(
    new THREE.BoxGeometry(0.92, 0.06, 0.92),
    new THREE.MeshStandardMaterial({ color: 0x42352a, roughness: 1 })
  );
  soil.position.y = 0.51;
  g.add(soil);
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6b4a2c, roughness: 0.95, flatShading: true });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, 2.2, 7), trunkMat);
  trunk.position.y = 1.55;
  trunk.castShadow = true;
  g.add(trunk);
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x55703f, roughness: 1, flatShading: true });
  for (let i = 0; i < 3; i++) {
    const canopy = new THREE.Mesh(new THREE.SphereGeometry(1.0 - i * 0.16, 8, 6), leafMat);
    canopy.position.set((Math.random() - 0.5) * 0.4, 2.55 + i * 0.55, (Math.random() - 0.5) * 0.4);
    canopy.scale.y = 0.85;
    canopy.castShadow = true;
    g.add(canopy);
  }
  return g;
}

export function buildLaneArrow(pos, angle = 0) {
  // Flèche directionnelle peinte sur le bitume (pointes vers +Z, tournée par l'appelant)
  const geo = new THREE.BufferGeometry();
  const v = new Float32Array([
    0, -1.0, 0, -0.55, -0.35, 0, 0.55, -0.35, 0,
    0, -1.0, 0, 0.55, -0.35, 0, 0.26, 0.9, 0,
    0, -1.0, 0, 0.26, 0.9, 0, -0.26, 0.9, 0,
    0, -1.0, 0, -0.26, 0.9, 0, -0.55, -0.35, 0,
  ]);
  geo.setAttribute("position", new THREE.BufferAttribute(v, 3));
  geo.computeVertexNormals();
  const inner = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({ color: 0xf0ece0, side: THREE.DoubleSide })
  );
  inner.rotation.x = -Math.PI / 2;
  const g = new THREE.Group();
  g.add(inner);
  g.rotation.y = angle;
  g.position.set(pos.x, 0.05, pos.z);
  return g;
}

export function buildConifer(pos, scale = 1) {
  // Sapin / conifère : tronc + étages de cônes (variété d'essences dans le paysage)
  const g = new THREE.Group();
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5a3d24, roughness: 0.95, flatShading: true });
  const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.14, 1.3, 7), trunkMat);
  trunk.position.y = 0.65;
  trunk.castShadow = true;
  g.add(trunk);
  const needleMat = new THREE.MeshStandardMaterial({ color: 0x3f5a36, roughness: 1, flatShading: true });
  const tiers = 4;
  for (let i = 0; i < tiers; i++) {
    const cone = new THREE.Mesh(new THREE.ConeGeometry(1.05 - i * 0.18, 0.85, 8), needleMat);
    cone.position.y = 1.1 + i * 0.62;
    cone.castShadow = true;
    g.add(cone);
  }
  const top = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.42, 6), needleMat);
  top.position.y = 3.7;
  g.add(top);
  g.position.copy(pos);
  g.scale.setScalar(scale);
  return g;
}

export function buildManhole(pos, kind = 0, rot = 0) {
  // Détail de chaussée : regard en fonte (0) ou grille d'évacuation (1)
  const g = new THREE.Group();
  g.position.copy(pos);
  g.rotation.y = rot;
  if (kind === 0) {
    const mat = new THREE.MeshStandardMaterial({ color: 0x3c3f44, roughness: 0.85, metalness: 0.35 });
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.05, 20), mat);
    disc.position.y = 0.06;
    g.add(disc);
    const inner = new THREE.Mesh(
      new THREE.CircleGeometry(0.3, 20),
      new THREE.MeshStandardMaterial({ color: 0x2c2e33, roughness: 0.9 })
    );
    inner.rotation.x = -Math.PI / 2;
    inner.position.y = 0.09;
    g.add(inner);
    for (let i = 0; i < 3; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.02, 0.035), mat);
      bar.position.set(0, 0.105, -0.2 + i * 0.2);
      g.add(bar);
    }
  } else {
    const mat = new THREE.MeshStandardMaterial({ color: 0x2f3236, roughness: 0.8, metalness: 0.4 });
    const frame = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.04, 0.5), mat);
    frame.position.y = 0.06;
    g.add(frame);
    for (let i = 0; i < 5; i++) {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.03, 0.05), mat);
      bar.position.set(0, 0.075, -0.17 + i * 0.085);
      g.add(bar);
    }
  }
  return g;
}

export function buildUtilityPole(pos) {
  // Poteau électrique en bois avec traverse et isolateurs
  const g = new THREE.Group();
  g.position.copy(pos);
  const wood = new THREE.MeshStandardMaterial({ color: 0x5a4632, roughness: 0.9, flatShading: true });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, 7.2, 8), wood);
  pole.position.y = 3.6;
  pole.castShadow = true;
  g.add(pole);
  const crossarm = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.09, 0.09), wood);
  crossarm.position.y = 6.3;
  g.add(crossarm);
  const isoMat = new THREE.MeshStandardMaterial({ color: 0x8a9a6a, roughness: 0.6, metalness: 0.2 });
  for (const x of [-1.15, 1.15]) {
    const iso = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 0.14, 6), isoMat);
    iso.position.set(x, 6.4, 0);
    g.add(iso);
  }
  const cap = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.3, 6), wood);
  cap.position.y = 7.32;
  g.add(cap);
  return g;
}

export function buildWire(a, b, sag = 0.8) {
  // Fil électrique entre deux poteaux : caténaire sombre et fine
  const pts = [];
  const n = 24;
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    pts.push(new THREE.Vector3(
      a.x + (b.x - a.x) * u,
      a.y + (b.y - a.y) * u + Math.sin(u * Math.PI) * -sag,
      a.z + (b.z - a.z) * u
    ));
  }
  const curve = new THREE.CatmullRomCurve3(pts);
  return new THREE.Mesh(
    new THREE.TubeGeometry(curve, n, 0.015, 5, false),
    new THREE.MeshBasicMaterial({ color: 0x2c2620 })
  );
}

export function buildTrafficCone(pos) {
  // Cône de chantier : base carrée, corps orange et bande réfléchissante
  const g = new THREE.Group();
  g.position.copy(pos);
  const coneMat = new THREE.MeshStandardMaterial({ color: 0xd96a3d, roughness: 0.8 });
  const body = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.5, 10), coneMat);
  body.position.y = 0.25;
  body.castShadow = true;
  g.add(body);
  const bandMat = new THREE.MeshStandardMaterial({ color: 0xf2ece0, roughness: 0.7 });
  const band = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.115, 0.09, 10), bandMat);
  band.position.y = 0.2;
  g.add(band);
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.04, 0.3), coneMat);
  base.position.y = 0.02;
  g.add(base);
  return g;
}
