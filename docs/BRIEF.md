# BRIEF — Site vitrine Scoly (scoly.ink)

> Document de référence du projet. À lire en entier avant toute intervention, avec `docs/JOURNAL.md`.
> Si une consigne de prompt contredit ce brief, signale-le dans le journal et suis le prompt de l'étape en cours.

---

## 1. Le produit

**Scoly** est une plateforme SaaS qui simplifie la paperasserie administrative des établissements scolaires : elle centralise les informations des élèves, génère les documents administratifs et les archive.

- Marché actuel : établissements scolaires du **Bénin** (écoles primaires, collèges, lycées).
- Application : https://app.scoly.ink
- Promesse centrale : **« Scoly simplifie la paperasserie scolaire en automatisant la création et l'organisation des documents administratifs. »**
- Scoly n'est **pas** un logiciel qui gère tout l'établissement. Il ne faut jamais le présenter comme tel (pas de notes, bulletins, emplois du temps, paiement des scolarités, etc.).

### Ce que l'application fait aujourd'hui

Navigation de l'application : **Élèves · Documents · Archives · Paramètres**.

- **Élèves** : liste, recherche par nom ou matricule, filtre par statut, ajout, import.
- **Documents** : production des documents administratifs.
- **Archives** : retrouver les documents conservés.
- **Paramètres** (onglets) : Établissement · En-tête et signature · Année scolaire · Numérotation et modèles · Utilisateurs et compte.
- **Utilisateurs et rôles** : des rôles locaux existent (Directeur, Censeur, Secrétariat…), avec invitation par e-mail et activation / désactivation.
- **Vérification publique** d'un document : https://app.scoly.ink/verifier

### Fonctionnalités à présenter

1. Génération automatique des documents : certificat de scolarité, attestation d'inscription, fiche élève, attestation de transfert, demande de transfert, et autres documents pris en charge.
2. Personnalisation des documents avec l'identité de l'établissement (logo, en-tête, signature).
3. Archives numériques : conservation, recherche, consultation.
4. Import des données élèves depuis Excel ou CSV.
5. Plusieurs comptes, avec des rôles.
6. Vérification de l'authenticité d'un document (page publique).
7. Historique des actions. *(À confirmer par le fondateur avant de l'afficher comme acquis : le terme exact est « pris en charge par la plateforme ».)*

### Problèmes auxquels Scoly répond

- Temps perdu à rédiger les documents.
- Mêmes informations ressaisies pour un même élève.
- Documents antérieurs difficiles à retrouver.
- Risque d'erreur à chaque recopie.
- Archives dispersées ou sur papier.
- Organisation difficile quand plusieurs personnes travaillent sur les dossiers.

### Quatre idées de positionnement

**Simplicité · Gain de temps · Organisation · Modernisation**

---

## 2. Public cible

Promoteurs et directeurs d'établissement, responsables administratifs, secrétaires et agents chargés des dossiers élèves, personnes chargées de produire et conserver les documents.

**Le site doit convaincre quelqu'un qui n'est pas technicien.** Explications simples, bénéfices compréhensibles immédiatement, aucun jargon (pas de « workflow », « cloud-native », « solution tout-en-un »…).

Contexte d'usage à garder en tête : beaucoup de visiteurs seront **sur téléphone**, parfois avec une connexion lente. Légèreté et lisibilité mobile passent avant les effets.

---

## 3. Ton et règles de rédaction

- **Vouvoiement.** Professionnel, rassurant, clair, concret.
- Phrases courtes. Vocabulaire de tous les jours. Un verbe d'action par bénéfice.
- Montrer **ce que l'école peut faire plus simplement**, pas des promesses vagues.
- **Interdit** : superlatifs et exagérations (« révolutionnaire », « le meilleur », « 100 % sécurisé »), formules creuses (« à l'ère du numérique », « libérez le potentiel de… », « plongez dans… », « découvrez la puissance de… »), listes de trois adjectifs, emojis, tirets cadratins à répétition.
- **Interdit** : inventer des chiffres, des statistiques, des témoignages, des logos d'écoles, des noms de clients, des certifications ou des engagements de sécurité non confirmés.
- Les textes fournis dans les prompts sont **la référence**. Ne les réécris pas « pour faire mieux ». Si un texte te paraît problématique, signale-le dans le journal.
- Le résultat ne doit pas ressembler à un site généré par IA : pas de répétition de structures, pas de décoration gratuite, pas de blocs interchangeables d'un site SaaS à l'autre.
- Tout le contenu est en **français**. Écriture soignée (accents, apostrophes typographiques ’, espaces insécables avant `:` `;` `?` `!` quand c'est pertinent).

---

## 4. Tarifs (version publiable)

Prix en **FCFA**, facturation **annuelle uniquement** (pas de bascule mensuel/annuel).
Argument différenciant à mettre en avant : **le prix ne dépend pas du nombre d'élèves.**
Le paiement par Mobile Money et carte bancaire sera mentionné plus tard, quand il sera en place : **ne pas l'afficher pour l'instant.**

### Découverte (gratuit) — 0 FCFA
*Pour découvrir Scoly sans engagement.*
- Création d'un espace établissement
- Accès aux principaux types de documents standards
- Jusqu'à 10 documents générés par mois
- Un compte administrateur
- Consultation des documents générés

Bouton : **Commencer gratuitement** → création de compte.

### Établissement — 35 000 FCFA / an *(formule recommandée)*
*Soit environ 2 917 FCFA par mois.*
- Tous les types de documents standards
- Génération sans plafond mensuel fixe (usage raisonnable)
- Import de données depuis des fichiers Excel ou CSV
- Personnalisation des documents avec le logo et les informations de l'école
- Gestion des archives et recherche des documents
- Plusieurs comptes pour le personnel administratif
- Assistance technique

Bouton : **Choisir cette formule** → création de compte.

### Établissement Plus — 75 000 FCFA / an
*Soit environ 6 250 FCFA par mois. Pour les écoles qui ont des besoins administratifs plus avancés.*
- Tout ce qui est inclus dans Établissement
- Génération de plusieurs documents en une seule opération
- Personnalisation avancée des modèles de documents
- Historique détaillé des opérations *(à confirmer avant publication)*
- Assistance prioritaire

Bouton : **Choisir cette formule** → création de compte.

### Réseau d'écoles — à partir de 150 000 FCFA / an
*Pour les groupes scolaires qui souhaitent centraliser plusieurs établissements.*
- Gestion de plusieurs établissements depuis un compte central
- Espaces et archives séparés pour chaque école
- Gestion des accès des responsables de chaque établissement
- Paramétrage et modèles partagés lorsque c'est pertinent
- Accompagnement à la mise en place

Bouton : **Nous contacter** → WhatsApp / contact.

**Note à afficher sous la grille :** « * Usage raisonnable : la génération n'est pas plafonnée dans le cadre d'une utilisation normale. »

---

## 5. Liens et coordonnées

| Usage | URL |
|---|---|
| Site vitrine | https://scoly.ink |
| Application (connexion) | https://app.scoly.ink |
| Création de compte | https://app.scoly.ink/creer-un-compte |
| Vérifier un document (public) | https://app.scoly.ink/verifier |
| WhatsApp | **[À FOURNIR]** |
| E-mail de contact | **[À FOURNIR]** |

Toutes ces valeurs vivent dans **un seul fichier** : `src/config/site.ts`. Ne jamais les écrire en dur dans les composants.
Tant qu'une valeur est `[À FOURNIR]`, le composant concerné doit rester propre (bouton masqué ou désactivé, jamais un lien cassé ni un faux numéro).

---

## 6. Structure du site (une seule page)

| # | Section | id d'ancre | Rôle |
|---|---|---|---|
| 1 | Navigation | — | Accès rapide, connexion, essai |
| 2 | Hero | `top` | Promesse, boutons, vidéo de l'application |
| 3 | Avant / Avec Scoly | `pourquoi` | Problèmes et bénéfices |
| 4 | Comment ça marche | `comment-ca-marche` | Parcours en 3 étapes |
| 5 | Documents | `documents` | Les documents générables, avec aperçus |
| 6 | Fonctionnalités | `fonctionnalites` | Capacités principales |
| 7 | Tarifs | `tarifs` | Les 4 formules |
| 8 | FAQ | `faq` | Lever les dernières objections |
| 9 | CTA final | `contact` | Essai gratuit, démo, WhatsApp |
| 10 | Footer | — | Légal, contact, navigation secondaire (dont le lien FAQ `#faq`) |

**Il n'y a pas de section « Ils nous font confiance »** (une seule école pilote pour l'instant). Ne pas en créer, ne pas la remplacer par des chiffres ou des mentions décoratives. Elle sera ajoutée plus tard avec de vrais témoignages.

### Navigation (navbar)

- Gauche : logo (retour en haut).
- Centre : **Documents · Fonctionnalités · Tarifs · Vérifier un document ↗** (ce dernier est un lien externe vers `/verifier`, avec une petite icône). La section FAQ (`#faq`) reste dans la page mais n'a **pas** de lien dans la navbar (barre aérée) : son lien est dans le footer.
- Droite : **Se connecter** (lien discret) · **Essayer gratuitement** (bouton principal) · bascule de thème clair / sombre.
- Barre flottante en forme de pilule, qui se rétrécit légèrement au scroll. Menu burger sur mobile et tablette.

---

## 7. Design

L'identité du site doit être **cohérente avec l'application** (captures fournies dans le projet) :

- Barre de navigation en **pilule**, avec l'élément actif en bleu marine plein.
- **Titres en serif** (élégants, sobres), texte courant en sans-serif.
- Cartes très arrondies, bordure fine claire, fond blanc sur fond gris très pâle.
- Boutons principaux **bleu marine de l'application** `#1e3a5f` (token `primary`), arrondis. Le marine du logo `#081a4a` (`brand-950`) reste réservé au logo et aux textes de contraste. En thème sombre : bouton **bleu clair à texte foncé** (`#8fb0e0` / `#10192a`).
- Badges de statut en bleu très clair.
- Sobre, aéré, beaucoup d'espace. Pas de dégradés criards, pas d'effets « néon ».

Couleurs de marque (extraites du logo) : dégradé `#0088fc → #004aed`, marine `#081a4a`. Les tokens sont dans `src/styles/global.css` (`brand-50…950`, `ink`, `muted`, `line`, `surface`, `canvas`).

**Thème clair et sombre : les deux sont obligatoires, pour chaque section.** Utiliser les tokens sémantiques (`bg-surface`, `text-ink`, `text-muted`, `border-line`, `bg-canvas`) qui changent automatiquement sous `.dark`. Éviter les couleurs en dur. Logo : `Logo.astro` (variante claire pour le thème sombre).

Visuels : **SVG originaux dessinés pour le site** (style plat, personnes d'Afrique de l'Ouest), jamais de photo ni d'image bitmap.

Illustrations : voir `docs/ILLUSTRATIONS.md`.

Aperçus de documents et d'écrans : **HTML/CSS**, avec des **données fictives** (jamais de vrais noms d'élèves ni de vraies adresses e-mail).

Polices : **Inter** (texte courant) et **Newsreader** (titres, poids 500), auto-hébergées, comme dans l'application. Geist a été abandonné à l'étape 0 (écart visible avec les captures ; voir journal).

---

## 8. Stack technique

| Rôle | Outil |
|---|---|
| Framework | **Astro** (site statique, aucune dépendance à React) |
| Style | **Tailwind CSS v4** (tokens dans `src/styles/global.css`, pas de `tailwind.config.js`) |
| Composants UI | **Preline** (plugins ajoutés à la carte) |
| Animation / scroll | **GSAP + ScrollTrigger**, **Lenis** |
| Hébergement | **Cloudflare** (Workers Static Assets, `wrangler.jsonc`) |
| Vidéo du hero | MP4 + WebM (fichiers à fournir) |

Commandes : `npm run dev` · `npm run build` · `npm run check` · `npm run audit` · `npm run preview`.

### Règles techniques

- **Pas de React**, pas de framework JS de plus. JavaScript minimal, en scripts Astro.
- **Preline** : le bundle complet pèse ~500 Ko. Importer **uniquement** les plugins nécessaires dans `Base.astro` et les déclarer dans `prelineSideEffects` (`astro.config.mjs`). Voir `README.md`.
- **Animations** : attribut `data-reveal` (et `data-delay`) géré par `src/scripts/motion.ts`. Pour une animation spécifique à une section, ajouter un script dédié et propre, sans modifier le comportement global. Tout doit respecter `prefers-reduced-motion`.
- **Images** (si une image bitmap devient nécessaire ailleurs que dans les illustrations) : WebP / AVIF, dimensions déclarées (`width`/`height`), `loading="lazy"` sauf au-dessus de la ligne de flottaison.
- **Accessibilité** : HTML sémantique, un seul `h1`, hiérarchie des titres, contraste AA dans les deux thèmes, focus visible, navigation clavier, `aria-*` seulement quand nécessaire, textes alternatifs pertinents.
- **SEO** : balises `title` et `description` pertinentes, une page = un `h1`, liens internes en ancres, données structurées JSON-LD (voir README, « SEO et données structurées »). Mots-clés visés naturellement dans les textes : gestion administrative scolaire, certificat de scolarité en ligne, dématérialisation des documents scolaires, Bénin. Pas de bourrage.
- **Performance** : viser un LCP rapide sur mobile. Pas de bibliothèque supplémentaire sans raison documentée dans le journal.

---

## 9. Organisation du travail

Le site est construit **section par section**, chaque section dans une conversation séparée avec son propre prompt.

### Structure des fichiers

```
docs/BRIEF.md                       ce document
docs/JOURNAL.md                     journal de bord (à tenir à jour)
prompts/NN-nom.md                   les prompts par étape
src/config/site.ts                  URLs, navigation, contacts
src/components/ui/                  composants de base (Button, Badge, Card, …)
src/components/sections/            une section = un fichier (Hero.astro, Documents.astro, …)
src/layouts/Base.astro              <head>, SEO, thème, scripts
src/pages/index.astro               assemble les sections dans l'ordre
src/styles/global.css               tokens, thème, styles globaux
src/scripts/                        motion.ts + scripts de section
```

### Règles de collaboration

1. **Commence par lire** `docs/BRIEF.md` puis `docs/JOURNAL.md` en entier.
2. **Reste dans le périmètre** de l'étape. Ne modifie pas les autres sections, la configuration, ni les dépendances, sauf si le prompt l'autorise. Si une modification en dehors du périmètre est nécessaire, **explique-la** dans le journal.
3. **Ne réinvente pas** les composants existants : réutilise `src/components/ui/`. Si tu dois en créer un nouveau et qu'il est réutilisable, mets-le dans `ui/`.
4. **Avant de terminer** : `npm run check` et `npm run build` sans erreur, test en thème clair **et** sombre, test mobile (390 px), tablette (768 px) et bureau (1280 px).
5. **À la fin, écris dans `docs/JOURNAL.md`** (voir le format dans ce fichier). C'est obligatoire.
6. **Ne devine pas** une information métier (prix, fonctionnalité, chiffre, URL). Si elle manque, mets un emplacement propre et signale-le dans le journal.
7. Réponds en français.
