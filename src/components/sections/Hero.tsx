// src/components/sections/Hero.tsx
import { motion } from 'framer-motion';
import { ChevronDown, ArrowUp } from 'lucide-react';
import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <motion.section
      id='home'
      className='relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 py-20 overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-bg dark:from-brand/20 dark:to-bg'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Decorative background moved to CSS so it's NOT a candidate for LCP */}
      <div
        aria-hidden
        className='absolute inset-0 z-0 bg-center bg-cover pointer-events-none opacity-20 dark:opacity-10'
        style={{ backgroundImage: "url('/images/bg-waves.webp')" }}
      />

      <div className='relative z-10 flex flex-col items-center w-full max-w-4xl space-y-6'>
        <motion.h1
          className='text-4xl md:text-6xl font-bold text-[var(--color-brand)]'
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Andrew Teece
        </motion.h1>

        <motion.h2
          className='text-xl md:text-2xl font-medium text-[var(--color-text)]'
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Front-End Web Developer focused on clean code and user-centric design.
        </motion.h2>

        <motion.p
          className='text-lg md:text-xl max-w-2xl text-[var(--color-text)] text-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Delivering responsive, performant, and accessible digital experiences
          using modern tools like <strong>React</strong>,{' '}
          <strong>Next.js</strong>, <strong>TypeScript</strong>, and{' '}
          <strong>Tailwind CSS</strong>.
        </motion.p>

        <motion.div
          className='flex flex-wrap justify-center gap-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <a href='#projects' className='btn-primary'>
            View Work
          </a>
          <a href='#contact' className='btn-outline'>
            Contact
          </a>
        </motion.div>
      </div>

      {/* Scroll cue to next section */}
      <a
        href='#techstack'
        className='absolute bottom-6 text-[var(--color-brand)] dark:text-[var(--color-accent)] animate-bounce'
        aria-label='Scroll to tech stack'
      >
        <ChevronDown size={28} />
      </a>

      {/* Back to top button */}
      <a
        href='#home'
        className='fixed bottom-6 right-6 bg-[var(--color-brand)] text-white p-2 rounded-full shadow-lg hover:bg-opacity-80 transition-opacity'
        aria-label='Back to top'
      >
        <ArrowUp size={20} />
      </a>
    </motion.section>
  );
}
