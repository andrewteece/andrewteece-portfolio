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
} from 'react-icons/si';

const groups = [
  {
    title: 'Languages',
    items: [
      { label: 'HTML5', icon: <SiHtml5 /> },
      { label: 'CSS3', icon: <SiCss3 /> },
      { label: 'JavaScript', icon: <SiJavascript /> },
      { label: 'TypeScript', icon: <SiTypescript /> },
    ],
  },
  {
    title: 'Frameworks',
    items: [
      { label: 'React', icon: <SiReact /> },
      { label: 'Next.js', icon: <SiNextdotjs /> },
    ],
  },
  {
    title: 'Styling',
    items: [
      { label: 'Tailwind CSS', icon: <SiTailwindcss /> },
      { label: 'MUI', icon: <SiMaterialdesign /> },
    ],
  },
  {
    title: 'Tools & Databases',
    items: [
      { label: 'Prisma', icon: <SiPrisma /> },
      { label: 'PostgreSQL', icon: <SiPostgresql /> },
      { label: 'MongoDB', icon: <SiMongodb /> },
      { label: 'Vite', icon: <SiVite /> },
    ],
  },
];

import { useEffect, useRef, useState, useContext } from 'react';
import { ActiveSectionContext } from '../../context/ActiveSectionContext';

export default function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setActiveSection } = useContext(ActiveSectionContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsActive(visible);
        if (visible) setActiveSection('techstack');
      },
      { threshold: 0.6 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);
  return (
    <motion.section
      ref={sectionRef}
      id='techstack'
      data-active={isActive}
      className='relative py-24 px-4 text-center max-w-6xl mx-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/5 via-transparent to-bg dark:from-brand/10 dark:to-bg'
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
        and maintainable web applications. Here's a breakdown of the tools I use
        daily:
      </p>

      <div className='space-y-12'>
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className='text-xl font-semibold text-[var(--color-brand)] mb-4'>
              {group.title}
            </h3>
            <div className='flex flex-wrap justify-center gap-4'>
              {group.items.map((tech, index) => (
                <motion.span
                  key={tech.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className='flex items-center gap-2 bg-[var(--color-bg-alt)] text-[var(--color-text)] border border-[var(--color-border)] px-4 py-2 rounded-lg shadow-sm text-sm font-medium hover:bg-[var(--color-accent)] hover:text-white transition'
                >
                  <span className='text-base'>{tech.icon}</span>
                  {tech.label}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>

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
