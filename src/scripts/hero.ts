import { gsap } from "gsap";

/**
 * Animation d'entrée du Hero : titre, sous-titre, boutons, puis cadre vidéo, en cascade courte (~0,8 s).
 * État initial (masqué) posé en CSS par Hero.astro, seulement avec la classe .js : sans JavaScript,
 * le contenu reste visible. Pas d'animation avec prefers-reduced-motion (le CSS laisse alors tout visible).
 */
const root = document.querySelector<HTMLElement>("[data-hero]");
const items = root ? Array.from(root.querySelectorAll<HTMLElement>("[data-hero-item]")) : [];
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (root && items.length && !reduced) {
  gsap.fromTo(
    items,
    {
      opacity: 0,
      y: 18,
      // Le cadre vidéo gagne en plus une très légère mise à l'échelle
      scale: (_i: number, el: Element) => (el.hasAttribute("data-hero-frame") ? 0.985 : 1),
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.1,
      onComplete: () => {
        // On rend la main au CSS : plus de style en ligne, l'état final ne dépend plus de GSAP
        root.dataset.heroReady = "";
        gsap.set(items, { clearProps: "opacity,transform" });
      },
    },
  );
}
