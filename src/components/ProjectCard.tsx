import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

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
      className='flex flex-col overflow-hidden transition-all duration-300 card group cursor-pointer'
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true }}
      whileHover={{
        y: -8,
        scale: 1.02,
        boxShadow: '0 20px 40px -12px rgba(0, 0, 0, 0.15)',
        transition: { duration: 0.2, ease: 'easeOut' },
      }}
      whileTap={{ scale: 0.98 }}
    >
      {image && (
        <div className='overflow-hidden'>
          <img
            src={image}
            alt={title}
            className='object-cover object-top w-full h-48 transition-transform duration-500 border-b rounded-t-xl hairline group-hover:scale-105'
            loading='lazy'
            decoding='async'
            width={1280}
            height={720}
            sizes='(min-width:1280px) 384px, (min-width:768px) 50vw, 100vw'
          />
        </div>
      )}

      <div className='flex flex-col justify-between flex-1 p-6'>
        <div>
          <h3 className='text-xl font-bold text-[var(--color-brand)] underline-offset-4 group-hover:underline'>
            {title}
          </h3>

          <p className='mt-2 text-sm text-[var(--color-text)]'>{description}</p>
          <p className='mt-2 text-xs text-muted'>{tech}</p>
        </div>

        <div className='flex gap-4 mt-4'>
          {github && (
            <motion.a
              href={github}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all text-[var(--color-brand)] border border-[var(--color-brand)]/20 hover:border-[var(--color-brand)]/40 hover:bg-[var(--color-brand)]/5'
              aria-label={`View ${title} on GitHub`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaGithub size={16} />
              <span>Code</span>
            </motion.a>
          )}
          {demo && (
            <motion.a
              href={demo}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all text-[var(--color-accent)] border border-[var(--color-accent)]/20 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/5'
              aria-label={`View live demo of ${title}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaExternalLinkAlt size={14} />
              <span>Live Demo</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
