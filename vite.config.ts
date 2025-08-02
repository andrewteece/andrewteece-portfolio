import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { configDefaults } from 'vitest/config';
import remarkGfm from 'remark-gfm';

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
    exclude: [...configDefaults.exclude, 'dist', 'coverage'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'clover'],
    },
  },
});
