// src/pages/BlogPost.tsx
import * as React from 'react';
import {
  useEffect,
  useState,
  type ComponentType,
  Suspense,
  lazy,
  useRef,
  type ComponentProps,
} from 'react';
import { useParams, Link } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import type { MDXComponents } from 'mdx/types';
import type { BlogPost, BlogPostModule, BlogFrontmatter } from '../types/blog';
import PostLayout from '../components/layout/PostLayout';
import AuthorBlock from '../components/layout/AuthorBlock';
import CodeBlock from '../components/ui/CodeBlock';

import { motion, useReducedMotion } from 'framer-motion';
import type { Transition } from 'framer-motion';

const postFiles: Record<string, () => Promise<BlogPostModule>> =
  import.meta.glob<BlogPostModule>('/src/content/blog/*.mdx');

type PostShape = BlogPost & { readingTime?: string };

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();

  // ✅ All hooks must be called before any early return
  const prefersReducedMotion = useReducedMotion();
  const [post, setPost] = useState<PostShape | null>(null);
  const [Component, setComponent] = useState<React.LazyExoticComponent<
    ComponentType<Record<string, unknown>>
  > | null>(null);
  const [notFound, setNotFound] = useState(false);
  const skippedHeroRef = useRef(false);

  // Ambient motion config (matches Blog/Hero)
  const driftTransition: Transition = {
    duration: 26,
    repeat: Infinity,
    repeatType: 'mirror',
    ease: 'easeInOut',
  };
  const driftPath = prefersReducedMotion
    ? undefined
    : { x: [0, 20, -12, 0], y: [0, -14, 10, 0] };

  useEffect(() => {
    if (!slug) {
      setNotFound(true);
      return;
    }
    const matchedPath = Object.keys(postFiles).find((p) =>
      p.endsWith(`${slug}.mdx`)
    );
    if (!matchedPath) {
      setNotFound(true);
      return;
    }

    void (async () => {
      const module = await postFiles[matchedPath]();
      const fm: Partial<BlogFrontmatter> = module.frontmatter ?? {};

      const baseline = typeof fm.excerpt === 'string' ? fm.excerpt : '';
      const words = baseline.trim().split(/\s+/).filter(Boolean).length;
      const readingTime = `${Math.max(
        1,
        Math.round((words || 400) / 200)
      )} min read`;

      setPost({
        title: typeof fm.title === 'string' ? fm.title : slug,
        slug,
        date: fm.date ?? '—',
        excerpt: typeof fm.excerpt === 'string' ? fm.excerpt : '',
        image: typeof fm.image === 'string' ? fm.image : undefined,
        tags: Array.isArray(fm.tags)
          ? fm.tags.filter((t): t is string => typeof t === 'string')
          : [],
        readingTime,
      });

      const Lazy = lazy(() =>
        Promise.resolve({
          default: module.default as ComponentType<Record<string, unknown>>,
        })
      );
      setComponent(() => Lazy);
    })().catch(() => setNotFound(true));
  }, [slug]);

  if (notFound) {
    return (
      <main className='max-w-3xl px-4 py-20 mx-auto text-center'>
        <h1 className='mb-2 text-2xl font-semibold'>404 — Post not found</h1>
        <Link
          to='/blog'
          className='text-[var(--color-brand)] underline underline-offset-4'
        >
          Back to Blog
        </Link>
      </main>
    );
  }

  if (!post || !Component) {
    return (
      <main className='max-w-3xl px-4 py-20 mx-auto text-center'>
        <p>Loading post...</p>
      </main>
    );
  }

  // MDX overrides
  const components: MDXComponents = {
    h1: (props: ComponentProps<'h1'>) => <h2 {...props} />,
    img: (props: ComponentProps<'img'>) => {
      const src = typeof props.src === 'string' ? props.src : undefined;
      const isDuplicateHero = !!post.image && src === post.image;
      if (isDuplicateHero && !skippedHeroRef.current) {
        skippedHeroRef.current = true;
        return null;
      }
      return (
        <img
          loading='lazy'
          decoding='async'
          sizes='(min-width:1024px) 768px, 100vw'
          {...props}
        />
      );
    },
    pre: (props: ComponentProps<'pre'>) => <CodeBlock {...props} />,
    code: (props: ComponentProps<'code'>) => {
      const cls = props.className ?? '';
      if (/language-/.test(cls)) return <code {...props} />; // fenced handled by <pre>
      return (
        <code
          {...props}
          className={[
            'px-1 py-0.5 rounded border border-subtle',
            'bg-[rgb(var(--bg-rgb)/0.6)] dark:bg-[rgb(var(--bg-rgb)/0.12)]',
            'text-[var(--color-text)]',
            cls,
          ].join(' ')}
        />
      );
    },
  };

  return (
    <main className='relative overflow-hidden'>
      <section className='relative pt-32 pb-12 md:pt-36'>
        {/* Ambient background glows */}
        <div className='absolute inset-0 z-0 pointer-events-none'>
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

        {/* Content rendered by PostLayout */}
        <div className='relative z-10'>
          <PostLayout frontmatter={post}>
            <article className='max-w-3xl px-4 mx-auto prose prose-neutral dark:prose-invert md:px-0'>
              <MDXProvider components={components}>
                <Suspense fallback={<p>Loading content...</p>}>
                  <Component />
                </Suspense>
              </MDXProvider>

              {post.tags.length > 0 && (
                <div className='flex flex-wrap gap-2 mt-10 text-sm not-prose'>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className='rounded-full border border-[var(--color-border)] px-2 py-0.5 text-[var(--color-text)]/75'
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <AuthorBlock />

              <div className='mt-10 not-prose'>
                <Link
                  to='/blog'
                  className='inline-block text-sm font-medium text-[var(--color-brand)] hover:underline underline-offset-4'
                >
                  ← Back to Blog
                </Link>
              </div>
            </article>
          </PostLayout>
        </div>
      </section>
    </main>
  );
}
