import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost, BlogPostModule } from '../types/blog';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const loadPosts = async () => {
      const postFiles = import.meta.glob<BlogPostModule>(
        '../content/blog/*.mdx'
      );

      const loadedPosts = await Promise.all(
        Object.entries(postFiles).map(async ([path, resolver]) => {
          const mod = await resolver();
          const frontmatter = mod.frontmatter;

          return {
            title: frontmatter.title ?? 'Untitled Post',
            slug:
              frontmatter.slug ??
              path
                .split('/')
                .pop()
                ?.replace(/\\.mdx$/, '') ??
              'unknown',
            date: frontmatter.date ?? 'Unknown date',
            excerpt: frontmatter.excerpt ?? '',
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
    <main className='max-w-3xl mx-auto py-16 px-4'>
      <h1 className='text-4xl font-bold mb-8 text-[var(--color-brand)]'>
        Blog
      </h1>
      <ul className='space-y-10'>
        {posts.map((post) => (
          <li key={post.slug} className='flex flex-col gap-2'>
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className='rounded-lg w-full max-h-60 object-cover border border-[var(--color-border)]'
              />
            )}
            <Link
              to={`/blog/${post.slug}`}
              className='text-2xl font-semibold text-[var(--color-brand)] hover:underline'
            >
              {post.title}
            </Link>
            <p className='text-sm text-gray-500'>{post.date}</p>
            <p className='mt-1 text-[var(--color-text)]'>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
