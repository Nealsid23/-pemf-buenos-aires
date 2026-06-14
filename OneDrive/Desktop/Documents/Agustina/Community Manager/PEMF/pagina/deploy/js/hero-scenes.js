/* Escenas 3D del hero por vista (60fps, sutil). window.HeroScenes.init({papers,books,people}) + setScene(view).
   Un solo requestAnimationFrame mueve las capas con scroll (profundidad) + parallax de mouse + deriva.
   Sesgadas a la derecha para no tapar el texto (alineado a la izquierda). Respeta prefers-reduced-motion. */
(function(){
  const root=()=>document.getElementById('hero-scene');
  const reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let layers=[],view='estudios',mx=0,my=0,data={papers:[],books:[],people:[]};
  let mobile=window.matchMedia&&window.matchMedia('(max-width:640px)').matches;
  function el(cls,html){const d=document.createElement('div');d.className='hs-layer '+cls;if(html)d.innerHTML=html;return d;}
  function clear(){const r=root();if(r)r.innerHTML='';layers=[];}
  function add(node,opt){node._d=opt;root().appendChild(node);layers.push(node);}
  function rnd(a,b){return a+Math.random()*(b-a);}

  function sceneEvidencia(){
    const imgs=data.papers.filter(p=>p.portada);
    // mezcla simple para variar
    const sel=imgs.slice().sort(()=>Math.random()-.5).slice(0,mobile?4:8);
    sel.forEach(p=>{
      const n=el('hs-paper','<img src="'+p.portada+'" alt="" loading="lazy">');
      n.style.left=rnd(46,86)+'%'; n.style.top=rnd(8,64)+'%';
      add(n,{depth:rnd(.35,1),baseRot:rnd(-14,14),drift:rnd(.2,.55),ph:Math.random()*6.28,float:true});
    });
  }
  function sceneBiblioteca(){
    const bks=(data.books||[]).slice(0,mobile?6:10);
    bks.forEach((b,i)=>{
      const n=el('hs-book','<img src="'+b.cover+'" alt="" loading="lazy">');
      n.style.left='62%'; n.style.top='46%';
      add(n,{shelf:true,index:i,total:bks.length});
    });
  }
  function sceneGuias(){
    const sun=el('hs-sun'); sun.style.left='48%'; sun.style.top='56%'; add(sun,{sun:true});
    ['💧','〜','🫁','🍃','☀️'].slice(0,mobile?3:5).forEach(g=>{
      const n=el('hs-glyph',g); n.style.left=rnd(48,86)+'%'; n.style.top=rnd(12,60)+'%';
      add(n,{depth:rnd(.4,1),drift:rnd(.3,.65),ph:Math.random()*6.28,float:true});
    });
  }
  function sceneFuentes(){
    const ppl=(data.people||[]).slice(0,mobile?5:8);
    const nodes=[];
    ppl.forEach(p=>{
      const ini=(p.nombre||'?').split(' ').map(w=>w[0]).slice(0,2).join('');
      const col=(p.campo&&window.CampoProf&&window.CampoProf[p.campo])?window.CampoProf[p.campo].c:'#1a4fb6';
      const n=el('hs-node', p.foto?('<img src="'+p.foto+'" alt="">'):ini);
      if(!p.foto)n.style.background='linear-gradient(135deg,'+col+','+col+'aa)';
      n.style.left=rnd(44,86)+'%'; n.style.top=rnd(10,64)+'%';
      add(n,{depth:rnd(.35,1),drift:rnd(.25,.6),ph:Math.random()*6.28,float:true});
      nodes.push(n);
    });
  }
  const SCENES={estudios:sceneEvidencia,biblioteca:sceneBiblioteca,guias:sceneGuias,profesionales:sceneFuentes};

  function setScene(v){ if(!root())return; view=v; clear(); (SCENES[v]||sceneEvidencia)(); }

  function frame(){
    if(!root()){return;}
    if(!document.hidden){
      const sc=window.scrollY||0, t=performance.now()/1000;
      const hero=document.querySelector('.hero'); const heroH=(hero&&hero.offsetHeight)||560;
      const p=Math.min(1,Math.max(0,sc/heroH));
      for(let i=0;i<layers.length;i++){
        const n=layers[i], d=n._d||{};
        if(d.shelf){
          const focus=p*(d.total-1); const rel=d.index-focus;
          const x=rel*(mobile?115:150), z=-Math.abs(rel)*230, ry=rel*-18;
          const op=Math.max(.12,1-Math.abs(rel)*.42);
          n.style.transform='translate(-50%,-50%) translate3d('+x+'px,0,'+z+'px) rotateY('+ry+'deg)';
          n.style.opacity=op; n.style.zIndex=String(100-Math.round(Math.abs(rel)*10));
        } else if(d.sun){
          const cx=48+p*44, cy=56-Math.sin(Math.PI*p)*40;
          n.style.left=cx+'%'; n.style.top=cy+'%';
          n.style.opacity=String(.7+Math.sin(Math.PI*p)*.3);
        } else if(d.float){
          const dep=d.depth||.6;
          const drift=reduce?0:Math.sin(t*(d.drift||.4)+(d.ph||0))*8;
          const px=reduce?0:mx*22*dep, py=(reduce?0:my*22*dep) - sc*0.12*dep + drift;
          const rot=(d.baseRot||0)+(reduce?0:mx*6*dep);
          n.style.transform='translate3d('+px+'px,'+py+'px,'+((dep-1)*200)+'px) rotateY('+rot+'deg)';
          n.style.opacity=String(.5+dep*.4);
        }
      }
    }
    requestAnimationFrame(frame);
  }

  function init(d){
    data=d||data; if(!root())return;
    window.addEventListener('mousemove',e=>{mx=(e.clientX/window.innerWidth-.5)*2;my=(e.clientY/window.innerHeight-.5)*2;},{passive:true});
    window.addEventListener('resize',()=>{mobile=window.matchMedia&&window.matchMedia('(max-width:640px)').matches;},{passive:true});
    setScene('estudios');
    requestAnimationFrame(frame);
  }
  window.HeroScenes={init:init,setScene:setScene};
})();
