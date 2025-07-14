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
      className='bg-[var(--color-bg-alt)] border border-[var(--color-divider)] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 flex flex-col'
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {image && (
        <img
          src={image}
          alt={title}
          className='w-full h-48 object-cover object-top rounded-t-xl border-b border-[var(--color-divider)]'
          loading='lazy'
        />
      )}
      <div className='p-6 flex-1 flex flex-col justify-between'>
        <div>
          <h3 className='text-xl font-bold text-[var(--color-brand)]'>
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
              aria-label='View GitHub'
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
              aria-label='View Demo'
            >
              <FaExternalLinkAlt size={18} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
