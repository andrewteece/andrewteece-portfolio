import http from 'http';
import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');
const PKG = path.join(ROOT, 'package.json');

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.map': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain',
};

function serveDist(port = 5179) {
  const server = http.createServer((req, res) => {
    const url = decodeURIComponent(req.url.split('?')[0]);
    let filePath = path.join(DIST, url);
    if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    if (!fs.existsSync(filePath)) {
      filePath = path.join(DIST, 'index.html');
    }
    const ext = path.extname(filePath);
    res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
    fs.createReadStream(filePath).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(port, () => resolve({ server, port }));
  });
}

(async () => {
  if (!fs.existsSync(DIST)) {
    console.error('❌ dist/ not found. Run `vite build` first.');
    process.exit(1);
  }

  const pkg = JSON.parse(fs.readFileSync(PKG, 'utf8'));
  const routes = pkg.reactSnap?.include || ['/'];
  if (!routes.length) {
    console.error('❌ No routes to prerender. Is reactSnap.include empty?');
    process.exit(1);
  }

  const { server, port } = await serveDist();
  const baseUrl = `http://127.0.0.1:${port}`;

  const browser = await chromium.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'], // ✅ sandbox-safe for Vercel
  });
  const ctx = await browser.newContext();

  for (const route of routes) {
    const page = await ctx.newPage();
    const url = `${baseUrl}${route}`;
    process.stdout.write(`⏳ prerender ${route} ... `);

    try {
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      // Wait for Helmet tags to appear
      await page.waitForFunction(
        () =>
          document.head.querySelectorAll('[data-rh="true"]').length > 0 &&
          document.head.querySelector('meta[property="og:title"]'),
        { timeout: 15000 }
      );
      // For blog routes, ensure BlogPosting schema exists
      if (/^\/blog\/.+/.test(route)) {
        await page.waitForFunction(
          () =>
            Array.from(
              document.querySelectorAll('script[type="application/ld+json"]')
            ).some((s) => s.textContent?.includes('"BlogPosting"')),
          { timeout: 15000 }
        );
      }

      const html = await page.content();
      const outFile = path.join(DIST, route, 'index.html');
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, html, 'utf8');

      const bytes = fs.statSync(outFile).size;
      console.log(
        `✅ wrote ${outFile.replace(ROOT + '/', '')} (${bytes} bytes)`
      );
    } catch (e) {
      console.log('❌', e.message);
    } finally {
      await page.close();
    }
  }

  await ctx.close();
  await browser.close();
  server.close();
})();
