// src/__tests__/Hero.test.tsx
import { render, screen } from '@testing-library/react';
import { HelmetProvider } from '@dr.pogodin/react-helmet';
import Hero from '../components/sections/Hero';

test('renders Hero section with intro', () => {
  render(
    <HelmetProvider>
      <Hero />
    </HelmetProvider>
  );

  // Be specific: grab the hero H1 instead of any text node
  expect(
    screen.getByRole('heading', { level: 1, name: /andrew teece/i })
  ).toBeInTheDocument();

  // Slightly more flexible match for "Front-End" vs "Frontend"
  expect(screen.getByText(/front[- ]?end web developer/i)).toBeInTheDocument();
});
