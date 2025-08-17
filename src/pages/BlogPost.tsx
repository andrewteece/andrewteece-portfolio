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

// Strongly-typed absolute glob
const postFiles: Record<string, () => Promise<BlogPostModule>> =
  import.meta.glob<BlogPostModule>('/src/content/blog/*.mdx');

type PostShape = BlogPost & { readingTime?: string };

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostShape | null>(null);
  const [Component, setComponent] = useState<React.LazyExoticComponent<
    ComponentType<Record<string, unknown>>
  > | null>(null);
  const [notFound, setNotFound] = useState(false);

  // must be before any early return
  const skippedHeroRef = useRef(false);

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

    // Load module & normalize frontmatter
    void (async () => {
      const module = await postFiles[matchedPath]();
      const fm: Partial<BlogFrontmatter> = module.frontmatter ?? {};

      // Naive reading time: prefer excerpt length; fallback to ~2 min
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

      // lazy() loader without async/await to satisfy require-await
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

  /* ----------------------- CodeBlock with Copy button ----------------------- */
  type CodeEl = React.ReactElement<ComponentProps<'code'>>;
  const isCodeElement = (n: React.ReactNode): n is CodeEl =>
    React.isValidElement(n) && n.type === 'code';

  type WithChildren = { children?: React.ReactNode; className?: string };
  const isElementWithChildren = (
    n: React.ReactNode
  ): n is React.ReactElement<WithChildren> =>
    React.isValidElement<WithChildren>(n);

  const getText = (n: React.ReactNode): string => {
    if (typeof n === 'string' || typeof n === 'number') return String(n);
    if (Array.isArray(n)) return n.map(getText).join('');
    if (isElementWithChildren(n)) return getText(n.props.children);
    return '';
  };

  const languageFromClass = (cls?: string): string => {
    const m = /language-([a-z0-9+-]+)$/i.exec(cls ?? '');
    return (m?.[1] ?? 'text').toUpperCase();
  };

  function CodeBlock(preProps: ComponentProps<'pre'>) {
    // ✅ hooks must be unconditionally called at the top
    const [copied, setCopied] = useState(false);

    const child = React.Children.only(preProps.children);
    if (!isCodeElement(child)) {
      return <pre {...preProps} />;
    }

    const codeClass = child.props.className ?? '';
    const lang = languageFromClass(codeClass);
    const raw = getText(child.props.children);

    // ✅ do not pass an async function directly to onClick
    const onCopy = async () => {
      try {
        if (typeof navigator !== 'undefined' && navigator.clipboard) {
          await navigator.clipboard.writeText(raw);
        } else {
          const ta = document.createElement('textarea');
          ta.value = raw;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        /* noop */
      }
    };

    return (
      <figure className='my-6 overflow-hidden border not-prose rounded-xl border-subtle bg-surface'>
        <div className='flex items-center justify-between px-3 py-2 text-xs border-b border-subtle text-muted'>
          <span
            aria-label={`Language: ${lang}`}
            className='font-medium tracking-wide'
          >
            {lang}
          </span>
          <button
            type='button'
            onClick={() => {
              void onCopy();
            }}
            className='rounded-md px-2 py-1 text-[var(--color-brand)] hover:underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(var(--brand-rgb)/0.45)]'
            aria-live='polite'
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <pre className='max-h-[60vh] overflow-auto p-4 text-sm leading-relaxed'>
          {/* re-render original code so any highlighter still works */}
          <code className={codeClass}>{raw}</code>
        </pre>
      </figure>
    );
  }

  // MDX overrides:
  // - Demote any body <h1> to <h2> so layout H1 stays unique
  // - Skip the first <img> if it matches the frontmatter hero
  // - Code: Copy UI for fenced blocks; subtle styling for inline code
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
    // Fenced code blocks
    pre: (props: ComponentProps<'pre'>) => <CodeBlock {...props} />,
    // Inline code
    code: (props: ComponentProps<'code'>) => {
      const cls = props.className ?? '';
      if (/language-/.test(cls)) return <code {...props} />; // let <pre> handle blocks
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
    <PostLayout frontmatter={post}>
      {/* Body only; layout renders title/meta/hero */}
      <article className='prose prose-neutral dark:prose-invert max-w-none'>
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
  );
}
