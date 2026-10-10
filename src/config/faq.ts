/**
 * Questions fréquentes (étape 9). Source unique : `Faq.astro` lit ces données et n'écrit aucun texte en dur.
 * Réutilisable pour les données structurées (FAQPage) de l'étape 11 : `answer` est du texte brut.
 *
 * Typographie : apostrophes ’, espace insécable ( ) avant « ? », « : » et « ; ».
 * À ajouter plus tard : une question sur la protection des données (après l'étape 7), une question sur
 * le paiement (quand Mobile Money et carte bancaire seront en place).
 */
import { sectionIds, site } from "./site";

export interface FaqLink {
  label: string;
  href: string;
  /** Lien externe : nouvel onglet, rel sécurisé, icône et mention pour les lecteurs d'écran */
  external?: boolean;
}

export interface FaqItem {
  id: string;
  question: string;
  /** Texte brut (pas de HTML) */
  answer: string;
  /** Lien facultatif, affiché sur sa propre ligne en fin de réponse */
  link?: FaqLink;
}

export const faqCopy = {
  title: "Questions fréquentes",
  subtitle: "Quelques réponses avant de vous lancer.",
  helpText: "Vous ne trouvez pas votre réponse ?",
  helpLink: { label: "Écrivez-nous", href: `#${sectionIds.finalCta}` } satisfies FaqLink,
} as const;

export const faqItems: FaqItem[] = [
  {
    id: "essai",
    question: "Puis-je essayer Scoly avant de payer ?",
    answer:
      "Oui. La formule Découverte est gratuite et sans engagement : vous créez l’espace de votre établissement et vous générez jusqu’à 10 documents par mois. Vous passez à une formule payante quand vous en avez besoin.",
  },
  {
    id: "prix-eleves",
    question: "Le prix change-t-il avec le nombre d’élèves ?",
    answer:
      "Non. Le tarif est fixe, par établissement et par an, quel que soit le nombre d’élèves. Vous payez pour les fonctionnalités dont vous avez besoin, pas pour la taille de votre école.",
    link: { label: "Voir les tarifs", href: `#${sectionIds.pricing}` },
  },
  {
    id: "informatique",
    question: "Faut-il être à l’aise avec l’informatique ?",
    answer:
      "Scoly est pensé pour celles et ceux qui n’ont pas de compétences techniques particulières. Vous ajoutez les élèves, vous choisissez un document, et il se génère.",
  },
  {
    id: "import",
    question: "Puis-je reprendre mes listes d’élèves existantes ?",
    answer:
      "Oui. Avec les formules Établissement et Établissement Plus, vous importez vos listes depuis un fichier Excel ou CSV au lieu de ressaisir chaque élève. Vous pouvez aussi ajouter les élèves un par un.",
  },
  {
    id: "equipe",
    question: "Plusieurs personnes peuvent-elles utiliser Scoly dans mon école ?",
    answer:
      "Oui, avec les formules Établissement et Établissement Plus. Vous invitez les membres de votre équipe par e-mail ; chacun a son compte et son rôle, et vous décidez qui peut établir des documents. La formule Découverte comprend un seul compte administrateur.",
  },
  {
    id: "authenticite",
    question: "Comment savoir si un document est authentique ?",
    answer:
      "Toute personne qui reçoit un document peut en vérifier l’authenticité sur la page de vérification de Scoly, sans avoir de compte.",
    link: { label: "Vérifier un document", href: site.links.verify, external: true },
  },
  {
    id: "perimetre",
    question: "Scoly gère-t-il toute la vie de l’école ?",
    answer:
      "Non, et c’est voulu. Scoly se concentre sur la paperasse administrative : les informations des élèves, la génération des documents et leurs archives.",
  },
  {
    id: "aide",
    question: "Et si j’ai besoin d’aide ?",
    answer:
      "Les formules payantes incluent une assistance technique, prioritaire avec Établissement Plus. Pour toute question avant de vous inscrire, vous pouvez nous écrire depuis la section de contact.",
    link: { label: "Aller à la section de contact", href: `#${sectionIds.finalCta}` },
  },
];
