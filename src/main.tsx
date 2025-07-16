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
        </ActiveSectionProvider>
      </HelmetProvider>
    </ThemeProvider>
  </StrictMode>
);
