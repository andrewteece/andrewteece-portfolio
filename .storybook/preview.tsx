import type { Preview } from '@storybook/react-vite';
import React from 'react';
import '../src/styles/index.css';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { ThemeProvider } from '../src/context/ThemeProvider';
import { withThemeByClassName } from '@storybook/addon-themes';

const withAppProviders = (Story: React.FC) => (
  <HelmetProvider>
    <ThemeProvider>
      <div className='min-h-screen bg-bg text-text'>
        <Story />
      </div>
    </ThemeProvider>
  </HelmetProvider>
);

// matchMedia polyfill so components that read it (e.g., Header) don’t warn
const withMatchMediaPolyfill = (Story: React.FC) => {
  if (typeof window !== 'undefined' && !window.matchMedia) {
    window.matchMedia = () => ({
      matches: false,
      media: '',
      onchange: null,
      addListener: () => {}, // legacy
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    });
  }
  return <Story />;
};

const preview: Preview = {
  decorators: [
    withAppProviders,
    withThemeByClassName({
      themes: { light: '', dark: 'dark' }, // toggles 'dark' class on <html>
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
    withMatchMediaPolyfill,
  ],
  parameters: {
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    // keep a11y default settings; that custom `test` flag isn’t used by the addon
  },
  // ⬇️ tags belong at the ROOT (not inside parameters)
  tags: ['autodocs'],
};

export default preview;
