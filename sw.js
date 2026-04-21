const CACHE = "barber-pwa-v1";

const ASSETS = [
  "/",
  "/offline.html",
  "/style.css",
  "/script.js",
  "/manifest.json",

  "/icon-192.png",
  "/icon-512.png",

  "/back.jpg",
  "/haircut.jpg",
  "/beard.jpg",
  "/styling.jpg",
  "/color.jpg",
  "/daily.jpg",
  "/party.jpg",
  "/manicure.jpg",
  "/bridal.jpg",
  "/coloring.jpg"
];

// INSTALL
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ASSETS))
  );
});

// ACTIVATE
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(k => {
          if (k !== CACHE) return caches.delete(k);
        })
      )
    )
  );
  self.clients.claim();
});

// FETCH
self.addEventListener("fetch", e => {
  const req = e.request;

  if (req.method !== "GET") return;

  e.respondWith(
    caches.match(req).then(cached => {
      if (cached) return cached;

      return fetch(req)
        .then(res => {
          if (!res || res.status !== 200 || res.type !== "basic") {
            return res;
          }

          const clone = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, clone));

          return res;
        })
        .catch(() => caches.match("/offline.html"));
    })
  );
});