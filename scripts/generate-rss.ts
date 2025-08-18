// scripts/generate-rss.ts
import { promises as fs } from 'fs';
import * as path from 'path';
import fg from 'fast-glob';
import matter from 'gray-matter';
import RSS from 'rss';

const siteUrl = 'https://www.andrewteece.com';
const outDir = path.resolve(process.cwd(), 'dist');
const postsGlob = 'src/content/blog/**/*.mdx';

type Frontmatter = {
  title?: string;
  date?: string;
  excerpt?: string;
  slug?: string;
};

function slugFromFile(file: string) {
  const base = path.basename(file, path.extname(file));
  return base.replace(/^\d{4}-\d{2}-\d{2}-/, ''); // allow dated filenames but strip date prefix
}

function toISO(d?: string | Date) {
  if (!d) return new Date().toISOString();
  const dt = typeof d === 'string' ? new Date(d) : d;
  return isNaN(dt.getTime()) ? new Date().toISOString() : dt.toISOString();
}

function formatDateYYYYMMDD(d?: string | Date) {
  const iso = toISO(d);
  return iso.slice(0, 10);
}

async function ensureOutDir() {
  await fs.mkdir(outDir, { recursive: true });
}

async function readPosts() {
  const files = await fg(postsGlob, { dot: false });
  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(file, 'utf8');
      const { data, content } = matter(raw);
      const fm = data as Frontmatter;
      const slug = fm.slug || slugFromFile(file);
      // Prefer frontmatter date; fall back to file mtime
      const stat = await fs.stat(file);
      const date = fm.date ?? stat.mtime.toISOString();
      return {
        slug,
        title: fm.title || slug,
        date,
        excerpt: fm.excerpt || content.trim().slice(0, 180),
      };
    })
  );

  // newest first
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

async function writeRSS(posts: Awaited<ReturnType<typeof readPosts>>) {
  const feed = new RSS({
    title: 'Andrew Teece — Blog',
    description:
      'Articles on React, Vite, Tailwind, TypeScript, and front-end craft.',
    site_url: siteUrl,
    feed_url: `${siteUrl}/feed.xml`,
    language: 'en',
  });

  posts.forEach((p) => {
    const url = `${siteUrl}/blog/${p.slug}`;
    feed.item({
      title: p.title,
      description: p.excerpt,
      url,
      guid: url,
      date: p.date,
    });
  });

  const xml = feed.xml({ indent: true });
  await fs.writeFile(path.join(outDir, 'feed.xml'), xml, 'utf8');
}

async function writeSitemap(posts: Awaited<ReturnType<typeof readPosts>>) {
  const urls: { loc: string; lastmod?: string; priority?: string }[] = [
    { loc: `${siteUrl}/`, lastmod: formatDateYYYYMMDD(), priority: '1.0' },
    { loc: `${siteUrl}/blog`, lastmod: formatDateYYYYMMDD(), priority: '0.8' },
  ];

  posts.forEach((p) => {
    urls.push({
      loc: `${siteUrl}/blog/${p.slug}`,
      lastmod: formatDateYYYYMMDD(p.date),
      priority: '0.7',
    });
  });

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u) =>
          `  <url>\n` +
          `    <loc>${u.loc}</loc>\n` +
          (u.lastmod ? `    <lastmod>${u.lastmod}</lastmod>\n` : '') +
          (u.priority ? `    <priority>${u.priority}</priority>\n` : '') +
          `  </url>\n`
      )
      .join('') +
    `</urlset>\n`;

  await fs.writeFile(path.join(outDir, 'sitemap.xml'), xml, 'utf8');
}

async function writeRobots() {
  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
  await fs.writeFile(path.join(outDir, 'robots.txt'), robots, 'utf8');
}

async function main() {
  await ensureOutDir();
  const posts = await readPosts();
  await writeRSS(posts);
  await writeSitemap(posts);
  await writeRobots();
  console.log('✓ generated feed.xml, sitemap.xml, robots.txt');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
