/**
 * Données structurées JSON-LD de la page d'accueil : un seul bloc @graph, construit à partir de
 * site.ts, pricing.ts et faq.ts. Aucun texte n'est écrit en dur ici, aucun avis ni aucune note.
 */
import { site, sectionIds } from "../config/site";
import { plans, formatAmount, pricingCopy, type Plan } from "../config/pricing";
import { faqItems } from "../config/faq";
import { seo } from "../config/seo";

const abs = (path: string) => new URL(path, site.url).href;
/** Texte brut sur une seule ligne, espaces insécables remplacés par des espaces ordinaires. */
const plain = (s: string) => s.replace(/[  ]/g, " ").replace(/\s+/g, " ").trim();

const ids = {
  org: `${site.url}/#organization`,
  website: `${site.url}/#website`,
  app: `${site.url}/#application`,
};

function offerFor(plan: Plan) {
  const url = plan.cta.destination === "signup" ? site.links.signup : `${site.url}/#${sectionIds.pricing}`;
  const base = { "@type": "Offer", name: plan.name, description: plain(plan.description), url, priceCurrency: "XOF" };
  const annual = { billingDuration: "P1Y", referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "ANN" } };
  if (plan.amount === 0) {
    return { ...base, price: 0 };
  }
  if (plan.from) {
    // « À partir de » : prix minimum, pas de prix exact
    return {
      ...base,
      description: plain(`${pricingCopy.fromLabel} ${formatAmount(plan.amount)} ${pricingCopy.currency} par an. ${plan.description}`),
      priceSpecification: { "@type": "UnitPriceSpecification", minPrice: plan.amount, priceCurrency: "XOF", ...annual },
    };
  }
  return {
    ...base,
    price: plan.amount,
    priceSpecification: { "@type": "UnitPriceSpecification", price: plan.amount, priceCurrency: "XOF", ...annual },
  };
}

export function buildJsonLd() {
  const lowPrice = Math.min(...plans.map((p) => p.amount));
  const organization: Record<string, unknown> = {
    "@type": "Organization",
    "@id": ids.org,
    name: site.name,
    url: site.url,
    logo: abs(seo.logoPath),
    areaServed: { "@type": "Country", name: "Bénin" },
  };
  if (site.contact.email) organization.email = site.contact.email;

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization,
      {
        "@type": "WebSite",
        "@id": ids.website,
        name: site.name,
        url: site.url,
        inLanguage: "fr",
        publisher: { "@id": ids.org },
      },
      {
        "@type": "SoftwareApplication",
        "@id": ids.app,
        name: site.name,
        url: site.appUrl,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        inLanguage: "fr",
        description: seo.description,
        publisher: { "@id": ids.org },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "XOF",
          lowPrice,
          offerCount: plans.length,
          offers: plans.map(offerFor),
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faqItems.map((q) => ({
          "@type": "Question",
          name: plain(q.question),
          acceptedAnswer: { "@type": "Answer", text: plain(q.answer) },
        })),
      },
    ],
  };
}
