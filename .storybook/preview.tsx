import type { Preview } from '@storybook/react';

import React from 'react';
import '../src/styles/index.css';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { ThemeProvider } from '../src/context/ThemeProvider';
import { withThemeByClassName } from '@storybook/addon-themes';

// matchMedia polyfill so components that read it (e.g., Header) don’t warn
const withMatchMediaPolyfill = (Story: React.FC) => {
  if (typeof window !== 'undefined' && !window.matchMedia) {
    window.matchMedia = () => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
  }
  return <Story />;
};

const withAppProviders = (Story: React.FC) => (
  <HelmetProvider>
    <ThemeProvider>
      <div className='min-h-screen bg-bg text-text'>
        <Story />
      </div>
    </ThemeProvider>
  </HelmetProvider>
);

const CUSTOM_VIEWPORTS = {
  mobile375: {
    name: 'Mobile 375',
    styles: { width: '375px', height: '667px' },
    type: 'mobile',
  },
  tablet768: {
    name: 'Tablet 768',
    styles: { width: '768px', height: '1024px' },
    type: 'tablet',
  },
};

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: { light: '', dark: 'dark' }, // toggles 'dark' class on <html>
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
    withMatchMediaPolyfill,
    withAppProviders,
  ],
  parameters: {
    viewport: {
      viewports: CUSTOM_VIEWPORTS,
      defaultViewport: 'responsive',
    },
    layout: 'centered',
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
      expanded: true,
    },
    a11y: {
      element: '#root',
      manual: false,
    },
  },
  tags: ['autodocs'],
};

export default preview;
