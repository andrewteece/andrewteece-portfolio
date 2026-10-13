import ProjectCard from '../components/ProjectCard';
import SEO from '../components/shared/SEO';
import { Section } from '../components/shared/Section';
import { projects } from '../content/projects';

export default function Labs() {
  const labProjects = projects.filter((project) => project.audience !== 'client');

  return (
    <main id='main' className='px-4 pb-20 pt-32'>
      <SEO
        title='Developer Labs | Andrew Teece'
        description='Experimental front-end, full-stack, and developer-tool projects by Andrew Teece.'
        url='https://www.andrewteece.com/labs'
        canonical='https://www.andrewteece.com/labs'
      />
      <Section
        title='Developer Labs'
        eyebrow='Experiments and learning projects'
        size='wide'
        align='center'
      >
        <p className='mx-auto max-w-3xl text-center text-lg text-muted'>
          A collection of independent builds and technical experiments. For
          business outcomes and client work, see the case studies.
        </p>
        <div className='mt-8 grid gap-10 md:grid-cols-2 xl:grid-cols-3'>
          {labProjects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </Section>
    </main>
  );
}
