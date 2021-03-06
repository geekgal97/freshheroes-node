// Skip waiting on install
// Listen for install event
self.addEventListener('install', event => event.waitUntil(
  // Cache object and Cache name
  caches.open('freshheroes-node-v1')
    // Add files to cache object
    .then(cache => cache.addAll([
      '/',
      //Offline page
      '/offline',
      '/offline.css',
      '/images/without_internet.mp4',
      //CSS files
      '/account.css', '/style.css', '/home.css', '/page.css',
      //JS files
      '/home.js', '/main.js'
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
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => cachePage(request, response))
        .catch(err => fetchCoreFile(request.url))
        .catch(err => fetchCoreFile('/offline')));
  } else {
    fetch(request)
    .catch(err => fetchCoreFile(request.url))
    .catch(err => fetchCoreFile('/offline'))
  }
});

// Use cached assets
function fetchCoreFile(url) {
  return caches.open('freshheroes-node-v1')
    // Resolves to response, matching request in the cache object
    .then(cache => cache.match(url))
    // If the condition is true
    .then(response => response ? response : Promise.reject());
}

// Get cached page
function getCachedPage(request) {
  return caches.open('freshheroes-node-v1')
    .then(cache => cache.match(request))
    .then(response => response ? response : Promise.reject());
}

// Cache page on fetch
function cachePage(request, response) {
  // Clone of response object
  const clonedResponse = response.clone();
  caches.open('freshheroes-node-v1')
    // Add to the current cache object
    .then(cache => cache.put(request, clonedResponse));
  return response;
}
