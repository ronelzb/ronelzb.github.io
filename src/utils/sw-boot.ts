/**
 * Registers the service worker in production, or unregisters any previously
 * installed SW in dev to prevent stale caching from interfering with the
 * manifest icon validation and hot-reload behaviour.
 */
export function bootServiceWorker(isProd: boolean): void {
  if (!('serviceWorker' in navigator)) return;
  if (isProd) {
    void navigator.serviceWorker.register('/sw.js');
  } else {
    void navigator.serviceWorker
      .getRegistrations()
      .then((regs) => regs.forEach((r) => void r.unregister()));
  }
}
