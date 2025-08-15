// scripts/generate-rss.ts
import { readFile, writeFile, mkdir } from 'fs/promises';
import fg from 'fast-glob';
import matter from 'gray-matter';
import path from 'node:path';

const SITE_URL = 'https://andrewteece.com';
const POSTS_GLOB = 'src/content/blog/*.mdx';
const DIST = 'dist';

type Post = {
  slug: string;
  title: string;
  date: string; // ISO
  excerpt?: string;
  image?: string; // relative or absolute
  tags?: string[];
  lastmod?: string; // ISO (fallback to date)
};

function abs(u?: string): string | undefined {
  if (!u) return undefined;
  try {
    return u.startsWith('http') ? u : new URL(u, SITE_URL).toString();
  } catch {
    return u;
  }
}

async function loadPosts(): Promise<Post[]> {
  const files = await fg(POSTS_GLOB);
  const posts: Post[] = [];

  for (const file of files) {
    const raw = await readFile(file, 'utf8');
    const { data: fm } = matter(raw);

    if (fm.draft) continue;

    const slug =
      (fm.slug as string) ?? path.basename(file).replace(/\.mdx$/, '');

    posts.push({
      slug,
      title: (fm.title as string) ?? 'Untitled',
      date: (fm.date as string) ?? new Date().toISOString(),
      excerpt: (fm.excerpt as string) ?? '',
      image: fm.image as string | undefined,
      tags: (fm.tags as string[]) ?? [],
      lastmod: (fm.modified as string) ?? (fm.date as string),
    });
  }

  // newest first
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return posts;
}

function buildRss(posts: Post): string;
function buildRss(posts: Post[]): string;
function buildRss(posts: Post[] | Post): string {
  const list = Array.isArray(posts) ? posts : [posts];
  const now = new Date().toUTCString();

  const channel = `
<channel>
  <title>Andrew Teece — Blog</title>
  <link>${SITE_URL}</link>
  <description>Notes on projects, performance, and front-end craft.</description>
  <language>en-us</language>
  <lastBuildDate>${now}</lastBuildDate>
  ${list
    .map((p) => {
      const url = abs(`/blog/${p.slug}`)!;
      const img = abs(p.image);
      const pub = new Date(p.date).toUTCString();
      const categories =
        p.tags?.map((t) => `<category>${escapeXml(t)}</category>`).join('') ??
        '';

      return `
  <item>
    <title>${escapeXml(p.title)}</title>
    <link>${url}</link>
    <guid>${url}</guid>
    <pubDate>${pub}</pubDate>
    <description><![CDATA[${p.excerpt ?? ''}]]></description>
    ${categories}
    ${
      img
        ? `<enclosure url="${img}" type="image/${
            img.endsWith('.png') ? 'png' : 'jpeg'
          }" />`
        : ''
    }
  </item>`.trim();
    })
    .join('\n')}
</channel>`.trim();

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
${channel}
</rss>
`.trim();
}

function buildSitemap(urls: { loc: string; lastmod?: string }[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}
  </url>`
  )
  .join('\n')}
</urlset>`.trim();
}

function escapeXml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function main() {
  const posts = await loadPosts();

  // RSS (feed.xml)
  const rss = buildRss(posts);
  await mkdir(DIST, { recursive: true });
  await writeFile(path.join(DIST, 'feed.xml'), rss, 'utf8');

  // Sitemap (sitemap.xml)
  const urls = [
    { loc: SITE_URL }, // homepage
    { loc: `${SITE_URL}/blog` }, // blog index
    ...posts.map((p) => ({
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmod: (p.lastmod ?? p.date)?.split('T')[0],
    })),
  ];
  const sitemap = buildSitemap(urls);
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap, 'utf8');

  // robots.txt (optional but handy)
  const robots = `User-agent: *
Allow: /
Sitemap: ${SITE_URL}/sitemap.xml
`;
  await writeFile(path.join(DIST, 'robots.txt'), robots, 'utf8');

  console.log('✓ generated feed.xml, sitemap.xml, robots.txt');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
