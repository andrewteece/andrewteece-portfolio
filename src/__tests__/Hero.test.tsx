import { render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import Hero from '../components/sections/Hero';

test('renders Hero section with intro', () => {
  render(
    <HelmetProvider>
      <Hero />
    </HelmetProvider>
  );
  expect(screen.getByText(/andrew teece/i)).toBeInTheDocument();
  expect(screen.getByText(/front-end web developer/i)).toBeInTheDocument();
});
