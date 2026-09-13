import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage();
await p.setViewportSize({width:1280,height:900});
const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push('PE:'+e.message));
await p.goto('http://127.0.0.1:8787/estudios.html',{waitUntil:'domcontentloaded'});
await p.waitForTimeout(2800);
const o={};
o.deck=await p.$$eval('#hero-scene .hs-paper',e=>e.length);
// transform de una carta del medio al tope (apilado) vs scrolleado (separado)
await p.screenshot({path:'tools/shot_deck_top.png'});
await p.evaluate(()=>window.scrollTo(0,260)); await p.waitForTimeout(500);
await p.screenshot({path:'tools/shot_deck_scrolled.png'});
await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(300);
// guias vacia
await p.click('.view-btn[data-view="guias"]'); await p.waitForTimeout(700);
o.guiasLayers=await p.$$eval('#hero-scene > *',e=>e.length);
// fuentes
await p.click('.view-btn[data-view="profesionales"]'); await p.waitForTimeout(900);
o.nodes=await p.$$eval('#hero-scene .hs-node',e=>e.length);
o.lines=await p.$$eval('#hero-scene .hs-links line',e=>e.length);
await p.waitForTimeout(600); await p.screenshot({path:'tools/shot_fuentes2.png'});
o.errs=errs;
console.log(JSON.stringify(o));
await b.close();
