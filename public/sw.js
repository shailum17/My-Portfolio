const STATIC_CACHE = 'static-v2';
const DYNAMIC_CACHE = 'dynamic-v2';

const urlsToCache = [
  '/',
  '/index.html',
  '/assets/Landing_page.png',
  '/assets/Resume.pdf',
  '/assets/video.mp4',
  '/favicon.ico',
  '/site.webmanifest',
  '/assets/Favicon.svg',
  '/assets/education/bg.png'
];



// Install event - cache static files
self.addEventListener('install', (event) => {
  // Avoid using process.env in SW; rely on simple flag if needed
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        // optional: console.log('Caching static files...');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // optional: console.log('Static files cached successfully');
        return self.skipWaiting();
      })
      .catch((_error) => {
        // optional: console.error('Error caching static files:', _error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              // optional: console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // optional: console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (request.destination === 'image' || 
      request.destination === 'video' || 
      request.destination === 'audio') {
    // Cache images, videos, and audio
    event.respondWith(cacheFirst(request));
  } else if (request.destination === 'font' || 
             request.destination === 'style') {
    // Cache fonts and styles
    event.respondWith(cacheFirst(request));
  } else if (url.origin === location.origin) {
    // Cache same-origin requests
    event.respondWith(networkFirst(request));
  } else {
    // For external resources, try network first
    event.respondWith(networkFirst(request));
  }
});

// Cache first strategy
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (_error) {
    // optional: console.error('Cache first strategy failed:', _error);
    return new Response('Network error', { status: 503 });
  }
}

// Network first strategy
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (_error) {
    // optional: console.log('Network failed, trying cache:', _error);
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for HTML requests
    if (request.destination === 'document') {
      return caches.match('/index.html');
    }
    
    return new Response('Offline', { status: 503 });
  }
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  try {
    // Handle any background sync tasks
    // optional: console.log('Background sync completed');
  } catch (_error) {
    // optional: console.error('Background sync failed:', _error);
  }
} 