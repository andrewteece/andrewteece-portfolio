// src/components/sections/TechStack.tsx
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiPrisma,
  SiPostgresql,
  SiMongodb,
  SiVite,
  SiMaterialdesign,
  SiSass,
  SiBootstrap,
  SiDocker,
  SiFigma,
  SiAdobephotoshop,
} from 'react-icons/si';

const techGroups = {
  Frontend: [
    { label: 'HTML5', icon: <SiHtml5 /> },
    { label: 'CSS3', icon: <SiCss3 /> },
    { label: 'SASS', icon: <SiSass /> },
    { label: 'JavaScript', icon: <SiJavascript /> },
    { label: 'TypeScript', icon: <SiTypescript /> },
    { label: 'React', icon: <SiReact /> },
    { label: 'Next.js', icon: <SiNextdotjs /> },
    { label: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { label: 'Bootstrap', icon: <SiBootstrap /> },
    { label: 'MUI', icon: <SiMaterialdesign /> },
  ],
  'Backend / Tools': [
    { label: 'Prisma', icon: <SiPrisma /> },
    { label: 'PostgreSQL', icon: <SiPostgresql /> },
    { label: 'MongoDB', icon: <SiMongodb /> },
    { label: 'Vite', icon: <SiVite /> },
    { label: 'Docker', icon: <SiDocker /> },
  ],
  Design: [
    { label: 'Figma', icon: <SiFigma /> },
    { label: 'Adobe Photoshop', icon: <SiAdobephotoshop /> },
  ],
};

export default function TechStack() {
  return (
    <motion.section
      id='techstack'
      className='relative py-24 px-4 text-center max-w-6xl mx-auto'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className='text-3xl md:text-4xl font-bold text-[var(--color-brand)] mb-4'>
        My Tech Stack
      </h2>
      <p className='text-lg text-[var(--color-text)] max-w-2xl mx-auto mb-10'>
        I use a variety of modern technologies to build performant, scalable,
        and maintainable web applications. Here's a selection of tools I use
        daily:
      </p>

      <div className='border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] mb-10 w-full'></div>

      {Object.entries(techGroups).map(([category, items]) => (
        <div key={category} className='mb-12'>
          <h3 className='text-xl font-semibold text-[var(--color-text)] mb-4'>
            {category}
          </h3>
          <div className='flex flex-wrap justify-center gap-4'>
            {items.map((tech) => (
              <span
                key={tech.label}
                className='flex items-center gap-2 bg-[var(--color-bg-alt)] text-[var(--color-text)] border border-[var(--color-border)] px-4 py-2 rounded-lg shadow-sm text-sm font-medium hover:bg-[var(--color-accent)] hover:text-white transition'
              >
                {tech.icon}
                {tech.label}
              </span>
            ))}
          </div>
        </div>
      ))}

      {/* Scroll cue to next section */}
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
