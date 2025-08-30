import type { Transition } from 'framer-motion';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, ChevronDown } from 'lucide-react';
import { useEffect } from 'react';

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  // Slower + smoother motion
  const driftTransition: Transition = {
    duration: 26,
    repeat: Infinity,
    repeatType: 'mirror',
    ease: 'easeInOut',
  };

  const driftPath = prefersReducedMotion
    ? undefined
    : { x: [0, 24, -8, 0], y: [0, -18, 12, 0] };

  return (
    <section
      id='home'
      aria-label='Intro section'
      className='relative min-h-[55svh] md:min-h-[76vh] pt-24 md:pt-28 pb-8 md:pb-10 flex flex-col items-center justify-start md:justify-center text-center px-4 overflow-hidden'
    >
      {/* Ambient background orbs (theme-aware) */}
      <div className='absolute inset-0 z-0 pointer-events-none'>
        {/* Top-left orb */}
        <motion.div
          aria-hidden
          className='absolute w-64 h-64 rounded-full -top-28 -left-28 md:-top-32 md:-left-32 sm:h-72 sm:w-72 md:h-96 md:w-96 mix-blend-screen'
          style={{
            opacity: 0.5,
            filter: 'blur(120px)',
            willChange: 'transform, filter',
            backgroundImage:
              'radial-gradient(closest-side, var(--color-brand), transparent 65%)',
          }}
          animate={driftPath}
          transition={prefersReducedMotion ? undefined : driftTransition}
        />

        {/* Bottom-right orb (changed to accent-alt) */}
        <motion.div
          aria-hidden
          className='absolute -bottom-28 -right-28 md:-bottom-32 md:-right-32 h-72 w-72 sm:h-88 sm:w-88 md:h-[28rem] md:w-[28rem] rounded-full mix-blend-screen'
          style={{
            opacity: 0.42,
            filter: 'blur(120px)',
            willChange: 'transform, filter',
            backgroundImage:
              'radial-gradient(closest-side, var(--color-accent-alt), transparent 65%)',
          }}
          animate={driftPath}
          transition={
            prefersReducedMotion ? undefined : { ...driftTransition, delay: 2 }
          }
        />

        {/* Center glow */}
        <motion.div
          aria-hidden
          className='absolute w-64 h-64 -translate-x-1/2 -translate-y-1/2 rounded-full left-1/2 top-1/2 sm:h-72 sm:w-72 md:h-80 md:w-80 mix-blend-screen'
          style={{
            opacity: 0.42,
            filter: 'blur(120px)',
            willChange: 'transform, filter',
            backgroundImage:
              'radial-gradient(closest-side, var(--color-accent-alt), transparent 65%)',
          }}
          animate={driftPath}
          transition={
            prefersReducedMotion ? undefined : { ...driftTransition, delay: 4 }
          }
        />
      </div>

      {/* Content */}
      <div className='relative z-10 flex flex-col items-center w-full max-w-4xl gap-4 md:gap-6'>
        <h1 className='relative text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-6xl'>
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

        <h2 className='text-base sm:text-lg md:text-2xl font-medium text-[var(--color-text)] tracking-tight max-w-2xl'>
          Front-End Web Developer focused on clean code and user-centric design.
        </h2>

        <motion.p
          className='text-sm sm:text-base md:text-xl max-w-2xl text-[var(--color-text)]'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          Delivering responsive, performant, and accessible digital experiences
          using modern tools like <strong>React</strong>,{' '}
          <strong>Next.js</strong>, <strong>TypeScript</strong>, and{' '}
          <strong>Tailwind CSS</strong>.
        </motion.p>

        <motion.div
          className='flex flex-wrap justify-center gap-3 mt-1 md:mt-2 md:gap-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.2 }}
        >
          <a href='#projects' className='btn-primary'>
            View Work
          </a>
          <a href='#contact' className='btn-outline'>
            Contact
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <a
        href='#techstack'
        className='absolute -translate-x-1/2 bottom-8 left-1/2 text-brand dark:text-accent animate-bounce'
        aria-label='Scroll to tech stack'
      >
        <ChevronDown size={28} />
      </a>

      {/* Back to top */}
      <a
        href='#home'
        className='fixed p-2 text-white transition-opacity rounded-full shadow-lg bottom-6 right-6 bg-brand hover:bg-opacity-80'
        aria-label='Back to top'
      >
        <ArrowUp size={20} />
      </a>
    </section>
  );
}
