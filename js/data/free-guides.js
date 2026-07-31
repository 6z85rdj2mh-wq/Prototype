/* ======================================================
   LA TANA DI NIKA — GUIDE GRATUITE CMS-READY V4.4.16
   Archivio pubblico + contratto dati riutilizzabile dalla futura admin.
   Le pagine pubbliche mostrano soltanto le guide pubblicate.
====================================================== */
(() => {
  const sourceGuides = [
  {
    "id": "mihawk",
    "slug": "mihawk",
    "leader": "Mihawk",
    "title": {
      "it": "Mihawk — mini guida al mazzo",
      "en": "Mihawk — deck mini guide"
    },
    "excerpt": {
      "it": "Struttura della lista, piano di gioco e carte fondamentali per iniziare a comprendere il Leader.",
      "en": "Deck structure, game plan and essential cards to start understanding the Leader."
    },
    "tags": {
      "it": [
        "Piano di gioco",
        "Carte chiave",
        "Sequencing"
      ],
      "en": [
        "Game plan",
        "Key cards",
        "Sequencing"
      ]
    },
    "categories": [
      "featured",
      "competitive"
    ],
    "format": {
      "it": "Formato attuale",
      "en": "Current format"
    },
    "updatedAt": "2026-07-27",
    "readingTime": 8,
    "image": "",
    "imageAlt": {
      "it": "Copertina della mini guida di Mihawk",
      "en": "Mihawk mini-guide cover"
    },
    "accentA": "#7b5cff",
    "accentB": "#1b263e",
    "url": "guida/?id=mihawk",
    "detail": {
      "subtitle": {
        "it": "Un dossier introduttivo su curva, sviluppo e gestione della board.",
        "en": "An introductory dossier on curve, development and board management."
      },
      "style": {
        "it": "Midrange · Control",
        "en": "Midrange · Control"
      },
      "coverImage": "",
      "modules": [
        {
          "id": "why",
          "type": "why",
          "enabled": true,
          "order": 10,
          "title": {
            "it": "Perché abbiamo scelto questo mazzo",
            "en": "Why we chose this deck"
          },
          "eyebrow": {
            "it": "SCELTA EDITORIALE",
            "en": "EDITORIAL CHOICE"
          },
          "required": true,
          "quote": {
            "it": "Mihawk è un ottimo punto di incontro tra solidità, costruzione della board e decisioni tecniche accessibili.",
            "en": "Mihawk is a strong meeting point between solidity, board development and approachable technical decisions."
          },
          "body": {
            "it": "Lo abbiamo scelto perché mostra bene come una curva coerente possa trasformarsi in pressione senza rinunciare alla qualità delle risorse.",
            "en": "We chose it because it clearly shows how a coherent curve can become pressure without sacrificing resource quality."
          }
        },
        {
          "id": "identity",
          "type": "identity",
          "enabled": true,
          "order": 20,
          "title": {
            "it": "Come vuole giocare",
            "en": "How it wants to play"
          },
          "eyebrow": {
            "it": "IDENTITÀ TECNICA",
            "en": "TECHNICAL IDENTITY"
          },
          "body": {
            "it": "Il mazzo costruisce una board progressiva, protegge le proprie risorse e cerca di trasformare ogni turno in un vantaggio difficile da recuperare.",
            "en": "The deck develops a progressive board, protects its resources and aims to turn each turn into an advantage that is hard to recover from."
          },
          "metrics": [
            {
              "label": {
                "it": "Difficoltà",
                "en": "Difficulty"
              },
              "value": {
                "it": "Media",
                "en": "Medium"
              },
              "score": 58
            },
            {
              "label": {
                "it": "Pressione",
                "en": "Pressure"
              },
              "value": {
                "it": "Medio-alta",
                "en": "Medium-high"
              },
              "score": 72
            },
            {
              "label": {
                "it": "Controllo",
                "en": "Control"
              },
              "value": {
                "it": "Alto",
                "en": "High"
              },
              "score": 82
            },
            {
              "label": {
                "it": "Consistenza",
                "en": "Consistency"
              },
              "value": {
                "it": "Alta",
                "en": "High"
              },
              "score": 78
            }
          ]
        },
        {
          "id": "game-plan",
          "type": "gamePlan",
          "enabled": true,
          "order": 25,
          "eyebrow": {
            "it": "PIANO PARTITA",
            "en": "GAME PLAN"
          },
          "title": {
            "it": "Tre fasi, un’unica progressione",
            "en": "Three phases, one progression"
          },
          "body": {
            "it": "Il mazzo vuole trasformare una curva ordinata in una board sempre più difficile da contestare.",
            "en": "The deck wants to turn an orderly curve into a board that becomes increasingly difficult to contest."
          },
          "items": [
            {
              "label": {
                "it": "Apertura",
                "en": "Opening"
              },
              "title": {
                "it": "Preparare la mano",
                "en": "Prepare the hand"
              },
              "body": {
                "it": "Cerca consistenza e preserva le risorse che rendono fluido il turno successivo.",
                "en": "Look for consistency and preserve the resources that make the next turn flow."
              }
            },
            {
              "label": {
                "it": "Sviluppo",
                "en": "Development"
              },
              "title": {
                "it": "Costruire la board",
                "en": "Build the board"
              },
              "body": {
                "it": "Metti in campo corpi che producono valore senza rinunciare alla pressione.",
                "en": "Develop bodies that generate value without giving up pressure."
              }
            },
            {
              "label": {
                "it": "Chiusura",
                "en": "Closing"
              },
              "title": {
                "it": "Convertire il vantaggio",
                "en": "Convert the advantage"
              },
              "body": {
                "it": "Usa i finisher quando la board avversaria non può più recuperare il tempo perso.",
                "en": "Use finishers when the opposing board can no longer recover the lost tempo."
              }
            }
          ]
        },
        {
          "id": "key-cards",
          "type": "keyCards",
          "enabled": true,
          "order": 30,
          "title": {
            "it": "Il nucleo del mazzo",
            "en": "The deck core"
          },
          "eyebrow": {
            "it": "CARTE CHIAVE",
            "en": "KEY CARDS"
          },
          "required": true,
          "body": {
            "it": "Le carte che definiscono la progressione principale della lista.",
            "en": "The cards that define the deck's main progression."
          },
          "items": [
            {
              "name": "Mihawk 6c",
              "code": "ST32-004",
              "comment": {
                "it": "Il motore centrale della curva: sviluppa pressione e crea valore senza rinunciare al controllo della board.",
                "en": "The centre of the curve: it develops pressure and value without giving up board control."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Mihawk 6c",
                "en": "Mihawk 6c card"
              },
              "accentA": "#637dca",
              "accentB": "#202844"
            },
            {
              "name": "Perona",
              "code": "OP06-093",
              "comment": {
                "it": "Prepara le risorse e aumenta la consistenza delle sequenze iniziali.",
                "en": "It prepares resources and improves the consistency of early sequences."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Perona",
                "en": "Perona card"
              },
              "accentA": "#9c65b4",
              "accentB": "#392243"
            },
            {
              "name": "Mihawk 9c",
              "code": "OP01-070",
              "comment": {
                "it": "Consolida il vantaggio e trasforma la board in una condizione di vittoria.",
                "en": "It consolidates the lead and turns the board into a win condition."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Mihawk 9c",
                "en": "Mihawk 9c card"
              },
              "accentA": "#4e6e94",
              "accentB": "#182535"
            }
          ]
        },
        {
          "id": "decklist",
          "type": "decklist",
          "enabled": true,
          "order": 40,
          "title": {
            "it": "La lista da cui partire",
            "en": "A list to start from"
          },
          "eyebrow": {
            "it": "DECKLIST DI RIFERIMENTO",
            "en": "REFERENCE DECKLIST"
          },
          "required": true,
          "body": {
            "it": "La lista rappresenta la configurazione utilizzata per questa mini guida. Gli slot possono cambiare in base al formato e al meta locale.",
            "en": "The list represents the configuration used for this mini guide. Slots may change with the format and local meta."
          },
          "image": "assets/images/guides/decklists/mihawk-sample.svg",
          "imageAlt": {
            "it": "Decklist di riferimento con carte sample",
            "en": "Reference decklist with sample cards"
          },
          "text": "4xST32-004\n4xOP06-093\n4xOP01-070\n4xOP16-017\n4xOP16-021\n4xOP15-064\n4xOP14-083\n4xOP13-118\n4xOP12-044\n4xOP11-051\n2xOP10-073\n2xOP09-081\n2xST32-008\n2xOP08-091",
          "downloadName": "mihawk-sample-optcg-sim.txt"
        },
        {
          "id": "insight-single",
          "type": "interactiveCards",
          "enabled": true,
          "order": 50,
          "title": {
            "it": "Mihawk 6c",
            "en": "Mihawk 6c"
          },
          "eyebrow": {
            "it": "APPROFONDIMENTO INTERATTIVO",
            "en": "INTERACTIVE DEEP DIVE"
          },
          "body": {
            "it": "Il punto in cui setup e pressione si incontrano. Gira la carta per visualizzare la sintesi del suo ruolo.",
            "en": "The point where setup and pressure meet. Flip the card to see a summary of its role."
          },
          "items": [
            {
              "name": "Mihawk 6c",
              "code": "ST32-004",
              "comment": {
                "it": "Il motore centrale della curva: sviluppa pressione e crea valore senza rinunciare al controllo della board.",
                "en": "The centre of the curve: it develops pressure and value without giving up board control."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Mihawk 6c",
                "en": "Mihawk 6c card"
              },
              "accentA": "#637dca",
              "accentB": "#202844"
            }
          ]
        },
        {
          "id": "strengths",
          "type": "strengthsWeaknesses",
          "enabled": true,
          "order": 60,
          "title": {
            "it": "Dove brilla, dove soffre",
            "en": "Where it shines, where it struggles"
          },
          "eyebrow": {
            "it": "PUNTI DI FORZA E DEBOLEZZE",
            "en": "STRENGTHS AND WEAKNESSES"
          },
          "strengths": {
            "it": [
              "Curva solida e sviluppo naturale della board.",
              "Buona conversione del valore in pressione.",
              "Strumenti flessibili in più fasi."
            ],
            "en": [
              "Solid curve and natural board development.",
              "Good conversion of value into pressure.",
              "Flexible tools across several phases."
            ]
          },
          "weaknesses": {
            "it": [
              "Alcune partenze dipendono dal corretto setup.",
              "Il sequencing può essere punitivo.",
              "I matchup rapidi richiedono precisione."
            ],
            "en": [
              "Some openings depend on correct setup.",
              "Sequencing mistakes can be punishing.",
              "Fast matchups require precision."
            ]
          }
        },
        {
          "id": "curve",
          "type": "curve",
          "enabled": true,
          "order": 70,
          "title": {
            "it": "Come distribuiamo i costi",
            "en": "How the costs are distributed"
          },
          "eyebrow": {
            "it": "CURVA DEL MAZZO",
            "en": "DECK CURVE"
          },
          "body": {
            "it": "La curva concentra il proprio valore nei costi intermedi mantenendo abbastanza strumenti iniziali per preparare i turni decisivi.",
            "en": "The curve concentrates value in the mid costs while keeping enough early tools to prepare decisive turns."
          },
          "points": [
            {
              "cost": "1",
              "count": 4
            },
            {
              "cost": "2",
              "count": 8
            },
            {
              "cost": "3",
              "count": 12
            },
            {
              "cost": "4",
              "count": 9
            },
            {
              "cost": "5",
              "count": 6
            },
            {
              "cost": "6",
              "count": 5
            },
            {
              "cost": "7+",
              "count": 3
            }
          ]
        },
        {
          "id": "matchups",
          "type": "matchups",
          "enabled": true,
          "order": 80,
          "title": {
            "it": "Prime indicazioni",
            "en": "First indications"
          },
          "eyebrow": {
            "it": "MATCHUP OVERVIEW",
            "en": "MATCHUP OVERVIEW"
          },
          "body": {
            "it": "Una panoramica introduttiva: le analisi complete restano nelle Guide premium.",
            "en": "An introductory overview: full analyses remain part of Premium Guides."
          },
          "items": [
            {
              "opponent": "Nami",
              "status": "bad",
              "label": {
                "it": "Difficile",
                "en": "Difficult"
              },
              "note": {
                "it": "Serve accelerare il clock senza compromettere la mano.",
                "en": "You need to speed up the clock without compromising the hand."
              }
            },
            {
              "opponent": "Teach",
              "status": "even",
              "label": {
                "it": "Equilibrato",
                "en": "Even"
              },
              "note": {
                "it": "La gestione della board decide la partita.",
                "en": "Board management decides the game."
              }
            },
            {
              "opponent": "Zoro & Sanji",
              "status": "good",
              "label": {
                "it": "Favorevole",
                "en": "Favourable"
              },
              "note": {
                "it": "La qualità della curva aiuta a stabilizzare.",
                "en": "Curve quality helps stabilise."
              }
            }
          ]
        }
      ]
    },
    "status": "published",
    "createdAt": "2026-07-27",
    "publishedAt": "2026-07-27",
    "deletedAt": null,
    "revision": 1,
    "author": {
      "it": "La Tana di Nika",
      "en": "La Tana di Nika"
    },
    "seo": {
      "title": {
        "it": "Mihawk — mini guida al mazzo",
        "en": "Mihawk — deck mini guide"
      },
      "description": {
        "it": "Struttura della lista, piano di gioco e carte fondamentali per iniziare a comprendere il Leader.",
        "en": "Deck structure, game plan and essential cards to start understanding the Leader."
      },
      "image": ""
    }
  },
  {
    "id": "koala",
    "slug": "koala",
    "leader": "Koala",
    "title": {
      "it": "Koala — difesa e gestione delle risorse",
      "en": "Koala — defence and resource management"
    },
    "excerpt": {
      "it": "Una panoramica sul funzionamento del mazzo e sulle decisioni che ne definiscono il ritmo.",
      "en": "An overview of how the deck works and the decisions that shape its pace."
    },
    "tags": {
      "it": [
        "Off-meta",
        "Difesa",
        "Late game"
      ],
      "en": [
        "Off-meta",
        "Defence",
        "Late game"
      ]
    },
    "categories": [
      "featured",
      "off-meta"
    ],
    "format": {
      "it": "Formato attuale",
      "en": "Current format"
    },
    "updatedAt": "2026-07-24",
    "readingTime": 7,
    "image": "",
    "imageAlt": {
      "it": "Copertina della mini guida di Koala",
      "en": "Koala mini-guide cover"
    },
    "accentA": "#d35e75",
    "accentB": "#352039",
    "url": "guida/?id=koala",
    "detail": {
      "subtitle": {
        "it": "Una costruzione difensiva capace di trasformare il setup in turni ad alto impatto.",
        "en": "A defensive build that turns setup into high-impact turns."
      },
      "style": {
        "it": "Defensive · High-roll",
        "en": "Defensive · High-roll"
      },
      "coverImage": "",
      "modules": [
        {
          "id": "why",
          "type": "why",
          "enabled": true,
          "order": 10,
          "title": {
            "it": "Perché abbiamo scelto questo mazzo",
            "en": "Why we chose this deck"
          },
          "eyebrow": {
            "it": "SCELTA EDITORIALE",
            "en": "EDITORIAL CHOICE"
          },
          "required": true,
          "quote": {
            "it": "Koala premia chi ama preparare il turno giusto e rendere ogni attacco avversario più costoso.",
            "en": "Koala rewards players who enjoy preparing the right turn and making every opposing attack more expensive."
          },
          "body": {
            "it": "È una scelta off-meta con una vera identità: quando i pezzi entrano nella sequenza corretta, il mazzo produce turni difficili da replicare.",
            "en": "It is an off-meta choice with a real identity: when the pieces line up, the deck produces turns that are hard to replicate."
          }
        },
        {
          "id": "resource-flow",
          "type": "resourceFlow",
          "enabled": true,
          "order": 20,
          "eyebrow": {
            "it": "FLUSSO DELLE RISORSE",
            "en": "RESOURCE FLOW"
          },
          "title": {
            "it": "Come il mazzo costruisce il turno decisivo",
            "en": "How the deck builds its decisive turn"
          },
          "body": {
            "it": "Koala non cerca valore immediato: accumula piccoli vantaggi che convergono nello stesso turno.",
            "en": "Koala does not seek immediate value: it accumulates small advantages that converge in one turn."
          },
          "items": [
            {
              "title": {
                "it": "Filtra",
                "en": "Filter"
              },
              "body": {
                "it": "Migliora la qualità della mano e trova i pezzi necessari.",
                "en": "Improve hand quality and find the required pieces."
              }
            },
            {
              "title": {
                "it": "Proteggi",
                "en": "Protect"
              },
              "body": {
                "it": "Usa la difesa per conservare vite e risorse chiave.",
                "en": "Use defence to preserve life and key resources."
              }
            },
            {
              "title": {
                "it": "Accumula",
                "en": "Accumulate"
              },
              "body": {
                "it": "Mantieni abbastanza carte per sostenere una sequenza completa.",
                "en": "Keep enough cards to support a complete sequence."
              }
            },
            {
              "title": {
                "it": "Esplodi",
                "en": "Explode"
              },
              "body": {
                "it": "Concentra sviluppo, pressione e protezione nello stesso turno.",
                "en": "Combine development, pressure and protection in one turn."
              }
            }
          ]
        },
        {
          "id": "key-cards",
          "type": "keyCards",
          "enabled": true,
          "order": 30,
          "title": {
            "it": "Il nucleo del mazzo",
            "en": "The deck core"
          },
          "eyebrow": {
            "it": "CARTE CHIAVE",
            "en": "KEY CARDS"
          },
          "required": true,
          "body": {
            "it": "Le carte che definiscono la progressione principale della lista.",
            "en": "The cards that define the deck's main progression."
          },
          "items": [
            {
              "name": "Nico Robin",
              "code": "OP16-017",
              "comment": {
                "it": "Mantiene vivo il motore e prepara la mano per le sequenze difensive.",
                "en": "Keeps the engine moving and prepares the hand for defensive sequences."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Nico Robin",
                "en": "Nico Robin card"
              },
              "accentA": "#d06a7d",
              "accentB": "#3b2032"
            },
            {
              "name": "Nightmare Luffy",
              "code": "OP16-021",
              "comment": {
                "it": "Crea uno swing importante quando il setup è completo.",
                "en": "Creates a major swing once the setup is complete."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Nightmare Luffy",
                "en": "Nightmare Luffy card"
              },
              "accentA": "#8c5eb6",
              "accentB": "#342142"
            },
            {
              "name": "Luffy 10c",
              "code": "OP16-036",
              "comment": {
                "it": "La ricompensa della curva: pressione e protezione nello stesso turno.",
                "en": "The curve payoff: pressure and protection in the same turn."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Luffy 10c",
                "en": "Luffy 10c card"
              },
              "accentA": "#596ca8",
              "accentB": "#20273d"
            }
          ]
        },
        {
          "id": "decklist",
          "type": "decklist",
          "enabled": true,
          "order": 40,
          "title": {
            "it": "La lista da cui partire",
            "en": "A list to start from"
          },
          "eyebrow": {
            "it": "DECKLIST DI RIFERIMENTO",
            "en": "REFERENCE DECKLIST"
          },
          "required": true,
          "body": {
            "it": "Una lista dimostrativa orientata alla difesa e alle sequenze ad alto valore.",
            "en": "A sample list focused on defence and high-value sequences."
          },
          "image": "assets/images/guides/decklists/koala-sample.svg",
          "imageAlt": {
            "it": "Decklist di riferimento con carte sample",
            "en": "Reference decklist with sample cards"
          },
          "text": "4xOP16-017\n4xOP16-021\n4xOP16-036\n4xOP15-071\n4xOP14-083\n4xOP13-118\n4xOP12-044\n4xOP11-051\n4xOP10-073\n4xOP09-081\n2xOP08-091\n2xOP07-093\n2xST13-014\n2xOP06-086",
          "downloadName": "koala-sample-optcg-sim.txt"
        },
        {
          "id": "insight-sequence",
          "type": "interactiveCards",
          "enabled": true,
          "order": 50,
          "title": {
            "it": "Dal setup al turno esplosivo",
            "en": "From setup to the explosive turn"
          },
          "eyebrow": {
            "it": "APPROFONDIMENTO INTERATTIVO",
            "en": "INTERACTIVE DEEP DIVE"
          },
          "body": {
            "it": "Le tre carte mostrano la progressione ideale del mazzo.",
            "en": "The three cards show the deck's ideal progression."
          },
          "items": [
            {
              "name": "Nico Robin",
              "code": "OP16-017",
              "comment": {
                "it": "Mantiene vivo il motore e prepara la mano per le sequenze difensive.",
                "en": "Keeps the engine moving and prepares the hand for defensive sequences."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Nico Robin",
                "en": "Nico Robin card"
              },
              "accentA": "#d06a7d",
              "accentB": "#3b2032"
            },
            {
              "name": "Nightmare Luffy",
              "code": "OP16-021",
              "comment": {
                "it": "Crea uno swing importante quando il setup è completo.",
                "en": "Creates a major swing once the setup is complete."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Nightmare Luffy",
                "en": "Nightmare Luffy card"
              },
              "accentA": "#8c5eb6",
              "accentB": "#342142"
            },
            {
              "name": "Luffy 10c",
              "code": "OP16-036",
              "comment": {
                "it": "La ricompensa della curva: pressione e protezione nello stesso turno.",
                "en": "The curve payoff: pressure and protection in the same turn."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Luffy 10c",
                "en": "Luffy 10c card"
              },
              "accentA": "#596ca8",
              "accentB": "#20273d"
            }
          ]
        },
        {
          "id": "strengths",
          "type": "strengthsWeaknesses",
          "enabled": true,
          "order": 60,
          "title": {
            "it": "Dove brilla, dove soffre",
            "en": "Where it shines, where it struggles"
          },
          "eyebrow": {
            "it": "PUNTI DI FORZA E DEBOLEZZE",
            "en": "STRENGTHS AND WEAKNESSES"
          },
          "strengths": {
            "it": [
              "Difesa molto elevata.",
              "Turni finali ad alto impatto.",
              "Piano partita originale e riconoscibile."
            ],
            "en": [
              "Very high defence.",
              "High-impact late turns.",
              "Original and recognisable game plan."
            ]
          },
          "weaknesses": {
            "it": [
              "Dipendenza dal corretto ordine dei pezzi.",
              "Partenze lente contro i mazzi aggressivi.",
              "Richiede esperienza nella gestione delle vite."
            ],
            "en": [
              "Depends on drawing pieces in the right order.",
              "Slow openings into aggressive decks.",
              "Requires experience managing life cards."
            ]
          }
        },
        {
          "id": "matchups",
          "type": "matchups",
          "enabled": true,
          "order": 70,
          "title": {
            "it": "Prime indicazioni",
            "en": "First indications"
          },
          "eyebrow": {
            "it": "MATCHUP OVERVIEW",
            "en": "MATCHUP OVERVIEW"
          },
          "body": {
            "it": "Una panoramica introduttiva: le analisi complete restano nelle Guide premium.",
            "en": "An introductory overview: full analyses remain part of Premium Guides."
          },
          "items": [
            {
              "opponent": "Aggro",
              "status": "bad",
              "label": {
                "it": "Difficile",
                "en": "Difficult"
              },
              "note": {
                "it": "Il setup deve essere molto efficiente.",
                "en": "Setup must be extremely efficient."
              }
            },
            {
              "opponent": "Midrange",
              "status": "even",
              "label": {
                "it": "Equilibrato",
                "en": "Even"
              },
              "note": {
                "it": "Conta la qualità del turno di svolta.",
                "en": "The quality of the swing turn matters."
              }
            },
            {
              "opponent": "Control",
              "status": "good",
              "label": {
                "it": "Interessante",
                "en": "Promising"
              },
              "note": {
                "it": "La profondità delle risorse può fare la differenza.",
                "en": "Resource depth can make the difference."
              }
            }
          ]
        }
      ]
    },
    "status": "published",
    "createdAt": "2026-07-24",
    "publishedAt": "2026-07-24",
    "deletedAt": null,
    "revision": 1,
    "author": {
      "it": "La Tana di Nika",
      "en": "La Tana di Nika"
    },
    "seo": {
      "title": {
        "it": "Koala — difesa e gestione delle risorse",
        "en": "Koala — defence and resource management"
      },
      "description": {
        "it": "Una panoramica sul funzionamento del mazzo e sulle decisioni che ne definiscono il ritmo.",
        "en": "An overview of how the deck works and the decisions that shape its pace."
      },
      "image": ""
    }
  },
  {
    "id": "boa-hancock",
    "slug": "boa-hancock",
    "leader": "Boa Hancock",
    "title": {
      "it": "Boa Hancock — controllo e trigger",
      "en": "Boa Hancock — control and triggers"
    },
    "excerpt": {
      "it": "Concetti principali, gestione delle vite e punti di forza da conoscere prima di portarla al tavolo.",
      "en": "Core concepts, life management and strengths to understand before taking the deck to the table."
    },
    "tags": {
      "it": [
        "Controllo",
        "Trigger",
        "Risorse"
      ],
      "en": [
        "Control",
        "Triggers",
        "Resources"
      ]
    },
    "categories": [
      "competitive"
    ],
    "format": {
      "it": "Formato attuale",
      "en": "Current format"
    },
    "updatedAt": "2026-07-20",
    "readingTime": 9,
    "image": "",
    "imageAlt": {
      "it": "Copertina della mini guida di Boa Hancock",
      "en": "Boa Hancock mini-guide cover"
    },
    "accentA": "#4d91d9",
    "accentB": "#202742",
    "url": "guida/?id=boa-hancock",
    "detail": {
      "subtitle": {
        "it": "Controllo della board, vite di valore e pressione costruita nel tempo.",
        "en": "Board control, valuable life cards and pressure built over time."
      },
      "style": {
        "it": "Control · Value",
        "en": "Control · Value"
      },
      "coverImage": "",
      "modules": [
        {
          "id": "why",
          "type": "why",
          "enabled": true,
          "order": 10,
          "title": {
            "it": "Perché abbiamo scelto questo mazzo",
            "en": "Why we chose this deck"
          },
          "eyebrow": {
            "it": "SCELTA EDITORIALE",
            "en": "EDITORIAL CHOICE"
          },
          "required": true,
          "quote": {
            "it": "Boa combina una struttura controllante con una delle aree più imprevedibili del gioco: il valore dei trigger.",
            "en": "Boa combines a controlling structure with one of the game's most unpredictable areas: trigger value."
          },
          "body": {
            "it": "L’abbiamo scelta perché obbliga a ragionare contemporaneamente su board, vite e qualità delle risorse.",
            "en": "We chose it because it forces you to think about board, life and resource quality at the same time."
          }
        },
        {
          "id": "identity",
          "type": "identity",
          "enabled": true,
          "order": 20,
          "title": {
            "it": "Come vuole giocare",
            "en": "How it wants to play"
          },
          "eyebrow": {
            "it": "IDENTITÀ TECNICA",
            "en": "TECHNICAL IDENTITY"
          },
          "body": {
            "it": "Il mazzo limita lo sviluppo avversario, protegge le proprie vite e costruisce gradualmente una board capace di chiudere la partita.",
            "en": "The deck limits opposing development, protects its life cards and gradually builds a board capable of closing the game."
          },
          "metrics": [
            {
              "label": {
                "it": "Difficoltà",
                "en": "Difficulty"
              },
              "value": {
                "it": "Media",
                "en": "Medium"
              },
              "score": 64
            },
            {
              "label": {
                "it": "Controllo",
                "en": "Control"
              },
              "value": {
                "it": "Alto",
                "en": "High"
              },
              "score": 84
            },
            {
              "label": {
                "it": "Trigger",
                "en": "Triggers"
              },
              "value": {
                "it": "Molto rilevanti",
                "en": "Very relevant"
              },
              "score": 88
            },
            {
              "label": {
                "it": "Flessibilità",
                "en": "Flexibility"
              },
              "value": {
                "it": "Alta",
                "en": "High"
              },
              "score": 77
            }
          ]
        },
        {
          "id": "key-cards",
          "type": "keyCards",
          "enabled": true,
          "order": 30,
          "title": {
            "it": "Il nucleo del mazzo",
            "en": "The deck core"
          },
          "eyebrow": {
            "it": "CARTE CHIAVE",
            "en": "KEY CARDS"
          },
          "required": true,
          "body": {
            "it": "Le carte che definiscono la progressione principale della lista.",
            "en": "The cards that define the deck's main progression."
          },
          "items": [
            {
              "name": "Boa Hancock 7c",
              "code": "OP13-118",
              "comment": {
                "it": "Un corpo solido che converte il controllo delle vite in tempo e pressione.",
                "en": "A solid body that converts life control into time and pressure."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Boa Hancock 7c",
                "en": "Boa Hancock 7c card"
              },
              "accentA": "#4d91d9",
              "accentB": "#202742"
            },
            {
              "name": "Moria",
              "code": "OP06-086",
              "comment": {
                "it": "Ricostruisce la board e rende più difficili da esaurire le risorse del mazzo.",
                "en": "Rebuilds the board and makes the deck's resources harder to exhaust."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Moria",
                "en": "Moria card"
              },
              "accentA": "#8b5bac",
              "accentB": "#30213e"
            },
            {
              "name": "Trigger Engine",
              "code": "OP13-121",
              "comment": {
                "it": "Aumenta il valore delle vite e modifica il modo in cui l’avversario può attaccare.",
                "en": "Raises the value of life cards and changes how the opponent can attack."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Trigger Engine",
                "en": "Trigger Engine card"
              },
              "accentA": "#506f9a",
              "accentB": "#192638"
            }
          ]
        },
        {
          "id": "decklist",
          "type": "decklist",
          "enabled": true,
          "order": 40,
          "title": {
            "it": "La lista da cui partire",
            "en": "A list to start from"
          },
          "eyebrow": {
            "it": "DECKLIST DI RIFERIMENTO",
            "en": "REFERENCE DECKLIST"
          },
          "required": true,
          "body": {
            "it": "La configurazione di esempio mette in evidenza controllo, recursion e densità di trigger.",
            "en": "The sample configuration highlights control, recursion and trigger density."
          },
          "image": "assets/images/guides/decklists/boa-hancock-sample.svg",
          "imageAlt": {
            "it": "Decklist di riferimento con carte sample",
            "en": "Reference decklist with sample cards"
          },
          "text": "4xOP13-118\n4xOP13-121\n4xOP06-086\n4xOP15-064\n4xOP14-083\n4xOP12-044\n4xOP11-051\n4xOP10-073\n4xOP09-081\n4xOP08-091\n2xOP07-093\n2xOP05-055\n2xST17-003\n2xOP04-056",
          "downloadName": "boa-hancock-sample-optcg-sim.txt"
        },
        {
          "id": "flex-slots",
          "type": "cardChoices",
          "enabled": true,
          "order": 50,
          "eyebrow": {
            "it": "SLOT FLESSIBILI",
            "en": "FLEX SLOTS"
          },
          "title": {
            "it": "Tre modi di adattare la lista",
            "en": "Three ways to adapt the list"
          },
          "body": {
            "it": "Questi slot possono cambiare in base al meta e al tipo di pressione che vuoi assorbire.",
            "en": "These slots can change according to the meta and the kind of pressure you want to absorb."
          },
          "items": [
            {
              "name": "Boa Hancock 7c",
              "code": "OP13-118",
              "comment": {
                "it": "Un corpo solido che converte il controllo delle vite in tempo e pressione.",
                "en": "A solid body that converts life control into time and pressure."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Boa Hancock 7c",
                "en": "Boa Hancock 7c card"
              },
              "accentA": "#4d91d9",
              "accentB": "#202742",
              "badge": {
                "it": "Più pressione",
                "en": "More pressure"
              },
              "choiceNote": {
                "it": "Aumenta il numero di minacce che richiedono una risposta immediata.",
                "en": "Increase the number of threats that demand an immediate answer."
              }
            },
            {
              "name": "Moria",
              "code": "OP06-086",
              "comment": {
                "it": "Ricostruisce la board e rende più difficili da esaurire le risorse del mazzo.",
                "en": "Rebuilds the board and makes the deck's resources harder to exhaust."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Moria",
                "en": "Moria card"
              },
              "accentA": "#8b5bac",
              "accentB": "#30213e",
              "badge": {
                "it": "Più valore",
                "en": "More value"
              },
              "choiceNote": {
                "it": "Rende la lista più profonda nelle partite lunghe.",
                "en": "Give the list more depth in long games."
              }
            },
            {
              "name": "Trigger Engine",
              "code": "OP13-121",
              "comment": {
                "it": "Aumenta il valore delle vite e modifica il modo in cui l’avversario può attaccare.",
                "en": "Raises the value of life cards and changes how the opponent can attack."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Trigger Engine",
                "en": "Trigger Engine card"
              },
              "accentA": "#506f9a",
              "accentB": "#192638",
              "badge": {
                "it": "Più trigger",
                "en": "More triggers"
              },
              "choiceNote": {
                "it": "Alza la qualità media delle vite, accettando maggiore varianza.",
                "en": "Raise average life quality while accepting more variance."
              }
            }
          ]
        },
        {
          "id": "insight-single",
          "type": "interactiveCards",
          "enabled": true,
          "order": 60,
          "title": {
            "it": "Boa Hancock 7c",
            "en": "Boa Hancock 7c"
          },
          "eyebrow": {
            "it": "APPROFONDIMENTO INTERATTIVO",
            "en": "INTERACTIVE DEEP DIVE"
          },
          "body": {
            "it": "Una minaccia che trasforma il controllo delle vite in tempo e presenza sulla board.",
            "en": "A threat that turns life control into time and board presence."
          },
          "items": [
            {
              "name": "Boa Hancock 7c",
              "code": "OP13-118",
              "comment": {
                "it": "Un corpo solido che converte il controllo delle vite in tempo e pressione.",
                "en": "A solid body that converts life control into time and pressure."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Boa Hancock 7c",
                "en": "Boa Hancock 7c card"
              },
              "accentA": "#4d91d9",
              "accentB": "#202742"
            }
          ]
        },
        {
          "id": "curve",
          "type": "curve",
          "enabled": true,
          "order": 70,
          "title": {
            "it": "Come distribuiamo i costi",
            "en": "How the costs are distributed"
          },
          "eyebrow": {
            "it": "CURVA DEL MAZZO",
            "en": "DECK CURVE"
          },
          "body": {
            "it": "La curva alterna strumenti reattivi e corpi capaci di mantenere pressione nei turni centrali.",
            "en": "The curve alternates reactive tools and bodies capable of maintaining pressure in the middle turns."
          },
          "points": [
            {
              "cost": "1",
              "count": 5
            },
            {
              "cost": "2",
              "count": 8
            },
            {
              "cost": "3",
              "count": 10
            },
            {
              "cost": "4",
              "count": 10
            },
            {
              "cost": "5",
              "count": 7
            },
            {
              "cost": "6",
              "count": 4
            },
            {
              "cost": "7+",
              "count": 6
            }
          ]
        },
        {
          "id": "matchups",
          "type": "matchups",
          "enabled": true,
          "order": 80,
          "title": {
            "it": "Prime indicazioni",
            "en": "First indications"
          },
          "eyebrow": {
            "it": "MATCHUP OVERVIEW",
            "en": "MATCHUP OVERVIEW"
          },
          "body": {
            "it": "Una panoramica introduttiva: le analisi complete restano nelle Guide premium.",
            "en": "An introductory overview: full analyses remain part of Premium Guides."
          },
          "items": [
            {
              "opponent": "Teach",
              "status": "even",
              "label": {
                "it": "Equilibrato",
                "en": "Even"
              },
              "note": {
                "it": "Conta la gestione delle risorse recuperabili.",
                "en": "Managing recoverable resources matters."
              }
            },
            {
              "opponent": "Nami",
              "status": "bad",
              "label": {
                "it": "Difficile",
                "en": "Difficult"
              },
              "note": {
                "it": "La pressione deve iniziare prima del previsto.",
                "en": "Pressure must begin earlier than usual."
              }
            },
            {
              "opponent": "Aggro",
              "status": "good",
              "label": {
                "it": "Favorevole",
                "en": "Favourable"
              },
              "note": {
                "it": "Trigger e rimozioni aiutano a stabilizzare.",
                "en": "Triggers and removal help stabilise."
              }
            }
          ]
        }
      ]
    },
    "status": "published",
    "createdAt": "2026-07-20",
    "publishedAt": "2026-07-20",
    "deletedAt": null,
    "revision": 1,
    "author": {
      "it": "La Tana di Nika",
      "en": "La Tana di Nika"
    },
    "seo": {
      "title": {
        "it": "Boa Hancock — controllo e trigger",
        "en": "Boa Hancock — control and triggers"
      },
      "description": {
        "it": "Concetti principali, gestione delle vite e punti di forza da conoscere prima di portarla al tavolo.",
        "en": "Core concepts, life management and strengths to understand before taking the deck to the table."
      },
      "image": ""
    }
  },
  {
    "id": "nami",
    "slug": "nami",
    "leader": "Nami",
    "title": {
      "it": "Nami — costruire il proprio piano partita",
      "en": "Nami — building your game plan"
    },
    "excerpt": {
      "it": "Le priorità del mazzo, la gestione delle risorse e le sequenze che aiutano a mantenere il controllo.",
      "en": "Deck priorities, resource management and sequences that help maintain control."
    },
    "tags": {
      "it": [
        "Sequencing",
        "Piano del mazzo",
        "Gestione"
      ],
      "en": [
        "Sequencing",
        "Deck plan",
        "Management"
      ]
    },
    "categories": [
      "competitive"
    ],
    "format": {
      "it": "Formato attuale",
      "en": "Current format"
    },
    "updatedAt": "2026-07-18",
    "readingTime": 10,
    "image": "",
    "imageAlt": {
      "it": "Copertina della mini guida di Nami",
      "en": "Nami mini-guide cover"
    },
    "accentA": "#54b7a2",
    "accentB": "#18353d",
    "url": "guida/?id=nami",
    "detail": {
      "subtitle": {
        "it": "Un mazzo alternativo in cui ogni carta giocata modifica il percorso verso la vittoria.",
        "en": "An alternative-win deck where every played card changes the route to victory."
      },
      "style": {
        "it": "Combo · Alternate win",
        "en": "Combo · Alternate win"
      },
      "coverImage": "",
      "modules": [
        {
          "id": "why",
          "type": "why",
          "enabled": true,
          "order": 10,
          "title": {
            "it": "Perché abbiamo scelto questo mazzo",
            "en": "Why we chose this deck"
          },
          "eyebrow": {
            "it": "SCELTA EDITORIALE",
            "en": "EDITORIAL CHOICE"
          },
          "required": true,
          "quote": {
            "it": "Nami è uno dei migliori esempi di quanto il sequencing possa cambiare completamente il valore di una mano.",
            "en": "Nami is one of the best examples of how sequencing can completely change the value of a hand."
          },
          "body": {
            "it": "L’abbiamo scelta perché offre un piano partita unico e rende visibile la differenza tra usare una carta e usarla nel momento corretto.",
            "en": "We chose it because it offers a unique game plan and makes the difference between using a card and using it at the right time very clear."
          }
        },
        {
          "id": "identity",
          "type": "identity",
          "enabled": true,
          "order": 20,
          "title": {
            "it": "Come vuole giocare",
            "en": "How it wants to play"
          },
          "eyebrow": {
            "it": "IDENTITÀ TECNICA",
            "en": "TECHNICAL IDENTITY"
          },
          "body": {
            "it": "Il mazzo protegge le proprie risorse, filtra la mano e costruisce una sequenza di eventi capace di raggiungere la condizione di vittoria alternativa.",
            "en": "The deck protects resources, filters the hand and builds a sequence of events capable of reaching its alternate win condition."
          },
          "metrics": [
            {
              "label": {
                "it": "Difficoltà",
                "en": "Difficulty"
              },
              "value": {
                "it": "Molto alta",
                "en": "Very high"
              },
              "score": 92
            },
            {
              "label": {
                "it": "Sequencing",
                "en": "Sequencing"
              },
              "value": {
                "it": "Fondamentale",
                "en": "Essential"
              },
              "score": 96
            },
            {
              "label": {
                "it": "Interazione",
                "en": "Interaction"
              },
              "value": {
                "it": "Bassa",
                "en": "Low"
              },
              "score": 38
            },
            {
              "label": {
                "it": "Consistenza",
                "en": "Consistency"
              },
              "value": {
                "it": "Alta",
                "en": "High"
              },
              "score": 84
            }
          ]
        },
        {
          "id": "mulligan",
          "type": "mulligan",
          "enabled": true,
          "order": 25,
          "eyebrow": {
            "it": "PRIORITÀ DI MULLIGAN",
            "en": "MULLIGAN PRIORITIES"
          },
          "title": {
            "it": "Cosa deve fare la mano iniziale",
            "en": "What the opening hand must do"
          },
          "body": {
            "it": "Non cerchi una singola carta perfetta: cerchi una mano che produca una sequenza completa.",
            "en": "You are not looking for one perfect card: you are looking for a hand that produces a complete sequence."
          },
          "items": [
            {
              "priority": 1,
              "title": {
                "it": "Accesso al motore",
                "en": "Engine access"
              },
              "body": {
                "it": "Almeno un modo affidabile per filtrare o pescare.",
                "en": "At least one reliable way to filter or draw."
              }
            },
            {
              "priority": 2,
              "title": {
                "it": "Difesa sostenibile",
                "en": "Sustainable defence"
              },
              "body": {
                "it": "Risorse che proteggono senza fermare il piano principale.",
                "en": "Resources that protect without stopping the main plan."
              }
            },
            {
              "priority": 3,
              "title": {
                "it": "Sequenza, non quantità",
                "en": "Sequence, not quantity"
              },
              "body": {
                "it": "Una mano piena ma scollegata vale meno di tre carte che lavorano insieme.",
                "en": "A full but disconnected hand is worth less than three cards that work together."
              }
            }
          ]
        },
        {
          "id": "key-cards",
          "type": "keyCards",
          "enabled": true,
          "order": 30,
          "title": {
            "it": "Il nucleo del mazzo",
            "en": "The deck core"
          },
          "eyebrow": {
            "it": "CARTE CHIAVE",
            "en": "KEY CARDS"
          },
          "required": true,
          "body": {
            "it": "Le carte che definiscono la progressione principale della lista.",
            "en": "The cards that define the deck's main progression."
          },
          "items": [
            {
              "name": "Search Event",
              "code": "OP03-054",
              "comment": {
                "it": "Trova i pezzi necessari e riduce la varianza della mano.",
                "en": "Finds the required pieces and reduces hand variance."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Search Event",
                "en": "Search Event card"
              },
              "accentA": "#54b7a2",
              "accentB": "#18353d"
            },
            {
              "name": "Pilaf",
              "code": "OP03-055",
              "comment": {
                "it": "Trasforma DON disponibili in risorse e accelera la condizione di vittoria.",
                "en": "Turns available DON into resources and accelerates the win condition."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Pilaf",
                "en": "Pilaf card"
              },
              "accentA": "#4a8fa0",
              "accentB": "#17303b"
            },
            {
              "name": "Sanji's Pilaf",
              "code": "OP03-056",
              "comment": {
                "it": "Uno degli strumenti che premiano maggiormente il sequencing corretto.",
                "en": "One of the tools that most rewards correct sequencing."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Sanji's Pilaf",
                "en": "Sanji's Pilaf card"
              },
              "accentA": "#6d6ab0",
              "accentB": "#262341"
            }
          ]
        },
        {
          "id": "decklist",
          "type": "decklist",
          "enabled": true,
          "order": 40,
          "title": {
            "it": "La lista da cui partire",
            "en": "A list to start from"
          },
          "eyebrow": {
            "it": "DECKLIST DI RIFERIMENTO",
            "en": "REFERENCE DECKLIST"
          },
          "required": true,
          "body": {
            "it": "La lista di esempio privilegia consistenza, pescata e strumenti capaci di proteggere il piano principale.",
            "en": "The sample list prioritises consistency, draw and tools that protect the main plan."
          },
          "image": "assets/images/guides/decklists/nami-sample.svg",
          "imageAlt": {
            "it": "Decklist di riferimento con carte sample",
            "en": "Reference decklist with sample cards"
          },
          "text": "4xOP03-054\n4xOP03-055\n4xOP03-056\n4xOP16-017\n4xOP15-071\n4xOP14-083\n4xOP13-121\n4xOP12-044\n4xOP11-051\n4xOP10-073\n2xOP09-081\n2xOP08-091\n2xOP07-093\n2xOP06-086",
          "downloadName": "nami-sample-optcg-sim.txt"
        },
        {
          "id": "game-plan",
          "type": "gamePlan",
          "enabled": true,
          "order": 50,
          "eyebrow": {
            "it": "PIANO PARTITA",
            "en": "GAME PLAN"
          },
          "title": {
            "it": "Filtrare, proteggere, chiudere",
            "en": "Filter, protect, close"
          },
          "body": {
            "it": "Ogni fase modifica il valore delle carte successive.",
            "en": "Each phase changes the value of the cards that follow."
          },
          "items": [
            {
              "label": {
                "it": "Fase 1",
                "en": "Phase 1"
              },
              "title": {
                "it": "Stabilire il motore",
                "en": "Establish the engine"
              },
              "body": {
                "it": "Trova gli eventi che rendono la mano più efficiente.",
                "en": "Find the events that make the hand more efficient."
              }
            },
            {
              "label": {
                "it": "Fase 2",
                "en": "Phase 2"
              },
              "title": {
                "it": "Proteggere il tempo",
                "en": "Protect time"
              },
              "body": {
                "it": "Difendi quanto basta per continuare ad avanzare il piano.",
                "en": "Defend just enough to keep advancing the plan."
              }
            },
            {
              "label": {
                "it": "Fase 3",
                "en": "Phase 3"
              },
              "title": {
                "it": "Contare le risorse",
                "en": "Count resources"
              },
              "body": {
                "it": "Calcola il percorso finale senza sprecare pescate.",
                "en": "Calculate the final route without wasting draw effects."
              }
            },
            {
              "label": {
                "it": "Fase 4",
                "en": "Phase 4"
              },
              "title": {
                "it": "Chiudere la sequenza",
                "en": "Close the sequence"
              },
              "body": {
                "it": "Concentra gli ultimi eventi nella finestra corretta.",
                "en": "Concentrate the final events in the correct window."
              }
            }
          ]
        },
        {
          "id": "insight-sequence",
          "type": "interactiveCards",
          "enabled": true,
          "order": 60,
          "title": {
            "it": "Filtrare, pescare, chiudere",
            "en": "Filter, draw, close"
          },
          "eyebrow": {
            "it": "APPROFONDIMENTO INTERATTIVO",
            "en": "INTERACTIVE DEEP DIVE"
          },
          "body": {
            "it": "La progressione mostra come le risorse si trasformano gradualmente nella condizione di vittoria.",
            "en": "The progression shows how resources gradually become the win condition."
          },
          "items": [
            {
              "name": "Search Event",
              "code": "OP03-054",
              "comment": {
                "it": "Trova i pezzi necessari e riduce la varianza della mano.",
                "en": "Finds the required pieces and reduces hand variance."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Search Event",
                "en": "Search Event card"
              },
              "accentA": "#54b7a2",
              "accentB": "#18353d"
            },
            {
              "name": "Pilaf",
              "code": "OP03-055",
              "comment": {
                "it": "Trasforma DON disponibili in risorse e accelera la condizione di vittoria.",
                "en": "Turns available DON into resources and accelerates the win condition."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Pilaf",
                "en": "Pilaf card"
              },
              "accentA": "#4a8fa0",
              "accentB": "#17303b"
            },
            {
              "name": "Sanji's Pilaf",
              "code": "OP03-056",
              "comment": {
                "it": "Uno degli strumenti che premiano maggiormente il sequencing corretto.",
                "en": "One of the tools that most rewards correct sequencing."
              },
              "image": "",
              "imageAlt": {
                "it": "Carta Sanji's Pilaf",
                "en": "Sanji's Pilaf card"
              },
              "accentA": "#6d6ab0",
              "accentB": "#262341"
            }
          ]
        },
        {
          "id": "common-mistakes",
          "type": "tips",
          "enabled": true,
          "order": 70,
          "eyebrow": {
            "it": "ERRORI DA EVITARE",
            "en": "MISTAKES TO AVOID"
          },
          "title": {
            "it": "Tre errori che costano la partita",
            "en": "Three mistakes that cost the game"
          },
          "body": {
            "it": "Nami punisce soprattutto le decisioni che sembrano innocue nel turno in cui vengono prese.",
            "en": "Nami mainly punishes decisions that look harmless on the turn they are made."
          },
          "items": [
            {
              "title": {
                "it": "Pescare senza uno scopo",
                "en": "Drawing without a purpose"
              },
              "body": {
                "it": "Usare un evento solo perché è disponibile può spezzare la sequenza futura.",
                "en": "Using an event simply because it is available can break a future sequence."
              }
            },
            {
              "title": {
                "it": "Difendere troppo",
                "en": "Over-defending"
              },
              "body": {
                "it": "Ogni carta spesa per difendere deve essere confrontata con il tempo realmente guadagnato.",
                "en": "Every card spent on defence must be measured against the time actually gained."
              }
            },
            {
              "title": {
                "it": "Ignorare il conteggio",
                "en": "Ignoring the count"
              },
              "body": {
                "it": "Il percorso finale va pianificato prima che la mano diventi troppo corta.",
                "en": "The final route must be planned before the hand becomes too small."
              }
            }
          ]
        },
        {
          "id": "matchups",
          "type": "matchups",
          "enabled": true,
          "order": 80,
          "title": {
            "it": "Prime indicazioni",
            "en": "First indications"
          },
          "eyebrow": {
            "it": "MATCHUP OVERVIEW",
            "en": "MATCHUP OVERVIEW"
          },
          "body": {
            "it": "Una panoramica introduttiva: le analisi complete restano nelle Guide premium.",
            "en": "An introductory overview: full analyses remain part of Premium Guides."
          },
          "items": [
            {
              "opponent": "Control",
              "status": "good",
              "label": {
                "it": "Favorevole",
                "en": "Favourable"
              },
              "note": {
                "it": "Il tempo disponibile aiuta a costruire la sequenza.",
                "en": "Available time helps build the sequence."
              }
            },
            {
              "opponent": "Midrange",
              "status": "even",
              "label": {
                "it": "Equilibrato",
                "en": "Even"
              },
              "note": {
                "it": "Bisogna bilanciare difesa e avanzamento del piano.",
                "en": "You must balance defence and plan progression."
              }
            },
            {
              "opponent": "Aggro",
              "status": "bad",
              "label": {
                "it": "Difficile",
                "en": "Difficult"
              },
              "note": {
                "it": "Ogni risorsa difensiva deve produrre il massimo valore.",
                "en": "Every defensive resource must produce maximum value."
              }
            }
          ]
        }
      ]
    },
    "status": "published",
    "createdAt": "2026-07-18",
    "publishedAt": "2026-07-18",
    "deletedAt": null,
    "revision": 1,
    "author": {
      "it": "La Tana di Nika",
      "en": "La Tana di Nika"
    },
    "seo": {
      "title": {
        "it": "Nami — costruire il proprio piano partita",
        "en": "Nami — building your game plan"
      },
      "description": {
        "it": "Le priorità del mazzo, la gestione delle risorse e le sequenze che aiutano a mantenere il controllo.",
        "en": "Deck priorities, resource management and sequences that help maintain control."
      },
      "image": ""
    }
  }
];

  const guideTemplate = {
  "id": "free-guide-template",
  "slug": "nuova-guida-gratuita",
  "status": "draft",
  "createdAt": "2026-07-28",
  "publishedAt": null,
  "updatedAt": "2026-07-28",
  "deletedAt": null,
  "revision": 1,
  "leader": "",
  "title": {
    "it": "Nuova guida gratuita",
    "en": "New free guide"
  },
  "excerpt": {
    "it": "",
    "en": ""
  },
  "tags": {
    "it": [],
    "en": []
  },
  "categories": [],
  "format": {
    "it": "Formato attuale",
    "en": "Current format"
  },
  "readingTime": 5,
  "image": "",
  "imageAlt": {
    "it": "",
    "en": ""
  },
  "accentA": "#7b5cff",
  "accentB": "#1b263e",
  "author": {
    "it": "La Tana di Nika",
    "en": "La Tana di Nika"
  },
  "url": "guida/?id=nuova-guida-gratuita",
  "seo": {
    "title": {
      "it": "Nuova guida gratuita",
      "en": "New free guide"
    },
    "description": {
      "it": "",
      "en": ""
    },
    "image": ""
  },
  "detail": {
    "subtitle": {
      "it": "",
      "en": ""
    },
    "style": {
      "it": "",
      "en": ""
    },
    "coverImage": "",
    "modules": [
      {
        "id": "why-main",
        "type": "why",
        "enabled": true,
        "order": 10,
        "required": true,
        "eyebrow": {
          "it": "SCELTA EDITORIALE",
          "en": "EDITORIAL CHOICE"
        },
        "title": {
          "it": "Perché giocare questo mazzo",
          "en": "Why play this deck"
        },
        "quote": {
          "it": "",
          "en": ""
        },
        "body": {
          "it": "",
          "en": ""
        }
      },
      {
        "id": "key-cards-main",
        "type": "keyCards",
        "enabled": true,
        "order": 20,
        "required": true,
        "eyebrow": {
          "it": "CARTE CHIAVE",
          "en": "KEY CARDS"
        },
        "title": {
          "it": "Le carte da conoscere",
          "en": "Cards to know"
        },
        "body": {
          "it": "",
          "en": ""
        },
        "items": []
      },
      {
        "id": "decklist-main",
        "type": "decklist",
        "enabled": true,
        "order": 30,
        "required": true,
        "eyebrow": {
          "it": "LISTA DI RIFERIMENTO",
          "en": "REFERENCE LIST"
        },
        "title": {
          "it": "Decklist",
          "en": "Decklist"
        },
        "body": {
          "it": "",
          "en": ""
        },
        "image": "",
        "imageAlt": {
          "it": "",
          "en": ""
        },
        "text": "",
        "downloadName": "decklist.txt"
      }
    ]
  }
};

  const limits = {
    maxGuides: 500,
    maxItemsPerCardSection: 5,
    maxModuleInstancesPerType: 5,
    maxTagsPerLanguage: 12,
    maxCategories: 8
  };

  const moduleCatalog = {
    why: { required: true, maxInstances: 1, itemField: null },
    keyCards: { required: true, maxInstances: 1, itemField: "items", maxItems: 5 },
    decklist: { required: true, maxInstances: 1, itemField: null },
    identity: { required: false, maxInstances: 5, itemField: "metrics", maxItems: 5 },
    gamePlan: { required: false, maxInstances: 5, itemField: "items", maxItems: 5 },
    resourceFlow: { required: false, maxInstances: 5, itemField: "items", maxItems: 5 },
    cardChoices: { required: false, maxInstances: 5, itemField: "items", maxItems: 5 },
    mulligan: { required: false, maxInstances: 5, itemField: "items", maxItems: 5 },
    interactiveCards: { required: false, maxInstances: 5, itemField: "items", maxItems: 5 },
    strengthsWeaknesses: { required: false, maxInstances: 5, itemField: null },
    curve: { required: false, maxInstances: 5, itemField: "items", maxItems: 5 },
    matchups: { required: false, maxInstances: 5, itemField: "items", maxItems: 5 },
    tips: { required: false, maxInstances: 5, itemField: "items", maxItems: 5 }
  };

  const allowedStatuses = ["draft", "published", "archived", "trash"];
  const deepClone = value => JSON.parse(JSON.stringify(value));
  const slugify = value => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const todayISO = () => new Date().toISOString().slice(0, 10);
  const localizedHasValue = value => {
    if (typeof value === "string") return value.trim().length > 0;
    return Boolean(String(value?.it || value?.en || "").trim());
  };

  const normalizeModule = (module, index = 0) => ({
    enabled: true,
    order: (index + 1) * 10,
    id: module?.id || `module-${index + 1}`,
    ...deepClone(module || {})
  });

  const normalizeGuide = guide => {
    const normalized = deepClone(guide || guideTemplate);
    normalized.id = String(normalized.id || `free-guide-${Date.now()}`);
    normalized.slug = slugify(normalized.slug || normalized.id) || `free-guide-${Date.now()}`;
    normalized.status = allowedStatuses.includes(normalized.status) ? normalized.status : "draft";
    normalized.createdAt = normalized.createdAt || todayISO();
    normalized.updatedAt = normalized.updatedAt || todayISO();
    normalized.publishedAt = normalized.status === "published"
      ? (normalized.publishedAt || normalized.updatedAt)
      : (normalized.publishedAt || null);
    normalized.deletedAt = normalized.status === "trash" ? (normalized.deletedAt || todayISO()) : null;
    normalized.revision = Math.max(1, Number(normalized.revision) || 1);
    normalized.readingTime = Math.max(1, Number(normalized.readingTime) || 5);
    normalized.categories = Array.isArray(normalized.categories)
      ? normalized.categories.slice(0, limits.maxCategories)
      : [];
    normalized.tags = normalized.tags && typeof normalized.tags === "object"
      ? normalized.tags
      : { it: [], en: [] };
    normalized.tags.it = Array.isArray(normalized.tags.it)
      ? normalized.tags.it.slice(0, limits.maxTagsPerLanguage)
      : [];
    normalized.tags.en = Array.isArray(normalized.tags.en)
      ? normalized.tags.en.slice(0, limits.maxTagsPerLanguage)
      : [];
    normalized.url = `guida/?id=${encodeURIComponent(normalized.slug)}`;
    normalized.detail = normalized.detail && typeof normalized.detail === "object" ? normalized.detail : {};
    normalized.detail.modules = Array.isArray(normalized.detail.modules) ? normalized.detail.modules : [];
    normalized.detail.modules = normalized.detail.modules
      .map(normalizeModule)
      .sort((a, b) => Number(a.order || 0) - Number(b.order || 0));
    normalized.seo = normalized.seo && typeof normalized.seo === "object" ? normalized.seo : {};
    normalized.seo.title = normalized.seo.title || normalized.title;
    normalized.seo.description = normalized.seo.description || normalized.excerpt;
    normalized.seo.image = normalized.seo.image || normalized.image || normalized.detail.coverImage || "";
    return normalized;
  };

  const validateGuide = guide => {
    const normalized = normalizeGuide(guide);
    const errors = [];
    if (!normalized.id.trim()) errors.push("id mancante");
    if (!normalized.slug.trim()) errors.push("slug mancante");
    if (!allowedStatuses.includes(normalized.status)) errors.push("stato non valido");
    if (normalized.status === "published") {
      if (!normalized.leader?.trim()) errors.push("leader mancante");
      if (!localizedHasValue(normalized.title)) errors.push("titolo mancante");
      if (!localizedHasValue(normalized.format)) errors.push("formato mancante");
    }

    const moduleIds = new Set();
    const moduleCounts = {};
    normalized.detail.modules.forEach((module, index) => {
      if (!module.id) errors.push(`modulo ${index + 1}: id mancante`);
      if (moduleIds.has(module.id)) errors.push(`id modulo duplicato: ${module.id}`);
      moduleIds.add(module.id);
      const definition = moduleCatalog[module.type];
      if (!definition) {
        errors.push(`tipo modulo non riconosciuto: ${module.type || "vuoto"}`);
        return;
      }
      moduleCounts[module.type] = (moduleCounts[module.type] || 0) + 1;
      const maxInstances = definition.maxInstances ?? limits.maxModuleInstancesPerType;
      if (moduleCounts[module.type] > maxInstances) errors.push(`${module.type}: massimo ${maxInstances} moduli`);
      if (definition.itemField && Array.isArray(module[definition.itemField]) && module[definition.itemField].length > definition.maxItems) {
        errors.push(`${module.type}: massimo ${definition.maxItems} elementi`);
      }
      if (!Number.isFinite(Number(module.order))) errors.push(`${module.id}: ordine non valido`);
    });

    Object.entries(moduleCatalog).forEach(([type, definition]) => {
      if (definition.required && !moduleCounts[type]) errors.push(`modulo obbligatorio mancante: ${type}`);
    });

    return { valid: errors.length === 0, errors, guide: normalized };
  };

  const validateCollection = guides => {
    const errors = [];
    const ids = new Set();
    const slugs = new Set();
    const normalizedGuides = (Array.isArray(guides) ? guides : []).map(normalizeGuide);
    if (normalizedGuides.length > limits.maxGuides) errors.push(`massimo ${limits.maxGuides} guide`);
    normalizedGuides.forEach(guide => {
      const result = validateGuide(guide);
      result.errors.forEach(error => errors.push(`${guide.id}: ${error}`));
      if (ids.has(guide.id)) errors.push(`id guida duplicato: ${guide.id}`);
      if (slugs.has(guide.slug)) errors.push(`slug guida duplicato: ${guide.slug}`);
      ids.add(guide.id);
      slugs.add(guide.slug);
    });
    return { valid: errors.length === 0, errors, guides: normalizedGuides };
  };

  const createGuideFromTemplate = overrides => {
    const now = Date.now();
    return normalizeGuide({
      ...deepClone(guideTemplate),
      ...deepClone(overrides || {}),
      id: overrides?.id || `free-guide-${now}`,
      slug: overrides?.slug || overrides?.id || `free-guide-${now}`,
      status: overrides?.status || "draft",
      createdAt: todayISO(),
      updatedAt: todayISO(),
      publishedAt: overrides?.status === "published" ? todayISO() : null,
      revision: 1
    });
  };

  const api = {
    version: "4.4.16",
    settings: {},
    guides: [],
    templates: { blank: deepClone(guideTemplate) },
    adminApi: {}
  };

  const findGuide = identifier => {
    const key = String(identifier || "");
    return api.guides.find(guide => guide.id === key || guide.slug === key) || null;
  };

  const duplicateGuide = (identifier, overrides = {}) => {
    const source = findGuide(identifier) || guideTemplate;
    const now = Date.now();
    const copy = deepClone(source);
    copy.id = overrides.id || `${source.id || "free-guide"}-copy-${now}`;
    copy.slug = overrides.slug || slugify(copy.id);
    copy.status = overrides.status || "draft";
    copy.leader = overrides.leader ?? source.leader;
    copy.title = overrides.title || deepClone(source.title);
    copy.createdAt = todayISO();
    copy.updatedAt = todayISO();
    copy.publishedAt = copy.status === "published" ? todayISO() : null;
    copy.deletedAt = null;
    copy.revision = 1;
    return normalizeGuide({ ...copy, ...deepClone(overrides) });
  };

  const setGuideStatus = (guide, status) => {
    const normalized = normalizeGuide(guide);
    if (!allowedStatuses.includes(status)) return normalized;
    normalized.status = status;
    normalized.updatedAt = todayISO();
    normalized.revision += 1;
    normalized.publishedAt = status === "published" ? (normalized.publishedAt || todayISO()) : normalized.publishedAt;
    normalized.deletedAt = status === "trash" ? todayISO() : null;
    return normalizeGuide(normalized);
  };

  const isPublicGuide = guide => guide?.status === "published" && !guide?.deletedAt;
  const getPublishedGuides = () => api.guides.filter(isPublicGuide);
  const removeGuidePermanently = (guides, identifier) => (Array.isArray(guides) ? guides : [])
    .filter(guide => guide.id !== identifier && guide.slug !== identifier)
    .map(normalizeGuide);

  api.settings = {
    placeholderData: true,
    defaultSort: "updated-desc",
    limits: {
      itemsPerCardSection: { min: 0, max: limits.maxItemsPerCardSection },
      moduleInstancesPerType: { min: 0, max: limits.maxModuleInstancesPerType },
      maxGuides: limits.maxGuides
    },
    lifecycle: allowedStatuses.slice(),
    adminActions: ["create", "duplicate", "edit", "upload", "reorder", "enable", "disable", "preview", "publish", "unpublish", "archive", "restore", "trash", "deletePermanent"],
    requiredModuleTypes: Object.entries(moduleCatalog).filter(([, definition]) => definition.required).map(([type]) => type),
    moduleCatalog,
    comments: {
      enabled: true,
      oneContributionPerVisitor: true,
      publicAdapter: "window.NIKA_GUIDE_COMMENTS_ADAPTER",
      fallback: "localStorage",
      sharedPersistence: "Supabase Anonymous Auth + Row Level Security"
    }
  };
  api.guides = sourceGuides.map(normalizeGuide);
  api.adminApi = {
    deepClone,
    slugify,
    normalizeGuide,
    validateGuide,
    validateCollection,
    createGuideFromTemplate,
    duplicateGuide,
    findGuide,
    setGuideStatus,
    publishGuide: guide => setGuideStatus(guide, "published"),
    archiveGuide: guide => setGuideStatus(guide, "archived"),
    moveGuideToTrash: guide => setGuideStatus(guide, "trash"),
    restoreGuide: guide => setGuideStatus(guide, "draft"),
    removeGuidePermanently,
    isPublicGuide,
    getPublishedGuides
  };

  window.NIKA_FREE_GUIDES_DATA = api;
})();
