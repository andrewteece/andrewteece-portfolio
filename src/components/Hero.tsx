import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id='home'
      className='min-h-[70vh] flex flex-col justify-center items-center text-center px-4 py-12 bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-500'
    >
      <motion.h2
        className='text-4xl md:text-6xl font-bold text-[var(--color-brand)] mb-4'
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Frontend Developer
      </motion.h2>

      <p className='text-lg max-w-xl text-[var(--color-text)] mb-6'>
        I build fast, responsive websites using modern web technologies like
        React, TypeScript, and Tailwind CSS.
      </p>

      <div className='flex flex-wrap justify-center gap-4'>
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
      </div>
    </section>
  );
}
