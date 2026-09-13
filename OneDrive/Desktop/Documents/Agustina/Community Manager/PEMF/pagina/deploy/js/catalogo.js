const BRANDS = [
  { id: 'lifewave', name: 'LifeWave', tag: 'Fotobioterapia', tagColor: '#6d28d9', tagBg: '#ede9fe', bg1: 'linear-gradient(135deg,#3b0764,#6d28d9)', bg2: 'linear-gradient(135deg,#4c1d95,#7c3aed)' },
  { id: 'neuro', name: 'Neuro Gum', tag: 'Nootrópicos', tagColor: '#065f46', tagBg: '#d1fae5', bg1: 'linear-gradient(135deg,#064e3b,#065f46)', bg2: 'linear-gradient(135deg,#065f46,#10b981)' },
  { id: 'analemma', name: 'Analemma', tag: 'Agua estructurada', tagColor: '#0369a1', tagBg: '#e0f2fe', bg1: 'linear-gradient(135deg,#0c4a6e,#0369a1)', bg2: 'linear-gradient(135deg,#075985,#38bdf8)' },
  { id: 'gamma-light', name: 'Gamma Light', tag: 'Luz gamma', tagColor: '#92400e', tagBg: '#fef3c7', bg1: 'linear-gradient(135deg,#78350f,#92400e)', bg2: 'linear-gradient(135deg,#92400e,#f59e0b)' },
  { id: 'ess60', name: 'ESS60', tag: 'Carbono C60', tagColor: '#9d174d', tagBg: '#fce7f3', bg1: 'linear-gradient(135deg,#831843,#9d174d)', bg2: 'linear-gradient(135deg,#9d174d,#ec4899)' },
];

const PRODUCTS = [
  { brand: 'lifewave', name: 'X39 — GHK-Cu', price: '$299 USD', img: 'img/productos/lifewave/x39.png', goals: ['longevidad', 'energia', 'inmunidad'], desc: 'Regeneración celular', sub: 'Activa stem cells', benefits: ['Regeneración celular', 'Energía', 'Inmunidad'], science: 'Estudios clínicos' },
  { brand: 'lifewave', name: 'X49 — AHK-Cu', price: '$149 USD', img: 'img/productos/lifewave/x49.png', goals: ['rendimiento', 'energia'], desc: 'Rendimiento deportivo', sub: 'Fuerza y recuperación', benefits: ['Fuerza muscular', 'Recuperación', 'Rendimiento'], science: 'Estudios de rendimiento' },
  { brand: 'lifewave', name: 'IceWave', price: '$149 USD', img: 'img/productos/lifewave/icewave.png', goals: ['dolor'], desc: 'Alivio del dolor', sub: 'Dolor sin fármacos', benefits: ['Alivio rápido', 'Sin efectos secundarios', 'Acupuntura'], science: 'Estudios de dolor' },
  { brand: 'lifewave', name: 'Silent Night', price: '$109 USD', img: 'img/productos/lifewave/silent-night.png', goals: ['sueno'], desc: 'Mejora del sueño', sub: 'Sueño profundo', benefits: ['Sueño profundo', 'Descanso reparador', 'Sin dependencia'], science: 'Estudios de sueño' },
  { brand: 'lifewave', name: 'Glutathione', price: '$109 USD', img: 'img/productos/lifewave/glutathione.png', goals: ['inmunidad', 'longevidad'], desc: 'Antioxidante maestro', sub: 'Detox celular', benefits: ['Detoxificación', 'Inmunidad', 'Anti-aging'], science: 'Estudios de glutatión' },
  { brand: 'lifewave', name: 'Carnosine', price: '$99 USD', img: 'img/productos/lifewave/carnosine.png', goals: ['longevidad', 'rendimiento'], desc: 'Regeneración de tejidos', sub: 'Anti-aging', benefits: ['Regeneración', 'Anti-aging', 'Longevidad'], science: 'Estudios de carnosina' },
  { brand: 'lifewave', name: 'AEON', price: '$149 USD', img: 'img/productos/lifewave/aeon.png', goals: ['longevidad', 'inmunidad'], desc: 'Anti-estrés', sub: 'Balance del sistema nervioso', benefits: ['Reduce estrés', 'Balance nervioso', 'Inflamación'], science: 'Estudios de cortisol' },
  { brand: 'lifewave', name: 'SP6 Complete', price: '$99 USD', img: 'img/productos/lifewave/sp6.png', goals: ['energia'], desc: 'Peso y metabolismo', sub: 'Regulación del apetito', benefits: ['Apetito controlado', 'Metabolismo', 'Peso'], science: 'Estudios de metabolismo' },
  { brand: 'lifewave', name: 'Energy Enhancer', price: '$99 USD', img: 'img/productos/lifewave/ee.png', goals: ['energia', 'rendimiento'], desc: 'Energía sostenida', sub: 'Energía sin estimulantes', benefits: ['ATP mitocondrial', 'Energía sostenida', 'Sin cafeína'], science: 'Estudios de ATP' },
  { brand: 'lifewave', name: 'Alavida', price: '$109 USD', img: 'img/productos/lifewave/alavida.png', goals: ['longevidad'], desc: 'Rejuvenecimiento', sub: 'Anti-aging avanzado', benefits: ['Piel rejuvenecida', 'Anti-aging', 'Circadiano'], science: 'Estudios de epitalamina' },
];
