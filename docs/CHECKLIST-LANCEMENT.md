# Checklist de lancement

À cocher par le propriétaire avant d'annoncer le site. Tout ce qui n'est pas coché est un risque, pas un détail.

## Contenu à fournir

- [ ] **Numéro WhatsApp** : renseigné dans `src/config/site.ts` (`contact.whatsapp`, indicatif 229 compris). Valeur actuelle `22959287815` à confirmer ; si le lien n'ouvre pas la bonne conversation, essayer `2290159287815` (numéros béninois à 10 chiffres depuis fin 2024).
- [ ] **Adresse e-mail de contact** : `contact.email` dans `site.ts` (actuellement `contact@scoly.ink` : vérifier que la boîte existe et qu'elle est relevée).
- [ ] **Vidéo du Hero** fournie et branchée : `public/video/hero.webm`, `hero.mp4`, `hero-poster.webp` (16:9, sans son), puis renseigner `heroVideo` dans `site.ts`. Tant qu'elle manque, le Hero affiche un cadre avec le logo.
- [ ] **Textes légaux** fournis et relus par un juriste : `src/content/legal/confidentialite.md`, `conditions.md`, `cookies.md`. Remplacer le contenu, passer `draft` à `false`, reconstruire. Tant que `draft: true`, ni la page ni le lien du pied de page n'existent.
- [ ] Faire confirmer par le fondateur : l'« historique des actions » existe-t-il ? (non affiché comme acquis), la ligne « Historique détaillé des opérations » d'Établissement Plus (retirée), les aperçus de documents (structure déduite pour 4 des 5 documents).

## Prix et formules

- [ ] Contrôler chaque formule dans `src/config/pricing.ts` : Découverte 0 FCFA, Établissement 35 000 FCFA / an, Établissement Plus 75 000 FCFA / an, Réseau d’écoles à partir de 150 000 FCFA / an ; contenu de chaque liste ; mention « usage raisonnable ».
- [ ] Les mêmes prix apparaissent dans les données structurées (elles sont générées depuis le même fichier : contrôler après un changement).
- [ ] Aucune mention du paiement par Mobile Money ou carte tant qu'il n'est pas en place.

## Tests sur de vrais appareils

- [ ] Sur un **vrai téléphone** (Android et iPhone si possible) : parcourir toute la page, ouvrir le menu, changer de thème, ouvrir chaque onglet de « Documents », ouvrir les questions de la FAQ.
- [ ] Sur **Safari** (Mac ou iPhone) et **Firefox** : même parcours. Le site n'a été testé que dans Chromium.
- [ ] **Chaque lien et chaque bouton** de la page, y compris le pied de page et le menu mobile.
- [ ] **Lien WhatsApp** : « Demander une démonstration », « Nous contacter » (Réseau d’écoles), pied de page : la bonne conversation s'ouvre, avec le message prérempli pour la démonstration.
- [ ] **Boutons vers app.scoly.ink** : « Se connecter » (connexion), « Essayer gratuitement » et boutons des formules (création de compte, `/creer-un-compte`), « Vérifier un document » (`/verifier`). Aucune page d'erreur.
- [ ] Page d'erreur : une adresse inexistante affiche « Page introuvable ».

## Partage et référencement

- [ ] **Partage WhatsApp** : coller `https://scoly.ink` dans une conversation : logo, titre et description s'affichent. (WhatsApp garde l'ancien aperçu en mémoire : en cas de changement, ajouter `?v=2` à l'adresse pour tester.)
- [ ] **Résultats enrichis Google** : tester `https://scoly.ink` sur https://search.google.com/test/rich-results (Organization, SoftwareApplication, FAQ). Corriger les avertissements éventuels. Ce test n'a pas pu être fait avant la mise en ligne.
- [ ] **Search Console** : domaine ajouté, `sitemap-index.xml` envoyé et lu avec succès.

## Cloudflare

- [ ] Domaine `scoly.ink` rattaché au Worker, état « Active ».
- [ ] `www.scoly.ink` redirige vers `scoly.ink`.
- [ ] SSL/TLS en **Full (strict)**, **Always Use HTTPS** activé.
- [ ] **Rocket Loader** désactivé, **Auto Minify** désactivé s'il est proposé.
- [ ] (Facultatif) Web Analytics : voir `docs/DEPLOIEMENT.md`, étape 10 (la CSP doit être adaptée).

## Contrôles techniques avant publication

- [ ] `npm run check`, `npm run build` puis `npm run audit` : aucune erreur.
- [ ] Aucune console d'erreur dans le navigateur (F12 > Console) sur `https://scoly.ink` après publication.
- [ ] Illustrations relues par une personne du public visé (représentation des personnes, tenues, mobilier).
