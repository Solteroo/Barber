const CACHE = "barber-pwa-v3";

const ASSETS = [
  "/",
  "/offline.html",
  "/assets/css/style.css",
  "/assets/js/script.js",
  "/assets/icons/site.webmanifest",

  "/assets/icons/icon-192.png",
  "/assets/icons/icon-512.png",

  "/assets/images/back.jpg",
  "/assets/images/haircut.jpg",
  "/assets/images/beard.jpg",
  "/assets/images/styling.jpg",
  "/assets/images/color.jpg",
  "/assets/images/daily.jpg",
  "/assets/images/party.jpg",
  "/assets/images/manicure.jpg",
  "/assets/images/bridal.jpg",
  "/assets/images/coloring.jpg"
];

// INSTALL
self.addEventListener("install", event => {
  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE).then(async cache => {
      try {
        await cache.addAll(ASSETS);
      } catch (err) {
        console.error("Cache addAll failed:", err);
      }
    })
  );
});

// ACTIVATE
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE) return caches.delete(key);
        })
      )
    )
  );

  self.clients.claim();
});

// FETCH (cache-first + network fallback)
self.addEventListener("fetch", event => {
  const req = event.request;

  if (req.method !== "GET") return;

  event.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;

      return fetch(req)
        .then(async res => {
          if (!res) return res;

          const cache = await caches.open(CACHE);

          // clone before using
          cache.put(req, res.clone());

          return res;
        })
        .catch(() => {
          // fallback faqat HTML uchun
          if (req.mode === "navigate") {
            return caches.match("/offline.html");
          }
        });
    })
  );
});
