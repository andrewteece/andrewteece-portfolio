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

export default function TechBadges() {
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
