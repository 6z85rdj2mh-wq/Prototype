window.NikaSearchSwitcher = {
  init(getLanguage) {
    const hub = document.querySelector('[data-search-hub]');
    if (!hub) return;

    const tabs = [...hub.querySelectorAll('[data-search-mode]')];
    const input = hub.querySelector('input[type="search"]');
    const suggestions = hub.querySelector('[data-search-suggestions]');
    const form = hub.querySelector('form');
    let mode = 'store';

    const render = () => {
      const language = getLanguage();
      const dictionary = window.NIKA_TRANSLATIONS[language];
      input.placeholder = mode === 'store' ? dictionary.search.storePlaceholder : dictionary.search.editorialPlaceholder;
      input.dataset.i18nPlaceholder = mode === 'store' ? 'search.storePlaceholder' : 'search.editorialPlaceholder';
      tabs.forEach(tab => tab.setAttribute('aria-selected', String(tab.dataset.searchMode === mode)));
      suggestions.innerHTML = '';
      dictionary.search.suggestions[mode].forEach(label => {
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = label;
        button.addEventListener('click', () => {
          input.value = label;
          input.focus();
        });
        suggestions.appendChild(button);
      });
    };

    tabs.forEach(tab => tab.addEventListener('click', () => {
      mode = tab.dataset.searchMode;
      render();
    }));

    form.addEventListener('submit', event => {
      event.preventDefault();
      const value = input.value.trim();
      if (!value) {
        input.focus();
        return;
      }
      console.info(`[La Tana di Nika] Ricerca demo — ${mode}: ${value}`);
    });

    window.addEventListener('nika:languagechange', render);
    render();
  }
};
