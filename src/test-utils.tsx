import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { ThemeProvider } from './context/ThemeProvider';

export function renderWithProviders(ui: ReactNode) {
  return render(
    <MemoryRouter>
      <HelmetProvider>
        <ThemeProvider>{ui}</ThemeProvider>
      </HelmetProvider>
    </MemoryRouter>
  );
}
