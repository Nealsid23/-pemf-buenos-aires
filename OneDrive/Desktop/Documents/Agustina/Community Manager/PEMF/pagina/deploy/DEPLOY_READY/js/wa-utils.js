'use strict';

// ── NÚMERO CENTRAL: cambiar aquí actualiza todo el sitio ──
const WA_NUMERO = '5491161054411';

// ── DOMINIOS PERMITIDOS PARA REDIRECCIÓN A TIENDA ──
const DOMINIOS_PERMITIDOS = [
  'pemf-buenos-aires.tiendup.com',
  'www.tienddup.com',
  'tienddup.com',
];

/**
 * Construye un link wa.me con el mensaje correctamente codificado.
 * El número viene de WA_NUMERO — nunca de parámetros ni del usuario.
 */
function construirLinkWhatsapp(mensaje) {
  return 'https://wa.me/' + WA_NUMERO + '?text=' + encodeURIComponent(mensaje);
}

/**
 * Abre WhatsApp en una nueva pestaña con el mensaje dado.
 */
function abrirWhatsapp(mensaje) {
  window.open(construirLinkWhatsapp(mensaje), '_blank', 'noopener,noreferrer');
}

/**
 * Valida que una URL pertenezca a un dominio de la lista blanca.
 * Rechaza cualquier URL con protocolo distinto a https: y dominios no permitidos.
 */
function esUrlPermitida(url) {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== 'https:') return false;
    return DOMINIOS_PERMITIDOS.some(
      d => parsed.hostname === d || parsed.hostname.endsWith('.' + d)
    );
  } catch {
    return false;
  }
}

/**
 * Abre la URL de tienda si pasa la validación de whitelist.
 * Si no es válida, abre WhatsApp con el mensaje de fallback.
 */
function abrirTienda(url, fallbackMensaje) {
  if (esUrlPermitida(url)) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    abrirWhatsapp(fallbackMensaje);
  }
}
