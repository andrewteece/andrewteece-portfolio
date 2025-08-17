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

const SITE_URL = 'https://www.andrewteece.com';
const OG_WIDTH = 1280;
const OG_HEIGHT = 720;

// ---- helpers ----
const toISO = (d: unknown): string => {
  if (d instanceof Date && !Number.isNaN(d.getTime())) return d.toISOString();
  if (typeof d === 'string' || typeof d === 'number') {
    const t = Date.parse(String(d));
    if (Number.isFinite(t)) return new Date(t).toISOString();
  }
  return '';
};

const fmtDate = (d: unknown): string => {
  if (d instanceof Date && !Number.isNaN(d.getTime()))
    return d.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  if (typeof d === 'string' || typeof d === 'number') {
    const dt = new Date(d);
    if (!Number.isNaN(dt.getTime()))
      return dt.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
  }
  return '—';
};

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

  const iso = toISO(date);
  const human = fmtDate(date);

  return (
    <>
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
        publishedTime={iso || undefined}
        tags={tags}
        authorName='Andrew Teece'
      />

      <main id='main' className='max-w-3xl px-4 py-16 mx-auto'>
        <header className='mb-6'>
          <h1 className='text-3xl md:text-4xl font-extrabold tracking-tight text-[var(--color-brand)]'>
            {title}
          </h1>

          <div className='mt-2 flex flex-wrap items-center gap-2 text-sm text-[var(--color-text)]/70'>
            {human !== '—' ? (
              <time dateTime={iso} itemProp='datePublished'>
                {human}
              </time>
            ) : (
              <span>—</span>
            )}
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
                sizes='(min-width:1024px) 768px, 100vw'
              />
            </div>
          </figure>
        )}

        <article className='prose prose-neutral dark:prose-invert max-w-none'>
          {children}
        </article>
      </main>
    </>
  );
}
