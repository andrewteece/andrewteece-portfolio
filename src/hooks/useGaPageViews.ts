// src/hooks/useGaPageViews.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useGaPageViews(measurementId: string) {
  const { pathname, search } = useLocation();
  useEffect(() => {
    if (typeof window.gtag !== 'function') return;
    window.gtag('config', measurementId, { page_path: pathname + search });
  }, [pathname, search, measurementId]);
}
