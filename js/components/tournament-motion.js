window.NikaTournamentMotion = {
  init() {
    const section = document.querySelector('[data-tournament-motion]');
    if (!section) return;

    const stage = section.querySelector('.tournament-hub__stage');
    const league = section.querySelector('.tournament-league');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

    const state = {
      x: 0,
      y: 0,
      lift: 0,
      targetX: 0,
      targetY: 0,
      targetLift: 0,
      frame: 0,
      running: false,
      lastTime: 0
    };

    const applyMotion = () => {
      section.style.setProperty('--tournament-shift-x', `${(state.x * 12).toFixed(2)}px`);
      section.style.setProperty('--tournament-shift-y', `${(state.y * 8).toFixed(2)}px`);
      section.style.setProperty('--league-rotate-x', `${(-state.y * 1.05).toFixed(2)}deg`);
      section.style.setProperty('--league-rotate-y', `${(state.x * 1.22).toFixed(2)}deg`);
      section.style.setProperty('--mascot-shift-x', `${(state.x * 7).toFixed(2)}px`);
      section.style.setProperty('--mascot-shift-y', `${(state.y * 5).toFixed(2)}px`);
      section.style.setProperty('--league-glow-x', `${(38 + state.x * 15).toFixed(2)}%`);
      section.style.setProperty('--league-glow-y', `${(28 + state.y * 11).toFixed(2)}%`);
      section.style.setProperty('--league-lift-motion', `${state.lift.toFixed(2)}px`);
    };

    const stop = () => {
      if (state.frame) cancelAnimationFrame(state.frame);
      state.frame = 0;
      state.running = false;
      state.lastTime = 0;
    };

    const animate = (time) => {
      const elapsed = state.lastTime ? time - state.lastTime : 16.67;
      const frameScale = clamp(elapsed / 16.67, 0.55, 1.8);
      state.lastTime = time;

      const follow = 1 - Math.pow(0.875, frameScale);
      const liftFollow = 1 - Math.pow(0.82, frameScale);

      state.x += (state.targetX - state.x) * follow;
      state.y += (state.targetY - state.y) * follow;
      state.lift += (state.targetLift - state.lift) * liftFollow;
      applyMotion();

      const settled =
        Math.abs(state.targetX - state.x) < 0.0015 &&
        Math.abs(state.targetY - state.y) < 0.0015 &&
        Math.abs(state.targetLift - state.lift) < 0.02;

      if (settled) {
        state.x = state.targetX;
        state.y = state.targetY;
        state.lift = state.targetLift;
        applyMotion();
        stop();
        return;
      }

      state.frame = requestAnimationFrame(animate);
    };

    const wake = () => {
      if (state.running || reducedMotion.matches || !finePointer.matches) return;
      state.running = true;
      state.frame = requestAnimationFrame(animate);
    };

    const setTargets = (x, y) => {
      state.targetX = clamp(x, -1, 1);
      state.targetY = clamp(y, -1, 1);
      wake();
    };

    const resetPointer = () => {
      state.targetX = 0;
      state.targetY = 0;
      state.targetLift = 0;
      if (reducedMotion.matches || !finePointer.matches) {
        state.x = 0;
        state.y = 0;
        state.lift = 0;
        applyMotion();
        stop();
        return;
      }
      wake();
    };

    section.classList.add('is-motion-ready');
    applyMotion();

    if (reducedMotion.matches) {
      section.classList.add('is-in-view', 'is-motion-settled');
      resetPointer();
      return;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        section.classList.add('is-in-view');
        window.setTimeout(() => section.classList.add('is-motion-settled'), 1380);
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.14,
      rootMargin: '0px 0px -7% 0px'
    });

    revealObserver.observe(section);

    if (!finePointer.matches || !stage) {
      resetPointer();
      return;
    }

    section.addEventListener('pointermove', event => {
      const rect = section.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      setTargets(x, y);
    }, { passive: true });

    section.addEventListener('pointerleave', resetPointer);

    if (league) {
      league.addEventListener('pointerenter', () => {
        state.targetLift = -7;
        wake();
      });
      league.addEventListener('pointerleave', () => {
        state.targetLift = 0;
        wake();
      });
      league.addEventListener('focusin', () => {
        state.targetLift = -5;
        wake();
      });
      league.addEventListener('focusout', () => {
        state.targetLift = 0;
        wake();
      });
    }
  }
};
