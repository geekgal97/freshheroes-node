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
  const request = event.request;
  // Use offline page on failed fetch
  event.respondWith(
    fetch(request)
      .then(response => cachePage(request, response))
      .catch(err => fetchCoreFile(request.url))
      .catch(err => fetchCoreFile('/'))
  );
});

// Use cached assets
function fetchCoreFile(url) {
  return caches.open('freshheroes-node')
    // Resolves to response, matching request in the cache object
    .then(cache => cache.match(url))
    // If the condition is true
    .then(response => response ? response : Promise.reject());
}

// Cache page on fetch
function cachePage(request, response) {
  // Clone of response object
  const clonedResponse = response.clone();
  caches.open('freshheroes-node')
    // Add to the current cache object
    .then(cache => cache.put(request, clonedResponse));
  return response;
}
