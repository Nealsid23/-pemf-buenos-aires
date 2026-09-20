// auth.js — Google Sign-In + Email/Password via Firebase Auth
// Se carga en todas las páginas. Inyecta el modal y actualiza el nav.

import { auth } from './firebase-config.js';
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

// ── INYECTAR MODAL Y BOTÓN DE NAV ──────────────────────────────────────────

function injectAuthUI() {
  // Botón en el nav (se agrega al .nav-cta si existe)
  const navCta = document.querySelector('.nav-cta');
  if (navCta && !document.getElementById('auth-nav-btn')) {
    const btn = document.createElement('button');
    btn.id = 'auth-nav-btn';
    btn.className = 'btn-ghost';
    btn.textContent = 'Iniciar sesión';
    btn.addEventListener('click', openAuthModal);
    navCta.insertBefore(btn, navCta.firstChild);
  }

  // Modal de auth
  if (!document.getElementById('auth-modal')) {
    document.body.insertAdjacentHTML('beforeend', `
<div id="auth-modal" style="
  display:none;position:fixed;inset:0;z-index:10000;
  background:rgba(15,20,40,.7);backdrop-filter:blur(8px);
  align-items:center;justify-content:center;padding:20px;">
  <div style="
    background:#fff;border-radius:24px;width:100%;max-width:400px;
    padding:36px;box-shadow:0 40px 100px rgba(15,20,40,.35);
    position:relative;font-family:'Noto Sans',sans-serif;">

    <button id="auth-close" style="
      position:absolute;top:16px;right:16px;background:rgba(26,35,50,.07);
      border:none;border-radius:50%;width:34px;height:34px;cursor:pointer;
      font-size:18px;line-height:1;color:#64748b;">✕</button>

    <h2 id="auth-title" style="
      font-family:'Figtree',sans-serif;font-size:22px;font-weight:900;
      color:#1a2332;margin-bottom:6px;letter-spacing:-.4px;">Bienvenido</h2>
    <p id="auth-subtitle" style="font-size:13px;color:#64748b;margin-bottom:24px;">
      Iniciá sesión para acceder a tu cuenta y comprar.</p>

    <!-- Google -->
    <button id="auth-google" style="
      width:100%;display:flex;align-items:center;justify-content:center;gap:10px;
      border:1.5px solid #e2e8f0;border-radius:12px;padding:12px 16px;
      background:#fff;cursor:pointer;font-size:14px;font-weight:600;color:#1a2332;
      font-family:'Figtree',sans-serif;transition:border-color .15s,box-shadow .15s;
      margin-bottom:16px;">
      <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.5 6.7 29.5 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.2-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.8 1.1 7.9 2.9l5.7-5.7C34.5 6.7 29.5 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.8 13.6-4.7l-6.3-5.2C29.5 35.6 26.9 36 24 36c-5.2 0-9.7-3.3-11.3-8H6.3C9.7 35.7 16.3 40 24 40v4z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.3 5.2C41.5 35.7 44 30.2 44 24c0-1.2-.1-2.4-.4-3.5z"/></svg>
      Continuar con Google
    </button>

    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
      <div style="flex:1;height:1px;background:#e2e8f0;"></div>
      <span style="font-size:12px;color:#94a3b8;">o con email</span>
      <div style="flex:1;height:1px;background:#e2e8f0;"></div>
    </div>

    <!-- Email form -->
    <div id="auth-form">
      <input id="auth-email" type="email" placeholder="tu@email.com" style="
        width:100%;border:1.5px solid #e2e8f0;border-radius:10px;padding:11px 14px;
        font-size:14px;color:#1a2332;background:#fafafa;outline:none;
        font-family:'Noto Sans',sans-serif;margin-bottom:10px;box-sizing:border-box;"/>
      <input id="auth-pass" type="password" placeholder="Contraseña" style="
        width:100%;border:1.5px solid #e2e8f0;border-radius:10px;padding:11px 14px;
        font-size:14px;color:#1a2332;background:#fafafa;outline:none;
        font-family:'Noto Sans',sans-serif;margin-bottom:6px;box-sizing:border-box;"/>
      <div style="text-align:right;margin-bottom:14px;">
        <button id="auth-forgot" style="
          background:none;border:none;font-size:12px;color:#1a4fb6;cursor:pointer;
          font-family:'Figtree',sans-serif;font-weight:600;">¿Olvidaste tu contraseña?</button>
      </div>
      <p id="auth-error" style="
        font-size:12px;color:#ef4444;margin-bottom:10px;min-height:16px;"></p>
      <button id="auth-submit" style="
        width:100%;background:#1a4fb6;color:#fff;border:none;border-radius:100px;
        padding:13px;font-size:14px;font-weight:700;cursor:pointer;
        font-family:'Figtree',sans-serif;margin-bottom:12px;transition:opacity .15s;">
        Iniciar sesión
      </button>
      <p style="font-size:12px;color:#64748b;text-align:center;">
        ¿No tenés cuenta?
        <button id="auth-toggle-mode" style="
          background:none;border:none;color:#1a4fb6;cursor:pointer;
          font-size:12px;font-weight:700;font-family:'Figtree',sans-serif;">
          Crear cuenta
        </button>
      </p>
    </div>
  </div>
</div>`);

    // Event listeners del modal
    document.getElementById('auth-close').addEventListener('click', closeAuthModal);
    document.getElementById('auth-modal').addEventListener('click', e => {
      if (e.target === document.getElementById('auth-modal')) closeAuthModal();
    });
    document.getElementById('auth-google').addEventListener('click', loginWithGoogle);
    document.getElementById('auth-submit').addEventListener('click', handleEmailAuth);
    document.getElementById('auth-toggle-mode').addEventListener('click', toggleMode);
    document.getElementById('auth-forgot').addEventListener('click', handleForgot);
    document.getElementById('auth-email').addEventListener('keydown', e => {
      if (e.key === 'Enter') document.getElementById('auth-pass').focus();
    });
    document.getElementById('auth-pass').addEventListener('keydown', e => {
      if (e.key === 'Enter') handleEmailAuth();
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeAuthModal();
    });
  }
}

// ── MODAL OPEN / CLOSE ───────────────────────────────────────────────────────

let authMode = 'login'; // 'login' | 'register'

function openAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
  setTimeout(() => document.getElementById('auth-email')?.focus(), 100);
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (!modal) return;
  modal.style.display = 'none';
  document.body.style.overflow = '';
  document.getElementById('auth-error').textContent = '';
}

function toggleMode() {
  authMode = authMode === 'login' ? 'register' : 'login';
  const isLogin = authMode === 'login';
  document.getElementById('auth-title').textContent    = isLogin ? 'Bienvenido' : 'Crear cuenta';
  document.getElementById('auth-subtitle').textContent = isLogin
    ? 'Iniciá sesión para acceder a tu cuenta y comprar.'
    : 'Creá tu cuenta para comprar y seguir tus pedidos.';
  document.getElementById('auth-submit').textContent      = isLogin ? 'Iniciar sesión' : 'Crear cuenta';
  document.getElementById('auth-toggle-mode').textContent = isLogin ? 'Crear cuenta' : 'Ya tengo cuenta';
  document.getElementById('auth-forgot').style.display    = isLogin ? '' : 'none';
  document.getElementById('auth-error').textContent = '';
}

// ── AUTH ACTIONS ─────────────────────────────────────────────────────────────

async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    closeAuthModal();
  } catch (err) {
    showError(err.code);
  }
}

async function handleEmailAuth() {
  const email = document.getElementById('auth-email').value.trim();
  const pass  = document.getElementById('auth-pass').value;
  if (!email || !pass) { showError('Completá email y contraseña'); return; }
  const btn = document.getElementById('auth-submit');
  btn.disabled = true; btn.textContent = '...';
  try {
    if (authMode === 'login') {
      await signInWithEmailAndPassword(auth, email, pass);
    } else {
      await createUserWithEmailAndPassword(auth, email, pass);
    }
    closeAuthModal();
  } catch (err) {
    showError(err.code);
  } finally {
    btn.disabled = false;
    btn.textContent = authMode === 'login' ? 'Iniciar sesión' : 'Crear cuenta';
  }
}

async function handleForgot() {
  const email = document.getElementById('auth-email').value.trim();
  if (!email) { showError('Ingresá tu email primero'); return; }
  try {
    await sendPasswordResetEmail(auth, email);
    document.getElementById('auth-error').style.color = '#16a34a';
    document.getElementById('auth-error').textContent = 'Te enviamos un email para restablecer tu contraseña.';
  } catch (err) {
    showError(err.code);
  }
}

async function logout() {
  await signOut(auth);
}

function showError(code) {
  const msgs = {
    'auth/user-not-found':        'No encontramos esa cuenta.',
    'auth/wrong-password':        'Contraseña incorrecta.',
    'auth/email-already-in-use':  'Ese email ya está registrado.',
    'auth/weak-password':         'La contraseña debe tener al menos 6 caracteres.',
    'auth/invalid-email':         'El email no es válido.',
    'auth/popup-closed-by-user':  '',
    'auth/cancelled-popup-request': '',
  };
  const el = document.getElementById('auth-error');
  if (el) {
    el.style.color = '#ef4444';
    el.textContent = msgs[code] || code || 'Ocurrió un error.';
  }
}

// ── NAV STATE — actualiza el botón según sesión ──────────────────────────────

function updateNavState(user) {
  const btn = document.getElementById('auth-nav-btn');
  if (!btn) return;
  if (user) {
    const name = user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'Mi cuenta';
    const photo = user.photoURL;
    btn.innerHTML = photo
      ? `<img src="${photo}" style="width:24px;height:24px;border-radius:50%;object-fit:cover;margin-right:6px;vertical-align:middle;" alt=""/>` + name
      : name;
    btn.onclick = () => {
      if (confirm(`¿Cerrar sesión de ${user.email}?`)) logout();
    };
  } else {
    btn.innerHTML = 'Iniciar sesión';
    btn.onclick = openAuthModal;
  }
}

// ── ESCUCHAR CAMBIOS DE SESIÓN ───────────────────────────────────────────────

onAuthStateChanged(auth, user => {
  window.__authUser = user || null;
  updateNavState(user);
  // Disparar evento para que otros scripts puedan reaccionar
  document.dispatchEvent(new CustomEvent('auth:change', { detail: { user } }));
});

// ── INIT ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', injectAuthUI);
if (document.readyState !== 'loading') injectAuthUI();

export { openAuthModal, closeAuthModal, logout };
