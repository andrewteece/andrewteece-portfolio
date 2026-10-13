import { motion } from 'framer-motion';
import { useContext, useEffect, useMemo, useRef } from 'react';
import { projects } from '../content/projects';
import { ActiveSectionContext } from '../context/ActiveSectionContext';
import ProjectCard from './ProjectCard';
import { P, Section, Stack } from './shared/Section';

export default function Projects() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { setActiveSection } = useContext(ActiveSectionContext);
  const caseStudies = useMemo(
    () => projects.filter((project) => project.audience === 'client'),
    []
  );
  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActiveSection('projects'),
      { threshold: 0.6 },
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
      <Section title='Selected Case Studies' align='center' size='wide' className='!py-0'>
        <Stack>
          {/* Enhanced intro paragraph */}
          <P className='mx-auto max-w-prose text-lg md:text-xl leading-relaxed text-[var(--color-text)]'>
            Business-focused results from restaurant operations and client
            development. Independent technical experiments are collected in
            the <a className='underline' href='/labs'>Developer Labs</a>.
          </P>

          <motion.div
            className='grid gap-10 px-2 md:grid-cols-2 xl:grid-cols-3'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
          >
            {caseStudies.map((project) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </motion.div>
        </Stack>
      </Section>
    </motion.div>
  );
}
