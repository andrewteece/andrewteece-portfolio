import ProjectCard from './ProjectCard';

export default function Projects() {
  return (
    <section id='projects' className='py-20 px-4 max-w-6xl mx-auto'>
      <h3 className='text-3xl font-semibold text-center mb-10'>Projects</h3>
      <div className='grid md:grid-cols-2 gap-8'>
        <ProjectCard
          title='Portfolio Website'
          tech='React, Tailwind'
          description='A modern portfolio site built to showcase my work.'
        />
        <ProjectCard
          title='Todo App'
          tech='TypeScript, Clerk'
          description='A simple productivity app with authentication.'
        />
      </div>
    </section>
  );
}
