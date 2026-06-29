// @ts-check
/// <reference lib="webworker" />

/* ===========================================================
 * Copyright 2016 @huxpro
 * Licensed under Apache 2.0
 * Register service worker.
 * ========================================================== */

const PRECACHE = 'precache-v3';
const RUNTIME = 'runtime-v2';
const CURRENT_CACHES = [PRECACHE, RUNTIME];

// Cast self to ServiceWorkerGlobalScope — without a tsconfig override the DOM lib
// wins and types self as Window, losing skipWaiting/clients/FetchEvent overloads.
// WorkerGlobalScope is the spec-correct intermediate (SW extends Worker extends EventTarget).
const sw = /** @type {ServiceWorkerGlobalScope} */ (/** @type {WorkerGlobalScope} */ (self));

const HOSTNAME_WHITELIST = [
  sw.location.hostname,
  "cdnjs.cloudflare.com"
];

/**
 * The Util Function to hack URLs of intercepted requests.
 * @param {Request} req
 * @returns {string}
 */
const getFixedUrl = (req) => {
  const now = Date.now();
  const url = new URL(req.url);

  // 1. fixed http URL
  // Just keep syncing with location.protocol
  // fetch(httpURL) belongs to active mixed content.
  // And fetch(httpRequest) is not supported yet.
  url.protocol = sw.location.protocol;

  // 2. add query for caching-busting.
  // Github Pages served with Cache-Control: max-age=600
  // max-age on mutable content is error-prone, with SW life of bugs can even extend.
  // Until cache mode of Fetch API landed, we have to workaround cache-busting with query string.
  // Cache-Control-Bug: https://bugs.chromium.org/p/chromium/issues/detail?id=453190
  url.search += (url.search ? '&' : '?') + 'cache-bust=' + now;
  return url.href;
}

/**
 * The Util Function to detect and polyfill req.mode="navigate".
 * request.mode of 'navigate' is unfortunately not supported in Chrome
 * versions older than 49, so we need to include a less precise fallback,
 * which checks for a GET request with an Accept: text/html header.
 * @param {Request} req
 * @returns {boolean}
 */
const isNavigationReq = (req) => (req.mode === 'navigate' || (req.method === 'GET' && req.headers.get('accept')?.includes('text/html') === true));

/**
 * The Util Function to detect if a req URL ends with a file extension.
 * According to Fetch API spec <https://fetch.spec.whatwg.org/#concept-request-destination>
 * any HTML navigation has consistently mode="navigate" type="" and destination="document",
 * including requesting an img (or any static resource) from the URL bar directly.
 * So it ends up that regExp is still the king of URL routing.
 * P.S. A url.pathname with no '.' cannot indicate it ends with extension (e.g. /api/version/1.2/)
 * @param {Request} req
 * @returns {boolean}
 */
const endWithExtension = (req) => Boolean(new URL(req.url).pathname.match(/\.\w+$/));

/**
 * Redirect in SW manually fixed github pages arbitrary 404s on things?blah.
 * What we want:
 *   repo?blah -> !(gh 404) -> sw 302 -> repo/?blah
 *   .ext?blah -> !(sw 302 -> .ext/?blah -> gh 404) -> .ext?blah
 * If it's a navigation req and its url.pathname isn't ending with '/' or '.ext'
 * it should be a dir/repo request and needs to be fixed (a.k.a be redirected).
 * Tracking https://twitter.com/Huxpro/status/798816417097224193
 * @param {Request} req
 * @returns {boolean}
 */
const shouldRedirect = (req) => (isNavigationReq(req) && new URL(req.url).pathname.slice(-1) !== "/" && !endWithExtension(req));

/**
 * The Util Function to get redirect URL.
 * `${url}/` would mis-add "/" at the end of query, so we use the URL object.
 * P.P.S. Always trust url.pathname instead of the whole url string.
 * @param {Request} req
 * @returns {string}
 */
const getRedirectUrl = (req) => {
  const url = new URL(req.url);
  url.pathname += "/";
  return url.href;
};

/**
 *  @Lifecycle Install
 *  Precache anything static to this version of your app.
 *  e.g. App Shell, 404, JS/CSS dependencies...
 *
 *  waitUntil() : installing ====> installed
 *  skipWaiting() : waiting(installed) ====> activating
 */
sw.addEventListener('install', e => {
  e.waitUntil(
    caches.open(PRECACHE).then(async cache => {
      try {
        await cache.add('/offline/');
      } catch (err) {
        console.debug(err);
      }
      return sw.skipWaiting();
    })
  );
});


/**
 *  @Lifecycle Activate
 *  New one activated when old isnt being used.
 *  Deletes any caches not in CURRENT_CACHES to evict stale or corrupted entries.
 *
 *  waitUntil(): activating ====> activated
 */
sw.addEventListener('activate', event => {
  console.log('service worker activated.');
  event.waitUntil(
    caches.keys()
      .then(cacheNames =>
        Promise.all(
          cacheNames
            .filter(name => !CURRENT_CACHES.includes(name))
            .map(name => caches.delete(name))
        )
      )
      .then(() => sw.clients.claim())
  );
});


/**
 *  @Functional Fetch
 *  All network requests are being intercepted here.
 *
 *  void respondWith(Promise<Response> r);
 */
sw.addEventListener('fetch', event => {
  // logs for debugging
  //console.log(`fetch ${event.request.url}`);
  //console.log(` - type: ${event.request.type}; destination: ${event.request.destination}`)
  //console.log(` - mode: ${event.request.mode}, accept: ${event.request.headers.get('accept')}`)

  const requestHostname = new URL(event.request.url).hostname;

  // Never cache dev server responses — Vite's virtual module URLs (e.g.
  // ?astro&type=style, ?v=hash) change between restarts and the stale-while-
  // revalidate strategy below would serve broken cached responses in dev.
  if (requestHostname === 'localhost' || requestHostname === '127.0.0.1') {
    return;
  }

  // Skip some of cross-origin requests, like those for Google Analytics.
  if (HOSTNAME_WHITELIST.indexOf(requestHostname) > -1) {

    // Redirect in SW manually fixed github pages 404s on repo?blah
    if (shouldRedirect(event.request)) {
      event.respondWith(Response.redirect(getRedirectUrl(event.request)));
      return;
    }

    // Stale-while-revalidate
    // similar to HTTP's stale-while-revalidate: https://www.mnot.net/blog/2007/12/12/stale
    // Upgrade from Jake's to Surma's: https://gist.github.com/surma/eb441223daaedf880801ad80006389f1
    const cached = caches.match(event.request);
    const fixedUrl = getFixedUrl(event.request);
    const fetched = fetch(fixedUrl, { cache: "no-store" });
    const fetchedCopy = fetched.then(resp => resp.clone());

    // Call respondWith() with whatever we get first.
    // If the fetch fails (e.g disconnected), wait for the cache.
    // If there's nothing in cache, wait for the fetch.
    // If neither yields a response, return offline pages.
    event.respondWith(
      /** @type {Promise<Response>} */ (
        Promise.race([fetched.catch(() => cached), cached])
          .then(resp => resp || fetched)
          .catch(() => caches.match('/offline/'))
      )
    );

    // Update the cache with the version we fetched (only for ok status)
    event.waitUntil(
      Promise.all([fetchedCopy, caches.open(RUNTIME)])
        .then(([response, cache]) => { if (response.ok) cache.put(event.request, response); })
        .catch(() => {/* eat any errors */ })
    );
  }
});
