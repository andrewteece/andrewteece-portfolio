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
  {
    name: 'React',
    icon: <SiReact />,
    color: 'bg-[#61DAFB] text-black',
    glow: 'shadow-[0_0_8px_#61DAFB]',
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript />,
    color: 'bg-[#3178C6] text-white',
    glow: 'shadow-[0_0_8px_#3178C6]',
  },
  {
    name: 'Tailwind CSS',
    icon: <SiTailwindcss />,
    color: 'bg-[#06B6D4] text-black',
    glow: 'shadow-[0_0_8px_#06B6D4]',
  },
  {
    name: 'Framer Motion',
    icon: <SiFramer />,
    color: 'bg-[#0055FF] text-white',
    glow: 'shadow-[0_0_8px_#0055FF]',
  },
  {
    name: 'Next.js',
    icon: <SiNextdotjs />,
    color: 'bg-black text-white',
    glow: 'shadow-[0_0_8px_rgba(0,0,0,0.6)]',
  },
  {
    name: 'HTML5',
    icon: <SiHtml5 />,
    color: 'bg-[#E34F26] text-white',
    glow: 'shadow-[0_0_8px_#E34F26]',
  },
  {
    name: 'CSS',
    icon: <SiCss3 />,
    color: 'bg-[#1572B6] text-white',
    glow: 'shadow-[0_0_8px_#1572B6]',
  },
  {
    name: 'Bootstrap',
    icon: <SiBootstrap />,
    color: 'bg-[#7952B3] text-white',
    glow: 'shadow-[0_0_8px_#7952B3]',
  },
  {
    name: 'MUI',
    icon: <SiMui />,
    color: 'bg-[#007FFF] text-white',
    glow: 'shadow-[0_0_8px_#007FFF]',
  },
  {
    name: 'Prisma',
    icon: <SiPrisma />,
    color: 'bg-[#0C344B] text-white',
    glow: 'shadow-[0_0_8px_#0C344B]',
  },
  {
    name: 'MongoDB',
    icon: <SiMongodb />,
    color: 'bg-[#47A248] text-white',
    glow: 'shadow-[0_0_8px_#47A248]',
  },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql />,
    color: 'bg-[#336791] text-white',
    glow: 'shadow-[0_0_8px_#336791]',
  },
  {
    name: 'Vite',
    icon: <SiVite />,
    color: 'bg-gradient-to-r from-[#646CFF] to-[#FFD62E] text-black',
    glow: 'shadow-[0_0_8px_#646CFF]',
  },
  {
    name: 'Storybook',
    icon: <SiStorybook />,
    color:
      'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white',
    glow: 'shadow-[0_0_8px_#FF4785]',
    link: 'https://sb9-showcase-b6whfr8e5-andrewteeces-projects.vercel.app/storybook/',
    pulse: true, // synced 3s pulse
  },
  // NEW — Clerk
  {
    name: 'Clerk',
    icon: <img src='/icons/clerk.svg' alt='Clerk' className='w-4 h-4' />,
    color: 'bg-gradient-to-r from-[#6E56CF] to-[#A78BFA] text-white',
    glow: 'shadow-[0_0_8px_#A78BFA]',
    link: 'https://clerk.com',
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
      {allTech.map(({ name, icon, color, glow, link, pulse }) => {
        const badge = (
          <motion.span
            key={name}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium border border-white/20 ${glow} shadow-sm transition-transform duration-300 ease-out hover:scale-105 hover:brightness-110 ${color}`}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              ...(pulse
                ? {
                    boxShadow: [
                      '0 0 8px var(--color-brand)',
                      '0 0 16px var(--color-brand)',
                      '0 0 8px var(--color-brand)',
                    ],
                  }
                : {}),
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              ...(pulse
                ? {
                    boxShadow: {
                      repeat: Infinity,
                      repeatType: 'mirror',
                      duration: 3,
                      ease: 'easeInOut',
                    },
                  }
                : {}),
            }}
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
