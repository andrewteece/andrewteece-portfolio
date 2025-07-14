import { motion } from 'framer-motion';
import { projects } from '../data/portfolio/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id='projects' className='py-20 px-4 max-w-6xl mx-auto'>
      <motion.h2
        className='text-3xl font-semibold text-center mb-12 text-[var(--color-text)]'
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Featured Projects
      </motion.h2>

      <div className='grid gap-10 md:grid-cols-2 xl:grid-cols-3'>
        {projects.map((project, idx) => (
          <ProjectCard key={idx} {...project} />
        ))}
      </div>
    </section>
  );
}
