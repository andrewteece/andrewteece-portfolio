// scripts/prerender.mjs
// Static prerenderer: injects canonical, OG/Twitter, and BlogPosting JSON-LD
// into the built HTML for each blog route — no headless browser required.

import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
import matter from 'gray-matter';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const TEMPLATE_FILE = path.join(DIST, 'index.html');

// --- Site constants (keep in sync with SEO.tsx) ---
const SITE_URL = 'https://www.andrewteece.com';
const SITE_NAME = 'Andrew Teece';
const TWITTER_HANDLE = '@AndrewTeec43111';
const DEFAULT_IMAGE = `${SITE_URL}/images/social-preview.jpg`;
const OG_WIDTH = 1280;
const OG_HEIGHT = 720;

// --- Helpers ---
function mustRead(file) {
  if (!fs.existsSync(file)) {
    console.error(`❌ Not found: ${file}`);
    process.exit(1);
  }
  return fs.readFileSync(file, 'utf8');
}

function writeFile(outFile, html) {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html, 'utf8');
}

function injectHead(baseHtml, headHtml) {
  return baseHtml.replace('</head>', `\n${headHtml}\n</head>`);
}

function escapeAttr(s = '') {
  return String(s).replace(/"/g, '&quot;').trim();
}

// Build head tags for a blog post
function blogHeadTags({
  title,
  description,
  canonical,
  image,
  date,
  tags = [],
}) {
  const safeTitle = escapeAttr(title);
  const safeDesc = escapeAttr(description);
  const safeImage = escapeAttr(image || DEFAULT_IMAGE);
  const safeCanonical = escapeAttr(canonical);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: [safeImage],
    datePublished: date,
    dateModified: date,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL,
      sameAs: [
        'https://github.com/andrewteece',
        'https://www.linkedin.com/in/andrew-teece/',
        'https://x.com/AndrewTeec43111',
      ],
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': safeCanonical,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/logo.png`,
      },
    },
  };
  if (tags?.length) jsonLd.keywords = tags.join(', ');

  return `
    <!-- prerender:blog -->
    <link rel="canonical" href="${safeCanonical}">
    <meta name="description" content="${safeDesc}">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${safeTitle}">
    <meta property="og:description" content="${safeDesc}">
    <meta property="og:image" content="${safeImage}">
    <meta property="og:image:width" content="${OG_WIDTH}">
    <meta property="og:image:height" content="${OG_HEIGHT}">
    <meta property="og:url" content="${safeCanonical}">
    <meta property="article:published_time" content="${date}">
    ${tags
      .map((t) => `<meta property="article:tag" content="${escapeAttr(t)}">`)
      .join('\n    ')}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="${TWITTER_HANDLE}">
    <meta name="twitter:creator" content="${TWITTER_HANDLE}">
    <meta name="twitter:title" content="${safeTitle}">
    <meta name="twitter:description" content="${safeDesc}">
    <meta name="twitter:image" content="${safeImage}">
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  `.trim();
}

// Build head tags for /blog index (optional)
function blogIndexHeadTags() {
  const canonical = `${SITE_URL}/blog`;
  const title = 'Blog — Andrew Teece';
  const description = 'Articles on React, Vite, Tailwind, and front-end craft.';
  return `
    <!-- prerender:blog-index -->
    <link rel="canonical" href="${canonical}">
    <meta name="description" content="${description}">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${DEFAULT_IMAGE}">
    <meta property="og:image:width" content="${OG_WIDTH}">
    <meta property="og:image:height" content="${OG_HEIGHT}">
    <meta property="og:url" content="${canonical}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="${TWITTER_HANDLE}">
    <meta name="twitter:creator" content="${TWITTER_HANDLE}">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${DEFAULT_IMAGE}">
  `.trim();
}

(async () => {
  if (!fs.existsSync(DIST)) {
    console.error('❌ dist/ not found. Run `vite build` first.');
    process.exit(1);
  }
  const baseHtml = mustRead(TEMPLATE_FILE);

  // Collect posts from MDX (same globs you used before)
  const POST_GLOBS = [
    'src/content/blog/**/*.mdx',
    'src/blog/**/*.mdx',
    'content/blog/**/*.mdx',
  ];
  const files = await fg(POST_GLOBS, { cwd: ROOT, dot: false });

  // Prerender /blog index tags
  {
    const outFile = path.join(DIST, 'blog', 'index.html');
    const head = blogIndexHeadTags();
    writeFile(outFile, injectHead(baseHtml, head));
    console.log(`✅ wrote blog index: ${path.relative(ROOT, outFile)}`);
  }

  // Prerender each post
  for (const rel of files) {
    const src = path.join(ROOT, rel);
    const raw = fs.readFileSync(src, 'utf8');
    const { data } = matter(raw);

    const slug =
      (typeof data.slug === 'string' && data.slug.trim()) ||
      path
        .basename(rel)
        .replace(/\.mdx?$/i, '')
        .toLowerCase();

    const title = data.title || slug;
    const description =
      data.excerpt ||
      data.description ||
      'Article from Andrew Teece on modern front-end development.';
    const image = data.image
      ? String(data.image).startsWith('http')
        ? data.image
        : `${SITE_URL}${data.image}`
      : DEFAULT_IMAGE;
    const date = data.date || new Date().toISOString().slice(0, 10);
    const tags = Array.isArray(data.tags) ? data.tags : [];

    const canonical = `${SITE_URL}/blog/${slug}`;

    const head = blogHeadTags({
      title,
      description,
      canonical,
      image,
      date,
      tags,
    });

    const outFile = path.join(DIST, 'blog', slug, 'index.html');
    writeFile(outFile, injectHead(baseHtml, head));
    console.log(`✅ wrote post: ${path.relative(ROOT, outFile)}`);
  }

  console.log('🎉 prerender complete (no browser required)');
})();
