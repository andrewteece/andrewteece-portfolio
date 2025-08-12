// src/components/sections/TechStack.tsx
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

type Tech = {
  label: string;
  icon: JSX.Element;
  color: string;
  link?: string;
};

const groups: Record<string, Tech[]> = {
  Frontend: [
    { label: 'HTML5', icon: <SiHtml5 />, color: 'bg-[#E34F26] text-white' },
    { label: 'CSS3', icon: <SiCss3 />, color: 'bg-[#1572B6] text-white' },
    { label: 'SASS', icon: <SiSass />, color: 'bg-[#CC6699] text-white' },
    {
      label: 'JavaScript',
      icon: <SiJavascript />,
      color: 'bg-[#F7DF1E] text-black',
    },
    {
      label: 'TypeScript',
      icon: <SiTypescript />,
      color: 'bg-[#3178C6] text-white',
    },
    { label: 'React', icon: <SiReact />, color: 'bg-[#61DAFB] text-black' },
    { label: 'Next.js', icon: <SiNextdotjs />, color: 'bg-black text-white' },
    {
      label: 'Tailwind CSS',
      icon: <SiTailwindcss />,
      color: 'bg-[#06B6D4] text-black',
    },
    {
      label: 'Bootstrap',
      icon: <SiBootstrap />,
      color: 'bg-[#7952B3] text-white',
    },
    {
      label: 'MUI',
      icon: <SiMaterialdesign />,
      color: 'bg-[#007FFF] text-white',
    },
  ],
  'Backend / Tools': [
    { label: 'Prisma', icon: <SiPrisma />, color: 'bg-[#0C344B] text-white' },
    {
      label: 'PostgreSQL',
      icon: <SiPostgresql />,
      color: 'bg-[#336791] text-white',
    },
    { label: 'MongoDB', icon: <SiMongodb />, color: 'bg-[#47A248] text-white' },
    {
      label: 'Vite',
      icon: <SiVite />,
      color: 'bg-gradient-to-r from-[#646CFF] to-[#FFD62E] text-black',
    },
    { label: 'Docker', icon: <SiDocker />, color: 'bg-[#2496ED] text-white' },
    { label: 'Vitest', icon: <SiVitest />, color: 'bg-[#6E9F18] text-white' },
    { label: 'Jest', icon: <SiJest />, color: 'bg-[#C21325] text-white' },
  ],
  Design: [
    {
      label: 'Figma',
      icon: <SiFigma />,
      color:
        'bg-gradient-to-r from-[#F24E1E] via-[#A259FF] to-[#1ABCFE] text-white',
    },
    {
      label: 'Adobe Photoshop',
      icon: <SiAdobephotoshop />,
      color: 'bg-[#31A8FF] text-black',
    },
    {
      label: 'Storybook',
      icon: <SiStorybook />,
      color:
        'bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white',
      link: 'https://sb9-showcase-b6whfr8e5-andrewteeces-projects.vercel.app/storybook/',
    },
  ],
};

function Badge({ label, icon, color, link }: Tech) {
  const content = (
    <span
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium shadow-sm border border-white/20 transition-transform duration-200 hover:scale-105 hover:brightness-110 ${color}`}
    >
      {icon}
      {label}
    </span>
  );
  return link ? (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`View ${label}`}
      className='focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 rounded-full'
    >
      {content}
    </a>
  ) : (
    content
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

      {/* Scroll cue */}
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
