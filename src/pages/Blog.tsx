import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { BlogPost, BlogPostModule } from '../types/blog';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const selectedTag = searchParams.get('tag');

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
                ?.replace(/\.mdx$/, '') ??
              'unknown',
            date: frontmatter.date ?? 'Unknown date',
            excerpt: frontmatter.excerpt ?? '',
            image: frontmatter.image,
            tags: frontmatter.tags ?? [],
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

      {selectedTag && (
        <div className='mb-6'>
          <button
            onClick={() => navigate('/blog')}
            className='text-sm text-[var(--color-brand)] underline hover:opacity-80'
          >
            Clear filter: {selectedTag}
          </button>
        </div>
      )}

      <ul className='space-y-10'>
        {posts
          .filter((post) =>
            selectedTag ? post.tags?.includes(selectedTag) : true
          )
          .map((post) => (
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
              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <ul className='flex flex-wrap gap-2 mt-2'>
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Link
                        to={`/blog?tag=${encodeURIComponent(tag)}`}
                        className='px-2 py-1 text-xs rounded-full bg-[var(--color-bg)] border border-[var(--color-border)] text-[var(--color-brand)] hover:underline'
                      >
                        {tag}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
      </ul>
    </main>
  );
}
