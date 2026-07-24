# La Tana di Nika — Prototipo homepage V1

Primo prototipo statico in HTML, CSS e JavaScript vanilla.

## Incluso

- Header responsive e trasparente
- Selettore IT / EN con memoria in `localStorage`
- Hero Store / Editoriale 50:50
- Espansione 58:42 su hover, focus o tap
- Separatore SVG leggermente elastico
- Scenario marino condiviso
- Ricerca Store / Contenuti
- Supporto `prefers-reduced-motion`
- Layout desktop, tablet e mobile

## Avvio

Apri `index.html` nel browser. Per lavorare in sviluppo è consigliato usare Live Server o un server locale.

## Nota

La ricerca è dimostrativa e non è ancora collegata a Shopify o Supabase. I collegamenti della Hero sono segnaposto interni alla homepage.

## Aggiornamento V2 — Hero refinement

Questa versione mantiene invariata la struttura del prototipo V1 e modifica soltanto:

- `index.html`
- `css/home.css`
- `js/components/hero-split.js`

Novità principali:

- meta `noindex, nofollow` già incluso durante lo sviluppo;
- parallasse ambientale leggero collegato al puntatore;
- luce viola contestuale e più profondità visiva;
- separatore centrale più reattivo e ritorno morbido allo stato neutro;
- maggiore distinzione tra pannello attivo e inattivo;
- navigazione da tastiera con frecce ed ESC;
- miglioramento del comportamento touch e reset quando la Hero esce dallo schermo;
- descrizioni collegate semanticamente ai rispettivi pannelli.
