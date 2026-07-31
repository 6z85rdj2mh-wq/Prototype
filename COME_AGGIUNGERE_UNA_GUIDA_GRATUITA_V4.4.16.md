# Come aggiungere una guida gratuita — V4.4.16

La V4.4.16 consente di riutilizzare una sola pagina pubblica per tutti i mazzi.

## Nella futura admin

1. Aprire **Guide gratuite**.
2. Premere **Nuova guida** o **Duplica**.
3. Inserire Leader, titoli, formato, estratto, tag e immagini.
4. Compilare e riordinare i moduli.
5. Salvare come bozza.
6. Controllare l’anteprima.
7. Pubblicare.

## API temporanea

Sorgente: `js/data/free-guides.js`.

Funzioni principali:

- `templates.blank`;
- `adminApi.createGuideFromTemplate(overrides)`;
- `adminApi.duplicateGuide(identifier, overrides)`;
- `adminApi.validateGuide(guide)`;
- `adminApi.publishGuide(guide)`;
- `adminApi.archiveGuide(guide)`;
- `adminApi.moveGuideToTrash(guide)`;
- `adminApi.restoreGuide(guide)`.

Le pagine pubbliche leggono soltanto i record `published`. Non serve creare una nuova pagina HTML.

## Cancellazione

Prima cestino, poi eventuale eliminazione definitiva con seconda conferma.
