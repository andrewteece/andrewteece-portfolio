// src/components/sections/Hero.tsx
import { ChevronDown, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { H1, H2, P } from '../shared/Section'; // ⬅️ add this

// Minimal types so TS is happy without DOM lib updates
interface IdleDeadline {
  readonly didTimeout: boolean;
  timeRemaining(): number;
}
type RequestIdleCallback = (
  cb: (dl: IdleDeadline) => void,
  opts?: { timeout?: number }
) => number;

export default function Hero() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const [showBg, setShowBg] = useState(false);
  useEffect(() => {
    const scheduleIdle = (cb: () => void) => {
      if (typeof window !== 'undefined') {
        const w = window as Window & {
          requestIdleCallback?: RequestIdleCallback;
        };
        if (typeof w.requestIdleCallback === 'function') {
          w.requestIdleCallback(() => cb());
          return;
        }
      }
      setTimeout(cb, 0);
    };
    // Load decorative BG after first paint so it never becomes LCP
    scheduleIdle(() => setShowBg(true));
  }, []);

  return (
    <section
      id='home'
      className='
        relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 py-20
        overflow-hidden
        bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-bg
        dark:from-brand/20 dark:to-bg
        [contain:content]
      '
    >
      {showBg && (
        <div
          aria-hidden
          className='absolute inset-0 z-0 bg-center bg-cover pointer-events-none opacity-20 dark:opacity-10'
          style={{ backgroundImage: "url('/images/bg-waves.webp')" }}
        />
      )}

      <div className='relative z-10 flex flex-col items-center w-full max-w-4xl space-y-6'>
        <H1 className='text-[var(--color-brand)]'>Andrew Teece</H1>

        <H2 className='text-[var(--color-text)]'>
          Front-End Web Developer focused on clean code and user-centric design.
        </H2>

        <P className='max-w-2xl text-[var(--color-text)] text-center text-lg md:text-xl'>
          Delivering responsive, performant, and accessible digital experiences
          using modern tools like <strong>React</strong>,{' '}
          <strong>Next.js</strong>, <strong>TypeScript</strong>, and{' '}
          <strong>Tailwind CSS</strong>.
        </P>

        <div className='flex flex-wrap justify-center gap-4'>
          <a href='#projects' className='btn-primary'>
            View Work
          </a>
          <a href='#contact' className='btn-outline'>
            Contact
          </a>
        </div>
      </div>

      <a
        href='#techstack'
        className='absolute bottom-6 text-[var(--color-brand)] dark:text-[var(--color-accent)] animate-bounce'
        aria-label='Scroll to tech stack'
      >
        <ChevronDown size={28} aria-hidden />
      </a>

      <a
        href='#home'
        className='fixed bottom-6 right-6 bg-[var(--color-brand)] text-white p-2 rounded-full shadow-lg hover:bg-opacity-80 transition-opacity'
        aria-label='Back to top'
      >
        <ArrowUp size={20} aria-hidden />
      </a>
    </section>
  );
}
