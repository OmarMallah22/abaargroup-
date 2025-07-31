self.addEventListener('install', event => {
  console.log('Service Worker: تم التثبيت');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service Worker: التفعيل');
});

self.addEventListener('fetch', event => {
  // يمكن إضافة كاش لاحقًا
});
