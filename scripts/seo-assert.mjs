import fs from 'fs';
import path from 'path';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'dist', 'blog');

function must(haystack, re, what, file) {
  if (!re.test(haystack)) {
    console.error(`❌ ${what} missing in ${file}`);
    process.exit(1);
  }
}

for (const entry of fs.readdirSync(BLOG_DIR)) {
  const f = path.join(BLOG_DIR, entry, 'index.html');
  if (!fs.existsSync(f)) continue; // skip blog index or non-posts here
  const html = fs.readFileSync(f, 'utf8');
  must(
    html,
    /<link\s+rel="canonical"\s+href="https:\/\/www\.andrewteece\.com\/blog\/[^"]+"/i,
    'canonical',
    f
  );
  must(html, /<meta\s+property="og:title"\s+content="[^"]+"/i, 'og:title', f);
  must(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]+"/i,
    'twitter:title',
    f
  );
  must(
    html,
    /<script[^>]+application\/ld\+json[^>]*>\s*{[\s\S]*"@type"\s*:\s*"BlogPosting"/i,
    'BlogPosting JSON-LD',
    f
  );
}
console.log('✅ SEO assert passed for blog pages');
