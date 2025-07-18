import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { BlogPost, BlogPostModule } from '../types/blog';
import PostLayout from '../components/layout/PostLayout';
import AuthorBlock from '../components/layout/AuthorBlock';

const postFiles = import.meta.glob<BlogPostModule>('/src/content/blog/*.mdx');

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [PostComponent, setPostComponent] = useState<React.FC | null>(null);

  useEffect(() => {
    if (!slug) return;

    const matchedPath = Object.keys(postFiles).find((path) =>
      path.includes(`${slug}.mdx`)
    );

    if (!matchedPath) {
      console.warn('No MDX file matched this slug.');
      return;
    }

    const loadPost = async () => {
      const mod = await postFiles[matchedPath]();

      const frontmatter: BlogPost =
        mod.frontmatter ??
        mod.meta?.frontmatter ??
        mod.attributes ??
        ({} as BlogPost);

      // const Component = mod.default;

      // ⏱️ Estimate reading time from rendered MDX source
      const raw = mod?.default?.toString?.() ?? '';
      const wordCount = raw.split(/\s+/).length;
      const minutes = Math.max(1, Math.round(wordCount / 200));
      const readingTime = `${minutes} min read`;

      setPost({ ...frontmatter, readingTime });
      setPostComponent(() => mod.default);
    };

    loadPost();
  }, [slug]);

  if (!PostComponent || !post) {
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

        {/* Date */}
        <p className='text-muted-foreground text-sm mb-6'>
          {new Date(post.date).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>

        {/* Reading time + author */}
        <p className='text-sm text-muted-foreground mb-6'>
          ⏱️ {post.readingTime ?? '—'} • ✍️ Andrew Teece
        </p>

        <PostComponent />

        {post.tags?.length > 0 && (
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
