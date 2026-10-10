# JOURNAL — Site vitrine Scoly

Journal de bord tenu par chaque intervenant (Claude ou humain). Il permet au suivant de reprendre le projet sans rien redécouvrir.

## Comment l'utiliser

**Au début de ton intervention** : lis ce fichier en entier, surtout « État d'avancement », « Décisions en vigueur » et « Points en suspens ».

**À la fin de ton intervention** (obligatoire) :
1. Ajoute **une entrée** dans la section « Entrées », **en haut** (la plus récente d'abord), avec le modèle ci-dessous.
2. Mets à jour la table « État d'avancement ».
3. Ajoute à « Décisions en vigueur » toute décision qui s'applique aux étapes suivantes.
4. Ajoute à « Points en suspens » tout ce qui reste à faire, à fournir ou à valider. Retire ce qui est résolu.

**Règles d'écriture** : factuel, concis, en français. Ce qui a été **réellement fait**, pas ce qui était prévu. Pas d'autocongratulation. Si quelque chose n'a pas pu être testé, dis-le.

### Modèle d'entrée

```markdown
### [Étape N — Nom] · AAAA-MM-JJ
**Intervenant** : Claude (conversation « … ») / nom
**Statut** : terminé | partiel | bloqué

**Fait**
- …

**Fichiers créés**
- `chemin/fichier` — rôle

**Fichiers modifiés**
- `chemin/fichier` — ce qui a changé et pourquoi

**Décisions prises**
- … (et pourquoi)

**Écarts par rapport au brief ou au prompt**
- … (ou « Aucun »)

**Vérifications effectuées**
- check / build : OK | KO
- thèmes clair et sombre : OK | non testé
- mobile 390 · tablette 768 · bureau 1280 : OK | non testé
- autre : …

**À faire / à valider ensuite**
- …
```

---

## État d'avancement

| # | Étape | Statut |
|---|---|---|
| — | Initialisation du projet (Astro, Tailwind, Preline, GSAP, Lenis) | terminé |
| 0 | Fondations (design system, composants, thème, config) | terminé |
| 1 | Navigation | terminé |
| 2 | Hero | terminé (vidéo à fournir) |
| 3 | Avant / Avec Scoly | terminé |
| 3 bis | Refonte « Avant / Avec » en zigzag + illustrations SVG | terminé (à valider visuellement) |
| 4 | Comment ça marche | terminé (à valider visuellement) |
| 5 | Documents générables | terminé (à valider visuellement) |
| 6 | Fonctionnalités | terminé (à valider visuellement) |
| 7 | Sécurité et confidentialité | supprimée, par décision (étape 11) |
| 8 | Tarifs | terminé (à valider visuellement) |
| 9 | FAQ | terminé (à valider visuellement) |
| 10 | CTA final et footer | terminé (à valider visuellement) |
| 11 | Finitions (SEO, légal, audit, déploiement) | terminé (à valider : voir « Reste à faire avant le lancement ») |

Statuts possibles : à faire · en cours · partiel · terminé · à reprendre.

---

## Décisions en vigueur

- Site **statique** sur Astro, **sans React**. Tailwind v4 (tokens CSS), Preline à la carte, GSAP + Lenis.
- Déploiement sur **Cloudflare**, domaine `scoly.ink`. L'application est sur `app.scoly.ink`.
- **Thème clair et sombre** obligatoires, via la classe `.dark` sur `<html>` et les tokens sémantiques.
- **Pas de section « Ils nous font confiance »** pour l'instant (une seule école pilote). Pas de faux logos, de faux témoignages ni de chiffres inventés.
- Tarifs en FCFA, **annuels uniquement**. Le paiement par Mobile Money et carte n'est **pas** mentionné tant qu'il n'est pas en place.
- La navbar contient un lien externe **Vérifier un document** vers `https://app.scoly.ink/verifier`.
- Le bouton « Essayer gratuitement » mène à `https://app.scoly.ink/creer-un-compte`.
- Vidéo du hero : MP4 + WebM, fichiers à fournir plus tard. Branchement : `heroVideo` dans `site.ts` (voir entrée de l'étape 2).
- **Hero** : animation d'entrée en **CSS pur** (étape 3, remplace GSAP) : `[data-hero-item]` + `--hero-i` (0 à 3) dans `Hero.astro`, `@keyframes hero-in` (0,5 s, décalage 0,1 s par élément, `backwards`), enveloppé dans `@media (prefers-reduced-motion: no-preference)`. Plus de `hero.ts`, plus d'état masqué posé par JavaScript, plus de filet de sécurité. Ne pas utiliser `data-reveal` dans le Hero (il dépend du scroll). Cadre vidéo réutilisable : `ui/VideoFrame.astro`, logique dans `src/scripts/video-frame.ts` (inchangée).
- Données de démonstration : toujours **fictives**.
- **Polices** : Inter (texte) et Newsreader poids 500 (titres), comme l'application. Geist abandonné (écart visible). Décision validée ; BRIEF §7 corrigé à l'étape 1.
- **Tokens** alignés sur l'application : canvas `#f7f8fa`, ink `#181c26`, bouton principal `#1e3a5f` (clair) / `#8fb0e0` à texte `#10192a` (sombre). Utiliser `primary`, `on-primary`, `accent`, `tile`, `badge`, jamais de couleur en dur.
- **Titres** : classes `type-h1` à `type-label` (global.css). Pas de tailles de titre écrites à la main.
- Les ids d'ancre et les liens viennent de `src/config/site.ts` (`sectionIds`, `site.links`, `navigation`).
- Un contact `null` masque le bouton correspondant (`whatsappLink`, `emailLink`).
- Lien d'évitement : `href` = chemin de la page + `#contenu`, pour que le focus se déplace malgré le scroll Lenis (qui n'intercepte que `href="#…"`). `<main id="contenu">` est requis sur chaque page.
- Le build de production ne contient aucun repère `DevPlaceholder`.
- **Navbar** (`src/components/layout/Navbar.astro` + `src/scripts/navbar.ts`) : `<header>` sticky **dans le flux** (hauteur constante 76 px). Les sections n'ont donc **pas** à compenser la barre (pas de `padding-top` spécial dans le Hero). La pilule change d'état via `data-scrolled` (> 40 px) ou `data-menu-open` ; le lien actif porte `aria-current="location"`.
- **Ancres** : le décalage sous la barre vient **uniquement** du `scroll-mt-24` (96 px) de `Section`. Lenis retranche déjà le `scroll-margin-top` de la cible ; `motion.ts` n'ajoute plus d'offset. Toute section ciblée par la navbar doit passer par `Section` (ou porter `scroll-mt-24`).
- **Bouton de thème** : un `[data-theme-toggle]` qui porte `data-label-to-dark` / `data-label-to-light` reçoit un `aria-label` mis à jour par `theme.ts` et **pas** d'`aria-pressed` (libellé d'action et état coché se contredisent). Sans ces attributs, `aria-pressed` comme avant.
- **Navbar à 4 liens** : Documents · Fonctionnalités · Tarifs · Vérifier un document. **FAQ retirée du menu pour l'aération** (la barre à 6 liens était trop dense) ; sa section `#faq` reste dans la page. (La section Sécurité a été supprimée à l'étape 11.) Source unique : `navigation` dans `site.ts` (barre, panneau mobile et scrollspy suivent seuls). Les liens Sécurité et FAQ sont à ajouter au footer (étape 10).
- **Barre au bureau (≥ 1100 px)** : trois zones (logo · liens · actions) séparées d'au moins 24 px, liens à 15 px avec 16 px de marge latérale (36 px entre deux textes), « Se connecter » en medium (500) et couleur `ink`, seul « Essayer gratuitement » reste en `primary`. Logo h-9 au bureau, h-10 de 640 à 1099 px. **Seuil du menu burger : 1100 px** (1024 px testé et refusé, voir l'entrée « Navbar aérée »). Tout nouvel élément de navigation doit être revérifié à 1100 px.

- **Images / illustrations** : **aucune photo** sur le site. Les visuels sont des SVG originaux (composants dans `src/components/illustrations/`, couleurs `--ill-*` dans `global.css`). Règles complètes dans `docs/ILLUSTRATIONS.md`, que toute nouvelle scène doit suivre. Si une image bitmap devient nécessaire : `src/assets/images/` + `<Picture>` d'`astro:assets`, dimensions déclarées (BRIEF §8).
- **Section `#pourquoi`** (étape 3 bis) : titre h2 centré (`SectionHeading`), puis **deux rangées en zigzag** : « Sans Scoly » (illustration à gauche, texte à droite), « Avec Scoly » (texte à gauche, illustration à droite). Chaque rangée = un badge (`Badge`, neutre puis marque), un h3, **un seul paragraphe**. Pas de liste, d'icône, de bouton, de chiffre, de carte ni de bordure. Sous 1024 px : une colonne, illustration au-dessus du texte. L'illustration précède le texte dans le HTML, sans `order` en mobile ; au bureau, la rangée 2 utilise `lg:order-last`. Titre h3 de rangée (28 → 38 px) et paragraphe (17 → 19 px) : styles locaux dans `Problems.astro` (`.pb-title`, `.pb-text`), pour ne pas modifier le design system.
- **Illustrations** : un ratio fixe 4:3 (`viewBox 0 0 640 480`, `width`/`height` déclarés), `aria-hidden`, animations CSS seules sous `prefers-reduced-motion: no-preference`, aucune dépendance. Deux variables sombres distinctes : `--ill-navy` (traits fins, devient clair en sombre) et `--ill-dark` (grands aplats, reste sombre).

- **Section `#comment-ca-marche`** (étape 4) : `<ol>` de trois `<li>` (pastille numérotée, segment de ligne, carte `Card` avec icône, h3, un paragraphe) ; **aucune illustration, par choix** (rythme différent du zigzag de `#pourquoi`), les icônes viennent de `Icon.astro` (`upload`, `file`, `archive` + pastille `shield` sur la 3ᵉ carte). Bureau ≥ 1024 px : 3 colonnes égales, pastilles reliées par une ligne horizontale, cartes de même hauteur. En dessous : une colonne, pastilles à gauche, ligne verticale, carte à droite (298 px de large à 390 px). Styles de la section dans un `<style is:global>` préfixé `hiw-` dans `HowItWorks.astro` (le fond de section doit être posé sur l'élément rendu par `Section`).
- **Ligne de liaison** : un segment par `<li>` (sauf le dernier), du centre d'une pastille au centre de la suivante ; piste en `line`, remplissage en `primary`. `src/scripts/how-it-works.ts` (GSAP + ScrollTrigger, `scrub`) pilote `--hiw-s` (0 → 1) sur chaque `[data-hiw-fill]`. La ligne n'est vidée par le CSS que si `[data-hiw-ready]` est posé par le script : sans script ou avec `prefers-reduced-motion`, elle reste **entière**. `motion.ts` non modifié.
- **Fond de section teinté** (`.hiw-section`) : mélange de `tile` et `canvas` en clair, `canvas` assombri en sombre. Le ton `alt` de `Section` (fond `surface`) aurait fondu les cartes (`surface`) dans le fond, surtout en sombre.
- **Section `#documents`** (étape 5) : onglets en pilule (ARIA `tablist`), cinq panneaux **toujours dans le HTML** (`hidden` sauf le premier). Sans JavaScript : pilule masquée, panneaux en liste (`html:not(.js)`). Script `src/scripts/documents-tabs.ts` (activation automatique au focus, tabindex itinérant). Un document = un composant dans `src/components/documents/`, basé sur `Paper.astro`.
- **Aperçus de documents** : feuille A4 (ratio 1 : 1,414) dont **toutes les tailles sont en `cqw`**, texte minimal 2,85 cqw (≥ 9 px à 390 px), classe `.light` pour rester blanche en sombre, `role="img"` + `aria-label`, contenu `aria-hidden`. Données dans `sample.ts`, toujours fictives et génériques (« NOM Prénom », « 000000 », « JJ/MM/AAAA »). **Un QR décoratif n'existe que sur le certificat** (seul exemple fourni) ; ne pas en ajouter aux autres sans exemple réel.
- **`[hidden]` et Tailwind** : le `display: none !important` de Tailwind vit dans `@layer base` ; pour le surcharger, un `!important` hors couche perd. Utiliser `@layer base { … !important }` (voir `Documents.astro`).
- **Section `#fonctionnalites`** (étape 6) : grille de six capacités **sans cartes**, `<ul>` de six `<li>` (icône, h3, un paragraphe). Filets obtenus par un conteneur teinté `line` + `gap: 1px` + cellules en `surface` (`.ft-grid` / `.ft-cell`, styles scopés dans `Features.astro`) ; filets latéraux dès 640 px, jamais en haut ni en bas. 3 × 2 dès 1024 px, 2 colonnes de 640 à 1023 px, 1 colonne en dessous ; `grid-auto-rows: 1fr` dès 640 px pour des cellules de même hauteur. Survol décoratif réservé à `@media (hover: hover)` : calque `::before` (dégradé `brand-50` → transparent ; sombre : `brand-400` à 12 %) dont seule l'opacité change, barre `.ft-bar` (4 × 28 px) qui passe de `line` à `brand-950` (sombre : `brand-300`), titre `.ft-label` qui glisse de 10 px (uniquement sous `prefers-reduced-motion: no-preference`). Cellules non interactives (ni lien, ni bouton, ni `tabindex`). `data-reveal` est posé sur le **contenu** de la cellule (`.ft-inner`) et non sur la cellule : sinon le filet (fond du conteneur) apparaîtrait pendant le déplacement de 24 px. Titre de cellule : Inter 600, 20 px, interligne 28 px (= hauteur de la barre), styles locaux, `type-h3` n'étant pas adapté (serif).
- **Section `#tarifs`** (étape 8) : données dans `src/config/pricing.ts` (formules, libellés, aides `formatAmount`, `monthlyLine`, `priceForScreenReaders`, `resolveDestination`) ; `Pricing.astro` ne contient aucun prix. Quatre `article` dans une grille : 4 colonnes dès 1280 px (la grille déborde de 2 rem de chaque côté du conteneur), 2 × 2 de 640 à 1279 px, 1 colonne en dessous. Chaque carte est un **`subgrid` de 6 rangées** (nom, prix, équivalent mensuel, description, bouton, liste) : prix, boutons et listes s'alignent d'une carte à l'autre sans hauteur fixée. Formule recommandée : anneau 2 px (`brand-600` / `brand-300`), badge texte, ombre, bouton principal ; taille inchangée. Fond de section teinté (`.pr-section`, même mélange que `.hiw-section`) : la section Sécurité prévue avant elle ayant été supprimée, Tarifs suit directement Fonctionnalités (`alt`) : l'alternance reste correcte (surface, teinté).
- **Survol des cartes de tarifs** : via `top: -3px`, pas `translate`/`transform` : GSAP (`data-reveal`) réécrit `translate` en ligne. Réservé à `(hover: hover)` et `prefers-reduced-motion: no-preference`.
- **Bouton « Nous contacter »** : `resolveDestination("contact")` donne WhatsApp, sinon e-mail, sinon `#contact`. Changer les contacts dans `site.ts` suffit.
- **Section `#faq`** (étape 9) : données dans `src/config/faq.ts` (`faqItems`, `faqCopy`, type `FaqItem` à `answer` en texte brut, prêt pour le JSON-LD de l'étape 11). `Faq.astro` : une carte unique, huit `<details>` / `<summary>` natifs (aucun script, aucun plugin Preline), le premier ouvert, plusieurs ouvrables ensemble. **Pas de h3 dans les `<summary>`** : un titre dans un summary est annoncé de façon inégale selon les lecteurs d'écran, qui présentent le summary comme un bouton ; le h2 nomme la section et chaque question est un contrôle d'ouverture. Animation CSS pur (`::details-content` + `interpolate-size`, sous `@supports` et `prefers-reduced-motion: no-preference`) ; sans prise en charge, ouverture instantanée. Bureau ≥ 1024 px : colonne gauche collante (`top: 7rem`) 1/3 et accordéon 2/3 ; en dessous une colonne centrée. La ligne « Vous ne trouvez pas… » est rendue deux fois (visible selon la largeur) pour que l'ordre de tabulation reste l'ordre visuel.
- **CTA final et footer** (étape 10). Coordonnées dans `site.ts` : `contact.whatsapp` = `22959287815`, `contact.email` = `contact@scoly.ink`, `whatsappDemoMessage` (message de démonstration, encodé par `buildWhatsAppLink`), `demoEmailSubject`. `demoWhatsappLink` / `demoEmailLink` en sortent. **Liens du footer : `footerGroups` dans `site.ts`**, chaque lien a `enabled` ; non rendu si `false` ; colonne masquée sans lien actif ; Contact actif selon la présence des valeurs. **Liens légaux** : leur `enabled` est déduit des fichiers `src/content/legal/*.md` (`draft: false`), voir « Pages légales » (étape 11). Titres de colonne = `<p>` (pas de h2) dans des `role="group"` reliés par `aria-labelledby`, pour ne pas ajouter de niveaux de titre à la page. CTA : bloc marine `#1e3a5f` (sombre `#152a49`), couleurs locales `fc-*`, boutons inversés par CSS non couché (sans `!important`), anneau de focus blanc. « Nous contacter » (Tarifs) mène désormais à WhatsApp (sans message prérempli).

- **Section Sécurité supprimée, par décision** (étape 11) : plus de `#securite`, de `Security.astro`, de lien de footer ni de question de FAQ sur la protection des données. Ne rien réintroduire sans engagements de sécurité confirmés (BRIEF §3).
- **SEO** : titre « Scoly — Documents scolaires générés en quelques clics » (53 caractères) et description (151 caractères) dans `src/config/seo.ts`, valeurs par défaut de `Base.astro`. Image de partage `public/og-scoly.png` (logo seul : le texte dépendrait des polices de la machine), générée par `npm run make-og`. Un seul bloc JSON-LD `@graph` généré par `src/lib/jsonld.ts` depuis `site.ts`, `pricing.ts`, `faq.ts` (jamais de texte en dur ; ni avis ni note). Les quatre formules sont dans un `AggregateOffer` (XOF, `billingDuration: P1Y`) ; « À partir de 150 000 » est exprimé par `minPrice`, sans `price` exact.
- **Pages légales** : `src/content/legal/*.md` + `src/pages/[slug].astro`. `draft: true` = ni page ni lien ; le lien du footer est déduit des fichiers publiés (`src/lib/legal.ts`), la colonne « Légal » n'est plus dans `footerGroups`. `noindex: true` dans le frontmatter ajoute la balise et retire la page du sitemap.
- **Navbar et footer hors accueil** : les ancres de section deviennent `/#documents`, etc. (`Navbar.astro`, `Footer.astro`) pour fonctionner depuis la 404 et les pages légales.
- **Content-Security-Policy** : ajoutée, car elle fonctionne sans aucune erreur console (testée en Chromium). Les empreintes sha256 des scripts en ligne sont calculées après chaque build (`cspHashes` dans `astro.config.mjs`) et insérées dans `dist/_headers` ; styles en `'unsafe-inline'` (attributs `style` et styles Astro). Tout service externe (statistiques, vidéo hébergée ailleurs) devra être ajouté à la CSP. Pas de HSTS dans le site (réglé côté Cloudflare).
- **Performance** : feuilles de style incluses dans le HTML (`build.inlineStylesheets: "always"`), polices latin Inter et Newsreader préchargées (`Base.astro`), logos servis en WebP allégés (`logo-scoly-240/480.webp`, variante sombre en `loading="lazy"`), ce qui a fait passer Lighthouse mobile de 72 à 94–95.
- **Cache** : `/_astro/*` 1 an (`immutable`), `/video/*` 30 jours (nom de fichier non haché : un an serait risqué si la vidéo est remplacée), PNG 1 jour.
- **Icônes** : `favicon.ico` (16 et 32 px), `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180 px, fond blanc), `site.webmanifest`, générés par `npm run make-icons` avec `sharp` (déjà présent via Astro) ; l'ICO est écrit à la main. Aucune dépendance ajoutée.

---

## Reste à faire avant le lancement

Détail à cocher : `docs/CHECKLIST-LANCEMENT.md`. Résumé :

1. **Vidéo du Hero** : fournir `public/video/hero.webm`, `hero.mp4`, `hero-poster.webp` et renseigner `heroVideo` dans `site.ts` (le cadre avec logo reste en attendant ; **point à traiter avant le lancement**).
2. **Textes légaux** : fournir et faire relire confidentialité, conditions, cookies, puis passer `draft` à `false`.
3. **Coordonnées** : confirmer le numéro WhatsApp (tester le lien sur un téléphone) et l'e-mail.
4. **Tests réels** : téléphone, Safari, Firefox, liens, boutons vers `app.scoly.ink`, partage WhatsApp.
5. **Cloudflare** : domaine, redirection `www`, SSL Full (strict), Always Use HTTPS, Rocket Loader désactivé (`docs/DEPLOIEMENT.md`).
6. **Google** : test des résultats enrichis (à faire **après la mise en ligne** par le propriétaire), Search Console, envoi de `sitemap-index.xml`.
7. Valider visuellement les sections marquées « à valider » et confirmer les points métier (historique des actions, aperçus de documents).

---

## Points en suspens

- [ ] **Test des résultats enrichis Google** à faire par le propriétaire après la mise en ligne (https://search.google.com/test/rich-results). Le JSON-LD a été validé par `JSON.parse` et par un contrôle des propriétés par type schema.org, pas par l'outil de Google.
- [ ] **Vidéo du Hero absente** : le cadre avec logo reste (décision de l'étape 11). À traiter avant le lancement.
- [ ] Textes légaux : trois fichiers en `draft: true` avec « Texte à fournir par l’éditeur » ; aucun texte juridique écrit.
- [ ] CSP : testée en Chromium seulement ; Safari et Firefox non testés. Web Analytics Cloudflare : nécessite d'élargir la CSP (voir `docs/DEPLOIEMENT.md`, étape 10).
- [ ] Restes de l'audit axe-core : aucune violation (WCAG 2 A / AA, 2.1 A / AA, bonnes pratiques) aux quatre combinaisons clair / sombre × 390 / 1280 px. Vérifications manuelles non faites : lecteurs d'écran, zoom 200 %, contraste de survol, focus sous Safari.
- [ ] Les prompts des étapes 1 à 10 ne figurent pas dans `prompts/` (seul `00-fondations.md` y est) : la relecture des textes n'a pu être comparée qu'au journal et au brief.
- [ ] Sans JavaScript : la barre de navigation reste complète au bureau, le burger est masqué sous 1100 px (déjà noté).
- [ ] **Vérifier le numéro WhatsApp** : `site.contact.whatsapp` = `22959287815` (indicatif 229 + `59287815` fourni, 8 chiffres). Le Bénin est passé à 10 chiffres (préfixe `01`) fin 2024 : si le lien `wa.me` n'ouvre pas la bonne conversation, utiliser `2290159287815`. À tester avec un vrai téléphone.
- [ ] CTA final et footer à valider visuellement (rubans, marine en sombre, colonnes du footer).
- [ ] **FAQ : ajouter la question sur le paiement quand Mobile Money et carte seront en place** (dans `faq.ts`).
- [ ] FAQ à valider visuellement (carte, chevron, colonne collante, ligne d'aide) ; `Safari` / `Firefox` : animation `::details-content` non testée (repli sans animation prévu).
- [ ] **Étape 8 : ligne « Historique détaillé des opérations » (Établissement Plus) retirée**, à ajouter dans `pricing.ts` (liste de la formule `etablissement-plus`) si elle est confirmée.
- [ ] Étape 8 à valider visuellement : nombre en 40 px (et non 44) à 4 colonnes, anneau et ombre de la carte recommandée, fond de section teinté, boutons à deux lignes éventuelles en colonne étroite.
- [ ] Étape 8 : l'espace avant le « : » de la note (« * Usage raisonnable : ») est insécable, comme ailleurs sur le site.
- [ ] **Étape 6 à valider visuellement** : filets (1,30:1 en clair, 1,35:1 en sombre : décoratifs, très discrets), barre de 4 × 28 px posée au ras du bord gauche de chaque cellule (elle chevauche donc le filet vertical et le filet latéral de la grille), taille des espaces intérieurs (32 / 40 / 48 px), fond `surface` de la bande, rendu du survol (dégradé).
- [ ] Étape 6 : la **césure automatique « l’en-tête »** peut couper après le trait d'union sur mobile (« l’en- / tête », visible à 390 px). Le texte de référence est conservé tel quel ; un trait d'union insécable le changerait. À accepter ou à demander.
- [ ] Étape 6 : le **survol n'a pas été vu à la souris sur un vrai appareil** ni sous Safari / Firefox (voir l'entrée). `color-mix()` en thème sombre (dégradé) : pas de repli prévu, le calque serait simplement sans fond.
- [ ] **Étape 5 à valider visuellement** : les cinq aperçus (lisibilité à 9 px sur mobile, double filet, cachet et signature en SVG, bloc « Appréciations » du certificat), fond de scène, taille du h3 du document (local `.docs-title`, 28 → 40 px), pilule qui défile à 768 px et moins.
- [ ] **Exemples réels manquants** pour 4 des 5 documents (seul le certificat de scolarité a été fourni) : la structure d'attestation d'inscription, fiche élève, attestation de transfert et demande de transfert est **déduite**, pas copiée. À remplacer ou confirmer avec un PDF réel de chaque type. Même point pour le **QR** (affiché sur le certificat seulement) et la **mention de bas de page** (reprise sur les cinq).
- [ ] Aperçu : la **fiche élève n'a pas de bloc signature** (une page d'informations) alors que la phrase commune parle de « signature de votre établissement ». À confirmer.
- [ ] Aperçu : l'en-tête n'a **plus les deux lignes de ministère / direction** de l'exemple (trop dense à 9 px sur mobile). Il garde logo carré fictif, nom, contact, « République du Bénin » et la devise. À valider.
- [ ] Section Documents, mobile : la hauteur du **texte** change d'un onglet à l'autre (jusqu'à 27 px à 390 px). L'aperçu, lui, est de hauteur constante (CLS 0). Non corrigé : saut limité au texte sous l'aperçu, après un clic.
- [ ] Les panneaux d'onglets ont `tabindex="0"` (recommandation ARIA, contenu non focusable) : un second arrêt de tabulation après l'onglet actif. À garder ou à retirer.
- [ ] Étape 4 à valider visuellement : pastille `shield` dans le coin de l'icône « archive » (à garder ou à retirer), piste de la ligne en couleur `line` (très discrète : 1,15:1 en clair, 1,65:1 en sombre, la partie remplie est à 10,17 et 8,24), fond de section teinté, cartes de 298 px de large à 390 px.
- [ ] **Ancre « Voir comment ça marche » : dépassement de 487 px** si le clic a lieu environ 500 ms après le chargement (pendant l'animation d'entrée du Hero). **Reproduit à l'identique sur le projet d'avant l'étape 4** (placeholder à la place de la section) : sans lien avec cette étape, non corrigé (Hero et `motion.ts` hors périmètre). À 300 ms, 800 ms et plus, la section s'arrête bien à 96 px. Cause non cherchée.
- [ ] Section « Avant / Avec » (étape 3 bis) à valider : zigzag, taille des titres de rangée, deux illustrations (personnages, ambiance « chargé / ordonné »), pastille de rôle du second personnage (elle ressemble à une bulle ; à garder ou à simplifier).
- [ ] Illustrations : pas de relecture par une personne du public visé (représentation des personnes, tenues, mobilier de bureau) ; à faire valider par le fondateur ou l'école pilote.
- [ ] CLS de la page : 0,0004 à 0,0007 à partir de 768 px, dû à la **barre de navigation** (changement de police Inter à ~280 ms, `Navbar.astro`), pas à la section. Hors périmètre ; correction possible : précharger la police Inter (slot `head`) ou ajuster la métrique de repli.
- [ ] **Vidéo du hero à fournir : `public/video/hero.webm`, `hero.mp4`, `hero-poster.webp`, puis renseigner `heroVideo` dans `site.ts`.**
- [ ] Hero à valider : titre en 3 lignes au bureau (largeur 9,2 em), décor à deux rubans, aucun repère visuel de « Vidéo à venir » en production (frame vide avec l'icône). L'animation d'entrée est maintenant en CSS (étape 3) : le titre fait un fondu de 0,5 s depuis la première image (opacité 0 → 1), sans dépendre d'un script.
- [ ] Hero : italique Newsreader (latin, 64 Ko) chargé pour « en quelques clics ». Pas de préchargement possible sans toucher à `Base.astro` (slot `head` absent de `index.astro`).
- [ ] Captures d'écran de l'application sur données fictives (Élèves, Documents, Archives, Paramètres, Vérification).
- [ ] Exemples de documents générés par Scoly (un PDF par type, noms fictifs).
- [ ] Confirmer que l'« historique des actions » existe bien dans l'application avant de l'afficher comme acquis.
- [ ] Logo en SVG (sinon vectoriser le PNG).
- [ ] Vérifier que `https://app.scoly.ink/verifier` répond bien (et rediriger `/vérifier` si nécessaire).
- [ ] Pages légales (confidentialité, conditions, cookies) à faire relire par un juriste.
- [ ] Visuels de l'application non couverts par les captures : survol des boutons et états d'erreur des champs (à aligner aux étapes concernées).
- [ ] Navbar aérée à valider : liens centrés dans l'espace entre le logo et les actions (décalés d'environ 135 px vers la gauche du centre de la barre, car les actions sont plus larges que le logo) ; menu burger conservé jusqu'à 1099 px.
- [ ] Étape 1 à valider : entre 640 et 1099 px, « Essayer gratuitement » apparaît dans la barre **et** dans le panneau (le prompt demande les deux). À retirer du panneau si c'est jugé redondant.
- [ ] Sans JavaScript, sous 1100 px : logo, bouton d'essai (≥ 640 px) seulement ; le burger est masqué car il ne peut rien ouvrir. Le prompt ne demandait que la version bureau.
- [ ] Preline `collapse` n'est plus utilisé nulle part (le menu mobile a son propre script). Le retirer de `Base.astro` et de `prelineSideEffects` (`astro.config.mjs`) économiserait ~4,8 Ko de JS ; non fait (hors périmètre de l'étape 1).
- [ ] Pas de test sur appareil réel ni sur Safari / Firefox : seul Chromium a été utilisé. `color-mix()` et `backdrop-filter` de la pilule sont à voir sur Safari (un fond opaque de repli est prévu).

---

## Entrées

### [Étape 11 — Finitions : SEO, légal, audit, déploiement] · 2026-10-10
**Intervenant** : Claude (conversation « Étape 11 — Finitions »)
**Statut** : terminé (non testé hors Chromium ; test Google des résultats enrichis à faire après mise en ligne)

**Fait**
- **Sécurité retirée** : `Security.astro` supprimé, import et ancre retirés (`index.astro`, `site.ts`, footer), BRIEF §6 renuméroté (10 lignes), navigation et README mis à jour, journal : étape 7 « supprimée, par décision », points en suspens sur la sécurité et la FAQ retirés. `grep securite` : aucune occurrence dans `src/` ni `dist/`.
- **SEO** : titre (53 car.) et description (151 car.) ; `Base.astro` : canonical, `og:*` avec `image:width/height/alt`, `twitter:*`, icônes, manifeste, `theme-color` clair et sombre, préchargement des polices. Un seul h1. JSON-LD (Organization avec e-mail de `site.ts`, WebSite, SoftwareApplication + 4 offres XOF, FAQPage de 8 questions), `JSON.parse` OK sur le HTML construit. `robots.txt` sans `Disallow`, `Sitemap:` absolu ; le sitemap ne liste que `/`.
- **Pages légales** : collection `legal` (3 fichiers `draft: true`), `[slug].astro`, footer déduit. Test : `draft: false` temporaire → `/confidentialite`, `/conditions`, `/cookies` générées, 3 liens dans le footer, `noindex` posé et sitemap filtré pour la page marquée ; remis à `draft: true` → plus de page ni de lien.
- **404** : titre, texte et bouton demandés, `noindex`, thèmes clair et sombre ; `wrangler dev` (workerd) sert bien `404.html` (statut 404) avec `not_found_handling: "404-page"`.
- **Icônes, manifeste, partage** : voir « Décisions ». Image de partage 1 200 × 630, 27 Ko, regardée.
- **`_headers`** : existant conservé, `Permissions-Policy` complétée, cache long, CSP ajoutée à la construction (testée sans erreur console).
- **Nettoyage** : `styleguide.astro`, filtre du sitemap, ligne `Disallow`, `DevPlaceholder.astro` supprimés. Le repère « Vidéo à venir » de `VideoFrame.astro` (uniquement `import.meta.env.DEV`, utilisé par le Hero) est conservé. `npm audit` : 0 vulnérabilité, aucune version de dépendance modifiée.
- **Audit** : `scripts/audit.mjs` + `npm run audit` (testé avec de fausses erreurs : ancre morte, `href="#"`, `_blank` sans `rel`, image sans alt, chaînes interdites, second h1 : tout est détecté). Résultat final : aucune erreur.
- **Mesures** (Chromium headless, serveur local appliquant `_headers`, compression brotli) :
  - axe-core, accueil, clair et sombre × 390 et 1 280 px : **0 violation** (tags wcag2a, wcag2aa, wcag21a, wcag21aa, best-practice). Aucun débordement horizontal.
  - Lighthouse mobile (simulation Lighthouse, 2 passages) : performance **94 à 95**, accessibilité **100**, bonnes pratiques **100**, SEO **100**. LCP 2,9 s, FCP 1,8 s, CLS 0, TBT 0 à 20 ms, 315 Ko transférés. Avant les optimisations : performance 72 (LCP 5,4 s). Page 404 : 85 / 100 / 100 / 69 (SEO bas attendu : page en `noindex` et en statut 404).
  - Poids : HTML de l'accueil 160,9 Ko (CSS en ligne ; 26,5 Ko en brotli), JS 145,9 Ko (142,2 Ko en fichiers + 3,7 Ko en ligne), inchangé.
  - JavaScript désactivé : titre, sections, aperçus (5 panneaux), navigation visibles ; pas de débordement.
  - `prefers-reduced-motion: reduce` : aucune animation infinie, Hero et `data-reveal` à opacité 1, défilement non animé.
  - Clavier : 39 arrêts de tabulation, tous avec indicateur de focus visible, ordre conforme à l'ordre visuel (les colonnes du footer et la colonne collante de la FAQ expliquent les retours de position verticale) ; interactions (thème, onglets, FAQ, burger) OK sous CSP.
  - Titres : h1, 6 h2, h3 dans l'ordre, aucun saut de niveau.
  - Relecture automatique du texte construit (accueil et 404) : aucune apostrophe droite, aucune ponctuation haute collée ou précédée d'une espace ordinaire, aucun nombre avec espace ordinaire, aucun tiret long, aucun mot interdit par le BRIEF.

**Fichiers créés**
- `scripts/audit.mjs`, `scripts/make-og.mjs`, `scripts/make-icons.mjs`
- `src/config/seo.ts`, `src/lib/jsonld.ts`, `src/lib/legal.ts`, `src/content.config.ts`, `src/content/legal/{confidentialite,conditions,cookies}.md`
- `src/pages/404.astro`, `src/pages/[slug].astro`
- `public/og-scoly.png`, `favicon.ico`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png`, `site.webmanifest`, `logo-scoly-{240,480}.webp`, `logo-scoly-dark-{240,480}.webp`
- `docs/DEPLOIEMENT.md`, `docs/CHECKLIST-LANCEMENT.md`

**Fichiers modifiés**
- `src/layouts/Base.astro` (SEO, icônes, préchargement), `src/pages/index.astro` (JSON-LD, retrait de Sécurité), `src/config/site.ts` (retrait de `security`, groupe Légal déduit, `legalPages`), `src/components/layout/Navbar.astro` et `Footer.astro` (ancres hors accueil, colonne Légal), `src/components/ui/Logo.astro` (WebP allégés, variante sombre en `lazy` : **hors périmètre strict, pour la performance, rendu identique**), `astro.config.mjs` (sitemap, CSP, CSS en ligne), `public/_headers`, `public/robots.txt`, `package.json` (3 scripts), `README.md`, `docs/BRIEF.md`, `docs/ILLUSTRATIONS.md`, `docs/JOURNAL.md`, commentaires de `icons.ts` et `global.css`.
- Supprimés : `Security.astro`, `styleguide.astro`, `DevPlaceholder.astro`, `public/favicon.png`, `icon-180.png`, `icon-32.png` (remplacés).

**Écarts par rapport au brief ou au prompt**
- Image de partage : logo seul, sans texte (rendu de police non garanti dans le script).
- Offre « Réseau d’écoles » : `minPrice` sans `price` (pour ne pas annoncer un prix exact) ; Google peut signaler l'absence de `price` : à voir au test des résultats enrichis.
- `Logo.astro` modifié (WebP) alors que seuls les textes des sections étaient protégés : gain de 200 Ko au premier affichage, aucune différence visuelle.
- Les prompts 01 à 10 sont absents du projet : relecture comparée au journal et au brief uniquement.

**Vérifications effectuées**
- check : 0 erreur, 0 avertissement. build : OK. audit : aucune erreur.
- thèmes clair et sombre : OK (axe, captures du haut de page à 390 px, 404). Mobile 390 et bureau 1 280 px : OK. Tablette 768 px : non remesurée à cette étape.
- Non testé : Safari, Firefox, appareils réels, lecteurs d'écran, ouverture réelle du lien WhatsApp, déploiement réel sur Cloudflare, domaine, Search Console, test Google des résultats enrichis.

**À faire / à valider ensuite**
- Voir « Reste à faire avant le lancement ».

---

### [Étape 10 — CTA final et footer] · 2026-10-10
**Intervenant** : Claude (conversation « Étape 10 — CTA final et footer »)
**Statut** : terminé (à valider visuellement ; non testé hors Chromium)

**Fait**
- `site.ts` : WhatsApp `22959287815`, e-mail `contact@scoly.ink`, message de démonstration, objet de l'e-mail, `demoWhatsappLink`, `demoEmailLink`, `footerGroups` (liens `enabled`).
- CTA final `#contact` : h2 « Établissez votre premier document dès aujourd’hui », texte, « Essayer gratuitement » (blanc sur marine), « Demander une démonstration » (contour blanc, WhatsApp avec message prérempli, externe, `rel="noopener noreferrer"`, texte masqué), ligne « Une question ? Écrivez-nous : » + e-mail (mailto). Deux rubans SVG décoratifs (≈ 0,5 Ko), flottement CSS supprimé en mouvement réduit. Apparition par `data-reveal`.
- Footer : marque + phrase, colonnes Produit, Application, Contact (Légal masquée), barre « © 2026 Scoly. Tous droits réservés. » (année calculée à la compilation). « Sécurité » et les liens légaux ne sont pas rendus.

**Fichiers modifiés**
- `src/config/site.ts`, `src/components/sections/FinalCta.astro`, `src/components/layout/Footer.astro`, `README.md`, `docs/JOURNAL.md`

**Décisions prises**
- Voir « Décisions en vigueur » (liens activables, titres de colonne sans h2, couleurs `fc-*`).
- Message de démonstration séparé du message générique (`whatsappMessage` reste `null`) : le footer et « Nous contacter » ouvrent WhatsApp sans texte imposé.
- Marine du bloc en sombre : `#152a49` (un peu plus profond que `#1e3a5f`) avec un liseré clair intérieur.
- Section CTA : espace du haut réduit (suit la FAQ) ; le bloc couvre la largeur du Container.

**Écarts par rapport au brief ou au prompt**
- Numéro WhatsApp : l'indicatif 229 est ajouté au numéro fourni (voir suspens sur les 10 chiffres).

**Vérifications effectuées**
- check : 0 erreur, 0 avertissement. build : OK.
- Chromium, **390 · 768 · 1024 · 1440 px, clair et sombre** : aucun débordement. Boutons 56 px, côte à côte dès 640 px, pleine largeur sur mobile.
- Textes du CTA, phrase et copyright relevés dans le DOM : identiques au prompt ; 1 seul h2 dans le CTA, aucun titre dans le footer.
- **Variantes de `site.ts`** (construites puis remises) : sans WhatsApp ni e-mail → seul « Essayer gratuitement », pas de ligne de contact, pas de colonne Contact, « Nous contacter » → `#contact` ; e-mail seul → bouton `mailto:…?subject=Demande%20de%20d%C3%A9monstration%20Scoly` ; WhatsApp fictif seul → `https://wa.me/22900000000?text=Bonjour%2C%20je%20souhaite…` (encodage correct), pas de ligne de contact. Valeurs réelles remises.
- Footer : 9 liens rendus, aucun mort (ancres existantes, URL de `site.ts`), hauteur tactile 44 px ; externes avec `rel="noopener noreferrer"`, icône et texte masqué.
- Ancres : « Écrivez-nous » (FAQ) amène `#contact` à 96 px du haut (sous la barre). « Nous contacter » (Tarifs) : `https://wa.me/22959287815`.
- CLS = 0. JS : inchangé (aucun script ajouté).
- **Contrastes AA mesurés** (clair / sombre) : titre blanc sur marine 11,50 / 14,39 ; texte atténué 8,60 / 10,57 ; ligne de contact 8,60 / 10,57 ; bouton inversé 11,50 ; contour du bouton secondaire 7,25 / 8,74 ; liens du footer `muted` sur surface 6,50 / 8,20.
- Non testé : Safari, Firefox, appareil réel, lecteur d'écran, ouverture réelle du lien WhatsApp, focus clavier du CTA (anneau blanc posé, non capturé).

**À faire / à valider ensuite**
- Suspens ajoutés. Étape 11 : retirer le styleguide, JSON-LD FAQ et activer les liens légaux.

---

### [Étape 9 — FAQ] · 2026-10-10
**Intervenant** : Claude (conversation « Étape 9 — FAQ »)
**Statut** : terminé (à valider visuellement ; non testé hors Chromium)

**Fait**
- Section `#faq` : h2 « Questions fréquentes », sous-titre, huit questions en accordéon (carte unique, filets fins), liens en fin de réponse (Voir les tarifs → `#tarifs`, Vérifier un document → URL de `site.ts`, externe avec icône, `rel="noopener noreferrer"` et texte masqué, Aller à la section de contact → `#contact`), ligne « Vous ne trouvez pas votre réponse ? » + « Écrivez-nous » → `#contact`. Textes relevés dans le DOM : identiques au prompt (espaces insécables avant ? : ;).
- Première question ouverte ; plusieurs ouvertes possibles ; apparition par `data-reveal`.
- Question : Inter 600 18 px, ligne ≥ 56 px (62 px mesurés à 768 px et plus, 88 px à 390 px sur deux lignes), chevron `aria-hidden` qui pivote. Réponse : 17 px `muted`, interligne 1,7, 40 rem au plus.

**Fichiers créés**
- `src/config/faq.ts` — données

**Fichiers modifiés**
- `src/components/sections/Faq.astro` — la section ; `README.md` — « FAQ / faq.ts » ; `docs/JOURNAL.md`

**Décisions prises**
- Structure et animation : voir « Décisions en vigueur ». Preline Accordion non utilisé : `<details>` natif suffit, sans script.
- Ligne d'aide dupliquée (bureau / mobile), une seule visible (`display: none` retire l'autre de l'arbre d'accessibilité).
- Aucun h3 ; chevron et animation sous `@supports`.

**Écarts par rapport au brief ou au prompt**
- Aucun sur les textes. Pas de titres h3 (choix d'accessibilité, ci-dessus).

**Vérifications effectuées**
- check : 0 erreur, 0 avertissement (49 fichiers). build : OK.
- Chromium, **390 · 768 · 1024 · 1440 px, clair et sombre** : aucun débordement. Bureau : colonne gauche à x = 32 (1024) et 176 (1440), accordéon à droite ; en dessous une colonne.
- Colonne collante (1440 px) : haut à 112 px (barre à 72 px), reste dans la hauteur de la carte en fin de section (bas 400 px contre 788 px).
- Clavier : Entrée ouvre, Espace ferme ; anneau de focus 3 px à l'intérieur de la ligne. Animation : hauteur 63 → 124 → 174 px (mi-course puis fin) ; **instantanée avec `prefers-reduced-motion`**. **Sans JavaScript** : première réponse visible, ouverture au clic fonctionnelle, section visible.
- Liens : « Voir les tarifs » arrête `#tarifs` à 96 px du haut ; « Écrivez-nous » va vers `#contact` (section placeholder, dernière de la page : elle ne peut pas s'arrêter à 96 px, voir suspens). Aucun lien mort après le retrait de « FAQ » de la navbar : aucun lien ne vise `#faq` hors du footer à venir.
- CLS = 0. JS : **inchangé** (aucun script ajouté).
- Contrastes AA, valeurs des tokens déjà mesurées sur le rendu : question 17,03 / 13,60 ; réponse `muted` sur carte 6,50 / 8,20 ; sous-titre et ligne d'aide `muted` sur fond de page 6,12 / 9,44 ; lien `brand-600` / `brand-300` sur carte 5,13 / 8,17 ; focus 5,13 / 6,74. Non remesuré pixel par pixel dans cette étape.
- Non testé : Safari, Firefox (`::details-content`, `interpolate-size`), appareil réel, lecteur d'écran.

**À faire / à valider ensuite**
- Les trois points ajoutés à « Points en suspens » ; étape 10 : id `contact` et footer (liens Sécurité et FAQ).

---

### [Étape 8 — Tarifs] · 2026-10-10
**Intervenant** : Claude (conversation « Étape 8 — Tarifs »)
**Statut** : terminé (à valider visuellement ; non testé hors Chromium)

**Fait**
- Section `#tarifs` : h2, sous-titre, quatre formules (Découverte, Établissement « Recommandée », Établissement Plus, Réseau d’écoles), note sous la grille. Textes du prompt repris tels quels (apostrophes ’, espaces insécables dans les nombres et avant « FCFA »). Aucun texte ajouté (ni paiement, ni garantie, ni promotion).
- `src/config/pricing.ts` : tableau typé des quatre formules + libellés + fonctions de mise en forme et de résolution du lien. Les trois boutons de souscription pointent vers `site.links.signup` ; « Nous contacter » vers WhatsApp, e-mail ou `#contact` (ici : `#contact`, contacts à `null`).
- Prix lisibles par les lecteurs d'écran (« 35 000 francs CFA par an », « À partir de 150 000 francs CFA par an », « 0 franc CFA ») ; la version visuelle est `aria-hidden`. Boutons : `aria-label` « Choisir cette formule : Établissement » (commence par le texte visible).
- Apparition en cascade par `data-reveal` / `data-delay` ; aucun script ajouté.

**Fichiers créés**
- `src/config/pricing.ts` — données et aides

**Fichiers modifiés**
- `src/components/sections/Pricing.astro` — la section (remplace le repère)
- `README.md` — section « Tarifs / pricing.ts »
- `docs/JOURNAL.md` — cette entrée, avancement, décisions, suspens

**Décisions prises**
- `subgrid` à 6 rangées pour aligner prix, boutons et listes (voir « Décisions en vigueur »).
- **Nombre à 40 px à 4 colonnes** (44 px en dessous) et grille élargie de 2 rem de chaque côté : à 44 px dans 257 px, « 150 000 FCFA / an » passait sur deux lignes et décalait les prix. Écart léger avec « ≈ 44 px ».
- « À partir de » au-dessus du nombre (petit, `muted`) ; nombres alignés sur une même ligne grâce à `align-self: end`.
- Boutons en taille `md` (44 px), libellé autorisé sur deux lignes : « Commencer gratuitement » débordait de la colonne à 4 colonnes en taille `lg`.
- Survol par `top` (voir « Décisions en vigueur »).
- Fond de section teinté pour détacher les cartes `surface`.

**Écarts par rapport au brief ou au prompt**
- Taille du nombre 40 px à 4 colonnes ; boutons `md` ; espace insécable avant « : » dans la note.
- Le prompt demande des listes `Inclus` : pas de libellé « Inclus » affiché (aucun texte ajouté) ; la liste suit directement le filet.

**Vérifications effectuées**
- check : 0 erreur, 0 avertissement (48 fichiers). build : OK.
- Chromium, **390 · 768 · 1024 · 1280 · 1440 px, clair et sombre** : aucun débordement horizontal. Colonnes : 1 / 2 / 2 / 4 / 4. À 768 et 1024 px : boutons, prix et listes alignés par ligne de 2 cartes ; à 1280 et 1440 : alignés sur les 4 (boutons y = 735, nombres y = 549, listes y = 803). Captures regardées : 1280 clair (avant correction), 1280 sombre, 390 clair ; les autres mesurées.
- Textes relevés dans le DOM : identiques au prompt. Un h2, quatre h3, 4 `article`, 4 boutons de 44 px de haut. Liens : 3 × `https://app.scoly.ink/creer-un-compte`, 1 × `#contact`.
- Lien « Tarifs » de la navbar : la section s'arrête à 96 px du haut, lien actif (`aria-current="location"`).
- Survol (1440 px) : −3 px ; absent avec `prefers-reduced-motion: reduce`. Focus clavier sur un bouton : anneau 2 px.
- CLS attribué à la section : 0. JS : **inchangé** (externe 145 623 octets, aucun script ajouté).
- **Contrastes AA mesurés (clair / sombre)** : titre de carte 17,03 / 13,60 ; texte `muted` sur carte 6,50 / 8,20 ; éléments de liste 17,03 / 13,60 ; badge 5,83 / 7,28 ; bouton principal 11,50 / 7,91 ; bouton secondaire 17,03 / 13,60 ; coche 5,13 / 8,17. Anneau (non-texte) : environ 4,5 en clair, 11,5 en sombre (calcul à partir des tokens). Le sous-titre et la note (`muted` sur le fond teinté) ont le même fond que l'étape 4 : 5,75 / 10,03 (non remesuré ici : l'outil de mesure ne lit pas le format `color-mix`). Valeur la plus basse : 5,13 (coche, non-texte), 5,75 (texte).
- Non testé : Safari, Firefox (`subgrid`, `color-mix()`), appareil réel, lecteur d'écran, vue sans JavaScript (`data-reveal` comme les autres sections).

**À faire / à valider ensuite**
- Points ajoutés à « Points en suspens » ; fournir WhatsApp / e-mail ; étape 7 en fond par défaut ; étape 10 doit porter l'id `contact`.

---

### [Étape 6 — Fonctionnalités] · 2026-10-10
**Intervenant** : Claude (conversation « Étape 6 — Fonctionnalités »)
**Statut** : terminé (à valider visuellement ; non testé hors Chromium)

**Fait**
- Section `#fonctionnalites` : h2 « Tout ce qu’il faut pour tenir vos documents en ordre », sous-titre, grille de six cellules (icône, h3, texte) dans l'ordre du prompt : Génération automatique (`file`), À l’image de votre école (`pen`), Import Excel ou CSV (`upload`), Archives et recherche (`archive`), Comptes et rôles (`users`), Vérification en ligne (`shield`). Textes comparés par programme au prompt dans le HTML construit (apostrophes ’, espace insécable avant « : » et « ? ») : **identiques**. Aucun chiffre, aucun gras, aucune liste dans les textes, aucun bouton ni lien, ni « historique des actions », ni paiement.
- Grille sans cartes, filets fins (`line`) : verticaux entre colonnes, horizontal entre les lignes, latéraux à gauche et à droite dès 640 px, rien en haut ni en bas de la grille. Section en `tone="alt"` (fond `surface`, bande différente de la section Documents, qui est sur `canvas`).
- Cellule : espace intérieur 32 px (mobile), 40 px (tablette), 48 px (bureau) ; icône 28 px (`brand-600` / `brand-300`), h3 Inter 600 20 px (`ink`), texte 16 px `muted`, interligne 1,7, largeur 30 rem au plus. Barre verticale arrondie de 4 × 28 px au bord gauche de la cellule, alignée sur la ligne du titre.
- Survol (`@media (hover: hover)`, 220 ms) : dégradé léger en fond, barre bleu marine (`brand-950`, sombre : `brand-300`), titre décalé de 10 px. Mouvement réduit : couleurs oui, glissement non. Rien au toucher (`hover: hover` faux sur l'émulation tactile).
- Apparition : `data-reveal` + `data-delay` (0 à 0,40 s par pas de 0,08 s) sur le contenu des six cellules, et sur l'en-tête. Aucun script ajouté.
- Icône `pen` ajoutée à `icons.ts` (tracés de la famille Lucide, comme les autres : grille 24, trait 1,75 appliqué par `Icon.astro`, extrémités arrondies, sans remplissage).

**Fichiers créés**
- Aucun.

**Fichiers modifiés**
- `src/components/sections/Features.astro` — la section (remplace le repère)
- `src/components/ui/icons.ts` — icône `pen`
- `README.md` — section « Fonctionnalités », liste des icônes
- `docs/JOURNAL.md` — cette entrée, avancement, décisions, points en suspens
- `/styleguide` : **aucun changement de code** : sa planche d'icônes parcourt `iconNames`, la nouvelle icône y apparaît seule. Navbar, autres sections, `global.css`, `site.ts`, `package.json` : non modifiés (aucune dépendance ajoutée).

**Décisions prises**
- **Filets par `gap: 1px` sur un fond `line`** plutôt que des bordures par cellule : les cas 1, 2 et 3 colonnes donnent les bons filets sans règles `nth-child` ni calcul des bords, et les six cellules se répartissent sans case vide (6 = 1 × 6, 2 × 3, 3 × 2). Contrepartie : les cellules doivent avoir un fond plein (`surface`).
- **`data-reveal` sur le contenu, pas sur la cellule** (voir « Décisions en vigueur »). Avant l'apparition, les cellules sont des cadres vides pendant moins d'une seconde ; le CSS global (`.js [data-reveal]`) est inchangé.
- **Dégradé par calque `::before`** : un `background-image` ne se fond pas ; seule l'opacité du calque est animée.
- **Barre dans le titre** : le h3 est en `position: relative` et la barre, décalée de `-padding`, est restée alignée sur sa ligne quel que soit l'espacement (32, 40 ou 48 px). Le glissement ne concerne que le libellé (`.ft-label`), pas la barre.
- **`grid-auto-rows: 1fr` dès 640 px** : sans cela, la 2ᵉ rangée était plus basse que la 1ʳᵉ à 1024 px (320 contre 348 px). En une colonne, chaque cellule garde sa hauteur naturelle (filets horizontaux seuls).
- Titre de cellule en **Inter semi-gras** (prompt), pas en serif : `type-h3` (Newsreader) n'a pas été utilisé.

**Écarts par rapport au brief ou au prompt**
- Aucun sur les textes ni la structure. La bande `tone="alt"` apporte les deux filets horizontaux de la **section** (haut et bas, comme `#comment-ca-marche`) ; la **grille** elle-même n'a aucun filet en haut ni en bas.
- Mobile : pas de filets latéraux (le prompt demande seulement des filets horizontaux entre les cellules).

**Vérifications effectuées**
- check : 0 erreur, 0 avertissement, 0 conseil (47 fichiers). build : OK (2 pages).
- Chromium, **390 · 768 · 1024 · 1440 px, thèmes clair et sombre** : `scrollWidth` = `clientWidth` aux 8 combinaisons. Colonnes : 1 (390), 2 (768, cellules 351 × 277), 3 (1024 : 319 × 348 ; 1440 : 361 × 293). Hauteurs identiques entre les six cellules à 768, 1024 et 1440. Les six cellules sont à opacité 1 après défilement dans les 8 combinaisons. Captures regardées : 1440 clair, 390 sombre, survol clair (cellule 2) ; les autres mesurées, non regardées.
- **Structure** : 1 h2, 6 h3, 1 `ul`, 6 `li`, 0 lien ou bouton, 0 `tabindex`, 0 `img`, 0 gras ; 6 SVG sur 6 en `aria-hidden="true"` ; section reliée au h2 (`aria-labelledby="fonctionnalites-titre"`).
- **Survol (1440 px, cellule 2)** : au repos, barre `rgb(221, 226, 234)`, titre sans transformation, calque à opacité 0. Au survol, clair : barre `rgb(8, 26, 74)` (`brand-950`), titre `translateX(10px)`, calque à 1. Sombre : barre `rgb(140, 196, 255)` (`brand-300`), même glissement, calque à 1. Durée de transition 0,22 s.
- **Mouvement réduit** : barre `brand-950` et calque à 1 au survol, `transform: none` sur le titre, contenu des cellules à opacité 1. **Tactile** (390 px, `has_touch`, `is_mobile`) : `(hover: hover)` ne correspond pas, donc aucune règle de survol.
- **Lien « Fonctionnalités » de la navbar** (1440 px) : la section s'arrête à 96 px du haut, sous la barre ; le lien est actif (`aria-current`, barre et panneau).
- **Contrastes AA, mesurés sur le rendu (rapport:1, clair / sombre)** : h2 17,03 / 13,60 ; titres de cellule 17,03 / 13,60 ; sous-titre et texte `muted` 6,50 / 8,20 ; icône 5,13 / 8,17 (seuil non-texte 3). Barre et filets au repos 1,30 / 1,35 : décoratifs, volontairement discrets. Barre au survol : `brand-950` sur `surface` environ 17, `brand-300` environ 8 (calculé à partir des tokens, non mesuré sur pixel). Texte `muted` sur le dégradé de survol : environ 5,8 (clair) et 7,6 (sombre), **calculé et non mesuré** ; valeurs les plus basses : **5,13 en clair (icône), 6,50 pour le texte**.
- **CLS** : page 0,00067 à 1440 px, sources relevées = éléments de la **barre de navigation** (déjà en suspens) ; **0 attribué à la section**.
- **Poids** (page d'accueil, même méthode que les étapes précédentes, construit avant / après sur les mêmes `node_modules`) : JS **149 389 → 149 389 octets (+0)** : externes 145 623, en ligne 3 766 (hors script de thème, voir étape 5). HTML 62 464 → **68 034 octets (+5 570)**. Aucune image.
- Non testé : Safari, Firefox (`color-mix()`, `::before` en survol), appareil réel (survol à la souris, toucher), lecteur d'écran, connexion lente, impression. La CSS (scopée) n'a pas été mesurée à l'octet.

**À faire / à valider ensuite**
- Les trois points ajoutés à « Points en suspens ».
- Étape 7 (`#securite`) : la section suivante reprend le fond par défaut ; celle-ci est en `surface`, l'alternance se poursuit.

---

### [Étape 5 — Documents] · 2026-10-10
**Intervenant** : Claude (conversation « Étape 5 — Documents »)
**Statut** : terminé (à valider visuellement ; non testé hors Chromium)

**Fait**
- Section `#documents` : h2 « Les documents que Scoly génère pour vous », sous-titre, pilule de 5 onglets, panneaux (aperçu + h3 + description + phrase commune + mention « Aperçu illustratif… »), phrase de fin centrée. Textes comparés par programme au prompt (h2, sous-titre, 5 libellés, 5 descriptions, phrase commune, mention, phrase de fin) : **identiques**. Aucun chiffre dans les textes de la section (les seuls chiffres sont les données fictives des feuilles).
- Pilule : onglet actif `primary` / `on-primary` (marine en clair, bleu clair à texte foncé en sombre) ; sous 1024 px elle défile sans barre visible et l'onglet actif est ramené au centre (aussi au clic et au clavier). Bureau (≥ 1024 px) : deux colonnes 11 / 9 (≈ 55 %), aperçu à gauche sur une scène `brand-50` (sombre : `brand-400` à 10 %), texte à droite centré verticalement. Dessous : une colonne.
- Cinq aperçus (HTML/CSS + SVG simples, aucune image bitmap) : certificat de scolarité (structure de l'exemple fourni : en-tête, titre, n°, texte, appréciations, observations, QR, date, signature et cachet, mention de bas de page), attestation d'inscription, fiche élève, attestation de transfert, demande de transfert.
- Comportement : ARIA `tablist` / `tab` (`aria-selected`, `aria-controls`) / `tabpanel` (`aria-labelledby`), flèches gauche / droite avec retour, Début, Fin, un seul onglet dans l'ordre de tabulation ; fondu de 250 ms avec 10 px de déplacement, rien en mouvement réduit ; aucune lecture automatique ni carrousel ; les cinq panneaux sont préchargés (`hidden`).
- Sans JavaScript : pilule masquée, cinq panneaux visibles en liste.

**Fichiers créés**
- `src/scripts/documents-tabs.ts` — onglets (1 142 octets minifiés, inclus en ligne par Astro)
- `src/components/documents/Paper.astro` — feuille A4 commune et classes `pp-*`
- `src/components/documents/PaperHeader.astro`, `PaperSign.astro`, `PaperFooter.astro`, `Qr.astro`, `sample.ts` — éléments communs et données fictives
- `src/components/documents/CertificatScolarite.astro`, `AttestationInscription.astro`, `FicheEleve.astro`, `AttestationTransfert.astro`, `DemandeTransfert.astro`

**Fichiers modifiés**
- `src/components/sections/Documents.astro` — la section (remplace le repère)
- `README.md` — structure, liste des scripts, section « Documents »
- `docs/JOURNAL.md` — cette entrée, avancement, décisions, points en suspens
- `/styleguide`, navbar, autres sections, `global.css`, `site.ts`, `package.json` : **non modifiés** (aucune dépendance ajoutée)

**Décisions prises**
- **Tout en `cqw`** : la feuille est un conteneur (`container-type: inline-size`) et chaque taille est relative à sa largeur. Les cinq feuilles gardent donc les mêmes proportions de 320 à 1440 px, et la même hauteur. Contrepartie : le contenu doit tenir dans 141,4 cqw de haut ; les textes ont été resserrés pour tenir à 9 px sur mobile (corps 3,05 cqw, minimum 2,85 cqw).
- **Feuille en `.light`** : réutilise les jetons clairs existants (`surface`, `ink`, `muted`, `line`, `primary`) sans couleur en dur ; la feuille reste blanche en sombre sans variante.
- **Largeur de feuille limitée à 26 rem** (416 px) : au-delà, la feuille devient trop haute (plus de 600 px) et le texte gagne peu.
- **Les panneaux contiennent aperçu et texte** (et non un seul texte qui change) : description, titre et mention sont dans le HTML pour le référencement, et le lecteur d'écran ne lit que le panneau actif.
- **Sans JS = liste** plutôt qu'ancres : plus simple, et rien n'est caché. Le `[hidden]` de Tailwind est surchargé dans `@layer base` (voir « Décisions en vigueur »).
- **Titre h3 du document** : style local `.docs-title` (Newsreader 500, 28 → 40 px), comme `.pb-title` à l'étape 3 bis, pour ne pas toucher au design system.
- **Données génériques** : dates `JJ/MM/AAAA`, classe « 6ᵉ A », ville « Ville », téléphone « 00 00 00 00 ». L'année scolaire est calculée au build (septembre à août) : elle change au prochain déploiement.
- **QR décoratif sur le certificat uniquement** : l'exemple fourni en comporte un. Motif déterministe, non scannable, sans lien ni code de vérification. Les autres documents n'en ont pas (pas d'exemple).
- Cachet et signature en SVG simples (bleu de marque), cachet sans texte (des barres figurent les lignes).

**Écarts par rapport au brief ou au prompt**
- En-tête simplifié : les deux lignes de ministère et de direction de l'exemple ne sont pas reprises (voir points en suspens).
- Fiche élève sans bloc signature.
- Mention de bas de page reprise sur les cinq documents alors que seul l'exemple du certificat la montre.
- Les textes d'aperçu contiennent un espace insécable avant « : » (« Objet : ») ; aucune autre ponctuation concernée dans la section.

**Vérifications effectuées**
- check : 0 erreur, 0 avertissement, 0 conseil (47 fichiers). build : OK (2 pages).
- Chromium, **390 · 768 · 1024 · 1440 px, thèmes clair et sombre** : aucun débordement horizontal (`scrollWidth` = `clientWidth`) aux 8 combinaisons, aucun élément de la section hors écran (hors pilule, qui défile). Feuille blanche (`rgb(255, 255, 255)`) dans les deux thèmes. Ratio mesuré 1,414 pour les cinq. Feuille : 324 × 458 px à 390 px, 416 × 588 px à 768 px et au-delà. Texte le plus petit : **9,2 px à 390 px**, 11,8 px ailleurs. Contenu de chacune des cinq feuilles dans la page (pas de débordement) aux 4 largeurs. Captures regardées : 390 sombre, 768 clair, 1024 sombre (avec focus clavier), 1440 clair (les cinq feuilles).
- **Clavier** : flèche droite / gauche (avec retour de la dernière à la première et inversement), Début, Fin : bon onglet et bon panneau à chaque pas, un seul `tabindex="0"` parmi les onglets. Clic : OK. Anneau de focus visible sur l'onglet actif (dans le remplissage de la pilule).
- **ARIA** : 5 paires `aria-controls` / `aria-labelledby` résolues, `role="tablist"` nommé par le h2, section reliée au h2, 5 `role="img"` avec les `aria-label` du prompt, contenu des feuilles `aria-hidden`. Panneaux 2 à 5 `hidden` au chargement.
- **Sans JavaScript** : pilule masquée, cinq panneaux affichés (700 px chacun à 1280 px), capture regardée.
- **Mouvement réduit** : `animation-name: none` sur le panneau, `transition-property: none` sur les onglets, pas de défilement animé de la pilule. Avec mouvement normal : animation `docs-in` de 0,25 s.
- **CLS** : 0 attribué à la section à 390 et 1440 px, aussi après avoir parcouru les cinq onglets. Page : 0 à 390 px, 0,0007 à 1440 px (barre de navigation, déjà noté). Hauteur de l'aperçu constante : scène 670 px à 1440 px, 484 px à 390 px, quel que soit l'onglet. Hauteur du panneau : constante au bureau (700 px), **variable en mobile** (743 px pour le certificat, 716 px ensuite : texte plus long ; voir points en suspens).
- **Lien « Documents » de la navbar** (1280 px) : la section s'arrête à 96 px du haut, sous la barre, et le lien est actif (scrollspy).
- **Contrastes AA, mesurés sur le rendu (rapport:1, clair / sombre)** : h2 16,03 / 15,65 ; sous-titre et phrase de fin 6,12 / 9,44 ; onglet actif 11,50 / 7,91 ; onglet inactif sur la pilule 6,50 / 8,20 ; h3 et description 16,03 / 15,65 ; phrase commune et mention 6,12 / 9,44. Feuille (identique dans les deux thèmes) : texte 17,03 ; texte `muted` (référence, étiquettes, pied) 6,50 ; titres et étiquettes `primary` 11,50. **Valeurs les plus basses : 6,12 en clair (texte `muted` sur le fond de page), 7,91 en sombre (onglet actif).** Toutes au-dessus de 4,5.
- **Poids** (page d'accueil, même méthode que les étapes précédentes) :
  - JS : 148 247 → **149 389 octets (+1 142, +0,77 %)**, soit 147 943 → 149 085 hors script de thème (304 octets, non compté dans les mesures précédentes). Tout le surplus est `documents-tabs` (1 142 octets, 632 compressés), en ligne ; fichiers externes inchangés (145 623, 52 806 compressés).
  - HTML de la page : 38 808 → **62 464 octets (+23 656)** ; compressé 9 672 → 13 428 (+3 756). La section seule : 136 → **22 619 octets** (3 732 compressés), dont les cinq feuilles.
  - CSS : 54 944 → 61 030 octets (+6 086) ; compressé 12 122 → 13 491 (+1 369).
  - Images : 0 (aucune requête ajoutée).
- Non testé : Safari, Firefox (`container-type`, unités `cqw`, `aria-selected:` de Tailwind), appareil réel (défilement tactile de la pilule), lecteur d'écran, connexion lente réelle, impression, le comportement des feuilles avec des polices non chargées.

**À faire / à valider ensuite**
- Les six points ajoutés à « Points en suspens » (surtout : les exemples réels des quatre autres types).
- Étape 6 (`#fonctionnalites`) : la section suivante reprend le fond par défaut.

---

### [Étape 4 — Comment ça marche] · 2026-10-10
**Intervenant** : Claude (conversation « Étape 4 — Comment ça marche »)
**Statut** : terminé (à valider visuellement ; non testé hors Chromium)

**Fait**
- Section `#comment-ca-marche` : h2 « Comment ça marche », sous-titre, puis `<ol>` de trois étapes (« Ajoutez vos élèves », « Choisissez un document », « Retrouvez et faites vérifier »), bouton « Essayer gratuitement » (`site.links.signup`, `Button` principal, taille `lg` comme le Hero) et ligne « Plan gratuit… » en `type-small`. Textes comparés par programme au prompt, **espaces insécables et apostrophes ’ compris** : identiques (h2, sous-titre, 3 h3, 3 paragraphes, ligne du plan).
- **Aucune illustration, par choix** : le prompt demande une section au rythme différent du zigzag de `#pourquoi`. Chaque carte porte une icône de `Icon.astro` : `upload` (étape 1), `file` (étape 2), `archive` avec une petite pastille `shield` dans le coin (étape 3). Aucune icône ajoutée à `icons.ts`. Aucune image bitmap, aucun `<img>` dans la section.
- Icône dans un carré de 56 px (`rounded-2xl`), fond `brand-50` / `brand-500` à 15 %, icône `brand-600` / `brand-300` de 28 px, `aria-hidden`.
- Pastilles numérotées 1, 2, 3 (Newsreader 500, marine `primary` pleine, 48 px au bureau, 40 à 44 px en dessous), numéro en texte.
- Bureau (≥ 1024 px) : 3 colonnes égales, ligne horizontale qui passe derrière les pastilles, cartes de même hauteur. En dessous : une colonne, pastilles à gauche reliées par une ligne verticale, carte à droite de sa pastille (colonne de 40 rem au plus sur tablette).
- Animation : `data-reveal` + `data-delay` (0, 0,12, 0,24) sur les cartes et sur le bloc du bouton ; aucune animation sur les icônes. Ligne de liaison : remplie au scroll (scrub) par `src/scripts/how-it-works.ts`, de la pastille 1 à la 3, horizontalement au bureau et verticalement en dessous. Entière et statique sans script ou avec `prefers-reduced-motion`.

**Fichiers créés**
- `src/scripts/how-it-works.ts` — remplissage de la ligne au scroll (1 284 octets minifiés)

**Fichiers modifiés**
- `src/components/sections/HowItWorks.astro` — la section (remplace le repère)
- `README.md` — liste des scripts, paragraphe « Section Comment ça marche »
- `docs/JOURNAL.md` — cette entrée, avancement, décisions, points en suspens
- `/styleguide` (`styleguide.astro`) et la liste d'icônes du README : **inchangés**, aucune icône ajoutée (le README ne liste pas les icônes une à une)
- `motion.ts`, Navbar, Hero, `Problems.astro`, design system : non modifiés

**Décisions prises**
- **Ligne en segments plutôt qu'un seul trait** : un trait unique aurait demandé de connaître en CSS la hauteur de la dernière carte pour s'arrêter au centre de la pastille 3. Un segment par `<li>` (du centre d'une pastille au centre de la suivante) marche avec la même structure au bureau et sur mobile, et la liste `<ol>` ne contient que des `<li>`.
- **Remplissage** : au bureau, une seule plage de scroll (liste entre 78 % et 48 % de la hauteur de l'écran) pour toute la ligne, segment après segment. Sur mobile, le bout de la ligne suit la position de lecture (70 % de l'écran) : il atteint le centre de chaque pastille quand celle-ci y passe (distances mesurées à chaque recalcul). Mesuré : segment 1 puis segment 2, dans les deux sens, 0 au retour en haut de page.
- **Ligne entière par défaut** : le CSS ne la vide que si le script a posé `data-hiw-ready`. Sans cela, un script qui échoue laisserait une ligne vide.
- **Fond de section teinté** plutôt que `tone="alt"` (voir « Décisions en vigueur ») : un écart de 1,13:1 (clair) et 1,22:1 (sombre) entre carte et fond, soit juste de quoi les détacher sans « bloc » criard.
- **Pastille `shield`** sur l'étape 3 : le prompt la permet si elle fonctionne. Elle est lisible (picto 5,13:1 en clair, 9,11:1 en sombre) et reste petite (28 px, bord `surface`). À valider (voir « Points en suspens »).
- **Card en `padding="none"` avec ses propres marges** (20 / 24 / 28 px selon la largeur) : 20 px à 390 px laisse 258 px de texte à 16 px, sans coupure maladroite.
- Texte des cartes : 16 px sous 1024 px, 17 px au bureau (`leading-relaxed`).

**Écarts par rapport au brief ou au prompt**
- Fond de section : teinte mélangée (`tile` + `canvas`) et non le ton `surface` ou `canvas` pur demandé (voir ci-dessus).
- Styles dans un `<style is:global>` préfixé `hiw-` : une feuille « scoped » ne peut pas atteindre l'élément `<section>` rendu par `Section`.
- Aucun autre écart : pas de liste dans les textes, pas de gras, pas de chiffre autre que 1, 2, 3 et 10, pas de paiement mentionné.

**Vérifications effectuées**
- check : 0 erreur, 0 avertissement, 0 conseil (35 fichiers). build : OK (2 pages).
- Chromium, **390 · 768 · 1024 · 1440 px, thèmes clair et sombre** : `scrollWidth` = `clientWidth` aux 8 combinaisons, aucun débordement de la section. Captures regardées : clair 390, 768, 1440 ; sombre 390, 768, 1024, 1440 ; clair 1024 (planche).
- Structure : 1 `<ol>`, 3 `<li>`, 1 h2, 3 h3, `list-style: none`, section reliée à son h2 (`aria-labelledby`), numéros lus en texte (1, 2, 3), 0 `img`/`picture`/`canvas`, 0 `b`/`strong`, 0 liste imbriquée. Chiffres présents dans le texte visible : 1, 2, 3 et 10.
- Cartes au bureau : hauteurs identiques (372 px à 1024, 342 px à 1440), largeurs 299 et 341 px. Mobile : cartes de 298 px à 390 px, 580 px à 768 px. Pastilles alignées : centres à x = 181 / 512 / 843 (1024) et 347 / 720 / 1093 (1440) sur une même ligne ; à gauche en dessous de 1024 px (x = 40 à 390 px, 86 à 768 px).
- Lien du bouton relevé dans le DOM : `https://app.scoly.ink/creer-un-compte` (`site.links.signup`).
- **Ligne au scroll** (variable `--hiw-s` relevée à chaque pas) : 1440 et 1024 px, de 0 à 1 entre 78 % et 48 % de la hauteur de l'écran (valeur finale : à 1440 × 900, 0 à 765 px, 0,20 puis 0 à 675 px, ligne complète à 405 px ; la fin de plage a d'abord été à 40 %, ramenée à 48 % pour qu'une arrivée par l'ancre sur un écran court trouve la ligne complète) ; 390 px, segment 1 puis segment 2 sur environ 670 px de scroll ; retour en haut : 0, 0. Avec `prefers-reduced-motion: reduce` : `data-hiw-ready` absent, aucun `transform`, ligne entière, cartes à opacité 1. Sans JavaScript (1440 px) : capture regardée, ligne entière, cartes visibles.
- **Ancre du Hero** : à 96 px du haut après le clic, sous la barre (qui s'arrête à 72 px), avec et sans `prefers-reduced-motion`. Voir le point en suspens sur le dépassement à 500 ms (identique avant l'étape 4).
- Clavier : seul le bouton est focusable dans la section (Tab depuis le h2 y mène en premier) ; anneau de focus 2 px (`#0a64f0` en clair).
- **CLS** : 0 à 390 px ; 0,00067 à 1440 px, tout attribué à la barre de navigation (point déjà en suspens), **0 décalage attribué à la section**. Images chargées par la page : les logos et l'icône du Hero ; aucune dans la section.
- **Contrastes AA (rapport:1, clair / sombre), mesurés sur les pixels rendus** :
  - titre h3 / carte 17,03 / 13,60 ; texte `muted` / carte 6,50 / 8,20 ; sous-titre et ligne « Plan gratuit » `muted` / fond de section 5,75 / 10,03 ; chiffre de la pastille 11,50 / 7,91 ; texte du bouton 11,50 / 7,91.
  - **Valeurs les plus basses pour le texte : 5,75 en clair (`muted` sur le fond de section teinté), 7,91 en sombre (chiffre de la pastille et bouton).** Toutes au-dessus de 4,5.
  - Non-texte (seuil 3) : icône / carré d'icône 4,70 / 6,75 (calculé à partir des tokens) ; picto `shield` 5,13 / 9,11 ; pastille et remplissage de la ligne / fond de section 10,17 / 8,24 ; piste de la ligne (`line`, décorative) 1,15 / 1,65 ; carte / fond de section 1,13 / 1,22.
- **Poids du JS** (page d'accueil, même méthode que les étapes précédentes) : 146 741 → **147 943 octets (+1 202, +0,82 %)**. Fichiers externes : 145 623 (Base 31 517 + chunk GSAP / ScrollTrigger 112 822 + `how-it-works` 1 284), scripts en ligne 2 320 (inchangés). Compressé (gzip, externes) : 51 625 → 52 525 (+900). Le chunk GSAP est de nouveau séparé du fichier principal (il est importé par deux scripts) ; seuls les 1 284 octets de `how-it-works` sont du code nouveau, le reste est du découpage.
- Non testé : Safari, Firefox (`color-mix()` du fond de section), appareil réel, lecteur d'écran, connexion lente réelle, scroll tactile sur mobile réel (inertie), impression.

**À faire / à valider ensuite**
- Valider visuellement : pastille `shield`, piste de la ligne (discrète), fond teinté, cartes étroites à 390 px.
- Étape 5 (`#documents`) : la section suivante reprend le fond par défaut ; celle-ci est teintée, l'alternance se poursuit.

---

### [Étape 3 bis — Zigzag et illustrations SVG] · 2026-10-10
**Intervenant** : Claude (conversation « Étape 3 bis — Illustrations »)
**Statut** : terminé (à valider visuellement ; non testé hors Chromium)

**Fait**
- Section `#pourquoi` refondue : h2 et sous-titre inchangés, puis deux rangées en zigzag (« Sans Scoly » : illustration à gauche ; « Avec Scoly » : illustration à droite). Chaque rangée : badge (`Badge`, neutre puis marque), h3 en Newsreader, un seul `<p>`. Textes relus par programme contre le prompt (apostrophes ’ et espace insécable avant « : » conservés) : identiques.
- **Photos supprimées** : `src/assets/images/avant-secretariat-papier.jpg` et `avec-scoly-ordinateur.jpg` (et le dossier devenu vide). `<Picture>` et `astro:assets` retirés de la section. Plus aucun `<img>` ni `<picture>` dans `#pourquoi`.
- Ancienne mise en page (deux cartes, `subgrid`, listes de 5 lignes, pastilles, badge-h3 sur l'image) supprimée avec ses classes et ses constantes.
- Deux illustrations originales (SVG inline) : `SansScoly` (bureau encombré, tons désaturés, accent orange sur la pile de papiers) et `AvecScoly` (même bureau ordonné ; fenêtre d'application avec fiche élève, certificat, cachet, signature, champ de recherche ; personne assise devant un ordinateur ; second personnage debout avec une pastille de rôle ; coche orange ; plante).
- Kit : variables `--ill-*` (clair et sombre) et classes partagées dans `global.css` ; animations CSS (`i-float`, `i-sway`, `i-pop`), 3 éléments par scène, aucune sous `prefers-reduced-motion`.
- Documentation : `docs/ILLUSTRATIONS.md` (nouveau), BRIEF §7 (ligne « Illustrations : voir `docs/ILLUSTRATIONS.md` », mention des photos remplacée) et §8 (image bitmap : cas particulier), README (note « Images » remplacée par « Illustrations », structure), `/styleguide` (section « Illustrations »).

**Fichiers créés**
- `src/components/illustrations/SansScoly.astro` — scène « Sans Scoly »
- `src/components/illustrations/AvecScoly.astro` — scène « Avec Scoly »
- `docs/ILLUSTRATIONS.md` — guide du style d'illustration

**Fichiers modifiés**
- `src/components/sections/Problems.astro` — section réécrite (zigzag, deux rangées)
- `src/styles/global.css` — ajout des variables `--ill-*`, classes partagées et animations (aucune modification du design system existant)
- `src/pages/styleguide.astro` — section « Illustrations » (outil de relecture)
- `docs/BRIEF.md`, `docs/JOURNAL.md`, `README.md` — documentation

**Fichiers supprimés**
- `src/assets/images/avant-secretariat-papier.jpg`, `src/assets/images/avec-scoly-ordinateur.jpg`

**Méthode et itérations** (dessin, rendu en navigateur, capture, correction)
- `SansScoly` : **3 itérations**. 1re : composition posée (étagère de classeurs, horloge, bureau, lampe, piles, feuilles volantes) ; plateau du bureau et papiers trop pâles, bras mal lisible, lampe posée sur la feuille. 2e : plateau plus foncé, personnage penché en avant, lampe et classeur déplacés, pile de papiers en accent. 3e : cou raccourci, tête rapprochée du torse. Simplifié : pas de rupture de visage (oreille, nez, un point pour l'œil), pas de pied de chaise détaillé, pas de bouche.
- `AvecScoly` : **3 itérations**. 1re : la tête du personnage assis cachait la fiche élève (la fenêtre descendait trop bas) ; 2e : fenêtre réduite (échelle 0,905) et décalée vers la droite, second personnage décalé à droite, bulle de rôle avec une petite pointe ; 3e (thème sombre) : pantalons, chaussures et ordinateur passaient en bleu clair éblouissant parce que `--ill-navy` s'éclaircit en sombre → ajout de `--ill-dark` pour les grands aplats. Simplifié : ordinateur vu de dos (rectangle avec un point) plutôt que de profil, mains cachées derrière l'écran, second personnage debout bras le long du corps.
- Aucun personnage supprimé : après les corrections, ils restent lisibles.

**Poids**
- `SansScoly` : **5 504 octets**. `AvecScoly` : **6 487 octets**. Total **11 991 octets** (cible ≤ 28 Ko). `SansScoly` est un peu sous la fourchette de 6 à 14 Ko : choix de rester léger plutôt que d'ajouter du détail inutile.
- CSS partagé ajouté (variables, classes, animations) : 3 457 octets en source, une seule fois.
- Images chargées pour la section : 0 (les photos pesaient environ 20,6 Ko chargées sur un écran standard, 793 Ko pour les originaux).
- **JS** (page d'accueil, même méthode qu'avant : fichier externe + scripts de la barre et du lecteur vidéo) : 146 741 octets avant, **146 741 octets** après (144 421 + 1 626 + 694) : stable, aucune variation. Le petit script de thème dans le `<head>` (304 octets) n'est pas compté, comme dans les mesures précédentes.

**Décisions prises**
- **Deux variables pour le « sombre »** (`--ill-navy` et `--ill-dark`) : avec une seule, les grands aplats (pantalons, ordinateur) devenaient blancs-bleutés en thème sombre. Navy reste pour les traits fins.
- **Variable supplémentaire `--ill-leaf`** (feuillage vert doux) : la palette demandée n'avait pas de vert ; la plante en avait besoin, sinon elle aurait été bleue. Vert désaturé, hors du « vert criard ».
- **Classes partagées dans `global.css`** plutôt que dans chaque SVG : garantit que les prochaines scènes réutilisent les mêmes couleurs.
- **Titres de rangée** : un style local (28 → 38 px) plutôt que `type-h3` (20 → 24 px), trop petit pour tenir tête au h2 sous un titre de section de 30 → 44 px ; le design system n'est pas modifié.
- **Ordre dans le HTML** : illustration avant le texte dans les deux rangées. Au bureau, `lg:order-last` sur l'illustration de la rangée 2. Sans effet pour le lecteur d'écran (illustration masquée), le clavier (aucun élément focusable) et le mobile (illustration toujours au-dessus).
- **Pastille de rôle** : pastille flottante avec petite pointe au-dessus de la tête du second personnage, plutôt qu'un badge épinglé sur la poitrine (illisible à petite taille).
- **Animations** : « Sans » : trois feuilles qui flottent ; « Avec » : pastille qui flotte, coche qui apparaît, plante qui se balance. Boucles de 5,5 à 7 s, aucune animation si `prefers-reduced-motion` est actif.

**Écarts par rapport au brief ou au prompt**
- Variables `--ill-dark` (grands aplats sombres) et `--ill-leaf` (feuillage) ajoutées au minimum demandé ; justifié ci-dessus.
- Poids de `SansScoly` (5,5 Ko) légèrement sous la fourchette indiquée (6 à 14 Ko).
- Aucun autre écart : textes, structure, pas de liste, pas de bouton, pas de chiffre, aucun texte dans les illustrations.

**Vérifications effectuées**
- check : 0 erreur, 0 avertissement, 0 conseil. build : OK (2 pages). Aucune image générée par `astro:assets`.
- Textes de la section relus par programme contre le prompt : titre, sous-titre, deux badges, deux h3 et deux paragraphes identiques (espaces insécables ramenés à une espace avant comparaison ; le paragraphe 1 contient bien l'espace insécable avant « : »). Section : 1 h2, 2 h3, 3 `<p>` (sous-titre compris), 0 `ul`/`li`/`a`/`button`/`img`, aucun `<text>` ni `<title>` dans les SVG.
- Chromium, **390 · 768 · 1024 · 1440 px, thèmes clair et sombre** : aucun débordement horizontal (`scrollWidth` = `clientWidth`) aux 8 combinaisons. Captures regardées à 390, 1024 et 1440 (clair), 390 et 1440 (sombre) ; 768 mesuré, non regardé en capture.
- Zigzag mesuré : à 1024 et 1440 px, rangée 1 illustration à gauche du texte, rangée 2 illustration à droite ; à 390 et 768 px, une colonne, illustration au-dessus du texte pour les deux rangées. Ratio des SVG 1,333 (4:3) partout. Largeur de l'illustration : 350 px (390), 544 (768), 448 (1024), 512 (1440).
- Typographie : paragraphe 17 px à 390 px, 19 px à 1440 px, interligne 32,3 px, largeur 32 rem ; h3 28 px (390) et 38 px (1440), Newsreader.
- **CLS = 0** à 390 et 1440 px (observateur `layout-shift`, page chargée puis section parcourue) : aucun décalage attribué. Aucune requête d'image dans la section.
- `prefers-reduced-motion: reduce` : aucun `animation-name` actif dans les deux SVG ; avec `no-preference` : 3 éléments animés par scène.
- Clavier et lecteur d'écran : 0 élément focusable dans la section ; `aria-hidden="true"` et `focusable="false"` sur les deux SVG (et sur leur conteneur) ; section reliée à son h2 (`aria-labelledby`) ; ordre de lecture H2, P, H3, P, H3, P.
- **Contrastes AA (rapport:1, clair / sombre)** : paragraphe `muted` sur le fond 6,12 / 9,44 ; titre h3 16,03 / 15,65 ; sous-titre 6,12 / 9,44 ; badge « Sans Scoly » 13,81 / 11,34 ; badge « Avec Scoly » 5,83 / 7,28. **Valeurs les plus basses : 6,12 en clair (le paragraphe en `muted`) et 7,28 en sombre (badge « Avec Scoly »)**, toutes au-dessus de 4,5. Les illustrations sont décoratives : non soumises au contraste du texte, mais contrôlées à l'œil en sombre (rien d'éblouissant).
- Non testé : Safari, Firefox, appareil réel, lecteur d'écran, connexion lente réelle, impression, `prefers-reduced-motion` sur un appareil réel. Les couleurs des illustrations n'ont pas été mesurées au pixel (contrôle visuel seulement). Rendu à 768 px non regardé en capture.

**À faire / à valider ensuite**
- Valider visuellement les deux scènes (personnages, ambiance, pastille de rôle), le zigzag et la taille des titres de rangée.
- Étape 4 (`#comment-ca-marche`) : réutiliser le kit selon `docs/ILLUSTRATIONS.md`.

---

### [Étape 3 — Avant / Avec Scoly] · 2026-10-10
**Intervenant** : Claude (conversation « Étape 3 — Avant / Avec Scoly »)
**Statut** : terminé (photo « Sans Scoly » de définition insuffisante, voir points en suspens)

**Fait**
- **Partie A — Hero** : animation d'entrée GSAP remplacée par du CSS pur (`@keyframes hero-in`, `animation-delay: calc(var(--hero-i) * 0.1s)`). Même cascade (titre, sous-titre, boutons, cadre vidéo avec échelle 0,985 → 1), même durée (0,5 s + 3 × 0,1 s = 0,8 s), même courbe (équivalent de `power2.out`). Supprimés : l'état initial masqué sous `.js`, le filet de sécurité de 1,2 s, `data-hero-ready`, `src/scripts/hero.ts` et son import. Aucune animation avec `prefers-reduced-motion`. Sans JavaScript, la même animation CSS joue (elle n'en dépend plus).
- Hero, orpheline du sous-titre : espace insécable entre « à » et « consulter » (le texte visible ne change pas). `text-wrap: pretty` seul ne suffit pas sous Firefox. Balayage de 197 largeurs (320 à 1500 px) : aucune dernière ligne d'un seul mot.
- Lecteur vidéo (`video-frame.ts`) : non modifié, comportement vérifié avec une vidéo de test temporaire (retirée, `site.ts` restauré).
- **Partie B — section `#pourquoi`** : `Section` + `SectionHeading` centré, deux cartes (« Sans Scoly », « Avec Scoly »), image 3:2, badge sur l'image, 5 lignes par liste avec séparateurs. Textes de la référence, sans autre texte, sans légende, sans bouton, sans ruban.
- « Sans Scoly » : carte `surface`, texte `muted`, pastille `tile` avec un tiret. « Avec Scoly » : carte teintée `brand-50` (clair) / `brand-400` à 10 % (sombre), bordure `brand-200` / `brand-400` à 30 %, texte `ink`, pastille de validation `brand-600` (clair) / `brand-400` (sombre). Pas de rouge.
- Images : `<Picture>` d'`astro:assets`, AVIF + WebP + JPEG de repli, `sizes` correct, dimensions déclarées, `loading="lazy"`, `decoding="async"`, `aspect-[3/2]`, `object-cover`, mêmes rayons (16 px) et bordure fine `line`. `dark:brightness-90`.
- Animation : `data-reveal` existant uniquement (aucun script ajouté).

**Fichiers créés**
- `src/assets/images/avant-secretariat-papier.jpg` — photo « Sans Scoly » (512 × 512, 59 Ko)
- `src/assets/images/avec-scoly-ordinateur.jpg` — photo « Avec Scoly » (1600 × 1066, 130 Ko)

**Fichiers modifiés**
- `src/components/sections/Problems.astro` — la section (remplace le repère)
- `src/components/sections/Hero.astro` — animation CSS, `--hero-i`, nbsp ; script retiré
- `README.md` — note « Images », structure
- `docs/JOURNAL.md` — cette entrée, avancement, décisions, points en suspens

**Fichiers supprimés**
- `src/scripts/hero.ts` — devenu inutile (rien à garder)

**Poids des images (avant → après)**

| Image | Original fourni | Dépôt (`src/assets/images`) | Servi (AVIF · WebP · JPEG, par largeur) |
|---|---|---|---|
| Sans Scoly | PNG 512 × 512, 421 971 octets | JPEG q88, 512 × 512, 58 936 octets | 480 px : 14 007 · 28 642 · 41 471 ; 512 px : 15 576 · 31 588 · 52 002 |
| Avec Scoly | JPEG 2576 × 1717, 371 535 octets | JPEG q82, 1600 × 1066, 129 734 octets | 480 px : 6 567 · 11 506 · 19 468 ; 512 : 7 277 · 12 396 · 21 564 ; 768 : 11 835 · 20 320 · 39 010 ; 1100 : 18 641 · 32 470 · 67 344 ; JPEG de repli 1600 px : 127 775 |

- Chargé à 390 ou 1440 px (écran standard, AVIF) : 14 007 + 6 567 = **environ 20,6 Ko** pour les deux images, contre 793 Ko pour les originaux.
- Les largeurs 768 et 1100 n'existent pas pour la photo « Sans Scoly » : Astro n'agrandit pas une image de 512 px.

**Poids du JS** (page d'accueil, mesuré sur `dist/index.html`) : 146 688 → **146 741 octets** (+53, +0,04 %) : fichier externe 144 421 + scripts en ligne 2 320 (barre 1 626 + lecteur 694). Gzip du fichier externe : 51 625 octets. Stable, mais pas en baisse : `hero.ts` (452 octets) a disparu, et GSAP, auparavant dans un fichier séparé partagé (69 582), est maintenant inclus dans le fichier principal (+505). Explication non vérifiée plus finement. `gsap` reste nécessaire (`motion.ts`).

**Décisions prises**
- **`<Picture>` au lieu de `<Image>`** : le prompt demande AVIF et WebP ; `<Image>` ne produit qu'un format. Même module `astro:assets`, aucune dépendance.
- **Le h3 sert de badge** : le prompt demande un badge sur l'image et un h3 portant le même texte. Les deux côte à côte auraient répété « Sans Scoly » deux fois à l'écran. Le h3 est donc posé sur l'image, en pastille (16 px, gras). Il vient avant l'image dans le HTML, donc l'ordre de lecture reste : titre de la colonne, image, liste. À valider.
- **Photo « Sans Scoly » carrée** (512 × 512, pas 3:2) : non agrandie, non recadrée dans le fichier. Le recadrage 3:2 se fait par CSS (`object-position: 50% 55%`) : visage, main et stylo restent visibles. Voir points en suspens.
- **Photo « Avec Scoly »** : déjà en 3:2, `object-position: 30% 40%` (sans effet tant que le ratio du fichier est 3:2, posé pour l'avenir).
- **Alignement des lignes par `subgrid`** (bureau) plutôt que par une hauteur fixe : les lignes de 1 ou 2 lignes de texte restent alignées d'une colonne à l'autre, sans hauteur à deviner. Mesuré : haut et bas de chaque ligne identiques à 1024 et 1440 px.
- **Mobile et tablette (< 1024 px)** : cartes empilées « Sans » puis « Avec », chacune avec son image et son badge. Raison : des paires « ligne n ↔ ligne n » entrelacées auraient imposé un ordre visuel différent de l'ordre de lecture (lecteur d'écran, clavier) et un titre par paire ; deux cartes de couleurs différentes séparent clairement les deux listes, et l'ordre « Sans » puis « Avec » raconte l'avant puis l'après. Largeur plafonnée à 42 rem pour que les images ne grandissent pas sur tablette : images totales 418 px de haut à 390 px, 836 px à 768 px et au-delà, soit 0,5 à 0,9 écran (limite : 1,5).
- Texte des lignes à 16 px, avec `text-pretty` (évite le mot seul en fin de ligne) ; contrôle à 390 px : aucune ligne coupée maladroitement.
- Typographie : apostrophes ’ et espace insécable avant « : » (comme à l'étape 2). Texte relu par programme (apostrophes typographiques et espaces insécables ramenés à leur forme simple avant comparaison) : titre, sous-titre, les deux h3 et les 10 lignes sont identiques à ceux du prompt.
- Alt des images : textes du prompt, tels quels. Badge et pastilles : `aria-hidden` ou texte du h3.

**Écarts par rapport au brief ou au prompt**
- `<Picture>` à la place de `<Image>` (voir ci-dessus).
- Photo « Sans Scoly » : 512 px de large au lieu de « 1600 px maximum, ratio 3:2 » (la source ne le permet pas).
- h3 et badge fusionnés (voir ci-dessus).
- Hero : espace insécable dans le sous-titre (le texte du prompt n'est pas modifié).

**Vérifications effectuées**
- check : 0 erreur, 0 avertissement, 0 conseil. build : OK (2 pages, 19 images générées). Aucun « Vidéo à venir », aucun `DevPlaceholder`, aucun `<video>` dans `dist/index.html`.
- Chromium, 390 · 768 · 1024 · 1440 px, thèmes clair et sombre : `scrollWidth` = `clientWidth` partout (aucun débordement). Captures regardées aux 8 combinaisons.
- Bureau (1024 et 1440 px) : haut et bas des 5 lignes identiques entre les deux colonnes, dans les deux thèmes.
- Images : `srcset` présent (sources `image/avif` et `image/webp`), `width` et `height` déclarés, ratio affiché 1,50 (1,502 à 1,505, arrondi de pixels), `object-fit: cover`, `loading="lazy"`, `decoding="async"`. `brightness(0.9)` en sombre, `none` en clair.
- **CLS** : 0 pour la section (aucun décalage attribué à ses éléments). Page entière : 0 à 390 px, 0,0004 à 0,0007 à partir de 768 px ; tout vient de la barre de navigation (changement de police à ~277 ms, mesuré avec les sources de `layout-shift`).
- Clavier : aucun élément focusable dans la section (0 lien, 0 bouton) ; ordre de lecture H2, H3 « Sans », image, liste, H3 « Avec », image, liste. Un seul h1 dans la page, un seul h2 dans la section, 2 h3, 2 `ul` de 5 `li`, `aria-labelledby` résolu vers le h2, icônes `aria-hidden`.
- Sans JavaScript : section et Hero entièrement visibles (13 éléments `data-reveal` à opacité 1, sans transformation). Avec `prefers-reduced-motion` : Hero sans animation (`animation-name: none`, opacité 1), section à opacité 1 sans transformation. Avec JavaScript : tous les éléments `data-reveal` à opacité 1 après défilement.
- Hero : chronologie relevée à chaque image : titre à 0 puis 1 en 0,5 s, les trois autres éléments décalés de 0,1 s, tout à 1 environ 0,8 s après le début. Aucun style en ligne résiduel hors `--hero-i`, `transform: none` à la fin.
- Lecteur vidéo (vidéo de test WebM, supprimée) : lecture automatique quand le cadre est visible, pause au clic, reprise au second clic, pause hors écran, reprise au retour, libellé du bouton à jour, bouton 44 × 44 px, pas de lecture automatique avec `prefers-reduced-motion`.
- **Contrastes (rapport:1, clair / sombre)** : texte « Sans Scoly » 6,50 / 8,20 ; texte « Avec Scoly » 15,62 / 13,36 ; sous-titre 6,12 / 9,44 ; badge « Sans » 6,50 / 8,20 ; badge « Avec » **5,83** / 7,28. **Valeurs les plus basses : 5,83 en clair (badge « Avec Scoly »), 7,28 en sombre**, toutes au-dessus de 4,5 (AA). Fonds mesurés sur les pixels rendus.
- Non testé : Safari, Firefox (subgrid supporté depuis longtemps, mais non vérifié ; sans subgrid, les lignes ne seraient plus alignées d'une colonne à l'autre), appareil réel, lecteur d'écran, connexion lente réelle, rendu des images AVIF sur un navigateur ancien (repli JPEG présent, non exercé), impression.

**À faire / à valider ensuite**
- Les quatre points ajoutés à « Points en suspens » (licence, image IA, résolution de la photo « Sans », CLS de la barre).
- Valider le choix du h3-badge et de la présentation empilée sous 1024 px.
- Étape 4 : la section suivante est `#comment-ca-marche`.

---

### [Étape 2 — Hero] · 2026-10-10
**Intervenant** : Claude (conversation « Étape 2 — Hero »)
**Statut** : terminé (vidéo à fournir)

**Fait**
- Hero : h1, sous-titre, boutons « Essayer gratuitement » (`site.links.signup`) et « Voir comment ça marche » (`#comment-ca-marche`), ligne « Plan gratuit… », cadre vidéo. Textes du prompt repris tels quels ; seules typographies appliquées (apostrophe ’, espace insécable avant « : »). Seule mise en valeur : « en quelques clics » (Newsreader italique, couleur `accent`).
- Titre : `type-h1` (36 → 60 px) limité à 9,2 em : 3 lignes au bureau (« Les documents de / votre école, prêts / en quelques clics. »), 3 lignes à 320, 360 et 390 px.
- Décor : deux rubans en SVG inline (fill-opacity 0,075 et 0,055), `aria-hidden`, sans flou ni dégradé, fondu en bas par masque CSS. Couleurs `brand-500/700` en clair, `brand-400/300` en sombre.
- `VideoFrame.astro` : fenêtre de navigateur (trois points, adresse `app.scoly.ink`), contenu 16:9 réservé (`aspect-video`). Sans vidéo : dégradé doux + icône Scoly, étiquette « Vidéo à venir » en développement seulement. Avec vidéo (poster + une source) : `<video>` muet, boucle, `playsinline`, `preload="metadata"`, WebM puis MP4, dimensions 1920×1080 déclarées, bouton lecture / pause 44 px.
- `src/scripts/video-frame.ts` : lecture quand le cadre est visible (seuil 35 %), pause en sortie, pas de lecture auto avec `prefers-reduced-motion` ni `saveData` (poster + bouton), libellé du bouton « Lire la vidéo » / « Mettre la vidéo en pause », un choix explicite de la personne prime.
- `src/scripts/hero.ts` : cascade GSAP titre, sous-titre, boutons, cadre (fondu + 18 px, échelle 0,985 → 1 pour le cadre), 0,5 s + 3 × 0,1 s ≈ 0,8 s. Aucune animation avec `prefers-reduced-motion`.
- `heroVideo` dans `site.ts` (webm, mp4, poster à null, label par défaut).

**Fichiers créés**
- `src/components/ui/VideoFrame.astro` — cadre vidéo réutilisable
- `src/scripts/hero.ts` — animation d'entrée
- `src/scripts/video-frame.ts` — comportement du lecteur
- `public/icon-scoly-192.webp` — icône 192 px (10 Ko) pour le placeholder

**Fichiers modifiés**
- `src/components/sections/Hero.astro` — la section
- `src/config/site.ts` — objet `heroVideo`
- `README.md` — composant `VideoFrame`, branchement de la vidéo
- `docs/JOURNAL.md` — cette entrée

**Décisions prises**
- Icône du placeholder en **WebP 192 px** dérivé de `icon-scoly.png` (163 Ko, trop lourd pour un cadre vide).
- **Placeholder `aria-hidden`** et `aria-label` du cadre seulement quand une vidéo existe : annoncer « Aperçu de l’application Scoly » devant un cadre vide serait faux. Avec vidéo, `aria-label` = `heroVideo.label`.
- Italique de Newsreader importé dans `Hero.astro` (pas dans `global.css`, design system intact). Sans cela l'italique aurait été synthétisé.
- État initial masqué par `.js [data-hero]:not([data-hero-ready]) [data-hero-item]` avec un **filet de sécurité CSS à 1,2 s** : si le script échoue ou tarde, le contenu apparaît. Sans JavaScript, tout est visible. En fin d'animation les styles en ligne sont retirés (`clearProps`).
- Bouton lecture / pause masqué sans JavaScript (il ne ferait rien) ; sans JS, avec vidéo, on voit le poster.
- Icônes lecture / pause en SVG dans `VideoFrame` plutôt que dans `icons.ts` (design system non modifié).
- `Section` reçoit `pt-10! sm:pt-14! lg:pt-16!` : le haut de page est plus serré que le défaut des autres sections (la navbar est dans le flux).
- Largeur effective du cadre au bureau : 1 088 px (limite du `Container`), proche des ~1 100 px demandés.

**Écarts par rapport au brief ou au prompt**
- Aucun changement de texte. `aria-label` du cadre absent en l'absence de vidéo (voir ci-dessus).
- Poids : une icône WebP ajoutée, non listée dans le prompt.

**Vérifications effectuées**
- check : 0 erreur, 0 avertissement. build : OK.
- Production : « Vidéo à venir » absent de `dist/index.html` (présent en `astro dev`) ; un seul h1, texte exact « Les documents de votre école, prêts en quelques clics. » ; aucun `<video>` sans config.
- Chromium, 390 · 768 · 1024 · 1440 px (+ 320 et 360 pour le titre), thèmes clair et sombre : aucun défilement horizontal, titre sans coupure maladroite, boutons 56 px (empilés et pleine largeur sur mobile), décor discret. Captures regardées pour 390, 768, 1024 et 1440.
- CLS = 0 (observateur `layout-shift`) à 390 et 1440 px, avec et sans vidéo. Cadre à 350 × 238 px (390) et 1088 × 657 px (1440) dès le premier rendu.
- Sans JavaScript : titre, sous-titre et boutons visibles ; bouton de lecture absent.
- `prefers-reduced-motion` : opacité 1, aucune transformation, pas d'animation.
- Cascade relevée : 4 éléments visibles entre 0,3 et 0,8 s ; état final propre (pas de style en ligne, `data-hero-ready` posé).
- Vidéo de test (WebM 4 s générée avec ffmpeg, supprimée ensuite, `site.ts` remis à null) : lecture automatique seulement visible ; pause au clic, reprise au second clic ; pause à la sortie de l'écran, reprise au retour ; libellé du bouton qui suit l'état ; bouton 44 × 44 px ; clavier (Espace) OK. Avec `prefers-reduced-motion` et avec `saveData` simulé : poster sans lecture, lecture au clic seulement, pause à la sortie sans reprise automatique.
- Clavier : ordre navbar, « Essayer gratuitement », « Voir comment ça marche », bouton de pause ; anneau de focus 2 px.
- Ancre « Voir comment ça marche » : section à 96 px du haut, dans les deux thèmes.
- Contrastes (rapport:1, clair / sombre) : titre 16,03 / 15,65 ; « en quelques clics » 5,64 / 8,15 ; ligne « Plan gratuit » 6,12 / 9,44 ; bouton principal 11,50 / 7,91 ; bouton secondaire 17,03 / 13,60. Le sous-titre utilise `muted` sur `canvas` : mêmes valeurs que la ligne « Plan gratuit » (mesure directe non relevée, sélecteur erroné dans le script).
- Poids du JS de la page d'accueil : 146 047 → **146 688 octets** (+641, +0,4 %) : fichiers externes 144 368 (Base 74 334 + GSAP 69 582 + Hero 452), en ligne 2 320 (navbar 1 626 + lecteur vidéo 694).
- Non testé : Safari, Firefox, appareil réel, lecteur d'écran, MP4 (le Chromium de test ne lit que WebM ; le `<source>` MP4 est écrit mais non exercé), vraie vidéo (poids, fluidité), connexion lente réelle.

**À faire / à valider ensuite**
- Fournir la vidéo (voir « Points en suspens »).
- Valider le décor, le titre sur 3 lignes et le choix du filet de sécurité d'animation.
- Étape 3 : le Hero se termine par le cadre vidéo ; la section suivante est `#pourquoi`.

---

### [Étape 1 (reprise) — Navbar aérée] · 2026-10-10
**Intervenant** : Claude (conversation « Étape 1 — Navigation », reprise)
**Statut** : terminé

**Fait**
- Menu ramené à 4 éléments dans `site.ts` : Documents · Fonctionnalités · Tarifs · Vérifier un document. Sécurité et FAQ retirées du menu uniquement ; les sections `#securite` et `#faq` restent. Barre, panneau mobile et scrollspy suivent sans autre modification de logique.
- Barre aérée : liens à 15 px (au lieu de 14) avec 16 px de marge latérale (au lieu de 8 à 10), soit 36 px entre deux textes (16 à 20 avant) ; espace de 24 px entre les trois zones (8 avant) ; actions un peu plus rapprochées entre elles.
- « Se connecter » : poids 500 comme les liens, couleur `ink` (les liens sont en `muted`), marge latérale 12 px. « Essayer gratuitement » reste le seul élément en `primary` (marge latérale 16 px).
- Logo : 36 px de haut au bureau (40 px avant), 40 px de 640 à 1099 px, 36 px sous 640 px. Correction au passage : la classe `sm:h-10` l'emportait sur celle du bureau et le logo restait à 40 px depuis l'étape 1 ; les hauteurs sont maintenant en plages exclusives.
- BRIEF §6 : liste de la navbar et ligne « Footer » mises à jour.

**Fichiers modifiés**
- `src/config/site.ts` — `navigation` à 4 éléments, commentaire sur Sécurité et FAQ
- `src/components/layout/Navbar.astro` — espacements, poids de « Se connecter », logo, gap entre zones
- `docs/BRIEF.md` — §6 (navbar, footer)
- `docs/JOURNAL.md` — cette entrée, décisions, points en suspens
- `src/scripts/navbar.ts` : inchangé (le seuil reste 1100 px)

**Décisions prises**
- **Navbar à 4 liens, Sécurité et FAQ retirées du menu pour l'aération.** Les deux liens iront dans le footer (étape 10).
- **Seuil du burger conservé à 1100 px.** Essai à 1024 px avec la barre aérée : les zones se chevauchent (−22 px entre le logo et les liens au repos, −30 px une fois la pilule resserrée ; mesuré). Les 4 liens aérés (~540 px) + les actions (~360 px) + le logo (~92 px) + 2 × 24 px d'écart demandent environ 1 070 px de large utile, contre 966 px à 1024 px. Pour tenir à 1024 px il aurait fallu reserrer les liens, c'est-à-dire défaire l'aération demandée. À 1100 px, au pire 21 px entre les zones (pilule resserrée), 29 px au repos ; dès 1216 px, 35 à 43 px.
- **Liens centrés dans l'espace restant et non au centre exact de la barre.** Un vrai centrage (grille 1fr / auto / 1fr) exigerait ~370 px de chaque côté (largeur des actions), soit plus que la largeur utile de 1 086 px. Les liens sont donc centrés entre le logo et les actions ; leur centre est décalé d'environ 135 px vers la gauche du centre de la barre. À valider visuellement.
- Marges latérales de la barre réduites à 20 px entre 1100 et 1215 px : conservé de l'étape 1, nécessaire à 1100 px.

**Écarts par rapport au brief ou au prompt**
- Brief §6 : liste de la navbar modifiée sur demande (4 liens).
- `prompts/01-navigation.md` n'existe pas dans le projet (seul `prompts/00-fondations.md`, qui ne cite pas ces liens) : rien à corriger.

**Vérifications effectuées**
- check : 0 erreur, 0 avertissement. build : OK (2 pages).
- Chromium, thèmes clair et sombre, largeurs 390 · 768 · 1023 · 1024 · 1099 · 1100 · 1280 · 1440 px, au repos et après scroll : aucun défilement horizontal, aucun élément de la barre hors de la pilule, hauteur du `<header>` inchangée entre les deux états. Burger jusqu'à 1099 px, barre complète dès 1100 px.
- Menu de la barre et du panneau : 4 liens seulement ; panneau à 1023 px : 4 liens de 48 px, puis Se connecter et Essayer gratuitement (44 px). Échap : focus sur le burger ; passage à 1100 px : panneau fermé.
- Scrollspy, section par section : documents, fonctionnalités et tarifs allument leur lien et lui seul ; pourquoi, comment-ca-marche, securite, faq et contact n'allument rien ; haut de page : rien. Clic sur chacun des 3 liens : section à 96 px du haut, lien actif correct.
- Clavier (1280 px) : lien d'évitement, logo, Documents, Fonctionnalités, Tarifs, Vérifier un document, Se connecter, Essayer gratuitement, thème ; anneau de focus 2 px partout.
- « Se connecter » : poids 500 (liens : 500), couleur `#181c26` (liens : `#565e70`).
- Production : `dist/index.html` sans repère de développement (aucun « venir »). JS de la page : 146047 octets (144421 externe + 1626 en ligne), contre 146 047 à l'étape 1.
- Non testé : Safari, Firefox, appareil réel, lecteur d'écran.

**À faire / à valider ensuite**
- Valider le centrage des liens (voir décisions) et l'abandon du seuil à 1024 px.
- Étape 10 : liens Sécurité et FAQ dans le footer.

---

### [Étape 1 — Navigation] · 2026-10-10
**Intervenant** : Claude (conversation « Étape 1 — Navigation »)
**Statut** : terminé

**Fait**
- BRIEF §7 mis à jour : texte courant en Inter (titres Newsreader 500), bouton principal `#1e3a5f` (marine du logo `#081a4a` réservé au logo et aux textes de contraste), thème sombre en bleu clair à texte foncé.
- Barre flottante en pilule : sticky, logo à gauche (retour `#top`), 5 liens d'ancre + « Vérifier un document » (externe, icône, texte caché pour lecteurs d'écran, `rel="noopener noreferrer"`), « Se connecter » (ghost), « Essayer gratuitement » (principal), bouton de thème. Libellés, ordre, URLs et ids : tout vient de `site.ts`.
- Au repos : pas de fond ni de bordure (bordure transparente réservée). Après 40 px : fond surface à 82 % avec flou, bordure, ombre douce, hauteur 64 → 56 px. Le conteneur garde 64 px de haut : aucun saut. Sans transition si `prefers-reduced-motion`.
- Scrollspy (`IntersectionObserver`, bande à 35 % de la hauteur de l'écran) : `aria-current="location"` sur le lien de la section en cours, dans la barre et dans le panneau. Aucun lien actif en haut de page ni sur une section sans lien (pourquoi, comment-ca-marche, contact). « Vérifier un document » n'est jamais actif. Actif = pastille `primary` / `on-primary` (marine en clair, bleu clair à texte foncé en sombre).
- Menu mobile et tablette (< 1100 px) : burger / croix, `aria-expanded`, `aria-controls`, libellé « Ouvrir / Fermer le menu ». Panneau en carte sous la pilule, liens de 48 px de haut, puis « Se connecter » et « Essayer gratuitement ». Fermeture : clic sur un lien, Échap (focus sur le burger), clic en dehors, passage à 1100 px, et sortie du focus clavier de la barre. Pas de verrouillage du scroll.
- Bouton de thème : icône lune (thème clair) / soleil (thème sombre), `aria-label` « Passer au thème sombre » / « Passer au thème clair », mis à jour à chaque bascule.
- Repères de développement des sections : hauteur minimale 70 vh (développement seulement).

**Fichiers créés**
- `src/scripts/navbar.ts` — état au scroll, scrollspy, menu mobile (~1,6 Ko minifié, inclus en ligne dans le HTML par Astro)

**Fichiers modifiés**
- `docs/BRIEF.md` — §7 : police et bouton principal
- `src/components/layout/Navbar.astro` — la barre (remplace le repère)
- `src/scripts/theme.ts` — +6 lignes : un bouton avec `data-label-to-dark` / `data-label-to-light` reçoit un `aria-label` à jour (voir décisions)
- `src/scripts/motion.ts` — offset des ancres −88 → 0 (voir décisions)
- `src/components/ui/DevPlaceholder.astro` — `min-h-[70vh]`, visible en développement seulement (ajustement dans `ui/`, justifié par le prompt)
- `README.md` — structure, conventions de la navbar et du bouton de thème
- `docs/JOURNAL.md` — cette entrée

**Décisions prises**
- **Ancres** : avec l'offset de −88 px, les sections s'arrêtaient à 184 px du haut (mesuré), soit 112 px sous la pilule : Lenis retranche déjà le `scroll-mt-24` de la cible, donc le décalage était compté deux fois. Offset ramené à 0 : la section s'arrête à 96 px, 24 px sous la pilule (bas à 72 px). C'est aussi la valeur du défilement natif (mouvement réduit). Changement le plus petit possible, dans `motion.ts` comme le prompt l'autorisait.
- **Tenir à 1100 px** : la largeur naturelle des éléments (plus de 1 100 px) dépassait la largeur utile (1 034 px) ; le logo chevauchait « Documents » et « Vérifier un document » chevauchait « Se connecter ». Solution : liens à 14 px avec 8 px de marge latérale, « Se connecter » (px 12) et « Essayer gratuitement » (px 16) plus compacts, et, entre 1100 et 1215 px seulement, marges latérales de la barre ramenées de 32 à 20 px. Marge libre mesurée : 11 px de chaque côté à 1100 px (pilule resserrée), 25 px à 1216 px et au-delà. « Vérifier un document » reste au centre. Les agrandissements essayés pour ≥ 1280 px faisaient déborder : la même taille compacte vaut donc pour tout le bureau.
- **Barre sticky dans le flux** et non en position fixe : pas de compensation à prévoir dans le Hero, et pas de saut au changement d'état.
- **Script dédié plutôt que Preline Collapse** : fermeture au clic extérieur, à Échap avec retour du focus, au passage au bureau et à la sortie du focus ; plus simple et plus fiable avec le plugin inactif. Aucune dépendance ajoutée.
- **Panneau en `hidden` + CSS `.js`** : le panneau est fermé avant le premier rendu (pas de flash) et le burger n'existe qu'avec JavaScript.
- **`theme.ts` modifié** (non demandé explicitement) : le prompt exige un `aria-label` qui change avec le thème. `theme.ts` écrivait `aria-pressed` sur tous les boutons ; un bouton dont le libellé change d'action ne doit pas aussi porter un état coché. Modification minimale, sans effet sur les boutons sans les nouveaux attributs.
- Les marges latérales de la barre sont écrites dans `Navbar.astro` (même valeurs que `Container`) et non via `Container`, pour pouvoir les réduire entre 1100 et 1215 px.

**Écarts par rapport au brief ou au prompt**
- Brief §7 : corrigé comme demandé (Inter, bouton `#1e3a5f`).
- `theme.ts` modifié et `DevPlaceholder.astro` (dans `ui/`) ajusté : voir ci-dessus. `index.astro` n'est pas modifié.
- « Essayer gratuitement » est dans la barre ET dans le panneau entre 640 et 1099 px (le prompt décrit les deux) : à valider.

**Vérifications effectuées**
- check : 0 erreur, 0 avertissement. build : OK (2 pages).
- Production : `dist/index.html` ne contient aucun « venir » ni repère de développement.
- Chromium, thèmes clair et sombre, largeurs 390 · 640 · 768 · 1024 · 1099 · 1100 · 1280 · 1440 : `scrollWidth` = `clientWidth`, aucun élément de la barre ne dépasse. Chevauchements vérifiés en plus à 1150, 1215 et 1216 px.
- Au scroll : `data-scrolled` posé à > 40 px, hauteur de la pilule 64 → 56 px, hauteur du `<header>` inchangée (76 px ; 72 px sous 640 px).
- Scrollspy : chaque lien active uniquement sa section ; aucun actif en haut de page et sur `contact` ; retour en haut par le logo : `scrollY` = 0, aucun actif. `aria-current="location"` sur tous les actifs.
- Ancres : section à 96 px du haut après chaque clic, barre à 72 px (bureau, 1280 px) ; même valeur en mouvement réduit (défilement natif).
- Menu mobile : ouverture, fermeture par lien, Échap (focus sur le burger, anneau 2 px), clic en dehors, Tab hors de la barre, passage de 390 à 1200 px ; il reste fermé au retour sous 1100 px. Zones tactiles : liens 48 px, boutons 44 px.
- Clavier au bureau : ordre lien d'évitement, logo, 6 liens, Se connecter, Essayer gratuitement, thème ; anneau de focus 2 px partout.
- Bascule de thème : `aria-label` passe de « Passer au thème sombre » à « Passer au thème clair », pas d'`aria-pressed`, icône lune / soleil.
- URLs relevées dans le DOM : Se connecter → `https://app.scoly.ink/`, Essayer gratuitement → `https://app.scoly.ink/creer-un-compte`, Vérifier un document → `https://app.scoly.ink/verifier` (nouvel onglet, `rel="noopener noreferrer"`).
- Sans JavaScript (bureau 1280 px) : tous les liens visibles et utilisables, burger masqué.
- `prefers-reduced-motion` : `transition-duration` = 0 s sur la barre, état posé quand même.
- Poids du JS de la page d'accueil : 144 312 → **146 047 octets** (+1 735, soit +1,2 %) : fichier externe 144 421 (+109, dû à `theme.ts`) + script de la barre en ligne 1 626. Compressé : ~51,6 Ko externe + ~0,8 Ko en ligne.
- Contrastes : mêmes tokens que l'étape 0 (muted / surface 6,50 et 8,20 ; muted / tile 5,27 et 6,84 ; on-primary / primary 11,50 et 7,91, soit AA). Couleurs de l'état actif et du survol relevées dans le rendu sombre (actif : texte `#10192a` sur `#a6c1ea`). Contraste du texte sur la pilule translucide non mesuré sur une page réelle (le fond de page est encore vide).
- Non testé : survol sur écran tactile, Safari et Firefox, appareil mobile réel, lecteur d'écran, `color-mix()` et `backdrop-filter` hors Chromium, comportement avec les vraies sections (le contenu des étapes 2 à 10 n'existe pas encore).

**À faire / à valider ensuite**
- Valider les trois points ajoutés à « Points en suspens » (bureau compact, CTA dans la barre et le panneau, retrait de Preline Collapse).
- Étape 2 (Hero) : la barre est dans le flux, aucun `padding-top` n'est à prévoir pour elle. Le logo mène à `#top` (id du Hero).
- Chaque nouvelle section doit rester dans `Section` (`scroll-mt-24`) pour que les ancres tombent sous la barre.

---

### [Étape 0 — Fondations] · 2026-10-10
**Intervenant** : Claude (conversation « Étape 0 — Fondations »)
**Statut** : terminé

**Fait**
- Tokens alignés sur l'application après échantillonnage des pixels des captures : fond de page, cartes, bordures, pastille d'icône, badge, bouton principal, thème sombre. Couleurs de marque `brand-*` conservées.
- Polices comparées sur un rendu côte à côte : le texte de l'application est en Inter, pas en Geist (largeur des lettres et coupes de `t`, `a`, `e` différentes, retours à la ligne différents). Les titres sont bien en Newsreader, poids 500 (identique à la variante à axe optique 16). `@fontsource-variable/geist` remplacé par `@fontsource-variable/inter` (même éditeur, même poids de fichier, retiré de package.json).
- Échelle typographique fluide (`clamp`) en 7 classes : `type-h1` 36→60 px, `type-h2` 30→44, `type-h3` 20→24, `type-lead` 17→20, `type-body` 16, `type-small` 15, `type-label` 13.
- Thème sombre propre (pas une inversion) : fond `#171b24`, cartes `#212733` d'un cran plus claires, bordures `#343c4b`, bouton principal bleu clair à texte foncé (comme l'application), ombres plus denses avec un liseré clair intérieur.
- Composants de base, `site.ts`, `theme.ts`, lien d'évitement, `noindex`, slot `head`, focus visible (anneau 2 px, couleur `focus`).
- Squelette : 9 sections, Navbar et Footer, `index.astro` dans l'ordre du brief. Repères visibles en dev seulement.
- Page `/styleguide` (palette clair et sombre côte à côte, rapports de contraste mesurés sur le rendu, échelle, boutons, badges, cartes, icônes, en-têtes).

**Fichiers créés**
- `src/config/site.ts` — liens, contacts (null), navigation, ids d'ancre, `buildWhatsAppLink`
- `src/scripts/theme.ts` — bascule de thème (`[data-theme-toggle]`, mémorisation, `aria-pressed`, suit le système sans choix mémorisé, synchronise les onglets)
- `src/components/ui/` : `Container`, `Section`, `SectionHeading`, `Button`, `Badge`, `Card`, `Icon`, `icons.ts`, `Logo`, `DevPlaceholder`
- `src/components/sections/` : `Hero`, `Problems`, `HowItWorks`, `Documents`, `Features`, `Security`, `Pricing`, `Faq`, `FinalCta`
- `src/components/layout/` : `Navbar`, `Footer`
- `src/pages/styleguide.astro` — page de travail, à retirer à l'étape 11

**Fichiers modifiés**
- `src/styles/global.css` — tokens, thème sombre, classes `.light` (sous-arbre clair), échelle typographique, focus, `text-wrap`
- `src/layouts/Base.astro` — lien d'évitement, prop `noindex`, slot `head`, import de `theme.ts`, `theme-color` mis à jour par le script, titre et description par défaut remplacés (voir écarts)
- `src/pages/index.astro` — remplacée par l'assemblage des sections
- `astro.config.mjs` — filtre du sitemap (autorisé par le prompt)
- `public/robots.txt` — `Disallow: /styleguide`
- `package.json`, `package-lock.json` — Inter à la place de Geist
- `README.md` — section « Composants », convention des sections, structure et conventions mises à jour

**Décisions prises**
- Bouton principal `#1e3a5f` (valeur de l'application) plutôt que `#081a4a` : le brief autorise « brand-950 ou proche ». Le marine du logo reste `brand-950`.
- Rayons : cartes 24 px, boutons et champs 16 px, pastilles et navbar en pilule (mesurés sur les captures).
- `Section` inclut un `Container` par défaut (`container={false}` pour une section pleine largeur) et un `scroll-mt-24` (96 px), cohérent avec le décalage de 88 px de `motion.ts`.
- `.light` ajouté à côté de `.dark` pour pouvoir afficher les deux thèmes ensemble dans le styleguide.
- Lien d'évitement sans `href="#…"` (voir « Décisions en vigueur »), faute de pouvoir modifier `motion.ts`.
- `icons.ts` séparé de `Icon.astro` : Astro n'exporte pas de valeurs depuis un composant.

**Écarts par rapport au brief ou au prompt**
- Brief §7 : Geist remplacé par Inter, justifié ci-dessus (le prompt demandait de le proposer si l'écart était visible).
- Titre et description par défaut de `Base.astro` : l'ancien texte était un texte marketing non validé. Remplacé par la promesse du brief ; à finaliser à l'étape 11.
- `DevPlaceholder` ajouté dans `ui/` (non listé dans le prompt) pour ne pas répéter le repère dans les 11 fichiers.
- Aucun changement à `motion.ts` ni à la configuration de déploiement.

**Vérifications effectuées**
- check : 0 erreur, 0 avertissement. build : OK (2 pages).
- thèmes clair et sombre : OK sur `/styleguide`, Chromium.
- mobile 390 · tablette 768 · bureau 1280 : OK, `scrollWidth` = `clientWidth` aux trois largeurs dans les deux thèmes.
- Contrastes AA, mesurés sur le rendu (rapport:1) :

| Paire | Clair | Sombre |
|---|---|---|
| ink / canvas | 16,03 | 15,65 |
| ink / surface | 17,03 | 13,60 |
| muted / canvas | 6,12 | 9,44 |
| muted / surface | 6,50 | 8,20 |
| muted / tile | 5,27 | 6,84 |
| bouton principal (on-primary / primary) | 11,50 | 7,91 |
| bouton principal au survol | 13,92 | 9,57 |
| accent / surface | 5,99 | 7,08 |
| badge-ink / badge | 5,83 | 7,28 |
| focus / canvas (seuil 3:1) | 4,83 | 7,76 |
| focus / surface (seuil 3:1) | 5,13 | 6,74 |

- Bascule de thème : clic, `aria-pressed` mis à jour, choix mémorisé, thème sombre déjà appliqué au premier rendu après rechargement (relevé via l'API Paint Timing), pas de flash.
- Clavier : lien d'évitement en premier à Tab, il déplace bien le focus sur `main` ; tous les boutons et liens du styleguide reçoivent un anneau de focus de 2 px ; hauteur minimale mesurée 44 px (56 px en grand). Lien externe : `rel="noopener noreferrer"`.
- JS de la page d'accueil : 144 312 octets (51 870 octets compressés), contre ~143 Ko à l'initialisation : pas de croissance notable.
- Build de production : aucun repère « à venir » dans `index.html` ; `/styleguide` en `noindex`, absent du sitemap.
- Non testé : survol réel, Safari et Firefox, appareil mobile réel, lecteur d'écran.

**À faire / à valider ensuite**
- Étape 1 : la navbar utilisera `navigation` et `[data-theme-toggle]` ; décaler `data-theme-toggle` sur le bouton visible.
- Étape 11 : retirer le styleguide (voir « Points en suspens »).

---

### [Initialisation du projet] · 2026-10-10
**Intervenant** : Claude (conversation de cadrage)
**Statut** : terminé

**Fait**
- Projet Astro créé avec Tailwind v4, Preline, GSAP, Lenis, polices Geist et Newsreader auto-hébergées.
- Thème clair / sombre fonctionnel, avec script anti-flash dans le `<head>`.
- Scroll fluide Lenis piloté par GSAP, animations d'apparition via `data-reveal`, désactivées si `prefers-reduced-motion`.
- Tokens de couleur extraits du logo.
- Logos préparés : version claire et version pour thème sombre, icône, favicon.
- Configuration Cloudflare (`wrangler.jsonc`), `_headers`, `robots.txt`, sitemap.
- Page `index.astro` provisoire pour valider la stack (menu mobile, accordéon, thème, animations).

**Fichiers créés**
- `astro.config.mjs`, `wrangler.jsonc`, `tsconfig.json`, `package.json`
- `src/layouts/Base.astro` — `<head>`, SEO de base, thème, chargement Preline + motion
- `src/styles/global.css` — Tailwind, Preline, tokens, thème sombre
- `src/scripts/motion.ts` — Lenis + GSAP + reveals
- `src/pages/index.astro` — page provisoire (à remplacer à l'étape 0)
- `public/` — logos (`logo-scoly*.png`, `logo-scoly-dark*.png`), icônes, `_headers`, `robots.txt`

**Décisions prises**
- Preline : import des plugins `collapse` et `accordion` seulement (bundle complet ~500 Ko). Un petit plugin Vite (`prelineSideEffects`) est nécessaire pour qu'ils ne soient pas supprimés au build.
- Typescript 6 (et non 7) à cause d'une incompatibilité avec `@astrojs/check`.
- Gestionnaire de paquets : npm.

**Écarts par rapport au brief ou au prompt**
- Aucun.

**Vérifications effectuées**
- check / build : OK
- thèmes clair et sombre : OK
- mobile 390 : menu burger OK ; tablette et bureau : OK
- accordéon Preline : OK

**À faire / à valider ensuite**
- Étape 0 : design system aligné sur l'application, composants de base, `src/config/site.ts`, squelette de page.
