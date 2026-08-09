import * as THREE from "three";
import {
  PAL, radialTexture, groundTexture, asphaltTexture, sidewalkTexture, buildRibbon, buildPanel, buildBuilding,
  buildLamp, buildLampGlow, buildDune, buildRock, buildDust, buildBird,
  buildPalm, buildBush, buildCloud, buildSign, buildMountain, buildBench, buildCar,
  buildTree, buildFlowers, buildBin, buildPigeon, buildContactShadow,
  buildMorrisColumn, buildBusShelter, buildCafeTable, buildBicycle, buildRoadSign, buildHedge,
  buildPerson, buildFountain, buildBillboard, buildKiosk, buildLeaf,
  setLowPower, isLowPower,
} from "./world.js";

export function createScene(canvas, stations) {
  const isMobile = window.innerWidth <= 760;
  setLowPower(isMobile);
  const rb = (n) => (isMobile ? Math.max(2, Math.round(n * 0.45)) : n);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.shadowMap.enabled = !isMobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(PAL.skyHorizon, 60, 760);

  const camera = new THREE.PerspectiveCamera(isMobile ? 62 : 52, window.innerWidth / window.innerHeight, 0.1, 900);

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
        // Plein jour : plus d'étoiles dans le ciel clair
        float starMask = smoothstep(0.16, 0.32, h);
        float s = step(0.9991, hash(dir));
        col += vec3(1.0) * s * starMask * 0.0;
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

  // ---------------- Road + center dashes ----------------
  const rbSamples = isMobile ? 240 : 500;
  const road = buildRibbon(curve, 4.2, PAL.path, asphaltTexture(), rbSamples);
  road.position.y = 0.012;
  scene.add(road);
  for (const off of [-1.5, 1.5]) {
    const edge = buildRibbon(curve, 0.14, PAL.pathEdge, null, rbSamples);
    edge.position.set(off, 0.025, 0);
    scene.add(edge);
  }
  for (let i = 0; i <= rb(84); i++) {
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

  // ---------------- Lights ----------------
  scene.add(new THREE.AmbientLight(0xb3a280, 0.75));
  scene.add(new THREE.HemisphereLight(0xf2e6cc, 0xb8a67e, 0.5));
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
  for (let i = 0; i < rb(40); i++) {
    const z = i * 13 + Math.random() * 7;
    const h = 7 + Math.random() * 27;
    const w = 4 + Math.random() * 3.5;
    const d = 4 + Math.random() * 3.5;
    scene.add(buildBuilding(w, h, d, z, -78 - Math.random() * 34));
    scene.add(buildBuilding(w, h * (0.7 + Math.random() * 0.6), d, z, 78 + Math.random() * 34));
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
  // Écartés de la bande des panneaux de leçon (offset ~5,4) : feuillage jamais devant le texte.
  const trees = [];
  const panelT = stations.map((s, i) => 0.02 + ((i + 0.5) / N) * 0.94);
  for (let i = 0; i < rb(30); i++) {
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

  // ---------------- Pigeons (qui picorent sur le trottoir) ----------------
  const pigeons = [];
  for (let i = 0; i < rb(9); i++) {
    const t = 0.04 + Math.random() * 0.92;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * (3.1 + Math.random() * 1.8)));
    const pg = buildPigeon();
    pg.position.set(pos.x, 0, pos.z);
    pigeons.push({ g: pg, phase: Math.random() * Math.PI * 2, x0: pos.x, z0: pos.z });
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
    scene.add(buildMorrisColumn(pos, angle, i === 1 ? ["RÈGLES", "D'AFFICHAGE"] : undefined));
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
    scene.add(buildBusShelter(pos, side));
    scene.add(buildContactShadow(pos, 4.6, 2.6));
  });

  // ---------------- Café tables (bistrot avec parasol) ----------------
  const cafeT = isMobile ? [0.19, 0.85] : [0.19, 0.52, 0.85];
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
  for (let i = 0; i < rb(5); i++) {
    const t = 0.06 + Math.random() * 0.88;
    const p = curve.getPointAt(t);
    const tg = curve.getTangentAt(t);
    const perp = new THREE.Vector3(-tg.z, 0, tg.x).normalize();
    const side = Math.random() > 0.5 ? 1 : -1;
    const pos = p.clone().add(perp.clone().multiplyScalar(side * (5.9 + Math.random() * 1.4)));
    scene.add(buildBicycle(pos, Math.random() * Math.PI * 2));
  }

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
    scene.add(buildBillboard(pos, angle, b.lines));
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
    fountains.push({ g: fountain, phase: 0 });
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
    scene.add(kiosk);
    scene.add(buildContactShadow(pos, 3.0, 2.6));
    scene.add(buildHedge(pos.clone().add(new THREE.Vector3(2.4, 0, 0)), 1.6, 0.5));
  }

  // ---------------- Passants animés (marchent le long des trottoirs) ----------------
  const walkers = [];
  const WALKER_COUNT = isMobile ? 7 : 14;
  for (let i = 0; i < WALKER_COUNT; i++) {
    const person = buildPerson();
    const dir = Math.random() > 0.5 ? 1 : -1;
    const side = Math.random() > 0.5 ? 1 : -1;
    walkers.push({
      g: person.g, legL: person.legL, legR: person.legR, arms: person.arms,
      t: 0.02 + Math.random() * 0.96,
      speed: (0.004 + Math.random() * 0.005) * dir,
      side, off: 3.0 + Math.random() * 1.3, phase: person.phase,
      step: 0,
    });
    scene.add(person.g);
  }

  // ---------------- Dunes & rocks ----------------
  for (let i = 0; i < rb(34); i++) {
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
  for (let i = 0; i < rb(26); i++) {
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
  for (let i = 0; i < rb(60); i++) {
    const t = Math.random();
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
  for (let i = 0; i < rb(12); i++) {
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

  // ---------------- Feuilles portées par le vent (animation ambiante) ----------------
  const leaves = [];
  for (let i = 0; i < rb(26); i++) {
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
  for (let i = 0; i < rb(8); i++) {
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
  // Plein jour : plus de météores
  let meteorTimer = Infinity;
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
      // En plein jour, les faces sont mates : aucune émission pour éviter le reflet
      const targetLight = hovered ? 0.22 : isActive ? 0.15 : near ? 0.05 : 0;
      const lerpRate = hovered ? 0.12 : 0.08;
      pl.group.scale.setScalar(THREE.MathUtils.lerp(pl.group.scale.x, targetScale, lerpRate));
      if (pl.light) {
        pl.light.intensity = THREE.MathUtils.lerp(pl.light.intensity, targetLight, lerpRate);
      }
      pl.group.position.y = THREE.MathUtils.lerp(pl.group.position.y, isActive ? 0.22 : 0, 0.06);
      pl.beaconMat.emissiveIntensity = 0.22 + Math.sin(time * 2.4 + i) * 0.1;

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

    for (const tr of trees) {
      tr.g.rotation.z = Math.sin(time * 0.6 + tr.phase) * 0.03;
    }

    for (const pg of pigeons) {
      const bob = Math.abs(Math.sin(time * 2.2 + pg.phase)) * 0.05;
      pg.g.position.y = bob;
      pg.g.rotation.z = Math.sin(time * 2.2 + pg.phase) * 0.08;
      // petites avancées sur le trottoir
      pg.g.position.x = pg.x0 + Math.sin(time * 0.35 + pg.phase) * 0.4;
      pg.g.position.z = pg.z0 + Math.cos(time * 0.3 + pg.phase) * 0.3;
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
      const swing = Math.sin(w.step) * 0.55;
      w.legL.rotation.x = swing;
      w.legR.rotation.x = -swing;
      w.arms.rotation.x = -swing * 0.6;
      w.g.position.y = Math.abs(Math.sin(w.step)) * 0.03;
    }

    for (const lb of lamps) {
      // En plein jour les lampadaires sont éteints
      const f = 0.9 + Math.sin(time * 9 + lb.i * 1.7) * 0.09;
      lb.glow.material.opacity = 0.08 * f;
      lb.pool.material.opacity = 0.1 * f;
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

    for (const b of birds) {
      b.g.position.x += b.speed * 0.02;
      b.g.position.y = b.y0 + Math.sin(time * 1.3 + b.phase) * 0.8;
      b.g.position.z = b.z0 + Math.sin(time * 0.6 + b.phase) * 3.5;
      const flap = Math.sin(time * 9 + b.phase) * 0.7;
      b.l.rotation.z = flap;
      b.r.rotation.z = -flap;
      b.g.rotation.z = 0.25 + Math.sin(time * 1.3 + b.phase) * 0.12 + Math.cos(time * 0.6 + b.phase) * 0.08;
      if (b.g.position.x > 80) {
        b.g.position.x = -80;
        b.y0 = 8 + Math.random() * 9;
        b.z0 = 30 + Math.random() * 90;
        b.g.position.z = b.z0;
        b.g.position.y = b.y0;
      }
    }

    dust.rotation.y = time * 0.05;
    dust.material.opacity = 0.5 + Math.sin(time * 3) * 0.12;
    dust.position.x = Math.sin(time * 0.12) * 2.4;
    dust.position.z = Math.cos(time * 0.09) * 1.6;

    for (const c of clouds) {
      c.g.position.x += c.speed * 0.02;
      c.g.position.y = c.y0 + Math.sin(time * 0.22 + c.phase) * 0.7;
      const br = 1 + Math.sin(time * 0.3 + c.phase) * 0.05;
      c.g.scale.set(c.s0 * br, c.s0 * br, c.s0 * br);
      if (c.g.position.x > 150) c.g.position.x = -150;
    }

    // Fontaine : jet pulsant, surface qui tourne, disque qui ondule
    for (const f of fountains) {
      const w = Math.sin(time * 2.6 + f.phase) * 0.5 + 1;
      f.g.userData.jet.scale.set(1, 0.7 + 0.3 * w, 1);
      f.g.userData.jet.rotation.z = Math.sin(time * 3.1) * 0.06;
      f.g.userData.jet.rotation.x = Math.cos(time * 2.7) * 0.05;
      f.g.userData.pool.rotation.z = time * 0.25;
      const rs = 1 + Math.sin(time * 1.8 + f.phase) * 0.03;
      f.g.userData.pool.scale.set(rs, rs, rs);
      f.g.userData.dish.rotation.z = Math.sin(time * 1.4) * 0.03;
    }

    // Parasols des terrasses : ballant léger dans la brise
    for (const ct of cafeTables) {
      ct.g.userData.parasol.rotation.z = Math.sin(time * 0.9 + ct.phase) * 0.06;
      ct.g.userData.parasol.rotation.x = Math.sin(time * 0.7 + ct.phase * 1.3) * 0.05;
    }

    // Drapeau du kiosque qui flotte au vent
    for (const k of kiosks) {
      const fl = k.g.userData.flag;
      fl.rotation.z = Math.sin(time * 2.4 + k.phase) * 0.28;
      fl.position.y = 2.42 + Math.sin(time * 2.4 + k.phase) * 0.04;
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

  function getCameraPos() {
    return camera.position.clone();
  }

  function render() {
    renderer.render(scene, camera);
  }

  return { render, resize, update, pick, getCameraPos, setHover };
}
