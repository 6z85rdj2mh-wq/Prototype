window.NikaHeroSplit = {
  init() {
    const hero = document.querySelector('[data-split-hero]');
    if (!hero) return;

    const stage = hero.querySelector('[data-hero-stage]') || hero.querySelector('.hero-stage');
    const panels = [...hero.querySelectorAll('[data-hero-panel]')];
    const path = hero.querySelector('[data-divider-path]');
    const mobileFocus = hero.querySelector('.hero-mobile-focus');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointer = window.matchMedia('(pointer: coarse)');

    if (!stage || panels.length < 2) return;

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const motion = {
      pointerX: 0,
      pointerY: 0,
      targetPointerX: 0,
      targetPointerY: 0,
      pointerVelocityX: 0,
      pointerVelocityY: 0,
      dividerCenter: 500,
      dividerBend: 0,
      targetDividerCenter: 500,
      targetDividerBend: 0,
      dividerVelocityCenter: 0,
      dividerVelocityBend: 0,
      frame: 0,
      running: false,
      lastTime: 0
    };

    let current = null;
    let mobileFocusFrame = 0;
    let switchingTimer = 0;
    let pulseTimer = 0;

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
      path.setAttribute('d', createDividerPath(motion.dividerCenter, motion.dividerBend));
    };

    const renderPointer = () => {
      stage.style.setProperty('--pointer-shift-x', `${(-motion.pointerX * 7).toFixed(2)}px`);
      stage.style.setProperty('--pointer-shift-y', `${(-motion.pointerY * 5).toFixed(2)}px`);
      stage.style.setProperty('--pointer-light-x', `${(50 + motion.pointerX * 13).toFixed(2)}%`);
      stage.style.setProperty('--pointer-light-y', `${(48 + motion.pointerY * 9).toFixed(2)}%`);
    };

    const springStep = (value, velocity, target, stiffness, damping, frameScale) => {
      const nextVelocity = (velocity + (target - value) * stiffness * frameScale) * Math.pow(damping, frameScale);
      return {
        value: value + nextVelocity * frameScale,
        velocity: nextVelocity
      };
    };

    const stopMotion = () => {
      if (motion.frame) cancelAnimationFrame(motion.frame);
      motion.frame = 0;
      motion.running = false;
      motion.lastTime = 0;
    };

    const animateMotion = (time) => {
      if (reducedMotion.matches) {
        motion.pointerX = motion.targetPointerX;
        motion.pointerY = motion.targetPointerY;
        motion.dividerCenter = motion.targetDividerCenter;
        motion.dividerBend = motion.targetDividerBend;
        motion.pointerVelocityX = 0;
        motion.pointerVelocityY = 0;
        motion.dividerVelocityCenter = 0;
        motion.dividerVelocityBend = 0;
        renderPointer();
        renderDivider();
        stopMotion();
        return;
      }

      const elapsed = motion.lastTime ? time - motion.lastTime : 16.67;
      const frameScale = clamp(elapsed / 16.67, 0.55, 1.8);
      motion.lastTime = time;

      const pointerX = springStep(
        motion.pointerX,
        motion.pointerVelocityX,
        motion.targetPointerX,
        0.075,
        0.77,
        frameScale
      );
      const pointerY = springStep(
        motion.pointerY,
        motion.pointerVelocityY,
        motion.targetPointerY,
        0.075,
        0.77,
        frameScale
      );
      motion.pointerX = pointerX.value;
      motion.pointerVelocityX = pointerX.velocity;
      motion.pointerY = pointerY.value;
      motion.pointerVelocityY = pointerY.velocity;

      if (!coarsePointer.matches && path) {
        const center = springStep(
          motion.dividerCenter,
          motion.dividerVelocityCenter,
          motion.targetDividerCenter,
          0.095,
          0.73,
          frameScale
        );
        const bend = springStep(
          motion.dividerBend,
          motion.dividerVelocityBend,
          motion.targetDividerBend,
          0.1,
          0.71,
          frameScale
        );

        motion.dividerCenter = clamp(center.value, 145, 855);
        motion.dividerVelocityCenter = center.velocity;
        motion.dividerBend = clamp(bend.value, -18, 18);
        motion.dividerVelocityBend = bend.velocity;
      }

      renderPointer();
      renderDivider();

      const pointerSettled =
        Math.abs(motion.targetPointerX - motion.pointerX) < 0.0015 &&
        Math.abs(motion.targetPointerY - motion.pointerY) < 0.0015 &&
        Math.abs(motion.pointerVelocityX) < 0.001 &&
        Math.abs(motion.pointerVelocityY) < 0.001;

      const dividerSettled = coarsePointer.matches || !path || (
        Math.abs(motion.targetDividerCenter - motion.dividerCenter) < 0.07 &&
        Math.abs(motion.targetDividerBend - motion.dividerBend) < 0.035 &&
        Math.abs(motion.dividerVelocityCenter) < 0.035 &&
        Math.abs(motion.dividerVelocityBend) < 0.025
      );

      if (pointerSettled && dividerSettled) {
        motion.pointerX = motion.targetPointerX;
        motion.pointerY = motion.targetPointerY;
        motion.dividerCenter = motion.targetDividerCenter;
        motion.dividerBend = motion.targetDividerBend;
        motion.pointerVelocityX = 0;
        motion.pointerVelocityY = 0;
        motion.dividerVelocityCenter = 0;
        motion.dividerVelocityBend = 0;
        renderPointer();
        renderDivider();
        stopMotion();
        return;
      }

      motion.frame = requestAnimationFrame(animateMotion);
    };

    const wakeMotion = () => {
      if (motion.running) return;
      motion.running = true;
      motion.frame = requestAnimationFrame(animateMotion);
    };

    const activeBend = (side) => {
      if (side === 'store') return 8;
      if (side === 'editorial') return -8;
      return 0;
    };

    const setPointerTarget = (x = 0, y = 0) => {
      motion.targetPointerX = clamp(x, -1, 1);
      motion.targetPointerY = clamp(y, -1, 1);
      wakeMotion();
    };

    const setDividerTarget = (center = 500, bend = 0) => {
      motion.targetDividerCenter = clamp(center, 145, 855);
      motion.targetDividerBend = clamp(bend, -18, 18);
      wakeMotion();
    };

    const updateMobileFocus = (side) => {
      if (!coarsePointer.matches || !side || !mobileFocus) return;
      const panel = panels.find(item => item.dataset.heroPanel === side);
      if (!panel) return;

      cancelAnimationFrame(mobileFocusFrame);
      mobileFocusFrame = requestAnimationFrame(() => {
        stage.style.setProperty('--mobile-focus-y', `${panel.offsetTop}px`);
        stage.style.setProperty('--mobile-focus-height', `${panel.offsetHeight}px`);
      });
    };

    const markSwitching = () => {
      clearTimeout(switchingTimer);
      stage.classList.remove('is-switching');
      // Force a fresh animation even when users switch quickly.
      void stage.offsetWidth;
      stage.classList.add('is-switching');
      switchingTimer = window.setTimeout(() => stage.classList.remove('is-switching'), 920);
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

      markSwitching();
      window.dispatchEvent(new CustomEvent('nika:herochange', {
        detail: { side: side || null }
      }));
    };

    const triggerMobilePulse = (panel, event) => {
      if (!coarsePointer.matches || reducedMotion.matches || !mobileFocus) return;

      const rect = panel.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 0, 100);
      const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 0, 100);
      mobileFocus.style.setProperty('--mobile-tap-x', `${x.toFixed(2)}%`);
      mobileFocus.style.setProperty('--mobile-tap-y', `${y.toFixed(2)}%`);

      clearTimeout(pulseTimer);
      mobileFocus.classList.remove('is-pulsing');
      void mobileFocus.offsetWidth;
      mobileFocus.classList.add('is-pulsing');
      pulseTimer = window.setTimeout(() => mobileFocus.classList.remove('is-pulsing'), 760);
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

      panel.addEventListener('pointerdown', (event) => {
        if (!coarsePointer.matches || event.target.closest('a, button')) return;
        triggerMobilePulse(panel, event);
      }, { passive: true });

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
      setPointerTarget(0, 0);
      setDividerTarget(500, 0);
    });

    stage.addEventListener('pointermove', (event) => {
      if (reducedMotion.matches || coarsePointer.matches) return;

      const rect = stage.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const normalizedX = clamp(((event.clientX - rect.left) / rect.width) * 2 - 1, -1, 1);
      const normalizedY = clamp(((event.clientY - rect.top) / rect.height) * 2 - 1, -1, 1);

      setPointerTarget(normalizedX, normalizedY);

      const centerY = 500 + normalizedY * 270;
      const panelDirection = current === 'store' ? 1 : current === 'editorial' ? -1 : 0;
      const bend = panelDirection * 8 + normalizedX * 5;
      setDividerTarget(centerY, bend);
    }, { passive: true });

    const resetTouchStateWhenHidden = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (!entry.isIntersecting && coarsePointer.matches) setActive(null);
    }, { threshold: 0.08 });

    resetTouchStateWhenHidden.observe(hero);

    const handlePointerModeChange = () => {
      stopMotion();
      motion.pointerX = 0;
      motion.pointerY = 0;
      motion.targetPointerX = 0;
      motion.targetPointerY = 0;
      motion.pointerVelocityX = 0;
      motion.pointerVelocityY = 0;
      motion.dividerCenter = 500;
      motion.targetDividerCenter = 500;
      motion.dividerBend = 0;
      motion.targetDividerBend = 0;
      motion.dividerVelocityCenter = 0;
      motion.dividerVelocityBend = 0;
      renderPointer();
      renderDivider();
      if (coarsePointer.matches && current) updateMobileFocus(current);
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

    renderPointer();
    renderDivider();
  }
};
