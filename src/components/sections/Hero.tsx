import { motion } from 'framer-motion';
import { ChevronDown, ArrowUp } from 'lucide-react';
import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <section
      id='home'
      /* Mobile: more top space and a little more bottom padding
         Desktop: centered and comfy */
      className='relative min-h-[50svh] md:min-h-[76vh] pt-24 md:pt-28 pb-6 md:pb-10 flex flex-col items-center justify-start md:justify-center text-center px-4 overflow-hidden'
      aria-label='Intro section'
    >
      <div className='relative z-10 flex flex-col items-center w-full max-w-4xl gap-4 md:gap-6'>
        <h1 className='text-3xl sm:text-4xl md:text-6xl font-bold text-[var(--color-brand)] tracking-tight leading-tight'>
          Andrew Teece
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
          className='flex flex-wrap justify-center gap-3 mt-1 md:gap-4 md:mt-2'
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

      {/* Chevron pinned & centered, lifted slightly so the gap reads cleaner */}
      <a
        href='#techstack'
        className='absolute bottom-8 left-1/2 -translate-x-1/2 text-[var(--color-brand)] dark:text-[var(--color-accent)] animate-bounce'
        aria-label='Scroll to tech stack'
      >
        <ChevronDown size={28} />
      </a>

      {/* Back to top (fixed) */}
      <a
        href='#home'
        className='fixed bottom-6 right-6 bg-[var(--color-brand)] text-white p-2 rounded-full shadow-lg hover:bg-opacity-80 transition-opacity'
        aria-label='Back to top'
      >
        <ArrowUp size={20} />
      </a>
    </section>
  );
}
