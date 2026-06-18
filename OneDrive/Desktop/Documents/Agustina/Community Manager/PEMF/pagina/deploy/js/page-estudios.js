/* ══ BRAND / TYPE CONFIG ══════════════════════════════ */
const B={
  lifewave:{l:'LifeWave',      c:'#7c3aed',lg:'linear-gradient(135deg,#7c3aed,#a78bfa)',bg:'#f5f3ff',tc:'#5b21b6'},
  drinkhrw:{l:'DrinkHRW · H₂', c:'#0369a1',lg:'linear-gradient(135deg,#0369a1,#38bdf8)',bg:'#f0f9ff',tc:'#0c4a6e'},
  gamma:   {l:'Gamma 40Hz',    c:'#4338ca',lg:'linear-gradient(135deg,#4338ca,#818cf8)',bg:'#eef2ff',tc:'#312e81'},
  neurogum:{l:'Neuro Gum',     c:'#059669',lg:'linear-gradient(135deg,#059669,#34d399)',bg:'#ecfdf5',tc:'#064e3b'},
  myvitalc:{l:'MyVital C',     c:'#b45309',lg:'linear-gradient(135deg,#b45309,#fbbf24)',bg:'#fffbeb',tc:'#78350f'},
  analemma:{l:'Analemma',      c:'#0e7490',lg:'linear-gradient(135deg,#0e7490,#22d3ee)',bg:'#ecfeff',tc:'#164e63'},
  all:     {l:'Ciencia de base',c:'#475569',lg:'linear-gradient(135deg,#475569,#94a3b8)',bg:'#f1f5f9',tc:'#334155'},
};
const T={
  rct:         {l:'RCT',           sc:'RCT',         ev:4,el:'Alta',       tc:'#166534',bg:'#dcfce7'},
  piloto:      {l:'Piloto',        sc:'Piloto',       ev:2,el:'Preliminar', tc:'#92400e',bg:'#fef3c7'},
  revision:    {l:'Revisión',      sc:'Revisión',     ev:3,el:'Moderada',   tc:'#1e40af',bg:'#dbeafe'},
  meta:        {l:'Meta-análisis', sc:'Meta',         ev:5,el:'Muy alta',   tc:'#6b21a8',bg:'#f3e8ff'},
  animal:      {l:'Preclínico',    sc:'Animal',       ev:1,el:'Preclínica', tc:'#9a3412',bg:'#ffedd5'},
  vitro:       {l:'In vitro',      sc:'In vitro',     ev:1,el:'Explorat.',  tc:'#9d174d',bg:'#fce7f3'},
  factibilidad:{l:'Factibilidad',  sc:'Factibilidad', ev:2,el:'Preliminar', tc:'#164e63',bg:'#cffafe'},
  seguridad:   {l:'Seguridad',     sc:'Seguridad',    ev:2,el:'Preliminar', tc:'#374151',bg:'#f3f4f6'},
};

/* ══ TEMAS (papers / evidencia) ═══════════════════════ */
const TemasPapers={
  'campos-em':    {l:'Campos EM y PEMF',          c:'#1a4fb6',bg:'#eff6ff',tc:'#1e40af'},
  'agua-h2':      {l:'Agua e hidrógeno',           c:'#0369a1',bg:'#f0f9ff',tc:'#0c4a6e'},
  'mitocondria':  {l:'Mitocondria y energía',      c:'#b45309',bg:'#fffbeb',tc:'#78350f'},
  'luz':          {l:'Luz y fotobiomodulación',    c:'#d97706',bg:'#fff7ed',tc:'#9a3412'},
  'quantum':      {l:'Biología cuántica',          c:'#059669',bg:'#ecfdf5',tc:'#064e3b'},
  'fascia':       {l:'Fascia y tejido conectivo',  c:'#0d9488',bg:'#f0fdfa',tc:'#115e59'},
  'biocampo':     {l:'Biocampo y consciencia',     c:'#7c3aed',bg:'#f5f3ff',tc:'#5b21b6'},
  'longevidad':   {l:'Longevidad y epigenética',   c:'#9333ea',bg:'#faf5ff',tc:'#6b21a8'},
  'neuro':        {l:'Neurociencia y cognición',   c:'#4338ca',bg:'#eef2ff',tc:'#312e81'},
  'sueno':        {l:'Sueño y sistema nervioso',   c:'#0891b2',bg:'#ecfeff',tc:'#155e75'},
  'dolor':        {l:'Dolor y regeneración',       c:'#dc2626',bg:'#fef2f2',tc:'#991b1b'},
  'antioxidantes':{l:'Antioxidantes y estrés ox.', c:'#65a30d',bg:'#f7fee7',tc:'#3f6212'},
  'microbioma':   {l:'Microbioma y metabolismo',   c:'#ea580c',bg:'#fff7ed',tc:'#9a3412'},
};

/* ══ RIGOR (nivel de evidencia) + FINANCIAMIENTO (modo pro) ══ */
const RigorCfg={
  alta:      {l:'Alta evidencia',         c:'#15803d'},
  moderada:  {l:'Evidencia moderada',     c:'#1e40af'},
  preliminar:{l:'Preliminar',             c:'#b45309'},
  preclinica:{l:'Preclínica/exploratoria',c:'#9d174d'},
};
function tierOf(s){ const e=(T[s.type]||{}).ev||1; return e>=4?'alta':e===3?'moderada':e===2?'preliminar':'preclinica'; }
function fundingFlag(s){
  const note=(s.note||'').toLowerCase();
  if(/fabricante|financiad/.test(note)) return {l:'Financiado por fabricante',c:'#92400e',bg:'#fef3c7'};
  if(/no publicad|preprint|sin revisi/.test(note)) return {l:'No revisado por pares',c:'#9a3412',bg:'#ffedd5'};
  return {l:'Independiente',c:'#15803d',bg:'#dcfce7'};
}

/* ══ TEMAS (biblioteca) ═══════════════════════════════ */
const Temas={
  bioelectricidad:{l:'Bioelectricidad',  c:'#1a4fb6',bg:'#eff6ff',tc:'#1e40af'},
  longevidad:     {l:'Longevidad',       c:'#7c3aed',bg:'#f5f3ff',tc:'#5b21b6'},
  agua:           {l:'Agua y estructura',c:'#0369a1',bg:'#f0f9ff',tc:'#0c4a6e'},
  neurociencia:   {l:'Neurociencia',     c:'#4338ca',bg:'#eef2ff',tc:'#312e81'},
  mitocondrias:   {l:'Mitocondrias',     c:'#b45309',bg:'#fffbeb',tc:'#78350f'},
  quantum:        {l:'Biología cuántica',c:'#059669',bg:'#ecfdf5',tc:'#064e3b'},
};

/* ══ GUÍAS CONFIG ══════════════════════════════════════ */
const CatGuias={
  luz:        {l:'Luz & Circadiano',    c:'#b45309',bg:'#fffbeb',tc:'#78350f'},
  agua:       {l:'Agua & Hidratación',  c:'#0369a1',bg:'#f0f9ff',tc:'#0c4a6e'},
  campo:      {l:'Campos EM',           c:'#7c3aed',bg:'#f5f3ff',tc:'#5b21b6'},
  nutricion:  {l:'Nutrición',           c:'#059669',bg:'#ecfdf5',tc:'#064e3b'},
  respiracion:{l:'Respiración',         c:'#1a4fb6',bg:'#eff6ff',tc:'#1e40af'},
};
/* ══ FUENTES CONFIG ═══════════════════════════════════ */
const CampoProf={
  bioelectricidad:{l:'Bioelectricidad', c:'#1a4fb6',bg:'#eff6ff'},
  longevidad:     {l:'Longevidad',      c:'#7c3aed',bg:'#f5f3ff'},
  agua:           {l:'Agua',            c:'#0369a1',bg:'#f0f9ff'},
  epigenetica:    {l:'Epigenética',     c:'#059669',bg:'#ecfdf5'},
  quantum:        {l:'Biología Cuántica',c:'#b45309',bg:'#fffbeb'},
  biofisica:      {l:'Biofísica',       c:'#4338ca',bg:'#eef2ff'},
  respiracion:    {l:'Respiración',     c:'#0891b2',bg:'#ecfeff'},
  neurociencia:   {l:'Neurociencia',    c:'#4338ca',bg:'#eef2ff'},
  circadiano:     {l:'Circadiano',      c:'#b45309',bg:'#fffbeb'},
  biohacking:     {l:'Biohacking',      c:'#059669',bg:'#ecfdf5'},
};
const TipoFuente={
  cientifico:{l:'Científico',  c:'#1a4fb6',bg:'#eff6ff'},
  creator:   {l:'Divulgador',  c:'#7c3aed',bg:'#f5f3ff'},
  comunidad: {l:'Comunidad',   c:'#059669',bg:'#ecfdf5'},
};
const Plataformas={
  instagram:{l:'Instagram',c:'#E1306C',
    icon:'<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path fill="#fff" d="M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7zm0 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.2-8.8a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4z"/></svg>'},
  facebook: {l:'Facebook', c:'#1877F2',
    icon:'<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073c0 6.024 4.388 11.02 10.125 11.927v-8.437H7.078v-3.49h3.047V9.428c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796v8.437C19.612 23.093 24 18.097 24 12.073z"/></svg>'},
  youtube:  {l:'YouTube',  c:'#FF0000',
    icon:'<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/></svg>'},
  podcast:  {l:'Podcast',  c:'#9333EA',
    icon:'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="11" r="3"/><path d="M6.68 4.68A9 9 0 0 0 12 20a9 9 0 1 0 0-18 9 9 0 0 0-5.32 2.68"/><path d="M12 14v6"/><path d="M9 17h6"/></svg>'},
  web:      {l:'Web',      c:'#64748b',
    icon:'<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>'},
};

/* ══ LECTURAS CURADAS ══════════════════════════════════ */
const lecturas=[
  {id:'bk-01',tema:'bioelectricidad',cover:'img/libros/body-electric-cover.jpg',toc_img:null,
   title:'The Body Electric',subtitle:'Electromagnetism and the Foundation of Life',
   author:'Robert O. Becker & Gary Selden',year:1985,editorial:'HarperCollins',
   rec:'El texto fundacional de la bioelectricidad. Becker demostró que corrientes DC endógenas guían la regeneración de huesos y tejidos — la base científica directa de PEMF y fotobiomodulación. Leerlo es entender por qué los campos EM externos producen efectos biológicos reales.',
   insights:['Los campos EM del cuerpo regulan activamente la regeneración celular','La corriente DC endógena controla la cicatrización y el crecimiento óseo','Los campos externos pueden potenciar o inhibir estos procesos naturales'],
   tags:['PEMF','Fotobiomodulación','Regeneración','Bioelectricidad'],
   link:'https://www.amazon.com/Body-Electric-Electromagnetism-Foundation-Life/dp/0688069711',
   toc:['El signo de la salamandra — regeneración de miembros e inducción eléctrica','La membrana que percibe — el sistema nervioso como semiconductor','El telégrado del cerebro posterior — la corriente DC perineural','El hueso: tejido dinámico y piezoeléctrico','En alianza con los microbios — campos EM y sistema inmune','El sistema de control DC — el regulador oculto de la biología','La promesa de la medicina regenerativa','Los peligros del campo electromagnético artificial','Política de la ciencia — la resistencia institucional al paradigma eléctrico','Un nuevo modelo del organismo vivo']},

  {id:'bk-02',tema:'longevidad',cover:'img/libros/lifespan-cover.jpg',toc_img:null,
   title:'Lifespan',subtitle:'Why We Age — and Why We Don\'t Have To',
   author:'David A. Sinclair & Matthew D. LaPlante',year:2019,editorial:'Atria Books',
   rec:'Sinclair (Harvard) presenta la teoría informacional del envejecimiento: no envejecemos por daño sino por pérdida de información epigenética. Sus soluciones apuntan exactamente a lo que activa GHK-Cu en X39 — restaurar patrones celulares juveniles a nivel epigenético.',
   insights:['El envejecimiento es pérdida de información epigenética, no de ADN','Las sirtuinas y NAD+ son reguladores centrales del reloj biológico','Intervenciones externas pueden resetear el epigenoma hacia estados más jóvenes'],
   tags:['Longevidad','X39','GHK-Cu','Epigenética','Sirtuinas'],
   link:'https://www.amazon.com/Lifespan-Why-Age-Dont-Have/dp/1501191977',
   toc:['Una breve historia del envejecimiento — la búsqueda de la inmortalidad','La teoría informacional del envejecimiento — por qué el epigenoma colapsa','Sirtuinas: los guardianes del genoma','NAD+ — la molécula que enciende el sistema de defensa','Senescencia celular — células zombi y cómo eliminarlas','Restricción calórica, ayuno intermitente y mTOR','Resveratrol, rapamicina y metformina — las moléculas de la longevidad','Revertir el tiempo — reprogramación de Yamanaka en acción','El futuro: diagnóstico temprano y medicina preventiva radical','Vivir más no basta — construir una civilización que envejece bien']},

  {id:'bk-03',tema:'agua',cover:'img/libros/fourth-phase-water-cover.jpg',toc_img:null,
   title:'The Fourth Phase of Water',subtitle:'Beyond Solid, Liquid, and Vapor',
   author:'Gerald H. Pollack',year:2013,editorial:'Ebner & Sons',
   rec:'Pollack (U. Washington) demostró experimentalmente que el agua forma una cuarta fase estructurada — EZ water — en superficies hidrofílicas. Es el sustento científico más sólido para entender por qué el agua Analemma y el H₂ molecular producen efectos biológicos que el agua común no tiene.',
   insights:['El agua forma una "zona de exclusión" ordenada near de superficies hidrofílicas','EZ water posee mayor energía y densidad que el agua bulk','La luz infrarroja amplifica la capa EZ — implicaciones directas para fotobiomodulación'],
   tags:['Agua estructurada','Analemma','H₂','DrinkHRW','EZ Water'],
   link:'https://www.amazon.com/Fourth-Phase-Water-Beyond-Liquid/dp/0962689548',
   toc:['El rompecabezas del agua — lo que la ciencia estándar no explica','Capas ordenadas junto a superficies hidrofílicas — el primer experimento','La zona de exclusión (EZ) — estructura cristalina del agua viva','Carga eléctrica del EZ — separación de protones y electrones','La luz como combustible del agua estructurada — IR y UV','EZ water y la célula — por qué el agua intracelular es diferente','Geles, coloides y la física de los fluidos biológicos','Efectos sobre proteínas, membranas y ADN','Implicaciones para salud — deshidratación, enfermedad y EZ','El agua como fuente de energía biológica — un paradigma nuevo']},

  {id:'bk-04',tema:'neurociencia',cover:'img/libros/telomere-effect-cover.jpg',toc_img:null,
   title:'The Telomere Effect',subtitle:'A Revolutionary Approach to Living Younger, Healthier, Longer',
   author:'Elizabeth Blackburn & Elissa Epel',year:2017,editorial:'Grand Central Publishing',
   rec:'Blackburn (Nobel 2009) explica cómo el estrés crónico, la inflamación y el estilo de vida acortan los telómeros — y cómo intervenciones específicas los protegen. Marco perfecto para entender por qué los productos antiinflamatorios de PEMF (H₂, X39, IceWave) tienen impacto a largo plazo.',
   insights:['Los telómeros son marcadores directos de envejecimiento celular y salud','El estrés oxidativo e inflamatorio acelera el acortamiento telomérico','Intervenciones antiestrés y antioxidantes preservan y pueden alargar los telómeros'],
   tags:['Longevidad','Telómeros','Inflamación','X39','H₂'],
   link:'https://www.amazon.com/Telomere-Effect-Revolutionary-Approach-Healthier/dp/1455587982',
   toc:['¿Qué son los telómeros y por qué importan?','Telomerasa — la enzima que reconstruye el reloj biológico','El reloj celular y el envejecimiento prematuro','Estrés crónico y erosión telomérica — el mecanismo directo','El cuerpo bajo amenaza — cortisol, inflamación y telómeros cortos','La mente importa — pensamientos negativos que acortan la vida celular','Comida, sueño y movimiento — lo que protege el telómero','Revertir el daño — ejercicio, meditación y conexión social','Los primeros años de vida y el capital telomérico','Crear una cultura de longevidad — de lo individual a lo colectivo']},

  {id:'bk-05',tema:'mitocondrias',cover:'img/libros/mitochondria-medicine-cover.jpg',toc_img:null,
   title:'Mitochondria and the Future of Medicine',subtitle:'The Key to Understanding Disease, Chronic Illness, Aging, and Life Itself',
   author:'Lee Know',year:2018,editorial:'Chelsea Green Publishing',
   rec:'La guía más completa sobre salud mitocondrial. Lee Know explica por qué casi toda enfermedad crónica tiene disfunción mitocondrial en su raíz — y cómo luz roja/infrarroja y campos EM potencian la producción de ATP. Base teórica central para entender LifeWave y fotobiomodulación.',
   insights:['Las mitocondrias regulan energía, apoptosis y señalización celular — no solo ATP','La luz roja e IR potencia el Complejo IV de la cadena respiratoria mitocondrial','CoQ10, PQQ y antioxidantes lipídicos protegen el ADN mitocondrial del daño oxidativo'],
   tags:['Mitocondrias','ATP','Fotobiomodulación','LifeWave','ESS60','Longevidad'],
   link:'https://www.amazon.com/Mitochondria-Future-Medicine-Understanding-Disease/dp/1603587276',
   toc:['La central energética — qué son las mitocondrias y de dónde vienen','La cadena de transporte de electrones — producción de ATP paso a paso','Disfunción mitocondrial y enfermedad crónica — la conexión directa','Radicales libres y estrés oxidativo — la doble cara de la energía','CoQ10 — el transportador esencial que deficiente en pacientes con estatinas','PQQ — la molécula que estimula la biogénesis mitocondrial','D-ribosa, magnesio y carnitina — el trío de recuperación energética','Luz roja e infrarroja — fotobiomodulación del Complejo IV','Dieta, ayuno y sueño como reguladores mitocondriales','El futuro de la medicina mitocondrial — diagnóstico y terapia']},

  {id:'bk-06',tema:'quantum',cover:'img/libros/biology-of-belief-cover.jpg',toc_img:null,
   title:'The Biology of Belief',subtitle:'Unleashing the Power of Consciousness, Matter & Miracles',
   author:'Bruce H. Lipton',year:2005,editorial:'Mountain of Love Productions',
   rec:'Lipton (Stanford) demostró que el entorno celular — no el ADN — controla la expresión génica. Las membranas celulares son antenas que procesan señales electromagnéticas del entorno antes que instrucciones genéticas. Contexto clave para entender por qué parches LifeWave producen respuestas a través de señales de luz.',
   insights:['El ambiente controla la expresión génica por encima del ADN (epigenética práctica)','Las membranas celulares son antenas que procesan señales electromagnéticas del entorno','La percepción y el estrés moldean la biología celular de forma medible y reversible'],
   tags:['Epigenética','LifeWave','Señalización celular','Biología cuántica'],
   link:'https://www.amazon.com/Biology-Belief-Unleashing-Consciousness-Miracles/dp/1401923127',
   toc:['Lecciones de las células clonadas — el entorno manda','La membrana inteligente — receptor y efector de señales','El papel de las proteínas — receptores como antenas moleculares','El mito del ADN — por qué los genes no son el destino','Epigenética — cómo el entorno controla la expresión génica','El efecto placebo y el efecto nocebo — biología de la creencia','El cerebro consciente y el subconsciente — el piloto automático de la biología','Evolución cuántica — más allá del darwinismo mecánico','Conciencia y materia — ciencia y espiritualidad convergen','Cómo reescribir el programa subconsciente']},

  {id:'bk-07',tema:'longevidad',cover:'img/libros/breath-cover.jpg',toc_img:null,
   title:'Breath',subtitle:'The New Science of a Lost Art',
   author:'James Nestor',year:2020,editorial:'Riverhead Books',
   rec:'Nestor investiga décadas de ciencia sobre respiración y revela cómo la mayoría respira de forma subóptima. La respiración nasal lenta regula el CO₂, mejora la oxigenación celular y activa el sistema parasimpático — la base fisiológica de por qué intervenciones de bienestar como las de PEMF necesitan un sistema nervioso en equilibrio para funcionar.',
   insights:['El CO₂ — no el O₂ — regula la liberación de oxígeno a los tejidos (efecto Bohr)','La respiración lenta por nariz optimiza la variabilidad de frecuencia cardíaca y el estado mental','La nariz produce óxido nítrico, vasodilatador que mejora la perfusión tisular'],
   tags:['Oxigenación','Bienestar','Sistema nervioso','HRV','Base fisiológica'],
   link:'https://www.amazon.com/Breath-New-Science-Lost-Art/dp/0735213615',
   toc:['Los peores respiradores del reino animal — el problema humano moderno','Respiración bucal — consecuencias estructurales, dentales y cognitivas','La nariz — el filtro, humidificador y productor de óxido nítrico','Exhalar — por qué la espiración lenta es tan importante como la inspiración','Lento — 5.5 segundos de inhalación, 5.5 de exhalación: la respiración perfecta','Menos — por qué respiramos demasiado y el papel del CO₂','Masticar — la mandíbula atrofiada y su impacto en las vías aéreas','Respirar más — técnicas de hiperventilación controlada y sus efectos','Sostener — el apnea voluntaria y la fisiología de los buzos','Rápido, lento y nada — espectro completo de la respiración humana']},

  {id:'bk-08',tema:'quantum',cover:'img/libros/optimize-cover.jpg',toc_img:'img/libros/optimize-toc.jpg',
   title:'Optimize',subtitle:'A Groundbreaking 7-Step Plan to Health and Longevity Through Quantum Biology',
   author:'Dr. Catherine Clinton',year:2026,editorial:'Fair Winds Press',
   rec:'Clinton, médica naturopática, traduce la biología cuántica a un protocolo clínico de 7 pasos. Demuestra cómo la luz, el agua y el sonido afectan al cuerpo a nivel subatómico — la base científica exacta de por qué estímulos no farmacológicos como los parches LifeWave producen efectos celulares medibles.',
   insights:['La biología cuántica explica cómo luz, agua y sonido impactan el cuerpo a nivel subatómico, no solo molecular','El cuerpo es un sistema de coherencia cuántica altamente sensible al entorno: temperatura, luz, frecuencia electromagnética','Intervenciones no farmacológicas pueden reprogramar la expresión celular si se alinean con los ritmos biológicos naturales'],
   tags:['Biología cuántica','Longevidad','Fotobiomodulación','Luz','Agua'],
   link:'https://www.amazon.com/Optimize-Groundbreaking-Longevity-Through-Quantum/dp/0760398569',
   toc:['Los fundamentos de la biología cuántica — más allá de la bioquímica clásica','Luz — el nutriente invisible que regula cada célula','Agua — el medio de coherencia cuántica del organismo','Sonido y vibración — frecuencia como medicina','El campo electromagnético del cuerpo — antena y receptor','Circadiano cuántico — sincronización con el entorno natural','El plan de 7 pasos — protocolo integrado de optimización cuántica']},

  {id:'bk-09',tema:'neurociencia',cover:'img/libros/golden-pamphlet-cover.jpg',toc_img:'img/libros/golden-pamphlet-toc.jpg',
   title:'The Golden Pamphlet',subtitle:'Healing Neurodivergent Symptoms with Vitamins and Nutrients',
   author:'Dr. Carl C. Pfeiffer',year:1980,editorial:'Museum of Tarot — Suppressed Editions',
   rec:'Pfeiffer (Emory University), pionero de la psiquiatría ortomolecular, demostró que deficiencias específicas de minerales y vitaminas están en la raíz de condiciones neurológicas. Un texto fundacional que conecta neurología, nutrición y bioquímica cerebral antes de que la medicina convencional adoptara estas ideas.',
   insights:['Las deficiencias de zinc, B6 y ácido fólico son bases bioquímicas de muchos síntomas neurodivergentes documentados','El cerebro es un órgano bioquímico: lo que se ingiere afecta directamente neurotransmisores y función cognitiva','Intervenciones nutricionales específicas pueden modificar el estado mental sin fármacos en casos clínicamente documentados'],
   tags:['Neurociencia','Nutrición','Suplementación','Salud mental','Ortomolecular'],
   link:'https://www.amazon.com/golden-pamphlet-rehabilitation-schizoprenic-nutrients/dp/B0006YNLHY',
   toc:['Bioquímica cerebral y nutrientes esenciales','Zinc y B6 — los cofactores más deficientes en trastornos neurológicos','Histamina y pirroluria — dos metabolismos clave en neurología ortomolecular','Protocolos nutricionales para condiciones del espectro','Vitaminas del grupo B — reguladores del sistema nervioso central','Minerales traza y función cognitiva — manganeso, cobre, cromo','Casos clínicos documentados — resultados sin farmacología']},

  {id:'bk-10',tema:'agua',cover:'img/libros/living-language-water-cover.jpg',toc_img:'img/libros/living-language-water-toc.jpg',
   title:'The Living Language of Water',subtitle:'',
   author:'Veda Austin',year:2024,editorial:'BookBaby',
   rec:'Austin documenta años de experimentos fotográficos donde el agua congela formando estructuras cristalinas únicas en respuesta a intenciones, palabras y música. Extiende el trabajo de Emoto con metodología propia y plantea el agua como medio de información biológica — relevante para entender por qué la estructura del agua Analemma produce efectos distintos al agua convencional.',
   insights:['El agua responde a la intención y el sonido formando estructuras cristalinas distintas y reproducibles bajo las mismas condiciones','Como medio universal del cuerpo humano, la calidad informacional del agua puede influir en la biología celular','El agua puede funcionar como sistema de almacenamiento y transmisión de información — no solo como solvente pasivo'],
   tags:['Agua','Analemma','Conciencia','Estructura del agua','Información biológica'],
   link:'https://www.vedaaustin.com/vedas-book',
   toc:['El agua como espejo de la conciencia','Metodología de la fotografía de cristales de hielo','Experimentos reproducibles — intención y estructura cristalina','Agua y sonido — cómo la frecuencia modifica la estructura','El agua en el cuerpo — implicaciones biológicas','Agua y emoción — patrones documentados','Hacia una ciencia del agua viva']},

  {id:'bk-11',tema:'quantum',cover:'img/libros/subtle-body-cover.jpg',toc_img:'img/libros/subtle-body-toc.jpg',
   title:'The Subtle Body',subtitle:'An Encyclopedia of Your Energetic Anatomy',
   author:'Cyndi Dale',year:2009,editorial:'Sounds True',
   rec:'La enciclopedia más completa de anatomía energética humana. Dale sintetiza meridianos, chakras y campos bioeléctricos desde perspectivas tanto tradicionales como modernas. Marco conceptual para entender por qué el campo electromagnético del cuerpo es una interfaz biológica real — base del funcionamiento de parches de fotobiomodulación y terapias de campo.',
   insights:['El cuerpo posee capas de organización más allá de lo anatómico: campos bioeléctricos, meridianos y centros de energía medibles','Los meridianos de acupuntura corresponden a rutas de conductividad eléctrica documentadas por investigación experimental moderna','La anatomía sutil es el puente conceptual entre física cuántica y las tradiciones médicas de 5,000 años'],
   tags:['Energía sutil','Meridianos','Campo bioeléctrico','Acupuntura','Fotobiomodulación'],
   link:'https://www.amazon.com/Subtle-Body-Encyclopedia-Energetic-Anatomy/dp/1591796717',
   toc:['Qué es el cuerpo sutil — historia y ciencia','Los chakras — centros de procesamiento energético','Los meridianos — sistema de distribución de energía vital','El campo áurico — capas y funciones del campo bioeléctrico','Anatomía sutil en la medicina ayurvédica','Meridianos y acupuntura — evidencia científica moderna','Sanación energética — modalidades y mecanismos']},

  {id:'bk-12',tema:'longevidad',cover:'img/libros/carnivore-diet-cover.jpg',toc_img:'img/libros/carnivore-diet-toc.jpg',
   title:'The Carnivore Diet',subtitle:'',
   author:'Shawn Baker MD',year:2019,editorial:'Victory Belt Publishing',
   rec:'Baker, cirujano ortopédico y atleta de élite, presenta la evidencia clínica detrás de la dieta carnívora para reducción de inflamación sistémica, salud articular y estabilización metabólica. Desafía el paradigma dominante de la pirámide alimentaria con casos documentados y análisis de biomarcadores.',
   insights:['Una dieta basada en productos animales elimina antinutrientes y lectinas que promueven inflamación crónica sistémica','Miles de casos documentan mejoría en condiciones autoinmunes, dolor articular y síntomas metabólicos con esta dieta','El cuerpo humano puede funcionar con proteínas y grasas animales como combustible primario sin los efectos negativos del dogma convencional'],
   tags:['Nutrición','Inflamación','Longevidad','Metabolismo','Dieta'],
   link:'https://www.amazon.com/Carnivore-Diet-Shawn-Baker/dp/162860350X',
   toc:['El caso contra la dieta convencional — por qué el dogma falla','Historia evolutiva — el ser humano como carnívoro','Proteínas animales y salud — revisando la evidencia','Grasa saturada — desmontando el mito del colesterol','Beneficios clínicos documentados — inflamación, autoinmunidad y metabolismo','El protocolo carnívoro — implementación y adaptación','Casos de transformación — evidencia anecdótica y de laboratorio']},

  {id:'bk-13',tema:'quantum',cover:'img/libros/kozyrev-mirrors-cover.jpg',toc_img:'img/libros/kozyrev-mirrors-toc.jpg',
   title:'Kozyrev Mirrors',subtitle:'Time Travel Secrets Revealed',
   author:'Nikolai Kozyrev (ed. Brent Stone)',year:2023,editorial:'Museum of Tarot — New Science Editions',
   rec:'Recopilación de las investigaciones originales del astrofísico soviético Nikolai Kozyrev (1908–1983) sobre campos de torsión y la naturaleza física del tiempo. Kozyrev realizó experimentos reproducibles —patentados— que sugieren que el tiempo posee propiedades físicas activas capaces de influir en sistemas biológicos, anticipando décadas de física del campo de punto cero.',
   insights:['Kozyrev demostró experimentalmente que el tiempo tiene propiedades físicas medibles — no es solo un marco de referencia pasivo','Los espejos Kozyrev (espirales de aluminio pulido) concentran el campo de torsión produciendo efectos documentados en organismos biológicos','La investigación soviética sobre campos de torsión permaneció clasificada décadas y anticipa conceptos actuales de campo de punto cero y campo de Higgs'],
   tags:['Campos de torsión','Física cuántica','Campo EM','Biología cuántica','Energía sutil'],
   link:'https://www.aetherforce.energy/kozyrevs-mirrors-bending-time-altering-consciousness/',
   toc:['Nikolai Kozyrev — biografía del astrofísico y contexto soviético','La naturaleza física del tiempo — causalidad activa','Experimentos de torsión — metodología y resultados originales','Los espejos Kozyrev — diseño, construcción y uso','Efectos biológicos documentados en el Instituto de Medicina Experimental de Siberia','Conexión con campos de punto cero y física moderna','Documentos y patentes originales traducidos del ruso']},
];

/* ══ GUÍAS ════════════════════════════════════════════ */
const guias=[
  {id:'g-01',categoria:'luz',
   titulo:'Exposición Solar Inteligente',
   subtitulo:'Protocolo para optimizar vitamina D, mitocondrias y ritmo circadiano',
   descripcion:'La luz solar es el estímulo biológico más potente disponible sin costo. Esta guía cubre los protocolos de exposición para maximizar la síntesis de vitamina D, activar la fotobiomodulación natural y sincronizar el reloj circadiano — con los tiempos exactos según latitud y estación.',
   nivel:'intermedio',duracion:'14 min',estado:'disponible',
   tags:['Vitamina D','Circadiano','Fotobiomodulación','UV Index'],
   puntos:['Exposición ocular al amanecer sin lentes para disparar el cortisol matutino','15-20 min de piel expuesta al mediodía solar para síntesis de vitamina D','Por qué la hora solar importa más que la hora del reloj','Evitar luz azul artificial después del atardecer para no suprimir melatonina'],
  },
  {id:'g-02',categoria:'campo',
   titulo:'Reducción de nEMF en el Hogar',
   subtitulo:'Protocolo para minimizar campos electromagnéticos artificiales',
   descripcion:'Los campos EM no naturales (nEMF) del WiFi, celulares y electrodomésticos activan canales de calcio voltaje-dependientes (VGCC), generando estrés oxidativo crónico según el trabajo de Martin Pall. Este protocolo prioriza los cambios de mayor impacto con menor esfuerzo.',
   nivel:'basico',duracion:'10 min',estado:'disponible',
   tags:['nEMF','VGCC','WiFi','Dormitorio','Estrés oxidativo'],
   puntos:['Celular fuera del dormitorio o en modo avión al dormir','WiFi en timer: apagado automático de 23 a 7 hs','Distancia mínima de 1.5 m a routers activos','Priorizar ethernet sobre WiFi en escritorios fijos'],
  },
  {id:'g-03',categoria:'agua',
   titulo:'Hidratación Celular Real',
   subtitulo:'Por qué el agua que tomás puede no estar hidratando tus células',
   descripcion:'No toda el agua hidrata igual. La estructura molecular del agua determina con qué eficiencia penetra en las células. Esta guía cubre la calidad del agua, el timing de ingesta y cómo el H₂ molecular y el agua Analemma cambian la ecuación de la hidratación celular.',
   nivel:'intermedio',duracion:'12 min',estado:'disponible',
   tags:['EZ Water','H₂','Analemma','Hidratación celular','Pollack'],
   puntos:['EZ water: la cuarta fase del agua que ocurre dentro de tus células','Por qué el agua a temperatura ambiente hidrata mejor que la fría','H₂ molecular: el antioxidante más pequeño que existe, penetra mitocondrias','Timing: cuándo tomar agua para máxima absorción celular'],
  },
  {id:'g-04',categoria:'luz',
   titulo:'Ciclo Circadiano: Protocolo de 24 hs',
   subtitulo:'Optimizá tu reloj biológico de amanecer a amanecer',
   descripcion:'El reloj circadiano regula hormonas, metabolismo, sistema inmune y reparación celular. Un circadiano desincronizado es el factor común de la mayoría de las enfermedades crónicas modernas. Esta guía cubre luz, temperatura, alimentación y movimiento en un protocolo completo.',
   nivel:'avanzado',duracion:'20 min',estado:'disponible',
   tags:['Melatonina','Cortisol','Circadiano','Sueño','Cronobiología'],
   puntos:['Cortisol matutino: luz solar antes del café para no aplastarlo con adenosina','Feeding window alineado con el arco solar (10 hs desde desayuno)','Temperatura corporal como señal zeitgeber: ducha fría matutina','Protocolo nocturno: temperatura del cuarto, lentes ámbar y suplementos'],
  },
  {id:'g-05',categoria:'nutricion',
   titulo:'Suplementación con Criterio',
   subtitulo:'Lo que tiene evidencia real y sinergia con protocolos PEMF',
   descripcion:'El mercado de suplementos tiene mucho ruido. Esta guía filtra los que tienen evidencia sólida y sinergia directa con los protocolos PEMF: lo que potencia los efectos de parches LifeWave, optimiza el H₂ y apoya el sistema circadiano.',
   nivel:'intermedio',duracion:'16 min',estado:'proximamente',
   tags:['NAD+','Magnesio','Vitamina D3+K2','CoQ10','Astaxantina'],
   puntos:[],
  },
  {id:'g-06',categoria:'respiracion',
   titulo:'Respiración Nasal y CO₂',
   subtitulo:'Por qué la mayoría respira mal y cómo corregirlo',
   descripcion:'La respiración nasal activa el sistema parasimpático, produce óxido nítrico y optimiza el efecto Bohr — el mecanismo por el que el O₂ llega realmente a los tejidos. Principios de James Nestor aplicados a un protocolo diario de mínimo esfuerzo y máximo impacto.',
   nivel:'basico',duracion:'11 min',estado:'proximamente',
   tags:['CO₂','Efecto Bohr','Óxido nítrico','HRV','Nariz'],
   puntos:[],
  },
];

/* ══ FUENTES ══════════════════════════════════════════ */
const profesionales=[
  {id:'pr-01',tipo:'cientifico',campo:'bioelectricidad',
   nombre:'Robert O. Becker',titulo:'M.D.',
   rol:'Cirujano ortopédico e investigador',
   institucion:'VA Medical Center · SUNY Upstate Medical University',
   vida:'1923 – 2008',foto:null,
   descubrimiento:'Demostró experimentalmente que corrientes DC endógenas guían la regeneración de tejidos, huesos y nervios — estableciendo la base científica de la bioelectricidad. Sus experimentos con salamandras mostraron regeneración de miembros por inducción eléctrica.',
   conexionPemf:'La razón por la que los campos EM externos producen efectos biológicos reales. Sus experimentos de regeneración ósea son el fundamento directo de PEMF terapéutico.',
   obras:['The Body Electric (1985)','Cross Currents (1990)'],
   productos:['lifewave'],
   tags:['PEMF','Bioelectricidad','Regeneración','Corriente DC'],
  },
  {id:'pr-02',tipo:'cientifico',campo:'longevidad',
   nombre:'David A. Sinclair',titulo:'Ph.D.',
   rol:'Geneticista y biólogo molecular',
   institucion:'Harvard Medical School · Paul F. Glenn Center for Biology of Aging',
   vida:'1969 – presente',foto:'img/fuentes/pr-02.jpg',
   descubrimiento:'Formuló la teoría informacional del envejecimiento: no envejecemos por daño en el ADN sino por pérdida de información epigenética. Sus trabajos sobre NAD+ y sirtuinas definen el campo de la longevidad moderna.',
   conexionPemf:'El mecanismo por el que X39 (GHK-Cu) activa rejuvenecimiento celular: restaura patrones epigenéticos juveniles exactamente como predice la teoría de Sinclair.',
   obras:['Lifespan: Why We Age — and Why We Don\'t Have To (2019)'],
   productos:['lifewave'],
   tags:['Longevidad','NAD+','Sirtuinas','Epigenética','X39','GHK-Cu'],
  },
  {id:'pr-03',tipo:'cientifico',campo:'agua',
   nombre:'Gerald H. Pollack',titulo:'Ph.D.',
   rol:'Bioingeniero y físico del agua',
   institucion:'University of Washington · EBNER Institute for Water Research',
   vida:'1940 – presente',foto:null,
   descubrimiento:'Descubrió la cuarta fase del agua — EZ water (zona de exclusión) — una fase ordenada y energéticamente superior que se forma en superficies hidrofílicas. Es la condición natural del agua intracelular en células sanas.',
   conexionPemf:'Sustento científico central de Analemma y DrinkHRW. Explica por qué el agua estructurada y el H₂ molecular producen efectos biológicos que el agua ordinaria no puede replicar.',
   obras:['The Fourth Phase of Water (2013)','Cells, Gels and the Engines of Life (2001)'],
   productos:['analemma','drinkhrw'],
   tags:['EZ Water','Agua estructurada','Analemma','H₂','Hidratación celular'],
  },
  {id:'pr-04',tipo:'cientifico',campo:'bioelectricidad',
   nombre:'James L. Oschman',titulo:'Ph.D.',
   rol:'Biofísico e investigador de medicina energética',
   institucion:"Nature's Own Research Association",
   vida:'1939 – presente',foto:null,
   descubrimiento:'Demostró que el tejido conectivo funciona como un semiconductor líquido que transmite señales eléctricas, mecánicas y electromagnéticas de manera coherente — el sistema de comunicación más rápido del organismo.',
   conexionPemf:'Base teórica de por qué los parches LifeWave producen efectos sistémicos: el tejido conectivo conecta todos los órganos y responde directamente a señales fotónicas externas.',
   obras:['Energy Medicine: The Scientific Basis (2000)','Energy Medicine in Therapeutics (2003)'],
   productos:['lifewave'],
   tags:['Tejido conectivo','Semiconductor','Fotobiomodulación','LifeWave'],
  },
  {id:'pr-05',tipo:'cientifico',campo:'epigenetica',
   nombre:'Bruce H. Lipton',titulo:'Ph.D.',
   rol:'Biólogo celular y bioquímico',
   institucion:'Stanford University School of Medicine (investigador)',
   vida:'1944 – presente',foto:'img/fuentes/pr-05.jpg',
   descubrimiento:'Demostró que las membranas celulares actúan como antenas que procesan señales electromagnéticas del entorno — y que estas señales controlan la expresión génica de manera más determinante que el ADN mismo.',
   conexionPemf:'El mecanismo por el que señales de luz de los parches LifeWave generan respuestas celulares reales: las membranas procesan fotones como señales de información antes que instrucciones genéticas.',
   obras:['The Biology of Belief (2005)','Spontaneous Evolution (2009)'],
   productos:['lifewave'],
   tags:['Epigenética','Señalización celular','LifeWave','Membranas'],
  },
  {id:'pr-06',tipo:'cientifico',campo:'longevidad',
   nombre:'Elizabeth Blackburn',titulo:'Ph.D.',
   rol:'Bioquímica · Premio Nobel de Fisiología 2009',
   institucion:'UC San Francisco · The Salk Institute for Biological Studies',
   vida:'1948 – presente',foto:'img/fuentes/pr-06.jpg',
   descubrimiento:'Descubrió la telomerasa y demostró que los telómeros son marcadores directos de envejecimiento celular. El estrés oxidativo y la inflamación crónica los acortan — e intervenciones específicas pueden protegerlos.',
   conexionPemf:'Marco que explica el impacto a largo plazo de H₂ (antioxidante), IceWave (antiinflamatorio) y X39 (regeneración) sobre el reloj biológico celular.',
   obras:['The Telomere Effect (2017, con Elissa Epel)'],
   productos:['lifewave','drinkhrw'],
   tags:['Telómeros','Telomerasa','Longevidad','H₂','X39','Nobel 2009'],
  },
  {id:'pr-07',tipo:'cientifico',campo:'epigenetica',
   nombre:'Martin L. Pall',titulo:'Ph.D.',
   rol:'Bioquímico y biólogo molecular',
   institucion:'Washington State University (Profesor Emérito)',
   vida:'1940 – presente',foto:null,
   descubrimiento:'Identificó los canales de calcio voltaje-dependientes (VGCC) como receptor principal que activa el estrés oxidativo por campos EM artificiales — publicando 5 revisiones peer-reviewed que explican el mecanismo de daño por nEMF.',
   conexionPemf:'La base científica de la guía de reducción de nEMF: los VGCC se activan por campos artificiales generando peroxynitrito. Los mismos canales responden beneficiosamente a campos pulsados terapéuticos como PEMF.',
   obras:['Electromagnetic fields act similarly in the body as low-oxygen conditions (2019)'],
   productos:['lifewave'],
   tags:['nEMF','VGCC','Estrés oxidativo','5G','Canales de calcio'],
  },
  {id:'pr-08',tipo:'cientifico',campo:'respiracion',
   nombre:'James Nestor',titulo:'',
   rol:'Periodista científico e investigador',
   institucion:'Stanford University (investigador afiliado)',
   vida:'1975 – presente',foto:'img/fuentes/pr-08.jpg',
   descubrimiento:'Investigó décadas de ciencia sobre respiración y demostró que la respiración bucal moderna genera disfunción sistémica. La respiración nasal lenta activa el sistema parasimpático, produce óxido nítrico y optimiza la oxigenación por efecto Bohr.',
   conexionPemf:'El sistema nervioso en equilibrio parasimpático es el estado base para que intervenciones de bienestar como PEMF funcionen con máxima efectividad.',
   obras:['Breath: The New Science of a Lost Art (2020)'],
   productos:['general'],
   tags:['Respiración nasal','CO₂','Óxido nítrico','HRV','Efecto Bohr'],
  },

  /* ── Divulgadores ── */
  {id:'pr-09',tipo:'creator',campo:'neurociencia',
   nombre:'Andrew Huberman',titulo:'Ph.D.',
   rol:'Neurocientífico y divulgador científico',
   institucion:'Stanford School of Medicine',
   vida:'1975 – presente',foto:'img/fuentes/pr-09.jpg',
   handle:'@hubermanlab',plataforma:'instagram',seguidores:'6M+',
   url:'https://www.instagram.com/hubermanlab/',
   descubrimiento:'Traduce investigación de neurociencia de frontera a protocolos prácticos. Sus episodios sobre luz solar matutina, temperatura, dopamina y sueño son de los más rigurosos en divulgación de salud a nivel mundial.',
   conexionPemf:'Sus protocolos de luz, ciclo circadiano y temperatura son la base científica de las guías prácticas del Centro de Información. Recomienda exactamente los mismos principios de exposición solar que aplicamos.',
   obras:['Huberman Lab Podcast (2021–presente)','Múltiples papers sobre visión y plasticidad neural en Nature y Cell'],
   productos:['general'],
   tags:['Neurociencia','Circadiano','Luz','Dopamina','Sueño','Protocolos'],
  },
  {id:'pr-10',tipo:'creator',campo:'longevidad',
   nombre:'Rhonda Patrick',titulo:'Ph.D.',
   rol:'Bioquímica y divulgadora científica',
   institucion:'Children\'s Hospital Oakland Research Institute (investigadora)',
   vida:'1981 – presente',foto:null,
   handle:'@foundmyfitness',plataforma:'instagram',seguidores:'800K+',
   url:'https://www.instagram.com/foundmyfitness/',
   descubrimiento:'Divulga investigación de frontera sobre longevidad, nutrición y salud mitocondrial. Sus análisis sobre proteínas de choque térmico (HSP), sauna y ayuno intermitente son citados por médicos y científicos.',
   conexionPemf:'Su marco sobre salud mitocondrial y estrés hormético es perfectamente complementario con fotobiomodulación. Sus análisis sobre micronutrientes apoyan el enfoque de suplementación estratégica.',
   obras:['FoundMyFitness Podcast','Papers sobre envejecimiento y estrés oxidativo'],
   productos:['lifewave','drinkhrw'],
   tags:['Longevidad','Mitocondrias','Sauna','Nutrición','HSP','Hormesis'],
  },
  {id:'pr-11',tipo:'creator',campo:'biohacking',
   nombre:'Peter Attia',titulo:'M.D.',
   rol:'Médico especialista en longevidad y medicina preventiva',
   institucion:'Early Medical (fundador)',
   vida:'1973 – presente',foto:'img/fuentes/pr-11.jpg',
   handle:'@peterattiamd',plataforma:'podcast',seguidores:'1M+',
   url:'https://peterattiamd.com/',
   descubrimiento:'Aplica el enfoque más riguroso en longevidad práctica: trabaja con biomarcadores, métricas de rendimiento y evidencia clínica. Su framework de "Medicina 3.0" — anticipar enfermedad en lugar de tratarla — es la base filosófica más cercana a PEMF.',
   conexionPemf:'Su énfasis en VO2max, fuerza, sueño y glucosa como pilares de longevidad se alinea directamente con los protocolos que potencian los productos LifeWave y DrinkHRW.',
   obras:['Outlive: The Science and Art of Longevity (2023)','The Drive Podcast (2018–presente)'],
   productos:['lifewave','drinkhrw'],
   tags:['Longevidad','Medicina 3.0','VO2max','Glucosa','Sueño','Biomarcadores'],
  },
  {id:'pr-12',tipo:'creator',campo:'circadiano',
   nombre:'Jack Kruse',titulo:'M.D.',
   rol:'Neurocirujano y biohacker cuántico',
   institucion:'Práctica privada',
   vida:'1966 – presente',foto:null,
   handle:'@jackkreusemdt',plataforma:'instagram',seguidores:'200K+',
   url:'https://www.instagram.com/jackkreusemdt/',
   descubrimiento:'Desarrolló el marco de "biología cuántica": la luz solar, el agua y el magnetismo terrestre son los tres pilares de salud mitocondrial. Sus teorías sobre luz infrarroja y DHA son controvertidas pero generaron investigación real.',
   conexionPemf:'Su trabajo sobre fotobiomodulación y luz infrarroja es directamente aplicable a LifeWave. Pionero en visibilizar el daño de nEMF y la luz azul artificial mucho antes que mainstream.',
   obras:['Quantlet (dispositivo de fotobiomodulación propio)','Quantum Biology Podcast'],
   productos:['lifewave'],
   tags:['Fotobiomodulación','Luz infrarroja','nEMF','Biología cuántica','Mitocondrias'],
  },
  {id:'pr-13',tipo:'creator',campo:'biohacking',
   nombre:'Ben Greenfield',titulo:'',
   rol:'Atleta, biohacker y divulgador de performance humana',
   institucion:'Ben Greenfield Life',
   vida:'1981 – presente',foto:'img/fuentes/pr-13.jpg',
   handle:'@bengreenfield',plataforma:'instagram',seguidores:'1M+',
   url:'https://www.instagram.com/bengreenfield/',
   descubrimiento:'Combina rendimiento atlético de elite con optimización biológica. Testea personalmente tecnologías de recuperación, suplementos y protocolos antes de divulgarlos. Su audiencia son biohackers serios con alto nivel de exigencia.',
   conexionPemf:'Ha mencionado y probado fotobiomodulación, PEMF y optimización de agua en múltiples episodios. Su perfil de audiencia es exactamente el público objetivo de PEMF Buenos Aires.',
   obras:['Boundless (2020)','Ben Greenfield Life Podcast'],
   productos:['lifewave','drinkhrw'],
   tags:['Biohacking','Performance','Recuperación','PEMF','Suplementación'],
  },
  {id:'pr-14',tipo:'creator',campo:'neurociencia',
   nombre:'Mario Alonso Puig',titulo:'M.D.',
   rol:'Cirujano y divulgador de neurociencia aplicada',
   institucion:'Hospital Universitario HM Montepríncipe, Madrid',
   vida:'1955 – presente',foto:null,
   handle:'@dr.mario.alonso.puig',plataforma:'instagram',seguidores:'500K+',
   url:'https://www.instagram.com/dr.mario.alonso.puig/',
   descubrimiento:'Divulga neurociencia aplicada al liderazgo, el bienestar y la resiliencia en español. Puente entre la ciencia del cerebro y el público hispanohablante. Sus conceptos sobre estrés, sistema nervioso autónomo y plasticidad neural son rigurosos y accesibles.',
   conexionPemf:'Su trabajo sobre coherencia del sistema nervioso es el contexto ideal para entender por qué los protocolos de bienestar — incluyendo los de PEMF — necesitan un sistema nervioso en estado óptimo para funcionar.',
   obras:['Reinventarse (2010)','Soy más fuerte que mis circunstancias (2022)'],
   productos:['general'],
   tags:['Neurociencia','Sistema nervioso','Estrés','Resiliencia','Español'],
  },
];

/* ══ STUDIES ══════════════════════════════════════════ */
const studies=[...(window.STUDIES_BASE||[])];

/* ══ STATE ════════════════════════════════════════════ */
let aBrand='all', aType='all', aTemaPaper='all', aRigor='all', q='';
let proMode=false;
let aTema='all', qBib='';
let aGuiaCat='all', qGuia='';
let aCampo='all', qProf='', aTipoFuente='all';
let currentView='estudios';
let ioObserver;

function match(s, sq){
  if(!sq) return true;
  const temaLabels=(s.temas||[]).map(t=>TemasPapers[t]?TemasPapers[t].l:'').join(' ');
  return [s.title,s.titulo_es||'',s.cite,s.method,...s.results,B[s.brand].l,temaLabels]
    .some(x=>String(x).toLowerCase().includes(sq));
}
function getFiltered(){
  const sq=q.toLowerCase();
  return studies.filter(s=>{
    if(aBrand!=='all'&&s.brand!==aBrand)return false;
    if(aType!=='all'&&s.type!==aType)return false;
    if(aTemaPaper!=='all'&&!(Array.isArray(s.temas)&&s.temas.includes(aTemaPaper)))return false;
    if(aRigor!=='all'&&tierOf(s)!==aRigor)return false;
    return match(s,sq);
  });
}

/* ══ PILL COUNTS ══════════════════════════════════════ */
function updatePillCounts(){
  const sq=q.toLowerCase();
  // brand pills: count matching type+search for each brand
  const hasTema=s=>aTemaPaper==='all'||(Array.isArray(s.temas)&&s.temas.includes(aTemaPaper));
  document.querySelectorAll('[data-brand]:not([data-brand="all"])').forEach(btn=>{
    const key=btn.dataset.brand;
    const c=studies.filter(s=>{
      if(s.brand!==key)return false;
      if(aType!=='all'&&s.type!==aType)return false;
      if(!hasTema(s))return false;
      return match(s,sq);
    }).length;
    const pc=btn.querySelector('.pc');
    if(pc){pc.textContent=c||'';animatePc(pc)}
    btn.style.opacity=(c===0&&aBrand!==key)?'.35':'1';
  });
  // type pills: count matching brand+tema+search for each type
  document.querySelectorAll('[data-type]:not([data-type="all"])').forEach(btn=>{
    const key=btn.dataset.type;
    const c=studies.filter(s=>{
      if(aBrand!=='all'&&s.brand!==aBrand)return false;
      if(s.type!==key)return false;
      if(!hasTema(s))return false;
      return match(s,sq);
    }).length;
    const pc=btn.querySelector('.pc');
    if(pc){pc.textContent=c||'';animatePc(pc)}
    btn.style.opacity=(c===0&&aType!==key)?'.35':'1';
  });
  // tema pills: count matching brand+type+search for each tema
  document.querySelectorAll('#tema-papers-pills .pill:not([data-temapaper="all"])').forEach(btn=>{
    const key=btn.dataset.temapaper;
    const c=studies.filter(s=>{
      if(aBrand!=='all'&&s.brand!==aBrand)return false;
      if(aType!=='all'&&s.type!==aType)return false;
      if(!(Array.isArray(s.temas)&&s.temas.includes(key)))return false;
      return match(s,sq);
    }).length;
    const pc=btn.querySelector('.pc');
    if(pc){pc.textContent=c||'';animatePc(pc)}
    btn.style.opacity=(c===0&&aTemaPaper!==key)?'.35':'1';
  });
  // "all" pills show current total
  const list=getFiltered();
  const abpc=document.querySelector('[data-brand="all"] .pc');
  if(abpc){abpc.textContent=list.length;animatePc(abpc)}
  const atpc=document.querySelector('[data-type="all"] .pc');
  if(atpc){atpc.textContent=list.length;animatePc(atpc)}
  const atmpc=document.querySelector('[data-temapaper="all"] .pc');
  if(atmpc){atmpc.textContent=list.length;animatePc(atmpc)}
}
function animatePc(el){
  el.style.transform='scale(1.4)';
  setTimeout(()=>el.style.transform='',200);
}

/* ══ RENDER ═══════════════════════════════════════════ */
const grid=document.getElementById('grid');
const countLine=document.getElementById('count-line');
const clearBtn=document.getElementById('clear-btn');

function setupObserver(){
  if(ioObserver)ioObserver.disconnect();
  ioObserver=new IntersectionObserver(entries=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        const card=e.target;
        setTimeout(()=>{
          card.classList.add('visible');
          setTimeout(()=>attachTilt(card),680);
        },i*40);
        ioObserver.unobserve(card);
      }
    });
  },{threshold:.06,rootMargin:'0px 0px -40px 0px'});
  document.querySelectorAll('.card:not(.visible)').forEach(c=>ioObserver.observe(c));
}

function render(animate=true){
  if(currentView==='biblioteca'){renderBiblioteca();return;}
  if(currentView==='guias'){renderGuias();return;}
  if(currentView==='profesionales'){renderProfesionales();return;}
  const list=getFiltered();
  if(proMode) list.sort((a,b)=>((T[b.type]||{}).ev||0)-((T[a.type]||{}).ev||0));
  updatePillCounts();
  clearBtn.classList.toggle('visible',(aBrand!=='all'||aType!=='all'||aTemaPaper!=='all'||aRigor!=='all'||q.length>0));
  countLine.textContent='';
  const _cn1=document.createElement('strong');
  _cn1.textContent=list.length===studies.length?studies.length:list.length;
  countLine.appendChild(_cn1);
  countLine.appendChild(document.createTextNode(list.length===studies.length?' publicaciones':' de '+studies.length+' publicaciones'));

  if(!list.length){
    grid.style.opacity='1';grid.style.transform='none';
    grid.innerHTML=`<div class="empty-state">
      <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
      <h3>Sin resultados</h3>
      <p>Probá con otro producto o cambiá el tipo de estudio.</p>
    </div>`;
    return;
  }

  const doInsert=()=>{
    grid.innerHTML=list.map(s=>{
      const b=B[s.brand],t=T[s.type]||T.piloto;
      const hook=s.results[0].length>110?s.results[0].slice(0,110)+'…':s.results[0];
      const segs=[1,2,3,4,5].map(i=>
        `<span class="ev-seg${i<=t.ev?' on':''}"`+(i<=t.ev?` style="background:${b.c}"`:'')+'></span>'
      ).join('');
      return `<div class="card" data-bc="${b.c}" data-modal-id="${s.id}">
  <div class="card-top" style="background:${b.lg}"></div>
  <div class="card-head" style="background:${b.bg}">
    <span class="brand-tag" style="color:${b.c};background:${b.c}1c">
      <span class="brand-dot" style="background:${b.c}"></span>${b.l}
    </span>
    <span class="type-badge" style="color:${t.tc};background:${t.bg}">${t.sc}</span>
  </div>
  ${s.portada
    ? `<div class="paper-portada"><img src="${s.portada}" alt="${s.title}" loading="lazy"><div class="paper-portada-bar">Primera página</div></div>`
    : `<div class="card-hook" style="background:${b.bg}"><div class="hook-kf" style="color:${b.c}">Hallazgo clave</div><p class="hook-text" style="color:${b.tc}">${hook}</p></div>`
  }
  <div class="card-info">
    <h3 class="card-title">${s.titulo_es || s.title}</h3>
    <p class="card-cite">${s.cite}</p>
    ${s.method?`<p class="card-method">${s.method}</p>`:''}
    <div class="meta-chips">
      ${proMode?`<span class="fund-chip" style="color:${fundingFlag(s).c};background:${fundingFlag(s).bg}">${fundingFlag(s).l}</span>`:''}
      <span class="meta-chip">${s.n}</span>
      ${s.dur&&s.dur!=='—'?`<span class="meta-chip">${s.dur}</span>`:''}
      <span class="meta-chip">${s.loc}</span>
    </div>
  </div>
  <div class="card-foot">
    <div class="ev-row">
      <div class="ev-bar">${segs}</div>
      <span class="ev-lbl">Evidencia ${t.el}</span>
    </div>
    <a href="${s.pdf}" target="_blank" class="pdf-btn" style="color:${b.c};border-color:${b.c}55">PDF ↓</a>
  </div>
</div>`;
    }).join('');
    setupObserver();
  };

  if(animate&&grid.children.length){
    grid.style.transition='opacity .18s ease,transform .18s ease';
    grid.style.opacity='0';grid.style.transform='translateY(6px)';
    setTimeout(()=>{
      doInsert();
      grid.style.transform='translateY(-4px)';
      requestAnimationFrame(()=>{
        grid.style.transition='opacity .28s var(--out),transform .32s var(--spring)';
        grid.style.opacity='1';grid.style.transform='none';
      });
    },190);
  } else {
    doInsert();
  }
}

/* ══ 3D CARD TILT ═════════════════════════════════════ */
function attachTilt(card){
  let rafId=null, on=false;
  const bc=card.dataset.bc||'#1a4fb6';

  card.addEventListener('mouseenter',()=>{
    on=true;
    card.style.transition='box-shadow .25s ease,border-color .25s ease';
    card.style.boxShadow=`var(--card-hover-shadow),0 0 0 2px ${bc}28`;
    card.style.setProperty('--card-ring',`linear-gradient(135deg,${bc}55,transparent,${bc}33)`);
  });
  card.addEventListener('mousemove',e=>{
    cancelAnimationFrame(rafId);
    rafId=requestAnimationFrame(()=>{
      if(!on)return;
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width;
      const y=(e.clientY-r.top)/r.height;
      card.style.transform=`perspective(1200px) rotateX(${(y-.5)*-4}deg) rotateY(${(x-.5)*4}deg) scale(1.012) translateZ(4px)`;
      card.style.setProperty('--sx',`${x*100}%`);
      card.style.setProperty('--sy',`${y*100}%`);
    });
  });
  card.addEventListener('mouseleave',()=>{
    on=false;
    cancelAnimationFrame(rafId);
    card.style.transition='transform .55s var(--spring),box-shadow .35s ease,border-color .25s ease';
    card.style.transform='';
    card.style.boxShadow='';
    setTimeout(()=>{if(!on)card.style.transition=''},580);
  });
}

/* ══ CLICK RIPPLE ════════════════════════════════════ */
document.addEventListener('click',e=>{
  const card=e.target.closest('.card');
  if(!card||e.target.closest('.pdf-btn'))return;
  const r=card.getBoundingClientRect();
  const rp=document.createElement('span');
  rp.className='ripple';
  rp.style.cssText=`left:${e.clientX-r.left}px;top:${e.clientY-r.top}px`;
  card.appendChild(rp);
  setTimeout(()=>rp.remove(),700);
},{passive:true});


/* ══ HERO CONTENT DATA ════════════════════════════════ */
const HERO={
  estudios:{
    eyebrow:'Centro de Información · Evidencia Científica',
    h1:'El hub de conocimiento<br><em>para mentes que cuestionan</em>',
    sub:'43 publicaciones verificadas con metodología, participantes y PDF original. Seleccionadas por rigor, no por resultado favorable.',
    stats:[{n:43,l:'Publicaciones'},{n:26,l:'Ensayos humanos'},{n:13,l:'RCT controlados'},{n:12,l:'Revisiones'}],
    ticker:['Harvard Medical School','MIT CSAIL','PLOS ONE','Frontiers in Neurology','Nutrients (MDPI)','Medical Gas Research','Brain Sciences','Oncotarget','Psychopharmacology','eNeuro','Current Psychology','U. Nagoya · U. Keio','U. Melbourne'],
  },
  biblioteca:{
    eyebrow:'Centro de Información · Biblioteca',
    h1:'La teoría detrás<br><em>de cada decisión</em>',
    sub:'Libros curados que forman la base intelectual de nuestra visión. No vendemos productos — sostenemos una filosofía construida sobre décadas de ciencia real.',
    stats:[{n:7,l:'Libros curados'},{n:6,l:'Áreas temáticas'},{n:5,l:'Décadas de ciencia'},{n:1,l:'Visión coherente'}],
    ticker:['Robert O. Becker','David A. Sinclair','Gerald H. Pollack','Elizabeth Blackburn','Bruce H. Lipton','Lee Know','James Nestor','Lynn Margulis','Nassim Haramein','Martin Pall'],
  },
  guias:{
    eyebrow:'Centro de Información · Guías Prácticas',
    h1:'Vivir mejor,<br><em>con criterio propio</em>',
    sub:'Protocolos sobre luz, agua, respiración y campos EM. Lo que integramos en nuestra práctica y compartimos sin costo porque creemos en la autonomía informada.',
    stats:[{n:6,l:'Guías'},{n:5,l:'Categorías'},{n:4,l:'Disponibles hoy'},{n:0,l:'Productos requeridos'}],
    ticker:['Exposición solar','Ciclo circadiano','Reducción de nEMF','Hidratación celular','Suplementación estratégica','Respiración nasal','EZ Water','Vitamina D','VGCC','Efecto Bohr'],
  },
  profesionales:{
    eyebrow:'Centro de Información · Fuentes',
    h1:'Las voces que<br><em>forman nuestra visión</em>',
    sub:'Científicos, investigadores y divulgadores que inspiran cada decisión. No solo títulos — también quienes hacen que la ciencia llegue al mundo real.',
    stats:[{n:8,l:'Científicos'},{n:6,l:'Divulgadores'},{n:6,l:'Disciplinas'},{n:1,l:'Premio Nobel'}],
    ticker:['Robert O. Becker','David A. Sinclair','Andrew Huberman','Rhonda Patrick','Gerald H. Pollack','Bruce H. Lipton','Peter Attia','Martin L. Pall','Elizabeth Blackburn','Jack Kruse','James Nestor','Ben Greenfield'],
  },
};

function updateHeroContent(data){
  const eyebrow=document.querySelector('.hero-eyebrow');
  eyebrow.textContent='';
  const dot=document.createElement('span');dot.className='hero-eyebrow-dot';
  eyebrow.appendChild(dot);eyebrow.appendChild(document.createTextNode(data.eyebrow));
  document.querySelector('.hero h1').innerHTML=data.h1;
  document.querySelector('.hero-sub').textContent=data.sub;
  const statNs=document.querySelectorAll('.stat-n[data-target]');
  const statLs=document.querySelectorAll('.stat-l');
  data.stats.forEach((s,i)=>{
    if(statNs[i]){statNs[i].dataset.target=s.n;countUp(statNs[i],s.n,900);}
    if(statLs[i])statLs[i].textContent=s.l;
  });
}

function swapTicker(items){
  const ticker=document.querySelector('.ticker');
  const track=document.querySelector('.ticker-track');
  ticker.classList.add('is-swapping');
  setTimeout(()=>{
    const doubled=[...items,...items];
    track.textContent='';
    doubled.forEach(item=>{
      const s=document.createElement('span');s.textContent=item;track.appendChild(s);
      const d=document.createElement('span');d.className='dot';d.textContent='·';track.appendChild(d);
    });
    track.style.animation='none';
    track.offsetHeight;
    track.style.animation='';
    ticker.classList.remove('is-swapping');
  },280);
}

function transitionHero(toView){
  const hc=document.querySelector('.hero-content');
  const data=HERO[toView];
  hc.classList.add('is-exiting');
  swapTicker(data.ticker);
  setTimeout(()=>{
    updateHeroContent(data);
    hc.classList.remove('is-exiting');
    hc.classList.add('is-entering');
    requestAnimationFrame(()=>requestAnimationFrame(()=>hc.classList.remove('is-entering')));
  },340);
}

/* ══ VIEW TOGGLE ══════════════════════════════════════ */
const filterMap={estudios:'papers-filters',biblioteca:'biblioteca-filters',guias:'guias-filters',profesionales:'profesionales-filters'};
document.querySelectorAll('.view-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    if(btn.dataset.view===currentView)return;
    currentView=btn.dataset.view;
    document.querySelectorAll('.view-btn').forEach(b=>b.classList.remove('on'));
    btn.classList.add('on');
    Object.values(filterMap).forEach(id=>document.getElementById(id).style.display='none');
    document.getElementById(filterMap[currentView]).style.display='';
    clearBtn.classList.remove('visible');
    if(typeof refreshFilterbar==='function') refreshFilterbar(currentView);
    { const pt=document.getElementById('pro-toggle'); if(pt) pt.style.display=currentView==='estudios'?'':'none'; }
    if(window.HeroScenes) HeroScenes.setScene(currentView);
    transitionHero(currentView);
    render();
  });
});

/* ══ BIBLIOTECA RENDER ════════════════════════════════ */
function getFilteredLecturas(){
  const sq=qBib.toLowerCase();
  return lecturas.filter(l=>{
    if(aTema!=='all'&&l.tema!==aTema)return false;
    if(!sq)return true;
    return [l.title,l.author,l.editorial,...l.tags,l.rec,Temas[l.tema]?.l||''].some(x=>x.toLowerCase().includes(sq));
  });
}

function updateTemaCounts(){
  document.querySelectorAll('[data-tema]:not([data-tema="all"])').forEach(btn=>{
    const k=btn.dataset.tema;
    const c=lecturas.filter(l=>l.tema===k&&(qBib===''||[l.title,l.author,...l.tags].some(x=>x.toLowerCase().includes(qBib.toLowerCase())))).length;
    const pc=btn.querySelector('.pc');
    if(pc){pc.textContent=c||'';animatePc(pc);}
    btn.style.opacity=c===0&&aTema!==k?'.35':'1';
  });
  const tot=getFilteredLecturas().length;
  const apc=document.querySelector('[data-tema="all"] .pc');
  if(apc){apc.textContent=tot;animatePc(apc);}
}

function renderBiblioteca(){
  const list=getFilteredLecturas();
  updateTemaCounts();
  countLine.textContent='';
  const _cn2=document.createElement('strong');
  _cn2.textContent=list.length===lecturas.length?lecturas.length:list.length;
  countLine.appendChild(_cn2);
  countLine.appendChild(document.createTextNode(list.length===lecturas.length?' lecturas curadas':' de '+lecturas.length+' lecturas'));

  if(!list.length){
    grid.innerHTML=`<div class="empty-state"><svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg><h3>Sin resultados</h3><p>Probá con otro tema o borrá la búsqueda.</p></div>`;
    return;
  }

  grid.innerHTML=list.map(l=>{
    const tm=Temas[l.tema]||{c:'#1a4fb6',bg:'#eff6ff',tc:'#1e40af',l:'Lectura'};
    const tags=l.tags.slice(0,3).map(t=>`<span class="meta-chip">${t}</span>`).join('');
    return `<div class="card" data-bc="${tm.c}" data-libro-id="${l.id}">
  <div class="card-top" style="background:linear-gradient(90deg,${tm.c},${tm.c}aa)"></div>
  <div class="card-head" style="background:${tm.bg}">
    <span class="brand-tag" style="color:${tm.c};background:${tm.c}1c">
      <span class="brand-dot" style="background:${tm.c}"></span>${tm.l}
    </span>
    <span class="type-badge" style="color:#374151;background:#f3f4f6">Lectura</span>
  </div>
  <div class="book-cover-img">
    ${l.cover
      ? `<img src="${l.cover}" alt="${l.title}" loading="lazy">`
      : `<div class="book-cover-fallback" style="background:linear-gradient(155deg,${tm.c},${tm.c}bb)">
           <div class="bcf-title">${l.title}</div>
           <div class="bcf-author">${l.author}</div>
         </div>`
    }
  </div>
  <div class="card-info">
    <h3 class="card-title">${l.title}</h3>
    <p class="card-cite">${l.author} · ${l.year}</p>
    <div class="book-rec-box" style="background:${tm.bg}">
      <div class="book-rec-label" style="color:${tm.c}">Por qué lo recomendamos</div>
      <p class="book-rec-text" style="color:${tm.tc}">${l.rec}</p>
    </div>
    <div class="meta-chips" style="margin-top:8px">${tags}</div>
  </div>
  <div class="card-foot">
    <span class="ev-lbl">${l.editorial} · ${l.year}</span>
    <a href="${l.link}" target="_blank" class="pdf-btn" style="color:${tm.c};border-color:${tm.c}55">Ver ↗</a>
  </div>
</div>`;
  }).join('');
  setupObserver();
}

/* ══ GUÍAS RENDER ═════════════════════════════════════ */
function getFilteredGuias(){
  const sq=qGuia.toLowerCase();
  return guias.filter(g=>{
    if(aGuiaCat!=='all'&&g.categoria!==aGuiaCat)return false;
    if(!sq)return true;
    return [g.titulo,g.subtitulo,g.descripcion,...g.tags].some(x=>x.toLowerCase().includes(sq));
  });
}
function updateGuiaCatCounts(){
  document.querySelectorAll('[data-guiacat]:not([data-guiacat="all"])').forEach(btn=>{
    const k=btn.dataset.guiacat;
    const c=guias.filter(g=>g.categoria===k&&(qGuia===''||[g.titulo,g.subtitulo,...g.tags].some(x=>x.toLowerCase().includes(qGuia.toLowerCase())))).length;
    const pc=btn.querySelector('.pc');
    if(pc){pc.textContent=c||'';animatePc(pc);}
    btn.style.opacity=c===0&&aGuiaCat!==k?'.35':'1';
  });
  const tot=getFilteredGuias().length;
  const apc=document.querySelector('[data-guiacat="all"] .pc');
  if(apc){apc.textContent=tot;animatePc(apc);}
}
function renderGuias(){
  const list=getFilteredGuias();
  updateGuiaCatCounts();
  countLine.textContent='';
  const _cn3=document.createElement('strong');
  _cn3.textContent=list.length===guias.length?guias.length:list.length;
  countLine.appendChild(_cn3);
  countLine.appendChild(document.createTextNode(list.length===guias.length?' guías prácticas':' de '+guias.length+' guías'));
  if(!list.length){
    grid.innerHTML=`<div class="empty-state"><svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg><h3>Sin resultados</h3><p>Probá con otra categoría.</p></div>`;
    return;
  }
  grid.innerHTML=list.map(g=>{
    const cg=CatGuias[g.categoria]||{c:'#1a4fb6',bg:'#eff6ff',tc:'#1e40af',l:'Guía'};
    const tags=g.tags.slice(0,3).map(t=>`<span class="meta-chip">${t}</span>`).join('');
    const nColor=g.nivel==='basico'?'#059669':g.nivel==='intermedio'?'#b45309':'#7c3aed';
    const nBg=g.nivel==='basico'?'#dcfce7':g.nivel==='intermedio'?'#fef3c7':'#ede9fe';
    const locked=g.estado==='proximamente';
    return `<div class="card" data-bc="${cg.c}" ${!locked?`data-guia-id="${g.id}"`:'data-locked="1"'} style="${locked?'cursor:default':''}">
  ${locked?'<div class="guide-card-locked"><span class="guide-lock-label">Próximamente</span></div>':''}
  <div class="card-top" style="background:linear-gradient(90deg,${cg.c},${cg.c}aa)"></div>
  <div class="guide-header" style="background:linear-gradient(155deg,${cg.c} 0%,${cg.c}cc 100%)">
    <div class="guide-badge-row">
      <span class="brand-tag" style="color:#fff;background:rgba(255,255,255,.18)">${cg.l}</span>
      <span class="guide-status ${g.estado}">${g.estado==='disponible'?'Disponible':'Próximamente'}</span>
    </div>
    <div class="guide-title-overlay">${g.titulo}</div>
  </div>
  <div class="card-info">
    <p class="card-cite" style="padding:10px 15px 0">${g.subtitulo}</p>
    <div class="guide-meta-row">
      <span class="guide-level" style="background:${nBg};color:${nColor}">${g.nivel.charAt(0).toUpperCase()+g.nivel.slice(1)}</span>
      <span class="guide-time"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${g.duracion}</span>
    </div>
    <p class="guide-desc">${g.descripcion}</p>
    <div class="meta-chips" style="margin:8px 15px 0">${tags}</div>
  </div>
  <div class="card-foot">
    <span class="ev-lbl">${cg.l}</span>
    ${!locked?`<button class="pdf-btn" style="color:${cg.c};border-color:${cg.c}55" data-guia-id="${g.id}">Leer →</button>`:''}
  </div>
</div>`;
  }).join('');
  setupObserver();
}

/* ══ INVESTIGADORES RENDER ════════════════════════════ */
function getFilteredProfesionales(){
  const sq=qProf.toLowerCase();
  return profesionales.filter(p=>{
    if(aTipoFuente!=='all'&&p.tipo!==aTipoFuente)return false;
    if(aCampo!=='all'&&p.campo!==aCampo)return false;
    if(!sq)return true;
    return [p.nombre,p.rol,p.institucion||'',p.descubrimiento,...p.tags].some(x=>x.toLowerCase().includes(sq));
  });
}
function updateCampoCounts(){
  document.querySelectorAll('[data-tipofuente]:not([data-tipofuente="all"])').forEach(btn=>{
    const k=btn.dataset.tipofuente;
    const c=profesionales.filter(p=>p.tipo===k&&(aCampo==='all'||p.campo===aCampo)&&(qProf===''||[p.nombre,...p.tags].some(x=>x.toLowerCase().includes(qProf.toLowerCase())))).length;
    const pc=btn.querySelector('.pc');
    if(pc){pc.textContent=c||'';animatePc(pc);}
    btn.style.opacity=c===0&&aTipoFuente!==k?'.35':'1';
  });
  document.querySelectorAll('[data-campo]:not([data-campo="all"])').forEach(btn=>{
    const k=btn.dataset.campo;
    const c=profesionales.filter(p=>p.campo===k&&(aTipoFuente==='all'||p.tipo===aTipoFuente)&&(qProf===''||[p.nombre,...p.tags].some(x=>x.toLowerCase().includes(qProf.toLowerCase())))).length;
    const pc=btn.querySelector('.pc');
    if(pc){pc.textContent=c||'';animatePc(pc);}
    btn.style.opacity=c===0&&aCampo!==k?'.35':'1';
  });
  const tot=getFilteredProfesionales().length;
  const apc=document.querySelector('[data-tipofuente="all"] .pc');
  if(apc){apc.textContent=tot;animatePc(apc);}
  const apcc=document.querySelector('[data-campo="all"] .pc');
  if(apcc){apcc.textContent=tot;animatePc(apcc);}
}
function renderProfesionales(){
  const list=getFilteredProfesionales();
  updateCampoCounts();
  countLine.textContent='';
  const _cn4=document.createElement('strong');
  _cn4.textContent=list.length===profesionales.length?profesionales.length:list.length;
  countLine.appendChild(_cn4);
  countLine.appendChild(document.createTextNode(list.length===profesionales.length?' investigadores':' de '+profesionales.length+' investigadores'));
  if(!list.length){
    grid.innerHTML=`<div class="empty-state"><svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg><h3>Sin resultados</h3><p>Probá con otro campo.</p></div>`;
    return;
  }
  grid.innerHTML=list.map(p=>{
    const cf=CampoProf[p.campo]||{c:'#1a4fb6',bg:'#eff6ff',l:'General'};
    const tf=TipoFuente[p.tipo]||TipoFuente.cientifico;
    const plat=p.plataforma?Plataformas[p.plataforma]:null;
    const initials=p.nombre.split(' ').filter((_,i,a)=>i===0||i===a.length-1).map(n=>n[0]).join('');
    const tags=p.tags.slice(0,3).map(t=>`<span class="meta-chip">${t}</span>`).join('');
    const isCreator=p.tipo==='creator'||p.tipo==='comunidad';
    const chips=isCreator
      ?( plat?`<span class="plat-badge" style="background:${plat.c}18;color:${plat.c}">${plat.icon}${plat.l} · ${p.seguidores||''}</span>`:'')
      :p.productos.map(pr=>B[pr]?`<span class="prof-chip" style="background:${B[pr].bg};color:${B[pr].c}">${B[pr].l}</span>`:'').join('');
    const photoAreaBg=isCreator
      ?`linear-gradient(155deg,${plat?plat.c+'22':cf.bg},${cf.c}22)`
      :`linear-gradient(155deg,${cf.bg},${cf.c}1a)`;
    const vidaOrPlatLabel=isCreator
      ?(plat?`<span class="prof-vida" style="color:rgba(255,255,255,.7)">${plat.l}</span>`:'')
      :(p.vida?`<span class="prof-vida">${p.vida}</span>`:'');
    return `<div class="card" data-bc="${cf.c}" data-prof-id="${p.id}">
  <div class="card-top" style="background:linear-gradient(90deg,${cf.c},${cf.c}aa)"></div>
  <div class="prof-photo-area" style="background:${photoAreaBg}">
    ${p.foto?`<img class="prof-photo-img" src="${p.foto}" alt="${p.nombre}">`:`<div class="prof-monogram" style="background:linear-gradient(135deg,${cf.c},${cf.c}cc)">${initials}</div>`}
    ${vidaOrPlatLabel}
  </div>
  <div class="card-head" style="background:#fff">
    <span class="brand-tag" style="color:${tf.c};background:${tf.c}1c"><span class="brand-dot" style="background:${tf.c}"></span>${tf.l}</span>
    <span class="brand-tag" style="color:${cf.c};background:${cf.c}1c">${cf.l}</span>
  </div>
  <div class="prof-body">
    <div class="prof-nombre">${p.nombre}${p.titulo?' <span style="font-size:11px;font-weight:500;color:var(--mist)">'+p.titulo+'</span>':''}</div>
    ${isCreator&&p.handle?`<div class="prof-handle" style="color:${plat?plat.c:cf.c}">${p.handle}</div>`:''}
    <div class="prof-rol">${p.rol}</div>
    <div class="prof-institucion">${p.institucion}</div>
    <p class="prof-desc" style="border-left-color:${cf.c};background:${cf.bg};color:${cf.c}88">${p.descubrimiento}</p>
  </div>
  <div class="prof-chips">${chips}</div>
  <div class="meta-chips" style="padding:8px 15px 0">${tags}</div>
  <div class="card-foot">
    <span class="ev-lbl">${tf.l}</span>
    <button class="pdf-btn" style="color:${cf.c};border-color:${cf.c}55" data-prof-id="${p.id}">Ver perfil →</button>
  </div>
</div>`;
  }).join('');
  setupObserver();
}

/* ══ LIBRO MODAL ══════════════════════════════════════ */
let mbgCurrent=0;
function mbgGoto(i){
  mbgCurrent=i;
  document.getElementById('mbg-track').style.transform=`translateX(${i===0?'0':'-100%'})`;
  document.querySelectorAll('.mbg-dot').forEach((d,idx)=>d.classList.toggle('on',idx===i));
  document.getElementById('mbg-prev').disabled=i===0;
  document.getElementById('mbg-next').disabled=i===1;
}
document.getElementById('mbg-prev').addEventListener('click', ()=>mbgGoto(0));
document.getElementById('mbg-next').addEventListener('click', ()=>mbgGoto(1));
document.querySelectorAll('.mbg-dot').forEach(d=>d.addEventListener('click',()=>mbgGoto(+d.dataset.mi)));
function openLibroModal(id){
  const l=lecturas.find(x=>x.id===id);if(!l)return;
  document.getElementById('m-paper-portada').style.display='none';
  const tm=Temas[l.tema]||{c:'#1a4fb6',bg:'#eff6ff',tc:'#1e40af',l:'Lectura'};

  /* galería de fotos */
  function makeSlide(src,label){
    const caption=`<div style="text-align:center;font-size:11px;font-weight:600;color:#64748b;letter-spacing:.06em;text-transform:uppercase;margin-bottom:10px">${label}</div>`;
    if(src) return caption+`<img src="${src}" alt="${label}">`;
    return caption+`<div class="mbg-empty"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg><span style="font-size:11px">Próximamente</span></div>`;
  }
  document.getElementById('mbg-slide-0').innerHTML=makeSlide(l.cover,'Portada');
  document.getElementById('mbg-slide-1').innerHTML=makeSlide(l.toc_img,'Índice');
  mbgGoto(0);
  document.getElementById('m-book-gallery').style.display='block';
  if(window.attachZoom){ ['mbg-slide-0','mbg-slide-1'].forEach(sid=>{ const z=window.attachZoom(document.getElementById(sid)); if(z)z.reset(); }); }

  document.getElementById('m-badges').innerHTML=
    `<span class="type-badge" style="color:#374151;background:#f3f4f6">Lectura recomendada</span>
     <span class="brand-tag" style="color:${tm.c};background:${tm.c}1c">
       <span class="brand-dot" style="background:${tm.c}"></span>${tm.l}
     </span>`;
  document.getElementById('m-title').textContent=l.title;
  document.getElementById('m-cite').textContent=`${l.author} · ${l.editorial} · ${l.year}`;
  document.getElementById('modal-header').style.background=`linear-gradient(145deg,${tm.bg} 0%,#fff 60%)`;
  document.getElementById('m-meta').innerHTML=`
    <div class="mbox"><span class="mbox-n" style="color:${tm.c};font-size:12px;line-height:1.4">${l.editorial}</span><span class="mbox-l">Editorial</span></div>
    <div class="mbox"><span class="mbox-n" style="color:${tm.c}">${l.year}</span><span class="mbox-l">Publicación</span></div>
    <div class="mbox"><span class="mbox-n" style="color:${tm.c};font-size:11px">${tm.l}</span><span class="mbox-l">Tema</span></div>`;
  document.getElementById('m-sec1-label').textContent='Por qué lo recomendamos';
  document.getElementById('m-sec2-label').textContent='Ideas clave';
  document.getElementById('m-method').textContent=l.rec;
  document.getElementById('m-findings').innerHTML=l.insights.map(i=>
    `<div class="modal-fitem" style="border-left-color:${tm.c};background:${tm.bg}">${i}</div>`
  ).join('');
  document.getElementById('m-note').style.cssText='';
  document.getElementById('m-note-wrap').style.display='none';
  document.getElementById('m-catalog-wrap').style.display='none';
  document.getElementById('m-doi').innerHTML=l.tags.map(t=>
    `<span style="background:${tm.bg};color:${tm.tc};font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;margin-right:4px;display:inline-block;margin-bottom:4px">${t}</span>`
  ).join('');
  const pdf=document.getElementById('m-pdf');
  pdf.href=l.link;pdf.target='_blank';
  pdf.style.background=`linear-gradient(135deg,${tm.c},${tm.c}cc)`;
  pdf.innerHTML='↗ Conseguir libro';
  document.querySelector('.library').style.cssText='transform:scale(.985);filter:blur(.5px);transition:transform .4s ease,filter .4s ease';
  const ov=document.getElementById('overlay');
  ov.style.display='flex';requestAnimationFrame(()=>ov.style.opacity='1');
  document.body.style.overflow='hidden';
}

/* ══ GUÍA MODAL ═══════════════════════════════════════ */
function openGuiaModal(id){
  const g=guias.find(x=>x.id===id);if(!g||g.estado==='proximamente')return;
  document.getElementById('m-book-gallery').style.display='none';
  document.getElementById('m-paper-portada').style.display='none';
  const cg=CatGuias[g.categoria]||{c:'#1a4fb6',bg:'#eff6ff',tc:'#1e40af',l:'Guía'};
  const nColor=g.nivel==='basico'?'#059669':g.nivel==='intermedio'?'#b45309':'#7c3aed';
  const nBg=g.nivel==='basico'?'#dcfce7':g.nivel==='intermedio'?'#fef3c7':'#ede9fe';
  document.getElementById('m-badges').innerHTML=
    `<span class="type-badge" style="color:#374151;background:#f3f4f6">Guía práctica</span>
     <span class="brand-tag" style="color:${cg.c};background:${cg.c}1c"><span class="brand-dot" style="background:${cg.c}"></span>${cg.l}</span>
     <span class="guide-level" style="background:${nBg};color:${nColor}">${g.nivel.charAt(0).toUpperCase()+g.nivel.slice(1)}</span>`;
  document.getElementById('m-title').textContent=g.titulo;
  document.getElementById('m-cite').textContent=`${g.subtitulo} · ${g.duracion} de lectura`;
  document.getElementById('modal-header').style.background=`linear-gradient(145deg,${cg.bg} 0%,#fff 60%)`;
  document.getElementById('m-meta').innerHTML=`
    <div class="mbox"><span class="mbox-n" style="color:${cg.c}">${g.duracion}</span><span class="mbox-l">Lectura</span></div>
    <div class="mbox"><span class="mbox-n" style="color:${nColor};font-size:12px">${g.nivel.charAt(0).toUpperCase()+g.nivel.slice(1)}</span><span class="mbox-l">Nivel</span></div>
    <div class="mbox"><span class="mbox-n" style="color:${cg.c};font-size:12px">${cg.l}</span><span class="mbox-l">Categoría</span></div>`;
  document.getElementById('m-sec1-label').textContent='De qué trata';
  document.getElementById('m-sec2-label').textContent='Puntos clave';
  document.getElementById('m-method').textContent=g.descripcion;
  document.getElementById('m-findings').innerHTML=g.puntos.map(p=>
    `<div class="modal-fitem" style="border-left-color:${cg.c};background:${cg.bg}">${p}</div>`
  ).join('');
  document.getElementById('m-note').style.cssText='';
  document.getElementById('m-note-wrap').style.display='none';
  document.getElementById('m-catalog-wrap').style.display='none';
  document.getElementById('m-doi').innerHTML=g.tags.map(t=>
    `<span style="background:${cg.bg};color:${cg.tc};font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;margin-right:4px;display:inline-block;margin-bottom:4px">${t}</span>`
  ).join('');
  const pdf=document.getElementById('m-pdf');
  pdf.removeAttribute('href');pdf.style.cursor='default';
  pdf.style.background=`linear-gradient(135deg,${cg.c},${cg.c}cc)`;
  pdf.innerHTML='Guía completa — próximamente';
  document.querySelector('.library').style.cssText='transform:scale(.985);filter:blur(.5px);transition:transform .4s ease,filter .4s ease';
  const ov=document.getElementById('overlay');
  ov.style.display='flex';requestAnimationFrame(()=>ov.style.opacity='1');
  document.body.style.overflow='hidden';
}

/* ══ PERFIL INVESTIGADOR MODAL ════════════════════════ */
function openProfModal(id){
  const p=profesionales.find(x=>x.id===id);if(!p)return;
  document.getElementById('m-book-gallery').style.display='none';
  document.getElementById('m-paper-portada').style.display='none';
  const cf=CampoProf[p.campo]||{c:'#1a4fb6',bg:'#eff6ff',l:'Investigador'};
  document.getElementById('m-badges').innerHTML=
    `<span class="type-badge" style="color:#374151;background:#f3f4f6">Investigador</span>
     <span class="brand-tag" style="color:${cf.c};background:${cf.c}1c"><span class="brand-dot" style="background:${cf.c}"></span>${cf.l}</span>
     ${p.titulo?`<span class="type-badge" style="color:#374151;background:#f3f4f6">${p.titulo}</span>`:''}`;
  document.getElementById('m-title').textContent=p.nombre;
  document.getElementById('m-cite').textContent=`${p.rol} · ${p.institucion}`;
  document.getElementById('modal-header').style.background=`linear-gradient(145deg,${cf.bg} 0%,#fff 60%)`;
  const initials=p.nombre.split(' ').filter((_,i,a)=>i===0||i===a.length-1).map(n=>n[0]).join('');
  document.getElementById('m-meta').innerHTML=`
    <div class="mbox">
      <span class="mbox-n" style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,${cf.c},${cf.c}cc);display:flex;align-items:center;justify-content:center;font-family:'Figtree',sans-serif;font-size:18px;font-weight:900;color:#fff;flex-shrink:0">${initials}</span>
      <span class="mbox-l">${cf.l}</span>
    </div>
    <div class="mbox"><span class="mbox-n" style="color:${cf.c};font-size:11px;line-height:1.3">${p.vida}</span><span class="mbox-l">Vida</span></div>
    <div class="mbox"><span class="mbox-n" style="color:${cf.c};font-size:11px;line-height:1.3">${p.obras.length} obra${p.obras.length>1?'s':''}</span><span class="mbox-l">Publicaciones</span></div>`;
  document.getElementById('m-sec1-label').textContent='Descubrimiento clave';
  document.getElementById('m-sec2-label').textContent='Conexión con PEMF';
  document.getElementById('m-method').textContent=p.descubrimiento;
  document.getElementById('m-findings').innerHTML=
    `<div class="modal-fitem" style="border-left-color:${cf.c};background:${cf.bg}">${p.conexionPemf}</div>`+
    p.obras.map(o=>`<div class="modal-fitem" style="border-left-color:${cf.c}44;background:#f8fafc;font-style:italic">${o}</div>`).join('');
  document.getElementById('m-note').style.cssText='';
  document.getElementById('m-note-wrap').style.display='none';
  document.getElementById('m-catalog-wrap').style.display='none';
  document.getElementById('m-doi').innerHTML=p.tags.map(t=>
    `<span style="background:${cf.bg};color:${cf.c};font-size:10px;font-weight:700;padding:2px 8px;border-radius:100px;margin-right:4px;display:inline-block;margin-bottom:4px">${t}</span>`
  ).join('');
  const isCreator=p.tipo==='creator'||p.tipo==='comunidad';
  const plat=p.plataforma?Plataformas[p.plataforma]:null;
  const pdf=document.getElementById('m-pdf');
  if(isCreator&&p.url){
    pdf.href=p.url;pdf.target='_blank';
    pdf.innerHTML=`${plat?plat.icon+' ':''} Ver en ${plat?plat.l:'redes'} →`;
  } else {
    pdf.href='catalogo.html';pdf.target='_self';
    pdf.innerHTML='Ver productos relacionados →';
  }
  pdf.style.background=`linear-gradient(135deg,${cf.c},${cf.c}cc)`;
  document.querySelector('.library').style.cssText='transform:scale(.985);filter:blur(.5px);transition:transform .4s ease,filter .4s ease';
  const ov=document.getElementById('overlay');
  ov.style.display='flex';requestAnimationFrame(()=>ov.style.opacity='1');
  document.body.style.overflow='hidden';
}

/* ══ MODAL ════════════════════════════════════════════ */
function openModal(id){
  const s=studies.find(x=>x.id===id);if(!s)return;
  document.getElementById('m-book-gallery').style.display='none';
  const pp=document.getElementById('m-paper-portada');
  if(s.portada){
    document.getElementById('m-paper-portada-img').src=s.portada;
    pp.style.display='block';
    if(window.attachZoom){ const z=window.attachZoom(pp); if(z)z.reset(); }
  } else { pp.style.display='none'; }
  const b=B[s.brand],t=T[s.type]||T.piloto;
  document.getElementById('m-badges').innerHTML=
    `<span class="type-badge" style="color:${t.tc};background:${t.bg}">${t.l}</span>
     <span class="brand-tag" style="color:${b.c};background:${b.c}1c">
       <span class="brand-dot" style="background:${b.c}"></span>${b.l}
     </span>`;
  const escHtml=x=>String(x||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  document.getElementById('m-title').textContent=s.titulo_es || s.title;
  document.getElementById('m-cite').innerHTML=
    (s.titulo_es && s.title ? `<span style="font-style:italic;color:var(--mist)">${escHtml(s.title)}</span><br>` : '')
    + escHtml(s.cite);
  document.getElementById('modal-header').style.background=`linear-gradient(145deg,${b.bg} 0%,#fff 60%)`;
  document.getElementById('m-meta').innerHTML=`
    <div class="mbox"><span class="mbox-n" style="color:${b.c}">${s.n}</span><span class="mbox-l">Participantes</span></div>
    <div class="mbox"><span class="mbox-n" style="color:${b.c};font-size:13px;line-height:1.4">${s.loc}</span><span class="mbox-l">Lugar</span></div>
    <div class="mbox"><span class="mbox-n" style="color:${b.c}">${s.dur||'—'}</span><span class="mbox-l">Duración</span></div>`;
  document.getElementById('m-method').textContent=s.method;
  document.getElementById('m-findings').innerHTML=s.results.map(r=>
    `<div class="modal-fitem" style="border-left-color:${b.c};background:${b.bg}">${r}</div>`
  ).join('');
  const nw=document.getElementById('m-note-wrap');
  const mn=document.getElementById('m-note');
  mn.style.cssText='';
  if(s.note){nw.style.display='block';mn.textContent='Nota: '+s.note}
  else nw.style.display='none';
  const doiEl=document.getElementById('m-doi');
  doiEl.textContent='';
  if(s.doi){
    doiEl.appendChild(document.createTextNode('DOI: '));
    const doiLink=document.createElement('a');
    doiLink.href='https://doi.org/'+s.doi;
    doiLink.target='_blank';
    doiLink.textContent=s.doi;
    doiEl.appendChild(doiLink);
  }
  const pdf=document.getElementById('m-pdf');
  pdf.href=s.pdf;pdf.style.background=b.lg;
  document.getElementById('m-sec1-label').textContent='Metodología';
  document.getElementById('m-sec2-label').textContent='Hallazgos principales';
  // Catalog link
  const cw=document.getElementById('m-catalog-wrap');
  const cd=document.getElementById('m-catalog-dot');
  const cl=document.getElementById('m-catalog-label');
  cw.style.display='block';
  cd.style.cssText=`background:${b.bg};color:${b.c};`;
  cd.textContent=b.l.charAt(0);
  cl.textContent=`Ver ${b.l} en el catálogo`;
  document.querySelector('.library').style.cssText='transform:scale(.985);filter:blur(.5px);transition:transform .4s ease,filter .4s ease';
  const ov=document.getElementById('overlay');
  ov.style.display='flex';
  requestAnimationFrame(()=>ov.style.opacity='1');
  document.body.style.overflow='hidden';
}
function closeModal(){
  const ov=document.getElementById('overlay');
  ['m-paper-portada','mbg-slide-0','mbg-slide-1'].forEach(id=>{const el=document.getElementById(id); if(el&&el._zoom)el._zoom.reset();});
  ov.style.opacity='0';
  document.querySelector('.library').style.cssText='transition:transform .4s ease,filter .4s ease';
  setTimeout(()=>{ov.style.display='none';document.body.style.overflow='';document.querySelector('.library').style.cssText=''},320);
}
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('overlay').addEventListener('click', e=>{if(e.target===e.currentTarget)closeModal()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

// Event delegation — reemplaza todos los onclick embebidos en templates de grids
grid.addEventListener('click', e => {
  if (e.target.closest('.pdf-btn')) return; // links externos no abren modal

  const modalCard = e.target.closest('[data-modal-id]');
  if (modalCard) { openModal(modalCard.dataset.modalId); return; }

  const libroCard = e.target.closest('[data-libro-id]');
  if (libroCard) { openLibroModal(libroCard.dataset.libroId); return; }

  const guiaCard = e.target.closest('[data-guia-id]');
  if (guiaCard) { openGuiaModal(guiaCard.dataset.guiaId); return; }

  const profCard = e.target.closest('[data-prof-id]');
  if (profCard) { openProfModal(profCard.dataset.profId); return; }
});

/* ══ FILTER HANDLERS ══════════════════════════════════ */
function setPill(btn,on,bc){
  if(on){
    if(bc)btn.style.cssText=`background:${bc};border-color:transparent;color:#fff;transform:translateY(-1px);box-shadow:0 4px 16px ${bc}44`;
    else btn.style.cssText='background:var(--navy);border-color:transparent;color:#fff;transform:translateY(-1px);box-shadow:0 4px 14px rgba(11,31,74,.28)';
  } else { btn.style.cssText=''; }
}
/* ══ MOTOR DE FILTROS (dropdown + chips) ═══════════════ */
const FB_DIMS = {
  estudios: [
    {key:'brand', label:'Producto', cfg:B,          get:()=>aBrand,     set:v=>{aBrand=v;setBrandTint(aBrand);}},
    {key:'type',  label:'Diseño',   cfg:T,          get:()=>aType,      set:v=>aType=v},
    {key:'tema',  label:'Tema',     cfg:TemasPapers,get:()=>aTemaPaper, set:v=>aTemaPaper=v},
    {key:'rigor', label:'Rigor',    cfg:RigorCfg,   get:()=>aRigor,     set:v=>aRigor=v},
  ],
  biblioteca: [ {key:'tema', label:'Tema', cfg:Temas, get:()=>aTema, set:v=>aTema=v} ],
  guias: [ {key:'cat', label:'Categoría', cfg:CatGuias, get:()=>aGuiaCat, set:v=>aGuiaCat=v} ],
  profesionales: [
    {key:'tipo',  label:'Tipo',  cfg:TipoFuente, get:()=>aTipoFuente, set:v=>aTipoFuente=v},
    {key:'campo', label:'Campo', cfg:CampoProf,  get:()=>aCampo,      set:v=>aCampo=v},
  ],
};
function fbDataset(view){ if(view==='estudios')return studies; if(view==='biblioteca')return lecturas; if(view==='guias')return guias; return profesionales; }
function fbItemMatches(view,d,s,val){
  if(val==='all')return true;
  if(view==='estudios'){
    if(d.key==='brand')return s.brand===val;
    if(d.key==='type')return s.type===val;
    if(d.key==='tema')return Array.isArray(s.temas)&&s.temas.includes(val);
    if(d.key==='rigor')return tierOf(s)===val;
  }
  if(view==='biblioteca')return s.tema===val;
  if(view==='guias')return s.categoria===val;
  if(d.key==='tipo')return s.tipo===val;
  if(d.key==='campo')return s.campo===val;
  return true;
}
function fbCount(view,dims,skipDim,optKey){
  return fbDataset(view).filter(s=>dims.every(d=>fbItemMatches(view,d,s,d===skipDim?optKey:d.get()))).length;
}
let fbOpen=null;
function fbClose(){ if(fbOpen){fbOpen.panel.classList.remove('open');fbOpen.btn.setAttribute('aria-expanded','false');fbOpen=null;} }
document.addEventListener('click',e=>{ if(fbOpen&&!fbOpen.wrap.contains(e.target))fbClose(); });
document.addEventListener('keydown',e=>{ if(e.key==='Escape')fbClose(); });
function buildFilterbar(view){
  const dims=FB_DIMS[view]; if(!dims)return;
  const menus=document.getElementById('menus-'+view);
  if(!menus||menus.dataset.built)return;
  menus.dataset.built='1';
  dims.forEach(d=>{
    const wrap=document.createElement('div'); wrap.style.position='relative';
    const btn=document.createElement('button'); btn.className='fb-btn'; btn.type='button'; btn.setAttribute('aria-expanded','false');
    btn.innerHTML='<span class="fb-btn-label">'+d.label+'</span><span class="fb-caret">▾</span>';
    const panel=document.createElement('div'); panel.className='fb-panel';
    wrap.appendChild(btn); wrap.appendChild(panel); menus.appendChild(wrap);
    d._btn=btn; d._panel=panel; d._wrap=wrap;
    btn.addEventListener('click',ev=>{ ev.stopPropagation(); const open=fbOpen&&fbOpen.panel===panel; fbClose(); if(!open){ renderPanel(view,dims,d); panel.style.left='0'; panel.style.right='auto'; panel.classList.add('open'); btn.setAttribute('aria-expanded','true'); fbOpen={panel,btn,wrap}; const r=panel.getBoundingClientRect(); if(r.right>window.innerWidth-8){ panel.style.left='auto'; panel.style.right='0'; } } });
  });
  refreshFilterbar(view);
}
function renderPanel(view,dims,d){
  const cur=d.get();
  const opts=[{key:'all',label:'Todos'}].concat(Object.keys(d.cfg).filter(k=>k!=='all').map(k=>({key:k,label:d.cfg[k].l})));
  d._panel.innerHTML='';
  opts.forEach(o=>{
    const n=fbCount(view,dims,d,o.key);
    const color=o.key==='all'?null:(d.cfg[o.key].c||d.cfg[o.key].tc||null);
    const b=document.createElement('button'); b.type='button'; b.className='fb-opt'+(cur===o.key?' sel':'');
    b.innerHTML='<span class="fb-opt-dot"'+(color?(' style="background:'+color+'"'):'')+'></span><span>'+o.label+'</span><span class="fb-opt-n">'+n+'</span>';
    b.addEventListener('click',()=>{ d.set(o.key); fbClose(); refreshFilterbar(view); render(); });
    d._panel.appendChild(b);
  });
}
function refreshFilterbar(view){
  const dims=FB_DIMS[view]; if(!dims)return;
  dims.forEach(d=>{
    if(!d._btn)return;
    const v=d.get(); const lbl=d._btn.querySelector('.fb-btn-label');
    if(v==='all'){ d._btn.classList.remove('active'); d._btn.style.background=''; d._btn.style.borderColor=''; lbl.textContent=d.label; }
    else{ const c=d.cfg[v].c||d.cfg[v].tc||'var(--navy)'; d._btn.classList.add('active'); d._btn.style.background=c; d._btn.style.borderColor='transparent'; lbl.textContent=d.label+': '+d.cfg[v].l; }
  });
  const chips=document.getElementById('chips-'+view); if(!chips)return; chips.innerHTML='';
  const active=dims.filter(d=>d.get()!=='all');
  active.forEach(d=>{
    const v=d.get(); const c=d.cfg[v].c||d.cfg[v].tc||'var(--navy)';
    const chip=document.createElement('span'); chip.className='fb-chip'; chip.style.background=c;
    chip.innerHTML=d.cfg[v].l+'<button type="button" aria-label="Quitar">✕</button>';
    chip.querySelector('button').addEventListener('click',()=>{ d.set('all'); refreshFilterbar(view); render(); });
    chips.appendChild(chip);
  });
  if(active.length){ const clr=document.createElement('button'); clr.type='button'; clr.className='fb-clear-all'; clr.textContent='Limpiar todo'; clr.addEventListener('click',()=>{ dims.forEach(d=>d.set('all')); refreshFilterbar(view); render(); }); chips.appendChild(clr); }
}
document.getElementById('search').addEventListener('input',e=>{q=e.target.value;render()});
document.getElementById('search-bib').addEventListener('input',e=>{qBib=e.target.value;render()});
document.getElementById('search-guia').addEventListener('input',e=>{qGuia=e.target.value;render()});
document.getElementById('search-prof').addEventListener('input',e=>{qProf=e.target.value;render()});
clearBtn.addEventListener('click',()=>{
  (FB_DIMS[currentView]||[]).forEach(d=>d.set('all'));
  q=qBib=qGuia=qProf='';
  ['search','search-bib','search-guia','search-prof'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  refreshFilterbar(currentView); render();
});
['estudios','biblioteca','guias','profesionales'].forEach(buildFilterbar);

/* ══ MODO PROFESIONAL ═════════════════════════════════ */
const proToggle=document.getElementById('pro-toggle');
if(proToggle){
  proToggle.addEventListener('click',()=>{
    proMode=!proMode;
    proToggle.classList.toggle('on',proMode);
    render();
  });
}

/* ══ PAGE BRAND TINT ══════════════════════════════════ */
const pageTint=document.getElementById('page-tint');
function setBrandTint(key){
  if(key==='all'){pageTint.style.opacity='0';return}
  const c=B[key]?.c||'#1a4fb6';
  pageTint.style.background=`radial-gradient(ellipse 65% 55% at 60% 40%,${c}0d,transparent)`;
  pageTint.style.opacity='1';
}

/* ══ NAV SCROLL ═══════════════════════════════════════ */
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',scrollY>40);
  const p=scrollY/(document.documentElement.scrollHeight-innerHeight)||0;
  document.getElementById('scroll-bar').style.transform=`scaleX(${Math.min(p,1)})`;
},{passive:true});

/* ══ HERO PARALLAX ════════════════════════════════════ */
let heroVisible=true;
new IntersectionObserver(e=>{heroVisible=e[0].isIntersecting}).observe(document.querySelector('.hero'));
let prafId=null;
document.addEventListener('mousemove',e=>{
  if(!heroVisible)return;
  cancelAnimationFrame(prafId);
  prafId=requestAnimationFrame(()=>{
    const mx=(e.clientX/innerWidth-.5),my=(e.clientY/innerHeight-.5);
    document.querySelectorAll('.orb-wrap').forEach((w,i)=>{
      const d=(i+1)*14;
      w.style.transform=`translate(${mx*d}px,${my*d}px)`;
    });
  });
},{passive:true});

/* ══ STAT COUNTERS ════════════════════════════════════ */
function countUp(el,target,dur=1600){
  let s=null;
  const step=ts=>{
    if(!s)s=ts;
    const p=Math.min((ts-s)/dur,1);
    el.textContent=Math.round((1-Math.pow(1-p,4))*target);
    if(p<1)requestAnimationFrame(step);
    else el.textContent=target;
  };
  requestAnimationFrame(step);
}
new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('.stat-n[data-target]').forEach(el=>countUp(el,+el.dataset.target));
      e.target.__statObs?.disconnect();
    }
  });
},{threshold:.5}).observe(document.querySelector('.stats-row'));

/* ══ CONTADOR DINÁMICO DEL HERO (refleja el array real de papers) ══ */
function recomputeEstudiosStats(){
  const n=studies.length;
  const rct=studies.filter(s=>s.type==='rct').length;
  const rev=studies.filter(s=>s.type==='revision'||s.type==='meta').length;
  const hum=studies.filter(s=>['rct','piloto','factibilidad','seguridad'].includes(s.type)).length;
  const vals=[n,hum,rct,rev], labels=['Publicaciones','Ensayos humanos','RCT controlados','Revisiones'];
  HERO.estudios.stats=vals.map((v,i)=>({n:v,l:labels[i]}));
  HERO.estudios.sub=n+' publicaciones verificadas con metodología, participantes y PDF original. Seleccionadas por rigor, no por resultado favorable.';
  if(currentView==='estudios'){
    // escribe el número final directamente (robusto, sin depender del timing del count-up)
    const ns=document.querySelectorAll('.stat-n'), ls=document.querySelectorAll('.stat-l');
    vals.forEach((v,i)=>{ if(ns[i]){ns[i].dataset.target=v;ns[i].textContent=v;} if(ls[i])ls[i].textContent=labels[i]; });
    const sub=document.querySelector('.hero-sub'); if(sub) sub.textContent=HERO.estudios.sub;
  }
}

/* ══ INIT ═════════════════════════════════════════════ */
recomputeEstudiosStats();
render(false);
if(window.HeroScenes) HeroScenes.init({papers:studies, books:lecturas, people:profesionales});

/* ══ OPTIMIZE CENTRO DE INFORMACIÓN INTEGRATION ════════ */
window.addEventListener('optimizeDataLoaded', (event) => {
  const { papers: optimizePapers, references: optimizeReferences } = event.detail;

  if (optimizePapers && Array.isArray(optimizePapers)) {
    // Agregar papers OPTIMIZE al array studies
    studies.push(...optimizePapers);
    console.log(`[OPTIMIZE] ${optimizePapers.length} papers agregados a estudios`);
  }

  if (optimizeReferences && Array.isArray(optimizeReferences)) {
    // Agregar referencias OPTIMIZE al array lecturas
    lecturas.push(...optimizeReferences);
    console.log(`[OPTIMIZE] ${optimizeReferences.length} referencias agregadas a biblioteca`);
  }

  // Re-renderizar con los nuevos datos
  if (cView === 'estudios') {
    // Actualizar contador de pills
    const allBrandPill = document.querySelector('[data-brand="all"]');
    if (allBrandPill && optimizePapers) {
      const pc = allBrandPill.querySelector('.pc');
      if (pc) {
        const totalCount = studies.length;
        pc.textContent = totalCount;
      }
    }

    const allTypePill = document.querySelector('[data-type="all"]');
    if (allTypePill && optimizePapers) {
      const pc = allTypePill.querySelector('.pc');
      if (pc) {
        const totalCount = studies.length;
        pc.textContent = totalCount;
      }
    }

    render(false);
  } else if (cView === 'biblioteca') {
    render(false);
  }

  // refrescar contador del hero con el total real tras la carga async
  if (typeof recomputeEstudiosStats === 'function') recomputeEstudiosStats();

  console.log('[OPTIMIZE Centro de Información] Datos integrados exitosamente');
});

/* ══ PAPERS EXTRA — índice editable (js/papers-extra.json) ════════════
   Permite agregar/sacar papers desde un archivo de datos, sin tocar código.
   Ver el campo _README dentro del JSON para las instrucciones. */
fetch('js/papers-extra.json')
  .then(r => r.ok ? r.json() : null)
  .then(d => {
    if (!d || !Array.isArray(d.papers) || !d.papers.length) return;
    const validos = d.papers.filter(p => p && p.id && p.title);
    if (!validos.length) return;
    studies.push(...validos);
    if (currentView === 'estudios') render(false);
    if (window.HeroScenes && currentView === 'estudios') HeroScenes.setScene('estudios'); // reabanico con la cantidad real
    // espera a que el count-up inicial del hero (≈1.6s) termine, para que el
    // recálculo sea la última escritura y el número refleje el total real
    setTimeout(() => {
      if (typeof recomputeEstudiosStats === 'function') recomputeEstudiosStats();
    }, 1800);
    console.log('[Papers extra] ' + validos.length + ' agregados desde papers-extra.json');
  })
  .catch(() => {/* sin índice extra: la página funciona con los papers base */});

