import { motion } from 'framer-motion';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { projects } from '../content/projects';
import { ActiveSectionContext } from '../context/ActiveSectionContext';
import ProjectCard from './ProjectCard';
import { P, Section, Stack } from './shared/Section';

export default function Projects() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { setActiveSection } = useContext(ActiveSectionContext);
  const [activeFilter, setActiveFilter] = useState<
    'all' | 'frontend' | 'fullstack' | 'tools' | 'api'
  >('all');

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

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') {
      return projects;
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  const filters = [
    { key: 'all' as const, label: 'All Projects', count: projects.length },
    {
      key: 'frontend' as const,
      label: 'Frontend',
      count: projects.filter((p) => p.category === 'frontend').length,
    },
    {
      key: 'fullstack' as const,
      label: 'Full Stack',
      count: projects.filter((p) => p.category === 'fullstack').length,
    },
    {
      key: 'tools' as const,
      label: 'Tools',
      count: projects.filter((p) => p.category === 'tools').length,
    },
  ];

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
          {/* Enhanced intro paragraph */}
          <P className='mx-auto max-w-prose text-lg md:text-xl leading-relaxed text-[var(--color-text)]'>
            A curated collection of projects showcasing modern web development
            expertise—from complex data visualizations to full-stack
            applications, each built with performance, accessibility, and
            scalability as core principles.
          </P>

          {/* Project Filter Tabs */}
          <div className='flex flex-wrap justify-center gap-3 mb-8'>
            {filters.map((filter) => (
              <motion.button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeFilter === filter.key
                    ? 'bg-[var(--color-brand)] text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {filter.label} ({filter.count})
              </motion.button>
            ))}
          </div>

          <motion.div
            className='grid gap-10 px-2 md:grid-cols-2 xl:grid-cols-3'
            variants={containerVariants}
            initial='hidden'
            animate='visible'
          >
            {filteredProjects.map((project, idx) => (
              <ProjectCard key={project.title} {...project} />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <div className='text-center py-8'>
              <p className='text-gray-500'>
                No projects found in this category.
              </p>
            </div>
          )}
        </Stack>
      </Section>
    </motion.div>
  );
}
