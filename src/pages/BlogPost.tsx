import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { BlogPostModule, BlogPost } from '../types/blog';
import PostLayout from '../components/layout/PostLayout';
import SEO from '../components/shared/SEO';

export default function BlogPost() {
  const { slug } = useParams();
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [PostComponent, setPostComponent] = useState<React.FC | null>(null);
  const [frontmatter, setFrontmatter] = useState<BlogPost | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const allPosts = import.meta.glob<BlogPostModule>(
          '../content/blog/*.mdx'
        );
        const path = Object.keys(allPosts).find((key) =>
          key.includes(`${slug}.mdx`)
        );

        if (!path) throw new Error('Post not found');
        const mod = await allPosts[path]();
        const currentPost = mod.frontmatter;

        const otherPosts = await Promise.all(
          Object.entries(allPosts)
            .filter(([key]) => !key.includes(`${slug}.mdx`))
            .map(async ([, resolver]) => {
              const m = await resolver();
              return m.frontmatter;
            })
        );

        const related = otherPosts
          .filter((post) =>
            post.tags?.some((tag: string) => currentPost.tags?.includes(tag))
          )
          .slice(0, 3); // limit to 3

        setFrontmatter(currentPost);
        setPostComponent(() => mod.default);
        setRelatedPosts(related);
      } catch {
        setPostComponent(() => () => <p>Post not found.</p>);
      }
    };

    loadPost();
  }, [slug]);

  if (!PostComponent || !frontmatter) return <p className='p-8'>Loading...</p>;

  return (
    <>
      <SEO
        title={frontmatter.title}
        description={frontmatter.excerpt}
        image={
          frontmatter.image ||
          'https://andrewteece.com/images/social-preview.webp'
        }
        url={`https://andrewteece.com/blog/${slug}`}
      />

      <PostLayout frontmatter={frontmatter}>
        <PostComponent />
      </PostLayout>
      {relatedPosts.length > 0 && (
        <section className='mt-16 border-t pt-10'>
          <h2 className='text-2xl font-semibold text-[var(--color-brand)] mb-4'>
            Related Posts
          </h2>
          <ul className='space-y-4'>
            {relatedPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  to={`/blog/${post.slug}`}
                  className='text-lg text-[var(--color-brand)] hover:underline'
                >
                  {post.title}
                </Link>
                <p className='text-sm text-gray-500'>{post.date}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}
