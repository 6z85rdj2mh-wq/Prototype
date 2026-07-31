(() => {
  const STORAGE_KEY = 'nika-language';
  const supported = ['it', 'en'];

  const safeStorage = {
    get(key) { try { return window.localStorage?.getItem(key) ?? null; } catch (_) { return null; } },
    set(key, value) { try { window.localStorage?.setItem(key, value); } catch (_) {} }
  };

  const getSavedLanguage = () => {
    const saved = safeStorage.get(STORAGE_KEY);
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
    safeStorage.set(STORAGE_KEY, language);
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

    const translatedAttributes = [
      ['data-i18n-aria-label', 'i18nAriaLabel', 'aria-label'],
      ['data-i18n-title', 'i18nTitle', 'title'],
      ['data-i18n-alt', 'i18nAlt', 'alt']
    ];

    translatedAttributes.forEach(([selector, datasetKey, attribute]) => {
      document.querySelectorAll(`[${selector}]`).forEach(element => {
        const value = resolvePath(dictionary, element.dataset[datasetKey]);
        if (typeof value === 'string') element.setAttribute(attribute, value);
      });
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
    window.NikaHomeEventNotice?.init();
    applyLanguage(currentLanguage);
    window.NikaSearchSwitcher?.init(() => currentLanguage);

    const year = document.querySelector('[data-current-year]');
    if (year) year.textContent = new Date().getFullYear();
  });
})();
