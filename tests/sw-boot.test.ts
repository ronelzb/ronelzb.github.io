import { afterEach, describe, expect, it, vi } from 'vitest';
import { bootServiceWorker } from '../src/utils/sw-boot';

function stubNavigator(registrations: { unregister: () => Promise<boolean> }[] = []) {
  const register = vi.fn().mockResolvedValue(undefined);
  const getRegistrations = vi.fn().mockResolvedValue(registrations);
  vi.stubGlobal('navigator', { serviceWorker: { register, getRegistrations } });
  return { register, getRegistrations };
}

describe('bootServiceWorker — prod', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('registers /sw.js', () => {
    const { register } = stubNavigator();
    bootServiceWorker(true);
    expect(register).toHaveBeenCalledWith('/sw.js');
  });

  it('does not touch getRegistrations', () => {
    const { getRegistrations } = stubNavigator();
    bootServiceWorker(true);
    expect(getRegistrations).not.toHaveBeenCalled();
  });
});

describe('bootServiceWorker — dev', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('does not register /sw.js', () => {
    const { register } = stubNavigator();
    bootServiceWorker(false);
    expect(register).not.toHaveBeenCalled();
  });

  it('unregisters each existing SW', async () => {
    const unregister = vi.fn().mockResolvedValue(true);
    const { getRegistrations } = stubNavigator([{ unregister }, { unregister }]);
    bootServiceWorker(false);
    await Promise.resolve();
    expect(getRegistrations).toHaveBeenCalled();
    expect(unregister).toHaveBeenCalledTimes(2);
  });

  it('handles zero registered SWs without error', async () => {
    const { getRegistrations } = stubNavigator([]);
    bootServiceWorker(false);
    await Promise.resolve();
    expect(getRegistrations).toHaveBeenCalled();
  });
});

describe('bootServiceWorker — no SW support', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('does nothing when serviceWorker is absent from navigator', () => {
    vi.stubGlobal('navigator', {});
    expect(() => bootServiceWorker(true)).not.toThrow();
    expect(() => bootServiceWorker(false)).not.toThrow();
  });
});
