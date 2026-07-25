(() => {
  const STORAGE_KEY = 'nika-language';
  const supported = ['it', 'en'];

  const getSavedLanguage = () => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (supported.includes(saved)) return saved;
    return navigator.language?.toLowerCase().startsWith('it') ? 'it' : 'en';
  };

  let currentLanguage = getSavedLanguage();

  const resolvePath = (object, path) => path.split('.').reduce((value, key) => value?.[key], object);

  const applyLanguage = (language) => {
    if (!supported.includes(language)) return;
    const dictionary = window.NIKA_TRANSLATIONS?.[language];
    if (!dictionary) return;

    currentLanguage = language;
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const value = resolvePath(dictionary, element.dataset.i18n);
      if (typeof value !== 'string') return;
      if (value.includes('<br>')) element.innerHTML = value;
      else element.textContent = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const value = resolvePath(dictionary, element.dataset.i18nPlaceholder);
      if (typeof value === 'string') element.placeholder = value;
    });

    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === language));
    });

    window.dispatchEvent(new CustomEvent('nika:languagechange', { detail: { language } }));
  };

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-language]').forEach(button => {
      button.addEventListener('click', () => applyLanguage(button.dataset.language));
    });

    window.NikaHeader?.init();
    window.NikaHeroSplit?.init();
    window.NikaTournamentMotion?.init();
    window.NikaTournamentPage?.init();
    window.NikaTournamentHub?.init();
    window.NikaLeaguePage?.init();
    window.NikaCommunityEventsPage?.init();
    applyLanguage(currentLanguage);
    window.NikaSearchSwitcher?.init(() => currentLanguage);

    const year = document.querySelector('[data-current-year]');
    if (year) year.textContent = new Date().getFullYear();
  });
})();
