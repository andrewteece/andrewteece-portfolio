import { motion } from 'framer-motion';
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiFramer,
  SiNextdotjs,
  SiHtml5,
  SiCss3,
  SiBootstrap,
  SiVite,
  SiPrisma,
  SiMongodb,
  SiPostgresql,
  SiMui,
} from 'react-icons/si';

const allTech = [
  { name: 'React', icon: <SiReact /> },
  { name: 'TypeScript', icon: <SiTypescript /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
  { name: 'Framer Motion', icon: <SiFramer /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'HTML5', icon: <SiHtml5 /> },
  { name: 'CSS', icon: <SiCss3 /> },
  { name: 'Bootstrap', icon: <SiBootstrap /> },
  { name: 'MUI', icon: <SiMui /> },
  { name: 'Prisma', icon: <SiPrisma /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'PostgreSQL', icon: <SiPostgresql /> },
  { name: 'Vite', icon: <SiVite /> },
];

function TechBadges() {
  return (
    <motion.div
      className='flex flex-wrap justify-center gap-4 md:gap-6 px-1 overflow-x-auto md:overflow-visible py-2 scrollbar-thin scrollbar-thumb-[var(--color-brand)]'
      initial='hidden'
      animate='visible'
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      {allTech.map(({ name, icon }) => (
        <motion.span
          key={name}
          className='flex-shrink-0 flex items-center gap-2 px-4 py-1 bg-white/30 dark:bg-white/10 backdrop-blur border border-white/20 rounded-full text-sm font-medium text-[var(--color-text)] hover:scale-105 hover:bg-white/40 dark:hover:bg-white/20 transition-transform duration-300 ease-out shadow-sm'
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <span className='text-base'>{icon}</span>
          {name}
        </motion.span>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <motion.section
      id='home'
      className='relative min-h-[80vh] flex flex-col justify-center items-center text-center px-4 py-20 overflow-hidden bg-gradient-to-br from-[var(--color-brand)]/10 via-transparent to-[var(--color-bg)]'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Hero Content Wrapper */}
      <div className='max-w-4xl w-full flex flex-col items-center'>
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

        <div className='mt-6 w-full'>
          <TechBadges />
        </div>

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
      </div>
    </motion.section>
  );
}
