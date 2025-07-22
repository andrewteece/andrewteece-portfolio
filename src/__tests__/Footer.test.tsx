import { render, screen } from '@testing-library/react';
import Footer from '../components/layout/Footer';

test('renders footer with CI badges', () => {
  render(<Footer />);
  expect(
    screen.getByRole('link', { name: /github actions/i })
  ).toBeInTheDocument();
});
