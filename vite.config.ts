import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';

import { defineConfig, configDefaults } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// Opt-in flag so CI coverage doesn’t start the browser runner
const ENABLE_STORYBOOK_TESTS = process.env.VITEST_STORYBOOK === '1';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdx({
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [
        remarkGfm,
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
      ],
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    css: true,

    // Keep Vite/Vitest stable in CI (no browser runner by default)
    browser: { enabled: false },

    // Avoid worker churn in CI for small suites
    poolOptions: { threads: { singleThread: true } },

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
    // ✅ Only define `projects` when Storybook tests are explicitly enabled
    ...(ENABLE_STORYBOOK_TESTS
      ? {
          projects: [
            {
              extends: true,
              plugins: [
                storybookTest({
                  configDir: path.join(dirname, '.storybook'),
                }),
              ],
              test: {
                name: 'storybook',
                browser: {
                  enabled: true,
                  headless: true,
                  provider: 'playwright',
                  instances: [{ browser: 'chromium' }],
                },
                setupFiles: ['.storybook/vitest.setup.ts'],
              },
            },
          ],
        }
      : {}),
  },
});
