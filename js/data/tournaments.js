/* ======================================================
   LA TANA DI NIKA — DATI TORNEI V4.4.1
   Tutti i valori sono dimostrativi e centralizzati.
====================================================== */
window.NIKA_TOURNAMENTS_DATA = {
  settings: {
    timeZone: "Europe/Rome",
    reminderMinutes: 120,
    placeholderData: true,
    maxLeaguePlayers: 64,
    twitch: {
      enabled: false,
      channel: "",
      parent: "",
      status: "upcoming", // upcoming | live | offline | replay
      nextLive: "2027-01-24T15:00:00+01:00",
      vodId: ""
    }
  },

  leagueEvents: [
    {
      id: "league-stage-1", type: "stage", stage: 1, date: "2026-08-09", time: "15:00", endTime: "20:00",
      title: { it: "Nika League — Tappa 1", en: "Nika League — Stage 1" }, expansion: "OP-16", format: "Constructed",
      location: "Location da definire", status: "completed", image: "",
      description: {
        it: "L’inizio della nuova corsa al titolo: primi punti, prime sorprese e una classifica ancora tutta da scrivere.",
        en: "The new title race begins: first points, first surprises and a table still waiting to be written."
      }
    },
    {
      id: "league-stage-2", type: "stage", stage: 2, date: "2026-09-06", time: "15:00", endTime: "20:00",
      title: { it: "Nika League — Tappa 2", en: "Nika League — Stage 2" }, expansion: "OP-16", format: "Constructed",
      location: "Location da definire", status: "completed", image: "",
      description: {
        it: "La seconda tappa misura la continuità dei favoriti e apre spazio ai primi veri outsider della stagione.",
        en: "Stage two tests the favourites’ consistency and opens the door to the season’s first true outsiders."
      }
    },
    {
      id: "league-stage-3", type: "stage", stage: 3, date: "2026-10-04", time: "15:00", endTime: "20:00",
      title: { it: "Nika League — Tappa 3", en: "Nika League — Stage 3" }, expansion: "OP-17", format: "Constructed",
      location: "Location da definire", status: "upcoming", image: "",
      description: {
        it: "Il cambio di espansione può ridisegnare il meta e trasformare completamente gli equilibri della League.",
        en: "A new expansion may reshape the meta and completely change the League’s balance."
      }
    },
    {
      id: "league-stage-4", type: "stage", stage: 4, date: "2026-11-01", time: "15:00", endTime: "20:00",
      title: { it: "Nika League — Tappa 4", en: "Nika League — Stage 4" }, expansion: "OP-17", format: "Constructed",
      location: "Location da definire", status: "upcoming", image: "",
      description: {
        it: "La stagione entra nella sua seconda metà e ogni punto comincia a pesare nella corsa alla Finale.",
        en: "The season enters its second half and every point begins to matter in the race to the Final."
      }
    },
    {
      id: "league-stage-5", type: "stage", stage: 5, date: "2026-11-29", time: "15:00", endTime: "20:00",
      title: { it: "Nika League — Tappa 5", en: "Nika League — Stage 5" }, expansion: "OP-17", format: "Constructed",
      location: "Location da definire", status: "upcoming", image: "",
      description: {
        it: "Con una sola tappa rimasta, gli scarti iniziano a cambiare il volto della classifica generale.",
        en: "With one stage left, discarded scores begin to change the shape of the overall standings."
      }
    },
    {
      id: "league-stage-6", type: "stage", stage: 6, date: "2026-12-20", time: "15:00", endTime: "20:00",
      title: { it: "Nika League — Tappa 6", en: "Nika League — Stage 6" }, expansion: "OP-18", format: "Constructed",
      location: "Location da definire", status: "upcoming", image: "",
      description: {
        it: "L’ultima occasione per migliorare il proprio bottino e conquistare un posto nella Finale della Tana.",
        en: "The final chance to improve your score and earn a place in the Den’s Final."
      }
    },
    {
      id: "league-final", type: "final", stage: 7, date: "2027-01-24", time: "15:00", endTime: "21:00",
      title: { it: "Finale Nika League", en: "Nika League Final" }, expansion: "Finale", format: "Final Stage",
      location: "Location da definire", status: "upcoming", image: "",
      description: {
        it: "Il capitolo conclusivo della stagione: i migliori giocatori delle sei tappe si incontrano per decidere chi diventerà il campione della Tana.",
        en: "The season’s final chapter: the best players from six stages meet to decide who becomes champion of the Den."
      },
      commentary: {
        it: "Sei tappe hanno costruito rivalità, rimonte e sorprese. La Finale sarà il momento in cui ogni scelta, ogni punto e ogni partita troveranno il proprio significato.",
        en: "Six stages created rivalries, comebacks and surprises. The Final is where every choice, point and match will finally find its meaning."
      }
    }
  ],

  leagueStories: [
    {
      player: "Giocatore A",
      label: { it: "IL LEADER", en: "THE LEADER" },
      title: { it: "Una partenza che detta il ritmo.", en: "A start that sets the pace." },
      text: { it: "Due risultati di vertice e una continuità impressionante lo hanno portato in testa alla corsa.", en: "Two top finishes and remarkable consistency have taken him to the top of the race." }
    },
    {
      player: "Giocatore D",
      label: { it: "LA RIMONTA", en: "THE COMEBACK" },
      title: { it: "Dalle retrovie alla zona Finale.", en: "From the pack into Final contention." },
      text: { it: "Una tappa perfetta ha cambiato la sua stagione e riaperto completamente la lotta per la qualificazione.", en: "A perfect stage changed the season and reopened the entire qualification race." }
    },
    {
      player: "Giocatore F",
      label: { it: "L’OUTSIDER", en: "THE OUTSIDER" },
      title: { it: "Ogni tappa, un passo in avanti.", en: "One step forward at every stage." },
      text: { it: "La crescita più costante della League: meno rumore, più punti e una presenza ormai impossibile da ignorare.", en: "The League’s steadiest growth: less noise, more points and a presence that can no longer be ignored." }
    }
  ],

  localEvents: [
    {
      id: "local-sunday-1", date: "2026-08-23", time: "15:00", endTime: "20:00",
      category: { it: "Domenicale", en: "Sunday tournament" },
      title: { it: "Domenicale della Tana", en: "The Den Sunday Tournament" },
      expansion: "OP-16", format: "Constructed", location: "Location da definire", seats: 16, status: "open", image: "",
      description: {
        it: "Un torneo indipendente dalla League, pensato per giocare, testare e vivere la community della Tana.",
        en: "A tournament outside the League, made for playing, testing and enjoying the Den’s community."
      },
      prizeTiers: [
        { label: { it: "Da 8 giocatori", en: "From 8 players" }, prizes: [
          { placement: "1°", reward: { it: "12 buste — placeholder", en: "12 boosters — placeholder" } },
          { placement: "2°", reward: { it: "6 buste — placeholder", en: "6 boosters — placeholder" } }
        ]},
        { label: { it: "Da 16 giocatori", en: "From 16 players" }, prizes: [
          { placement: "1°", reward: { it: "1 box — placeholder", en: "1 box — placeholder" } },
          { placement: "2°", reward: { it: "12 buste — placeholder", en: "12 boosters — placeholder" } },
          { placement: "3°–4°", reward: { it: "6 buste — placeholder", en: "6 boosters — placeholder" } }
        ]}
      ]
    },
    {
      id: "local-special-1", date: "2026-09-20", time: "15:00", endTime: "20:00",
      category: { it: "Evento speciale", en: "Special event" },
      title: { it: "Torneo Speciale della Tana", en: "The Den Special Tournament" },
      expansion: "Formato da definire", format: "Special", location: "Location da definire", seats: 24, status: "upcoming", image: "",
      description: {
        it: "Una struttura più libera per eventi tematici, collaborazioni, prerelease e formule personalizzate.",
        en: "A more flexible structure for themed events, collaborations, prereleases and custom formats."
      },
      prizeTiers: [
        { label: { it: "Griglia premi da definire", en: "Prize grid to be defined" }, prizes: [
          { placement: "1°", reward: { it: "Premio principale — placeholder", en: "Main prize — placeholder" } },
          { placement: "Top", reward: { it: "Premi aggiuntivi — placeholder", en: "Additional prizes — placeholder" } }
        ]}
      ]
    }
  ],

  standings: [
    {
      name: "Giocatore A", leader: "Leader placeholder", scores: [15, 10, 12, 8, 14, 6], wins: 18, attendance: 6, best: "1°", movement: 1,
      story: { it: "Ha aperto la stagione con aggressività e ha trasformato la continuità nel suo vantaggio più grande.", en: "He opened the season aggressively and turned consistency into his greatest advantage." }
    },
    {
      name: "Giocatore B", leader: "Leader placeholder", scores: [12, 15, 9, 13, 7, 10], wins: 17, attendance: 6, best: "1°", movement: 0,
      story: { it: "Sempre vicino alla vetta, è il giocatore che più di tutti costringe il leader a non abbassare mai il ritmo.", en: "Always near the top, he is the player who never lets the leader slow down." }
    },
    {
      name: "Giocatore C", leader: "Leader placeholder", scores: [10, 11, 15, 12, 8, 9], wins: 16, attendance: 6, best: "1°", movement: -1,
      story: { it: "Una vittoria di tappa e un’identità di gioco precisa lo mantengono stabilmente tra i favoriti.", en: "A stage win and a clear play identity keep him firmly among the favourites." }
    },
    {
      name: "Giocatore D", leader: "Leader placeholder", scores: [8, 12, 10, 15, 6, 11], wins: 15, attendance: 6, best: "1°", movement: 2,
      story: { it: "La rimonta più evidente della stagione: ha trovato il momento giusto per giocare la sua miglior tappa.", en: "The clearest comeback of the season: he found the right moment for his best stage." }
    },
    {
      name: "Giocatore E", leader: "Leader placeholder", scores: [9, 7, 13, 10, 12, 8], wins: 14, attendance: 6, best: "2°", movement: -1,
      story: { it: "Pochi picchi, nessun crollo: resta in corsa grazie a una solidità che pesa sul lungo periodo.", en: "Few peaks, no collapses: long-term consistency keeps him in the race." }
    },
    {
      name: "Giocatore F", leader: "Leader placeholder", scores: [6, 10, 8, 11, 9, 13], wins: 13, attendance: 6, best: "2°", movement: 3,
      story: { it: "Il percorso più graduale della League, costruito tappa dopo tappa fino a entrare nella conversazione Finale.", en: "The League’s most gradual journey, built stage by stage into Final contention." }
    }
  ]
};
