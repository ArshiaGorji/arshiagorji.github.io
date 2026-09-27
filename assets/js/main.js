/* =====================================================================
   PORTFOLIO ENGINE
   ---------------------------------------------------------------------
   Builds the whole page from the files in the content/ folder:
     content/settings.js  → languages, colors, theme
     content/en.js        → English text
     content/fa.js        → Persian text
   You don't need to edit this file to change what the site says.
   The available section types and icons are listed in README.md.
   ===================================================================== */
(function () {
  'use strict';

  var SETTINGS = window.SITE_SETTINGS || {};
  var CONTENT = window.CONTENT || {};
  var doc = document;
  var root = doc.documentElement;
  var els = {
    header: doc.getElementById('site-header'),
    main: doc.getElementById('main'),
    footer: doc.getElementById('site-footer')
  };
  var state = { lang: null, c: null, observers: [] };
  var RTL_LANGS = /^(fa|ar|he|ur|ps|ckb)\b/i;

  var DEFAULT_UI = {
    skipLink: 'Skip to content',
    menu: 'Menu',
    closeMenu: 'Close menu',
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
    switchLanguage: 'Switch language',
    all: 'All',
    view: 'View',
    copy: 'Copy',
    copied: 'Copied',
    backToTop: 'Back to top'
  };

  /* ------------------------------------------------------------------
     Icons — Feather / Lucide line style (MIT / ISC licensed).
     Use any of these names in the content files, e.g.  icon: "briefcase"
     ------------------------------------------------------------------ */
  var ICONS = {
    'activity': '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    'alert': '<path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/>',
    'archive': '<path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/>',
    'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'arrow-up': '<path d="M12 19V5"/><path d="m5 12 7-7 7 7"/>',
    'award': '<circle cx="12" cy="8" r="7"/><path d="M8.21 13.89 7 23l5-3 5 3-1.21-9.12"/>',
    'bar-chart': '<path d="M18 20V10M12 20V4M6 20v-6"/>',
    'book': '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    'briefcase': '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    'calculator': '<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8"/><path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M16 14v4M8 18h.01M12 18h.01"/>',
    'calendar': '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    'check': '<path d="M20 6 9 17l-5-5"/>',
    'clock': '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    'close': '<path d="M18 6 6 18M6 6l12 12"/>',
    'compass': '<circle cx="12" cy="12" r="10"/><path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36z"/>',
    'copy': '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
    'cpu': '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>',
    'database': '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    'dollar': '<path d="M12 1v22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>',
    'download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    'droplet': '<path d="M12 2.69 17.66 8.35a8 8 0 1 1-11.31 0z"/>',
    'external': '<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/>',
    'file-text': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8M16 17H8M10 9H8"/>',
    'github': '<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>',
    'globe': '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    'graduation': '<path d="M22 10 12 5 2 10l10 5 10-5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/><path d="M22 10v6"/>',
    'grid': '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>',
    'instagram': '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><path d="M17.5 6.5h.01"/>',
    'layers': '<path d="m12 2-10 5 10 5 10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>',
    'lightbulb': '<path d="M9 18h6M10 22h4"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/>',
    'link': '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    'linkedin': '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    'mail': '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    'map': '<path d="M1 6v16l7-4 8 4 7-4V2l-7 4-8-4z"/><path d="M8 2v16M16 6v16"/>',
    'map-pin': '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    'medical': '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M12 8v8M8 12h8"/>',
    'menu': '<path d="M3 12h18M3 6h18M3 18h18"/>',
    'message': '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>',
    'moon': '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>',
    'phone': '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    'pie-chart': '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/>',
    'presentation': '<path d="M2 3h20"/><path d="M21 3v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V3"/><path d="m7 21 5-5 5 5"/>',
    'search': '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>',
    'send': '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
    'shield': '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    'sliders': '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>',
    'sparkles': '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    'star': '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
    'sun': '<circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>',
    'target': '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>',
    'trending-up': '<path d="m23 6-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/>',
    'users': '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    'zap': '<path d="M13 2 3 14h9l-1 8 10-12h-9z"/>'
  };
  // Friendly aliases
  ICONS.email = ICONS.mail;
  ICONS.location = ICONS['map-pin'];
  ICONS.telegram = ICONS.send;
  ICONS.website = ICONS.globe;
  ICONS.whatsapp = ICONS.message;

  function icon(name, extraClass) {
    var body = ICONS[name];
    if (!body) {
      if (name) console.warn('[portfolio] Unknown icon "' + name + '". See the icon list in README.md.');
      return '';
    }
    return '<svg class="icon' + (extraClass ? ' ' + extraClass : '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + body + '</svg>';
  }

  /* ------------------------------------------------------------------
     Small helpers
     ------------------------------------------------------------------ */
  var store = {
    get: function (key) { try { return localStorage.getItem(key); } catch (e) { return null; } },
    set: function (key, value) { try { localStorage.setItem(key, value); } catch (e) { /* private mode */ } }
  };

  function esc(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }

  // Text formatting allowed in content: **bold**, *italic*, [label](https://link)
  function md(text) {
    var html = esc(text);
    html = html.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (all, label, url) {
      var u = cleanUrl(url.replace(/&amp;/g, '&'));
      return u ? '<a' + linkAttrs(u) + '>' + label + '</a>' : label;
    });
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>');
    return html.replace(/\n/g, '<br>');
  }

  function cleanUrl(url) {
    url = String(url == null ? '' : url).trim();
    return /^(javascript|vbscript|data):/i.test(url) ? '' : url;
  }

  function isExternal(url) { return /^https?:\/\//i.test(url); }

  function linkAttrs(url, download) {
    var attrs = ' href="' + esc(url) + '"';
    if (isExternal(url)) attrs += ' target="_blank" rel="noopener noreferrer"';
    if (download) attrs += ' download';
    return attrs;
  }

  // Keeps only real items: drops empty ones and anything marked  hidden: true
  function visible(list) {
    return (Array.isArray(list) ? list : []).filter(function (item) {
      return item != null && item !== '' && !(typeof item === 'object' && item.hidden);
    });
  }

  function textOf(item) {
    return typeof item === 'object' ? (item.name || item.title || item.text || '') : item;
  }

  function t(key) {
    var ui = (state.c && state.c.ui) || {};
    return ui[key] || DEFAULT_UI[key] || key;
  }

  function num(n) {
    try { return Number(n).toLocaleString(state.lang); } catch (e) { return String(n); }
  }

  function initials(name) {
    var parts = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return '';
    return (parts[0].charAt(0) + (parts.length > 1 ? parts[parts.length - 1].charAt(0) : '')).toUpperCase();
  }

  function isLocal() {
    return location.protocol === 'file:' || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  }

  function arrowIcon(name) {
    return icon(name, /^arrow-(right|left)$/.test(name) ? 'icon--flip' : '');
  }

  /* ------------------------------------------------------------------
     Shared pieces
     ------------------------------------------------------------------ */
  function pointsHtml(points) {
    var list = visible(points);
    if (!list.length) return '';
    return '<ul class="points">' + list.map(function (p) { return '<li>' + md(textOf(p)) + '</li>'; }).join('') + '</ul>';
  }

  function tagsHtml(tags, extraClass) {
    var list = visible(tags);
    if (!list.length) return '';
    return '<ul class="tags' + (extraClass ? ' ' + extraClass : '') + '">' +
      list.map(function (tag) { return '<li>' + esc(textOf(tag)) + '</li>'; }).join('') + '</ul>';
  }

  function moreLink(item) {
    var url = cleanUrl(item.link);
    if (!url) return '';
    var external = isExternal(url);
    return '<a class="more-link"' + linkAttrs(url, item.download) + '><span>' + esc(item.linkLabel || t('view')) + '</span>' +
      (external ? icon('external') : arrowIcon('arrow-right')) + '</a>';
  }

  function linkOrText(text, link) {
    var url = cleanUrl(link);
    return url ? '<a' + linkAttrs(url) + '>' + esc(text) + '</a>' : md(text);
  }

  function buttonHtml(b) {
    var url = cleanUrl(b.link);
    if (!url || !b.label) return '';
    var cls = 'btn ' + (b.style === 'primary' ? 'btn-primary' : 'btn-outline');
    var ic = b.icon ? arrowIcon(b.icon) : '';
    var trailing = /^arrow-/.test(b.icon || '');
    return '<a class="' + cls + '"' + linkAttrs(url, b.download) + '>' +
      (trailing ? '' : ic) + '<span>' + esc(b.label) + '</span>' + (trailing ? ic : '') + '</a>';
  }

  function socialHtml(list, extraClass) {
    var items = visible(list).filter(function (s) { return cleanUrl(s.link); });
    if (!items.length) return '';
    return '<ul class="social' + (extraClass ? ' ' + extraClass : '') + '">' + items.map(function (s) {
      return '<li><a class="icon-btn"' + linkAttrs(cleanUrl(s.link)) + ' aria-label="' + esc(s.label) + '" title="' + esc(s.label) + '">' +
        icon(s.icon || 'link') + '</a></li>';
    }).join('') + '</ul>';
  }

  function sectionHead(s, id) {
    if (!s.title && !s.eyebrow && !s.intro) return '';
    return '<header class="section-head reveal">' +
      (s.eyebrow ? '<p class="eyebrow">' + esc(s.eyebrow) + '</p>' : '') +
      (s.title ? '<h2 class="section-title" id="' + esc(id) + '-title">' + esc(s.title) + '</h2>' : '') +
      (s.intro ? '<p class="section-intro">' + md(s.intro) + '</p>' : '') +
      '</header>';
  }

  /* ------------------------------------------------------------------
     Header (top bar)
     ------------------------------------------------------------------ */
  function renderHeader(c, sections) {
    var p = c.profile || {};
    var links = sections.filter(function (x) { return x.s.menu; }).map(function (x) {
      return '<li><a href="#' + esc(x.id) + '" data-nav="' + esc(x.id) + '">' + esc(x.s.menu) + '</a></li>';
    }).join('');

    var langs = availableLanguages();
    var langBtn = '';
    if (langs.length > 1) {
      var next = langs[(langs.indexOf(state.lang) + 1) % langs.length];
      langBtn = '<button class="tool-btn lang-btn" type="button" data-lang="' + esc(next) + '" lang="' + esc(next) + '"' +
        ' aria-label="' + esc(t('switchLanguage')) + '" title="' + esc(t('switchLanguage')) + '">' +
        esc(CONTENT[next].languageLabel || next.toUpperCase()) + '</button>';
    }

    var themeBtn = themeToggleEnabled()
      ? '<button class="tool-btn theme-btn" type="button" data-theme-toggle>' + icon('moon', 'i-moon') + icon('sun', 'i-sun') + '</button>'
      : '';

    var menuBtn = links
      ? '<button class="tool-btn menu-btn" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="' + esc(t('menu')) + '">' +
        icon('menu', 'i-open') + icon('close', 'i-close') + '</button>'
      : '';

    var brand = p.brand || p.name;
    var brandShort = p.brandShort && p.brandShort !== brand
      ? '<span class="brand-name brand-name--short" aria-hidden="true">' + esc(p.brandShort) + '</span>'
      : '';
    return '<div class="container nav-bar">' +
      '<a class="brand' + (brandShort ? ' brand--has-short' : '') + '" href="#top"><span class="brand-mark" aria-hidden="true"></span>' +
      '<span class="brand-name brand-name--full">' + esc(brand) + '</span>' + brandShort + '</a>' +
      (links ? '<nav class="site-nav" id="site-nav" aria-label="' + esc(t('menu')) + '"><ul>' + links + '</ul></nav>' : '') +
      '<div class="nav-tools">' + langBtn + themeBtn + menuBtn + '</div>' +
      '</div>';
  }

  /* ------------------------------------------------------------------
     Hero (top of the page)
     ------------------------------------------------------------------ */
  function renderHero(c) {
    var p = c.profile || {};
    var tagline = visible(p.tagline).map(function (x) { return '<li>' + esc(textOf(x)) + '</li>'; }).join('');
    var buttons = visible(p.buttons).map(buttonHtml).join('');
    var social = socialHtml(c.social);
    var stats = visible(p.stats);

    var portrait = p.photo
      ? '<div class="hero-visual reveal"><figure class="portrait" data-initials="' + esc(initials(p.name)) + '">' +
          '<span class="portrait-ring" aria-hidden="true"></span>' +
          '<img src="' + esc(p.photo) + '" alt="' + esc(p.photoAlt || p.name) + '" width="480" height="480" decoding="async">' +
          (p.location ? '<figcaption class="portrait-badge">' + icon('map-pin') + '<span>' + esc(p.location) + '</span></figcaption>' : '') +
        '</figure></div>'
      : '';

    var statsHtml = stats.length
      ? '<div class="container"><dl class="stats reveal" style="--n:' + stats.length + '">' + stats.map(function (s) {
          return '<div class="stat"><dt>' + esc(s.label) + '</dt><dd>' + esc(s.value) + '</dd></div>';
        }).join('') + '</dl></div>'
      : '';

    return '<section class="hero" id="top">' +
      '<div class="hero-bg" aria-hidden="true"></div>' +
      '<div class="container hero-grid' + (portrait ? '' : ' hero-grid--text') + '">' +
        '<div class="hero-copy">' +
          (p.status ? '<p class="status reveal"><span class="status-dot" aria-hidden="true"></span>' + esc(p.status) + '</p>' : '') +
          '<h1 class="hero-name reveal">' + esc(p.name) + '</h1>' +
          (p.role ? '<p class="hero-role reveal">' + esc(p.role) + '</p>' : '') +
          (tagline ? '<ul class="hero-tagline reveal">' + tagline + '</ul>' : '') +
          (p.intro ? '<p class="hero-intro reveal">' + md(p.intro) + '</p>' : '') +
          (buttons ? '<div class="hero-actions reveal">' + buttons + '</div>' : '') +
          (social ? '<div class="reveal">' + social + '</div>' : '') +
        '</div>' +
        portrait +
      '</div>' +
      statsHtml +
      '</section>';
  }

  /* ------------------------------------------------------------------
     Section types
     ------------------------------------------------------------------ */
  var RENDERERS = {

    // Paragraphs on one side, a card of quick facts on the other
    about: function (s) {
      var paragraphs = visible(s.paragraphs).map(function (p) { return '<p>' + md(textOf(p)) + '</p>'; }).join('');
      var facts = visible(s.facts);
      var factsHtml = facts.length
        ? '<ul class="facts card reveal">' + facts.map(function (f) {
            return '<li class="fact"><span class="feature-icon" aria-hidden="true">' + icon(f.icon || 'check') + '</span>' +
              '<div><p class="fact-label">' + esc(f.label) + '</p><p class="fact-value">' + linkOrText(f.value, f.link) + '</p></div></li>';
          }).join('') + '</ul>'
        : '';
      return '<div class="about-grid' + (factsHtml ? '' : ' about-grid--single') + '">' +
        '<div class="about-text reveal">' + paragraphs + '</div>' + factsHtml + '</div>';
    },

    // A grid of cards (icon + title, optional text / bullet points / tags / link)
    cards: function (s) {
      return '<div class="grid-auto" style="--cols:' + columns(s, 3) + '">' + visible(s.items).map(function (it) {
        var rich = it.text || visible(it.points).length || visible(it.tags).length || it.link;
        return '<article class="card feature' + (it.image ? ' feature--media' : rich ? '' : ' feature--compact') + ' reveal">' +
          (it.image ? '<img class="card-img" src="' + esc(it.image) + '" alt="' + esc(it.imageAlt || '') + '" loading="lazy">' : '') +
          (it.icon ? '<span class="feature-icon" aria-hidden="true">' + icon(it.icon) + '</span>' : '') +
          '<div class="feature-body">' +
            '<h3 class="card-title">' + esc(it.title) + '</h3>' +
            (it.text ? '<p class="card-text">' + md(it.text) + '</p>' : '') +
            pointsHtml(it.points) + tagsHtml(it.tags) + moreLink(it) +
          '</div></article>';
      }).join('') + '</div>';
    },

    // Jobs, education, anything with dates — shown on a vertical line
    timeline: function (s) {
      return '<ol class="timeline">' + visible(s.items).map(function (it) {
        var meta = (it.period ? '<span class="meta">' + icon('calendar') + '<span>' + esc(it.period) + '</span></span>' : '') +
          (it.location ? '<span class="meta">' + icon('map-pin') + '<span>' + esc(it.location) + '</span></span>' : '');
        var tags = visible(it.tags);
        return '<li class="timeline-item reveal">' +
          '<span class="timeline-dot" aria-hidden="true"></span>' +
          '<article class="card timeline-card">' +
            '<header class="timeline-head">' +
              '<div class="timeline-titles">' +
                '<h3 class="card-title">' + esc(it.title) + '</h3>' +
                (it.place ? '<p class="timeline-place">' + linkOrText(it.place, it.placeLink) + '</p>' : '') +
              '</div>' +
              (meta ? '<div class="timeline-meta">' + meta + '</div>' : '') +
            '</header>' +
            (it.badge ? '<p class="badge">' + esc(it.badge) + '</p>' : '') +
            (it.text ? '<p class="card-text">' + md(it.text) + '</p>' : '') +
            pointsHtml(it.points) +
            (tags.length && it.tagsLabel ? '<p class="tags-label">' + esc(it.tagsLabel) + '</p>' : '') +
            tagsHtml(tags) + moreLink(it) +
          '</article></li>';
      }).join('') + '</ol>';
    },

    // Project cards with automatic category filter buttons
    projects: function (s) {
      var items = visible(s.items);
      var cats = [];
      items.forEach(function (it) { if (it.category && cats.indexOf(it.category) < 0) cats.push(it.category); });

      var filters = '';
      if (s.filters !== false && cats.length > 1) {
        filters = '<div class="filters reveal" role="group" aria-label="' + esc(s.title || t('all')) + '">' +
          filterButton('*', t('all'), items.length, true) +
          cats.map(function (cat) {
            return filterButton(cat, cat, items.filter(function (it) { return it.category === cat; }).length, false);
          }).join('') + '</div>';
      }

      return filters + '<div class="grid-auto project-grid" style="--cols:' + columns(s, 3) + '">' + items.map(function (it) {
        return '<article class="card project reveal" data-category="' + esc(it.category || '') + '">' +
          (it.image ? '<img class="card-img" src="' + esc(it.image) + '" alt="' + esc(it.imageAlt || '') + '" loading="lazy">' : '') +
          '<div class="project-top">' +
            '<span class="feature-icon" aria-hidden="true">' + icon(it.icon || 'layers') + '</span>' +
            (it.category ? '<span class="project-cat">' + esc(it.category) + '</span>' : '') +
          '</div>' +
          (it.subtitle ? '<p class="project-sub">' + esc(it.subtitle) + '</p>' : '') +
          '<h3 class="card-title">' + esc(it.title) + '</h3>' +
          (it.text ? '<p class="card-text">' + md(it.text) + '</p>' : '') +
          pointsHtml(it.points) + tagsHtml(it.tags) + moreLink(it) +
        '</article>';
      }).join('') + '</div>';
    },

    // Groups of skills: style "tags" (pills), "list" (check marks) or "levels" (bars)
    skills: function (s) {
      return '<div class="grid-auto skills-grid" style="--cols:' + columns(s, 3) + '">' + visible(s.groups).map(function (g) {
        var items = visible(g.items);
        var body;
        if (g.style === 'list') {
          body = '<ul class="checklist">' + items.map(function (x) {
            return '<li>' + icon('check') + '<span>' + md(textOf(x)) + '</span></li>';
          }).join('') + '</ul>';
        } else if (g.style === 'levels') {
          body = '<ul class="levels">' + items.map(function (x) {
            var hasValue = x.value !== undefined && x.value !== null && x.value !== '';
            var value = Math.max(0, Math.min(100, Number(x.value) || 0));
            return '<li><div class="level-head"><span class="level-name">' + esc(textOf(x)) + '</span>' +
              (x.level ? '<span class="level-note">' + esc(x.level) + '</span>' : '') + '</div>' +
              (hasValue ? '<div class="level-bar"><span style="width:' + value + '%"></span></div>' : '') + '</li>';
          }).join('') + '</ul>';
        } else {
          body = tagsHtml(items, 'tags--lg');
        }
        return '<article class="card skill-group reveal">' +
          '<h3 class="skill-title">' + (g.icon ? '<span class="feature-icon" aria-hidden="true">' + icon(g.icon) + '</span>' : '') +
          '<span>' + esc(g.title) + '</span></h3>' + body + '</article>';
      }).join('') + '</div>';
    },

    // Simple list: certificates, awards, publications, volunteering…
    list: function (s) {
      return '<ul class="grid-auto list-grid" style="--cols:' + columns(s, 1) + ';--min:320px">' + visible(s.items).map(function (it) {
        var url = cleanUrl(it.link);
        return '<li class="card list-item reveal">' +
          '<span class="list-icon" aria-hidden="true">' + icon(it.icon || s.icon || 'award') + '</span>' +
          '<div class="list-body">' +
            (it.label || it.date
              ? '<p class="list-top">' + (it.label ? '<span class="list-label">' + esc(it.label) + '</span>' : '') +
                (it.date ? '<span class="list-date">' + esc(it.date) + '</span>' : '') + '</p>'
              : '') +
            '<h3 class="list-title">' + (url ? '<a' + linkAttrs(url) + '>' + esc(it.title) + '</a>' : esc(it.title)) + '</h3>' +
            (it.subtitle ? '<p class="list-meta">' + esc(it.subtitle) + '</p>' : '') +
            (it.text ? '<p class="card-text">' + md(it.text) + '</p>' : '') +
          '</div></li>';
      }).join('') + '</ul>';
    },

    // Dark contact panel with title, text, a button and contact rows
    contact: function (s, id) {
      var btnUrl = s.button ? cleanUrl(s.button.link) : '';
      var button = btnUrl && s.button.label
        ? '<a class="btn btn-gold"' + linkAttrs(btnUrl) + '>' + icon(s.button.icon || 'send') + '<span>' + esc(s.button.label) + '</span></a>'
        : '';
      var rows = visible(s.items).map(function (it) {
        var url = cleanUrl(it.link);
        var value = '<span class="contact-value" dir="auto">' + esc(it.value) + '</span>';
        return '<li class="contact-item">' +
          '<span class="contact-icon" aria-hidden="true">' + icon(it.icon || 'link') + '</span>' +
          '<div class="contact-text"><p class="contact-label">' + esc(it.label) + '</p>' +
            (url ? '<a class="contact-link"' + linkAttrs(url) + '>' + value + '</a>' : value) +
          '</div>' +
          (it.copy ? '<button type="button" class="icon-btn copy-btn" data-copy="' + esc(it.value) + '"' +
            ' aria-label="' + esc(t('copy') + ' — ' + it.label) + '" title="' + esc(t('copy')) + '">' + icon('copy') + '</button>' : '') +
        '</li>';
      }).join('');

      return '<div class="contact-panel reveal">' +
        '<div class="contact-intro">' + sectionHead(s, id).replace(' reveal', '') +
          (s.text ? '<p class="contact-text-lead">' + md(s.text) + '</p>' : '') + button + '</div>' +
        (rows ? '<ul class="contact-list">' + rows + '</ul>' : '') +
      '</div>';
    },

    // Free text (and an optional image) — good for anything custom
    text: function (s) {
      return '<div class="prose reveal">' +
        visible(s.paragraphs).map(function (p) { return '<p>' + md(textOf(p)) + '</p>'; }).join('') +
        pointsHtml(s.points) +
        (s.image ? '<img class="prose-img" src="' + esc(s.image) + '" alt="' + esc(s.imageAlt || '') + '" loading="lazy">' : '') +
        '</div>';
    }
  };

  function columns(s, fallback) {
    var n = parseInt(s.columns, 10);
    return n >= 1 && n <= 4 ? n : fallback;
  }

  function filterButton(value, label, count, active) {
    return '<button type="button" class="chip' + (active ? ' is-active' : '') + '" data-filter="' + esc(value) + '" aria-pressed="' + active + '">' +
      esc(label) + '<span class="chip-count">' + num(count) + '</span></button>';
  }

  function renderSection(s, id, index) {
    var type = RENDERERS[s.type] ? s.type : 'text';
    if (!RENDERERS[s.type]) {
      console.warn('[portfolio] Section "' + id + '" has unknown type "' + s.type + '" — showing it as "text".');
    }
    var body;
    try {
      body = RENDERERS[type](s, id);
    } catch (err) {
      console.error('[portfolio] Could not build section "' + id + '":', err);
      if (!isLocal()) return '';
      body = '<p class="site-warning">Section "' + esc(id) + '" could not be shown: ' + esc(err.message) + '</p>';
    }
    var head = type === 'contact' ? '' : sectionHead(s, id);
    return '<section class="section section--' + type + (index % 2 === 1 ? ' section--tint' : '') + '" id="' + esc(id) + '"' +
      (s.title ? ' aria-labelledby="' + esc(id) + '-title"' : '') + '>' +
      '<div class="container">' + head + body + '</div></section>';
  }

  /* ------------------------------------------------------------------
     Footer
     ------------------------------------------------------------------ */
  function renderFooter(c) {
    var p = c.profile || {};
    var f = c.footer || {};
    return '<div class="container footer-inner">' +
      '<div class="footer-brand"><span class="brand-mark" aria-hidden="true"></span><div>' +
        '<p class="footer-name">' + esc(p.name) + '</p>' +
        (f.text ? '<p class="footer-text">' + md(f.text) + '</p>' : '') +
      '</div></div>' +
      socialHtml(c.social, 'social--small') +
      '<p class="footer-copy">© ' + esc(yearText()) + ' ' + esc(p.name) + '</p>' +
      '<a class="to-top" href="#top">' + icon('arrow-up') + '<span>' + esc(t('backToTop')) + '</span></a>' +
      '</div>';
  }

  function yearText() {
    try {
      return new Intl.DateTimeFormat(state.lang === 'fa' ? 'fa-IR' : state.lang, { year: 'numeric' }).format(new Date());
    } catch (e) {
      return String(new Date().getFullYear());
    }
  }

  /* ------------------------------------------------------------------
     Theme (light / dark) and colors from settings.js
     ------------------------------------------------------------------ */
  function themeToggleEnabled() {
    return !(SETTINGS.theme && SETTINGS.theme.showToggle === false);
  }

  function currentTheme() {
    return root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function setTheme(theme, remember) {
    root.setAttribute('data-theme', theme);
    if (remember) store.set('theme', theme);
    updateThemeButton();
  }

  function updateThemeButton() {
    var btn = els.header.querySelector('[data-theme-toggle]');
    if (!btn) return;
    var label = currentTheme() === 'dark' ? t('toLight') : t('toDark');
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }

  function applyColors() {
    var colors = SETTINGS.colors;
    if (!colors) return;
    var names = { accent: '--accent', heading: '--heading', background: '--bg', surface: '--surface', text: '--text', panel: '--panel' };
    var css = '';
    ['light', 'dark'].forEach(function (mode) {
      var set = colors[mode] || {};
      var rules = Object.keys(names).filter(function (k) { return set[k]; }).map(function (k) { return names[k] + ':' + set[k]; });
      if (rules.length) css += ':root[data-theme="' + mode + '"]{' + rules.join(';') + '}';
    });
    var tag = doc.getElementById('site-colors');
    if (!tag) {
      tag = doc.createElement('style');
      tag.id = 'site-colors';
      doc.head.appendChild(tag);
    }
    tag.textContent = css;
  }

  /* ------------------------------------------------------------------
     Languages
     ------------------------------------------------------------------ */
  function availableLanguages() {
    var wanted = Array.isArray(SETTINGS.languages) && SETTINGS.languages.length ? SETTINGS.languages : Object.keys(CONTENT);
    return wanted.filter(function (lang) { return CONTENT[lang] && CONTENT[lang].profile; });
  }

  function pickLanguage(langs) {
    var fromUrl = null;
    try { fromUrl = new URLSearchParams(location.search).get('lang'); } catch (e) { /* old browser */ }
    if (fromUrl && langs.indexOf(fromUrl) > -1) return fromUrl;
    var saved = store.get('lang');
    if (saved && langs.indexOf(saved) > -1) return saved;
    if (langs.indexOf(SETTINGS.defaultLanguage) > -1) return SETTINGS.defaultLanguage;
    return langs[0];
  }

  function switchLanguage(lang) {
    if (!CONTENT[lang] || lang === state.lang) return;
    var anchor = currentSectionId();
    store.set('lang', lang);
    render(lang);
    try {
      var url = new URL(location.href);
      if (lang === (SETTINGS.defaultLanguage || availableLanguages()[0])) url.searchParams.delete('lang');
      else url.searchParams.set('lang', lang);
      history.replaceState(null, '', url.href);
    } catch (e) { /* file:// pages may refuse this — harmless */ }
    if (anchor) {
      var target = doc.getElementById(anchor);
      if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });
    }
    var btn = els.header.querySelector('.lang-btn');
    if (btn) btn.focus({ preventScroll: true });
  }

  function currentSectionId() {
    if (window.scrollY < 80) return null;
    var id = null;
    var limit = els.header.offsetHeight + 16;
    els.main.querySelectorAll('section[id]').forEach(function (sec) {
      if (sec.getBoundingClientRect().top <= limit) id = sec.id;
    });
    return id;
  }

  /* ------------------------------------------------------------------
     Interactions
     ------------------------------------------------------------------ */
  function setMenu(open) {
    els.header.classList.toggle('menu-open', open);
    var btn = els.header.querySelector('.menu-btn');
    if (btn) {
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? t('closeMenu') : t('menu'));
    }
  }

  function bind() {
    var themeBtn = els.header.querySelector('[data-theme-toggle]');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () { setTheme(currentTheme() === 'dark' ? 'light' : 'dark', true); });
    }
    updateThemeButton();

    var langBtn = els.header.querySelector('.lang-btn');
    if (langBtn) {
      langBtn.addEventListener('click', function () { switchLanguage(langBtn.getAttribute('data-lang')); });
    }

    var menuBtn = els.header.querySelector('.menu-btn');
    if (menuBtn) {
      menuBtn.addEventListener('click', function () { setMenu(!els.header.classList.contains('menu-open')); });
    }
    els.header.querySelectorAll('.site-nav a').forEach(function (a) {
      a.addEventListener('click', function () { setMenu(false); });
    });

    els.main.querySelectorAll('.filters').forEach(function (group) {
      group.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-filter]');
        if (!btn) return;
        var value = btn.getAttribute('data-filter');
        group.querySelectorAll('[data-filter]').forEach(function (b) {
          var on = b === btn;
          b.classList.toggle('is-active', on);
          b.setAttribute('aria-pressed', String(on));
        });
        var grid = group.nextElementSibling;
        if (!grid) return;
        grid.querySelectorAll('[data-category]').forEach(function (card) {
          card.hidden = !(value === '*' || card.getAttribute('data-category') === value);
        });
      });
    });

    els.main.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        copyText(btn.getAttribute('data-copy')).then(function () {
          toast(t('copied'));
          btn.innerHTML = icon('check');
          setTimeout(function () { btn.innerHTML = icon('copy'); }, 1600);
        }, function () { /* clipboard blocked — nothing to do */ });
      });
    });

    els.main.querySelectorAll('.portrait img').forEach(function (img) {
      img.addEventListener('error', function () {
        var fig = img.closest('.portrait');
        if (fig) fig.classList.add('portrait--empty');
        img.remove();
      });
    });

    watchSections();
    reveal();
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var area = doc.createElement('textarea');
      area.value = text;
      area.setAttribute('readonly', '');
      area.style.position = 'fixed';
      area.style.opacity = '0';
      doc.body.appendChild(area);
      area.select();
      try { doc.execCommand('copy') ? resolve() : reject(new Error('copy failed')); }
      catch (err) { reject(err); }
      finally { area.remove(); }
    });
  }

  var toastTimer;
  function toast(message) {
    var el = doc.querySelector('.toast');
    if (!el) {
      el = doc.createElement('div');
      el.className = 'toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      doc.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add('is-shown');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.classList.remove('is-shown'); }, 1800);
  }

  // Highlights the menu link of the section currently on screen
  function watchSections() {
    if (!('IntersectionObserver' in window)) return;
    var links = {};
    els.header.querySelectorAll('[data-nav]').forEach(function (a) { links[a.getAttribute('data-nav')] = a; });
    if (!Object.keys(links).length) return;
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        Object.keys(links).forEach(function (id) {
          var on = id === entry.target.id;
          links[id].classList.toggle('is-active', on);
          if (on) links[id].setAttribute('aria-current', 'true');
          else links[id].removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    els.main.querySelectorAll('section[id]').forEach(function (sec) { observer.observe(sec); });
    state.observers.push(observer);
  }

  function animationsOn() {
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return SETTINGS.animations !== false && !reduced && 'IntersectionObserver' in window;
  }

  // Fade elements in as they scroll into view
  function reveal() {
    var items = els.main.querySelectorAll('.reveal');
    if (!animationsOn()) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }
    items.forEach(function (el) {
      var siblings = el.parentElement ? el.parentElement.children : [];
      var index = Array.prototype.indexOf.call(siblings, el);
      el.style.setProperty('--d', Math.min(Math.max(index, 0), 6) * 70 + 'ms');
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });
    items.forEach(function (el) { observer.observe(el); });
    state.observers.push(observer);
  }

  function onScroll() {
    els.header.classList.toggle('is-scrolled', window.scrollY > 8);
  }

  /* ------------------------------------------------------------------
     Render & start
     ------------------------------------------------------------------ */
  function render(lang) {
    var c = CONTENT[lang];
    state.lang = lang;
    state.c = c;
    state.observers.forEach(function (o) { o.disconnect(); });
    state.observers = [];

    root.setAttribute('lang', lang);
    root.setAttribute('dir', c.direction || (RTL_LANGS.test(lang) ? 'rtl' : 'ltr'));

    var meta = c.meta || {};
    var p = c.profile || {};
    doc.title = meta.title || p.name || doc.title;
    var description = doc.querySelector('meta[name="description"]');
    if (description && meta.description) description.setAttribute('content', meta.description);
    var skip = doc.querySelector('.skip-link');
    if (skip) skip.textContent = t('skipLink');

    var sections = visible(c.sections).map(function (s, i) {
      return { s: s, id: String(s.id || 'section-' + (i + 1)) };
    });

    els.header.innerHTML = renderHeader(c, sections);
    els.main.innerHTML = renderHero(c) + sections.map(function (x, i) { return renderSection(x.s, x.id, i); }).join('');
    els.footer.innerHTML = renderFooter(c);
    bind();
    onScroll();
  }

  function showLoadError() {
    var errors = window.__siteErrors || [];
    var details = errors.map(function (e) {
      var file = String(e.file || '').split('/').slice(-2).join('/');
      return '<li><code>' + esc(file || 'unknown file') + (e.line ? ' — line ' + e.line : '') + '</code><br>' + esc(e.message) + '</li>';
    }).join('');
    els.main.innerHTML = '<div class="container site-error">' +
      '<h1>The content could not be loaded</h1>' +
      '<p>Usually this means a small typo in one of the files in the <code>content/</code> folder — ' +
      'a missing comma between items, a missing quote <code>"</code>, or a bracket <code>{ } [ ]</code> that was deleted.</p>' +
      (details ? '<ul>' + details + '</ul>' : '<p>Press <kbd>F12</kbd> and open the <b>Console</b> tab to see the exact file and line.</p>') +
      '<p>Fix it, save the file and refresh this page.</p></div>';
  }

  // A thin warning bar when one of the content files is broken but the site can still show something
  function showWarnings() {
    var messages = [];
    var contentErrors = (window.__siteErrors || []).filter(function (e) { return /\/content\//.test(e.file || ''); });
    contentErrors.forEach(function (e) {
      messages.push(String(e.file).split('/').slice(-2).join('/') + (e.line ? ' (line ' + e.line + ')' : '') + ': ' + e.message);
    });
    if (!window.SITE_SETTINGS && !contentErrors.length) messages.push('content/settings.js could not be read — using default settings.');
    var wanted = Array.isArray(SETTINGS.languages) ? SETTINGS.languages : [];
    wanted.forEach(function (lang) {
      if (!CONTENT[lang] && !contentErrors.length) messages.push('content/' + lang + '.js could not be read, so that language is not shown.');
    });
    if (!messages.length) return;
    console.warn('[portfolio]', messages.join('\n'));
    var bar = doc.createElement('div');
    bar.className = 'site-banner';
    bar.setAttribute('role', 'alert');
    bar.innerHTML = '<strong>Content file error</strong> — ' + messages.map(esc).join('<br>') +
      (contentErrors.length ? '<br>Tip: look for a missing comma, quote or bracket on that line or the line just above it.' : '') +
      '<button type="button" aria-label="Dismiss">' + icon('close') + '</button>';
    bar.querySelector('button').addEventListener('click', function () { bar.remove(); });
    doc.body.insertBefore(bar, doc.body.firstChild);
  }

  function init() {
    if (!els.main) return;
    applyColors();
    if (animationsOn()) root.classList.add('anim');

    var langs = availableLanguages();
    if (!langs.length) { showLoadError(); return; }
    showWarnings();

    render(pickLanguage(langs));

    window.addEventListener('scroll', onScroll, { passive: true });
    doc.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    doc.addEventListener('click', function (e) {
      if (els.header.classList.contains('menu-open') && !els.header.contains(e.target)) setMenu(false);
    });

    // Follow the device theme when the visitor hasn't chosen one and settings say "auto"
    var theme = SETTINGS.theme || {};
    if (theme.default === 'auto' && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        if (!store.get('theme') || !themeToggleEnabled()) setTheme(e.matches ? 'dark' : 'light', false);
      });
    }

    // Opened with a link like  …/#projects  → jump there after building the page
    if (location.hash.length > 1) {
      var target = doc.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) target.scrollIntoView();
    }
  }

  init();
})();
