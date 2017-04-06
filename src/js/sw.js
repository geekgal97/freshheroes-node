// Replace registered Service Worker
self.addEventListener('install', event => event.waitUntil(

  //Name of the cache you want to open
  caches.open('freshheroes-node')
    .then(cache => cache.add('/'))
    .then(self.skipWaiting())
  ));
º
// Hijack fetch return the cached page
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request)
      .catch(err => fetchOfflinePage())
    );
});

// First matching request
function fetchOfflinePage() {
  return caches.open('freshheroes-node')
    .then(cache => cache.match('/'));
};

console.log('It has works');
