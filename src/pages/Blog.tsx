// src/pages/Blog.tsx
import { Link } from 'react-router-dom';
import type { BlogPost } from '../types/blog';

const blogPosts: BlogPost[] = [
  {
    title: 'Building a Portfolio with React and Tailwind',
    slug: 'first-post',
    date: '2025-07-17',
    excerpt:
      'How I designed and built my developer portfolio using React, Tailwind CSS, and Vite.',
  },
];

export default function Blog() {
  return (
    <main className='max-w-3xl mx-auto py-16 px-4'>
      <h1 className='text-4xl font-bold mb-8 text-[var(--color-brand)]'>
        Blog
      </h1>
      <ul className='space-y-10'>
        {blogPosts.map((post) => (
          <li key={post.slug}>
            <Link
              to={`/blog/${post.slug}`}
              className='text-2xl font-semibold text-[var(--color-brand)] hover:underline'
            >
              {post.title}
            </Link>
            <p className='text-sm text-gray-500'>{post.date}</p>
            <p className='mt-1'>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
