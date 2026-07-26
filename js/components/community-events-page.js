/* ======================================================
   LA TANA DI NIKA — I NOSTRI TORNEI PAGE V4.4.8
====================================================== */
window.NikaCommunityEventsPage = {
  init() {
    const root = document.querySelector('[data-community-events-page]');
    const data = window.NIKA_TOURNAMENTS_DATA;
    const utils = window.NikaTournamentUtils;
    if (!root || !data || !utils) return;

    const state = { prizeTierByEvent: new Map() };
    const t = (it, en) => utils.getLanguage() === 'en' ? en : it;
    const sortedEvents = () => [...data.localEvents]
      .filter(event => event.date)
      .sort((a, b) => new Date(`${a.date}T${a.time || '00:00'}`) - new Date(`${b.date}T${b.time || '00:00'}`));

    const nextEvent = () => {
      const now = new Date();
      return sortedEvents().find(event => new Date(`${event.date}T${event.time || '00:00'}`) >= now) || sortedEvents().at(-1);
    };

    const statusLabel = event => {
      const labels = {
        open: t('Iscrizioni aperte', 'Registration open'),
        upcoming: t('Prossimamente', 'Coming soon'),
        closed: t('Iscrizioni chiuse', 'Registration closed'),
        completed: t('Concluso', 'Completed')
      };
      return labels[event.status] || event.status || '';
    };

    const prizeImage = prize => {
      if (prize.image) return `<img src="${utils.resolveAsset(prize.image)}" alt="${utils.pick(prize.imageLabel || prize.reward)}">`;
      return utils.pick(prize.imageLabel || prize.reward);
    };

    const renderSpotlight = () => {
      const target = root.querySelector('[data-next-community-event]');
      const event = nextEvent();
      if (!target || !event) return;
      target.innerHTML = `
        <div class="community-spotlight__main">
          <p class="eyebrow">${t('PROSSIMO EVENTO','NEXT EVENT')}</p>
          <p class="community-spotlight__date">${utils.formatDate(event.date)} · ${event.time}</p>
          <h2>${utils.pick(event.title)}</h2>
          <p>${utils.pick(event.description)}</p>
          <div class="community-spotlight__meta">
            <span>${utils.pick(event.category)}</span>
            <span>${event.format}</span>
            <span>${event.seats} ${t('posti totali','total seats')}</span>
            <span>${event.location}</span>
          </div>
          <div class="community-spotlight__actions">
            <button class="button button--primary" type="button" data-reminder-id="${event.id}">${t('Aggiungi al calendario','Add to calendar')}</button>
            <a class="button button--ghost" href="#${event.id}">${t('Vedi evento','View event')}</a>
          </div>
        </div>
        <div class="community-spotlight__visual">
          <strong>${statusLabel(event)}</strong>
          <span>${t('Il prossimo evento viene selezionato automaticamente dal calendario.','The next event is selected automatically from the calendar.')}</span>
        </div>`;
    };

    const renderCalendar = () => {
      const target = root.querySelector('[data-community-calendar]');
      const next = nextEvent();
      if (!target) return;
      target.innerHTML = sortedEvents().map(event => `
        <button class="event-date-card${event.id === next?.id ? ' is-next' : ''}" type="button" data-scroll-event="${event.id}">
          <small>${utils.formatDate(event.date, { day: '2-digit', month: 'short' }).replace(/\./g,'')}</small>
          <strong>${utils.pick(event.title)}</strong>
          <span>${utils.pick(event.category)}</span>
        </button>`).join('');
    };

    const renderPrizeList = (event, eventIndex) => {
      const tierIndex = Math.min(state.prizeTierByEvent.get(event.id) || 0, Math.max(0, event.prizeTiers.length - 1));
      const tier = event.prizeTiers[tierIndex];
      const switches = event.prizeTiers.map((item, index) => `
        <button type="button" data-prize-event="${event.id}" data-prize-tier="${index}" aria-pressed="${index === tierIndex}">${utils.pick(item.label)}</button>`).join('');
      const prizes = tier?.prizes?.map(prize => `
        <div class="event-prize-row">
          <strong>${prize.placement}</strong>
          <div class="event-prize-row__image">${prizeImage(prize)}</div>
          <div class="event-prize-row__copy"><strong>${utils.pick(prize.reward)}</strong><span>${t('Premio evento','Event prize')}</span></div>
        </div>`).join('') || '';
      return `<div class="event-prize-switch">${switches}</div><div class="event-prize-list" data-prize-list="${eventIndex}">${prizes}</div>`;
    };

    const renderEvents = () => {
      const target = root.querySelector('[data-community-events-list]');
      if (!target) return;
      target.innerHTML = sortedEvents().map((event, index) => `
        <article class="community-event-card" id="${event.id}">
          <div class="community-event-card__head">
            <div>
              <p class="eyebrow">${utils.formatDate(event.date)} · ${event.time}</p>
              <h3>${utils.pick(event.title)}</h3>
              <p>${utils.pick(event.description)}</p>
            </div>
            <span class="community-event-card__tag">${utils.pick(event.category)}</span>
          </div>
          <div class="community-event-card__body">
            <div class="community-event-card__info">
              <dl class="community-event-card__details">
                <div><dt>${t('Formato','Format')}</dt><dd>${event.format}</dd></div>
                <div><dt>${t('Posti','Seats')}</dt><dd>${event.seats} ${t('posti totali','total seats')}</dd></div>
                <div><dt>${t('Luogo','Location')}</dt><dd>${event.location}</dd></div>
                <div><dt>${t('Stato','Status')}</dt><dd>${statusLabel(event)}</dd></div>
              </dl>
              <div class="community-event-card__registration">
                <div><strong>${statusLabel(event)}</strong><span>${t('Consulta le modalità di partecipazione dell’evento.','Check the event participation details.')}</span></div>
                ${event.registrationUrl ? `<a class="button button--primary" href="${event.registrationUrl}">${t('Informazioni iscrizione','Registration details')}</a>` : `<span class="button button--ghost" aria-disabled="true">${t('Informazioni iscrizione','Registration details')}</span>`}
              </div>
              <div class="community-event-card__actions">
                <button class="button button--ghost" type="button" data-reminder-id="${event.id}">${t('Ricordati del torneo','Remember the tournament')}</button>
              </div>
            </div>
            <aside class="community-event-card__prizes">
              <p class="eyebrow">${t('PREMI','PRIZES')}</p>
              <h4>${t('Griglia premi','Prize grid')}</h4>
              <p class="community-event-card__prizes-help">${t('Seleziona il numero di partecipanti previsto.','Select the expected number of players.')}</p>
              ${renderPrizeList(event, index)}
            </aside>
          </div>
        </article>`).join('');
    };

    root.addEventListener('click', event => {
      const reminder = event.target.closest('[data-reminder-id]');
      if (reminder) {
        const item = utils.getAllEvents().find(entry => entry.id === reminder.dataset.reminderId);
        if (item) utils.createReminder(item);
        return;
      }

      const calendarButton = event.target.closest('[data-scroll-event]');
      if (calendarButton) {
        document.getElementById(calendarButton.dataset.scrollEvent)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      const prizeButton = event.target.closest('[data-prize-event]');
      if (prizeButton) {
        state.prizeTierByEvent.set(prizeButton.dataset.prizeEvent, Number(prizeButton.dataset.prizeTier));
        renderEvents();
        document.getElementById(prizeButton.dataset.prizeEvent)?.scrollIntoView({ block: 'nearest' });
      }
    });

    const renderAll = () => { renderSpotlight(); renderCalendar(); renderEvents(); };
    window.addEventListener('nika:languagechange', renderAll);
    renderAll();

    if (location.hash) window.requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView({ block: 'start' }));
  }
};
