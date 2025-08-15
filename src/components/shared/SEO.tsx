// src/components/shared/SEO.tsx
import { Helmet } from '@dr.pogodin/react-helmet';

type SEOType = 'website' | 'article';

export interface SEOProps {
  title?: string;
  description?: string;
  image?: string; // absolute or relative
  url?: string; // absolute or relative
  type?: SEOType; // 'website' | 'article'
  publishedTime?: string;
  modifiedTime?: string;
  authorName?: string;
  tags?: string[];
  siteName?: string;
  canonical?: string; // ✅ allow explicit canonical override
}

const SITE_URL = 'https://andrewteece.com';
const DEFAULT_TITLE = 'Andrew Teece | Front-End Developer';
const DEFAULT_DESC =
  'Experienced front-end developer delivering performant, accessible, and beautiful web apps.';
const DEFAULT_IMAGE = '/images/social-preview.jpg';

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
  url = SITE_URL,
  type = 'website',
  publishedTime,
  modifiedTime,
  authorName = 'Andrew Teece',
  tags = [],
  siteName = 'Andrew Teece',
  canonical,
}: SEOProps) {
  const finalUrl = toAbs(url) ?? SITE_URL;
  const finalImage = toAbs(image) ?? toAbs(DEFAULT_IMAGE)!;
  const canonicalUrl = toAbs(canonical) ?? finalUrl;

  const isArticle = type === 'article';

  const jsonLd = isArticle
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: title,
        description,
        image: [finalImage],
        datePublished: publishedTime,
        dateModified: modifiedTime ?? publishedTime,
        author: [{ '@type': 'Person', name: authorName }],
        mainEntityOfPage: { '@type': 'WebPage', '@id': finalUrl },
        publisher: { '@type': 'Person', name: authorName },
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
      <meta property='og:url' content={finalUrl} />

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
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={finalImage} />

      {/* JSON-LD */}
      <script type='application/ld+json'>{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}
