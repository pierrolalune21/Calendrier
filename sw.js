self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : { title: 'Mon Planning', body: 'Rappel important pour vos cours ou tâches !' };
  const options = {
    body: data.body,
    icon: 'https://cdn-icons-png.flaticon.com/512/3652/3652191.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/3652/3652191.png',
    vibrate: [200, 100, 200]
  };
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.openWindow('./index.html')
  );
});
