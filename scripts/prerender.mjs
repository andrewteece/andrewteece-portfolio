// scripts/prerender.mjs
// Static prerenderer: injects canonical, OG/Twitter, and BlogPosting JSON-LD
// into the built HTML for each blog route — no headless browser required.

import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
import matter from 'gray-matter';
import { evaluate } from '@mdx-js/mdx';
import * as jsxRuntime from 'react/jsx-runtime';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import remarkGfm from 'remark-gfm';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const TEMPLATE_FILE = path.join(DIST, 'index.html');

// --- Site constants (keep in sync with SEO.tsx) ---
const SITE_URL = 'https://www.andrewteece.com';
const SITE_NAME = 'Andrew Teece';
const TWITTER_HANDLE = '@andrewteece';
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

function escapeHtml(s = '') {
  return String(s)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function withStaticBody(html, body) {
  return html.replace(
    '<div id="root"></div>',
    `<div id="root">${body}</div>`
  );
}

function withPageMetadata(html, title, description, canonical) {
  const safeTitle = escapeAttr(title);
  const safeDescription = escapeAttr(description);
  const safeCanonical = escapeAttr(canonical);
  return html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${safeTitle}</title>`)
    .replace(
      /<meta\s+name="description"[\s\S]*?\/>/,
      `<meta name="description" content="${safeDescription}">`
    )
    .replace(
      '</head>',
      `\n<link rel="canonical" href="${safeCanonical}">\n</head>`
    );
}

function staticMarketingBody(title, description, extra = '') {
  return `
    <main>
      <header>
        <a href="/">Andrew Teece</a>
        <nav aria-label="Main navigation">
          <a href="/services">Services</a>
          <a href="/restaurants">Restaurants</a>
          <a href="/blog">Blog</a>
        </nav>
      </header>
      <article>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(description)}</p>
        ${extra}
        <p><a href="/restaurants#audit-request">Get a free Delivery Margin Audit</a></p>
        <p><a href="https://calendar.app.google/yutEwKP28gypqc9G6" target="_blank" rel="noopener noreferrer">Book a 20-minute call</a></p>
      </article>
    </main>
  `;
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
        'https://x.com/andrewteece',
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
  const description =
    'Practical guidance for restaurant owners, hospitality teams, and web agencies on marketing, direct ordering, and digital growth.';
  return `
    <!-- prerender:blog-index -->
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
  const posts = files.map((rel) => {
    const raw = fs.readFileSync(path.join(ROOT, rel), 'utf8');
    const { data } = matter(raw);
    const slug =
      (typeof data.slug === 'string' && data.slug.trim()) ||
      path.basename(rel).replace(/\.mdx?$/i, '').toLowerCase();
    return {
      title: data.title || slug,
      description:
        data.excerpt ||
        data.description ||
        'An article from Andrew Teece about restaurant growth and web development.',
      slug,
    };
  });

  // Prerender /blog index tags
  {
    const outFile = path.join(DIST, 'blog', 'index.html');
    const head = blogIndexHeadTags();
    const links = posts
      .map(
        (post) =>
          `<li><a href="/blog/${escapeAttr(post.slug)}">${escapeHtml(post.title)}</a><p>${escapeHtml(post.description)}</p></li>`
      )
      .join('\n');
    const body = `<main><h1>Restaurant Growth &amp; Web Development Blog</h1><p>Practical guidance for restaurant owners, hospitality teams, and web agencies.</p><ul>${links}</ul></main>`;
    const html = withPageMetadata(
      baseHtml,
      'Restaurant Growth & Web Development Blog | Andrew Teece',
      'Practical guidance for restaurant owners, hospitality teams, and web agencies on marketing, direct ordering, and digital growth.',
      `${SITE_URL}/blog`
    );
    writeFile(outFile, withStaticBody(injectHead(html, head), body));
    console.log(`✅ wrote blog index: ${path.relative(ROOT, outFile)}`);
  }

  // Prerender each post
  for (const rel of files) {
    const src = path.join(ROOT, rel);
    const raw = fs.readFileSync(src, 'utf8');
    const { data, content } = matter(raw);

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
    let articleContent = `<p>${escapeHtml(description)}</p>`;
    if (data.prerender === true) {
      const { default: Content } = await evaluate(content, {
        ...jsxRuntime,
        remarkPlugins: [remarkGfm],
      });
      articleContent = renderToStaticMarkup(createElement(Content));
    }
    const completeBody = `<main><article><h1>${escapeHtml(title)}</h1>${articleContent}<p><a href="/blog">Back to all articles</a></p></article></main>`;
    const html = withPageMetadata(baseHtml, title, description, canonical);
    writeFile(outFile, withStaticBody(injectHead(html, head), completeBody));
    console.log(`✅ wrote post: ${path.relative(ROOT, outFile)}`);
  }

  const serviceSummaries = [
    ['Restaurant Direct Ordering & Growth', '/services/restaurant-direct-ordering', 'Starting at $3,500 setup + $400/month'],
    ['Fractional Marketing Director, Hospitality', '/services/fractional-marketing-director', 'Starting at $2,000/month'],
    ['Monthly Local Marketing', '/services/monthly-local-marketing', 'Starting at $600/month'],
    ['Website Audits & Builds', '/services/website-audits-and-builds', 'Audits from $750 · Builds from $5,000'],
  ];
  const serviceLinks = serviceSummaries
    .map(([label, href]) => `<li><a href="${href}">${label}</a></li>`)
    .join('');
  const routes = [
    {
      path: '',
      title: 'Restaurant Websites, Online Ordering & Digital Marketing | Andrew Teece | Naples, FL',
      contentTitle: 'Websites and marketing to help restaurants make more money',
      description:
        'Websites and marketing to help restaurants make more money. Former restaurant owner with 21 years of operating experience and 20+ years building for the web.',
      body: `<h2>Services</h2><ul>${serviceLinks}</ul><h2>About Andrew</h2><p>Former restaurant owner, operator, marketer, and developer serving Naples, Fort Myers, Bonita Springs, and the Wisconsin Northwoods.</p><h2>Restaurant experience</h2><p>21 years running a multi-brand restaurant group. Implemented Heartland POS online ordering that grew to 40% of sales.</p><h2>Selected case studies</h2><ul><li>BAPI Headless WordPress Migration: moved a legacy e-commerce experience to a modern headless architecture.</li><li>Restaurant Direct Online Ordering: implemented Heartland POS online ordering; direct orders grew to 40% of sales.</li></ul>`,
    },
    {
      path: 'services',
      title: 'Restaurant Marketing & Website Services | Andrew Teece',
      contentTitle: 'Services for restaurants, hospitality teams, and agencies',
      description:
        'Restaurant direct ordering, hospitality marketing leadership, local marketing, and website builds for businesses and agencies.',
      body: `<h2>Services for restaurants, hospitality teams, and agencies</h2><ul>${serviceLinks}</ul>`,
    },
    {
      path: 'restaurants',
      title: 'Restaurant Online Ordering & Delivery Margin Audit | Andrew Teece',
      contentTitle: 'Stop paying 15–30% to DoorDash on your regulars.',
      description:
        'Explore direct online ordering and estimate marketplace commissions with a free delivery margin audit from a former restaurant owner.',
      body: `<h2>Stop paying 15–30% to DoorDash on your regulars.</h2><p>Estimate annual commissions from monthly delivery sales and your selected commission rate.</p><p>21 years running a multi-brand restaurant group. Implemented Heartland POS online ordering that grew to 40% of sales.</p><h2>Get a free Delivery Margin Audit</h2><p>Share your restaurant name, city, and approximate monthly delivery sales.</p><form action="https://formspree.io/f/xqpeydjk" method="POST"><label>Restaurant name <input name="restaurant" required></label><label>City <input name="city" required></label><label>Approximate monthly delivery sales <input name="monthly-sales" required></label><button type="submit">Request my free audit</button></form><h2>Frequently asked questions</h2><h3>Do I have to leave DoorDash?</h3><p>No. Direct ordering can complement the delivery channels your guests already use.</p><h3>What about POS?</h3><p>Compatibility depends on your POS and ordering systems and is confirmed before implementation.</p>`,
    },
    {
      path: 'labs',
      title: 'Developer Labs | Andrew Teece',
      contentTitle: 'Developer Labs',
      description:
        'Experimental front-end, full-stack, and developer-tool projects by Andrew Teece.',
      body: '<h2>Experiments and learning projects</h2><p>Independent builds and technical experiments from Andrew Teece.</p>',
    },
    ...serviceSummaries.map(([label, href, price]) => {
      const pathName = href.replace(/^\//, '');
      return {
        path: pathName,
        title: `${label} | Andrew Teece`,
        description: `${label} for restaurant owners, hospitality teams, and agencies. ${price}.`,
        body: `<h2>${label}</h2><p>Practical support shaped by restaurant operating experience and 20+ years building for the web.</p><p>${price}</p><p><a href="https://calendar.app.google/yutEwKP28gypqc9G6" target="_blank" rel="noopener noreferrer">Book a 20-minute call</a></p>`,
      };
    }),
  ];

  for (const route of routes) {
    const canonical = `${SITE_URL}/${route.path}`;
    const title = escapeAttr(route.title);
    const description = escapeAttr(route.description);
    const head = `
      <meta property="og:type" content="website">
      <meta property="og:title" content="${title}">
      <meta property="og:description" content="${description}">
      <meta property="og:url" content="${canonical}">
      <meta name="twitter:title" content="${title}">
      <meta name="twitter:description" content="${description}">
    `;
    let html = withPageMetadata(
      baseHtml,
      route.title,
      route.description,
      canonical
    );
    html = injectHead(html, head);
    html = withStaticBody(
      html,
      staticMarketingBody(
        route.contentTitle || route.title,
        route.description,
        route.body
      )
    );
    const outFile = path.join(
      DIST,
      route.path,
      'index.html'
    );
    writeFile(outFile, html);
  }

  console.log('🎉 prerender complete (no browser required)');
})();
