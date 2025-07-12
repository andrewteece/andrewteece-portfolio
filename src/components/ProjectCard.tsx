// src/components/ProjectCard.tsx
type ProjectCardProps = {
  title: string;
  tech: string;
  description: string;
  github?: string;
  demo?: string;
  image?: string;
};

export default function ProjectCard({
  title,
  tech,
  description,
  github,
  demo,
}: ProjectCardProps) {
  return (
    <div
      className='p-6 border rounded-xl bg-[var(--color-bg)] text-[var(--color-text)]
        transition hover:shadow-lg'
    >
      <h4 className='text-xl font-bold mb-1 text-[var(--color-brand)]'>
        {title}
      </h4>
      <p className='text-sm text-gray-500 dark:text-gray-400 mb-2'>{tech}</p>
      <p className='text-sm mb-4'>{description}</p>

      <div className='flex gap-4 text-sm'>
        {github && (
          <a
            href={github}
            target='_blank'
            rel='noopener noreferrer'
            className='underline text-[var(--color-accent)] hover:opacity-80'
          >
            GitHub
          </a>
        )}
        {demo && (
          <a
            href={demo}
            target='_blank'
            rel='noopener noreferrer'
            className='underline text-[var(--color-accent)] hover:opacity-80'
          >
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
