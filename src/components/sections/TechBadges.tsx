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
  SiStorybook,
} from 'react-icons/si';

const allTech = [
  { name: 'React', icon: <SiReact />, color: 'bg-[#61DAFB] text-black' },
  {
    name: 'TypeScript',
    icon: <SiTypescript />,
    color: 'bg-[#3178C6] text-white',
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss />,
    color: 'bg-[#06B6D4] text-black',
  },
  {
    name: 'Framer Motion',
    icon: <SiFramer />,
    color: 'bg-[#0055FF] text-white',
  },
  { name: 'Next.js', icon: <SiNextdotjs />, color: 'bg-black text-white' },
  { name: 'HTML5', icon: <SiHtml5 />, color: 'bg-[#E34F26] text-white' },
  { name: 'CSS', icon: <SiCss3 />, color: 'bg-[#1572B6] text-white' },
  {
    name: 'Bootstrap',
    icon: <SiBootstrap />,
    color: 'bg-[#7952B3] text-white',
  },
  { name: 'MUI', icon: <SiMui />, color: 'bg-[#007FFF] text-white' },
  { name: 'Prisma', icon: <SiPrisma />, color: 'bg-[#0C344B] text-white' },
  { name: 'MongoDB', icon: <SiMongodb />, color: 'bg-[#47A248] text-white' },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql />,
    color: 'bg-[#336791] text-white',
  },
  {
    name: 'Vite',
    icon: <SiVite />,
    color: 'bg-gradient-to-r from-[#646CFF] to-[#FFD62E] text-black',
  },
  {
    name: 'Storybook',
    icon: <SiStorybook />,
    color:
      'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white',
    link: 'https://sb9-showcase-b6whfr8e5-andrewteeces-projects.vercel.app/storybook/',
  },
];

export default function TechBadges() {
  return (
    <motion.div
      className='flex flex-wrap justify-center gap-4 md:gap-6 px-1 overflow-x-auto md:overflow-visible py-2 scrollbar-thin scrollbar-thumb-[var(--color-brand)]'
      initial='hidden'
      animate='visible'
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {allTech.map(({ name, icon, color, link }) => {
        const badge = (
          <motion.span
            key={name}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium shadow-sm border border-white/20 transition-transform duration-300 ease-out hover:scale-105 hover:brightness-110 ${color}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <span className='text-base'>{icon}</span>
            {name}
          </motion.span>
        );
        return link ? (
          <a
            key={name}
            href={link}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={`View ${name}`}
          >
            {badge}
          </a>
        ) : (
          badge
        );
      })}
    </motion.div>
  );
}
