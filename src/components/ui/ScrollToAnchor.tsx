// src/components/ui/ScrollToAnchor.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToAnchor() {
  const { search } = useLocation();

  useEffect(() => {
    const targetId = new URLSearchParams(search).get('scrollTo');
    if (targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // ensures DOM is ready
      }
    }
  }, [search]);

  return null;
}
