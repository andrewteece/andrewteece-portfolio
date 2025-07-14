// src/components/sections/Footer.tsx
import { motion } from 'framer-motion';
import SocialLinks from '../components/SocialLinks';

export default function Footer() {
  return (
    <footer
      id='contact'
      className='relative overflow-hidden py-10 px-4 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-brand/10 via-transparent to-bg dark:from-brand/20 dark:to-bg'
    >
      {/* Background mesh gradient image */}
      <div className='absolute inset-0 rotate-180'>
        <img
          src='images/bg-waves.png'
          alt='Footer mesh background'
          className='w-full h-full object-cover opacity-20 dark:opacity-10 z-0'
          aria-hidden
        />
      </div>

      <div className='relative z-10 flex flex-col items-center gap-4 text-center'>
        <motion.p
          className='text-sm text-[var(--color-text)]'
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          © {new Date().getFullYear()} Andrew Teece. All rights reserved.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <SocialLinks className='justify-center gap-4' />
        </motion.div>
      </div>
    </footer>
  );
}
