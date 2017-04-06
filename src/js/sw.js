// Replace registered Service Worker
self.addEventListener('install', event =>
  event.waitUntil(self.skipWaiting()));

// Hijack fetch return custom response
self.addEventListener('fetch', event => {
  event.respondWidth(new Response('Pirate direct'));
});

console.log('It has works');
