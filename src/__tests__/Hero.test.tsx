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

  expect(
    screen.getByText(/websites and marketing to help restaurants/i)
  ).toBeInTheDocument();
  expect(
    screen.getByText(
      /Our direct online ordering grew to 40% of sales, and I can set it up on the POS you already use/i
    )
  ).toBeInTheDocument();
});
