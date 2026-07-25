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

    const divider = {
      currentCenter: 500,
      targetCenter: 500,
      currentBend: 0,
      targetBend: 0,
      velocityCenter: 0,
      velocityBend: 0,
      frame: 0,
      running: false
    };

    let current = null;
    let pointerFrame = 0;
    let mobileFocusFrame = 0;

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const createDividerPath = (centerY, bend) => {
      const safeCenter = clamp(centerY, 145, 855);
      const safeBend = clamp(bend, -18, 18);
      const c1 = clamp(safeCenter - 230, 90, 720);
      const c2 = clamp(safeCenter + 230, 280, 910);
      const upper = clamp(safeCenter - 72, 90, 790);
      const lower = clamp(safeCenter + 72, 210, 910);
      const x = 45 + safeBend;

      return `M45 0 C45 ${c1.toFixed(2)} ${x.toFixed(2)} ${upper.toFixed(2)} ${x.toFixed(2)} ${safeCenter.toFixed(2)} C${x.toFixed(2)} ${lower.toFixed(2)} 45 ${c2.toFixed(2)} 45 1000`;
    };

    const renderDivider = () => {
      if (!path) return;
      path.setAttribute('d', createDividerPath(divider.currentCenter, divider.currentBend));
    };

    const stopDivider = () => {
      if (divider.frame) cancelAnimationFrame(divider.frame);
      divider.frame = 0;
      divider.running = false;
    };

    const animateDivider = () => {
      if (!path || coarsePointer.matches) {
        stopDivider();
        return;
      }

      if (reducedMotion.matches) {
        divider.currentCenter = divider.targetCenter;
        divider.currentBend = divider.targetBend;
        divider.velocityCenter = 0;
        divider.velocityBend = 0;
        renderDivider();
        stopDivider();
        return;
      }

      /* Un solo spring loop aggiorna il tracciato. In questo modo
         movimenti rapidi destra/sinistra non avviano tween concorrenti. */
      const stiffness = 0.13;
      const damping = 0.72;

      divider.velocityCenter =
        (divider.velocityCenter + (divider.targetCenter - divider.currentCenter) * stiffness) * damping;
      divider.velocityBend =
        (divider.velocityBend + (divider.targetBend - divider.currentBend) * stiffness) * damping;

      divider.currentCenter += divider.velocityCenter;
      divider.currentBend += divider.velocityBend;

      divider.currentCenter = clamp(divider.currentCenter, 145, 855);
      divider.currentBend = clamp(divider.currentBend, -18, 18);
      renderDivider();

      const settled =
        Math.abs(divider.targetCenter - divider.currentCenter) < 0.08 &&
        Math.abs(divider.targetBend - divider.currentBend) < 0.04 &&
        Math.abs(divider.velocityCenter) < 0.04 &&
        Math.abs(divider.velocityBend) < 0.03;

      if (settled) {
        divider.currentCenter = divider.targetCenter;
        divider.currentBend = divider.targetBend;
        divider.velocityCenter = 0;
        divider.velocityBend = 0;
        renderDivider();
        stopDivider();
        return;
      }

      divider.frame = requestAnimationFrame(animateDivider);
    };

    const wakeDivider = () => {
      if (!path || coarsePointer.matches || divider.running) return;
      divider.running = true;
      divider.frame = requestAnimationFrame(animateDivider);
    };

    const setDividerTarget = (center = 500, bend = 0) => {
      divider.targetCenter = clamp(center, 145, 855);
      divider.targetBend = clamp(bend, -18, 18);
      wakeDivider();
    };

    const activeBend = (side) => {
      if (side === 'store') return 8;
      if (side === 'editorial') return -8;
      return 0;
    };

    const updateMobileFocus = (side) => {
      if (!coarsePointer.matches || !side) return;
      const panel = panels.find(item => item.dataset.heroPanel === side);
      if (!panel) return;

      cancelAnimationFrame(mobileFocusFrame);
      mobileFocusFrame = requestAnimationFrame(() => {
        stage.style.setProperty('--mobile-focus-y', `${panel.offsetTop}px`);
        stage.style.setProperty('--mobile-focus-height', `${panel.offsetHeight}px`);
      });
    };

    const setActive = (side) => {
      if (side === current && side) return;
      current = side;

      if (side) {
        updateMobileFocus(side);
        stage.dataset.active = side;
      } else {
        delete stage.dataset.active;
      }

      if (!coarsePointer.matches) {
        setDividerTarget(500, activeBend(side));
      }
    };

    const setPointerVariables = (x = 0, y = 0) => {
      stage.style.setProperty('--pointer-shift-x', `${(-x * 7).toFixed(2)}px`);
      stage.style.setProperty('--pointer-shift-y', `${(-y * 5).toFixed(2)}px`);
      stage.style.setProperty('--pointer-light-x', `${(50 + x * 13).toFixed(2)}%`);
      stage.style.setProperty('--pointer-light-y', `${(48 + y * 9).toFixed(2)}%`);
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
        }
      });

      panel.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          setActive(null);
          panel.blur();
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
      setDividerTarget(500, 0);
    });

    stage.addEventListener('pointermove', (event) => {
      if (reducedMotion.matches || coarsePointer.matches) return;

      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const rect = stage.getBoundingClientRect();
        if (!rect.width || !rect.height) return;

        const normalizedX = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
        const normalizedY = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);

        setPointerVariables(normalizedX, normalizedY);

        const centerY = 500 + normalizedY * 270;
        const panelDirection = current === 'store' ? 1 : current === 'editorial' ? -1 : 0;
        const bend = panelDirection * 8 + normalizedX * 5;
        setDividerTarget(centerY, bend);
      });
    });

    const resetTouchStateWhenHidden = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting && coarsePointer.matches) setActive(null);
    }, { threshold: 0.08 });

    resetTouchStateWhenHidden.observe(hero);

    const handlePointerModeChange = () => {
      stopDivider();
      divider.currentCenter = 500;
      divider.targetCenter = 500;
      divider.currentBend = 0;
      divider.targetBend = 0;
      divider.velocityCenter = 0;
      divider.velocityBend = 0;
      renderDivider();
    };

    const refreshMobileFocus = () => {
      if (coarsePointer.matches && current) updateMobileFocus(current);
    };

    if ('ResizeObserver' in window) {
      const mobileFocusObserver = new ResizeObserver(refreshMobileFocus);
      mobileFocusObserver.observe(stage);
      panels.forEach(panel => mobileFocusObserver.observe(panel));
    } else {
      window.addEventListener('resize', refreshMobileFocus, { passive: true });
    }

    if (typeof coarsePointer.addEventListener === 'function') {
      coarsePointer.addEventListener('change', handlePointerModeChange);
    }

    setPointerVariables();
    renderDivider();
  }
};
