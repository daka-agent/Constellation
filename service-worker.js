/**
 * 星座探索 — Service Worker
 * 离线缓存策略：Cache First（优先缓存，离线可用）
 * 版本号变更时会自动更新缓存
 */
const CACHE_NAME = 'xingzhuo-v2.1.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './js/data.js',
  './js/game.js',
  // 图标
  './favicon.ico',
  './imgs/icons/icon-72x72.png',
  './imgs/icons/icon-96x96.png',
  './imgs/icons/icon-128x128.png',
  './imgs/icons/icon-144x144.png',
  './imgs/icons/icon-152x152.png',
  './imgs/icons/icon-192x192.png',
  './imgs/icons/icon-384x384.png',
  './imgs/icons/icon-512x512.png',
  './imgs/icons/icon.svg',
  // Google Fonts（缓存关键字体）
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700;800;900&family=Nunito:wght@400;500;600;700;800;900&display=swap',
];

// ── 安装：预缓存所有静态资源 ──────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] 预缓存资源...');
      // 逐个缓存，避免单个失败导致整体失败
      return Promise.allSettled(
        ASSETS_TO_CACHE.map(url =>
          cache.add(url).catch(err => {
            console.warn('[SW] 缓存失败（非致命）:', url, err.message);
          })
        )
      );
    }).then(() => self.skipWaiting())
  );
});

// ── 激活：清理旧缓存 ──────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => {
      return Promise.all(
        names.map(name => {
          if (name !== CACHE_NAME) {
            console.log('[SW] 删除旧缓存:', name);
            return caches.delete(name);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// ── 请求拦截：Cache First 策略 ────────────────────────────
self.addEventListener('fetch', event => {
  // 只处理 GET 请求
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // 命中缓存，同时后台更新（stale-while-revalidate）
        fetchAndCache(event.request);
        return cachedResponse;
      }
      // 未命中，网络请求并缓存
      return fetchAndCache(event.request).catch(() => {
        // 网络失败且无缓存：返回离线占位（可选）
        if (event.request.headers.get('accept')?.includes('text/html')) {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// ── 辅助：请求并缓存 ──────────────────────────────────────
function fetchAndCache(request) {
  return fetch(request).then(response => {
    // 只缓存有效的响应
    if (!response || response.status !== 200 || response.type === 'error') {
      return response;
    }
    // 不缓存跨域非字体资源
    const url = new URL(request.url);
    const isSameOrigin = url.origin === self.location.origin;
    const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
    if (!isSameOrigin && !isFont) return response;

    const responseClone = response.clone();
    caches.open(CACHE_NAME).then(cache => {
      cache.put(request, responseClone);
    });
    return response;
  });
}

// ── 监听消息：跳过后台更新 ───────────────────────────────
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
