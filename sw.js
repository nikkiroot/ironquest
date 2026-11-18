// Offline cache. A new build changes VERSION, so phones pick up the update on next open.
const VERSION='iq-a7a6bb5628',FILES=["./", "index.html", "fonts.css", "manifest.webmanifest", "fonts/ChakraPetch-500.woff2", "fonts/ChakraPetch-600.woff2", "fonts/ChakraPetch-700.woff2", "fonts/Inter-400.woff2", "fonts/Inter-500.woff2", "fonts/Inter-600.woff2", "fonts/Teko-500.woff2", "fonts/Teko-600.woff2", "icon-180.png", "icon-192.png", "icon-512-maskable.png", "icon-512.png"];
self.addEventListener('install',e=>e.waitUntil(caches.open(VERSION).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(r=>r||(e.request.mode==='navigate'?caches.match('index.html'):fetch(e.request))));
});
