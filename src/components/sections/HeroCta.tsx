import { motion } from 'framer-motion';

export default function HeroCTA() {
  return (
    <div className='z-10 flex flex-col justify-center gap-4 mt-8 sm:flex-row'>
      <motion.a
        href='#projects'
        className='px-6 py-3 rounded-full font-semibold text-white bg-[var(--color-brand)] shadow-lg'
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          boxShadow: [
            '0 0 8px var(--color-brand)',
            '0 0 16px var(--color-brand)',
            '0 0 8px var(--color-brand)',
          ],
        }}
        transition={{
          duration: 0.6,
          boxShadow: {
            repeat: Infinity,
            repeatType: 'mirror',
            duration: 3, // sync with hero & Storybook badges
            ease: 'easeInOut',
          },
        }}
      >
        View My Work
      </motion.a>

      <motion.a
        href='#contact'
        className='px-6 py-3 rounded-full font-semibold text-[var(--color-brand)] border border-[var(--color-brand)] bg-transparent hover:bg-[var(--color-brand)] hover:text-white transition-colors'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Get In Touch
      </motion.a>
    </div>
  );
}
