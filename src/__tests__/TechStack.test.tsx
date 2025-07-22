import { render, screen } from '@testing-library/react';
import TechStack from '../components/sections/TechStack';

test('renders tech stack categories and badges', () => {
  render(<TechStack />);
  expect(screen.getByText('Frontend')).toBeInTheDocument();
  expect(screen.getByText('React')).toBeInTheDocument();
  expect(screen.getByText('Vitest')).toBeInTheDocument();
});
