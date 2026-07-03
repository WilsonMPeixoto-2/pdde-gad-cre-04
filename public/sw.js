const SW_VERSION = new URL(self.location.href).searchParams.get("v") ?? "fallback";
const CACHE_PREFIX = "pdde-guide-shell-";
const CACHE_NAME = `${CACHE_PREFIX}${SW_VERSION}`;
const APP_SHELL = [
  "/",
  "/index.html",
  "/favicon.png",
  "/favicon.ico",
  "/browserconfig.xml",
  "/manifest.json",
  "/og-image.png",
  "/icons/favicon-32.png",
  "/icons/favicon-16.png",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/icons/icon-maskable-192.png",
  "/icons/icon-maskable-512.png",
  "/icons/apple-touch-icon.png",
  "/icons/shortcut-home.png",
  "/icons/shortcut-checklist.png",
];
const CACHEABLE_DESTINATIONS = new Set(["image", "font", "manifest", "script", "style"]);
const PDF_PATH_PREFIX = "/models/";

const cacheResponse = async (request, response) => {
  if (!response || !response.ok) return response;

  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response.clone());
  return response;
};

const fetchFresh = (request, { bypassBrowserCache = false } = {}) => {
  if (!bypassBrowserCache) return fetch(request);

  return fetch(new Request(request, { cache: "no-store" }));
};

const networkFirst = async (request, fallbackKey = request, options) => {
  try {
    const response = await fetchFresh(request, options);
    return await cacheResponse(request, response);
  } catch {
    const cachedResponse = await caches.match(fallbackKey);
    if (cachedResponse) return cachedResponse;
    throw new Error("Network request failed and no cache entry was found.");
  }
};

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith(CACHE_PREFIX) && cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(networkFirst(event.request, "/index.html", { bypassBrowserCache: true }));
    return;
  }

  if (requestUrl.pathname.startsWith(PDF_PATH_PREFIX)) {
    event.respondWith(networkFirst(event.request));
    return;
  }

  if (!CACHEABLE_DESTINATIONS.has(event.request.destination)) return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const networkResponse = fetch(event.request)
        .then((response) => cacheResponse(event.request, response))
        .catch(() => cachedResponse);

      return cachedResponse || networkResponse;
    })
  );
});

self.addEventListener("message", (event) => {
  if (event.data === "skipWaiting") {
    self.skipWaiting();
  }
});
