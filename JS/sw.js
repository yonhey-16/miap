self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('tvmaze-app-v1').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css', 
        '/js/api.js',  // Ajuste en la ruta
        '/js/lista.js', 
        '/js/mios.js',
        '/js/favoritos.js',
        '/js/datos.js',
        '/js/detalle.js',
        '/icons/icon-192.png',
        '/icons/icon-512.png',
        '/js/tvmaze-api.js', 
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});
