/* modal.js — modal de producto con DVD en el panel de imagen
   Requiere: dvd-ball.js cargado antes, DVDBall en window
   Requiere en el HTML:
     - .modal-overlay#modalOverlay
     - .modal-box
     - .modal-img-pane#modalPane
     - .modal-dvd-img#modalDvdImg
     - .modal-cursor-ring#modalCursorRing
     - .modal-close
     - #modalName, #modalPrice, #modalSub
   Uso: initProductModal()  → llama una vez al cargar la página
*/
function initProductModal() {
  const overlay    = document.getElementById('modalOverlay');
  const pane       = document.getElementById('modalPane');
  const dvdImg     = document.getElementById('modalDvdImg');
  const cursorRing = document.getElementById('modalCursorRing');
  const closeBtn   = document.querySelector('.modal-close');

  if (!overlay || !pane || !dvdImg) return;

  let ball = null;

  function openModal(card) {
    // Poblar datos desde data attributes
    document.getElementById('modalName').textContent  = card.dataset.name  || '';
    document.getElementById('modalPrice').textContent = card.dataset.price || '';
    document.getElementById('modalSub').textContent   = card.dataset.sub   || '';
    dvdImg.src = card.dataset.img || '';
    pane.style.background = card.dataset.bg || 'linear-gradient(135deg,#f5f3ff,#ede9fe)';

    // Actualizar brand tag color
    const modalTag = document.querySelector('.modal-brand-tag');
    if (modalTag) {
      modalTag.style.background = card.dataset.tagBg    || '#ede9fe';
      modalTag.style.color      = card.dataset.tagColor || '#6d28d9';
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Iniciar DVD 320ms después (deja que el modal termine de animarse)
    setTimeout(() => {
      if (ball) ball.stop();
      ball = new DVDBall(pane, dvdImg, { size: 190, speed: 1.0 });
      ball.start();
    }, 320);
  }

  function closeModal() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (ball) { ball.stop(); ball = null; }
  }

  // Mouse en el panel → colisión con la imagen
  pane.addEventListener('mousemove', e => {
    const r  = pane.getBoundingClientRect();
    const lx = e.clientX - r.left;
    const ly = e.clientY - r.top;
    if (ball) ball.setMouse(lx, ly);
    if (cursorRing) {
      cursorRing.style.left = lx + 'px';
      cursorRing.style.top  = ly + 'px';
    }
  });
  pane.addEventListener('mouseleave', () => {
    if (ball) ball.clearMouse();
  });

  // Cerrar
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  // Abrir desde cualquier .prod-card en la página
  document.addEventListener('click', e => {
    const card = e.target.closest('.prod-card');
    if (!card) return;
    if (e.target.closest('.overlay-btn, .card-cta')) return;
    openModal(card);
  });
}

window.initProductModal = initProductModal;
