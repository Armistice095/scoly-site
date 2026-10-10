/**
 * Génère les icônes du site à partir de public/icon-scoly.png (512 × 512, fond transparent) :
 *   favicon.ico (16 et 32 px), icon-192.png, icon-512.png, apple-touch-icon.png (180 px, fond blanc).
 * Génère aussi les logos allégés du site (logo-scoly-240.webp / -480.webp et variantes sombres), affichés à ~36 px de haut.
 * Seule dépendance : sharp (déjà installé par Astro). L'ICO est écrit à la main (images PNG intégrées).
 * Usage : npm run make-icons
 */
import sharp from "sharp";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "public/icon-scoly.png");
const out = (name) => join(root, "public", name);

/** Pictogramme centré sur un carré de `size` px, avec une marge de `pad` (part de la taille). */
async function render(size, pad, background) {
  const inner = Math.round(size * (1 - pad * 2));
  const glyph = await sharp(src).resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  return sharp({
    create: { width: size, height: size, channels: 4, background: background ?? { r: 0, g: 0, b: 0, alpha: 0 } },
  })
    .composite([{ input: glyph, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

const white = { r: 255, g: 255, b: 255, alpha: 1 };
writeFileSync(out("icon-192.png"), await render(192, 0.1));
writeFileSync(out("icon-512.png"), await render(512, 0.1));
writeFileSync(out("apple-touch-icon.png"), await render(180, 0.14, white));

// favicon.ico : en-tête ICONDIR + une entrée par taille, données PNG intégrées
const sizes = [16, 32];
const images = await Promise.all(sizes.map((s) => render(s, 0.04)));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // réservé
header.writeUInt16LE(1, 2); // type : icône
header.writeUInt16LE(images.length, 4);
let offset = 6 + 16 * images.length;
const entries = images.map((img, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(sizes[i], 0); // largeur
  e.writeUInt8(sizes[i], 1); // hauteur
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); // plans
  e.writeUInt16LE(32, 6); // bits par pixel
  e.writeUInt32LE(img.length, 8);
  e.writeUInt32LE(offset, 12);
  offset += img.length;
  return e;
});
writeFileSync(out("favicon.ico"), Buffer.concat([header, ...entries, ...images]));
// Logos allégés (WebP, 240 et 480 px de large) pour l'en-tête et le pied de page
for (const variant of ["logo-scoly", "logo-scoly-dark"]) {
  for (const w of [240, 480]) {
    await sharp(join(root, "public", `${variant}.png`)).resize({ width: w }).webp({ quality: 90, alphaQuality: 100 }).toFile(out(`${variant}-${w}.webp`));
  }
}
console.log("Icônes générées : favicon.ico (16, 32), icon-192.png, icon-512.png, apple-touch-icon.png");
