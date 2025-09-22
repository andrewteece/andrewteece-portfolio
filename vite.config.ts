/// <reference types="vitest/config" />
import mdx from '@mdx-js/rollup';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { configDefaults, defineConfig } from 'vitest/config';
// import { storybookTest } from '@storybook/addon-vitest/vitest-plugin'; // Commented out for compatibility
import { visualizer } from 'rollup-plugin-visualizer';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      open: true,
    }),
    mdx({
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter,
        [
          remarkMdxFrontmatter,
          {
            name: 'frontmatter',
          },
        ],
      ],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    css: true,
    // Keep Vite/Vitest stable in CI (no browser runner by default)
    browser: {
      enabled: false,
    },
    // Avoid worker churn in CI for small suites
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    exclude: [...configDefaults.exclude, 'dist', 'coverage'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'clover'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/*.stories.*',
        '.storybook/**',
        'scripts/**',
        'src/content/**',
      ],
    },
  },
});
