(() => {
  const STORAGE_KEY = 'nika-language';
  const readLanguage = () => { try { return window.localStorage?.getItem(STORAGE_KEY) === 'en' ? 'en' : 'it'; } catch (_) { return 'it'; } };
  let language = readLanguage();

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

  const init = () => {
    const root = document.querySelector('[data-premium-guides-page]');
    if (!root) return;
    const list = root.querySelector('[data-premium-guides-list]');
    const search = root.querySelector('[data-premium-guides-search]');
    const count = root.querySelector('[data-premium-guides-count]');
    const empty = root.querySelector('[data-premium-guides-empty]');
    const data = window.NIKA_PREMIUM_GUIDES_DATA;
    if (!data || !list) return;

    const render = () => {
      const query = String(search?.value || '').trim().toLowerCase();
      const guides = (data.guides || [])
        .filter(guide => guide.status === 'published')
        .filter(guide => {
          const haystack = [guide.leader, guide.format, localize(guide.title), localize(guide.subtitle), localize(guide.excerpt), ...(guide.tags || [])].join(' ').toLowerCase();
          return !query || haystack.includes(query);
        })
        .sort((a, b) => String(b.updatedAt).localeCompare(String(a.updatedAt)));

      count.textContent = String(guides.length);
      empty.hidden = guides.length > 0;
      list.innerHTML = guides.map(guide => {
        const cover = resolveAsset(guide.coverImage);
        const tags = (guide.tags || []).slice(0, 3).map(tag => `<span class="premium-guide-card__chip">${escapeHtml(tag)}</span>`).join('');
        return `<article class="premium-guide-card" style="--guide-accent-a:${escapeHtml(guide.accentA)};--guide-accent-b:${escapeHtml(guide.accentB)}">
          <div class="premium-guide-card__visual">${cover ? `<img src="${escapeHtml(cover)}" alt="" loading="lazy" decoding="async">` : ''}</div>
          <div class="premium-guide-card__content">
            <div class="premium-guide-card__topline"><span class="premium-guide-card__chip">${escapeHtml(guide.format)}</span>${tags}</div>
            <div><p class="premium-guide-card__subtitle">${escapeHtml(localize(guide.title))}</p><h2>${escapeHtml(guide.leader)}</h2></div>
            <p class="premium-guide-card__excerpt">${escapeHtml(localize(guide.excerpt))}</p>
            <div class="premium-guide-card__meta"><span>${escapeHtml(guide.readingTime)} min</span><span>${escapeHtml(guide.updatedAt)}</span></div>
            <a class="premium-guide-card__cta" href="guida/?id=${encodeURIComponent(guide.id)}">${language === 'en' ? 'Open premium guide' : 'Apri la guida premium'} <span aria-hidden="true">→</span></a>
          </div>
        </article>`;
      }).join('');
    };

    search?.addEventListener('input', render);
    window.addEventListener('nika:languagechange', event => {
      const next = event.detail?.language;
      if (!['it', 'en'].includes(next) || next === language) return;
      language = next;
      render();
    });
    render();
  };

  document.addEventListener('DOMContentLoaded', init);
})();
