// Skip waiting on install
// Listen for install event
self.addEventListener('install', event => event.waitUntil(
  // Cache object and Cache name
  caches.open('freshheroes-node')
    // Add to cache object
    .then(cache => cache.add('/'))
    //Become the active service worker
    //Prevents the browser from terminating the service worker
    .then(self.skipWaiting())
));

// Hijack fetch return custom response
//Listen for fetch event
self.addEventListener('fetch', event => {
  //Generate custom response-generating code
  event.respondWith(new Response('hijacked'));
});
