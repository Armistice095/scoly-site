import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

/**
 * Textes légaux : un fichier Markdown par page (`src/content/legal/<slug>.md`).
 * `draft: true` → ni page, ni lien dans le pied de page. `noindex: true` → page servie avec `noindex`.
 */
const legal = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date(),
    draft: z.boolean().default(true),
    noindex: z.boolean().default(false),
  }),
});

export const collections = { legal };
