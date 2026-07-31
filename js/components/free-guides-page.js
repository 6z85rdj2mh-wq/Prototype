(() => {
  const data = window.NIKA_FREE_GUIDES_DATA;
  if (!data) return;

  const escapeHTML = value => String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const currentLanguage = () => {
    try {
      const saved = localStorage.getItem("nika-language");
      if (saved === "it" || saved === "en") return saved;
    } catch (_) {}
    return document.documentElement.lang === "en" ? "en" : "it";
  };
  const localize = (value, language = currentLanguage()) => {
    if (typeof value === "string") return value;
    return value?.[language] ?? value?.it ?? value?.en ?? "";
  };

  const resolveImage = image => {
    if (!image) return "";
    if (/^(https?:|data:|blob:)/i.test(image)) return image;
    const prefix = document.body.dataset.rootPrefix || "";
    return `${prefix}${String(image).replace(/^\/+/, "")}`;
  };

  const translations = {
    it: {
      miniGuide: "Mini guida",
      updated: "Aggiornamento",
      reading: "Lettura",
      open: "Apri guida",
      cover: "Mini guida al mazzo",
      countOne: "guida disponibile",
      countMany: "guide disponibili",
      minutes: "min",
      pageTitle: "Mini guide ai mazzi — La Tana di Nika"
    },
    en: {
      miniGuide: "Mini guide",
      updated: "Updated",
      reading: "Reading time",
      open: "Open guide",
      cover: "Deck mini guide",
      countOne: "guide available",
      countMany: "guides available",
      minutes: "min",
      pageTitle: "Deck mini guides — La Tana di Nika"
    }
  };

  const getPublicGuides = () => {
    if (typeof data.adminApi?.getPublishedGuides === "function") return data.adminApi.getPublishedGuides();
    return (Array.isArray(data.guides) ? data.guides : []).filter(guide => guide?.status !== "draft" && guide?.status !== "archived" && guide?.status !== "trash" && !guide?.deletedAt);
  };

  const formatDate = (isoDate, language) => {
    if (!isoDate) return "—";
    const date = new Date(`${isoDate}T12:00:00`);
    if (Number.isNaN(date.getTime())) return isoDate;
    return new Intl.DateTimeFormat(language === "en" ? "en-GB" : "it-IT", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(date);
  };

  const init = () => {
    const page = document.querySelector("[data-free-guides-page]");
    if (!page || page.dataset.initialized === "true") return;
    page.dataset.initialized = "true";

    const list = page.querySelector("[data-free-guides-list]");
    const search = page.querySelector("[data-free-guides-search]");
    const filters = [...page.querySelectorAll("[data-free-guides-filter]")];
    const count = page.querySelector("[data-free-guides-count]");
    const countLabel = page.querySelector("[data-free-guides-count-label]");
    const empty = page.querySelector("[data-free-guides-empty]");
    if (!list || !search || !count || !countLabel || !empty) return;

    let activeFilter = "all";

    const cardTemplate = (guide, language) => {
      const words = translations[language];
      const tags = (guide.tags?.[language] ?? guide.tags?.it ?? [])
        .map(tag => `<span class="free-guide-card__tag">${escapeHTML(tag)}</span>`)
        .join("");
      const image = resolveImage(guide.image);
      const imageMarkup = image
        ? `<img class="free-guide-card__image" src="${escapeHTML(image)}" alt="${escapeHTML(localize(guide.imageAlt, language))}" loading="lazy" decoding="async">`
        : "";
      const safeUrl = guide.url || "#";

      return `
        <a class="free-guide-card"
           href="${escapeHTML(safeUrl)}"
           style="--guide-accent-a:${escapeHTML(guide.accentA || "#925cff")};--guide-accent-b:${escapeHTML(guide.accentB || "#332047")}">
          <div class="free-guide-card__visual">
            ${imageMarkup}
            <div class="free-guide-card__visual-copy">
              <small>${escapeHTML(words.cover)}</small>
              <strong>${escapeHTML(guide.leader)}</strong>
              <span>${escapeHTML(words.miniGuide)}</span>
            </div>
          </div>
          <div class="free-guide-card__content">
            <div class="free-guide-card__kicker">
              <span>${escapeHTML(words.miniGuide)}</span><i aria-hidden="true"></i><span>${escapeHTML(localize(guide.format, language))}</span>
            </div>
            <h2>${escapeHTML(localize(guide.title, language))}</h2>
            <p class="free-guide-card__excerpt">${escapeHTML(localize(guide.excerpt, language))}</p>
            <div class="free-guide-card__tags">${tags}</div>
          </div>
          <div class="free-guide-card__side">
            <div class="free-guide-card__meta">
              <div><small>${escapeHTML(words.updated)}</small><strong>${escapeHTML(formatDate(guide.updatedAt, language))}</strong></div>
              <div><small>${escapeHTML(words.reading)}</small><strong>${escapeHTML(`${guide.readingTime} ${words.minutes}`)}</strong></div>
            </div>
            <span class="free-guide-card__open">${escapeHTML(words.open)} <b aria-hidden="true">→</b></span>
          </div>
        </a>`;
    };

    const render = () => {
      const language = currentLanguage();
      const words = translations[language];
      document.title = words.pageTitle;
      const query = search.value.trim().toLocaleLowerCase(language === "en" ? "en" : "it");

      const guides = [...getPublicGuides()]
        .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)))
        .filter(guide => {
          const categories = Array.isArray(guide.categories) ? guide.categories : [];
          const matchesFilter = activeFilter === "all" || categories.includes(activeFilter);
          const localizedTags = guide.tags?.[language] ?? guide.tags?.it ?? [];
          const haystack = [
            guide.leader,
            localize(guide.title, language),
            localize(guide.excerpt, language),
            localize(guide.format, language),
            ...localizedTags
          ].join(" ").toLocaleLowerCase(language === "en" ? "en" : "it");
          return matchesFilter && haystack.includes(query);
        });

      list.innerHTML = guides.map(guide => cardTemplate(guide, language)).join("");
      count.textContent = String(guides.length);
      countLabel.textContent = guides.length === 1 ? words.countOne : words.countMany;
      empty.classList.toggle("is-visible", guides.length === 0);
      empty.hidden = guides.length !== 0;
    };

    filters.forEach(button => {
      button.addEventListener("click", () => {
        activeFilter = button.dataset.freeGuidesFilter || "all";
        filters.forEach(item => {
          const active = item === button;
          item.classList.toggle("is-active", active);
          item.setAttribute("aria-pressed", String(active));
        });
        render();
      });
    });

    search.addEventListener("input", render);
    window.addEventListener("nika:languagechange", render);
    render();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
