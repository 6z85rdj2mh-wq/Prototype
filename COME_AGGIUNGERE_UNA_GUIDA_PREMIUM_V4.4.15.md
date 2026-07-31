# Come aggiungere una nuova Guida Premium

La V4.4.15 è costruita affinché una nuova guida non richieda la copia dell’HTML.

La pagina pubblica è unica e legge i dati da:

`js/data/premium-guides.js`

## Oggi, prima della dashboard

La procedura tecnica temporanea è:

1. Aprire `js/data/premium-guides.js`.
2. Duplicare il record `mihawkGuide`, oppure partire da `guideTemplate`.
3. Cambiare:
   - `id`;
   - `slug`;
   - `leader`;
   - `format`;
   - titoli e descrizioni;
   - cover;
   - metriche;
   - moduli.
4. Lasciare `status: "draft"` mentre si lavora.
5. Validare il record.
6. Impostare `status: "published"` solo quando è pronto.
7. Inserire il record nell’array pubblico `guides`.

## Helper disponibili

Nella console di sviluppo o nella futura dashboard:

```js
const copy = window.NIKA_PREMIUM_GUIDES_DATA.adminApi.duplicateGuide(
  'mihawk-st32',
  {
    id: 'nuovo-leader-formato',
    slug: 'nuovo-leader-formato',
    leader: 'Nuovo Leader',
    format: 'OPXX',
    status: 'draft'
  }
);
```

Per partire da una guida vuota:

```js
const newGuide = window.NIKA_PREMIUM_GUIDES_DATA.adminApi.createGuideFromTemplate({
  id: 'nuovo-leader-formato',
  slug: 'nuovo-leader-formato',
  leader: 'Nuovo Leader',
  format: 'OPXX'
});
```

Per controllare errori e limiti:

```js
const result = window.NIKA_PREMIUM_GUIDES_DATA.adminApi.validateGuide(newGuide);
console.log(result.valid, result.errors);
```

## Come funzionerà dalla futura dashboard

L’interfaccia dovrà evitare il codice e presentare semplici form.

### Informazioni principali

- Leader
- Formato
- Titolo
- Descrizione
- Cover
- Tempo di lettura
- Difficoltà
- Forza
- Consistenza

### Moduli

Per ogni modulo:

- attiva/disattiva;
- trascina per riordinare;
- duplica;
- elimina;
- scrivi il testo;
- carica le immagini.

### Simulatore

La dashboard mostrerà due tab:

- Going 1st
- Going 2nd

Dentro ogni tab:

1. Aggiungi turno.
2. Imposta i DON del turno, massimo 10.
3. Scrivi descrizione del turno.
4. Aggiungi le azioni.
5. Per ogni azione scegli:
   - carte sulla plancia;
   - Stage;
   - Trash;
   - numero vite;
   - DON tappati;
   - DON restituiti;
   - commento.

Massimo 20 turni per percorso.

### Matchup

Per aggiungere un matchup:

1. Titolo, per esempio “Mihawk vs Enel”.
2. Immagine panoramica.
3. Tag.
4. Commento generale.
5. Piano Going 1st.
6. Piano Going 2nd.
7. Testo approfondito.
8. Da una a cinque carte per il mulligan custom.

### Tech Cards

Per ogni carta:

- immagine/carta;
- quando è utile;
- descrizione;
- cosa togliere;
- perché giocarla;
- sample list opzionale.

### VOD

Per ogni video:

- titolo;
- thumbnail;
- descrizione;
- tag;
- link;
- provider.

## Immagini

Rapporti consigliati:

- carte: 63:88;
- VOD: 16:9;
- matchup: panoramico;
- decklist: immagine completa leggibile;
- cover: orizzontale.

## Pubblicazione

La guida non compare pubblicamente finché resta:

`status: "draft"`

Compare nell’overview quando diventa:

`status: "published"`

La dashboard finale dovrà avere tre pulsanti chiari:

- Salva bozza
- Anteprima
- Pubblica
