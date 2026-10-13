// src/components/ui/ScrollToAnchor.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToAnchor() {
  const { hash, search } = useLocation();

  useEffect(() => {
    const targetId = new URLSearchParams(search).get('scrollTo') ?? hash.slice(1);
    if (!targetId) return;

    let timeout: ReturnType<typeof setTimeout> | undefined;
    const observer = new MutationObserver(() => {
      const target = document.getElementById(targetId);
      if (target) {
        observer.disconnect();
        if (timeout) clearTimeout(timeout);
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    const target = document.getElementById(targetId);
    if (target) {
      timeout = setTimeout(
        () => target.scrollIntoView({ behavior: 'smooth', block: 'start' }),
        100
      );
    } else {
      observer.observe(document.body, { childList: true, subtree: true });
      timeout = setTimeout(() => observer.disconnect(), 3000);
    }

    return () => {
      observer.disconnect();
      if (timeout) clearTimeout(timeout);
    };
  }, [hash, search]);

  return null;
}
