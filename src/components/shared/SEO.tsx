// src/components/SEO.tsx
import { Helmet } from 'react-helmet-async';

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

      {/* Open Graph */}
      <meta property='og:title' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:image' content={image} />
      <meta property='og:url' content={url} />
      <meta property='og:type' content='website' />

      {/* Twitter Card */}
      <meta name='twitter:card' content='summary_large_image' />

      {/* Apple Meta Tags */}
      <meta name='apple-mobile-web-app-capable' content='yes' />
      <meta name='apple-mobile-web-app-status-bar-style' content='default' />
      <meta name='apple-mobile-web-app-title' content='Andrew Teece' />

      {/* Apple Touch Icon */}
      <link rel='apple-touch-icon' href='/apple-touch-icon.png' />

      {/* JSON-LD Structured Data */}
      <script type='application/ld+json'>
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
