// Skip waiting on install
// Listen for install event
self.addEventListener('install', event =>
  //Prevents the browser from terminating the service worker
  //Become the active service worker
  event.waitUntil(self.skipWaiting()));

// Hijack fetch return custom response
//Listen for fetch event
self.addEventListener('fetch', event => {
  //Generate custom resposne-generating code
  event.respondWith(new Response('hijacked'));
});
