window.NikaHeroSplit = {
  init() {
    const hero = document.querySelector('[data-split-hero]');
    if (!hero) return;

    const stage = hero.querySelector('[data-hero-stage]') || hero.querySelector('.hero-stage');
    const panels = [...hero.querySelectorAll('[data-hero-panel]')];
    const path = hero.querySelector('[data-divider-path]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');

    if (!stage || panels.length < 2) return;

    const neutralPath = 'M45 0 C45 240 45 760 45 1000';
    let current = null;
    let pointerFrame = 0;
    let resetFrame = 0;

    const setActive = (side) => {
      current = side;

      if (side) {
        stage.dataset.active = side;
      } else {
        delete stage.dataset.active;
      }
    };

    const setPointerVariables = (x = 0, y = 0) => {
      stage.style.setProperty('--pointer-shift-x', `${(-x * 7).toFixed(2)}px`);
      stage.style.setProperty('--pointer-shift-y', `${(-y * 5).toFixed(2)}px`);
      stage.style.setProperty('--pointer-light-x', `${(50 + x * 13).toFixed(2)}%`);
      stage.style.setProperty('--pointer-light-y', `${(48 + y * 9).toFixed(2)}%`);
    };

    const createDividerPath = (centerY, bend) => {
      const c1 = Math.max(120, centerY - 230);
      const c2 = Math.min(880, centerY + 230);
      const upper = Math.max(120, centerY - 70);
      const lower = Math.min(880, centerY + 70);
      const x = 45 + bend;

      return `M45 0 C45 ${c1} ${x} ${upper} ${x} ${centerY} C${x} ${lower} 45 ${c2} 45 1000`;
    };

    const resetDivider = () => {
      if (!path) return;
      cancelAnimationFrame(resetFrame);

      const start = performance.now();
      const duration = reducedMotion.matches ? 1 : 420;

      const animate = (now) => {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const bend = (1 - eased) * (current === 'store' ? 10 : current === 'editorial' ? -10 : 0);
        const currentPath = createDividerPath(500, bend);
        path.setAttribute('d', progress >= 1 ? neutralPath : currentPath);

        if (progress < 1) resetFrame = requestAnimationFrame(animate);
      };

      resetFrame = requestAnimationFrame(animate);
    };

    panels.forEach((panel, panelIndex) => {
      const side = panel.dataset.heroPanel;

      panel.addEventListener('mouseenter', () => {
        if (!coarsePointer.matches) setActive(side);
      });

      panel.addEventListener('focusin', () => setActive(side));

      panel.addEventListener('focusout', (event) => {
        if (!stage.contains(event.relatedTarget) && !coarsePointer.matches) {
          setActive(null);
          resetDivider();
        }
      });

      panel.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          setActive(null);
          panel.blur();
          resetDivider();
          return;
        }

        if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(event.key)) return;

        event.preventDefault();
        const nextIndex = event.key === 'ArrowLeft' || event.key === 'ArrowUp'
          ? Math.max(0, panelIndex - 1)
          : Math.min(panels.length - 1, panelIndex + 1);

        panels[nextIndex].focus();
        setActive(panels[nextIndex].dataset.heroPanel);
      });

      panel.addEventListener('click', (event) => {
        if (!coarsePointer.matches || event.target.closest('a, button')) return;

        if (current !== side) {
          event.preventDefault();
          setActive(side);
        }
      });
    });

    stage.addEventListener('mouseleave', () => {
      if (!coarsePointer.matches) setActive(null);
      setPointerVariables();
      resetDivider();
    });

    stage.addEventListener('pointermove', (event) => {
      if (reducedMotion.matches || coarsePointer.matches) return;

      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        const normalizedX = Math.max(-1, Math.min(1, ((event.clientX - rect.left) / rect.width) * 2 - 1));
        const normalizedY = Math.max(-1, Math.min(1, ((event.clientY - rect.top) / rect.height) * 2 - 1));

        setPointerVariables(normalizedX, normalizedY);

        if (!path) return;

        const centerY = Math.round(((normalizedY + 1) / 2) * 1000);
        const panelDirection = current === 'store' ? 1 : current === 'editorial' ? -1 : 0;
        const bend = Math.max(-18, Math.min(18, panelDirection * 11 + normalizedX * 7));
        path.setAttribute('d', createDividerPath(centerY, bend));
      });
    });

    const resetTouchStateWhenHidden = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting && coarsePointer.matches) setActive(null);
    }, { threshold: 0.08 });

    resetTouchStateWhenHidden.observe(hero);
    setPointerVariables();
    if (path) path.setAttribute('d', neutralPath);
  }
};
