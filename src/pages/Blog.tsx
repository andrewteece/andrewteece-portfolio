import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost, BlogPostModule, BlogFrontmatter } from '../types/blog';
import SEO from '../components/shared/SEO';
import { Section, Stack, P } from '../components/shared/Section';

const postFiles: Record<string, () => Promise<BlogPostModule>> =
  import.meta.glob<BlogPostModule>('/src/content/blog/*.mdx');

const toEpoch = (d: unknown): number => {
  if (typeof d === 'string' || typeof d === 'number') {
    const t = Date.parse(String(d));
    return Number.isFinite(t) ? t : Number.NEGATIVE_INFINITY;
  }
  if (d instanceof Date) {
    const t = d.getTime();
    return Number.isFinite(t) ? t : Number.NEGATIVE_INFINITY;
  }
  return Number.NEGATIVE_INFINITY;
};
const formatDate = (d: unknown): string => {
  if (typeof d === 'string' || typeof d === 'number') {
    const dt = new Date(d);
    return Number.isNaN(dt.getTime())
      ? '—'
      : dt.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
  }
  if (d instanceof Date) {
    return Number.isNaN(d.getTime())
      ? '—'
      : d.toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
  }
  return '—';
};

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      const loaded = await Promise.all(
        Object.entries(postFiles).map(async ([path, resolver]) => {
          const mod = await resolver();
          const fm: Partial<BlogFrontmatter> = mod.frontmatter ?? {};

          const slug =
            (typeof fm.slug === 'string' && fm.slug) ||
            path
              .split('/')
              .pop()!
              .replace(/\.mdx$/i, '');

          const tags = Array.isArray(fm.tags)
            ? fm.tags.filter((t): t is string => typeof t === 'string')
            : [];

          const post: BlogPost = {
            title: typeof fm.title === 'string' ? fm.title : slug,
            slug,
            date: fm.date,
            excerpt: typeof fm.excerpt === 'string' ? fm.excerpt : '',
            image: typeof fm.image === 'string' ? fm.image : undefined,
            tags,
          };
          return post;
        })
      );

      loaded.sort((a, b) => toEpoch(b.date) - toEpoch(a.date));
      setPosts(loaded);
    };

    void loadPosts();
  }, []);

  const prefetch = (slug: string) => {
    const match = Object.keys(postFiles).find((p) => p.endsWith(`${slug}.mdx`));
    if (!match) return;
    void postFiles[match]().catch(() => {});
  };

  return (
    <main id='main'>
      <SEO
        title='Blog | Andrew Teece'
        description='Articles and thoughts on frontend development, React, Vite, MDX, and modern web tools.'
        url='https://andrewteece.com/blog'
      />

      <Section id='blog' title='Blog' align='center' size='wide'>
        <Stack>
          <P className='mx-auto max-w-prose'>
            Notes on projects, performance, and front-end craft.
          </P>

          {!posts && <p className='text-muted'>Loading posts…</p>}

          {posts && posts.length === 0 && (
            <p className='text-muted'>No posts found.</p>
          )}

          {posts && posts.length > 0 && (
            <ul className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {posts.map((post) => (
                <li key={post.slug} className='[content-visibility:auto]'>
                  <article
                    className='
                      group overflow-hidden rounded-2xl
                      border border-subtle bg-surface shadow-sm
                      transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md
                    '
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className='block'
                      onMouseEnter={() => prefetch(post.slug)}
                      onFocus={() => prefetch(post.slug)}
                    >
                      <div className='aspect-[16/9] w-full overflow-hidden'>
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]'
                            loading='lazy'
                            decoding='async'
                            width={1280}
                            height={720}
                            sizes='(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw'
                          />
                        ) : (
                          <div
                            role='img'
                            aria-label={`No image for ${post.title}`}
                            className='flex items-center justify-center w-full h-full text-sm text-muted'
                          >
                            No image
                          </div>
                        )}
                      </div>

                      <div className='p-5'>
                        <div className='flex flex-wrap items-center gap-2 mb-3 text-xs font-medium'>
                          {post.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className='
                                rounded-full px-2 py-0.5
                                border border-black/10 dark:border-white/15
                                text-[rgb(var(--text-rgb)/0.70)]
                              '
                            >
                              #{t}
                            </span>
                          ))}
                          <span className='ml-auto text-[rgb(var(--text-rgb)/0.60)]'>
                            {formatDate(post.date)}
                          </span>
                        </div>

                        <h2 className='line-clamp-2 text-xl font-bold leading-snug text-[var(--color-text)] transition-colors group-hover:text-[var(--color-brand)]'>
                          {post.title}
                        </h2>

                        {post.excerpt && (
                          <p className='mt-3 line-clamp-3 text-sm leading-relaxed text-[rgb(var(--text-rgb)/0.80)]'>
                            {post.excerpt}
                          </p>
                        )}

                        <div className='mt-4'>
                          <span className='text-sm font-medium text-[var(--color-brand)] underline-offset-4 group-hover:underline'>
                            Read more →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </Stack>
      </Section>
    </main>
  );
}
