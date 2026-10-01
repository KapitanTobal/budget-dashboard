const CACHE_NAME = "budget-dashboard-v1";

const APP_FILES = [
    "./",
    "./index.html",
    "./subscriptions.html",
    "./style.css",
    "./script.js",
    "./subscriptions.js",
    "./pwa.js",
    "./manifest.json",
    "./icons/icon-192.png",
    "./icons/icon-512.png"
  ];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(APP_FILES);
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return cacheName !== CACHE_NAME;
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (cachedResponse) {
      return cachedResponse || fetch(event.request);
    })
  );
});