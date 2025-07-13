import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id='home'
      className='relative min-h-[70vh] flex flex-col justify-center items-center text-center px-4 py-12 overflow-hidden'
    >
      <img
        src='/workspace.webp'
        alt='Modern developer workspace with glowing screens'
        className='absolute inset-0 w-full h-full object-cover opacity-30 dark:opacity-20 z-0 pointer-events-none'
        loading='lazy'
        aria-hidden
      />

      <div className='absolute inset-0 backdrop-brightness-90 dark:backdrop-brightness-50 -z-10 pointer-events-none' />
      {/* Animated Heading */}
      <motion.h2
        className='text-4xl md:text-6xl font-bold text-[var(--color-brand)] mb-4'
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Frontend Developer
      </motion.h2>

      {/* Animated Subtext */}
      <motion.p
        className='text-lg max-w-xl text-[var(--color-text)] mb-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        I build fast, responsive websites using modern web technologies like
        React, TypeScript, and Tailwind CSS.
      </motion.p>

      {/* Buttons */}
      <motion.div
        className='flex flex-wrap justify-center gap-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <a
          href='#projects'
          className='px-6 py-2 bg-[var(--color-brand)] text-white rounded-xl hover:bg-opacity-90 transition-colors'
        >
          View Work
        </a>
        <a
          href='#contact'
          className='px-6 py-2 border border-[var(--color-brand)] text-[var(--color-brand)] rounded-xl hover:bg-[var(--color-accent)] hover:text-white transition-colors'
        >
          Contact
        </a>
      </motion.div>
    </section>
  );
}
