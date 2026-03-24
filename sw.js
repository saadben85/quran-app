const CACHE = 'quran-v1';
const FILES = [
  '/quran-app/',
  '/quran-app/index.html',
  '/quran-app/manifest.json',
  'https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Scheherazade+New:wght@400;600;700&display=swap',
  'https://fonts.gstatic.com/s/amiri/v27/J7aRnpd8CGxBHqUpvrIw74NL.woff2',
  'https://fonts.gstatic.com/s/scheherazadenew/v22/4UaZrFhTvxVnHDvUkUiHg8jrSXsHPXNRBY0.woff2',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
