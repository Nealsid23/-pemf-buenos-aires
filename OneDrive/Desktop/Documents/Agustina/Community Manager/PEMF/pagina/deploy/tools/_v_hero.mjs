import { chromium } from 'playwright';
const b=await chromium.launch();const p=await b.newPage();
await p.setViewportSize({width:1280,height:900});
const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push('PE:'+e.message));
await p.goto('http://127.0.0.1:8787/estudios.html',{waitUntil:'domcontentloaded'});
await p.waitForTimeout(2800);
const o={};
o.evidencia=await p.$$eval('#hero-scene .hs-paper',e=>e.length);
await p.screenshot({path:'tools/shot_hero_evidencia.png'});
async function sw(view,sel){ await p.click('.view-btn[data-view="'+view+'"]'); await p.waitForTimeout(900); return p.$$eval('#hero-scene '+sel,e=>e.length); }
o.biblioteca=await sw('biblioteca','.hs-book'); await p.screenshot({path:'tools/shot_hero_biblioteca.png'});
o.guias=await sw('guias','.hs-sun'); o.guiasGlyphs=await p.$$eval('#hero-scene .hs-glyph',e=>e.length); await p.screenshot({path:'tools/shot_hero_guias.png'});
o.fuentes=await sw('profesionales','.hs-node'); await p.screenshot({path:'tools/shot_hero_fuentes.png'});
o.errs=errs;
console.log(JSON.stringify(o));
await b.close();
