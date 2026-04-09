/**
 * rbp-shared.js — RugbyBoard Pro v2.2
 * Nav simplificado · Footer · i18n completo · Responsive
 */
(function () {
  'use strict';

  /* ══════════════════════════════════════════════
     1. STYLES
  ══════════════════════════════════════════════ */
  const css = `
@view-transition { navigation: auto; }

/* ── NAV ── */
#rbpNav {
  width: 100%;
  padding: 0 2.5rem;
  height: 68px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(1,4,9,0.95);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border-bottom: 1px solid rgba(200,255,0,0.12);
  position: sticky;
  top: 0;
  z-index: 1000;
  transition: box-shadow .3s, background .3s;
  font-family: 'Montserrat', sans-serif;
  box-sizing: border-box;
}
#rbpNav.rbp-scrolled {
  box-shadow: 0 4px 40px rgba(0,0,0,.8);
  background: rgba(1,4,9,0.98);
}
#rbpNav a { text-decoration: none; }

/* Logo */
.rbp-logo { display: flex; align-items: center; flex-shrink: 0; }
.rbp-logo img { height: 46px; width: auto; display: block; transition: opacity .2s; }
.rbp-logo:hover img { opacity: .82; }

/* Desktop links */
.rbp-nav-menu { display: flex; gap: 1.6rem; align-items: center; }
.rbp-nav-link {
  color: rgba(240,246,252,.6);
  font-weight: 600; font-size: .78rem;
  letter-spacing: .05em; text-transform: uppercase;
  transition: color .2s; position: relative; white-space: nowrap;
}
.rbp-nav-link::after {
  content: ''; position: absolute; bottom: -4px; left: 0;
  width: 0; height: 2px; background: #c8ff00;
  border-radius: 2px; transition: width .2s;
}
.rbp-nav-link:hover,
.rbp-nav-link.rbp-active { color: #c8ff00; }
.rbp-nav-link:hover::after,
.rbp-nav-link.rbp-active::after { width: 100%; }

/* CTA */
.rbp-nav-cta {
  padding: .55rem 1.15rem;
  background: #c8ff00; color: #000;
  border: none; border-radius: 9px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 800; font-size: .75rem;
  letter-spacing: .05em; text-transform: uppercase;
  cursor: pointer; white-space: nowrap;
  transition: all .22s;
  box-shadow: 0 0 16px rgba(200,255,0,.4);
}
.rbp-nav-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 28px rgba(200,255,0,.6);
}

/* ── LANG SWITCH — flags with visible background ── */
.rbp-lang-switch {
  display: flex; gap: .25rem; align-items: center; margin-left: .5rem;
}
.rbp-lang-btn {
  width: 30px; height: 30px; border-radius: 7px;
  border: 1.5px solid rgba(200,255,0,.25);
  background: rgba(200,255,0,.08);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  font-size: 16px; line-height: 1; padding: 0;
  transition: all .18s; position: relative;
}
.rbp-lang-btn:hover {
  border-color: rgba(200,255,0,.7);
  background: rgba(200,255,0,.18);
  transform: scale(1.1);
}
.rbp-lang-btn.rbp-is-active {
  border-color: #c8ff00;
  background: rgba(200,255,0,.22);
  box-shadow: 0 0 10px rgba(200,255,0,.4);
}
/* Force emoji rendering */
.rbp-lang-btn span { font-style: normal; }

/* Burger */
.rbp-burger-btn {
  display: none; width: 40px; height: 40px;
  border-radius: 9px;
  border: 1.5px solid rgba(200,255,0,.25);
  background: rgba(200,255,0,.06);
  cursor: pointer; align-items: center; justify-content: center;
  transition: all .2s; flex-shrink: 0;
}
.rbp-burger-btn:hover {
  border-color: #c8ff00;
  background: rgba(200,255,0,.14);
}
.rbp-burger-icon { position: relative; width: 18px; height: 13px; display: block; }
.rbp-burger-line {
  position: absolute; left: 0; width: 100%; height: 2px;
  background: #f0f6fc; border-radius: 2px;
  transition: transform .22s, top .22s, opacity .18s;
}
.rbp-burger-line.l1 { top: 0; }
.rbp-burger-line.l2 { top: 6px; }
.rbp-burger-line.l3 { top: 12px; }
.rbp-burger-btn.rbp-is-open .rbp-burger-line.l1 { top: 6px; transform: rotate(45deg); }
.rbp-burger-btn.rbp-is-open .rbp-burger-line.l2 { opacity: 0; }
.rbp-burger-btn.rbp-is-open .rbp-burger-line.l3 { top: 6px; transform: rotate(-45deg); }

/* Overlay */
.rbp-menu-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(1,4,9,.82);
  backdrop-filter: blur(6px); z-index: 998;
}
.rbp-menu-overlay.rbp-is-open { display: block; }

/* Mobile drawer */
.rbp-mobile-drawer {
  position: fixed; top: 0; right: 0;
  width: min(290px,88vw); height: 100dvh;
  background: #0b0f17;
  border-left: 1px solid rgba(200,255,0,.12);
  z-index: 999;
  transform: translateX(100%);
  transition: transform .28s cubic-bezier(.4,0,.2,1);
  overflow-y: auto; padding: 4.5rem 1.25rem 2rem;
  font-family: 'Montserrat', sans-serif;
}
.rbp-mobile-drawer.rbp-is-open { transform: translateX(0); }
.rbp-mobile-close {
  position: absolute; top: .9rem; right: .9rem;
  width: 34px; height: 34px; border-radius: 7px;
  border: 1px solid rgba(200,255,0,.25);
  background: rgba(200,255,0,.06);
  color: #f0f6fc; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: .95rem; transition: all .18s;
}
.rbp-mobile-close:hover { border-color: #c8ff00; color: #c8ff00; }
.rbp-mobile-link {
  display: flex; justify-content: space-between; align-items: center;
  padding: .85rem 0; border-bottom: 1px solid rgba(255,255,255,.06);
  color: #f0f6fc; text-decoration: none;
  font-weight: 600; font-size: .85rem;
  letter-spacing: .05em; text-transform: uppercase; transition: color .18s;
}
.rbp-mobile-link:hover,
.rbp-mobile-link.rbp-active { color: #c8ff00; }
.rbp-mobile-link .rbp-chev { opacity: .28; font-size: .9rem; }
.rbp-mobile-cta {
  display: block; width: 100%; margin-top: 1.4rem; padding: .85rem;
  background: #c8ff00; color: #000; border: none; border-radius: 9px;
  font-family: 'Montserrat', sans-serif; font-weight: 800;
  font-size: .85rem; letter-spacing: .05em; text-transform: uppercase;
  cursor: pointer; text-align: center; transition: opacity .18s;
}
.rbp-mobile-cta:hover { opacity: .86; }
.rbp-mobile-lang-row {
  display: flex; gap: .4rem; align-items: center; margin-top: 1.5rem;
}
.rbp-mobile-lang-label {
  font-size: .68rem; font-weight: 700; letter-spacing: .1em;
  text-transform: uppercase; color: rgba(240,246,252,.4); margin-right: .3rem;
}

/* ── FOOTER ── */
#rbpFooter {
  border-top: 1px solid rgba(255,255,255,.06);
  padding: 4rem 2.5rem 2.5rem;
  font-family: 'Montserrat', sans-serif;
}
.rbp-footer-content { max-width: 1160px; margin: 0 auto; }
.rbp-footer-top {
  display: grid; grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem; margin-bottom: 3rem;
}
.rbp-footer-logo-img { height: 46px; width: auto; display: block; margin-bottom: 1rem; }
.rbp-footer-description { color: rgba(240,246,252,.45); font-size: .8rem; line-height: 1.75; max-width: 230px; }
.rbp-footer-column h4 {
  font-size: .68rem; font-weight: 800; letter-spacing: .1em;
  text-transform: uppercase; color: #c8ff00; margin-bottom: 1rem;
}
.rbp-footer-links { display: flex; flex-direction: column; gap: .6rem; }
.rbp-footer-links a {
  color: rgba(240,246,252,.45); text-decoration: none;
  font-size: .8rem; font-weight: 500; transition: color .18s;
}
.rbp-footer-links a:hover { color: #c8ff00; }
.rbp-footer-bottom {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 2rem; border-top: 1px solid rgba(255,255,255,.06);
  flex-wrap: wrap; gap: 1rem;
}
.rbp-copyright { color: rgba(240,246,252,.3); font-size: .74rem; }
.rbp-social-links { display: flex; gap: .45rem; }
.rbp-social-icon {
  width: 34px; height: 34px; border-radius: 8px;
  border: 1px solid rgba(255,255,255,.06);
  background: rgba(255,255,255,.02);
  display: flex; align-items: center; justify-content: center;
  color: rgba(240,246,252,.4); text-decoration: none; font-size: .8rem;
  transition: all .18s;
}
.rbp-social-icon:hover { border-color: #c8ff00; color: #c8ff00; background: rgba(200,255,0,.08); }

/* ── RESPONSIVE — Nav ── */
@media (max-width: 900px) {
  #rbpNav { padding: 0 1.25rem; }
  .rbp-nav-menu { display: none; }
  .rbp-burger-btn { display: inline-flex; }
}

/* ── RESPONSIVE — Footer ── */
@media (max-width: 860px) {
  #rbpFooter { padding: 3rem 1.5rem 2rem; }
  .rbp-footer-top { grid-template-columns: 1fr 1fr; gap: 2rem; }
}
@media (max-width: 480px) {
  #rbpFooter { padding: 2.5rem 1rem 1.5rem; }
  .rbp-footer-top { grid-template-columns: 1fr; gap: 1.5rem; }
  .rbp-footer-bottom { flex-direction: column; text-align: center; }
}

/* ── Anchor offset for sticky nav ── */
[id] { scroll-margin-top: 80px; }
`;

  const st = document.createElement('style');
  st.id = 'rbp-shared-styles';
  st.textContent = css;
  document.head.appendChild(st);

  /* ══════════════════════════════════════════════
     2. TRANSLATIONS
  ══════════════════════════════════════════════ */
  const T = {
    es: {
      /* nav */
      navAbout:'Acerca de', navDemo:'Demo', navContact:'Contacto', navCta:'Comenzar Gratis',
      /* footer */
      footerDesc:'La plataforma líder para diseño de estrategias y tácticas de rugby.',
      footerProduct:'Producto', footerResources:'Recursos', footerCompany:'Compañía',
      navFeatures:'Características', navPricing:'Precios', navSupport:'Soporte',
      navDocs:'Docs', footerLegal:'Legal',
      footerText:'© 2025 RugbyBoard Pro by JJwebs Academy. Todos los derechos reservados.',
      /* index */
      heroBadge:'Generación Beta — versión anticipada',
      heroTitle1:'Revoluciona tu', heroTitle2:'Estrategia de Rugby',
      heroSubtitle:'Diseña jugadas profesionales, anima tácticas complejas y comparte estrategias con tu equipo. Todo en una plataforma intuitiva y poderosa.',
      ctaPrimary:'Prueba Gratis ahora', ctaSecondary:'Ver Demo en Vivo',
      stat1Label:'Entrenadores Activos', stat2Label:'Jugadas Creadas', stat3Label:'Países',
      featuresTitle:'Herramientas Pro para Entrenadores',
      featuresSubtitle:'Todo lo que necesitas para crear estrategias ganadoras y comunicarlas de manera efectiva',
      f1Title:'Gestión de Equipos', f1Desc:'Organiza múltiples equipos con jugadores personalizables. Define posiciones, asigna números y configura colores únicos.',
      f2Title:'Herramientas de Dibujo Pro', f2Desc:'Crea diagramas precisos con flechas inteligentes, líneas de movimiento y formas vectoriales.',
      f3Title:'Animación e Interacción', f3Desc:'Aporta dinamismo a tus jugadas capturando cada movimiento en el tablero.',
      f4Title:'Biblioteca de Jugadas', f4Desc:'Almacena y organiza todas tus estrategias. Busca, filtra y reutiliza jugadas.',
      f5Title:'Personalización Total', f5Desc:'Adapta cada aspecto visual: campos, jugadores, colores de equipo y estilos.',
      f6Title:'Colaboración en Tiempo Real', f6Desc:'Comparte jugadas con tu staff técnico. Trabaja simultáneamente.',
      pricingTitle:'Planes Para Tu Equipo',
      pricingSubtitle:'Elige el plan que mejor se adapte. Todos incluyen prueba gratuita.',
      perMonth:'/mes', starterDesc:'Perfecto para entrenadores individuales',
      mostPopular:'Más popular', proName:'Profesional',
      proDesc:'Para entrenadores serios y staff técnico',
      clubDesc:'Para organizaciones y clubes deportivos',
      s1:'Sin edición de equipos', s2:'5 jugadas guardadas', s3:'Exportar como imagen',
      s4:'Animaciones básicas', s5:'Soporte por email',
      p1:'Edición de equipos', p2:'Jugadas ilimitadas', p3:'Exportar y compartir jugadas',
      p4:'Animaciones avanzadas', p5:'Biblioteca compartida', p6:'Soporte prioritario',
      c1:'Todo lo de Profesional', c2:'12 usuarios incluidos', c3:'10 horas capacitación PRO',
      c4:'Marca personalizada', c5:'Integración web y redes', c6:'Soporte 24/7',
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
      navFeatures:'Features', navPricing:'Pricing', navSupport:'Support',
      navDocs:'Docs', footerLegal:'Legal',
      footerText:'© 2025 RugbyBoard Pro by JJwebs Academy. All rights reserved.',
      heroBadge:'Beta Generation — Early Access',
      heroTitle1:'Revolutionize your', heroTitle2:'Rugby Strategy',
      heroSubtitle:'Design professional plays, animate complex tactics and share strategies with your team. All in one intuitive and powerful platform.',
      ctaPrimary:'Try Free Now', ctaSecondary:'Watch Live Demo',
      stat1Label:'Active Coaches', stat2Label:'Plays Created', stat3Label:'Countries',
      featuresTitle:'Pro Tools for Coaches',
      featuresSubtitle:'Everything you need to build winning strategies and communicate them effectively',
      f1Title:'Team Management', f1Desc:'Organize multiple teams with customizable players. Set positions, assign numbers and unique colors.',
      f2Title:'Pro Drawing Tools', f2Desc:'Create precise diagrams with smart arrows, movement lines and vector shapes.',
      f3Title:'Animation & Interaction', f3Desc:'Bring plays to life by capturing every movement on the board.',
      f4Title:'Play Library', f4Desc:'Store and organize all your strategies. Search, filter and reuse plays.',
      f5Title:'Full Customization', f5Desc:'Customize every visual detail: fields, players, team colors and styles.',
      f6Title:'Real-Time Collaboration', f6Desc:'Share plays with your coaching staff. Work simultaneously.',
      pricingTitle:'Plans Built for Your Team',
      pricingSubtitle:'Choose the plan that fits your needs. All include a free trial.',
      perMonth:'/month', starterDesc:'Perfect for individual coaches',
      mostPopular:'Most Popular', proName:'Professional',
      proDesc:'For serious coaches and staff', clubDesc:'For sports clubs and organizations',
      s1:'No team editing', s2:'5 saved plays', s3:'Export as image',
      s4:'Basic animations', s5:'Email support',
      p1:'Team editing', p2:'Unlimited plays', p3:'Export & share plays',
      p4:'Advanced animations', p5:'Shared library', p6:'Priority support',
      c1:'Everything in Professional', c2:'12 users included', c3:'10 hours PRO training',
      c4:'Custom branding', c5:'Website & social integration', c6:'24/7 support',
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
      navFeatures:'Funzionalità', navPricing:'Prezzi', navSupport:'Supporto',
      navDocs:'Docs', footerLegal:'Legale',
      footerText:'© 2025 RugbyBoard Pro by JJwebs Academy. Tutti i diritti riservati.',
      heroBadge:'Generazione Beta — Accesso Anticipato',
      heroTitle1:'Rivoluziona la tua', heroTitle2:'Strategia di Rugby',
      heroSubtitle:'Progetta schemi professionali, anima tattiche complesse e condividi strategie con la tua squadra. Tutto in una piattaforma intuitiva e potente.',
      ctaPrimary:'Prova Gratis ora', ctaSecondary:'Guarda la Demo Live',
      stat1Label:'Allenatori Attivi', stat2Label:'Schemi Creati', stat3Label:'Paesi',
      featuresTitle:'Strumenti Pro per Allenatori',
      featuresSubtitle:'Tutto ciò che ti serve per creare strategie vincenti e comunicarle efficacemente',
      f1Title:'Gestione Squadre', f1Desc:'Organizza più squadre con giocatori personalizzabili. Ruoli, numeri e colori unici.',
      f2Title:'Strumenti di Disegno Pro', f2Desc:'Crea diagrammi precisi con frecce intelligenti e linee di movimento.',
      f3Title:'Animazione e Interazione', f3Desc:"Dai vita agli schemi catturando ogni movimento sulla lavagna.",
      f4Title:'Libreria di Schemi', f4Desc:'Archivia e organizza tutte le strategie. Cerca, filtra e riutilizza.',
      f5Title:'Personalizzazione Totale', f5Desc:'Personalizza campi, giocatori, colori e stili secondo il tuo brand.',
      f6Title:'Collaborazione in Tempo Reale', f6Desc:'Condividi schemi con lo staff. Lavora in simultanea.',
      pricingTitle:'Piani per la Tua Squadra',
      pricingSubtitle:'Scegli il piano più adatto. Tutti includono una prova gratuita.',
      perMonth:'/mese', starterDesc:'Perfetto per allenatori individuali',
      mostPopular:'Più Popolare', proName:'Professionale',
      proDesc:'Per allenatori seri e staff tecnico', clubDesc:'Per club sportivi e organizzazioni',
      s1:'Nessuna modifica squadre', s2:'5 schemi salvati', s3:'Esporta come immagine',
      s4:'Animazioni base', s5:'Supporto via email',
      p1:'Modifica squadre', p2:'Schemi illimitati', p3:'Esporta e condividi schemi',
      p4:'Animazioni avanzate', p5:'Libreria condivisa', p6:'Supporto prioritario',
      c1:'Tutto di Professionale', c2:'12 utenti inclusi', c3:'10 ore formazione PRO',
      c4:'Brand personalizzato', c5:'Integrazione sito e social', c6:'Supporto 24/7',
      Free:'GRATIS', startTrial:'Avvia la Prova', contactSales:'Contatta le Vendite',
      testimonialQuote:'"RugbyBoard Pro ha trasformato il modo in cui prepariamo le nostre strategie. Le animazioni ci permettono di comunicare schemi complessi professionalmente."',
      testimonialAuthor:'Guido Quadri', testimonialRole:'Head Coach — Bologna Rugby Club',
      ctaTitle:'Pronto a rivoluzionare la tua strategia?',
      ctaText:'Unisciti a migliaia di allenatori che creano schemi vincenti con RugbyBoard Pro.',
      ctaButton:'Inizia la tua prova gratuita',
    }
  };

  /* ══════════════════════════════════════════════
     3. ACTIVE PAGE
  ══════════════════════════════════════════════ */
  const page = location.pathname.split('/').pop() || 'index.html';
  const isActive = href => {
    if (href.startsWith('#')) return false;
    const h = href.split('/').pop().split('#')[0];
    return h === page || (page === '' && h === 'index.html');
  };

  /* ══════════════════════════════════════════════
     4. NAV — 3 links only: Acerca de, Demo, Contacto
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
    <img src="rbp_Italic.png" alt="RugbyBoard Pro" width="145" height="46"/>
  </a>
  <div class="rbp-nav-menu">
    ${desk}
    <a href="https://rugbyboardpro.com/boardpro.html" rel="noopener noreferrer">
      <button class="rbp-nav-cta" data-rbp-i18n="navCta">${d.navCta}</button>
    </a>
    <div class="rbp-lang-switch" aria-label="Idioma / Language">
      <button class="rbp-lang-btn${' rbp-is-active'.repeat(+(currentLang==='es'))}" data-rbp-lang="es" title="Español" type="button"><span>🇦🇷</span></button>
      <button class="rbp-lang-btn${' rbp-is-active'.repeat(+(currentLang==='en'))}" data-rbp-lang="en" title="English" type="button"><span>🇺🇸</span></button>
      <button class="rbp-lang-btn${' rbp-is-active'.repeat(+(currentLang==='it'))}" data-rbp-lang="it" title="Italiano" type="button"><span>🇮🇹</span></button>
    </div>
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
  <button class="rbp-mobile-close" id="rbpDrawerClose" type="button" aria-label="Cerrar">✕</button>
  ${mob}
  <a href="https://rugbyboardpro.com/boardpro.html" rel="noopener noreferrer">
    <button class="rbp-mobile-cta" data-rbp-i18n="navCta">${d.navCta}</button>
  </a>
  <div class="rbp-mobile-lang-row">
    <span class="rbp-mobile-lang-label">Lang</span>
    <button class="rbp-lang-btn${' rbp-is-active'.repeat(+(currentLang==='es'))}" data-rbp-lang="es" title="Español" type="button"><span>🇦🇷</span></button>
    <button class="rbp-lang-btn${' rbp-is-active'.repeat(+(currentLang==='en'))}" data-rbp-lang="en" title="English" type="button"><span>🇺🇸</span></button>
    <button class="rbp-lang-btn${' rbp-is-active'.repeat(+(currentLang==='it'))}" data-rbp-lang="it" title="Italiano" type="button"><span>🇮🇹</span></button>
  </div>
</div>`;
  }

  /* ══════════════════════════════════════════════
     5. FOOTER
  ══════════════════════════════════════════════ */
  function buildFooter(d) {
    return `
<footer id="rbpFooter" role="contentinfo">
  <div class="rbp-footer-content">
    <div class="rbp-footer-top">
      <div>
        <a href="index.html"><img src="rbp_Italic.png" alt="RugbyBoard Pro" class="rbp-footer-logo-img" width="145" height="46" loading="lazy"/></a>
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
          <a href="document.html"  data-rbp-i18n="navDocs">${d.navDocs}</a>
          <a href="soporte.html"   data-rbp-i18n="navSupport">${d.navSupport}</a>
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
        <a href="#" class="rbp-social-icon" aria-label="Twitter" rel="noopener noreferrer"><i class="fab fa-x-twitter"></i></a>
        <a href="#" class="rbp-social-icon" aria-label="Facebook" rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
        <a href="#" class="rbp-social-icon" aria-label="Instagram" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
        <a href="#" class="rbp-social-icon" aria-label="LinkedIn" rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
        <a href="#" class="rbp-social-icon" aria-label="YouTube" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
  </div>
</footer>`;
  }

  /* ══════════════════════════════════════════════
     6. INJECT NAV + FOOTER
  ══════════════════════════════════════════════ */
  const wrapper = document.querySelector('.content-wrapper') || document.body;
  const navRoot = document.createElement('div');
  const ftrRoot = document.createElement('div');
  navRoot.id = 'rbp-nav-root';
  ftrRoot.id = 'rbp-footer-root';

  // Place nav: replace <!--RBP_NAV--> comment or prepend
  let navDone = false;
  for (const node of Array.from(wrapper.childNodes)) {
    if (node.nodeType === 8 && node.nodeValue.trim() === 'RBP_NAV') {
      wrapper.insertBefore(navRoot, node);
      wrapper.removeChild(node);
      navDone = true; break;
    }
  }
  if (!navDone) wrapper.insertBefore(navRoot, wrapper.firstChild);

  // Place footer: replace <!--RBP_FOOTER--> comment or append
  let ftrDone = false;
  for (const node of Array.from(wrapper.childNodes)) {
    if (node.nodeType === 8 && node.nodeValue.trim() === 'RBP_FOOTER') {
      wrapper.insertBefore(ftrRoot, node);
      wrapper.removeChild(node);
      ftrDone = true; break;
    }
  }
  if (!ftrDone) wrapper.appendChild(ftrRoot);

  /* ══════════════════════════════════════════════
     7. LANGUAGE — translates nav, footer AND page
  ══════════════════════════════════════════════ */
  let currentLang = localStorage.getItem('rbp-lang') || 'es';

  function applyLang(lang) {
    const d = T[lang] || T.es;
    currentLang = lang;

    navRoot.innerHTML = buildNav(d);
    ftrRoot.innerHTML = buildFooter(d);

    // Translate ALL data-i18n elements on the page
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = d[el.dataset.i18n];
      if (v !== undefined) el.textContent = v;
    });
    // Translate data-rbp-i18n elements (nav/footer)
    document.querySelectorAll('[data-rbp-i18n]').forEach(el => {
      const v = d[el.dataset.rbpI18n];
      if (v !== undefined) el.textContent = v;
    });

    // Mark active lang buttons
    document.querySelectorAll('.rbp-lang-btn').forEach(b =>
      b.classList.toggle('rbp-is-active', b.dataset.rbpLang === lang)
    );

    document.documentElement.lang = lang;
    localStorage.setItem('rbp-lang', lang);
    bindEvents();
  }

  /* ══════════════════════════════════════════════
     8. EVENTS
  ══════════════════════════════════════════════ */
  function bindEvents() {
    const burger  = document.getElementById('rbpBurger');
    const closeBtn= document.getElementById('rbpDrawerClose');
    const overlay = document.getElementById('rbpOverlay');
    const drawer  = document.getElementById('rbpDrawer');
    const nav     = document.getElementById('rbpNav');
    if (!burger) return;

    const open = () => {
      [burger,overlay,drawer].forEach(e=>e.classList.add('rbp-is-open'));
      burger.setAttribute('aria-expanded','true');
      document.body.style.overflow='hidden';
      setTimeout(()=>drawer.querySelector('a')?.focus(),50);
    };
    const close = () => {
      [burger,overlay,drawer].forEach(e=>e.classList.remove('rbp-is-open'));
      burger.setAttribute('aria-expanded','false');
      document.body.style.overflow='';
    };

    burger.addEventListener('click', ()=>drawer.classList.contains('rbp-is-open')?close():open());
    closeBtn?.addEventListener('click', close);
    overlay.addEventListener('click', close);
    drawer.addEventListener('click', e=>{ if(e.target.matches('a')||e.target.closest('a')) close(); });
    window.addEventListener('keydown', e=>{ if(e.key==='Escape') close(); });
    window.addEventListener('resize', ()=>{ if(window.innerWidth>900) close(); });

    // Scroll shadow
    const onScroll = ()=> nav?.classList.toggle('rbp-scrolled', window.scrollY>8);
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();

    // Lang buttons
    document.querySelectorAll('.rbp-lang-btn').forEach(b=>
      b.addEventListener('click', ()=> applyLang(b.dataset.rbpLang))
    );
  }

  /* ══════════════════════════════════════════════
     9. INIT
  ══════════════════════════════════════════════ */
  applyLang(currentLang);

})();
