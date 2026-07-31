/* ======================================================
   LA TANA DI NIKA — MEDIA SERVICE V4.4.18
   Livello unico per immagini e riferimenti video.
   Oggi usa file locali; in futuro potrà usare R2 senza
   modificare le pagine pubbliche o i moduli della admin.
====================================================== */
(() => {
  const config = window.NIKA_SERVICE_CONFIG || {};
  const isAbsolute = value => /^(https?:|data:|blob:)/i.test(String(value || ""));
  const cleanPath = value => String(value || "").replace(/^\/+/, "");

  const normalizeImage = value => {
    if (!value) return { provider: "local", path: "", url: "", alt: { it: "", en: "" } };
    if (typeof value === "string") {
      return isAbsolute(value)
        ? { provider: "external", path: "", url: value, alt: { it: "", en: "" } }
        : { provider: "local", path: cleanPath(value), url: "", alt: { it: "", en: "" } };
    }
    return {
      provider: value.provider || (value.url ? "external" : "local"),
      path: cleanPath(value.path || value.key || ""),
      url: value.url || "",
      alt: value.alt || { it: "", en: "" },
      width: Number(value.width) || null,
      height: Number(value.height) || null,
      mimeType: value.mimeType || "",
      focalPoint: value.focalPoint || "center"
    };
  };

  const resolveImage = (value, rootPrefix = "") => {
    const media = normalizeImage(value);
    if (media.url) return media.url;
    if (!media.path) return "";
    const provider = media.provider || config.media?.activeProvider || "local";
    if (provider === "r2") {
      const base = config.media?.providers?.r2?.publicBaseUrl || "";
      return base ? `${base.replace(/\/$/, "")}/${media.path}` : "";
    }
    if (provider === "supabase") {
      const base = config.media?.providers?.supabase?.publicBaseUrl || "";
      return base ? `${base.replace(/\/$/, "")}/${media.path}` : "";
    }
    return `${rootPrefix}${media.path}`;
  };

  const normalizeVideo = value => {
    if (!value) return { provider: "twitch", type: "vod", reference: "", url: "", thumbnail: "" };
    if (typeof value === "string") return { provider: "twitch", type: "vod", reference: value, url: value, thumbnail: "" };
    return {
      provider: value.provider || "twitch",
      type: value.type || "vod",
      reference: value.reference || value.id || "",
      url: value.url || "",
      thumbnail: value.thumbnail || "",
      title: value.title || { it: "", en: "" },
      description: value.description || { it: "", en: "" }
    };
  };

  const twitchReference = value => {
    const video = normalizeVideo(value);
    const raw = String(video.reference || video.url || "");
    const match = raw.match(/(?:videos\/|video=)(\d+)/i);
    return match ? match[1] : raw.replace(/^v/i, "").replace(/\D/g, "");
  };

  window.NIKA_MEDIA = {
    version: "4.4.18R1",
    normalizeImage,
    resolveImage,
    normalizeVideo,
    twitchReference,
    uploadMode: config.media?.upload?.mode || "disabled"
  };
})();
