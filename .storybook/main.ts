import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    // Only load Storybook stories (CSF + MDX stories)
    '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/**/*.stories.mdx',
    // Explicitly exclude site/blog MDX so SB doesn't try to parse it
    '!../src/content/**/*.mdx',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
