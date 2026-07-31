/* ======================================================
   LA TANA DI NIKA — DATI GUIDE PREMIUM V4.4.15
   Sorgente unica per overview, dettaglio e futura dashboard admin.
   Il sito pubblico legge soltanto record status="published".
====================================================== */
(() => {
  const t = (it, en) => ({ it, en });

  const cardLibrary = {
    leader: { label: t('Leader', 'Leader'), accentA: '#6177c4', accentB: '#1f2842' },
    stage: { label: t('Stage', 'Stage'), accentA: '#5a77aa', accentB: '#1c2941' },
    perona: { label: t('Perona', 'Perona'), accentA: '#4a8e84', accentB: '#17342f' },
    support: { label: t('Support', 'Support'), accentA: '#5d9180', accentB: '#223a34' },
    mihawk: { label: t('Mihawk', 'Mihawk'), accentA: '#8f69b7', accentB: '#30213f' },
    zoro: { label: t('Zoro', 'Zoro'), accentA: '#a4637d', accentB: '#351e28' },
    event: { label: t('Evento', 'Event'), accentA: '#a98958', accentB: '#3a2b20' },
    finisher: { label: t('Finisher', 'Finisher'), accentA: '#725a90', accentB: '#241d31' },
    techA: { label: t('Tech A', 'Tech A'), accentA: '#7f67c2', accentB: '#2d2348' },
    techB: { label: t('Tech B', 'Tech B'), accentA: '#6d8da4', accentB: '#223440' },
    techC: { label: t('Tech C', 'Tech C'), accentA: '#9c7b58', accentB: '#3b2b20' }
  };

  const firstTurns = [
    {
      turn: 1,
      don: 1,
      summary: t('Setup iniziale e prima informazione sulla mano avversaria.', 'Initial setup and first information about the opponent hand.'),
      actions: [
        { title: t('Azione 1', 'Action 1'), comment: t('Imposta il leader e conserva la risorsa per la sequenza successiva.', 'Set the leader and preserve the resource for the next sequence.'), chars: ['perona', '', '', '', ''], stage: '', trash: '', life: 5, donTapped: 0, donReturned: 0 },
        { title: t('Azione 2', 'Action 2'), comment: t('Consolida il setup senza sovraestendere la board.', 'Consolidate the setup without overextending the board.'), chars: ['perona', '', '', '', ''], stage: 'stage', trash: '', life: 5, donTapped: 1, donReturned: 0 }
      ]
    },
    {
      turn: 2,
      don: 3,
      summary: t('Primo sviluppo reale della board.', 'First meaningful board development.'),
      actions: [
        { title: t('Azione 1', 'Action 1'), comment: t('Aggiungi una seconda presenza mantenendo una curva coerente.', 'Add a second presence while keeping a coherent curve.'), chars: ['perona', 'support', '', '', ''], stage: 'stage', trash: '', life: 5, donTapped: 0, donReturned: 0 },
        { title: t('Azione 2', 'Action 2'), comment: t('Utilizza due DON per sostenere la pressione del turno.', 'Use two DON to support the turn pressure.'), chars: ['perona', 'support', '', '', ''], stage: 'stage', trash: 'event', life: 5, donTapped: 2, donReturned: 0 }
      ]
    },
    {
      turn: 3,
      don: 5,
      summary: t('Ingresso del pezzo centrale della curva.', 'The central curve piece enters play.'),
      actions: [
        { title: t('Azione 1', 'Action 1'), comment: t('Mihawk entra nella Character Area e prepara il turno successivo.', 'Mihawk enters the Character Area and prepares the next turn.'), chars: ['perona', 'support', 'mihawk', '', ''], stage: 'stage', trash: 'event', life: 5, donTapped: 0, donReturned: 0 },
        { title: t('Azione 2', 'Action 2'), comment: t('Tre DON vengono tappati senza cambiare dimensione.', 'Three DON are rested without changing size.'), chars: ['perona', 'support', 'mihawk', '', ''], stage: 'stage', trash: 'event', life: 5, donTapped: 3, donReturned: 0 }
      ]
    },
    {
      turn: 4,
      don: 7,
      summary: t('La board si allarga e il piano diventa più aggressivo.', 'The board widens and the plan becomes more aggressive.'),
      actions: [
        { title: t('Azione 1', 'Action 1'), comment: t('Aggiungi una nuova minaccia senza perdere il controllo delle risorse.', 'Add a new threat without losing resource control.'), chars: ['perona', 'support', 'mihawk', 'zoro', ''], stage: 'stage', trash: 'event', life: 5, donTapped: 0, donReturned: 0 },
        { title: t('Azione 2', 'Action 2'), comment: t('Cinque DON risultano tappati in una fascia compatta.', 'Five DON are rested in a compact horizontal band.'), chars: ['perona', 'support', 'mihawk', 'zoro', ''], stage: 'stage', trash: 'event', life: 4, donTapped: 5, donReturned: 0 }
      ]
    },
    {
      turn: 5,
      don: 9,
      summary: t('Preparazione della chiusura.', 'Preparing the closing sequence.'),
      actions: [
        { title: t('Azione 1', 'Action 1'), comment: t('La quinta posizione character viene utilizzata per il finisher.', 'The fifth character slot is used for the finisher.'), chars: ['perona', 'support', 'mihawk', 'zoro', 'finisher'], stage: 'stage', trash: 'event', life: 4, donTapped: 2, donReturned: 0 },
        { title: t('Azione 2', 'Action 2'), comment: t('La board completa converte il vantaggio in pressione.', 'The full board converts the advantage into pressure.'), chars: ['perona', 'support', 'mihawk', 'zoro', 'finisher'], stage: 'stage', trash: 'event', life: 4, donTapped: 7, donReturned: 0 }
      ]
    },
    {
      turn: 6,
      don: 10,
      summary: t('Curva massima e turno di chiusura.', 'Maximum curve and closing turn.'),
      actions: [
        { title: t('Azione 1', 'Action 1'), comment: t('Tutti i 10 DON sono disponibili e il DON Deck simbolico scompare.', 'All 10 DON are available and the symbolic DON Deck disappears.'), chars: ['perona', 'support', 'mihawk', 'zoro', 'finisher'], stage: 'stage', trash: 'event', life: 4, donTapped: 0, donReturned: 0 },
        { title: t('Azione 2', 'Action 2'), comment: t('Sette DON vengono tappati mantenendo le dimensioni originali.', 'Seven DON are rested while keeping their original size.'), chars: ['perona', 'support', 'mihawk', 'zoro', 'finisher'], stage: 'stage', trash: 'event', life: 3, donTapped: 7, donReturned: 0 }
      ]
    }
  ];

  const secondTurns = [
    {
      turn: 1,
      don: 2,
      summary: t('Setup iniziale con due DON.', 'Initial setup with two DON.'),
      actions: [
        { title: t('Azione 1', 'Action 1'), comment: t('Apri con il setup più solido disponibile.', 'Open with the strongest available setup.'), chars: ['perona', '', '', '', ''], stage: '', trash: '', life: 5, donTapped: 0, donReturned: 0 },
        { title: t('Azione 2', 'Action 2'), comment: t('Un DON viene tappato per completare la sequenza.', 'One DON is rested to complete the sequence.'), chars: ['perona', '', '', '', ''], stage: 'stage', trash: '', life: 5, donTapped: 1, donReturned: 0 }
      ]
    },
    {
      turn: 2,
      don: 4,
      summary: t('Sviluppo e recupero del tempo.', 'Development and tempo recovery.'),
      actions: [
        { title: t('Azione 1', 'Action 1'), comment: t('Aggiungi una seconda carta mantenendo la board ordinata.', 'Add a second card while keeping the board clear.'), chars: ['perona', 'support', '', '', ''], stage: 'stage', trash: '', life: 5, donTapped: 0, donReturned: 0 },
        { title: t('Azione 2', 'Action 2'), comment: t('Due DON vengono tappati per la giocata centrale.', 'Two DON are rested for the central play.'), chars: ['perona', 'support', '', '', ''], stage: 'stage', trash: 'event', life: 5, donTapped: 2, donReturned: 0 }
      ]
    },
    {
      turn: 3,
      don: 6,
      summary: t('Pressione centrale del game plan.', 'Central pressure point of the game plan.'),
      actions: [
        { title: t('Azione 1', 'Action 1'), comment: t('Mihawk entra in campo e apre le linee del turno.', 'Mihawk enters play and opens the turn lines.'), chars: ['perona', 'support', 'mihawk', '', ''], stage: 'stage', trash: 'event', life: 5, donTapped: 0, donReturned: 0 },
        { title: t('Azione 2', 'Action 2'), comment: t('Tre DON vengono tappati in una disposizione compatta.', 'Three DON are rested in a compact arrangement.'), chars: ['perona', 'support', 'mihawk', '', ''], stage: 'stage', trash: 'event', life: 5, donTapped: 3, donReturned: 0 }
      ]
    },
    {
      turn: 4,
      don: 8,
      summary: t('Board ampia e gestione del vantaggio.', 'Wide board and advantage management.'),
      actions: [
        { title: t('Azione 1', 'Action 1'), comment: t('Il quarto character entra nella sequenza.', 'The fourth character enters the sequence.'), chars: ['perona', 'support', 'mihawk', 'zoro', ''], stage: 'stage', trash: 'event', life: 4, donTapped: 0, donReturned: 0 },
        { title: t('Azione 2', 'Action 2'), comment: t('Cinque DON risultano tappati senza rimpicciolirsi.', 'Five DON are rested without being scaled down.'), chars: ['perona', 'support', 'mihawk', 'zoro', ''], stage: 'stage', trash: 'event', life: 4, donTapped: 5, donReturned: 0 }
      ]
    },
    {
      turn: 5,
      don: 10,
      summary: t('Massimo sviluppo e chiusura.', 'Maximum development and closing sequence.'),
      actions: [
        { title: t('Azione 1', 'Action 1'), comment: t('Il finisher completa la Character Area.', 'The finisher completes the Character Area.'), chars: ['perona', 'support', 'mihawk', 'zoro', 'finisher'], stage: 'stage', trash: 'event', life: 4, donTapped: 0, donReturned: 0 },
        { title: t('Azione 2', 'Action 2'), comment: t('Otto DON vengono tappati per la sequenza finale.', 'Eight DON are rested for the final sequence.'), chars: ['perona', 'support', 'mihawk', 'zoro', 'finisher'], stage: 'stage', trash: 'event', life: 3, donTapped: 8, donReturned: 0 }
      ]
    }
  ];

  const guideTemplate = {
    id: 'template-new-premium-guide',
    slug: 'nuova-guida-premium',
    status: 'draft',
    leader: 'Nuovo Leader',
    format: 'Formato',
    title: t('Scheda tecnica', 'Technical sheet'),
    subtitle: t('Titolo della nuova guida premium.', 'New premium guide title.'),
    excerpt: t('Descrizione breve della guida.', 'Short guide description.'),
    updatedAt: '2026-07-28',
    readingTime: 20,
    coverImage: '',
    accentA: '#925cff',
    accentB: '#17121f',
    tags: ['premium'],
    metrics: { difficulty: 3, strength: 3, consistency: 3 },
    cards: cardLibrary,
    modules: []
  };

  const mihawkGuide = {
    id: 'mihawk-st32',
    slug: 'mihawk-st32',
    status: 'published',
    leader: 'Mihawk',
    format: 'ST32',
    title: t('Scheda tecnica', 'Technical sheet'),
    subtitle: t('Mihawk · Formato ST32', 'Mihawk · ST32 format'),
    excerpt: t('Analisi completa, game plan, simulatore, tech cards, matchup e VOD.', 'Complete analysis, game plan, simulator, tech cards, matchups and VODs.'),
    updatedAt: '2026-07-28',
    readingTime: 28,
    coverImage: 'assets/images/guides/premium/mihawk-st32-cover.jpg',
    accentA: '#925cff',
    accentB: '#1b263e',
    tags: ['premium', 'competitive', 'st32'],
    metrics: { difficulty: 4, strength: 4.5, consistency: 4 },
    cards: cardLibrary,
    modules: [
      {
        id: 'intro-main',
        type: 'intro',
        enabled: true,
        order: 10,
        eyebrow: t('GUIDA PREMIUM', 'PREMIUM GUIDE'),
        title: t('Overview della guida', 'Guide overview'),
        body: t('Una guida pensata per approfondire davvero il mazzo: struttura, decisioni, sequenze, matchup e partite da rivedere. Ogni sezione è indipendente e può essere attivata, disattivata, duplicata e riordinata dalla futura dashboard.', 'A guide designed to explore the deck in depth: structure, decisions, sequencing, matchups and games to review. Every section is independent and can be enabled, disabled, duplicated and reordered by the future dashboard.')
      },
      {
        id: 'decklist-main',
        type: 'decklistImage',
        enabled: true,
        order: 20,
        eyebrow: t('DECKLIST', 'DECKLIST'),
        title: t('Lista del mazzo', 'Deck list'),
        body: t('Questa sezione contiene esclusivamente un’immagine caricabile della lista completa.', 'This section contains only an uploadable image of the complete deck list.'),
        image: '',
        imageAlt: t('Decklist completa di Mihawk ST32', 'Complete Mihawk ST32 deck list')
      },
      {
        id: 'generic-mulligan',
        type: 'genericMulligan',
        enabled: true,
        order: 30,
        eyebrow: t('GENERIC MULLIGAN', 'GENERIC MULLIGAN'),
        title: t('Cosa vai a cercare?', 'What are you looking for?'),
        body: t('Seleziona una carta per leggere la priorità generale del mulligan.', 'Select a card to read the generic mulligan priority.'),
        cards: [
          { card: 'perona', note: t('Perona è il setup più pulito quando la mano ha già una curva coerente.', 'Perona is the cleanest setup when the hand already has a coherent curve.') },
          { card: 'support', note: t('Support aumenta la consistenza delle prime sequenze.', 'Support improves the consistency of early sequences.') },
          { card: 'mihawk', note: t('Mihawk è da conservare quando la mano garantisce il turno centrale.', 'Keep Mihawk when the hand guarantees the middle turn.') },
          { card: 'event', note: t('Event è situazionale e dipende dal matchup.', 'Event is situational and matchup dependent.') },
          { card: 'finisher', note: t('Finisher è generalmente la carta meno importante nella mano iniziale.', 'Finisher is generally the least important card in the opening hand.') }
        ]
      },
      {
        id: 'simulator-main',
        type: 'simulator',
        enabled: true,
        order: 40,
        eyebrow: t('SIMULATORE GUIDATO', 'GUIDED SIMULATOR'),
        title: t('Going 1st e Going 2nd', 'Going 1st and Going 2nd'),
        body: t('Due percorsi indipendenti. Ogni percorso può contenere fino a 20 turni e ogni turno un numero variabile di azioni. Il massimo resta 10 DON.', 'Two independent paths. Each path can contain up to 20 turns and each turn a variable number of actions. The maximum remains 10 DON.'),
        assets: {
          playmat: 'assets/images/guides/premium/playmat-nika.png',
          donFront: 'assets/images/guides/premium/don-card.jpg',
          donBack: 'assets/images/guides/premium/don-back.webp',
          cardBack: 'assets/images/guides/premium/card-back.jpg'
        },
        paths: {
          first: { label: 'Going 1st', turns: firstTurns },
          second: { label: 'Going 2nd', turns: secondTurns }
        }
      },
      {
        id: 'strategy-base',
        type: 'editorialText',
        enabled: true,
        order: 50,
        eyebrow: t('STRATEGIA DI BASE', 'BASIC STRATEGY'),
        title: t('Come vuole giocare il mazzo', 'How the deck wants to play'),
        body: t('Mihawk cerca di trasformare una curva coerente in pressione progressiva. La qualità della guida dipenderà dalla capacità di spiegare non soltanto quali carte giocare, ma perché una sequenza è migliore di un’altra e come cambia il piano in funzione della mano avversaria.', 'Mihawk aims to turn a coherent curve into progressive pressure. The guide should explain not only which cards to play, but why one sequence is better than another and how the plan changes according to the opponent hand.')
      },
      {
        id: 'generic-decisions',
        type: 'editorialText',
        enabled: true,
        order: 60,
        eyebrow: t('DECISIONI GENERICHE', 'GENERIC DECISIONS'),
        title: t('Come valutare ogni turno', 'How to evaluate each turn'),
        body: t('Prima di impegnare DON o carte, valuta pressione disponibile, risorse avversarie, vite da proteggere e capacità di ricostruire la board. Questa sezione può essere duplicata per inserire ulteriori capitoli editoriali.', 'Before committing DON or cards, evaluate available pressure, opponent resources, lives to protect and the ability to rebuild the board. This section can be duplicated to add more editorial chapters.')
      },
      {
        id: 'tech-cards',
        type: 'techCards',
        enabled: true,
        order: 70,
        eyebrow: t('TECH CARDS', 'TECH CARDS'),
        title: t('Scelte tecniche e varianti', 'Technical choices and variants'),
        body: t('Tocca una carta per aprire la relativa scheda tecnica.', 'Tap a card to open its technical sheet.'),
        items: [
          {
            id: 'tech-a',
            card: 'techA',
            title: t('Tech A · Removal option', 'Tech A · Removal option'),
            whenUseful: t('Quando il formato premia board larghe e personaggi di costo medio.', 'When the format rewards wide boards and mid-cost characters.'),
            description: t('Una risposta flessibile che aumenta la qualità dei turni difensivi.', 'A flexible answer that improves defensive turns.'),
            replace: t('Può sostituire una carta situazionale del motore principale.', 'It can replace a situational engine card.'),
            why: t('Permette di adattare la lista senza compromettere la curva.', 'It adapts the list without compromising the curve.'),
            sampleListImage: ''
          },
          {
            id: 'tech-b',
            card: 'techB',
            title: t('Tech B · Consistency option', 'Tech B · Consistency option'),
            whenUseful: t('Quando è fondamentale trovare il setup entro i primi turni.', 'When finding the setup in the first turns is essential.'),
            description: t('Carta dedicata alla qualità della mano e alla stabilità delle sequenze.', 'A card dedicated to hand quality and sequence stability.'),
            replace: t('Può sostituire una carta ridondante o una tech meno rilevante.', 'It can replace a redundant card or a less relevant tech.'),
            why: t('Riduce le mani incoerenti e migliora la probabilità di rispettare la curva.', 'It reduces inconsistent hands and improves the chance of following the curve.'),
            sampleListImage: ''
          },
          {
            id: 'tech-c',
            card: 'techC',
            title: t('Tech C · Finisher option', 'Tech C · Finisher option'),
            whenUseful: t('Quando le partite raggiungono spesso i turni da 9–10 DON.', 'When games often reach the 9–10 DON turns.'),
            description: t('Finisher alternativo ad alto impatto.', 'High-impact alternative finisher.'),
            replace: t('Può sostituire un altro top-end o uno slot tecnico.', 'It can replace another top-end card or tech slot.'),
            why: t('Offre una linea di chiusura diversa e obbliga l’avversario a rispettarla.', 'It provides a different closing line that the opponent must respect.'),
            sampleListImage: ''
          }
        ]
      },
      {
        id: 'matchups-main',
        type: 'matchups',
        enabled: true,
        order: 80,
        eyebrow: t('MATCHUP DOSSIER', 'MATCHUP DOSSIER'),
        title: t('Piano e mulligan personalizzato', 'Plan and custom mulligan'),
        body: t('Ogni matchup ha immagine, tag, commento, piano Going 1st, piano Going 2nd, approfondimento e mulligan dedicato.', 'Each matchup has an image, tags, comment, Going 1st plan, Going 2nd plan, deep dive and dedicated mulligan.'),
        items: [
          {
            id: 'mihawk-vs-koby',
            title: t('Mihawk vs Koby', 'Mihawk vs Koby'),
            image: 'assets/images/guides/premium/matchup-mihawk-sample.jpg',
            imagePosition: 'center',
            tags: [t('Matchup guide', 'Matchup guide'), t('Mulligan dedicato', 'Dedicated mulligan'), t('Going 1st / 2nd', 'Going 1st / 2nd')],
            comment: t('Gioca attorno alla pressione iniziale e conserva le risposte per il turno centrale.', 'Play around early pressure and preserve answers for the middle turn.'),
            first: t('Privilegia setup, curva e pressione progressiva.', 'Prioritize setup, curve and progressive pressure.'),
            second: t('Sfrutta il DON aggiuntivo per recuperare tempo.', 'Use the extra DON to recover tempo.'),
            deepDive: t('Contro Koby l’obiettivo non è soltanto costruire una board ampia, ma obbligare l’avversario a utilizzare le rimozioni in momenti poco efficienti. I primi turni vanno giocati conservando abbastanza risorse da ricostruire dopo il primo swing avversario. Presenta minacce con costi differenti e non investire tutto in una singola carta quando l’avversario ha ancora accesso alla propria curva di rimozione migliore.', 'Against Koby, the goal is not only to build a wide board, but to force removal at inefficient times. Preserve enough resources to rebuild after the first opponent swing. Present threats with different costs and do not invest everything in one card while the opponent still has access to their cleanest removal curve.'),
            mulligan: [
              { card: 'perona', note: t('Perona è il setup prioritario.', 'Perona is the priority setup.') },
              { card: 'support', note: t('Support migliora la consistenza.', 'Support improves consistency.') },
              { card: 'mihawk', note: t('Mihawk è forte con una curva già completa.', 'Mihawk is strong with a complete curve.') },
              { card: 'event', note: t('Event dipende dalla mano avversaria.', 'Event depends on the opponent hand.') },
              { card: 'finisher', note: t('Finisher è secondario nel mulligan.', 'Finisher is secondary in the mulligan.') }
            ]
          },
          {
            id: 'mihawk-vs-enel',
            title: t('Mihawk vs Enel', 'Mihawk vs Enel'),
            image: 'assets/images/guides/premium/matchup-mihawk-sample.jpg',
            imagePosition: 'center',
            tags: [t('Matchup guide', 'Matchup guide'), t('Partita lunga', 'Long game'), t('Mulligan dedicato', 'Dedicated mulligan')],
            comment: t('Il matchup richiede pazienza e una chiusura preparata con più turni di anticipo.', 'The matchup requires patience and a closing sequence prepared several turns ahead.'),
            first: t('Costruisci una board che costringa l’avversario a reagire.', 'Build a board that forces the opponent to react.'),
            second: t('Pianifica il primo vero swing con 6–8 DON.', 'Plan the first meaningful swing with 6–8 DON.'),
            deepDive: t('Contro Enel serve un piano più lungo. La partita raramente si decide con un singolo attacco: costruisci turni consecutivi in cui l’avversario debba scegliere tra difendere la vita, rimuovere la board o preparare la propria chiusura. Alterna valori di attacco differenti e conserva una risposta per il possibile recupero di vita nel turno finale.', 'Against Enel, you need a longer plan. The game is rarely decided by a single attack: build consecutive turns where the opponent must choose between defending life, removing the board or preparing their own close. Alternate attack values and keep an answer for possible life recovery in the final turn.'),
            mulligan: [
              { card: 'mihawk', note: t('Mihawk è centrale nella curva.', 'Mihawk is central to the curve.') },
              { card: 'support', note: t('Support garantisce stabilità.', 'Support provides stability.') },
              { card: 'finisher', note: t('Finisher è utile soltanto con una mano completa.', 'Finisher is useful only with a complete hand.') },
              { card: 'perona', note: t('Perona resta un ottimo setup.', 'Perona remains a strong setup.') },
              { card: 'event', note: t('Event è una scelta dipendente dal meta.', 'Event is a meta-dependent choice.') }
            ]
          }
        ]
      },
      {
        id: 'vods-main',
        type: 'vods',
        enabled: true,
        order: 90,
        eyebrow: t('VIDEO E VOD', 'VIDEO AND VODS'),
        title: t('Partite da rivedere', 'Games to review'),
        body: t('Ogni card video è indipendente e può avere thumbnail, titolo, descrizione, tag e link o embed.', 'Every video card is independent and can have a thumbnail, title, description, tags and a link or embed.'),
        items: [
          { id: 'vod-1', title: t('Mihawk vs Enel · Local finals', 'Mihawk vs Enel · Local finals'), description: t('Partita completa utile per osservare la gestione dei turni da 8–10 DON.', 'Full game useful for observing the management of 8–10 DON turns.'), tags: ['VOD 01', 'Top table'], thumbnail: '', videoUrl: '', provider: 'external' },
          { id: 'vod-2', title: t('Mihawk mirror · Sequencing breakdown', 'Mihawk mirror · Sequencing breakdown'), description: t('Replay commentato dedicato alle decisioni di sequencing.', 'Commentated replay dedicated to sequencing decisions.'), tags: ['VOD 02', 'Guide'], thumbnail: '', videoUrl: '', provider: 'external' },
          { id: 'vod-3', title: t('Mihawk vs Koby · League feature match', 'Mihawk vs Koby · League feature match'), description: t('Feature match pensato per collegare la teoria della guida a una partita reale.', 'Feature match designed to connect guide theory with a real game.'), tags: ['VOD 03', 'League'], thumbnail: '', videoUrl: '', provider: 'external' }
        ]
      },
      {
        id: 'reviews-main',
        type: 'reviews',
        enabled: true,
        order: 100,
        eyebrow: t('COMMUNITY', 'COMMUNITY'),
        title: t('Recensioni e commenti', 'Reviews and comments'),
        body: t('Ogni recensione può includere da una a cinque stelle. Il fallback usa localStorage finché Supabase non viene collegato.', 'Every review can include one to five stars. The fallback uses localStorage until Supabase is connected.')
      }
    ]
  };

  const limits = {
    maxPublishedGuides: 500,
    maxModuleInstancesPerType: 5,
    maxCardsPerHand: 5,
    maxTechCards: 5,
    maxMatchups: 20,
    maxVods: 20,
    maxTurnsPerPath: 20,
    maxActionsPerTurn: 20,
    maxDon: 10
  };

  const moduleCatalog = {
    intro: { maxInstances: 5 },
    decklistImage: { maxInstances: 1 },
    genericMulligan: { maxInstances: 1, maxItems: 5 },
    simulator: { maxInstances: 1, maxTurnsPerPath: 20, maxDon: 10 },
    editorialText: { maxInstances: 5 },
    techCards: { maxInstances: 1, maxItems: 5 },
    matchups: { maxInstances: 1, maxItems: 20 },
    vods: { maxInstances: 1, maxItems: 20 },
    reviews: { maxInstances: 1 }
  };

  const deepClone = value => JSON.parse(JSON.stringify(value));
  const slugify = value => String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

  const normalizeGuide = guide => {
    const normalized = deepClone(guide || guideTemplate);
    normalized.id = normalized.id || `guide-${Date.now()}`;
    normalized.slug = slugify(normalized.slug || normalized.id);
    normalized.status = ['draft', 'published', 'archived'].includes(normalized.status) ? normalized.status : 'draft';
    normalized.modules = Array.isArray(normalized.modules) ? normalized.modules : [];
    normalized.modules = normalized.modules
      .map((module, index) => ({ enabled: true, order: (index + 1) * 10, ...module }))
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
    return normalized;
  };

  const validateGuide = guide => {
    const errors = [];
    const normalized = normalizeGuide(guide);
    if (!normalized.id) errors.push('id mancante');
    if (!normalized.slug) errors.push('slug mancante');
    if (!normalized.leader) errors.push('leader mancante');
    if (!normalized.format) errors.push('formato mancante');

    const counts = {};
    normalized.modules.forEach(module => {
      counts[module.type] = (counts[module.type] || 0) + 1;
      const catalog = moduleCatalog[module.type];
      if (!catalog) errors.push(`tipo modulo non riconosciuto: ${module.type}`);
      if (catalog?.maxItems && Array.isArray(module.items) && module.items.length > catalog.maxItems) {
        errors.push(`${module.type}: massimo ${catalog.maxItems} elementi`);
      }
      if (module.type === 'simulator') {
        ['first', 'second'].forEach(pathKey => {
          const turns = module.paths?.[pathKey]?.turns || [];
          if (turns.length > limits.maxTurnsPerPath) errors.push(`${pathKey}: massimo ${limits.maxTurnsPerPath} turni`);
          turns.forEach(turn => {
            if (Number(turn.don) > limits.maxDon) errors.push(`${pathKey} turno ${turn.turn}: massimo ${limits.maxDon} DON`);
            if ((turn.actions || []).length > limits.maxActionsPerTurn) errors.push(`${pathKey} turno ${turn.turn}: troppe azioni`);
          });
        });
      }
    });

    Object.entries(counts).forEach(([type, count]) => {
      const maximum = moduleCatalog[type]?.maxInstances ?? limits.maxModuleInstancesPerType;
      if (count > maximum) errors.push(`${type}: massimo ${maximum} moduli`);
    });

    return { valid: errors.length === 0, errors, guide: normalized };
  };

  const createGuideFromTemplate = overrides => normalizeGuide({
    ...deepClone(guideTemplate),
    ...deepClone(overrides || {}),
    id: overrides?.id || `premium-guide-${Date.now()}`,
    slug: overrides?.slug || overrides?.id || `premium-guide-${Date.now()}`
  });

  const duplicateGuide = (sourceId, overrides = {}) => {
    const source = [mihawkGuide, guideTemplate].find(guide => guide.id === sourceId) || guideTemplate;
    const copy = deepClone(source);
    copy.id = overrides.id || `${source.id}-copy-${Date.now()}`;
    copy.slug = overrides.slug || slugify(copy.id);
    copy.status = overrides.status || 'draft';
    copy.leader = overrides.leader || `${source.leader} Copy`;
    copy.updatedAt = new Date().toISOString().slice(0, 10);
    return normalizeGuide({ ...copy, ...deepClone(overrides) });
  };

  window.NIKA_PREMIUM_GUIDES_DATA = {
    version: '4.4.18R1',
    settings: {
      placeholderData: true,
      limits,
      moduleCatalog,
      adminActions: ['create', 'duplicate', 'edit', 'upload', 'reorder', 'enable', 'disable', 'publish', 'archive'],
      comments: {
        enabled: true,
        oneContributionPerVisitor: true,
        fallback: 'localStorage',
        sharedPersistence: 'Supabase Anonymous Auth + Row Level Security'
      }
    },
    guides: [mihawkGuide],
    templates: { blank: guideTemplate },
    adminApi: { deepClone, slugify, normalizeGuide, validateGuide, createGuideFromTemplate, duplicateGuide }
  };
})();
