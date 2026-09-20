/* Card Interactions: Mouse tracking, tilt effect, and review submission */

(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    setupCardMouseTracking();
    setupReviewForm();
  });

  function setupCardMouseTracking() {
    const cards = document.querySelectorAll('.prod-card');

    cards.forEach(card => {
      const cardImgWrap = card.querySelector('.card-img-wrap');

      card.addEventListener('mousemove', (e) => {
        if (!cardImgWrap) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cardImgWrap.style.setProperty('--gx', x + 'px');
        cardImgWrap.style.setProperty('--gy', y + 'px');

        const img = card.querySelector('.card-img');
        if (img && !img.classList.contains('returning')) {
          const moveX = (x - rect.width / 2) * 0.15;
          const moveY = (y - rect.height / 2) * 0.15;
          img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        if (cardImgWrap) {
          cardImgWrap.style.setProperty('--gx', '-200px');
          cardImgWrap.style.setProperty('--gy', '-200px');
        }

        const img = card.querySelector('.card-img');
        if (img) {
          img.classList.add('returning');
          img.style.transform = 'translate(0, 0) scale(1)';
          setTimeout(() => img.classList.remove('returning'), 700);
        }
      });
    });
  }

  function setupReviewForm() {
    const reviewBtns = document.querySelectorAll('#mReviewBtn');

    reviewBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openReviewForm();
      });
    });

    const askBtns = document.querySelectorAll('#mAskBtn');
    askBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const wa = 'https://wa.me/5491161054411?text=Tengo%20una%20pregunta%20sobre%20este%20producto';
        window.open(wa, '_blank');
      });
    });
  }

  function openReviewForm() {
    const modal = document.getElementById('reviewFormModal');
    if (!modal) createReviewFormModal();

    const reviewModal = document.getElementById('reviewFormModal');
    if (reviewModal) {
      reviewModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function createReviewFormModal() {
    const html = `
      <div id="reviewFormModal" class="review-form-modal">
        <div class="review-form-content">
          <div class="review-form-header">
            <h3>Dejá tu opinión</h3>
            <button class="review-form-close">&times;</button>
          </div>

          <form id="reviewForm" style="display:flex;flex-direction:column;gap:16px;">
            <div>
              <label style="font-size:12px;font-weight:600;color:#64748b;margin-bottom:6px;display:block;">Tu nombre</label>
              <input type="text" id="reviewName" placeholder="Nombre completo" required style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:6px;font-size:14px;">
            </div>

            <div>
              <label style="font-size:12px;font-weight:600;color:#64748b;margin-bottom:6px;display:block;">Calificación</label>
              <div id="ratingStars" style="display:flex;gap:8px;font-size:24px;cursor:pointer;">
                <span data-rating="1">☆</span>
                <span data-rating="2">☆</span>
                <span data-rating="3">☆</span>
                <span data-rating="4">☆</span>
                <span data-rating="5">☆</span>
              </div>
              <input type="hidden" id="reviewRating" value="5">
            </div>

            <div>
              <label style="font-size:12px;font-weight:600;color:#64748b;margin-bottom:6px;display:block;">Tu opinión (mínimo 20 caracteres)</label>
              <textarea id="reviewText" placeholder="Contá tu experiencia con este producto..." required minlength="20" style="width:100%;padding:10px;border:1px solid #e2e8f0;border-radius:6px;font-size:14px;resize:vertical;min-height:100px;font-family:inherit;"></textarea>
            </div>

            <div style="display:flex;gap:10px;">
              <button type="submit" style="flex:1;padding:11px;background:#67CCE9;color:#fff;border:none;border-radius:6px;font-weight:600;cursor:pointer;font-size:14px;transition:all .2s;">Publicar opinión</button>
              <button type="button" class="review-form-close-btn" style="flex:1;padding:11px;background:#f1f5f9;color:#1a2332;border:none;border-radius:6px;font-weight:600;cursor:pointer;font-size:14px;transition:all .2s;">Cancelar</button>
            </div>
          </form>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);

    const modal = document.getElementById('reviewFormModal');
    const closeBtn = document.querySelector('.review-form-close');
    const closeBtnAlt = document.querySelector('.review-form-close-btn');
    const form = document.getElementById('reviewForm');
    const ratingStars = document.querySelectorAll('#ratingStars span');

    closeBtn.addEventListener('click', () => closeModal());
    closeBtnAlt.addEventListener('click', () => closeModal());

    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    ratingStars.forEach(star => {
      star.addEventListener('click', () => {
        const rating = star.dataset.rating;
        document.getElementById('reviewRating').value = rating;
        ratingStars.forEach((s, idx) => {
          s.textContent = idx < rating ? '★' : '☆';
          s.style.color = idx < rating ? '#f59e0b' : '#cbd5e1';
        });
      });

      star.addEventListener('mouseenter', () => {
        const rating = star.dataset.rating;
        ratingStars.forEach((s, idx) => {
          s.textContent = idx < rating ? '★' : '☆';
          s.style.color = idx < rating ? '#f59e0b' : '#cbd5e1';
        });
      });
    });

    document.getElementById('ratingStars').addEventListener('mouseleave', () => {
      const rating = document.getElementById('reviewRating').value;
      ratingStars.forEach((s, idx) => {
        s.textContent = idx < rating ? '★' : '☆';
        s.style.color = idx < rating ? '#f59e0b' : '#cbd5e1';
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      submitReview();
    });

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function submitReview() {
    const name = document.getElementById('reviewName').value.trim();
    const rating = parseInt(document.getElementById('reviewRating').value);
    const text = document.getElementById('reviewText').value.trim();

    if (!name || !text || text.length < 20) {
      alert('Por favor completá todos los campos correctamente.');
      return;
    }

    const currentProduct = window.currentReviewProduct || 'general';
    const reviews = JSON.parse(localStorage.getItem('userReviews') || '{}');

    if (!reviews[currentProduct]) {
      reviews[currentProduct] = [];
    }

    reviews[currentProduct].push({
      author: name,
      rating: rating,
      text: text,
      date: new Date().toLocaleDateString('es-AR'),
      verified: false
    });

    localStorage.setItem('userReviews', JSON.stringify(reviews));

    alert('¡Gracias por tu opinión! Será revisada y publicada pronto.');

    document.getElementById('reviewForm').reset();
    document.getElementById('reviewRating').value = 5;
    document.getElementById('reviewFormModal').classList.remove('open');
    document.body.style.overflow = '';
  }

  window.openReviewForm = openReviewForm;
})();
