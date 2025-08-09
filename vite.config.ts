// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { configDefaults } from 'vitest/config';
import remarkGfm from 'remark-gfm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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
    exclude: [...configDefaults.exclude, 'dist', 'coverage'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'clover'],
    },
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
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
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
  },
});
