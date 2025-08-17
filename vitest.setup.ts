import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

/** matchMedia polyfill for JSDOM */
if (typeof window !== 'undefined' && !window.matchMedia) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

/** ResizeObserver polyfill (used by some UI libs) */
if (typeof window !== 'undefined' && !('ResizeObserver' in window)) {
  class MockResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).ResizeObserver = MockResizeObserver;
}

/** IntersectionObserver polyfill (lazy-images, etc.) */
if (
  typeof globalThis !== 'undefined' &&
  !('IntersectionObserver' in globalThis)
) {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin = '0px';
    readonly thresholds: ReadonlyArray<number> = [0];
    disconnect = vi.fn();
    observe = vi.fn();
    takeRecords = vi.fn(() => []);
    unobserve = vi.fn();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(_cb: any, _opts?: any) {}
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).IntersectionObserver = MockIntersectionObserver;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (globalThis as any).IntersectionObserverEntry = class {};
}

/** Quiet “unused variable” warnings for global crypto in some envs */
if (typeof globalThis.crypto !== 'undefined') {
  void (globalThis.crypto as unknown as Record<string, unknown>);
}
