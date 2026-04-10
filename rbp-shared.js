/**
 * rbp-shared.js — RugbyBoard Pro BETA FINAL
 * Full i18n (249 keys × 3 langs) · Fullscreen menu · Scroll reveal nav · Responsive
 */
(function () {
'use strict';

/* ════════════════════════════════════
   STYLES
════════════════════════════════════ */
const css = `
@view-transition { navigation: auto; }

/* NAV */
#rbpNav {
  width:100%; padding:0 2.5rem; height:68px;
  display:flex; justify-content:space-between; align-items:center;
  background:rgba(3,6,8,0.97);
  backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px);
  border-bottom:1px solid rgba(200,255,0,0.1);
  position:sticky; top:0; z-index:1000;
  transition:box-shadow .3s, height .3s;
  font-family:'Montserrat',sans-serif; box-sizing:border-box;
}
#rbpNav.rbp-scrolled {
  height:58px; box-shadow:0 4px 40px rgba(0,0,0,.95);
  border-bottom-color:rgba(200,255,0,.07);
}
#rbpNav a { text-decoration:none; }

.rbp-logo { display:flex; align-items:center; flex-shrink:0; }
.rbp-logo img { height:46px; width:auto; display:block; transition:all .25s; }
#rbpNav.rbp-scrolled .rbp-logo img { height:38px; }
.rbp-logo:hover img { opacity:.82; }

.rbp-nav-menu { display:flex; gap:1.75rem; align-items:center; }

.rbp-nav-link {
  color:rgba(240,246,252,.55); font-weight:600; font-size:.78rem;
  letter-spacing:.05em; text-transform:uppercase;
  transition:color .2s; position:relative; white-space:nowrap;
}
.rbp-nav-link::after {
  content:''; position:absolute; bottom:-3px; left:0;
  width:0; height:2px; background:#c8ff00; border-radius:2px; transition:width .22s;
}
.rbp-nav-link:hover, .rbp-nav-link.rbp-active { color:#c8ff00; }
.rbp-nav-link:hover::after, .rbp-nav-link.rbp-active::after { width:100%; }

.rbp-nav-cta {
  padding:.55rem 1.2rem; background:#c8ff00; color:#000;
  border:none; border-radius:9px; font-family:'Montserrat',sans-serif;
  font-weight:800; font-size:.76rem; letter-spacing:.05em; text-transform:uppercase;
  cursor:pointer; white-space:nowrap; transition:all .22s;
  box-shadow:0 0 18px rgba(200,255,0,.4);
}
.rbp-nav-cta:hover { transform:translateY(-2px); box-shadow:0 0 30px rgba(200,255,0,.65); }

/* LANG */
.rbp-lang-switch { display:flex; gap:.28rem; align-items:center; margin-left:.5rem; }
.rbp-lang-btn {
  height:28px; padding:0 .55rem; border-radius:6px;
  border:1.5px solid rgba(200,255,0,.32); background:rgba(200,255,0,.09);
  color:rgba(200,255,0,.75); cursor:pointer;
  display:inline-flex; align-items:center; justify-content:center;
  font-family:'Montserrat',sans-serif; font-weight:800; font-size:.63rem; letter-spacing:.07em;
  transition:all .18s; white-space:nowrap;
}
.rbp-lang-btn:hover { border-color:#c8ff00; background:rgba(200,255,0,.18); color:#c8ff00; transform:scale(1.06); }
.rbp-lang-btn.rbp-is-active {
  border-color:#c8ff00; background:rgba(200,255,0,.2); color:#c8ff00;
  box-shadow:0 0 10px rgba(200,255,0,.35);
}

/* BURGER */
.rbp-burger-btn {
  display:none; width:38px; height:38px; border-radius:8px;
  border:1.5px solid rgba(200,255,0,.28); background:rgba(200,255,0,.07);
  cursor:pointer; align-items:center; justify-content:center;
  transition:all .2s; flex-shrink:0;
}
.rbp-burger-btn:hover { border-color:#c8ff00; background:rgba(200,255,0,.15); }
.rbp-burger-icon { position:relative; width:16px; height:12px; display:block; }
.rbp-burger-line {
  position:absolute; left:0; width:100%; height:2px;
  background:#c8ff00; border-radius:2px;
  transition:transform .22s, top .22s, opacity .18s;
}
.rbp-burger-line.l1{top:0;} .rbp-burger-line.l2{top:5px;} .rbp-burger-line.l3{top:10px;}
.rbp-burger-btn.rbp-is-open .rbp-burger-line.l1{top:5px;transform:rotate(45deg);}
.rbp-burger-btn.rbp-is-open .rbp-burger-line.l2{opacity:0;}
.rbp-burger-btn.rbp-is-open .rbp-burger-line.l3{top:5px;transform:rotate(-45deg);}

/* FULLSCREEN OVERLAY */
.rbp-overlay {
  position:fixed; inset:0; z-index:999;
  background:rgba(3,6,8,.98); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px);
  display:flex; flex-direction:column; align-items:center; justify-content:center;
  opacity:0; pointer-events:none;
  transition:opacity .3s ease;
  font-family:'Montserrat',sans-serif;
}
.rbp-overlay.rbp-is-open { opacity:1; pointer-events:all; }

.rbp-ov-top {
  position:absolute; top:0; left:0; right:0; padding:1rem 1.25rem;
  display:flex; justify-content:space-between; align-items:center;
  border-bottom:1px solid rgba(200,255,0,.08);
}
.rbp-ov-logo img { height:38px; width:auto; }
.rbp-ov-close {
  width:40px; height:40px; border-radius:9px;
  border:1.5px solid rgba(200,255,0,.28); background:rgba(200,255,0,.07);
  color:#c8ff00; cursor:pointer;
  display:flex; align-items:center; justify-content:center;
  font-size:1.1rem; transition:all .18s;
}
.rbp-ov-close:hover { background:rgba(200,255,0,.18); border-color:#c8ff00; }

.rbp-ov-links {
  display:flex; flex-direction:column; align-items:center; gap:.5rem;
  width:100%; padding:0 2rem; margin-bottom:2.5rem;
}
.rbp-ov-link {
  display:flex; justify-content:center; align-items:center;
  width:100%; max-width:320px; padding:.95rem 1.5rem;
  border-radius:12px; border:1px solid transparent;
  color:rgba(240,246,252,.7); text-decoration:none;
  font-weight:800; font-size:1.1rem; letter-spacing:.06em; text-transform:uppercase;
  transition:all .2s; text-align:center;
}
.rbp-ov-link:hover, .rbp-ov-link.rbp-active {
  color:#c8ff00; border-color:rgba(200,255,0,.2); background:rgba(200,255,0,.05);
}

.rbp-ov-cta {
  display:block; padding:.9rem 3rem;
  background:#c8ff00; color:#000; border:none; border-radius:12px;
  font-family:'Montserrat',sans-serif; font-weight:800;
  font-size:.95rem; letter-spacing:.05em; text-transform:uppercase;
  cursor:pointer; text-align:center; transition:all .22s;
  box-shadow:0 0 28px rgba(200,255,0,.4); margin-bottom:2.5rem;
  text-decoration:none;
}
.rbp-ov-cta:hover { opacity:.88; transform:translateY(-2px); box-shadow:0 0 50px rgba(200,255,0,.6); }

.rbp-ov-lang { display:flex; gap:.5rem; }
.rbp-ov-lang .rbp-lang-btn { height:36px; padding:0 .9rem; font-size:.72rem; }

/* FOOTER */
#rbpFooter {
  border-top:1px solid rgba(255,255,255,.06);
  padding:4.5rem 2.5rem 3rem;
  font-family:'Montserrat',sans-serif;
}
.rbp-fc { max-width:1160px; margin:0 auto; }
.rbp-ft {
  display:grid; grid-template-columns:2fr 1fr 1fr 1fr;
  gap:3rem; margin-bottom:3rem;
}
.rbp-fli { height:44px; width:auto; display:block; margin-bottom:1.1rem; }
.rbp-fd { color:rgba(240,246,252,.42); font-size:.8rem; line-height:1.8; max-width:230px; }
.rbp-fc-col h4 {
  font-size:.67rem; font-weight:800; letter-spacing:.1em;
  text-transform:uppercase; color:#c8ff00; margin-bottom:1rem;
}
.rbp-fl { display:flex; flex-direction:column; gap:.65rem; }
.rbp-fl a {
  color:rgba(240,246,252,.42); text-decoration:none; font-size:.8rem; font-weight:500;
  transition:color .18s;
}
.rbp-fl a:hover { color:#c8ff00; }
.rbp-fb {
  display:flex; justify-content:space-between; align-items:center;
  padding-top:2rem; border-top:1px solid rgba(255,255,255,.06);
  flex-wrap:wrap; gap:1rem;
}
.rbp-cp { color:rgba(240,246,252,.28); font-size:.74rem; }
.rbp-sl { display:flex; gap:.45rem; }
.rbp-si {
  width:34px; height:34px; border-radius:8px;
  border:1px solid rgba(255,255,255,.06); background:rgba(255,255,255,.02);
  display:flex; align-items:center; justify-content:center;
  color:rgba(240,246,252,.35); text-decoration:none; font-size:.8rem;
  transition:all .18s;
}
.rbp-si:hover { border-color:#c8ff00; color:#c8ff00; background:rgba(200,255,0,.08); }

/* PAGE HERO base (inner pages) */
.rbp-page-hero {
  padding:5rem 2rem 3rem; text-align:center;
  max-width:900px; margin:0 auto;
}

/* NAV RESPONSIVE */
@media(max-width:920px){
  #rbpNav{padding:0 1.25rem;}
  .rbp-nav-menu{display:none;}
  .rbp-burger-btn{display:inline-flex;}
}
@media(max-width:480px){
  #rbpNav{height:58px; padding:0 1rem;}
  .rbp-logo img{height:36px;}
  #rbpNav.rbp-scrolled .rbp-logo img{height:30px;}
}

/* FOOTER RESPONSIVE */
@media(max-width:860px){
  #rbpFooter{padding:3.5rem 1.5rem 2.5rem;}
  .rbp-ft{grid-template-columns:1fr 1fr; gap:2.5rem;}
}
@media(max-width:540px){
  #rbpFooter{padding:3rem 1.25rem 2rem;}
  .rbp-ft{grid-template-columns:1fr; gap:2rem;}
  .rbp-fb{flex-direction:column; text-align:center;}
  .rbp-fd{max-width:100%;}
}

/* Global fixes */
.landing-wrapper,.content-wrapper,.content{overflow:visible!important;}
[id]{scroll-margin-top:76px;}
body{overflow-x:hidden;}
`;

const st = document.createElement('style');
st.id = 'rbp-shared-styles';
st.textContent = css;
document.head.appendChild(st);

/* ════════════════════════════════════
   TRANSLATIONS — 249 keys × 3 langs
════════════════════════════════════ */
const T = {
  es: {
    navFeatures: 'Características',
    navPricing: 'Precios',
    navAbout: 'Acerca de',
    navDocs: 'Documentación',
    navSupport: 'Soporte',
    navContact: 'Contacto',
    navCta: 'Comenzar Gratis',
    badge: 'Nuestra historia • Producto creado para entrenadores',
    title1: 'Acerca de',
    title2: 'RugbyBoard Pro',
    subtitle: 'Somos un equipo que vive el rugby desde adentro. Creamos este software para que entrenadores y staff puedan diseñar jugadas más rápido, enseñarlas mejor y mejorar el rendimiento del equipo.',
    whyTitle: '¿Por qué lo desarrollamos?',
    whyText: 'Porque en el día a día, los entrenadores necesitan herramientas simples, rápidas y visuales para comunicar ideas. Entre pizarras, capturas, PDFs y mensajes, la información se pierde. RugbyBoard Pro nace para ordenar el sistema: crear, animar y compartir jugadas en minutos.',
    focusTitle: 'Nuestro enfoque',
    focusText: 'Claridad + velocidad + consistencia táctica.',
    whoTitle: '¿Quiénes somos?',
    whoText: 'Un equipo híbrido: entrenadores, analistas y desarrolladores. Combinamos experiencia en cancha con tecnología para construir una plataforma realmente útil en el entrenamiento.',
    teamTitle: 'Hecho con mentalidad de staff',
    teamText: 'Cada feature se diseña pensando en la práctica real.',
    mvTitle: 'Misión, Visión y Propósito',
    mvText: 'Lo que nos guía y hacia dónde vamos.',
    missionTitle: 'Misión',
    missionText: 'Simplificar la creación y comunicación de estrategias para que cada equipo entrene con mayor claridad y eficiencia.',
    visionTitle: 'Visión',
    visionText: 'Ser la plataforma de referencia para entrenadores de rugby en todo el mundo, desde amateur hasta alto rendimiento.',
    purposeTitle: 'Propósito',
    purposeText: 'Elevar el nivel de aprendizaje y ejecución táctica, haciendo la información accesible para todos.',
    valuesTitle: 'Valores',
    valuesText: 'Principios que aplicamos al producto y al trabajo diario.',
    val1Title: 'Claridad',
    val1Text: 'Lo visual tiene que entenderse rápido: menos ruido, más mensaje.',
    val2Title: 'Disciplina',
    val2Text: 'Consistencia táctica y orden: una biblioteca clara mejora el rendimiento.',
    val3Title: 'Evolución',
    val3Text: 'Escuchamos feedback del staff y mejoramos el sistema en cada versión.',
    val4Title: 'Trabajo en equipo',
    val4Text: 'El rugby es coordinación: el software también tiene que ayudar a sincronizar.',
    ctaTitle: '¿Querés conocer el sistema por dentro?',
    ctaText: 'Mirá la documentación o empezá con los video tutoriales.',
    ctaDocs: 'Ir a Docs',
    ctaDemo: 'Ver Demo',
    footerProduct: 'Producto',
    footerResources: 'Recursos',
    footerCompany: 'Compañía',
    footerDesc: 'La plataforma líder para diseño de estrategias y tácticas de rugby.',
    footerText: '© 2025 RugbyBoard Pro by JJwebs Academy. Todos los derechos reservados.',
    tag: '🏉 Contacto',
    title: 'Llevá tu equipo al',
    titleFluor: 'próximo nivel',
    stat1: 'Equipos',
    stat2: 'Satisfacción',
    stat3: 'Soporte',
    formTitle: 'Comenzá ahora',
    formSub: 'Completá el formulario y nos contactamos en 24hs',
    lbl1: 'Nombre completo',
    lbl2: 'Email',
    lbl3: 'Teléfono',
    lbl4: 'Tamaño del club',
    lbl5: 'Mensaje',
    btnSend: 'Enviar mensaje',
    secure: '🔒 Tus datos están protegidos y seguros',
    navDemo: 'Demo',
    navLangLabel: 'Language',
    demoBadge: 'Aula de videos • Tutoriales paso a paso',
    demoTitle1: 'Demo',
    demoTitle2: 'Video Tutorials',
    demoSubtitle: 'Mirá tutoriales cortos y prácticos para aprender a usar RugbyBoard Pro. Buscá por tema (crear jugada, animaciones, exportar) y reproducí en pantalla completa.',
    catAll: 'Todas las categorías',
    catBasics: 'Básicos',
    catPlays: 'Jugadas',
    catAnimations: 'Animaciones',
    catExport: 'Exportar & Compartir',
    pillBasics: 'Básicos',
    pillPlays: 'Jugadas',
    pillAnimations: 'Animaciones',
    pillExport: 'Exportar',
    v1Title: 'Primeros pasos',
    v1Text: 'Conocé la interfaz, herramientas principales y cómo empezar en 2 minutos.',
    v2Title: 'Crear una jugada',
    v2Text: 'Armá una jugada desde cero: formación, líneas de carrera y opciones.',
    v3Title: 'Animaciones',
    v3Text: 'Aprendé a animar por fases, ajustar timing y mejorar claridad.',
    v4Title: 'Exportar y compartir',
    v4Text: 'Exportá como imagen y compartí la jugada con tu staff y jugadores.',
    v5Title: 'Lineout: ejemplos',
    v5Text: 'Ejemplos prácticos: maul, salida y opción secundaria.',
    v6Title: 'Atajos y tips pro',
    v6Text: 'Organizá tu biblioteca, etiquetas y versiones para escalar el sistema.',
    tagBasics: 'Básicos',
    tagPlays: 'Jugadas',
    tagAnimations: 'Animaciones',
    tagExport: 'Exportar',
    watch: 'Ver',
    footerDocs: 'Guía',
    footerTutorials: 'Video tutoriales',
    footerSupport: 'Soporte',
    footerAbout: 'Acerca de',
    footerContact: 'Contacto',
    footerLegal: 'Legal',
    navTestimonials: 'Testimonios',
    docsBadge: 'Guía Classroom • Aprende en minutos',
    docsTitle1: 'Documentación',
    docsTitle2: 'RugbyBoard Pro',
    docsSubtitle: 'Esta guía está pensada como un tutorial paso a paso. Vas a encontrar lecciones, ejemplos y buenas prácticas para crear jugadas, animaciones y compartirlas con tu equipo.',
    tocTitle: 'Contenido',
    toc1: '1. Primeros pasos',
    toc2: '2. Crear una jugada',
    toc3: '3. Animaciones',
    toc4: '4. Exportar y compartir',
    toc5: '5. Tips pro',
    sidebarTipTitle: 'Tip rápido',
    sidebarTipText: 'Usá nombres claros en tus jugadas (ej: “Salida 9-10”, “Line + Maul”) para encontrarlas más rápido.',
    s1Title: '1) Primeros pasos',
    s1Text: 'En RugbyBoard Pro podés diseñar estrategias con jugadores, flechas, zonas y símbolos. La idea es que cualquier miembro del staff entienda la jugada en 10 segundos.',
    c1Title: 'Estructura de una jugada',
    c1Text: 'Jugadores + movimientos + objetivo. Mantené la escena simple y progresiva.',
    c2Title: 'Colores por rol',
    c2Text: 'Diferenciá forwards/backs con color para lectura instantánea en video o imagen.',
    c3Title: 'Plantillas de equipo',
    c3Text: 'Creá equipos guardados para reutilizar formaciones sin repetir trabajo.',
    s2Title: '2) Crear una jugada (ejemplo)',
    s2Text: 'Vamos a crear una jugada simple: “Salida 9-10 + vuelta al 12”. La clave es marcar claramente la línea de carrera y la opción secundaria.',
    c4Title: 'Paso A: Formación',
    c4Text: 'Colocá 9, 10 y 12 en posiciones reales. Ajustá spacing para que sea legible.',
    c5Title: 'Paso B: Movimiento',
    c5Text: 'Dibujá flecha del 9 al 10 y línea de carrera del 12 (opción 2).',
    c6Title: 'Paso C: Guardar',
    c6Text: 'Nombrá con convención: Fase + Canal + Objetivo (ej: “F1 Canal2 - Fix”).',
    call1Title: 'Objetivo didáctico',
    call1Text: 'Si el jugador mira el diagrama, debería saber qué hacer sin explicación adicional.',
    s3Title: '3) Animaciones',
    s3Text: 'Las animaciones sirven para enseñar timing y secuencia. Animá por fases: primero el pase, luego la carrera, y por último la opción secundaria.',
    c7Title: 'Timing por fases',
    c7Text: 'Usá delays para que la jugada “respire” y sea fácil de seguir.',
    c8Title: 'Repetición',
    c8Text: 'Reproducí y ajustá: si se entiende a 1.2x, está perfecta.',
    c9Title: 'Lectura visual',
    c9Text: 'Reducí ruido: pocas flechas, pocas notas, lo justo.',
    s4Title: '4) Exportar y compartir',
    s4Text: 'Podés exportar la jugada como imagen para WhatsApp / grupos, o compartirla con tu staff. Lo ideal es adjuntar una versión corta (imagen) + una versión completa (animación).',
    c10Title: 'Exportar imagen',
    c10Text: 'Perfecto para imprimir o enviar en grupos. Mantené buen contraste.',
    c11Title: 'Compartir con staff',
    c11Text: 'Centralizá la biblioteca: todos ven la versión correcta.',
    c12Title: 'Buenas prácticas',
    c12Text: 'Evitar duplicados: usá tags y fecha para control de versiones.',
    s5Title: '5) Tips Pro (staff)',
    s5Text: 'Un sistema táctico se vuelve escalable cuando la documentación es consistente. Estos tips te ayudan a que tus jugadas sean fáciles de enseñar y repetir.',
    c13Title: 'Tags',
    c13Text: 'Ej: “attack”, “defense”, “lineout”, “scrum”, “exit”, “kick”.',
    c14Title: 'Checklist por sesión',
    c14Text: 'Qué entrenamos hoy + cuáles jugadas + qué métricas evaluamos.',
    c15Title: 'Estandarización',
    c15Text: 'Siempre misma simbología: flechas, runs, señuelos, zonas.',
    call2Title: 'Modo classroom',
    call2Text: 'Usá esta página como “aula”: una sección por semana y ejemplos por categoría.',
    titleAnd: '&',
    supportTitle: 'Centro de Soporte',
    supportText: 'Elegí el canal correcto para resolver tu consulta más rápido.',
    btnContact: 'Contactar',
    btnOpenDocs: 'Abrir docs',
    btnWatchVideos: 'Ver videos',
    faqTitle: 'Preguntas frecuentes',
    faqText: 'Respuestas rápidas a dudas comunes.',
    q1: '¿Cómo creo mi primera jugada?',
    a1: 'Entrá al editor, colocá jugadores en la formación y dibujá el movimiento principal. Guardá con un nombre claro.',
    q2: '¿Puedo exportar en imagen para WhatsApp?',
    a2: 'Sí. Exportá en PNG/JPG y compartilo. Recomendación: alto contraste y pocos elementos para lectura rápida.',
    q3: '¿Funciona en tablets o mobile?',
    a3: 'Sí. El sitio es responsive y funciona muy bien en tablets para usarlo en cancha o en reuniones.',
    q4: '¿Cómo reporto un bug?',
    a4: 'Mandanos un mensaje por Contacto con: pasos para reproducir, captura de pantalla y navegador/dispositivo.',
    chgTitle: 'Actualizaciones del sistema',
    chgText: 'Resumen de mejoras recientes (changelog). Podés editar estas versiones cuando publiques nuevas features.',
    v210: 'Versión 2.1.0',
    v210date: 'Ene 2026',
    v210h: 'Mejoras clave',
    v210l1: 'Nuevo sistema de animaciones por fases.',
    v210l2: 'Mejoras en exportación (calidad y velocidad).',
    v210l3: 'Optimización general de rendimiento.',
    v200: 'Versión 2.0.0',
    v200date: 'Dic 2025',
    v200h: 'Lanzamiento',
    v200l1: 'Nuevo editor visual.',
    v200l2: 'Biblioteca de jugadas guardadas.',
    v200l3: 'Multi-idioma.',
    v190: 'Versión 1.9.0',
    v190date: 'Oct 2025',
    v190h: 'Estabilidad',
    v190l1: 'Mejoras de estabilidad y corrección de bugs.',
    v190l2: 'Ajustes visuales para mejor lectura.',
    v190l3: 'Mejoras de UX en mobile.',
    footerDemo: 'Demo',
    footerUpdates: 'Actualizaciones',
    heroBadge: 'Generación Beta — versión anticipada',
    heroTitle1: 'Revoluciona tu',
    heroTitle2: 'Estrategia de Rugby',
    heroSubtitle: 'Diseña jugadas profesionales, anima tácticas complejas y comparte estrategias con tu equipo. Todo en una plataforma intuitiva y poderosa.',
    ctaPrimary: 'Prueba Gratis ahora',
    ctaSecondary: 'Ver Demo en Vivo',
    stat1Label: 'Entrenadores Activos',
    stat2Label: 'Jugadas Creadas',
    stat3Label: 'Países',
    featuresTitle: 'Herramientas Pro para Entrenadores',
    featuresSubtitle: 'Todo lo que necesitas para crear estrategias ganadoras y comunicarlas de manera efectiva',
    f1Title: 'Gestión de Equipos',
    f1Desc: 'Organiza múltiples equipos con jugadores personalizables. Define posiciones, asigna números y configura colores únicos para cada formación.',
    f2Title: 'Herramientas de Dibujo Pro',
    f2Desc: 'Crea diagramas precisos con flechas inteligentes, líneas de movimiento y formas vectoriales. Perfecto para estrategias complejas.',
    f3Title: 'Animación e Interacción',
    f3Desc: 'Aporta dinamismo a tus jugadas capturando cada movimiento en el tablero. Las animaciones generan un impacto interactivo y visualmente atractivo.',
    f4Title: 'Biblioteca de Jugadas',
    f4Desc: 'Almacena y organiza todas tus estrategias. Busca, filtra y reutiliza jugadas guardadas con etiquetas personalizadas.',
    f5Title: 'Personalización Total',
    f5Desc: 'Adapta cada aspecto visual: campos, jugadores, colores de equipo y estilos de dibujo según tu marca.',
    f6Title: 'Colaboración en Tiempo Real',
    f6Desc: 'Comparte jugadas con tu staff técnico. Trabaja simultáneamente y recibe feedback instantáneo de tu equipo.',
    pricingTitle: 'Planes Para Tu Equipo',
    pricingSubtitle: 'Elige el plan que mejor se adapte a tus necesidades. Todos incluyen prueba gratuita.',
    perMonth: '/mes',
    starterDesc: 'Perfecto para entrenadores individuales',
    mostPopular: 'Más popular',
    proName: 'Profesional',
    proDesc: 'Para entrenadores serios y staff técnico',
    clubDesc: 'Para organizaciones y clubes deportivos',
    s1: 'Sin edición de equipos',
    s2: '5 jugadas guardadas',
    s3: 'Exportar como imagen',
    s4: 'Animaciones básicas',
    s5: 'Soporte por email',
    p1: 'Edición de equipos',
    p2: 'Jugadas ilimitadas',
    p3: 'Exportar y compartir jugadas',
    p4: 'Animaciones avanzadas',
    p5: 'Biblioteca compartida',
    p6: 'Soporte prioritario',
    c1: 'Todo lo de Profesional',
    c2: '12 usuarios incluidos',
    c3: '10 horas de capacitación PRO',
    c4: 'Marca personalizada',
    c5: 'Integración con web y redes',
    c6: 'Soporte 24/7',
    Free: 'GRATIS',
    startTrial: 'Comenzar prueba',
    contactSales: 'Contactar ventas',
    testimonialQuote: '"RugbyBoard Pro ha transformado completamente la forma en que preparamos nuestras estrategias. Las animaciones nos permiten comunicar jugadas complejas de manera clara y profesional."',
    testimonialAuthor: 'Guido Quadri',
    testimonialRole: 'Entrenador Principal - Bologna Rugby Club',
    ctaButton: 'Comienza tu prueba gratuita',
  },
  en: {
    navFeatures: 'Features',
    navPricing: 'Pricing',
    navAbout: 'About',
    navDocs: 'Docs',
    navSupport: 'Support',
    navContact: 'Contact',
    navCta: 'Start Free',
    badge: 'Our story • Built for coaches',
    title1: 'About',
    title2: 'RugbyBoard Pro',
    subtitle: 'We\'re a team that lives rugby from the inside. We built this software so coaches and staff can design plays faster, teach better and improve team performance.',
    whyTitle: 'Why did we build it?',
    whyText: 'Because coaches need simple, fast and visual tools to communicate ideas. Between whiteboards, screenshots, PDFs and chats, information gets lost. RugbyBoard Pro was created to organize the system.',
    focusTitle: 'Our focus',
    focusText: 'Clarity + speed + tactical consistency.',
    whoTitle: 'Who are we?',
    whoText: 'A hybrid team: coaches, analysts and developers. We combine field experience with technology to build a truly useful training platform.',
    teamTitle: 'Made with a staff mindset',
    teamText: 'Every feature is designed for real practice.',
    mvTitle: 'Mission, Vision & Purpose',
    mvText: 'What guides us and where we\'re going.',
    missionTitle: 'Mission',
    missionText: 'Simplify the creation and communication of strategies so every team trains with more clarity and efficiency.',
    visionTitle: 'Vision',
    visionText: 'Become the reference platform for rugby coaches worldwide, from amateur to high performance.',
    purposeTitle: 'Purpose',
    purposeText: 'Raise tactical learning and execution by making information accessible to everyone.',
    valuesTitle: 'Values',
    valuesText: 'Principles we apply to the product and daily work.',
    val1Title: 'Clarity',
    val1Text: 'Visuals must be understood fast: less noise, more message.',
    val2Title: 'Discipline',
    val2Text: 'Tactical consistency and order: a clear library improves performance.',
    val3Title: 'Evolution',
    val3Text: 'We listen to staff feedback and improve every release.',
    val4Title: 'Teamwork',
    val4Text: 'Rugby is coordination: software should help synchronize too.',
    ctaTitle: 'Want to explore the system?',
    ctaText: 'Read the docs or start with video tutorials.',
    ctaDocs: 'Go to Docs',
    ctaDemo: 'Watch Demo',
    footerProduct: 'Product',
    footerResources: 'Resources',
    footerCompany: 'Company',
    footerDesc: 'The leading platform for rugby tactics and strategy design.',
    footerText: '© 2025 RugbyBoard Pro by JJwebs Academy. All rights reserved.',
    tag: '🏉 Contact',
    title: 'Take your team to the',
    titleFluor: 'next level',
    stat1: 'Teams',
    stat2: 'Satisfaction',
    stat3: 'Support',
    formTitle: 'Get started',
    formSub: 'Fill in the form and we\'ll get back to you within 24h',
    lbl1: 'Full name',
    lbl2: 'Email',
    lbl3: 'Phone',
    lbl4: 'Club size',
    lbl5: 'Message',
    btnSend: 'Send message',
    secure: '🔒 Your data is protected and secure',
    navDemo: 'Demo',
    navLangLabel: 'Language',
    demoBadge: 'Video classroom • Step-by-step tutorials',
    demoTitle1: 'Demo',
    demoTitle2: 'Video Tutorials',
    demoSubtitle: 'Watch short and practical tutorials to learn RugbyBoard Pro. Search by topic (plays, animations, export) and watch fullscreen.',
    catAll: 'All categories',
    catBasics: 'Basics',
    catPlays: 'Plays',
    catAnimations: 'Animations',
    catExport: 'Export & Share',
    pillBasics: 'Basics',
    pillPlays: 'Plays',
    pillAnimations: 'Animations',
    pillExport: 'Export',
    v1Title: 'Getting started',
    v1Text: 'Learn the interface, key tools and how to begin in 2 minutes.',
    v2Title: 'Create a play',
    v2Text: 'Build a play from scratch: formation, running lines and options.',
    v3Title: 'Animations',
    v3Text: 'Animate by phases, adjust timing and improve clarity.',
    v4Title: 'Export & share',
    v4Text: 'Export as an image and share the play with staff and players.',
    v5Title: 'Lineout examples',
    v5Text: 'Practical examples: maul, exit and secondary option.',
    v6Title: 'Shortcuts & pro tips',
    v6Text: 'Organize your library, tags and versions to scale your system.',
    tagBasics: 'Basics',
    tagPlays: 'Plays',
    tagAnimations: 'Animations',
    tagExport: 'Export',
    watch: 'Watch',
    footerDocs: 'Guide',
    footerTutorials: 'Video tutorials',
    footerSupport: 'Support',
    footerAbout: 'About',
    footerContact: 'Contact',
    footerLegal: 'Legal',
    navTestimonials: 'Testimonials',
    docsBadge: 'Classroom Guide • Learn fast',
    docsTitle1: 'Documentation',
    docsTitle2: 'RugbyBoard Pro',
    docsSubtitle: 'This guide is designed as a step-by-step tutorial. You\'ll find lessons, examples and best practices to build plays, animations and share them with your team.',
    tocTitle: 'Contents',
    toc1: '1. Getting started',
    toc2: '2. Create a play',
    toc3: '3. Animations',
    toc4: '4. Export & share',
    toc5: '5. Pro tips',
    sidebarTipTitle: 'Quick tip',
    sidebarTipText: 'Use clear play names (e.g., “9-10 Exit”, “Line + Maul”) to find them faster.',
    s1Title: '1) Getting started',
    s1Text: 'In RugbyBoard Pro you can design strategies using players, arrows, zones and symbols. The goal: any staff member understands the play in 10 seconds.',
    c1Title: 'Play structure',
    c1Text: 'Players + movement + objective. Keep it simple and progressive.',
    c2Title: 'Role colors',
    c2Text: 'Differentiate forwards/backs with color for instant readability.',
    c3Title: 'Team templates',
    c3Text: 'Save teams to reuse formations without repeating work.',
    s2Title: '2) Create a play (example)',
    s2Text: 'Let’s create a simple play: “9-10 exit + back to 12”. The key is clarity: main line + secondary option.',
    c4Title: 'Step A: Formation',
    c4Text: 'Place 9, 10 and 12 in realistic positions. Adjust spacing for readability.',
    c5Title: 'Step B: Movement',
    c5Text: 'Draw the pass 9→10 and the 12 running line (option 2).',
    c6Title: 'Step C: Save',
    c6Text: 'Name it with a convention: Phase + Channel + Goal (e.g., “F1 Ch2 - Fix”).',
    call1Title: 'Teaching goal',
    call1Text: 'If a player sees the diagram, they should know what to do without extra explanation.',
    s3Title: '3) Animations',
    s3Text: 'Animations teach timing and sequence. Animate in phases: pass first, then run, then the secondary option.',
    c7Title: 'Phase timing',
    c7Text: 'Use delays so the play “breathes” and is easy to follow.',
    c8Title: 'Replay',
    c8Text: 'Replay and adjust: if it’s clear at 1.2x, it’s perfect.',
    c9Title: 'Visual readability',
    c9Text: 'Reduce noise: fewer arrows, fewer notes, only what matters.',
    s4Title: '4) Export & share',
    s4Text: 'Export the play as an image for WhatsApp/groups or share it with your staff. Best practice: short version (image) + full version (animation).',
    c10Title: 'Export image',
    c10Text: 'Perfect for printing or group chats. Keep contrast high.',
    c11Title: 'Share with staff',
    c11Text: 'Centralize the library so everyone sees the correct version.',
    c12Title: 'Best practices',
    c12Text: 'Avoid duplicates: use tags and dates for version control.',
    s5Title: '5) Pro tips (staff)',
    s5Text: 'A tactical system scales when documentation is consistent. These tips help your plays become easier to teach and repeat.',
    c13Title: 'Tags',
    c13Text: 'Examples: “attack”, “defense”, “lineout”, “scrum”, “exit”, “kick”.',
    c14Title: 'Session checklist',
    c14Text: 'What we train + which plays + what metrics we track.',
    c15Title: 'Standardization',
    c15Text: 'Always the same symbols: arrows, runs, decoys, zones.',
    call2Title: 'Classroom mode',
    call2Text: 'Use this page as your “classroom”: one section per week and examples by category.',
    titleAnd: '&',
    supportTitle: 'Support Center',
    supportText: 'Choose the best channel to solve your issue faster.',
    btnContact: 'Contact',
    btnOpenDocs: 'Open docs',
    btnWatchVideos: 'Watch videos',
    faqTitle: 'FAQ',
    faqText: 'Quick answers to common questions.',
    q1: 'How do I create my first play?',
    a1: 'Open the editor, place players in formation and draw the main movement. Save it with a clear name.',
    q2: 'Can I export an image for WhatsApp?',
    a2: 'Yes. Export as PNG/JPG and share it. Tip: high contrast and fewer elements.',
    q3: 'Does it work on tablets/mobile?',
    a3: 'Yes. The site is responsive and works great on tablets for field use or meetings.',
    q4: 'How do I report a bug?',
    a4: 'Send a message via Contact including: steps to reproduce, screenshot, and browser/device.',
    chgTitle: 'System updates',
    chgText: 'Recent improvements (changelog). Edit these versions when you release new features.',
    v210: 'Version 2.1.0',
    v210date: 'Jan 2026',
    v210h: 'Key improvements',
    v210l1: 'New phase-based animation system.',
    v210l2: 'Export improvements (quality and speed).',
    v210l3: 'Overall performance optimizations.',
    v200: 'Version 2.0.0',
    v200date: 'Dec 2025',
    v200h: 'Launch',
    v200l1: 'New visual editor.',
    v200l2: 'Saved plays library.',
    v200l3: 'Multi-language.',
    v190: 'Version 1.9.0',
    v190date: 'Oct 2025',
    v190h: 'Stability',
    v190l1: 'Stability improvements and bug fixes.',
    v190l2: 'Visual adjustments for readability.',
    v190l3: 'UX improvements on mobile.',
    footerDemo: 'Demo',
    footerUpdates: 'Updates',
    heroBadge: 'Beta Generation — Early Access',
    heroTitle1: 'Revolutionize your',
    heroTitle2: 'Rugby Strategy',
    heroSubtitle: 'Design professional plays, animate complex tactics and share strategies with your team. All in one intuitive and powerful platform.',
    ctaPrimary: 'Try Free Now',
    ctaSecondary: 'Watch Live Demo',
    stat1Label: 'Active Coaches',
    stat2Label: 'Plays Created',
    stat3Label: 'Countries',
    featuresTitle: 'Pro Tools for Coaches',
    featuresSubtitle: 'Everything you need to build winning strategies and communicate them effectively',
    f1Title: 'Team Management',
    f1Desc: 'Organize multiple teams with customizable players. Set positions, assign numbers and create unique colors for each lineup.',
    f2Title: 'Pro Drawing Tools',
    f2Desc: 'Create precise diagrams with smart arrows, movement lines and vector shapes — perfect for complex strategies.',
    f3Title: 'Animation & Interaction',
    f3Desc: 'Bring plays to life by capturing every movement on the board. Animations create a highly interactive, visually engaging experience.',
    f4Title: 'Play Library',
    f4Desc: 'Store and organize all your strategies. Search, filter and reuse saved plays with custom tags.',
    f5Title: 'Full Customization',
    f5Desc: 'Customize every visual detail: fields, players, team colors and drawing styles to match your brand.',
    f6Title: 'Real-Time Collaboration',
    f6Desc: 'Share plays with your coaching staff. Work simultaneously and get instant feedback from your team.',
    pricingTitle: 'Plans Built for Your Team',
    pricingSubtitle: 'Choose the plan that best fits your needs. All plans include a free trial.',
    perMonth: '/month',
    starterDesc: 'Perfect for individual coaches',
    mostPopular: 'Most Popular',
    proName: 'Professional',
    proDesc: 'For serious coaches and staff',
    clubDesc: 'For sports clubs and organizations',
    s1: 'No team editing',
    s2: '5 saved plays',
    s3: 'Export as image',
    s4: 'Basic animations',
    s5: 'Email support',
    p1: 'Team editing',
    p2: 'Unlimited plays',
    p3: 'Export & share plays',
    p4: 'Advanced animations',
    p5: 'Shared library',
    p6: 'Priority support',
    c1: 'Everything in Professional',
    c2: '12 users included',
    c3: '10 hours of PRO training',
    c4: 'Custom branding',
    c5: 'Website & social integration',
    c6: '24/7 support',
    Free: 'FREE',
    startTrial: 'Start Trial',
    contactSales: 'Contact Sales',
    testimonialQuote: '"RugbyBoard Pro completely changed how we prepare our strategies. Animations help us communicate complex plays clearly and professionally."',
    testimonialAuthor: 'Guido Quadri',
    testimonialRole: 'Head Coach - Bologna Rugby Club',
    ctaButton: 'Start your free trial',
  },
  it: {
    navFeatures: 'Funzionalità',
    navPricing: 'Prezzi',
    navAbout: 'Chi siamo',
    navDocs: 'Documentazione',
    navSupport: 'Supporto',
    navContact: 'Contatto',
    navCta: 'Inizia Gratis',
    badge: 'La nostra storia • Creato per allenatori',
    title1: 'Chi siamo',
    title2: 'RugbyBoard Pro',
    subtitle: 'Siamo un team che vive il rugby dall\'interno. Abbiamo creato questo software per aiutare allenatori e staff a costruire schemi più velocemente e migliorare le performance.',
    whyTitle: 'Perché lo abbiamo sviluppato?',
    whyText: 'Perché gli allenatori hanno bisogno di strumenti semplici, rapidi e visivi. RugbyBoard Pro nasce per creare, animare e condividere schemi in pochi minuti.',
    focusTitle: 'Il nostro focus',
    focusText: 'Chiarezza + velocità + coerenza tattica.',
    whoTitle: 'Chi siamo?',
    whoText: 'Un team ibrido: allenatori, analisti e sviluppatori. Uniamo esperienza sul campo e tecnologia per costruire una piattaforma davvero utile.',
    teamTitle: 'Pensato con mentalità staff',
    teamText: 'Ogni funzionalità nasce dalla pratica reale.',
    mvTitle: 'Missione, Visione & Scopo',
    mvText: 'Cosa ci guida e dove vogliamo arrivare.',
    missionTitle: 'Missione',
    missionText: 'Semplificare la creazione e comunicazione delle strategie così ogni squadra si allena con più chiarezza ed efficienza.',
    visionTitle: 'Visione',
    visionText: 'Diventare la piattaforma di riferimento per allenatori di rugby nel mondo.',
    purposeTitle: 'Scopo',
    purposeText: 'Alzare il livello di apprendimento ed esecuzione tattica rendendo le informazioni accessibili a tutti.',
    valuesTitle: 'Valori',
    valuesText: 'Principi che applichiamo al prodotto e al lavoro quotidiano.',
    val1Title: 'Chiarezza',
    val1Text: 'Il visual deve essere capito subito: meno rumore, più messaggio.',
    val2Title: 'Disciplina',
    val2Text: 'Coerenza tattica e ordine: una libreria chiara migliora le prestazioni.',
    val3Title: 'Evoluzione',
    val3Text: 'Ascoltiamo il feedback dello staff e miglioriamo ad ogni release.',
    val4Title: 'Lavoro di squadra',
    val4Text: 'Il rugby è coordinazione: anche il software deve aiutare a sincronizzare.',
    ctaTitle: 'Vuoi conoscere il sistema?',
    ctaText: 'Leggi la documentazione o inizia dai video tutorial.',
    ctaDocs: 'Vai ai Docs',
    ctaDemo: 'Guarda Demo',
    footerProduct: 'Prodotto',
    footerResources: 'Risorse',
    footerCompany: 'Azienda',
    footerDesc: 'La piattaforma leader per progettare tattiche e strategie di rugby.',
    footerText: '© 2025 RugbyBoard Pro by JJwebs Academy. Tutti i diritti riservati.',
    tag: '🏉 Contatto',
    title: 'Porta la tua squadra al',
    titleFluor: 'prossimo livello',
    stat1: 'Squadre',
    stat2: 'Soddisfazione',
    stat3: 'Supporto',
    formTitle: 'Inizia ora',
    formSub: 'Compila il form e ti rispondiamo entro 24h',
    lbl1: 'Nome completo',
    lbl2: 'Email',
    lbl3: 'Telefono',
    lbl4: 'Dimensione club',
    lbl5: 'Messaggio',
    btnSend: 'Invia messaggio',
    secure: '🔒 I tuoi dati sono protetti e al sicuro',
    navDemo: 'Demo',
    navLangLabel: 'Language',
    demoBadge: 'Aula video • Tutorial passo passo',
    demoTitle1: 'Demo',
    demoTitle2: 'Video Tutorial',
    demoSubtitle: 'Guarda tutorial brevi e pratici per imparare RugbyBoard Pro. Cerca per tema (schemi, animazioni, export) e guarda a schermo intero.',
    catAll: 'Tutte le categorie',
    catBasics: 'Base',
    catPlays: 'Schemi',
    catAnimations: 'Animazioni',
    catExport: 'Esporta & Condividi',
    pillBasics: 'Base',
    pillPlays: 'Schemi',
    pillAnimations: 'Animazioni',
    pillExport: 'Export',
    v1Title: 'Prime mosse',
    v1Text: 'Scopri l’interfaccia, gli strumenti principali e come iniziare in 2 minuti.',
    v2Title: 'Crea uno schema',
    v2Text: 'Crea uno schema da zero: formazione, linee di corsa e opzioni.',
    v3Title: 'Animazioni',
    v3Text: 'Anima per fasi, regola il timing e migliora la chiarezza.',
    v4Title: 'Esporta e condividi',
    v4Text: 'Esporta come immagine e condividi lo schema con staff e giocatori.',
    v5Title: 'Esempi Lineout',
    v5Text: 'Esempi pratici: maul, uscita e opzione secondaria.',
    v6Title: 'Scorciatoie & tips pro',
    v6Text: 'Organizza libreria, tag e versioni per scalare il sistema.',
    tagBasics: 'Base',
    tagPlays: 'Schemi',
    tagAnimations: 'Animazioni',
    tagExport: 'Export',
    watch: 'Guarda',
    footerDocs: 'Guida',
    footerTutorials: 'Video tutorial',
    footerSupport: 'Supporto',
    footerAbout: 'Chi siamo',
    footerContact: 'Contatto',
    footerLegal: 'Legale',
    navTestimonials: 'Testimonianze',
    docsBadge: 'Guida Classroom • Impara subito',
    docsTitle1: 'Documentazione',
    docsTitle2: 'RugbyBoard Pro',
    docsSubtitle: 'Questa guida è pensata come un tutorial passo passo. Troverai lezioni, esempi e best practice per creare schemi, animazioni e condividerli con la squadra.',
    tocTitle: 'Contenuto',
    toc1: '1. Prime mosse',
    toc2: '2. Crea uno schema',
    toc3: '3. Animazioni',
    toc4: '4. Esporta e condividi',
    toc5: '5. Tips pro',
    sidebarTipTitle: 'Tip veloce',
    sidebarTipText: 'Usa nomi chiari per gli schemi (es: “Uscita 9-10”, “Line + Maul”) per trovarli più velocemente.',
    s1Title: '1) Prime mosse',
    s1Text: 'Con RugbyBoard Pro puoi progettare strategie con giocatori, frecce, zone e simboli. Obiettivo: lo staff capisce lo schema in 10 secondi.',
    c1Title: 'Struttura di uno schema',
    c1Text: 'Giocatori + movimento + obiettivo. Mantieni tutto semplice e progressivo.',
    c2Title: 'Colori per ruolo',
    c2Text: 'Differenzia avanti/trequarti con colori per lettura immediata.',
    c3Title: 'Template squadra',
    c3Text: 'Salva le squadre per riutilizzare le formazioni senza rifare tutto.',
    s2Title: '2) Crea uno schema (esempio)',
    s2Text: 'Creiamo uno schema semplice: “Uscita 9-10 + ritorno al 12”. La chiave è la chiarezza: linea principale + opzione.',
    c4Title: 'Step A: Formazione',
    c4Text: 'Posiziona 9, 10 e 12 in modo realistico. Regola le distanze per leggibilità.',
    c5Title: 'Step B: Movimento',
    c5Text: 'Disegna il passaggio 9→10 e la corsa del 12 (opzione 2).',
    c6Title: 'Step C: Salva',
    c6Text: 'Usa una convenzione: Fase + Canale + Obiettivo (es: “F1 Canale2 - Fix”).',
    call1Title: 'Obiettivo didattico',
    call1Text: 'Se un giocatore vede il diagramma, deve capire cosa fare senza altre spiegazioni.',
    s3Title: '3) Animazioni',
    s3Text: 'Le animazioni insegnano timing e sequenza. Anima per fasi: prima il passaggio, poi la corsa, infine l’opzione.',
    c7Title: 'Timing per fasi',
    c7Text: 'Usa delay così lo schema è più facile da seguire.',
    c8Title: 'Riproduzione',
    c8Text: 'Rivedi e regola: se è chiaro a 1.2x, è perfetto.',
    c9Title: 'Lettura visiva',
    c9Text: 'Riduci il rumore: meno frecce, meno note, solo l’essenziale.',
    s4Title: '4) Esporta e condividi',
    s4Text: 'Puoi esportare lo schema come immagine per WhatsApp/gruppi o condividerlo con lo staff. Best practice: versione corta (immagine) + versione completa (animazione).',
    c10Title: 'Esporta immagine',
    c10Text: 'Ottimo per stampa o chat. Mantieni alto contrasto.',
    c11Title: 'Condividi con staff',
    c11Text: 'Centralizza la libreria: tutti vedono la versione corretta.',
    c12Title: 'Best practice',
    c12Text: 'Evita duplicati: usa tag e date per versioning.',
    s5Title: '5) Tips Pro (staff)',
    s5Text: 'Un sistema tattico scala quando la documentazione è coerente. Questi tips rendono gli schemi più facili da insegnare e ripetere.',
    c13Title: 'Tag',
    c13Text: 'Esempi: “attack”, “defense”, “lineout”, “scrum”, “exit”, “kick”.',
    c14Title: 'Checklist sessione',
    c14Text: 'Cosa alleniamo + quali schemi + quali metriche seguiamo.',
    c15Title: 'Standardizzazione',
    c15Text: 'Sempre stessi simboli: frecce, corse, esche, zone.',
    call2Title: 'Modalità classroom',
    call2Text: 'Usa questa pagina come “aula”: una sezione a settimana e esempi per categoria.',
    titleAnd: '&',
    supportTitle: 'Centro Supporto',
    supportText: 'Scegli il canale migliore per risolvere più velocemente.',
    btnContact: 'Contatta',
    btnOpenDocs: 'Apri docs',
    btnWatchVideos: 'Guarda video',
    faqTitle: 'FAQ',
    faqText: 'Risposte rapide alle domande comuni.',
    q1: 'Come creo il mio primo schema?',
    a1: 'Apri l’editor, posiziona i giocatori e disegna il movimento principale. Salva con un nome chiaro.',
    q2: 'Posso esportare un’immagine per WhatsApp?',
    a2: 'Sì. Esporta in PNG/JPG e condividi. Tip: alto contrasto e pochi elementi.',
    q3: 'Funziona su tablet/mobile?',
    a3: 'Sì. Il sito è responsive e funziona benissimo su tablet per campo o riunioni.',
    q4: 'Come segnalo un bug?',
    a4: 'Invia un messaggio tramite Contatto con: passi per riprodurre, screenshot e browser/dispositivo.',
    chgTitle: 'Aggiornamenti del sistema',
    chgText: 'Migliorie recenti (changelog). Modifica queste versioni quando rilasci nuove funzionalità.',
    v210: 'Versione 2.1.0',
    v210date: 'Gen 2026',
    v210h: 'Migliorie chiave',
    v210l1: 'Nuovo sistema di animazioni a fasi.',
    v210l2: 'Migliorie export (qualità e velocità).',
    v210l3: 'Ottimizzazioni generali di performance.',
    v200: 'Versione 2.0.0',
    v200date: 'Dic 2025',
    v200h: 'Lancio',
    v200l1: 'Nuovo editor visuale.',
    v200l2: 'Libreria schemi salvati.',
    v200l3: 'Multi-lingua.',
    v190: 'Versione 1.9.0',
    v190date: 'Ott 2025',
    v190h: 'Stabilità',
    v190l1: 'Migliorie di stabilità e bug fix.',
    v190l2: 'Aggiustamenti visivi per leggibilità.',
    v190l3: 'Migliorie UX su mobile.',
    footerDemo: 'Demo',
    footerUpdates: 'Aggiornamenti',
    heroBadge: 'Generazione Beta — Accesso Anticipato',
    heroTitle1: 'Rivoluziona la tua',
    heroTitle2: 'Strategia di Rugby',
    heroSubtitle: 'Progetta schemi professionali, anima tattiche complesse e condividi strategie con la tua squadra. Tutto in una piattaforma intuitiva e potente.',
    ctaPrimary: 'Prova Gratis ora',
    ctaSecondary: 'Guarda la Demo Live',
    stat1Label: 'Allenatori Attivi',
    stat2Label: 'Schemi Creati',
    stat3Label: 'Paesi',
    featuresTitle: 'Strumenti Pro per Allenatori',
    featuresSubtitle: 'Tutto ciò che ti serve per creare strategie vincenti e comunicarle in modo efficace',
    f1Title: 'Gestione Squadre',
    f1Desc: 'Organizza più squadre con giocatori personalizzabili. Definisci ruoli, assegna numeri e imposta colori unici per ogni formazione.',
    f2Title: 'Strumenti di Disegno Pro',
    f2Desc: 'Crea diagrammi precisi con frecce intelligenti, linee di movimento e forme vettoriali. Perfetto per strategie complesse.',
    f3Title: 'Animazione e Interazione',
    f3Desc: 'Dai vita agli schemi catturando ogni movimento sulla lavagna. Le animazioni rendono l\'esperienza interattiva e visivamente coinvolgente.',
    f4Title: 'Libreria di Schemi',
    f4Desc: 'Archivia e organizza tutte le tue strategie. Cerca, filtra e riutilizza gli schemi salvati con tag personalizzati.',
    f5Title: 'Personalizzazione Totale',
    f5Desc: 'Personalizza ogni dettaglio visivo: campi, giocatori, colori della squadra e stili di disegno secondo il tuo brand.',
    f6Title: 'Collaborazione in Tempo Reale',
    f6Desc: 'Condividi gli schemi con lo staff tecnico. Lavora in simultanea e ricevi feedback immediato dalla squadra.',
    pricingTitle: 'Piani per la Tua Squadra',
    pricingSubtitle: 'Scegli il piano più adatto. Tutti includono una prova gratuita.',
    perMonth: '/mese',
    starterDesc: 'Perfetto per allenatori individuali',
    mostPopular: 'Più Popolare',
    proName: 'Professionale',
    proDesc: 'Per allenatori seri e staff tecnico',
    clubDesc: 'Per club sportivi e organizzazioni',
    s1: 'Nessuna modifica squadre',
    s2: '5 schemi salvati',
    s3: 'Esporta come immagine',
    s4: 'Animazioni base',
    s5: 'Supporto via email',
    p1: 'Modifica squadre',
    p2: 'Schemi illimitati',
    p3: 'Esporta e condividi schemi',
    p4: 'Animazioni avanzate',
    p5: 'Libreria condivisa',
    p6: 'Supporto prioritario',
    c1: 'Tutto incluso in Professionale',
    c2: '12 utenti inclusi',
    c3: '10 ore di formazione PRO',
    c4: 'Brand personalizzato',
    c5: 'Integrazione con sito e social',
    c6: 'Supporto 24/7',
    Free: 'GRATIS',
    startTrial: 'Avvia la Prova',
    contactSales: 'Contatta le Vendite',
    testimonialQuote: '"RugbyBoard Pro ha trasformato completamente il modo in cui prepariamo le nostre strategie. Le animazioni ci permettono di comunicare schemi complessi in modo chiaro e professionale."',
    testimonialAuthor: 'Guido Quadri',
    testimonialRole: 'Head Coach - Bologna Rugby Club',
    ctaButton: 'Inizia la tua prova gratuita',
  },
};

/* ════════════════════════════════════
   ACTIVE PAGE
════════════════════════════════════ */
const page = location.pathname.split('/').pop() || 'index.html';
const isActive = h => {
  if (h.startsWith('#')) return false;
  const p = h.split('/').pop().split('#')[0];
  return p === page || (page === '' && p === 'index.html');
};

let currentLang = localStorage.getItem('rbp-lang') || 'es';

const LANGS = [{code:'es',label:'ES'},{code:'en',label:'US'},{code:'it',label:'IT'}];

function langBtns() {
  return LANGS.map(l =>
    `<button class="rbp-lang-btn${currentLang===l.code?' rbp-is-active':''}" data-rbp-lang="${l.code}" type="button">${l.label}</button>`
  ).join('');
}

/* ════════════════════════════════════
   BUILD NAV
════════════════════════════════════ */
function buildNav(d) {
  const links = [
    {href:'acercade.html', key:'navAbout'},
    {href:'demo.html',     key:'navDemo'},
    {href:'contacto.html', key:'navContact'},
  ];
  const desk = links.map(l =>
    `<a href="${l.href}" class="rbp-nav-link${isActive(l.href)?' rbp-active':''}" data-rbp-i18n="${l.key}">${d[l.key]||l.key}</a>`
  ).join('');
  const ovLinks = links.map(l =>
    `<a href="${l.href}" class="rbp-ov-link${isActive(l.href)?' rbp-active':''}" data-rbp-i18n="${l.key}">${d[l.key]||l.key}</a>`
  ).join('');

  return `
<nav id="rbpNav" role="navigation" aria-label="Navegación principal">
  <a class="rbp-logo" href="index.html" aria-label="RugbyBoard Pro">
    <img src="rbp_Italic.png" alt="RugbyBoard Pro" width="145" height="46"/>
  </a>
  <div class="rbp-nav-menu">
    ${desk}
    <a href="https://rugbyboardpro.com/boardpro.html" rel="noopener noreferrer">
      <button class="rbp-nav-cta" data-rbp-i18n="navCta">${d.navCta||'Comenzar Gratis'}</button>
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
<div class="rbp-overlay" id="rbpOverlay" role="dialog" aria-modal="true" aria-label="Menú">
  <div class="rbp-ov-top">
    <a class="rbp-ov-logo" href="index.html"><img src="rbp_Italic.png" alt="RugbyBoard Pro" width="120" height="38"/></a>
    <button class="rbp-ov-close" id="rbpOvClose" type="button" aria-label="Cerrar">✕</button>
  </div>
  <div class="rbp-ov-links">${ovLinks}</div>
  <a href="https://rugbyboardpro.com/boardpro.html" rel="noopener noreferrer">
    <button class="rbp-ov-cta" data-rbp-i18n="navCta">${d.navCta||'Comenzar Gratis'}</button>
  </a>
  <div class="rbp-ov-lang">${langBtns()}</div>
</div>`;
}

/* ════════════════════════════════════
   BUILD FOOTER
════════════════════════════════════ */
function buildFooter(d) {
  return `
<footer id="rbpFooter" role="contentinfo">
  <div class="rbp-fc">
    <div class="rbp-ft">
      <div>
        <a href="index.html"><img src="rbp_Italic.png" alt="RugbyBoard Pro" class="rbp-fli" width="145" height="44" loading="lazy"/></a>
        <p class="rbp-fd" data-rbp-i18n="footerDesc">${d.footerDesc||''}</p>
      </div>
      <div class="rbp-fc-col">
        <h4 data-rbp-i18n="footerProduct">${d.footerProduct||'Producto'}</h4>
        <div class="rbp-fl">
          <a href="index.html#features" data-rbp-i18n="navFeatures">${d.navFeatures||'Características'}</a>
          <a href="index.html#pricing"  data-rbp-i18n="navPricing">${d.navPricing||'Precios'}</a>
          <a href="demo.html"           data-rbp-i18n="navDemo">${d.navDemo||'Demo'}</a>
          <a href="soporte.html"        data-rbp-i18n="navSupport">${d.navSupport||'Soporte'}</a>
        </div>
      </div>
      <div class="rbp-fc-col">
        <h4 data-rbp-i18n="footerResources">${d.footerResources||'Recursos'}</h4>
        <div class="rbp-fl">
          <a href="document.html" data-rbp-i18n="navDocs">${d.navDocs||'Docs'}</a>
          <a href="soporte.html"  data-rbp-i18n="navSupport">${d.navSupport||'Soporte'}</a>
        </div>
      </div>
      <div class="rbp-fc-col">
        <h4 data-rbp-i18n="footerCompany">${d.footerCompany||'Compañía'}</h4>
        <div class="rbp-fl">
          <a href="acercade.html"  data-rbp-i18n="navAbout">${d.navAbout||'Acerca de'}</a>
          <a href="contacto.html"  data-rbp-i18n="navContact">${d.navContact||'Contacto'}</a>
          <a href="#"              data-rbp-i18n="footerLegal">${d.footerLegal||'Legal'}</a>
        </div>
      </div>
    </div>
    <div class="rbp-fb">
      <small class="rbp-cp" data-rbp-i18n="footerText">${d.footerText||''}</small>
      <div class="rbp-sl">
        <a href="#" class="rbp-si" aria-label="Twitter"   rel="noopener noreferrer"><i class="fab fa-x-twitter"></i></a>
        <a href="#" class="rbp-si" aria-label="Facebook"  rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
        <a href="#" class="rbp-si" aria-label="Instagram" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
        <a href="#" class="rbp-si" aria-label="LinkedIn"  rel="noopener noreferrer"><i class="fab fa-linkedin"></i></a>
        <a href="#" class="rbp-si" aria-label="YouTube"   rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
  </div>
</footer>`;
}

/* ════════════════════════════════════
   INJECT
════════════════════════════════════ */
const wrapper = document.querySelector('.content-wrapper, .content') || document.body;
const navRoot = document.createElement('div');
const ftrRoot = document.createElement('div');
navRoot.id = 'rbp-nav-root';
ftrRoot.id = 'rbp-footer-root';

let navDone=false, ftrDone=false;
for (const node of Array.from(wrapper.childNodes)) {
  if (node.nodeType === 8) {
    const v = node.nodeValue.trim();
    if (v==='RBP_NAV'    && !navDone) { wrapper.insertBefore(navRoot,node); wrapper.removeChild(node); navDone=true; }
    if (v==='RBP_FOOTER' && !ftrDone) { wrapper.insertBefore(ftrRoot,node); wrapper.removeChild(node); ftrDone=true; }
  }
}
if (!navDone) wrapper.insertBefore(navRoot, wrapper.firstChild);
if (!ftrDone) wrapper.appendChild(ftrRoot);

/* ════════════════════════════════════
   LANGUAGE ENGINE — translates EVERYTHING
════════════════════════════════════ */
function applyLang(lang) {
  const d = T[lang] || T.es;
  currentLang = lang;

  // Rebuild nav + footer
  navRoot.innerHTML = buildNav(d);
  ftrRoot.innerHTML = buildFooter(d);

  // Translate ALL [data-i18n] on the page (page content)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const v = d[el.dataset.i18n];
    if (v !== undefined) el.textContent = v;
  });
  // Translate [data-rbp-i18n] (nav/footer generated elements)
  document.querySelectorAll('[data-rbp-i18n]').forEach(el => {
    const v = d[el.dataset.rbpI18n];
    if (v !== undefined) el.textContent = v;
  });

  // Active lang buttons
  document.querySelectorAll('.rbp-lang-btn').forEach(b =>
    b.classList.toggle('rbp-is-active', b.dataset.rbpLang === lang)
  );

  document.documentElement.lang = lang;
  localStorage.setItem('rbp-lang', lang);
  bindEvents();
}

/* ════════════════════════════════════
   EVENTS
════════════════════════════════════ */
function bindEvents() {
  const burger  = document.getElementById('rbpBurger');
  const overlay = document.getElementById('rbpOverlay');
  const close   = document.getElementById('rbpOvClose');
  const nav     = document.getElementById('rbpNav');
  if (!burger || !overlay) return;

  const open = () => {
    overlay.classList.add('rbp-is-open');
    burger.classList.add('rbp-is-open');
    burger.setAttribute('aria-expanded','true');
    document.body.style.overflow='hidden';
    setTimeout(()=>overlay.querySelector('.rbp-ov-link')?.focus(),80);
  };
  const closeMenu = () => {
    overlay.classList.remove('rbp-is-open');
    burger.classList.remove('rbp-is-open');
    burger.setAttribute('aria-expanded','false');
    document.body.style.overflow='';
  };

  burger.addEventListener('click', ()=> overlay.classList.contains('rbp-is-open') ? closeMenu() : open());
  close?.addEventListener('click', closeMenu);
  overlay.querySelectorAll('.rbp-ov-link,.rbp-ov-cta').forEach(el => el.addEventListener('click', closeMenu));
  window.addEventListener('keydown', e=>{ if(e.key==='Escape') closeMenu(); });
  window.addEventListener('resize',  ()=>{ if(window.innerWidth>920) closeMenu(); });

  // Scroll nav shrink
  const onScroll = ()=> nav?.classList.toggle('rbp-scrolled', window.scrollY>10);
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Lang buttons
  document.querySelectorAll('.rbp-lang-btn').forEach(b=>
    b.addEventListener('click', ()=> applyLang(b.dataset.rbpLang))
  );
}

/* ════════════════════════════════════
   INIT
════════════════════════════════════ */
applyLang(currentLang);

})();
