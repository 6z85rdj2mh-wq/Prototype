# La Tana di Nika — V4.4.0

Base stabile V4.3.3 con prima fondazione delle pagine interne.

## Nuovo

- Nuova pagina `/tornei/`.
- Tripartizione: Nika League, I nostri tornei, Segui le dirette.
- Calendario Nika League con 6 tappe + Finale.
- Reminder `.ics` per il calendario del telefono, impostato 2 ore prima.
- Classifica dinamica: i 4 risultati migliori contano, i 2 scarti sono rossi.
- Descrizioni editoriali per tutte le tappe e commento speciale per la Finale.
- Secondo calendario per local, domenicali ed eventi fuori dalla lega.
- Griglie premi personalizzabili.
- Player Twitch predisposto tramite placeholder.
- Pulsante “Torna alla Home” in fondo alla pagina interna.
- Dati centralizzati in `js/data/tournaments.js`.

## Homepage

La homepage non è stata ridisegnata. Sono stati modificati soltanto i collegamenti necessari per raggiungere la nuova Area Torneistica.

## Immagini tornei

Inserire le immagini in `assets/images/tournaments/` e indicare il percorso nel file dati. Se un’immagine non è presente, viene mostrato automaticamente un fallback grafico.
