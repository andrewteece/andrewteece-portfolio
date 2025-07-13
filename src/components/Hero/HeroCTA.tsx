import { motion } from 'framer-motion';

export default function HeroCTA() {
  return (
    <motion.div
      className='mt-10 flex flex-wrap justify-center gap-4 z-10'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <a
        href='#projects'
        className='px-6 py-2 bg-[var(--color-brand)] text-white rounded-xl text-sm md:text-base font-medium hover:bg-opacity-90 transition-colors'
      >
        View Work
      </a>
      <a
        href='#contact'
        className='px-6 py-2 border border-[var(--color-brand)] text-[var(--color-brand)] rounded-xl text-sm md:text-base font-medium hover:bg-[var(--color-brand)] hover:text-white transition-colors'
      >
        Contact
      </a>
    </motion.div>
  );
}
