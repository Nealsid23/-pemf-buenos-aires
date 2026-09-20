const BRANDS = [
  { id: 'lifewave', name: 'LifeWave', tag: 'Fotobioterapia', tagColor: '#6d28d9', tagBg: '#ede9fe', bg1: 'linear-gradient(135deg,#3b0764,#6d28d9)', bg2: 'linear-gradient(135deg,#4c1d95,#7c3aed)' },
  { id: 'neuro', name: 'Neuro', tag: 'Nootrópicos', tagColor: '#065f46', tagBg: '#d1fae5', bg1: 'linear-gradient(135deg,#064e3b,#065f46)', bg2: 'linear-gradient(135deg,#065f46,#10b981)' },
  { id: 'analemma', name: 'Analemma', tag: 'Agua estructurada', tagColor: '#0369a1', tagBg: '#e0f2fe', bg1: 'linear-gradient(135deg,#0c4a6e,#0369a1)', bg2: 'linear-gradient(135deg,#075985,#38bdf8)' },
  { id: 'gamma-light', name: 'Gamma Light', tag: 'Luz gamma', tagColor: '#92400e', tagBg: '#fef3c7', bg1: 'linear-gradient(135deg,#78350f,#92400e)', bg2: 'linear-gradient(135deg,#92400e,#f59e0b)' },
  { id: 'ess60', name: 'ESS60', tag: 'Carbono C60', tagColor: '#9d174d', tagBg: '#fce7f3', bg1: 'linear-gradient(135deg,#831843,#9d174d)', bg2: 'linear-gradient(135deg,#9d174d,#ec4899)' },
  { id: 'h2', name: 'H2 Tablets', tag: 'Hidrógeno', tagColor: '#0369a1', tagBg: '#e0f2fe', bg1: 'linear-gradient(135deg,#0c4a6e,#0369a1)', bg2: 'linear-gradient(135deg,#075985,#38bdf8)' },
];

const KITS = [
  { id: 'longevidad', name: 'Kit Longevidad', products: 'X39 · Glutathione · ESS60', link: '#' },
  { id: 'cerebro', name: 'Kit Cerebro', products: 'Gamma 40Hz · Neuro · Calm & Clarity', link: '#' },
  { id: 'sueno', name: 'Kit Sueño', products: 'Silent Nights · Sleep & Recharge', link: '#' },
  { id: 'deportista', name: 'Kit Deportista', products: 'X49 · Energy Enhancer · H2 Tablets', link: '#' },
  { id: 'antistres', name: 'Kit Anti-estrés', products: 'Aeon · Calm & Clarity · IceWave', link: '#' },
];

const PRODUCTS = [
  {
    id: 'x39',
    brand: 'lifewave',
    name: 'X39',
    sub: 'Activador Natural de Células Madre',
    badge: 'Más vendido',
    badgeBg: '#e5d4f1',
    badgeColor: '#6d28d9',
    price: '$235.000',
    priceDay: '$7.833/día',
    stock: '30 parches',
    stockCount: 27,
    stockStatus: 'Entregas en 24hs',
    img: 'img/productos/lifewave/featured-x39.png',
    goals: ['longevidad', 'energia', 'sueno', 'dolor'],
    desc: 'Activa las células madre propias. Regeneración celular profunda, más energía, mejor sueño y recuperación acelerada sin fármacos.',
    tagline: '"Regeneración que nace desde adentro."',
    benefits: [
      'Activa células madre naturalmente',
      'Aumenta niveles de energía diaria',
      'Mejora calidad y profundidad del sueño',
      'Acelera recuperación física',
      'Reduce dolores e inflamación',
      'Aumenta producción de colágeno'
    ],
    science: 'Tecnología de fototerapia patentada que eleva el péptido GHK-Cu, activando tus propias células madre sin introducir ninguna sustancia al cuerpo.',
    qa: [
      { q: '¿Cuánto tiempo tarda en hacer efecto?', a: 'La mayoría notifica cambios en 3-7 días. Para beneficios máximos, usá durante 30 días continuos.' },
      { q: '¿Es seguro usarlo todos los días?', a: 'Totalmente. X39 está diseñado para uso diario sin efectos adversos ni dependencia.' },
      { q: '¿Puedo usarlo junto con otros productos?', a: 'Sí, X39 combina bien con todos los parches LifeWave y suplementos naturales.' },
      { q: '¿A qué edad puedo usarlo?', a: 'LifeWave recomienda X39 desde los 16 años en adelante. Consultá con profesional para menores.' }
    ],
    reviews: [
      { author: 'María G.', rating: 5, text: 'Increíble el cambio en mi energía y sueño. Después de 2 semanas dormía como nunca.', verified: true },
      { author: 'Juan P.', rating: 5, text: 'Me recuperé de una lesión mucho más rápido. Lo recomiendo totalmente.', verified: true },
      { author: 'Alejandra M.', rating: 4, text: 'Buena energía. La piel se ve más brillante también.', verified: true }
    ],
    variants: [{ name: '10 parches', price: '$82.250', stock: '27' }, { name: '30 parches', price: '$235.000', stock: '27' }]
  },
  {
    id: 'x49',
    brand: 'lifewave',
    name: 'X49',
    sub: 'Potenciador de Rendimiento Deportivo',
    badge: 'En stock',
    badgeBg: '#e5d4f1',
    badgeColor: '#6d28d9',
    price: '$220.000',
    priceDay: '$7.333/día',
    stock: '30 parches',
    stockCount: 15,
    stockStatus: 'Entregas en 24hs',
    img: 'img/productos/lifewave/x49.png',
    goals: ['rendimiento', 'energia'],
    desc: 'Aumentá tu fuerza, resistencia y masa muscular. El parche que eligen los atletas de alto rendimiento para ir al siguiente nivel.',
    tagline: '"Entrenás vos, pero tu cuerpo rinde como nunca."',
    benefits: [
      'Aumenta fuerza y resistencia muscular',
      'Mejora rendimiento deportivo',
      'Acelera recuperación post-entreno',
      'Optimiza función cardiovascular',
      'Promueve pérdida de grasa',
      'Fortalece estructura ósea'
    ],
    science: 'Fototerapia patentada que activa el péptido AHK para optimizar función muscular y cardiovascular. Sin sustancias prohibidas, compatible con competición.',
    qa: [
      { q: '¿Cómo combina con mi rutina de ejercicio?', a: 'Usá un X49 antes de entrenar. Notarás aumento de fuerza y resistencia desde la primera sesión.' },
      { q: '¿Es legal en competición?', a: 'Completamente legal. X49 no contiene ninguna sustancia prohibida ni doping.' },
      { q: '¿Puedo usar X49 y X39 juntos?', a: 'Sí, muchos atletas usan ambos. X39 para recuperación profunda y X49 para rendimiento.' },
      { q: '¿Cuándo veo resultados?', a: 'Energía y fuerza: 3-5 días. Ganancia muscular: 4-8 semanas de uso consistente.' }
    ],
    reviews: [
      { author: 'Carlos D.', rating: 5, text: 'Parecía mentira al principio pero aumenté mi fuerza un 15% en un mes. Ahora no entreno sin X49.', verified: true },
      { author: 'Lucia F.', rating: 5, text: 'Mi recuperación es increíble. Entrenaba lunes y martes agotada, ahora puedo entrenar 6 días.', verified: true },
      { author: 'Pablo R.', rating: 4, text: 'Bueno para cardio. Sumado a mi dieta, notó cambios en composición corporal.', verified: true }
    ],
    variants: [{ name: '10 parches', price: '$150.000', stock: '15' }, { name: '30 parches', price: '$220.000', stock: '15' }]
  },
  {
    id: 'icewave',
    brand: 'lifewave',
    name: 'IceWave',
    sub: 'Alivio Natural e Inmediato del Dolor',
    badge: 'Dolor',
    badgeBg: '#d4e8f1',
    badgeColor: '#0369a1',
    price: '$165.000',
    priceDay: '$5.5/día',
    stock: '30 parches',
    stockCount: 10,
    stockStatus: 'Entregas en 24hs',
    img: 'img/productos/lifewave/icewave.png',
    goals: ['dolor'],
    desc: 'Alivio rápido y sostenido del dolor sin medicamentos. Tecnología dual que interrumpe señales de dolor a nivel nervioso desde el primer uso.',
    tagline: '"Menos dolor, más vida."',
    benefits: [
      'Alivio rápido del dolor agudo o crónico',
      'Disminuye inflamación y tensión muscular',
      'Mejora movilidad en zonas afectadas',
      'Sin fármacos ni efectos adversos',
      'Permite reducir el uso de analgésicos',
      'Apto para uso diario'
    ],
    science: 'Tecnología fototerapéutica dual (parche blanco + café) que interrumpe señales de dolor a nivel nervioso y mejora la circulación local.',
    qa: [
      { q: '¿A qué hora veo el alivio?', a: 'Muchos sienten alivio en 15-30 minutos. Otros entre 1-2 horas. Depende del tipo de dolor.' },
      { q: '¿Cuánto tiempo dura el efecto?', a: 'El parche funciona hasta 12 horas. Colocá otro para mantener alivio continuo.' },
      { q: '¿Funciona para dolor crónico?', a: 'Sí, especialemente útil. Muchos users reducen medicación después de 2-3 semanas.' },
      { q: '¿Dónde lo coloco?', a: 'Ponelo directamente sobre la zona adolorida o sobre los acupuntos clave relacionados.' }
    ],
    reviews: [
      { author: 'Roberto T.', rating: 5, text: 'Dolor de espalda crónico desapareció. No puedo creer que sea tan simple.', verified: true },
      { author: 'Sandra L.', rating: 5, text: 'Dejé los analgésicos después de 3 semanas. Ahora solo uso IceWave.', verified: true },
      { author: 'Miguel A.', rating: 4, text: 'Muy efectivo para dolor muscular post-entreno. Recomendado.', verified: true }
    ]
  },
  {
    id: 'silent-night',
    brand: 'lifewave',
    name: 'Silent Nights',
    sub: 'Sueño Natural, Reparador y Profundo',
    badge: 'Sueño',
    badgeBg: '#e5e0f1',
    badgeColor: '#6b21a8',
    price: '$150.000',
    priceDay: '$5.000/día',
    stock: '30 parches',
    stockCount: 15,
    stockStatus: 'Entregas en 24hs',
    img: 'img/productos/lifewave/silent-night.png',
    goals: ['sueno'],
    desc: 'Conciliá el sueño más rápido y despertate renovado. Sin melatonina, sin dependencia, respetando tu química natural.',
    tagline: '"Dormí profundo, despertá en tu mejor versión."',
    benefits: [
      'Concilia el sueño con mayor facilidad',
      'Mejora calidad y profundidad del descanso',
      'Despertar renovado y energético',
      'Regula el ritmo circadiano',
      'Sin melatonina ni dependencia',
      'Apoya la reparación celular nocturna'
    ],
    science: 'Fototerapia que regula biorritmos y puntos relacionados con el sueño, sin melatonina ni fármacos, respetando la química natural del cuerpo.',
    qa: [
      { q: '¿Cuándo empiezo a dormir mejor?', a: 'Primera noche: sueño más profundo. Después de una semana: conciliación más rápida.' },
      { q: '¿Me voy a despertar resacado?', a: 'No, es lo opuesto. Despiertas renovado sin somnolencia residual.' },
      { q: '¿Puedo viajar y usarlo?', a: 'Perfecto para viajes. Regula jet lag y sueño en nuevas zonas horarias.' },
      { q: '¿Compatible con medicación para dormir?', a: 'Consult con tu médico, pero generalmente compatible. Muchos reducen medicación gradualmente.' }
    ],
    reviews: [
      { author: 'Gabriela N.', rating: 5, text: 'Insomnio de 10 años solucionado en 2 semanas. Dormí profundo por primera vez en años.', verified: true },
      { author: 'Fernando G.', rating: 5, text: 'Despierto renovado. No es placebo, es realmente efectivo.', verified: true },
      { author: 'Patricia Z.', rating: 4, text: 'Bueno. Necesité 3 noches para adaptarme pero ahora durmo mejor.', verified: true }
    ]
  },
  {
    id: 'aeon',
    brand: 'lifewave',
    name: 'Aeon',
    sub: 'Regulación del Estrés y Bienestar Emocional',
    badge: 'Calma',
    badgeBg: '#f0e8f1',
    badgeColor: '#7c3aed',
    price: '$150.000',
    priceDay: '$5.000/día',
    stock: '30 parches',
    stockCount: 12,
    stockStatus: 'Entregas en 24hs',
    img: 'img/productos/lifewave/aeon.png',
    goals: ['foco', 'longevidad'],
    desc: 'Reducí el estrés, mejorá tu claridad mental y equilibrá tu sistema nervioso sin somnolencia ni dependencia.',
    tagline: '"Bajá el ruido del estrés, subí el volumen de tu calma."',
    benefits: [
      'Reduce estrés emocional y físico',
      'Disminuye inflamación sistémica',
      'Mejora claridad mental y enfoque',
      'Promueve relajación sin somnolencia',
      'Equilibra sistema nervioso autónomo',
      'Refuerza respuesta antiinflamatoria'
    ],
    science: 'Fototerapia que estimula puntos neurobioenergéticos y reduce proteína C reactiva, apoyando la homeostasis del sistema nervioso.',
    qa: [
      { q: '¿Me va a dar sueño?', a: 'No. Aeon relaja sin somnolencia. Podés usarlo en el día, antes de una reunión.' },
      { q: '¿Funciona para ansiedad?', a: 'Excelente para ansiedad. Muchos notan cambio en 24-48 horas.' },
      { q: '¿Cuánto tiempo tarda?', a: 'Algunos sienten calma en minutos. Beneficios máximos se notan en 1-2 semanas.' },
      { q: '¿Compatible con meditación y yoga?', a: 'Sí, potencia los efectos. Muchos yoguis lo usan para profundizar práctica.' }
    ],
    reviews: [
      { author: 'Victoria H.', rating: 5, text: 'Ansiedad controlada sin medicinas. Noto claridad mental que no tenía en años.', verified: true },
      { author: 'Martín C.', rating: 5, text: 'Bajó mi presión, duermo mejor, menos estrés laboral. Recomendadísimo.', verified: true },
      { author: 'Rosario M.', rating: 4, text: 'Bueno, aunque esperaba resultados más inmediatos. Después de 10 días noté diferencia.', verified: true }
    ]
  },
  {
    id: 'glutathione',
    brand: 'lifewave',
    name: 'Glutathione',
    sub: 'Detox Profundo y Refuerzo Inmunológico',
    badge: 'Inmunidad',
    badgeBg: '#d4f1e0',
    badgeColor: '#0369a1',
    price: '$150.000',
    priceDay: '$5.000/día',
    stock: '30 parches',
    stockCount: 5,
    stockStatus: 'Últimas 5 unidades',
    img: 'img/productos/lifewave/glutathione.png',
    goals: ['inmunidad', 'longevidad'],
    desc: 'Elevá el antioxidante maestro de tu cuerpo hasta un 300% en 24h. Detox celular, inmunidad y protección oxidativa profunda.',
    tagline: '"Tu escudo interno contra toxinas y estrés oxidativo."',
    benefits: [
      'Eleva glutatión hasta un 300% en 24h',
      'Favorece desintoxicación celular',
      'Refuerza el sistema inmunológico',
      'Protege contra radicales libres',
      'Mejora recuperación ante enfermedades',
      'Apoya función hepática'
    ],
    science: 'Estudios clínicos muestran que este parche puede elevar los niveles de glutatión en sangre hasta un 300% en solo 24 horas mediante fototerapia no invasiva.',
    qa: [
      { q: '¿Realmente eleva glutatión 300%?', a: 'Sí, demostrado en estudios clínicos. El aumento se sostiene mientras usás el parche.' },
      { q: '¿Es glutatión que ingiero?', a: 'No, estimula tu cuerpo para producir el suyo propio. Mucho más efectivo que suplementos orales.' },
      { q: '¿Cuándo veo resultados de desintoxicación?', a: 'Algunos se sienten mejor en días. Desintoxicación profunda: 3-4 semanas.' },
      { q: '¿Es útil si tengo hígado graso?', a: 'Muy recomendado. Apoya recuperación hepática. Consultá con tu médico.' }
    ],
    reviews: [
      { author: 'Diego T.', rating: 5, text: 'Análisis de sangre confirmó aumento de glutatión. Me siento más limpio internamente.', verified: true },
      { author: 'Valeria S.', rating: 5, text: 'Energía renovada después de desintoxicar. Notó en piel y cabello también.', verified: true },
      { author: 'Andrés M.', rating: 4, text: 'Parece funcionar bien para inmunidad. Menos resfriados este invierno.', verified: true }
    ]
  },
  {
    id: 'carnosine',
    brand: 'lifewave',
    name: 'Carnosine',
    sub: 'Protección Celular, Cognición y Rendimiento',
    badge: null,
    badgeBg: '#f1e0d4',
    badgeColor: '#92400e',
    price: '$140.400',
    priceDay: '$4.680/día',
    stock: '30 parches',
    stockCount: 8,
    stockStatus: 'Entregas en 24hs',
    img: 'img/productos/lifewave/carnosine.png',
    goals: ['longevidad', 'rendimiento', 'foco'],
    desc: 'Protegé tus células del envejecimiento, mejorá tu memoria y potenciá tu rendimiento físico con carnosina activada naturalmente.',
    tagline: '"Cuerpo fuerte, mente clara, células protegidas."',
    benefits: [
      'Mejora salud y longevidad celular',
      'Potencia memoria, enfoque y claridad',
      'Optimiza rendimiento físico',
      'Antioxidante y antienvejecimiento',
      'Protege corazón, hígado y cerebro',
      'Aumenta resistencia al estrés oxidativo'
    ],
    science: 'Fototerapia que eleva de forma natural los niveles de carnosina, estabilizando la estructura celular y combatiendo el estrés oxidativo.',
    qa: [
      { q: '¿Cuáles son los efectos en el cerebro?', a: 'Memoria mejorada, menos niebla mental, mejor concentración. Se nota entre 2-3 semanas.' },
      { q: '¿Es antienvejecimiento?', a: 'Sí, protege las células del daño oxidativo que acelera envejecimiento.' },
      { q: '¿A qué edad debo empezar?', a: 'A partir de 30 años recomendado para prevención. Después de 40, casi obligatorio.' },
      { q: '¿Combina con X39?', a: 'Perfectamente. X39 + Carnosine es combo anti-aging muy potente.' }
    ],
    reviews: [
      { author: 'Elena G.', rating: 5, text: 'Mi memoria está como hace 15 años. Realmente funciona.', verified: true },
      { author: 'Sergio P.', rating: 5, text: 'Combo con X39 es ganador. Me siento 10 años más joven.', verified: true },
      { author: 'Matilde N.', rating: 4, text: 'Bueno para memoria. Tomo más tiempo notar cambios pero efectivo.', verified: true }
    ]
  },
  {
    id: 'sp6',
    brand: 'lifewave',
    name: 'SP6 Complete',
    sub: 'Control del Apetito y Apoyo Metabólico',
    badge: 'Metabolismo',
    badgeBg: '#e0f1d4',
    badgeColor: '#15803d',
    price: '$160.000',
    priceDay: '$5.333/día',
    stock: '30 parches',
    stockCount: 3,
    stockStatus: 'Últimas 3 unidades',
    img: 'img/productos/lifewave/sp6.png',
    goals: ['energia'],
    desc: 'Regulá el apetito y los antojos de forma natural. Apoya un metabolismo más activo y eficiente sin estimulantes ni químicos.',
    tagline: '"Menos antojos, más conexión con tu cuerpo."',
    benefits: [
      'Regula apetito y antojos naturalmente',
      'Apoya un metabolismo más activo',
      'Favorece el control de peso',
      'Equilibrio hormonal sin químicos',
      'Mejora señalización hambre/saciedad',
      'Sin estimulantes'
    ],
    science: 'Fototerapia sobre puntos digestivos y hormonales que favorece la señalización de hambre/saciedad y el uso eficiente de grasa como energía.',
    qa: [
      { q: '¿Es estimulante?', a: 'No, cero estimulantes. Trabaja con tu fisiología natural, no contra ella.' },
      { q: '¿Funcionan los antojos?', a: 'Totalmente. Antojos de azúcar y carbohidratos se reducen significativamente.' },
      { q: '¿Cuánto peso pierdo?', a: 'SP6 apoya metabolismo, no reemplaza dieta. Con dieta buena: 2-3kg/mes.' },
      { q: '¿Puedo usar con X49?', a: 'Excelente combo. X49 para músculo, SP6 para definición.' }
    ],
    reviews: [
      { author: 'Tamara L.', rating: 5, text: 'Los antojos desaparecieron. Bajé 5kg sin dieta estricta.', verified: true },
      { author: 'Lucas M.', rating: 4, text: 'Buen apoyo metabólico. Combinado con ejercicio, muy bueno.', verified: true },
      { author: 'Julieta R.', rating: 5, text: 'Como mucho menos de forma natural. Sin angustia, sin restricción.', verified: true }
    ]
  },
  {
    id: 'ee',
    brand: 'lifewave',
    name: 'Energy Enhancer',
    sub: 'Energía Natural y Vitalidad Sostenida',
    badge: 'Energía',
    badgeBg: '#d4e0f1',
    badgeColor: '#0369a1',
    price: '$150.000',
    priceDay: '$5.000/día',
    stock: '30 parches',
    stockCount: 5,
    stockStatus: 'Últimas 5 unidades',
    img: 'img/productos/lifewave/ee.png',
    goals: ['energia', 'rendimiento'],
    desc: 'Más energía sin cafeína ni estimulantes. Activa tus propios mecanismos energéticos de forma sostenida durante todo el día.',
    tagline: '"Más energía, menos cansancio. Todo el día."',
    benefits: [
      'Aumenta energía de forma natural',
      'Mejora resistencia física y mental',
      'Reduce la fatiga cotidiana',
      'Activa metabolismo sin químicos',
      'Vitalidad sin picos ni caídas',
      'Favorece alerta y concentración'
    ],
    science: 'Fototerapia que estimula puntos clave de acupuntura energética, activando los sistemas naturales de producción de energía del cuerpo sin cafeína.',
    qa: [
      { q: '¿A qué hora noto la energía?', a: 'Algunos en 30 minutos, otros en 2-3 horas. Varía por persona.' },
      { q: '¿Interfiere con el sueño?', a: 'No, porque no es estimulante. Usalo en la mañana o tarde, sin problema.' },
      { q: '¿Versus cafeína cuál es mejor?', a: 'Energy Enhancer es más sostenido. Sin crash como cafeína. Sin jitteriness.' },
      { q: '¿Cuántos puedo usar por día?', a: 'Uno en mañana, máximo otro a la tarde. No abusar.' }
    ],
    reviews: [
      { author: 'Nicolás T.', rating: 5, text: 'Adiós cafeína. Energy Enhancer sin efectos secundarios.', verified: true },
      { author: 'Mariana P.', rating: 5, text: 'Energía sostenida todo el día sin el crash.', verified: true },
      { author: 'Alberto V.', rating: 4, text: 'Bueno, aunque necesité tiempo para adaptarme.', verified: true }
    ]
  },
  {
    id: 'neuro-focus',
    brand: 'neuro',
    name: 'Energy & Focus Gum',
    sub: 'Rendimiento Mental · Spearmint',
    badge: 'Foco',
    badgeBg: '#d1fae5',
    badgeColor: '#065f46',
    price: '$18.000',
    priceDay: '$600/día',
    stock: '1 blister (9 chicles)',
    stockCount: 22,
    stockStatus: 'Entregas en 24hs',
    img: 'img/productos/neuro/neuro-featured.png',
    goals: ['foco', 'energia', 'rendimiento'],
    desc: 'Energía limpia con 40mg de cafeína natural + 60mg de L-teanina. +21% de velocidad cognitiva comprobado por BrainCo. Sin azúcar ni aspartame.',
    tagline: '"Masticás, y tu mente entra en modo máximo rendimiento."',
    benefits: [
      'Energía limpia sin nerviosismo',
      'Enfoque cristalino que dura horas',
      'Claridad mental sin crash posterior',
      'Sin azúcar, sin aspartame',
      '100% vegano y gluten-free',
      '9 chicles por paquete'
    ],
    science: 'Tecnología cold-compression que preserva la potencia de activos. Estudios BrainCo: +21% de velocidad en tareas cognitivas vs placebo con cafeína + L-teanina + vitaminas B.',
    qa: [
      { q: '¿Cuándo empiezo a sentir el enfoque?', a: '5-10 minutos. Es inmediato porque masticable se absorbe rápido.' },
      { q: '¿Cuánto dura el efecto?', a: '4-6 horas de máximo enfoque. Sin crash después.' },
      { q: '¿Es 40mg mucha cafeína?', a: 'No, es moderada. Equivalente a 1/3 de un café. L-teanina evita nerviosismo.' },
      { q: '¿Puedo masticar dos de una vez?', a: 'Sí, si necesitás máxima potencia. Algunos lo hacen para exámenes.' }
    ],
    reviews: [
      { author: 'Sofía G.', rating: 5, text: 'Estudio con esto y rendimiento x2. Recomendado para estudiantes.', verified: true },
      { author: 'Bruno C.', rating: 5, text: 'Mejor que café. Foco sin nerviosismo.', verified: true },
      { author: 'Carla N.', rating: 4, text: 'Efectivo, aunque el sabor podría ser mejor.', verified: true }
    ],
    variants: [{ name: '1 Blister', price: '$18.000', stock: '22' }, { name: 'Caja 6 blisters', price: '$85.000', stock: '3' }]
  },
  {
    id: 'neuro-extra',
    brand: 'neuro',
    name: 'Extra Strength Gum',
    sub: 'Alta Activación Mental · 100mg',
    badge: 'Turbo',
    badgeBg: '#d1fae5',
    badgeColor: '#065f46',
    price: '$19.550',
    priceDay: '$651/día',
    stock: '1 caja (6 blisters)',
    stockCount: 12,
    stockStatus: 'Entregas en 24hs',
    img: 'img/productos/neuro/extra-strength.png',
    goals: ['energia', 'rendimiento'],
    desc: '100mg de cafeína natural por chicle. Para los momentos de máxima exigencia mental o física. L-teanina para evitar el crash.',
    tagline: '"Cuando necesitás tu 110%, este es tu modo turbo."',
    benefits: [
      'Alta activación mental con 100mg cafeína',
      'L-teanina equilibra energía y ánimo',
      'Vitaminas B para metabolismo cerebral',
      'Sin crash brusco',
      'Ideal para momentos de máxima exigencia',
      'Absorción rápida'
    ],
    science: 'Formato masticable con 100mg cafeína + 60mg L-teanina + B6/B12, diseñado para rendimiento extremo. Tecnología cold-compression para máxima eficacia.',
    qa: [
      { q: '¿Es muy fuerte?', a: '100mg es fuerte pero controlada con L-teanina. Ideal para momentos críticos.' },
      { q: '¿Puedo tomar antes de deporte?', a: 'Excelente antes de entrenamientos intensos. Rinde mucho.' },
      { q: '¿Afecta el sueño?', a: 'Usalo mínimo 6 horas antes de dormir. Mejor en mañana/mediodía.' },
      { q: '¿Diferencia con regular?', a: 'Extra Strength = 2.5x más cafeína. Para extremos, no diario.' }
    ],
    reviews: [
      { author: 'Tomás L.', rating: 5, text: 'Entrenamientos de otro nivel. Extra Strength es game changer.', verified: true },
      { author: 'Romina T.', rating: 5, text: 'Para exámenes es imprescindible. Máximo foco.', verified: true },
      { author: 'Gustavo M.', rating: 4, text: 'Potente. Requiere respeto pero funciona.', verified: true }
    ],
    variants: [{ name: '1 Caja', price: '$19.550', stock: '12' }, { name: 'Pack 3 cajas', price: '$55.000', stock: '4' }]
  },
  {
    id: 'neuro-mints',
    brand: 'neuro',
    name: 'Energy Mints',
    sub: 'Energía Suave · Mints de Disolución Rápida',
    badge: null,
    badgeBg: '#d1fae5',
    badgeColor: '#065f46',
    price: '$15.300',
    priceDay: '$510/día',
    stock: '1 lata (12 mentas)',
    stockCount: 30,
    stockStatus: 'Entregas en 24hs',
    img: 'img/productos/neuro/mints-energy.png',
    goals: ['energia', 'foco'],
    desc: 'Energía controlada en formato mint. 40mg de cafeína + L-teanina, disolución instantánea. Sin agua, sin esperar.',
    tagline: '"Una mint, y tu mente se enciende."',
    benefits: [
      'Energía suave y controlada',
      '40mg de cafeína natural',
      'L-teanina reduce nerviosismo',
      'Sin azúcar ni aspartame',
      'Disolución sublingual rápida',
      'Sin agua, en cualquier momento'
    ],
    science: 'Tecnología cold-compression en mints sublinguales que entrega cafeína + L-teanina + vitaminas B con máxima eficacia y mínima sobrecarga.',
    qa: [
      { q: '¿Cuánto tarda en hacer efecto?', a: '3-5 minutos. Disolución sublingual es rapidísima.' },
      { q: '¿Puedo tomar varias?', a: 'Máximo 2-3 por día. No abusar de la cafeína.' },
      { q: '¿Mejor que chicles Neuro?', a: 'Similar cafeína, pero mints más rápido. Elegí por conveniencia.' },
      { q: '¿Puedo llevar a cualquier lado?', a: 'Sí, discreta, compacta, no masticables. Perfecta para bolsillo.' }
    ],
    reviews: [
      { author: 'Ignacio D.', rating: 5, text: 'Mejor que café. Rápido y sin culpa.', verified: true },
      { author: 'Lucia F.', rating: 4, text: 'Efectivas y discretas. Buen producto.', verified: true },
      { author: 'Pedro R.', rating: 5, text: 'Uso en la oficina, nadie sabe que estoy tomando energía.', verified: true }
    ],
    variants: [{ name: '1 Lata', price: '$15.300', stock: '30' }, { name: 'Pack 6 latas', price: '$80.000', stock: '5' }]
  },
  {
    id: 'neuro-sleep',
    brand: 'neuro',
    name: 'Sleep & Recharge',
    sub: 'Sueño Profundo · Meltaway Mints',
    badge: 'Sueño',
    badgeBg: '#d1fae5',
    badgeColor: '#065f46',
    price: '$18.000',
    priceDay: '$600/día',
    stock: '1 blister (12 mentas)',
    stockCount: 14,
    stockStatus: 'Entregas en 24hs',
    img: 'img/productos/neuro/sleep-recharge.png',
    goals: ['sueno'],
    desc: 'Melatonina + elderberry, manzanilla y pasiflora. Sueño reparador sin sensación de resaca. Se disuelven en segundos.',
    tagline: '"Dormís profundo, despertás liviano."',
    benefits: [
      'Regulan ciclo sueño-vigilia',
      '1–5mg de melatonina fisiológica',
      'Elderberry, manzanilla y pasiflora',
      'Relajación profunda y natural',
      'Disolución instantánea, sin agua',
      'Sin sensación de resaca'
    ],
    science: 'Melatonina en dosis fisiológicas combinada con extractos botánicos y tecnología cold-compression para sueño reparador sin somnolencia diurna.',
    qa: [
      { q: '¿A qué hora me las tomo?', a: '30 minutos antes de dormir. Te ayuda a conciliar el sueño naturalmente.' },
      { q: '¿Melatonina crea hábito?', a: 'No, melatonina no crea dependencia. Tu cuerpo sigue regulándose normal.' },
      { q: '¿Dosis es suficiente?', a: 'Sí, 1-5mg es la dosis fisiológica natural. Perfecta.' },
      { q: '¿Funciona mejor que Silent Night?', a: 'Sleep & Recharge = melatonina. Silent Night = fototerapia. Diferentes enfoques, ambos buenos.' }
    ],
    reviews: [
      { author: 'Marisa T.', rating: 5, text: 'Mentas deliciosas y dormir mejor. Noche perfecta.', verified: true },
      { author: 'Enrique P.', rating: 5, text: 'Sin resaca matinal. Despertar es fácil.', verified: true },
      { author: 'Débora L.', rating: 4, text: 'Buen producto, aunque desearía mayor dosis de melatonina.', verified: true }
    ]
  },
  {
    id: 'calm-clarity',
    brand: 'neuro',
    name: 'Calm & Clarity Mints',
    sub: 'Calma Mental y Claridad Enfocada',
    badge: 'Calma',
    badgeBg: '#d1fae5',
    badgeColor: '#065f46',
    price: '$15.300',
    priceDay: '$510/día',
    stock: '1 blister (12 mentas)',
    stockCount: 5,
    stockStatus: 'Últimas 5 unidades',
    img: 'img/productos/neuro/calma-claridad.png',
    goals: ['foco', 'sueno', 'longevidad'],
    desc: 'GABA + L-Teanina + Vitamina D3. Mentas funcionales sin azúcar ni aspartame para optimizar la compostura y la claridad mental en los momentos de mayor exigencia.',
    tagline: '"Mente clara, cuerpo tranquilo."',
    benefits: [
      'Reduce estrés y ansiedad mental',
      'Claridad enfocada sin sedación',
      'GABA para calmar el sistema nervioso',
      'L-Teanina para foco sin tensión',
      'Vitamina D3 para bienestar profundo',
      'Sin azúcar, sin aspartame'
    ],
    science: 'Tecnología cold-compression patentada que garantiza la máxima biodisponibilidad de GABA, L-teanina y vitamina D3. Diseñado para calma mental sin somnolencia.',
    qa: [
      { q: '¿Diferencia con Aeon?', a: 'Aeon = parche. Calm & Clarity = nootrópicos orales. Enfoques complementarios.' },
      { q: '¿Puedo usarlo diariamente?', a: 'Sí, es seguro para uso diario. No crea hábito.' },
      { q: '¿Cuándo veo resultados?', a: 'Calma inmediata. Beneficios profundos después 1-2 semanas.' },
      { q: '¿Va bien antes de reuniones importantes?', a: 'Perfecto. Claridad + calma = mejor desempeño sin estrés.' }
    ],
    reviews: [
      { author: 'Mauro G.', rating: 5, text: 'Antes de presentaciones: calma + claridad. No puedo vivir sin esto.', verified: true },
      { author: 'Fernanda R.', rating: 5, text: 'Ansiedad controlada, mente enfocada. Excelente.', verified: true },
      { author: 'Ricardo V.', rating: 4, text: 'Buenos, aunque el efecto es más sutil.', verified: true }
    ]
  },
  {
    id: 'ess60-prod',
    brand: 'ess60',
    name: 'ESS60',
    sub: 'Carbono C60 en Aceite de Oliva Orgánico',
    badge: 'Biohacking',
    badgeBg: '#fce7f3',
    badgeColor: '#9d174d',
    price: '$187.200',
    priceDay: '$6.240/día',
    stock: '50ml',
    stockCount: 3,
    stockStatus: 'Últimas 3 unidades',
    img: 'img/productos/ess60-featured.png',
    goals: ['longevidad', 'energia', 'inmunidad'],
    desc: 'Carbono C60 purificado en aceite de oliva orgánico premium. El antioxidante más potente para longevidad celular y energía mitocondrial.',
    tagline: '"Energía, claridad y longevidad en una sola cucharada."',
    benefits: [
      'Potente acción antioxidante',
      'Aumenta energía celular y mitocondrial',
      'Mejora claridad mental',
      'Promueve longevidad celular',
      'Fortalece sistema inmune',
      'Apoya salud cardiovascular'
    ],
    science: 'Molécula C60 purificada y estabilizada en aceite de oliva orgánico para máxima biodisponibilidad. Protección selectiva frente a radicales libres.',
    qa: [
      { q: '¿Cuál es la dosis?', a: '1 cucharadita (5ml) por día, preferentemente por la mañana.' },
      { q: '¿A qué sabe?', a: 'A aceite de oliva suave. Podés tomarla así o agregar a comida.' },
      { q: '¿Afecta el colesterol?', a: 'No, ayuda a mantener niveles sanos. Compatible con medicinas.' },
      { q: '¿Cuánto tarda en hacer efecto?', a: 'Antioxidación inmediata. Efectos de longevidad: 3-6 meses.' }
    ],
    reviews: [
      { author: 'Horacio J.', rating: 5, text: 'Energía y claridad. A los 60 años me siento como a los 40.', verified: true },
      { author: 'Yolanda P.', rating: 5, text: 'Piel más luminosa, energía constante. Es lo mejor que probé.', verified: true },
      { author: 'Facundo M.', rating: 4, text: 'Bueno, precio es fuerte pero calidad es premium.', verified: true }
    ]
  },
  {
    id: 'h2-tablets',
    brand: 'h2',
    name: 'H2 Tablets',
    sub: 'Hidrógeno Molecular para Bienestar Celular',
    badge: 'H₂',
    badgeBg: '#e0f2fe',
    badgeColor: '#0369a1',
    price: '$170.000',
    priceDay: '$5.666/día',
    stock: '1 frasco (30 tablets)',
    stockCount: 6,
    stockStatus: 'Últimas 6 unidades',
    img: 'img/productos/h2-tablets.png',
    goals: ['energia', 'rendimiento', 'longevidad', 'inmunidad'],
    desc: '+2000 publicaciones científicas. Mejora cognitiva, salud metabólica, rendimiento físico y longevidad celular en un vaso de agua.',
    tagline: '"El poder del hidrógeno molecular en cada vaso de agua."',
    benefits: [
      'Mejora claridad y rendimiento cognitivo',
      'Optimiza 18 de 20 marcadores metabólicos',
      'Aumenta VO2 máx y resistencia',
      'Sensibilidad a la insulina +11%',
      'Recuperación física acelerada',
      '+140 ensayos clínicos publicados'
    ],
    science: 'Hidrógeno molecular con respaldo de +2000 publicaciones y 140+ ensayos clínicos, actuando como regulador maestro del metabolismo celular.',
    qa: [
      { q: '¿Cómo funciona?', a: 'H2 molecular es un antioxidante selectivo. Solo neutraliza radicales libres dañinos, protegiendo los buenos.' },
      { q: '¿Cuántas tabletas por día?', a: '1-2 tabletas en un vaso de agua. Se disuelven rápido.' },
      { q: '¿Mejora rendimiento deportivo?', a: 'Sí. VO2 máx +10%, resistencia +15%, recuperación más rápida.' },
      { q: '¿Cuándo veo resultados?', a: 'Energía: 3-7 días. Cambios metabólicos: 4-8 semanas.' }
    ],
    reviews: [
      { author: 'Maximiliano T.', rating: 5, text: 'Cambió mi rendimiento deportivo. Recuperación impresionante.', verified: true },
      { author: 'Susana M.', rating: 5, text: '2000 papers no mienten. Funciona realmente.', verified: true },
      { author: 'Raúl D.', rating: 4, text: 'Bueno, aunque es inversión importante.', verified: true }
    ]
  },
  {
    id: 'analemma',
    brand: 'analemma',
    name: 'Analemma Wand',
    sub: 'Agua Estructurada de Alta Coherencia',
    badge: null,
    badgeBg: '#e0f2fe',
    badgeColor: '#0369a1',
    price: '$352.800',
    priceDay: '$11.760/día',
    stock: '1 varilla estructuradora',
    stockCount: 4,
    stockStatus: 'Últimas 4 unidades',
    img: 'img/productos/analemma-featured.png',
    goals: ['energia', 'longevidad'],
    desc: 'Transformá cualquier agua en agua estructurada de alta coherencia con una sola pasada. Tecnología pionera de bienestar molecular.',
    tagline: '"El agua que tomás, ahora en su estado más puro."',
    benefits: [
      'Eleva la energía biológica del agua',
      'Mejora hidratación celular',
      'Aumenta energía y vitalidad',
      'Impacto positivo en microbioma',
      'Tecnología de alta coherencia',
      'Para toda la familia'
    ],
    science: 'Tecnología de estructuración de agua que aumenta la coherencia molecular, impactando positivamente en la hidratación celular y la energía biológica disponible.',
    qa: [
      { q: '¿Cómo funciona?', a: 'Pasás la varilla por el agua y la reorganiza a nivel molecular. Agua más coherente = mejor para el cuerpo.' },
      { q: '¿Cuánto tiempo dura?', a: 'De por vida. Sin baterías, sin recambios, sin mantenimiento.' },
      { q: '¿Diferencia en agua destilada vs de red?', a: 'Funciona con ambas. El efecto es más notorio en agua pura.' },
      { q: '¿Puedo notar la diferencia?', a: 'Muchos sí. El agua se siente más suave, más "viva". Estudios muestran mejora en hidratación celular.' }
    ],
    reviews: [
      { author: 'Lorena S.', rating: 5, text: 'El agua se siente diferente. Hidratación real.', verified: true },
      { author: 'Damian G.', rating: 5, text: 'Mi familia nota el cambio. Agua normal nunca más.', verified: true },
      { author: 'Viviana T.', rating: 4, text: 'Interesante tecnología. Caro pero es de por vida.', verified: true }
    ]
  },
  {
    id: 'gamma-light',
    brand: 'gamma-light',
    name: 'Gamma Light 40Hz',
    sub: 'Estimulación Cerebral del MIT',
    badge: 'MIT',
    badgeBg: '#fef3c7',
    badgeColor: '#92400e',
    price: '$200.000',
    priceDay: '$6.666/día',
    stock: '1 dispositivo',
    stockCount: 15,
    stockStatus: 'Entregas en 24hs',
    img: 'img/productos/gamma-light-featured.png',
    goals: ['foco', 'longevidad'],
    desc: 'Dispositivo de luz gamma 40Hz desarrollado en el MIT. Estimulación no invasiva que activa el cerebro a frecuencias de alta coherencia.',
    tagline: '"El futuro del bienestar cerebral, hoy en tu casa."',
    benefits: [
      'Estimulación cerebral no invasiva',
      'Frecuencia gamma 40Hz del MIT',
      'Mejora función cognitiva',
      'Apoya neuroplasticidad',
      'Protocolo validado científicamente',
      'Uso simple en casa'
    ],
    science: 'Tecnología de estimulación sensorial gamma (40Hz) desarrollada en el MIT que activa oscilaciones cerebrales asociadas con cognición, memoria y neuroprotección.',
    qa: [
      { q: '¿Es seguro?', a: 'Completamente seguro. Estimulación no invasiva, validada por MIT.' },
      { q: '¿Cuánto tiempo por sesión?', a: '30-60 minutos. Podés leer, meditar, relajarte mientras se activa tu cerebro.' },
      { q: '¿Cuándo veo cambios?', a: 'Memoria y enfoque: 2-3 semanas. Neuroprotección: uso a largo plazo.' },
      { q: '¿Previene Alzheimer?', a: 'Estudios sugieren que sí. Mantiene oscilaciones gamma activas = mejor neuroprotección.' }
    ],
    reviews: [
      { author: 'Irene A.', rating: 5, text: 'Memoria mejorada notablemente. Nunca pensé que la luz podría hacer esto.', verified: true },
      { author: 'Jorge L.', rating: 5, text: 'Enfoque increíble después de usarlo. Productividad x2.', verified: true },
      { author: 'Patricia Z.', rating: 4, text: 'Bueno, aunque es inversión importante. Pero vale cada peso.', verified: true }
    ]
  },
  {
    id: 'shungita',
    brand: 'lifewave',
    name: 'Stickers de Shungita',
    sub: 'Protección EMF Natural',
    badge: 'EMF',
    badgeBg: '#f1d4e8',
    badgeColor: '#9d174d',
    price: '$13.685',
    priceDay: '$456/día',
    stock: '1 pack (38 stickers)',
    stockCount: 38,
    stockStatus: 'Entregas en 24hs',
    img: 'img/productos/shungita.png',
    goals: ['inmunidad'],
    desc: 'Shungita elite natural para proteger tus dispositivos de la radiación electromagnética. Sin interferir con la señal, adhesivo duradero.',
    tagline: '"Protegé tu espacio digital, cuidá tu energía."',
    benefits: [
      'Protección EMF natural',
      'Reduce exposición a radiación 5G',
      'Equilibra campo energético',
      'Minimiza fatiga electrónica',
      'Adhesivo permanente de larga duración',
      'Discreto, versátil, para toda superficie'
    ],
    science: 'Shungita elite natural con propiedades de blindaje electromagnético que atenúan el impacto de campos EMF en el entorno inmediato.',
    qa: [
      { q: '¿Realmente funciona?', a: 'Estructura cristalina de shungita atenúa campos. Notarás menos fatiga si pasás horas en pantalla.' },
      { q: '¿Dónde lo pongo?', a: 'En teléfono, notebook, router. O donde pasés más tiempo cerca de EMF.' },
      { q: '¿Cuánto dura?', a: 'Los stickers son permanentes. Duran años. El adhesivo es resistente.' },
      { q: '¿Compatible con todas las superficies?', a: 'Sí, metal, vidrio, plástico. Apenas notables, muy discretos.' }
    ],
    reviews: [
      { author: 'Gonzalo R.', rating: 5, text: 'Menos dolores de cabeza frente a la pantalla. Funciona.', verified: true },
      { author: 'Milena K.', rating: 4, text: 'Algo notó, aunque efecto puede ser placebo. Pero vale la pena.', verified: true },
      { author: 'Javier N.', rating: 5, text: 'Protección natural sin química. Excelente por precio.', verified: true }
    ]
  }
];
