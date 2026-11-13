const VERSIE = 'magma-854912c96c';
const KERN = ["./","app.css","app.js","assets/fonts/Lora-Italic-VariableFont_wght.ttf","assets/fonts/Lora-VariableFont_wght.ttf","assets/icoon-1024.png","assets/icoon-180.png","assets/icoon-192.png","assets/icoon-512.png","assets/lava-logo-black.svg","assets/webfonts/BasicCommercialLTPro-Roman.woff","assets/webfonts/BasicCommercialLTPro-Roman.woff2","index.html","manifest.webmanifest","pdfjs/pdf.min.mjs","pdfjs/pdf.worker.min.mjs","pdfjs/standard_fonts/FoxitDingbats.pfb","pdfjs/standard_fonts/FoxitFixed.pfb","pdfjs/standard_fonts/FoxitFixedBold.pfb","pdfjs/standard_fonts/FoxitFixedBoldItalic.pfb","pdfjs/standard_fonts/FoxitFixedItalic.pfb","pdfjs/standard_fonts/FoxitSerif.pfb","pdfjs/standard_fonts/FoxitSerifBold.pfb","pdfjs/standard_fonts/FoxitSerifBoldItalic.pfb","pdfjs/standard_fonts/FoxitSerifItalic.pfb","pdfjs/standard_fonts/FoxitSymbol.pfb","pdfjs/standard_fonts/LICENSE_FOXIT","pdfjs/standard_fonts/LICENSE_LIBERATION","pdfjs/standard_fonts/LiberationSans-Bold.ttf","pdfjs/standard_fonts/LiberationSans-BoldItalic.ttf","pdfjs/standard_fonts/LiberationSans-Italic.ttf","pdfjs/standard_fonts/LiberationSans-Regular.ttf","pdfjs/wasm/LICENSE_JBIG2","pdfjs/wasm/LICENSE_OPENJPEG","pdfjs/wasm/LICENSE_PDFJS_JBIG2","pdfjs/wasm/LICENSE_PDFJS_OPENJPEG","pdfjs/wasm/LICENSE_PDFJS_QCMS","pdfjs/wasm/LICENSE_QCMS","pdfjs/wasm/jbig2.wasm","pdfjs/wasm/jbig2_nowasm_fallback.js","pdfjs/wasm/openjpeg.wasm","pdfjs/wasm/openjpeg_nowasm_fallback.js","pdfjs/wasm/qcms_bg.wasm","pdfjs/wasm/quickjs-eval.js","pdfjs/wasm/quickjs-eval.wasm"];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSIE).then(c => c.addAll(KERN)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(x => x !== VERSIE).map(x => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;   // Dropbox e.d.: altijd rechtstreeks
  if (u.search.includes('code=')) return;                                     // terugkeer na aanmelden
  e.respondWith(caches.open(VERSIE).then(async c => {
    const raak = await c.match(e.request, { ignoreSearch: true });
    const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => raak);
    return raak ?? net;
  }));
});
