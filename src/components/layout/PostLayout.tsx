import type { BlogPost } from '../../types/blog';

interface PostLayoutProps {
  frontmatter: BlogPost;
  children: React.ReactNode;
}

export default function PostLayout({ frontmatter, children }: PostLayoutProps) {
  return (
    <article className='max-w-3xl mx-auto px-4 py-16'>
      <header className='mb-10'>
        <h1 className='text-4xl font-bold text-[var(--color-brand)] mb-2'>
          {frontmatter.title}
        </h1>
        <p className='text-sm text-gray-500'>{frontmatter.date}</p>
        {frontmatter.image && (
          <img
            src={frontmatter.image}
            alt={frontmatter.title}
            className='rounded-lg w-full max-h-72 object-cover border border-[var(--color-border)] mb-6'
          />
        )}
        {frontmatter.excerpt && (
          <p className='mt-2 text-[var(--color-text)] text-base italic'>
            {frontmatter.excerpt}
          </p>
        )}
      </header>

      <section className='prose prose-neutral dark:prose-invert max-w-none'>
        <div style={{ background: 'lightyellow', padding: '1rem' }}>
          Debug: children go here
        </div>
        {children}
      </section>
    </article>
  );
}
