// .storybook/preview.tsx
import type { Preview } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import React from 'react';
import '../src/styles/index.css';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { ThemeProvider } from '../src/context/ThemeProvider';
import { withThemeByClassName } from '@storybook/addon-themes';
import { MemoryRouter } from 'react-router-dom';

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

const withAppProviders = (Story: React.FC) => (
  <HelmetProvider>
    <ThemeProvider>
      <div className='min-h-screen bg-bg text-text'>
        <Story />
      </div>
    </ThemeProvider>
  </HelmetProvider>
);

const preview: Preview = {
  decorators: [
    // Router first so any child hooks (useLocation) have context
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
    withThemeByClassName({
      themes: { light: '', dark: 'dark' }, // toggles 'dark' class on <html>
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
    withMatchMediaPolyfill,
    withAppProviders,
  ],
  parameters: {
    parameters: {
      viewport: {
        viewports: INITIAL_VIEWPORTS,
        defaultViewport: 'responsive',
      },
    },
    layout: 'centered',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
    },
    a11y: {
      // Runs Axe checks automatically in the Accessibility tab
      element: '#root', // default Storybook preview root
      manual: false, // set to true if you want to trigger checks manually
    },
  },
  tags: ['autodocs'],
};

export default preview;
