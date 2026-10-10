/**
 * Barre de navigation : état au scroll, lien actif (scrollspy) et menu mobile.
 * Aucune dépendance. Le HTML de Navbar.astro reste utilisable sans ce script (version bureau).
 */
const nav = document.querySelector<HTMLElement>("[data-navbar]");

if (nav) {
  /* ───────────── 1. État « pilule » après ~40 px de scroll ───────────── */
  const SCROLL_THRESHOLD = 40;
  let frame = 0;

  const updateScrolled = () => {
    frame = 0;
    nav.toggleAttribute("data-scrolled", window.scrollY > SCROLL_THRESHOLD);
  };
  window.addEventListener(
    "scroll",
    () => {
      if (!frame) frame = requestAnimationFrame(updateScrolled);
    },
    { passive: true },
  );
  updateScrolled();

  /* ───────────── 2. Lien actif (scrollspy) ─────────────
     Une bande étroite à 35 % de la hauteur de l'écran : la section qui la traverse est « la section en cours ».
     Aucune section de la liste dans la bande (haut de page, section sans lien) : aucun lien actif. */
  const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[data-nav-section]"));
  const sections = Array.from(new Set(links.map((a) => a.dataset.navSection as string)))
    .map((id) => document.getElementById(id))
    .filter((el): el is HTMLElement => el !== null)
    .sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));

  if (sections.length) {
    const inBand = new Set<string>();

    const setActive = () => {
      // Si la bande touche deux sections à la fois, on garde la plus basse (celle qui vient de passer sous le haut)
      const current = [...sections].reverse().find((s) => inBand.has(s.id))?.id ?? null;
      links.forEach((a) => {
        if (a.dataset.navSection === current) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    };

    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) inBand.add(e.target.id);
          else inBand.delete(e.target.id);
        });
        setActive();
      },
      { rootMargin: "-35% 0px -64% 0px", threshold: 0 },
    );
    sections.forEach((s) => spy.observe(s));
  }

  /* ───────────── 3. Menu mobile / tablette ───────────── */
  const button = nav.querySelector<HTMLButtonElement>("[data-menu-button]");
  const panel = nav.querySelector<HTMLElement>("[data-menu-panel]");

  if (button && panel) {
    const desktop = window.matchMedia("(min-width: 1100px)");

    const setOpen = (open: boolean, restoreFocus = false) => {
      panel.hidden = !open;
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
      nav.toggleAttribute("data-menu-open", open);
      if (restoreFocus) button.focus({ preventScroll: true });
    };
    const isOpen = () => !panel.hidden;

    button.addEventListener("click", () => setOpen(!isOpen()));

    // Clic sur un lien du panneau : on ferme (le défilement vers l'ancre est géré par motion.ts)
    panel.addEventListener("click", (e) => {
      if ((e.target as Element).closest("a")) setOpen(false, true);
    });

    // Échap : on ferme et le focus revient sur le bouton menu
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) {
        e.preventDefault();
        setOpen(false, true);
      }
    });

    // Clic en dehors de la barre
    document.addEventListener("pointerdown", (e) => {
      if (isOpen() && !nav.contains(e.target as Node)) setOpen(false);
    });

    // Le focus clavier quitte la barre (Tab après le dernier lien) : on ferme
    nav.addEventListener("focusout", (e) => {
      const next = e.relatedTarget as Node | null;
      if (isOpen() && next && !nav.contains(next)) setOpen(false);
    });

    // Passage à la version bureau
    desktop.addEventListener("change", (e) => {
      if (e.matches) setOpen(false);
    });
  }
}
