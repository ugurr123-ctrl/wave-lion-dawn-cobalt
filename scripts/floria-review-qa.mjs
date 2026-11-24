import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('mobile-www'), out=path.resolve('../../outputs/floria-review-fixes'); await mkdir(out,{recursive:true});
const server=createServer(async(req,res)=>{try{const file=path.join(root,req.url==='/'?'index.html':req.url.split('?')[0]);res.setHeader('Content-Type',file.endsWith('.js')?'text/javascript':file.endsWith('.css')?'text/css':file.endsWith('.png')?'image/png':file.endsWith('.wav')?'audio/wav':'text/html');res.end(await readFile(file));}catch{res.statusCode=404;res.end();}}).listen(8097,'127.0.0.1');
const browser=await chromium.launch({channel:'chrome',headless:true});const results=[];
try{
for(const [name,width,height] of [['phone-small',320,568],['phone',390,844],['ipad-portrait',820,1180],['ipad-landscape',1180,820]]){
 const page=await browser.newPage({viewport:{width,height}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.addInitScript(()=>{if(!localStorage.getItem('flora-onboarded')){localStorage.setItem('flora-onboarded','1');localStorage.setItem('flora-profile',JSON.stringify({name:'Test',lastPeriodDate:'2026-11-24'}));}});
 await page.goto('http://127.0.0.1:8097');
 await page.getByText('Merhaba Test',{exact:true}).waitFor();
 for(const label of ['Bugün','Döngü','Rehber','Raporlar','Profil']){
  await page.locator('nav button').filter({hasText:label}).click();
  assert.ok(await page.locator('main').innerText());
  const geometry=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+1,shell:document.querySelector('.floria-shell').getBoundingClientRect().width}));
  assert.equal(geometry.overflow,false,`${name} ${label}: overflow`);
  if(width>=768)assert.ok(geometry.shell>700,`${name}: phone-only shell`);
  await page.screenshot({path:path.join(out,`${name}-${label}.png`)});
 }
 await page.getByRole('button',{name:'Bildirimler',exact:true}).click();await page.getByRole('button',{name:'Tümünü Okundu Say'}).click();await page.reload();await page.getByRole('button',{name:'Bildirimler',exact:true}).click();await page.getByText('Hepsi okundu ✓').waitFor();await page.getByRole('button',{name:'Kapat',exact:true}).click();
 await page.locator('nav button').filter({hasText:'Profil'}).click();
 await page.getByRole('button',{name:'Yeni Takviye Ekle'}).click();
 await page.getByPlaceholder('örn: B12 Vitamini, Demir, Kolajen, İnositol').fill('Test takviyesi');
 const modalGeometry = await page.locator('.fixed.inset-0.z-50 > div').evaluate(el=>{const r=el.getBoundingClientRect();return {top:r.top,bottom:r.bottom,height:innerHeight};});
 assert.ok(modalGeometry.top>=0 && modalGeometry.bottom<=modalGeometry.height+1,`${name}: dialog outside viewport`);
 await page.getByRole('button',{name:'Vazgeç',exact:true}).click();
 // A corrupt photo must leave the previous avatar intact and expose a recoverable error.
 await page.locator('input[type=file]').setInputFiles({name:'broken.jpg',mimeType:'image/jpeg',buffer:Buffer.from('not-an-image')});await page.getByRole('alert').filter({hasText:'Fotoğraf açılamadı'}).waitFor();
 await page.locator('input[type=file]').setInputFiles(path.resolve('public/logo.png'));
 await page.getByText('Fotoğraf bu cihazda kaydedildi.').waitFor();
 const avatar=await page.evaluate(()=>JSON.parse(localStorage.getItem('flora-profile')).avatarUrl);assert.ok(avatar.startsWith('data:image/jpeg'));assert.ok(avatar.length<500000);
 assert.deepEqual(errors,[]);results.push({name,width,height,checks:'five tabs, no overflow, tablet width, read persistence, corrupt and valid photo'});await page.close();
}
await writeFile(path.join(out,'verification.json'),JSON.stringify(results,null,2));console.log(JSON.stringify(results));
}finally{await browser.close();server.closeAllConnections();await new Promise(r=>server.close(r));}
