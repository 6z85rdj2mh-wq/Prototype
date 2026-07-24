window.NikaHeroSplit = {
  init() {
    const hero = document.querySelector('[data-split-hero]');
    if (!hero) return;

    const stage = hero.querySelector('.hero-stage');
    const panels = [...hero.querySelectorAll('[data-hero-panel]')];
    const path = hero.querySelector('[data-divider-path]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');

    let current = null;
    let raf = null;

    const setActive = (side) => {
      current = side;
      if (side) stage.dataset.active = side;
      else delete stage.dataset.active;
    };

    const resetPath = () => {
      if (!path) return;
      path.setAttribute('d', 'M45 0 C45 240 45 760 45 1000');
    };

    panels.forEach(panel => {
      const side = panel.dataset.heroPanel;

      panel.addEventListener('mouseenter', () => {
        if (!coarsePointer.matches) setActive(side);
      });
      panel.addEventListener('focusin', () => setActive(side));

      panel.addEventListener('click', (event) => {
        if (!coarsePointer.matches) return;
        if (event.target.closest('a, button')) return;
        if (current !== side) {
          event.preventDefault();
          setActive(side);
        }
      });
    });

    stage.addEventListener('mouseleave', () => {
      if (!coarsePointer.matches) setActive(null);
      resetPath();
    });

    stage.addEventListener('pointermove', (event) => {
      if (!path || reducedMotion.matches || coarsePointer.matches) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        const centerY = Math.round(y * 1000);
        const panelDirection = current === 'store' ? 1 : current === 'editorial' ? -1 : 0;
        const pointerOffset = ((event.clientX - (rect.left + rect.width / 2)) / rect.width) * 16;
        const bend = Math.max(-18, Math.min(18, panelDirection * 12 + pointerOffset));
        const c1 = Math.max(120, centerY - 230);
        const c2 = Math.min(880, centerY + 230);
        path.setAttribute('d', `M45 0 C45 ${c1} ${45 + bend} ${Math.max(120, centerY - 70)} ${45 + bend} ${centerY} C${45 + bend} ${Math.min(880, centerY + 70)} 45 ${c2} 45 1000`);
      });
    });
  }
};
