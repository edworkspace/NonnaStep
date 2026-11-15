const CACHE_NAME = "nonnastep-v1";
// Use absolute paths for the assets
const ASSETS = [
  "/NonnaStep/",
  "/NonnaStep/index.html",
  "/NonnaStep/manifest.json",
  "/NonnaStep/icon-192.png",
  "/NonnaStep/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return the cached file, or fetch from the network
      return response || fetch(event.request).catch(() => {
        // If both fail (offline and not cached), return the index page
        // This is a safety net for SPAs (Single Page Apps)
        return caches.match("/NonnaStep/index.html");
      });
    })
  );
});