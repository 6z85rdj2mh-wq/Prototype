/* ======================================================
   LA TANA DI NIKA — DATI TORNEI V4.4.8
   Tutti i valori sono dimostrativi e centralizzati.
====================================================== */
window.NIKA_TOURNAMENTS_DATA = {
  settings: {
    timeZone: "Europe/Rome",
    reminderMinutes: 120,
    placeholderData: true,
    maxLeaguePlayers: 64,
    currentLeagueStage: 4,
    leagueQualificationCount: 8,
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
      location: "Location da definire", status: "completed", image: "",
      description: {
        it: "Il cambio di espansione può ridisegnare il meta e trasformare completamente gli equilibri della League.",
        en: "A new expansion may reshape the meta and completely change the League’s balance."
      }
    },
    {
      id: "league-stage-4", type: "stage", stage: 4, date: "2026-11-01", time: "15:00", endTime: "20:00",
      title: { it: "Nika League — Tappa 4", en: "Nika League — Stage 4" }, expansion: "OP-17", format: "Constructed",
      location: "Location da definire", status: "completed", image: "",
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

  leagueArticle: {
    id: "league-article-current",
    date: "2026-11-02",
    stage: 4,
    title: {
      it: "La classifica cambia volto dopo la quarta tappa",
      en: "The standings take a new shape after stage four"
    },
    excerpt: {
      it: "La quarta tappa ha consolidato la zona qualificazione e riaperto la corsa nelle posizioni centrali. L’analisi completa raccoglie risultati, scelte di mazzo e cambiamenti nella corsa alla Top 8.",
      en: "Stage four consolidated the qualification zone and reopened the race in the middle positions. The full analysis covers results, deck choices and changes in the race for the Top 8."
    },
    images: ["assets/images/hero-sea.png"],
    url: "../../index.html#editorial"
  },

  localEvents: [
    {
      id: "local-sunday-1", date: "2026-08-23", time: "15:00", endTime: "20:00",
      category: { it: "Domenicale", en: "Sunday tournament" },
      title: { it: "Torneo più recente", en: "Latest tournament" },
      expansion: "OP-17", format: "Formato corrente", location: "Location da definire", seats: 16, status: "open", image: "",
      registrationUrl: "",
      description: {
        it: "Un appuntamento competitivo e diretto, costruito sul formato corrente e aperto alla community della Tana.",
        en: "A direct competitive event built around the current format and open to the Den community."
      },
      prizeTiers: [
        { label: { it: "Griglia premi con 16 partecipanti", en: "Prize grid with 16 players" }, prizes: [
          { placement: "1°", reward: { it: "Box OP-16", en: "OP-16 box" }, imageLabel: { it: "Box OP-16", en: "OP-16 box" }, image: "" },
          { placement: "2°", reward: { it: "12 buste OP-16", en: "12 OP-16 boosters" }, imageLabel: { it: "12 buste", en: "12 boosters" }, image: "" },
          { placement: "3°–4°", reward: { it: "6 buste OP-16", en: "6 OP-16 boosters" }, imageLabel: { it: "6 buste", en: "6 boosters" }, image: "" }
        ]},
        { label: { it: "Griglia premi con 32 partecipanti", en: "Prize grid with 32 players" }, prizes: [
          { placement: "1°", reward: { it: "2 Box OP-16", en: "2 OP-16 boxes" }, imageLabel: { it: "2 Box OP-16", en: "2 OP-16 boxes" }, image: "" },
          { placement: "2°", reward: { it: "Box OP-16", en: "OP-16 box" }, imageLabel: { it: "Box OP-16", en: "OP-16 box" }, image: "" },
          { placement: "3°–4°", reward: { it: "12 buste OP-16", en: "12 OP-16 boosters" }, imageLabel: { it: "12 buste", en: "12 boosters" }, image: "" },
          { placement: "5°–8°", reward: { it: "6 buste OP-16", en: "6 OP-16 boosters" }, imageLabel: { it: "6 buste", en: "6 boosters" }, image: "" }
        ]}
      ]
    },
    {
      id: "local-special-prerelease", date: "2026-09-20", time: "15:00", endTime: "20:00",
      category: { it: "Speciale", en: "Special" },
      title: { it: "Prerelease della Tana", en: "The Den Prerelease" },
      expansion: "Set da definire", format: "Prerelease", location: "Location da definire", seats: 24, status: "open", image: "",
      registrationUrl: "",
      description: {
        it: "Un evento dedicato alla nuova espansione, con formula e premi pensati per il lancio del set.",
        en: "An event dedicated to the new expansion, with a format and prizes built around the set launch."
      },
      prizeTiers: [
        { label: { it: "Griglia premi con 24 partecipanti", en: "Prize grid with 24 players" }, prizes: [
          { placement: "1°", reward: { it: "Box prerelease", en: "Prerelease box" }, imageLabel: { it: "Box prerelease", en: "Prerelease box" }, image: "" },
          { placement: "Top 4", reward: { it: "Promo evento", en: "Event promo" }, imageLabel: { it: "Promo evento", en: "Event promo" }, image: "" },
          { placement: "Tutti", reward: { it: "Kit partecipazione", en: "Participation kit" }, imageLabel: { it: "Kit prerelease", en: "Prerelease kit" }, image: "" }
        ]}
      ]
    },
    {
      id: "local-special-extra-grand-battle", date: "2026-10-18", time: "15:00", endTime: "21:00",
      category: { it: "Speciale", en: "Special" },
      title: { it: "Extra Grand Battle", en: "Extra Grand Battle" },
      expansion: "Formato da definire", format: "Evento speciale", location: "Location da definire", seats: 32, status: "upcoming", image: "",
      registrationUrl: "",
      description: {
        it: "Un evento più grande, con struttura dedicata e una griglia premi distinta dai tornei ordinari.",
        en: "A larger event with a dedicated structure and a prize grid separate from standard tournaments."
      },
      prizeTiers: [
        { label: { it: "Griglia premi con 32 partecipanti", en: "Prize grid with 32 players" }, prizes: [
          { placement: "1°", reward: { it: "Box OP-16 + Trophy", en: "OP-16 box + Trophy" }, imageLabel: { it: "Box + Trophy", en: "Box + Trophy" }, image: "" },
          { placement: "2°", reward: { it: "Box OP-16", en: "OP-16 box" }, imageLabel: { it: "Box OP-16", en: "OP-16 box" }, image: "" },
          { placement: "Top 8", reward: { it: "Premio evento", en: "Event prize" }, imageLabel: { it: "Premio evento", en: "Event prize" }, image: "" }
        ]}
      ]
    },
    {
      id: "local-sunday-2", date: "2026-11-08", time: "15:00", endTime: "20:00",
      category: { it: "Domenicale", en: "Sunday tournament" },
      title: { it: "Domenicale della Tana", en: "The Den Sunday Tournament" },
      expansion: "Formato corrente", format: "Constructed", location: "Location da definire", seats: 16, status: "upcoming", image: "",
      registrationUrl: "",
      description: {
        it: "Il ritorno al formato standard per un nuovo appuntamento competitivo della community.",
        en: "A return to the standard format for another competitive community event."
      },
      prizeTiers: [
        { label: { it: "Griglia premi con 16 partecipanti", en: "Prize grid with 16 players" }, prizes: [
          { placement: "1°", reward: { it: "Box OP-16", en: "OP-16 box" }, imageLabel: { it: "Box OP-16", en: "OP-16 box" }, image: "" },
          { placement: "2°", reward: { it: "12 buste OP-16", en: "12 OP-16 boosters" }, imageLabel: { it: "12 buste", en: "12 boosters" }, image: "" },
          { placement: "Top 4", reward: { it: "6 buste OP-16", en: "6 OP-16 boosters" }, imageLabel: { it: "6 buste", en: "6 boosters" }, image: "" }
        ]}
      ]
    }
  ],

  standings: [
    {
      name: "Giocatore A", leader: "U/G Luffy", scores: [15, 10, 12, 14, null, null], decks: ["U/G Luffy", "", "Mihawk", "Nami", "", ""], wins: 18,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore B", leader: "Nami", scores: [12, 15, 10, 13, null, null], decks: ["Boa Hancock", "Nami", "", "Smoker", "", ""], wins: 17,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore C", leader: "Zoro & Sanji", scores: [10, 11, 15, 12, null, null], decks: ["", "", "Mihawk", "Zoro & Sanji", "", ""], wins: 16,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore D", leader: "Mihawk", scores: [8, 12, 11, 15, null, null], decks: ["", "Zoro", "", "Mihawk", "", ""], wins: 15,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore E", leader: "Boa Hancock", scores: [9, 10, 13, 12, null, null], decks: ["", "", "Koby", "Boa Hancock", "", ""], wins: 14,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore F", leader: "Koby", scores: [10, 8, 11, 13, null, null], decks: ["", "", "", "Koby", "", ""], wins: 13,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore G", leader: "Enel", scores: [11, 9, 10, 10, null, null], decks: ["", "", "", "", "", ""], wins: 12,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore H", leader: "Smoker", scores: [7, 11, 9, 12, null, null], decks: ["", "", "", "Smoker", "", ""], wins: 12,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore I", leader: "Perona", scores: [10, 9, 11, 8, null, null], decks: ["", "", "", "", "", ""], wins: 11,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore L", leader: "Shanks", scores: [12, 10, null, 12, null, null], decks: ["Shanks", "", "", "Shanks", "", ""], wins: 10,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore M", leader: "Bonney", scores: [8, 7, 9, 8, null, null], decks: ["", "", "", "", "", ""], wins: 9,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore N", leader: "Teach", scores: [9, null, 10, 10, null, null], decks: ["", "", "", "", "", ""], wins: 9,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore O", leader: "Oden", scores: [7, 8, 6, 9, null, null], decks: ["", "", "", "", "", ""], wins: 8,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore P", leader: "Law", scores: [10, 6, 8, 7, null, null], decks: ["", "", "", "", "", ""], wins: 8,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore Q", leader: "Doflamingo", scores: [5, 9, 7, 8, null, null], decks: ["", "", "", "", "", ""], wins: 7,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore R", leader: "Carrot", scores: [8, 5, 7, 6, null, null], decks: ["", "", "", "", "", ""], wins: 7,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore S", leader: "Koala", scores: [6, 8, 5, 7, null, null], decks: ["", "", "", "", "", ""], wins: 6,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore T", leader: "Sanji", scores: [4, 7, 8, 5, null, null], decks: ["", "", "", "", "", ""], wins: 6,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore U", leader: "Luffy", scores: [7, 6, 4, 5, null, null], decks: ["", "", "", "", "", ""], wins: 5,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore V", leader: "Katakuri", scores: [5, 4, 6, 4, null, null], decks: ["", "", "", "", "", ""], wins: 5,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore W", leader: "Marco", scores: [4, 6, 5, 3, null, null], decks: ["", "", "", "", "", ""], wins: 4,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore X", leader: "Lucci", scores: [3, 5, 4, 5, null, null], decks: ["", "", "", "", "", ""], wins: 4,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore Y", leader: "Vegapunk", scores: [4, 3, 5, 3, null, null], decks: ["", "", "", "", "", ""], wins: 3,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    },
    {
      name: "Giocatore Z", leader: "Reiju", scores: [2, 4, 3, 4, null, null], decks: ["", "", "", "", "", ""], wins: 3,
      story: { it: "Dati dimostrativi del giocatore. Saranno gestiti dalla futura area admin.", en: "Placeholder player data. It will be managed from the future admin area." }
    }
  ]
};
