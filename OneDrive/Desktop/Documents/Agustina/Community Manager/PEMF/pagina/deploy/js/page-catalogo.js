/* page-catalogo.js — renderiza el catálogo completo */

(function() {
  'use strict';

  let currentBrand = 'lifewave';
  let currentGoal = 'todos';

  const DOM = {
    brandNav: document.getElementById('brandNav'),
    productGrid: document.getElementById('productGrid'),
    gridTitle: document.getElementById('gridTitle'),
    gridCount: document.getElementById('gridCount'),
    brandStage: document.getElementById('brandStage'),
    stageBanner: document.getElementById('stageBanner'),
    stageImg: document.getElementById('stageImg'),
    stageCount: document.getElementById('stageCount'),
    modalOverlay: document.getElementById('modalOverlay'),
    modalClose: document.getElementById('modalClose'),
  };

  function renderBrandNav() {
    if (!DOM.brandNav || !BRANDS) return;
    DOM.brandNav.innerHTML = '';
    BRANDS.forEach(brand => {
      const pill = document.createElement('button');
      pill.className = `brand-pill ${brand.id === currentBrand ? 'active' : ''}`;
      pill.textContent = brand.name;
      pill.addEventListener('click', () => switchBrand(brand.id));
      DOM.brandNav.appendChild(pill);
    });
  }

  function switchBrand(brandId) {
    currentBrand = brandId;
    currentGoal = 'todos';
    updateStage();
    renderBrandNav();
    renderProducts();
    updateGoalChips();
  }

  function updateStage() {
    if (!DOM.stageBanner) return;
    const brand = BRANDS.find(b => b.id === currentBrand);
    if (brand) {
      DOM.stageBanner.src = `img/estructura/banner-${brand.id}.webp`;
      if (DOM.stageImg) DOM.stageImg.src = brand.stageImg || 'img/productos/lifewave/x39.png';
    }
    const count = PRODUCTS.filter(p => p.brand === currentBrand).length;
    if (DOM.stageCount) DOM.stageCount.textContent = `${count} productos disponibles`;
  }

  function setupGoalFilters() {
    document.querySelectorAll('.goal-chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        currentGoal = e.target.dataset.goal;
        updateGoalChips();
        renderProducts();
      });
    });
  }

  function updateGoalChips() {
    document.querySelectorAll('.goal-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.goal === currentGoal);
    });
  }

  function getFilteredProducts() {
    if (!PRODUCTS) return [];
    let filtered = PRODUCTS.filter(p => p.brand === currentBrand);
    if (currentGoal !== 'todos') {
      filtered = filtered.filter(p => p.goals && p.goals.includes(currentGoal));
    }
    return filtered;
  }

  function renderProducts() {
    if (!DOM.productGrid) return;
    const products = getFilteredProducts();
    DOM.productGrid.innerHTML = '';

    if (!products.length) {
      DOM.productGrid.innerHTML = '<div class="grid-empty"><strong>Sin productos</strong></div>';
      return;
    }

    const brand = BRANDS.find(b => b.id === currentBrand);

    products.forEach((prod, idx) => {
      const card = document.createElement('div');
      card.className = 'prod-card';
      card.innerHTML = `
        <div class="card-img-wrap">
          <img class="card-img" src="${prod.img}" alt="${prod.name}" loading="lazy"/>
          <div class="card-overlay">
            <button class="ov-btn primary">Ver detalles</button>
            <a class="ov-btn wa" href="https://wa.me/5491161054411" target="_blank">WhatsApp</a>
          </div>
        </div>
        <div class="card-body">
          <div class="card-brand-tag" style="background: ${brand?.tagBg}; color: ${brand?.tagColor};">${brand?.name}</div>
          <div class="card-name">${prod.name}</div>
          <div class="card-desc">${prod.desc}</div>
          <div class="card-footer">
            <div class="card-price">${prod.price}</div>
            <button class="card-cta">Comprar</button>
          </div>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (!e.target.closest('.card-cta, .ov-btn.wa')) {
          openModal(prod, brand);
        }
      });

      card.querySelector('.card-cta')?.addEventListener('click', (e) => {
        e.stopPropagation();
        window.open(prod.storeUrl || '#', '_blank');
      });

      DOM.productGrid.appendChild(card);
      setTimeout(() => card.classList.add('revealed'), 30 + idx * 20);
    });

    if (DOM.gridTitle) DOM.gridTitle.textContent = `Productos ${brand?.name || 'LifeWave'}`;
    if (DOM.gridCount) DOM.gridCount.textContent = `${products.length} producto${products.length !== 1 ? 's' : ''}`;
  }

  function openModal(prod, brand) {
    const ids = {
      mBrandTag: document.getElementById('mBrandTag'),
      mName: document.getElementById('mName'),
      mTagline: document.getElementById('mTagline'),
      mPrice: document.getElementById('mPrice'),
      mPriceNote: document.getElementById('mPriceNote'),
      dvdImg: document.getElementById('dvdImg'),
      modalPane: document.getElementById('modalPane'),
      mBenefits: document.getElementById('mBenefits'),
      mScience: document.getElementById('mScience'),
      mBuyBtn: document.getElementById('mBuyBtn'),
      mWaBtn: document.getElementById('mWaBtn'),
    };

    if (ids.mBrandTag) {
      ids.mBrandTag.textContent = brand?.name || '';
      ids.mBrandTag.style.background = brand?.tagBg;
      ids.mBrandTag.style.color = brand?.tagColor;
    }
    if (ids.mName) ids.mName.textContent = prod.name;
    if (ids.mTagline) ids.mTagline.textContent = prod.sub || prod.desc;
    if (ids.mPrice) ids.mPrice.textContent = prod.price;
    if (ids.mPriceNote) ids.mPriceNote.innerHTML = 'Incluye asesoramiento personalizado';
    if (ids.dvdImg) ids.dvdImg.src = prod.img;
    if (ids.modalPane && brand) {
      ids.modalPane.style.background = `linear-gradient(135deg, ${brand.bg1}, ${brand.bg2})`;
    }

    if (ids.mBenefits && prod.benefits) {
      ids.mBenefits.innerHTML = prod.benefits.map((b, i) => `
        <div class="benefit-row">
          <div class="benefit-dot" style="background: ${brand?.tagColor || '#1a4fb6'};">${i + 1}</div>
          <div>${b}</div>
        </div>
      `).join('');
    }

    if (ids.mScience) ids.mScience.textContent = prod.science || '';
    if (ids.mBuyBtn) {
      ids.mBuyBtn.href = prod.storeUrl || '#';
      ids.mBuyBtn.target = '_blank';
    }
    if (ids.mWaBtn) {
      ids.mWaBtn.href = `https://wa.me/5491161054411?text=Hola,%20me%20interesa%20${encodeURIComponent(prod.name)}`;
      ids.mWaBtn.target = '_blank';
    }

    document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.modal-tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelector('[data-tab="desc"]')?.classList.add('active');
    document.getElementById('tab-desc')?.classList.add('active');

    if (DOM.modalOverlay) {
      DOM.modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeModal() {
    if (DOM.modalOverlay) {
      DOM.modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function setupModalHandlers() {
    if (DOM.modalClose) {
      DOM.modalClose.addEventListener('click', closeModal);
    }
    if (DOM.modalOverlay) {
      DOM.modalOverlay.addEventListener('click', (e) => {
        if (e.target === DOM.modalOverlay) closeModal();
      });
    }
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });

    document.querySelectorAll('.modal-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const tabName = e.target.dataset.tab;
        document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.modal-tab-pane').forEach(p => p.classList.remove('active'));
        e.target.classList.add('active');
        document.getElementById(`tab-${tabName}`)?.classList.add('active');
      });
    });
  }

  function init() {
    if (!BRANDS || !PRODUCTS) {
      console.error('BRANDS o PRODUCTS no están definidos');
      return;
    }
    renderBrandNav();
    setupGoalFilters();
    setupModalHandlers();
    updateStage();
    renderProducts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
