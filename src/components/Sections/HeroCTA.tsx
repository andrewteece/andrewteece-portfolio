import { motion } from 'framer-motion';

export default function HeroCTA() {
  return (
    <motion.div
      className='mt-10 flex flex-wrap justify-center gap-4 z-10'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
    >
      <a href='#projects' className='btn-primary'>
        View Work
      </a>
      <a href='#contact' className='btn-outline'>
        Contact
      </a>
    </motion.div>
  );
}
