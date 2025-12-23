const cacheName = "CloverBite _ Bad GOAT-Tammuz Game Of UR-0.0.9f0";
const contentToCache = [
    "Build/Tammuz-WebXR.loader.js",
    "Build/Tammuz-WebXR.framework.js.unityweb",
    "Build/Tammuz-WebXR.data.unityweb",
    "Build/Tammuz-WebXR.wasm.unityweb",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
