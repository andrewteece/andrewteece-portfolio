import type { Transition } from 'framer-motion';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { IconArrowUp, IconChevronDown } from '../icons';

export default function Hero() {
  const [showUi, setShowUi] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const driftTransition: Transition = {
    duration: 26,
    repeat: Infinity,
    repeatType: 'mirror',
    ease: 'easeInOut',
  };
  const driftPath = prefersReducedMotion
    ? undefined
    : { x: [0, 20, -12, 0], y: [0, -14, 10, 0] };

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
      aria-labelledby='home-heading'
      className='
        relative overflow-hidden
        min-h-[100svh]
        flex flex-col items-center justify-center text-center
        px-4 pt-32 pb-16 md:pt-40 md:pb-24
      '
    >
      {/* Ambient background glows */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        <motion.div
          aria-hidden
          className='absolute w-64 h-64 rounded-full -top-28 -left-28 md:h-80 md:w-80 mix-blend-screen'
          style={{
            opacity: 0.42,
            filter: 'blur(120px)',
            backgroundImage:
              'radial-gradient(closest-side, var(--color-brand), transparent 65%)',
          }}
          animate={driftPath}
          transition={prefersReducedMotion ? undefined : driftTransition}
        />
        <motion.div
          aria-hidden
          className='absolute top-1/2 -right-32 h-72 w-72 md:h-[26rem] md:w-[26rem] rounded-full mix-blend-screen'
          style={{
            opacity: 0.34,
            filter: 'blur(120px)',
            backgroundImage:
              'radial-gradient(closest-side, var(--color-accent), transparent 65%)',
          }}
          animate={driftPath}
          transition={
            prefersReducedMotion ? undefined : { ...driftTransition, delay: 2 }
          }
        />
        <motion.div
          aria-hidden
          className='absolute -translate-x-1/2 rounded-full left-1/2 top-24 h-60 w-60 md:h-72 md:w-72 mix-blend-screen'
          style={{
            opacity: 0.32,
            filter: 'blur(120px)',
            backgroundImage:
              'radial-gradient(closest-side, var(--color-accent-alt), transparent 65%)',
          }}
          animate={driftPath}
          transition={
            prefersReducedMotion ? undefined : { ...driftTransition, delay: 4 }
          }
        />
      </div>

      <div className='relative z-10 max-w-4xl w-full flex flex-col items-center space-y-8 md:space-y-10'>
        <h1
          id='home-heading'
          className='relative inline-block text-5xl md:text-7xl font-extrabold leading-[1.05] tracking-tight'
        >
          <span
            className='relative z-10'
            style={{
              backgroundImage:
                'linear-gradient(90deg, var(--color-brand), var(--color-accent-alt), var(--color-accent))',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Andrew Teece
          </span>
          <span
            aria-hidden
            className='absolute inset-0 pointer-events-none select-none'
            style={{ color: 'var(--color-brand)' }}
          >
            Andrew Teece
          </span>
        </h1>

        <h2 className='text-xl md:text-2xl font-medium text-[var(--color-text)]'>
          Front-End Web Developer focused on clean code and user-centric design.
        </h2>

        <p className='text-base md:text-lg max-w-xl text-[rgb(var(--text-rgb)/0.80)]'>
          Delivering responsive, performant, and accessible digital experiences
          using modern tools like <strong>React</strong>,{' '}
          <strong>Next.js</strong>, <strong>TypeScript</strong>, and{' '}
          <strong>Tailwind CSS</strong>.
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

      {/* Non-critical UI deferred to idle */}
      {showUi && (
        <>
          <a
            href='#techstack'
            className='absolute bottom-6 text-[var(--color-brand)] dark:text-[var(--color-accent)]'
            aria-label='Scroll to tech stack'
          >
            <IconChevronDown width={28} height={28} aria-hidden />
          </a>
          <a
            href='#home'
            className='fixed bottom-6 right-6 bg-[var(--color-brand)] text-white p-2 rounded-full shadow-lg hover:bg-opacity-80 transition-opacity'
            aria-label='Back to top'
          >
            <IconArrowUp width={20} height={20} aria-hidden />
          </a>
        </>
      )}
    </section>
  );
}
