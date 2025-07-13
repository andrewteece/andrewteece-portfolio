import { motion } from 'framer-motion';
import HeroHeader from './Hero/HeroHeader';
import TechBadges from './Hero/TechBadges';
import HeroCTA from './Hero/HeroCTA';

export default function Hero() {
  return (
    <motion.section
      id='home'
      className='relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 py-20 overflow-hidden bg-gradient-to-b from-[var(--color-brand)]/10 via-transparent to-[var(--color-bg)] dark:from-white/5 dark:to-[var(--color-bg)]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Subtle noise layer */}
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.12] dark:opacity-[0.08] pointer-events-none z-0" />

      <div className='relative z-10 max-w-4xl w-full flex flex-col items-center'>
        <HeroHeader />
        <div className='mt-6 w-full'>
          <TechBadges />
        </div>
        <HeroCTA />
      </div>
    </motion.section>
  );
}
