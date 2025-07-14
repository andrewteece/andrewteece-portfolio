import { motion } from 'framer-motion';
import ProjectCard from './ProjectCard';
import { projects } from '../data/portfolio/projects';

export default function Projects() {
  return (
    <motion.section
      id='projects'
      className='relative py-24 px-4 text-center max-w-6xl mx-auto'
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className='text-3xl md:text-4xl font-bold text-[var(--color-brand)] mb-4'>
        Featured Projects
      </h2>
      <p className='text-lg text-[var(--color-text)] max-w-2xl mx-auto mb-10'>
        Here are a few selected projects showcasing my work building performant,
        accessible websites and applications with modern stacks.
      </p>

      {/* Divider */}
      <div className='border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] mb-10 w-full'></div>

      <div className='grid md:grid-cols-2 gap-8 mb-10'>
        {projects.map((project, idx) => (
          <ProjectCard
            key={idx}
            title={project.title}
            tech={project.tech}
            description={project.description}
            github={project.github}
            demo={project.demo}
            image={project.image}
          />
        ))}
      </div>

      {/* Divider */}
      <div className='border-t border-[var(--color-border)] dark:border-[var(--color-border-dark)] mt-10 w-full'></div>
    </motion.section>
  );
}
