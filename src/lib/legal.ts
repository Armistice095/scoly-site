import { getCollection } from "astro:content";
import { legalPages } from "../config/site";

/** Pages légales publiées (draft: false), dans l'ordre de `legalPages` ; un fichier inconnu de `legalPages` est ignoré. */
export async function getPublishedLegal() {
  const entries = await getCollection("legal", ({ data }) => !data.draft);
  return legalPages
    .map((p) => {
      const entry = entries.find((e) => e.id === p.slug);
      return entry ? { ...p, entry } : null;
    })
    .filter((p): p is NonNullable<typeof p> => p !== null);
}
