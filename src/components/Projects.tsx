import { motion } from 'framer-motion';
import { useEffect, useRef, useContext } from 'react';
import { ActiveSectionContext } from '../context/ActiveSectionContext';
import { projects } from '../content/projects';
import ProjectCard from './ProjectCard';
import { Section, Stack, P } from './shared/Section';

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
      className='
        relative py-24 px-4 text-center max-w-6xl mx-auto
        bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand/5 via-transparent to-bg
        dark:from-brand/10 dark:to-bg
      '
      initial='hidden'
      whileInView='visible'
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <Section title='Projects' align='center' size='wide' className='!py-0'>
        <Stack>
          <P className='mx-auto max-w-prose'>
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
