/* ======================================================
   LA TANA DI NIKA — NIKA LEAGUE PAGE V4.4.1
====================================================== */
window.NikaLeaguePage = {
  init() {
    const root = document.querySelector('[data-league-page]');
    const data = window.NIKA_TOURNAMENTS_DATA;
    const utils = window.NikaTournamentUtils;
    if (!root || !data || !utils) return;

    const state = {
      selectedEventId: data.leagueEvents.find(event => event.status === 'upcoming')?.id || data.leagueEvents[0]?.id,
      query: '',
      openPlayer: null
    };

    const t = (it, en) => utils.getLanguage() === 'en' ? en : it;

    const renderHeroFacts = () => {
      const count = Math.min(data.standings.length, data.settings.maxLeaguePlayers);
      root.querySelectorAll('[data-player-count]').forEach(node => { node.textContent = `${count}/${data.settings.maxLeaguePlayers}`; });
    };

    const renderSpotlight = () => {
      const target = root.querySelector('[data-next-league]');
      const event = data.leagueEvents.find(item => item.status === 'upcoming') || data.leagueEvents[0];
      if (!target || !event) return;
      const art = event.image ? ` style="background-image:linear-gradient(90deg,rgba(9,7,13,.96),rgba(9,7,13,.5)),url('${utils.resolveAsset(event.image)}')"` : '';
      target.innerHTML = `<div class="league-spotlight__art"${art}></div>
        <div class="league-spotlight__content">
          <div class="league-spotlight__meta"><span>${event.type === 'final' ? t('Finale','Final') : `${t('Tappa','Stage')} ${event.stage}`}</span><span>${event.expansion}</span><span>${event.format}</span></div>
          <p class="league-spotlight__date">${utils.formatDate(event.date)} · ${event.time}</p>
          <h2>${utils.pick(event.title)}</h2>
          <p>${utils.pick(event.description)}</p>
          <div class="league-spotlight__actions"><button class="button button--primary" type="button" data-reminder-id="${event.id}">${t('Aggiungi al calendario','Add to calendar')}</button><a class="button button--ghost" href="#season">${t('Vedi la stagione','View season')}</a></div>
        </div>`;
    };

    const renderStories = () => {
      const target = root.querySelector('[data-league-stories]');
      if (!target) return;
      target.innerHTML = data.leagueStories.map((story, index) => `<article class="league-story ${index === 0 ? 'league-story--lead' : ''}">
        <span class="league-story__index">0${index + 1}</span>
        <p class="league-story__label">${utils.pick(story.label)}</p>
        <h3>${utils.pick(story.title)}</h3>
        <p>${utils.pick(story.text)}</p>
        <strong>${story.player}</strong>
      </article>`).join('');
    };

    const renderSeason = () => {
      const nav = root.querySelector('[data-league-season]');
      const detail = root.querySelector('[data-league-event-detail]');
      if (!nav || !detail) return;
      nav.innerHTML = data.leagueEvents.map(event => {
        const selected = event.id === state.selectedEventId;
        const label = event.type === 'final' ? t('Finale','Final') : `${t('Tappa','Stage')} ${event.stage}`;
        return `<button class="season-stop${selected ? ' is-selected' : ''}${event.type === 'final' ? ' is-final' : ''}" type="button" data-season-event="${event.id}" aria-pressed="${selected}">
          <span class="season-stop__date">${utils.formatShortDate(event.date)}</span>
          <strong>${label}</strong>
          <small>${event.expansion}</small>
        </button>`;
      }).join('');
      const event = data.leagueEvents.find(item => item.id === state.selectedEventId) || data.leagueEvents[0];
      if (!event) return;
      const art = event.image ? ` style="background-image:linear-gradient(180deg,transparent,rgba(9,7,13,.96)),url('${utils.resolveAsset(event.image)}')"` : '';
      detail.innerHTML = `<div class="season-detail__art"${art}><span>${event.expansion}</span></div>
        <div class="season-detail__body">
          <p class="season-detail__date">${utils.formatDate(event.date)} · ${event.time}</p>
          <h3>${utils.pick(event.title)}</h3>
          <p>${utils.pick(event.description)}</p>
          <dl><div><dt>${t('Formato','Format')}</dt><dd>${event.format}</dd></div><div><dt>${t('Luogo','Location')}</dt><dd>${event.location}</dd></div><div><dt>${t('Stato','Status')}</dt><dd>${event.status === 'completed' ? t('Conclusa','Completed') : t('In programma','Upcoming')}</dd></div></dl>
          <button class="button button--primary" type="button" data-reminder-id="${event.id}">${t('Reminder 2 ore prima','2-hour reminder')}</button>
        </div>`;
    };

    const sortedPlayers = () => data.standings
      .slice(0, data.settings.maxLeaguePlayers)
      .map(player => ({ ...player, total: utils.getValidTotal(player.scores), rawTotal: utils.getRawTotal(player.scores), discarded: utils.getDiscardedIndexes(player.scores) }))
      .sort((a, b) => b.total - a.total || b.wins - a.wins || a.name.localeCompare(b.name));

    const renderPodium = players => {
      const target = root.querySelector('[data-podium]');
      if (!target) return;
      target.innerHTML = players.slice(0, 3).map((player, index) => `<article class="league-podium__item league-podium__item--${index + 1}">
        <span class="league-podium__rank">0${index + 1}</span><div><p>${player.leader}</p><h3>${player.name}</h3></div><strong>${player.total} <small>PT</small></strong>
      </article>`).join('');
    };

    const renderStandings = () => {
      const target = root.querySelector('[data-standings]');
      const count = root.querySelector('[data-registered-count]');
      if (!target) return;
      const allPlayers = sortedPlayers();
      const query = state.query.trim().toLocaleLowerCase();
      const players = query ? allPlayers.filter(player => `${player.name} ${player.leader}`.toLocaleLowerCase().includes(query)) : allPlayers;
      if (count) count.textContent = `${allPlayers.length} / ${data.settings.maxLeaguePlayers}`;
      renderPodium(allPlayers);
      if (!players.length) {
        target.innerHTML = `<p class="standings-empty">${t('Nessun giocatore trovato.','No players found.')}</p>`;
        return;
      }
      const columnHeader = `<div class="league-standings__columns"><span>${t('Pos.','Pos.')}</span><span>${t('Giocatore','Player')}</span><span>+/-</span><span class="league-standings__stage-labels"><b>T1</b><b>T2</b><b>T3</b><b>T4</b><b>T5</b><b>T6</b></span><span>${t('Tot.','Total')}</span><span></span></div>`;
      target.innerHTML = columnHeader + players.map(player => {
        const rank = allPlayers.findIndex(item => item.name === player.name) + 1;
        const playerKey = encodeURIComponent(player.name);
        const movement = player.movement > 0 ? `↑ ${player.movement}` : player.movement < 0 ? `↓ ${Math.abs(player.movement)}` : '—';
        const scoreCells = player.scores.map((score, index) => `<span class="league-score${player.discarded.includes(index) ? ' is-discarded' : ''}" title="${player.discarded.includes(index) ? t('Risultato scartato','Discarded result') : `${t('Tappa','Stage')} ${index + 1}`}">${Number.isFinite(score) ? score : '—'}</span>`).join('');
        const open = state.openPlayer === player.name;
        return `<article class="league-standing${open ? ' is-open' : ''}" data-player-row="${playerKey}">
          <button class="league-standing__summary" type="button" data-player-toggle="${playerKey}" aria-expanded="${open}">
            <span class="league-standing__rank">${String(rank).padStart(2,'0')}</span>
            <span class="league-standing__player"><strong>${player.name}</strong><small>${player.leader}</small></span>
            <span class="league-standing__movement ${player.movement > 0 ? 'is-up' : player.movement < 0 ? 'is-down' : ''}">${movement}</span>
            <span class="league-standing__scores">${scoreCells}</span>
            <span class="league-standing__total"><strong>${player.total}</strong><small>PT</small></span>
            <span class="league-standing__chevron" aria-hidden="true">⌄</span>
          </button>
          <div class="league-standing__detail"${open ? '' : ' hidden'}>
            <div><p class="eyebrow">${t('LE SUE GESTA','THEIR STORY')}</p><p>${utils.pick(player.story)}</p></div>
            <dl><div><dt>${t('Punti ottenuti','Raw points')}</dt><dd>${player.rawTotal}</dd></div><div><dt>${t('Punti scartati','Discarded')}</dt><dd>-${player.rawTotal - player.total}</dd></div><div><dt>${t('Vittorie','Wins')}</dt><dd>${player.wins}</dd></div><div><dt>${t('Presenze','Attendance')}</dt><dd>${player.attendance}/6</dd></div><div><dt>${t('Miglior piazzamento','Best finish')}</dt><dd>${player.best}</dd></div></dl>
          </div>
        </article>`;
      }).join('');
    };

    const renderFinal = () => {
      const target = root.querySelector('[data-final-feature]');
      const event = data.leagueEvents.find(item => item.type === 'final');
      if (!target || !event) return;
      target.innerHTML = `<div class="finale-feature__copy"><p class="eyebrow">${t('IL CAPITOLO CONCLUSIVO','THE FINAL CHAPTER')}</p><p class="finale-feature__date">${utils.formatDate(event.date)} · ${event.time}</p><h2>${utils.pick(event.title)}</h2><p>${utils.pick(event.description)}</p><blockquote>${utils.pick(event.commentary)}</blockquote><div class="finale-feature__actions"><button class="button button--primary" type="button" data-reminder-id="${event.id}">${t('Ricordami la Finale','Remind me')}</button><a class="button button--ghost" href="../index.html#streaming">${t('Area dirette','Live area')}</a></div></div><div class="finale-feature__mark"><span>FINAL</span><strong>6+1</strong></div>`;
    };

    root.addEventListener('click', event => {
      const reminder = event.target.closest('[data-reminder-id]');
      if (reminder) {
        const item = utils.getAllEvents().find(entry => entry.id === reminder.dataset.reminderId);
        if (item) utils.createReminder(item);
        return;
      }
      const stage = event.target.closest('[data-season-event]');
      if (stage) {
        state.selectedEventId = stage.dataset.seasonEvent;
        renderSeason();
        return;
      }
      const toggle = event.target.closest('[data-player-toggle]');
      if (toggle) {
        const playerName = decodeURIComponent(toggle.dataset.playerToggle);
        state.openPlayer = state.openPlayer === playerName ? null : playerName;
        renderStandings();
      }
    });

    const search = root.querySelector('[data-standing-search]');
    if (search) search.addEventListener('input', () => { state.query = search.value; renderStandings(); });

    const renderAll = () => {
      renderHeroFacts();
      renderSpotlight();
      renderStories();
      renderSeason();
      renderStandings();
      renderFinal();
    };
    window.addEventListener('nika:languagechange', renderAll);
    renderAll();
  }
};
