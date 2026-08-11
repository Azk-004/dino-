import * as THREE from "three";
import {
  PAL, radialTexture, groundTexture, asphaltTexture, sidewalkTexture, buildRibbon, buildPanel, buildBuilding,
  buildLamp, buildLampGlow, buildDune, buildRock, buildDust, buildBird,
  buildPalm, buildBush, buildCloud, buildSign, buildMountain, buildBench, buildCar,
  buildTree, buildFlowers, buildBin, buildPigeon, buildContactShadow,
  buildMorrisColumn, buildBusShelter, buildCafeTable, buildBicycle, buildRoadSign, buildHedge,
  buildPerson, buildFountain, buildBillboard, buildKiosk, buildLeaf,
  buildGarland, buildStorefront, buildBus, buildDog, buildBalloons, buildMarketStall,
  buildTrafficLight, buildBollard, buildHydrant, buildMailbox, buildSucette,
  buildPlanterTree, buildLaneArrow,
  buildConifer, buildManhole, buildUtilityPole, buildWire, buildTrafficCone,
  buildPond, buildDuck, buildButterfly,
  setLowPower, isLowPower,
} from "./world.js";

export function createScene(canvas, stations) {
  const isMobile = window.innerWidth <= 760;
  setLowPower(isMobile);
  const rb = (n) => (isMobile ? Math.max(2, Math.round(n * 0.55)) : n);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.75 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.shadowMap.enabled = !isMobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(PAL.skyHorizon, 60, 760);

  const camera = new THREE.PerspectiveCamera(isMobile ? 62 : 52, window.innerWidth / window.innerHeight, 0.1, 900);

  // ---------------- Cycle lumière : aube → jour → crépuscule → nuit ----------------
  // Palettes clés échantillonnées selon l'heure (interpolation lissée, aucune allocation par frame).
  const DAY_CYCLE = [
    { h: 4.0,  night: 1,    top: 0x0b1220, mid: 0x152238, hor: 0x31415e, amb: 0x5f6b8c, hs: 0x43537a, hg: 0x232c40, sun: 0x9db4d8, fog: 0x31415e, sunI: 0.3,  exp: 1.5,  warm: 0 },
    { h: 5.2,  night: 0.85, top: 0x1a2438, mid: 0x2a3550, hor: 0x4a4a5e, amb: 0x6a6e8c, hs: 0x48547a, hg: 0x262c3e, sun: 0xa8b4d0, fog: 0x3a4560, sunI: 0.5,  exp: 1.45, warm: 0.15 },
    { h: 6.2,  night: 0.25, top: 0x8a9cc0, mid: 0xd9b08a, hor: 0xf2c088, amb: 0x9a8a72, hs: 0xe8c8a0, hg: 0x8a6a50, sun: 0xffc878, fog: 0xd8b48a, sunI: 1.4,  exp: 1.2,  warm: 0.9 },
    { h: 7.5,  night: 0.05, top: 0x9fb4d0, mid: 0xe2d6b8, hor: 0xf2e8d0, amb: 0xaca080, hs: 0xf0e4cc, hg: 0xa89a78, sun: 0xffe2b0, fog: 0xf0e4d0, sunI: 1.9,  exp: 1.18, warm: 0.45 },
    { h: 10,   night: 0,    top: 0xa0b6d2, mid: 0xe8ddc0, hor: 0xf6eed6, amb: 0xb3a280, hs: 0xf2e6cc, hg: 0xb8a67e, sun: 0xffedc8, fog: 0xf5ecd6, sunI: 2.2,  exp: 1.15, warm: 0 },
    { h: 14,   night: 0,    top: 0x9fb6cf, mid: 0xe8ddc0, hor: 0xf6eed6, amb: 0xb3a280, hs: 0xf2e6cc, hg: 0xb8a67e, sun: 0xffecc6, fog: 0xf5ecd6, sunI: 2.2,  exp: 1.12, warm: 0 },
    { h: 17,   night: 0,    top: 0x93a6c8, mid: 0xe4d2ac, hor: 0xf0dfbc, amb: 0xa89c80, hs: 0xeedfc2, hg: 0xb0a07c, sun: 0xffdda8, fog: 0xe8dcc0, sunI: 1.9,  exp: 1.18, warm: 0.2 },
    { h: 18.4, night: 0.1,  top: 0x7a8ab4, mid: 0xd9a06a, hor: 0xf0a05a, amb: 0x8e7a68, hs: 0xe0aa78, hg: 0x7a5c46, sun: 0xffae60, fog: 0xd89c68, sunI: 1.3,  exp: 1.25, warm: 1 },
    { h: 19.4, night: 0.55, top: 0x3a4060, mid: 0x7a5468, hor: 0xa0685a, amb: 0x6a5c78, hs: 0x6a5474, hg: 0x34304a, sun: 0xd8a070, fog: 0x745468, sunI: 0.6,  exp: 1.35, warm: 0.7 },
    { h: 20.5, night: 0.85, top: 0x141c30, mid: 0x24304a, hor: 0x3a4460, amb: 0x5a647e, hs: 0x3c4870, hg: 0x1e2434, sun: 0x9db4d8, fog: 0x34405c, sunI: 0.35, exp: 1.45, warm: 0.15 },
    { h: 22,   night: 1,    top: 0x0b1220, mid: 0x152238, hor: 0x31415e, amb: 0x5f6b8c, hs: 0x43537a, hg: 0x232c40, sun: 0x9db4d8, fog: 0x31415e, sunI: 0.3,  exp: 1.5,  warm: 0 },
    { h: 24,   night: 1,    top: 0x0b1220, mid: 0x152238, hor: 0x31415e, amb: 0x5f6b8c, hs: 0x43537a, hg: 0x232c40, sun: 0x9db4d8, fog: 0x31415e, sunI: 0.3,  exp: 1.5,  warm: 0 },
  ].map((k) => ({
    ...k,
    top: new THREE.Color(k.top), mid: new THREE.Color(k.mid), hor: new THREE.Color(k.hor),
    amb: new THREE.Color(k.amb), hs: new THREE.Color(k.hs), hg: new THREE.Color(k.hg),
    sun: new THREE.Color(k.sun), fog: new THREE.Color(k.fog),
  }));

  // Mode d'éclairage : "auto" suit l'heure réelle de la journée, "day"/"night" imposent une heure fixe.
  let timeMode = "auto";
  let hourOverride = null; // pour la vérification : impose une heure précise
  function getHour() {
    if (hourOverride !== null) return hourOverride;
    if (timeMode === "day") return 13;
    if (timeMode === "night") return 1.5;
    const d = new Date();
    return d.getHours() + d.getMinutes() / 60 + d.getSeconds() / 3600;
  }

  // Palette cible + état courant (converge en douceur vers la cible)
  const palTgt = {
    top: new THREE.Color(), mid: new THREE.Color(), hor: new THREE.Color(),
    amb: new THREE.Color(), hs: new THREE.Color(), hg: new THREE.Color(),
    sun: new THREE.Color(), fog: new THREE.Color(),
    night: 0, warm: 0, sunI: 1, exp: 1.25,
  };
  const cur = {
    top: new THREE.Color(), mid: new THREE.Color(), hor: new THREE.Color(),
    amb: new THREE.Color(), hs: new THREE.Color(), hg: new THREE.Color(),
    sun: new THREE.Color(), fog: new THREE.Color(),
    night: 0, warm: 0, sunI: 1, exp: 1.25,
  };
  function sampleDayCycle(hour) {
    let a = DAY_CYCLE[DAY_CYCLE.length - 2];
    let b = DAY_CYCLE[DAY_CYCLE.length - 1];
    let wrap = false;
    for (let i = 0; i < DAY_CYCLE.length - 1; i++) {
      if (hour >= DAY_CYCLE[i].h && hour < DAY_CYCLE[i + 1].h) { a = DAY_CYCLE[i]; b = DAY_CYCLE[i + 1]; wrap = false; break; }
    }
    if (hour < DAY_CYCLE[0].h) { a = DAY_CYCLE[DAY_CYCLE.length - 1]; b = DAY_CYCLE[0]; wrap = true; }
    let k = wrap ? (hour + 24 - a.h) / (b.h + 24 - a.h) : (hour - a.h) / Math.max(1e-6, b.h - a.h);
    k = k < 0 ? 0 : k > 1 ? 1 : k;
    const s = k * k * (3 - 2 * k); // smoothstep
    palTgt.night = a.night + (b.night - a.night) * s;
    palTgt.warm = a.warm + (b.warm - a.warm) * s;
    palTgt.sunI = a.sunI + (b.sunI - a.sunI) * s;
    palTgt.exp = a.exp + (b.exp - a.exp) * s;
    palTgt.top.copy(a.top).lerp(b.top, s);
    palTgt.mid.copy(a.mid).lerp(b.mid, s);
    palTgt.hor.copy(a.hor).lerp(b.hor, s);
    palTgt.amb.copy(a.amb).lerp(b.amb, s);
    palTgt.hs.copy(a.hs).lerp(b.hs, s);
    palTgt.hg.copy(a.hg).lerp(b.hg, s);
    palTgt.sun.copy(a.sun).lerp(b.sun, s);
    palTgt.fog.copy(a.fog).lerp(b.fog, s);
  }
  sampleDayCycle(getHour());
  cur.top.copy(palTgt.top); cur.mid.copy(palTgt.mid); cur.hor.copy(palTgt.hor);
  cur.amb.copy(palTgt.amb); cur.hs.copy(palTgt.hs); cur.hg.copy(palTgt.hg);
  cur.sun.copy(palTgt.sun); cur.fog.copy(palTgt.fog);
  cur.night = palTgt.night; cur.warm = palTgt.warm; cur.sunI = palTgt.sunI; cur.exp = palTgt.exp;

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
      night: { value: 0 },
      topN: { value: new THREE.Color(0x0b1220) },
      midN: { value: new THREE.Color(0x152238) },
      horN: { value: new THREE.Color(0x31415e) },
      moonDir: { value: new THREE.Vector3(0.22, 0.52, -0.83).normalize() },
      moonColor: { value: new THREE.Color(0xd6e2f4) },
      warm: { value: 0 },
    },
    vertexShader: `
      varying vec3 vPos;
      void main() { vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
    `,
    fragmentShader: `
      varying vec3 vPos;
      uniform vec3 top, mid, horizon, sunColor, sunDir, topN, midN, horN, moonDir, moonColor;
      uniform float night;
      uniform float warm;
      float hash(vec3 p) {
        p = fract(p * 0.3183099 + 0.1);
        p *= 17.0;
        return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
      }
      void main() {
        vec3 dir = normalize(vPos);
        float h = clamp(dir.y, 0.0, 1.0);
        // Jour : base dégradée + bande chaude juste au-dessus de l'horizon
        vec3 col = mix(horizon, mid, smoothstep(0.0, 0.12, h));
        col = mix(col, top, smoothstep(0.12, 0.5, h));
        // Aube / crépuscule : la bande chaude s'intensifie près du soleil bas
        float sunset = smoothstep(0.0, 0.05, h) * (1.0 - smoothstep(0.05, 0.16, h));
        col += vec3(0.98, 0.72, 0.42) * sunset * (0.22 + warm * 0.85);
        // Halo doré autour du soleil couchant
        float warmGlow = pow(max(dot(dir, sunDir), 0.0), 5.0);
        col += vec3(1.0, 0.55, 0.25) * warmGlow * warm * 0.28;
        // Nuit : base dégradée bleutée + voile de voie lactée discret
        vec3 colN = mix(horN, midN, smoothstep(0.0, 0.12, h));
        colN = mix(colN, topN, smoothstep(0.12, 0.5, h));
        colN += vec3(0.28, 0.34, 0.5) * smoothstep(0.1, 0.4, h) * 0.05;
        col = mix(col, colN, night);
        float sun = pow(max(dot(dir, sunDir), 0.0), 42.0) * 1.5;
        float halo = pow(max(dot(dir, sunDir), 0.0), 7.0) * 0.4;
        col += sunColor * (sun + halo) * (1.0 - night);
        float moon = pow(max(dot(dir, moonDir), 0.0), 300.0) * 1.4;
        float mHalo = pow(max(dot(dir, moonDir), 0.0), 9.0) * 0.4;
        col += moonColor * (moon + mHalo) * night;
        // Étoiles visibles uniquement la nuit : deux couches (blanches + dorées), scintillement
        float starMask = smoothstep(0.14, 0.3, h);
        float s1 = step(0.9982, hash(dir * 1.7));
        float s2 = step(0.9993, hash(dir * 3.1));
        col += vec3(1.0) * s1 * starMask * night * 0.9;
        col += vec3(1.0, 0.9, 0.72) * s2 * starMask * night * 0.7;
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  });
  scene.add(new THREE.Mesh(new THREE.SphereGeometry(700, isMobile ? 24 : 40, isMobile ? 12 : 20), skyMat));

  // ---------------- Sun (décentré haut-droite : jamais derrière un panneau, aucun éblouissement à la lecture) ----------------
  const sunSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture(0.0, "rgba(244,200,150,0.5)"),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false,
  }));
  sunSprite.position.set(42, 56, -560);
  sunSprite.scale.setScalar(42);
  camera.add(sunSprite);
  // Lune (visible la nuit, s'estompe le jour)
  const moonSprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: radialTexture(0.0, "rgba(214,226,244,0.5)"),
    transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, opacity: 0,
  }));
  moonSprite.position.set(-34, 54, -545);
  moonSprite.scale.setScalar(30);
  camera.add(moonSprite);
  // Plus de grand halo derrière le centre de l'écran : il éblouissait les panneaux en cours de lecture
  scene.add(camera);

  // ---------------- Moon (désactivée en plein jour) ----------------

  // ---------------- Ground ----------------
  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(1600, isMobile ? 32 : 48),
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

  // ---------------- Road + markings (vrai bitume) ----------------
  const rbSamples = isMobile ? 240 : 500;
  const road = buildRibbon(curve, 4.2, PAL.path, asphaltTexture(), rbSamples);
  road.position.y = 0.012;
  scene.add(road);
  // Lignes de rive blanches continues, le long de la vraie géométrie de la route
  const edgeCurves = [1.85, -1.85].map((off) => {
    const pts = [];
    const n = isMobile ? 60 : 120;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const p = curve.getPointAt(t);
      const tg = curve.getTangentAt(t);
      const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
      pts.push(new THREE.Vector3(p.x + perp.x * off, 0, p.z + perp.z * off));
    }
    return new THREE.CatmullRomCurve3(pts, false, "centripetal", 0.6);
  });
  for (const ec of edgeCurves) {
    const edge = buildRibbon(ec, 0.14, PAL.pathEdge, null, rbSamples, true);
    edge.position.y = 0.032;
    scene.add(edge);
  }
  // Double ligne axiale discontinue (jaune), de part et d'autre du fil de progression
  for (let i = 0; i <= rb(84); i++) {
    const t = (i / 84) * 0.96 + 0.02;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    for (const off of [-1.25, 1.25]) {
      const dash = new THREE.Mesh(
        new THREE.BoxGeometry(0.16, 0.03, 1.3),
        new THREE.MeshBasicMaterial({ color: 0xe2bd4a })
      );
      dash.position.set(p.x + perp.x * off, 0.05, p.z + perp.z * off);
      dash.rotation.y = Math.atan2(tg.x, tg.z);
      scene.add(dash);
    }
  }

  // ---------------- Passages piétons (zèbre) ----------------
  const zebraMat = new THREE.MeshBasicMaterial({ color: 0xf2ead2 });
  for (const ct of [0.22, 0.58, 0.86]) {
    const pz = curve.getPointAt(ct);
    const tz = curve.getTangentAt(ct);
    const pzPerp = new THREE.Vector3(-tz.z, 0, tz.x).normalize();
    for (let i = -3; i <= 3; i++) {
      const center = pz.clone().add(tz.clone().multiplyScalar(i * 0.55));
      const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.03, 3.3), zebraMat);
      stripe.position.set(center.x, 0.05, center.z);
      stripe.rotation.y = Math.atan2(pzPerp.x, pzPerp.z);
      scene.add(stripe);
    }
  }

  // ---------------- Flèches directionnelles peintes sur le bitume ----------------
  for (const at of [0.3, 0.55, 0.78]) {
    const p = curve.getPointAt(at);
    const tg = curve.getTangentAt(at);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    for (const off of [-1.1, 1.1]) {
      const pos = p.clone().add(perp.clone().multiplyScalar(off));
      scene.add(buildLaneArrow(pos, Math.atan2(tg.x, tg.z)));
    }
  }

  // ---------------- Sidewalks (dalles claires le long de la route) ----------------
  const sideCurves = [3.55, -3.55].map((off) => {
    const pts = [];
    const n = isMobile ? 60 : 120;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const p = curve.getPointAt(t);
      const tg = curve.getTangentAt(t);
      const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
      pts.push(new THREE.Vector3(p.x + perp.x * off, 0, p.z + perp.z * off));
    }
    return new THREE.CatmullRomCurve3(pts, false, "centripetal", 0.6);
  });
  const curbCurves = [2.42, -2.42].map((off) => {
    const pts = [];
    const n = isMobile ? 60 : 120;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const p = curve.getPointAt(t);
      const tg = curve.getTangentAt(t);
      const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
      pts.push(new THREE.Vector3(p.x + perp.x * off, 0, p.z + perp.z * off));
    }
    return new THREE.CatmullRomCurve3(pts, false, "centripetal", 0.6);
  });
  const sideTex = sidewalkTexture();
  for (const sc of sideCurves) {
    const walk = buildRibbon(sc, 2.2, 0xd3c096, sideTex, rbSamples);
    walk.position.y = 0.015;
    scene.add(walk);
  }
  for (const cc of curbCurves) {
    const curb = buildRibbon(cc, 0.24, 0xb8a475, null, rbSamples);
    curb.position.y = 0.035;
    scene.add(curb);
  }

  // ---------------- Glow progress line ----------------
  const glowTube = new THREE.Mesh(
    new THREE.TubeGeometry(curve, isMobile ? 200 : 400, 0.05, 8, false),
    new THREE.MeshBasicMaterial({
      color: 0xc69a66, transparent: true, opacity: 0.7,
      blending: THREE.NormalBlending, depthWrite: false,
    })
  );
  glowTube.position.y = 0.055;
  scene.add(glowTube);
  const glowIndexCount = glowTube.geometry.index.count;

  // ---------------- Lights (refs pour le mode jour/nuit) ----------------
  const ambientLight = new THREE.AmbientLight(0xb3a280, 0.75);
  scene.add(ambientLight);
  const hemiLight = new THREE.HemisphereLight(0xf2e6cc, 0xb8a67e, 0.5);
  scene.add(hemiLight);
  const sunLight = new THREE.DirectionalLight(0xffedc8, 2.2);
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

  // ---------------- Décor animable (collecté pour la boucle update) ----------------
  const fountains = [];
  const cafeTables = [];
  const kiosks = [];
  const bushes = [];
  const flowers = [];
  const garlands = [];
  const dogs = [];
  const balloonGroups = [];
  const buildings = [];
  const storefronts = [];
  const billboards = [];
  const marketStalls = [];
  const ponds = [];
  const ducks = [];
  const butterflies = [];
  const trafficLights = []; // feux tricolores (cycle rouge → vert → orange)
  // Mode jour/nuit (transition lissée à chaque frame)
  const sunDirTmp = new THREE.Vector3(0.5, 0.3, -0.5);
  const sunDirCur = new THREE.Vector3(0.5, 0.3, -0.5).normalize();
  function placeBush(pos, scale) {
    const g = buildBush(pos, scale);
    bushes.push({ g, phase: Math.random() * Math.PI * 2 });
    scene.add(g);
    return g;
  }
  function placeFlowers(pos, scale, seed) {
    const g = buildFlowers(pos, scale, seed);
    flowers.push({ g, phase: Math.random() * Math.PI * 2 });
    scene.add(g);
    return g;
  }
  stations.forEach((st, i) => {
    const t = 0.02 + ((i + 0.5) / N) * 0.94;
    const side = i % 2 === 0 ? 1 : -1;
    const panel = buildPanel(st, curve, t, side, i);
    panels.push(panel);
    pickables.push({ mesh: panel.front, kind: "panel", index: i });
    scene.add(panel.group);
    // Ombre de contact douce : ancre le panneau au sol
    scene.add(buildContactShadow(panel.group.position, 6.4, 4.2));
    // Fleurs et buissons de part et d'autre de certains panneaux (perpendiculaire à la face)
    if (i % 3 === 0) {
      const latV = new THREE.Vector3(Math.cos(panel.group.rotation.y), 0, -Math.sin(panel.group.rotation.y)).normalize();
      const f1 = panel.group.position.clone().add(latV.clone().multiplyScalar(3.4));
      f1.y = 0;
      placeFlowers(f1, 0.9 + Math.random() * 0.5, i);
      placeBush(panel.group.position.clone().add(latV.clone().multiplyScalar(-3.2)), 0.7 + Math.random() * 0.5);
    }
  });

  // ---------------- City skyline both sides ----------------
  for (let i = 0; i < rb(48); i++) {
    const z = i * 13 + Math.random() * 7;
    const h = 7 + Math.random() * 27;
    const w = 4 + Math.random() * 3.5;
    const d = 4 + Math.random() * 3.5;
    const b1 = buildBuilding(w, h, d, z, -78 - Math.random() * 34);
    const b2 = buildBuilding(w, h * (0.7 + Math.random() * 0.6), d, z, 78 + Math.random() * 34);
    buildings.push(b1, b2);
    scene.add(b1, b2);
  }

  // ---------------- Mountain ridge ----------------
  for (let i = 0; i < rb(14); i++) {
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
  for (let i = 0; i <= rb(14); i++) {
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
  for (let i = 0; i <= rb(13); i++) {
    const t = (i / 13) * 0.96 + 0.02 + 0.035;
    if (t > 0.98) continue;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const side = i % 2 === 0 ? -1 : 1;
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const pos = p.clone().add(perp.clone().multiplyScalar(side * 5.3));
    scene.add(buildBench(pos, side));
    // Fleurs aux pieds des bancs, poubelle de temps en temps
    const flowerPos = p.clone().add(perp.clone().multiplyScalar(side * 4.6));
    placeFlowers(flowerPos, 0.8 + Math.random() * 0.5, i * 3 + 1);
    if (i % 3 === 1) {
      const binPos = p.clone().add(perp.clone().multiplyScalar(side * 6.1));
      scene.add(buildBin(binPos));
    }
  }

  // ---------------- Trees (feuillus) le long du parcours ----------------
  // Écartés de la bande des panneaux de leçon (reculés à ~7,4 m) : feuillage jamais devant le texte.
  const trees = [];
  const panelT = stations.map((s, i) => 0.02 + ((i + 0.5) / N) * 0.94);
  for (let i = 0; i < rb(36); i++) {
    let t = Math.random();
    for (let guard = 0; guard < 8; guard++) {
      t = Math.random();
      // Jamais pile au niveau d'un panneau (côtés confondus, par sécurité)
      if (!panelT.some((tp) => Math.abs(tp - t) < 0.018)) break;
    }
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * (8.5 + Math.random() * 7.5)));
    const tree = buildTree(pos, 0.9 + Math.random() * 0.8);
    trees.push({ g: tree, phase: Math.random() * Math.PI * 2 });
    scene.add(tree);
  }

  // Conifères (sapins) : variété d'essences pour un paysage plus réel
  for (let i = 0; i < rb(14); i++) {
    let t = Math.random();
    for (let guard = 0; guard < 8; guard++) {
      t = Math.random();
      if (!panelT.some((tp) => Math.abs(tp - t) < 0.02)) break;
    }
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * (10 + Math.random() * 9)));
    const con = buildConifer(pos, 0.9 + Math.random() * 0.9);
    trees.push({ g: con, phase: Math.random() * Math.PI * 2 });
    scene.add(con);
  }

  // Bancs supplémentaires, jamais devant un panneau de leçon
  for (let i = 0; i < rb(7); i++) {
    const bt = 0.05 + Math.random() * 0.9;
    if (panelT.some((tp) => Math.abs(tp - bt) < 0.015)) continue;
    const p = curve.getPointAt(bt);
    const tg = curve.getTangentAt(bt);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = i % 2 === 0 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * (5.1 + Math.random() * 0.5)));
    scene.add(buildBench(pos, side));
  }

  // ---------------- Pigeons (qui picorent sur le trottoir) ----------------
  const pigeons = [];
  for (let i = 0; i < rb(12); i++) {
    const t = 0.04 + Math.random() * 0.92;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * (3.1 + Math.random() * 0.9)));
    const pg = buildPigeon();
    pg.position.set(pos.x, 0, pos.z);
    pigeons.push({
      g: pg, phase: Math.random() * Math.PI * 2, x0: pos.x, z0: pos.z,
      fx: perp.x * side, fz: perp.z * side,
      state: 0, timer: 0, idx: i,
    });
    pickables.push({ mesh: pg.userData.body, kind: "pigeon", index: i });
    scene.add(pg);
  }

  // ---------------- Morris columns (publicité classique) ----------------
  const morrisT = isMobile ? [0.14, 0.46] : [0.14, 0.46, 0.82];
  morrisT.forEach((t, i) => {
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = i % 2 === 0 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * 5.15));
    const angle = Math.atan2(perp.x, perp.z) + (side > 0 ? 0 : Math.PI);
    const col = buildMorrisColumn(pos, angle, i === 1 ? ["RÈGLES", "D'AFFICHAGE"] : undefined);
    pickables.push({ mesh: col.userData.body, kind: "morris", tip: "Colonne Morris — l'affichage classique du mobilier urbain publicitaire." });
    scene.add(col);
    scene.add(buildContactShadow(pos, 2.0, 2.0));
    scene.add(buildHedge(pos.clone().add(perp.clone().multiplyScalar(side * -1.6)), 2.2, 0.55));
  });

  // ---------------- Bus shelters (abribus publicitaires) ----------------
  const shelterT = isMobile ? [0.24] : [0.24, 0.62];
  shelterT.forEach((t, i) => {
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = i % 2 === 0 ? -1 : 1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * 5.5));
    const sh = buildBusShelter(pos, side);
    pickables.push({ mesh: sh.userData.poster, kind: "shelter", tip: "Abribus — le mobilier qui allie transport et communication." });
    scene.add(sh);
    scene.add(buildContactShadow(pos, 4.6, 2.6));
  });

  // ---------------- Café tables (bistrot avec parasol) ----------------
  const cafeT = isMobile ? [0.19, 0.85] : [0.12, 0.28, 0.45, 0.6, 0.76, 0.9];
  cafeT.forEach((t, i) => {
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = i % 2 === 0 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * 6.4));
    const rot = Math.atan2(tg.x, tg.z) + (side > 0 ? Math.PI : 0);
    const colors = [0xc9a87c, 0x8faa7d, 0xd2a678];
    const cafe = buildCafeTable(pos, colors[i % colors.length], rot);
    cafeTables.push({ g: cafe, phase: Math.random() * Math.PI * 2 });
    scene.add(cafe);
  });

  // ---------------- Bicycles (vélos stationnés près des bancs) ----------------
  for (let i = 0; i < rb(8); i++) {
    const t = 0.06 + Math.random() * 0.88;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * (5.9 + Math.random() * 1.4)));
    scene.add(buildBicycle(pos, Math.random() * Math.PI * 2));
  }

  // ---------------- Guirlandes de fanions (au-dessus de la rue) ----------------
  const garlandT = isMobile ? [0.28, 0.72] : [0.18, 0.5, 0.8];
  garlandT.forEach((t) => {
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const a = p.clone().add(perp.clone().multiplyScalar(3.9));
    const b = p.clone().add(perp.clone().multiplyScalar(-3.9));
    a.y = 5.3; b.y = 5.3;
    const gar = buildGarland(a, b);
    garlands.push({ g: gar, phase: Math.random() * Math.PI * 2 });
    scene.add(gar);
  });

  // ---------------- Boutiques de quartier (deuxième rangée, auvents rayés) ----------------
  const SHOP_DEFS = [
    { color: 0xc98f6a, label: "BOULANGERIE" },
    { color: 0x7d9a68, label: "PHARMACIE" },
    { color: 0x8a9ab8, label: "LIBRAIRIE" },
    { color: 0xcfa574, label: "CAFÉ DU PARC" },
  ];
  const shopT = isMobile ? [0.15, 0.42, 0.72] : [0.15, 0.38, 0.6, 0.84];
  shopT.forEach((t, i) => {
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const pos = p.clone().add(perp.clone().multiplyScalar(-1 * (11 + (i % 2) * 2.4)));
    const angle = Math.atan2(perp.x, perp.z);
    const shop = buildStorefront(pos, angle, SHOP_DEFS[i % SHOP_DEFS.length].color, SHOP_DEFS[i % SHOP_DEFS.length].label);
    storefronts.push(shop);
    scene.add(shop);
    scene.add(buildContactShadow(pos, 5.4, 3.2));
  });

  // ---------------- Road signs (petite signalisation urbaine) ----------------
  const roadT = [0.32, 0.7];
  roadT.forEach((t, i) => {
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = i % 2 === 0 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * 2.8));
    scene.add(buildRoadSign(pos, Math.atan2(tg.x, tg.z), i === 0 ? "D" : "A"));
  });

  // ---------------- Hedges (haies basses au bord du trottoir, hors des plinthes) ----------------
  for (let i = 0; i < rb(8); i++) {
    const t = 0.08 + Math.random() * 0.84;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * (4.55 + Math.random() * 0.4)));
    scene.add(buildHedge(pos, 1.5 + Math.random() * 1.2, 0.5 + Math.random() * 0.3));
  }

  // ---------------- Big billboards 4x3 (grands panneaux publicitaires, très visibles) ----------------
  const BILLBOARDS = [
    { t: 0.09, side: -1, lines: ["RÉCLAMEZ", "VOTRE VILLE"] },
    { t: 0.36, side: 1, lines: ["ESPACE", "PUBLICITAIRE"] },
    { t: 0.62, side: -1, lines: ["MOBILIER", "URBAIN"] },
    { t: 0.88, side: 1, lines: ["ZONAGE", "RÉGULÉ"] },
  ];
  BILLBOARDS.forEach((b) => {
    const p = curve.getPointAt(b.t);
    const tg = curve.getTangentAt(b.t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const pos = p.clone().add(perp.clone().multiplyScalar(b.side * 7.6));
    // Le panneau regarde la route : le signe doit être À L'INTÉRIEUR de l'atan2
    const angle = Math.atan2(-perp.x * b.side, -perp.z * b.side);
    const bb = buildBillboard(pos, angle, b.lines);
    billboards.push(bb);
    pickables.push({ mesh: bb.userData.face, kind: "billboard", tip: "Grand format 4×3 — un panneau publicitaire soumis au zonage." });
    scene.add(bb);
    scene.add(buildContactShadow(pos, 6.4, 4.0));
    // Buissons derrière le panneau (côté champ), pas du côté route où sont les panneaux de leçon
    placeBush(pos.clone().add(perp.clone().multiplyScalar(b.side * 2.3)), 0.8);
    placeBush(pos.clone().add(perp.clone().multiplyScalar(b.side * 2.8)), 0.7);
  });

  // ---------------- Fountain (place centrale) ----------------
  {
    const t = 0.33;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const pos = p.clone().add(perp.clone().multiplyScalar(-11));
    const fountain = buildFountain();
    fountain.position.copy(pos);
    // Gouttelettes de la fontaine (nuée de points qui monte et retombe)
    const nDrops = isMobile ? 26 : 60;
    const dropPos = new Float32Array(nDrops * 3);
    const dropMat = new THREE.PointsMaterial({
      color: 0xcfe8ec, size: 0.09, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    const dropGeo = new THREE.BufferGeometry();
    dropGeo.setAttribute("position", new THREE.BufferAttribute(dropPos, 3));
    const drops = new THREE.Points(dropGeo, dropMat);
    fountain.add(drops);
    fountains.push({
      g: fountain, phase: 0, splash: 0, drops, nDrops,
      life: new Float32Array(nDrops).fill(0),
      vx: new Float32Array(nDrops), vy: new Float32Array(nDrops), vz: new Float32Array(nDrops),
    });
    pickables.push({ mesh: fountain.userData.pool, kind: "fountain", index: 0, tip: "Fontaine publique — l'embellissement du cadre de vie." });
    scene.add(fountain);
    scene.add(buildContactShadow(pos, 4.6, 4.6));
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + 0.4;
      const bpos = pos.clone().add(new THREE.Vector3(Math.cos(a) * 2.7, 0, Math.sin(a) * 2.7));
      scene.add(buildBench(bpos, 1));
      placeFlowers(bpos.clone().add(new THREE.Vector3(0.6, 0, 0)), 0.8, i);
    }
    scene.add(buildTree(pos.clone().add(new THREE.Vector3(-3.4, 0, 1.4)), 1.3));
    scene.add(buildTree(pos.clone().add(new THREE.Vector3(3.2, 0, -1.2)), 1.2));
    // Étal de marché (enseigne qui s'illumine la nuit)
    const stallPos = pos.clone().add(new THREE.Vector3(3.9, 0, -3.4));
    const stall = buildMarketStall(stallPos, Math.atan2(tg.x, tg.z) + Math.PI);
    marketStalls.push(stall);
    pickables.push({ mesh: stall.userData.sign, kind: "stall", tip: "Étal de marché — un commerce de proximité sur la place." });
    scene.add(stall);
    scene.add(buildContactShadow(stallPos, 2.6, 1.4));
  }

  // ---------------- Étang du parc (canards, nénuphars, arbres) ----------------
  {
    const t = 0.33;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const pondPos = p.clone().add(perp.clone().multiplyScalar(11.6)).add(tg.clone().multiplyScalar(3));
    const pond = buildPond(pondPos);
    ponds.push(pond);
    scene.add(pond.g);
    // Canards qui glissent à la surface
    for (let i = 0; i < rb(3); i++) {
      const duck = buildDuck(pondPos);
      ducks.push({ g: duck.g, head: duck.head, tail: duck.tail, a: (i / 3) * Math.PI * 2 + Math.random(), r: 0.6 + Math.random() * 2.4, sp: 0.35 + Math.random() * 0.4, ph: Math.random() * Math.PI * 2 });
      scene.add(duck.g);
    }
    // Arbres autour de l'étang
    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2 + 0.4;
      const tr = pondPos.clone().add(new THREE.Vector3(Math.cos(a) * 5.4, 0, Math.sin(a) * 5.4));
      const tree = buildTree(tr, 0.9 + Math.random() * 0.7);
      trees.push({ g: tree, phase: Math.random() * Math.PI * 2 });
      scene.add(tree);
    }
    scene.add(buildBench(pondPos.clone().add(new THREE.Vector3(4.6, 0, 1.4)), 1));
    scene.add(buildBench(pondPos.clone().add(new THREE.Vector3(-4.4, 0, -1.6)), -1));
  }

  // ---------------- Papillons (voletent au-dessus des fleurs) ----------------
  {
    const FLOWER_SPOTS = [
      { t: 0.06, off: 4.8, side: 1 },
      { t: 0.18, off: 5.2, side: -1 },
      { t: 0.33, off: -11, side: -1 },  // place de la fontaine
      { t: 0.46, off: 6.0, side: 1 },
      { t: 0.62, off: 5.6, side: -1 },
      { t: 0.78, off: 6.2, side: 1 },
    ];
    const spots = isMobile ? FLOWER_SPOTS.slice(0, 3) : FLOWER_SPOTS;
    spots.forEach((s, i) => {
      const p = curve.getPointAt(s.t);
      const tg = curve.getTangentAt(s.t);
      const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
      const base = p.clone().add(perp.clone().multiplyScalar(s.side * s.off));
      for (let k = 0; k < 2; k++) {
        const bf = buildButterfly(base.clone().add(new THREE.Vector3((Math.random() - 0.5) * 2, 1.4 + Math.random() * 0.8, (Math.random() - 0.5) * 2)));
        butterflies.push({ g: bf.g, lw: bf.lw, rw: bf.rw, base: base.clone(), ph: Math.random() * Math.PI * 2, amp: 0.7 + Math.random() * 0.9 });
        scene.add(bf.g);
      }
    });
  }

  // ---------------- Kiosque de presse ----------------
  {
    const t = 0.585;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const pos = p.clone().add(perp.clone().multiplyScalar(-6.2));
    const angle = Math.atan2(perp.x, perp.z);
    const kiosk = buildKiosk(pos, angle);
    kiosks.push({ g: kiosk, phase: 0 });
    pickables.push({ mesh: kiosk.userData.sign, kind: "kiosk", tip: "Kiosque — un point de vente au cœur de la ville." });
    scene.add(kiosk);
    scene.add(buildContactShadow(pos, 3.0, 2.6));
    scene.add(buildHedge(pos.clone().add(new THREE.Vector3(2.4, 0, 0)), 1.6, 0.5));
    // Ballons colorés à côté du kiosque (petite danse dans l'air)
    const balloons = buildBalloons(pos.clone().add(new THREE.Vector3(1.5, 0, 1.0)));
    balloonGroups.push({ g: balloons, phase: Math.random() * Math.PI * 2, state: 0, timer: 0 });
    balloons.userData.balloons.forEach((b) => pickables.push({ mesh: b, kind: "balloon", tip: "Les ballons s'envolent vers le ciel !" }));
    scene.add(balloons);
  }

  // ---------------- Enrichissement urbain : feux, bornes, sucettes, stationnement ----------------
  const midOf = (a, b) => 0.5 * (panelT[a] + panelT[b]);

  // Feux tricolores + feux piétons aux trois passages piétons
  // Feux tricolores : on garde une référence à chaque feu pour animer le cycle
  // rouge → vert → orange (décalé dans le temps pour ne pas être synchronisés).
  for (const lt of [0.22, 0.58, 0.86]) {
    const p = curve.getPointAt(lt);
    const tg = curve.getTangentAt(lt);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * 2.9));
    const dir = new THREE.Vector3().subVectors(p, pos).normalize();
    const tl = buildTrafficLight(pos, Math.atan2(dir.x, dir.z));
    scene.add(tl);
    trafficLights.push({ g: tl, phase: Math.random() * 10 });
  }

  // Bornes anti-stationnement le long des trottoirs
  const bornes = isMobile ? 4 : 8;
  for (let i = 0; i < bornes; i++) {
    const t = 0.05 + (i / bornes) * 0.9;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = i % 2 === 0 ? 1 : -1;
    scene.add(buildBollard(p.clone().add(perp.clone().multiplyScalar(side * 2.6))));
  }

  // Bouches d'incendie et boîtes aux lettres
  const hydrantCount = isMobile ? 1 : 3;
  for (let i = 0; i < hydrantCount; i++) {
    const t = 0.14 + (i / hydrantCount) * 0.6;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = i % 2 === 0 ? 1 : -1;
    scene.add(buildHydrant(p.clone().add(perp.clone().multiplyScalar(side * 2.85))));
  }
  const mailboxCount = isMobile ? 1 : 2;
  for (let i = 0; i < mailboxCount; i++) {
    const t = 0.24 + i * 0.3;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = i % 2 === 0 ? -1 : 1;
    scene.add(buildMailbox(p.clone().add(perp.clone().multiplyScalar(side * 2.95))));
  }

  // Sucettes publicitaires (affichage libre-service, thème panneautique)
  const sucetteT = isMobile ? [0.32, 0.74] : [0.08, 0.32, 0.55, 0.78];
  sucetteT.forEach((t, i) => {
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = i % 2 === 0 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * 6.9));
    const lines = i % 2 === 0 ? ["ESPACE", "PUBLICITAIRE"] : ["MOBILIER", "URBAIN"];
    const sc = buildSucette(pos, Math.atan2(perp.x, perp.z) + (side > 0 ? 0 : Math.PI), lines);
    pickables.push({ mesh: sc.userData.front, kind: "sucette", tip: "Sucette d'affichage — un petit format encadré par la réglementation." });
    scene.add(sc);
    scene.add(buildContactShadow(pos, 1.6, 2.2));
  });

  // Arbres en bac le long du trottoir (toujours à mi-chemin des panneaux : jamais devant)
  const planterT = isMobile ? [midOf(1, 2), midOf(8, 9)] : [midOf(1, 2), midOf(3, 4), midOf(6, 7), midOf(9, 10)];
  planterT.forEach((t, i) => {
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = i % 2 === 0 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * 4.55));
    scene.add(buildPlanterTree(pos, 0.9 + (i % 3) * 0.15));
  });

  // Voitures stationnées le long de la chaussée (à mi-chemin des panneaux), les deux côtés
  const parkedT = isMobile ? [midOf(7, 8)] : [midOf(1, 2), midOf(3, 4), midOf(5, 6), midOf(7, 8), midOf(9, 10), midOf(11, 12)];
  parkedT.forEach((t, i) => {
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = i % 2 === 0 ? 1 : -1;
    const car = buildCar();
    car.cone.material.opacity = 0;
    car.group.position.set(p.x + perp.x * side * 1.7, 0, p.z + perp.z * side * 1.7);
    car.group.rotation.y = Math.atan2(tg.x, tg.z);
    scene.add(car.group);
  });

  // Poteaux électriques + fils qui traversent la rue (réalisme urbain)
  for (const wt of [0.13, 0.45, 0.75]) {
    const p = curve.getPointAt(wt);
    const tg = curve.getTangentAt(wt);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const a = p.clone().add(perp.clone().multiplyScalar(4.9));
    const b = p.clone().add(perp.clone().multiplyScalar(-4.9));
    scene.add(buildUtilityPole(a));
    scene.add(buildUtilityPole(b));
    a.y = 6.35; b.y = 6.35;
    scene.add(buildWire(a, b, 0.55));
    scene.add(buildWire(a.clone().add(new THREE.Vector3(0.14, -0.22, 0)), b.clone().add(new THREE.Vector3(-0.14, -0.22, 0)), 0.45));
  }

  // Regards en fonte et grilles d'évacuation sur le bitume (détails réalistes)
  // Bandes de roulement (±0,6) : libres de tout marquage (double ligne à ±1,25, rive à ±1,85)
  for (const [mt, moff, mkind] of [[0.1, 0.6, 0], [0.33, -0.6, 0], [0.49, 0.6, 1], [0.65, -0.6, 0], [0.8, 0.6, 1], [0.93, -0.6, 0]]) {
    const p = curve.getPointAt(mt);
    const tg = curve.getTangentAt(mt);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    scene.add(buildManhole(p.clone().add(perp.clone().multiplyScalar(moff)), mkind, Math.atan2(tg.x, tg.z)));
  }
  // Grilles d'évacuation sur les trottoirs
  for (const gt of [0.31, 0.71]) {
    const p = curve.getPointAt(gt);
    const tg = curve.getTangentAt(gt);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    scene.add(buildManhole(p.clone().add(perp.clone().multiplyScalar(side * 3.1)), 1, Math.atan2(tg.x, tg.z)));
  }

  // Cônes de chantier près du passage piéton
  {
    const t = 0.24;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    [1.6, 2.0, -1.6].forEach((o, k) => {
      const pos = p.clone().add(perp.clone().multiplyScalar(o)).add(tg.clone().multiplyScalar(k === 2 ? -0.5 : 0.6));
      scene.add(buildTrafficCone(pos));
    });
  }

  // Second étal de marché (fleurs & fruits) à l'opposé de la fontaine
  {
    const t = 0.82;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const pos = p.clone().add(perp.clone().multiplyScalar(11.6));
    const stall2 = buildMarketStall(pos, Math.atan2(-perp.x, -perp.z), 0x8faa7d);
    marketStalls.push(stall2);
    pickables.push({ mesh: stall2.userData.sign, kind: "stall", tip: "Étal de marché — un commerce de proximité sur la place." });
    scene.add(stall2);
    scene.add(buildContactShadow(pos, 2.6, 1.4));
  }

  // ---------------- Passants animés (marchent le long des trottoirs) ----------------
  const walkers = [];
  const WALKER_COUNT = isMobile ? 10 : 20;
  const KID_COUNT = isMobile ? 1 : 3;
  for (let i = 0; i < WALKER_COUNT; i++) {
    const isKid = i < KID_COUNT;
    const person = buildPerson();
    if (isKid) person.g.scale.setScalar(0.72);
    const dir = Math.random() > 0.5 ? 1 : -1;
    const side = Math.random() > 0.5 ? 1 : -1;
    walkers.push({
      g: person.g,
      legL: person.legL, legR: person.legR, kneeL: person.kneeL, kneeR: person.kneeR,
      armL: person.armL, armR: person.armR, elbowL: person.elbowL, elbowR: person.elbowR,
      lean: person.lean,
      t: 0.02 + Math.random() * 0.96,
      speed: (isKid ? 0.009 : 0.004 + Math.random() * 0.005) * dir,
      side, off: 3.0 + Math.random() * 0.9, phase: person.phase,
      step: 0,
    });
    scene.add(person.g);
  }

  // ---------------- Chiens qui trottinent sur le trottoir ----------------
  for (let i = 0; i < (isMobile ? 1 : 3); i++) {
    const dog = buildDog();
    const dir = Math.random() > 0.5 ? 1 : -1;
    const side = Math.random() > 0.5 ? 1 : -1;
    dogs.push({
      g: dog, t: 0.08 + Math.random() * 0.84,
      speed: (0.006 + Math.random() * 0.004) * dir,
      side, off: 3.4 + Math.random() * 0.9,
      phase: Math.random() * Math.PI * 2, step: 0,
    });
    scene.add(dog);
  }

  // ---------------- Dunes & rocks ----------------
  for (let i = 0; i < rb(38); i++) {
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
  for (let i = 0; i < rb(30); i++) {
    const t = Math.random();
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * (9 + Math.random() * 8)));
    const palm = buildPalm(pos, 0.8 + Math.random() * 0.8);
    palms.push({ g: palm, phase: Math.random() * Math.PI * 2 });
    scene.add(palm);
  }
  for (let i = 0; i < rb(66); i++) {
    let t = Math.random();
    // Jamais devant un panneau de leçon (ils sont reculés à ~7,4 m)
    for (let guard = 0; guard < 8; guard++) {
      t = Math.random();
      if (!panelT.some((tp) => Math.abs(tp - t) < 0.012)) break;
    }
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * (5.8 + Math.random() * 3.4)));
    placeBush(pos, 0.5 + Math.random() * 0.8);
    if (Math.random() < 0.35) {
      const fpos = p.clone().add(perp.clone().multiplyScalar(side * (6.2 + Math.random() * 1.6)));
      placeFlowers(fpos, 0.7 + Math.random() * 0.5, (i * 7) % 9);
    }
  }

  // ---------------- Clouds (drifting) ----------------
  const clouds = [];
  for (let i = 0; i < rb(17); i++) {
    const cld = buildCloud(
      new THREE.Vector3((Math.random() - 0.5) * 130, 30 + Math.random() * 20, Math.random() * 440),
      1.4 + Math.random() * 2.6
    );
    clouds.push({ g: cld, speed: 0.5 + Math.random() * 0.8, phase: Math.random() * Math.PI * 2, y0: cld.position.y, s0: cld.scale.x });
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
  const dust = buildDust(isMobile ? 180 : 420);
  scene.add(dust);

  // ---------------- Lucioles nocturnes (scintillement doux la nuit) ----------------
  const ffPhase = Math.random() * Math.PI * 2;
  const FF_N = isMobile ? 60 : 130;
  const ffPos = new Float32Array(FF_N * 3);
  for (let i = 0; i < FF_N; i++) {
    const ft = Math.random();
    const fp = curve.getPointAt(ft);
    const ftg = curve.getTangentAt(ft);
    const fpe = new THREE.Vector3(-ftg.z, 0, ftg.x).normalize();
    const fs = Math.random() > 0.5 ? 1 : -1;
    const fo = 2.6 + Math.random() * 8;
    ffPos[i * 3] = fp.x + fpe.x * fs * fo;
    ffPos[i * 3 + 1] = 0.35 + Math.random() * 2.6;
    ffPos[i * 3 + 2] = fp.z + fpe.z * fs * fo;
  }
  const ffGeo = new THREE.BufferGeometry();
  ffGeo.setAttribute("position", new THREE.BufferAttribute(ffPos, 3));
  const ffMat = new THREE.PointsMaterial({
    color: 0xf6e3a8,
    size: isLowPower() ? 0.1 : 0.13,
    transparent: true,
    opacity: 0,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    sizeAttenuation: true,
  });
  const ffPoints = new THREE.Points(ffGeo, ffMat);
  scene.add(ffPoints);

  // ---------------- Feuilles portées par le vent (animation ambiante) ----------------
  const leaves = [];
  for (let i = 0; i < rb(30); i++) {
    const leaf = buildLeaf();
    const lt = Math.random();
    const lp = curve.getPointAt(lt);
    const ltg = curve.getTangentAt(lt);
    const lpe = new THREE.Vector3(-ltg.z, 0, ltg.x).normalize();
    const ls = Math.random() > 0.5 ? 1 : -1;
    const lx = lp.x + lpe.x * ls * (2 + Math.random() * 7);
    const ly = 0.4 + Math.random() * 4;
    const lz = lp.z + lpe.z * ls * (2 + Math.random() * 7);
    leaf.position.set(lx, ly, lz);
    leaves.push({
      g: leaf, x: lx, y: ly, z: lz,
      vx: (Math.random() - 0.5) * 2.2,
      vz: -(0.8 + Math.random() * 1.4),
      vy: -(0.3 + Math.random() * 0.4),
      spin: (Math.random() - 0.5) * 4,
      phase: Math.random() * Math.PI * 2,
    });
    scene.add(leaf);
  }

  // ---------------- Birds ----------------
  const birds = [];
  for (let i = 0; i < rb(9); i++) {
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
  for (let i = 0; i < rb(7); i++) {
    const car = buildCar();
    cars.push({ g: car.group, cone: car.cone, body: car.body, beamY: 0.55, t: i / 7, speed: 0.02 + Math.random() * 0.014, phase: Math.random() * Math.PI * 2 });
    scene.add(car.group);
  }

  // ---------------- Bus (transports en commun) ----------------
  const buses = [];
  for (let i = 0; i < (isMobile ? 1 : 2); i++) {
    const bus = buildBus();
    buses.push({ g: bus.group, cone: bus.cone, body: bus.body, beamY: 1.05, t: 0.2 + i * 0.5, speed: 0.014 + Math.random() * 0.004, phase: Math.random() * Math.PI * 2 });
    scene.add(bus.group);
  }
  const traffic = cars.concat(buses);

  // Faisceaux de phares réactifs : s'allument au survol (et la nuit), flash au clic.
  // Cône léger attaché au véhicule : il suit le déplacement sans coût de recalcule.
  for (const c of traffic) {
    const beamGeo = new THREE.ConeGeometry(1.15, 5.4, 14, 1, true);
    const beamMat = new THREE.MeshBasicMaterial({
      color: 0xfff0c8, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide,
    });
    c.beam = new THREE.Mesh(beamGeo, beamMat);
    c.beam.rotation.x = -Math.PI / 2; // pointe vers l'avant (+Z local)
    c.beam.position.set(0, c.beamY, 3.6);
    c.g.add(c.beam);
    c.flash = 0;
  }
  traffic.forEach((c, i) => pickables.push({ mesh: c.body, kind: "car", index: i }));

  // ---------------- State ----------------
  const camTarget = new THREE.Vector3();
  const camLook = new THREE.Vector3();
  const tmpPerp = new THREE.Vector3();
  const camVel = new THREE.Vector3();
  let lastTime = performance.now() * 0.001;
  let hover = null;
  let meteor = null;
  // Plein jour : plus de météores
  let meteorTimer = Infinity;
  let camPrevAngle = 0;

  function setHover(h) { hover = h && h.kind ? h : null; }

  // Action ponctuelle au clic : fait réagir l'élément désigné par le picking
  function interact(action) {
    if (!action || !action.kind) return;
    if (action.kind === "pigeon") {
      const pg = pigeons[action.index];
      if (pg && pg.state === 0) { pg.state = 1; pg.timer = 0; }
    } else if (action.kind === "balloon") {
      for (const bg of balloonGroups) if (bg.state === 0) { bg.state = 1; bg.timer = 0; }
    } else if (action.kind === "fountain") {
      const f = fountains[action.index];
      if (f) f.splash = 1;
    } else if (action.kind === "car") {
      const c = traffic[action.index];
      if (c) c.flash = 1;
    }
  }

  function update(progress, activeIndex) {
    const time = performance.now() * 0.001;
    const dt = Math.min(0.05, Math.max(0.001, time - lastTime));
    lastTime = time;
    const t = 0.005 + progress * 0.98;

    // ---- Cycle de lumière : aube → jour → crépuscule → nuit (transition lissée) ----
    const hour = getHour();
    sampleDayCycle(hour);
    const lerpRate = Math.min(1, dt * 1.6);
    cur.top.lerp(palTgt.top, lerpRate);
    cur.mid.lerp(palTgt.mid, lerpRate);
    cur.hor.lerp(palTgt.hor, lerpRate);
    cur.amb.lerp(palTgt.amb, lerpRate);
    cur.hs.lerp(palTgt.hs, lerpRate);
    cur.hg.lerp(palTgt.hg, lerpRate);
    cur.sun.lerp(palTgt.sun, lerpRate);
    cur.fog.lerp(palTgt.fog, lerpRate);
    cur.night += (palTgt.night - cur.night) * lerpRate;
    cur.warm += (palTgt.warm - cur.warm) * lerpRate;
    cur.sunI += (palTgt.sunI - cur.sunI) * lerpRate;
    cur.exp += (palTgt.exp - cur.exp) * lerpRate;
    const n = cur.night;
    skyMat.uniforms.night.value = n;
    skyMat.uniforms.warm.value = cur.warm;
    skyMat.uniforms.top.value.copy(cur.top);
    skyMat.uniforms.mid.value.copy(cur.mid);
    skyMat.uniforms.horizon.value.copy(cur.hor);
    skyMat.uniforms.sunColor.value.copy(cur.sun);
    // Soleil : arc dans le ciel selon l'heure (aube à l'horizon, zénith à midi, couchant en fin de journée)
    const sunAz = ((hour - 6.2) / 13.8) * Math.PI;
    const sunAlt = Math.max(0, Math.sin(sunAz));
    sunDirTmp.set(Math.sin(sunAz) * 0.55, sunAlt * 0.95 + 0.08, -Math.cos(sunAz) * 0.55);
    sunDirCur.lerp(sunDirTmp, lerpRate).normalize();
    skyMat.uniforms.sunDir.value.copy(sunDirCur);
    renderer.toneMappingExposure = THREE.MathUtils.lerp(renderer.toneMappingExposure, cur.exp, Math.min(1, dt * 2));
    // Lumières du ciel : suivent la palette du moment
    ambientLight.color.copy(cur.amb);
    ambientLight.intensity = 0.75 * (1 - n) + 0.4 * n;
    hemiLight.color.copy(cur.hs);
    hemiLight.groundColor.copy(cur.hg);
    hemiLight.intensity = 0.5 * (1 - n) + 0.45 * n;
    sunLight.color.copy(cur.sun);
    sunLight.intensity = 2.2 * cur.sunI * (1 - n) + 0.3 * n;
    // La nuit, plus d'ombres portées : économie du rendu de la shadow map (2048²)
    if ((n < 0.5) !== sunLight.castShadow) sunLight.castShadow = n < 0.5;
    scene.fog.color.copy(cur.fog);
    // Le soleil et la lune suivent l'arc du jour dans le ciel
    sunSprite.position.copy(sunDirCur).multiplyScalar(560);
    sunSprite.scale.setScalar(26 + sunAlt * 26);
    moonSprite.position.copy(sunDirCur).multiplyScalar(-560);
    sunSprite.material.opacity = (1 - n) * (0.35 + sunAlt * 0.65);
    moonSprite.material.opacity = n;

    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const look = curve.getPointAt(Math.min(t + 0.045, 0.999));
    tmpPerp.set(-tg.z, 0, tg.x).normalize();

    const bob = Math.sin(time * 0.7) * 0.07;
    const sway = Math.sin(time * 0.25) * 0.18;
    camTarget.set(p.x + tmpPerp.x * sway, p.y + 3.45 + bob, p.z + tmpPerp.z * sway);

    // Cadrage doux du prochain panneau : on le voit bien à distance, mais le regard
    // se recentre sur la route à l'approche (le scroll ne « rentre » jamais dans le panneau).
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
      const w = THREE.MathUtils.clamp(1 - best / 0.06, 0, 1);
      if (w > 0) {
        const pp = panels[frameIdx].group.position;
        const relX = pp.x - camera.position.x;
        const relZ = pp.z - camera.position.z;
        // Ne cadre que les panneaux encore devant la caméra (jamais ceux déjà dépassés)
        const inFront = relX * tg.x + relZ * tg.z > 0;
        // Relâche progressivement à l'approche : regard recentré sur la route
        const distP = Math.hypot(relX, relZ);
        const release = THREE.MathUtils.clamp((distP - 9) / 10, 0, 1);
        const sw = w * w * (3 - 2 * w) * (inFront ? 1 : 0) * release;
        if (sw > 0) {
          camLook.lerp(new THREE.Vector3(pp.x, pp.y + 2.8, pp.z), sw * 0.30);
        }
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
      const hovered = hover && hover.kind === "panel" && hover.index === i;
      const near = Math.abs(progress - (0.02 + ((i + 0.5) / N) * 0.94)) < 0.06;
      // Panneaux légèrement plus compacts et reculés : présents mais jamais envahissants
      const targetScale = isActive ? 0.96 : hovered ? 1.04 : 0.78;
      // En plein jour, les faces sont mates : aucune émission pour éviter le reflet
      const targetLight = hovered ? 0.18 : isActive ? 0.12 : near ? 0.04 : 0;
      const lerpRate = hovered ? 0.12 : 0.08;
      pl.group.scale.setScalar(THREE.MathUtils.lerp(pl.group.scale.x, targetScale, lerpRate));
      if (pl.light) {
        // La nuit, un léger éclairage chaud garde le panneau lisible
        pl.light.intensity = THREE.MathUtils.lerp(pl.light.intensity, targetLight + n * 0.55, lerpRate);
      }
      pl.group.position.y = THREE.MathUtils.lerp(pl.group.position.y, isActive ? 0.22 : 0, 0.06);
      pl.beaconMat.emissiveIntensity = (0.22 + Math.sin(time * 2.4 + i) * 0.1) * (1 - n) + (1.3 + Math.sin(time * 2.4 + i) * 0.3) * n;
      pl.frontMat.emissiveIntensity = THREE.MathUtils.lerp(pl.frontMat.emissiveIntensity, n * 0.3, 0.06);

      // Le panneau se tourne vers la caméra à l'approche, puis revient vers la route
      // une fois dépassé (plus d'impression de « rentrer » dans le panneau).
      const dx = camera.position.x - pl.group.position.x;
      const dz = camera.position.z - pl.group.position.z;
      const dist = Math.hypot(dx, dz);
      const inFront = dx * tg.x + dz * tg.z < 0;
      const faceW = THREE.MathUtils.clamp(1 - dist / 32, 0, 1) * (inFront ? 1 : 0);
      const targetRot = inFront ? Math.atan2(dx, dz) : pl.restRot;
      // Taux nul à distance (les panneaux lointains ne suivent pas la caméra) ;
      // retour doux vers la route une fois dépassé.
      const rate = inFront ? faceW * 0.14 : 0.02;
      pl.group.rotation.y = THREE.MathUtils.lerp(pl.group.rotation.y, targetRot, rate);
    });

    traffic.forEach((c, ci) => {
      c.t = (c.t + c.speed * dt) % 1;
      const cp = curve.getPointAt(c.t);
      const cg = curve.getTangentAt(c.t);
      c.g.position.set(cp.x, 0.06 + Math.sin(time * 3 + c.t * 44) * 0.02, cp.z);
      c.g.rotation.y = Math.atan2(cg.x, cg.z);
      c.cone.material.opacity = 0.45 + Math.sin(time * 11 + c.phase) * 0.15;
      // Phares : allumés au survol (d'autant plus la nuit), flash au clic
      const hovCar = hover && hover.kind === "car" && hover.index === ci;
      c.flash = Math.max(0, c.flash - dt * 1.4);
      const beamTarget = hovCar ? 0.24 + 0.4 * n + c.flash * 0.5 : c.flash * 0.5;
      c.beam.material.opacity = THREE.MathUtils.lerp(c.beam.material.opacity, beamTarget, 0.09);
      const bs = 1 + (hovCar ? 0.18 : 0) + c.flash * 0.25;
      c.beam.scale.set(bs, bs, bs);
    });

    for (const pl of palms) {
      pl.g.rotation.z = Math.sin(time * 0.9 + pl.phase) * 0.05;
      pl.g.rotation.y += 0.0003;
    }

    // Arbres : balancement composé — grande oscillation lente + rafales rapides irrégulières
    for (const tr of trees) {
      const gust = 0.5 + 0.5 * Math.sin(time * 0.31 + tr.phase * 1.7);
      tr.g.rotation.z = Math.sin(time * 0.6 + tr.phase) * 0.022 + Math.sin(time * 1.9 + tr.phase * 2.3) * 0.016 * gust;
      tr.g.rotation.x = Math.sin(time * 0.83 + tr.phase * 0.7) * 0.014;
      tr.g.rotation.y = Math.sin(time * 0.47 + tr.phase) * 0.02;
    }

    for (const pg of pigeons) {
      // Un pigeon survolé (ou cliqué) s'envole, plane un instant, puis revient picorer
      const hovPig = hover && hover.kind === "pigeon" && hover.index === pg.idx;
      if (hovPig && pg.state === 0) { pg.state = 1; pg.timer = 0; }
      const flap = Math.sin(time * 26 + pg.phase);
      if (pg.state === 1) {
        pg.timer += dt;
        const k = Math.min(1, pg.timer / 1.1);
        pg.g.position.y = k * 2.4;
        pg.g.position.x = pg.x0 + pg.fx * k * 5.5 + Math.sin(time * 3) * 0.06;
        pg.g.position.z = pg.z0 + pg.fz * k * 5.5;
        pg.g.rotation.z = (1 - k) * Math.sin(time * 2.2 + pg.phase) * 0.08 - k * 0.22;
        pg.g.rotation.x = -k * 0.45;
        pg.g.scale.y = 1 + Math.abs(flap) * 0.24;
        pg.g.scale.x = 1 - Math.abs(flap) * 0.13;
        if (k >= 1) { pg.state = 2; pg.timer = 0; }
      } else if (pg.state === 2) {
        pg.timer += dt;
        pg.g.position.y = 2.4 + Math.sin(time * 2) * 0.15;
        pg.g.position.x = pg.x0 + pg.fx * 5.5;
        pg.g.position.z = pg.z0 + pg.fz * 5.5;
        if (pg.timer > 2.6) { pg.state = 3; pg.timer = 0; }
      } else if (pg.state === 3) {
        pg.timer += dt;
        const k = Math.min(1, pg.timer / 1.4);
        pg.g.position.y = 2.4 * (1 - k);
        pg.g.position.x = pg.x0 + pg.fx * 5.5 * (1 - k);
        pg.g.position.z = pg.z0 + pg.fz * 5.5 * (1 - k);
        pg.g.rotation.z = k * Math.sin(time * 2.2 + pg.phase) * 0.08;
        pg.g.rotation.x = 0;
        pg.g.scale.set(1, 1, 1);
        if (k >= 1) { pg.state = 0; pg.timer = 0; }
      } else {
        // picore sur le trottoir
        const bob = Math.abs(Math.sin(time * 2.2 + pg.phase)) * 0.05;
        pg.g.position.y = bob;
        pg.g.rotation.z = Math.sin(time * 2.2 + pg.phase) * 0.08;
        pg.g.position.x = pg.x0 + Math.sin(time * 0.35 + pg.phase) * 0.4;
        pg.g.position.z = pg.z0 + Math.cos(time * 0.3 + pg.phase) * 0.3;
      }
    }

    for (const w of walkers) {
      w.t = (w.t + w.speed * dt) % 1;
      if (w.t < 0) w.t += 1;
      const wp = curve.getPointAt(w.t);
      const wg = curve.getTangentAt(w.t);
      const perp = new THREE.Vector3(-wg.z, 0, wg.x).normalize();
      w.g.position.set(
        wp.x + perp.x * w.side * w.off,
        0,
        wp.z + perp.z * w.side * w.off
      );
      w.g.rotation.y = Math.atan2(wg.x, wg.z) + (w.side > 0 ? 0 : Math.PI);
      w.step += dt * (6 + Math.abs(w.speed) * 90);
      const swing = Math.sin(w.step) * 0.5;
      // Cuisses opposées
      w.legL.rotation.x = swing;
      w.legR.rotation.x = -swing;
      // Genoux : la jambe arrière plie (talon qui remonte), l'avant se tend
      w.kneeL.rotation.x = Math.max(0, -swing) * 0.95;
      w.kneeR.rotation.x = Math.max(0, swing) * 0.95;
      // Bras opposés + coudes qui plient en arrière
      w.armL.rotation.x = -swing * 0.8;
      w.armR.rotation.x = swing * 0.8;
      w.elbowL.rotation.x = Math.max(0, swing) * 0.9;
      w.elbowR.rotation.x = Math.max(0, -swing) * 0.9;
      // Haut du corps : roulis du bassin, inclinaison vers l'avant, rebond
      w.lean.rotation.z = Math.sin(w.step) * 0.025;
      w.lean.rotation.x = 0.045 + Math.abs(Math.sin(w.step)) * 0.025;
      w.g.position.y = Math.abs(Math.sin(w.step)) * 0.04;
    }

    for (const lb of lamps) {
      // Éteints le jour, éclatants la nuit (transition douce)
      const f = 0.9 + Math.sin(time * 9 + lb.i * 1.7) * 0.09;
      lb.glow.material.opacity = (0.08 * (1 - n) + 0.85 * n) * f;
      lb.pool.material.opacity = (0.1 * (1 - n) + 0.55 * n) * f;
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

    // Feux tricolores : cycle permanent rouge → vert → orange (12 s, décalé par feu)
    // La nuit, seule l'ampoule active est renforcée : les feux restent lisibles.
    for (const tl of trafficLights) {
      const cyc = ((time + tl.phase) % 12) / 12;
      // Rouge : 0-0.4 | Vert : 0.4-0.78 | Orange : 0.78-1
      const rOn = cyc < 0.4;
      const gOn = cyc >= 0.4 && cyc < 0.78;
      const oOn = cyc >= 0.78;
      const [red, amber, green] = tl.g.userData.bulbs;
      const [pedR, pedG] = tl.g.userData.peds;
      const glow = (on, base) => (on ? base + n * 0.6 : base * 0.12);
      red.material.emissiveIntensity = glow(rOn, 1);
      amber.material.emissiveIntensity = glow(oOn, 0.95);
      green.material.emissiveIntensity = glow(gOn, 0.9);
      // Feu piéton : inversé (les voitures stoppent ⇒ piétons traversent)
      pedR.material.emissiveIntensity = (gOn ? 0.75 + n * 0.4 : 0.08);
      pedG.material.emissiveIntensity = (gOn ? 0.08 : 0.75 + n * 0.4);
    }

    for (const b of birds) {
      // Vol réaliste : la vitesse varie (plané puis accélération), l'oiseau s'incline dans les virages
      b.g.position.x += b.speed * 0.02 * (0.75 + 0.25 * Math.sin(time * 0.8 + b.phase));
      b.g.position.y = b.y0 + Math.sin(time * 1.3 + b.phase) * 0.8 + Math.sin(time * 0.4 + b.phase * 2) * 0.35;
      b.g.position.z = b.z0 + Math.sin(time * 0.6 + b.phase) * 3.5;
      const vx = Math.cos(time * 0.6 + b.phase) * 0.6;
      const vz = Math.cos(time * 1.3 + b.phase) * 0.4;
      const flap = Math.sin(time * (9 + Math.abs(Math.sin(time * 0.8 + b.phase)) * 3) + b.phase) * 0.75;
      b.l.rotation.z = flap;
      b.r.rotation.z = -flap;
      // Assiette : l'oiseau se penche dans les virages (banking) et cabre légèrement en montée
      b.g.rotation.z = 0.25 + Math.sin(time * 1.3 + b.phase) * 0.12 + Math.cos(time * 0.6 + b.phase) * 0.08 + vx * 0.22;
      b.g.rotation.x = -vz * 0.3 - Math.cos(time * 1.3 + b.phase) * 0.08;
      b.g.rotation.y = -vx * 0.35;
      if (b.g.position.x > 80) {
        b.g.position.x = -80;
        b.y0 = 8 + Math.random() * 9;
        b.z0 = 30 + Math.random() * 90;
        b.g.position.z = b.z0;
        b.g.position.y = b.y0;
      }
    }

    dust.rotation.y = time * 0.05;
    // Poussière dorée le jour, discrète la nuit
    dust.material.opacity = (0.5 + Math.sin(time * 3) * 0.12) * (1 - n * 0.7);
    dust.position.x = Math.sin(time * 0.12) * 2.4;
    dust.position.z = Math.cos(time * 0.09) * 1.6;

    // Lucioles : invisibles le jour, scintillement doré la nuit, léger dérive
    const twinkle = 0.35 + Math.sin(time * 2.1 + ffPhase) * 0.15;
    ffMat.opacity = n * twinkle;
    ffPoints.position.x = Math.sin(time * 0.08) * 1.8;
    ffPoints.position.z = Math.cos(time * 0.06) * 1.2;
    ffPoints.rotation.y = time * 0.02;

    for (const c of clouds) {
      c.g.position.x += c.speed * 0.02;
      c.g.position.y = c.y0 + Math.sin(time * 0.22 + c.phase) * 0.7;
      const br = 1 + Math.sin(time * 0.3 + c.phase) * 0.05;
      c.g.scale.set(c.s0 * br, c.s0 * br, c.s0 * br);
      if (c.g.position.x > 150) c.g.position.x = -150;
    }

    // Fontaine : jet pulsant, gouttelettes en suspension, surface qui tourne.
    // Au survol le jet s'élance, au clic un « splash » retombe en douceur.
    for (const f of fountains) {
      f.splash = Math.max(0, f.splash - dt * 1.2);
      const hovFon = hover && hover.kind === "fountain";
      const boost = 1 + f.splash * 0.9 + (hovFon ? 0.5 : 0);
      const w = (Math.sin(time * 2.6 + f.phase) * 0.5 + 1) * boost;
      f.g.userData.jet.scale.set(1, 0.7 + 0.3 * w, 1);
      f.g.userData.jet.rotation.z = Math.sin(time * 3.1) * 0.06 * boost;
      f.g.userData.jet.rotation.x = Math.cos(time * 2.7) * 0.05 * boost;
      f.g.userData.pool.rotation.z = time * 0.25;
      const rs = (1 + Math.sin(time * 1.8 + f.phase) * 0.03) * (1 + f.splash * 0.12);
      f.g.userData.pool.scale.set(rs, rs, rs);
      f.g.userData.dish.rotation.z = Math.sin(time * 1.4) * 0.03;
      // Gouttelettes : nuée d'eau qui monte avec le jet et retombe en pluie fine
      if (f.drops) {
        const pos = f.drops.geometry.attributes.position;
        for (let i = 0; i < f.nDrops; i++) {
          let life = f.life[i];
          life -= dt * (2.2 + f.splash * 2.4);
          if (life < 0) {
            f.life[i] = 1;
            const a = Math.random() * Math.PI * 2;
            const rr = 0.12 + Math.random() * 0.3;
            f.vx[i] = Math.cos(a) * rr;
            f.vz[i] = Math.sin(a) * rr;
            f.vy[i] = 0.55 + Math.random() * 0.4 * boost;
            pos.array[i * 3] = Math.cos(a) * 0.3;
            pos.array[i * 3 + 1] = 1.25;
            pos.array[i * 3 + 2] = Math.sin(a) * 0.3;
          } else {
            f.vy[i] -= 1.5 * dt;
            pos.array[i * 3] += f.vx[i] * dt;
            pos.array[i * 3 + 1] += f.vy[i] * dt;
            pos.array[i * 3 + 2] += f.vz[i] * dt;
            if (pos.array[i * 3 + 1] < 0.35) {
              f.life[i] = 0;
              pos.array[i * 3 + 1] = 0.35;
            }
          }
        }
        pos.needsUpdate = true;
        f.drops.material.opacity = (0.55 + 0.3 * w) * (0.35 + 0.65 * (1 - n));
      }
    }

    // Parasols des terrasses : ballant léger dans la brise
    for (const ct of cafeTables) {
      ct.g.userData.parasol.rotation.z = Math.sin(time * 0.9 + ct.phase) * 0.06;
      ct.g.userData.parasol.rotation.x = Math.sin(time * 0.7 + ct.phase * 1.3) * 0.05;
    }

    // Étang du parc : l'eau frissonne, les canards glissent en cercles concentriques
    for (const pd of ponds) {
      const w = pd.water.material;
      w.roughness = 0.08 + (Math.sin(time * 1.1) * 0.5 + 0.5) * 0.05;
      pd.water.rotation.z = Math.sin(time * 0.3) * 0.01;
    }
    for (const dk of ducks) {
      dk.a += dk.sp * dt;
      const ox = dk.g.userData.ox ?? (dk.g.userData.ox = dk.g.position.x);
      const oz = dk.g.userData.oz ?? (dk.g.userData.oz = dk.g.position.z);
      dk.g.position.x = ox + Math.cos(dk.a) * dk.r;
      dk.g.position.z = oz + Math.sin(dk.a) * dk.r;
      dk.g.rotation.y = -dk.a + Math.PI / 2;
      dk.g.position.y = 0.1 + Math.sin(time * 2.2 + dk.ph) * 0.02;
      dk.head.rotation.z = Math.sin(time * 3.1 + dk.ph) * 0.14;
      dk.tail.rotation.z = Math.sin(time * 2.6 + dk.ph) * 0.1;
    }

    // Papillons : battements rapides, dérive en huit autour de leur fleur
    for (const bf of butterflies) {
      const flap = Math.sin(time * 24 + bf.ph);
      bf.lw.rotation.z = -0.55 + flap * 0.85;
      bf.rw.rotation.z = 0.55 - flap * 0.85;
      bf.g.position.x = bf.base.x + Math.sin(time * 0.9 + bf.ph) * bf.amp;
      bf.g.position.z = bf.base.z + Math.cos(time * 1.3 + bf.ph * 1.7) * bf.amp * 0.7;
      bf.g.position.y = bf.base.y + Math.sin(time * 2.4 + bf.ph * 2) * 0.5;
      bf.g.rotation.y = Math.sin(time * 1.1 + bf.ph) * 0.9;
    }

    // Drapeau du kiosque qui flotte au vent + enseigne éclairée la nuit
    for (const k of kiosks) {
      const fl = k.g.userData.flag;
      fl.rotation.z = Math.sin(time * 2.4 + k.phase) * 0.28;
      fl.position.y = 2.42 + Math.sin(time * 2.4 + k.phase) * 0.04;
      k.g.userData.sign.material.emissiveIntensity = n * 0.75;
    }

    // Fenêtres des immeubles : s'illuminent la nuit (léger scintillement par immeuble)
    for (let i = 0; i < buildings.length; i++) {
      buildings[i].material.emissiveIntensity = n * (0.8 + Math.sin(time * 1.6 + i * 1.7) * 0.18);
    }

    // Vitrines des boutiques, panneaux 4x3 et étal de marché : éclairage nocturne
    const nightGlow = n * 0.85;
    for (const s of storefronts) {
      s.userData.window.material.emissiveIntensity = nightGlow;
      // L'auvent de la boutique respire doucement dans la brise (phase = position)
      const sp = s.position.x * 1.7 + s.position.z * 3.1;
      s.userData.awning.rotation.z = Math.sin(time * 0.55 + sp) * 0.03;
      s.userData.awning.rotation.x = Math.sin(time * 0.4 + sp * 1.3) * 0.025;
    }
    for (const bb of billboards) bb.userData.face.material.emissiveIntensity = nightGlow;
    for (const ms of marketStalls) {
      ms.userData.sign.material.emissiveIntensity = nightGlow;
      const mp = ms.position.x * 1.9 + ms.position.z * 2.7;
      ms.userData.awning.rotation.z = Math.sin(time * 0.6 + mp) * 0.035;
      ms.userData.awning.rotation.x = Math.sin(time * 0.45 + mp * 1.2) * 0.028;
    }

    // Guirlandes de fanions : léger ballant dans la brise
    for (const gd of garlands) {
      gd.g.rotation.z = Math.sin(time * 0.7 + gd.phase) * 0.05;
    }

    // Chiens : trottinent sur le trottoir et remuent la queue
    for (const dg of dogs) {
      dg.t = (dg.t + dg.speed * dt) % 1;
      if (dg.t < 0) dg.t += 1;
      const dp = curve.getPointAt(dg.t);
      const dtg = curve.getTangentAt(dg.t);
      const dpp = new THREE.Vector3(-dtg.z, 0, dtg.x).normalize();
      dg.g.position.set(
        dp.x + dpp.x * dg.side * dg.off,
        Math.abs(Math.sin(dg.step)) * 0.03,
        dp.z + dpp.z * dg.side * dg.off
      );
      dg.g.rotation.y = Math.atan2(dtg.x, dtg.z) + (dg.side > 0 ? 0 : Math.PI);
      dg.step += dt * 14;
      dg.g.userData.tail.rotation.z = Math.sin(time * 7 + dg.phase) * 0.55;
    }

    // Ballons du kiosque : petite danse dans l'air ; cliqués, ils s'envolent puis reviennent
    for (const bg of balloonGroups) {
      const bals = bg.g.userData.balloons;
      if (bg.state === 1) {
        bg.timer += dt;
        const k = Math.min(1, bg.timer / 2.2);
        for (let i = 0; i < bals.length; i++) {
          bals[i].position.y = 1.2 + k * 5.6 + Math.sin(i * 2.1) * 0.05;
          bals[i].position.x = (i - 1) * 0.22 + Math.sin(k * 6 + i * 2.3) * k * 0.9;
        }
        if (k >= 1) { bg.state = 2; bg.timer = 0; }
      } else if (bg.state === 2) {
        bg.timer += dt;
        if (bg.timer > 3.6) { bg.state = 3; bg.timer = 0; }
      } else if (bg.state === 3) {
        bg.timer += dt;
        const k = Math.min(1, bg.timer / 1.6);
        for (let i = 0; i < bals.length; i++) {
          bals[i].position.y = (1.2 + 5.6) - k * 5.6 + Math.sin(i * 2.1) * 0.05;
          bals[i].position.x = (i - 1) * 0.22;
        }
        if (k >= 1) { bg.state = 0; bg.timer = 0; }
      } else {
        const hovBal = hover && hover.kind === "balloon";
        for (let i = 0; i < bals.length; i++) {
          bals[i].position.y = 1.2 + Math.sin(i * 2.1) * 0.05 + Math.sin(time * (hovBal ? 2.6 : 1.1) + bg.phase + i * 1.7) * (hovBal ? 0.22 : 0.12);
          bals[i].position.x = (i - 1) * 0.22 + Math.sin(time * 0.8 + i * 2.3) * 0.04;
        }
      }
    }

    // Buissons et fleurs : balancement doux (décor uniquement, jamais sur les panneaux)
    for (const bsh of bushes) {
      bsh.g.rotation.z = Math.sin(time * 0.7 + bsh.phase) * 0.03;
    }
    for (const flw of flowers) {
      flw.g.rotation.z = Math.sin(time * 0.9 + flw.phase) * 0.06;
    }

    // Feuilles qui tombent en tournoyant
    for (const lf of leaves) {
      lf.x += (Math.sin(time * 0.5 + lf.phase) * 0.6 + lf.vx) * dt;
      lf.z += lf.vz * dt;
      lf.y += lf.vy * dt;
      lf.g.rotation.x += lf.spin * dt;
      lf.g.rotation.z += lf.spin * 0.6 * dt;
      lf.g.position.set(lf.x, lf.y, lf.z);
      if (lf.y < 0.18) {
        // Réapparaît près de la caméra (jamais derrière) : feuilles toujours visibles
        const rt = Math.min(0.97, Math.max(0.02, t + (Math.random() - 0.35) * 0.12));
        const rp = curve.getPointAt(rt);
        const rtg = curve.getTangentAt(rt);
        const rpe = new THREE.Vector3(-rtg.z, 0, rtg.x).normalize();
        const rside = Math.random() > 0.5 ? 1 : -1;
        lf.x = rp.x + rpe.x * rside * (2 + Math.random() * 7);
        lf.z = rp.z + rpe.z * rside * (2 + Math.random() * 7);
        lf.y = 1.5 + Math.random() * 3;
        lf.phase = Math.random() * Math.PI * 2;
      }
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

  // Projection écran d'un élément interactif (pour la vérification headless)
  function projectPickable(kind, index) {
    const entry = pickables.find((p) => p.kind === kind && (index === undefined || p.index === index));
    if (!entry) return null;
    const v = new THREE.Vector3();
    entry.mesh.getWorldPosition(v);
    if (v.distanceTo(camera.position) > 42) return null;
    // Fontaine : le centre du bassin est masqué par la colonne — viser le bord visible
    if (kind === "fountain") {
      const dir = v.clone().sub(camera.position).normalize();
      v.addScaledVector(dir, 1.25);
    }
    v.project(camera);
    if (v.z > 1 || v.z < -1) return null;
    return { x: v.x, y: v.y };
  }

  // État des interactions (vérification headless)
  function getReactiveState() {
    return {
      pigeons: pigeons.map((p) => p.state),
      balloons: balloonGroups.map((b) => b.state),
      beams: traffic.map((c) => Math.round(c.beam.material.opacity * 100) / 100),
      fountain: fountains.map((f) => Math.round(f.splash * 100) / 100),
    };
  }

  function getCameraPos() {
    return camera.position.clone();
  }

  function render() {
    renderer.render(scene, camera);
  }

  return {
    render, resize, update, pick, interact, projectPickable, getReactiveState,
    getCameraPos, setHover,
    setTimeMode: (m) => { timeMode = m === "day" || m === "night" ? m : "auto"; },
    setHour: (h) => { hourOverride = h; },
    setNight: (v) => { timeMode = v ? "night" : "day"; },
    getTimeInfo: () => ({ hour: getHour(), mode: timeMode, night: cur.night }),
  };
}
