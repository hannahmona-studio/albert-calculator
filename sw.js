const CACHE_NAME = 'calc-app-v1';
// List of files to save for offline use
const ASSETS = [
  './',
  './index.html',
  './a1.png',
  './a2.png',
  './a3.png',
  './b1.png',
  './b2.png',
  './b3.png'
];

// Save to cache during installation
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Delete old cache upon activation
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Returns data from the cache when offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
