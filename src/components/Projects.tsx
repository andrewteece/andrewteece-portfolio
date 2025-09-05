import { motion } from 'framer-motion';
import { useContext, useEffect, useRef } from 'react';
import { projects } from '../content/projects';
import { ActiveSectionContext } from '../context/ActiveSectionContext';
import ProjectCard from './ProjectCard';
import { P, Section, Stack } from './shared/Section';

export default function Projects() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { setActiveSection } = useContext(ActiveSectionContext);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActiveSection('projects'),
      { threshold: 0.6 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [setActiveSection]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  return (
    <motion.div
      id='projects'
      ref={wrapperRef}
      className='text-center section-pad section-divider'
      initial='hidden'
      whileInView='visible'
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Section title='Projects' align='center' size='wide' className='!py-0'>
        <Stack>
          {/* Bump intro paragraph size here */}
          <P className='mx-auto max-w-prose text-lg md:text-xl leading-relaxed text-[var(--color-text)]'>
            Projects from intuitive frontend interfaces to full-stack
            platforms—built with performance, accessibility, and clean design in
            mind.
          </P>

          <motion.div
            className='grid gap-10 px-2 md:grid-cols-2 xl:grid-cols-3'
            variants={containerVariants}
          >
            {projects.map((project, idx) => (
              <ProjectCard key={idx} {...project} />
            ))}
          </motion.div>
        </Stack>
      </Section>
    </motion.div>
  );
}
