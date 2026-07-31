(() => {
  const STORAGE_KEY = 'nika-language';
  const MAX_DON = 10;
  const BOARD_W = 595;
  const BOARD_H = 420;
  let language = localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'it';
  let currentGuide = null;
  let simulatorState = { path: 'first', turn: 0, action: 0 };

  const localize = value => {
    if (value && typeof value === 'object' && !Array.isArray(value)) return value[language] ?? value.it ?? value.en ?? '';
    return value ?? '';
  };

  const escapeHtml = value => String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const resolveAsset = path => { if (!path) return ''; if (/^(data:|blob:|https?:)/i.test(path)) return path; return `${document.body.dataset.rootPrefix || ''}${path}`; };
  const pctX = px => `${(px / BOARD_W) * 100}%`;
  const pctY = px => `${(px / BOARD_H) * 100}%`;
  const clampNumber = (value, min, max) => Math.min(max, Math.max(min, Number(value) || 0));
  const enabledModules = guide => (guide.modules || []).filter(module => module.enabled !== false).sort((a, b) => Number(a.order || 0) - Number(b.order || 0));

  const cardData = key => currentGuide?.cards?.[key] || currentGuide?.cards?.techA || { label: { it: key || 'Carta', en: key || 'Card' }, accentA: '#7762b8', accentB: '#2a2142' };

  const renderCardVisual = (key, className = '') => {
    const card = cardData(key);
    return `<span class="premium-card-visual ${className}" style="--card-a:${escapeHtml(card.accentA)};--card-b:${escapeHtml(card.accentB)}"><span>${escapeHtml(localize(card.label))}</span></span>`;
  };

  const renderModuleHead = module => `<header class="premium-module__head"><p class="premium-module__eyebrow">${escapeHtml(localize(module.eyebrow || module.type))}</p><h2>${escapeHtml(localize(module.title))}</h2>${module.body ? `<p>${escapeHtml(localize(module.body))}</p>` : ''}</header>`;

  const renderIntro = module => `<section class="premium-module" data-module-id="${escapeHtml(module.id)}" data-module-type="intro">${renderModuleHead({ ...module, body: '' })}<div class="premium-editorial-text"><p>${escapeHtml(localize(module.body))}</p></div></section>`;

  const renderDecklist = module => {
    const image = resolveAsset(module.image);
    return `<section class="premium-module" data-module-id="${escapeHtml(module.id)}" data-module-type="decklistImage">${renderModuleHead(module)}<button class="premium-decklist-slot ${image ? 'has-image' : ''}" type="button" ${image ? `data-decklist-open data-decklist-src="${escapeHtml(image)}"` : 'disabled'}>${image ? `<img src="${escapeHtml(image)}" alt="${escapeHtml(localize(module.imageAlt))}" loading="lazy">` : `<span class="premium-decklist-placeholder"><strong>${language === 'en' ? 'Deck list image slot' : 'Spazio immagine decklist'}</strong><span>${language === 'en' ? 'Upload one complete deck list image from the future admin dashboard.' : 'Dalla futura dashboard verrà caricata un’unica immagine della lista completa.'}</span></span>`}</button></section>`;
  };

  const renderHand = (module, groupName, customClass = '') => {
    const cards = (module.cards || module.mulligan || []).slice(0, 5);
    const firstNote = cards[0] ? localize(cards[0].note) : '';
    return `<div class="${customClass}" data-hand-group="${escapeHtml(groupName)}"><div class="premium-hand-grid">${cards.map((item, index) => `<button type="button" class="premium-card-button ${index === 0 ? 'is-active' : ''}" data-hand-card="${index}" aria-pressed="${index === 0}" aria-label="${escapeHtml(localize(cardData(item.card).label))}">${renderCardVisual(item.card)}</button>`).join('')}</div><div class="premium-hand-note" data-hand-note>${escapeHtml(firstNote)}</div></div>`;
  };

  const renderGenericMulligan = module => `<section class="premium-module" data-module-id="${escapeHtml(module.id)}" data-module-type="genericMulligan">${renderModuleHead(module)}${renderHand(module, module.id)}</section>`;

  const renderEditorialText = module => `<section class="premium-module" data-module-id="${escapeHtml(module.id)}" data-module-type="editorialText">${renderModuleHead({ ...module, body: '' })}<div class="premium-editorial-text"><p>${escapeHtml(localize(module.body))}</p></div></section>`;

  const renderSimulator = module => `<section class="premium-module" data-module-id="${escapeHtml(module.id)}" data-module-type="simulator">${renderModuleHead(module)}<div class="premium-simulator" data-simulator data-module-key="${escapeHtml(module.id)}"><div class="premium-sim-tabs"><button class="premium-sim-tab is-active" type="button" data-sim-path="first">Going 1st</button><button class="premium-sim-tab" type="button" data-sim-path="second">Going 2nd</button></div><div class="premium-sim-actions" data-sim-actions></div><div class="premium-sim-summary"><div><h3 data-sim-title></h3><p data-sim-summary></p></div><span class="premium-sim-status" data-sim-status></span></div><div class="premium-board-wrap"><div class="premium-board" data-sim-board></div></div><div class="premium-sim-comment" data-sim-comment></div><div class="premium-sim-navs"><button class="premium-sim-nav" type="button" data-sim-prev-action>${language === 'en' ? 'Previous action' : 'Azione precedente'}</button><button class="premium-sim-nav" type="button" data-sim-next-action>${language === 'en' ? 'Next action' : 'Azione successiva'}</button><button class="premium-sim-nav" type="button" data-sim-prev-turn>${language === 'en' ? 'Previous turn' : 'Turno precedente'}</button><button class="premium-sim-nav" type="button" data-sim-next-turn>${language === 'en' ? 'Next turn' : 'Prossimo turno'}</button></div></div></section>`;

  const renderTechCards = module => {
    const items = (module.items || []).slice(0, 5);
    const selected = items[0];
    return `<section class="premium-module" data-module-id="${escapeHtml(module.id)}" data-module-type="techCards">${renderModuleHead(module)}<div class="premium-tech-layout" data-tech-module><div class="premium-tech-cards">${items.map((item, index) => `<button type="button" class="premium-card-button ${index === 0 ? 'is-active' : ''}" data-tech-index="${index}" aria-pressed="${index === 0}" aria-label="${escapeHtml(localize(item.title))}">${renderCardVisual(item.card)}</button>`).join('')}</div><div class="premium-tech-detail" data-tech-detail>${selected ? renderTechDetail(selected) : ''}</div></div></section>`;
  };

  const renderTechDetail = item => `<h3>${escapeHtml(localize(item.title))}</h3><div class="premium-tech-info"><div><h4>${language === 'en' ? 'When is it useful?' : 'Quando è utile?'}</h4><p>${escapeHtml(localize(item.whenUseful))}</p></div><div><h4>${language === 'en' ? 'Description' : 'Descrizione'}</h4><p>${escapeHtml(localize(item.description))}</p></div><div><h4>${language === 'en' ? 'What do you remove?' : 'Cosa togliere per inserirla?'}</h4><p>${escapeHtml(localize(item.replace))}</p></div><div><h4>${language === 'en' ? 'Why play it?' : 'Perché giocarla?'}</h4><p>${escapeHtml(localize(item.why))}</p></div></div><div class="premium-sample-list">${item.sampleListImage ? `<img src="${escapeHtml(resolveAsset(item.sampleListImage))}" alt="Sample list" loading="lazy">` : `<span><strong>Sample list</strong><br>${language === 'en' ? 'Uploadable image slot for an alternative list.' : 'Spazio immagine caricabile per una lista alternativa.'}</span>`}</div>`;

  const renderMatchups = module => `<section class="premium-module" data-module-id="${escapeHtml(module.id)}" data-module-type="matchups">${renderModuleHead(module)}<div class="premium-matchups">${(module.items || []).map((item, index) => renderMatchup(item, index)).join('')}</div></section>`;

  const renderMatchup = (item, index) => {
    const image = resolveAsset(item.image);
    const tags = (item.tags || []).map(tag => `<span class="premium-matchup-tag">${escapeHtml(localize(tag))}</span>`).join('');
    return `<details class="premium-matchup" ${index === 0 ? 'open' : ''} data-matchup-id="${escapeHtml(item.id)}"><summary><div class="premium-matchup-banner"><div class="premium-matchup-banner__main"><div class="premium-matchup-banner__image" style="background-image:url('${escapeHtml(image)}');background-position:${escapeHtml(item.imagePosition || 'center')}"></div><div class="premium-matchup-banner__copy"><small>${language === 'en' ? 'Matchup dossier' : 'Dossier matchup'} · ${String(index + 1).padStart(2, '0')}</small><strong>${escapeHtml(localize(item.title))}</strong></div><span class="premium-matchup-arrow" aria-hidden="true">⌄</span></div><div class="premium-matchup-banner__tags">${tags}</div></div></summary><div class="premium-matchup-body"><div class="premium-matchup-comment"><h4>${language === 'en' ? 'General comment' : 'Commento generale'}</h4><p>${escapeHtml(localize(item.comment))}</p></div><div class="premium-matchup-plans"><div class="premium-matchup-plan"><h4>Going 1st</h4><p>${escapeHtml(localize(item.first))}</p></div><div class="premium-matchup-plan"><h4>Going 2nd</h4><p>${escapeHtml(localize(item.second))}</p></div></div><div class="premium-matchup-depth"><h4>${language === 'en' ? 'How to approach the matchup' : 'Come affrontare il matchup'}</h4><div class="premium-matchup-depth__scroll" tabindex="0"><p>${escapeHtml(localize(item.deepDive))}</p></div></div><div class="premium-matchup-mulligan"><h4>${language === 'en' ? 'Custom mulligan' : 'Mulligan personalizzato'}</h4><p>${language === 'en' ? 'Five cards configurable independently for this matchup.' : 'Cinque carte configurabili in modo indipendente per questo matchup.'}</p>${renderHand({ cards: item.mulligan }, `matchup-${item.id}`, 'premium-matchup-hand')}</div></div></details>`;
  };

  const safeHttpUrl = value => {
    try {
      const url = new URL(value, window.location.href);
      return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
    } catch { return ''; }
  };

  const renderVods = module => `<section class="premium-module" data-module-id="${escapeHtml(module.id)}" data-module-type="vods">${renderModuleHead(module)}<div class="premium-vods">${(module.items || []).map(item => {
    const thumb = resolveAsset(item.thumbnail);
    const url = safeHttpUrl(item.videoUrl);
    return `<article class="premium-vod"><div class="premium-vod__thumb" ${thumb ? `style="background-image:url('${escapeHtml(thumb)}')"` : ''}><span class="premium-vod__play" aria-hidden="true">▶</span></div><div class="premium-matchup-banner__tags">${(item.tags || []).map(tag => `<span class="premium-matchup-tag">${escapeHtml(tag)}</span>`).join('')}</div><h3>${escapeHtml(localize(item.title))}</h3><p>${escapeHtml(localize(item.description))}</p>${url ? `<a class="premium-vod__link" href="${escapeHtml(url)}" target="_blank" rel="noopener">${language === 'en' ? 'Watch video' : 'Guarda il video'} →</a>` : `<span class="premium-vod__link">${language === 'en' ? 'Video link / embed ready' : 'Link / embed video predisposto'}</span>`}</article>`;
  }).join('')}</div></section>`;

  const renderReviews = module => `<section class="premium-module" data-module-id="${escapeHtml(module.id)}" data-module-type="reviews">${renderModuleHead(module)}<div class="premium-review-layout"><form class="premium-review-form" data-review-form><div class="premium-rating" aria-label="${language === 'en' ? 'Guide rating' : 'Valutazione della guida'}">${[5,4,3,2,1].map(value => `<input type="radio" name="premium-rating" id="premium-rating-${value}" value="${value}"><label class="premium-star-label" for="premium-rating-${value}" aria-label="${value} stelle">★</label>`).join('')}</div><label>${language === 'en' ? 'Name or nickname' : 'Nome o nickname'}<input type="text" maxlength="48" required data-review-name></label><label>${language === 'en' ? 'Comment' : 'Commento'}<textarea maxlength="1200" required data-review-text></textarea></label><div class="premium-review-actions"><button class="button button--primary" type="submit">${language === 'en' ? 'Publish review' : 'Pubblica recensione'}</button><button class="button button--ghost" type="button" data-review-delete hidden>${language === 'en' ? 'Delete mine' : 'Elimina il mio'}</button></div><div class="premium-review-message" data-review-message aria-live="polite"></div></form><div class="premium-review-list" data-review-list></div></div></section>`;

  const moduleRenderers = {
    intro: renderIntro,
    decklistImage: renderDecklist,
    genericMulligan: renderGenericMulligan,
    simulator: renderSimulator,
    editorialText: renderEditorialText,
    techCards: renderTechCards,
    matchups: renderMatchups,
    vods: renderVods,
    reviews: renderReviews
  };

  const renderHero = guide => {
    const metrics = [
      { key: 'difficulty', label: language === 'en' ? 'Difficulty' : 'Difficoltà' },
      { key: 'strength', label: language === 'en' ? 'Strength' : 'Forza' },
      { key: 'consistency', label: language === 'en' ? 'Consistency' : 'Consistenza' }
    ];
    return `<section class="premium-guide-hero" style="--guide-accent-a:${escapeHtml(guide.accentA)};--guide-accent-b:${escapeHtml(guide.accentB)}"><div class="premium-guide-hero__content"><div class="premium-guide-hero__top"><div><nav class="premium-guide-breadcrumb"><a href="../">${language === 'en' ? 'Premium guides' : 'Guide premium'}</a><span>›</span><span>${escapeHtml(guide.leader)}</span></nav><p class="premium-guide-kicker">${escapeHtml(localize(guide.title))}</p><h1>${escapeHtml(guide.leader)}</h1><p class="premium-guide-hero__subtitle">${escapeHtml(localize(guide.subtitle))}</p></div><div class="premium-guide-hero__meta"><span class="premium-guide-hero__chip">${escapeHtml(guide.format)}</span><span class="premium-guide-hero__chip">${escapeHtml(guide.readingTime)} min</span><span class="premium-guide-hero__chip">${escapeHtml(guide.updatedAt)}</span></div></div><div class="premium-guide-metrics">${metrics.map(metric => {
      const value = clampNumber(guide.metrics?.[metric.key], 0, 5);
      return `<div class="premium-metric"><div class="premium-metric__head"><span>${metric.label}</span><span>${value}/5</span></div><div class="premium-metric__track"><span class="premium-metric__fill" style="--metric-width:${value * 20}%"></span></div></div>`;
    }).join('')}</div></div></section>`;
  };

  const renderPage = guide => {
    const root = document.querySelector('[data-premium-guide-root]');
    if (!root) return;
    currentGuide = guide;
    simulatorState = { path: 'first', turn: 0, action: 0 };
    document.title = `${guide.leader} ${guide.format} — La Tana di Nika`;
    root.innerHTML = `${renderHero(guide)}<div class="premium-guide-modules">${enabledModules(guide).map(module => moduleRenderers[module.type]?.(module) || '').join('')}</div>`;
    initializeHands(root);
    initializeTech(root);
    initializeSimulator(root);
    initializeReviews(root);
    initializeDecklist(root);
  };

  const initializeHands = root => {
    root.querySelectorAll('[data-hand-group]').forEach(group => {
      const buttons = [...group.querySelectorAll('[data-hand-card]')];
      const note = group.querySelector('[data-hand-note]');
      let sourceItems = [];
      const matchup = group.closest('[data-matchup-id]');
      if (matchup) {
        const matchupModule = enabledModules(currentGuide).find(module => module.type === 'matchups');
        sourceItems = matchupModule?.items?.find(item => item.id === matchup.dataset.matchupId)?.mulligan || [];
      } else {
        const moduleId = group.dataset.handGroup;
        sourceItems = enabledModules(currentGuide).find(module => module.id === moduleId)?.cards || [];
      }
      buttons.forEach((button, index) => button.addEventListener('click', () => {
        buttons.forEach(candidate => { candidate.classList.remove('is-active'); candidate.setAttribute('aria-pressed', 'false'); });
        button.classList.add('is-active');
        button.setAttribute('aria-pressed', 'true');
        if (note) note.textContent = localize(sourceItems[index]?.note);
      }));
    });
  };

  const initializeTech = root => {
    root.querySelectorAll('[data-tech-module]').forEach(container => {
      const moduleElement = container.closest('[data-module-id]');
      const module = enabledModules(currentGuide).find(item => item.id === moduleElement?.dataset.moduleId);
      const detail = container.querySelector('[data-tech-detail]');
      const buttons = [...container.querySelectorAll('[data-tech-index]')];
      buttons.forEach(button => button.addEventListener('click', () => {
        const index = Number(button.dataset.techIndex);
        buttons.forEach(candidate => { candidate.classList.remove('is-active'); candidate.setAttribute('aria-pressed', 'false'); });
        button.classList.add('is-active');
        button.setAttribute('aria-pressed', 'true');
        if (detail && module?.items?.[index]) detail.innerHTML = renderTechDetail(module.items[index]);
      }));
    });
  };

  const initializeSimulator = root => {
    const container = root.querySelector('[data-simulator]');
    if (!container) return;
    const module = enabledModules(currentGuide).find(item => item.id === container.dataset.moduleKey);
    if (!module) return;

    container.querySelectorAll('[data-sim-path]').forEach(button => button.addEventListener('click', () => {
      simulatorState = { path: button.dataset.simPath, turn: 0, action: 0 };
      renderSimulatorState(container, module);
    }));
    container.querySelector('[data-sim-prev-action]')?.addEventListener('click', () => { if (simulatorState.action > 0) simulatorState.action -= 1; renderSimulatorState(container, module); });
    container.querySelector('[data-sim-next-action]')?.addEventListener('click', () => {
      const actions = module.paths?.[simulatorState.path]?.turns?.[simulatorState.turn]?.actions || [];
      if (simulatorState.action < actions.length - 1) simulatorState.action += 1;
      renderSimulatorState(container, module);
    });
    container.querySelector('[data-sim-prev-turn]')?.addEventListener('click', () => { if (simulatorState.turn > 0) { simulatorState.turn -= 1; simulatorState.action = 0; } renderSimulatorState(container, module); });
    container.querySelector('[data-sim-next-turn]')?.addEventListener('click', () => {
      const turns = module.paths?.[simulatorState.path]?.turns || [];
      if (simulatorState.turn < turns.length - 1) { simulatorState.turn += 1; simulatorState.action = 0; }
      renderSimulatorState(container, module);
    });
    renderSimulatorState(container, module);
  };

  const renderSimulatorState = (container, module) => {
    const path = module.paths?.[simulatorState.path];
    const turns = path?.turns || [];
    const turn = turns[simulatorState.turn] || turns[0];
    if (!turn) return;
    const actions = turn.actions || [];
    const action = actions[simulatorState.action] || actions[0] || {};
    simulatorState.action = Math.min(simulatorState.action, Math.max(0, actions.length - 1));

    container.querySelectorAll('[data-sim-path]').forEach(button => button.classList.toggle('is-active', button.dataset.simPath === simulatorState.path));
    const actionWrap = container.querySelector('[data-sim-actions]');
    if (actionWrap) {
      actionWrap.innerHTML = actions.map((item, index) => `<button type="button" class="premium-sim-action ${index === simulatorState.action ? 'is-active' : ''}" data-action-index="${index}">T${turn.turn} · A${index + 1}</button>`).join('');
      actionWrap.querySelectorAll('[data-action-index]').forEach(button => button.addEventListener('click', () => { simulatorState.action = Number(button.dataset.actionIndex); renderSimulatorState(container, module); }));
    }
    container.querySelector('[data-sim-title]').textContent = `${language === 'en' ? 'Turn' : 'Turno'} ${turn.turn} · ${localize(action.title)}`;
    container.querySelector('[data-sim-summary]').textContent = localize(turn.summary);
    container.querySelector('[data-sim-status]').textContent = `${turn.don} DON · ${action.donTapped || 0} ${language === 'en' ? 'rested' : 'tappati'}`;
    container.querySelector('[data-sim-comment]').textContent = localize(action.comment);

    const prevA = container.querySelector('[data-sim-prev-action]');
    const nextA = container.querySelector('[data-sim-next-action]');
    const prevT = container.querySelector('[data-sim-prev-turn]');
    const nextT = container.querySelector('[data-sim-next-turn]');
    if (prevA) prevA.disabled = simulatorState.action === 0;
    if (nextA) nextA.disabled = simulatorState.action >= actions.length - 1;
    if (prevT) prevT.disabled = simulatorState.turn === 0;
    if (nextT) nextT.disabled = simulatorState.turn >= turns.length - 1;
    renderBoard(container.querySelector('[data-sim-board]'), module, turn, action);
  };

  const boardSlot = (x, y, w, h) => `left:${pctX(x)};top:${pctY(y)};width:${pctX(w)};height:${pctY(h)};`;
  const boardCard = (key, x, y, w = 84.48, h = 118, extra = '') => {
    const card = cardData(key);
    return `<span class="premium-board-card is-placeholder ${extra}" style="${boardSlot(x,y,w,h)}--card-a:${escapeHtml(card.accentA)};--card-b:${escapeHtml(card.accentB)}"><span>${escapeHtml(localize(card.label))}</span></span>`;
  };

  const renderBoard = (board, module, turn, action) => {
    if (!board) return;
    const assets = module.assets || {};
    board.style.backgroundImage = `url('${resolveAsset(assets.playmat)}')`;
    const charX = [80, 184.1, 288.2, 392.3, 496.4];
    const zones = [
      [79,15,501,120], [297,146,83,127], [395,146,83,127], [495,146,89,125], [116,278,365,128], [494,278,84,122], [16,278,83,122]
    ].map(rect => `<span class="premium-board__zone" style="${boardSlot(...rect)}"></span>`).join('');
    let html = zones;

    const lifeCount = clampNumber(action.life, 0, 5);
    for (let i = 0; i < lifeCount; i += 1) {
      html += `<span class="premium-life-card" style="${boardSlot(-29, -6 + (i * 39), 84.48, 118)}background-image:url('${resolveAsset(assets.cardBack)}')"></span>`;
    }

    html += boardCard('leader', 298, 153, 81, 113.14);
    if (action.stage) html += boardCard(action.stage, 396, 153, 81, 113.14);
    html += `<span class="premium-board-card" style="${boardSlot(496,148,87,121.5)}background-image:url('${resolveAsset(assets.cardBack)}')"></span>`;
    if (turn.don < MAX_DON || (action.donReturned || 0) > 0) html += `<span class="premium-board-card" style="${boardSlot(17,280,81,113.14)}background-image:url('${resolveAsset(assets.donBack)}')"></span>`;
    if (action.trash) html += boardCard(action.trash, 495, 282, 82, 114.5);

    (action.chars || []).slice(0,5).forEach((key, index) => { if (key) html += boardCard(key, charX[index], 16); });

    const totalDon = clampNumber(turn.don - (action.donReturned || 0), 0, MAX_DON);
    const tapped = clampNumber(action.donTapped, 0, totalDon);
    const active = totalDon - tapped;
    for (let i = 0; i < tapped; i += 1) {
      const x = 116 + (i * 15.5);
      html += `<span class="premium-don-card is-tapped" style="${boardSlot(x,283,84.48,118)}z-index:${10 + i};background-image:url('${resolveAsset(assets.donFront)}')"></span>`;
    }
    const activeStart = 475 - 84.48 - Math.max(0, active - 1) * 16;
    for (let i = 0; i < active; i += 1) {
      const x = activeStart + (i * 16);
      html += `<span class="premium-don-card" style="${boardSlot(x,283,84.48,118)}z-index:${30 + i};background-image:url('${resolveAsset(assets.donFront)}')"></span>`;
    }
    board.innerHTML = html;
  };

  const reviewStorageKey = () => `nika-premium-review:${currentGuide.id}`;
  const initializeReviews = root => {
    const form = root.querySelector('[data-review-form]');
    if (!form) return;
    const list = root.querySelector('[data-review-list]');
    const nameInput = form.querySelector('[data-review-name]');
    const textInput = form.querySelector('[data-review-text]');
    const message = form.querySelector('[data-review-message]');
    const deleteButton = form.querySelector('[data-review-delete]');

    const read = () => {
      try { return JSON.parse(localStorage.getItem(reviewStorageKey()) || 'null'); } catch { return null; }
    };
    const render = () => {
      const review = read();
      deleteButton.hidden = !review;
      if (!review) {
        list.innerHTML = `<p>${language === 'en' ? 'No local review yet. Shared comments will arrive with Supabase.' : 'Nessuna recensione locale. I commenti condivisi arriveranno con Supabase.'}</p>`;
        return;
      }
      const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
      list.innerHTML = `<article class="premium-review-item"><div class="premium-review-item__top"><strong>${escapeHtml(review.name)}</strong><span class="premium-review-item__stars">${stars}</span></div><p>${escapeHtml(review.text)}</p></article>`;
      nameInput.value = review.name;
      textInput.value = review.text;
      const radio = form.querySelector(`input[name="premium-rating"][value="${review.rating}"]`);
      if (radio) radio.checked = true;
    };

    form.addEventListener('submit', event => {
      event.preventDefault();
      const rating = Number(new FormData(form).get('premium-rating'));
      const name = nameInput.value.trim();
      const text = textInput.value.trim();
      if (!rating || !name || !text) {
        message.textContent = language === 'en' ? 'Select stars and complete all fields.' : 'Seleziona le stelle e completa tutti i campi.';
        return;
      }
      localStorage.setItem(reviewStorageKey(), JSON.stringify({ rating, name, text, updatedAt: new Date().toISOString() }));
      message.textContent = language === 'en' ? 'Review saved on this device.' : 'Recensione salvata su questo dispositivo.';
      render();
    });
    deleteButton.addEventListener('click', () => {
      localStorage.removeItem(reviewStorageKey());
      form.reset();
      message.textContent = language === 'en' ? 'Review deleted.' : 'Recensione eliminata.';
      render();
    });
    render();
  };

  const initializeDecklist = root => {
    const lightbox = document.querySelector('[data-premium-lightbox]');
    const image = lightbox?.querySelector('img');
    const close = () => {
      if (!lightbox) return;
      lightbox.hidden = true;
      image?.removeAttribute('src');
      document.documentElement.classList.remove('guide-scroll-locked');
      document.body.classList.remove('guide-scroll-locked');
    };
    root.querySelectorAll('[data-decklist-open]').forEach(button => button.addEventListener('click', () => {
      if (!lightbox || !image) return;
      image.src = button.dataset.decklistSrc;
      lightbox.hidden = false;
      document.documentElement.classList.add('guide-scroll-locked');
      document.body.classList.add('guide-scroll-locked');
    }));
    lightbox?.querySelector('[data-premium-lightbox-close]')?.addEventListener('click', close);
    lightbox?.addEventListener('click', event => { if (event.target === lightbox) close(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !lightbox?.hidden) close(); });
  };

  const findGuide = () => {
    const data = window.NIKA_PREMIUM_GUIDES_DATA;
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('id') || params.get('slug') || '';
    return (data?.guides || []).find(guide => guide.status === 'published' && (guide.id === requested || guide.slug === requested)) || (data?.guides || []).find(guide => guide.status === 'published');
  };

  const init = () => {
    const root = document.querySelector('[data-premium-guide-root]');
    if (!root) return;
    const guide = findGuide();
    if (!guide) {
      root.innerHTML = `<div class="premium-guide-missing"><strong>${language === 'en' ? 'Guide not found' : 'Guida non trovata'}</strong><p>${language === 'en' ? 'The requested premium guide is not available.' : 'La guida premium richiesta non è disponibile.'}</p><a class="button button--primary" href="../">${language === 'en' ? 'Back to premium guides' : 'Torna alle guide premium'}</a></div>`;
      return;
    }
    renderPage(guide);
    window.addEventListener('nika:languagechange', event => {
      const next = event.detail?.language;
      if (!['it','en'].includes(next) || next === language) return;
      language = next;
      renderPage(guide);
    });
  };

  document.addEventListener('DOMContentLoaded', init);
})();
