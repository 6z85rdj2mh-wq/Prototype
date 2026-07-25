/* ======================================================
   LA TANA DI NIKA — COMMUNITY EVENTS PAGE V4.4.1
====================================================== */
window.NikaCommunityEventsPage = {
  init() {
    const root = document.querySelector('[data-community-events-page]');
    const data = window.NIKA_TOURNAMENTS_DATA;
    const utils = window.NikaTournamentUtils;
    if (!root || !data || !utils) return;

    const state = { selectedEventId: data.localEvents[0]?.id };
    const t = (it, en) => utils.getLanguage() === 'en' ? en : it;

    const renderHeroFacts = () => {
      root.querySelectorAll('[data-event-count]').forEach(node => { node.textContent = String(data.localEvents.length); });
    };

    const renderSpotlight = () => {
      const target = root.querySelector('[data-next-community-event]');
      const event = data.localEvents[0];
      if (!target || !event) return;
      const visualStyle = event.image ? ` style="background-image:linear-gradient(180deg,rgba(9,7,13,.08),rgba(9,7,13,.86)),url('${utils.resolveAsset(event.image)}')"` : '';
      target.innerHTML = `<div><p class="eyebrow">${utils.pick(event.category)}</p><p class="community-spotlight__date">${utils.formatDate(event.date)} · ${event.time}</p><h2>${utils.pick(event.title)}</h2><p>${utils.pick(event.description)}</p><div class="community-spotlight__meta"><span>${event.expansion}</span><span>${event.format}</span><span>${event.seats} ${t('posti','seats')}</span></div><div class="community-spotlight__actions"><button class="button button--primary" type="button" data-reminder-id="${event.id}">${t('Aggiungi al calendario','Add to calendar')}</button><a class="button button--ghost" href="#event-calendar">${t('Scopri i premi','View prizes')}</a></div></div><div class="community-spotlight__visual"${visualStyle}><strong>${event.expansion}</strong><span>${t('PROSSIMO EVENTO','NEXT EVENT')}</span></div>`;
    };

    const renderCalendar = () => {
      const nav = root.querySelector('[data-community-calendar]');
      const detail = root.querySelector('[data-community-event-detail]');
      if (!nav || !detail) return;
      nav.innerHTML = data.localEvents.map(event => {
        const selected = event.id === state.selectedEventId;
        return `<button class="event-date-card${selected ? ' is-selected' : ''}" type="button" data-community-event="${event.id}" aria-pressed="${selected}"><span>${utils.formatDate(event.date, { month: 'short' }).replace(/\./g,'')}</span><strong>${new Date(`${event.date}T12:00:00`).getDate()}</strong><small>${utils.pick(event.category)}</small><b>${utils.pick(event.title)}</b></button>`;
      }).join('');
      const event = data.localEvents.find(item => item.id === state.selectedEventId) || data.localEvents[0];
      if (!event) return;
      const tiers = event.prizeTiers.map(tier => `<section class="event-prize-tier"><h4>${utils.pick(tier.label)}</h4>${tier.prizes.map(prize => `<div><strong>${prize.placement}</strong><span>${utils.pick(prize.reward)}</span></div>`).join('')}</section>`).join('');
      const detailStyle = event.image ? ` style="background-image:linear-gradient(90deg,rgba(16,13,22,.98),rgba(16,13,22,.88)),url('${utils.resolveAsset(event.image)}')"` : '';
      detail.innerHTML = `<div class="event-detail__main"${detailStyle}><p class="eyebrow">${utils.pick(event.category)}</p><p class="event-detail__date">${utils.formatDate(event.date)} · ${event.time}</p><h3>${utils.pick(event.title)}</h3><p>${utils.pick(event.description)}</p><dl><div><dt>${t('Formato','Format')}</dt><dd>${event.format}</dd></div><div><dt>${t('Espansione','Expansion')}</dt><dd>${event.expansion}</dd></div><div><dt>${t('Posti','Seats')}</dt><dd>${event.seats}</dd></div><div><dt>${t('Luogo','Location')}</dt><dd>${event.location}</dd></div></dl><button class="button button--primary" type="button" data-reminder-id="${event.id}">${t('Reminder 2 ore prima','2-hour reminder')}</button></div><aside class="event-detail__prizes"><div class="event-detail__prizes-head"><p class="eyebrow">${t('GRIGLIA PREMI','PRIZE GRID')}</p><span>${t('Personalizzabile','Customisable')}</span></div>${tiers}</aside>`;
    };

    root.addEventListener('click', event => {
      const reminder = event.target.closest('[data-reminder-id]');
      if (reminder) {
        const item = utils.getAllEvents().find(entry => entry.id === reminder.dataset.reminderId);
        if (item) utils.createReminder(item);
        return;
      }
      const selector = event.target.closest('[data-community-event]');
      if (selector) {
        state.selectedEventId = selector.dataset.communityEvent;
        renderCalendar();
      }
    });

    const renderAll = () => {
      renderHeroFacts();
      renderSpotlight();
      renderCalendar();
    };
    window.addEventListener('nika:languagechange', renderAll);
    renderAll();
  }
};
