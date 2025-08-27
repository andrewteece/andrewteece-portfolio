import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost, BlogPostModule, BlogFrontmatter } from '../types/blog';
import SEO from '../components/shared/SEO';
import { Section, Stack, P } from '../components/shared/Section';

import { motion, useReducedMotion } from 'framer-motion';
import type { Transition } from 'framer-motion';

// Load all MDX posts
const postFiles: Record<string, () => Promise<BlogPostModule>> =
  import.meta.glob<BlogPostModule>('/src/content/blog/*.mdx');

// Helpers
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
    const load = async () => {
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

    void load();
  }, []);

  const prefetch = (slug: string) => {
    const key = Object.keys(postFiles).find((p) => p.endsWith(`${slug}.mdx`));
    if (key) void postFiles[key]().catch(() => {});
  };

  // Ambient background motion (matches Hero "Bold" preset)
  const prefersReducedMotion = useReducedMotion();
  const driftTransition: Transition = {
    duration: 26,
    repeat: Infinity,
    repeatType: 'mirror',
    ease: 'easeInOut',
  };
  const driftPath = prefersReducedMotion
    ? undefined
    : { x: [0, 20, -12, 0], y: [0, -14, 10, 0] };

  return (
    <main id='main' className='relative overflow-hidden'>
      <SEO
        title='Blog | Andrew Teece'
        description='Articles and thoughts on frontend development, React, Vite, MDX, and modern web tools.'
        url='https://andrewteece.com/blog'
      />

      {/* extra breathing room under the header + ambient glows */}
      <section className='relative pt-32 pb-12 md:pt-36'>
        <div className='absolute inset-0 z-0 pointer-events-none'>
          {/* Top-left brand glow */}
          <motion.div
            aria-hidden
            className='absolute w-64 h-64 rounded-full -top-28 -left-28 md:h-80 md:w-80 mix-blend-screen'
            style={{
              opacity: 0.42,
              filter: 'blur(120px)',
              backgroundImage:
                'radial-gradient(closest-side, var(--color-brand), transparent 65%)',
            }}
            animate={driftPath}
            transition={prefersReducedMotion ? undefined : driftTransition}
          />
          {/* Right warm glow (lowered a touch) */}
          <motion.div
            aria-hidden
            className='absolute top-1/2 -right-32 h-72 w-72 md:h-[26rem] md:w-[26rem] rounded-full mix-blend-screen'
            style={{
              opacity: 0.34,
              filter: 'blur(120px)',
              backgroundImage:
                'radial-gradient(closest-side, var(--color-accent), transparent 65%)',
            }}
            animate={driftPath}
            transition={
              prefersReducedMotion
                ? undefined
                : { ...driftTransition, delay: 2 }
            }
          />
          {/* Center cool glow */}
          <motion.div
            aria-hidden
            className='absolute -translate-x-1/2 rounded-full left-1/2 top-24 h-60 w-60 md:h-72 md:w-72 mix-blend-screen'
            style={{
              opacity: 0.32,
              filter: 'blur(120px)',
              backgroundImage:
                'radial-gradient(closest-side, var(--color-accent-alt), transparent 65%)',
            }}
            animate={driftPath}
            transition={
              prefersReducedMotion
                ? undefined
                : { ...driftTransition, delay: 4 }
            }
          />
        </div>

        <div className='relative z-10'>
          <Section id='blog' align='center' size='wide'>
            {/* CENTERED heading group */}
            <header className='mb-4 text-center md:mb-6'>
              <h1 className='relative inline-block text-4xl font-extrabold leading-tight tracking-tight md:text-5xl'>
                <span
                  className='relative z-10'
                  style={{
                    backgroundImage:
                      'linear-gradient(90deg, var(--color-brand), var(--color-accent-alt), var(--color-accent))',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                  }}
                >
                  Blog
                </span>
                <span
                  aria-hidden
                  className='absolute inset-0 pointer-events-none select-none'
                  style={{ color: 'var(--color-brand)' }}
                >
                  Blog
                </span>
              </h1>
            </header>

            <Stack>
              {/* CENTER the intro line as well */}
              <P className='mx-auto max-w-prose text-center text-[rgb(var(--text-rgb)/0.80)]'>
                Notes on projects, performance, and front-end craft.
              </P>

              {!posts && (
                <p className='text-center text-muted'>Loading posts…</p>
              )}

              {posts && posts.length === 0 && (
                <p className='text-center text-muted'>No posts found.</p>
              )}

              {posts && posts.length > 0 && (
                <ul className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10'>
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
        </div>
      </section>
    </main>
  );
}
