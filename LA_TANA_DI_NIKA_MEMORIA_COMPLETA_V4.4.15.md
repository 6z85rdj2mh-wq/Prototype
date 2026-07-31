# LA TANA DI NIKA — MEMORIA COMPLETA DEL PROGETTO

Versione di riferimento: **V4.4.15**  
Data: **28 luglio 2026**

Questo documento è il punto di ripartenza completo per le future chat. Deve essere consultato prima di modificare il progetto.

---

## 1. Identità del progetto

La Tana di Nika è una piattaforma digitale premium dedicata al **One Piece Card Game**.

Non deve sembrare un semplice sito di carte o una fan page. L’obiettivo è costruire un’identità digitale riconoscibile, professionale e scalabile, con qualità percepita paragonabile a un sito commissionato da diverse migliaia di euro.

Le due aree principali e di pari importanza sono:

1. **Store**
2. **Area Editoriale**

L’Area Torneistica è strategica e importante, ma resta subordinata ai due ingressi principali della homepage.

### Identità visiva

- colori principali: nero, bianco e viola;
- stile elegante, moderno, cinematografico e premium;
- evitare estetica cartoon, pacchiana o eccessivamente “gaming”;
- animazioni fisiche, morbide e funzionali;
- illustrazioni ambientali vive ma discrete;
- tipografia editoriale serif per i titoli importanti;
- font sans leggibile per interfaccia, tag e testi tecnici;
- superfici scure, profondità sobria, bordi traslucidi e viola come accento.

### Mascotte e logo

Usare esclusivamente la **nuvoletta ufficiale fornita dall’utente**.

Asset corrente:

`assets/images/mascot-nika.png`

Non usare varianti generate dall’assistente e non ridisegnarla senza richiesta esplicita.

### Nota di indipendenza

La pagina Chi siamo deve contenere:

> La Tana di Nika è un progetto indipendente e non è affiliato, sponsorizzato o approvato da Bandai, Shueisha, Toei Animation o dagli altri titolari dei diritti di One Piece e del One Piece Card Game. Marchi, personaggi e materiali ufficiali appartengono ai rispettivi titolari.

La nota deve stare nella pagina effettivamente aperta da “Chi siamo”, non soltanto nel footer.

---

## 2. Tecnologia e regole di sviluppo

Stack pubblico:

- HTML;
- CSS;
- JavaScript vanilla;
- GitHub Pages;
- futuro Supabase;
- futuro Shopify/Cardmarket per lo Store.

### Regole vincolanti

- modifiche piccole e localizzate quando possibile;
- non riscrivere file completi inutilmente;
- non rompere componenti già approvati;
- progettare responsive fin dall’inizio;
- priorità a performance, accessibilità, SEO e analytics;
- dati centralizzati e componenti riutilizzabili;
- nessun comando admin nel sito pubblico;
- la dashboard admin unica verrà realizzata dopo la definizione delle sezioni pubbliche;
- ogni sezione nuova deve però essere già predisposta alla futura admin.

### Browser di riferimento

- desktop principale: Edge;
- mobile: Safari/iPhone;
- anteprime da telefono devono essere apribili direttamente dalla chat prima delle patch quando l’utente non può usare GitHub.

### Lingua

Lingue supportate:

- italiano;
- inglese.

Chiave localStorage:

`nika-language`

Logica approvata:

1. il renderer legge la lingua salvata prima del primo rendering;
2. `main.js` applica la stessa lingua;
3. il primo evento `nika:languagechange` non deve provocare reload;
4. un cambio intenzionale deve aggiornare la pagina una sola volta;
5. non reintrodurre listener che ricarichino la pagina a ogni evento.

Attributi supportati da `main.js`:

- `data-i18n`
- `data-i18n-placeholder`
- `data-i18n-aria-label`
- `data-i18n-title`
- `data-i18n-alt`

### Scroll lock

Usare esclusivamente:

- `html.guide-scroll-locked`
- `body.guide-scroll-locked`

Attive solo quando è aperta una lightbox decklist o un eventuale pannello copia.

---

## 3. Base stabile e cronologia essenziale

### Base precedente

V4.4.14 era la base stabile delle mini guide gratuite e correggeva:

- primo rendering nella lingua salvata;
- cambio IT/EN senza loop;
- traduzione di overview, dossier, commenti, decklist e attributi accessibili;
- scroll lock V4.4.13.

### Nuova base

La patch corrente è **V4.4.15**.

Parte esclusivamente dalla V4.4.14 e aggiunge l’architettura completa delle Guide Premium.

Non usare V4.4.12 o versioni precedenti come base.

---

## 4. Homepage

La homepage comunica immediatamente due aree equivalenti:

- Store;
- Editoriale.

### Desktop

Hero divisa 50/50.

Quando si passa il mouse su un lato:

- quello selezionato si evidenzia e si ingrandisce;
- l’altro si restringe leggermente;
- transizione fluida, premium e leggermente elastica/ondulata;
- evitare movimento aggressivo o pacchiano.

### Mobile

L’equivalente deve funzionare tramite tap/scroll, senza hover e senza overflow.

### Banner evento

È presente il banner del prossimo torneo con mascotte ufficiale, animazione sobria e chiusura.

---

## 5. Area Torneistica

Hub principale:

`/tornei/`

Deve restare pulito e non diventare una pagina unica molto lunga.

Ingressi principali equivalenti:

1. Nika League
2. I nostri tornei

La barra Twitch resta sopra i due accessi.

### Nika League

Percorso:

`/tornei/nika-league/`

Struttura:

- 6 tappe;
- Finale;
- classifica fino a 64 iscritti;
- mostra solo giocatori realmente registrati;
- ricerca per nome o Leader;
- righe/profili espandibili;
- spazio narrativo per raccontare le gesta;
- calendario pubblico;
- reminder circa due ore prima;
- articolo più recente sotto calendario/Finale;
- Finale con spazio editoriale più ricco;
- futura diretta Twitch incorporata e possibile chat affiancata desktop.

### Classifica

- sei colonne Tappa 1–6;
- quattro risultati validi;
- i due peggiori risultati esclusi sono rossi e barrati;
- Top 8 provvisoria evidenziata;
- scroll interno verticale e orizzontale;
- intestazioni e nome giocatore sticky.

### I nostri tornei

Percorso:

`/tornei/i-nostri-tornei/`

Supporta:

- tornei domenicali;
- local;
- eventi speciali;
- prossimo evento;
- calendario;
- griglie premi personalizzabili;
- immagini premio;
- reminder calendario.

### Twitch

Nell’hub:

- live;
- prossima diretta;
- offline;
- finestra espandibile;
- futuro replay/VOD.

Correzione V4.4.15 da non annullare:

In `js/components/tournament-hub.js` usare:

`utils.pick(...)`

Non usare `utils.localized(...)`, perché non esiste.

---

## 6. Area Editoriale

Hub:

`/editoriale/`

Titolo approvato:

**Cosa vuoi leggere?**

Tre card equivalenti:

1. Articoli generici e report
2. Guide gratuite
3. Guide premium

Non deve esserci una hero introduttiva lunga.

Le descrizioni possono essere rifinite al termine del sito.

---

## 7. Guide gratuite

Overview:

`/editoriale/guide-gratuite/`

Dettaglio:

`/editoriale/guide-gratuite/guida/?id=<slug>`

Sorgente dati:

`js/data/free-guides.js`

### Struttura modulare

Ogni sezione con carte o immagini supporta da 0 a 5 elementi.

I moduli possono essere:

- aggiunti;
- rimossi;
- duplicati;
- attivati/disattivati;
- riordinati;
- massimo cinque istanze per tipo quando previsto.

La pagina pubblica mostra solo moduli attivi.

### Commenti

- fallback localStorage;
- predisposizione Supabase;
- stelle;
- modifica/eliminazione del proprio contributo.

Non modificare la logica lingua/scroll approvata in V4.4.14.

---

## 8. Guide Premium — architettura V4.4.15

Overview:

`/editoriale/guide-premium/`

Dettaglio:

`/editoriale/guide-premium/guida/?id=mihawk-st32`

Sorgente unica:

`js/data/premium-guides.js`

### Regola pubblicazione

Il sito pubblico mostra esclusivamente record con:

`status: "published"`

Stati supportati:

- draft;
- published;
- archived.

### Prima guida pubblica

- Leader: Mihawk
- Formato: ST32
- Titolo principale: Scheda tecnica

### Scheda tecnica

Barre:

- Difficoltà;
- Forza;
- Consistenza.

Valori da 0 a 5, editabili dalla futura admin.

### Decklist

La sezione lista deve contenere **soltanto un’immagine completa caricabile**.

Non inserire:

- griglia di carte;
- lista testuale;
- card browser;

salvo richiesta esplicita futura.

### Generic Mulligan

Titolo:

**Generic Mulligan**

Domanda:

**Cosa vai a cercare?**

Supporta da 1 a 5 carte, ognuna con nota personalizzata.

### Simulatore

Due sezioni/percorso separati:

- Going 1st;
- Going 2nd.

Vincoli:

- massimo 10 DON;
- fino a 20 turni per percorso;
- numero variabile di azioni per turno;
- massimo tecnico corrente: 20 azioni per turno;
- descrizione generale del turno;
- commento opzionale per ogni azione;
- pulsanti azione precedente/successiva;
- pulsanti turno precedente/successivo;
- stati luminosi coerenti;
- nessuna mano durante la partita;
- Starting Hand/Generic Mulligan resta una sezione separata.

Curve standard dimostrative:

Going 1st:

- 1 / 3 / 5 / 7 / 9 / 10 DON

Going 2nd:

- 2 / 4 / 6 / 8 / 10 DON

Non mostrare riquadri ridondanti con la curva: l’utente esperto conosce già la progressione. Dopo i pulsanti Going 1st/Going 2nd devono comparire direttamente azioni e stato corrente.

### Plancia

Asset originale:

`assets/images/guides/premium/playmat-nika.png`

Asset DON:

`assets/images/guides/premium/don-card.jpg`

Back carta:

`assets/images/guides/premium/card-back.jpg`

Back DON deck:

`assets/images/guides/premium/don-back.webp`

Regole geometriche:

- carta standard 63:88;
- Character Area: 5 slot uguali;
- Cost Area: fino a 10 DON della stessa dimensione delle carte;
- DON sovrapposti;
- DON tappati ruotati singolarmente di 90°;
- DON tappati non devono rimpicciolirsi;
- evitare colonne verticali alte;
- vite spostate a sinistra e parzialmente fuori campo;
- Leader/Stage/Deck/Trash/DON Deck aderiscono alle zone;
- DON Deck simbolico scompare quando tutti i 10 DON sono disponibili, salvo DON restituiti;
- niente frecce animate di attacco;
- tap/untap e movimenti DON restano supportabili.

### Moduli editoriali

Tipo:

`editorialText`

Esempi:

- Strategia di base;
- Decisioni generiche;
- futuri capitoli.

Devono essere duplicabili, rinominabili, riordinabili e disattivabili.

Massimo corrente: 5 moduli editoriali.

### Tech Cards

Posizione:

prima dei matchup.

Supporta da 1 a 5 carte.

Toccando una carta si apre una scheda con:

- Quando è utile?
- Descrizione
- Cosa togliere per inserirla?
- Perché giocarla?
- Spazio immagine Sample List

Ogni campo e immagine devono essere indipendenti e modificabili dalla futura admin.

### Matchup

Ogni matchup contiene:

- titolo;
- immagine panoramica;
- posizione immagine;
- tag;
- commento generale;
- Going 1st;
- Going 2nd;
- sezione “Come affrontare il matchup”;
- testo approfondito con scroll interno;
- mulligan personalizzato da 1 a 5 carte.

#### Design matchup chiuso

- banner scuro premium;
- titolo serif editoriale a sinistra;
- immagine cinematografica a destra;
- dissolvenza immagine verso testo;
- palette nero/viola;
- tag in fascia subordinata sotto il banner;
- nessuna riproduzione del design bianco/lilla del sample utente;
- il sample serviva solo come riferimento strutturale.

### VOD

Posizione:

prima delle recensioni.

Ogni VOD supporta:

- thumbnail;
- titolo;
- descrizione;
- tag;
- URL video;
- provider/modalità embed.

La futura admin dovrà permettere caricamento rapido di titolo, thumbnail e link.

Possibili provider futuri:

- YouTube;
- Twitch;
- link esterno;
- replay interno.

### Recensioni

- valutazione da 1 a 5 stelle;
- nome/nickname;
- commento;
- salvataggio locale nella patch;
- futura condivisione Supabase.

---

## 9. Futura dashboard admin

La dashboard unica non è ancora implementata.

La V4.4.15 prepara già tutto il necessario:

- dati centralizzati;
- template nuova guida;
- catalogo moduli;
- limiti;
- validazione;
- duplicazione;
- stato bozza/pubblicato/archiviato;
- percorsi immagini;
- schema Supabase baseline.

File:

- `admin/premium-guides/ADMIN_WORKFLOW.md`
- `admin/premium-guides/premium-guide-template.json`
- `admin/premium-guides/premium-guides-admin-contract.json`
- `SUPABASE_PREMIUM_GUIDES_SCHEMA_V4.4.15.sql`

### Esperienza admin desiderata

Creare una nuova guida deve essere semplice:

1. Nuova guida o Duplica;
2. inserisci Leader e formato;
3. carica cover e decklist;
4. scrivi testi;
5. aggiungi/riordina moduli;
6. carica carte, matchup e VOD;
7. anteprima;
8. pubblica.

### Azioni supportate dal contratto

- create;
- duplicate;
- edit;
- upload;
- reorder;
- enable;
- disable;
- publish;
- archive.

Helper temporanei disponibili:

`window.NIKA_PREMIUM_GUIDES_DATA.adminApi`

Funzioni:

- `createGuideFromTemplate(overrides)`
- `duplicateGuide(sourceId, overrides)`
- `normalizeGuide(guide)`
- `validateGuide(guide)`

La futura dashboard deve replicare la validazione anche lato server.

### Storage consigliato

- `premium-guides/<guide-id>/cover/`
- `premium-guides/<guide-id>/decklist/`
- `premium-guides/<guide-id>/cards/`
- `premium-guides/<guide-id>/matchups/`
- `premium-guides/<guide-id>/vods/`

### Sicurezza

La baseline Supabase consente pubblicamente soltanto la lettura di guide pubblicate.

Non creare policy anonime per insert/update/delete.

Le scritture saranno abilitate solo dopo autenticazione admin verificata o tramite service layer server-side.

---

## 10. Stato Store

Lo Store resta uno dei due pilastri principali ma non è ancora completato.

Direzione discussa:

- possibile integrazione Cardmarket;
- possibile Shopify;
- ricerca prodotti/carte;
- gestione catalogo futura;
- non inserire funzionalità economiche premature senza definire architettura e costi.

---

## 11. Analytics, SEO e performance

Obiettivi futuri:

- conteggio visite;
- click per sezione;
- funnel Store/Editoriale;
- eventi sui simulatori e sulle guide;
- conversioni;
- performance web;
- SEO.

Il progetto usa ancora `noindex, nofollow` nelle pagine della patch.

Non rimuovere noindex finché il sito e i contenuti non sono pronti per indicizzazione pubblica.

---

## 12. Test V4.4.15

Controlli eseguiti:

- sintassi di tutti i file JavaScript;
- parsing di tutti i CSS;
- verifica riferimenti locali HTML/CSS;
- validazione dati Guide Premium;
- massimo 10 DON;
- massimo 20 turni;
- duplicazione e creazione da template;
- 20 smoke test browser:
  - 10 pagine;
  - desktop 1440×900;
  - mobile 390×844;
- nessun errore JavaScript nei test;
- nessun overflow orizzontale;
- nessun ID duplicato;
- test interazioni premium:
  - ricerca overview;
  - Generic Mulligan;
  - Going 1st/2nd;
  - azioni/turni;
  - DON full size;
  - Tech Cards;
  - matchup;
  - mulligan custom;
  - VOD;
  - stelle e recensione;
  - lingua IT/EN;
- controllo accessibilità base:
  - nomi pulsanti;
  - alt immagini;
  - label form;
  - summary nei details;
  - heading non vuoti.

Test browser eseguiti in Chromium headless con harness auto-contenuto.

Non dichiarare test reali su Edge o Safari finché l’utente non verifica la build pubblicata.

---

## 13. Cosa non fare

- non cambiare mascotte;
- non tornare a versioni anteriori alla V4.4.15;
- non reintrodurre loop di reload lingua;
- non modificare scroll lock approvato;
- non mettere controlli admin nel pubblico;
- non trasformare `/tornei/` in una pagina infinita;
- non unire le due card Nika League/I nostri tornei;
- non rendere le animazioni pacchiane;
- non usare design cartoon;
- non aggiungere griglia o testo alla decklist premium;
- non superare 10 DON;
- non confondere 20 turni con 20 DON;
- non rimpicciolire i DON tappati;
- non riprodurre il sample bianco/lilla dei matchup;
- non usare `utils.localized` nel tournament hub;
- non promettere una dashboard già funzionante: è soltanto predisposta.

---

## 14. Prossimi passi prioritari

1. Caricare V4.4.15 su GitHub Pages.
2. Verificare Edge desktop e Safari/iPhone reali.
3. Sostituire placeholder Mihawk con testi, decklist e carte reali.
4. Aggiungere una seconda guida premium duplicando il record Mihawk o il template blank.
5. Definire autenticazione della dashboard unica.
6. Collegare Supabase Storage.
7. Collegare tabella `premium_guides`.
8. Collegare recensioni condivise.
9. Implementare gestione VOD/embed sicuro.
10. Completare Store.
11. Aggiungere analytics.
12. Revisione SEO e rimozione noindex solo a sito pronto.

---

## 15. File principali V4.4.15

Pubblico:

- `editoriale/guide-premium/index.html`
- `editoriale/guide-premium/guida/index.html`
- `css/premium-guides.css`
- `css/premium-guide-detail.css`
- `js/data/premium-guides.js`
- `js/components/premium-guides-page.js`
- `js/components/premium-guide-detail.js`

Asset premium:

- `assets/images/guides/premium/playmat-nika.png`
- `assets/images/guides/premium/don-card.jpg`
- `assets/images/guides/premium/don-back.webp`
- `assets/images/guides/premium/card-back.jpg`
- `assets/images/guides/premium/mihawk-st32-cover.jpg`
- `assets/images/guides/premium/matchup-mihawk-sample.jpg`

Admin-ready:

- `admin/premium-guides/ADMIN_WORKFLOW.md`
- `admin/premium-guides/premium-guide-template.json`
- `admin/premium-guides/premium-guides-admin-contract.json`
- `SUPABASE_PREMIUM_GUIDES_SCHEMA_V4.4.15.sql`

Documentazione:

- `PATCH_NOTES_V4.4.15.txt`
- `TEST_REPORT_V4.4.15.txt`
- `LA_TANA_DI_NIKA_HANDOFF_V4.4.15.txt`
- `LA_TANA_DI_NIKA_MEMORIA_COMPLETA_V4.4.15.md`
- `REVISIONE_COMPLETA_PROGETTO_V4.4.15.md`

---

## 16. Punto di ripartenza

La V4.4.15 è la prima base in cui le Guide Premium non sono più una preview isolata ma una parte reale del progetto.

La struttura pubblica e il contratto dati sono pronti per aggiungere nuove guide senza duplicare HTML o CSS.

La dashboard grafica non è ancora implementata, ma tutte le scelte importanti — campi, moduli, limiti, immagini, pubblicazione, simulatori, matchup, VOD e recensioni — sono già definite e documentate.
