/* ======================================================
   LA TANA DI NIKA — TOURNAMENT UTILITIES V4.4.1
====================================================== */
window.NikaTournamentUtils = (() => {
  const getLanguage = () => document.documentElement.lang === 'en' ? 'en' : 'it';

  const pick = (value, language = getLanguage()) => {
    if (value && typeof value === 'object') return value[language] || value.it || value.en || '';
    return value ?? '';
  };

  const locale = (language = getLanguage()) => language === 'en' ? 'en-GB' : 'it-IT';

  const formatDate = (date, options = { day: 'numeric', month: 'long', year: 'numeric' }, language = getLanguage()) => {
    if (!date) return '';
    return new Intl.DateTimeFormat(locale(language), options).format(new Date(`${date}T12:00:00`));
  };

  const formatShortDate = (date, language = getLanguage()) => formatDate(date, { day: '2-digit', month: 'short' }, language);

  const escapeIcs = value => String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;');

  const compactDate = value => value.replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  const compactLocalDate = (date, time) => `${date.replace(/-/g, '')}T${String(time || '00:00').replace(':', '')}00`;

  const createReminder = event => {
    const data = window.NIKA_TOURNAMENTS_DATA;
    if (!event || !data) return;
    const language = getLanguage();
    const timeZone = data.settings.timeZone || 'Europe/Rome';
    const reminderMinutes = data.settings.reminderMinutes || 120;
    const title = pick(event.title, language);
    const description = pick(event.description, language);
    const alarmText = language === 'en' ? `${title} starts in two hours.` : `${title} inizia tra due ore.`;
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//La Tana di Nika//Tournament Reminder//IT',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${event.id}@latanadinika`,
      `DTSTAMP:${compactDate(new Date().toISOString())}`,
      `DTSTART;TZID=${timeZone}:${compactLocalDate(event.date, event.time)}`,
      `DTEND;TZID=${timeZone}:${compactLocalDate(event.date, event.endTime || event.time)}`,
      `SUMMARY:${escapeIcs(title)}`,
      `DESCRIPTION:${escapeIcs(description)}`,
      `LOCATION:${escapeIcs(event.location)}`,
      'BEGIN:VALARM',
      `TRIGGER:-PT${reminderMinutes}M`,
      'ACTION:DISPLAY',
      `DESCRIPTION:${escapeIcs(alarmText)}`,
      'END:VALARM',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${event.id}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const getDiscardedIndexes = scores => {
    const validScores = scores
      .map((score, index) => ({ score, index }))
      .filter(item => Number.isFinite(item.score));
    const discardCount = Math.min(2, Math.max(0, validScores.length - 4));
    return validScores
      .sort((a, b) => a.score - b.score || b.index - a.index)
      .slice(0, discardCount)
      .map(item => item.index);
  };

  const getValidTotal = scores => {
    const discarded = new Set(getDiscardedIndexes(scores));
    return scores.reduce((total, score, index) => total + (Number.isFinite(score) && !discarded.has(index) ? score : 0), 0);
  };

  const getRawTotal = scores => scores.reduce((total, score) => total + (Number.isFinite(score) ? score : 0), 0);


  const resolveAsset = path => {
    if (!path) return '';
    if (/^(?:https?:|data:|\/)/i.test(path)) return path;
    const prefix = document.body?.dataset.rootPrefix || '';
    return `${prefix}${path.replace(/^\.\//, '')}`;
  };

  const getAllEvents = () => {
    const data = window.NIKA_TOURNAMENTS_DATA;
    return data ? [...data.leagueEvents, ...data.localEvents] : [];
  };

  return {
    getLanguage,
    pick,
    locale,
    formatDate,
    formatShortDate,
    createReminder,
    getDiscardedIndexes,
    getValidTotal,
    getRawTotal,
    resolveAsset,
    getAllEvents
  };
})();
