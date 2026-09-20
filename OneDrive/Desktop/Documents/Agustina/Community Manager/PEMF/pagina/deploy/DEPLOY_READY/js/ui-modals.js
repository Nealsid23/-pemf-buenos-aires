/** Modal Manager — Unified modal handling across pages */

const modals = {
  review: { id: 'review-modal', open: false },
  prod: { id: 'product-modal', open: false },
  paper: { id: 'paper-modal', open: false },
};

function getModal(key) {
  const m = modals[key];
  return m ? document.getElementById(m.id) : null;
}

function toggleModalState(key, state) {
  if (modals[key]) modals[key].open = state;
}

export function openModal(key) {
  const el = getModal(key);
  if (!el) return;
  el.classList.add('open');
  toggleModalState(key, true);
  document.body.style.overflow = 'hidden';
}

export function closeModal(key) {
  const el = getModal(key);
  if (!el) return;
  el.classList.remove('open');
  toggleModalState(key, false);
  document.body.style.overflow = '';
}

export function closeAllModals() {
  Object.keys(modals).forEach(k => closeModal(k));
}

export function isModalOpen(key) {
  return modals[key]?.open || false;
}

// Legacy convenience exports for existing code
export function openReviewModal() {
  openModal('review');
}

export function closeReviewModal() {
  closeModal('review');
}

export function openProdModal(productName) {
  openModal('prod');
}

export function closeProdModal() {
  closeModal('prod');
}

export function openPaperModal(paperId) {
  openModal('paper');
}

export function closePaperModal() {
  closeModal('paper');
}

export function handleModalOverlayClick(modalKey, e) {
  if (e.target.id === modals[modalKey]?.id) {
    closeModal(modalKey);
  }
}

// Setup event listeners (call once on page load)
export function setupModalListeners() {
  // Review modal
  const reviewModal = getModal('review');
  if (reviewModal) {
    document.querySelectorAll('.js-open-review').forEach(el => {
      el.addEventListener('click', () => openReviewModal());
    });
    const closeBtn = reviewModal.querySelector('[data-close-modal]') || reviewModal.querySelector('button:contains("×")');
    if (closeBtn) closeBtn.addEventListener('click', closeReviewModal);
    reviewModal.addEventListener('click', (e) => handleModalOverlayClick('review', e));
  }

  // Product modal
  const prodModal = getModal('prod');
  if (prodModal) {
    prodModal.addEventListener('click', (e) => handleModalOverlayClick('prod', e));
  }

  // Paper modal
  const paperModal = getModal('paper');
  if (paperModal) {
    paperModal.addEventListener('click', (e) => handleModalOverlayClick('paper', e));
  }

  // Global escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllModals();
  });
}
