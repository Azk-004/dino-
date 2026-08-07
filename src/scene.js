import * as THREE from "three";
import {
  PAL, radialTexture, groundTexture, asphaltTexture, buildRibbon, buildPanel, buildBuilding,
  buildLamp, buildLampGlow, buildDune, buildRock, buildDust, buildBird,
  buildPalm, buildBush, buildCloud, buildSign, buildMountain, buildBench, buildCar,
} from "./world.js";

export function createScene(canvas, stations) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(PAL.skyHorizon, 60, 760);

  const camera = new THREE.PerspectiveCamera(52, window.innerWidth / window.innerHeight, 0.1, 900);

  // ---------------- Sky dome (gradient + stars) ----------------
  const skyMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    uniforms: {
      top: { value: new THREE.Color(PAL.skyTop) },
      mid: { value: new THREE.Color(PAL.skyMid) },
      horizon: { value: new THREE.Color(PAL.skyHorizon) },
      sunDir: { value: new THREE.Vector3(0, 0.16, -1).normalize() },
      sunColor: { value: new THREE.Color(PAL.sun) },
    },
    vertexShader: `
      varying vec3 vPos;
      void main() { vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: `
      varying vec3 vPos;
      uniform vec3 top, mid, horizon, sunColor, sunDir;
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }
      void main() {
        vec3 dir = normalize(vPos);
        float h = clamp(dir.y, 0.0, 1.0);
        vec3 col = mix(horizon, mid, smoothstep(0.0, 0.12, h));
        col = mix(col, top, smoothstep(0.12, 0.5, h));
        float sun = pow(max(dot(dir, sunDir), 0.0), 42.0) * 1.5;
        float halo = pow(max(dot(dir, sunDir), 0.0), 7.0) * 0.4;
        col += sunColor * sun + sunColor * halo;
        float starMask = smoothstep(0.16, 0.32, h);
        float s = step(0.9991, hash(dir));
        col += vec3(1.0) * s * starMask * 0.8;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(700, 40, 20), skyMat));

  // ---------------- Sun (fixed ahead of camera) ----------------
  const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture(0.0, "rgba(240,180,110,0.9)"),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
  }));
  sunSprite.position.set(0, 34, -560);
  sunSprite.scale.setScalar(64);
  camera.add(sunSprite);

  const haloSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture(0.22, "rgba(230,160,90,0.35)"),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
  }));
  haloSprite.position.set(0, 34, -560);
  haloSprite.scale.setScalar(220);
  camera.add(haloSprite);
  scene.add(camera);

  // ---------------- Moon ----------------
  const moonSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture(0.0, "rgba(255,240,205,0.85)"),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0.5,
  }));
  moonSprite.position.set(250, 95, -520);
  moonSprite.scale.setScalar(26);
  scene.add(moonSprite);

  // ---------------- Ground ----------------
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(1600, 48),
    new THREE.MeshStandardMaterial({ map: groundTexture(), roughness: 1.0, metalness: 0.0 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.02;
  ground.receiveShadow = true;
  scene.add(ground);

  // ---------------- Camera rail ----------------
  const pts = [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(7, 0, 30),
    new THREE.Vector3(-8, 0, 62),
    new THREE.Vector3(9, 0, 96),
    new THREE.Vector3(-9, 0, 132),
    new THREE.Vector3(8, 0, 168),
    new THREE.Vector3(-7, 0, 202),
    new THREE.Vector3(6, 0, 236),
    new THREE.Vector3(-8, 0, 270),
    new THREE.Vector3(7, 0, 304),
    new THREE.Vector3(-6, 0, 338),
    new THREE.Vector3(8, 0, 372),
    new THREE.Vector3(-8, 0, 406),
    new THREE.Vector3(6, 0, 440),
    new THREE.Vector3(0, 0, 468),
  ];
  const curve = new THREE.CatmullRomCurve3(pts, false, "centripetal", 0.6);
  curve.arcLengthDivisions = 1000;

  // ---------------- Road + center dashes ----------------
  const road = buildRibbon(curve, 4.2, PAL.path, asphaltTexture());
  road.position.y = 0.012;
  scene.add(road);
  for (const off of [-1.5, 1.5]) {
    const edge = buildRibbon(curve, 0.14, PAL.pathEdge);
    edge.position.set(off, 0.025, 0);
    scene.add(edge);
  }
  for (let i = 0; i <= 84; i++) {
    const t = (i / 84) * 0.96 + 0.02;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const dash = new THREE.Mesh(
      new THREE.BoxGeometry(0.14, 0.03, 1.1),
      new THREE.MeshBasicMaterial({ color: 0xd9c08c })
    );
    dash.position.set(p.x, 0.045, p.z);
    dash.rotation.y = Math.atan2(tg.x, tg.z);
    scene.add(dash);
  }

  // ---------------- Glow progress line ----------------
  const glowTube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, 400, 0.05, 8, false),
    new THREE.MeshBasicMaterial({
      color: PAL.amber, transparent: true, opacity: 0.9,
      blending: THREE.AdditiveBlending, depthWrite: false,
    })
  );
  glowTube.position.y = 0.055;
  scene.add(glowTube);
  const glowIndexCount = glowTube.geometry.index.count;

  // ---------------- Lights ----------------
  scene.add(new THREE.AmbientLight(0x40301f, 0.6));
  scene.add(new THREE.HemisphereLight(0x5d4a72, 0x3a2a18, 0.4));
  const moonLight = new THREE.DirectionalLight(0x9fb0d8, 0.4);
  moonLight.position.set(250, 95, -520);
  scene.add(moonLight);
  const sunLight = new THREE.DirectionalLight(0xe8b980, 2.2);
  sunLight.position.set(-40, 60, -120);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.left = -160;
  sunLight.shadow.camera.right = 160;
  sunLight.shadow.camera.top = 200;
  sunLight.shadow.camera.bottom = -60;
  sunLight.shadow.camera.near = 10;
  sunLight.shadow.camera.far = 700;
  scene.add(sunLight);
  scene.add(sunLight.target);

  // ---------------- Panels (face oncoming camera) ----------------
  const panels = [];
  const pickables = [];
  const N = stations.length;
  stations.forEach((st, i) => {
    const t = 0.02 + ((i + 0.5) / N) * 0.94;
    const side = i % 2 === 0 ? 1 : -1;
    const panel = buildPanel(st, curve, t, side, i);
    panels.push(panel);
    pickables.push({ mesh: panel.front, kind: "panel", index: i });
    scene.add(panel.group);
  });

  // ---------------- City skyline both sides ----------------
  for (let i = 0; i < 40; i++) {
    const z = i * 13 + Math.random() * 7;
    const h = 7 + Math.random() * 27;
    const w = 4 + Math.random() * 3.5;
    const d = 4 + Math.random() * 3.5;
    scene.add(buildBuilding(w, h, d, z, -78 - Math.random() * 34));
    scene.add(buildBuilding(w, h * (0.7 + Math.random() * 0.6), d, z, 78 + Math.random() * 34));
  }

  // ---------------- Mountain ridge ----------------
  for (let i = 0; i < 14; i++) {
    const z = 30 + Math.random() * 450;
    const side = Math.random() > 0.5 ? 1 : -1;
    const h = 28 + Math.random() * 55;
    const w = 42 + Math.random() * 50;
    scene.add(buildMountain(
      new THREE.Vector3(side * (210 + Math.random() * 150), h * 0.4 - 3, z),
      w, h, 38 + Math.random() * 30
    ));
  }

  // ---------------- Hills ----------------
  const hillMat = new THREE.MeshStandardMaterial({ color: PAL.hill, roughness: 1, flatShading: true });
  const hillL = new THREE.Mesh(new THREE.SphereGeometry(120, 24, 12), hillMat);
  hillL.scale.set(1, 0.5, 4);
  hillL.position.set(-230, -2, 240);
  scene.add(hillL);
  const hillR = new THREE.Mesh(new THREE.SphereGeometry(150, 24, 12), hillMat);
  hillR.scale.set(1, 0.55, 4.5);
  hillR.position.set(280, 0, 330);
  scene.add(hillR);

  // ---------------- Lamp posts + warm glow ----------------
  const lamps = [];
  for (let i = 0; i <= 14; i++) {
    const t = (i / 14) * 0.96 + 0.02;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const side = i % 2 === 0 ? 1 : -1;
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const pos = p.clone().add(perp.clone().multiplyScalar(side * 4.8));
    scene.add(buildLamp(pos, side));
    const lg = buildLampGlow(pos, side);
    lamps.push({ glow: lg.glow, pool: lg.pool, i });
    scene.add(lg.group);
  }

  // ---------------- Benches (opposite the lamps) ----------------
  for (let i = 0; i <= 13; i++) {
    const t = (i / 13) * 0.96 + 0.02 + 0.035;
    if (t > 0.98) continue;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const side = i % 2 === 0 ? -1 : 1;
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const pos = p.clone().add(perp.clone().multiplyScalar(side * 5.3));
    scene.add(buildBench(pos, side));
  }

  // ---------------- Dunes & rocks ----------------
  for (let i = 0; i < 34; i++) {
    const t = Math.random();
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * (9 + Math.random() * 22)));
    if (Math.random() < 0.5) scene.add(buildDune(pos, 1 + Math.random() * 2.4));
    else scene.add(buildRock(pos, 0.3 + Math.random() * 0.9));
  }

  // ---------------- Palms & bushes ----------------
  const palms = [];
  for (let i = 0; i < 26; i++) {
    const t = Math.random();
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * (8 + Math.random() * 9)));
    const palm = buildPalm(pos, 0.8 + Math.random() * 0.9);
    palms.push({ g: palm, phase: Math.random() * Math.PI * 2 });
    scene.add(palm);
  }
  for (let i = 0; i < 40; i++) {
    const t = Math.random();
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * (5.8 + Math.random() * 3.4)));
    scene.add(buildBush(pos, 0.5 + Math.random() * 0.7));
  }

  // ---------------- Clouds (drifting) ----------------
  const clouds = [];
  for (let i = 0; i < 9; i++) {
    const cld = buildCloud(
      new THREE.Vector3((Math.random() - 0.5) * 130, 30 + Math.random() * 20, Math.random() * 440),
      1.4 + Math.random() * 2.6
    );
    clouds.push({ g: cld, speed: 0.5 + Math.random() * 0.8 });
    scene.add(cld);
  }

  // ---------------- Clickable directional signs ----------------
  const SIGNS = [
    { t: 0.12, side: 1, lines: ["Audit", "d'abord"], tip: "Toute réorganisation commence par l'audit des acteurs du secteur." },
    { t: 0.5, side: -1, lines: ["Zonage", "du territoire"], tip: "Le zonage délimite les espaces publicitaires selon des normes." },
    { t: 0.88, side: 1, lines: ["Mise à jour", "continue"], tip: "Un secteur en phase avec l'urbanisation se pérennise." },
  ];
  SIGNS.forEach((s) => {
    const p = curve.getPointAt(s.t);
    const tg = curve.getTangentAt(s.t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const pos = p.clone().add(perp.clone().multiplyScalar(s.side * 5.5));
    const dir = new THREE.Vector3().subVectors(p, pos).normalize();
    const sign = buildSign(pos, Math.atan2(dir.x, dir.z), s.lines);
    pickables.push({ mesh: sign.sign, kind: "sign", tip: s.tip });
    scene.add(sign.group);
  });

  // ---------------- Dust ----------------
  const dust = buildDust();
  scene.add(dust);

  // ---------------- Fireflies ----------------
  const fireflies = [];
  for (let i = 0; i < 40; i++) {
    const t = Math.random();
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * (5.5 + Math.random() * 4)));
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({
      map: radialTexture(0.5, "rgba(240,196,120,1)"),
      transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0,
    }));
    sp.position.set(pos.x, 0.8 + Math.random() * 2.4, pos.z);
    sp.scale.setScalar(0.5 + Math.random() * 0.5);
    fireflies.push({ sp, baseY: sp.position.y, phase: Math.random() * Math.PI * 2, speed: 0.8 + Math.random() * 1.4 });
    scene.add(sp);
  }

  // ---------------- Birds ----------------
  const birds = [];
  for (let i = 0; i < 5; i++) {
    const bird = buildBird();
    bird.g.position.set(-60 + Math.random() * 120, 9 + Math.random() * 8, 40 + Math.random() * 120);
    birds.push({
      g: bird.g, l: bird.l, r: bird.r,
      phase: Math.random() * Math.PI * 2, speed: 4 + Math.random() * 3,
      y0: bird.g.position.y, z0: bird.g.position.z,
    });
    scene.add(bird.g);
  }

  // ---------------- Cars (drifting along the road) ----------------
  const cars = [];
  for (let i = 0; i < 7; i++) {
    const car = buildCar();
    cars.push({ g: car.group, cone: car.cone, t: i / 7, speed: 0.02 + Math.random() * 0.014, phase: Math.random() * Math.PI * 2 });
    scene.add(car.group);
  }

  // ---------------- State ----------------
  const camTarget = new THREE.Vector3();
  const camLook = new THREE.Vector3();
  const tmpPerp = new THREE.Vector3();
  const camVel = new THREE.Vector3();
  let lastTime = performance.now() * 0.001;
  let hoverIndex = -1;
  let meteor = null;
  let meteorTimer = 5 + Math.random() * 6;
  let camPrevAngle = 0;

  function setHover(i) { hoverIndex = i; }

  function update(progress, activeIndex) {
    const time = performance.now() * 0.001;
    const dt = Math.min(0.05, Math.max(0.001, time - lastTime));
    lastTime = time;
    const t = 0.005 + progress * 0.98;

    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const look = curve.getPointAt(Math.min(t + 0.045, 0.999));
    tmpPerp.set(-tg.z, 0, tg.x).normalize();

    const bob = Math.sin(time * 0.7) * 0.07;
    const sway = Math.sin(time * 0.25) * 0.18;
    camTarget.set(p.x + tmpPerp.x * sway, p.y + 3.45 + bob, p.z + tmpPerp.z * sway);

    // Frame the approaching panel: look at the panel ~1 station ahead of the camera
    camLook.set(look.x, look.y + 2.7, look.z);
    {
      let frameIdx = 0;
      let best = Infinity;
      const lookLead = t + 0.03;
      for (let i = 0; i < N; i++) {
        const tp = 0.02 + ((i + 0.5) / N) * 0.94;
        const d = Math.abs(tp - lookLead);
        if (d < best) { best = d; frameIdx = i; }
      }
      const w = THREE.MathUtils.clamp(1 - best / 0.08, 0, 1);
      if (w > 0) {
        const pp = panels[frameIdx].group.position;
        const sw = w * w * (3 - 2 * w);
        camLook.lerp(new THREE.Vector3(pp.x, pp.y + 2.8, pp.z), sw * 0.85);
      }
    }

    camera.up.set(0, 1, 0);
    camera.lookAt(camLook);

    // Lean into curves for a more physical, cinematic feel
    const camAngle = Math.atan2(tg.x, tg.z);
    const dAngle = camAngle - camPrevAngle;
    camPrevAngle = camAngle;
    const rollTarget = THREE.MathUtils.clamp((dAngle / Math.max(dt, 0.001)) * 0.09, -0.08, 0.08);
    camera.rotation.z = THREE.MathUtils.lerp(camera.rotation.z, rollTarget, 0.06);

    // Critically-damped spring follow: snappy, no lag, no overshoot
    const k = 55, damp = 15.2;
    camVel.addScaledVector(camTarget, k * dt);
    camVel.addScaledVector(camera.position, -k * dt);
    camVel.multiplyScalar(Math.max(0, 1 - damp * dt));
    camera.position.addScaledVector(camVel, dt);

    glowTube.geometry.setDrawRange(0, Math.floor(glowIndexCount * progress));

    panels.forEach((pl, i) => {
      const isActive = i === activeIndex;
      const hovered = i === hoverIndex;
      const near = Math.abs(progress - (0.02 + ((i + 0.5) / N) * 0.94)) < 0.06;
      const targetScale = isActive ? 1.0 : hovered ? 1.09 : 0.86;
      const targetEmissive = hovered ? 1.3 : isActive ? 0.9 : 0.24;
      const targetLight = hovered ? 3.4 : isActive ? 2.6 : near ? 0.6 : 0;
      const lerpRate = hovered ? 0.12 : 0.08;
      pl.group.scale.setScalar(THREE.MathUtils.lerp(pl.group.scale.x, targetScale, lerpRate));
      pl.frontMat.emissiveIntensity = THREE.MathUtils.lerp(pl.frontMat.emissiveIntensity, targetEmissive, lerpRate);
      pl.light.intensity = THREE.MathUtils.lerp(pl.light.intensity, targetLight, lerpRate);
      pl.group.position.y = THREE.MathUtils.lerp(pl.group.position.y, isActive ? 0.22 : 0, 0.06);
      pl.beaconMat.emissiveIntensity = 1.1 + Math.sin(time * 2.4 + i) * 0.7;

      // Face the camera when close so panels are always "bien droit" on arrival
      const dx = camera.position.x - pl.group.position.x;
      const dz = camera.position.z - pl.group.position.z;
      const dist = Math.hypot(dx, dz);
      const faceW = THREE.MathUtils.clamp(1 - dist / 34, 0, 1);
      const targetRot = Math.atan2(dx, dz);
      pl.group.rotation.y = THREE.MathUtils.lerp(pl.group.rotation.y, targetRot, faceW * 0.16);
    });

    for (const c of cars) {
      c.t = (c.t + c.speed * dt) % 1;
      const cp = curve.getPointAt(c.t);
      const cg = curve.getTangentAt(c.t);
      c.g.position.set(cp.x, 0.06 + Math.sin(time * 3 + c.t * 44) * 0.02, cp.z);
      c.g.rotation.y = Math.atan2(cg.x, cg.z);
      c.cone.material.opacity = 0.45 + Math.sin(time * 11 + c.phase) * 0.15;
    }

    for (const pl of palms) {
      pl.g.rotation.z = Math.sin(time * 0.9 + pl.phase) * 0.05;
      pl.g.rotation.y += 0.0003;
    }

    for (const lb of lamps) {
      const f = 0.9 + Math.sin(time * 9 + lb.i * 1.7) * 0.09;
      lb.glow.material.opacity = 0.72 * f;
      lb.pool.material.opacity = 0.85 * f;
    }

    if (!meteor) {
      meteorTimer -= dt;
      if (meteorTimer <= 0) {
        const sp = new THREE.Sprite(new THREE.SpriteMaterial({
          map: radialTexture(0.0, "rgba(255,242,214,1)"),
          transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0,
        }));
        sp.scale.setScalar(2.4);
        const from = new THREE.Vector3(120 + Math.random() * 60, 92 + Math.random() * 36, -330 - Math.random() * 130);
        sp.position.copy(from);
        scene.add(sp);
        meteor = { sp, t0: time, from, to: from.clone().add(new THREE.Vector3(-78, -30, 16)) };
      }
    } else {
      const tt = (time - meteor.t0) / 1.05;
      meteor.sp.position.lerpVectors(meteor.from, meteor.to, Math.min(1, tt));
      meteor.sp.material.opacity = Math.sin(Math.min(1, tt) * Math.PI);
      if (tt >= 1) {
        scene.remove(meteor.sp);
        meteor.sp.material.dispose();
        meteor = null;
        meteorTimer = 8 + Math.random() * 10;
      }
    }

    for (const ff of fireflies) {
      ff.sp.position.y = ff.baseY + Math.sin(time * ff.speed + ff.phase) * 0.4;
      ff.sp.material.opacity = 0.35 + 0.55 * (0.5 + 0.5 * Math.sin(time * (ff.speed + 0.6) + ff.phase * 2.7));
    }

    for (const b of birds) {
      b.g.position.x += b.speed * 0.02;
      b.g.position.y = b.y0 + Math.sin(time * 1.3 + b.phase) * 0.8;
      const flap = Math.sin(time * 9 + b.phase) * 0.7;
      b.l.rotation.z = flap;
      b.r.rotation.z = -flap;
      b.g.rotation.z = 0.25 + Math.sin(time * 1.3 + b.phase) * 0.12;
      if (b.g.position.x > 80) {
        b.g.position.x = -80;
        b.y0 = 8 + Math.random() * 9;
        b.g.position.z = 30 + Math.random() * 90;
        b.g.position.y = b.y0;
      }
    }

    dust.rotation.y = time * 0.05;
    dust.material.opacity = 0.5 + Math.sin(time * 3) * 0.12;
    dust.position.x = Math.sin(time * 0.12) * 2.4;
    dust.position.z = Math.cos(time * 0.09) * 1.6;

    for (const c of clouds) {
      c.g.position.x += c.speed * 0.02;
      if (c.g.position.x > 150) c.g.position.x = -150;
    }
  }

  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  function pick(nx, ny) {
    ndc.set(nx, ny);
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects(pickables.map((p) => p.mesh), false);
    if (!hits.length) return null;
    const hit = hits[0];
    if (hit.distance > 45) return null;
    return pickables[pickables.findIndex((p) => p.mesh === hit.object)];
  }

  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }

  function getCameraPos() {
    return camera.position.clone();
  }

  function render() {
    renderer.render(scene, camera);
  }

  return { render, resize, update, pick, getCameraPos, setHover };
}
