import Lenis from "lenis";

/* ==========================================================================
   ÉQUIPE — Couloir de membres
   Chorégraphie d'animation en couches (spec « niveau cinématique ») :
     COUCHE 1  portrait    0 → 900 ms   (easeOutExpo, arc en Y, overshoot scale,
                                        redressement rotation Y, saturation,
                                        point light avec flicker d'allumage)
     COUCHE 2  nom         550 ms       (chevauche la couche 1, blur, split lettre
                                        avec stagger de 18 ms — réservé au nom)
     COUCHE 3  poste       850 ms       (fade + translateY, letter-spacing qui se
                                        resserre, PAS de split par lettre)
     COUCHE 4  liseré      1150 ms      (scaleX depuis le bord du portrait, pulse)
     COUCHE 5  environnement (permanent : voisins flous/sombres qui respirent,
                                        tangage de la caméra sur sin(time))
   SORTIE : ordre inverse (accent → poste → nom → portrait), durées à 60 %.
   RÈGLE D'OR : aucun couple de couches ne partage le même début ET la même fin.
   ========================================================================== */

// ---------------- Données : membres numérotés, poste fixé par le numéro ------
// Les noms sont volontairement génériques (« Membre 1 » …) et le rôle dépend
// uniquement du numéro : stable, sobre et cohérent avec un organigramme.
const ROLES = [
  "Chargé de communication",
  "Ingénieur en signalétique urbaine",
  "Chef de projet panneautique",
  "Directeur des affaires publiques",
  "Auditeur des espaces publicitaires",
  "Responsable du foncier publicitaire",
  "Architecte des espaces urbains",
  "Expert en mobilité urbaine",
];

// Devise personnelle (affichée avec le poste, comme une signature)
const QUOTES = [
  "La ville se lit comme un livre.",
  "Bien orienter, c'est respecter.",
  "Un espace bien signalé est un espace partagé.",
  "La clarté est une forme de courtoisie urbaine.",
  "Chaque panneau raconte un trajet.",
  "Rendre visible, c'est rendre accessible.",
  "La signalétique pense à ceux qui arrivent.",
  "Une ville lisible est une ville accueillante.",
  "L'information juste, au bon endroit, au bon moment.",
  "Le domaine public se mérite : il se partage.",
];

const TEAM_SIZE = 8;

function makeMembers(n = TEAM_SIZE) {
  return Array.from({ length: n }, (_, i) => {
    const seed = (i + 1) * 2654435761 % 2147483647;
    const rnd = mulberry32(seed);
    return {
      first: "Membre",
      last: String(i + 1),
      name: `Membre ${i + 1}`,
      role: ROLES[i % ROLES.length],
      quote: pick(rnd, QUOTES),
      seed,
    };
  });
}

// ---------------- Petit RNG seedé (portraits reproductibles par membre) ------
function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(rnd, arr) {
  return arr[Math.floor(rnd() * arr.length)];
}

// ---------------- Peinture des portraits (style du site : parchemin + grain) -
function paintPortrait(seed) {
  const w = 480;
  const h = 640;
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  const ctx = c.getContext("2d");
  const rnd = mulberry32(seed);

  // Fond parchemin chaud
  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#f4e9cf");
  bg.addColorStop(0.55, "#ead8b5");
  bg.addColorStop(1, "#d9bf93");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Lumière douce derrière le sujet
  const rg = ctx.createRadialGradient(w / 2, h * 0.4, 20, w / 2, h * 0.4, w * 0.62);
  rg.addColorStop(0, "rgba(255,247,226,0.95)");
  rg.addColorStop(1, "rgba(255,247,226,0)");
  ctx.fillStyle = rg;
  ctx.fillRect(0, 0, w, h);

  // Ombre d'alcôve derrière le buste
  ctx.fillStyle = "rgba(90,70,45,0.10)";
  ctx.beginPath();
  ctx.moveTo(w * 0.1, h);
  ctx.quadraticCurveTo(w * 0.12, h * 0.4, w * 0.5, h * 0.34);
  ctx.quadraticCurveTo(w * 0.88, h * 0.4, w * 0.9, h);
  ctx.closePath();
  ctx.fill();

  // Ombre portée au sol
  ctx.fillStyle = "rgba(90,70,45,0.14)";
  ctx.beginPath();
  ctx.ellipse(w / 2, h * 0.92, w * 0.34, h * 0.04, 0, 0, Math.PI * 2);
  ctx.fill();

  const skin = pick(rnd, ["#c98d63", "#b97b53", "#a06a48", "#d49a6f", "#8a5a3e"]);
  const hair = pick(rnd, ["#2c2018", "#3a2c1f", "#4a3423", "#221a12"]);
  const hair2 = pick(rnd, ["#1e1812", "#33261a"]);
  const garment = pick(rnd, ["#9a8157", "#b08a63", "#6f7f56", "#7d8aa6", "#8a6f7a", "#a26f4e", "#5f7a4a", "#84673f"]);
  const glasses = rnd() < 0.22;
  const bun = rnd() < 0.16;
  const longHair = rnd() < 0.34;

  // Épaules / vêtement
  ctx.fillStyle = garment;
  ctx.beginPath();
  ctx.moveTo(w * 0.14, h);
  ctx.quadraticCurveTo(w * 0.13, h * 0.78, w * 0.16, h * 0.64);
  ctx.quadraticCurveTo(w * 0.21, h * 0.55, w * 0.5, h * 0.56);
  ctx.quadraticCurveTo(w * 0.79, h * 0.55, w * 0.84, h * 0.64);
  ctx.quadraticCurveTo(w * 0.87, h * 0.78, w * 0.86, h);
  ctx.closePath();
  ctx.fill();
  // Revers
  ctx.fillStyle = "rgba(0,0,0,0.07)";
  ctx.beginPath();
  ctx.moveTo(w * 0.5, h * 0.56);
  ctx.quadraticCurveTo(w * 0.5, h * 0.7, w * 0.5, h);
  ctx.lineTo(w * 0.62, h);
  ctx.quadraticCurveTo(w * 0.55, h * 0.62, w * 0.5, h * 0.56);
  ctx.closePath();
  ctx.fill();
  // Col
  ctx.strokeStyle = "rgba(58,46,31,0.25)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(w * 0.34, h * 0.6);
  ctx.quadraticCurveTo(w * 0.5, h * 0.68, w * 0.66, h * 0.6);
  ctx.stroke();

  // Cou
  ctx.fillStyle = skin;
  ctx.fillRect(w * 0.44, h * 0.5, w * 0.12, h * 0.14);

  // Tête
  const hx = w * 0.5;
  const hy = h * 0.415;
  const hrx = w * 0.155;
  const hry = h * 0.21;
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.ellipse(hx, hy, hrx, hry, 0, 0, Math.PI * 2);
  ctx.fill();
  // Oreilles
  ctx.beginPath();
  ctx.ellipse(hx - hrx, h * 0.46, 7, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(hx + hrx, h * 0.46, 7, 12, 0, 0, Math.PI * 2);
  ctx.fill();

  // Cheveux
  ctx.fillStyle = hair;
  if (bun) {
    ctx.beginPath();
    ctx.ellipse(hx, hy - hry * 1.25, h * 0.055, h * 0.05, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(hx, hy - hry * 0.7, hrx * 0.98, hry * 0.75, 0, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(hx, hy, hrx, Math.PI * 1.05, Math.PI * 1.95);
    ctx.quadraticCurveTo(hx - hrx * 1.12, hy - hry * 0.55, hx - hrx * 0.75, hy - hry * 0.6);
    ctx.quadraticCurveTo(hx, hy - hry * 1.28, hx + hrx * 0.75, hy - hry * 0.6);
    ctx.quadraticCurveTo(hx + hrx * 1.12, hy - hry * 0.55, hx + hrx, hy);
    ctx.closePath();
    ctx.fill();
  }
  if (longHair) {
    ctx.fillStyle = hair2;
    ctx.beginPath();
    ctx.ellipse(hx - hrx * 0.98, hy + hry * 0.4, hrx * 0.3, hry * 0.95, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(hx + hrx * 0.98, hy + hry * 0.4, hrx * 0.3, hry * 0.95, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = hair;
    ctx.beginPath();
    ctx.ellipse(hx, hy - hry * 0.55, hrx * 1.05, hry * 0.8, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Sourcils
  ctx.strokeStyle = "rgba(58,46,31,0.55)";
  ctx.lineWidth = 3.5;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(hx - hrx * 0.62, hy - hry * 0.32);
  ctx.quadraticCurveTo(hx - hrx * 0.42, hy - hry * 0.42, hx - hrx * 0.2, hy - hry * 0.34);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(hx + hrx * 0.2, hy - hry * 0.34);
  ctx.quadraticCurveTo(hx + hrx * 0.42, hy - hry * 0.42, hx + hrx * 0.62, hy - hry * 0.32);
  ctx.stroke();
  // Yeux
  ctx.fillStyle = "rgba(46,34,22,0.85)";
  ctx.beginPath();
  ctx.ellipse(hx - hrx * 0.42, hy + hry * 0.06, 4.5, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.ellipse(hx + hrx * 0.42, hy + hry * 0.06, 4.5, 3.2, 0, 0, Math.PI * 2);
  ctx.fill();
  if (glasses) {
    ctx.strokeStyle = "rgba(90,70,45,0.55)";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(hx - hrx * 0.42, hy + hry * 0.06, hrx * 0.22, hry * 0.16, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(hx + hrx * 0.42, hy + hry * 0.06, hrx * 0.22, hry * 0.16, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(hx - hrx * 0.2, hy + hry * 0.06);
    ctx.lineTo(hx + hrx * 0.2, hy + hry * 0.06);
    ctx.stroke();
  }
  // Nez
  ctx.strokeStyle = "rgba(120,80,55,0.35)";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(hx, hy + hry * 0.1);
  ctx.quadraticCurveTo(hx + hrx * 0.08, hy + hry * 0.28, hx - hrx * 0.02, hy + hry * 0.34);
  ctx.stroke();
  // Bouche
  ctx.strokeStyle = "rgba(120,80,55,0.5)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(hx - hrx * 0.16, hy + hry * 0.62);
  ctx.quadraticCurveTo(hx, hy + hry * 0.72, hx + hrx * 0.16, hy + hry * 0.62);
  ctx.stroke();

  // Lumière de bord (rim light)
  ctx.fillStyle = "rgba(255,246,224,0.22)";
  ctx.beginPath();
  ctx.ellipse(hx - hrx * 0.72, hy + hry * 0.5, hry * 0.5, hry * 0.16, 0.5, 0, Math.PI * 2);
  ctx.fill();

  // Vignette
  const vg = ctx.createRadialGradient(w / 2, h * 0.46, w * 0.2, w / 2, h * 0.46, w * 0.78);
  vg.addColorStop(0, "rgba(70,52,32,0)");
  vg.addColorStop(1, "rgba(70,52,32,0.30)");
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);

  // Grain (rare, discret)
  for (let i = 0; i < 1400; i++) {
    const a = 0.02 + rnd() * 0.04;
    ctx.fillStyle = rnd() < 0.5 ? `rgba(58,46,31,${a.toFixed(3)})` : `rgba(255,250,238,${a.toFixed(3)})`;
    ctx.fillRect(rnd() * w, rnd() * h, 1.4, 1.4);
  }

  return c.toDataURL("image/jpeg", 0.88);
}

// ---------------- Easing (équivalents des cubic-bezier du spec) --------------
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
// cubic-bezier(.16,1,.3,1) = easeOutExpo « maison »
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
// cubic-bezier(.19,1,.22,1) ≈ power4.out
const easePower4 = (t) => 1 - Math.pow(1 - t, 4);
// easeOutQuint (liseré)
const easeOutQuint = (t) => 1 - Math.pow(1 - t, 5);
// Bosse sinusoïdale (overshoot du scale / pulse) : 1 au centre, 0 au-delà
function bump(t, center, width) {
  const d = Math.abs(t - center);
  if (d >= width / 2) return 0;
  return 0.5 + 0.5 * Math.cos((d / (width / 2)) * Math.PI);
}

/* ==========================================================================
   Chorégraphie — bornes temporelles (aucun couple de couches ne partage le
   même début ET la même fin — règle d'or).
   Entrée (secondes) :                  Début   Fin
     portrait  .90 s                      0      .90
     nom       .50 s (chevauché)          .55    1.05
     poste     .40 s                      .85    1.25
     devise    .40 s                      .92    1.32
     liseré    .35 s                     1.15    1.50
   Sortie — ordre inverse, durées × 60 % :
     liseré    .21 s                      0      .21
     poste     .24 s                      .09    .33
     devise    .24 s                      .16    .40
     nom       .30 s                      .18    .48
     portrait  .54 s                      .27    .81
   ========================================================================== */
const E = {
  portrait: { start: 0.0, dur: 0.9 },
  name: { start: 0.55, dur: 0.5 },
  role: { start: 0.85, dur: 0.4 },
  quote: { start: 0.92, dur: 0.4 },
  accent: { start: 1.15, dur: 0.35 },
};
const X = {
  accent: { start: 0.0, dur: 0.21 },
  role: { start: 0.09, dur: 0.24 },
  quote: { start: 0.16, dur: 0.24 },
  name: { start: 0.18, dur: 0.3 },
  portrait: { start: 0.27, dur: 0.54 },
};
const NAME_LETTER_STAGGER = 0.018; // 18 ms entre chaque lettre
const NAME_LETTER_DUR = 0.4;

function prog(t, start, dur) {
  return clamp((t - start) / dur, 0, 1);
}

/* ==========================================================================
   Module principal
   ========================================================================== */
export function initTeam({ onExit } = {}) {
  const root = document.getElementById("ui-team");
  const scroller = root.querySelector("#team-scroll");
  const corridor = root.querySelector("#team-corridor");
  const track = root.querySelector(".team-track");
  const countEl = root.querySelector("#team-count");
  const closeBtn = root.querySelector("#team-close");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const members = makeMembers(TEAM_SIZE);
  const avatars = new Array(TEAM_SIZE);

  // ---- Construction du DOM (membres, puis page de garde insérée en tête) ----
  const coverEl = document.createElement("section");
  coverEl.className = "team-cover";
  coverEl.innerHTML = `
    <div class="team-cover-kicker">Panneautique · Domaine public</div>
    <h2 class="team-cover-title">L'équipe.</h2>
    <div class="team-cover-rule"></div>
    <p class="team-cover-desc">Huit profils complémentaires, une même mission : rendre le domaine public lisible, respecté et bien partagé. Glissez le long du couloir pour les rencontrer un à un.</p>
    <div class="team-cover-meta">
      <span class="team-cover-chip">08 membres</span>
      <span class="team-cover-chip">1 mission commune</span>
    </div>
    <button class="team-cover-cta" type="button">Découvrir l'équipe →</button>
  `;
  track.innerHTML = members
    .map((m, i) => {
      const letters = m.name
        .split("")
        .map((ch) => `<span class="tl">${ch === " " ? "\u00A0" : ch}</span>`)
        .join("");
      const initials = (m.first[0] + m.last[0]).toUpperCase();
      return `
        <article class="team-cell" data-i="${i}">
          <div class="team-niche">
            <div class="team-arch"></div>
            <div class="team-glow"></div>
            <div class="team-portrait-wrap">
              <div class="team-portrait"></div>
            </div>
            <span class="team-monogram">${initials}</span>
          </div>
          <div class="team-info">
            <div class="team-name">${letters}</div>
            <div class="team-role"></div>
            <div class="team-quote"></div>
            <div class="team-accent"></div>
          </div>
        </article>`;
    })
    .join("");
  track.insertBefore(coverEl, track.firstChild);

  const cells = [];
  const coverCta = track.querySelector(".team-cover-cta");
  const cover = {
    el: coverEl,
    cx: () => coverEl.offsetLeft + coverEl.offsetWidth / 2,
  };
  track.querySelectorAll(".team-cell").forEach((el, i) => {
    const cell = {
      el,
      i,
      state: "idle", // idle | entering | active | leaving
      t0: 0, // début de la phase courante
      pulseAt: 0,
      f: null, // progression des couches capturée à l'interruption d'une entrée
      phase: i * 0.9, // décalage de respiration
      restRot: i % 2 === 0 ? -18 : 18, // légère rotation vers le centre du couloir
      wrap: el.querySelector(".team-portrait-wrap"),
      portrait: el.querySelector(".team-portrait"),
      glow: el.querySelector(".team-glow"),
      mono: el.querySelector(".team-monogram"),
      name: el.querySelector(".team-name"),
      letters: [...el.querySelectorAll(".team-name .tl")],
      role: el.querySelector(".team-role"),
      quote: el.querySelector(".team-quote"),
      accent: el.querySelector(".team-accent"),
    };
    cell.portrait.style.backgroundImage = `url("${(avatars[i] = paintPortrait(members[i].seed))}")`;
    cell.role.textContent = members[i].role;
    cell.quote.textContent = members[i].quote;
    cell.accent.style.transformOrigin = i % 2 === 0 ? "left center" : "right center";
    el.addEventListener("click", () => focusCell(i));
    setHiddenState(cell);
    cells.push(cell);
  });

  // ---- État initial des couches (masquées, prêtes à entrer) ----
  function setHiddenState(cell) {
    cell.wrap.style.transform = "translateZ(-50px) scale(0.85)";
    cell.portrait.style.filter = "grayscale(35%) blur(4px) brightness(0.4)";
    cell.glow.style.opacity = "0";
    cell.mono.style.opacity = "0";
    cell.mono.style.transform = "scale(0.6) translateY(6px)";
    cell.name.style.opacity = "0";
    cell.name.style.transform = "translateY(24px)";
    cell.name.style.filter = "blur(6px)";
    cell.role.style.opacity = "0";
    cell.role.style.transform = "translateY(16px)";
    cell.role.style.letterSpacing = "0.15em";
    cell.quote.style.opacity = "0";
    cell.quote.style.transform = "translateY(12px)";
    cell.accent.style.transform = "scaleX(0)";
    cell.accent.style.filter = "";
    for (const l of cell.letters) {
      l.style.opacity = "0";
      l.style.transform = "translateY(12px)";
      l.style.filter = "blur(6px)";
    }
  }

  // ---- Lenis horizontal (le couloir défile de gauche à droite) ----
  let teamLenis = null;
  function ensureLenis() {
    if (teamLenis) return;
    teamLenis = new Lenis({
      wrapper: scroller,
      content: scroller,
      orientation: "horizontal",
      smoothWheel: true,
      duration: 1.15,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1.1,
    });
  }

  // ---- Position du membre actif (le plus proche du centre de l'écran) ------
  function cellCenterX(i) {
    return cells[i].el.offsetLeft + cells[i].el.offsetWidth / 2;
  }
  function computeActive() {
    const viewCenter = scroller.scrollLeft + scroller.clientWidth / 2;
    // Page de garde centrée → aucun membre actif (l'équipe se présente)
    if (Math.abs(cover.cx() - viewCenter) < scroller.clientWidth * 0.32) return -1;
    let best = 0;
    let bestDist = Infinity;
    for (let i = 0; i < cells.length; i++) {
      const d = Math.abs(cellCenterX(i) - viewCenter);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    return best;
  }
  let activeIndex = -1;

  function updateCount() {
    countEl.textContent = activeIndex < 0
      ? "L'équipe"
      : `${String(activeIndex + 1).padStart(2, "0")} / ${String(TEAM_SIZE).padStart(2, "0")}`;
  }

  // ---- Rendu des couches : fonctions pures d'une progression p (0 = niche masquée,
  // 1 = pleinement actif). Réutilisées en entrée comme en sortie → jamais de « cut »,
  // même quand on quitte un membre en pleine entrée.
  function renderPortrait(cell, p, overshoot = 0, flicker = 1) {
    const z = -50 + 110 * p;
    const scale = 0.85 + (0.75 + overshoot) * p;
    const arc = Math.sin(clamp(p, 0, 1) * Math.PI) * 15; // arc en Y ~15px
    const rotY = cell.restRot * Math.sin(clamp(p, 0, 1) * Math.PI); // redressement progressif
    cell.wrap.style.transform =
      `translateZ(${z.toFixed(1)}px) translateY(${(-arc).toFixed(1)}px) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(4)})`;
    // Désaturation → saturation pleine, sur la même courbe que le scale
    cell.portrait.style.filter =
      `grayscale(${((1 - p) * 35).toFixed(1)}%) blur(${(4 * (1 - p)).toFixed(1)}px) brightness(${(0.4 + 0.6 * p).toFixed(3)})`;
    // Point light dédié (flicker d'allumage en entrée, 1 sinon)
    cell.glow.style.opacity = (p * flicker).toFixed(3);
    // Sceau aux initiales : entre avec le portrait
    cell.mono.style.opacity = p.toFixed(3);
    cell.mono.style.transform = `scale(${(0.6 + 0.4 * p).toFixed(4)}) translateY(${(6 * (1 - p)).toFixed(1)}px)`;
    // Base de la cellule : la niche avance vers le spectateur
    cell.el.style.transform = `translateZ(${(-50 * (1 - p)).toFixed(1)}px) scale(${(0.85 + 0.15 * p).toFixed(4)})`;
  }

  function renderName(cell, p, lettersP) {
    cell.name.style.opacity = p.toFixed(3);
    cell.name.style.transform = `translateY(${(24 * (1 - p)).toFixed(1)}px)`;
    cell.name.style.filter = `blur(${(6 * (1 - p)).toFixed(1)}px)`;
    for (let li = 0; li < cell.letters.length; li++) {
      const lp = lettersP ? lettersP[li] : p;
      const l = cell.letters[li];
      l.style.opacity = lp.toFixed(3);
      l.style.transform = `translateY(${(12 * (1 - lp)).toFixed(1)}px)`;
      l.style.filter = `blur(${(6 * (1 - lp)).toFixed(1)}px)`;
    }
  }

  function renderRole(cell, p, quoteP) {
    cell.role.style.opacity = p.toFixed(3);
    cell.role.style.transform = `translateY(${(16 * (1 - p)).toFixed(1)}px)`;
    cell.role.style.letterSpacing = `${(0.15 - 0.07 * p).toFixed(3)}em`;
    const qp = quoteP == null ? p : quoteP;
    cell.quote.style.opacity = qp.toFixed(3);
    cell.quote.style.transform = `translateY(${(12 * (1 - qp)).toFixed(1)}px)`;
  }

  function renderAccent(cell, p) {
    cell.accent.style.transform = `scaleX(${p.toFixed(4)})`;
  }

  // Progression visuelle (eased) de chaque couche telle qu'elle est rendue à l'instant t.
  function captureProgress(cell, now) {
    if (cell.state === "entering") {
      const t = now - cell.t0;
      return {
        portrait: easeOutExpo(prog(t, E.portrait.start, E.portrait.dur)),
        name: easePower4(prog(t, E.name.start, E.name.dur)),
        role: easePower4(prog(t, E.role.start, E.role.dur)),
        quote: easePower4(prog(t, E.quote.start, E.quote.dur)),
        accent: easeOutQuint(prog(t, E.accent.start, E.accent.dur)),
        letters: cell.letters.map((_, li) =>
          easePower4(prog(t, E.name.start + li * NAME_LETTER_STAGGER, NAME_LETTER_DUR))),
      };
    }
    return {
      portrait: 1, name: 1, role: 1, quote: 1, accent: 1,
      letters: cell.letters.map(() => 1),
    };
  }

  // ---- Gestion des transitions d'état ----
  function handleActiveChange(now) {
    const ai = computeActive();
    if (ai === activeIndex) return;
    const prev = activeIndex;
    activeIndex = ai;
    if (prev >= 0 && cells[prev] && cells[prev].state !== "idle") {
      // Le membre quitté se rétracte en ordre inverse (accent → poste → nom → portrait).
      // On capture d'abord sa progression courante : s'il était en pleine entrée, la
      // sortie démarre d'où il en est, jamais depuis l'état pleinement actif (pas de saut).
      cells[prev].f = captureProgress(cells[prev], now);
      cells[prev].state = "leaving";
      cells[prev].t0 = now;
      cells[prev].accent.style.filter = "";
    }
    if (ai >= 0 && cells[ai].state !== "entering") {
      cells[ai].state = "entering";
      cells[ai].t0 = now;
    }
    updateCount();
  }

  // ---- Mise à jour d'une cellule en « entrée » ----
  function updateEntering(cell, now) {
    const t = now - cell.t0;

    // COUCHE 1 — portrait (0 → 900 ms)
    const u = prog(t, E.portrait.start, E.portrait.dur);
    const e = easeOutExpo(u);
    const overshoot = 0.05 * bump(u, 0.78, 0.5); // rebond subtil vers 700 ms (u ≈ 0.78)
    // Point light : micro-oscillations d'allumage (façon néon) qui se stabilisent —
    // fonction continue de u, aucune coupure de luminosité en cours de route.
    const flicker = 1 - 0.55 * Math.exp(-u * 16) * (1 - Math.abs(Math.sin(u * 60)));
    renderPortrait(cell, e, overshoot, flicker);

    // COUCHE 2 — nom (départ 550 ms, chevauche la fin du portrait)
    const ne = easePower4(prog(t, E.name.start, E.name.dur));
    const lettersP = cell.letters.map((_, li) =>
      easePower4(prog(t, E.name.start + li * NAME_LETTER_STAGGER, NAME_LETTER_DUR)));
    renderName(cell, ne, lettersP);

    // COUCHE 3 — poste + devise (départ 850 ms ; la devise suit 70 ms plus tard)
    renderRole(
      cell,
      easePower4(prog(t, E.role.start, E.role.dur)),
      easePower4(prog(t, E.quote.start, E.quote.dur))
    );

    // COUCHE 4 — liseré (départ 1150 ms, depuis le bord du portrait)
    renderAccent(cell, easeOutQuint(prog(t, E.accent.start, E.accent.dur)));

    // Fin de séquence : liseré + pulse unique de luminosité
    if (t >= E.accent.start + E.accent.dur) {
      cell.state = "active";
      cell.pulseAt = now;
      cell.accent.style.filter = "brightness(1)";
    }
  }

  // ---- Maintien : pulse unique du liseré, tout est tenu ----
  function updateActive(cell, now) {
    const pulseT = now - cell.pulseAt;
    if (pulseT < 0.28) {
      const b = 1 + 0.7 * Math.sin(clamp(pulseT / 0.28, 0, 1) * Math.PI);
      cell.accent.style.filter = `brightness(${b.toFixed(2)})`;
    } else {
      cell.accent.style.filter = "";
    }
  }

  // ---- Sortie : ordre inverse (accent → poste → nom → portrait), durées × 60 %.
  // Chaque couche repart de sa progression capturée au moment de la sortie. ----
  function updateLeaving(cell, now) {
    const t = now - cell.t0;
    const f = cell.f || captureProgress(cell, now);

    // Liseré (tout premier à se rétracter)
    renderAccent(cell, f.accent * (1 - easeOutQuint(prog(t, X.accent.start, X.accent.dur))));
    cell.accent.style.filter = "";

    // Poste + devise (la devise repart juste après le poste)
    renderRole(
      cell,
      f.role * (1 - easePower4(prog(t, X.role.start, X.role.dur))),
      f.quote * (1 - easePower4(prog(t, X.quote.start, X.quote.dur)))
    );

    // Nom (lettres qui se rétractent en ordre inverse)
    const lettersP = cell.letters.map((_, li) => {
      const start = X.name.start + (cell.letters.length - 1 - li) * NAME_LETTER_STAGGER;
      return f.letters[li] * (1 - easePower4(prog(t, start, 0.24)));
    });
    renderName(cell, f.name * (1 - easePower4(prog(t, X.name.start, X.name.dur))), lettersP);

    // Portrait (le dernier : il se désature ET recule en même temps — jamais un cut,
    // il finit exactement sur l'état masqué de la niche)
    renderPortrait(cell, f.portrait * (1 - easeOutExpo(prog(t, X.portrait.start, X.portrait.dur))));

    if (t >= X.portrait.start + X.portrait.dur) {
      cell.state = "idle";
      cell.f = null;
      setHiddenState(cell);
    }
  }

  // ---- COUCHE 5 — environnement : les voisins respirent ----
  function breathe(cell, now) {
    // scale 0.85 ↔ 0.87, cycle lent de 4 s (sinusoïdal)
    const b = 0.85 + 0.02 * (0.5 + 0.5 * Math.sin((now * Math.PI * 2) / 4 + cell.phase));
    cell.el.style.transform = `translateZ(-50px) scale(${b.toFixed(4)})`;
  }

  // ---- Boucle principale ----
  let raf = 0;
  let running = false;
  function frame(nowMs) {
    const now = nowMs / 1000;
    teamLenis.raf(nowMs);
    handleActiveChange(now);
    for (const cell of cells) {
      if (cell.state === "entering") updateEntering(cell, now);
      else if (cell.state === "active") updateActive(cell, now);
      else if (cell.state === "leaving") updateLeaving(cell, now);
      else breathe(cell, now);
    }
    // Caméra « tenue à la main » : tangage lent indépendant du scroll
    corridor.style.transform = `rotateZ(${(Math.sin(now * 0.5) * 0.4).toFixed(3)}deg)`;
    raf = requestAnimationFrame(frame);
  }

  function focusCell(i) {
    const left = Math.max(0, cellCenterX(i) - scroller.clientWidth / 2);
    teamLenis.scrollTo(left, { duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3) });
    if (reducedMotion) requestAnimationFrame(() => applyInstant());
  }

  function focusCover() {
    const left = Math.max(0, cover.cx() - scroller.clientWidth / 2);
    teamLenis.scrollTo(left, { duration: 1.15, easing: (t) => 1 - Math.pow(1 - t, 3) });
    if (reducedMotion) requestAnimationFrame(() => applyInstant());
  }

  function nav(dir) {
    // En bout de couloir, « suivant » ramène à la page de garde (boucle douce)
    if (dir > 0 && activeIndex === cells.length - 1) {
      focusCover();
      return;
    }
    const target = clamp(activeIndex + dir, 0, cells.length - 1);
    if (target === activeIndex) return;
    focusCell(target);
  }

  // ---- Préférence « réduire les animations » : état instantané ----
  function applyInstant() {
    const ai = computeActive();
    activeIndex = ai;
    cells.forEach((cell, i) => {
      if (i === ai) {
        cell.wrap.style.transform = "translateZ(60px) scale(1.6)";
        cell.portrait.style.filter = "grayscale(0%) blur(0px) brightness(1)";
        cell.glow.style.opacity = "1";
        cell.mono.style.opacity = "1";
        cell.mono.style.transform = "none";
        cell.name.style.opacity = "1";
        cell.name.style.transform = "none";
        cell.name.style.filter = "none";
        cell.role.style.opacity = "1";
        cell.role.style.transform = "none";
        cell.role.style.letterSpacing = "0.08em";
        cell.quote.style.opacity = "1";
        cell.quote.style.transform = "none";
        cell.accent.style.transform = "scaleX(1)";
        cell.el.style.transform = "none";
        for (const l of cell.letters) {
          l.style.opacity = "1";
          l.style.transform = "none";
          l.style.filter = "none";
        }
      } else {
        setHiddenState(cell);
        cell.el.style.transform = "translateZ(-50px) scale(0.85)";
      }
    });
    corridor.style.transform = "none";
    updateCount();
  }

  // ---- Ouverture / fermeture ----
  function open() {
    document.body.classList.add("mode-team");
    document.documentElement.classList.add("team-lock");
    ensureLenis();
    // Chaque chargement : les portraits et devises sont re-générés (postes fixes)
    if (reducedMotion) {
      // (on garde les membres déjà générés : pas de re-peinture ni d'animation)
      scroller.scrollLeft = Math.max(0, cover.cx() - scroller.clientWidth / 2);
      applyInstant();
      teamLenis.start();
      return;
    }
    // On démarre sur la page de garde, puis la chorégraphie attend le défilement
    cells.forEach((c) => {
      c.state = "idle";
      c.f = null;
      setHiddenState(c);
    });
    activeIndex = -1;
    scroller.scrollLeft = Math.max(0, cover.cx() - scroller.clientWidth / 2);
    activeIndex = computeActive();
    updateCount();
    if (!running) {
      running = true;
      teamLenis.start();
      raf = requestAnimationFrame(frame);
    }
  }

  function close() {
    document.body.classList.remove("mode-team");
    document.documentElement.classList.remove("team-lock");
    if (running) {
      running = false;
      cancelAnimationFrame(raf);
    }
    if (teamLenis) teamLenis.stop();
  }

  // En « réduire les animations » : sans boucle rAF, on rafraîchit la cellule
  // active à chaque mouvement du couloir (molette, flèches, clic).
  scroller.addEventListener("scroll", () => {
    if (reducedMotion && running) applyInstant();
  });

  // Navigation : page de garde, flèches du bandeau, clavier
  coverCta.addEventListener("click", () => focusCell(0));
  root.querySelector("#team-prev").addEventListener("click", () => nav(-1));
  root.querySelector("#team-next").addEventListener("click", () => nav(1));
  closeBtn.addEventListener("click", () => onExit && onExit());

  return { open, close, nav, isOpen: () => document.body.classList.contains("mode-team"), focusCell };
}
