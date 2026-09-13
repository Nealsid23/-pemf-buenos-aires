/* page-catalogo.js — catálogo completo con productos, kits y filtros */

(function() {
  'use strict';

  let currentBrand = 'lifewave';
  let currentGoal = 'todos';

  const DOM = {
    brandNav: document.getElementById('brandNav'),
    productGrid: document.getElementById('productGrid'),
    gridTitle: document.getElementById('gridTitle'),
    gridCount: document.getElementById('gridCount'),
    combosScroll: document.getElementById('combosScroll'),
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
    renderBrandNav();
    renderProducts();
    updateGoalChips();
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

  function renderKits() {
    if (!DOM.combosScroll || !KITS) return;
    DOM.combosScroll.innerHTML = '';
    KITS.forEach(kit => {
      const card = document.createElement('div');
      card.className = 'combo-card';
      card.innerHTML = `
        <div class="combo-name">${kit.name}</div>
        <div class="combo-products">${kit.products}</div>
        <button class="combo-btn">Consultar combo →</button>
      `;
      card.addEventListener('click', () => {
        window.location.hash = kit.id;
      });
      DOM.combosScroll.appendChild(card);
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

      const badgeHtml = prod.badge ? `<div class="card-badge" style="background: ${prod.badgeBg}; color: ${prod.badgeColor};">${prod.badge}</div>` : '';
      const stockColor = prod.stockCount > 10 ? '#15803d' : prod.stockCount > 5 ? '#854d0e' : '#dc2626';

      card.innerHTML = `
        <div class="card-img-wrap" style="background: linear-gradient(135deg, ${brand?.bg1 || '#f5f3ff'}, ${brand?.bg2 || '#ede9fe'});">
          <img class="card-img" src="${prod.img}" alt="${prod.name}" loading="lazy"/>
          <div class="card-overlay">
            <button class="ov-btn primary">Ver detalles</button>
            <a class="ov-btn wa" href="https://wa.me/5491161054411" target="_blank">WhatsApp</a>
          </div>
          ${badgeHtml}
        </div>
        <div class="card-body">
          <div class="card-brand-tag" style="background: ${brand?.tagBg}; color: ${brand?.tagColor};">${brand?.name}</div>
          <div class="card-meta-row">
            <div class="card-name">${prod.name}</div>
            <div class="daily-cost-badge"><strong>${prod.priceDay}</strong></div>
          </div>
          <div class="card-meta-row">
            <div class="stock-badge stock-ok">
              <span class="stock-dot"></span>
              ${prod.stockStatus}
            </div>
          </div>
          <div class="card-desc">${prod.desc}</div>
          <div class="card-footer">
            <div>
              <div class="card-price">${prod.price}</div>
              <div class="card-price-note">${prod.stock}</div>
            </div>
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
        const msg = `Hola, me interesa ${prod.name}`;
        window.open(`https://wa.me/5491161054411?text=${encodeURIComponent(msg)}`, '_blank');
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
    };

    if (ids.mBrandTag) {
      ids.mBrandTag.textContent = brand?.name || '';
      ids.mBrandTag.style.background = brand?.tagBg;
      ids.mBrandTag.style.color = brand?.tagColor;
    }
    if (ids.mName) ids.mName.textContent = prod.name;
    if (ids.mTagline) ids.mTagline.textContent = prod.desc;
    if (ids.mPrice) ids.mPrice.textContent = prod.price;
    if (ids.mPriceNote) ids.mPriceNote.textContent = prod.stock;
    if (ids.dvdImg) ids.dvdImg.src = prod.img;
    if (ids.modalPane && brand) {
      ids.modalPane.style.background = `linear-gradient(135deg, ${brand.bg1}, ${brand.bg2})`;
    }

    document.querySelectorAll('.modal-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.modal-tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelector('[data-tab="desc"]')?.classList.add('active');
    document.getElementById('tab-desc')?.classList.add('active');

    const modal = document.getElementById('modalOverlay');
    if (modal) {
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function setupModalHandlers() {
    const closeBtn = document.querySelector('.modal-close');
    const modal = document.getElementById('modalOverlay');

    if (closeBtn) closeBtn.addEventListener('click', () => {
      if (modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });

    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal?.classList.contains('open')) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
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
    renderProducts();
    renderKits();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
