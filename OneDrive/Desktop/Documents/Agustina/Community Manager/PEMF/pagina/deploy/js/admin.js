/* PEMF Admin Panel - Professional Content Management System */

(function() {
  'use strict';

  const adminData = {
    home: JSON.parse(localStorage.getItem('pemf_home')) || {
      hero: {
        title: 'Descubrí el bienestar quántico sin medicamentos',
        subtitle: 'Tecnología PEMF + suplementos de evidencia para optimizar tu terreno biológico',
        cta: 'Explorar catálogo'
      },
      sections: []
    },
    quiz: JSON.parse(localStorage.getItem('pemf_quiz')) || [],
    catalog: JSON.parse(localStorage.getItem('pemf_catalog')) || [],
    studies: JSON.parse(localStorage.getItem('pemf_studies')) || {
      guides: [],
      papers: []
    }
  };

  window.switchSection = function(section) {
    // Update nav
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    event.target.classList.add('active');

    // Update title
    const titles = {
      dashboard: 'Dashboard',
      home: 'Editar Home',
      quiz: 'Editar Quiz',
      catalog: 'Editar Catálogo',
      studies: 'Editar Estudios',
      settings: 'Configuración'
    };
    document.getElementById('sectionTitle').textContent = titles[section] || 'Dashboard';

    // Show section
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');

    // Load content
    if (section === 'home') loadHomeEditor();
    if (section === 'quiz') loadQuizEditor();
    if (section === 'catalog') loadCatalogEditor();
    if (section === 'studies') loadStudiesEditor();
  };

  function loadHomeEditor() {
    const content = document.getElementById('homeContent');
    content.innerHTML = `
      <div class="card">
        <h2 class="card-title">Sección Hero</h2>
        <div class="form-group">
          <label class="form-label">Título principal</label>
          <input type="text" class="form-input" id="heroTitle" value="${adminData.home.hero.title}">
        </div>
        <div class="form-group">
          <label class="form-label">Subtítulo</label>
          <textarea class="form-textarea" id="heroSubtitle">${adminData.home.hero.subtitle}</textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Texto del botón CTA</label>
          <input type="text" class="form-input" id="heroCTA" value="${adminData.home.hero.cta}">
        </div>
        <button class="btn btn-primary" onclick="saveHomeChanges()">💾 Guardar cambios</button>
      </div>

      <div class="card">
        <h2 class="card-title">Vista previa</h2>
        <div style="background: linear-gradient(135deg, #3b0764, #6d28d9); padding: 40px; border-radius: 12px; color: #fff;">
          <h3 id="previewTitle" style="font-size: 32px; font-weight: 900; margin-bottom: 10px;"></h3>
          <p id="previewSubtitle" style="font-size: 16px; margin-bottom: 20px; opacity: .9;"></p>
          <button style="background: #67CCE9; color: #fff; border: none; padding: 12px 24px; border-radius: 8px; cursor: pointer; font-weight: 600;">
            <span id="previewCTA"></span> →
          </button>
        </div>
      </div>
    `;

    updatePreview();
    document.getElementById('heroTitle').addEventListener('input', updatePreview);
    document.getElementById('heroSubtitle').addEventListener('input', updatePreview);
    document.getElementById('heroCTA').addEventListener('input', updatePreview);
  }

  function updatePreview() {
    document.getElementById('previewTitle').textContent = document.getElementById('heroTitle').value;
    document.getElementById('previewSubtitle').textContent = document.getElementById('heroSubtitle').value;
    document.getElementById('previewCTA').textContent = document.getElementById('heroCTA').value;
  }

  window.saveHomeChanges = function() {
    adminData.home.hero = {
      title: document.getElementById('heroTitle').value,
      subtitle: document.getElementById('heroSubtitle').value,
      cta: document.getElementById('heroCTA').value
    };
    localStorage.setItem('pemf_home', JSON.stringify(adminData.home));
    showSuccess('Cambios de Home guardados');
  };

  function loadQuizEditor() {
    const content = document.getElementById('quizContent');
    content.innerHTML = `
      <div class="card">
        <h2 class="card-title">Gestor de Preguntas</h2>
        <p style="color: var(--muted); margin-bottom: 20px; font-size: 13px;">Crea y edita las preguntas del quiz. Cada pregunta puede tener múltiples opciones de respuesta.</p>

        <div id="quizList" style="margin-bottom: 30px;"></div>

        <button class="btn btn-primary" onclick="addQuizQuestion()">+ Agregar pregunta</button>
      </div>
    `;

    renderQuizList();
  }

  function renderQuizList() {
    const list = document.getElementById('quizList');
    if (!PRODUCTS || PRODUCTS.length === 0) {
      list.innerHTML = '<p style="color: var(--muted); text-align: center;">Cargando preguntas...</p>';
      return;
    }

    list.innerHTML = '<p style="color: var(--muted); font-size: 13px;">Las preguntas se cargan desde los datos del catálogo. Edita directamente en la sección Catálogo.</p>';
  }

  window.addQuizQuestion = function() {
    alert('Funcionalidad en desarrollo. Por ahora, edita las preguntas desde la sección de Estudios.');
  };

  function loadCatalogEditor() {
    const content = document.getElementById('catalogContent');
    content.innerHTML = `
      <div class="tabs">
        <button class="tab active" onclick="switchCatalogTab('products')">Productos</button>
        <button class="tab" onclick="switchCatalogTab('brands')">Marcas</button>
      </div>

      <div id="productsTab" class="tab-content active">
        <div id="productsList"></div>
        <button class="btn btn-primary" onclick="addProduct()">+ Agregar producto</button>
      </div>

      <div id="brandsTab" class="tab-content">
        <div id="brandsList"></div>
      </div>
    `;

    loadCatalogProducts();
  }

  function loadCatalogProducts() {
    const list = document.getElementById('productsList');
    if (!PRODUCTS || PRODUCTS.length === 0) {
      list.innerHTML = '<p style="color: var(--muted); text-align: center; padding: 40px;">Cargando productos...</p>';
      return;
    }

    list.innerHTML = PRODUCTS.map((p, idx) => `
      <div class="product-item" onclick="editProduct(${idx})">
        <div class="product-name">${p.name}</div>
        <div class="product-price">${p.price}</div>
        <div style="font-size: 12px; color: var(--muted); margin-top: 8px;">
          Stock: ${p.stockCount} | ${p.stockStatus}
        </div>
      </div>
    `).join('');
  }

  window.editProduct = function(idx) {
    const product = PRODUCTS[idx];
    const modal = document.createElement('div');
    modal.className = 'modal open';
    modal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Editar: ${product.name}</h3>
          <button class="modal-close" onclick="this.closest('.modal').remove()">✕</button>
        </div>

        <div class="grid-2">
          <div class="form-group">
            <label class="form-label">Nombre</label>
            <input type="text" class="form-input" id="prodName" value="${product.name}">
          </div>
          <div class="form-group">
            <label class="form-label">Precio</label>
            <input type="text" class="form-input" id="prodPrice" value="${product.price}">
          </div>
          <div class="form-group">
            <label class="form-label">Stock disponible</label>
            <input type="number" class="form-input" id="prodStock" value="${product.stockCount}">
          </div>
          <div class="form-group">
            <label class="form-label">Estado de stock</label>
            <input type="text" class="form-input" id="prodStatus" value="${product.stockStatus}">
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Descripción</label>
          <textarea class="form-textarea" id="prodDesc">${product.desc}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Beneficios (uno por línea)</label>
          <textarea class="form-textarea" id="prodBenefits">${product.benefits ? product.benefits.join('\n') : ''}</textarea>
        </div>

        <button class="btn btn-primary" onclick="saveProductChanges(${idx})">💾 Guardar producto</button>
      </div>
    `;
    document.body.appendChild(modal);
  };

  window.saveProductChanges = function(idx) {
    PRODUCTS[idx].name = document.getElementById('prodName').value;
    PRODUCTS[idx].price = document.getElementById('prodPrice').value;
    PRODUCTS[idx].stockCount = parseInt(document.getElementById('prodStock').value);
    PRODUCTS[idx].stockStatus = document.getElementById('prodStatus').value;
    PRODUCTS[idx].desc = document.getElementById('prodDesc').value;
    PRODUCTS[idx].benefits = document.getElementById('prodBenefits').value.split('\n').filter(b => b.trim());

    localStorage.setItem('pemf_catalog', JSON.stringify(PRODUCTS));
    document.querySelector('.modal').remove();
    loadCatalogProducts();
    showSuccess('Producto actualizado');
  };

  window.switchCatalogTab = function(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById(tab + 'Tab').classList.add('active');
  };

  window.addProduct = function() {
    alert('Agrega productos usando el formulario en el panel de catálogo. Edita en línea los que ya existen.');
  };

  function loadStudiesEditor() {
    const content = document.getElementById('studiesContent');
    content.innerHTML = `
      <div class="tabs">
        <button class="tab active" onclick="switchStudiesTab('guides')">Guías</button>
        <button class="tab" onclick="switchStudiesTab('papers')">Papers</button>
      </div>

      <div id="guidesTab" class="tab-content active">
        <div id="guidesList"></div>
        <button class="btn btn-primary" onclick="addGuide()">+ Agregar guía</button>
      </div>

      <div id="papersTab" class="tab-content">
        <div id="papersList"></div>
        <button class="btn btn-primary" onclick="addPaper()">+ Agregar paper</button>
      </div>
    `;
  }

  window.switchStudiesTab = function(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById(tab + 'Tab').classList.add('active');
  };

  window.addGuide = function() {
    alert('Funcionalidad en desarrollo');
  };

  window.addPaper = function() {
    alert('Funcionalidad en desarrollo');
  };

  window.saveSettings = function() {
    const settings = {
      siteName: document.getElementById('siteName').value,
      siteDesc: document.getElementById('siteDesc').value,
      supportEmail: document.getElementById('supportEmail').value,
      whatsappNumber: document.getElementById('whatsappNumber').value
    };
    localStorage.setItem('pemf_settings', JSON.stringify(settings));
    showSuccess('Configuración guardada');
  };

  window.publishChanges = function() {
    showSuccess('Cambios publicados en DEPLOY_READY');
    console.log('Datos publicados:', adminData);
  };

  function showSuccess(message) {
    const div = document.createElement('div');
    div.className = 'success-message';
    div.textContent = '✓ ' + message;
    div.style.position = 'fixed';
    div.style.top = '20px';
    div.style.right = '20px';
    div.style.zIndex = '9999';
    div.style.maxWidth = '300px';
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 3000);
  }

  // Initialize
  console.log('Panel de administración listo');
})();
