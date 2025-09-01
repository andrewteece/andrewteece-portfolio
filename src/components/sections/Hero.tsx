import { useEffect, useState } from 'react';
import { IconArrowUp, IconChevronDown } from '../icons';

export default function Hero() {
  const [showUi, setShowUi] = useState(false);

  useEffect(() => {
    // Defer non-critical UI so LCP paints first
    const w = window as Window & {
      requestIdleCallback?: (
        cb: () => void,
        opts?: { timeout?: number }
      ) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    const schedule = () => setShowUi(true);
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(schedule, { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(schedule, 0);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id='home'
      className='relative min-h-[100svh] flex flex-col justify-center items-center text-center px-4 py-20 overflow-hidden'
    >
      {/* No heavy background for audits — solid page bg from CSS tokens */}

      <div className='relative z-10 max-w-4xl w-full flex flex-col items-center space-y-6'>
        {/* Make the H1 the LCP by area */}
        <h1 className='text-5xl md:text-7xl font-extrabold leading-[1.05] text-[var(--color-brand)]'>
          Andrew Teece
        </h1>

        <h2 className='text-xl md:text-2xl font-medium text-[var(--color-text)]'>
          Front-End Web Developer focused on clean code and user-centric design.
        </h2>

        {/* Slightly smaller & narrower so it doesn't become LCP */}
        <p className='text-base md:text-lg max-w-xl text-[var(--color-text)]'>
          Delivering responsive, performant, and accessible digital experiences
          using modern tools like
          <strong> React</strong>, <strong> Next.js</strong>,{' '}
          <strong> TypeScript</strong>, and
          <strong> Tailwind CSS</strong>.
        </p>

        <div className='flex flex-wrap justify-center gap-4'>
          <a href='#projects' className='btn-primary'>
            View Work
          </a>
          <a href='#contact' className='btn-outline'>
            Contact
          </a>
        </div>
      </div>

      {/* Defer non-critical icons to idle */}
      {showUi && (
        <>
          <a
            href='#techstack'
            className='absolute bottom-6 text-[var(--color-brand)] dark:text-[var(--color-accent)]'
            aria-label='Scroll to tech stack'
          >
            <IconChevronDown width={28} height={28} />
          </a>

          <a
            href='#home'
            className='fixed bottom-6 right-6 bg-[var(--color-brand)] text-white p-2 rounded-full shadow-lg hover:bg-opacity-80 transition-opacity'
            aria-label='Back to top'
          >
            <IconArrowUp width={20} height={20} />
          </a>
        </>
      )}
    </section>
  );
}
