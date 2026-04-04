// ============================================================
// Harvestpedia – Service Worker  (sw.js)
// Place this file at the ROOT of your project (same level as index.html)
// ============================================================
// Then register it by adding to your index.html <body>:
//
//   <script>
//     if ('serviceWorker' in navigator) {
//       navigator.serviceWorker.register('/sw.js')
//         .then(() => console.log('SW registered'))
//         .catch(err => console.warn('SW error:', err));
//     }
//   </script>
// ============================================================

const CACHE_NAME = "harvestpedia-v1";

// Files to cache for offline use — update paths to match your structure
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/api.js",
  "/js/darkmode.js",
  "/fruits/fruits.html",
  "/vegetables/vegetables.html",
  "/plants/plants.html",
  "/search/search.html",
  "/seasonal/seasonal.html",
  "/compare/compare.html",
  // Add your images / icons here:
  // "/images/logo.png",
];

// ── Install: cache static assets ─────────────────────────
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// ── Activate: remove old caches ───────────────────────────
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

// ── Fetch: cache-first for static, network-first for API ──
self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);

  // Never cache API calls (Claude / Weather proxy)
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(fetch(request));
    return;
  }

  // Cache-first strategy for everything else
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request)
        .then(response => {
          // Only cache successful GET responses
          if (!response || response.status !== 200 || request.method !== "GET") {
            return response;
          }
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          return response;
        })
        .catch(() => {
          // Offline fallback for HTML pages
          if (request.headers.get("accept")?.includes("text/html")) {
            return caches.match("/index.html");
          }
        });
    })
  );
});