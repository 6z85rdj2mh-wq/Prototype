(() => {
  const data = window.NIKA_ARTICLES_DATA;
  if (!data) return;
  const escapeHTML = value => String(value ?? "").replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const escapeAttr = escapeHTML;
  const language = () => {
    try { const saved = localStorage.getItem("nika-language"); if (saved === "it" || saved === "en") return saved; } catch (_) {}
    return document.documentElement.lang === "en" ? "en" : "it";
  };
  const pick = (value, lang = language()) => typeof value === "string" ? value : value?.[lang] ?? value?.it ?? value?.en ?? "";
  const words = {
    it:{articles:"Articoli e report",reading:"min di lettura",updated:"Aggiornato",index:"Indice dell’articolo",back:"Torna agli articoli",editorial:"Area Editoriale",notFound:"Articolo non disponibile",notFoundText:"Questo contenuto non è pubblicato oppure non esiste.",openVideo:"Apri su Twitch",videoPlaceholder:"Il riferimento Twitch verrà inserito dalla futura admin.",gallery:"Galleria",related:"Continua a esplorare",pageTitle:"Articolo — La Tana di Nika"},
    en:{articles:"Articles and reports",reading:"min read",updated:"Updated",index:"Article index",back:"Back to articles",editorial:"Editorial Area",notFound:"Article unavailable",notFoundText:"This content is not published or does not exist.",openVideo:"Open on Twitch",videoPlaceholder:"The Twitch reference will be inserted from the future admin.",gallery:"Gallery",related:"Keep exploring",pageTitle:"Article — La Tana di Nika"}
  };
  const formatDate = (iso, lang) => { if(!iso) return "—"; const d=new Date(`${iso}T12:00:00`); return Number.isNaN(d.getTime())?iso:new Intl.DateTimeFormat(lang==="en"?"en-GB":"it-IT",{day:"2-digit",month:"long",year:"numeric"}).format(d); };
  const resolveImage = image => window.NIKA_MEDIA?.resolveImage(image, document.body.dataset.rootPrefix || "") || "";
  const articleKey = () => new URLSearchParams(location.search).get("id") || new URLSearchParams(location.search).get("slug") || "";
  const findPublic = key => {
    const article = data.adminApi?.findArticle?.(key) || (data.articles || []).find(item => item.id === key || item.slug === key);
    return article && (data.adminApi?.isPublicArticle?.(article) ?? (article.status === "published" && !article.deletedAt)) ? article : null;
  };
  const moduleTitle = (module,lang) => pick(module.title,lang) || pick(module.eyebrow,lang) || module.type;
  const shell = (module, lang, inner, className="") => `<section class="article-module ${className}" id="${escapeAttr(module.id)}" data-module-type="${escapeAttr(module.type)}">
    ${pick(module.eyebrow,lang)?`<p class="article-module__eyebrow">${escapeHTML(pick(module.eyebrow,lang))}</p>`:""}
    ${pick(module.title,lang)?`<h2>${escapeHTML(pick(module.title,lang))}</h2>`:""}${inner}</section>`;
  const renderText = (module,lang) => shell(module,lang,`<div class="article-prose">${(module.paragraphs?.[lang] || module.paragraphs?.it || []).map(p=>`<p>${escapeHTML(p)}</p>`).join("")}</div>`,`article-module--text`);
  const renderQuote = (module,lang) => `<section class="article-module article-module--quote" id="${escapeAttr(module.id)}"><blockquote>${escapeHTML(pick(module.quote,lang))}</blockquote>${pick(module.attribution,lang)?`<cite>${escapeHTML(pick(module.attribution,lang))}</cite>`:""}</section>`;
  const renderStats = (module,lang) => shell(module,lang,`<div class="article-stats">${(module.items||[]).slice(0,5).map(item=>`<article><strong>${escapeHTML(item.value)}</strong><span>${escapeHTML(pick(item.label,lang))}</span></article>`).join("")}</div>`);
  const renderKeyPoints = (module,lang) => shell(module,lang,`<div class="article-key-points">${(module.items||[]).slice(0,5).map((item,index)=>`<article><span>${String(index+1).padStart(2,"0")}</span><h3>${escapeHTML(pick(item.title,lang))}</h3><p>${escapeHTML(pick(item.body,lang))}</p></article>`).join("")}</div>`);
  const renderResults = (module,lang) => shell(module,lang,`<div class="article-results">${(module.items||[]).slice(0,5).map(item=>`<article><strong>${escapeHTML(item.placement)}</strong><div><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(pick(item.note,lang))}</p></div></article>`).join("")}</div>`);
  const renderImage = (module,lang) => { const url=resolveImage(module.image); if(!url) return ""; return shell(module,lang,`<figure class="article-image"><img src="${escapeAttr(url)}" alt="${escapeAttr(pick(module.imageAlt,lang))}" loading="lazy" decoding="async">${pick(module.caption,lang)?`<figcaption>${escapeHTML(pick(module.caption,lang))}</figcaption>`:""}</figure>`); };
  const renderGallery = (module,lang) => { const items=(module.items||[]).slice(0,5).map(item=>({item,url:resolveImage(item.image)})).filter(entry=>entry.url); if(!items.length)return""; return shell(module,lang,`<div class="article-gallery">${items.map(({item,url})=>`<figure><img src="${escapeAttr(url)}" alt="${escapeAttr(pick(item.alt,lang))}" loading="lazy" decoding="async">${pick(item.caption,lang)?`<figcaption>${escapeHTML(pick(item.caption,lang))}</figcaption>`:""}</figure>`).join("")}</div>`); };
  const renderVideo = (module,lang) => { const video=window.NIKA_MEDIA?.normalizeVideo(module.video)||module.video||{}; const thumb=resolveImage(video.thumbnail); const href=video.url || (video.reference ? `https://www.twitch.tv/videos/${window.NIKA_MEDIA?.twitchReference(video) || video.reference}` : ""); return shell(module,lang,`<article class="article-video"><div class="article-video__visual">${thumb?`<img src="${escapeAttr(thumb)}" alt="" loading="lazy" decoding="async">`:""}<span aria-hidden="true">▶</span></div><div><p>${escapeHTML(pick(module.description,lang))}</p>${href?`<a class="button button--primary" href="${escapeAttr(href)}" target="_blank" rel="noopener">${escapeHTML(words[lang].openVideo)}</a>`:`<span class="article-video__placeholder">${escapeHTML(words[lang].videoPlaceholder)}</span>`}</div></article>`); };
  const renderRelated = (module,lang) => shell(module,lang,`<div class="article-related">${(module.items||[]).slice(0,5).map(item=>`<a href="${escapeAttr(item.url||"#")}"><span>${escapeHTML(pick(item.label,lang))}</span><b aria-hidden="true">→</b></a>`).join("")}</div>`);
  const renderCallout = (module,lang) => shell(module,lang,`<div class="article-callout"><strong>${escapeHTML(pick(module.heading,lang))}</strong><p>${escapeHTML(pick(module.body,lang))}</p></div>`);
  const renderModule = (module,lang) => ({text:renderText,quote:renderQuote,stats:renderStats,keyPoints:renderKeyPoints,results:renderResults,image:renderImage,gallery:renderGallery,video:renderVideo,related:renderRelated,callout:renderCallout}[module.type]?.(module,lang) || "");

  const init = () => {
    const page=document.querySelector("[data-article-detail]"); if(!page||page.dataset.initialized==="true")return; page.dataset.initialized="true";
    const render = () => {
      const lang=language(), copy=words[lang], article=findPublic(articleKey());
      if(!article){ document.title=`${copy.notFound} — La Tana di Nika`; page.innerHTML=`<section class="article-not-found shell"><p class="eyebrow">${escapeHTML(copy.articles)}</p><h1>${escapeHTML(copy.notFound)}</h1><p>${escapeHTML(copy.notFoundText)}</p><a class="button button--primary" href="../">${escapeHTML(copy.back)}</a></section>`; return; }
      document.title=`${pick(article.title,lang)} — La Tana di Nika`;
      const cover=resolveImage(article.cover?.image); const modules=(article.modules||[]).filter(module=>module.enabled!==false).sort((a,b)=>Number(a.order||0)-Number(b.order||0));
      const tags=(article.tags?.[lang]||article.tags?.it||[]).map(tag=>`<span>${escapeHTML(tag)}</span>`).join("");
      const toc=modules.map(module=>`<a href="#${escapeAttr(module.id)}"><span>${escapeHTML(moduleTitle(module,lang))}</span><b aria-hidden="true">→</b></a>`).join("");
      page.innerHTML=`<article class="article-detail-page" style="--article-a:${escapeAttr(article.accentA||"#925cff")};--article-b:${escapeAttr(article.accentB||"#24152f")}">
        <header class="article-hero"><div class="shell article-hero__grid"><div class="article-hero__copy"><nav class="article-breadcrumb" aria-label="Breadcrumb"><a href="../../">${escapeHTML(copy.editorial)}</a><span>/</span><a href="../">${escapeHTML(copy.articles)}</a></nav><p class="eyebrow">${escapeHTML(pick(article.category,lang))}</p><h1>${escapeHTML(pick(article.title,lang))}</h1><p class="article-hero__lead">${escapeHTML(pick(article.excerpt,lang))}</p><div class="article-tags">${tags}</div><div class="article-byline"><strong>${escapeHTML(article.author?.name||"")}</strong><span>${escapeHTML(formatDate(article.publishedAt,lang))}</span><span>${escapeHTML(`${article.readingTime} ${copy.reading}`)}</span></div></div><div class="article-hero__visual" style="--focus:${escapeAttr(article.cover?.focalPoint||"center")}">${cover?`<img src="${escapeAttr(cover)}" alt="${escapeAttr(pick(article.cover?.alt,lang))}" decoding="async" fetchpriority="high">`:""}<span>${escapeHTML(pick(article.category,lang))}</span></div></div></header>
        <div class="shell article-layout"><aside class="article-index"><p>${escapeHTML(copy.index)}</p>${toc}</aside><div class="article-content">${modules.map(module=>renderModule(module,lang)).join("")}</div></div>
        <footer class="article-return"><div class="shell"><p>${escapeHTML(copy.related)}</p><div><a class="button button--ghost" href="../">${escapeHTML(copy.back)}</a><a class="button button--primary" href="../../">${escapeHTML(copy.editorial)}</a></div></div></footer>
      </article>`;
    };
    window.addEventListener("nika:languagechange",render); render();
  };
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
})();
