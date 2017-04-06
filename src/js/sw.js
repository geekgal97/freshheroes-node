// Skip waiting on install
// Listen for install event
self.addEventListener('install', event => event.waitUntil(
  // Cache object and Cache name
  caches.open('freshheroes-node')
    // Add files to cache object
    .then(cache => cache.addAll([
      '/',
      'images/*',
      //CSS files
      'account.css', 'admin.css', 'home.css','other.css','style.css',
      //JS files
      'admin.js', 'home.js', 'index.js'
    ]))
    //Become the active service worker
    //Prevents the browser from terminating the service worker
    .then(self.skipWaiting())
));

// Hijack fetch return custom response
// Listen for fetch event
self.addEventListener('fetch', event => {
  // Use offline page on failed fetch
  event.respondWith(
    fetch(event.request)
      .catch(err => fetchOfflinePage())
  );
});

// Use offline page on failed fetch
function fetchOfflinePage() {
  return.caches.open('freshheroes-node')
    .then(cache => cache.match('/'));
}
