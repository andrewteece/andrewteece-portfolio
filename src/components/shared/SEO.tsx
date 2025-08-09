// src/components/shared/SEO.tsx
import { Helmet } from '@dr.pogodin/react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export default function SEO({
  title = 'Andrew Teece | Front-End Developer',
  description = 'Experienced front-end developer delivering performant, accessible, and beautiful web apps.',
  image = 'https://andrewteece.com/images/social-preview.jpg',
  url = 'https://andrewteece.com',
}: SEOProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Andrew Teece',
    url,
    sameAs: [
      'https://github.com/andrewteece',
      'https://www.linkedin.com/in/andrew-teece/',
    ],
    jobTitle: 'Front-End Web Developer',
    image,
  };

  return (
    <Helmet>
      {/* Standard Meta */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='author' content='Andrew Teece' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />

      {/* Open Graph */}
      <meta property='og:type' content='article' />
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />

      {/* Twitter Card */}
      <meta name='twitter:card' content='summary_large_image' />
      <meta name='twitter:title' content={title} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={image} />

      {/* Apple Meta Tags */}
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='Andrew Teece' />
      <link rel='apple-touch-icon' href='/apple-touch-icon.webp' />

      {/* JSON-LD Structured Data */}
      <script type='application/ld+json'>
        {JSON.stringify(structuredData)}
      </script>

      {/* RSS Feed */}
      <link
        rel='alternate'
        type='application/rss+xml'
        title='RSS Feed'
        href='/feed.xml'
      />
    </Helmet>
  );
}
