/* ======================================================
   LA TANA DI NIKA — TOURNAMENT HUB V4.4.1
====================================================== */
window.NikaTournamentHub = {
  init() {
    const root = document.querySelector('[data-tournament-hub]');
    const data = window.NIKA_TOURNAMENTS_DATA;
    const utils = window.NikaTournamentUtils;
    if (!root || !data || !utils) return;

    const player = root.querySelector('[data-stream-player]');
    const panel = root.querySelector('[data-stream-panel]');
    const toggle = root.querySelector('[data-stream-toggle]');
    const status = root.querySelector('[data-stream-status]');
    const next = root.querySelector('[data-stream-next]');

    const render = () => {
      const language = utils.getLanguage();
      const config = data.settings.twitch;
      const valid = config.enabled && config.channel && config.parent;
      const statusLabels = {
        live: 'LIVE',
        upcoming: language === 'en' ? 'NEXT LIVE' : 'PROSSIMA LIVE',
        replay: language === 'en' ? 'REPLAY' : 'REPLAY',
        offline: language === 'en' ? 'OFFLINE' : 'OFFLINE'
      };
      if (status) status.textContent = valid ? (statusLabels[config.status] || statusLabels.offline) : (language === 'en' ? 'TWITCH READY' : 'TWITCH READY');
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
        toggle.setAttribute('aria-expanded', String(!expanded));
        panel.hidden = expanded;
        root.classList.toggle('is-stream-open', !expanded);
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
