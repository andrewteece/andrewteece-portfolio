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
      className='flex flex-col overflow-hidden transition-all duration-300 card group'
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
            <a
              href={github}
              target='_blank'
              rel='noopener noreferrer'
              className='transition-colors text-[var(--color-brand)] hover:text-[var(--color-accent)]'
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
              className='transition-colors text-[var(--color-brand)] hover:text-[var(--color-accent)]'
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
