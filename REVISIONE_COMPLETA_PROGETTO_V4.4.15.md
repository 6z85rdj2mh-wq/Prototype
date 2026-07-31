# Revisione completa del progetto — V4.4.15

## Esito generale

La patch è stata costruita partendo dalla V4.4.14 e integrando le Guide Premium come sezione reale del sito, non come preview isolata.

La revisione finale non ha rilevato problemi bloccanti.

## Cosa è stato integrato

### Guide Premium pubbliche

- overview reale con ricerca;
- pagina dettaglio data-driven;
- prima guida pubblica Mihawk ST32;
- scheda tecnica;
- decklist come immagine unica;
- Generic Mulligan;
- simulatore Going 1st/Going 2nd;
- moduli editoriali;
- Tech Cards;
- matchup premium;
- VOD;
- recensioni con stelle.

### Predisposizione admin

La dashboard grafica non è ancora stata costruita, ma il progetto è predisposto tramite:

- sorgente dati unica;
- template bozza;
- duplicazione;
- normalizzazione;
- validazione;
- catalogo moduli;
- limiti;
- stato draft/published/archived;
- contratto JSON;
- workflow admin documentato;
- schema Supabase baseline.

Una nuova guida non richiede la duplicazione della pagina HTML: richiede un nuovo record dati.

## Controlli effettuati

- 21 JavaScript controllati sintatticamente;
- 14 CSS analizzati;
- 2 JSON validati;
- 10 HTML controllati;
- 0 riferimenti locali mancanti;
- 20 smoke test browser su desktop/mobile;
- 4 test funzionali premium dedicati;
- test lingua;
- test accessibilità base;
- test limiti 10 DON / 20 turni;
- test creazione e duplicazione guida;
- test visivi mirati della plancia e dei matchup.

## Problema preesistente emerso durante l’audit

Nell’hub Tornei veniva chiamata la funzione inesistente `utils.localized`.

È stata sostituita con la funzione disponibile e corretta `utils.pick`.

## Aspetti che restano volutamente non completati

### Dashboard admin

Non è presente una schermata admin operativa. È presente l’intero contratto necessario per costruirla in modo semplice e sicuro.

### Supabase

Lo schema SQL è incluso, ma non viene applicato automaticamente e la pagina pubblica continua a leggere il file JavaScript locale.

### Upload reali

I campi immagine sono predisposti, ma l’upload effettivo arriverà con Supabase Storage e dashboard.

### VOD reali

Le card supportano già URL e provider, ma i dati dimostrativi non contengono link effettivi.

### Contenuti definitivi Mihawk

Parte dei testi e delle carte resta dimostrativa. Struttura e interazioni sono reali.

## Rischi residui

Il rischio principale non è strutturale, ma di differenza tra browser:

- Safari iOS reale;
- Edge desktop reale;
- hosting GitHub Pages con cache.

I test automatici sono stati eseguiti in Chromium headless. Dopo il caricamento è consigliata una verifica reale sui due dispositivi di riferimento.

## Procedura consigliata per il caricamento

1. Conservare un backup della V4.4.14.
2. Caricare integralmente la cartella V4.4.15.
3. Verificare la homepage.
4. Aprire `/editoriale/guide-premium/`.
5. Aprire la guida Mihawk.
6. Provare Generic Mulligan.
7. Provare Going 1st e Going 2nd.
8. Provare Tech Cards e matchup.
9. Scorrere fino a VOD e recensioni.
10. Provare IT/EN.
11. Controllare `/tornei/` dopo la correzione `utils.pick`.
12. Svuotare la cache se GitHub Pages mostra file precedenti.

## Prossimi step

1. verifica reale online;
2. inserimento decklist e immagini carte reali Mihawk;
3. duplicazione della guida per un secondo mazzo;
4. autenticazione admin;
5. dashboard unica;
6. Supabase Storage e tabella guide;
7. recensioni condivise;
8. embed VOD;
9. analytics;
10. revisione SEO finale.
