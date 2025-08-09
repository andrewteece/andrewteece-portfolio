import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import { ThemeProvider } from '../context/ThemeProvider';
import App from '../App';

test('renders the app', () => {
  render(
    <MemoryRouter>
      <ThemeProvider>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </ThemeProvider>
    </MemoryRouter>
  );

  expect(screen.getByText(/andrew@andrewteece.com/i)).toBeInTheDocument();
});
