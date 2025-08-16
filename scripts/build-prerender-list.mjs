// scripts/build-prerender-list.mjs
import fs from 'fs';
import path from 'path';
import fg from 'fast-glob';
import matter from 'gray-matter';

/**
 * Where your MDX posts live.
 * Adjust if needed (the glob searches multiple common locations).
 */
const POST_GLOBS = [
  'src/content/blog/**/*.mdx',
  'src/blog/**/*.mdx',
  'content/blog/**/*.mdx'
];

const PROJECT_ROOT = process.cwd();
const pkgPath = path.join(PROJECT_ROOT, 'package.json');
const distPath = path.join(PROJECT_ROOT, 'dist');

// 1) Collect post slugs from MDX frontmatter or filename
function toSlug(file) {
  const base = path.basename(file).replace(/\.mdx?$/i, '');
  return base.toLowerCase();
}

async function collectRoutes() {
  const files = await fg(POST_GLOBS, { dot: false, cwd: PROJECT_ROOT });
  const routes = new Set(['/']); // always include homepage

  for (const rel of files) {
    const abs = path.join(PROJECT_ROOT, rel);
    const raw = fs.readFileSync(abs, 'utf8');
    const { data } = matter(raw);

    const slug =
      (typeof data?.slug === 'string' && data.slug.trim()) || toSlug(rel);

    routes.add(`/blog/${slug}`);
  }
  return Array.from(routes);
}

// 2) Ensure dist exists (vite build must have run)
if (!fs.existsSync(distPath)) {
  console.error('❌ dist/ not found. Run `vite build` first.');
  process.exit(1);
}

// 3) Patch package.json -> reactSnap.include with discovered routes
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.reactSnap = pkg.reactSnap || {};
const routes = await collectRoutes();
pkg.reactSnap.include = routes;

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log('✅ reactSnap.include routes:', routes);
