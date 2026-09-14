const BRANDS = [
  { id: 'lifewave', name: 'LifeWave', tag: 'Fotobioterapia', tagColor: '#6d28d9', tagBg: '#ede9fe', bg1: 'linear-gradient(135deg,#3b0764,#6d28d9)', bg2: 'linear-gradient(135deg,#4c1d95,#7c3aed)' },
  { id: 'neuro', name: 'Neuro', tag: 'Nootrópicos', tagColor: '#065f46', tagBg: '#d1fae5', bg1: 'linear-gradient(135deg,#064e3b,#065f46)', bg2: 'linear-gradient(135deg,#065f46,#10b981)' },
  { id: 'analemma', name: 'Analemma', tag: 'Agua estructurada', tagColor: '#0369a1', tagBg: '#e0f2fe', bg1: 'linear-gradient(135deg,#0c4a6e,#0369a1)', bg2: 'linear-gradient(135deg,#075985,#38bdf8)' },
  { id: 'gamma-light', name: 'Gamma Light', tag: 'Luz gamma', tagColor: '#92400e', tagBg: '#fef3c7', bg1: 'linear-gradient(135deg,#78350f,#92400e)', bg2: 'linear-gradient(135deg,#92400e,#f59e0b)' },
  { id: 'ess60', name: 'ESS60', tag: 'Carbono C60', tagColor: '#9d174d', tagBg: '#fce7f3', bg1: 'linear-gradient(135deg,#831843,#9d174d)', bg2: 'linear-gradient(135deg,#9d174d,#ec4899)' },
  { id: 'h2', name: 'Drink HRW', tag: 'Hidrógeno', tagColor: '#0369a1', tagBg: '#e0f2fe', bg1: 'linear-gradient(135deg,#0c4a6e,#0369a1)', bg2: 'linear-gradient(135deg,#075985,#38bdf8)' },
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
  // LIFEWAVE
  { brand: 'lifewave', name: 'X39', badge: 'Más vendido', badgeBg: '#e5d4f1', badgeColor: '#6d28d9', price: '$235.000', priceDay: '$7.833/día', stock: '30 parches', stockCount: 30, stockStatus: 'En stock', img: 'img/productos/lifewave/x39.png', goals: ['longevidad', 'energia', 'inmunidad'], desc: 'Activa las células madre propias. Regeneración celular profunda.' },
  { brand: 'lifewave', name: 'X49', badge: 'Deporte', badgeBg: '#e5d4f1', badgeColor: '#6d28d9', price: '$220.000', priceDay: '$7.333/día', stock: '30 parches', stockCount: 12, stockStatus: '12 en stock', img: 'img/productos/lifewave/x49.png', goals: ['rendimiento', 'energia'], desc: 'Aumentá tu fuerza, resistencia y masa muscular.' },
  { brand: 'lifewave', name: 'IceWave', badge: 'Dolor', badgeBg: '#d4e8f1', badgeColor: '#0369a1', price: '$165.000', priceDay: '$5.5/día', stock: '30 parches', stockCount: 8, stockStatus: '8 en stock', img: 'img/productos/lifewave/icewave.png', goals: ['dolor'], desc: 'Alivio rápido y sostenido del dolor sin medicamentos.' },
  { brand: 'lifewave', name: 'Silent Night', badge: 'Sueño', badgeBg: '#e5e0f1', badgeColor: '#6b21a8', price: '$150.000', priceDay: '$5.000/día', stock: '30 parches', stockCount: 14, stockStatus: '14 en stock', img: 'img/productos/lifewave/silent%20night.png', goals: ['sueno'], desc: 'Conciliá el sueño más rápido y despertate renovado.' },
  { brand: 'lifewave', name: 'AEON', badge: 'Calma', badgeBg: '#f0e8f1', badgeColor: '#7c3aed', price: '$150.000', priceDay: '$5.000/día', stock: '30 parches', stockCount: 9, stockStatus: '9 en stock', img: 'img/productos/lifewave/AEON 2.png', goals: ['longevidad', 'inmunidad'], desc: 'Reducí el estrés, mejoró tu claridad mental.' },
  { brand: 'lifewave', name: 'Glutathione', badge: 'Inmunidad', badgeBg: '#d4f1e0', badgeColor: '#0369a1', price: '$150.000', priceDay: '$5.000/día', stock: '30 parches', stockCount: 11, stockStatus: '11 en stock', img: 'img/productos/lifewave/glutathione.png', goals: ['inmunidad', 'longevidad'], desc: 'Elevá el antioxidante maestro de tu cuerpo hasta un 300%.' },
  { brand: 'lifewave', name: 'Carnosine', badge: 'Anti-aging', badgeBg: '#f1e0d4', badgeColor: '#92400e', price: '$120.000', priceDay: '$4.000/día', stock: '30 parches', stockCount: 7, stockStatus: '7 en stock', img: 'img/productos/lifewave/carnosine.png', goals: ['longevidad', 'rendimiento'], desc: 'Regenerá tejidos musculares y articulares.' },
  { brand: 'lifewave', name: 'SP6 Complete', badge: 'Metabolismo', badgeBg: '#e0f1d4', badgeColor: '#15803d', price: '$100.000', priceDay: '$3.333/día', stock: '30 parches', stockCount: 5, stockStatus: '5 en stock', img: 'img/productos/lifewave/sp6.png', goals: ['energia'], desc: 'Regulá tu apetito y equilibrá tu metabolismo.' },
  { brand: 'lifewave', name: 'Energy Enhancer', badge: 'Energía', badgeBg: '#d4e0f1', badgeColor: '#0369a1', price: '$100.000', priceDay: '$3.333/día', stock: '30 parches', stockCount: 20, stockStatus: '20 en stock', img: 'img/productos/lifewave/ee.png', goals: ['energia', 'rendimiento'], desc: 'Generá energía sostenida sin cafeína ni estimulantes.' },
  { brand: 'lifewave', name: 'Alavida', badge: 'Longevidad', badgeBg: '#f1d4e0', badgeColor: '#9d174d', price: '$110.000', priceDay: '$3.666/día', stock: '30 parches', stockCount: 6, stockStatus: '6 en stock', img: 'img/productos/lifewave/alavida.png', goals: ['longevidad'], desc: 'Rejuvenecé tu piel y tejidos desde adentro.' },

  // NEURO
  { brand: 'neuro', name: 'Neuro Gum Focus', badge: 'Foco', badgeBg: '#d1fae5', badgeColor: '#065f46', price: '$15.300', priceDay: '$510/día', stock: '1 blister (12 gomas)', stockCount: 25, stockStatus: '25 en stock', img: 'img/productos/neuro/neurogum.png', goals: ['foco'], desc: 'Nootrópicos en formato goma para máximo foco.', variants: [{ name: '1 Blister', price: '$15.300', stock: '25' }, { name: 'Caja 6 blisters', price: '$85.000', stock: '5' }] },
  { brand: 'neuro', name: 'Neuro Gum Sleep', badge: 'Sueño', badgeBg: '#d1fae5', badgeColor: '#065f46', price: '$18.000', priceDay: '$600/día', stock: '1 blister (12 mentas)', stockCount: 20, stockStatus: '20 en stock', img: 'img/productos/neuro/neurogum.png', goals: ['sueno'], desc: 'Gomas nootrópicas para sueño reparador y calidad.', variants: [{ name: '1 Blister', price: '$18.000', stock: '20' }, { name: 'Caja 6 blisters', price: '$85.000', stock: '4' }] },

  // ANALEMMA
  { brand: 'analemma', name: 'Analemma Bottle', badge: 'Hidratación', badgeBg: '#e0f2fe', badgeColor: '#0369a1', price: '$250.000', priceDay: '$8.333/día', stock: '1 botella', stockCount: 5, stockStatus: '5 en stock', img: 'img/productos/analemma.png', goals: ['energia', 'inmunidad'], desc: 'Agua estructurada para hidratación celular profunda.' },

  // GAMMA LIGHT
  { brand: 'gamma-light', name: 'Gamma Light Device', badge: 'Luz 40Hz', badgeBg: '#fef3c7', badgeColor: '#92400e', price: '$1.200.000', priceDay: '$40.000/día', stock: '1 dispositivo', stockCount: 3, stockStatus: '3 en stock', img: 'img/productos/gamma%20light.png', goals: ['foco', 'longevidad'], desc: 'Estimulación de luz gamma 40Hz respaldada por MIT.' },

  // ESS60
  { brand: 'ess60', name: 'ESS60 Oil', badge: 'Antioxidante', badgeBg: '#fce7f3', badgeColor: '#9d174d', price: '$450.000', priceDay: '$15.000/día', stock: '50ml', stockCount: 4, stockStatus: '4 en stock', img: 'img/productos/ess60.png', goals: ['longevidad', 'inmunidad'], desc: 'Carbono C60 en aceite de oliva virgen extra puro.' },

  // H2 TABLETS (HIDRÓGENO)
  { brand: 'h2', name: 'H2 Tablets', badge: 'H₂ Molecular', badgeBg: '#e0f2fe', badgeColor: '#0369a1', price: '$170.000', priceDay: '$5.666/día', stock: '1 frasco', stockCount: 12, stockStatus: '12 en stock', img: 'img/productos/h2-tablets.png', goals: ['energia', 'inmunidad', 'longevidad'], desc: 'Hidrógeno molecular con +2000 estudios científicos. Máximo antioxidante selectivo.' },
];
