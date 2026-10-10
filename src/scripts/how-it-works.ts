import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Section « Comment ça marche » : la ligne qui relie les pastilles se remplit au scroll (scrub),
 * de la pastille 1 à la pastille 3 : horizontale au bureau (≥ 1024 px), verticale en dessous.
 *
 * Le remplissage est piloté par la variable CSS `--hiw-s` (0 → 1) de chaque `[data-hiw-fill]`.
 * Sans ce script, ou avec prefers-reduced-motion, la ligne reste entière : le CSS ne la vide
 * que lorsque `data-hiw-ready` est posé sur la section, et ce script ne le pose pas en mouvement réduit.
 */
gsap.registerPlugin(ScrollTrigger);

const root = document.querySelector<HTMLElement>("[data-hiw]");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (root && !reduced) {
  const list = root.querySelector<HTMLElement>("[data-hiw-list]");
  const badges = Array.from(root.querySelectorAll<HTMLElement>("[data-hiw-badge]"));
  const fills = Array.from(root.querySelectorAll<HTMLElement>("[data-hiw-fill]"));

  if (list && badges.length >= 2 && fills.length === badges.length - 1) {
    const clamp = (n: number) => Math.min(1, Math.max(0, n));
    const setFills = (values: number[]) =>
      fills.forEach((el, i) => el.style.setProperty("--hiw-s", String(clamp(values[i] ?? 0))));

    const mm = gsap.matchMedia();

    // Bureau : trois pastilles côte à côte ; la ligne se remplit d'un bloc, segment après segment.
    mm.add("(min-width: 1024px)", () => {
      const proxy = { p: 0 };
      const n = fills.length;
      setFills(new Array(n).fill(0));
      gsap.to(proxy, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: list,
          start: "top 78%",
          end: "top 48%",
          scrub: true,
        },
        onUpdate: () => setFills(fills.map((_, i) => proxy.p * n - i)),
      });
      return () => setFills(new Array(n).fill(1));
    });

    // Mobile et tablette : pastilles empilées. Le front de la ligne suit la position de lecture
    // (70 % de la hauteur de l'écran) : il atteint le centre de chaque pastille quand celle-ci y passe.
    mm.add("(max-width: 1023.98px)", () => {
      const proxy = { p: 0 };
      const n = fills.length;
      let centers: number[] = [];
      const measure = () => {
        const top = list.getBoundingClientRect().top;
        centers = badges.map((b) => {
          const r = b.getBoundingClientRect();
          return r.top - top + r.height / 2;
        });
      };
      measure();
      setFills(new Array(n).fill(0));
      gsap.to(proxy, {
        p: 1,
        ease: "none",
        scrollTrigger: {
          trigger: list,
          invalidateOnRefresh: true,
          start: () => {
            measure();
            return `top+=${Math.round(centers[0])} 70%`;
          },
          end: () => `top+=${Math.round(centers[centers.length - 1])} 70%`,
          scrub: true,
        },
        onUpdate: () => {
          const travelled = proxy.p * (centers[centers.length - 1] - centers[0]);
          setFills(fills.map((_, i) => (travelled - (centers[i] - centers[0])) / (centers[i + 1] - centers[i])));
        },
      });
      return () => setFills(new Array(n).fill(1));
    });

    // Posé en dernier : jusque-là, la ligne reste entière (aucun flash de ligne vide à l'initialisation).
    root.setAttribute("data-hiw-ready", "");
  }
}
