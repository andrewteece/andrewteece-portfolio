import { render } from '@testing-library/react';
import { beforeEach, expect, test, vi } from 'vitest';
import ScrollProgress from '../components/ScrollProgress';

// Mock framer-motion
const mockUseScroll = vi.fn();
const mockUseSpring = vi.fn();

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
  },
  useScroll: () => {
    mockUseScroll();
    return { scrollYProgress: 0 };
  },
  useSpring: (value: unknown) => {
    mockUseSpring(value);
    return 0;
  },
}));

// Mock window.scrollY
Object.defineProperty(window, 'scrollY', {
  value: 0,
  writable: true,
});

beforeEach(() => {
  mockUseScroll.mockReturnValue({ scrollYProgress: 0 });
  mockUseSpring.mockReturnValue(0);
  window.scrollY = 0;
});

test('renders scroll progress component', () => {
  render(<ScrollProgress />);

  // Component should render without errors
  expect(document.querySelector('.fixed')).toBeInTheDocument();
});

test('handles scroll events', () => {
  render(<ScrollProgress />);

  // Simulate scroll
  window.scrollY = 150;
  window.dispatchEvent(new Event('scroll'));

  // Component should still be rendered
  expect(document.querySelector('.fixed')).toBeInTheDocument();
});

test('initializes motion hooks', () => {
  render(<ScrollProgress />);

  expect(mockUseScroll).toHaveBeenCalled();
  expect(mockUseSpring).toHaveBeenCalled();
});
