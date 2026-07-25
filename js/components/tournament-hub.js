/* ======================================================
   LA TANA DI NIKA — TOURNAMENT HUB V4.4.3
====================================================== */
window.NikaTournamentHub = {
  init() {
    const root = document.querySelector('[data-tournament-hub]');
    const data = window.NIKA_TOURNAMENTS_DATA;
    const utils = window.NikaTournamentUtils;
    if (!root || !data || !utils) return;

    const arena = root.querySelector('[data-arena-entry]');
    const stage = root.querySelector('[data-arena-stage]');
    const gateways = [...root.querySelectorAll('[data-arena-gateway]')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    requestAnimationFrame(() => arena?.classList.add('is-ready'));

    const activateGateway = side => {
      if (!stage) return;
      stage.classList.toggle('is-league-active', side === 'league');
      stage.classList.toggle('is-events-active', side === 'events');
    };

    const resetGateway = () => stage?.classList.remove('is-league-active', 'is-events-active');

    gateways.forEach(gateway => {
      const side = gateway.dataset.arenaGateway;

      gateway.addEventListener('focus', () => activateGateway(side));
      gateway.addEventListener('blur', resetGateway);

      if (!finePointer) return;

      gateway.addEventListener('pointerenter', () => activateGateway(side));
      gateway.addEventListener('pointermove', event => {
        if (reducedMotion) return;
        const rect = gateway.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        gateway.style.setProperty('--pointer-x', `${(x * 100).toFixed(1)}%`);
        gateway.style.setProperty('--pointer-y', `${(y * 100).toFixed(1)}%`);
        gateway.style.setProperty('--depth-x', `${((x - .5) * -8).toFixed(1)}px`);
        gateway.style.setProperty('--depth-y', `${((y - .5) * -6).toFixed(1)}px`);
      });
      gateway.addEventListener('pointerleave', () => {
        gateway.style.removeProperty('--pointer-x');
        gateway.style.removeProperty('--pointer-y');
        gateway.style.removeProperty('--depth-x');
        gateway.style.removeProperty('--depth-y');
      });
    });

    stage?.addEventListener('pointerleave', resetGateway);

    const player = root.querySelector('[data-stream-player]');
    const panel = root.querySelector('[data-stream-panel]');
    const toggle = root.querySelector('[data-stream-toggle]');
    const status = root.querySelector('[data-stream-status]');
    const next = root.querySelector('[data-stream-next]');
    const streamBar = root.querySelector('[data-stream-bar]');
    let closeTimer;

    const render = () => {
      const language = utils.getLanguage();
      const config = data.settings.twitch;
      const valid = Boolean(config.enabled && config.channel && config.parent);
      const streamState = valid ? (config.status || 'offline') : 'upcoming';
      const statusLabels = {
        live: 'LIVE',
        upcoming: language === 'en' ? 'NEXT LIVE' : 'PROSSIMA LIVE',
        replay: 'REPLAY',
        offline: 'OFFLINE'
      };

      root.dataset.streamState = streamState;
      if (streamBar) streamBar.dataset.streamState = streamState;
      if (status) status.textContent = valid ? (statusLabels[streamState] || statusLabels.offline) : 'TWITCH READY';

      if (next) {
        const date = new Date(config.nextLive);
        next.textContent = Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat(utils.locale(language), {
          weekday: 'long', day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
        }).format(date);
      }

      const toggleLabel = toggle?.querySelector('[data-stream-toggle-label]');
      if (toggleLabel) {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        toggleLabel.textContent = expanded
          ? (language === 'en' ? 'Close player' : 'Chiudi il player')
          : (language === 'en' ? 'Open player' : 'Apri il player');
      }

      if (!player) return;
      if (valid) {
        player.innerHTML = `<iframe src="https://player.twitch.tv/?channel=${encodeURIComponent(config.channel)}&parent=${encodeURIComponent(config.parent)}&autoplay=false" allowfullscreen title="Twitch — La Tana di Nika"></iframe>`;
      } else {
        player.innerHTML = `<div class="stream-window__placeholder"><span aria-hidden="true">▶</span><div><strong>${language === 'en' ? 'Stream window ready' : 'Finestra streaming pronta'}</strong><p>${language === 'en' ? 'Channel and domain will be added later.' : 'Canale e dominio verranno inseriti più avanti.'}</p></div></div>`;
      }
    };

    if (toggle && panel) {
      toggle.addEventListener('click', () => {
        const expanded = toggle.getAttribute('aria-expanded') === 'true';
        clearTimeout(closeTimer);
        toggle.setAttribute('aria-expanded', String(!expanded));
        root.classList.toggle('is-stream-open', !expanded);

        if (!expanded) {
          panel.hidden = false;
          requestAnimationFrame(() => panel.classList.add('is-visible'));
        } else {
          panel.classList.remove('is-visible');
          closeTimer = window.setTimeout(() => { panel.hidden = true; }, reducedMotion ? 0 : 430);
        }

        const label = toggle.querySelector('[data-stream-toggle-label]');
        if (label) label.textContent = !expanded
          ? (utils.getLanguage() === 'en' ? 'Close player' : 'Chiudi il player')
          : (utils.getLanguage() === 'en' ? 'Open player' : 'Apri il player');
      });
    }

    window.addEventListener('nika:languagechange', render);
    render();
  }
};
