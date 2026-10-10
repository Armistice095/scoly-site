/**
 * Lecteur du cadre vidéo (VideoFrame.astro).
 * - Lecture automatique seulement quand le cadre est visible ; pause dès qu'il sort de l'écran.
 * - Pas de lecture automatique avec prefers-reduced-motion ni avec saveData : poster + bouton de lecture.
 * - Bouton lecture / pause (WCAG 2.2.2) : libellé en français qui suit l'état.
 * Un choix explicite de la personne (lire ou mettre en pause) prime sur le comportement automatique.
 */
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
const autoplayAllowed = !reduced && !saveData;

document.querySelectorAll<HTMLElement>("[data-video-frame]").forEach((frame) => {
  const video = frame.querySelector<HTMLVideoElement>("video");
  const button = frame.querySelector<HTMLButtonElement>("[data-video-toggle]");
  if (!video || !button) return;

  // null : pas de choix explicite ; true : la personne a lancé la lecture ; false : elle l'a mise en pause
  let wantsPlay: boolean | null = null;

  const render = () => {
    const playing = !video.paused;
    button.dataset.playing = String(playing);
    button.setAttribute("aria-label", playing ? "Mettre la vidéo en pause" : "Lire la vidéo");
  };
  const play = () => {
    // play() est rejeté si le navigateur refuse (économie d'énergie, etc.) : on reste simplement sur le poster
    video.play().catch(() => {});
  };

  video.addEventListener("play", render);
  video.addEventListener("pause", render);
  render();

  button.addEventListener("click", () => {
    if (video.paused) {
      wantsPlay = true;
      play();
    } else {
      wantsPlay = false;
      video.pause();
    }
  });

  new IntersectionObserver(
    (entries) => {
      if (!entries[entries.length - 1].isIntersecting) {
        video.pause();
      } else if (wantsPlay === true || (wantsPlay === null && autoplayAllowed)) {
        play();
      }
    },
    { threshold: 0.35 },
  ).observe(frame);
});
