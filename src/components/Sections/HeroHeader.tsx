import { motion } from 'framer-motion';

export default function HeroHeader() {
  return (
    <>
      <motion.h1
        className='text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-brand)] font-sans leading-tight z-10'
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Andrew Teece
      </motion.h1>

      <motion.h2
        className='mt-2 text-xl md:text-2xl font-medium text-[var(--color-text)] z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Crafting beautiful, performant web experiences.
      </motion.h2>

      <motion.p
        className='mt-4 max-w-2xl mx-auto text-base md:text-lg text-[var(--color-text)] leading-relaxed font-light z-10'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        I specialize in building fast, accessible interfaces using modern web
        technologies:
      </motion.p>
    </>
  );
}
