# Revisione progetto V4.4.18

## Stato
Le tre famiglie editoriali principali dispongono ora di una base CMS-ready:
- Guide gratuite;
- Guide premium;
- Articoli e report.

## Novità V4.4.18
La sezione Articoli è ora pubblicabile attraverso record dati, non attraverso pagine HTML duplicate. La pagina pubblica generica interpreta moduli ordinabili e filtra bozze, programmati, archiviati e cestinati.

## Architettura backend approvata
Supabase gestirà dati, autenticazione, utenti, ruoli e dashboard. Cloudflare R2 conserverà immagini e media statici. Twitch ospiterà inizialmente live e VOD.

## Rischi residui
- La persistenza è ancora locale nei file JavaScript.
- Le immagini dimostrative devono essere sostituite dalla futura admin.
- La programmazione automatica richiederà backend/cron.
- L’embed Twitch richiederà il dominio definitivo nel parametro parent.

## Prossime attività
1. approvazione mobile/desktop della sezione Articoli;
2. caricamento patch su GitHub Pages;
3. verifica Edge e Safari reali;
4. progettazione delle restanti entità modificabili prima della dashboard unica.
