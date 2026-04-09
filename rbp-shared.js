/**
 * rbp-shared.js — RugbyBoard Pro v2.4
 * Text lang buttons · 3-link nav · Improved mobile drawer · Full i18n
 */
(function () {
  'use strict';

  /* ══════════════════════════════════════════════
     STYLES
  ══════════════════════════════════════════════ */
  const css = `
@view-transition { navigation: auto; }

/* ── NAV ── */
#rbpNav {
  width: 100%; padding: 0 2.5rem; height: 64px;
  display: flex; justify-content: space-between; align-items: center;
  background: rgba(1,4,9,0.97);
  backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(200,255,0,0.12);
  position: sticky; top: 0; z-index: 1000;
  transition: box-shadow .3s, background .3s;
  font-family: 'Montserrat', sans-serif; box-sizing: border-box;
}
#rbpNav.rbp-scrolled { box-shadow: 0 4px 40px rgba(0,0,0,.9); background: rgba(1,4,9,1); }
#rbpNav a { text-decoration: none; }

/* Logo */
.rbp-logo { display: flex; align-items: center; flex-shrink: 0; }
.rbp-logo img { height: 44px; width: auto; display: block; transition: opacity .2s; }
.rbp-logo:hover img { opacity: .8; }

/* Desktop menu */
.rbp-nav-menu { display: flex; gap: 1.6rem; align-items: center; }
.rbp-nav-link {
  color: rgba(240,246,252,.58); font-weight: 600; font-size: .78rem;
  letter-spacing: .05em; text-transform: uppercase;
  transition: color .2s; position: relative; white-space: nowrap;
}
.rbp-nav-link::after {
  content: ''; position: absolute; bottom: -3px; left: 0;
  width: 0; height: 2px; background: #c8ff00; border-radius: 2px; transition: width .2s;
}
.rbp-nav-link:hover, .rbp-nav-link.rbp-active { color: #c8ff00; }
.rbp-nav-link:hover::after, .rbp-nav-link.rbp-active::after { width: 100%; }

/* CTA */
.rbp-nav-cta {
  padding: .52rem 1.1rem; background: #c8ff00; color: #000;
  border: none; border-radius: 8px; font-family: 'Montserrat', sans-serif;
  font-weight: 800; font-size: .75rem; letter-spacing: .05em; text-transform: uppercase;
  cursor: pointer; white-space: nowrap; transition: all .22s;
  box-shadow: 0 0 16px rgba(200,255,0,.45);
}
.rbp-nav-cta:hover { transform: translateY(-2px); box-shadow: 0 0 28px rgba(200,255,0,.65); }

/* ── LANG BUTTONS — text labels, always visible ── */
.rbp-lang-switch { display: flex; gap: .28rem; align-items: center; margin-left: .6rem; }
.rbp-lang-btn {
  height: 28px; padding: 0 .55rem;
  border-radius: 6px;
  border: 1.5px solid rgba(200,255,0,.35);
  background: rgba(200,255,0,.08);
  color: rgba(200,255,0,.75);
  cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800; font-size: .65rem; letter-spacing: .06em;
  transition: all .18s; white-space: nowrap;
}
.rbp-lang-btn:hover {
  border-color: #c8ff00; background: rgba(200,255,0,.2); color: #c8ff00;
  transform: scale(1.05);
}
.rbp-lang-btn.rbp-is-active {
  border-color: #c8ff00; background: rgba(200,255,0,.22);
  color: #c8ff00; box-shadow: 0 0 10px rgba(200,255,0,.4);
}

/* ── BURGER ── */
.rbp-burger-btn {
  display: none; width: 38px; height: 38px; border-radius: 8px;
  border: 1.5px solid rgba(200,255,0,.3); background: rgba(200,255,0,.07);
  cursor: pointer; align-items: center; justify-content: center;
  transition: all .2s; flex-shrink: 0;
}
.rbp-burger-btn:hover { border-color: #c8ff00; background: rgba(200,255,0,.16); }
.rbp-burger-icon { position: relative; width: 16px; height: 12px; display: block; }
.rbp-burger-line {
  position: absolute; left: 0; width: 100%; height: 2px;
  background: #c8ff00; border-radius: 2px;
  transition: transform .22s, top .22s, opacity .18s;
}
.rbp-burger-line.l1 { top: 0; }
.rbp-burger-line.l2 { top: 5px; }
.rbp-burger-line.l3 { top: 10px; }
.rbp-burger-btn.rbp-is-open .rbp-burger-line.l1 { top: 5px; transform: rotate(45deg); }
.rbp-burger-btn.rbp-is-open .rbp-burger-line.l2 { opacity: 0; }
.rbp-burger-btn.rbp-is-open .rbp-burger-line.l3 { top: 5px; transform: rotate(-45deg); }

/* Overlay */
.rbp-menu-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(1,4,9,.85); backdrop-filter: blur(6px); z-index: 998;
}
.rbp-menu-overlay.rbp-is-open { display: block; }

/* ── MOBILE DRAWER — redesigned ── */
.rbp-mobile-drawer {
  position: fixed; top: 0; right: 0;
  width: 300px; max-width: 92vw; height: 100dvh;
  background: #0c1018;
  border-left: 1px solid rgba(200,255,0,.15);
  z-index: 999;
  transform: translateX(100%);
  transition: transform .3s cubic-bezier(.4,0,.2,1);
  display: flex; flex-direction: column;
  font-family: 'Montserrat', sans-serif;
  overflow: hidden;
  box-shadow: -8px 0 40px rgba(0,0,0,.7);
}
.rbp-mobile-drawer.rbp-is-open { transform: translateX(0); }

/* Drawer header */
.rbp-drawer-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(200,255,0,.1);
  flex-shrink: 0; min-width: 0;
}
.rbp-drawer-logo { height: 36px; width: auto; }
.rbp-mobile-close {
  width: 32px; height: 32px; border-radius: 7px;
  border: 1px solid rgba(200,255,0,.3); background: rgba(200,255,0,.07);
  color: rgba(240,246,252,.8); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: .9rem; transition: all .18s;
}
.rbp-mobile-close:hover { border-color: #c8ff00; color: #c8ff00; background: rgba(200,255,0,.14); }

/* Drawer body */
.rbp-drawer-body { flex: 1; overflow-y: auto; padding: .75rem 1.5rem 1.5rem; min-width: 0; }

/* Nav links in drawer */
.rbp-mobile-link {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 0; border-bottom: 1px solid rgba(255,255,255,.05);
  color: rgba(240,246,252,.85); text-decoration: none;
  font-weight: 700; font-size: .95rem; letter-spacing: .04em; text-transform: uppercase;
  transition: color .18s; white-space: nowrap;
}
.rbp-mobile-link:hover, .rbp-mobile-link.rbp-active { color: #c8ff00; }
.rbp-mobile-link .rbp-chev {
  font-size: 1rem; opacity: .35;
  transition: transform .18s, opacity .18s;
}
.rbp-mobile-link:hover .rbp-chev { transform: translateX(3px); opacity: .7; }

/* CTA in drawer */
.rbp-mobile-cta {
  display: block; width: 100%; margin-top: 1.5rem; padding: .92rem;
  background: #c8ff00; color: #000; border: none; border-radius: 9px;
  font-family: 'Montserrat', sans-serif; font-weight: 800;
  font-size: .88rem; letter-spacing: .05em; text-transform: uppercase;
  cursor: pointer; text-align: center;
  transition: opacity .18s, transform .18s;
  box-shadow: 0 0 20px rgba(200,255,0,.35);
}
.rbp-mobile-cta:hover { opacity: .88; transform: translateY(-1px); }

/* Drawer footer — lang */
.rbp-drawer-footer {
  padding: 1rem 1.5rem 1.75rem;
  border-top: 1px solid rgba(200,255,0,.08);
  flex-shrink: 0;
}
.rbp-drawer-footer-label {
  font-size: .62rem; font-weight: 800; letter-spacing: .1em; text-transform: uppercase;
  color: rgba(240,246,252,.35); margin-bottom: .6rem;
}
.rbp-drawer-lang-row { display: flex; gap: .4rem; }
.rbp-drawer-lang-row .rbp-lang-btn {
  flex: 1; height: 34px; font-size: .68rem;
}

/* ── FOOTER ── */
#rbpFooter {
  border-top: 1px solid rgba(255,255,255,.06);
  padding: 4rem 2.5rem 2.5rem;
  font-family: 'Montserrat', sans-serif;
}
.rbp-footer-content { max-width: 1160px; margin: 0 auto; }
.rbp-footer-top {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; margin-bottom: 3rem;
}
.rbp-footer-logo-img { height: 44px; width: auto; display: block; margin-bottom: 1rem; }
.rbp-footer-description { color: rgba(240,246,252,.44); font-size: .8rem; line-height: 1.75; max-width: 230px; }
.rbp-footer-column h4 {
  font-size: .68rem; font-weight: 800; letter-spacing: .1em;
  text-transform: uppercase; color: #c8ff00; margin-bottom: 1rem;
}
.rbp-footer-links { display: flex; flex-direction: column; gap: .6rem; }
.rbp-footer-links a {
  color: rgba(240,246,252,.44); text-decoration: none; font-size: .8rem; font-weight: 500; transition: color .18s;
}
.rbp-footer-links a:hover { color: #c8ff00; }
.rbp-footer-bottom {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 2rem; border-top: 1px solid rgba(255,255,255,.06);
  flex-wrap: wrap; gap: 1rem;
}
.rbp-copyright { color: rgba(240,246,252,.28); font-size: .74rem; }
.rbp-social-links { display: flex; gap: .45rem; }
.rbp-social-icon {
  width: 34px; height: 34px; border-radius: 8px;
  border: 1px solid rgba(255,255,255,.06); background: rgba(255,255,255,.02);
  display: flex; align-items: center; justify-content: center;
  color: rgba(240,246,252,.38); text-decoration: none; font-size: .8rem; transition: all .18s;
}
.rbp-social-icon:hover { border-color: #c8ff00; color: #c8ff00; background: rgba(200,255,0,.08); }

/* ── NAV RESPONSIVE ── */
@media (max-width: 860px) {
  #rbpNav { padding: 0 1.1rem; }
  .rbp-nav-menu { display: none; }
  .rbp-burger-btn { display: inline-flex; }
}
@media (max-width: 420px) {
  #rbpNav { height: 56px; }
  .rbp-logo img { height: 34px; }
}

/* ── FOOTER RESPONSIVE ── */
@media (max-width: 860px) {
  #rbpFooter { padding: 3rem 1.5rem 2rem; }
  .rbp-footer-top { grid-template-columns: 1fr 1fr; gap: 2rem; }
}
@media (max-width: 480px) {
  #rbpFooter { padding: 2.5rem 1rem 1.5rem; }
  .rbp-footer-top { grid-template-columns: 1fr; gap: 1.5rem; }
  .rbp-footer-bottom { flex-direction: column; text-align: center; }
  .rbp-footer-description { max-width: 100%; }
}

[id] { scroll-margin-top: 72px; }

/* Prevent body clipping the drawer */
body { overflow-x: hidden; }
.rbp-mobile-drawer { isolation: isolate; }

`;

  const st = document.createElement('style');
  st.id = 'rbp-shared-styles';
  st.textContent = css;
  document.head.appendChild(st);

  /* ══════════════════════════════════════════════
     TRANSLATIONS
  ══════════════════════════════════════════════ */
  const T = {
    es: {
      navAbout:'Acerca de', navDemo:'Demo', navContact:'Contacto', navCta:'Comenzar Gratis',
      footerDesc:'La plataforma líder para diseño de estrategias y tácticas de rugby.',
      footerProduct:'Producto', footerResources:'Recursos', footerCompany:'Compañía',
      navFeatures:'Características', navPricing:'Precios', navSupport:'Soporte', navDocs:'Docs', footerLegal:'Legal',
      footerText:'© 2025 RugbyBoard Pro by JJwebs Academy. Todos los derechos reservados.',
      heroBadge:'Generación Beta — versión anticipada',
      heroTitle1:'Revoluciona tu', heroTitle2:'Estrategia de Rugby',
      heroSubtitle:'Diseña jugadas profesionales, anima tácticas complejas y comparte estrategias con tu equipo. Todo en una plataforma intuitiva y poderosa.',
      ctaPrimary:'Prueba Gratis ahora', ctaSecondary:'Ver Demo en Vivo',
      stat1Label:'Entrenadores Activos', stat2Label:'Jugadas Creadas', stat3Label:'Países',
      featuresTitle:'Herramientas Pro para Entrenadores',
      featuresSubtitle:'Todo lo que necesitas para crear estrategias ganadoras y comunicarlas de manera efectiva',
      f1Title:'Gestión de Equipos', f1Desc:'Organiza múltiples equipos con jugadores personalizables. Define posiciones, asigna números y configura colores únicos para cada formación.',
      f2Title:'Herramientas de Dibujo Pro', f2Desc:'Crea diagramas precisos con flechas inteligentes, líneas de movimiento y formas vectoriales. Perfecto para estrategias complejas.',
      f3Title:'Animación e Interacción', f3Desc:'Aporta dinamismo a tus jugadas capturando cada movimiento en el tablero. Las animaciones generan un impacto visual atractivo.',
      f4Title:'Biblioteca de Jugadas', f4Desc:'Almacena y organiza todas tus estrategias. Busca, filtra y reutiliza jugadas guardadas con etiquetas personalizadas.',
      f5Title:'Personalización Total', f5Desc:'Adapta cada aspecto visual: campos, jugadores, colores de equipo y estilos de dibujo según tu marca.',
      f6Title:'Colaboración en Tiempo Real', f6Desc:'Comparte jugadas con tu staff técnico. Trabaja simultáneamente y recibe feedback instantáneo de tu equipo.',
      pricingTitle:'Planes Para Tu Equipo', pricingSubtitle:'Elige el plan que mejor se adapte. Todos incluyen prueba gratuita.',
      perMonth:'/mes', starterDesc:'Perfecto para entrenadores individuales',
      mostPopular:'Más popular', proName:'Profesional', proDesc:'Para entrenadores serios y staff técnico',
      clubDesc:'Para organizaciones y clubes deportivos',
      s1:'Sin edición de equipos', s2:'5 jugadas guardadas', s3:'Exportar como imagen', s4:'Animaciones básicas', s5:'Soporte por email',
      p1:'Edición de equipos', p2:'Jugadas ilimitadas', p3:'Exportar y compartir jugadas', p4:'Animaciones avanzadas', p5:'Biblioteca compartida', p6:'Soporte prioritario',
      c1:'Todo lo de Profesional', c2:'12 usuarios incluidos', c3:'10 horas capacitación PRO', c4:'Marca personalizada', c5:'Integración web y redes', c6:'Soporte 24/7',
      Free:'GRATIS', startTrial:'Comenzar prueba', contactSales:'Contactar ventas',
      testimonialQuote:'"RugbyBoard Pro ha transformado la forma en que preparamos nuestras estrategias. Las animaciones nos permiten comunicar jugadas complejas de manera profesional."',
      testimonialAuthor:'Guido Quadri', testimonialRole:'Entrenador Principal — Bologna Rugby Club',
      ctaTitle:'¿Listo para revolucionar tu estrategia?',
      ctaText:'Únete a miles de entrenadores que ya crean jugadas ganadoras con RugbyBoard Pro.',
      ctaButton:'Comienza tu prueba gratuita',
    },
    en: {
      navAbout:'About', navDemo:'Demo', navContact:'Contact', navCta:'Start Free',
      footerDesc:'The leading platform for rugby strategy and tactics design.',
      footerProduct:'Product', footerResources:'Resources', footerCompany:'Company',
      navFeatures:'Features', navPricing:'Pricing', navSupport:'Support', navDocs:'Docs', footerLegal:'Legal',
      footerText:'© 2025 RugbyBoard Pro by JJwebs Academy. All rights reserved.',
      heroBadge:'Beta Generation — Early Access',
      heroTitle1:'Revolutionize your', heroTitle2:'Rugby Strategy',
      heroSubtitle:'Design professional plays, animate complex tactics and share strategies with your team. All in one intuitive and powerful platform.',
      ctaPrimary:'Try Free Now', ctaSecondary:'Watch Live Demo',
      stat1Label:'Active Coaches', stat2Label:'Plays Created', stat3Label:'Countries',
      featuresTitle:'Pro Tools for Coaches',
      featuresSubtitle:'Everything you need to build winning strategies and communicate them effectively',
      f1Title:'Team Management', f1Desc:'Organize multiple teams with customizable players. Set positions, assign numbers and configure unique colors for each lineup.',
      f2Title:'Pro Drawing Tools', f2Desc:'Create precise diagrams with smart arrows, movement lines and vector shapes. Perfect for complex strategies.',
      f3Title:'Animation & Interaction', f3Desc:'Bring plays to life by capturing every movement on the board. Animations create a visually engaging experience.',
      f4Title:'Play Library', f4Desc:'Store and organize all your strategies. Search, filter and reuse saved plays with custom tags.',
      f5Title:'Full Customization', f5Desc:'Customize every visual detail: fields, players, team colors and drawing styles to match your brand.',
      f6Title:'Real-Time Collaboration', f6Desc:'Share plays with your coaching staff. Work simultaneously and get instant feedback from your team.',
      pricingTitle:'Plans Built for Your Team', pricingSubtitle:'Choose the plan that fits your needs. All include a free trial.',
      perMonth:'/month', starterDesc:'Perfect for individual coaches',
      mostPopular:'Most Popular', proName:'Professional', proDesc:'For serious coaches and staff',
      clubDesc:'For sports clubs and organizations',
      s1:'No team editing', s2:'5 saved plays', s3:'Export as image', s4:'Basic animations', s5:'Email support',
      p1:'Team editing', p2:'Unlimited plays', p3:'Export & share plays', p4:'Advanced animations', p5:'Shared library', p6:'Priority support',
      c1:'Everything in Professional', c2:'12 users included', c3:'10 hours PRO training', c4:'Custom branding', c5:'Website & social integration', c6:'24/7 support',
      Free:'FREE', startTrial:'Start Trial', contactSales:'Contact Sales',
      testimonialQuote:'"RugbyBoard Pro completely changed how we prepare our strategies. Animations help us communicate complex plays professionally."',
      testimonialAuthor:'Guido Quadri', testimonialRole:'Head Coach — Bologna Rugby Club',
      ctaTitle:'Ready to revolutionize your strategy?',
      ctaText:'Join thousands of coaches already creating winning plays with RugbyBoard Pro.',
      ctaButton:'Start your free trial',
    },
    it: {
      navAbout:'Chi siamo', navDemo:'Demo', navContact:'Contatto', navCta:'Inizia Gratis',
      footerDesc:'La piattaforma leader per progettare strategie e tattiche di rugby.',
      footerProduct:'Prodotto', footerResources:'Risorse', footerCompany:'Azienda',
      navFeatures:'Funzionalità', navPricing:'Prezzi', navSupport:'Supporto', navDocs:'Docs', footerLegal:'Legale',
      footerText:'© 2025 RugbyBoard Pro by JJwebs Academy. Tutti i diritti riservati.',
      heroBadge:'Generazione Beta — Accesso Anticipato',
      heroTitle1:'Rivoluziona la tua', heroTitle2:'Strategia di Rugby',
      heroSubtitle:"Progetta schemi professionali, anima tattiche complesse e condividi strategie con la tua squadra. Tutto in una piattaforma intuitiva e potente.",
      ctaPrimary:'Prova Gratis ora', ctaSecondary:'Guarda la Demo Live',
      stat1Label:'Allenatori Attivi', stat2Label:'Schemi Creati', stat3Label:'Paesi',
      featuresTitle:'Strumenti Pro per Allenatori',
      featuresSubtitle:'Tutto ciò che ti serve per creare strategie vincenti e comunicarle efficacemente',
      f1Title:'Gestione Squadre', f1Desc:'Organizza più squadre con giocatori personalizzabili. Ruoli, numeri e colori unici per ogni formazione.',
      f2Title:'Strumenti di Disegno Pro', f2Desc:'Crea diagrammi precisi con frecce intelligenti e linee di movimento. Perfetto per strategie complesse.',
      f3Title:'Animazione e Interazione', f3Desc:"Dai vita agli schemi catturando ogni movimento sulla lavagna. Le animazioni rendono l'esperienza visivamente coinvolgente.",
      f4Title:'Libreria di Schemi', f4Desc:'Archivia e organizza tutte le strategie. Cerca, filtra e riutilizza gli schemi salvati con tag personalizzati.',
      f5Title:'Personalizzazione Totale', f5Desc:'Personalizza campi, giocatori, colori della squadra e stili di disegno secondo il tuo brand.',
      f6Title:'Collaborazione in Tempo Reale', f6Desc:'Condividi gli schemi con lo staff tecnico. Lavora in simultanea e ricevi feedback immediato.',
      pricingTitle:'Piani per la Tua Squadra', pricingSubtitle:'Scegli il piano più adatto. Tutti includono una prova gratuita.',
      perMonth:'/mese', starterDesc:'Perfetto per allenatori individuali',
      mostPopular:'Più Popolare', proName:'Professionale', proDesc:'Per allenatori seri e staff tecnico',
      clubDesc:'Per club sportivi e organizzazioni',
      s1:'Nessuna modifica squadre', s2:'5 schemi salvati', s3:'Esporta come immagine', s4:'Animazioni base', s5:'Supporto via email',
      p1:'Modifica squadre', p2:'Schemi illimitati', p3:'Esporta e condividi schemi', p4:'Animazioni avanzate', p5:'Libreria condivisa', p6:'Supporto prioritario',
      c1:'Tutto di Professionale', c2:'12 utenti inclusi', c3:'10 ore formazione PRO', c4:'Brand personalizzato', c5:'Integrazione sito e social', c6:'Supporto 24/7',
      Free:'GRATIS', startTrial:'Avvia la Prova', contactSales:'Contatta le Vendite',
      testimonialQuote:'"RugbyBoard Pro ha trasformato il modo in cui prepariamo le nostre strategie. Le animazioni ci permettono di comunicare schemi complessi professionalmente."',
      testimonialAuthor:'Guido Quadri', testimonialRole:'Head Coach — Bologna Rugby Club',
      ctaTitle:'Pronto a rivoluzionare la tua strategia?',
      ctaText:'Unisciti a migliaia di allenatori che creano schemi vincenti con RugbyBoard Pro.',
      ctaButton:'Inizia la tua prova gratuita',
    }
  };

  /* ══════════════════════════════════════════════
     ACTIVE PAGE
  ══════════════════════════════════════════════ */
  const page = location.pathname.split('/').pop() || 'index.html';
  const isActive = h => {
    if (h.startsWith('#')) return false;
    const p = h.split('/').pop().split('#')[0];
    return p === page || (page === '' && p === 'index.html');
  };

  let currentLang = localStorage.getItem('rbp-lang') || 'es';

  /* Lang button HTML — text labels (no emoji, cross-browser safe) */
  const LANGS = [
    { code:'es', label:'ES' },
    { code:'en', label:'US' },
    { code:'it', label:'IT' },
  ];
  function langBtns() {
    return LANGS.map(l =>
      `<button class="rbp-lang-btn${currentLang===l.code?' rbp-is-active':''}" data-rbp-lang="${l.code}" type="button">${l.label}</button>`
    ).join('');
  }

  /* ══════════════════════════════════════════════
     BUILD NAV
  ══════════════════════════════════════════════ */
  function buildNav(d) {
    const links = [
      { href:'acercade.html', key:'navAbout'   },
      { href:'demo.html',     key:'navDemo'    },
      { href:'contacto.html', key:'navContact' },
    ];
    const desk = links.map(l =>
      `<a href="${l.href}" class="rbp-nav-link${isActive(l.href)?' rbp-active':''}" data-rbp-i18n="${l.key}">${d[l.key]}</a>`
    ).join('');
    const mob = links.map(l =>
      `<a href="${l.href}" class="rbp-mobile-link${isActive(l.href)?' rbp-active':''}" data-rbp-i18n="${l.key}">${d[l.key]}<span class="rbp-chev">›</span></a>`
    ).join('');

    return `
<nav id="rbpNav" role="navigation" aria-label="Navegación principal">
  <a class="rbp-logo" href="index.html" aria-label="RugbyBoard Pro">
    <img src="rbp_Italic.png" alt="RugbyBoard Pro" width="140" height="44"/>
  </a>
  <div class="rbp-nav-menu">
    ${desk}
    <a href="https://rugbyboardpro.com/boardpro.html" rel="noopener noreferrer">
      <button class="rbp-nav-cta" data-rbp-i18n="navCta">${d.navCta}</button>
    </a>
    <div class="rbp-lang-switch" aria-label="Idioma">${langBtns()}</div>
  </div>
  <button class="rbp-burger-btn" id="rbpBurger" aria-label="Abrir menú" aria-expanded="false" type="button">
    <span class="rbp-burger-icon" aria-hidden="true">
      <span class="rbp-burger-line l1"></span>
      <span class="rbp-burger-line l2"></span>
      <span class="rbp-burger-line l3"></span>
    </span>
  </button>
</nav>
<div class="rbp-menu-overlay" id="rbpOverlay"></div>
<div class="rbp-mobile-drawer" id="rbpDrawer" role="dialog" aria-modal="true" aria-label="Menú">
  <div class="rbp-drawer-header">
    <img src="rbp_Italic.png" alt="RugbyBoard Pro" class="rbp-drawer-logo"/>
    <button class="rbp-mobile-close" id="rbpDrawerClose" type="button" aria-label="Cerrar">✕</button>
  </div>
  <div class="rbp-drawer-body">
    ${mob}
    <a href="https://rugbyboardpro.com/boardpro.html" rel="noopener noreferrer" style="display:block">
      <button class="rbp-mobile-cta" data-rbp-i18n="navCta">${d.navCta}</button>
    </a>
  </div>
  <div class="rbp-drawer-footer">
    <div class="rbp-drawer-footer-label">Idioma / Language</div>
    <div class="rbp-drawer-lang-row">${langBtns()}</div>
  </div>
</div>`;
  }

  /* ══════════════════════════════════════════════
     BUILD FOOTER
  ══════════════════════════════════════════════ */
  function buildFooter(d) {
    return `
<footer id="rbpFooter" role="contentinfo">
  <div class="rbp-footer-content">
    <div class="rbp-footer-top">
      <div>
        <a href="index.html"><img src="rbp_Italic.png" alt="RugbyBoard Pro" class="rbp-footer-logo-img" width="140" height="44" loading="lazy"/></a>
        <p class="rbp-footer-description" data-rbp-i18n="footerDesc">${d.footerDesc}</p>
      </div>
      <div class="rbp-footer-column">
        <h4 data-rbp-i18n="footerProduct">${d.footerProduct}</h4>
        <div class="rbp-footer-links">
          <a href="index.html#features" data-rbp-i18n="navFeatures">${d.navFeatures}</a>
          <a href="index.html#pricing"  data-rbp-i18n="navPricing">${d.navPricing}</a>
          <a href="demo.html"           data-rbp-i18n="navDemo">${d.navDemo}</a>
          <a href="soporte.html"        data-rbp-i18n="navSupport">${d.navSupport}</a>
        </div>
      </div>
      <div class="rbp-footer-column">
        <h4 data-rbp-i18n="footerResources">${d.footerResources}</h4>
        <div class="rbp-footer-links">
          <a href="document.html" data-rbp-i18n="navDocs">${d.navDocs}</a>
          <a href="soporte.html"  data-rbp-i18n="navSupport">${d.navSupport}</a>
        </div>
      </div>
      <div class="rbp-footer-column">
        <h4 data-rbp-i18n="footerCompany">${d.footerCompany}</h4>
        <div class="rbp-footer-links">
          <a href="acercade.html"  data-rbp-i18n="navAbout">${d.navAbout}</a>
          <a href="contacto.html"  data-rbp-i18n="navContact">${d.navContact}</a>
          <a href="#"              data-rbp-i18n="footerLegal">${d.footerLegal}</a>
        </div>
      </div>
    </div>
    <div class="rbp-footer-bottom">
      <small class="rbp-copyright" data-rbp-i18n="footerText">${d.footerText}</small>
      <div class="rbp-social-links">
        <a href="#" class="rbp-social-icon" aria-label="Twitter"   rel="noopener noreferrer"><i class="fab fa-x-twitter"></i></a>
        <a href="#" class="rbp-social-icon" aria-label="Facebook"  rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
        <a href="#" class="rbp-social-icon" aria-label="Instagram" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
        <a href="#" class="rbp-social-icon" aria-label="LinkedIn"  rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
        <a href="#" class="rbp-social-icon" aria-label="YouTube"   rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
  </div>
</footer>`;
  }

  /* ══════════════════════════════════════════════
     INJECT
  ══════════════════════════════════════════════ */
  const wrapper = document.querySelector('.content-wrapper') || document.body;
  const navRoot = document.createElement('div');
  const ftrRoot = document.createElement('div');
  navRoot.id = 'rbp-nav-root';
  ftrRoot.id  = 'rbp-footer-root';

  let navDone = false, ftrDone = false;
  for (const node of Array.from(wrapper.childNodes)) {
    if (node.nodeType === 8) {
      const v = node.nodeValue.trim();
      if (v === 'RBP_NAV'    && !navDone) { wrapper.insertBefore(navRoot, node); wrapper.removeChild(node); navDone = true; }
      if (v === 'RBP_FOOTER' && !ftrDone) { wrapper.insertBefore(ftrRoot, node); wrapper.removeChild(node); ftrDone = true; }
    }
  }
  if (!navDone) wrapper.insertBefore(navRoot, wrapper.firstChild);
  if (!ftrDone) wrapper.appendChild(ftrRoot);

  /* ══════════════════════════════════════════════
     LANGUAGE ENGINE
  ══════════════════════════════════════════════ */
  function applyLang(lang) {
    const d = T[lang] || T.es;
    currentLang = lang;
    navRoot.innerHTML = buildNav(d);
    ftrRoot.innerHTML = buildFooter(d);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = d[el.dataset.i18n];
      if (v !== undefined) el.textContent = v;
    });
    document.querySelectorAll('[data-rbp-i18n]').forEach(el => {
      const v = d[el.dataset.rbpI18n];
      if (v !== undefined) el.textContent = v;
    });
    document.querySelectorAll('.rbp-lang-btn').forEach(b =>
      b.classList.toggle('rbp-is-active', b.dataset.rbpLang === lang)
    );
    document.documentElement.lang = lang;
    localStorage.setItem('rbp-lang', lang);
    bindEvents();
  }

  /* ══════════════════════════════════════════════
     EVENTS
  ══════════════════════════════════════════════ */
  function bindEvents() {
    const burger   = document.getElementById('rbpBurger');
    const closeBtn = document.getElementById('rbpDrawerClose');
    const overlay  = document.getElementById('rbpOverlay');
    const drawer   = document.getElementById('rbpDrawer');
    const nav      = document.getElementById('rbpNav');
    if (!burger) return;

    const open = () => {
      [burger, overlay, drawer].forEach(e => e.classList.add('rbp-is-open'));
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      setTimeout(() => drawer.querySelector('a,button')?.focus(), 60);
    };
    const close = () => {
      [burger, overlay, drawer].forEach(e => e.classList.remove('rbp-is-open'));
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    burger.addEventListener('click', () => drawer.classList.contains('rbp-is-open') ? close() : open());
    closeBtn?.addEventListener('click', close);
    overlay.addEventListener('click', close);
    drawer.addEventListener('click', e => { if (e.target.matches('a') || e.target.closest('a')) close(); });
    window.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
    window.addEventListener('resize',  () => { if (window.innerWidth > 860) close(); });

    const onScroll = () => nav?.classList.toggle('rbp-scrolled', window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    document.querySelectorAll('.rbp-lang-btn').forEach(b =>
      b.addEventListener('click', () => applyLang(b.dataset.rbpLang))
    );
  }

  /* ══════════════════════════════════════════════
     INIT
  ══════════════════════════════════════════════ */
  applyLang(currentLang);
})();
