const CACHE = "barber-pwa-v2";

const ASSETS = [
  "/",
  "/offline.html",
  "assets/css/style.css",
  "assets/js/script.js",
  "assets/icons/site.webmanifest",

  "assets/icons/icon-192.png",
  "assets/icons/icon-512.png",

  "assets/images/back.jpg",
  "assets/images/haircut.jpg",
  "assets/images/beard.jpg",
  "assets/images/styling.jpg",
  "assets/images/color.jpg",
  "assets/images/daily.jpg",
  "assets/images/party.jpg",
  "assets/images/manicure.jpg",
  "assets/images/bridal.jpg",
  "assets/images/coloring.jpg"
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
