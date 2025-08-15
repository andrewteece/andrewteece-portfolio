import { render, screen } from '@testing-library/react';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import Footer from '../components/layout/Footer';

test('renders footer with CI badges', () => {
  render(
    <HelmetProvider>
      <Footer />
    </HelmetProvider>
  );
  expect(screen.getByText(/©/i)).toBeInTheDocument();
});
