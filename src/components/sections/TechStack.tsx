import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  SiHtml5,
  SiCss3,
  SiSass,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiBootstrap,
  SiMaterialdesign,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiVite,
  SiDocker,
  SiVitest,
  SiJest,
  SiFigma,
  SiAdobephotoshop,
  SiStorybook,
} from 'react-icons/si';
import { type ReactNode } from 'react';

// Clerk SVG icon from /public/icons/
const ClerkIcon = () => (
  <img src='/icons/clerk.svg' alt='Clerk' className='w-5 h-5' />
);

type Tech = {
  label: string;
  icon: ReactNode;
  color: string;
  glow: string;
  link?: string;
  pulse?: boolean; // only Storybook pulses (synced with hero & CTA)
};

const groups: Record<string, Tech[]> = {
  Frontend: [
    {
      label: 'HTML5',
      icon: <SiHtml5 />,
      color: 'bg-[#E34F26] text-white',
      glow: 'shadow-[0_0_8px_#E34F26]',
    },
    {
      label: 'CSS3',
      icon: <SiCss3 />,
      color: 'bg-[#1572B6] text-white',
      glow: 'shadow-[0_0_8px_#1572B6]',
    },
    {
      label: 'SASS',
      icon: <SiSass />,
      color: 'bg-[#CC6699] text-white',
      glow: 'shadow-[0_0_8px_#CC6699]',
    },
    {
      label: 'JavaScript',
      icon: <SiJavascript />,
      color: 'bg-[#F7DF1E] text-black',
      glow: 'shadow-[0_0_8px_#F7DF1E]',
    },
    {
      label: 'TypeScript',
      icon: <SiTypescript />,
      color: 'bg-[#3178C6] text-white',
      glow: 'shadow-[0_0_8px_#3178C6]',
    },
    {
      label: 'React',
      icon: <SiReact />,
      color: 'bg-[#61DAFB] text-black',
      glow: 'shadow-[0_0_8px_#61DAFB]',
    },
    {
      label: 'Next.js',
      icon: <SiNextdotjs />,
      color: 'bg-black text-white',
      glow: 'shadow-[0_0_8px_rgba(0,0,0,0.6)]',
    },
    {
      label: 'Tailwind CSS',
      icon: <SiTailwindcss />,
      color: 'bg-[#06B6D4] text-black',
      glow: 'shadow-[0_0_8px_#06B6D4]',
    },
    {
      label: 'Bootstrap',
      icon: <SiBootstrap />,
      color: 'bg-[#7952B3] text-white',
      glow: 'shadow-[0_0_8px_#7952B3]',
    },
    {
      label: 'MUI',
      icon: <SiMaterialdesign />,
      color: 'bg-[#007FFF] text-white',
      glow: 'shadow-[0_0_8px_#007FFF]',
    },
    // NEW — Clerk
    {
      label: 'Clerk',
      icon: <ClerkIcon />,
      color: 'bg-gradient-to-r from-[#6E56CF] to-[#A78BFA] text-white',
      glow: 'shadow-[0_0_8px_#A78BFA]',
      link: 'https://clerk.com',
    },
  ],
  'Backend / Tools': [
    {
      label: 'Prisma',
      icon: <SiPrisma />,
      color: 'bg-[#0C344B] text-white',
      glow: 'shadow-[0_0_8px_#0C344B]',
    },
    {
      label: 'PostgreSQL',
      icon: <SiPostgresql />,
      color: 'bg-[#336791] text-white',
      glow: 'shadow-[0_0_8px_#336791]',
    },
    {
      label: 'MongoDB',
      icon: <SiMongodb />,
      color: 'bg-[#47A248] text-white',
      glow: 'shadow-[0_0_8px_#47A248]',
    },
    {
      label: 'Vite',
      icon: <SiVite />,
      color: 'bg-gradient-to-r from-[#646CFF] to-[#FFD62E] text-black',
      glow: 'shadow-[0_0_8px_#646CFF]',
    },
    {
      label: 'Docker',
      icon: <SiDocker />,
      color: 'bg-[#2496ED] text-white',
      glow: 'shadow-[0_0_8px_#2496ED]',
    },
    {
      label: 'Vitest',
      icon: <SiVitest />,
      color: 'bg-[#6E9F18] text-white',
      glow: 'shadow-[0_0_8px_#6E9F18]',
    },
    {
      label: 'Jest',
      icon: <SiJest />,
      color: 'bg-[#C21325] text-white',
      glow: 'shadow-[0_0_8px_#C21325]',
    },
  ],
  Design: [
    {
      label: 'Figma',
      icon: <SiFigma />,
      color:
        'bg-gradient-to-r from-[#F24E1E] via-[#A259FF] to-[#1ABCFE] text-white',
      glow: 'shadow-[0_0_8px_#A259FF]',
    },
    {
      label: 'Adobe Photoshop',
      icon: <SiAdobephotoshop />,
      color: 'bg-[#31A8FF] text-black',
      glow: 'shadow-[0_0_8px_#31A8FF]',
    },
    {
      label: 'Storybook',
      icon: <SiStorybook />,
      color:
        'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white',
      glow: 'shadow-[0_0_8px_#FF4785]',
      link: 'https://sb9-showcase-b6whfr8e5-andrewteeces-projects.vercel.app/storybook/',
      pulse: true,
    },
  ],
};

function Badge({ label, icon, color, glow, link, pulse }: Tech) {
  const inner = (
    <motion.span
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/20 shadow-sm ${glow} ${color}
                  transition-transform duration-200 hover:scale-105 hover:brightness-110`}
      {...(pulse
        ? {
            animate: {
              boxShadow: [
                '0 0 8px var(--color-brand)',
                '0 0 16px var(--color-brand)',
                '0 0 8px var(--color-brand)',
              ],
            },
            transition: {
              boxShadow: {
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 3,
                ease: 'easeInOut',
              },
            },
          }
        : {})}
    >
      {icon}
      {label}
    </motion.span>
  );

  return link ? (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`View ${label}`}
      className='focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 rounded-full'
    >
      {inner}
    </a>
  ) : (
    inner
  );
}

export default function TechStack() {
  return (
    <motion.section
      id='techstack'
      className='relative max-w-6xl px-4 py-24 mx-auto text-center'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className='text-3xl md:text-4xl font-bold text-[var(--color-brand)] mb-4'>
        My Tech Stack
      </h2>
      <p className='text-lg text-[var(--color-text)] max-w-2xl mx-auto mb-10'>
        Tools I use to build performant, scalable, and accessible web apps.
      </p>

      <div className='border-t border-[var(--color-border)] mb-10 w-full' />

      {Object.entries(groups).map(([category, items]) => (
        <div key={category} className='mb-12'>
          <h3 className='text-xl font-semibold text-[var(--color-text)] mb-4'>
            {category}
          </h3>
          <div className='flex flex-wrap justify-center gap-3 md:gap-4'>
            {items.map((tech) => (
              <Badge key={tech.label} {...tech} />
            ))}
          </div>
        </div>
      ))}

      <a
        href='#projects'
        className='absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--color-brand)] dark:text-[var(--color-accent)] animate-bounce'
        aria-label='Scroll to projects'
      >
        <ChevronDown size={28} />
      </a>
    </motion.section>
  );
}
