# Panotik - aanid

Landing page de **Panotik**, présentant **aanid**, l'application de gestion de la panneautique urbaine.

## Stack

- React 18 + Vite 6
- Tailwind CSS v4
- GSAP + ScrollTrigger (animations)
- Lenis (smooth scroll)
- Three.js / React Three Fiber (scène boulevard)
- lucide-react (icônes)

## Démarrage

```bash
npm install
npm run dev      # serveur de développement
npm run build    # build de production (dist/)
npm run preview  # prévisualiser le build
```

## Structure

```
src/
├── App.jsx                 # Assemblage + scène 3D lazy
├── hooks/                  # Lenis, scroll progress, tilt
├── three/                  # BoulevardScene (R3F)
└── components/
    ├── Navbar.jsx          # Navigation pill flottante
    ├── Hero.jsx            # Panotik présente aanid + CTA
    ├── Presentation.jsx    # Présentation du produit aanid
    ├── Features.jsx        # Fonctionnalités principales
    ├── Pricing.jsx         # Formation & tarifs
    ├── Audiences.jsx       # Publics cibles
    ├── FinalCTA.jsx        # CTA final (téléchargement + contact)
    ├── Footer.jsx          # Pied de page Panotik
    ├── ChapterHUD.jsx      # Progression de lecture
    └── Reveal.jsx          # Apparitions au scroll
```

Domaine prévu : [panotik.site](https://panotik.site)
