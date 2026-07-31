/* ======================================================
   LA TANA DI NIKA — ARTICLES & REPORTS CMS-READY V4.4.18
   Archivio pubblico e contratto dati per la futura admin.
====================================================== */
(() => {
  const sourceArticles = [
  {
    "id": "nika-league-stage-four-report",
    "slug": "nika-league-stage-four-report",
    "status": "published",
    "type": "nika-league-report",
    "featured": true,
    "title": {
      "it": "Il momento in cui la classifica cambia volto",
      "en": "The moment the standings change shape"
    },
    "excerpt": {
      "it": "La quarta tappa ridisegna la corsa alla Top 8: risultati, scelte di mazzo e punti che iniziano a pesare davvero.",
      "en": "Stage four reshapes the Top 8 race: results, deck choices and points that are starting to matter."
    },
    "author": {
      "name": "Redazione La Tana di Nika",
      "role": {
        "it": "Editoriale",
        "en": "Editorial team"
      }
    },
    "category": {
      "it": "Nika League",
      "en": "Nika League"
    },
    "tags": {
      "it": [
        "Report",
        "Classifica",
        "Top 8"
      ],
      "en": [
        "Report",
        "Standings",
        "Top 8"
      ]
    },
    "publishedAt": "2026-07-27",
    "updatedAt": "2026-07-27",
    "readingTime": 7,
    "accentA": "#925cff",
    "accentB": "#231338",
    "cover": {
      "image": "assets/images/hero-sea.png",
      "alt": {
        "it": "Atmosfera della Nika League",
        "en": "Nika League atmosphere"
      },
      "focalPoint": "center"
    },
    "seo": {},
    "modules": [
      {
        "id": "stage-four-intro",
        "type": "text",
        "enabled": true,
        "order": 10,
        "eyebrow": {
          "it": "IL PUNTO DELLA STAGIONE",
          "en": "SEASON CHECKPOINT"
        },
        "title": {
          "it": "La classifica non è più una fotografia provvisoria",
          "en": "The standings are no longer a provisional snapshot"
        },
        "paragraphs": {
          "it": [
            "Dopo quattro tappe, ogni risultato inizia a raccontare qualcosa di definitivo. La zona qualificazione si compatta, mentre chi insegue deve scegliere con più attenzione dove rischiare e quali punti proteggere.",
            "La quarta tappa non ha soltanto premiato i mazzi più solidi: ha mostrato quali giocatori riescono ad adattare le proprie decisioni quando il formato smette di essere prevedibile."
          ],
          "en": [
            "After four stages, every result begins to tell a more definitive story. The qualification zone tightens while those chasing must choose more carefully where to take risks and which points to protect.",
            "Stage four did not only reward the most solid decks: it showed which players can adapt when the format stops being predictable."
          ]
        }
      },
      {
        "id": "stage-four-numbers",
        "type": "stats",
        "enabled": true,
        "order": 20,
        "eyebrow": {
          "it": "I NUMERI DELLA TAPPA",
          "en": "STAGE NUMBERS"
        },
        "title": {
          "it": "Una domenica che pesa sulla stagione",
          "en": "A Sunday that matters"
        },
        "items": [
          {
            "value": "17",
            "label": {
              "it": "giocatori",
              "en": "players"
            }
          },
          {
            "value": "5",
            "label": {
              "it": "round",
              "en": "rounds"
            }
          },
          {
            "value": "4",
            "label": {
              "it": "mazzi diversi in Top 4",
              "en": "different decks in Top 4"
            }
          },
          {
            "value": "0",
            "label": {
              "it": "record perfetti",
              "en": "perfect records"
            }
          }
        ]
      },
      {
        "id": "stage-four-quote",
        "type": "quote",
        "enabled": true,
        "order": 30,
        "quote": {
          "it": "Da questo momento non basta più fare punti: bisogna capire quali risultati resteranno davvero nel totale finale.",
          "en": "From this point on, earning points is not enough: players must understand which results will truly remain in the final total."
        },
        "attribution": {
          "it": "Analisi della redazione",
          "en": "Editorial analysis"
        }
      },
      {
        "id": "stage-four-results",
        "type": "results",
        "enabled": true,
        "order": 40,
        "eyebrow": {
          "it": "TOP 4",
          "en": "TOP 4"
        },
        "title": {
          "it": "I protagonisti della tappa",
          "en": "The stage protagonists"
        },
        "items": [
          {
            "placement": "1°",
            "name": "Koby",
            "note": {
              "it": "Controllo e gestione del ritmo",
              "en": "Control and tempo management"
            }
          },
          {
            "placement": "2°",
            "name": "U/G Luffy",
            "note": {
              "it": "Pressione progressiva",
              "en": "Progressive pressure"
            }
          },
          {
            "placement": "3°",
            "name": "U/G Luffy",
            "note": {
              "it": "Lista consistente",
              "en": "Consistent list"
            }
          },
          {
            "placement": "4°",
            "name": "Ace & Luffy",
            "note": {
              "it": "La sorpresa della giornata",
              "en": "The surprise of the day"
            }
          }
        ]
      },
      {
        "id": "stage-four-analysis",
        "type": "text",
        "enabled": true,
        "order": 50,
        "eyebrow": {
          "it": "COSA CAMBIA ORA",
          "en": "WHAT CHANGES NOW"
        },
        "title": {
          "it": "Due scarti, una Top 8 da conquistare",
          "en": "Two discarded results, one Top 8 to earn"
        },
        "paragraphs": {
          "it": [
            "Con sei tappe complessive e due risultati esclusi dal conteggio finale, la posizione attuale non racconta ancora tutto. Chi ha già costruito una base solida può usare le prossime tappe per migliorare gli scarti; chi è più indietro non ha più spazio per giornate anonime.",
            "Il prossimo appuntamento sarà quindi meno conservativo: alcuni giocatori potranno proteggere la propria posizione, altri dovranno cercare un risultato capace di cambiare completamente la stagione."
          ],
          "en": [
            "With six total stages and two results excluded from the final count, the current position still does not tell the whole story. Players with a solid base can improve their discarded scores; those behind can no longer afford anonymous days.",
            "The next event will therefore be less conservative: some players can protect their position, while others need a result capable of changing the season entirely."
          ]
        }
      },
      {
        "id": "stage-four-related",
        "type": "related",
        "enabled": true,
        "order": 60,
        "eyebrow": {
          "it": "CONTINUA IL PERCORSO",
          "en": "CONTINUE THE JOURNEY"
        },
        "title": {
          "it": "Segui la Nika League",
          "en": "Follow the Nika League"
        },
        "items": [
          {
            "label": {
              "it": "Classifica, calendario e Finale",
              "en": "Standings, calendar and Final"
            },
            "url": "../../../tornei/nika-league/"
          }
        ]
      }
    ]
  },
  {
    "id": "mihawk-st32-format-overview",
    "slug": "mihawk-st32-format-overview",
    "status": "published",
    "type": "analysis",
    "featured": false,
    "title": {
      "it": "ST32: perché Mihawk cambia il modo di costruire il mazzo",
      "en": "ST32: why Mihawk changes deck building"
    },
    "excerpt": {
      "it": "Una panoramica sui nuovi supporti, sulle curve che diventano possibili e sulle scelte che definiscono la lista.",
      "en": "An overview of the new support, the curves it enables and the choices that define the list."
    },
    "author": {
      "name": "Redazione La Tana di Nika",
      "role": {
        "it": "Analisi formato",
        "en": "Format analysis"
      }
    },
    "category": {
      "it": "Analisi",
      "en": "Analysis"
    },
    "tags": {
      "it": [
        "Mihawk",
        "ST32",
        "Metagame"
      ],
      "en": [
        "Mihawk",
        "ST32",
        "Metagame"
      ]
    },
    "publishedAt": "2026-07-25",
    "updatedAt": "2026-07-26",
    "readingTime": 9,
    "accentA": "#6d8ed6",
    "accentB": "#17243c",
    "cover": {
      "image": "assets/images/guides/premium/mihawk-st32-cover.jpg",
      "alt": {
        "it": "Copertina dedicata a Mihawk ST32",
        "en": "Mihawk ST32 cover"
      },
      "focalPoint": "center"
    },
    "seo": {},
    "modules": [
      {
        "id": "mihawk-overview",
        "type": "text",
        "enabled": true,
        "order": 10,
        "eyebrow": {
          "it": "PANORAMICA",
          "en": "OVERVIEW"
        },
        "title": {
          "it": "Non è soltanto un aggiornamento di lista",
          "en": "It is more than a list update"
        },
        "paragraphs": {
          "it": [
            "I supporti dello Structure Deck 32 non aggiungono semplicemente nuove carte forti: modificano il modo in cui Mihawk può distribuire risorse, pressione e sviluppo della board.",
            "La lista diventa più coerente, ma anche più sensibile al sequencing. Ogni slot deve contribuire a una curva precisa e a un piano riconoscibile."
          ],
          "en": [
            "Structure Deck 32 does not merely add strong cards: it changes how Mihawk can distribute resources, pressure and board development.",
            "The list becomes more consistent but also more sensitive to sequencing. Every slot must support a precise curve and a recognisable plan."
          ]
        }
      },
      {
        "id": "mihawk-key-points",
        "type": "keyPoints",
        "enabled": true,
        "order": 20,
        "eyebrow": {
          "it": "TRE CAMBIAMENTI",
          "en": "THREE CHANGES"
        },
        "title": {
          "it": "Dove si vede davvero il salto di qualità",
          "en": "Where the upgrade truly shows"
        },
        "items": [
          {
            "title": {
              "it": "Curva più fluida",
              "en": "Smoother curve"
            },
            "body": {
              "it": "Le giocate intermedie collegano meglio setup e finisher.",
              "en": "Mid-game plays connect setup and finishers more effectively."
            }
          },
          {
            "title": {
              "it": "Board più difficile da contestare",
              "en": "A harder board to contest"
            },
            "body": {
              "it": "Lo sviluppo genera valore senza rinunciare alla pressione.",
              "en": "Development generates value without giving up pressure."
            }
          },
          {
            "title": {
              "it": "Scelte più tecniche",
              "en": "More technical choices"
            },
            "body": {
              "it": "La qualità della lista dipende sempre di più dall’ordine delle azioni.",
              "en": "List quality increasingly depends on action order."
            }
          }
        ]
      },
      {
        "id": "mihawk-quote",
        "type": "quote",
        "enabled": true,
        "order": 30,
        "quote": {
          "it": "Il vero vantaggio dello Structure non è una singola carta: è la quantità di linee credibili che il mazzo può costruire.",
          "en": "The Structure's real advantage is not one card: it is the number of credible lines the deck can build."
        },
        "attribution": {
          "it": "La Tana di Nika",
          "en": "La Tana di Nika"
        }
      },
      {
        "id": "mihawk-related",
        "type": "related",
        "enabled": true,
        "order": 40,
        "eyebrow": {
          "it": "APPROFONDISCI",
          "en": "GO DEEPER"
        },
        "title": {
          "it": "Dalla panoramica alla guida",
          "en": "From overview to guide"
        },
        "items": [
          {
            "label": {
              "it": "Apri la Guida Premium Mihawk ST32",
              "en": "Open the Mihawk ST32 Premium Guide"
            },
            "url": "../../guide-premium/guida/?id=mihawk-st32"
          },
          {
            "label": {
              "it": "Consulta la mini guida gratuita",
              "en": "Read the free mini guide"
            },
            "url": "../../guide-gratuite/guida/?id=mihawk"
          }
        ]
      }
    ]
  },
  {
    "id": "torneo-domenicale-dietro-le-quinte",
    "slug": "torneo-domenicale-dietro-le-quinte",
    "status": "published",
    "type": "tournament-report",
    "featured": false,
    "title": {
      "it": "Dietro le quinte di un domenicale della Tana",
      "en": "Behind the scenes of a Sunday tournament"
    },
    "excerpt": {
      "it": "Preparazione, tavoli, ritmo dell’evento e piccoli dettagli che trasformano un torneo in un appuntamento della community.",
      "en": "Preparation, tables, event rhythm and the small details that turn a tournament into a community event."
    },
    "author": {
      "name": "Redazione La Tana di Nika",
      "role": {
        "it": "Report community",
        "en": "Community report"
      }
    },
    "category": {
      "it": "I nostri tornei",
      "en": "Our tournaments"
    },
    "tags": {
      "it": [
        "Community",
        "Torneo",
        "Report"
      ],
      "en": [
        "Community",
        "Tournament",
        "Report"
      ]
    },
    "publishedAt": "2026-07-22",
    "updatedAt": "2026-07-22",
    "readingTime": 6,
    "accentA": "#a66bd8",
    "accentB": "#301844",
    "cover": {
      "image": "assets/images/hero-sea.png",
      "alt": {
        "it": "Atmosfera di un torneo della Tana",
        "en": "La Tana tournament atmosphere"
      },
      "focalPoint": "center"
    },
    "seo": {},
    "modules": [
      {
        "id": "sunday-opening",
        "type": "text",
        "enabled": true,
        "order": 10,
        "eyebrow": {
          "it": "PRIMA DEL PRIMO ROUND",
          "en": "BEFORE ROUND ONE"
        },
        "title": {
          "it": "L’evento comincia molto prima degli abbinamenti",
          "en": "The event begins long before pairings"
        },
        "paragraphs": {
          "it": [
            "Un torneo ben riuscito nasce dalla somma di dettagli invisibili: tavoli pronti, premi leggibili, tempi comunicati e uno spazio in cui ogni giocatore sappia subito dove andare.",
            "La parte competitiva resta centrale, ma l’atmosfera viene costruita prima ancora che inizi il primo match."
          ],
          "en": [
            "A successful tournament comes from invisible details: prepared tables, clear prizes, communicated timings and a space where every player immediately knows where to go.",
            "Competition remains central, but the atmosphere is built before the first match begins."
          ]
        }
      },
      {
        "id": "sunday-points",
        "type": "keyPoints",
        "enabled": true,
        "order": 20,
        "eyebrow": {
          "it": "ORGANIZZAZIONE",
          "en": "ORGANISATION"
        },
        "title": {
          "it": "Tre cose che fanno la differenza",
          "en": "Three things that make the difference"
        },
        "items": [
          {
            "title": {
              "it": "Tempi chiari",
              "en": "Clear timing"
            },
            "body": {
              "it": "Round, pause e premiazione devono avere un ritmo comprensibile.",
              "en": "Rounds, breaks and prizes need an understandable rhythm."
            }
          },
          {
            "title": {
              "it": "Premi trasparenti",
              "en": "Transparent prizes"
            },
            "body": {
              "it": "La griglia deve essere visibile prima dell’inizio dell’evento.",
              "en": "The prize grid should be visible before the event begins."
            }
          },
          {
            "title": {
              "it": "Spazio alla community",
              "en": "Space for community"
            },
            "body": {
              "it": "Un torneo deve lasciare anche tempo per parlare, confrontarsi e tornare.",
              "en": "A tournament should leave time to talk, compare ideas and return."
            }
          }
        ]
      },
      {
        "id": "sunday-video",
        "type": "video",
        "enabled": true,
        "order": 30,
        "eyebrow": {
          "it": "VOD DELLA GIORNATA",
          "en": "EVENT VOD"
        },
        "title": {
          "it": "Feature match da collegare a Twitch",
          "en": "Feature match ready for Twitch"
        },
        "video": {
          "provider": "twitch",
          "type": "vod",
          "reference": "",
          "url": "",
          "thumbnail": ""
        },
        "description": {
          "it": "Il modulo è già pronto per ricevere titolo, descrizione, thumbnail e riferimento Twitch dalla futura admin.",
          "en": "This module is ready to receive title, description, thumbnail and a Twitch reference from the future admin."
        }
      },
      {
        "id": "sunday-related",
        "type": "related",
        "enabled": true,
        "order": 40,
        "eyebrow": {
          "it": "PROSSIMI EVENTI",
          "en": "UPCOMING EVENTS"
        },
        "title": {
          "it": "Scopri i nostri tornei",
          "en": "Discover our tournaments"
        },
        "items": [
          {
            "label": {
              "it": "Calendario, iscrizioni e premi",
              "en": "Calendar, registration and prizes"
            },
            "url": "../../../tornei/i-nostri-tornei/"
          }
        ]
      }
    ]
  },
  {
    "id": "article-draft-template-example",
    "slug": "article-draft-template-example",
    "status": "draft",
    "type": "editorial",
    "featured": false,
    "title": {
      "it": "Bozza non pubblicata",
      "en": "Unpublished draft"
    },
    "excerpt": {
      "it": "Contenuto di test non visibile al pubblico.",
      "en": "Test content not visible publicly."
    },
    "author": {
      "name": "",
      "role": {
        "it": "",
        "en": ""
      }
    },
    "category": {
      "it": "Editoriale",
      "en": "Editorial"
    },
    "tags": {
      "it": [],
      "en": []
    },
    "publishedAt": null,
    "updatedAt": "2026-07-28",
    "readingTime": 5,
    "accentA": "#925cff",
    "accentB": "#24152f",
    "cover": {
      "image": "",
      "alt": {
        "it": "",
        "en": ""
      },
      "focalPoint": "center"
    },
    "seo": {},
    "modules": [
      {
        "id": "draft-body",
        "type": "text",
        "enabled": true,
        "order": 10,
        "eyebrow": {
          "it": "",
          "en": ""
        },
        "title": {
          "it": "",
          "en": ""
        },
        "paragraphs": {
          "it": [],
          "en": []
        }
      }
    ]
  }
];
  const articleTemplate = {
  "id": "article-new",
  "slug": "article-new",
  "status": "draft",
  "type": "editorial",
  "featured": false,
  "title": {
    "it": "",
    "en": ""
  },
  "excerpt": {
    "it": "",
    "en": ""
  },
  "author": {
    "name": "",
    "role": {
      "it": "",
      "en": ""
    }
  },
  "category": {
    "it": "",
    "en": ""
  },
  "tags": {
    "it": [],
    "en": []
  },
  "publishedAt": null,
  "scheduledAt": null,
  "updatedAt": "2026-07-28",
  "createdAt": "2026-07-28",
  "readingTime": 5,
  "accentA": "#925cff",
  "accentB": "#24152f",
  "cover": {
    "image": "",
    "alt": {
      "it": "",
      "en": ""
    },
    "focalPoint": "center"
  },
  "seo": {
    "title": {
      "it": "",
      "en": ""
    },
    "description": {
      "it": "",
      "en": ""
    },
    "image": ""
  },
  "modules": [
    {
      "id": "article-body",
      "type": "text",
      "enabled": true,
      "order": 10,
      "required": true,
      "eyebrow": {
        "it": "",
        "en": ""
      },
      "title": {
        "it": "",
        "en": ""
      },
      "paragraphs": {
        "it": [],
        "en": []
      }
    }
  ]
};

  const limits = {
    maxArticles: 1000,
    maxModuleInstancesPerType: 5,
    maxItemsPerModule: 5,
    maxTagsPerLanguage: 12
  };
  const allowedStatuses = ["draft", "scheduled", "published", "archived", "trash"];
  const allowedTypes = ["editorial", "analysis", "nika-league-report", "tournament-report", "news"];
  const moduleCatalog = {
    text: { required: true, maxInstances: 5, itemField: "paragraphs", localizedItems: true, maxItems: 12 },
    image: { required: false, maxInstances: 5 },
    quote: { required: false, maxInstances: 5 },
    keyPoints: { required: false, maxInstances: 5, itemField: "items", maxItems: 5 },
    stats: { required: false, maxInstances: 5, itemField: "items", maxItems: 5 },
    results: { required: false, maxInstances: 5, itemField: "items", maxItems: 5 },
    gallery: { required: false, maxInstances: 5, itemField: "items", maxItems: 5 },
    video: { required: false, maxInstances: 5 },
    related: { required: false, maxInstances: 5, itemField: "items", maxItems: 5 },
    callout: { required: false, maxInstances: 5 }
  };

  const deepClone = value => JSON.parse(JSON.stringify(value));
  const todayISO = () => new Date().toISOString().slice(0, 10);
  const slugify = value => String(value || "")
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  const localizedHasValue = value => typeof value === "string"
    ? value.trim().length > 0
    : Boolean(String(value?.it || value?.en || "").trim());

  const normalizeModule = (module, index = 0) => ({
    enabled: true,
    order: (index + 1) * 10,
    id: module?.id || `article-module-${index + 1}`,
    ...deepClone(module || {})
  });

  const normalizeArticle = article => {
    const normalized = deepClone(article || articleTemplate);
    normalized.id = String(normalized.id || `article-${Date.now()}`);
    normalized.slug = slugify(normalized.slug || normalized.id) || `article-${Date.now()}`;
    normalized.status = allowedStatuses.includes(normalized.status) ? normalized.status : "draft";
    normalized.type = allowedTypes.includes(normalized.type) ? normalized.type : "editorial";
    normalized.createdAt = normalized.createdAt || normalized.updatedAt || todayISO();
    normalized.updatedAt = normalized.updatedAt || todayISO();
    normalized.publishedAt = normalized.status === "published" ? (normalized.publishedAt || todayISO()) : (normalized.publishedAt || null);
    normalized.scheduledAt = normalized.status === "scheduled" ? (normalized.scheduledAt || null) : (normalized.scheduledAt || null);
    normalized.deletedAt = normalized.status === "trash" ? (normalized.deletedAt || todayISO()) : null;
    normalized.revision = Math.max(1, Number(normalized.revision) || 1);
    normalized.readingTime = Math.max(1, Number(normalized.readingTime) || 5);
    normalized.tags = normalized.tags && typeof normalized.tags === "object" ? normalized.tags : { it: [], en: [] };
    normalized.tags.it = Array.isArray(normalized.tags.it) ? normalized.tags.it.slice(0, limits.maxTagsPerLanguage) : [];
    normalized.tags.en = Array.isArray(normalized.tags.en) ? normalized.tags.en.slice(0, limits.maxTagsPerLanguage) : [];
    normalized.cover = normalized.cover && typeof normalized.cover === "object" ? normalized.cover : { image: "", alt: { it: "", en: "" }, focalPoint: "center" };
    normalized.modules = Array.isArray(normalized.modules) ? normalized.modules.map(normalizeModule).sort((a,b) => Number(a.order||0)-Number(b.order||0)) : [];
    normalized.url = `articolo/?id=${encodeURIComponent(normalized.slug)}`;
    normalized.seo = normalized.seo && typeof normalized.seo === "object" ? normalized.seo : {};
    normalized.seo.title = normalized.seo.title || normalized.title;
    normalized.seo.description = normalized.seo.description || normalized.excerpt;
    normalized.seo.image = normalized.seo.image || normalized.cover.image || "";
    return normalized;
  };

  const validateArticle = article => {
    const normalized = normalizeArticle(article);
    const errors = [];
    if (!normalized.id.trim()) errors.push("id mancante");
    if (!normalized.slug.trim()) errors.push("slug mancante");
    if (!allowedStatuses.includes(normalized.status)) errors.push("stato non valido");
    if (!allowedTypes.includes(normalized.type)) errors.push("tipo non valido");
    if (normalized.status === "published" || normalized.status === "scheduled") {
      if (!localizedHasValue(normalized.title)) errors.push("titolo mancante");
      if (!localizedHasValue(normalized.excerpt)) errors.push("estratto mancante");
      if (!String(normalized.author?.name || "").trim()) errors.push("autore mancante");
      if (!localizedHasValue(normalized.category)) errors.push("categoria mancante");
      if (normalized.status === "scheduled" && !normalized.scheduledAt) errors.push("data di programmazione mancante");
    }
    const ids = new Set();
    const counts = {};
    normalized.modules.forEach((module, index) => {
      if (!module.id) errors.push(`modulo ${index + 1}: id mancante`);
      if (ids.has(module.id)) errors.push(`id modulo duplicato: ${module.id}`);
      ids.add(module.id);
      const definition = moduleCatalog[module.type];
      if (!definition) { errors.push(`tipo modulo non riconosciuto: ${module.type || "vuoto"}`); return; }
      counts[module.type] = (counts[module.type] || 0) + 1;
      if (counts[module.type] > definition.maxInstances) errors.push(`${module.type}: massimo ${definition.maxInstances} moduli`);
      if (definition.itemField) {
        if (definition.localizedItems) {
          ["it","en"].forEach(language => {
            const values = module[definition.itemField]?.[language];
            if (Array.isArray(values) && values.length > definition.maxItems) errors.push(`${module.type}/${language}: massimo ${definition.maxItems} elementi`);
          });
        } else if (Array.isArray(module[definition.itemField]) && module[definition.itemField].length > definition.maxItems) {
          errors.push(`${module.type}: massimo ${definition.maxItems} elementi`);
        }
      }
    });
    const hasText = normalized.modules.some(module => module.type === "text" && module.enabled !== false);
    if (!hasText) errors.push("almeno un modulo testo attivo è obbligatorio");
    return { valid: errors.length === 0, errors, article: normalized };
  };

  const validateCollection = articles => {
    const normalized = (Array.isArray(articles) ? articles : []).map(normalizeArticle);
    const errors = [];
    const ids = new Set();
    const slugs = new Set();
    if (normalized.length > limits.maxArticles) errors.push(`massimo ${limits.maxArticles} articoli`);
    normalized.forEach(article => {
      const result = validateArticle(article);
      result.errors.forEach(error => errors.push(`${article.id}: ${error}`));
      if (ids.has(article.id)) errors.push(`id duplicato: ${article.id}`);
      if (slugs.has(article.slug)) errors.push(`slug duplicato: ${article.slug}`);
      ids.add(article.id); slugs.add(article.slug);
    });
    return { valid: errors.length === 0, errors, articles: normalized };
  };

  const api = { version: "4.4.18", settings: {}, articles: [], templates: { blank: deepClone(articleTemplate) }, adminApi: {} };
  const findArticle = identifier => {
    const key = String(identifier || "");
    return api.articles.find(article => article.id === key || article.slug === key) || null;
  };
  const createArticleFromTemplate = overrides => {
    const now = Date.now();
    return normalizeArticle({ ...deepClone(articleTemplate), ...deepClone(overrides || {}), id: overrides?.id || `article-${now}`, slug: overrides?.slug || overrides?.id || `article-${now}`, status: overrides?.status || "draft", createdAt: todayISO(), updatedAt: todayISO(), revision: 1 });
  };
  const duplicateArticle = (identifier, overrides = {}) => {
    const source = findArticle(identifier) || articleTemplate;
    const now = Date.now();
    const copy = deepClone(source);
    copy.id = overrides.id || `${source.id || "article"}-copy-${now}`;
    copy.slug = overrides.slug || slugify(copy.id);
    copy.status = overrides.status || "draft";
    copy.createdAt = todayISO(); copy.updatedAt = todayISO(); copy.publishedAt = null; copy.scheduledAt = null; copy.deletedAt = null; copy.revision = 1;
    return normalizeArticle({ ...copy, ...deepClone(overrides) });
  };
  const setArticleStatus = (article, status, options = {}) => {
    const normalized = normalizeArticle(article);
    if (!allowedStatuses.includes(status)) return normalized;
    normalized.status = status; normalized.updatedAt = todayISO(); normalized.revision += 1;
    normalized.publishedAt = status === "published" ? (normalized.publishedAt || todayISO()) : normalized.publishedAt;
    normalized.scheduledAt = status === "scheduled" ? (options.scheduledAt || normalized.scheduledAt || null) : normalized.scheduledAt;
    normalized.deletedAt = status === "trash" ? todayISO() : null;
    return normalizeArticle(normalized);
  };
  const isPublicArticle = article => article?.status === "published" && !article?.deletedAt;
  const getPublishedArticles = () => api.articles.filter(isPublicArticle);
  const removeArticlePermanently = (articles, identifier) => (Array.isArray(articles) ? articles : []).filter(article => article.id !== identifier && article.slug !== identifier).map(normalizeArticle);

  api.settings = {
    placeholderData: true,
    lifecycle: allowedStatuses.slice(),
    types: allowedTypes.slice(),
    limits,
    moduleCatalog,
    adminActions: ["create","duplicate","edit","upload","reorder","enable","disable","preview","schedule","publish","unpublish","archive","restore","trash","deletePermanent"],
    mediaLayer: "window.NIKA_MEDIA",
    dataProvider: "local-now / Supabase-later",
    videoProvider: "Twitch-now / abstracted-for-future-migration"
  };
  api.articles = sourceArticles.map(normalizeArticle);
  api.adminApi = {
    deepClone, slugify, normalizeArticle, validateArticle, validateCollection,
    createArticleFromTemplate, duplicateArticle, findArticle, setArticleStatus,
    publishArticle: article => setArticleStatus(article, "published"),
    scheduleArticle: (article, scheduledAt) => setArticleStatus(article, "scheduled", { scheduledAt }),
    archiveArticle: article => setArticleStatus(article, "archived"),
    moveArticleToTrash: article => setArticleStatus(article, "trash"),
    restoreArticle: article => setArticleStatus(article, "draft"),
    removeArticlePermanently, isPublicArticle, getPublishedArticles
  };
  window.NIKA_ARTICLES_DATA = api;
})();
