window.NikaTournamentMotion = {
  init() {
    const section = document.querySelector('[data-tournament-motion]');
    if (!section) return;

    const stage = section.querySelector('.tournament-hub__stage');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    let pointerFrame = 0;

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const resetPointer = () => {
      section.style.setProperty('--tournament-shift-x', '0px');
      section.style.setProperty('--tournament-shift-y', '0px');
      section.style.setProperty('--league-rotate-x', '0deg');
      section.style.setProperty('--league-rotate-y', '0deg');
      section.style.setProperty('--mascot-shift-x', '0px');
      section.style.setProperty('--mascot-shift-y', '0px');
      section.style.setProperty('--league-glow-x', '38%');
      section.style.setProperty('--league-glow-y', '28%');
    };

    section.classList.add('is-motion-ready');

    if (reducedMotion.matches) {
      section.classList.add('is-in-view');
      resetPointer();
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        section.classList.add('is-in-view');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px'
    });

    revealObserver.observe(section);

    if (!finePointer.matches || !stage) {
      resetPointer();
      return;
    }

    section.addEventListener('pointermove', event => {
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const x = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
        const y = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);

        section.style.setProperty('--tournament-shift-x', `${(x * 12).toFixed(2)}px`);
        section.style.setProperty('--tournament-shift-y', `${(y * 8).toFixed(2)}px`);
        section.style.setProperty('--league-rotate-x', `${(-y * 1.15).toFixed(2)}deg`);
        section.style.setProperty('--league-rotate-y', `${(x * 1.35).toFixed(2)}deg`);
        section.style.setProperty('--mascot-shift-x', `${(x * 8).toFixed(2)}px`);
        section.style.setProperty('--mascot-shift-y', `${(y * 6).toFixed(2)}px`);
        section.style.setProperty('--league-glow-x', `${(38 + x * 16).toFixed(2)}%`);
        section.style.setProperty('--league-glow-y', `${(28 + y * 12).toFixed(2)}%`);
      });
    }, { passive: true });

    section.addEventListener('pointerleave', () => {
      cancelAnimationFrame(pointerFrame);
      resetPointer();
    });
  }
};
