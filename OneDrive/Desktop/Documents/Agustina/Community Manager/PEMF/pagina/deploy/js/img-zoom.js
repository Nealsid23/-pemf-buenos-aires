/* Zoom + pan reutilizable. window.attachZoom(container) -> { reset }.
   Listeners en el contenedor (una sola vez); opera sobre la <img> actual del
   contenedor (su innerHTML puede cambiar entre aperturas).
   Desktop: rueda (zoom al cursor), arrastre (pan si scale>1), doble clic (reset).
   Móvil: pellizco (zoom), 1 dedo (pan si scale>1), doble tap (reset). */
(function(){
  function attachZoom(container){
    if(!container) return null;
    if(container._zoom){ return container._zoom; }
    let scale=1,tx=0,ty=0; const MIN=1,MAX=5;
    const pts=new Map(); let startDist=0,startScale=1,lastX=0,lastY=0,panning=false,lastTap=0;
    function curImg(){ return container.querySelector('img'); }
    function apply(){ const im=curImg(); if(!im)return; im.style.transform='translate('+tx+'px,'+ty+'px) scale('+scale+')'; im.style.cursor=scale>1?'grab':''; }
    function clamp(){ const r=container.getBoundingClientRect(); const mx=(scale-1)*r.width/2, my=(scale-1)*r.height/2; tx=Math.max(-mx,Math.min(mx,tx)); ty=Math.max(-my,Math.min(my,ty)); }
    function reset(){ scale=1;tx=0;ty=0;apply(); }
    function zoomAt(cx,cy,factor){
      const r=container.getBoundingClientRect();
      const ox=cx-r.left-r.width/2, oy=cy-r.top-r.height/2;
      const ns=Math.max(MIN,Math.min(MAX,scale*factor));
      const k=ns/scale; tx=(tx-ox)*k+ox; ty=(ty-oy)*k+oy; scale=ns; clamp(); apply();
    }
    container.addEventListener('wheel',function(e){ if(!curImg())return; e.preventDefault(); zoomAt(e.clientX,e.clientY, e.deltaY<0?1.12:1/1.12); },{passive:false});
    container.addEventListener('dblclick',function(e){ e.preventDefault(); reset(); });
    container.addEventListener('pointerdown',function(e){
      if(!curImg())return;
      try{container.setPointerCapture(e.pointerId);}catch(_){}
      pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pts.size===1){ const now=Date.now(); if(now-lastTap<300){ reset(); lastTap=0; return; } lastTap=now; lastX=e.clientX; lastY=e.clientY; panning=scale>1; }
      else if(pts.size===2){ const a=Array.from(pts.values()); startDist=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y); startScale=scale; }
    });
    container.addEventListener('pointermove',function(e){
      if(!pts.has(e.pointerId))return; pts.set(e.pointerId,{x:e.clientX,y:e.clientY});
      if(pts.size===2){ const a=Array.from(pts.values()); const d=Math.hypot(a[0].x-a[1].x,a[0].y-a[1].y); const cx=(a[0].x+a[1].x)/2, cy=(a[0].y+a[1].y)/2; if(startDist>0) zoomAt(cx,cy,(startScale*(d/startDist))/scale); }
      else if(panning&&scale>1){ tx+=e.clientX-lastX; ty+=e.clientY-lastY; lastX=e.clientX; lastY=e.clientY; clamp(); apply(); }
    });
    function up(e){ pts.delete(e.pointerId); if(pts.size<2)startDist=0; if(pts.size===0)panning=false; }
    container.addEventListener('pointerup',up);
    container.addEventListener('pointercancel',up);
    const api={reset:reset, get scale(){return scale;}};
    container._zoom=api;
    return api;
  }
  window.attachZoom=attachZoom;
})();
