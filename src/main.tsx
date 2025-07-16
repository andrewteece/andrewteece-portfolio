import { Toaster } from 'react-hot-toast';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';
import { ThemeProvider } from './context/ThemeProvider.tsx';
import { HelmetProvider } from 'react-helmet-async';
import { ActiveSectionProvider } from './context/ActiveSectionContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <HelmetProvider>
        <ActiveSectionProvider>
          <App />
          <Toaster
            position='bottom-center'
            toastOptions={{
              className:
                'dark:bg-[var(--color-bg-alt)] dark:text-[var(--color-text)] dark:border dark:border-[var(--color-border)]',
              style: {
                background: 'var(--color-bg-alt)',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
              },
              success: {
                icon: '✅',
              },
            }}
          />
        </ActiveSectionProvider>
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>
);
