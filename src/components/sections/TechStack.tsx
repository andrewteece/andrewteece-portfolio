import { ChevronDown } from 'lucide-react';
import { techGroups, type Tech } from '../shared/tech';

function Badge({ label, icon, color, glow, link }: Tech) {
  const badge = (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
                  border hairline shadow-sm transition-transform duration-200
                  hover:scale-105 hover:brightness-110 ${
                    color ?? 'bg-white/5 text-[var(--color-text)]'
                  } ${glow ?? ''}`}
    >
      <span className='grid w-4 h-4 text-base place-items-center' aria-hidden>
        {icon}
      </span>
      {label}
    </span>
  );

  return link ? (
    <a
      href={link}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`Open ${label}`}
      className='focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand)] focus-visible:ring-offset-2 rounded-full'
    >
      {badge}
    </a>
  ) : (
    badge
  );
}

export default function TechStack() {
  return (
    <section
      id='techstack'
      className='
        relative text-center section-divider
        pt-14 md:pt-24 pb-16 md:pb-24
        [content-visibility:auto]
        [contain-intrinsic-size:800px]
      '
    >
      <div className='container-base'>
        <h2 className='text-3xl md:text-4xl font-bold text-[var(--color-brand)] mb-4 tracking-tight'>
          My Tech Stack
        </h2>

        <p className='text-lg text-[var(--color-text)] max-w-2xl mx-auto mb-10'>
          I use a variety of modern technologies to build performant, scalable,
          and maintainable web applications. Here&apos;s a selection of tools I
          use daily:
        </p>

        <div className='w-full mb-10 border-t hairline' />

        {Object.entries(techGroups).map(([category, items]) => (
          <div key={category} className='mb-8 space-y-4'>
            <h3 className='text-xl font-semibold leading-tight tracking-tight'>
              {category}
            </h3>
            <div className='flex flex-wrap justify-center gap-3 md:gap-4'>
              {items.map((t) => (
                <Badge key={t.label} {...t} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <a
        href='#projects'
        className='absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--color-brand)] dark:text-[var(--color-accent)]'
        aria-label='Scroll to projects'
      >
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
