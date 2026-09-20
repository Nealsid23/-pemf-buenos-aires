// mercadopago.js — Checkout Pro via Netlify Function
// Llama a /.netlify/functions/mp-preference con los datos del producto
// y redirige al usuario al checkout de Mercado Pago.

// Clave pública de MP (NO es secreta — va en el frontend)
// Obtenerla en: https://www.mercadopago.com.ar/developers/panel
// Settings → Credenciales → Public key
const MP_PUBLIC_KEY = 'REEMPLAZAR_CON_TU_PUBLIC_KEY';

// true = usa sandbox (testing), false = producción
const MP_SANDBOX = true;

/**
 * Inicia el pago de un producto.
 * @param {string} productName - Nombre del producto
 * @param {number} price       - Precio en ARS (número entero)
 */
async function iniciarPago(productName, price) {
  const user = window.__authUser;

  // Si no está logueado, abrimos el modal de auth
  if (!user) {
    if (typeof openAuthModal === 'function') openAuthModal();
    return;
  }

  const btn = document.getElementById('pm-mp-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Procesando...'; }

  try {
    const resp = await fetch('/.netlify/functions/mp-preference', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName,
        price,
        quantity: 1,
        buyerEmail: user.email,
      }),
    });

    const data = await resp.json();
    if (!resp.ok) throw new Error(data.error || 'Error al crear preferencia');

    const url = MP_SANDBOX ? data.sandbox_init_point : data.init_point;
    if (!url) throw new Error('No se obtuvo URL de pago');

    window.location.href = url;
  } catch (err) {
    console.error('MP error:', err);
    alert('No pudimos procesar el pago. Intentá de nuevo o consultanos por WhatsApp.');
    if (btn) { btn.disabled = false; btn.textContent = 'Pagar con Mercado Pago'; }
  }
}

// ── Inyectar botón MP en el modal de producto (index.html) ──────────────────

function injectMPButton() {
  const footer = document.querySelector('.pm-footer');
  if (!footer || document.getElementById('pm-mp-btn')) return;

  const btn = document.createElement('button');
  btn.id = 'pm-mp-btn';
  btn.style.cssText = `
    display:inline-flex;align-items:center;gap:8px;
    background:#009ee3;color:#fff;
    font-family:'Figtree',sans-serif;font-weight:700;font-size:14px;
    padding:13px 22px;border-radius:100px;border:none;cursor:pointer;
    transition:opacity .15s;`;
  btn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/>
    </svg>
    Pagar con Mercado Pago`;
  btn.addEventListener('click', () => {
    // Obtener nombre y precio del modal activo
    const name  = document.getElementById('pm-name')?.textContent  || '';
    const price = parseInt(
      (document.getElementById('pm-price')?.textContent || '0')
        .replace(/[^0-9]/g, '')
    );
    iniciarPago(name, price);
  });

  footer.insertBefore(btn, footer.firstChild);
}

// Inyectar cuando se abre el modal de producto
document.addEventListener('click', e => {
  if (e.target.closest('.prod-card[data-product], .prod-card button[data-product]')) {
    setTimeout(injectMPButton, 50);
  }
});

export { iniciarPago, MP_PUBLIC_KEY };
