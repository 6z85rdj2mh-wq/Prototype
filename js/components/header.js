window.NikaHeader = {
  init() {
    const header = document.querySelector('[data-site-header]');
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    if (!header) return;

    const navLinks = [...header.querySelectorAll('.desktop-nav a, .mobile-menu a')];
    let scrollFrame = 0;
    let closeTimer = 0;
    let activeSection = null;

    const setActiveSection = (sectionId) => {
      activeSection = sectionId || null;
      navLinks.forEach(link => {
        const isActive = activeSection && link.getAttribute('href') === `#${activeSection}`;
        link.classList.toggle('is-active', Boolean(isActive));
        if (isActive) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };

    const updateHeader = () => {
      scrollFrame = 0;
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    const requestHeaderUpdate = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(updateHeader);
    };

    updateHeader();
    window.addEventListener('scroll', requestHeaderUpdate, { passive: true });

    window.addEventListener('nika:herochange', event => {
      if (window.scrollY > Math.max(160, window.innerHeight * 0.52)) return;
      setActiveSection(event.detail?.side || null);
    });

    const tournamentSection = document.querySelector('#tournaments');
    if (tournamentSection && 'IntersectionObserver' in window) {
      const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection('tournaments');
          else if (activeSection === 'tournaments' && window.scrollY < window.innerHeight * 0.72) setActiveSection(null);
        });
      }, {
        threshold: 0,
        rootMargin: '-32% 0px -52% 0px'
      });
      sectionObserver.observe(tournamentSection);
    }

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const href = link.getAttribute('href');
        if (href?.startsWith('#')) setActiveSection(href.slice(1));
      });
    });

    if (!toggle || !menu) return;

    const openMenu = () => {
      clearTimeout(closeTimer);
      menu.hidden = false;
      toggle.setAttribute('aria-expanded', 'true');
      document.body.classList.add('menu-open');
      requestAnimationFrame(() => menu.classList.add('is-open'));
    };

    const closeMenu = (immediate = false) => {
      clearTimeout(closeTimer);
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      document.body.classList.remove('menu-open');

      if (immediate) {
        menu.hidden = true;
        return;
      }

      closeTimer = window.setTimeout(() => {
        if (toggle.getAttribute('aria-expanded') !== 'true') menu.hidden = true;
      }, 560);
    };

    toggle.addEventListener('click', () => {
      const willOpen = toggle.getAttribute('aria-expanded') !== 'true';
      if (willOpen) openMenu();
      else closeMenu();
    });

    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => closeMenu()));

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
        toggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMenu(true);
    }, { passive: true });
  }
};
