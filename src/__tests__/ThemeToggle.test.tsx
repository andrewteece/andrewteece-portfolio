import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '../components/layout/ThemeToggle';
import { vi, test, expect } from 'vitest';

test('toggles theme on click', () => {
  const toggle = vi.fn();

  render(<ThemeToggle isDark={false} toggle={toggle} />);
  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(toggle).toHaveBeenCalled();
});
