# Scoly — site vitrine (scoly.ink)

Site vitrine de l'application [Scoly](https://app.scoly.ink).

## Documentation du projet

- `docs/BRIEF.md` : contexte, ton, design, tarifs, règles de travail. **À lire en premier.**
- `docs/JOURNAL.md` : journal de bord, mis à jour à chaque intervention.
- `docs/ILLUSTRATIONS.md` : guide du style d'illustration (palette `--ill-*`, personnages, poids, accessibilité).
- `docs/DEPLOIEMENT.md` : mise en ligne sur Cloudflare, pas à pas, pour une personne non technicienne.
- `docs/CHECKLIST-LANCEMENT.md` : ce que le propriétaire doit faire ou vérifier avant d'annoncer le site.
- `prompts/` : un prompt par étape de développement.

## Stack

| Rôle | Outil |
|---|---|
| Framework | Astro 7 (site statique, 0 JS par défaut) |
| Style | Tailwind CSS v4 (tokens dans `src/styles/global.css`) |
| Composants UI | Preline (plugins chargés à la carte) |
| Animations / scroll | GSAP + ScrollTrigger, Lenis |
| Polices | Inter + Newsreader (Fontsource, auto-hébergées) |
| Hébergement | Cloudflare (Workers Static Assets) |

## Commandes

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # génère ./dist
npm run preview      # sert ./dist
npm run check        # vérification TypeScript / Astro
npm run audit        # audit de dist/ (après npm run build) : ancres, liens, alt, SEO, chaînes interdites, poids
npm run make-og      # régénère public/og-scoly.png (image de partage 1200 × 630)
npm run make-icons   # régénère favicon.ico, icon-192/512, apple-touch-icon et les logos WebP
npm run deploy       # build + wrangler deploy (Cloudflare)
```

## Structure

```
public/            logos, icônes, site.webmanifest, og-scoly.png, _headers, robots.txt (+ futures vidéos du hero dans video/)
scripts/           audit.mjs, make-og.mjs, make-icons.mjs (scripts Node, sans dépendance d'exécution)
docs/              BRIEF, JOURNAL, ILLUSTRATIONS, DEPLOIEMENT, CHECKLIST-LANCEMENT
src/layouts/       Base.astro  → <head>/SEO, thème sombre, chargement Preline + motion
src/pages/         index.astro (assemble les sections), 404.astro, [slug].astro (pages légales)
src/content/legal/ confidentialite.md, conditions.md, cookies.md (textes légaux, voir « Pages légales »)
src/lib/           jsonld.ts (données structurées), legal.ts (pages légales publiées)
src/config/        site.ts     → URLs, navigation, contacts, ids d'ancre (source unique) ; pricing.ts, faq.ts, seo.ts
src/components/illustrations/  scènes SVG inline (SansScoly, AvecScoly), voir docs/ILLUSTRATIONS.md
src/components/documents/  aperçus de documents en HTML/CSS (feuille Paper + 5 documents), données fictives dans sample.ts
src/components/ui/        composants de base (Button, Card, Icon…)
src/components/sections/  une section = un fichier
src/components/layout/    Navbar, Footer
src/scripts/       motion.ts (Lenis + GSAP), theme.ts (bascule clair / sombre), navbar.ts (état au scroll, scrollspy, menu mobile),
                   how-it-works.ts (remplissage au scroll de la ligne de « Comment ça marche »), video-frame.ts (lecteur du Hero),
                   documents-tabs.ts (onglets de la section Documents)
src/styles/        global.css  → Tailwind, Preline, tokens de couleur, thème sombre
```

## Conventions

- **Couleurs** : tokens `brand-*` (issus du logo) + tokens sémantiques `canvas`, `surface`, `tile`, `line`, `ink`, `muted`,
  `primary` / `on-primary`, `accent`, `badge`, `focus` (redéfinis sous `.dark`). Préférer ces tokens aux couleurs en dur.
- **Typographie** : classes `type-h1`, `type-h2`, `type-h3`, `type-lead`, `type-body`, `type-small`, `type-label` (tailles fluides).
  Ne pas redéfinir de tailles de titre à la main.
- **Animation au scroll** : ajouter `data-reveal` (et `data-delay="0.1"`) sur un élément.
  Désactivé automatiquement si l'utilisateur demande « réduire les animations ».
- **Preline** : le bundle complet pèse ~500 Ko. On importe uniquement les plugins utilisés dans
  `Base.astro` et on les déclare aussi dans `prelineSideEffects` (`astro.config.mjs`).
- **Thème** : tout élément portant `data-theme-toggle` bascule clair / sombre (voir `src/scripts/theme.ts`).
  Avec `data-label-to-dark` et `data-label-to-light`, le bouton reçoit un `aria-label` mis à jour (et pas d'`aria-pressed`).
- **Navigation** : `Navbar.astro` lit `navigation` et `site.links` dans `site.ts`. Barre sticky dans le flux (pas de compensation dans le Hero). Le décalage des ancres vient du `scroll-mt-24` de `Section` : une section ciblée par la barre doit l'utiliser. Attributs posés par `navbar.ts` : `data-scrolled`, `data-menu-open`, `aria-current="location"`.
- **Logo** : `logo-scoly*.png` (texte marine, thème clair) et `logo-scoly-dark*.png` (texte clair, thème sombre).

## Illustrations

- Le site n'utilise **aucune photo** : les visuels sont des **SVG originaux** en composants Astro dans `src/components/illustrations/` (inline, pour hériter du thème clair / sombre).
- Couleurs : variables `--ill-*` et classes partagées (`fb`, `fs`, `fn`…) dans `src/styles/global.css`. Aucune couleur en dur.
- Style, palette, personnages, poids cible (6 à 14 Ko par scène), accessibilité (`aria-hidden`) et animations (CSS, `prefers-reduced-motion`) : **`docs/ILLUSTRATIONS.md`**, à lire avant d'ajouter une scène.
- Exemple : `src/components/sections/Problems.astro`.
- Pour une image bitmap exceptionnelle : `src/assets/images/` + `<Picture>` d'`astro:assets`, dimensions déclarées, conteneur à ratio fixe.

## Section « Comment ça marche »

- `src/components/sections/HowItWorks.astro` : une liste ordonnée `<ol>` de trois étapes (pastille numérotée, carte avec **icône**, titre, texte). **Aucune illustration** : choix volontaire, pour distinguer cette section du zigzag de `#pourquoi`.
- Icônes : `Icon.astro` (`upload`, `file`, `archive`, plus une petite pastille `shield` sur la 3ᵉ carte). Aucune icône ajoutée à `icons.ts` : la liste des icônes n'a pas changé.
- La ligne qui relie les pastilles est faite de segments (`.hiw-track` / `.hiw-fill`). `src/scripts/how-it-works.ts` les remplit au scroll (GSAP ScrollTrigger, `scrub`) via la variable CSS `--hiw-s`, sans modifier `motion.ts`. Sans JavaScript ou avec `prefers-reduced-motion`, la ligne reste entière (le CSS ne la vide que si `data-hiw-ready` est posé sur `[data-hiw]`).

## Section « Documents »

- `src/components/sections/Documents.astro` : onglets en pilule (motif ARIA `tablist` / `tab` / `tabpanel`) et cinq panneaux. Chaque panneau contient l'aperçu du document (à gauche au bureau, au-dessus sinon) et son texte (h3, description, phrase commune). Les cinq panneaux sont dans le HTML ; seul le premier est visible, les autres sont `hidden`. **Sans JavaScript**, la pilule est masquée et les cinq panneaux s'affichent en liste.
- `src/scripts/documents-tabs.ts` : script dédié (sans Preline) : clic, flèches gauche / droite (avec retour), Début, Fin, un seul onglet dans l'ordre de tabulation, onglet actif amené au centre de la pilule qui défile. Le fondu de 250 ms est posé par la classe `docs-in` ; rien en `prefers-reduced-motion`.
- `src/components/documents/` : `Paper.astro` (feuille A4 blanche, ratio 1 : 1,414, ombre, double filet, classes `pp-*`), `PaperHeader`, `PaperSign` (date, fonction, cachet rond et signature en SVG), `PaperFooter`, `Qr` (motif décoratif, non scannable, certificat seulement), puis un composant par document : `CertificatScolarite`, `AttestationInscription`, `FicheEleve`, `AttestationTransfert`, `DemandeTransfert`.
- **Tout est dimensionné en `cqw`** (largeur de la feuille) : l'aperçu garde ses proportions à toute largeur. Texte minimal : 2,85 cqw (9,2 px à 390 px). La feuille porte la classe `.light` : elle reste blanche en thème sombre.
- **Données fictives** : `src/components/documents/sample.ts` (« Établissement Exemple », « NOM Prénom », matricule « 000000 », dates « JJ/MM/AAAA »). L'année scolaire est calculée au build (septembre à août). Aucun vrai nom, aucun vrai numéro, aucun code de vérification inventé.
- Ajouter un type de document : créer un composant à base de `Paper`, puis l'ajouter au tableau `docs` de `Documents.astro` (étiquette, description, composant). Garder tout le contenu dans la hauteur de la feuille (vérifier qu'il n'y a pas de débordement à 390 px).

## Section « Fonctionnalités »

- `src/components/sections/Features.astro` : grille de six capacités **sans cartes**, `<ul>` de six `<li>` (icône, h3, un paragraphe). Bureau ≥ 1024 px : 3 × 2 ; de 640 à 1023 px : 2 colonnes ; dessous : 1 colonne. Les filets sont faits d'un conteneur teinté `line` avec `gap: 1px` ; chaque cellule repose sur `surface` (fond plein obligatoire). Cellules de même hauteur (`grid-auto-rows: 1fr`).
- Survol décoratif **uniquement** sous `@media (hover: hover)` : dégradé léger, barre verticale qui passe au bleu marine, titre décalé de 10 px (ce dernier retiré si `prefers-reduced-motion`). Les cellules ne sont ni des liens ni des boutons.
- Icônes : `file`, `pen`, `upload`, `archive`, `users`, `shield` (`Icon.astro`). Apparition : `data-reveal` sur le contenu des cellules, pas sur les cellules (le filet ne doit pas bouger). Aucun script propre à la section.
- Ajouter une capacité : ajouter un objet au tableau `features` ; garder un nombre de cellules divisible par 2 et par 3 (6, 12…), sinon une case vide laisserait voir le fond `line`.

## Section « Tarifs »

- `src/config/pricing.ts` : source unique des formules (nom, prix, équivalent mensuel, description, bouton, liste, `recommended`) et des libellés. `Pricing.astro` ne contient aucun prix. Aides : `formatAmount` (espace insécable des milliers), `monthlyLine`, `priceForScreenReaders`, `resolveDestination` (`signup` → création de compte ; `contact` → WhatsApp, sinon e-mail, sinon `#contact`).
- Modifier un prix ou une ligne : éditer `plans`. Ajouter « Historique détaillé des opérations » : l'ajouter à `features` d'`etablissement-plus` (après confirmation).
- `src/components/sections/Pricing.astro` : 4 colonnes dès 1280 px, 2 × 2 de 640 à 1279 px, 1 colonne en dessous. Chaque carte est un `subgrid` de 6 rangées (nom, prix, mensuel, description, bouton, liste) : tout reste aligné d'une carte à l'autre. Pas de JavaScript propre à la section.

## Section « FAQ »

- `src/config/faq.ts` : source unique (`faqItems` : id, question, réponse en texte brut, lien facultatif `{ label, href, external }` ; `faqCopy` : titre, sous-titre, ligne d'aide). Le composant n'écrit aucun texte. Ajouter une question : ajouter un objet à `faqItems` (le premier est ouvert par défaut). Les liens viennent de `site.ts` (`sectionIds`, `site.links`).
- `src/components/sections/Faq.astro` : carte unique de `<details>` / `<summary>` natifs, sans script. Animation CSS (`::details-content`, `interpolate-size`) avec repli instantané. Bureau : colonne gauche collante ; dessous : une colonne.
- `faqItems` alimente aussi le JSON-LD FAQPage (voir « SEO et données structurées »).

## CTA final, footer et liens activables

- `src/config/site.ts` : `site.contact` (WhatsApp, e-mail, messages), `whatsappLink`, `emailLink`, `demoWhatsappLink`, `demoEmailLink`, et `footerGroups`. Une valeur `null` retire le bouton, la ligne ou la colonne concernés (jamais de lien cassé).
- `FinalCta.astro` : bloc marine (`#contact`). Bouton secondaire : WhatsApp avec message, sinon e-mail, sinon absent. Cible de « Nous contacter » (Tarifs, repli) et des liens `#contact`.
- `Footer.astro` : colonnes lues dans `footerGroups`. **Activer un lien** : passer `enabled: true` (les liens légaux s'activent d'eux-mêmes, voir « Pages légales »). Une colonne sans lien actif est masquée.

## SEO et données structurées

- `src/config/seo.ts` : titre (≤ 60 caractères), description (≤ 155), image de partage et logo des données structurées. `Base.astro` les utilise par défaut (balises `title`, `description`, `canonical`, Open Graph, Twitter).
- `src/lib/jsonld.ts` : construit **un seul bloc JSON-LD `@graph`** (Organization, WebSite, SoftwareApplication avec les quatre formules en XOF, FAQPage) à partir de `site.ts`, `pricing.ts` et `faq.ts`. Aucun texte en dur, aucun avis ni note. Modifier un prix ou une question met à jour les données structurées au prochain build.
- `public/og-scoly.png` : générée par `npm run make-og` (logo seul sur fond de marque). Icônes et logos WebP : `npm run make-icons` à partir de `public/icon-scoly.png` et des logos PNG.
- `astro.config.mjs` : le sitemap exclut la 404 et les pages légales marquées `noindex: true` ; un petit module ajoute à `dist/_headers` la **Content-Security-Policy** avec l'empreinte sha256 de chaque script en ligne (recalculée à chaque build).

## Pages légales

- Les textes sont dans `src/content/legal/` : `confidentialite.md`, `conditions.md`, `cookies.md`. Frontmatter : `title`, `description`, `updated`, `draft`, `noindex`.
- **Tant que `draft: true`** : aucune page n'est générée et aucun lien n'apparaît dans le pied de page (la colonne « Légal » est masquée).
- **Publier un texte** : remplacer la ligne « Texte à fournir par l’éditeur » par le texte (Markdown), mettre à jour `updated`, passer `draft` à `false`, puis `npm run build` et déployer. La page `/confidentialite` (ou `/conditions`, `/cookies`) et son lien du pied de page apparaissent d'eux-mêmes ; `noindex: true` l'exclut des moteurs de recherche.
- Les liens du pied de page sont déduits des fichiers publiés (`src/lib/legal.ts`) : aucun `enabled` à modifier dans `site.ts`. Le texte juridique doit être relu par un juriste.
- La page est rendue par `src/pages/[slug].astro` (mise en page du site, largeur de lecture limitée, thème clair et sombre).

## Qualité

`npm run build` puis `npm run audit` : le script `scripts/audit.mjs` contrôle `dist/*.html` (ancres sans cible, liens vides, `target="_blank"` sans `rel`, images sans `alt`, `title` / description / canonical, h1 unique, chaînes interdites, JSON-LD valide) et affiche le poids du HTML de l'accueil et du JavaScript.

## Déploiement Cloudflare

Guide complet pour une personne non technicienne : **`docs/DEPLOIEMENT.md`** ; liste de contrôle avant annonce : **`docs/CHECKLIST-LANCEMENT.md`**. En bref :

Le projet contient déjà `wrangler.jsonc`. Deux options :
1. **CLI** : `npx wrangler login` puis `npm run deploy`, et rattacher le domaine `scoly.ink` au Worker (Workers → Settings → Domains).
2. **Git** : connecter le dépôt dans Cloudflare (build : `npm run build`, sortie : `dist`).

## Composants

Tous dans `src/components/ui/`.

| Composant | Props principales | Rôle |
|---|---|---|
| `Container` | `size` (`default` \| `narrow`), `class` | Largeur max. 72 rem, marges latérales |
| `Section` | `id`, `tone` (`default` \| `alt`), `labelledby`, `container`, `class` | Enveloppe d'une section : espacement, ancre, `scroll-mt-24`, fond alterné |
| `SectionHeading` | `title`, `eyebrow`, `subtitle`, `align` (`center` \| `left`), `id` | Étiquette + h2 serif + sous-titre |
| `Button` | `variant` (`primary` \| `secondary` \| `ghost`), `size` (`md` \| `lg`), `href`, `external`, `icon`, `disabled`, `block` | Bouton ou lien (44 px min.) |
| `Badge` | `tone` (`brand` \| `neutral` \| `outline`) | Pastille |
| `Card` | `as`, `padding` (`none` \| `md` \| `lg`) | Carte arrondie bordée |
| `Icon` | `name`, `class`, `label` | Icône SVG inline (liste dans `icons.ts` ; `pen` ajoutée à l'étape 6) |
| `Logo` | `class` (hauteur) | Logo selon le thème |
| `VideoFrame` | `video` (défaut : `heroVideo`), `class` | Cadre « fenêtre de navigateur » 16:9 : placeholder sans vidéo, lecteur muet avec |

```astro
---
import Section from "../ui/Section.astro";
import SectionHeading from "../ui/SectionHeading.astro";
import Button from "../ui/Button.astro";
import { sectionIds, site } from "../../config/site";
---
<Section id={sectionIds.pricing} tone="alt" labelledby="tarifs-titre">
  <SectionHeading id="tarifs-titre" eyebrow="…" title="…" />
  <Button href={site.links.signup} size="lg">…</Button>
  <Button href={site.links.verify} variant="secondary" external>…</Button>
</Section>
```

### Convention des sections

- Une section = un fichier dans `src/components/sections/`, qui renvoie une `<Section id={sectionIds.xxx}>` (les ids viennent de `src/config/site.ts`, jamais écrits en dur).
- `src/pages/index.astro` importe les sections dans l'ordre du brief et n'est plus modifié : chaque étape remplit son propre fichier.
- Chaque section a un seul `h2` (via `SectionHeading`), relié à la section par `labelledby`. Le seul `h1` est dans le Hero.
- Thème clair et sombre : tokens sémantiques uniquement. Valeurs métier (liens, contacts) : `src/config/site.ts`. Un contact à `null` masque le bouton concerné (`whatsappLink` et `emailLink` valent alors `null`).

### Vidéo du Hero

Déposer `public/video/hero.webm`, `hero.mp4` et `hero-poster.webp` (16:9, sans son), puis renseigner `heroVideo` dans `src/config/site.ts`. Le poster est obligatoire. Aucun autre fichier à modifier.
