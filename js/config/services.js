/* ======================================================
   LA TANA DI NIKA — SERVICE CONFIG V4.4.18
   Nessuna chiave segreta deve essere inserita in questo file.
====================================================== */
(() => {
  const config = {
    version: "4.4.18",
    environment: "development",
    data: {
      provider: "local",
      supabaseUrl: "",
      supabaseAnonKey: ""
    },
    media: {
      activeProvider: "local",
      providers: {
        local: { baseUrl: "" },
        supabase: { publicBaseUrl: "" },
        r2: { publicBaseUrl: "" }
      },
      upload: {
        mode: "disabled",
        authorizedEndpoint: "",
        deleteEndpoint: ""
      }
    },
    video: {
      activeProvider: "twitch",
      providers: {
        twitch: {
          channel: "",
          parentDomains: []
        }
      }
    }
  };

  window.NIKA_SERVICE_CONFIG = Object.freeze(config);
})();
