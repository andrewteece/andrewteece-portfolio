import { useEffect, useState, type ComponentType, Suspense, lazy } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MDXProvider } from '@mdx-js/react';
import type { MDXComponents } from 'mdx/types';
import type { BlogPost, BlogPostModule } from '../types/blog';
import PostLayout from '../components/layout/PostLayout';
import AuthorBlock from '../components/layout/AuthorBlock';

const postFiles = import.meta.glob<BlogPostModule>('/src/content/blog/*.mdx');

// MDX component overrides
const components: MDXComponents = {
  h1: (props) => <h1 className='text-3xl font-bold mt-6 mb-4' {...props} />,
  a: (props) => <a className='text-blue-600 hover:underline' {...props} />,
  code: (props) => <code className='bg-muted px-1 rounded' {...props} />,
};

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [Component, setComponent] = useState<React.LazyExoticComponent<
    ComponentType<Record<string, unknown>>
  > | null>(null);

  useEffect(() => {
    if (!slug) return;

    const matchedPath = Object.keys(postFiles).find((path) =>
      path.includes(`${slug}.mdx`)
    );

    if (!matchedPath) {
      console.warn('No MDX file matched this slug:', slug);
      return;
    }

    const loadPost = async () => {
      try {
        const module = await postFiles[matchedPath]();

        const frontmatter =
          module.frontmatter ??
          module.meta?.frontmatter ??
          module.attributes ??
          {};

        const mdxString = module?.default?.toString?.() ?? '';
        const wordCount = mdxString.split(/\s+/).length;
        const minutes = Math.max(1, Math.round(wordCount / 200));
        const readingTime = `${minutes} min read`;

        setPost({
          title: frontmatter.title ?? 'Untitled',
          slug,
          date: frontmatter.date ?? 'Unknown date',
          excerpt: frontmatter.excerpt ?? '',
          image: frontmatter.image,
          tags: frontmatter.tags ?? [],
          readingTime,
        });

        // 🔥 Use React.lazy so hooks stay in sync
        const LazyComponent = lazy(async () => ({
          default: module.default as ComponentType<Record<string, unknown>>,
        }));

        setComponent(() => LazyComponent);
      } catch (err) {
        console.error('Error loading post:', err);
      }
    };

    loadPost();
  }, [slug]);

  if (!post || !Component) {
    return (
      <main className='max-w-3xl mx-auto px-4 py-20 text-center'>
        <p>Loading post...</p>
      </main>
    );
  }

  return (
    <PostLayout frontmatter={post}>
      <article className='prose prose-neutral dark:prose-invert max-w-none'>
        <h1 className='text-4xl font-bold mb-2'>{post.title}</h1>

        <p className='text-muted-foreground text-sm mb-6'>
          {new Date(post.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        <p className='text-sm text-muted-foreground mb-6'>
          ⏱️ {post.readingTime} • ✍️ Andrew Teece
        </p>

        <MDXProvider components={components}>
          <Suspense fallback={<p>Loading content...</p>}>
            <Component />
          </Suspense>
        </MDXProvider>

        {post.tags.length > 0 && (
          <div className='mt-10 flex flex-wrap gap-2 text-sm'>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className='bg-muted text-muted-foreground px-2 py-0.5 rounded'
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        <AuthorBlock />

        <div className='mt-10'>
          <Link
            to='/blog'
            className='inline-block text-sm font-medium text-primary hover:underline underline-offset-4'
          >
            ← Back to Blog
          </Link>
        </div>
      </article>
    </PostLayout>
  );
}
