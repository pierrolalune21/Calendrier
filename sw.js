// sw.js

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Écoute des demandes de notification envoyées depuis la page web (index.html)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
    const { title, body, delay } = event.data;

    setTimeout(() => {
      self.registration.showNotification(title, {
        body: body,
        icon: 'https://raw.githubusercontent.com/Arthurxim/OMNITIME/main/icone.png',
        badge: 'https://raw.githubusercontent.com/Arthurxim/OMNITIME/main/icone.png',
        vibrate: [200, 100, 200],
        tag: 'test-notification-' + Date.now(),
        renotify: true
      });
    }, delay);
  }
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes('index.html') && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow('./index.html');
      }
    })
  );
});
