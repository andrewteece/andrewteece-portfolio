import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: [
    '../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/**/*.stories.mdx',
    '!../src/content/**/*.mdx',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
    '@storybook/addon-themes',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
  ],
  staticDirs: ['../public'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};

export default config;
