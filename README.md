# La Tana di Nika — V4.4.18R1

Ricostruzione stabile della V4.4.18 basata sulla V4.4.16, con Articoli CMS-ready, cache busting e controlli di caricamento.

# La Tana di Nika — V4.4.16 Free Guides CMS-ready

Nuova base stabile che porta le Guide gratuite allo stesso modello editoriale riutilizzabile delle Guide Premium.

- Archivio con stati `draft`, `published`, `archived` e `trash`.
- Il sito pubblico mostra soltanto le guide pubblicate.
- Template vuoto e duplicazione di guide senza creare nuove pagine HTML.
- Validazione di ID, slug, moduli obbligatori e limiti 0–5.
- Creazione, duplicazione, pubblicazione, archivio, cestino, ripristino ed eliminazione definitiva predisposti per la futura admin.
- Contratto admin in `admin/free-guides/`.
- Baseline Supabase in `SUPABASE_FREE_GUIDES_SCHEMA_V4.4.16.sql`.
- Nessun controllo amministrativo esposto nel sito pubblico.

Consultare `PATCH_NOTES_V4.4.16.txt`, `TEST_REPORT_V4.4.16.txt`, `LA_TANA_DI_NIKA_HANDOFF_V4.4.16.txt` e `LA_TANA_DI_NIKA_MEMORIA_COMPLETA_V4.4.16.md`.

---

# La Tana di Nika — V4.4.15 Premium Guides Architecture

Nuova base stabile con Area Guide Premium pubblica e data-driven.

- Overview reale delle Guide Premium.
- Prima guida pubblicata: Mihawk · Formato ST32.
- Scheda tecnica con Difficoltà, Forza e Consistenza.
- Decklist come singola immagine caricabile.
- Generic Mulligan e mulligan personalizzato per matchup.
- Simulatore Going 1st / Going 2nd: massimo 10 DON e fino a 20 turni per percorso.
- Moduli editoriali, Tech Cards, matchup premium, VOD e recensioni con stelle.
- Dati centralizzati in `js/data/premium-guides.js`.
- Contratto e template per la futura dashboard in `admin/premium-guides/`.
- Baseline Supabase in `SUPABASE_PREMIUM_GUIDES_SCHEMA_V4.4.15.sql`.
- Corretto anche un errore preesistente nel rendering dell’hub Tornei (`utils.localized` → `utils.pick`).

Consultare `PATCH_NOTES_V4.4.15.txt`, `TEST_REPORT_V4.4.15.txt`, `LA_TANA_DI_NIKA_HANDOFF_V4.4.15.txt` e `LA_TANA_DI_NIKA_MEMORIA_COMPLETA_V4.4.15.md`.

---

# La Tana di Nika — V4.4.14 Translation Consistency Fix

Nuova base stabile delle mini guide.

- Primo rendering nella lingua salvata.
- Cambio IT/EN senza loop di reload.
- Overview, dossier, commenti, guida inesistente e decklist coerenti.
- Etichette accessibili traducibili tramite attributi i18n.
- Hotfix scroll V4.4.13 preservato.

Consultare `PATCH_NOTES_V4.4.14.txt` e `LA_TANA_DI_NIKA_HANDOFF_V4.4.14.txt`.

Risultati dei controlli: `TEST_REPORT_V4.4.14.txt`.

---

Hotfix della V4.4.12 che elimina il ciclo di ricarica, ripristina lo scroll
desktop/mobile e riduce gli effetti più pesanti sui dispositivi touch.

Consultare `PATCH_NOTES_V4.4.13.txt`.

---

Nuova base del progetto dedicata alle mini guide modulari.

## Novità

- Tutti gli approfondimenti con più carte sono sequenziali.
- Ricerca e slug inesistenti mostrano un messaggio dedicato.
- Stelle, commenti, modifica ed eliminazione del proprio contributo.
- Fallback locale immediato e adattatore predisposto per Supabase.
- Schema SQL con Anonymous Auth e Row Level Security.
- Layout commenti e interazioni ottimizzato per mobile.

Consultare `PATCH_NOTES_V4.4.12.txt` e `LA_TANA_DI_NIKA_HANDOFF_V4.4.12.txt`.

---

Base stabile corrente del progetto.

## Novità principali

- Quattro mini guide collegate e generate dallo stesso renderer.
- Dossier modulari con strutture differenti.
- Moduli e sezioni con range 0–5.
- Carte chiave sequenziali e numeri interattivi.
- Carte singole con flip e gruppi con ventaglio stabile.
- Decklist fotografica ingrandibile, copia testuale e download SIM.
- Layout mobile ottimizzato fino a 320 px.
- Nota di indipendenza inserita nella sezione Chi siamo.

Consultare `PATCH_NOTES_V4.4.11.txt` e `LA_TANA_DI_NIKA_HANDOFF_V4.4.11.txt`.

---

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


## V4.4.6 — League Current Standings

- La pagina `/tornei/nika-league/` apre direttamente con la classifica della lega corrente.
- La classifica è contenuta in un riquadro con scorrimento interno verticale e orizzontale.
- Intestazione, posizione e nome restano visibili durante lo scorrimento.
- Le colonne sono nominate `Tappa 1`–`Tappa 6`.
- La Top 8 provvisoria è evidenziata.
- I quattro risultati validi sono verdi; dal quinto risultato in poi i punteggi più bassi sono rossi e barrati.
- Il nome del giocatore apre statistiche e dettaglio delle sei tappe.
- Sotto la classifica compare il calendario pubblico della League.
- Sotto il calendario compare esclusivamente l’ultimo articolo della League, con supporto per 1–4 fotografie.
- Nessun controllo di modifica è visibile nel sito pubblico: gestione di classifica, calendario e articolo resta prevista per una futura area admin.


## V4.4.7 — Project Alignment Consolidation

- Conferma Store ed Editoriale come due ingressi equivalenti della homepage.
- Conferma l’Area Torneistica come hub pubblico dedicato, subordinato alla Hero 50/50 ma strategico per la piattaforma.
- Mantiene la classifica League approvata nella V4.4.6.
- Rimuove dalla pagina pubblica i riferimenti operativi alla futura dashboard admin.
- Ripristina il reminder calendario pubblico due ore prima.
- Ripristina una sezione Finale dedicata, compatta e predisposta per Twitch.
- Mantiene l’ultimo articolo League sotto calendario e Finale, senza controlli di gestione visibili.
- Rinvia la dashboard admin unica alla fine della progettazione delle sezioni pubbliche.
- Il prossimo intervento grafico principale resta “I nostri tornei — Premium Experience”, seguito dal banner homepage del prossimo domenicale.


## V4.4.8 — I nostri tornei + banner homepage
- Hero “La prossima sfida ti aspetta.”
- prossimo evento automatico, calendario con salto alle schede, elenco completo eventi
- Domenicali e Speciali
- soli posti totali, griglie premi selezionabili e immagini/placeholder premio
- pulsanti calendario con promemoria interno due ore prima
- banner homepage chiudibile con mascotte ufficiale e animazione in un unico movimento


## V4.4.9 — Editorial Hub

- Nuovo hub pubblico `/editoriale/` senza hero introduttiva lunga.
- Titolo “Cosa vuoi leggere?”.
- Tre card equivalenti: Articoli generici e report, Guide gratuite, Guide premium.
- Tre pagine-destinazione reali, predisposte per lo sviluppo successivo.
- Interazione desktop premium e layout mobile verticale.
- Link Editoriale aggiornati in homepage e nell’Area Torneistica.
- Prossimo step: overview delle mini guide dei mazzi e template articolo riutilizzabile.


## V4.4.10 — Mini guide ai mazzi

- `/editoriale/guide-gratuite/` diventa una libreria premium di mini guide.
- Card orizzontali, più larghe che alte, caratterizzate per Leader.
- Ricerca per Leader, titolo, formato e tag.
- Filtri Tutte, In evidenza, Competitive e Off-meta.
- Ogni guida è generata da un record centralizzato in `js/data/free-guides.js`.
- Il campo `image` permette di assegnare una copertina diversa a ogni guida.
- La pagina è pronta per essere alimentata in futuro dalla dashboard admin senza riscrivere l’HTML.
- Le card conducono a uno scaffold temporaneo della singola guida, in attesa del template editoriale definitivo.
