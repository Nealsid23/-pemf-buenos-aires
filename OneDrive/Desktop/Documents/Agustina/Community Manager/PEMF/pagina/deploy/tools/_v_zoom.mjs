import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage();
const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push('PE:'+e.message));
await p.goto('http://127.0.0.1:8787/estudios.html',{waitUntil:'domcontentloaded'});
await p.waitForTimeout(2800);
await p.click('#grid .card'); await p.waitForTimeout(700);
const box=await p.$eval('#m-paper-portada',e=>{const r=e.getBoundingClientRect();return {x:r.left+r.width/2,y:r.top+r.height/2};});
// 3 ticks de rueda hacia arriba (zoom in)
for(let i=0;i<3;i++){ await p.dispatchEvent('#m-paper-portada','wheel',{deltaY:-120,clientX:box.x,clientY:box.y}); await p.waitForTimeout(80); }
const tAfter=await p.$eval('#m-paper-portada img',e=>e.style.transform);
// doble clic -> reset
await p.dispatchEvent('#m-paper-portada','dblclick',{clientX:box.x,clientY:box.y});
await p.waitForTimeout(200);
const tReset=await p.$eval('#m-paper-portada img',e=>e.style.transform);
const m=tAfter.match(/scale\(([0-9.]+)\)/);
console.log(JSON.stringify({tAfter,scale:m?+m[1]:null,tReset,errs}));
await b.close();
