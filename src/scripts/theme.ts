/**
 * Bascule clair / sombre.
 * Le script anti-flash du <head> (Base.astro) applique le thème avant le rendu ;
 * ce module gère les boutons [data-theme-toggle], la mémorisation et aria-pressed.
 */
const root = document.documentElement;

function isDark(): boolean {
  return root.classList.contains("dark");
}

function sync(): void {
  const dark = isDark();
  document.querySelectorAll<HTMLElement>("[data-theme-toggle]").forEach((el) => {
    // Bouton dont le libellé annonce l'action (data-label-to-dark / data-label-to-light) :
    // pas d'aria-pressed en plus (état et libellé changeants se contredisent pour un lecteur d'écran).
    const label = dark ? el.dataset.labelToLight : el.dataset.labelToDark;
    if (label) {
      el.setAttribute("aria-label", label);
      el.removeAttribute("aria-pressed");
    } else {
      el.setAttribute("aria-pressed", String(dark));
    }
  });
  document
    .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? "#171b24" : "#f7f8fa");
}

function setTheme(dark: boolean, persist: boolean): void {
  root.classList.toggle("dark", dark);
  if (persist) {
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  }
  sync();
}

// Délégation : fonctionne aussi pour les boutons ajoutés plus tard (navbar, menu mobile)
document.addEventListener("click", (e) => {
  const target = e.target as Element | null;
  if (target?.closest("[data-theme-toggle]")) setTheme(!isDark(), true);
});

// Choix fait dans un autre onglet
window.addEventListener("storage", (e) => {
  if (e.key === "theme" && e.newValue) setTheme(e.newValue === "dark", false);
});

// Sans choix mémorisé, on suit le réglage du système
matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  let saved: string | null = null;
  try {
    saved = localStorage.getItem("theme");
  } catch {}
  if (!saved) setTheme(e.matches, false);
});

sync();
