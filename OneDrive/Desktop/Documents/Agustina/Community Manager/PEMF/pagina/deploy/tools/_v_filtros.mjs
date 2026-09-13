import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage();
const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push('PE:'+e.message));
await p.goto('http://127.0.0.1:8787/estudios.html',{waitUntil:'domcontentloaded'});
await p.waitForTimeout(2800);
const o={};
o.menuBtns=await p.$$eval('#menus-estudios .fb-btn',e=>e.length);
o.cardsAll=await p.$$eval('#grid .card',e=>e.length);
// abrir menú Tema (3er botón) y elegir Mitocondria
const btns=await p.$$('#menus-estudios .fb-btn');
await btns[2].click(); await p.waitForTimeout(300);
// click opción que contenga "Mitocondria"
await p.$$eval('#menus-estudios .fb-panel.open .fb-opt',els=>{const t=els.find(e=>/Mitocondria/.test(e.textContent));t&&t.click();});
await p.waitForTimeout(500);
o.cardsMito=await p.$$eval('#grid .card',e=>e.length);
o.chip=await p.$eval('#chips-estudios .fb-chip',e=>e.textContent.trim()).catch(()=>null);
// limpiar todo
await p.click('#chips-estudios .fb-clear-all').catch(()=>{});
await p.waitForTimeout(400);
o.cardsAfter=await p.$$eval('#grid .card',e=>e.length);
o.errs=errs;
console.log(JSON.stringify(o));
await b.close();
