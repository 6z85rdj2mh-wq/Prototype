# La Tana di Nika — V4.4.5 Tournament Architecture

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

## V4.4.3 — Competitive Identity Polish

- Barra Twitch spostata sopra le due porte principali per renderla immediatamente visibile.
- Nika League rappresentata come percorso competitivo continuo: 6 tappe, classifica e Finale.
- I nostri tornei rappresentati come appuntamenti autonomi, riconoscibili e speciali.
- Composizioni, movimenti e micro-dettagli grafici differenziati tra le due aree.
- Decorazioni astratte a forma di nuvola, senza alterare o sostituire la mascotte ufficiale.
- Nessuna modifica alle pagine interne o ai dati dei tornei.


## V4.4.4 — Tournament Hub Refinement

- Rimossi sigilli, slogan tecnici e riferimenti visibili a concetti usati solo in fase di progettazione.
- Conservata la palette della V4.4.3 con una composizione più sobria e funzionale.
- La Nika League mostra l’avanzamento reale delle tappe concluse.
- “I nostri tornei” mostra la data del prossimo evento direttamente nella card.
- Barra Twitch mantenuta sopra le due scelte principali.
- Nessuna modifica alle pagine interne o ai dati strutturali.


## V4.4.5 — Separate Card Scale Polish

- Le due card dell’hub hanno dimensioni uguali e restano visivamente separate.
- Eliminato l’allargamento tramite scorrimento delle colonne.
- Hover desktop basato su ingrandimento della card attiva e lieve arretramento dell’altra.
- Sfondi grigio e viola arricchiti con texture e profondità sobrie.
- Mobile invariato, senza trasformazioni che possano creare overflow.
- Nessuna modifica alle pagine interne, ai dati o alla mascotte.
