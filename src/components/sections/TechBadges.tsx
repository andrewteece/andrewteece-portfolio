import { motion } from 'framer-motion';
import { allTech } from '../shared/tech'; // ← single source of truth
import type { Tech } from '../shared/tech';

type BadgeProps = Tech;

function Badge({ label, icon, color, glow, link, pulse }: BadgeProps) {
  const node = (
    <motion.span
      className={`flex-shrink-0 flex items-center gap-2 px-4 py-1 rounded-full text-sm font-medium
                  border border-white/20 shadow-sm transition-transform duration-300 ease-out
                  hover:scale-105 ${
                    color ??
                    'bg-white/30 dark:bg-white/10 text-[var(--color-text)]'
                  }
                  ${glow ?? ''}`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        ...(pulse
          ? {
              boxShadow: [
                '0 0 8px var(--color-brand)',
                '0 0 16px var(--color-brand)',
                '0 0 8px var(--color-brand)',
              ],
            }
          : {}),
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20,
        ...(pulse
          ? {
              boxShadow: {
                repeat: Infinity,
                repeatType: 'mirror',
                duration: 3,
                ease: 'easeInOut',
              },
            }
          : {}),
      }}
    >
      <span className='text-base'>{icon}</span>
      {label}
    </motion.span>
  );

  return link ? (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`Open ${label}`}
      className='rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2'
    >
      {node}
    </a>
  ) : (
    node
  );
}

export default function TechBadges() {
  return (
    <motion.div
      className='flex flex-wrap justify-center gap-4 md:gap-6 px-1 overflow-x-auto md:overflow-visible py-2 scrollbar-thin scrollbar-thumb-[var(--color-brand)]'
      initial='hidden'
      animate='visible'
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      {allTech.map((t) => (
        <Badge key={t.label} {...t} />
      ))}
    </motion.div>
  );
}
