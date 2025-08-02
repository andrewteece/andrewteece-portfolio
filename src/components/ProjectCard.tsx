import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

type ProjectProps = {
  title: string;
  description: string;
  tech: string;
  github?: string;
  demo?: string;
  image?: string;
};

export default function ProjectCard({
  title,
  description,
  tech,
  github,
  demo,
  image,
}: ProjectProps) {
  return (
    <motion.div
      className='group bg-[var(--color-bg-alt)] border border-[var(--color-divider)] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1 hover:scale-[1.02]'
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true }}
    >
      {image && (
        <div className='overflow-hidden'>
          <img
            src={image}
            alt={title}
            className='w-full h-48 object-cover object-top rounded-t-xl border-b border-[var(--color-divider)] transition-transform duration-500 group-hover:scale-105'
            loading='lazy'
          />
        </div>
      )}
      <div className='p-6 flex-1 flex flex-col justify-between'>
        <div>
          <h3 className='text-xl font-bold text-[var(--color-brand)] group-hover:underline underline-offset-4'>
            {title}
          </h3>
          <p className='text-[var(--color-text)] text-sm mt-2'>{description}</p>
          <p className='text-xs text-[var(--color-text-muted)] mt-2'>{tech}</p>
        </div>
        <div className='flex gap-4 mt-4'>
          {github && (
            <a
              href={github}
              target='_blank'
              rel='noopener noreferrer'
              className='text-[var(--color-brand)] hover:text-[var(--color-accent)] transition-colors'
              aria-label={`View ${title} on GitHub`}
            >
              <FaGithub size={18} />
            </a>
          )}
          {demo && (
            <a
              href={demo}
              target='_blank'
              rel='noopener noreferrer'
              className='text-[var(--color-brand)] hover:text-[var(--color-accent)] transition-colors'
              aria-label={`View live demo of ${title}`}
            >
              <FaExternalLinkAlt size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
