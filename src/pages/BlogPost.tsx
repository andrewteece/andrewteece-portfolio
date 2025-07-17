import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function BlogPost() {
  const { slug } = useParams();
  const [Post, setPost] = useState<React.FC | null>(null);

  useEffect(() => {
    import(`../content/blog/${slug}.mdx`)
      .then((mod) => setPost(() => mod.default))
      .catch(() =>
        setPost(() => () => <p className='text-red-500'>Post not found.</p>)
      );
  }, [slug]);

  return (
    <main className='max-w-3xl mx-auto py-16 px-4'>
      {Post ? <Post /> : <p>Loading post...</p>}
    </main>
  );
}
