import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage();
const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push('PE:'+e.message));
await p.goto('http://127.0.0.1:8787/index.html',{waitUntil:'domcontentloaded'});
await p.waitForTimeout(1500);
await p.evaluate(()=>document.getElementById('evidencia').scrollIntoView());
await p.waitForTimeout(2000);
const o={};
const nums=await p.$$eval('#evidencia [data-countup]',e=>e.map(x=>({txt:x.textContent.trim(),attr:x.getAttribute('data-countup')})));
o.nums=nums;
o.fanCount=await p.$$eval('#evidencia .ev-fan .ev-paper img',e=>e.length);
o.firstSrc=await p.$eval('#evidencia .ev-fan .ev-paper img',e=>e.getAttribute('src')).catch(()=>null);
// verificar que la primera imagen del abanico carga (status)
o.errs=errs;
console.log(JSON.stringify(o));
await b.close();
