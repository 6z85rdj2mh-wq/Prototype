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
      selectAll: "Seleziona tutto"
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
      selectAll: "Select all"
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

    const cards = items.map((item, index) => `
      <button class="guide-hand-card${index === 0 ? " is-active" : ""}" type="button"
              style="${handStyle(index, items.length)}"
              data-hand-card data-name="${escapeAttr(item.name)}"
              data-comment="${escapeAttr(localize(item.comment, language))}">
        ${cardImageMarkup(item, index, language)}
      </button>`).join("");
    const first = items[0];
    return moduleShell(module, language, `
      <div class="guide-interactive">
        <div>
          <div class="guide-stable-hand-stage">
            <div class="guide-stable-hand" data-stable-hand>${cards}</div>
          </div>
          <button class="guide-interactive__hint" type="button" data-hand-toggle>${escapeHTML(words[language].openSequence)}</button>
        </div>
        <div class="guide-interactive__copy">
          <h3>${escapeHTML(localize(module.title, language))}</h3>
          <p>${escapeHTML(localize(module.body, language))}</p>
          <div class="guide-hand-copy" aria-live="polite">
            <small>${escapeHTML(words[language].selectedCard)}</small>
            <strong data-hand-name>${escapeHTML(first.name)}</strong>
            <p data-hand-comment>${escapeHTML(localize(first.comment, language))}</p>
          </div>
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

  const initInteractions = (page, language) => {
    const ui = words[language];

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

    page.querySelectorAll("[data-stable-hand]").forEach(hand => {
      const module = hand.closest(".guide-module");
      const toggle = module?.querySelector("[data-hand-toggle]");
      const cards = [...hand.querySelectorAll("[data-hand-card]")];
      const name = module?.querySelector("[data-hand-name]");
      const comment = module?.querySelector("[data-hand-comment]");
      let open = false;

      const setOpen = value => {
        open = value;
        hand.classList.toggle("is-open", open);
        if (toggle) toggle.textContent = open ? ui.closeSequence : ui.openSequence;
      };
      toggle?.addEventListener("click", () => setOpen(!open));
      cards.forEach(card => card.addEventListener("click", () => {
        if (!open) {
          setOpen(true);
          return;
        }
        cards.forEach(item => item.classList.toggle("is-active", item === card));
        if (name) name.textContent = card.dataset.name || "";
        if (comment) comment.textContent = card.dataset.comment || "";
      }));
    });

    const lightbox = document.querySelector("[data-guide-lightbox]");
    const lightboxImage = lightbox?.querySelector("[data-guide-lightbox-image]");
    const closeLightbox = () => {
      lightbox?.classList.remove("is-open");
      lightbox?.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };
    page.querySelectorAll("[data-decklist-image]").forEach(figure => {
      const open = () => {
        if (!lightbox || !lightboxImage) return;
        lightboxImage.src = figure.dataset.decklistImage || "";
        lightboxImage.alt = figure.dataset.decklistAlt || "";
        lightbox.classList.add("is-open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.style.overflow = "hidden";
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

    const copyDialog = document.querySelector("[data-guide-copy-dialog]");
    const copyArea = copyDialog?.querySelector("[data-guide-copy-text]");
    const openCopyDialog = text => {
      if (!copyDialog || !copyArea) return;
      copyArea.value = text;
      copyDialog.classList.add("is-open");
      copyDialog.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        copyArea.focus();
        copyArea.select();
        copyArea.setSelectionRange(0, copyArea.value.length);
      }, 50);
    };
    const closeCopyDialog = () => {
      copyDialog?.classList.remove("is-open");
      copyDialog?.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
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
    const guide = data.guides.find(item => item.id === requestedId) || data.guides[0];
    if (!guide) return;

    const render = () => {
      const language = currentLanguage();
      const ui = words[language];
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
    };

    render();
    window.addEventListener("nika:languagechange", render);
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
