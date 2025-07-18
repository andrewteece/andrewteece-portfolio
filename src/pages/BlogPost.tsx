import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { BlogPost, BlogPostModule } from '../types/blog';
import PostLayout from '../components/layout/PostLayout';

const postFiles = import.meta.glob<BlogPostModule>('/src/content/blog/*.mdx');

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [PostComponent, setPostComponent] = useState<React.FC | null>(null);

  useEffect(() => {
    if (!slug) {
      console.log('Missing slug param');
      return;
    }

    console.log('🔍 Slug:', slug);
    console.log('🧾 Available post file paths:', Object.keys(postFiles));

    const matchedPath = Object.keys(postFiles).find((path) =>
      path.includes(`${slug}.mdx`)
    );

    console.log('📂 Matched path:', matchedPath);

    if (!matchedPath) {
      console.warn('No MDX file matched this slug.');
      return;
    }

    const loadPost = async () => {
      const mod = await postFiles[matchedPath]();

      console.log('📦 Loaded MDX module:', mod);
      console.log('📄 mod.default:', mod.default);
      console.log('📝 mod.frontmatter:', mod.frontmatter);
      console.log('🗂 mod.meta:', mod.meta);
      console.log('🧾 mod.attributes:', mod.attributes);

      const frontmatter: BlogPost =
        mod.frontmatter ??
        mod.meta?.frontmatter ??
        mod.attributes ??
        ({} as BlogPost);

      setPost(frontmatter);
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
      <PostComponent />
    </PostLayout>
  );
}
