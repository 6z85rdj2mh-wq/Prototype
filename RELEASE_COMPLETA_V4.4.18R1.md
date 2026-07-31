# La Tana di Nika — V4.4.18R1

## Stato della release

- Versione: V4.4.18R1
- Tipo: ricostruzione/hotfix della V4.4.18
- Base tecnica: V4.4.16 stabile
- Funzione reintrodotta: Articoli e report CMS-ready
- V4.4.19: sospesa finché questa base non viene verificata sul sito pubblicato

## Perché è stata ricostruita

Dopo il caricamento della V4.4.18 il sito pubblicato ha mostrato regressioni gravi: simulatore Premium non visibile e anomalie grafiche nell’Area Editoriale, sia desktop sia mobile.

Il confronto file per file ha mostrato che la sezione Guide Premium della V4.4.18 originale era identica alla V4.4.16. Di conseguenza il guasto non derivava da una modifica diretta al simulatore. Le cause compatibili sono:

1. caricamento incompleto delle cartelle `js`, `css` o `assets` durante la sostituzione da telefono;
2. file HTML nuovi serviti insieme a CSS/JavaScript vecchi rimasti nella cache;
3. sostituzione parziale del repository, con risorse della nuova versione mancanti;
4. interpolazione grafica di alcuni gradienti trasparenti, capace di produrre aloni scuri differenti tra browser.

La release è stata quindi ricostruita dalla V4.4.16 pulita invece di modificare ulteriormente la V4.4.18 già distribuita.

## Ricostruzione effettuata

Sono stati ripresi dalla V4.4.16 tutti i file pubblici già stabili, inclusi:

- homepage;
- Area Editoriale;
- Guide gratuite;
- Guide Premium;
- simulatore Going 1st / Going 2nd;
- Tornei già presenti nella V4.4.16;
- header, navigazione, traduzioni e componenti condivisi.

Della V4.4.18 sono stati reintrodotti soltanto gli elementi necessari agli Articoli:

- `admin/articles/`;
- `css/articles.css`;
- `css/article-detail.css`;
- `editoriale/articoli/index.html`;
- `editoriale/articoli/articolo/index.html`;
- `js/components/articles-page.js`;
- `js/components/article-detail.js`;
- `js/config/services.js`;
- `js/services/media-service.js`;
- `js/data/articles.js`;
- `SUPABASE_ARTICLES_SCHEMA_V4.4.18.sql`;
- collegamento dell’ultimo articolo nell’hub editoriale;
- collegamento del recap Nika League al relativo articolo.

## Correzioni di robustezza

### Cache delle risorse

Tutti i riferimenti versionati di CSS, JavaScript e immagini negli HTML usano ora:

`?v=4.4.18R1`

Questo forza browser e GitHub Pages a richiedere nuovamente i file aggiornati, evitando combinazioni tra HTML nuovi e risorse vecchie.

### Caricamento incompleto

Le pagine dati principali hanno ora un fallback visibile. Se dati o script non vengono caricati, la pagina non resta vuota o bloccata su “Caricamento”: mostra un messaggio che segnala esplicitamente una distribuzione incompleta.

Il fallback è presente in:

- libreria Guide Premium;
- dettaglio Guida Premium;
- libreria Articoli;
- dettaglio Articolo.

### Local storage

La lettura e scrittura della lingua sono state rese tolleranti agli errori. Un browser che blocca temporaneamente `localStorage` non interrompe più l’esecuzione dei componenti Premium o del sistema generale delle traduzioni.

### Aloni circolari scuri

Nei gradienti decorativi dell’hub editoriale il colore finale non usa più `transparent` generico, che può interpolare verso il nero. Ora viene usata la stessa tinta viola con opacità zero. La composizione resta viola e premium, ma senza il possibile alone nero circolare.

### GitHub Pages

È stato aggiunto il file `.nojekyll` per chiedere a GitHub Pages di pubblicare i file statici senza elaborazioni Jekyll non necessarie.

## Controlli browser eseguiti

Le pagine critiche sono state renderizzate in Chromium headless a:

- 390 × 844 pixel;
- 1440 × 900 pixel.

Controllate:

- Area Editoriale;
- libreria Guide Premium;
- dettaglio Mihawk ST32;
- libreria Articoli;
- dettaglio del report Nika League.

Risultati:

- nessun overflow orizzontale;
- nessun file locale mancante nel rendering;
- nessun errore JavaScript rilevato;
- nessun fallback di errore attivato;
- una guida Premium presente nella libreria;
- dieci moduli Premium renderizzati;
- simulatore presente desktop e mobile;
- due azioni disponibili nel turno verificato;
- cambio Going 1st / Going 2nd funzionante;
- azione successiva funzionante;
- turno successivo funzionante;
- cambio Tech Card funzionante;
- tre articoli pubblicati nella libreria, incluso quello in evidenza;
- articolo Nika League aperto correttamente con sei moduli.

Il test browser è stato effettuato tramite un ambiente locale controllato con risorse intercettate e servite direttamente dalla cartella della patch. Non sostituisce il controllo finale sul dominio GitHub Pages con Edge e Safari reali.

## Controlli statici

La release contiene 124 file ed è stata sottoposta a:

- controllo sintattico di 26 file JavaScript;
- parsing di 16 file CSS;
- validazione di 6 file JSON;
- controllo di 11 pagine HTML e di 316 riferimenti locali;
- controllo degli ID HTML duplicati;
- confronto selettivo con la V4.4.16;
- verifica dell’integrità dello ZIP;
- estrazione dello ZIP e confronto hash file per file con la cartella sorgente.

## Installazione corretta da GitHub Codespaces

Questa release deve sostituire integralmente il contenuto del repository. Non bisogna caricare soltanto i file presenti nella radice: devono essere sostituite anche tutte le cartelle.

Dopo aver caricato `LA_TANA_DI_NIKA_V4.4.18R1.zip` nel Codespace, eseguire dalla radice del repository:

```bash
mkdir -p /tmp/nika_4418r1
unzip -q LA_TANA_DI_NIKA_V4.4.18R1.zip -d /tmp/nika_4418r1
find . -mindepth 1 -maxdepth 1 ! -name '.git' ! -name 'LA_TANA_DI_NIKA_V4.4.18R1.zip' -exec rm -rf {} +
cp -a /tmp/nika_4418r1/. .
rm -rf /tmp/nika_4418r1 LA_TANA_DI_NIKA_V4.4.18R1.zip
git add .
git commit -m "Ricostruisce La Tana di Nika V4.4.18R1"
git push
```

Lo ZIP è repository-ready: `index.html`, `css`, `js`, `assets`, `editoriale` e `tornei` si trovano direttamente alla sua radice, senza una cartella contenitore aggiuntiva.

## Controllo dopo la pubblicazione

Dopo il push:

1. attendere il completamento di GitHub Pages;
2. aprire il sito in una scheda privata;
3. verificare Area Editoriale;
4. aprire Guide Premium;
5. aprire Mihawk ST32;
6. verificare che il simulatore compaia;
7. passare da Going 1st a Going 2nd;
8. aprire Articoli e report;
9. aprire il report Nika League;
10. ripetere il controllo su telefono.

In caso di vecchi file ancora visibili, eseguire un aggiornamento forzato o cancellare i dati del sito. Il nuovo parametro `4.4.18R1` dovrebbe comunque evitare il riuso delle risorse precedenti.

## Stato architetturale

Restano valide le decisioni già approvate:

- Supabase come backend principale per dati, autenticazione, utenti, permessi e futura dashboard;
- Cloudflare R2 come futuro archivio di immagini e media pesanti;
- Twitch come provider corrente per live e VOD;
- Guide gratuite, Guide Premium e Articoli predisposti come contenuti CMS-ready;
- pagine pubbliche generiche basate su ID o slug;
- nessun controllo amministrativo esposto al pubblico;
- futura area personale con acquisti Premium legati all’account;
- dashboard admin unica soltanto dopo la definizione di tutte le sezioni pubbliche.

## Problemi noti e limiti

- La dashboard grafica non è ancora implementata.
- Supabase non è ancora collegato ai contenuti pubblici.
- R2 non è ancora attivo.
- I commenti usano ancora fallback locale dove previsto.
- Twitch non protegge realmente i video Premium da accessi esterni.
- Il test conclusivo su GitHub Pages, Edge e Safari deve essere svolto dopo il caricamento completo.

## Prossimo step

La V4.4.19 resta congelata finché la V4.4.18R1 non viene verificata sul dominio reale.

Dopo l’approvazione:

1. la V4.4.18R1 diventa base stabile;
2. si riprende la V4.4.19 Area Tornei multi-league CMS-ready;
3. si aggiunge la classifica dinamica con tappe conteggiate in verde e scartate in rosso;
4. il numero di tappe diventa configurabile;
5. ogni futura patch continuerà ad avere un solo documento completo di release.

## Memoria operativa

- Non ripartire dalla precedente V4.4.18 distribuita.
- Non usare la release candidate V4.4.19 come base finché il rebuild non è approvato.
- Partire dalla V4.4.18R1 dopo il controllo reale.
- Conservare la struttura Premium già approvata e non riscrivere inutilmente il simulatore.
- Ogni modifica grafica deve avere una preview completa navigabile da telefono.
- Ogni release deve produrre soltanto ZIP, checksum, preview e un documento completo di release.

---

# Memoria consolidata del progetto

## Identità

La Tana di Nika è una piattaforma digitale premium dedicata al One Piece Card Game. Non deve sembrare una fan page generica o un semplice catalogo. La qualità percepita deve essere professionale, riconoscibile e scalabile.

Le due anime principali della homepage hanno pari importanza:

1. Store;
2. Area Editoriale.

L’Area Tornei è strategica, ma subordinata ai due ingressi principali della homepage.

### Linguaggio visivo

- palette primaria: nero, bianco e viola;
- stile moderno, cinematografico, editoriale e premium;
- titoli importanti in serif editoriale;
- interfaccia e testi tecnici in sans leggibile;
- evitare estetica cartoon, pacchiana o eccessivamente gaming;
- bordi traslucidi, superfici scure e profondità sobria;
- animazioni fisiche, morbide, funzionali e mai aggressive;
- illustrazioni ambientali vive ma discrete;
- responsive progettato fin dall’inizio.

### Logo

Usare esclusivamente `assets/images/mascot-nika.png`, corrispondente alla nuvoletta ufficiale fornita dall’utente. Non usare varianti generate e non ridisegnarla senza richiesta esplicita.

### Indipendenza

La pagina Chi siamo deve contenere la nota che chiarisce che La Tana di Nika è un progetto indipendente e non affiliato o approvato da Bandai, Shueisha, Toei Animation o dagli altri titolari dei diritti.

## Regole operative di sviluppo

- HTML, CSS e JavaScript vanilla;
- GitHub Pages come hosting statico corrente;
- modifiche piccole e localizzate quando possibile;
- non riscrivere componenti approvati senza necessità;
- nessun controllo admin nelle pagine pubbliche;
- dati centralizzati e componenti riutilizzabili;
- priorità a performance, accessibilità, SEO e analytics;
- browser desktop principale: Edge;
- mobile di riferimento: Safari/iPhone;
- ogni modifica grafica deve avere una preview completa navigabile dalla chat e ottimizzata per telefono;
- la preview deve mostrare il flusso reale, non soltanto screenshot;
- ogni nuova patch produce ZIP, checksum, preview e un solo documento completo di release.

## Lingue

Il sito supporta italiano e inglese. La lingua viene memorizzata tramite `nika-language`.

Non reintrodurre un listener che ricarichi la pagina a ogni evento `nika:languagechange`: il primo evento può essere di inizializzazione e genererebbe loop.

## Homepage

La hero comunica Store ed Editoriale come aree equivalenti. Su desktop l’hover ingrandisce leggermente la metà attiva e restringe l’altra, con movimento fluido ed elastico. Su mobile il comportamento deve essere adattato a tap e scroll senza overflow.

## Area Editoriale

Hub approvato:

- titolo: “Cosa vuoi leggere?”;
- tre card equivalenti e numerate;
- Articoli generici e report;
- Guide gratuite;
- Guide Premium;
- nessuna lunga hero introduttiva.

### Guide gratuite

Sono CMS-ready dalla V4.4.16.

Stati:

- draft;
- published;
- archived;
- trash.

Azioni previste:

- creazione da template;
- duplicazione;
- modifica completa di testi e immagini;
- pubblicazione;
- archivio;
- cestino;
- ripristino;
- eliminazione definitiva protetta.

Moduli obbligatori:

- why;
- keyCards;
- decklist.

Le sezioni con carte rispettano il limite 0–5 dove previsto. Il pubblico mostra soltanto guide pubblicate e non eliminate.

### Guide Premium

La pagina pubblica è generica e basata su ID o slug. Una nuova guida non deve richiedere nuovi file HTML, CSS o JavaScript.

Struttura approvata:

- scheda tecnica;
- difficoltà, forza e consistenza;
- decklist come singola immagine;
- Generic Mulligan con 3–5 carte, idealmente 5;
- simulatore Going 1st e Going 2nd;
- massimo 20 turni per percorso;
- massimo 10 DON;
- numero variabile di azioni per turno;
- carte normalizzate nel rapporto 63:88;
- moduli Strategia di base e Decisioni generiche;
- Tech Cards prima dei matchup;
- scheda Tech Card con: quando è utile, descrizione, cosa togliere, perché giocarla e sample list;
- matchup con banner premium, immagine sfumata, tag, commento generale, piano first/second, approfondimento e mulligan dedicato;
- sezione VOD prima dei commenti;
- recensioni con una–cinque stelle.

Il simulatore usa gli asset approvati della plancia e dei DON. Going first segue 1/3/5/7/9 e poi 10; Going second 2/4/6/8/10. I DON tappati restano della stessa dimensione e ruotano individualmente di 90 gradi.

### Articoli e report

La V4.4.18R1 mantiene l’architettura CMS-ready introdotta dalla V4.4.18:

- libreria con ricerca e categorie;
- articolo in evidenza;
- pagina generica basata su ID o slug;
- stati draft, scheduled, published, archived e trash;
- template, duplicazione, programmazione, pubblicazione, archivio, cestino e ripristino;
- moduli testo, immagine, citazione, punti chiave, statistiche, risultati, galleria, video Twitch, collegamenti e callout;
- massimo cinque istanze per tipologia dove previsto;
- almeno un modulo testuale attivo.

## Area Tornei

La V4.4.19 resta congelata e non deve essere usata come base finché la V4.4.18R1 non è verificata.

Direzione approvata:

- hub `/tornei/` con due card equivalenti: Nika League e I nostri tornei;
- barra Twitch compatta sopra le card;
- hover desktop simile alla homepage ma con card separate;
- mobile adattato a tap/scroll.

### Sistema multi-league

L’Area Nika League deve supportare più leghe contemporaneamente:

- Nika League La Tana;
- futura Nika League Corciano;
- futura Nika League Bastia;
- altre leghe duplicabili.

L’hub League mostra un selettore/accordion simile ai matchup. Oggi deve comparire soltanto la lega pubblicata. Ogni lega usa una pagina generica basata su slug o ID.

La duplicazione di una lega copia la struttura completa delle 6 tappe più Finale, regole, moduli e configurazioni, ma non copia automaticamente date, iscritti, risultati o classifiche.

### Classifica League da reinserire nella V4.4.19

La prossima revisione deve contenere:

- classifica editabile;
- colonne generate dinamicamente dalle tappe;
- tappe conteggiate evidenziate in verde;
- tappe scartate evidenziate in rosso;
- possibilità di aggiungere più tappe oltre alle sei standard;
- numero di risultati conteggiati/scartati configurabile;
- massimo 64 giocatori, mostrando soltanto quelli realmente registrati;
- righe giocatore espandibili;
- due peggiori tappe escluse come impostazione standard attuale.

### I nostri tornei

Devono supportare local, tornei domenicali ed eventi esterni, con data, luogo, formato, iscrizioni, griglia premi personalizzabile, risultati, Top, fotografie, recap, articoli e VOD.

## Backend e media

Architettura approvata:

- Supabase = cervello del sito e dati;
- Cloudflare R2 = archivio immagini e media statici pesanti;
- Twitch = provider corrente per live e VOD;
- eventuale servizio video privato da valutare in futuro.

Supabase gestirà:

- autenticazione;
- utenti;
- futura dashboard;
- guide;
- articoli;
- tornei;
- classifiche;
- commenti;
- acquisti e autorizzazioni;
- permessi e Row Level Security.

R2 conserverà immagini carte, decklist, copertine, immagini articoli e fotografie tornei. Le chiavi segrete non devono essere esposte nel frontend. Gli upload futuri devono passare attraverso un Cloudflare Worker o URL firmati.

La struttura media deve restare astratta: le pagine pubbliche salvano e ricevono riferimenti media senza conoscere il provider effettivo.

## Video

Per ora le partite vengono pubblicate su Twitch e incorporate nel sito. Supabase salverà soltanto metadati e riferimento al video. La struttura deve permettere una futura migrazione a Cloudflare Stream, Bunny Stream o altro provider senza riscrivere le pagine.

## Account e acquisti Premium

Le Guide Premium dovranno essere collegate all’account dell’utente, non al browser o al dispositivo.

Flusso previsto:

1. registrazione/accesso tramite Supabase Auth;
2. pagamento;
3. conferma server-to-server;
4. registrazione dell’acquisto;
5. creazione dell’autorizzazione alla guida;
6. comparsa nella biblioteca personale;
7. accesso da qualsiasi dispositivo dopo il login.

I contenuti Premium reali non dovranno essere inclusi integralmente nel JavaScript pubblico. Dovranno essere caricati soltanto dopo autenticazione e verifica dell’autorizzazione.

## Dashboard admin

La dashboard grafica unica verrà sviluppata dopo aver definito tutte le sezioni pubbliche e i relativi dati modificabili.

Dovrà consentire, da desktop e telefono:

- Nuovo;
- Duplica;
- Modifica;
- Carica immagine;
- Anteprima;
- Salva bozza;
- Programma;
- Pubblica;
- Archivia;
- Cestina;
- Ripristina;
- Elimina definitivamente.

La gestione dovrà essere semplice: campi di testo, upload, selettori, interruttori e riordinamento dei moduli.

## Priorità immediata

1. caricare integralmente la V4.4.18R1;
2. verificare il dominio reale su Edge e Safari;
3. confermare simulatore, Articoli e Area Editoriale;
4. rendere la V4.4.18R1 base stabile;
5. riprendere la V4.4.19 multi-league;
6. aggiungere la classifica dinamica League;
7. mantenere preview mobile complete prima di ogni ZIP definitivo.
