/* dvd-ball.js — physics engine reutilizable
   Uso: const ball = new DVDBall(containerEl, imgEl, { size, speed })
        ball.start()  → inicia el loop
        ball.stop()   → cancela el loop
        ball.setMouse(x, y) → notifica posición del cursor (relativa al container)
        ball.clearMouse()   → cursor fuera del container
*/
class DVDBall {
  constructor(container, img, opts = {}) {
    this.container = container;
    this.img       = img;
    this.size      = opts.size  ?? 190;
    this.baseSpeed = opts.speed ?? 1.0;

    this.x  = 0; this.y  = 0;
    this.vx = 0; this.vy = 0;
    this.mx = -999; this.my = -999;
    this.hitTimer = 0;
    this._raf = null;
    this._running = false;
  }

  start() {
    if (this._running) this.stop();
    const cW = this.container.offsetWidth  || 400;
    const cH = this.container.offsetHeight || 460;

    // Estilo de la imagen para posicionamiento absoluto
    Object.assign(this.img.style, {
      position:      'absolute',
      width:          this.size + 'px',
      height:         this.size + 'px',
      objectFit:     'contain',
      pointerEvents: 'none',
      willChange:    'left, top',
    });

    // Posición inicial: cerca del centro con variación aleatoria
    this.x = (cW - this.size) / 2 + (Math.random() - .5) * cW * .3;
    this.y = (cH - this.size) / 2 + (Math.random() - .5) * cH * .3;

    // Dirección diagonal aleatoria
    const angle = Math.PI / 4 + Math.random() * Math.PI / 2;
    const flip  = Math.random() > .5 ? 1 : -1;
    this.vx = Math.cos(angle) * this.baseSpeed * flip;
    this.vy = Math.sin(angle) * this.baseSpeed * (Math.random() > .5 ? 1 : -1);

    this._running = true;
    this._loop();
  }

  stop() {
    this._running = false;
    cancelAnimationFrame(this._raf);
  }

  setMouse(x, y) { this.mx = x; this.my = y; }
  clearMouse()   { this.mx = -999; this.my = -999; }

  _loop() {
    if (!this._running) return;
    this._step();
    this._raf = requestAnimationFrame(() => this._loop());
  }

  _step() {
    const cW   = this.container.offsetWidth  || 400;
    const cH   = this.container.offsetHeight || 460;
    const maxX = Math.max(0, cW - this.size);
    const maxY = Math.max(0, cH - this.size);

    // Centro de la imagen
    const cx = this.x + this.size / 2;
    const cy = this.y + this.size / 2;

    // Repulsión del mouse
    const mdx  = cx - this.mx;
    const mdy  = cy - this.my;
    const md   = Math.sqrt(mdx * mdx + mdy * mdy);
    const RRAD = 80; // radio de repulsión en px

    if (md < RRAD && md > 1) {
      const force = ((RRAD - md) / RRAD) * 5;
      this.vx += (mdx / md) * force;
      this.vy += (mdy / md) * force;
    }

    // Normalización de velocidad — siempre vuelve a baseSpeed
    const spd    = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    const target = md < RRAD ? this.baseSpeed * 3 : this.baseSpeed;
    if (spd > 0) {
      const next = spd + (target - spd) * 0.04;
      this.vx = (this.vx / spd) * next;
      this.vy = (this.vy / spd) * next;
    }

    this.x += this.vx;
    this.y += this.vy;

    // Rebote en paredes
    let hit = false;
    if (this.x <= 0)    { this.x = 0;    this.vx =  Math.abs(this.vx); hit = true; }
    if (this.x >= maxX) { this.x = maxX; this.vx = -Math.abs(this.vx); hit = true; }
    if (this.y <= 0)    { this.y = 0;    this.vy =  Math.abs(this.vy); hit = true; }
    if (this.y >= maxY) { this.y = maxY; this.vy = -Math.abs(this.vy); hit = true; }

    if (hit) { this.img.classList.add('hit'); this.hitTimer = 18; }
    if (this.hitTimer > 0 && --this.hitTimer === 0) this.img.classList.remove('hit');

    this.img.style.left = this.x.toFixed(1) + 'px';
    this.img.style.top  = this.y.toFixed(1) + 'px';
  }
}

// Exportar como global para uso en <script> sin módulos
window.DVDBall = DVDBall;
