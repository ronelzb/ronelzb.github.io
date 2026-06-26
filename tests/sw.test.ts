import vm from 'node:vm';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { beforeEach, describe, expect, it, vi } from 'vitest';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const swCode = readFileSync(resolve(root, 'public/sw.js'), 'utf-8');

type EventHandler = (event: Record<string, unknown>) => void;

function createContext(hostname = 'ronelzb.github.io') {
  const handlers: Record<string, EventHandler> = {};
  const mockCaches = {
    keys: vi.fn().mockResolvedValue([]),
    delete: vi.fn().mockResolvedValue(true),
    open: vi.fn().mockResolvedValue({
      add: vi.fn().mockResolvedValue(undefined),
      put: vi.fn().mockResolvedValue(undefined),
    }),
    match: vi.fn().mockResolvedValue(null),
  };
  const ctx = vm.createContext({
    self: {
      location: { hostname, protocol: 'https:' },
      addEventListener: (event: string, handler: EventHandler) => {
        handlers[event] = handler;
      },
      skipWaiting: vi.fn().mockResolvedValue(undefined),
      clients: { claim: vi.fn().mockResolvedValue(undefined) },
    },
    caches: mockCaches,
    fetch: vi.fn().mockResolvedValue({ ok: true, clone: vi.fn().mockReturnThis() }),
    Response,
    URL,
    Promise,
    console,
  });
  vm.runInContext(swCode, ctx);
  return { handlers, mockCaches };
}

describe('SW — cache naming', () => {
  it('PRECACHE and RUNTIME include a version number', () => {
    expect(swCode).toMatch(/PRECACHE\s*=\s*['"]precache-v\d+['"]/);
    expect(swCode).toMatch(/RUNTIME\s*=\s*['"]runtime-v\d+['"]/);
  });

  it('CURRENT_CACHES references both PRECACHE and RUNTIME', () => {
    expect(swCode).toContain('CURRENT_CACHES');
    expect(swCode).toContain('PRECACHE');
    expect(swCode).toContain('RUNTIME');
  });
});

describe('SW — event registration', () => {
  it('registers install, activate, and fetch handlers', () => {
    const { handlers } = createContext();
    expect(handlers.install).toBeTypeOf('function');
    expect(handlers.activate).toBeTypeOf('function');
    expect(handlers.fetch).toBeTypeOf('function');
  });
});

describe('SW — fetch handler', () => {
  let handlers: Record<string, EventHandler>;

  beforeEach(() => {
    ({ handlers } = createContext());
  });

  it('bypasses cache for localhost (no respondWith)', () => {
    const respondWith = vi.fn();
    handlers.fetch({
      request: {
        url: 'http://localhost:4321/page',
        method: 'GET',
        mode: 'navigate',
        headers: { get: vi.fn().mockReturnValue('text/html') },
      },
      respondWith,
      waitUntil: vi.fn(),
    });
    expect(respondWith).not.toHaveBeenCalled();
  });

  it('bypasses cache for 127.0.0.1 (no respondWith)', () => {
    const respondWith = vi.fn();
    handlers.fetch({
      request: {
        url: 'http://127.0.0.1:4321/page',
        method: 'GET',
        mode: 'navigate',
        headers: { get: vi.fn().mockReturnValue('text/html') },
      },
      respondWith,
      waitUntil: vi.fn(),
    });
    expect(respondWith).not.toHaveBeenCalled();
  });

  it('calls respondWith for whitelisted origin requests', () => {
    const respondWith = vi.fn();
    handlers.fetch({
      request: {
        url: 'https://ronelzb.github.io/about',
        method: 'GET',
        mode: 'navigate',
        headers: { get: vi.fn().mockReturnValue('text/html') },
      },
      respondWith,
      waitUntil: vi.fn(),
    });
    expect(respondWith).toHaveBeenCalled();
  });
});

describe('SW — activate handler', () => {
  it('deletes caches not in CURRENT_CACHES', async () => {
    const { handlers, mockCaches } = createContext();
    mockCaches.keys.mockResolvedValue(['precache-v0', 'runtime-v0']);

    const promises: Promise<unknown>[] = [];
    handlers.activate({ waitUntil: (p: Promise<unknown>) => promises.push(p) });
    await Promise.all(promises);

    expect(mockCaches.delete).toHaveBeenCalledWith('precache-v0');
    expect(mockCaches.delete).toHaveBeenCalledWith('runtime-v0');
  });

  it('preserves current versioned caches', async () => {
    const { handlers, mockCaches } = createContext();
    mockCaches.keys.mockResolvedValue(['precache-v2', 'runtime-v2']);

    const promises: Promise<unknown>[] = [];
    handlers.activate({ waitUntil: (p: Promise<unknown>) => promises.push(p) });
    await Promise.all(promises);

    expect(mockCaches.delete).not.toHaveBeenCalled();
  });
});
