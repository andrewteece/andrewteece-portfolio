// src/components/ui/ScrollToTop.tsx
import { ArrowUp } from 'lucide-react';

export default function ScrollToTop() {
  return (
    <a
      href='#home'
      className='fixed bottom-6 right-6 bg-[var(--color-brand)] text-white p-2 rounded-full shadow-lg hover:bg-opacity-80 transition-opacity z-50'
      aria-label='Back to top'
    >
      <ArrowUp size={20} />
    </a>
  );
}
