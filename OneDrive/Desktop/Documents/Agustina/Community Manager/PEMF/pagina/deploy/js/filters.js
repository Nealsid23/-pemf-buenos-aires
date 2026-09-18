/** Filter Engine — Unified filtering & search for studies, guides, products */

let fbOpen = null;

export function fbClose() {
  if (fbOpen) {
    fbOpen.panel.classList.remove('open');
    fbOpen.btn.setAttribute('aria-expanded', 'false');
    fbOpen = null;
  }
}

export function fbDataset(view, datasets) {
  const { studies, guias } = datasets;
  if (view === 'estudios') return studies;
  if (view === 'guias') return guias;
  return [];
}

export function fbItemMatches(view, d, s, val) {
  if (val === 'all') return true;
  if (view === 'estudios') {
    if (d.key === 'brand') return s.brand === val;
    if (d.key === 'type') return s.type === val;
    if (d.key === 'tema') return Array.isArray(s.temas) && s.temas.includes(val);
    if (d.key === 'rigor') return s.rigor === val;
  }
  if (view === 'guias') {
    if (d.key === 'categoria') return s.categoria === val;
    if (d.key === 'tipo') return s.tipo === val;
  }
  return true;
}

export function fbCount(view, dims, skipDim, optKey, datasets) {
  const data = fbDataset(view, datasets);
  return data.filter(s =>
    dims.every(d => fbItemMatches(view, d, s, d === skipDim ? optKey : d.get()))
  ).length;
}

export function buildFilterbar(view, FB_DIMS, datasets) {
  const dims = FB_DIMS[view];
  if (!dims) return;
  const menus = document.getElementById('menus-' + view);
  if (!menus || menus.dataset.built) return;
  menus.dataset.built = '1';

  dims.forEach(d => {
    const wrap = document.createElement('div');
    wrap.style.position = 'relative';
    const btn = document.createElement('button');
    btn.className = 'fb-btn';
    btn.type = 'button';
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span class="fb-btn-label">' + d.label + '</span><span class="fb-caret">▾</span>';

    const panel = document.createElement('div');
    panel.className = 'fb-panel';

    wrap.appendChild(btn);
    wrap.appendChild(panel);
    menus.appendChild(wrap);

    d._btn = btn;
    d._panel = panel;
    d._wrap = wrap;

    btn.addEventListener('click', ev => {
      ev.stopPropagation();
      const open = fbOpen && fbOpen.panel === panel;
      fbClose();
      if (!open) {
        renderPanel(view, dims, d, FB_DIMS, datasets);
        panel.style.left = '0';
        panel.style.right = 'auto';
        panel.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        fbOpen = { panel, btn, wrap };
        const r = panel.getBoundingClientRect();
        if (r.right > window.innerWidth - 8) {
          panel.style.left = 'auto';
          panel.style.right = '0';
        }
      }
    });
  });
  refreshFilterbar(view, FB_DIMS, datasets);
}

export function renderPanel(view, dims, d, FB_DIMS, datasets) {
  const cur = d.get();
  const opts = [{ key: 'all', label: 'Todos' }].concat(
    Object.keys(d.cfg)
      .filter(k => k !== 'all')
      .map(k => ({ key: k, label: d.cfg[k].l }))
  );

  d._panel.innerHTML = '';
  opts.forEach(o => {
    const n = fbCount(view, dims, d, o.key, datasets);
    const color = o.key === 'all' ? null : (d.cfg[o.key].c || d.cfg[o.key].tc || null);
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'fb-opt' + (cur === o.key ? ' sel' : '');
    b.innerHTML = '<span class="fb-opt-dot"' + (color ? ' style="background:' + color + '"' : '') + '></span><span>' + o.label + '</span><span class="fb-opt-n">' + n + '</span>';
    b.addEventListener('click', () => {
      d.set(o.key);
      fbClose();
      refreshFilterbar(view, FB_DIMS, datasets);
      window.dispatchEvent(new CustomEvent('filterChanged'));
    });
    d._panel.appendChild(b);
  });
}

export function refreshFilterbar(view, FB_DIMS, datasets) {
  const dims = FB_DIMS[view];
  if (!dims) return;

  dims.forEach(d => {
    if (!d._btn) return;
    const v = d.get();
    const lbl = d._btn.querySelector('.fb-btn-label');
    if (v === 'all') {
      d._btn.classList.remove('active');
      d._btn.style.background = '';
      d._btn.style.borderColor = '';
      lbl.textContent = d.label;
    } else {
      const c = d.cfg[v].c || d.cfg[v].tc || 'var(--navy)';
      d._btn.classList.add('active');
      d._btn.style.background = c;
      d._btn.style.borderColor = 'transparent';
      lbl.textContent = d.label + ': ' + d.cfg[v].l;
    }
  });

  const chips = document.getElementById('chips-' + view);
  if (!chips) return;
  chips.innerHTML = '';
  const active = dims.filter(d => d.get() !== 'all');

  active.forEach(d => {
    const v = d.get();
    const c = d.cfg[v].c || d.cfg[v].tc || 'var(--navy)';
    const chip = document.createElement('span');
    chip.className = 'fb-chip';
    chip.style.background = c;
    chip.innerHTML = d.cfg[v].l + '<button type="button" aria-label="Quitar">✕</button>';
    chip.querySelector('button').addEventListener('click', () => {
      d.set('all');
      refreshFilterbar(view, FB_DIMS, datasets);
      window.dispatchEvent(new CustomEvent('filterChanged'));
    });
    chips.appendChild(chip);
  });

  if (active.length) {
    const clr = document.createElement('button');
    clr.type = 'button';
    clr.className = 'fb-clear-all';
    clr.textContent = 'Limpiar todo';
    clr.addEventListener('click', () => {
      dims.forEach(d => d.set('all'));
      refreshFilterbar(view, FB_DIMS, datasets);
      window.dispatchEvent(new CustomEvent('filterChanged'));
    });
    chips.appendChild(clr);
  }
}

// Global escape + click-outside
export function setupFilterListeners() {
  document.addEventListener('click', e => {
    if (fbOpen && !fbOpen.wrap.contains(e.target)) fbClose();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') fbClose();
  });
}
