/* parallax.js — mouse parallax para product cards
   Uso: initCardParallax()  → aplica a todos los .prod-card del documento
        initCardParallax(containerEl) → solo dentro de ese contenedor
*/
function initCardParallax(container = document) {
  container.querySelectorAll('.prod-card').forEach(card => {
    const wrap = card.querySelector('.card-img-wrap');
    const img  = card.querySelector('.card-img');
    if (!wrap || !img) return;

    let raf;

    wrap.addEventListener('mousemove', e => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r  = card.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width  / 2)) / (r.width  / 2);
        const dy = (e.clientY - (r.top  + r.height / 2)) / (r.height / 2);

        img.classList.remove('returning');
        img.style.transform = `translate(${dx * 14}px, ${dy * 10}px) scale(1.12)`;

        const wr = wrap.getBoundingClientRect();
        wrap.style.setProperty('--gx', (e.clientX - wr.left) + 'px');
        wrap.style.setProperty('--gy', (e.clientY - wr.top)  + 'px');
      });
    });

    wrap.addEventListener('mouseleave', () => {
      cancelAnimationFrame(raf);
      img.classList.add('returning');
      img.style.transform = 'translate(0,0) scale(1)';
      setTimeout(() => img.classList.remove('returning'), 750);
    });
  });
}

window.initCardParallax = initCardParallax;
