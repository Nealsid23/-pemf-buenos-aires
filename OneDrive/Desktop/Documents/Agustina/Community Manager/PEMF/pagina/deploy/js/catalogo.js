const BRANDS = [
  { id: 'lifewave', name: 'LifeWave', tag: 'Fotobioterapia', tagColor: '#6d28d9', tagBg: '#ede9fe', bg1: 'linear-gradient(135deg,#3b0764,#6d28d9)', bg2: 'linear-gradient(135deg,#4c1d95,#7c3aed)', stageImg: 'img/productos/lifewave/x39.png' },
  { id: 'neuro', name: 'Neuro', tag: 'Nootrópicos', tagColor: '#065f46', tagBg: '#d1fae5', bg1: 'linear-gradient(135deg,#064e3b,#065f46)', bg2: 'linear-gradient(135deg,#065f46,#10b981)', stageImg: 'img/productos/neuro/neurogum.png' },
  { id: 'myvital', name: 'MyVital C', tag: 'Vitamina C', tagColor: '#9d174d', tagBg: '#fce7f3', bg1: 'linear-gradient(135deg,#831843,#9d174d)', bg2: 'linear-gradient(135deg,#9d174d,#ec4899)', stageImg: 'img/productos/myvital.png' },
  { id: 'drink', name: 'Drink HRW', tag: 'Agua de hidrógeno', tagColor: '#0369a1', tagBg: '#e0f2fe', bg1: 'linear-gradient(135deg,#0c4a6e,#0369a1)', bg2: 'linear-gradient(135deg,#075985,#38bdf8)', stageImg: 'img/productos/drink.png' },
  { id: 'analemma', name: 'Analemma', tag: 'Agua estructurada', tagColor: '#92400e', tagBg: '#fef3c7', bg1: 'linear-gradient(135deg,#78350f,#92400e)', bg2: 'linear-gradient(135deg,#92400e,#f59e0b)', stageImg: 'img/productos/analemma.png' },
  { id: 'gamma-light', name: 'Gamma Light', tag: 'Luz gamma', tagColor: '#f59e0b', tagBg: '#fef3c7', bg1: 'linear-gradient(135deg,#78350f,#92400e)', bg2: 'linear-gradient(135deg,#92400e,#f59e0b)', stageImg: 'img/productos/gamma-light.png' },
];

const KITS = [
  { id: 'longevidad', name: 'Kit Longevidad', products: 'X39 · Glutathione · ESS60', link: '#' },
  { id: 'cerebro', name: 'Kit Cerebro', products: 'Gamma 40Hz · Neuro · Calm & Clarity', link: '#' },
  { id: 'sueno', name: 'Kit Sueño', products: 'Silent Nights · Sleep & Recharge', link: '#' },
  { id: 'deportista', name: 'Kit Deportista', products: 'X49 · Energy Enhancer · H2 Tablets', link: '#' },
  { id: 'antistres', name: 'Kit Anti-estrés', products: 'Aeon · Calm & Clarity · IceWave', link: '#' },
  { id: 'autismo', name: 'Kit Autismo', products: 'X39 · Glutathione · Aeon', link: '#' },
];

const PRODUCTS = [
  {
    brand: 'lifewave', name: 'X39', badge: 'Más vendido', badgeBg: '#e5d4f1', badgeColor: '#6d28d9',
    price: '$235.000', priceDay: '$7.833/día', stock: '30 parches', stockCount: 30, stockStatus: 'En stock',
    img: 'img/productos/lifewave/x39.png',
    goals: ['longevidad', 'energia', 'inmunidad'],
    desc: 'Activa las células madre propias. Regeneración celular profunda, más energía, mejor sueño y recuperación acelerada sin fármacos.'
  },
  {
    brand: 'lifewave', name: 'X49', badge: 'Deporte', badgeBg: '#e5d4f1', badgeColor: '#6d28d9',
    price: '$220.000', priceDay: '$7.333/día', stock: '30 parches', stockCount: 12, stockStatus: '12 en stock',
    img: 'img/productos/lifewave/x49.png',
    goals: ['rendimiento', 'energia'],
    desc: 'Aumentá tu fuerza, resistencia y masa muscular. El parche que eligen los atletas de alto rendimiento para ir al siguiente nivel.'
  },
  {
    brand: 'lifewave', name: 'IceWave', badge: 'Dolor', badgeBg: '#d4e8f1', badgeColor: '#0369a1',
    price: '$165.000', priceDay: '$5.5/día', stock: '30 parches', stockCount: 8, stockStatus: '8 en stock',
    img: 'img/productos/lifewave/icewave.png',
    goals: ['dolor'],
    desc: 'Alivio rápido y sostenido del dolor sin medicamentos. Tecnología dual que interrumpe señales de dolor a nivel nervioso desde el primer uso.'
  },
  {
    brand: 'lifewave', name: 'Silent Night', badge: 'Sueño', badgeBg: '#e5e0f1', badgeColor: '#6b21a8',
    price: '$150.000', priceDay: '$5.000/día', stock: '30 parches', stockCount: 14, stockStatus: '14 en stock',
    img: 'img/productos/lifewave/silent-night.png',
    goals: ['sueno'],
    desc: 'Conciiliá el sueño más rápido y despertate renovado. Sin melatonina, sin dependencia, respetando la química natural.'
  },
  {
    brand: 'lifewave', name: 'AEON', badge: 'Calma', badgeBg: '#f0e8f1', badgeColor: '#7c3aed',
    price: '$150.000', priceDay: '$5.000/día', stock: '30 parches', stockCount: 9, stockStatus: '9 en stock',
    img: 'img/productos/lifewave/aeon.png',
    goals: ['longevidad', 'inmunidad'],
    desc: 'Reducí el estrés, mejoró tu claridad mental y equilibrará tu sistema nervioso sin somnolencia ni dependencia.'
  },
  {
    brand: 'lifewave', name: 'Glutathione', badge: 'Inmunidad', badgeBg: '#d4f1e0', badgeColor: '#0369a1',
    price: '$150.000', priceDay: '$5.000/día', stock: '30 parches', stockCount: 11, stockStatus: '11 en stock',
    img: 'img/productos/lifewave/glutathione.png',
    goals: ['inmunidad', 'longevidad'],
    desc: 'Elevá el antioxidante maestro de tu cuerpo hasta un 300% en 24h. Detox celular, inmunidad y protección oxidativa profunda.'
  },
  {
    brand: 'lifewave', name: 'Carnosine', badge: 'Anti-aging', badgeBg: '#f1e0d4', badgeColor: '#92400e',
    price: '$120.000', priceDay: '$4.000/día', stock: '30 parches', stockCount: 7, stockStatus: '7 en stock',
    img: 'img/productos/lifewave/carnosine.png',
    goals: ['longevidad', 'rendimiento'],
    desc: 'Regenerá tejidos musculares y articulares. Protege proteínas del daño y ralentiza el envejecimiento a nivel celular.'
  },
  {
    brand: 'lifewave', name: 'SP6 Complete', badge: 'Metabolismo', badgeBg: '#e0f1d4', badgeColor: '#15803d',
    price: '$100.000', priceDay: '$3.333/día', stock: '30 parches', stockCount: 5, stockStatus: '5 en stock',
    img: 'img/productos/lifewave/sp6.png',
    goals: ['energia'],
    desc: 'Regulá tu apetito y equilibrá tu metabolismo sin privaciones. Actúa en el punto SP6 de acupuntura para controlar el peso.'
  },
  {
    brand: 'lifewave', name: 'Energy Enhancer', badge: 'Energía', badgeBg: '#d4e0f1', badgeColor: '#0369a1',
    price: '$100.000', priceDay: '$3.333/día', stock: '30 parches', stockCount: 20, stockStatus: '20 en stock',
    img: 'img/productos/lifewave/ee.png',
    goals: ['energia', 'rendimiento'],
    desc: 'Generá energía sostenida sin cafeína ni estimulantes. Aumenta el ATP mitocondrial para rendimiento constante durante 12 horas.'
  },
  {
    brand: 'lifewave', name: 'Alavida', badge: 'Longevidad', badgeBg: '#f1d4e0', badgeColor: '#9d174d',
    price: '$110.000', priceDay: '$3.666/día', stock: '30 parches', stockCount: 6, stockStatus: '6 en stock',
    img: 'img/productos/lifewave/alavida.png',
    goals: ['longevidad'],
    desc: 'Rejuvenecé tu piel y tejidos desde adentro. Estimula epitalamina para un anti-aging avanzado y descanso reparador nocturno.'
  },
];
