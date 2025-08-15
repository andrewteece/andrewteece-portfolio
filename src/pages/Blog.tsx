import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost, BlogPostModule } from '../types/blog';
import SEO from '../components/shared/SEO';

const postFiles = import.meta.glob<BlogPostModule>('../content/blog/*.mdx');

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const loadedPosts = await Promise.all(
        Object.entries(postFiles).map(async ([path, resolver]) => {
          const mod = await resolver();
          const raw =
            mod.frontmatter ?? mod.meta?.frontmatter ?? mod.attributes ?? {};
          const slug =
            raw.slug ??
            path
              .split('/')
              .pop()
              ?.replace(/\.mdx$/, '') ??
            'unknown';

          return {
            title: raw.title ?? 'Untitled',
            slug,
            date: raw.date ?? 'Unknown date',
            excerpt: raw.excerpt ?? '',
            image: raw.image,
            tags: raw.tags ?? [],
          };
        })
      );

      setPosts(
        loadedPosts.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
      );
    };

    loadPosts();
  }, []);

  return (
    <main className='max-w-6xl px-4 py-16 mx-auto'>
      <SEO
        title='Blog | Andrew Teece'
        description='Articles and thoughts on frontend development, React, Vite, MDX, and modern web tools.'
        url='https://andrewteece.com/blog'
      />

      <header className='mb-10'>
        <h1 className='text-4xl font-bold tracking-tight text-[var(--color-brand)]'>
          Blog
        </h1>
        <p className='mt-2 text-[var(--color-text)]/70 max-w-2xl'>
          Notes on projects, performance, and front-end craft.
        </p>
      </header>

      {posts.length === 0 && <p>No posts found.</p>}

      <ul className='grid gap-8 sm:grid-cols-2 lg:grid-cols-3'>
        {posts.map((post) => (
          <li key={post.slug}>
            <article className='group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md'>
              <Link to={`/blog/${post.slug}`} className='block'>
                {/* Image wrapper */}
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
                    />
                  ) : (
                    <div className='flex h-full w-full items-center justify-center text-sm text-[var(--color-text)]/50'>
                      No image
                    </div>
                  )}
                </div>

                {/* Text content */}
                <div className='p-5'>
                  {/* Meta row */}
                  <div className='flex flex-wrap items-center gap-2 mb-3 text-xs font-medium'>
                    {post.tags?.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className='rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[var(--color-text)]/70'
                      >
                        #{t}
                      </span>
                    ))}
                    <span className='ml-auto text-[var(--color-text)]/60'>
                      {new Date(post.date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className='text-xl font-bold text-[var(--color-text)] transition-colors group-hover:text-[var(--color-brand)] leading-snug line-clamp-2'>
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className='mt-3 text-sm leading-relaxed text-[var(--color-text)]/80 line-clamp-3'>
                      {post.excerpt}
                    </p>
                  )}

                  {/* CTA */}
                  <div className='mt-4'>
                    <span className='text-sm font-medium text-[var(--color-brand)] hover:underline underline-offset-4'>
                      Read more →
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
