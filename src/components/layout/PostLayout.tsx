// src/components/layout/PostLayout.tsx
import type { PropsWithChildren } from 'react';
import SEO from '../shared/SEO';
import type { BlogPost } from '../../types/blog';

type Frontmatter = BlogPost & {
  imageAlt?: string;
  readingTime?: string;
};

interface PostLayoutProps {
  frontmatter: Frontmatter;
  children: React.ReactNode;
}

const SITE_URL = 'https://andrewteece.com';

// Default social/OG dimensions that match your rendered 16:9 hero (1280x720)
const OG_WIDTH = 1280;
const OG_HEIGHT = 720;

export default function PostLayout({
  frontmatter,
  children,
}: PropsWithChildren<PostLayoutProps>) {
  const {
    title,
    slug,
    date,
    excerpt,
    image,
    imageAlt,
    tags = [],
    readingTime,
  } = frontmatter;

  const canonical = `${SITE_URL}/blog/${slug}`;
  const socialAlt = imageAlt ?? title;

  return (
    <>
      {/* SEO: article-aware OpenGraph/Twitter + JSON-LD */}
      <SEO
        title={`${title} — Blog`}
        description={excerpt}
        image={image}
        imageAlt={socialAlt}
        imageWidth={OG_WIDTH}
        imageHeight={OG_HEIGHT}
        url={canonical}
        canonical={canonical}
        type='article'
        publishedTime={date}
        tags={tags}
        authorName='Andrew Teece'
      />

      <main className='max-w-3xl px-4 py-16 mx-auto'>
        <header className='mb-6'>
          <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-brand)]'>
            {title}
          </h1>

          <div className='mt-2 flex flex-wrap items-center gap-2 text-sm text-[var(--color-text)]/70'>
            <time>
              {new Date(date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
            {readingTime && (
              <>
                <span aria-hidden>•</span>
                <span>⏱️ {readingTime}</span>
              </>
            )}
            <span aria-hidden>•</span>
            <span>✍️ Andrew Teece</span>
          </div>
        </header>

        {image && (
          <figure className='not-prose mb-8 overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] shadow-sm'>
            <div className='aspect-[16/9] w-full overflow-hidden'>
              <img
                src={image}
                alt={socialAlt}
                className='object-cover w-full h-full'
                loading='eager'
                decoding='async'
                width={OG_WIDTH}
                height={OG_HEIGHT}
              />
            </div>
            {/* Optional: uncomment to show a visible caption
            <figcaption className="px-4 py-2 text-xs text-[var(--color-text)]/60">
              {socialAlt}
            </figcaption>
            */}
          </figure>
        )}

        <article className='prose prose-neutral dark:prose-invert max-w-none'>
          {children}
        </article>

        {/* (Optional) Related posts section could be injected here later */}
      </main>
    </>
  );
}
