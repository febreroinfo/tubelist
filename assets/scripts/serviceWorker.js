// https://gist.github.com/cferdinandi/6e4a73a69b0ee30c158c8dd37d314663

// Version 1
// Set cache name
let cacheName = "v1";

// Core assets
let coreAssets = [
  "./",
  "./index.html",
  "./assets/images/favicon/favicon.svg",
  "./assets/images/favicon/favicon.ico",
  "./assets/images/favicon/apple-touch-icon.png",
  "./assets/images/favicon/icon-512x512.png",
  "./assets/images/favicon/icon-192x192.png",
  "./assets/images/favicon/manifest.json",
  "./assets/images/svg/tubelist.svg",
  "./assets/fonts/Inter/Inter-Black.woff2",
  "./assets/fonts/Inter/Inter-Regular.woff2",
  "./assets/fonts/Inter/Inter-SemiBold.woff2",
  "./assets/fonts/Inter/Inter-ExtraLight.woff2",
  "./assets/styles/main.min.css",
  "./assets/scripts/main.min.js",
];

// On install, cache core assets
self.addEventListener("install", function (event) {
  // Cache core assets
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      for (let asset of coreAssets) {
        cache.add(new Request(asset));
      }
      return cache;
    })
  );
});

// https://dev.to/tqbit/how-to-use-service-workers-in-javascript-2159
// https://github.com/ireade/boilerplate-service-worker/blob/gh-pages/src/service-worker.js

let clearOldCache = async (cacheName) => {
  let keys = await caches.keys();

  keys.forEach((version) => {
    if (!cacheName.includes(version)) {
      caches.delete(version);
    }
  });
};

// On activate, cache key, previous cache name, clear
self.addEventListener("activate", function (event) {
  // Remove all old caches from the service worker
  event.waitUntil([clearOldCache(cacheName)]);
});

// Listen for request events
self.addEventListener("fetch", function (event) {
  // Get the request with exceptions
  if (
    event.request.method !== "POST" ||
    event.request.url.indexOf("chrome-extension://") === -1
  )
    return;

  let request = event.request;

  // Bug fix
  // https://stackoverflow.com/a/49719964
  if (
    event.request.cache === "only-if-cached" &&
    event.request.mode !== "same-origin"
  )
    return;

  // Responds to the fetch event
  event.respondWith(
    // Check in cache for the request being made
    caches.match(request).then(function (response) {
      // If the request is in the cache
      if (response) {
        // Return the cached version
        return response;
      }

      // If the request is NOT in the cache, fetch and cache
      return fetch(request)
        .then(function (response) {
          if (!response) {
            console.log("Service Worker Error, No response from fetch ");
            return response;
          }

          // Create a copy of the response and save it to the cache
          let copy = response.clone();

          event.waitUntil(
            caches.open(cacheName).then(function (cache) {
              return cache.put(request, copy);
            })
          );
          // Return the response
          return response;
        })
        .catch(function (error) {
          console.log("Service Worker Error,", error);
        });
    }) // end caches.match(request)
  ); // end event.respondWith
});
