/**
 * SEO de la page d'accueil (étape 11). Source unique du titre, de la description et de l'image de partage :
 * `Base.astro` (valeurs par défaut) et `src/lib/jsonld.ts` (données structurées) les lisent d'ici.
 * Titre ≤ 60 caractères, description ≤ 155 caractères (contrôlé par `npm run audit`).
 */
export const seo = {
  title: "Scoly — Documents scolaires générés en quelques clics",
  description:
    "Générez les certificats et attestations de votre école en quelques clics, puis retrouvez-les dans vos archives. Pour les écoles du Bénin. Plan gratuit.",
  /** Image de partage (générée par `npm run make-og`), 1200 × 630 */
  ogImage: { path: "/og-scoly.png", width: 1200, height: 630, alt: "Logo Scoly sur fond bleu clair" },
  /** Logo carré utilisé dans les données structurées (URL absolue construite à partir de site.url) */
  logoPath: "/icon-512.png",
} as const;
