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

          const frontmatter: BlogPost =
            mod.frontmatter ??
            mod.meta?.frontmatter ??
            mod.attributes ??
            ({} as BlogPost);

          const slug =
            frontmatter.slug ??
            path
              .split('/')
              .pop()
              ?.replace(/\.mdx$/, '') ??
            'unknown';

          return {
            title: frontmatter.title ?? 'Untitled',
            slug,
            date: frontmatter.date ?? 'Unknown date',
            excerpt: frontmatter.excerpt ?? '',
            image: frontmatter.image,
            tags: frontmatter.tags ?? [],
          };
        })
      );

      const sorted = loadedPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setPosts(sorted);
    };

    loadPosts();
  }, []);

  return (
    <main className='max-w-4xl mx-auto px-4 py-16'>
      <SEO
        title='Blog | Andrew Teece'
        description='Articles and thoughts on frontend development, React, Vite, MDX, and modern web tools.'
        url='https://andrewteece.com/blog'
      />

      <h1 className='text-4xl font-bold mb-10'>Blog</h1>

      {posts.length === 0 && <p>No posts found.</p>}

      <ul className='space-y-12'>
        {posts.map((post) => (
          <li
            key={post.slug}
            className='group border rounded-lg overflow-hidden shadow-sm transition hover:shadow-md'
          >
            <Link
              to={`/blog/${post.slug}`}
              className='flex flex-col sm:flex-row'
            >
              {post.image && (
                <img
                  src={post.image}
                  alt={post.title}
                  className='h-48 w-full sm:w-64 sm:h-auto object-cover'
                  loading='lazy'
                />
              )}
              <div className='p-6 flex flex-col justify-between'>
                <div>
                  <h2 className='text-2xl font-semibold mb-1 group-hover:underline underline-offset-4'>
                    {post.title}
                  </h2>
                  <p className='text-sm text-muted-foreground mb-3'>
                    {new Date(post.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className='text-base text-muted-foreground line-clamp-3'>
                    {post.excerpt}
                  </p>
                </div>
                {post.tags?.length > 0 && (
                  <div className='mt-4 flex flex-wrap gap-2 text-xs'>
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
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
