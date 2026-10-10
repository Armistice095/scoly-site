/**
 * Données fictives, manifestement génériques, partagées par les cinq aperçus de documents.
 * Aucun vrai nom, aucune vraie école, aucun vrai numéro (BRIEF §7 : aperçus sur données fictives).
 * Les espaces insécables (\u00a0) évitent de couper « N° 000 » ou « Fait à Ville, le … » en fin de ligne.
 */

/** Année scolaire en cours au moment du build : de septembre à août (ex. « 2026-2027 »). */
export function schoolYear(now: Date = new Date()): string {
  const y = now.getFullYear();
  return now.getMonth() >= 8 ? `${y}-${y + 1}` : `${y - 1}-${y}`;
}

export const sample = {
  school: "Établissement Exemple",
  city: "Ville",
  phone: "00 00 00 00",
  student: "NOM Prénom",
  guardian: "NOM Prénom",
  matricule: "000000",
  birthDate: "JJ/MM/AAAA",
  birthPlace: "Ville",
  grade: "6ᵉ A",
  date: "JJ/MM/AAAA",
  year: schoolYear(),
  /** Numéro d'ordre fictif des documents numérotés */
  ref: `N°\u00a0000/${schoolYear()}`,
} as const;
