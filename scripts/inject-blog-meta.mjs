// scripts/inject-blog-meta.mjs
import { readFile, writeFile, mkdir } from 'fs/promises';
import fg from 'fast-glob';
import matter from 'gray-matter';
import path from 'node:path';

const SITE_URL = 'https://andrewteece.com';
const DIST = 'dist';
const INDEX_HTML = path.join(DIST, 'index.html');

function abs(u) {
  if (!u) return '';
  try {
    return u.startsWith('http') ? u : new URL(u, SITE_URL).toString();
  } catch {
    return u;
  }
}

function tagsFromFM(fm) {
  const title = fm.title ?? 'Untitled';
  const description = fm.excerpt ?? '';
  const image = abs(fm.image ?? '/images/social-preview.jpg');
  const slug = fm.slug ?? '';
  const url = abs(`/blog/${slug}`);
  const publishedTime = fm.date ?? '';

  return `
    <!-- injected:seo -->
    <title>${title} — Blog</title>
    <meta name="description" content="${description}">
    <link rel="canonical" href="${url}">

    <meta property="og:site_name" content="Andrew Teece">
    <meta property="og:type" content="article">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}">
    <meta property="og:url" content="${url}">
    ${
      publishedTime
        ? `<meta property="article:published_time" content="${publishedTime}">`
        : ''
    }

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    <!-- /injected:seo -->
  `.trim();
}

async function run() {
  const baseHtml = await readFile(INDEX_HTML, 'utf8');
  const mdxFiles = await fg('src/content/blog/*.mdx');

  for (const file of mdxFiles) {
    const raw = await readFile(file, 'utf8');
    const { data: fm } = matter(raw);

    if (fm.draft) continue; // don’t publish drafts

    const slug = fm.slug || path.basename(file).replace(/\.mdx$/, '');
    const outDir = path.join(DIST, 'blog', slug);
    const outHtmlPath = path.join(outDir, 'index.html');

    // Inject meta right before </head>
    const headInject = tagsFromFM(fm) + '\n</head>';
    const html = baseHtml.replace('</head>', headInject);

    await mkdir(outDir, { recursive: true });
    await writeFile(outHtmlPath, html, 'utf8');
    console.log('✓ prerendered', `/blog/${slug}`);
  }
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
