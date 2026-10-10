/**
 * Génère public/og-scoly.png (1200 × 630, ≤ 200 Ko) : fond doux aux couleurs de la marque,
 * logo en grand, deux rubans discrets (même tracé que le CTA final). Logo seul, sans texte :
 * le rendu d'un texte dépendrait des polices installées sur la machine qui lance le script.
 * Usage : npm run make-og
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { statSync } from "node:fs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const W = 1200;
const H = 630;

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#f7f8fa"/>
      <stop offset="1" stop-color="#eef6ff"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <path d="M-80 150C140 40 330 60 450 140C550 205 640 225 750 180C900 115 1060 95 1300 135L1300-80L-80-80Z" fill="#d9eaff" opacity="0.85"/>
  <path d="M1280 400C1100 355 930 400 845 500C780 575 710 620 620 660L1280 700Z" fill="#bbdbff" opacity="0.7"/>
</svg>`);

const logoWidth = 760;
const logo = await sharp(join(root, "public/logo-scoly.png")).resize({ width: logoWidth }).toBuffer();
const { height: logoHeight } = await sharp(logo).metadata();

const out = join(root, "public/og-scoly.png");
await sharp(background)
  .composite([{ input: logo, left: Math.round((W - logoWidth) / 2), top: Math.round((H - (logoHeight ?? 0)) / 2) }])
  .png({ palette: true, quality: 90, compressionLevel: 9 })
  .toFile(out);

const kb = Math.round(statSync(out).size / 1024);
console.log(`og-scoly.png : ${W}×${H}, ${kb} Ko`);
if (kb > 200) {
  console.error("Image trop lourde (> 200 Ko)");
  process.exit(1);
}
