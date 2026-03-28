const CACHE_NAME = 'exam-analyzer-github-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192x192.png',
  './icon-512x512.png'
];

// تثبيت ملفات الكاش
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// جلب الملفات (للعمل بدون إنترنت)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // إذا وجد الملف في الكاش، يعرضه
        }
        return fetch(event.request); // إذا لم يجده، يطلبه من الإنترنت
      }
    )
  );
});
