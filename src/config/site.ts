/**
 * Configuration centralisée du site (BRIEF §5 et §6).
 * Aucune URL, coordonnée ou entrée de navigation ne doit être écrite en dur dans les composants.
 */

const appUrl = "https://app.scoly.ink";

export const site = {
  name: "Scoly",
  url: "https://scoly.ink",
  appUrl,
  links: {
    /** Connexion à l'application */
    login: appUrl,
    /** Création de compte (« Essayer gratuitement », « Commencer gratuitement », formules payantes) */
    signup: `${appUrl}/creer-un-compte`,
    /** Vérification publique d'un document */
    verify: `${appUrl}/verifier`,
  },
  contact: {
    /** Numéro WhatsApp au format international, chiffres seuls (ex. « 229XXXXXXXX »). null = à fournir. */
    whatsapp: "22959287815" as string | null,
    /** Message prérempli du lien WhatsApp générique (facultatif). */
    whatsappMessage: null as string | null,
    /** Message prérempli pour la demande de démonstration (CTA final). */
    whatsappDemoMessage: "Bonjour, je souhaite une démonstration de Scoly pour mon établissement." as string | null,
    /** Objet de l'e-mail de demande de démonstration. */
    demoEmailSubject: "Demande de démonstration Scoly",
    /** Adresse e-mail de contact. null = à fournir. */
    email: "contact@scoly.ink" as string | null,
  },
} as const;

/**
 * Vidéo de présentation du Hero (étape 2). Tant que `poster` et au moins une source sont à null,
 * le Hero affiche un cadre sobre sans vidéo. Pour la brancher : déposer les fichiers dans `public/video/`
 * puis renseigner les chemins ci-dessous, sans toucher aux composants :
 *   webm   : "/video/hero.webm"
 *   mp4    : "/video/hero.mp4"
 *   poster : "/video/hero-poster.webp"  (obligatoire : image affichée avant et sans lecture)
 * Format attendu : 16:9, sans piste audio. `label` nomme le cadre pour les lecteurs d'écran.
 */
export const heroVideo = {
  webm: "/video/hero.webm" as string | null,
  mp4: "/video/hero.mp4" as string | null,
  poster: "/video/hero-poster.webp" as string | null,
  label: "Démonstration de l’application Scoly : création du compte, ajout d’élèves, certificat de scolarité, archives et vérification en ligne",
};

/** Identifiants d'ancre des sections (BRIEF §6). Les composants de section les utilisent tous d'ici. */
export const sectionIds = {
  hero: "top",
  problems: "pourquoi",
  howItWorks: "comment-ca-marche",
  documents: "documents",
  features: "fonctionnalites",
  pricing: "tarifs",
  faq: "faq",
  finalCta: "contact",
} as const;

export interface NavItem {
  label: string;
  /** Ancre (« #documents ») ou URL absolue */
  href: string;
  external?: boolean;
}

/**
 * Éléments du centre de la navbar, dans l'ordre du brief. Source unique : la barre, le menu mobile et le scrollspy s'y adaptent.
 * La FAQ (#faq) n'y figure pas (barre aérée) : sa section reste dans la page, son lien est dans le footer.
 */
export const navigation: NavItem[] = [
  { label: "Documents", href: `#${sectionIds.documents}` },
  { label: "Fonctionnalités", href: `#${sectionIds.features}` },
  { label: "Tarifs", href: `#${sectionIds.pricing}` },
  { label: "Vérifier un document", href: site.links.verify, external: true },
];

/**
 * Construit un lien WhatsApp (https://wa.me/…).
 * Renvoie null si le numéro est absent ou ne contient aucun chiffre : le composant masque alors le bouton.
 */
export function buildWhatsAppLink(
  phone: string | null | undefined,
  message?: string | null,
): string | null {
  const digits = (phone ?? "").replace(/\D/g, "");
  if (!digits) return null;
  const text = message?.trim();
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}

/** Lien WhatsApp du site, ou null tant que le numéro n'est pas fourni. */
export const whatsappLink = buildWhatsAppLink(site.contact.whatsapp, site.contact.whatsappMessage);

/** Lien mailto du site, ou null tant que l'adresse n'est pas fournie. */
export const emailLink = site.contact.email ? `mailto:${site.contact.email}` : null;

/** Lien WhatsApp avec le message de démonstration, ou null. */
export const demoWhatsappLink = buildWhatsAppLink(site.contact.whatsapp, site.contact.whatsappDemoMessage);

/** Lien mailto de demande de démonstration (objet prérempli), ou null. */
export const demoEmailLink = site.contact.email
  ? `mailto:${site.contact.email}?subject=${encodeURIComponent(site.contact.demoEmailSubject)}`
  : null;

export interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
  /** false : le lien n'est pas rendu (page ou section pas encore disponible). Jamais de lien mort. */
  enabled: boolean;
}

export interface FooterGroup {
  title: string;
  links: FooterLink[];
}

/**
 * Colonnes du footer. Un lien `enabled: false` n'est pas rendu ; une colonne sans lien actif est masquée.
 * La colonne « Légal » n'est pas ici : elle est déduite des fichiers de `src/content/legal/` (voir `legalPages`).
 * Contact : actif seulement si la valeur existe dans `site.contact`.
 */
export const footerGroups: FooterGroup[] = [
  {
    title: "Produit",
    links: [
      { label: "Documents", href: `#${sectionIds.documents}`, enabled: true },
      { label: "Fonctionnalités", href: `#${sectionIds.features}`, enabled: true },
      { label: "Tarifs", href: `#${sectionIds.pricing}`, enabled: true },
      { label: "FAQ", href: `#${sectionIds.faq}`, enabled: true },
    ],
  },
  {
    title: "Application",
    links: [
      { label: "Se connecter", href: site.links.login, enabled: true },
      { label: "Créer un compte", href: site.links.signup, enabled: true },
      { label: "Vérifier un document", href: site.links.verify, external: true, enabled: true },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "WhatsApp", href: whatsappLink ?? "", external: true, enabled: whatsappLink !== null },
      { label: "E-mail", href: emailLink ?? "", enabled: emailLink !== null },
    ],
  },
];

/**
 * Pages légales (étape 11). Les textes vivent dans `src/content/legal/<slug>.md`. Une page n'existe, et son lien
 * n'apparaît dans le pied de page, que si son fichier a `draft: false` : aucun `enabled` à saisir ici.
 * Ordre = ordre d'affichage dans le pied de page.
 */
export const legalGroupTitle = "Légal";
export const legalPages = [
  { slug: "confidentialite", label: "Confidentialité" },
  { slug: "conditions", label: "Conditions d’utilisation" },
  { slug: "cookies", label: "Cookies" },
] as const;
