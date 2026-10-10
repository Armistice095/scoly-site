import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduced) {
  // Scroll fluide Lenis, piloté par le ticker GSAP (une seule boucle rAF)
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // Ancres internes (#features, …) via Lenis.
  // Pas d'offset : Lenis retranche déjà le scroll-margin-top de la cible (scroll-mt-24 sur chaque Section,
  // 96 px, sous la barre flottante). Ajouter un offset ici doublerait le décalage.
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector<HTMLElement>(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target);
    });
  });

  // Apparition au scroll : <div data-reveal data-delay="0.1">
  gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      delay: Number(el.dataset.delay ?? 0),
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
  });
}
