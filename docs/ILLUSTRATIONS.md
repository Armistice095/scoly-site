# ILLUSTRATIONS — guide du style

Kit d'illustrations vectorielles du site Scoly. Créé à l'étape 3 bis (scènes « Sans Scoly » et « Avec Scoly »).
Les étapes suivantes (Comment ça marche, CTA final…) **doivent s'y référer** pour rester dans le même univers.

Exemple de référence : `src/components/sections/Problems.astro`.

## 1. Principes

- **Illustration plate (flat)** : grands aplats de couleur, formes arrondies, **aucun contour** (seulement des traits très fins pour les lignes de sol, l'horloge, le certificat).
- **Une scène = une idée lisible en une seconde.** Si la scène demande une explication, on la simplifie.
- **Une forme organique douce (blob)** derrière chaque scène, une ligne de sol, quelques touches décoratives discrètes (points, croix).
- **Le contraste entre deux scènes se joue sur l'ordre et la couleur**, pas sur l'expression des visages : désordre et tons désaturés d'un côté, ordre et couleurs de la marque de l'autre. Pas de rouge, pas de vert vif.
- **Aucun texte dans une illustration** (ni mot, ni chiffre) : formes, barres et icônes seulement. Le texte voisin porte le sens.
- **Même univers** : même bureau, même chaise, même personnage assis de profil, mêmes proportions d'une scène à l'autre.
- Un dessin maladroit est pire que pas de dessin : si, après deux itérations, un élément reste raté, on le supprime et on renforce la scène avec des objets.

## 2. Palette et variables `--ill-*`

Toutes les couleurs passent par des variables CSS définies dans `src/styles/global.css` (bloc « Illustrations »), clair par défaut, redéfinies sous `.dark`. **Jamais de couleur en dur dans un SVG.**

| Variable | Classe | Rôle | Clair | Sombre |
|---|---|---|---|---|
| `--ill-blob` | `fb` | blob de la scène « Avec » (brand-100) | `#d9eaff` | `#1d2b47` |
| `--ill-blob-muted` | `fm` | blob de la scène « Sans » (bleu-gris) | `#dfe5ee` | `#262d3b` |
| `--ill-surface` | `fs` / `ss` | feuilles, fenêtres, champs | `#ffffff` | `#2d3649` |
| `--ill-surface-2` | `f2` | panneaux, fonds de fenêtre | `#eef3fa` | `#38425a` |
| `--ill-line` | `fl` / `sl` | traits fins, barres de texte pâles, ligne de sol | `#c3d2e8` | `#4b5873` |
| `--ill-brand` | `fr` / `sr` | formes principales (brand-500) | `#0a84f5` | `#4d9df5` |
| `--ill-brand-dark` | `fd` | barre de fenêtre, cachet (brand-700) | `#1d56d6` | `#3b72d9` |
| `--ill-navy` | `fn` / `sn` | **traits fins et petits détails** (marine brand-950) | `#081a4a` | `#a9bde3` |
| `--ill-dark` | `fp` / `sp` | **grands aplats sombres** : pantalons, chaussures, ordinateur, classeurs | `#081a4a` | `#43527a` |
| `--ill-accent` | `fa` / `sa` | **accent chaud unique** (orange doux) | `#f59a3c` | inchangé |
| `--ill-accent-soft` | `fo` | accent clair (pot de plante, reflet) | `#fbd9ae` | inchangé |
| `--ill-skin-1/2/3` | `k1` `k2` `k3` | peaux, trois teintes brunes | `#8a5a3c` `#6b4128` `#a8714a` | inchangé |
| `--ill-hair` | `fh` | cheveux presque noirs | `#1a1412` | inchangé |
| `--ill-clothes-1/2/3` | `c1` `c2` `c3` | vêtements, meubles : bleu marque, acier, gris-bleu | `#0a64f0` `#3b5384` `#7d8da9` | `#3d86e8` `#5b79b3` `#8497b8` |
| `--ill-leaf` | `fg` | feuillage (vert doux, jamais vif) | `#5aa892` | `#4a9482` |

Règles d'usage :

- **Accent orange : moins de 10 % de la surface**, et un seul élément clé par scène (pile de papiers dans « Sans », coche dans « Avec »).
- **`--ill-navy` ou `--ill-dark` ?** Navy pour les traits fins et petites formes (il devient clair en sombre pour rester visible). `--ill-dark` pour tout grand aplat sombre (il reste sombre en sombre, sinon la scène éblouit : un pantalon ou un ordinateur marine deviendrait bleu clair). Ne jamais mettre un grand aplat en `fn`.
- Thème sombre : fonds et surfaces sombres, **accent et peaux inchangés**, contrastes préservés, rien de blanc éclatant (les feuilles passent en `#2d3649`).
- Les classes (`fb`, `fs`, `sl`, …) sont **partagées** dans `global.css` : on ne répète pas les couleurs dans chaque SVG, c'est ce qui garde chaque scène sous les 7 Ko. Pour un nouveau rôle de couleur, ajouter la variable (clair et sombre) **et** sa classe.
- Classes de trait (`s*`) : elles posent déjà `fill: none`, `stroke-linecap: round` et `stroke-linejoin: round`. Largeur dans l'attribut `stroke-width`.

## 3. Personnages

- **Personnes d'Afrique de l'Ouest** : carnations brunes variées (utiliser les trois teintes, une par personnage), cheveux courts ou naturels (calotte `fh`), tenues sobres de bureau dans les couleurs de la palette (`c1`, `c2`, `c3`, pantalon `fp`).
- **Construction géométrique** : corps en formes arrondies (chemise = un seul tracé, bras = traits épais à bouts ronds, mains = cercles), tête = cercle de 21 à 22 px de rayon, cou = rectangle arrondi. Visage : une oreille, un petit nez, un point pour l'œil, rien d'autre. Pas de bouche, pas de sourcils.
- **Proportions de référence** (viewBox 640 × 480, sol à y = 420) : assis de profil, assise à y = 343, tête centrée vers y = 220 à 230 ; debout, tête vers y = 256, pieds à y = 410. Même chaise (dossier, assise, pied, base à roulettes) et même bureau (plateau en perspective, chants à y = 306) dans toutes les scènes.
- Un personnage assis regarde vers la droite (vers le bureau et l'écran). Un second personnage peut être debout, de face, bras le long du corps.
- Si un personnage devient maladroit après deux itérations : le retirer et le remplacer par des objets.

## 4. Ce qu'il ne faut pas faire

- Pas de photo ni d'image bitmap, pas d'illustration de banque d'images, pas de tracé ou de copie d'une illustration existante.
- Pas de texte, de chiffre, de logo d'école ni de nom dans les SVG.
- Pas de couleur en dur, pas de dégradé multiple, pas de filtre (`filter`, flou, ombre portée) : un dégradé simple au plus, si utile.
- Pas de rouge (même pour le « désordre »), pas de vert vif.
- Pas de visage détaillé, pas d'expression exagérée, pas de personnage tristement caricatural : ambiance chargée, pas triste.
- Pas de `<defs>` inutile, pas de métadonnées d'éditeur (Illustrator, Figma, Inkscape), pas de `id` superflu.
- Pas d'animation en JavaScript, pas d'animation sans garde `prefers-reduced-motion`.

## 5. Structure des composants

- Un composant par scène dans `src/components/illustrations/` : `SansScoly.astro`, `AvecScoly.astro`. Nom = le sens de la scène.
- **SVG inline** (pour hériter des variables de thème) : `viewBox="0 0 640 480"`, `width="640"` et `height="480"` déclarés (ratio 4:3 fixe, aucun décalage de mise en page).
- Prop unique `class` (taille et placement décidés par la section). Dans la section : conteneur `aspect-[4/3]`, `max-w` ≈ 540 px au bureau, SVG en `block h-auto w-full`.
- Ordre du dessin : blob, décor, objets du fond, chaise, jambes, bureau, torse, tête, bras, objets sur le bureau, éléments animés.
- Chemins simples, coordonnées entières ou à une décimale, formes de même couleur regroupées par classe, pas de groupe inutile.
- Pour animer un élément déjà placé par `transform`, **envelopper** : `<g transform="…"><g class="i-float">…</g></g>` (l'animation CSS écraserait l'attribut).

## 6. Poids cible

- **6 à 14 Ko par scène (non compressé), 28 Ko au maximum pour la section.** Mesure : taille du `<svg>` dans `dist/index.html`.
- Mesures à l'étape 3 bis : `SansScoly` 5 504 octets, `AvecScoly` 6 487 octets, total 11 991 octets. Le CSS partagé (variables, classes, animations) pèse environ 3,5 Ko en source, une seule fois pour tout le site.

## 7. Accessibilité

- Les illustrations sont **décoratives** : `aria-hidden="true"` et `focusable="false"` sur le `<svg>`, et sur le conteneur dans la section. Pas de `<title>` ni de `<desc>`. Le texte voisin porte tout le sens.
- Si une illustration devait un jour porter une information que le texte n'a pas (ce qu'il faut éviter), il faudrait un `role="img"` et un `aria-label`, et le signaler dans le journal.
- Ordre de lecture : l'illustration précède le texte dans le HTML (au-dessus sur mobile) ; masquée aux lecteurs d'écran, elle n'interrompt pas la lecture. Aucun élément focusable dans une scène.
- Le contraste du texte voisin est mesuré comme pour toute section (AA dans les deux thèmes).

## 8. Animations

- **CSS seul, aucun script.** 2 à 3 éléments par scène, au plus.
- Trois classes dans `global.css` : `i-float` (flottement de 5 px, 5,5 à 7 s, boucle douce ; variantes décalées `d2`, `d3`), `i-sway` (balancement de 1,6°, plante), `i-pop` (apparition d'une coche, 7 s).
- Tout est enveloppé dans `@media (prefers-reduced-motion: no-preference)` : **aucune animation si l'utilisateur demande de réduire les mouvements** (vérifié : aucun `animation-name` actif).
- Transformations et opacité uniquement : aucun décalage de mise en page (CLS 0).

## 9. Réutiliser le kit

1. Reprendre le décor (blob, ligne de sol, points et croix), le bureau et le personnage assis d'une scène existante.
2. Choisir l'idée : une scène « avec Scoly » (couleurs de la marque, ordre) ou, si une scène « sans » est nécessaire, tons désaturés + une touche d'accent.
3. Dessiner, afficher en grand dans un navigateur, regarder le rendu, corriger. Vérifier en clair et en sombre, à 390 et 1280 px. Recommencer jusqu'à une scène propre ; **noter dans le journal le nombre d'itérations et ce qui a été simplifié.**
4. Mesurer le poids, mettre à jour ce guide si une variable ou une classe est ajoutée.
