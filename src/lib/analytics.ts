// src/lib/analytics.ts
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type VitalName = 'LCP' | 'CLS' | 'INP' | 'TTFB' | 'FCP';
export interface VitalMetric {
  name: VitalName;
  value: number; // ms for LCP/INP/TTFB/FCP, unitless for CLS
  id: string; // unique ID per page load
  navigationType?: string;
}

function round(name: VitalName, v: number) {
  return name === 'CLS' ? Math.round(v * 1000) / 1000 : Math.round(v);
}

export function sendToAnalytics(metric: VitalMetric) {
  const value = round(metric.name, metric.value);

  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', metric.name, {
      value,
      metric_id: metric.id,
      metric_name: metric.name,
      metric_value: value,
      navigation_type: metric.navigationType,
      non_interaction: true,
    });
  } else if (import.meta.env.DEV) {
    console.info(
      '[Vitals]',
      metric.name,
      value,
      metric.id,
      metric.navigationType
    );
  } else {
    // navigator.sendBeacon('/api/vitals', JSON.stringify({ ...metric, value }));
  }
}
