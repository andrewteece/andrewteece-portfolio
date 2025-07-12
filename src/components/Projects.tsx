import { projects } from '../data/portfolio/projects';
import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id='projects' className='py-20 px-4 max-w-6xl mx-auto'>
      <h3 className='text-3xl font-semibold text-center mb-10'>Projects</h3>
      <div className='grid md:grid-cols-2 gap-8'>
        {projects.map((project, idx) => (
          <ProjectCard
            key={idx}
            title={project.title}
            tech={project.tech}
            description={project.description}
          />
        ))}
      </div>
    </section>
  );
}
