/* Escenas del hero por vista (60fps). window.HeroScenes.init({papers,books,people}) + setScene(view).
   - estudios: mazo de cartas (papers) apiladas que se separan al scrollear.
   - biblioteca: estante 3D con tapas reales que avanza libro por libro al scrollear.
   - guias: sin escena (vacía).
   - profesionales: grafo de fuentes con movimiento XYZ, líneas y repulsión entre nodos.
   Sesgado a la derecha (texto a la izquierda) + .hero-scrim. Respeta prefers-reduced-motion. */
(function(){
  const root=()=>document.getElementById('hero-scene');
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let layers=[],view='estudios',mx=0,my=0,fanMx=0,fanMy=0,data={papers:[],books:[],people:[]};
  let mobile=window.matchMedia&&window.matchMedia('(max-width:640px)').matches;
  let simNodes=[],simLinks=[],simBounds={xmin:0,xmax:0,ymin:0,ymax:0};
  function el(cls,html){const d=document.createElement('div');d.className='hs-layer '+cls;if(html)d.innerHTML=html;return d;}
  function clear(){const r=root();if(r)r.innerHTML='';layers=[];simNodes=[];simLinks=[];}
  function add(node,opt){node._d=opt;root().appendChild(node);layers.push(node);}
  function rnd(a,b){return a+Math.random()*(b-a);}

  /* ── Evidencia: abanico que se despliega (estilo landing) ── */
  function sceneEvidencia(){
    const imgs=data.papers.filter(p=>p.portada);
    if(!imgs.length)return;
    const N=Math.max(5, Math.round(imgs.length/4.5)); // ~1 representativo cada 4-5 papers reales
    const step=imgs.length/N, sel=[];
    for(let k=0;k<N;k++) sel.push(imgs[Math.min(imgs.length-1,Math.floor(k*step))]);
    const wrap=document.createElement('div'); wrap.className='hs-fan';
    root().appendChild(wrap); layers.push(wrap);
    const spread=Math.min(120, 14*(N-1)); // mismo cálculo que el abanico de la landing
    const cards=[];
    sel.forEach((p,i)=>{
      const card=document.createElement('div'); card.className='hs-fancard';
      card.innerHTML='<img src="'+p.portada+'" alt="" loading="lazy">';
      card._rot=(i-(N-1)/2)*(spread/Math.max(1,N-1)); // ángulo final de la carta
      card._ty=-Math.abs(card._rot)*0.8;
      wrap.appendChild(card); cards.push(card);
    });
    wrap._d={fan:true,cards:cards,n:N,t0:performance.now()};
  }
  function updateFan(scrollP){
    let wrap=null; for(let i=0;i<layers.length;i++){ if(layers[i]._d&&layers[i]._d.fan){wrap=layers[i];break;} }
    if(!wrap)return;
    const cards=wrap._d.cards;
    // se despliega como la landing: el intro lo abre ~60% y el scroll lo termina de abrir
    const intro=reduce?1:Math.min(1,(performance.now()-wrap._d.t0)/1300);
    const ei=intro*intro*(3-2*intro);
    let open=Math.min(1,Math.max(ei*0.6, scrollP||0));
    const e=open*open*(3-2*open);            // smoothstep de apertura
    // reacciona al mouse: todo el abanico se hamaca; + respiración suave
    const sway=reduce?0:fanMx*10;
    const breathe=reduce?0:Math.sin(performance.now()/1500)*2.2;
    for(let i=0;i<cards.length;i++){
      const c=cards[i];
      c.style.setProperty('--rot',(c._rot*e + sway + breathe).toFixed(2)+'deg');
      c.style.setProperty('--ty',(c._ty*e).toFixed(2)+'px');
    }
  }

  /* ── Biblioteca: estante 3D ── */
  function sceneBiblioteca(){
    const bg=el('hs-libbg','<img src="img/biblioteca-bg.png" alt="">');
    add(bg,{bg:true});
    const bks=(data.books||[]).slice(0,mobile?6:10);
    bks.forEach((b,i)=>{
      const n=el('hs-book','<img src="'+b.cover+'" alt="" loading="lazy">');
      n.style.left='60%'; n.style.top='49%';
      add(n,{shelf:true,index:i,total:bks.length});
    });
  }
  function updateShelf(p,sc){
    for(let i=0;i<layers.length;i++){
      const n=layers[i], d=n._d; if(!d)continue;
      if(d.bg){
        const px=reduce?0:mx*-16; const py=reduce?0:my*-10;
        n.style.transform='translate3d('+px+'px,'+(py - sc*0.04)+'px,0) scale(1.1)';
        continue;
      }
      if(!d.shelf)continue;
      const focus=p*(d.total-1), rel=d.index-focus;
      const x=rel*(mobile?120:160), z=-Math.abs(rel)*250, ry=rel*-20;
      const op=Math.max(.1,1-Math.abs(rel)*.42);
      n.style.transform='translate(-50%,-50%) translate3d('+x+'px,0,'+z+'px) rotateY('+ry+'deg)';
      n.style.opacity=op; n.style.zIndex=String(100-Math.round(Math.abs(rel)*10));
    }
  }

  /* ── Fuentes: grafo XYZ con líneas e interacción ── */
  function sceneFuentes(){
    const ppl=(data.people||[]).slice().sort((a,b)=>(b.foto?1:0)-(a.foto?1:0)).slice(0,mobile?6:9);
    const svgNS='http://www.w3.org/2000/svg';
    const svg=document.createElementNS(svgNS,'svg'); svg.setAttribute('class','hs-links');
    root().appendChild(svg);
    ppl.forEach((p,i)=>{
      const ini=(p.nombre||'?').split(' ').map(w=>w[0]).slice(0,2).join('');
      const col=(p.campo&&window.CampoProf&&window.CampoProf[p.campo])?window.CampoProf[p.campo].c:'#1a4fb6';
      const n=el('hs-node', p.foto?('<img src="'+p.foto+'" alt="">'):ini);
      if(!p.foto)n.style.background='linear-gradient(135deg,'+col+','+col+'aa)';
      n.style.left='0'; n.style.top='0';
      root().appendChild(n); layers.push(n);
      simNodes.push({el:n,x:0,y:0,vx:0,vy:0,ph:Math.random()*6.28});
    });
    for(let a=0;a<simNodes.length;a++)for(let b2=a+1;b2<simNodes.length;b2++){
      const ln=document.createElementNS(svgNS,'line'); ln.style.opacity=0; svg.appendChild(ln); simLinks.push(ln);
    }
    seedFuentes();
  }
  function seedFuentes(){
    const r=root().getBoundingClientRect(); const W=r.width||1100,H=r.height||500;
    simBounds={xmin:W*0.42,xmax:W*0.90,ymin:H*0.10,ymax:H*0.80};
    simNodes.forEach(nd=>{ nd.x=rnd(simBounds.xmin,simBounds.xmax); nd.y=rnd(simBounds.ymin,simBounds.ymax); nd.vx=0; nd.vy=0; });
  }
  function updateFuentes(t){
    if(!simNodes.length)return;
    const B=simBounds, cx=(B.xmin+B.xmax)/2, cy=(B.ymin+B.ymax)/2;
    for(let i=0;i<simNodes.length;i++){
      const a=simNodes[i]; if(a.zoff===undefined)a.zoff=0;
      a.vx+=(cx-a.x)*0.0007; a.vy+=(cy-a.y)*0.0007;
      for(let j=0;j<simNodes.length;j++){ if(i===j)continue; const b=simNodes[j]; const dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy+1; if(d2<26000){ const f=420/d2; a.vx+=dx*f*0.05; a.vy+=dy*f*0.05; if(d2<9000){ a.zoff+=(i>j?1:-1)*9; } } }
      if(!reduce){ a.vx+=Math.sin(t*0.5+a.ph)*0.04; a.vy+=Math.cos(t*0.45+a.ph)*0.04; }
      a.vx*=0.90; a.vy*=0.90; a.x+=a.vx; a.y+=a.vy;
      a.zoff*=0.86; if(a.zoff>140)a.zoff=140; if(a.zoff<-140)a.zoff=-140;
      if(a.x<B.xmin){a.x=B.xmin;a.vx*=-.5;} if(a.x>B.xmax){a.x=B.xmax;a.vx*=-.5;}
      if(a.y<B.ymin){a.y=B.ymin;a.vy*=-.5;} if(a.y>B.ymax){a.y=B.ymax;a.vy*=-.5;}
      const z=(reduce?0:Math.sin(t*0.6+a.ph)*38)+a.zoff;   // esquive por delante/detrás al chocar
      const par=reduce?0:mx*16*((z+90)/180);
      const sc2=1+z/900;                                   // leve escala con la profundidad
      a.el.style.transform='translate3d('+(a.x+par)+'px,'+a.y+'px,'+z+'px) scale('+sc2+')';
      a.el.style.zIndex=String(200+Math.round(z));
    }
    let li=0;
    for(let i=0;i<simNodes.length;i++)for(let j=i+1;j<simNodes.length;j++){
      const a=simNodes[i],b=simNodes[j], dx=b.x-a.x,dy=b.y-a.y, dist=Math.hypot(dx,dy), ln=simLinks[li++]; if(!ln)continue;
      if(dist<270){ const op=(1-dist/270)*0.55; ln.setAttribute('x1',a.x+30);ln.setAttribute('y1',a.y+30);ln.setAttribute('x2',b.x+30);ln.setAttribute('y2',b.y+30); ln.style.opacity=op; }
      else ln.style.opacity=0;
    }
  }

  const SCENES={estudios:sceneEvidencia,biblioteca:sceneBiblioteca,guias:function(){},profesionales:sceneFuentes};
  function setScene(v){ if(!root())return; view=v; clear(); (SCENES[v]||function(){})(); }

  function frame(){
    if(root()&&!document.hidden){
      const sc=window.scrollY||0, t=performance.now()/1000;
      const hero=document.querySelector('.hero'); const heroH=(hero&&hero.offsetHeight)||560;
      const p=Math.min(1,Math.max(0,sc/heroH));
      if(view==='estudios') updateFan(p);
      else if(view==='biblioteca') updateShelf(p,sc);
      else if(view==='profesionales') updateFuentes(t);
    }
    requestAnimationFrame(frame);
  }
  function init(d){
    data=d||data; if(!root())return;
    window.addEventListener('mousemove',e=>{
      mx=(e.clientX/window.innerWidth-.5)*2;my=(e.clientY/window.innerHeight-.5)*2;
      const hero=document.querySelector('.hero'); if(hero){const r=hero.getBoundingClientRect();
        fanMx=Math.max(-1,Math.min(1,((e.clientX-r.left)/r.width-.5)*2));
        fanMy=Math.max(-1,Math.min(1,((e.clientY-r.top)/r.height-.5)*2));}
    },{passive:true});
    window.addEventListener('resize',()=>{mobile=window.matchMedia&&window.matchMedia('(max-width:640px)').matches; if(view==='profesionales')seedFuentes();},{passive:true});
    setScene('estudios');
    requestAnimationFrame(frame);
  }
  window.HeroScenes={init:init,setScene:setScene};
})();
