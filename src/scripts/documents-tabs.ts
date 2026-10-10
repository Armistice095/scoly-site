/**
 * Section « Documents » : onglets accessibles (motif ARIA tablist / tab / tabpanel).
 * Activation automatique au focus : flèches gauche / droite (avec retour), Début, Fin ; un seul onglet
 * dans l'ordre de tabulation (tabindex itinérant). Les panneaux sont déjà dans le HTML (hidden) :
 * un changement d'onglet ne charge rien. Fondu court posé par la classe `docs-in` (le CSS le désactive
 * en prefers-reduced-motion ; le défilement de la pilule aussi).
 */
export {}; // module (évite les collisions de noms globaux avec les autres scripts)

const root = document.querySelector<HTMLElement>("[data-docs]");
const list = root?.querySelector<HTMLElement>('[role="tablist"]');

if (root && list) {
  const tabs = Array.from(list.querySelectorAll<HTMLElement>('[role="tab"]'));
  const panels = tabs.map((t) => document.getElementById(t.getAttribute("aria-controls") ?? ""));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  let current = Math.max(
    0,
    tabs.findIndex((t) => t.getAttribute("aria-selected") === "true"),
  );

  // Amène l'onglet actif au centre de la pilule quand elle défile (mobile, tablette)
  const bringIntoView = (tab: HTMLElement, smooth: boolean) => {
    if (list.scrollWidth <= list.clientWidth) return;
    const left = tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2;
    list.scrollTo({ left, behavior: smooth && !reduced.matches ? "smooth" : "auto" });
  };

  const select = (index: number, focus: boolean) => {
    if (index === current) {
      if (focus) tabs[index].focus();
      return;
    }
    current = index;
    tabs.forEach((tab, i) => {
      const on = i === index;
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.tabIndex = on ? 0 : -1;
      const panel = panels[i];
      if (!panel) return;
      panel.classList.remove("docs-in");
      panel.hidden = !on;
      if (on && !reduced.matches) {
        void panel.offsetWidth; // relance l'animation même sur une relecture rapide
        panel.classList.add("docs-in");
      }
    });
    if (focus) tabs[index].focus({ preventScroll: true });
    bringIntoView(tabs[index], true);
  };

  tabs.forEach((tab, i) => tab.addEventListener("click", () => select(i, false)));

  list.addEventListener("keydown", (event) => {
    const i = tabs.indexOf(document.activeElement as HTMLElement);
    if (i < 0) return;
    let next = -1;
    if (event.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (event.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    event.preventDefault();
    select(next, true);
  });

  bringIntoView(tabs[current], false);
}
