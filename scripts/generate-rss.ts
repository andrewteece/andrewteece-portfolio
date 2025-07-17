import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import RSS from 'rss';

const POSTS_DIR = path.join(process.cwd(), 'src/content/blog');
const site = 'https://andrewteece.com';

const feed = new RSS({
  title: 'Andrew Teece Blog',
  site_url: site,
  feed_url: `${site}/feed.xml`,
  language: 'en',
  copyright: `${new Date().getFullYear()} Andrew Teece`,
});

fs.readdirSync(POSTS_DIR).forEach((file) => {
  if (!file.endsWith('.mdx')) return;

  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');
  const { data: frontmatter } = matter(raw);

  feed.item({
    title: frontmatter.title,
    description: frontmatter.excerpt,
    url: `${site}/blog/${frontmatter.slug}`,
    date: new Date(frontmatter.date),
  });
});

fs.writeFileSync('./public/feed.xml', feed.xml());
console.log('✅ RSS feed generated at public/feed.xml');
