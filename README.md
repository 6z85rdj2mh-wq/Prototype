# La Tana di Nika — V4.4.2 Tournament Architecture

Base: V4.3.3 Motion, con riorganizzazione dell’Area Torneistica introdotta nella V4.4.0.

## Obiettivo della patch

Ridurre la densità della pagina `/tornei/` e trasformarla in un hub premium e immediato.
I contenuti completi sono ora divisi in pagine dedicate:

- `/tornei/` — hub con due grandi accessi e finestra Twitch espandibile;
- `/tornei/nika-league/` — calendario, cronache, classifica e Finale;
- `/tornei/i-nostri-tornei/` — local, domenicali, eventi speciali e griglie premi.

## Classifica Nika League

- supporta fino a 64 giocatori;
- mostra soltanto i giocatori presenti nell’array `standings`;
- non crea righe vuote;
- mostra le sei tappe;
- evidenzia in rosso i due risultati esclusi;
- apre una scheda narrativa per leggere le gesta del giocatore;
- include ricerca per nome o Leader.

## Dati modificabili

Tutti i dati dimostrativi sono raccolti in:

`js/data/tournaments.js`

Da qui si modificano date, immagini, giocatori, punteggi, racconti, eventi, premi e impostazioni Twitch.

## Twitch

La finestra Twitch è presente nell’hub ma usa placeholder finché non vengono inseriti:

- `channel`;
- `parent`;
- `enabled: true`.

## Regola condivisa

Ogni pagina interna termina con il pulsante `Torna alla Home`.


## V4.4.2 — Premium Tournament Entry

- Hub Tornei trasformato in ingresso diretto con due arene premium.
- Animazioni pointer e reveal alleggerite e rispettose di reduced motion.
- Finestra Twitch compatta con apertura animata.
- Ottimizzazione mobile per testi dinamici, premi, badge, pulsanti e classifica.
