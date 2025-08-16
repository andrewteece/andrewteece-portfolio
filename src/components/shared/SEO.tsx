// src/components/shared/SEO.tsx
import { Helmet } from '@dr.pogodin/react-helmet';

type SEOType = 'website' | 'article';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  url?: string;
  type?: SEOType;
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  tags?: string[];
  siteName?: string;
  canonical?: string;
  locale?: string;
}

const SITE_URL = 'https://andrewteece.com';
const DEFAULT_TITLE = 'Andrew Teece | Front-End Developer';
const DEFAULT_DESC =
  'Experienced front-end developer delivering performant, accessible, and beautiful web apps.';
const DEFAULT_IMAGE = '/images/social-preview.jpg';
const DEFAULT_LOCALE = 'en_US';

// Twitter handle
const TWITTER_HANDLE = '@AndrewTeec43111';

// sameAs links for structured data
const SAME_AS = [
  'https://github.com/andrewteece',
  'https://www.linkedin.com/in/andrew-teece/',
  'https://x.com/AndrewTeec43111',
];

function toAbs(input?: string): string | undefined {
  if (!input) return undefined;
  try {
    return input.startsWith('http')
      ? input
      : new URL(input, SITE_URL).toString();
  } catch {
    return input;
  }
}

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  image = DEFAULT_IMAGE,
  imageAlt,
  imageWidth,
  imageHeight,
  url = SITE_URL,
  type = 'website',
  publishedTime,
  modifiedTime,
  authorName = 'Andrew Teece',
  tags = [],
  siteName = 'Andrew Teece',
  canonical,
  locale = DEFAULT_LOCALE,
}: SEOProps) {
  const finalUrl = toAbs(url) ?? SITE_URL;
  const finalImage = toAbs(image) ?? toAbs(DEFAULT_IMAGE)!;
  const canonicalUrl = toAbs(canonical) ?? finalUrl;
  const isArticle = type === 'article';

  const jsonLd = isArticle
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description,
        image: [finalImage],
        datePublished: publishedTime,
        dateModified: modifiedTime ?? publishedTime,
        author: {
          '@type': 'Person',
          name: authorName,
          url: SITE_URL,
          sameAs: SAME_AS,
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': finalUrl },
        publisher: {
          '@type': 'Organization',
          name: siteName,
          logo: {
            '@type': 'ImageObject',
            url: `${SITE_URL}/images/logo.png`,
          },
        },
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: siteName,
        url: SITE_URL,
      };

  return (
    <Helmet>
      {/* Standard */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='canonical' href={canonicalUrl} />

      {/* Open Graph */}
      <meta property='og:site_name' content={siteName} />
      <meta property='og:type' content={type} />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={finalImage} />
      {imageWidth && (
        <meta property='og:image:width' content={String(imageWidth)} />
      )}
      {imageHeight && (
        <meta property='og:image:height' content={String(imageHeight)} />
      )}
      <meta property='og:url' content={finalUrl} />
      <meta property='og:locale' content={locale} />
      {modifiedTime && (
        <meta property='og:updated_time' content={modifiedTime} />
      )}

      {/* Article extras */}
      {isArticle && (
        <>
          {publishedTime && (
            <meta property='article:published_time' content={publishedTime} />
          )}
          {(modifiedTime ?? publishedTime) && (
            <meta
              property='article:modified_time'
              content={modifiedTime ?? publishedTime}
            />
          )}
          <meta property='article:author' content={authorName} />
          {tags.map((t) => (
            <meta key={t} property='article:tag' content={t} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:site' content={TWITTER_HANDLE} />
      <meta name='twitter:creator' content={TWITTER_HANDLE} />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={finalImage} />
      {imageAlt && <meta name='twitter:image:alt' content={imageAlt} />}

      {/* JSON-LD */}
      <script type='application/ld+json'>{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
