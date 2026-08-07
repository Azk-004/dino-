# Panneautique — Domaine public

> Formation interactive **Module 1** : « La panneautique sur le domaine public ».
> Un parcours immersif en 3D le long d'une promenade nocturne, où chaque panneau publicitaire porte une étape du cours — complété par un **format de lecture illustré** et un **questionnaire de validation** (12 questions).

---

## 🎬 Deux modes de lecture

| Mode | Description |
| --- | --- |
| **Parcours 3D** | Défilez le long d'une rue nocturne animée : chaque panneau est une leçon. Cliquez un panneau (ou `Entrée`) pour ouvrir la leçon dans une fenêtre dédiée. |
| **Cours illustré** | Lecture complète et fluide du module : sommaire par chapitres, 13 sections chacune illustrée par une scène réaliste générée procéduralement, scroll inertiel. |

Le parcours 3D se termine par un **questionnaire de 12 questions** avec score, correction détaillée et verdict de validation.

---

## ✨ Fonctionnalités

- **Monde 3D vivant** : ville au crépuscule, montagnes, dunes, palmiers qui se balancent, oiseaux, voitures qui défilent avec phares, lucioles, poussière en dérive, lampadaires scintillants, étoiles filantes.
- **Scénographie** : caméra à ressort amorti critique (aucun lag), inclinaison dans les virages, cadrage du panneau en approche, panneaux orientés face à la caméra, profondeur de champ, brume chaude et vignettage cinéma.
- **Interactivité** : survol des panneaux (halo + zoom), panneaux et panneaux directionnels cliquables (raycasting), navigation clavier complète, points de saut de station.
- **Illustrations procédurales** : 13 scènes 2D peintes sur canvas (ciel crépusculaire, perspective, lune, ville en couches, route, lumière) — aucune ressource image externe.
- **Contenu pédagogique** : les 13 étapes du module (présentation, importance, constat, audit, état des lieux GPS, zonage, constitution des lots, mise en concession, attribution, gestion des régies, évaluation, mise à jour, quiz) issues du cours officiel.

---

## 🛠 Stack technique

- [Vite](https://vitejs.dev/) 5 — bundler + serveur de dev
- [three.js](https://threejs.org/) 0.170 — rendu 3D (WebGL)
- [Lenis](https://lenis.darkroom.engineering/) 1.1 — scroll fluide / inertiel (parcours + cours)
- GSAP — animations UI

---

## 🚀 Démarrage

```bash
npm install        # installer les dépendances
npm run dev        # serveur de développement (Vite)
npm run build      # build de production dans dist/
npm run preview    # prévisualiser le build (dist/)
```

Le site est une page unique (`index.html`) ; tout le code applicatif vit dans `src/`.

---

## 🗂 Structure du projet

```
src/
├── main.js           # Orchestration : scroll Lenis, clavier, raycasting, modes, hooks debug
├── scene.js          # Scène 3D : monde, caméra ressort, vie (voitures, oiseaux, météores…), picking
├── world.js          # Builders procéduraux : route, panneaux, bâtiments, palmiers, bancs, voitures…
├── ui.js             # Interface du parcours : carte station, lecteur de leçon, quiz
├── course.js         # Mode « cours illustré » : sommaire, sections illustrées, scroll-spy
├── illustrations.js  # 13 illustrations 2D procédurales (canvas)
├── data.js           # STATIONS (13) · QUIZ (12) · CHAPITRES
└── style.css         # Thème beige/grain, vignette, cinématique
```

### Hooks de débogage (console)

`window.__panneautique` expose `openReader`, `closeReader`, `openCourse`, `closeCourse`, `pickAt`, `getState`, `settle` pour vérifier le site en headless.

---

## 📦 Contenu

- **13 stations** couvrant l'intégralité du cours (PDF 8 pages, « Panneautique — Domaine public »).
- **12 questions** de validation avec correction et verdict.
- Auteur du cours : *Winoumi AGOUA*.

---

Fait avec 🌆 et beaucoup de crépuscule.
