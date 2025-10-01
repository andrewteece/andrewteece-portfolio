import { motion } from 'framer-motion';
import { FaExternalLinkAlt, FaGithub, FaStar } from 'react-icons/fa';

type ProjectProps = {
  title: string;
  description: string;
  tech?: string;
  github?: string;
  demo?: string;
  image?: string;
  category?: 'frontend' | 'fullstack' | 'tools' | 'api';
  featured?: boolean;
  techStack?: string[];
  metrics?: {
    performance?: string;
    accessibility?: string;
    bundle?: string;
  };
};

export default function ProjectCard({
  title,
  description,
  github,
  demo,
  image,
  category,
  featured,
  techStack,
  metrics,
}: ProjectProps) {
  return (
    <motion.div
      className={`flex flex-col overflow-hidden transition-all duration-300 card group cursor-pointer relative ${
        featured ? 'ring-2 ring-[var(--color-accent)]/30' : ''
      }`}
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
      {featured && (
        <div className='absolute top-4 right-4 z-10'>
          <span className='inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full bg-[var(--color-accent)] text-white'>
            <FaStar size={10} />
            Featured
          </span>
        </div>
      )}

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
          <div className='flex items-start justify-between gap-2 mb-2'>
            <h3 className='text-xl font-bold text-[var(--color-brand)] underline-offset-4 group-hover:underline'>
              {title}
            </h3>
            {category && (
              <span className='px-2 py-1 text-xs font-medium rounded-md bg-[var(--color-brand)]/10 text-[var(--color-brand)] capitalize'>
                {category}
              </span>
            )}
          </div>

          <p className='mt-2 text-sm leading-relaxed text-[var(--color-text)]'>{description}</p>
          
          {/* Tech Stack Pills */}
          {techStack && (
            <div className='flex flex-wrap gap-1 mt-3'>
              {techStack.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className='px-2 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                >
                  {tech}
                </span>
              ))}
              {techStack.length > 4 && (
                <span className='px-2 py-1 text-xs font-medium text-gray-500'>
                  +{techStack.length - 4} more
                </span>
              )}
            </div>
          )}

          {/* Performance Metrics */}
          {metrics && (
            <div className='grid grid-cols-2 gap-2 mt-3 text-xs'>
              {metrics.performance && (
                <div className='flex items-center gap-1 text-green-600 dark:text-green-400'>
                  <span>⚡</span>
                  <span>{metrics.performance}</span>
                </div>
              )}
              {metrics.accessibility && (
                <div className='flex items-center gap-1 text-blue-600 dark:text-blue-400'>
                  <span>♿</span>
                  <span>{metrics.accessibility}</span>
                </div>
              )}
            </div>
          )}
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
