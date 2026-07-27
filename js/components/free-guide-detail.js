(() => {
  const data = window.NIKA_FREE_GUIDES_DATA;
  if (!data) return;

  const MAX_ITEMS = Number(data.settings?.limits?.itemsPerCardSection?.max) || 5;
  const MAX_INSTANCES = Number(data.settings?.limits?.moduleInstancesPerType?.max) || 5;

  const currentLanguage = () => document.documentElement.lang === "en" ? "en" : "it";
  const localize = (value, language = currentLanguage()) => {
    if (typeof value === "string") return value;
    return value?.[language] ?? value?.it ?? value?.en ?? "";
  };
  const escapeHTML = value => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
  const escapeAttr = escapeHTML;

  const words = {
    it: {
      status: "Mini guida gratuita",
      updated: "Aggiornamento",
      reading: "Tempo di lettura",
      style: "Stile",
      minutes: "minuti",
      index: "Indice dossier",
      keyCards: "Carte chiave",
      nextCard: "Tocca per scoprire la prossima",
      restart: "Tocca per ricominciare",
      cardOf: (index, total) => `Carta ${index} di ${total}`,
      referenceList: "Lista di riferimento",
      decklist: "Decklist",
      copy: "Copia lista testuale",
      download: "Scarica formato SIM",
      copied: "Testo copiato negli appunti",
      blocked: "Accesso agli appunti bloccato: seleziona il testo",
      flip: "Gira la carta",
      front: "Fronte",
      technicalNote: "Nota tecnica",
      openSequence: "Apri la sequenza",
      closeSequence: "Richiudi la sequenza",
      selectedCard: "Carta selezionata",
      strengths: "Punti di forza",
      weaknesses: "Punti deboli",
      cards: "carte",
      returnText: "Vuoi esplorare un altro mazzo?",
      back: "Torna alle mini guide",
      editorial: "Area Editoriale",
      copyEyebrow: "Lista testuale",
      copyTitle: "Copia manualmente la decklist",
      copyHelp: "Seleziona il testo e copialo dal menu del dispositivo.",
      selectAll: "Seleziona tutto",
      notFoundEyebrow: "GUIDA NON DISPONIBILE",
      notFoundTitle: "Ancora non c'è una guida per questo mazzo, siamo spiacenti.",
      notFoundCopy: "Il nostro archivio è in continuo aggiornamento. Prova a cercare un altro Leader.",
      communityEyebrow: "LA COMMUNITY",
      communityTitle: "Commenti e valutazioni",
      communityIntro: "Hai provato il mazzo o hai trovato utile la guida? Lascia la tua esperienza.",
      ratingLabel: "Valuta la guida",
      authorLabel: "Nome o nickname",
      commentLabel: "Lascia un commento",
      publishComment: "Pubblica commento",
      updateComment: "Aggiorna commento",
      cancelEdit: "Annulla modifica",
      commentsTitle: "Commenti",
      noComments: "Ancora nessun commento. Puoi essere il primo.",
      noRatings: "Ancora nessuna valutazione",
      ratingCount: count => count === 1 ? "1 valutazione" : `${count} valutazioni`,
      commentPublished: "Commento pubblicato",
      commentUpdated: "Commento aggiornato",
      commentDeleted: "Commento eliminato",
      chooseRating: "Seleziona una valutazione da una a cinque stelle",
      invalidComment: "Inserisci un nome e un commento",
      edit: "Modifica",
      remove: "Elimina",
      confirmDelete: "Eliminare questo commento?",
      yourComment: "Il tuo commento",
      localDate: "it-IT"
    },
    en: {
      status: "Free mini guide",
      updated: "Updated",
      reading: "Reading time",
      style: "Style",
      minutes: "minutes",
      index: "Dossier index",
      keyCards: "Key cards",
      nextCard: "Tap to discover the next card",
      restart: "Tap to start again",
      cardOf: (index, total) => `Card ${index} of ${total}`,
      referenceList: "Reference list",
      decklist: "Decklist",
      copy: "Copy text list",
      download: "Download SIM format",
      copied: "Text copied to clipboard",
      blocked: "Clipboard access blocked: select the text",
      flip: "Flip the card",
      front: "Front",
      technicalNote: "Technical note",
      openSequence: "Open the sequence",
      closeSequence: "Close the sequence",
      selectedCard: "Selected card",
      strengths: "Strengths",
      weaknesses: "Weaknesses",
      cards: "cards",
      returnText: "Want to explore another deck?",
      back: "Back to mini guides",
      editorial: "Editorial Area",
      copyEyebrow: "Text list",
      copyTitle: "Copy the decklist manually",
      copyHelp: "Select the text and copy it from your device menu.",
      selectAll: "Select all",
      notFoundEyebrow: "GUIDE NOT AVAILABLE",
      notFoundTitle: "There is no guide for this deck yet, we're sorry.",
      notFoundCopy: "Our archive is constantly being updated. Try searching for another Leader.",
      communityEyebrow: "THE COMMUNITY",
      communityTitle: "Comments and ratings",
      communityIntro: "Have you tried the deck or found the guide useful? Share your experience.",
      ratingLabel: "Rate the guide",
      authorLabel: "Name or nickname",
      commentLabel: "Leave a comment",
      publishComment: "Publish comment",
      updateComment: "Update comment",
      cancelEdit: "Cancel edit",
      commentsTitle: "Comments",
      noComments: "No comments yet. You can be the first.",
      noRatings: "No ratings yet",
      ratingCount: count => count === 1 ? "1 rating" : `${count} ratings`,
      commentPublished: "Comment published",
      commentUpdated: "Comment updated",
      commentDeleted: "Comment deleted",
      chooseRating: "Choose a rating from one to five stars",
      invalidComment: "Enter a name and a comment",
      edit: "Edit",
      remove: "Delete",
      confirmDelete: "Delete this comment?",
      yourComment: "Your comment",
      localDate: "en-GB"
    }
  };

  const resolveAsset = path => {
    if (!path) return "";
    if (/^(https?:|data:|blob:)/i.test(path)) return path;
    const prefix = document.body.dataset.rootPrefix || "";
    return `${prefix}${String(path).replace(/^\/+/, "")}`;
  };

  const formatDate = (isoDate, language) => {
    if (!isoDate) return "—";
    const date = new Date(`${isoDate}T12:00:00`);
    if (Number.isNaN(date.getTime())) return isoDate;
    return new Intl.DateTimeFormat(language === "en" ? "en-GB" : "it-IT", {
      day: "2-digit", month: "long", year: "numeric"
    }).format(date);
  };

  const cardImageMarkup = (item, index, language) => {
    const image = resolveAsset(item.image);
    const imageMarkup = image
      ? `<img src="${escapeAttr(image)}" alt="${escapeAttr(localize(item.imageAlt, language))}" loading="lazy" decoding="async">`
      : `<span class="guide-card-image__sample">SAMPLE</span>`;
    return `<div class="guide-card-image"
                 style="--card-a:${escapeAttr(item.accentA || "#657dc2")};--card-b:${escapeAttr(item.accentB || "#202743")}">
              ${imageMarkup}
              <span class="guide-card-image__number">${String(index + 1).padStart(2, "0")}</span>
              <strong>${escapeHTML(item.name)}</strong>
            </div>`;
  };

  const moduleShell = (module, language, inner, extraClass = "") => `
    <section class="guide-module ${extraClass}" id="${escapeAttr(module.id)}" data-module-type="${escapeAttr(module.type)}">
      <p class="guide-module__eyebrow">${escapeHTML(localize(module.eyebrow, language))}</p>
      <h2 class="guide-module__title">${escapeHTML(localize(module.title, language))}</h2>
      ${module.body ? `<p class="guide-module__copy">${escapeHTML(localize(module.body, language))}</p>` : ""}
      ${inner}
    </section>`;

  const renderWhy = (module, language) => `
    <section class="guide-module guide-module--why" id="${escapeAttr(module.id)}" data-module-type="${escapeAttr(module.type)}">
      <p class="guide-module__eyebrow">${escapeHTML(localize(module.eyebrow, language))}</p>
      <h2 class="guide-module__title">${escapeHTML(localize(module.title, language))}</h2>
      <div class="guide-why">
        <blockquote>${escapeHTML(localize(module.quote, language))}</blockquote>
        <p>${escapeHTML(localize(module.body, language))}</p>
      </div>
    </section>`;

  const renderIdentity = (module, language) => {
    const metrics = (module.metrics || []).slice(0, 4).map(metric => `
      <article class="guide-metric">
        <small>${escapeHTML(localize(metric.label, language))}</small>
        <strong>${escapeHTML(localize(metric.value, language))}</strong>
        <div class="guide-meter"><span style="--value:${Math.max(0, Math.min(100, Number(metric.score) || 0))}%"></span></div>
      </article>`).join("");
    return moduleShell(module, language, `<div class="guide-metrics">${metrics}</div>`);
  };

  const renderKeyCards = (module, language) => {
    const items = (module.items || []).slice(0, MAX_ITEMS);
    if (!items.length) return "";
    const sequenceCenter = (items.length - 1) / 2;
    const cards = items.map((item, index) => {
      const offset = index - sequenceCenter;
      const nextX = offset * (items.length >= 5 ? 36 : items.length === 4 ? 44 : 56);
      const nextR = offset * (items.length >= 5 ? 5 : 7);
      return `
      <article class="guide-sequence-card${index === 0 ? " is-current" : " is-next"}"
               style="--next-x:${nextX}px;--next-r:${nextR}deg"
               data-sequence-card
               data-name="${escapeAttr(item.name)}"
               data-comment="${escapeAttr(localize(item.comment, language))}">
        ${cardImageMarkup(item, index, language)}
      </article>`;
    }).join("");
    const buttons = items.map((_, index) => `
      <button type="button" class="${index === 0 ? "is-active" : ""}"
              data-sequence-index="${index}"
              aria-label="${escapeAttr(`${words[language].keyCards} ${index + 1}`)}">${index + 1}</button>`).join("");
    const first = items[0];

    return moduleShell(module, language, `
      <div class="guide-key-sequence" data-key-sequence>
        <button class="guide-sequence-stage" type="button" data-sequence-stage aria-label="${escapeAttr(words[language].nextCard)}">
          <div class="guide-sequence-cards">${cards}</div>
          <div class="guide-sequence-action">
            <span>${escapeHTML(words[language].keyCards)}</span>
            <strong data-sequence-action>${escapeHTML(items.length > 1 ? words[language].nextCard : words[language].cardOf(1, 1))}</strong>
            <b aria-hidden="true">→</b>
          </div>
        </button>
        <div class="guide-sequence-copy" aria-live="polite">
          <div class="guide-sequence-progress">${buttons}</div>
          <small data-sequence-counter>${escapeHTML(words[language].cardOf(1, items.length))}</small>
          <h3 data-sequence-name>${escapeHTML(first.name)}</h3>
          <p data-sequence-comment>${escapeHTML(localize(first.comment, language))}</p>
        </div>
      </div>`);
  };

  const renderDecklist = (module, language, guide) => {
    const image = resolveAsset(module.image);
    if (!image) return "";
    return moduleShell(module, language, `
      <div class="guide-decklist" data-decklist-module>
        <figure class="guide-decklist__figure" tabindex="0" role="button"
                data-decklist-image="${escapeAttr(image)}"
                data-decklist-alt="${escapeAttr(localize(module.imageAlt, language))}">
          <span class="guide-decklist__zoom" aria-hidden="true">
            <svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="5.5"></circle><path d="m15 15 5 5"></path></svg>
          </span>
          <img src="${escapeAttr(image)}" alt="${escapeAttr(localize(module.imageAlt, language))}">
          <figcaption>
            <span>${escapeHTML(words[language].referenceList)}</span>
            <strong>${escapeHTML(guide.leader)} · ${escapeHTML(localize(guide.format, language))}</strong>
          </figcaption>
        </figure>
        <div class="guide-decklist__side">
          <div class="guide-decklist__note">
            <small>${escapeHTML(words[language].decklist)}</small>
            <strong>${escapeHTML(localize(module.title, language))}</strong>
            <p>${escapeHTML(localize(module.body, language))}</p>
          </div>
          <button class="button button--primary" type="button" data-copy-decklist>${escapeHTML(words[language].copy)}</button>
          <button class="button button--ghost" type="button" data-download-decklist>${escapeHTML(words[language].download)}</button>
          <p class="guide-copy-feedback" data-copy-feedback role="status" aria-live="polite"></p>
          <textarea hidden data-decklist-text>${escapeHTML(module.text || "")}</textarea>
          <span hidden data-decklist-filename>${escapeHTML(module.downloadName || `${guide.slug}.txt`)}</span>
        </div>
      </div>`);
  };

  const handStyle = (index, total) => {
    const center = (total - 1) / 2;
    const offset = index - center;
    const closedX = offset * 17;
    const closedR = offset * 4;
    const openSpread = total <= 2 ? 74 : total === 3 ? 66 : total === 4 ? 54 : 45;
    const openX = offset * openSpread;
    const openR = total <= 2 ? offset * 10 : offset * 8;
    return `--closed-x:${closedX}px;--closed-r:${closedR}deg;--open-x:${openX}px;--open-r:${openR}deg;z-index:${total-index}`;
  };

  const renderInteractive = (module, language) => {
    const items = (module.items || []).slice(0, MAX_ITEMS);
    if (!items.length) return "";

    if (items.length === 1) {
      const item = items[0];
      const image = resolveAsset(item.image);
      const imageMarkup = image ? `<img src="${escapeAttr(image)}" alt="${escapeAttr(localize(item.imageAlt, language))}">` : "";
      return moduleShell(module, language, `
        <div class="guide-interactive">
          <div>
            <div class="guide-flip-scene" role="button" tabindex="0" data-flip-scene aria-label="${escapeAttr(words[language].flip)}">
              <div class="guide-flip-card">
                <div class="guide-flip-face guide-flip-face--front" style="--card-a:${escapeAttr(item.accentA)};--card-b:${escapeAttr(item.accentB)}">
                  ${imageMarkup}
                  ${image ? "" : `<span class="guide-card-image__sample">SAMPLE</span>`}
                  <small>${escapeHTML(words[language].front)}</small>
                  <strong>${escapeHTML(item.name)}</strong>
                </div>
                <div class="guide-flip-face guide-flip-face--back">
                  <small>${escapeHTML(words[language].technicalNote)}</small>
                  <strong>${escapeHTML(localize(item.comment, language))}</strong>
                </div>
              </div>
            </div>
            <span class="guide-interactive__hint">${escapeHTML(words[language].flip)}</span>
          </div>
          <div class="guide-interactive__copy">
            <h3>${escapeHTML(item.name)} <small>${escapeHTML(item.code || "")}</small></h3>
            <p>${escapeHTML(localize(item.comment, language))}</p>
          </div>
        </div>`);
    }

    const sequenceCenter = (items.length - 1) / 2;
    const cards = items.map((item, index) => {
      const offset = index - sequenceCenter;
      const nextX = offset * (items.length >= 5 ? 36 : items.length === 4 ? 44 : 56);
      const nextR = offset * (items.length >= 5 ? 5 : 7);
      return `
        <article class="guide-sequence-card${index === 0 ? " is-current" : " is-next"}"
                 style="--next-x:${nextX}px;--next-r:${nextR}deg"
                 data-sequence-card
                 data-name="${escapeAttr(item.name)}"
                 data-comment="${escapeAttr(localize(item.comment, language))}">
          ${cardImageMarkup(item, index, language)}
        </article>`;
    }).join("");

    const buttons = items.map((_, index) => `
      <button type="button" class="${index === 0 ? "is-active" : ""}"
              data-sequence-index="${index}"
              aria-label="${escapeAttr(`${words[language].selectedCard} ${index + 1}`)}">${index + 1}</button>`).join("");

    const first = items[0];
    return moduleShell(module, language, `
      <div class="guide-key-sequence guide-key-sequence--insight" data-key-sequence>
        <button class="guide-sequence-stage" type="button" data-sequence-stage aria-label="${escapeAttr(words[language].nextCard)}">
          <div class="guide-sequence-cards">${cards}</div>
          <div class="guide-sequence-action">
            <span>${escapeHTML(localize(module.title, language))}</span>
            <strong data-sequence-action>${escapeHTML(words[language].nextCard)}</strong>
            <b aria-hidden="true">→</b>
          </div>
        </button>
        <div class="guide-sequence-copy" aria-live="polite">
          <div class="guide-sequence-progress">${buttons}</div>
          <small data-sequence-counter>${escapeHTML(words[language].cardOf(1, items.length))}</small>
          <h3 data-sequence-name>${escapeHTML(first.name)}</h3>
          <p data-sequence-comment>${escapeHTML(localize(first.comment, language))}</p>
        </div>
      </div>`);
  };

  const renderPros = (module, language) => {
    const strengths = (localize(module.strengths, language) || []).slice(0, 5);
    const weaknesses = (localize(module.weaknesses, language) || []).slice(0, 5);
    return moduleShell(module, language, `
      <div class="guide-pros">
        <article><h3>${escapeHTML(words[language].strengths)}</h3><ul>${strengths.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul></article>
        <article><h3>${escapeHTML(words[language].weaknesses)}</h3><ul>${weaknesses.map(item => `<li>${escapeHTML(item)}</li>`).join("")}</ul></article>
      </div>`);
  };

  const renderCurve = (module, language) => {
    const points = module.points || [];
    const max = Math.max(1, ...points.map(point => Number(point.count) || 0));
    const bars = points.map(point => {
      const count = Number(point.count) || 0;
      const height = 8 + Math.round((count / max) * 125);
      return `<div class="guide-curve__column">
        <div class="guide-curve__bar" style="height:${height}px"></div>
        <strong>${escapeHTML(point.cost)}</strong>
        <small>${escapeHTML(`${count} ${words[language].cards}`)}</small>
      </div>`;
    }).join("");
    return moduleShell(module, language, `<div class="guide-curve" aria-label="${escapeAttr(localize(module.title, language))}">${bars}</div>`);
  };

  const renderMatchups = (module, language) => {
    const items = (module.items || []).slice(0, MAX_ITEMS);
    const rows = items.map(item => `
      <article class="guide-matchup">
        <strong>${escapeHTML(item.opponent)}</strong>
        <span class="guide-matchup__status guide-matchup__status--${escapeAttr(item.status || "even")}">${escapeHTML(localize(item.label, language))}</span>
        <p>${escapeHTML(localize(item.note, language))}</p>
      </article>`).join("");
    return moduleShell(module, language, `<div class="guide-matchups">${rows}</div>`);
  };


  const renderGamePlan = (module, language) => {
    const items = (module.items || []).slice(0, MAX_ITEMS);
    if (!items.length) return "";
    const steps = items.map((item, index) => `
      <article class="guide-plan-step">
        <span class="guide-plan-step__number">${String(index + 1).padStart(2, "0")}</span>
        <small>${escapeHTML(localize(item.label, language))}</small>
        <h3>${escapeHTML(localize(item.title, language))}</h3>
        <p>${escapeHTML(localize(item.body, language))}</p>
      </article>`).join("");
    return moduleShell(module, language, `<div class="guide-plan">${steps}</div>`);
  };

  const renderResourceFlow = (module, language) => {
    const items = (module.items || []).slice(0, MAX_ITEMS);
    if (!items.length) return "";
    const nodes = items.map((item, index) => `
      <article class="guide-flow-node">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h3>${escapeHTML(localize(item.title, language))}</h3>
        <p>${escapeHTML(localize(item.body, language))}</p>
      </article>
      ${index < items.length - 1 ? `<i class="guide-flow-arrow" aria-hidden="true">→</i>` : ""}`).join("");
    return moduleShell(module, language, `<div class="guide-flow">${nodes}</div>`);
  };

  const renderCardChoices = (module, language) => {
    const items = (module.items || []).slice(0, MAX_ITEMS);
    if (!items.length) return "";
    const choices = items.map((item, index) => `
      <article class="guide-choice">
        <div class="guide-choice__card">${cardImageMarkup(item, index, language)}</div>
        <div class="guide-choice__copy">
          <small>${escapeHTML(localize(item.badge, language))}</small>
          <h3>${escapeHTML(item.name)}</h3>
          <p>${escapeHTML(localize(item.choiceNote || item.comment, language))}</p>
        </div>
      </article>`).join("");
    return moduleShell(module, language, `<div class="guide-choices">${choices}</div>`);
  };

  const renderMulligan = (module, language) => {
    const items = (module.items || []).slice(0, MAX_ITEMS);
    if (!items.length) return "";
    const rows = items.map((item, index) => `
      <article class="guide-mulligan-item">
        <span>${String(item.priority ?? index + 1).padStart(2, "0")}</span>
        <div>
          <h3>${escapeHTML(localize(item.title, language))}</h3>
          <p>${escapeHTML(localize(item.body, language))}</p>
        </div>
      </article>`).join("");
    return moduleShell(module, language, `<div class="guide-mulligan">${rows}</div>`);
  };

  const renderTips = (module, language) => {
    const items = (module.items || []).slice(0, MAX_ITEMS);
    if (!items.length) return "";
    const cards = items.map((item, index) => `
      <article class="guide-tip">
        <span>${String(index + 1).padStart(2, "0")}</span>
        <h3>${escapeHTML(localize(item.title, language))}</h3>
        <p>${escapeHTML(localize(item.body, language))}</p>
      </article>`).join("");
    return moduleShell(module, language, `<div class="guide-tips">${cards}</div>`);
  };

  const renderModule = (module, language, guide) => {
    switch (module.type) {
      case "why": return renderWhy(module, language);
      case "identity": return renderIdentity(module, language);
      case "gamePlan": return renderGamePlan(module, language);
      case "resourceFlow": return renderResourceFlow(module, language);
      case "cardChoices": return renderCardChoices(module, language);
      case "mulligan": return renderMulligan(module, language);
      case "tips": return renderTips(module, language);
      case "keyCards": return renderKeyCards(module, language);
      case "decklist": return renderDecklist(module, language, guide);
      case "interactiveCards": return renderInteractive(module, language);
      case "strengthsWeaknesses": return renderPros(module, language);
      case "curve": return renderCurve(module, language);
      case "matchups": return renderMatchups(module, language);
      default: return "";
    }
  };

  const selectActiveModules = guide => {
    const counts = new Map();
    return [...(guide.detail?.modules || [])]
      .filter(module => module?.enabled !== false)
      .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
      .filter(module => {
        const count = counts.get(module.type) || 0;
        if (count >= MAX_INSTANCES) return false;
        counts.set(module.type, count + 1);
        return true;
      });
  };

  const legacyCopy = text => {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0.01";
    helper.style.pointerEvents = "none";
    document.body.appendChild(helper);
    helper.focus({ preventScroll: true });
    helper.select();
    helper.setSelectionRange(0, helper.value.length);
    let copied = false;
    try { copied = document.execCommand("copy"); } catch (_) { copied = false; }
    helper.remove();
    return copied;
  };


  const localCommentMemory = new Map();
  const localCommentAdapter = {
    key(guideId) {
      return `nika-guide-comments-v1:${guideId}`;
    },
    async list(guideId) {
      try {
        const stored = JSON.parse(localStorage.getItem(this.key(guideId)) || "[]");
        localCommentMemory.set(guideId, stored);
        return stored;
      } catch (_) {
        return localCommentMemory.get(guideId) || [];
      }
    },
    async save(guideId, comment) {
      const comments = [...(await this.list(guideId))];
      const index = comments.findIndex(item => item.id === comment.id);
      if (index >= 0) comments[index] = comment;
      else comments.unshift(comment);
      localCommentMemory.set(guideId, comments);
      try { localStorage.setItem(this.key(guideId), JSON.stringify(comments)); } catch (_) {}
      return comment;
    },
    async remove(guideId, commentId) {
      const comments = (await this.list(guideId)).filter(item => item.id !== commentId);
      localCommentMemory.set(guideId, comments);
      try { localStorage.setItem(this.key(guideId), JSON.stringify(comments)); } catch (_) {}
    }
  };

  const getCommentAdapter = () => {
    const external = window.NIKA_GUIDE_COMMENTS_ADAPTER;
    if (external && ["list", "save", "remove"].every(method => typeof external[method] === "function")) {
      return external;
    }
    return localCommentAdapter;
  };

  const getVisitorToken = () => {
    const key = "nika-guide-comment-owner-v1";
    try {
      let token = localStorage.getItem(key);
      if (!token) {
        token = window.crypto?.randomUUID?.() || `visitor-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        localStorage.setItem(key, token);
      }
      return token;
    } catch (_) {
      return `visitor-${Date.now()}`;
    }
  };

  const initCommunity = async (page, guide, language) => {
    const section = page.querySelector("[data-guide-community]");
    if (!section) return;

    const ui = words[language];
    const adapter = getCommentAdapter();
    const ownerToken = getVisitorToken();

    const form = section.querySelector("[data-comment-form]");
    const idInput = section.querySelector("[data-comment-id]");
    const authorInput = section.querySelector("[data-comment-author]");
    const textInput = section.querySelector("[data-comment-text]");
    const counter = section.querySelector("[data-comment-counter]");
    const ratingButtons = [...section.querySelectorAll("[data-rating-value]")];
    const submit = section.querySelector("[data-comment-submit]");
    const cancel = section.querySelector("[data-comment-cancel]");
    const feedback = section.querySelector("[data-comment-feedback]");
    const list = section.querySelector("[data-comments-list]");
    const empty = section.querySelector("[data-comments-empty]");
    const average = section.querySelector("[data-community-average]");
    const summaryStars = section.querySelector("[data-community-summary-stars]");
    const count = section.querySelector("[data-community-count]");

    let selectedRating = 0;
    let comments = [];

    const setStaticCopy = () => {
      const set = (selector, value) => {
        const element = section.querySelector(selector);
        if (element) element.textContent = value;
      };
      set("[data-community-eyebrow]", ui.communityEyebrow);
      set("[data-community-title]", ui.communityTitle);
      set("[data-community-intro]", ui.communityIntro);
      set("[data-comment-rating-label]", ui.ratingLabel);
      set("[data-comment-name-label]", ui.authorLabel);
      set("[data-comment-text-label]", ui.commentLabel);
      set("[data-comment-submit]", idInput?.value ? ui.updateComment : ui.publishComment);
      set("[data-comment-cancel]", ui.cancelEdit);
      set("[data-comments-title]", ui.commentsTitle);
      set("[data-comments-empty]", ui.noComments);
      ratingButtons.forEach((button, index) => {
        const stars = index + 1;
        button.setAttribute("aria-label", language === "en"
          ? `${stars} ${stars === 1 ? "star" : "stars"}`
          : `${stars} ${stars === 1 ? "stella" : "stelle"}`);
      });
    };

    const setRating = value => {
      selectedRating = Number(value) || 0;
      ratingButtons.forEach(button => {
        const active = Number(button.dataset.ratingValue) <= selectedRating;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-checked", String(Number(button.dataset.ratingValue) === selectedRating));
      });
    };

    const showFeedback = (message, error = false) => {
      if (!feedback) return;
      feedback.textContent = message;
      feedback.classList.toggle("is-error", error);
      clearTimeout(feedback._timer);
      feedback._timer = setTimeout(() => {
        feedback.textContent = "";
        feedback.classList.remove("is-error");
      }, 2800);
    };

    const formatCommentDate = iso => {
      const date = new Date(iso);
      if (Number.isNaN(date.getTime())) return "";
      return new Intl.DateTimeFormat(ui.localDate, {
        day: "2-digit", month: "short", year: "numeric"
      }).format(date);
    };

    const starMarkup = rating => Array.from({ length: 5 }, (_, index) =>
      `<span class="${index < Math.round(rating) ? "is-active" : ""}" aria-hidden="true">★</span>`
    ).join("");

    const resetForm = () => {
      form?.reset();
      if (idInput) idInput.value = "";
      if (counter) counter.textContent = "0";
      setRating(0);
      if (submit) submit.textContent = ui.publishComment;
      if (cancel) cancel.hidden = true;
    };

    const editComment = comment => {
      if (idInput) idInput.value = comment.id;
      if (authorInput) authorInput.value = comment.author;
      if (textInput) textInput.value = comment.text;
      if (counter) counter.textContent = String(comment.text.length);
      setRating(comment.rating);
      if (submit) submit.textContent = ui.updateComment;
      if (cancel) cancel.hidden = false;
      authorInput?.focus();
      form?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    const render = () => {
      const sorted = [...comments].sort((a, b) => String(b.createdAt).localeCompare(String(a.createdAt)));
      const ratings = sorted.map(item => Number(item.rating)).filter(Boolean);
      const avg = ratings.length ? ratings.reduce((sum, value) => sum + value, 0) / ratings.length : 0;

      if (average) average.textContent = ratings.length ? avg.toFixed(1).replace(".", ",") : "—";
      if (summaryStars) summaryStars.innerHTML = starMarkup(avg);
      if (count) count.textContent = ratings.length ? ui.ratingCount(ratings.length) : ui.noRatings;
      if (empty) empty.hidden = sorted.length > 0;

      if (list) {
        list.innerHTML = sorted.map(comment => {
          const owned = comment.ownerToken === ownerToken;
          return `
            <article class="guide-comment">
              <header>
                <div>
                  <strong>${escapeHTML(comment.author)}</strong>
                  ${owned ? `<span>${escapeHTML(ui.yourComment)}</span>` : ""}
                </div>
                <div class="guide-comment__rating" aria-label="${escapeAttr(`${comment.rating} / 5`)}">${starMarkup(comment.rating)}</div>
              </header>
              <p>${escapeHTML(comment.text).replaceAll("\n", "<br>")}</p>
              <footer>
                <time datetime="${escapeAttr(comment.createdAt)}">${escapeHTML(formatCommentDate(comment.createdAt))}</time>
                ${owned ? `<div>
                  <button type="button" data-edit-comment="${escapeAttr(comment.id)}">${escapeHTML(ui.edit)}</button>
                  <button type="button" data-remove-comment="${escapeAttr(comment.id)}">${escapeHTML(ui.remove)}</button>
                </div>` : ""}
              </footer>
            </article>`;
        }).join("");
      }

      list?.querySelectorAll("[data-edit-comment]").forEach(button => {
        button.addEventListener("click", () => {
          const comment = comments.find(item => item.id === button.dataset.editComment);
          if (comment) editComment(comment);
        });
      });
      list?.querySelectorAll("[data-remove-comment]").forEach(button => {
        button.addEventListener("click", async () => {
          if (!window.confirm(ui.confirmDelete)) return;
          await adapter.remove(guide.id, button.dataset.removeComment);
          comments = await adapter.list(guide.id);
          resetForm();
          render();
          showFeedback(ui.commentDeleted);
        });
      });
    };

    ratingButtons.forEach(button => {
      button.addEventListener("click", () => setRating(button.dataset.ratingValue));
    });

    textInput?.addEventListener("input", () => {
      if (counter) counter.textContent = String(textInput.value.length);
    });

    cancel?.addEventListener("click", resetForm);

    form?.addEventListener("submit", async event => {
      event.preventDefault();
      const author = authorInput?.value.trim() || "";
      const text = textInput?.value.trim() || "";
      if (!selectedRating) {
        showFeedback(ui.chooseRating, true);
        return;
      }
      if (!author || !text) {
        showFeedback(ui.invalidComment, true);
        return;
      }

      const requestedId = idInput?.value || "";
      const ownedExisting = comments.find(item => item.ownerToken === ownerToken);
      const existing = comments.find(item => item.id === requestedId) || (!requestedId ? ownedExisting : null);
      const existingId = existing?.id || "";
      const now = new Date().toISOString();
      const comment = {
        id: existingId || (window.crypto?.randomUUID?.() || `comment-${Date.now()}`),
        guideId: guide.id,
        author: author.slice(0, 30),
        text: text.slice(0, 600),
        rating: selectedRating,
        ownerToken,
        createdAt: existing?.createdAt || now,
        updatedAt: now
      };

      await adapter.save(guide.id, comment);
      comments = await adapter.list(guide.id);
      resetForm();
      render();
      showFeedback(existing ? ui.commentUpdated : ui.commentPublished);
    });

    setStaticCopy();
    comments = await adapter.list(guide.id);
    render();
  };

  const initInteractions = (page, language) => {
    const ui = words[language];

    const lightbox = document.querySelector("[data-guide-lightbox]");
    const copyDialog = document.querySelector("[data-guide-copy-dialog]");

    const syncScrollLock = () => {
      const overlayOpen =
        lightbox?.classList.contains("is-open") ||
        copyDialog?.classList.contains("is-open");

      document.documentElement.classList.toggle("guide-scroll-locked", Boolean(overlayOpen));
      document.body.classList.toggle("guide-scroll-locked", Boolean(overlayOpen));
    };

    // Sicurezza: una ricarica o un errore precedente non devono mai
    // lasciare la pagina bloccata all'avvio.
    document.documentElement.classList.remove("guide-scroll-locked");
    document.body.classList.remove("guide-scroll-locked");
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    page.querySelectorAll("[data-key-sequence]").forEach(sequence => {
      const stage = sequence.querySelector("[data-sequence-stage]");
      const cards = [...sequence.querySelectorAll("[data-sequence-card]")];
      const buttons = [...sequence.querySelectorAll("[data-sequence-index]")];
      const counter = sequence.querySelector("[data-sequence-counter]");
      const name = sequence.querySelector("[data-sequence-name]");
      const comment = sequence.querySelector("[data-sequence-comment]");
      const action = sequence.querySelector("[data-sequence-action]");
      let index = 0;

      const render = () => {
        cards.forEach((card, cardIndex) => {
          card.classList.toggle("is-current", cardIndex === index);
          card.classList.toggle("is-past", cardIndex < index);
          card.classList.toggle("is-next", cardIndex > index);
        });
        buttons.forEach((button, buttonIndex) => button.classList.toggle("is-active", buttonIndex === index));
        const current = cards[index];
        if (counter) counter.textContent = ui.cardOf(index + 1, cards.length);
        if (name) name.textContent = current?.dataset.name || "";
        if (comment) comment.textContent = current?.dataset.comment || "";
        if (action) action.textContent = cards.length <= 1 ? ui.cardOf(1, 1) : (index === cards.length - 1 ? ui.restart : ui.nextCard);
      };

      stage?.addEventListener("click", () => {
        if (cards.length <= 1) return;
        index = (index + 1) % cards.length;
        render();
      });
      buttons.forEach(button => button.addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        index = Number(button.dataset.sequenceIndex) || 0;
        render();
      }));
      render();
    });

    page.querySelectorAll("[data-flip-scene]").forEach(scene => {
      const toggle = () => scene.classList.toggle("is-flipped");
      scene.addEventListener("click", toggle);
      scene.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggle();
        }
      });
    });



    const lightboxImage = lightbox?.querySelector("[data-guide-lightbox-image]");
    const closeLightbox = () => {
      lightbox?.classList.remove("is-open");
      lightbox?.setAttribute("aria-hidden", "true");
      syncScrollLock();
    };
    page.querySelectorAll("[data-decklist-image]").forEach(figure => {
      const open = () => {
        if (!lightbox || !lightboxImage) return;
        lightboxImage.src = figure.dataset.decklistImage || "";
        lightboxImage.alt = figure.dataset.decklistAlt || "";
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        syncScrollLock();
      };
      figure.addEventListener("click", open);
      figure.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          open();
        }
      });
    });
    document.querySelector("[data-guide-lightbox-close]")?.addEventListener("click", closeLightbox);
    lightbox?.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });

    const copyArea = copyDialog?.querySelector("[data-guide-copy-text]");
    const openCopyDialog = text => {
      if (!copyDialog || !copyArea) return;
      copyArea.value = text;
      copyDialog.classList.add("is-open");
      copyDialog.setAttribute("aria-hidden", "false");
      syncScrollLock();
      setTimeout(() => {
        copyArea.focus();
        copyArea.select();
        copyArea.setSelectionRange(0, copyArea.value.length);
      }, 50);
    };
    const closeCopyDialog = () => {
      copyDialog?.classList.remove("is-open");
      copyDialog?.setAttribute("aria-hidden", "true");
      syncScrollLock();
    };
    document.querySelector("[data-guide-copy-close]")?.addEventListener("click", closeCopyDialog);
    document.querySelector("[data-guide-copy-select]")?.addEventListener("click", () => {
      copyArea?.focus();
      copyArea?.select();
      if (copyArea) copyArea.setSelectionRange(0, copyArea.value.length);
    });
    copyDialog?.addEventListener("click", event => { if (event.target === copyDialog) closeCopyDialog(); });

    page.querySelectorAll("[data-decklist-module]").forEach(decklist => {
      const rawText = decklist.querySelector("[data-decklist-text]")?.value || "";
      const filename = decklist.querySelector("[data-decklist-filename]")?.textContent || "decklist.txt";
      const feedback = decklist.querySelector("[data-copy-feedback]");
      const showFeedback = (message, error = false) => {
        if (!feedback) return;
        feedback.textContent = message;
        feedback.classList.toggle("is-error", error);
        clearTimeout(feedback._timer);
        feedback._timer = setTimeout(() => {
          feedback.textContent = "";
          feedback.classList.remove("is-error");
        }, 2800);
      };

      decklist.querySelector("[data-copy-decklist]")?.addEventListener("click", async () => {
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(rawText);
            showFeedback(ui.copied);
            return;
          }
          if (legacyCopy(rawText)) {
            showFeedback(ui.copied);
            return;
          }
          openCopyDialog(rawText);
          showFeedback(ui.blocked, true);
        } catch (_) {
          if (legacyCopy(rawText)) showFeedback(ui.copied);
          else {
            openCopyDialog(rawText);
            showFeedback(ui.blocked, true);
          }
        }
      });

      decklist.querySelector("[data-download-decklist]")?.addEventListener("click", () => {
        const blob = new Blob([rawText], { type: "text/plain;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);
      });
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeLightbox();
        closeCopyDialog();
      }
    }, { once: true });
  };

  const init = () => {
    const page = document.querySelector("[data-free-guide-detail]");
    if (!page) return;

    const params = new URLSearchParams(window.location.search);
    const requestedId = params.get("id");
    const guide = data.guides.find(item => item.id === requestedId);
    const fallbackGuide = !requestedId ? data.guides[0] : null;
    const activeGuide = guide || fallbackGuide;
    const foundContent = page.querySelector("[data-guide-found-content]");
    const notFound = page.querySelector("[data-guide-not-found]");

    const renderNotFound = () => {
      const language = currentLanguage();
      const ui = words[language];
      if (foundContent) foundContent.hidden = true;
      if (notFound) notFound.hidden = false;
      const set = (selector, value) => {
        const element = notFound?.querySelector(selector);
        if (element) element.textContent = value;
      };
      set("[data-guide-not-found-eyebrow]", ui.notFoundEyebrow);
      set("[data-guide-not-found-title]", ui.notFoundTitle);
      set("[data-guide-not-found-copy]", ui.notFoundCopy);
      set("[data-guide-not-found-back]", ui.back);
      document.title = `${ui.notFoundEyebrow} — La Tana di Nika`;
    };

    if (!activeGuide) {
      renderNotFound();
      window.addEventListener("nika:languagechange", renderNotFound);
      return;
    }

    const render = () => {
      const guide = activeGuide;
      const language = currentLanguage();
      const ui = words[language];
      if (notFound) notFound.hidden = true;
      if (foundContent) foundContent.hidden = false;
      const modules = selectActiveModules(guide);
      const root = document.querySelector(".guide-dossier");

      root?.style.setProperty("--guide-a", guide.accentA || "#7b5cff");
      root?.style.setProperty("--guide-b", guide.accentB || "#1b263e");

      const coverVisual = page.querySelector("[data-guide-cover-visual]");
      const coverImage = resolveAsset(guide.detail?.coverImage);
      if (coverVisual) {
        coverVisual.style.setProperty("--guide-cover-image", coverImage ? `url("${coverImage}")` : `url("${resolveAsset("assets/images/hero-sea.png")}")`);
      }

      const setText = (selector, value) => {
        const element = page.querySelector(selector);
        if (element) element.textContent = value;
      };

      setText("[data-guide-breadcrumb]", guide.leader);
      setText("[data-guide-status]", ui.status);
      setText("[data-guide-status-chip]", ui.status);
      setText("[data-guide-leader]", guide.leader);
      setText("[data-guide-format]", localize(guide.format, language));
      setText("[data-guide-format-chip]", localize(guide.format, language));
      setText("[data-guide-title]", localize(guide.title, language));
      setText("[data-guide-subtitle]", localize(guide.detail?.subtitle, language));
      setText("[data-guide-meta-updated-label]", ui.updated);
      setText("[data-guide-meta-reading-label]", ui.reading);
      setText("[data-guide-meta-style-label]", ui.style);
      setText("[data-guide-updated]", formatDate(guide.updatedAt, language));
      setText("[data-guide-reading]", `${guide.readingTime} ${ui.minutes}`);
      setText("[data-guide-style]", localize(guide.detail?.style, language));
      setText("[data-guide-return-text]", ui.returnText);
      setText("[data-guide-back]", ui.back);
      setText("[data-guide-editorial]", ui.editorial);
      setText("[data-guide-copy-eyebrow]", ui.copyEyebrow);
      setText("[data-guide-copy-title]", ui.copyTitle);
      setText("[data-guide-copy-help]", ui.copyHelp);
      setText("[data-guide-copy-select]", ui.selectAll);

      const moduleContainer = page.querySelector("[data-guide-modules]");
      const index = page.querySelector("[data-guide-index]");
      if (moduleContainer) moduleContainer.innerHTML = modules.map(module => renderModule(module, language, guide)).join("");
      if (index) {
        index.dataset.label = ui.index;
        index.innerHTML = modules
          .filter(module => document.getElementById(module.id))
          .map(module => `<a href="#${escapeAttr(module.id)}">${escapeHTML(localize(module.title, language))}</a>`)
          .join("");
      }

      document.title = `${localize(guide.title, language)} — La Tana di Nika`;
      initInteractions(page, language);
      initCommunity(page, guide, language);
    };

    render();
    let initialLanguageEventHandled = false;
    window.addEventListener("nika:languagechange", () => {
      if (!initialLanguageEventHandled) {
        initialLanguageEventHandled = true;
        return;
      }
      window.location.reload();
    });
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
