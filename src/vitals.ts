// src/vitals.ts
import { onCLS, onINP, onLCP, onTTFB, onFCP, type Metric } from 'web-vitals';
import { sendToAnalytics, type VitalName } from './lib/analytics';

const report = (name: VitalName) => (m: Metric) =>
  sendToAnalytics({
    name,
    value: m.value,
    id: m.id,
    navigationType: m.navigationType,
  });

onLCP(report('LCP'));
onCLS(report('CLS'));
onINP(report('INP'));
onTTFB(report('TTFB'));
onFCP(report('FCP'));
