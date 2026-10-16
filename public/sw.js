const STATIC = 'feelreels-static-v2'
const IMAGES = 'feelreels-images-v1'
const PAGES = 'feelreels-pages-v2'
const OFFLINE_CACHE = 'feelreels-offline'
const OFFLINE_URL = '/offline.html'
const MAX_IMAGES = 200
const MAX_PAGES = 40
const MAX_STATIC = 400
const NO_STORE_PAGES = /\/(login)(\/|$|\?)/

self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(OFFLINE_CACHE).then((cache) => cache.add(new Request(OFFLINE_URL, { cache: 'reload' }))))
    self.skipWaiting()
})

self.addEventListener('activate', (event) => {
    const keep = [STATIC, IMAGES, PAGES, OFFLINE_CACHE]

    event.waitUntil(
        caches
            .keys()
            .then((keys) => Promise.all(keys.filter((key) => !keep.includes(key)).map((key) => caches.delete(key))))
            .then(() => self.clients.claim()),
    )
})

async function trim(name, max) {
    const cache = await caches.open(name)
    const keys = await cache.keys()

    await Promise.all(keys.slice(0, Math.max(0, keys.length - max)).map((key) => cache.delete(key)))
}

async function savePage(url) {
    const { pathname, origin } = new URL(url, self.location.origin)

    if (origin !== self.location.origin || NO_STORE_PAGES.test(pathname)) return

    try {
        const response = await fetch(url, { credentials: 'same-origin' })

        if (!response.ok || response.redirected) return

        await (await caches.open(PAGES)).put(url, response)
        trim(PAGES, MAX_PAGES)
    } catch {}
}

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'save-page') event.waitUntil(savePage(event.data.url))
})

async function cacheFirst(request) {
    const cached = await caches.match(request)

    if (cached) return cached

    const response = await fetch(request)

    if (response.ok) (await caches.open(STATIC)).put(request, response.clone()).then(() => trim(STATIC, MAX_STATIC))

    return response
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(IMAGES)
    const cached = await cache.match(request)
    const fresh = fetch(request)
        .then((response) => {
            if (response.ok) cache.put(request, response.clone()).then(() => trim(IMAGES, MAX_IMAGES))

            return response
        })
        .catch(() => cached)

    return cached || fresh
}

async function networkFirstPage(request) {
    const url = new URL(request.url)

    try {
        const response = await fetch(request)

        if (response.ok && !NO_STORE_PAGES.test(url.pathname)) {
            await (await caches.open(PAGES)).put(request, response.clone())
            trim(PAGES, MAX_PAGES)
        }

        return response
    } catch {
        return (await caches.match(request, { ignoreSearch: true })) || (await (await caches.open(OFFLINE_CACHE)).match(OFFLINE_URL))
    }
}

self.addEventListener('fetch', (event) => {
    const { request } = event

    if (request.method !== 'GET') return

    const url = new URL(request.url)

    if (url.origin !== self.location.origin || url.pathname.startsWith('/videos/')) return
    if (request.mode === 'navigate') return event.respondWith(networkFirstPage(request))
    if (url.pathname.startsWith('/_next/image')) return event.respondWith(staleWhileRevalidate(request))
    if (url.pathname.startsWith('/_next/static/') || /^\/(images|icons)\//.test(url.pathname) || /\.(woff2?|png|jpe?g|webp|avif|svg|ico)$/.test(url.pathname)) {
        return event.respondWith(cacheFirst(request))
    }
})
