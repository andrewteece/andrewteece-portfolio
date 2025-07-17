import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { BlogPostModule } from '../types/blog';

export default function BlogPost() {
  const { slug } = useParams();
  const [PostComponent, setPostComponent] = useState<React.FC | null>(null);
  const [frontmatter, setFrontmatter] = useState<
    BlogPostModule['frontmatter'] | null
  >(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const allPosts = import.meta.glob<BlogPostModule>(
          '../content/blog/*.mdx'
        );
        const path = Object.keys(allPosts).find((key) =>
          key.includes(`${slug}.mdx`)
        );

        if (!path) {
          throw new Error('Post not found');
        }

        const mod = await allPosts[path]();
        setFrontmatter(mod.frontmatter);
        setPostComponent(() => mod.default);
      } catch (error) {
        console.error(error);
        setPostComponent(() => () => <p>Post not found.</p>);
      }
    };

    loadPost();
  }, [slug]);

  return (
    <main className='max-w-3xl mx-auto py-16 px-4'>
      {frontmatter && (
        <header className='mb-10'>
          <h1 className='text-4xl font-bold text-[var(--color-brand)] mb-2'>
            {frontmatter.title}
          </h1>
          <p className='text-sm text-gray-500'>{frontmatter.date}</p>
        </header>
      )}
      {PostComponent ? <PostComponent /> : <p>Loading...</p>}
    </main>
  );
}
