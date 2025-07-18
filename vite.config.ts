import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@mdx-js/rollup';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    mdx({
      remarkPlugins: [
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
      ],
    }),
  ],
});
