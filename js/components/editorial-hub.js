(() => {
  const init = () => {
    const entry = document.querySelector('[data-editorial-entry]');
    const stage = document.querySelector('[data-editorial-stage]');
    if (!entry || !stage || stage.dataset.initialized === 'true') return;
    stage.dataset.initialized = 'true';

    const gateways = [...stage.querySelectorAll('[data-editorial-gateway]')];
    const classes = ['is-articles-active', 'is-free-active', 'is-premium-active'];
    const activate = (name) => {
      stage.classList.remove(...classes);
      if (name) stage.classList.add(`is-${name}-active`);
    };

    gateways.forEach(gateway => {
      const name = gateway.dataset.editorialGateway;
      gateway.addEventListener('pointerenter', event => {
        if (event.pointerType === 'mouse' || event.pointerType === 'pen') activate(name);
      });
      gateway.addEventListener('focus', () => activate(name));
      gateway.addEventListener('blur', () => activate(null));
    });
    stage.addEventListener('pointerleave', () => activate(null));

    requestAnimationFrame(() => entry.classList.add('is-ready'));
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
