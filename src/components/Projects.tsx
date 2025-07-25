// src/components/sections/Projects.tsx
import { motion } from 'framer-motion';
import { useEffect, useRef, useContext } from 'react';
import { ActiveSectionContext } from '../context/ActiveSectionContext';
import { projects } from '../content/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { setActiveSection } = useContext(ActiveSectionContext);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActiveSection('projects');
      },
      { threshold: 0.6 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [setActiveSection]);

  return (
    <motion.section
      id='projects'
      ref={sectionRef}
      className='relative py-24 px-4 text-center max-w-6xl mx-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/5 via-transparent to-bg dark:from-brand/10 dark:to-bg'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className='text-3xl md:text-4xl font-bold text-[var(--color-brand)] mb-4'>
        Projects
      </h2>
      <p className='text-lg text-[var(--color-text)] mb-10'>
        Projects from intuitive frontend interfaces to full-stack platforms—all
        built with performance, accessibility, and clean design in mind
      </p>

      <div className='grid gap-10 md:grid-cols-2 xl:grid-cols-3 px-2'>
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </motion.section>
  );
}
