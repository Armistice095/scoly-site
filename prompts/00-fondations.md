# Étape 0 — Fondations

## À joindre à la conversation

1. **Le projet** : archive `.zip` du dossier `scoly-site` (sans `node_modules`, `dist` ni `.astro`). Elle contient `docs/BRIEF.md`, `docs/JOURNAL.md` et `prompts/`.
2. **Captures d'écran de l'application** (l'identité visuelle du site doit en découler) :
   - la capture « Paramètres → Utilisateurs et compte » déjà disponible ;
   - idéalement 2 ou 3 autres écrans : liste des Élèves, page Documents, Archives. Utiliser des données fictives.
3. **Logo** : le PNG d'origine (facultatif, les versions web sont déjà dans `public/`).

## Avant de lancer

Rien à préparer d'autre. Cette étape ne contient aucun texte marketing : elle pose uniquement la base technique et visuelle.

---

## Prompt à copier-coller

Tu es directeur artistique digital senior, expert UI/UX, product designer SaaS et développeur front-end Astro / Tailwind, avec une très bonne maîtrise de l'accessibilité et du SEO.

Tu travailles dans le projet joint : le site vitrine de **Scoly** (https://scoly.ink).

### Première chose à faire
Lis en entier `docs/BRIEF.md`, puis `docs/JOURNAL.md`, puis `README.md`. Ils définissent le produit, le ton, le design, la stack et les règles de collaboration. Tu les respectes tout au long du travail.

### Objectif de cette étape
Poser les **fondations** sur lesquelles les 11 étapes suivantes vont construire : design system aligné sur l'application, composants de base, configuration centralisée, thème clair/sombre complet, squelette de la page. **Aucune section de contenu n'est réalisée ici.**

### Travail demandé

**1. Identité visuelle alignée sur l'application**
- Analyse les captures de l'application jointes : fond de page, cartes, rayons, bordures, ombres, boutons, badges, barre de navigation en pilule, hiérarchie typographique (titres en serif, texte en sans-serif).
- Ajuste les tokens de `src/styles/global.css` pour que le site ait **la même personnalité** : mêmes valeurs approchées pour `canvas`, `surface`, `line`, rayons, ombres. Conserve les couleurs de marque du logo (`brand-*`).
- Compare les polices de l'application à Geist et Newsreader. Si l'écart est visible, propose et applique la correction (par exemple une autre police auto-hébergée via Fontsource). Justifie dans le journal.
- Définis une **échelle typographique** réutilisable (tailles de `h1`, `h2`, `h3`, texte courant, texte secondaire, étiquette) avec des tailles fluides (`clamp`) adaptées au mobile, et des classes utilitaires ou des composants pour les appliquer.
- Définis le thème **sombre** complet : il doit être élégant, pas une simple inversion. Vérifie le **contraste AA** (4,5:1 pour le texte courant) pour `ink`, `muted` et les boutons sur leurs fonds, dans les deux thèmes. Indique les rapports mesurés dans le journal.

**2. Composants de base** dans `src/components/ui/` (Astro, sans framework JS)
- `Container.astro` : largeur maximale et marges latérales cohérentes.
- `Section.astro` : enveloppe d'une section de page. Props : `id`, `tone` (par défaut / alternée), `class`. Gère l'espacement vertical responsive, le `scroll-margin-top` (la navbar est flottante) et un `aria-labelledby` optionnel.
- `SectionHeading.astro` : étiquette (eyebrow) facultative, titre `h2` en serif, sous-titre, alignement (centré / gauche).
- `Button.astro` : variantes `primary` (bleu marine), `secondary` (contour), `ghost`, tailles `md` et `lg`. Fonctionne comme lien (`href`) ou comme bouton. Prop `external` (ajoute `target="_blank"`, `rel="noopener noreferrer"` et l'icône de lien externe). Zone cliquable d'au moins 44 px de haut.
- `Badge.astro`, `Card.astro`.
- `Icon.astro` : petit jeu d'icônes SVG inline avec un `name` en prop. Inclure : `check`, `arrow-right`, `external`, `sun`, `moon`, `menu`, `close`, `chevron-down`, `shield`, `file`, `upload`, `archive`, `users`, `search`, `clock`, `mail`. N'ajoute pas de dépendance d'icônes.
- `Logo.astro` : affiche la bonne version du logo selon le thème (claire / sombre), avec dimensions déclarées.

**3. Configuration centralisée** : `src/config/site.ts`
- Nom, URL du site, URL de l'application, liens (connexion, création de compte, vérification), contacts (WhatsApp et e-mail à `null` pour l'instant), éléments de navigation (libellé, ancre ou URL, externe ou non).
- Une fonction utilitaire pour construire le lien WhatsApp à partir d'un numéro et d'un message, qui renvoie `null` si le numéro est absent.
- Toutes les valeurs du tableau « Liens et coordonnées » du brief.

**4. Base.astro et thème**
- Ajoute un lien d'évitement « Aller au contenu » (visible au focus).
- Ajoute une prop `noindex` et un slot `head` pour les besoins des pages.
- Crée `src/scripts/theme.ts` : tout élément portant `data-theme-toggle` bascule le thème, mémorise le choix et met à jour `aria-pressed`. Conserve le script anti-flash du `<head>`. Le bouton de thème visible sera créé à l'étape 1, mais la logique doit déjà fonctionner et être testée avec un bouton temporaire sur la page de styleguide.
- Styles de focus visibles (`:focus-visible`) cohérents avec la marque, dans les deux thèmes.

**4 bis. Squelette de page**
- Crée des fichiers **vides mais propres** (une enveloppe `Section` avec son `id` du brief et un repère visible **uniquement en développement**, `import.meta.env.DEV`) dans `src/components/sections/` : `Hero`, `Problems`, `HowItWorks`, `Documents`, `Features`, `Security`, `Pricing`, `Faq`, `FinalCta`. Et dans `src/components/layout/` : `Navbar` et `Footer`.
- Remplace la page provisoire `src/pages/index.astro` : elle importe ces composants **dans l'ordre du brief**. Plus tard, chaque étape remplira son propre fichier sans toucher à `index.astro`.
- Le build de production ne doit afficher aucun repère « à venir ».

**5. Page de styleguide**
- Crée `src/pages/styleguide.astro` : présente la palette (clair et sombre), l'échelle typographique, tous les boutons et leurs états, badges, cartes, icônes, et un bouton temporaire de bascule de thème. Elle sert à valider les composants.
- Elle est en `noindex`, exclue du sitemap (filtre dans `astro.config.mjs`) et ajoutée à `robots.txt` en `Disallow`. Note dans le journal qu'elle devra être retirée avant la mise en ligne (étape 11).

**6. Documentation**
- Complète `README.md` avec une section « Composants » (liste, props principales, exemple d'usage) et la convention des sections.
- Écris l'entrée de journal pour cette étape et mets à jour l'état d'avancement.

### Ce que tu ne fais PAS
- Aucun texte marketing, aucune section réelle, aucune navbar ni hero finis : ce sont les étapes suivantes.
- Pas de React ni d'autre framework JS. Pas de nouvelle dépendance, sauf une police si tu le justifies dans le journal.
- Ne modifie pas `src/scripts/motion.ts` ni la configuration de déploiement, sauf le filtre du sitemap.
- N'invente aucune donnée métier (numéro, e-mail, chiffre).

### Critères de validation (à vérifier avant de répondre)
- [ ] `npm run check` : 0 erreur. `npm run build` : réussi.
- [ ] La page `/styleguide` s'affiche correctement en **thème clair et sombre**, à 390, 768 et 1280 px, sans défilement horizontal.
- [ ] Contrastes AA mesurés et consignés.
- [ ] Le basculement de thème fonctionne, est mémorisé et ne provoque aucun flash au rechargement.
- [ ] Tous les boutons sont utilisables au clavier, avec un focus visible.
- [ ] `index.astro` importe les 11 emplacements dans le bon ordre. Les repères n'apparaissent pas en production.
- [ ] Le JS de la page d'accueil n'a pas grossi de façon notable par rapport à l'initialisation (~143 Ko).
- [ ] `docs/JOURNAL.md` est à jour (entrée + état d'avancement + décisions + points en suspens).

### Format de ta réponse finale
En français : un résumé court de ce qui a été fait, les décisions de design prises (avec leur raison), les points à valider par moi, et la liste des fichiers créés ou modifiés. Livre ensuite le projet mis à jour.
