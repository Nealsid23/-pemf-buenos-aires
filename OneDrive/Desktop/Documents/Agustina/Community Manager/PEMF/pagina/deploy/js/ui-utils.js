/** UI Utilities — Shared helpers for formatting, errors, WhatsApp links */

export function fmtPrice(n) {
  if (!n) return '$0';
  const s = String(n).replace(/\D/g, '');
  let r = '', c = 0;
  for (let i = s.length - 1; i >= 0; i--) {
    if (c === 3) { r = '.' + r; c = 0; }
    r = s[i] + r; c++;
  }
  return '$' + r;
}

export function showError(code) {
  const messages = {
    'auth/invalid-email': 'Email inválido',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/email-already-in-use': 'Email ya registrado',
    'auth/weak-password': 'Contraseña muy débil',
    'default': 'Error desconocido. Intenta de nuevo.'
  };
  const msg = messages[code] || messages['default'];
  const el = document.getElementById('auth-error');
  if (el) {
    el.textContent = msg;
    el.style.display = 'block';
    setTimeout(() => el.style.display = 'none', 4000);
  }
}

export function construirLinkWhatsapp(mensaje) {
  const encoded = encodeURIComponent(mensaje);
  return `https://wa.me/5491138347889?text=${encoded}`;
}

export function handleClickOutside(el, callback) {
  return (e) => {
    if (el && !el.contains(e.target)) callback();
  };
}

export function getScrollPos() {
  return window.scrollY || document.documentElement.scrollTop;
}

export function lockScroll() {
  document.body.style.overflow = 'hidden';
}

export function unlockScroll() {
  document.body.style.overflow = '';
}
