/* ======================================================
   LA TANA DI NIKA — HOME EVENT NOTICE V4.4.8
====================================================== */
window.NikaHomeEventNotice = {
  init() {
    const root = document.querySelector('[data-home-event-notice]');
    const data = window.NIKA_TOURNAMENTS_DATA;
    const utils = window.NikaTournamentUtils;
    if (!root || !data || !utils || !data.localEvents?.length) return;

    const sorted = [...data.localEvents]
      .filter(event => event.date)
      .sort((a, b) => new Date(`${a.date}T${a.time || '00:00'}`) - new Date(`${b.date}T${b.time || '00:00'}`));
    const now = new Date();
    const event = sorted.find(item => new Date(`${item.date}T${item.time || '00:00'}`) >= now) || sorted.at(-1);
    if (!event) return;

    const storageKey = `nika-home-event-dismissed:${event.id}`;
    if (sessionStorage.getItem(storageKey) === '1') return;

    const render = () => {
      const language = utils.getLanguage();
      const t = (it, en) => language === 'en' ? en : it;
      root.querySelector('[data-home-event-label]').textContent = t('PROSSIMO EVENTO','NEXT EVENT');
      root.querySelector('[data-home-event-title]').textContent = utils.pick(event.title);
      root.querySelector('[data-home-event-meta]').textContent = `${utils.formatDate(event.date, { day: 'numeric', month: 'long' })} · ${event.time} · ${event.seats} ${t('posti','seats')}`;
      const link = root.querySelector('[data-home-event-link]');
      link.textContent = t('Scopri il torneo','Discover the tournament');
      link.href = `tornei/i-nostri-tornei/#${event.id}`;
      root.querySelector('[data-home-event-close]').setAttribute('aria-label', t('Chiudi promemoria','Close reminder'));
    };

    render();
    root.hidden = false;
    root.classList.add('is-ready');
    requestAnimationFrame(() => root.classList.add('is-playing'));

    root.querySelector('[data-home-event-close]').addEventListener('click', () => {
      sessionStorage.setItem(storageKey, '1');
      root.classList.add('is-closed');
    });
    window.addEventListener('nika:languagechange', render);
  }
};
