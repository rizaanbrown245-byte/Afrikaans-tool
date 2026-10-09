/**
 * Service Worker with Workbox for Afrikaans Adventure / Afrikaans Tool
 * Enables complete offline caching of core lesson data, assets, and app shell.
 */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

if (workbox) {
  // Force active immediately on install and activate
  workbox.core.skipWaiting();
  workbox.core.clientsClaim();

  const CACHE_NAME_PREFIX = 'afrikaans-tool-v1';

  // 1. App Shell & HTML Navigation: Network first with Cache fallback
  workbox.routing.registerRoute(
    ({ request }) => request.mode === 'navigate',
    new workbox.strategies.NetworkFirst({
      cacheName: `${CACHE_NAME_PREFIX}-pages`,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 20,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        }),
      ],
    })
  );

  // 2. JavaScript & CSS Assets: Stale-While-Revalidate
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'script' || request.destination === 'style',
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: `${CACHE_NAME_PREFIX}-static-resources`,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 60,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );

  // 3. Web Fonts (Google Fonts): Cache First
  workbox.routing.registerRoute(
    ({ url }) => url.origin === 'https://fonts.googleapis.com' || url.origin === 'https://fonts.gstatic.com',
    new workbox.strategies.CacheFirst({
      cacheName: `${CACHE_NAME_PREFIX}-google-fonts`,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 30,
          maxAgeSeconds: 365 * 24 * 60 * 60, // 1 Year
        }),
      ],
    })
  );

  // 4. Images & Media: Cache First
  workbox.routing.registerRoute(
    ({ request }) => request.destination === 'image' || request.destination === 'audio',
    new workbox.strategies.CacheFirst({
      cacheName: `${CACHE_NAME_PREFIX}-media`,
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        }),
      ],
    })
  );
} else {
  // Simple fallback if Workbox script is unavailable
  self.addEventListener('install', (event) => {
    self.skipWaiting();
  });

  self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => response || fetch(event.request))
    );
  });
}
