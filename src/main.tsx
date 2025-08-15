import './styles/index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { ThemeProvider } from './context/ThemeProvider';
import { ActiveSectionProvider } from './context/ActiveSectionContext';
import { Toaster } from 'react-hot-toast';
import App from './App';

import './vitals';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <ThemeProvider>
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
                success: { icon: '✅' },
              }}
            />
          </ActiveSectionProvider>
        </ThemeProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>
);
