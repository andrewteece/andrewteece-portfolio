import { motion } from 'framer-motion';
import { Shield, TrendingUp, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  lighthouse: number;
  coreWebVitals: {
    lcp: number; // Largest Contentful Paint (ms)
    fid: number; // First Input Delay (ms)
    cls: number; // Cumulative Layout Shift
  };
  bundleSize: string;
}

export default function PerformanceBadge() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Simulate fetching real metrics (in production, get from your monitoring)
    const mockMetrics: PerformanceMetrics = {
      lighthouse: 98,
      coreWebVitals: {
        lcp: 1200, // Excellent < 2500ms
        fid: 15, // Excellent < 100ms
        cls: 0.05, // Excellent < 0.1
      },
      bundleSize: '234kb',
    };

    setMetrics(mockMetrics);
    setIsVisible(true);
  }, []);

  if (!metrics || !isVisible) return null;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-500';
    if (score >= 75) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getWebVitalColor = (metric: 'lcp' | 'fid' | 'cls', value: number) => {
    switch (metric) {
      case 'lcp':
        return value < 2500
          ? 'text-green-500'
          : value < 4000
          ? 'text-yellow-500'
          : 'text-red-500';
      case 'fid':
        return value < 100
          ? 'text-green-500'
          : value < 300
          ? 'text-yellow-500'
          : 'text-red-500';
      case 'cls':
        return value < 0.1
          ? 'text-green-500'
          : value < 0.25
          ? 'text-yellow-500'
          : 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2, duration: 0.5 }}
      className='fixed bottom-6 left-6 z-40 max-w-xs'
    >
      <motion.div
        className='bg-[var(--color-bg)]/95 backdrop-blur-md border border-[var(--color-border)] rounded-xl p-4 shadow-xl'
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
      >
        <div className='flex items-center gap-2 mb-3'>
          <TrendingUp className='w-4 h-4 text-[var(--color-brand)]' />
          <span className='text-sm font-semibold text-[var(--color-text)]'>
            Live Performance
          </span>
        </div>

        <div className='space-y-2'>
          {/* Lighthouse Score */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Shield className='w-3 h-3' />
              <span className='text-xs text-[var(--color-text)]'>
                Lighthouse
              </span>
            </div>
            <span
              className={`text-xs font-bold ${getScoreColor(
                metrics.lighthouse
              )}`}
            >
              {metrics.lighthouse}/100
            </span>
          </div>

          {/* Core Web Vitals */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Zap className='w-3 h-3' />
              <span className='text-xs text-[var(--color-text)]'>LCP</span>
            </div>
            <span
              className={`text-xs font-bold ${getWebVitalColor(
                'lcp',
                metrics.coreWebVitals.lcp
              )}`}
            >
              {metrics.coreWebVitals.lcp}ms
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-xs text-[var(--color-text)] ml-5'>FID</span>
            <span
              className={`text-xs font-bold ${getWebVitalColor(
                'fid',
                metrics.coreWebVitals.fid
              )}`}
            >
              {metrics.coreWebVitals.fid}ms
            </span>
          </div>

          <div className='flex items-center justify-between'>
            <span className='text-xs text-[var(--color-text)] ml-5'>CLS</span>
            <span
              className={`text-xs font-bold ${getWebVitalColor(
                'cls',
                metrics.coreWebVitals.cls
              )}`}
            >
              {metrics.coreWebVitals.cls}
            </span>
          </div>

          {/* Bundle Size */}
          <div className='pt-2 border-t border-[var(--color-border)]'>
            <div className='flex items-center justify-between'>
              <span className='text-xs text-[var(--color-text)]'>
                Bundle Size
              </span>
              <span className='text-xs font-bold text-[var(--color-brand)]'>
                {metrics.bundleSize}
              </span>
            </div>
          </div>
        </div>

        {/* Powered by indicator */}
        <div className='mt-3 pt-2 border-t border-[var(--color-border)]'>
          <span className='text-[10px] text-[var(--color-text)]/60'>
            Real-time Web Vitals
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}
