(() => {
  const data = window.NIKA_ARTICLES_DATA;
  if (!data) return;
  const escapeHTML = value => String(value ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const language = () => {
    try { const saved = localStorage.getItem("nika-language"); if (saved === "it" || saved === "en") return saved; } catch (_) {}
    return document.documentElement.lang === "en" ? "en" : "it";
  };
  const pick = (value, lang = language()) => typeof value === "string" ? value : value?.[lang] ?? value?.it ?? value?.en ?? "";
  const words = {
    it: { title:"Articoli e report", lead:"Analisi, storie e approfondimenti dalla Tana: il gioco, i tornei e la community raccontati con tempo e contesto.", search:"Cerca un articolo, un mazzo o un evento…", all:"Tutti", analysis:"Analisi", league:"Nika League", tournaments:"I nostri tornei", editorial:"Editoriale", featured:"In evidenza", read:"Leggi l’articolo", minutes:"min di lettura", articles:"articoli pubblicati", article:"articolo pubblicato", emptyTitle:"Nessun articolo trovato", emptyText:"Prova a cambiare ricerca o categoria.", pageTitle:"Articoli e report — La Tana di Nika" },
    en: { title:"Articles and reports", lead:"Analysis, stories and long-form coverage from the Den: the game, tournaments and community with time and context.", search:"Search an article, deck or event…", all:"All", analysis:"Analysis", league:"Nika League", tournaments:"Our tournaments", editorial:"Editorial", featured:"Featured", read:"Read article", minutes:"min read", articles:"published articles", article:"published article", emptyTitle:"No articles found", emptyText:"Try another search or category.", pageTitle:"Articles and reports — La Tana di Nika" }
  };
  const typeLabel = (type, lang) => ({
    editorial: words[lang].editorial,
    analysis: words[lang].analysis,
    "nika-league-report": words[lang].league,
    "tournament-report": words[lang].tournaments,
    news: lang === "en" ? "News" : "Notizie"
  }[type] || words[lang].editorial);
  const formatDate = (iso, lang) => {
    if (!iso) return "—";
    const date = new Date(`${iso}T12:00:00`);
    return Number.isNaN(date.getTime()) ? iso : new Intl.DateTimeFormat(lang === "en" ? "en-GB" : "it-IT", { day:"2-digit", month:"short", year:"numeric" }).format(date);
  };
  const imageUrl = image => window.NIKA_MEDIA?.resolveImage(image, document.body.dataset.rootPrefix || "") || "";
  const publicArticles = () => typeof data.adminApi?.getPublishedArticles === "function" ? data.adminApi.getPublishedArticles() : (data.articles || []).filter(article => article.status === "published" && !article.deletedAt);

  const init = () => {
    const page = document.querySelector("[data-articles-page]");
    if (!page || page.dataset.initialized === "true") return;
    page.dataset.initialized = "true";
    const list = page.querySelector("[data-articles-list]");
    const featured = page.querySelector("[data-articles-featured]");
    const search = page.querySelector("[data-articles-search]");
    const filters = [...page.querySelectorAll("[data-articles-filter]")];
    const count = page.querySelector("[data-articles-count]");
    const countLabel = page.querySelector("[data-articles-count-label]");
    const empty = page.querySelector("[data-articles-empty]");
    let active = "all";

    const visual = (article, className, lang) => {
      const url = imageUrl(article.cover?.image);
      return `<div class="${className}" style="--article-a:${escapeHTML(article.accentA || "#925cff")};--article-b:${escapeHTML(article.accentB || "#24152f")};--article-focus:${escapeHTML(article.cover?.focalPoint || "center")}">
        ${url ? `<img src="${escapeHTML(url)}" alt="${escapeHTML(pick(article.cover?.alt, lang))}" loading="lazy" decoding="async">` : ""}
        <span>${escapeHTML(typeLabel(article.type, lang))}</span>
      </div>`;
    };
    const featureTemplate = (article, lang) => {
      if (!article) return "";
      const tags = (article.tags?.[lang] || article.tags?.it || []).slice(0,3).map(tag => `<span>${escapeHTML(tag)}</span>`).join("");
      return `<a class="articles-feature" href="${escapeHTML(article.url)}" style="--article-a:${escapeHTML(article.accentA)};--article-b:${escapeHTML(article.accentB)}">
        ${visual(article,"articles-feature__visual",lang)}
        <div class="articles-feature__content">
          <p class="articles-kicker">${escapeHTML(words[lang].featured)} · ${escapeHTML(typeLabel(article.type,lang))}</p>
          <h2>${escapeHTML(pick(article.title,lang))}</h2>
          <p>${escapeHTML(pick(article.excerpt,lang))}</p>
          <div class="articles-tags">${tags}</div>
          <div class="articles-meta"><span>${escapeHTML(formatDate(article.publishedAt,lang))}</span><span>${escapeHTML(`${article.readingTime} ${words[lang].minutes}`)}</span></div>
          <span class="articles-open">${escapeHTML(words[lang].read)} <b aria-hidden="true">→</b></span>
        </div>
      </a>`;
    };
    const cardTemplate = (article, lang) => {
      const tags = (article.tags?.[lang] || article.tags?.it || []).slice(0,3).map(tag => `<span>${escapeHTML(tag)}</span>`).join("");
      return `<a class="article-card" href="${escapeHTML(article.url)}" style="--article-a:${escapeHTML(article.accentA)};--article-b:${escapeHTML(article.accentB)}">
        ${visual(article,"article-card__visual",lang)}
        <div class="article-card__body">
          <p class="articles-kicker">${escapeHTML(typeLabel(article.type,lang))}</p>
          <h2>${escapeHTML(pick(article.title,lang))}</h2>
          <p>${escapeHTML(pick(article.excerpt,lang))}</p>
          <div class="articles-tags">${tags}</div>
          <div class="articles-meta"><span>${escapeHTML(formatDate(article.publishedAt,lang))}</span><span>${escapeHTML(`${article.readingTime} ${words[lang].minutes}`)}</span></div>
          <span class="articles-open">${escapeHTML(words[lang].read)} <b aria-hidden="true">→</b></span>
        </div>
      </a>`;
    };

    const render = () => {
      const lang = language(); const copy = words[lang];
      document.title = copy.pageTitle;
      page.querySelector("[data-articles-title]").textContent = copy.title;
      page.querySelector("[data-articles-lead]").textContent = copy.lead;
      search.placeholder = copy.search;
      const labels = { all:copy.all, analysis:copy.analysis, "nika-league-report":copy.league, "tournament-report":copy.tournaments, editorial:copy.editorial };
      filters.forEach(button => button.textContent = labels[button.dataset.articlesFilter] || button.dataset.articlesFilter);
      const query = search.value.trim().toLocaleLowerCase(lang === "en" ? "en" : "it");
      const all = [...publicArticles()].sort((a,b) => String(b.publishedAt || b.updatedAt).localeCompare(String(a.publishedAt || a.updatedAt)));
      const filtered = all.filter(article => {
        const matchesType = active === "all" || article.type === active;
        const tags = article.tags?.[lang] || article.tags?.it || [];
        const haystack = [pick(article.title,lang),pick(article.excerpt,lang),pick(article.category,lang),article.author?.name,...tags].join(" ").toLocaleLowerCase(lang === "en" ? "en" : "it");
        return matchesType && haystack.includes(query);
      });
      const lead = filtered.find(article => article.featured) || filtered[0] || null;
      featured.innerHTML = featureTemplate(lead,lang);
      list.innerHTML = filtered.filter(article => article !== lead).map(article => cardTemplate(article,lang)).join("");
      count.textContent = String(filtered.length); countLabel.textContent = filtered.length === 1 ? copy.article : copy.articles;
      empty.hidden = filtered.length > 0; empty.querySelector("h2").textContent = copy.emptyTitle; empty.querySelector("p").textContent = copy.emptyText;
    };
    search.addEventListener("input",render);
    filters.forEach(button => button.addEventListener("click",() => {
      active = button.dataset.articlesFilter || "all";
      filters.forEach(item => { const on = item === button; item.classList.toggle("is-active",on); item.setAttribute("aria-pressed",String(on)); });
      render();
    }));
    window.addEventListener("nika:languagechange",render);
    render();
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded",init,{once:true}); else init();
})();
