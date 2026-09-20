/* Sincroniza la sección #evidencia del landing con la biblioteca real
   (window.STUDIES_BASE + papers-extra.json). Si falla el fetch, deja el HTML actual. */
(function(){
  function pick(papers,n){
    const withImg=papers.filter(p=>p.portada);
    const byBrand={}; withImg.forEach(p=>{(byBrand[p.brand]=byBrand[p.brand]||[]).push(p);});
    const brands=Object.keys(byBrand), out=[]; let i=0;
    while(out.length<n && i<200){ for(const b of brands){ if(byBrand[b][i]&&out.length<n)out.push(byBrand[b][i]); } i++; }
    return out;
  }
  function hydrate(papers){
    if(!papers.length)return;
    const total=papers.length;
    const brands=new Set(papers.map(p=>p.brand).filter(b=>b&&b!=='all')).size;
    const floor=Math.max(10,Math.floor(total/10)*10);
    const nums=document.querySelectorAll('#evidencia [data-countup]');
    if(nums[0]){ nums[0].setAttribute('data-countup',String(floor)); nums[0].setAttribute('data-suffix','+'); nums[0].textContent=floor+'+'; }
    if(nums[1]){ nums[1].setAttribute('data-countup',String(brands)); nums[1].textContent=String(brands); }
    const fan=document.querySelector('#evidencia .ev-fan');
    if(fan){
      const cuantos=Math.max(5,Math.round(total/4.5)); // ~1 representativo cada 4-5 papers reales
      const sel=pick(papers,cuantos);
      if(sel.length){
        fan.innerHTML=sel.map(p=>'<div class="ev-paper"><img src="'+p.portada+'" alt="" loading="lazy"></div>').join('');
        // re-inicializa el abanico (scroll) sobre los nuevos papers
        if(window.PEMF_initEvidenceFan) requestAnimationFrame(()=>window.PEMF_initEvidenceFan());
      }
    }
  }
  function run(){
    const base=Array.isArray(window.STUDIES_BASE)?window.STUDIES_BASE.slice():[];
    fetch('js/papers-extra.json').then(r=>r.ok?r.json():null).then(d=>{
      const extra=(d&&Array.isArray(d.papers))?d.papers.filter(p=>p&&p.id&&p.title):[];
      hydrate(base.concat(extra));
    }).catch(()=>{ hydrate(base); });
  }
  if(document.readyState!=='loading') run(); else document.addEventListener('DOMContentLoaded',run);
})();
