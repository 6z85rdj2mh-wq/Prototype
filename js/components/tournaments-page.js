window.NikaTournamentPage = {
  init() {
    const root = document.querySelector('[data-tournament-page]');
    const data = window.NIKA_TOURNAMENTS_DATA;
    if (!root || !data) return;

    const state = {
      language: document.documentElement.lang || 'it',
      leagueMonth: null,
      selectedLeagueId: null,
      localMonth: null,
      selectedLocalId: null
    };

    const pick = value => {
      if (value && typeof value === 'object' && !Array.isArray(value)) return value[state.language] || value.it || Object.values(value)[0];
      return value ?? '';
    };

    const locale = () => state.language === 'en' ? 'en-GB' : 'it-IT';
    const formatDate = date => new Intl.DateTimeFormat(locale(), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(`${date}T12:00:00`));
    const monthKey = date => date.slice(0, 7);
    const escapeICS = value => String(value).replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;');
    const icsDate = (date, time) => `${date.replaceAll('-', '')}T${time.replace(':', '')}00`;

    const statusLabel = event => {
      const labels = {
        completed: { it: 'Conclusa', en: 'Completed' },
        upcoming: { it: 'In programma', en: 'Upcoming' },
        live: { it: 'Live', en: 'Live' }
      };
      return pick(labels[event.status] || labels.upcoming);
    };

    const createReminder = event => {
      const settings = data.settings;
      const title = pick(event.title);
      const description = pick(event.description);
      const uid = `${event.id}@latanadinika`;
      const now = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
      const content = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//La Tana di Nika//Tournament Calendar//IT',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${uid}`,
        `DTSTAMP:${now}`,
        `DTSTART;TZID=${settings.timeZone}:${icsDate(event.date, event.time)}`,
        `DTEND;TZID=${settings.timeZone}:${icsDate(event.date, event.endTime || event.time)}`,
        `SUMMARY:${escapeICS(title)}`,
        `DESCRIPTION:${escapeICS(description)}`,
        `LOCATION:${escapeICS(event.location)}`,
        'BEGIN:VALARM',
        `TRIGGER:-PT${settings.reminderMinutes}M`,
        'ACTION:DISPLAY',
        `DESCRIPTION:${escapeICS(title)}`,
        'END:VALARM',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${event.id}.ics`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    };

    const setArt = (element, event) => {
      if (!event.image) return;
      element.style.backgroundImage = `linear-gradient(180deg, transparent, rgba(9,7,13,.88)), url("${event.image}")`;
    };

    const renderSpotlight = () => {
      const target = root.querySelector('[data-next-league]');
      const event = data.leagueEvents.find(item => item.status === 'upcoming') || data.leagueEvents[0];
      if (!target || !event) return;
      target.innerHTML = `
        <div class="event-spotlight__content">
          <div class="event-spotlight__meta">
            <span>${statusLabel(event)}</span><span>${event.expansion}</span><span>${event.format}</span>
          </div>
          <p class="eyebrow">${event.type === 'final' ? 'FINALE NIKA LEAGUE' : `${state.language === 'en' ? 'NEXT STAGE' : 'PROSSIMA TAPPA'} · ${formatDate(event.date)}`}</p>
          <h3>${pick(event.title)}</h3>
          <p>${pick(event.description)}</p>
          <div class="event-spotlight__actions">
            <a class="button button--primary" href="#league-calendar">${state.language === 'en' ? 'View calendar' : 'Apri il calendario'}</a>
            <button class="button button--ghost" type="button" data-reminder-id="${event.id}">${state.language === 'en' ? 'Add 2-hour reminder' : 'Reminder 2 ore prima'}</button>
          </div>
          <p class="placeholder-note">${state.language === 'en' ? 'Demonstration data: replace dates and details in js/data/tournaments.js.' : 'Dati dimostrativi: date e dettagli si modificano in js/data/tournaments.js.'}</p>
        </div>`;
    };

    const renderCalendar = () => {
      const panel = root.querySelector('[data-league-calendar]');
      const detail = root.querySelector('[data-league-detail]');
      if (!panel || !detail) return;

      const events = data.leagueEvents;
      const firstUpcoming = events.find(event => event.status === 'upcoming') || events[0];
      if (!state.leagueMonth) state.leagueMonth = monthKey(firstUpcoming.date);
      const [year, month] = state.leagueMonth.split('-').map(Number);
      const firstDay = new Date(year, month - 1, 1);
      const startOffset = (firstDay.getDay() + 6) % 7;
      const daysInMonth = new Date(year, month, 0).getDate();
      const monthEvents = events.filter(event => monthKey(event.date) === state.leagueMonth);
      if (!state.selectedLeagueId || !monthEvents.some(event => event.id === state.selectedLeagueId)) {
        state.selectedLeagueId = monthEvents[0]?.id || firstUpcoming.id;
      }

      const monthLabel = new Intl.DateTimeFormat(locale(), { month: 'long', year: 'numeric' }).format(firstDay);
      const weekdays = state.language === 'en' ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] : ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];
      const cells = [];
      weekdays.forEach(day => cells.push(`<div class="calendar-weekday">${day}</div>`));
      for (let index = 0; index < 42; index += 1) {
        const day = index - startOffset + 1;
        if (day < 1 || day > daysInMonth) {
          cells.push('<div class="calendar-day is-muted" aria-hidden="true"></div>');
          continue;
        }
        const date = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const event = events.find(item => item.date === date);
        if (event) {
          const selected = event.id === state.selectedLeagueId ? ' is-selected' : '';
          const dotClass = event.type === 'final' ? ' calendar-day__dot--final' : '';
          cells.push(`<button class="calendar-day has-event${selected}" type="button" data-calendar-event="${event.id}" aria-label="${pick(event.title)}"><span class="calendar-day__number">${day}</span><span class="calendar-day__dot${dotClass}"></span></button>`);
        } else {
          cells.push(`<div class="calendar-day"><span class="calendar-day__number">${day}</span></div>`);
        }
      }

      panel.innerHTML = `
        <div class="calendar-toolbar">
          <strong>${monthLabel}</strong>
          <div class="calendar-nav">
            <button type="button" data-calendar-shift="-1" aria-label="${state.language === 'en' ? 'Previous month' : 'Mese precedente'}">←</button>
            <button type="button" data-calendar-shift="1" aria-label="${state.language === 'en' ? 'Next month' : 'Mese successivo'}">→</button>
          </div>
        </div>
        <div class="calendar-grid">${cells.join('')}</div>`;

      const event = events.find(item => item.id === state.selectedLeagueId) || firstUpcoming;
      const art = event.image ? ` style="background-image:linear-gradient(180deg,transparent,rgba(9,7,13,.88)),url('${event.image}')"` : '';
      detail.innerHTML = `
        <div class="calendar-detail__content">
          <div class="calendar-detail__art"${art}><strong>${event.expansion}</strong></div>
          <p class="calendar-detail__date">${formatDate(event.date)} · ${event.time}</p>
          <h3>${pick(event.title)}</h3>
          <p>${pick(event.description)}</p>
          <dl>
            <dt>${state.language === 'en' ? 'Status' : 'Stato'}</dt><dd>${statusLabel(event)}</dd>
            <dt>${state.language === 'en' ? 'Format' : 'Formato'}</dt><dd>${event.format}</dd>
            <dt>${state.language === 'en' ? 'Location' : 'Luogo'}</dt><dd>${event.location}</dd>
          </dl>
          <div class="calendar-detail__actions">
            <button class="button button--primary" type="button" data-reminder-id="${event.id}">${state.language === 'en' ? 'Add to calendar' : 'Aggiungi al calendario'}</button>
          </div>
        </div>`;
    };

    const getStanding = player => {
      const rankedScores = player.scores.map((score, index) => ({ score, index })).sort((a,b) => a.score - b.score || a.index - b.index);
      const discarded = new Set(rankedScores.slice(0, Math.max(0, player.scores.length - 4)).map(item => item.index));
      const valid = player.scores.filter((_, index) => !discarded.has(index));
      return { ...player, discarded, total: valid.reduce((sum, score) => sum + score, 0), gross: player.scores.reduce((sum, score) => sum + score, 0) };
    };

    const renderStandings = () => {
      const podium = root.querySelector('[data-podium]');
      const board = root.querySelector('[data-standings]');
      if (!podium || !board) return;
      const standings = data.standings.map(getStanding).sort((a,b) => b.total - a.total || b.wins - a.wins);
      podium.innerHTML = standings.slice(0,3).map((player,index) => `
        <article class="podium-card">
          <span class="podium-card__rank">0${index + 1}</span>
          <h3>${player.name}</h3>
          <p>${player.leader}</p>
          <span class="podium-card__points">${player.total} PT</span>
        </article>`).join('');

      const head = `<div class="standings-head"><span>#</span><span>${state.language === 'en' ? 'Player' : 'Giocatore'}</span>${[1,2,3,4,5,6].map(n => `<span>T${n}</span>`).join('')}<span>${state.language === 'en' ? 'Total' : 'Totale'}</span><span></span></div>`;
      const rows = standings.map((player,index) => {
        const scores = player.scores.map((score,scoreIndex) => `<span class="stage-score${player.discarded.has(scoreIndex) ? ' is-discarded' : ''}" title="${player.discarded.has(scoreIndex) ? (state.language === 'en' ? 'Discarded result' : 'Risultato scartato') : ''}">${score}</span>`).join('');
        return `<article class="standing-row" data-standing-row>
          <button class="standing-row__toggle" type="button" aria-expanded="false">
            <span class="standing-row__summary">
              <span class="standing-rank">${String(index+1).padStart(2,'0')}</span>
              <span class="standing-player"><strong>${player.name}</strong><small>${player.leader}</small></span>
              ${scores}
              <span class="standing-total">${player.total}</span>
              <span class="standing-arrow">⌄</span>
            </span>
          </button>
          <div class="standing-row__detail">
            <div class="standing-detail"><span>${state.language === 'en' ? 'Gross points' : 'Punti ottenuti'}</span><strong>${player.gross}</strong></div>
            <div class="standing-detail"><span>${state.language === 'en' ? 'Discarded' : 'Scartati'}</span><strong>-${player.gross-player.total}</strong></div>
            <div class="standing-detail"><span>${state.language === 'en' ? 'Wins' : 'Vittorie'}</span><strong>${player.wins}</strong></div>
            <div class="standing-detail"><span>${state.language === 'en' ? 'Best result' : 'Miglior risultato'}</span><strong>${player.best}</strong></div>
          </div>
        </article>`;
      }).join('');
      board.innerHTML = head + rows;
    };

    const renderLocalCalendar = () => {
      const panel = root.querySelector('[data-local-calendar]');
      const detail = root.querySelector('[data-local-detail]');
      if (!panel || !detail || !data.localEvents.length) return;

      const events = data.localEvents;
      const firstEvent = events[0];
      if (!state.localMonth) state.localMonth = monthKey(firstEvent.date);
      const [year, month] = state.localMonth.split('-').map(Number);
      const firstDay = new Date(year, month - 1, 1);
      const startOffset = (firstDay.getDay() + 6) % 7;
      const daysInMonth = new Date(year, month, 0).getDate();
      const monthEvents = events.filter(event => monthKey(event.date) === state.localMonth);
      if (!state.selectedLocalId || !monthEvents.some(event => event.id === state.selectedLocalId)) {
        state.selectedLocalId = monthEvents[0]?.id || firstEvent.id;
      }

      const monthLabel = new Intl.DateTimeFormat(locale(), { month: 'long', year: 'numeric' }).format(firstDay);
      const weekdays = state.language === 'en' ? ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] : ['Lun','Mar','Mer','Gio','Ven','Sab','Dom'];
      const cells = weekdays.map(day => `<div class="calendar-weekday">${day}</div>`);
      for (let index = 0; index < 42; index += 1) {
        const day = index - startOffset + 1;
        if (day < 1 || day > daysInMonth) {
          cells.push('<div class="calendar-day is-muted" aria-hidden="true"></div>');
          continue;
        }
        const date = `${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
        const event = events.find(item => item.date === date);
        if (event) {
          const selected = event.id === state.selectedLocalId ? ' is-selected' : '';
          cells.push(`<button class="calendar-day has-event${selected}" type="button" data-local-calendar-event="${event.id}" aria-label="${pick(event.title)}"><span class="calendar-day__number">${day}</span><span class="calendar-day__dot"></span></button>`);
        } else {
          cells.push(`<div class="calendar-day"><span class="calendar-day__number">${day}</span></div>`);
        }
      }

      panel.innerHTML = `
        <div class="calendar-toolbar">
          <strong>${monthLabel}</strong>
          <div class="calendar-nav">
            <button type="button" data-local-calendar-shift="-1" aria-label="${state.language === 'en' ? 'Previous month' : 'Mese precedente'}">←</button>
            <button type="button" data-local-calendar-shift="1" aria-label="${state.language === 'en' ? 'Next month' : 'Mese successivo'}">→</button>
          </div>
        </div>
        <div class="calendar-grid">${cells.join('')}</div>`;

      const event = events.find(item => item.id === state.selectedLocalId) || firstEvent;
      const art = event.image ? ` style="background-image:linear-gradient(180deg,transparent,rgba(9,7,13,.88)),url('${event.image}')"` : '';
      detail.innerHTML = `
        <div class="calendar-detail__content">
          <div class="calendar-detail__art"${art}><strong>${event.expansion}</strong></div>
          <p class="calendar-detail__date">${formatDate(event.date)} · ${event.time}</p>
          <h3>${pick(event.title)}</h3>
          <p>${pick(event.description)}</p>
          <dl>
            <dt>${state.language === 'en' ? 'Category' : 'Categoria'}</dt><dd>${pick(event.category)}</dd>
            <dt>${state.language === 'en' ? 'Format' : 'Formato'}</dt><dd>${event.format}</dd>
            <dt>${state.language === 'en' ? 'Seats' : 'Posti'}</dt><dd>${event.seats}</dd>
          </dl>
          <div class="calendar-detail__actions">
            <button class="button button--primary" type="button" data-reminder-id="${event.id}">${state.language === 'en' ? 'Add to calendar' : 'Aggiungi al calendario'}</button>
            <a class="button button--ghost" href="#${event.id}">${state.language === 'en' ? 'View prizes' : 'Vedi i premi'}</a>
          </div>
        </div>`;
    };

    const renderLocalEvents = () => {
      const target = root.querySelector('[data-local-events]');
      if (!target) return;
      target.innerHTML = data.localEvents.map(event => {
        const art = event.image ? ` style="background-image:linear-gradient(180deg,transparent,rgba(9,7,13,.9)),url('${event.image}')"` : '';
        const tiers = event.prizeTiers.map(tier => `<div class="prize-tier"><strong>${pick(tier.label)}</strong>${tier.prizes.map(prize => `<div class="prize-row"><b>${prize.placement}</b><span>${pick(prize.reward)}</span></div>`).join('')}</div>`).join('');
        return `<article class="local-event" id="${event.id}">
          <div class="local-event__art"${art}><span>${pick(event.category)}</span></div>
          <div class="local-event__body">
            <p class="local-event__date">${formatDate(event.date)} · ${event.time}</p>
            <h3>${pick(event.title)}</h3>
            <p>${pick(event.description)}</p>
            <div class="local-event__meta">
              <div><span>${state.language === 'en' ? 'Format' : 'Formato'}</span><strong>${event.format}</strong></div>
              <div><span>${state.language === 'en' ? 'Seats' : 'Posti'}</span><strong>${event.seats}</strong></div>
            </div>
            <div class="local-event__actions"><button class="button button--ghost" type="button" data-reminder-id="${event.id}">${state.language === 'en' ? 'Add reminder' : 'Imposta reminder'}</button></div>
            <details class="prize-grid"><summary>${state.language === 'en' ? 'View prize grid' : 'Vedi griglia premi'}</summary>${tiers}</details>
          </div>
        </article>`;
      }).join('');
    };

    const renderFinal = () => {
      const target = root.querySelector('[data-final-feature]');
      const event = data.leagueEvents.find(item => item.type === 'final');
      if (!target || !event) return;
      target.querySelector('[data-final-title]').textContent = pick(event.title);
      target.querySelector('[data-final-description]').textContent = pick(event.description);
      target.querySelector('[data-final-commentary]').textContent = pick(event.commentary);
      const reminder = target.querySelector('[data-final-reminder]');
      reminder.dataset.reminderId = event.id;
    };

    const renderStream = () => {
      const player = root.querySelector('[data-stream-player]');
      const statuses = root.querySelectorAll('[data-stream-status]');
      if (!player || !statuses.length) return;
      const config = data.settings.twitch;
      const valid = config.enabled && config.channel && config.parent;
      if (valid) {
        player.innerHTML = `<iframe src="https://player.twitch.tv/?channel=${encodeURIComponent(config.channel)}&parent=${encodeURIComponent(config.parent)}&autoplay=false" allowfullscreen title="Twitch — La Tana di Nika"></iframe>`;
        statuses.forEach(status => { status.textContent = config.status === 'live' ? 'LIVE' : (state.language === 'en' ? 'Stream ready' : 'Stream pronta'); });
      } else {
        player.innerHTML = `<div class="stream-placeholder"><div class="stream-placeholder__icon">▶</div><h3>${state.language === 'en' ? 'Twitch placeholder ready' : 'Placeholder Twitch predisposto'}</h3><p>${state.language === 'en' ? 'Add channel and parent domain in the data file to activate the embedded player.' : 'Inserisci canale e dominio parent nel file dati per attivare il player incorporato.'}</p></div>`;
        statuses.forEach(status => { status.textContent = state.language === 'en' ? 'Not configured' : 'Da configurare'; });
      }
    };

    const renderAll = () => {
      state.language = document.documentElement.lang || 'it';
      renderSpotlight();
      renderCalendar();
      renderStandings();
      renderLocalCalendar();
      renderLocalEvents();
      renderFinal();
      renderStream();
    };

    root.addEventListener('click', event => {
      const reminderButton = event.target.closest('[data-reminder-id]');
      if (reminderButton) {
        const allEvents = [...data.leagueEvents, ...data.localEvents];
        const tournament = allEvents.find(item => item.id === reminderButton.dataset.reminderId);
        if (tournament) createReminder(tournament);
        return;
      }

      const shift = event.target.closest('[data-calendar-shift]');
      if (shift) {
        const [year, month] = state.leagueMonth.split('-').map(Number);
        const next = new Date(year, month - 1 + Number(shift.dataset.calendarShift), 1);
        state.leagueMonth = `${next.getFullYear()}-${String(next.getMonth()+1).padStart(2,'0')}`;
        state.selectedLeagueId = null;
        renderCalendar();
        return;
      }

      const calendarEvent = event.target.closest('[data-calendar-event]');
      if (calendarEvent) {
        state.selectedLeagueId = calendarEvent.dataset.calendarEvent;
        renderCalendar();
        return;
      }

      const localShift = event.target.closest('[data-local-calendar-shift]');
      if (localShift) {
        const [year, month] = state.localMonth.split('-').map(Number);
        const next = new Date(year, month - 1 + Number(localShift.dataset.localCalendarShift), 1);
        state.localMonth = `${next.getFullYear()}-${String(next.getMonth()+1).padStart(2,'0')}`;
        state.selectedLocalId = null;
        renderLocalCalendar();
        return;
      }

      const localCalendarEvent = event.target.closest('[data-local-calendar-event]');
      if (localCalendarEvent) {
        state.selectedLocalId = localCalendarEvent.dataset.localCalendarEvent;
        renderLocalCalendar();
        return;
      }

      const toggle = event.target.closest('.standing-row__toggle');
      if (toggle) {
        const row = toggle.closest('[data-standing-row]');
        const open = !row.classList.contains('is-open');
        row.classList.toggle('is-open', open);
        toggle.setAttribute('aria-expanded', String(open));
      }
    });

    window.addEventListener('nika:languagechange', event => {
      state.language = event.detail?.language || state.language;
      renderAll();
    });

    renderAll();
  }
};
