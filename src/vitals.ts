// src/metrics/vitals.ts
import type { Metric } from 'web-vitals';

type Vitals = 'CLS' | 'INP' | 'LCP' | 'TTFB';

function log(m: Metric) {
  const rounded = m.name === 'CLS' ? m.value : Math.round(m.value);
  // Simple console reporter (production-safe). Swap to sendBeacon when ready.
  // Example payload if you wire an endpoint:
  // const body = JSON.stringify({ id: m.id, name: m.name, value: m.value, rating: m.rating, path: location.pathname });
  // navigator.sendBeacon('/vitals', body);
  console.log('[Vitals]', m.name as Vitals, rounded, m.rating, {
    id: m.id,
    path: location.pathname,
  });
}

export function initWebVitalsLogging() {
  if (typeof window === 'undefined') return;
  // Load lazily so it never impacts TTI
  import('web-vitals')
    .then(({ onCLS, onINP, onLCP, onTTFB }) => {
      onCLS(log);
      onINP(log);
      onLCP(log);
      onTTFB(log);
    })
    .catch(() => {
      /* noop */
    });
}
