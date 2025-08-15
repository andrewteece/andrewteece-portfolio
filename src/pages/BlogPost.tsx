// src/pages/BlogPost.tsx
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
import type { BlogPost, BlogPostModule } from '../types/blog';
import PostLayout from '../components/layout/PostLayout';
import AuthorBlock from '../components/layout/AuthorBlock';

const postFiles = import.meta.glob<BlogPostModule>('/src/content/blog/*.mdx');

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [Component, setComponent] = useState<React.LazyExoticComponent<
    ComponentType<Record<string, unknown>>
  > | null>(null);

  // must be before any early return
  const skippedHeroRef = useRef(false);

  useEffect(() => {
    if (!slug) return;
    const matchedPath = Object.keys(postFiles).find((p) =>
      p.includes(`${slug}.mdx`)
    );
    if (!matchedPath) return;

    (async () => {
      const module = await postFiles[matchedPath]();
      const fm =
        module.frontmatter ??
        module.meta?.frontmatter ??
        module.attributes ??
        {};

      const mdxString = module?.default?.toString?.() ?? '';
      const words = mdxString.split(/\s+/).length;
      const readingTime = `${Math.max(1, Math.round(words / 200))} min read`;

      setPost({
        title: fm.title ?? 'Untitled',
        slug,
        date: fm.date ?? 'Unknown date',
        excerpt: fm.excerpt ?? '',
        image: fm.image,
        tags: fm.tags ?? [],
        readingTime,
      });

      const Lazy = lazy(async () => ({
        default: module.default as ComponentType<Record<string, unknown>>,
      }));
      setComponent(() => Lazy);
    })().catch((e) => console.error(e));
  }, [slug]);

  if (!post || !Component) {
    return (
      <main className='max-w-3xl px-4 py-20 mx-auto text-center'>
        <p>Loading post...</p>
      </main>
    );
  }

  // MDX overrides:
  // - Demote any body <h1> to <h2> so layout H1 stays unique
  // - Skip the first <img> if it matches the frontmatter hero
  const components: MDXComponents = {
    h1: (props: ComponentProps<'h1'>) => <h2 {...props} />, // layout owns the H1
    img: (props: ComponentProps<'img'>) => {
      const src = typeof props.src === 'string' ? props.src : undefined;
      const isDuplicateHero = !!post.image && src === post.image;
      if (isDuplicateHero && !skippedHeroRef.current) {
        skippedHeroRef.current = true;
        return null;
      }
      return <img {...props} />;
    },
    code: (props: ComponentProps<'code'>) => (
      <code
        className='px-1 py-0.5 rounded bg-[var(--color-bg-alt)]'
        {...props}
      />
    ),
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
