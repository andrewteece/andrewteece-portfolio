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

      // Sort posts by newest date
      const sorted = loadedPosts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setPosts(sorted);
    };

    loadPosts();
  }, []);

  return (
    <main className='max-w-3xl mx-auto px-4 py-16'>
      <SEO
        title='Blog | Andrew Teece'
        description='Articles and thoughts on frontend development, React, Vite, MDX, and modern web tools.'
        url='https://andrewteece.com/blog'
      />

      <h1 className='text-4xl font-bold mb-4'>Blog</h1>

      {posts.length === 0 && <p>No posts found.</p>}

      <ul className='space-y-12'>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className='text-2xl font-semibold hover:underline underline-offset-4'
            >
              {post.title}
            </Link>
            <p className='text-muted-foreground text-sm mt-1'>{post.date}</p>
            <p className='text-base mt-2'>{post.excerpt}</p>
            {post.tags?.length ? (
              <div className='mt-2 flex flex-wrap gap-2 text-xs'>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className='bg-muted text-muted-foreground px-2 py-0.5 rounded'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
    </main>
  );
}
