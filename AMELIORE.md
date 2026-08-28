# AMELIORE - Panotik x aanid

> *Voici tout ce qu'il y a, tout ce qui manque, et tout ce qu'il faut faire
> pour que ce projet passe du "bien" au "perfectionné de ouf".*

---

## 0. Ce qu'on a - l'etat des lieux

| | Ce qui marche | Ce qui cloche |
|---|---|---|
| **Visuel** | Scene 3D boulevard nocturne immersive, animations GSAP fluides, palette coherente "sable/nuit" | JetBrains Mono referencee dans le theme CSS mais jamais chargee (fallback systeme) |
| **Navigation** | Navbar pill flottante + menu mobile, ChapterHUD progressif, smooth scroll Lenis | Liens footer vers `#` (A propos, Mentions legales, CGU, Confidentialite) - tout est mort |
| **CTA** | Bouton "Telecharger" present partout | Le href du bouton final pointe vers `#` - pas de vraie URL de telechargement |
| **3D** | 16 panneaux, skyline, route, particules, camera rig - le coeur du projet | Dossier `src/story/` entier (4 fichiers) = code orphelin, jamais importe nulle part |
| **Accessibilite** | `prefers-reduced-motion` gere partout, skip-to-content, `aria-label`, `sr-only` | Pas de `<meta og:*>`, pas de structured data, pas de Twitter cards |
| **Perf** | `manualChunks` Three/GSAP dans vite.config, DPR adapte mobile, panneaux reduits sur petits ecrans | Pas de lazy loading du Hero/Features, pas de preconnect, JetBrains Mono non bundlee |

---

## 1. Les liens morts - a corriger en priorite

C'est le genre de truc qui tue la confiance d'un visiteur en 2 secondes.

### 1.1 - Le bouton "Telecharger l'application"

`FinalCTA.jsx` ligne 28 :

```jsx
// AVANT
<a href="#">

// APRES - remplacer par le vrai lien Play Store / App Store / APK direct
<a href="https://play.google.com/store/apps/details?id=com.panotik.aanid">
```

> **A faire aussi** : ajouter un `target="_blank" rel="noopener noreferrer"` pour
> les liens externes, et prevoir un fallback "Lien bientot disponible" si l'app
> n'est pas encore sur les stores.

### 1.2 - Les liens du footer

`Footer.jsx` - 5 liens pointent vers `#` :

| Lien | Ce qu'il faut faire |
|------|---------------------|
| `A propos de Panotik` | Creer une page `/a-propos` ou une section scrollable |
| `Mentions legales` | Creer `/mentions-legales` avec les infos obligatoires |
| `Conditions generales` | Creer `/cgu` |
| `Confidentialite` | Creer `/confidentialite` (RGPD meme en Afrique, ca rassure) |
| `Contact` | Verifier que `contact@panotik.com` existe et recoit |

### 1.3 - Le lien "S'inscrire a la formation"

`Pricing.jsx` - le bouton mene a `#telecharger` (la section CTA). Ce n'est pas
le bon endroit : il faudrait un formulaire d'inscription ou au minimum un
`mailto:` pre-rempli avec le sujet "Inscription formation panneautique".

---

## 2. SEO & Meta - etre visible sur Google

Le `index.html` est tres minimaliste. Voici ce qu'il manque :

### 2.1 - Open Graph + Twitter Cards

```html
<!-- Ajouter dans <head> -->
<meta property="og:title" content="Panotik - aanid, gestion de la panneautique urbaine" />
<meta property="og:description" content="Signalement, cartographie et valorisation des panneaux publicitaires en Afrique." />
<meta property="og:image" content="https://panotik.com/og-image.png" />
<meta property="og:url" content="https://panotik.com" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Panotik - aanid" />
<meta name="twitter:description" content="L'application de gestion de la panneautique urbaine en Afrique." />
<meta name="twitter:image" content="https://panotik.com/og-image.png" />
```

### 2.2 - Structured Data (JSON-LD)

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "aanid",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Android, iOS",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "XOF"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Panotik"
  }
}
</script>
```

### 2.3 - Sitemap + robots.txt

Creer `public/robots.txt` et `public/sitemap.xml` pour guider les crawlers.

---

## 3. Performance - que ca tourne smooth partout

### 3.1 - JetBrains Mono : charger ou supprimer

Le theme CSS declare `--font-mono: 'JetBrains Mono'` mais la police n'est ni
bundlee, ni chargee via Google Fonts. Resultat : fallback systeme moche.

**Option A** - la charger :
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />
```

**Option B** - la retirer du theme si elle n'est pas essentielle :
```css
--font-mono: ui-monospace, 'SF Mono', Menlo, Consolas, monospace;
```

### 3.2 - Preconnect & dns-prefetch

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

### 3.3 - Lazy loading des sections lourdes

Le `BoulevardScene` est deja lazy-charge via `React.lazy()` - bien. Mais on
pourrait aller plus loin :

- **Preload du Hero** : le premier ecran doit etre immediat
- **Intersection Observer** sur `Features.jsx` (le scroll horizontal GSAP est lourd)
- **Virtualiser** les `Sparkles` si le compteur est trop eleve sur mobile

### 3.4 - Bundle analysis

Ajouter `rollup-plugin-visualizer` pour identifier les deps inutiles :

```bash
npm i -D rollup-plugin-visualizer
```

```js
// vite.config.js
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  react(),
  tailwindcss(),
  visualizer({ open: true }),
]
```

---

## 4. Code mort a nettoyer

### 4.1 - Le dossier `src/story/` entier

Ces 4 fichiers ne sont **importes nulle part** dans `App.jsx` :

```
src/story/
├── storyStore.js        # pub/sub store - remplace par useScrollProgress
├── useStoryProgress.js  # hook React - jamais utilise
├── StoryScene.jsx       # scene 3D alternative (6 panneaux, 5 arrets)
└── ProgressRail.jsx     # barre de progression alternative
```

**Action** : supprimer tout le dossier, ou le deplacer dans un repo d'archive
si on veut garder l'idee pour plus tard.

### 4.2 - Animation keyframe orpheline

Dans `index.css`, la classe `.hero-enter` a une animation CSS `hero-enter` definie
a la ligne 173, mais **le Hero.jsx utilise GSAP** pour animer les elements
`.hero-enter` (ligne 16-24). L'animation CSS est donc ecrasee par GSAP et
ne sert a rien - la supprimer pour eviter la confusion.

---

## 5. Features a rajouter

### 5.1 - Compteur de chiffres animes (Hero)

Les stats "128 panneaux", "9 opportunites", "24 formations" sont statiques.
Un **compteur anime au scroll** (style odometer) serait beaucoup plus percutant :

```jsx
// Idee : hook useCountUp(target, duration)
// Se declenche quand la section entre dans le viewport
// Anime de 0 a la valeur cible
```

### 5.2 - Section temoignages / social proof

Rien ne prouve que l'app fonctionne deja. Ajouter :

- **3-5 temoignages** de citoyens ou professionnels a Cotonou
- **Logos de partenaires** ou collectivites (si available)
- **Compteur live** reel (appel API au backend) au lieu des stats hardcodees

### 5.3 - FAQ section

Une FAQ avant le CTA final leverait les dernieres objections :

```
- "C'est vraiment gratuit pour les citoyens ?"
- "Comment je suis paye pour un relais ?"
- "La formation est-elle reconnue officiellement ?"
- "Dans quelles villes est disponible aanid ?"
```

### 5.4 - Newsletter / inscription email

Un champ email simple dans le Footer ou avant le CTA final, connecte a :

- **Brevo** (ex-Sendinblue) - gratuit jusqu'a 300 emails/jour
- **Buttondown** - newsletter minimaliste
- Ou un simple `mailto:` pre-rempli en solution de repli

### 5.5 - Bandeau "Disponible bientot" ou QR code

Si l'app n'est pas encore sur les stores, un **QR code** qui mene vers une
page d'attente (Typeform, Tally, ou une landing pre-launch) serait ideal.

### 5.6 - Multi-ville dynamique

Actuellement tout est "Cotonou". Si l'app se deploye dans d'autres villes :

- Rendre le Hero adaptable (stats par ville)
- Ajouter un selecteur de ville dans la Navbar
- Connecter les stats a une API reelle

---

## 6. Accessibilite - aller plus loin

Le projet est deja bien placed (reduced motion, aria-label, skip-link).
Voici les prochains niveaux :

| Amelioration | Effort |
|---|---|
| `aria-live="polite"` sur le ChapterHUD pour annoncer le changement de chapitre aux screen readers | Faible |
| `role="img"` + `aria-label` sur le Canvas Three.js (il a `aria-hidden`, c'est bien, mais un label optionnel aide) | Faible |
| Verifier le contraste de toutes les couleurs (les `text-mist/85` sur `bg-night-soft` sont borderline) | Moyen |
| Ajouter un `:focus` visible sur les cartes tilt (pas seulement `:focus-visible`) | Faible |
| Tester avec **Lighthouse** et **axe DevTools** - viser 95+ a11y score | Moyen |

---

## 7. Outils de dev a ajouter

### 7.1 - Linting + Formatting

```bash
npm i -D eslint @eslint/js eslint-plugin-react-hooks prettier
```

Creer un `.eslintrc.json` et un `.prettierrc` pour uniformiser le code.
Ajouter les scripts :

```json
{
  "lint": "eslint src/",
  "format": "prettier --write src/"
}
```

### 7.2 - TypeScript (optionnel mais recommande)

Le projet n'a aucun type. Meme un `jsconfig.json` avec `checkJs: true` dans
`tsconfig.json` ameliore l'IDE experience. A terme, migrer vers `.tsx` pour
securiser les props des composants.

### 7.3 - Tests

| Type | Outil | Ce qu'on teste |
|---|---|---|
| Unit | **Vitest** | Hooks (`useTilt`, `useScrollProgress`), helpers (`buildLayout`) |
| Component | **React Testing Library** | Rendu des sections, interactions Navbar |
| E2E | **Playwright** | Parcours complet : scroll, clics CTA, menu mobile |
| Visual | **Chromatic** ou **Storybook** | Regression visuelle des composants |

### 7.4 - Analyse de deps

```bash
npx depcheck    # detecte les deps inutilisees
npx npm-check-updates  # verifie les mises a jour
```

---

## 8. Design & UX - les finitions

### 8.1 - Skeleton loading pour la scene 3D

Pendant le chargement de `BoulevardScene` (lazy), l'utilisateur voit un
fond noir brut. Ajouter un **skeleton** ou un **gradient animé** pour
signaler que quelque chose arrive.

### 8.2 - Micro-interactions supplementaires

- **Hover glow** sur les boutons CTA (pas juste un changement de couleur)
- **Ripple effect** au clic (material design style, discret)
- **Parallaxe legere** sur le texte du Hero par rapport au fond 3D
- **Confetti** discret quand on clique "Telecharger" (pour feter l'action)

### 8.3 - Dark/Light mode (si besoin)

Le theme est deja dark-first. Si certaines parties du public preferent un mode
clair, ajouter un toggle. Mais vu la metafore "boulevard nocturne", le dark
mode est probablement le seul qui ait du sens ici.

### 8.4 - Transitions de page

Si on ajoute des pages (a-propos, mentions-legales), prevoir des **transitions
de page** avec `framer-motion` ou GSAP pour garder la coherence visuelle.

---

## 9. Deployment & CI/CD

### 9.1 - Hébergement recommande

| Option | Pourquoi |
|---|---|
| **Vercel** | Free tier generieux, deploiement auto depuis Git, edge network, previews de PR |
| **Netlify** | Similaire a Vercel, bon pour les sites statiques |
| **Cloudflare Pages** | Free illimite, tres performant en Afrique |

### 9.2 - Pipeline CI

Creer `.github/workflows/ci.yml` :

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm run lint
      - run: npm run build
      # - run: npm test  # quand les tests seront en place
```

### 9.3 - Environnement

- Creer un `.env.example` pour documenter les variables d'environnement
- Prevoir des variables pour : `VITE_API_URL`, `VITE_GA_ID` (analytics), `VITE_CONTACT_EMAIL`
- Ajouter **Google Analytics** ou **Plausible** (respectueux de la vie privee)

---

## 10. Le plan d'action - ordre de priorite

```
URGENT (avant de lancer)
  [ ] Corriger le lien "Telecharger" (href="#")
  [ ] Corriger les 5 liens morts du footer
  [ ] Ajouter les meta Open Graph
  [ ] Supprimer src/story/ (code mort)
  [ ] Resoudre JetBrains Mono (charger ou retirer)

IMPORTANT (premiere semaine)
  [ ] Ajouter structured data JSON-LD
  [ ] Creer robots.txt + sitemap.xml
  [ ] Ajouter skeleton loading pour la scene 3D
  [ ] Installer ESLint + Prettier
  [ ] Ajouter le script lint dans package.json
  [ ] Configurer le deploiement (Vercel ou Cloudflare Pages)
  [ ] Ajouter un pipeline CI GitHub Actions

BIEN (deuxieme semaine)
  [ ] Section temoignages / social proof
  [ ] FAQ avec questions frequentes
  [ ] Compteur anime dans le Hero
  [ ] Newsletter inscription email
  [ ] Bundle analysis (rollup-plugin-visualizer)
  [ ] Tests Vitest pour les hooks
  [ ] Preconnect fonts.googleapis.com

PARFAIT (mois suivant)
  [ ] Tests E2E Playwright
  [ ] TypeScript progressif (d'abord jsconfig, puis migration .tsx)
  [ ] Analytics (Plausible ou GA4)
  [ ] Multi-ville dynamique
  [ ] Transitions de page si ajout de routes
  [ ] Chromatic / Storybook pour regression visuelle
  [ ] Performance audit (Lighthouse 95+ sur mobile)
```

---

> **En resume** : le projet est visuellement impressionnant et techniquement
> solide. Les 3 trucs les plus critiques sont - (1) corriger les liens morts,
> (2) ajouter le SEO de base, (3) supprimer le code orphelin. Ensuite c'est
> du polish progressif qui transforme une bonne landing page en quelque chose
> de veritablement professionnel.
