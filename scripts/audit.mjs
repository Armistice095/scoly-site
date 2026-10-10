/**
 * Audit statique de dist/ (aucune dépendance) : `npm run build && npm run audit`.
 * Analyse chaque page HTML et signale : ancres sans cible, liens vides ou href="#", target="_blank" sans
 * rel="noopener noreferrer", images sans alt, titre / description / canonical manquants, plus d'un h1,
 * chaînes interdites, JSON-LD invalide, liens internes vers un fichier absent. Affiche aussi le poids du HTML
 * de l'accueil et du JavaScript. Code de sortie 1 s'il y a au moins une erreur.
 */
import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const dist = join(dirname(fileURLToPath(import.meta.url)), "..", "dist");
if (!existsSync(dist)) {
  console.error("dist/ introuvable : lancez d'abord « npm run build ».");
  process.exit(1);
}

const FORBIDDEN = ["à venir", "[À FOURNIR]", "TODO", "lorem", "placeholder"];
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;

const walk = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)],
  );
const files = walk(dist);
const pages = files.filter((f) => f.endsWith(".html"));
const rel = (f) => f.slice(dist.length + 1);

const errors = [];
const warnings = [];
const err = (page, msg) => errors.push(`${rel(page)} : ${msg}`);
const warn = (page, msg) => warnings.push(`${rel(page)} : ${msg}`);

const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  return m ? (m[2] ?? m[3] ?? m[4] ?? "") : null;
};
const strip = (html) =>
  html.replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<style\b[\s\S]*?<\/style>/gi, "");
const idsOf = (html) => new Set([...html.matchAll(/\s(?:id|name)="([^"]+)"/g)].map((m) => m[1]));

// Pages par URL (pour résoudre « /#faq », « /conditions#x »…)
const pageByUrl = new Map();
for (const p of pages) {
  const r = rel(p).replace(/\\/g, "/");
  const url = r === "index.html" ? "/" : "/" + r.replace(/\/index\.html$/, "").replace(/\.html$/, "");
  pageByUrl.set(url, readFileSync(p, "utf8"));
}

for (const page of pages) {
  const html = readFileSync(page, "utf8");
  const visible = strip(html);
  const ids = idsOf(html);
  const isHome = rel(page) === "index.html";

  // <head>
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
  if (!title) err(page, "balise <title> absente");
  else if (title.length > TITLE_MAX) err(page, `titre trop long (${title.length} > ${TITLE_MAX})`);
  const description = html.match(/<meta[^>]+name="description"[^>]*>/i);
  const descText = description ? attr(description[0], "content") : null;
  if (!descText) err(page, "meta description absente");
  else if (descText.length > DESCRIPTION_MAX) err(page, `description trop longue (${descText.length} > ${DESCRIPTION_MAX})`);
  if (!/<link[^>]+rel="canonical"[^>]+href="https:\/\/scoly\.ink[^"]*"/i.test(html)) err(page, "canonical absent ou non absolu");

  // h1
  const h1 = (visible.match(/<h1\b/gi) ?? []).length;
  if (h1 !== 1) err(page, `${h1} balise(s) h1 (1 attendue)`);

  // Liens
  for (const m of visible.matchAll(/<a\b[^>]*>/gi)) {
    const tag = m[0];
    const href = attr(tag, "href");
    if (href === null || href.trim() === "" || href.trim() === "#") {
      err(page, `lien vide ou href="#" : ${tag.slice(0, 100)}`);
      continue;
    }
    if (attr(tag, "target") === "_blank") {
      const r = (attr(tag, "rel") ?? "").split(/\s+/);
      if (!r.includes("noopener") || !r.includes("noreferrer")) err(page, `target="_blank" sans rel="noopener noreferrer" : ${href}`);
    }
    if (href.startsWith("#")) {
      if (!ids.has(decodeURIComponent(href.slice(1)))) err(page, `ancre sans cible : ${href}`);
    } else if (href.startsWith("/") && !href.startsWith("//")) {
      const [path, hash] = href.split("#");
      const url = path === "" ? "/" : path.replace(/\/$/, "") || "/";
      const target = pageByUrl.get(url);
      if (target) {
        if (hash && !idsOf(target).has(hash)) err(page, `ancre sans cible sur ${url} : #${hash}`);
      } else if (!existsSync(join(dist, path))) {
        err(page, `lien interne vers une page ou un fichier absent : ${href}`);
      }
    }
  }

  // Images
  for (const m of visible.matchAll(/<img\b[^>]*>/gi)) {
    if (attr(m[0], "alt") === null) err(page, `image sans alt : ${(attr(m[0], "src") ?? "").slice(0, 80)}`);
  }

  // Chaînes interdites (texte visible et attributs ; scripts et styles exclus)
  for (const word of FORBIDDEN) {
    if (visible.toLowerCase().includes(word.toLowerCase())) err(page, `chaîne interdite : « ${word} »`);
  }

  // Apostrophes droites dans le texte visible (hors balises)
  const text = visible.replace(/<[^>]+>/g, " ").replace(/&[a-z#0-9]+;/gi, " ");
  const straight = text.match(/\w'\w/g);
  if (straight) warn(page, `${straight.length} apostrophe(s) droite(s) dans le texte (ex. « ${straight[0]} »)`);

  // JSON-LD
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      err(page, `JSON-LD invalide : ${e.message}`);
    }
  }
  if (isHome && !/application\/ld\+json/.test(html)) err(page, "JSON-LD absent");
}

// Image de partage
const og = join(dist, "og-scoly.png");
if (!existsSync(og)) errors.push("og-scoly.png absent");
else if (statSync(og).size > 200 * 1024) errors.push("og-scoly.png dépasse 200 Ko");

// Poids
const kb = (n) => `${(n / 1024).toFixed(1)} Ko`;
const home = join(dist, "index.html");
const homeHtml = readFileSync(home, "utf8");
const jsFiles = files.filter((f) => f.endsWith(".js"));
const jsExternal = jsFiles.reduce((n, f) => n + statSync(f).size, 0);
const jsInline = [...homeHtml.matchAll(/<script\b(?![^>]*\bsrc=)(?![^>]*ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].reduce(
  (n, m) => n + Buffer.byteLength(m[1]),
  0,
);
console.log(`Pages analysées : ${pages.map(rel).join(", ")}`);
console.log(`HTML de l'accueil : ${kb(statSync(home).size)}`);
console.log(`JavaScript : ${kb(jsExternal)} en fichiers (${jsFiles.length}) + ${kb(jsInline)} en ligne = ${kb(jsExternal + jsInline)}`);

if (warnings.length) {
  console.log(`\nAvertissements (${warnings.length})`);
  warnings.forEach((w) => console.log("  ! " + w));
}
if (errors.length) {
  console.log(`\nErreurs (${errors.length})`);
  errors.forEach((e) => console.log("  ✗ " + e));
  process.exit(1);
}
console.log("\nAudit : aucune erreur.");
