/* page-catalogo.js — catálogo completo con productos, kits y filtros */

(function() {
  'use strict';

  let currentBrand = 'todos';
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

    const todosPill = document.createElement('button');
    todosPill.className = `brand-pill ${currentBrand === 'todos' ? 'active' : ''}`;
    todosPill.textContent = 'Todos';
    todosPill.addEventListener('click', () => switchBrand('todos'));
    DOM.brandNav.appendChild(todosPill);

    BRANDS.forEach(brand => {
      const pill = document.createElement('button');
      pill.className = `brand-pill ${brand.id === currentBrand ? 'active' : ''}`;
      pill.textContent = brand.name;
      pill.addEventListener('click', () => switchBrand(brand.id));
      DOM.brandNav.appendChild(pill);
    });
  }

  function updateBanner(brandId) {
    const stageBanner = document.getElementById('stageBanner');
    const stageImg = document.getElementById('stageImg');
    const stageCount = document.getElementById('stageCount');
    if (!stageBanner) return;

    const bannerMap = {
      'todos': 'img/estructura/banner-lifewave.webp',
      'lifewave': 'img/estructura/banner-lifewave.webp',
      'neuro': 'img/estructura/banner-neuro.webp',
      'analemma': 'img/estructura/banner-analemma.webp',
      'gamma-light': 'img/estructura/banner-gamma.webp',
      'ess60': 'img/estructura/banner-myvitalc.webp',
      'h2': 'img/estructura/banner-drinkhrw.webp',
    };

    const featuredMap = {
      'todos': { img: 'img/productos/lifewave/x39-pro.png', name: 'X39' },
      'lifewave': { img: 'img/productos/lifewave/x39-pro.png', name: 'X39' },
      'neuro': { img: 'img/productos/neuro/Screenshot 2025-07-09 060532.png', name: 'Neuro Gum' },
      'analemma': { img: 'img/productos/analemma/Screenshot 2025-07-09 055601.png', name: 'Analemma' },
      'gamma-light': { img: 'img/productos/gamma light/Screenshot 2025-07-09 055855.png', name: 'Gamma Light' },
      'ess60': { img: 'img/productos/ess60-pro.png', name: 'ESS60' },
      'h2': { img: 'img/productos/h2-tablets.png', name: 'H2 Tablets' },
    };

    stageBanner.src = bannerMap[brandId] || bannerMap['todos'];
    stageBanner.classList.add('fade-out');

    const featured = featuredMap[brandId] || featuredMap['todos'];
    const filtered = getFilteredProducts();

    setTimeout(() => {
      stageBanner.classList.remove('fade-out');
      if (stageImg) {
        stageImg.classList.add('fade-out');
        setTimeout(() => {
          stageImg.src = featured.img;
          stageImg.alt = featured.name;
          stageImg.classList.remove('fade-out');
        }, 100);
      }
      if (stageCount) {
        stageCount.textContent = `${filtered.length} producto${filtered.length !== 1 ? 's' : ''} disponible${filtered.length !== 1 ? 's' : ''}`;
      }
    }, 150);
  }

  function switchBrand(brandId) {
    currentBrand = brandId;
    currentGoal = 'todos';
    renderBrandNav();
    updateBanner(brandId);
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
    let filtered = currentBrand === 'todos' ? PRODUCTS : PRODUCTS.filter(p => p.brand === currentBrand);
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

      const prodBrand = BRANDS.find(b => b.id === prod.brand);
      const badgeHtml = prod.badge ? `<div class="card-badge" style="background: ${prod.badgeBg}; color: ${prod.badgeColor};">${prod.badge}</div>` : '';
      const stockColor = prod.stockCount > 10 ? '#15803d' : prod.stockCount > 5 ? '#854d0e' : '#dc2626';

      card.innerHTML = `
        <div class="card-img-wrap" style="background: linear-gradient(135deg, ${prodBrand?.bg1 || '#f5f3ff'}, ${prodBrand?.bg2 || '#ede9fe'});">
          <img class="card-img" src="${prod.img}" alt="${prod.name}" loading="lazy"/>
          <div class="card-overlay">
            <button class="ov-btn primary">Ver detalles</button>
            <a class="ov-btn wa" href="https://wa.me/5491161054411" target="_blank">WhatsApp</a>
          </div>
          ${badgeHtml}
        </div>
        <div class="card-body">
          <div class="card-brand-tag" style="background: ${prodBrand?.tagBg}; color: ${prodBrand?.tagColor};">${prodBrand?.name}</div>
          <div class="card-meta-row">
            <div class="card-name">${prod.name}</div>
            <div class="daily-cost-badge"><strong>${prod.priceDay}</strong> <span style="font-size:10px;color:#94a3b8;">— Menos que un café</span></div>
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

    if (DOM.gridTitle) {
      if (currentBrand === 'todos') {
        DOM.gridTitle.textContent = 'Todos los productos';
      } else {
        DOM.gridTitle.textContent = `Productos ${brand?.name || 'LifeWave'}`;
      }
    }
    if (DOM.gridCount) DOM.gridCount.textContent = `${products.length} producto${products.length !== 1 ? 's' : ''}`;
  }

  function openModal(prod, brand) {
    const prodBrand = BRANDS.find(b => b.id === prod.brand) || brand;
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
      ids.mBrandTag.textContent = prodBrand?.name || '';
      ids.mBrandTag.style.background = prodBrand?.tagBg;
      ids.mBrandTag.style.color = prodBrand?.tagColor;
    }
    if (ids.mName) ids.mName.textContent = prod.name;
    if (ids.mTagline) ids.mTagline.textContent = prod.desc;
    if (ids.mPrice) ids.mPrice.textContent = prod.price;
    if (ids.mPriceNote) ids.mPriceNote.textContent = prod.stock;
    if (ids.dvdImg) ids.dvdImg.src = prod.img;
    if (ids.modalPane && prodBrand) {
      ids.modalPane.style.background = `linear-gradient(135deg, ${prodBrand.bg1}, ${prodBrand.bg2})`;
    }

    const mVariants = document.getElementById('mVariants');
    if (prod.variants && prod.variants.length > 0 && mVariants) {
      mVariants.style.display = 'block';
      mVariants.innerHTML = `
        <div style="font-size:12px;font-weight:600;color:#1a2332;margin-bottom:8px;">Presentación:</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          ${prod.variants.map((v, idx) => `
            <button class="variant-btn ${idx === 0 ? 'active' : ''}" data-variant="${idx}" style="
              padding:8px 14px;border-radius:8px;font-size:11px;font-weight:700;
              border:1.5px solid #e2e8f0;background:#fff;color:#1a2332;
              cursor:pointer;transition:all .2s;
            ">${v.name} - ${v.price}</button>
          `).join('')}
        </div>
      `;
      document.querySelectorAll('.variant-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          document.querySelectorAll('.variant-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const idx = parseInt(btn.dataset.variant);
          if (ids.mPrice) ids.mPrice.textContent = prod.variants[idx].price;
          if (ids.mPriceNote) ids.mPriceNote.textContent = prod.variants[idx].stock + ' disponibles';
        });
      });
    } else if (mVariants) {
      mVariants.style.display = 'none';
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
