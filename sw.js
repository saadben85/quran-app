const CACHE = 'quran-v1';
const FILES = [
  '/quran-app/',
  '/quran-app/index.html',
  '/quran-app/manifest.json',
];

// تثبيت: خزّن الملفات
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
  self.skipWaiting();
});

// تفعيل: احذف الكاش القديم
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// طلب: ابحث في الكاش أولاً
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
