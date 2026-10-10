/**
 * Formules et tarifs de Scoly (BRIEF §4, étape 8). Source unique : le composant `Pricing.astro` lit
 * ces données et n'écrit aucun prix ni libellé en dur. Réutilisable (données structurées, FAQ…).
 *
 * Prix en FCFA, facturation annuelle uniquement. Aucun autre prix, rabais, durée d'essai, garantie
 * ou mode de paiement ne doit figurer ici tant qu'il n'est pas confirmé.
 *
 * Typographie : apostrophes ’, espaces insécables ( ) dans les nombres et avant « FCFA ».
 * À confirmer avant d'ajouter à « Établissement Plus » : « Historique détaillé des opérations ».
 */
import { emailLink, sectionIds, site, whatsappLink } from "./site";

/** Destination d'un bouton : création de compte, ou contact (WhatsApp, e-mail, sinon ancre `#contact`). */
export type PlanDestination = "signup" | "contact";

export interface Plan {
  id: "decouverte" | "etablissement" | "etablissement-plus" | "reseau";
  name: string;
  /** Montant annuel en FCFA */
  amount: number;
  /** true : « À partir de » */
  from?: boolean;
  /** Équivalent mensuel en FCFA (affiché « Soit environ … par mois ») */
  monthlyEquivalent?: number;
  /** Période affichée après « FCFA » ; absente pour la formule gratuite */
  period?: string;
  description: string;
  cta: { label: string; destination: PlanDestination };
  features: string[];
  recommended?: boolean;
}

export const pricingCopy = {
  title: "Des tarifs simples, quel que soit le nombre d’élèves",
  subtitle:
    "Un prix annuel fixe par établissement. Commencez gratuitement, passez à une formule payante quand vous en avez besoin.",
  currency: "FCFA",
  fromLabel: "À partir de",
  recommendedBadge: "Recommandée",
  includedLabel: "Inclus",
  note: "* Usage raisonnable : la génération n’est pas plafonnée dans le cadre d’une utilisation normale.".replace(
    " :",
    " :",
  ),
} as const;

export const plans: Plan[] = [
  {
    id: "decouverte",
    name: "Découverte",
    amount: 0,
    description: "Pour découvrir Scoly sans engagement.",
    cta: { label: "Commencer gratuitement", destination: "signup" },
    features: [
      "Création d’un espace établissement",
      "Accès aux principaux types de documents standards",
      "Jusqu’à 10 documents générés par mois",
      "Un compte administrateur",
      "Consultation des documents générés",
    ],
  },
  {
    id: "etablissement",
    name: "Établissement",
    amount: 35000,
    period: "/ an",
    monthlyEquivalent: 2917,
    description: "Tout ce qu’il faut pour gérer les documents de votre école au quotidien.",
    cta: { label: "Choisir cette formule", destination: "signup" },
    recommended: true,
    features: [
      "Tous les types de documents standards",
      "Génération sans plafond mensuel fixe*",
      "Import de données depuis des fichiers Excel ou CSV",
      "Personnalisation des documents avec le logo et les informations de l’école",
      "Gestion des archives et recherche des documents",
      "Plusieurs comptes pour le personnel administratif",
      "Assistance technique",
    ],
  },
  {
    id: "etablissement-plus",
    name: "Établissement Plus",
    amount: 75000,
    period: "/ an",
    monthlyEquivalent: 6250,
    description: "Pour les écoles qui ont des besoins administratifs plus avancés.",
    cta: { label: "Choisir cette formule", destination: "signup" },
    features: [
      "Tout ce qui est inclus dans Établissement",
      "Génération de plusieurs documents en une seule opération",
      "Personnalisation avancée des modèles de documents",
      "Assistance prioritaire",
    ],
  },
  {
    id: "reseau",
    name: "Réseau d’écoles",
    amount: 150000,
    from: true,
    period: "/ an",
    description: "Pour les groupes scolaires qui souhaitent centraliser plusieurs établissements.",
    cta: { label: "Nous contacter", destination: "contact" },
    features: [
      "Gestion de plusieurs établissements depuis un compte central",
      "Espaces et archives séparés pour chaque école",
      "Gestion des accès des responsables de chaque établissement",
      "Paramétrage et modèles partagés lorsque c’est pertinent",
      "Accompagnement à la mise en place",
    ],
  },
];

/** Nombre avec espace insécable (U+00A0) entre les milliers : 35000 → « 35 000 ». */
export function formatAmount(n: number): string {
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** Ligne « Soit environ 2 917 FCFA par mois » (espaces insécables dans le nombre et avant FCFA). */
export function monthlyLine(plan: Plan): string | null {
  if (plan.monthlyEquivalent == null) return null;
  return `Soit environ ${formatAmount(plan.monthlyEquivalent)} ${pricingCopy.currency} par mois`;
}

/** Version lisible par les lecteurs d'écran : « 35 000 francs CFA par an ». */
export function priceForScreenReaders(plan: Plan): string {
  const unit = plan.amount > 1 ? "francs CFA" : "franc CFA";
  const prefix = plan.from ? `${pricingCopy.fromLabel} ` : "";
  const suffix = plan.period ? " par an" : "";
  return `${prefix}${formatAmount(plan.amount)} ${unit}${suffix}`;
}

export interface ResolvedLink {
  href: string;
  external: boolean;
}

/**
 * Lien d'un bouton. « contact » : WhatsApp si fourni dans `site.ts`, sinon e-mail s'il existe,
 * sinon l'ancre de la section de contact. Jamais de lien cassé.
 */
export function resolveDestination(destination: PlanDestination): ResolvedLink {
  if (destination === "signup") return { href: site.links.signup, external: false };
  if (whatsappLink) return { href: whatsappLink, external: true };
  if (emailLink) return { href: emailLink, external: false };
  return { href: `#${sectionIds.finalCta}`, external: false };
}
