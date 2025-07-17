import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { BlogPostModule, BlogPost } from '../types/blog';
import PostLayout from '../components/layout/PostLayout';
import SEO from '../components/shared/SEO';

export default function BlogPost() {
  const { slug } = useParams();
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
        setFrontmatter(mod.frontmatter);
        setPostComponent(() => mod.default);
      } catch (err) {
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
        image={frontmatter.image}
        url={`https://andrewteece.com/blog/${slug}`}
      />

      <PostLayout frontmatter={frontmatter}>
        <PostComponent />
      </PostLayout>
    </>
  );
}
