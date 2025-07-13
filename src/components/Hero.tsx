import { motion } from 'framer-motion';
import HeroHeader from '../components/Hero/HeroHeader';
import TechBadges from '../components/Hero/TechBadges';
import HeroCTA from '../components/Hero/HeroCTA';

export default function Hero() {
  return (
    <motion.section
      id='home'
      className='relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 py-20 overflow-hidden bg-gradient-to-br from-[var(--color-brand)]/10 via-transparent to-[var(--color-bg)]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className='max-w-4xl w-full flex flex-col items-center'>
        <HeroHeader />
        <div className='mt-6 w-full'>
          <TechBadges />
        </div>
        <HeroCTA />
      </div>
    </motion.section>
  );
}
