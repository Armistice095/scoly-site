# Mise en ligne de scoly.ink, pas à pas

Ce guide s'adresse à une personne qui n'est pas développeuse. Comptez une heure la première fois. Chaque étape dit où cliquer et ce que vous devez voir.

Le site est une suite de fichiers statiques. Il est hébergé gratuitement ou presque sur **Cloudflare** (service « Workers »), qui s'occupe aussi du nom de domaine `scoly.ink`.

---

## 0. Ce qu'il vous faut

- Un compte Cloudflare, avec le domaine `scoly.ink` déjà ajouté (le domaine apparaît dans la liste « Sites web » du tableau de bord).
- Un ordinateur avec **Node.js 20 ou plus récent** : téléchargez la version « LTS » sur https://nodejs.org, puis installez-la comme n'importe quel programme.
- Le dossier du projet (celui qui contient `package.json`).

Ouvrez un **terminal** dans le dossier du projet :

- Windows : ouvrez le dossier dans l'Explorateur, tapez `cmd` dans la barre d'adresse, puis Entrée.
- Mac : clic droit sur le dossier, « Nouveau terminal au dossier ».

## 1. Installer le projet

Dans le terminal :

```bash
npm install
```

Patientez quelques minutes. Des messages défilent ; c'est normal. À la fin, le terminal vous rend la main sans mot « error » en rouge.

## 2. Construire le site

```bash
npm run build
```

Vous devez voir « Complete! » à la fin. Un dossier `dist` apparaît : c'est le site prêt à être publié.

Vérifiez-le avec l'audit intégré :

```bash
npm run audit
```

La dernière ligne doit être « Audit : aucune erreur. ». Sinon, ne publiez pas et transmettez le message à la personne qui maintient le site.

Pour voir le site avant de le publier : `npm run preview`, puis ouvrez l'adresse affichée (http://localhost:4321) dans votre navigateur.

## 3. Se connecter à Cloudflare

```bash
npx wrangler login
```

Une page de votre navigateur s'ouvre. Connectez-vous à Cloudflare puis cliquez sur « Allow » (Autoriser). Revenez au terminal : il indique « Successfully logged in ».

## 4. Publier

```bash
npm run deploy
```

Cette commande reconstruit le site puis l'envoie à Cloudflare. À la fin, le terminal affiche une adresse en `…workers.dev`. Ouvrez-la : le site s'affiche. Pour une mise à jour future, répétez simplement cette commande.

## 5. Rattacher le domaine scoly.ink

1. Dans le tableau de bord Cloudflare : **Workers & Pages** (ou « Compute »), puis cliquez sur **scoly-site**.
2. Onglet **Settings** (Paramètres), section **Domains & Routes**, bouton **Add** > **Custom domain**.
3. Saisissez `scoly.ink`, puis validez. Cloudflare crée l'enregistrement DNS tout seul.
4. Attendez quelques minutes jusqu'à ce que l'état passe à « Active ».

## 6. Rediriger www.scoly.ink vers scoly.ink

1. Onglet **DNS** du domaine : ajoutez un enregistrement de type `AAAA`, nom `www`, contenu `100::`, avec le nuage **orange** (« Proxied »). Il ne pointe nulle part : il sert seulement à faire passer `www` par Cloudflare.
2. Menu **Rules** > **Redirect Rules** > **Create rule** > « Single Redirect ».
3. Nom : « www vers domaine nu ». Condition : *Hostname* **equals** `www.scoly.ink`.
4. Action : *Dynamic*, expression `concat("https://scoly.ink", http.request.uri.path)`, code **301**, cochez « Preserve query string ».
5. **Deploy**. Testez `https://www.scoly.ink` : l'adresse doit devenir `https://scoly.ink`.

## 7. Réglages de sécurité et de vitesse

Dans le domaine `scoly.ink` du tableau de bord :

1. **SSL/TLS** > **Overview** : choisissez **Full (strict)** (Complet strict).
2. **SSL/TLS** > **Edge Certificates** : activez **Always Use HTTPS** (Toujours utiliser HTTPS).
3. **Speed** > **Optimization** > **Content Optimization** : désactivez **Rocket Loader**. Si une option **Auto Minify** est encore proposée, décochez HTML, CSS et JavaScript. Ces deux options modifient les scripts et peuvent casser le site (le site est déjà minifié à la construction).
4. N'activez pas HSTS dans les fichiers du site : il se règle ici, dans **SSL/TLS** > **Edge Certificates** > **HTTP Strict Transport Security**, seulement quand vous êtes sûre que tout fonctionne en HTTPS.

## 8. Vérifier après la mise en ligne

Ouvrez `https://scoly.ink` sur un ordinateur **et** sur un téléphone :

- La page s'affiche, avec le logo et le titre « Les documents de votre école… ».
- Le bouton clair / sombre fonctionne. Les onglets de la section « Documents » changent d'aperçu. Le menu (téléphone) s'ouvre.
- `https://scoly.ink/une-page-qui-n-existe-pas` affiche « Page introuvable » avec un bouton « Retour à l’accueil ».
- `https://scoly.ink/robots.txt` et `https://scoly.ink/sitemap-index.xml` s'ouvrent.
- Collez le lien dans une conversation WhatsApp : l'aperçu montre le logo Scoly, le titre et la description.
- Les boutons « Essayer gratuitement » mènent à `app.scoly.ink`, le lien WhatsApp ouvre la bonne conversation.

Le fichier `_headers` (inclus dans le site) ajoute des protections et une règle de sécurité du contenu (CSP). Si un jour un élément du site ne s'affiche plus après l'ajout d'un service externe (statistiques, vidéo hébergée ailleurs…), la CSP en est la cause probable : voir « Statistiques » ci-dessous.

## 9. Google Search Console

1. Allez sur https://search.google.com/search-console et connectez-vous avec le compte Google du propriétaire.
2. **Ajouter une propriété** > type **Domaine** > `scoly.ink`.
3. Google donne une ligne de texte à ajouter dans le DNS (enregistrement `TXT`). Dans Cloudflare : **DNS** > **Add record** > type `TXT`, nom `@`, contenu : la ligne copiée. Puis **Vérifier** dans la Search Console.
4. Menu **Sitemaps** : saisissez `sitemap-index.xml` puis **Envoyer**. L'état « Réussite » apparaît après quelques minutes.
5. Plus tard : testez les résultats enrichis avec https://search.google.com/test/rich-results (collez `https://scoly.ink`).

## 10. Statistiques sans cookies (facultatif)

Cloudflare Web Analytics mesure les visites sans cookies et sans suivre les personnes. À activer seulement si le propriétaire le décide.

1. Tableau de bord Cloudflare > **Analytics & Logs** > **Web Analytics** > **Add a site** > `scoly.ink`.
2. Choisissez l'installation par **extrait de code (JS snippet)**, pas l'installation automatique.
3. **Important** : le site applique une règle de sécurité (CSP) qui bloque les scripts externes. Pour autoriser Cloudflare Analytics, il faut modifier `astro.config.mjs` (fonction `cspHashes`) : ajoutez `https://static.cloudflareinsights.com` à `script-src` et `https://cloudflareinsights.com` à `connect-src`, puis ajoutez le script donné par Cloudflare dans `src/layouts/Base.astro`, avant `</body>`. Demandez cette modification à la personne qui maintient le site, puis relancez `npm run deploy`.
4. Si vous activez l'option automatique malgré tout, les statistiques ne remonteront pas (le script sera bloqué), sans autre conséquence sur le site.
5. Mentionnez la mesure d'audience dans la politique de confidentialité.

## Alternative : déploiement par Git

Au lieu de `npm run deploy`, Cloudflare peut publier le site à chaque modification envoyée sur GitHub ou GitLab.

1. Mettez le dossier du projet dans un dépôt Git (GitHub ou GitLab).
2. Cloudflare > **Workers & Pages** > **Create** > **Import a repository** (« Connect to Git »), choisissez le dépôt.
3. Commande de construction : `npm run build`. Commande de déploiement : `npx wrangler deploy`. (Le dossier publié est `dist`, déjà indiqué dans `wrangler.jsonc`.)
4. Chaque envoi sur la branche principale republie le site. Le domaine se rattache comme à l'étape 5.

## En cas de problème

- **« command not found: npm »** : Node.js n'est pas installé, ou le terminal doit être rouvert après l'installation.
- **Le site affiche une ancienne version** : attendez une minute, puis rechargez sans cache (Ctrl + Maj + R, ou Cmd + Maj + R sur Mac).
- **Erreur d'authentification** : relancez `npx wrangler login`.
- **Le domaine reste « Pending »** : vérifiez que `scoly.ink` utilise bien les serveurs de noms Cloudflare (onglet **Overview** du domaine).
