import { motion } from 'framer-motion';
import { H1, H2, P } from '../shared/Section';

export default function HeroHeader() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{
          opacity: 1,
          y: 0,
          filter: [
            'drop-shadow(0 0 0 var(--color-brand))',
            'drop-shadow(0 0 16px var(--color-brand))',
            'drop-shadow(0 0 0 var(--color-brand))',
          ],
        }}
        transition={{
          duration: 0.6,
          filter: {
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 3,
            ease: 'easeInOut',
          },
        }}
        className='z-10'
      >
        <H1 className='font-extrabold text-[var(--color-brand)]'>
          Andrew Teece
        </H1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <H2 className='mt-2 text-[var(--color-text)]'>
          Crafting beautiful, performant web experiences.
        </H2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <P className='mt-4 mx-auto max-w-2xl text-[var(--color-text)] leading-relaxed font-light'>
          I specialize in building fast, accessible interfaces using modern web
          technologies:
        </P>
      </motion.div>
    </>
  );
}
