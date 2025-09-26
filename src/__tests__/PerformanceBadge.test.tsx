import { render, screen } from '@testing-library/react';
import { vi, test, expect } from 'vitest';
import PerformanceBadge from '../components/PerformanceBadge';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
  },
}));

test('renders performance badge with metrics', async () => {
  render(<PerformanceBadge />);
  
  // Wait for component to load metrics
  await screen.findByText('Live Performance');
  
  expect(screen.getByText('Live Performance')).toBeInTheDocument();
  expect(screen.getByText('Lighthouse')).toBeInTheDocument();
  expect(screen.getByText('98/100')).toBeInTheDocument();
  expect(screen.getByText('LCP')).toBeInTheDocument();
  expect(screen.getByText('1200ms')).toBeInTheDocument();
  expect(screen.getByText('Bundle Size')).toBeInTheDocument();
  expect(screen.getByText('234kb')).toBeInTheDocument();
});

test('displays correct score colors', async () => {
  render(<PerformanceBadge />);
  
  // Wait for metrics to load
  await screen.findByText('98/100');
  
  // Check that high score has green color class
  const lighthouseScore = screen.getByText('98/100');
  expect(lighthouseScore).toHaveClass('text-green-500');
});

test('shows core web vitals', async () => {
  render(<PerformanceBadge />);
  
  // Wait for component to load
  await screen.findByText('Live Performance');
  
  expect(screen.getByText('FID')).toBeInTheDocument();
  expect(screen.getByText('15ms')).toBeInTheDocument();
  expect(screen.getByText('CLS')).toBeInTheDocument();
  expect(screen.getByText('0.05')).toBeInTheDocument();
});