# Come aggiungere un articolo o report — V4.4.18

## Metodo attuale
Usare `window.NIKA_ARTICLES_DATA.adminApi.createArticleFromTemplate()` oppure duplicare un contenuto con `duplicateArticle(id)`.

## Metodo futuro dalla dashboard
1. Premi **Nuovo articolo** oppure **Duplica**.
2. Compila i campi generali.
3. Carica copertina e immagini.
4. Aggiungi e riordina i moduli.
5. Salva una bozza, programma o pubblica.

## Moduli disponibili
- testo;
- immagine;
- citazione;
- punti chiave;
- statistiche;
- risultati;
- galleria;
- video Twitch;
- contenuti collegati;
- callout.

Ogni tipologia può avere fino a cinque istanze. Almeno un modulo testo attivo è obbligatorio.

## Ciclo di vita
`draft`, `scheduled`, `published`, `archived`, `trash`.

Il sito pubblico mostra soltanto gli articoli `published` non eliminati. Nessun nuovo file HTML è necessario per aggiungere contenuti.
