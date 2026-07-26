/* ======================================================
   LA TANA DI NIKA — NIKA LEAGUE PAGE V4.4.7
====================================================== */
window.NikaLeaguePage = {
  init() {
    const root = document.querySelector('[data-league-page]');
    const data = window.NIKA_TOURNAMENTS_DATA;
    const utils = window.NikaTournamentUtils;
    if (!root || !data || !utils) return;

    const settings = data.settings || {};
    const currentStage = Math.max(0, Math.min(6, Number(settings.currentLeagueStage) || 0));
    const qualificationCount = Math.max(1, Number(settings.leagueQualificationCount) || 8);
    const state = {
      openPlayer: null,
      selectedEventId: data.leagueEvents.find(event => event.status === 'upcoming')?.id || data.leagueEvents[0]?.id || null
    };

    const t = (it, en) => utils.getLanguage() === 'en' ? en : it;
    const currentScores = scores => Array.from({ length: 6 }, (_, index) => index < currentStage && Number.isFinite(scores?.[index]) ? scores[index] : null);
    const discardedIndexes = scores => utils.getDiscardedIndexes(currentScores(scores));
    const validTotal = scores => utils.getValidTotal(currentScores(scores));
    const rawTotal = scores => utils.getRawTotal(currentScores(scores));

    const renderHero = () => {
      const copy = t(`Classifica aggiornata alla tappa ${currentStage}/6.`, `Standings updated through stage ${currentStage}/6.`);
      root.querySelectorAll('[data-current-stage-copy]').forEach(node => { node.textContent = copy; });
      root.querySelectorAll('[data-current-stage-label]').forEach(node => { node.textContent = copy.replace(/\.$/, ''); });
    };

    const sortedPlayers = () => data.standings
      .slice(0, settings.maxLeaguePlayers || 64)
      .map(player => {
        const scores = currentScores(player.scores);
        const discarded = discardedIndexes(scores);
        return {
          ...player,
          scores,
          discarded,
          total: validTotal(scores),
          rawTotal: rawTotal(scores),
          attendance: scores.filter(Number.isFinite).length
        };
      })
      .sort((a, b) => b.total - a.total || (b.wins || 0) - (a.wins || 0) || a.name.localeCompare(b.name));

    const renderStandings = () => {
      const target = root.querySelector('[data-standings]');
      const count = root.querySelector('[data-registered-count]');
      if (!target) return;

      const players = sortedPlayers();
      if (count) count.textContent = t(`${players.length} giocatori registrati`, `${players.length} registered players`);

      if (!players.length) {
        target.innerHTML = `<p class="league-latest-article__empty">${t('Nessun giocatore registrato.','No registered players.')}</p>`;
        return;
      }

      const headers = Array.from({ length: 6 }, (_, index) => `<th class="league-table__stage">${t('Tappa','Stage')} ${index + 1}</th>`).join('');
      const rows = players.map((player, playerIndex) => {
        const rank = playerIndex + 1;
        const isTop = rank <= qualificationCount;
        const playerKey = encodeURIComponent(player.name);
        const open = state.openPlayer === player.name;
        const validIndexes = new Set(player.scores.map((score, index) => Number.isFinite(score) && !player.discarded.includes(index) ? index : null).filter(index => index !== null));
        const scoreCells = player.scores.map((score, index) => {
          const classes = ['league-score'];
          if (!Number.isFinite(score)) classes.push('is-empty');
          else if (player.discarded.includes(index)) classes.push('is-discarded');
          else if (validIndexes.has(index)) classes.push('is-valid');
          return `<td class="league-table__stage"><span class="${classes.join(' ')}">${Number.isFinite(score) ? score : '—'}</span></td>`;
        }).join('');

        const played = player.scores.filter(Number.isFinite);
        const average = played.length ? (player.rawTotal / played.length).toFixed(1) : '—';
        const bestScore = played.length ? Math.max(...played) : '—';
        const twelvePlus = played.filter(score => score >= 12).length;
        const resultCards = player.scores.map((score, index) => {
          const statusClass = !Number.isFinite(score) ? '' : player.discarded.includes(index) ? ' is-discarded' : ' is-valid';
          const deck = player.decks?.[index] || '';
          let note = t('Non disputata','Not played');
          if (Number.isFinite(score)) note = player.discarded.includes(index) ? t('Risultato scartato','Discarded result') : t('Risultato valido','Valid result');
          if (Number.isFinite(score) && score >= 12 && deck) note = `${note} · ${deck}`;
          else if (Number.isFinite(score) && score >= 12) note = `${note} · ${t('Mazzo da inserire','Deck to be added')}`;
          return `<article class="league-player-result${statusClass}"><div class="league-player-result__top"><b>${t('Tappa','Stage')} ${index + 1}</b><span>${Number.isFinite(score) ? `${score} PT` : '—'}</span></div><p>${note}</p></article>`;
        }).join('');

        return `<tr class="league-table__row${isTop ? ' is-top-eight' : ''}">
          <td class="league-table__rank">${String(rank).padStart(2,'0')}</td>
          <td class="league-table__player"><button class="league-table__player-button" type="button" data-player-toggle="${playerKey}" aria-expanded="${open}"><strong>${player.name}</strong><small>${open ? t('Chiudi statistiche','Close stats') : t('Apri statistiche','Open stats')}</small></button></td>
          ${scoreCells}
          <td class="league-table__total">${player.total} PT</td>
          <td class="league-table__status${isTop ? ' is-qualified' : ''}">${isTop ? t('Top 8 provvisoria','Provisional Top 8') : t('Fuori Top 8','Outside Top 8')}</td>
        </tr>
        <tr class="league-table__detail-row"${open ? '' : ' hidden'}><td colspan="10" class="league-table__detail-cell"><div class="league-player-panel"><div class="league-player-panel__summary"><p class="eyebrow">${t('STATISTICHE GIOCATORE','PLAYER STATS')}</p><h3>${player.name}</h3><p>${player.leader || t('Leader da inserire','Leader to be added')}</p><div class="league-player-panel__stats"><div class="league-player-panel__stat"><b>${t('Totale valido','Valid total')}</b><span>${player.total} PT</span></div><div class="league-player-panel__stat"><b>${t('Presenze','Attendance')}</b><span>${player.attendance}/6</span></div><div class="league-player-panel__stat"><b>${t('Media','Average')}</b><span>${average} PT</span></div><div class="league-player-panel__stat"><b>${t('Migliore','Best')}</b><span>${bestScore} PT</span></div><div class="league-player-panel__stat"><b>${t('Score 12+','12+ scores')}</b><span>${twelvePlus}</span></div><div class="league-player-panel__stat"><b>${t('Posizione','Position')}</b><span>${rank}ª</span></div></div></div><div class="league-player-results">${resultCards}</div></div></td></tr>`;
      }).join('');

      target.innerHTML = `<table class="league-table"><thead><tr><th class="league-table__rank">${t('Pos.','Pos.')}</th><th class="league-table__player is-left">${t('Nome','Name')}</th>${headers}<th>${t('Totale','Total')}</th><th>${t('Stato','Status')}</th></tr></thead><tbody>${rows}</tbody></table>`;
    };

    const eventStatus = event => {
      if (event.status === 'completed') return t('Conclusa','Completed');
      if (event.status === 'live') return t('In corso','Live');
      return event.type === 'final' ? t('Finale','Final') : t('In programma','Upcoming');
    };

    const renderCalendar = () => {
      const target = root.querySelector('[data-league-calendar]');
      if (!target || !data.leagueEvents?.length) return;
      const selected = data.leagueEvents.find(event => event.id === state.selectedEventId) || data.leagueEvents[0];
      const label = selected.type === 'final' ? t('Finale','Final') : `${t('Tappa','Stage')} ${selected.stage}`;
      const events = data.leagueEvents.map(event => {
        const eventLabel = event.type === 'final' ? t('Finale','Final') : `${t('Tappa','Stage')} ${event.stage}`;
        const classes = ['league-calendar__event'];
        if (event.id === selected.id) classes.push('is-selected');
        if (event.status === 'completed') classes.push('is-completed');
        return `<button class="${classes.join(' ')}" type="button" data-calendar-event="${event.id}" aria-pressed="${event.id === selected.id}"><div><small>${utils.formatShortDate(event.date)}</small><strong>${eventLabel}</strong></div><span>${eventStatus(event)}</span></button>`;
      }).join('');

      const reminder = selected.status === 'completed' ? '' : `<button class="button button--ghost league-calendar__reminder" type="button" data-reminder-id="${selected.id}">${t('Aggiungi promemoria','Add reminder')}</button>`;
      target.innerHTML = `<div class="league-calendar__summary"><div class="league-calendar__date"><strong>${new Date(`${selected.date}T12:00:00`).getDate().toString().padStart(2,'0')}</strong><span>${utils.formatDate(selected.date, { month: 'long', year: 'numeric' })} · ${selected.time}</span></div><div class="league-calendar__next"><h3>${label}</h3><p>${selected.expansion} · ${selected.location}</p></div><div class="league-calendar__actions"><span class="league-calendar__pill">${eventStatus(selected)}</span>${reminder}</div></div><div class="league-calendar__track">${events}</div>`;
    };

    const renderFinale = () => {
      const target = root.querySelector('[data-league-final]');
      const finalEvent = data.leagueEvents?.find(event => event.type === 'final');
      if (!target || !finalEvent) return;
      const twitch = settings.twitch || {};
      const liveLabel = twitch.enabled ? (twitch.status === 'live' ? t('Diretta in corso','Live now') : t('Diretta prevista','Stream scheduled')) : t('Diretta non ancora annunciata','Stream not announced yet');
      const reminder = finalEvent.status === 'completed' ? '' : `<button class="button button--primary" type="button" data-reminder-id="${finalEvent.id}">${t('Ricordami la Finale','Remind me about the Final')}</button>`;
      target.innerHTML = `<div class="league-finale-card__copy"><div class="league-finale-card__meta"><span>${utils.formatDate(finalEvent.date)}</span><span>${finalEvent.time}</span><span>${finalEvent.location}</span></div><h3>${utils.pick(finalEvent.title)}</h3><p>${utils.pick(finalEvent.description)}</p>${utils.pick(finalEvent.commentary) ? `<blockquote>${utils.pick(finalEvent.commentary)}</blockquote>` : ''}<div class="league-finale-card__actions">${reminder}<span class="league-finale-card__stream">${liveLabel}</span></div></div>`;
    };

    const renderArticle = () => {
      const target = root.querySelector('[data-league-article]');
      const article = data.leagueArticle;
      if (!target) return;
      if (!article) {
        target.innerHTML = `<p class="league-latest-article__empty">${t('Nessun articolo pubblicato.','No published article.')}</p>`;
        return;
      }

      const images = Array.isArray(article.images) ? article.images.filter(Boolean).slice(0, 4) : [];
      const gallery = images.length ? `<div class="league-latest-article__gallery${images.length === 1 ? ' is-single' : ''}">${images.map((image, index) => `<img class="league-latest-article__photo" src="${utils.resolveAsset(image)}" alt="${utils.pick(article.title)} — ${t('foto','photo')} ${index + 1}" loading="lazy" decoding="async">`).join('')}</div>` : '';
      const meta = [utils.formatDate(article.date), 'Nika League', article.stage ? `${t('Tappa','Stage')} ${article.stage}` : ''].filter(Boolean).map(item => `<span>${item}</span>`).join('');
      const link = article.url ? `<a class="league-latest-article__link" href="${article.url}">${t('Leggi l’articolo completo','Read the full article')}</a>` : '';
      target.innerHTML = `<div class="league-latest-article__content"><div class="league-latest-article__meta">${meta}</div><h3>${utils.pick(article.title)}</h3><p class="league-latest-article__text">${utils.pick(article.excerpt)}</p>${gallery}${link}</div>`;
    };

    root.addEventListener('click', event => {
      const reminderButton = event.target.closest('[data-reminder-id]');
      if (reminderButton) {
        const reminderEvent = data.leagueEvents.find(item => item.id === reminderButton.dataset.reminderId);
        if (reminderEvent) utils.createReminder(reminderEvent);
        return;
      }
      const playerButton = event.target.closest('[data-player-toggle]');
      if (playerButton) {
        const playerName = decodeURIComponent(playerButton.dataset.playerToggle);
        state.openPlayer = state.openPlayer === playerName ? null : playerName;
        renderStandings();
        return;
      }
      const calendarButton = event.target.closest('[data-calendar-event]');
      if (calendarButton) {
        state.selectedEventId = calendarButton.dataset.calendarEvent;
        renderCalendar();
      }
    });

    const renderAll = () => {
      renderHero();
      renderStandings();
      renderCalendar();
      renderFinale();
      renderArticle();
    };

    window.addEventListener('nika:languagechange', renderAll);
    renderAll();
  }
};
