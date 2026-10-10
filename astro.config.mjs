// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";

// Pages légales marquées `noindex: true` dans leur frontmatter : exclues du sitemap (la 404 l'est toujours).
const legalDir = new URL("./src/content/legal/", import.meta.url);
const noindexPages = [
  "/404",
  ...readdirSync(legalDir)
    .filter((f) => f.endsWith(".md"))
    .filter((f) => /^noindex:\s*true\s*$/m.test(readFileSync(new URL(f, legalDir), "utf8").split(/^---\s*$/m)[1] ?? ""))
    .map((f) => `/${f.replace(/\.md$/, "")}`),
];

// Les plugins Preline s'enregistrent par effet de bord (window.HS…) mais ne sont pas déclarés
// comme tels dans son package.json : sans ce plugin, le bundler les supprime.
// → pour ajouter un plugin (dropdown, tabs…), l'ajouter à la liste ci-dessous ET dans Base.astro.
/** @type {import("vite").Plugin} */
const prelineSideEffects = {
  name: "preline-side-effects",
  transform(/** @type {string} */ code, /** @type {string} */ id) {
    if (/preline\/dist\/(collapse|accordion)\.mjs$/.test(id)) {
      return { code, map: null, moduleSideEffects: true };
    }
  },
};

/**
 * Content-Security-Policy : après le build, calcule l'empreinte sha256 de chaque script en ligne des pages
 * et ajoute la règle CSP à `dist/_headers` (les empreintes changent avec le code : elles ne peuvent pas
 * vivre dans `public/_headers`). Styles : 'unsafe-inline' (attributs style et styles Astro en ligne).
 * @type {import("astro").AstroIntegration}
 */
const cspHashes = {
  name: "csp-hashes",
  hooks: {
    "astro:build:done": ({ dir }) => {
      const root = fileURLToPath(dir);
      const hashes = new Set();
      /** @param {string} d @returns {string[]} */
      const htmlFiles = (d) =>
        readdirSync(d, { withFileTypes: true }).flatMap((e) =>
          e.isDirectory() ? htmlFiles(d + e.name + "/") : e.name.endsWith(".html") ? [d + e.name] : [],
        );
      for (const file of htmlFiles(root)) {
        const html = readFileSync(file, "utf8");
        for (const m of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
          if (/\bsrc=/.test(m[1]) || /application\/ld\+json/.test(m[1]) || !m[2].trim()) continue;
          hashes.add(`'sha256-${createHash("sha256").update(m[2]).digest("base64")}'`);
        }
      }
      const csp = [
        "default-src 'self'",
        `script-src 'self' ${[...hashes].join(" ")}`.trim(),
        "style-src 'self' 'unsafe-inline'",
        "img-src 'self' data:",
        "font-src 'self'",
        "media-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
      ].join("; ");
      // La règle CSP rejoint le premier bloc « /* » de _headers
      const headers = readFileSync(root + "_headers", "utf8");
      writeFileSync(root + "_headers", headers.replace(/^\/\*\n/m, `/*\n  Content-Security-Policy: ${csp}\n`));
    },
  },
};

// Site 100 % statique → déployé tel quel sur Cloudflare (aucun adaptateur requis).
// Si on ajoute plus tard du rendu serveur (formulaire de démo, etc.), on passera par @astrojs/cloudflare.
export default defineConfig({
  site: "https://scoly.ink",
  trailingSlash: "never",
  // Feuilles de style incluses dans le HTML : pas de requête CSS bloquant le premier affichage (mobile, connexion lente)
  build: { inlineStylesheets: "always" },
  // Le sitemap liste les pages publiques indexables (les pages en brouillon n'existent pas dans dist)
  integrations: [cspHashes, sitemap({ filter: (page) => !noindexPages.some((/** @type {string} */ p) => page.endsWith(p)) })],
  vite: { plugins: [tailwindcss(), prelineSideEffects] },
});
