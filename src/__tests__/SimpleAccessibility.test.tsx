import { render, screen, fireEvent } from '@testing-library/react';
import { vi, test, expect, beforeEach } from 'vitest';
import { SimpleAccessibilityPanel } from '../components/accessibility/SimpleAccessibility';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    button: ({ children, ...props }: React.ComponentProps<'button'>) => <button {...props}>{children}</button>,
    div: ({ children, ...props }: React.ComponentProps<'div'>) => <div {...props}>{children}</div>,
  },
}));

// Mock localStorage
const mockGetItem = vi.fn();
const mockSetItem = vi.fn();
const localStorageMock = {
  getItem: mockGetItem,
  setItem: mockSetItem,
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
  removeItem: vi.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

beforeEach(() => {
  vi.clearAllMocks();
  // Reset document classes
  document.documentElement.className = '';
});

test('renders accessibility panel toggle button', () => {
  render(<SimpleAccessibilityPanel />);
  
  const toggleButton = screen.getByLabelText('Accessibility settings');
  expect(toggleButton).toBeInTheDocument();
});

test('opens and closes accessibility panel', () => {
  render(<SimpleAccessibilityPanel />);
  
  const toggleButton = screen.getByLabelText('Accessibility settings');
  
  // Panel should not be visible initially
  expect(screen.queryByText('Accessibility')).not.toBeInTheDocument();
  
  // Click to open panel
  fireEvent.click(toggleButton);
  expect(screen.getByText('Accessibility')).toBeInTheDocument();
  expect(screen.getByText('High Contrast')).toBeInTheDocument();
  
  // Click close button
  const closeButton = screen.getByLabelText('Close accessibility panel');
  fireEvent.click(closeButton);
  expect(screen.queryByText('Accessibility')).not.toBeInTheDocument();
});

test('toggles high contrast mode', () => {
  mockGetItem.mockReturnValue('false');
  
  render(<SimpleAccessibilityPanel />);
  
  // Open panel
  const toggleButton = screen.getByLabelText('Accessibility settings');
  fireEvent.click(toggleButton);
  
  // Find and click high contrast toggle
  const highContrastToggle = screen.getByLabelText('Toggle high contrast on');
  fireEvent.click(highContrastToggle);
  
  // Check that localStorage was called
  expect(mockSetItem).toHaveBeenCalledWith('accessibility-high-contrast', 'true');
  
  // Check that CSS class was added
  expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
});

test('loads saved high contrast preference', () => {
  mockGetItem.mockReturnValue('true');
  
  render(<SimpleAccessibilityPanel />);
  
  // Check that high contrast class was applied on load
  expect(document.documentElement.classList.contains('high-contrast')).toBe(true);
});

test('handles keyboard shortcuts', () => {
  mockGetItem.mockReturnValue('true');
  
  render(<SimpleAccessibilityPanel />);
  
  // Simulate Shift + Escape
  fireEvent.keyDown(document, { key: 'Escape', shiftKey: true });
  
  // Check that high contrast was disabled
  expect(mockSetItem).toHaveBeenCalledWith('accessibility-high-contrast', 'false');
  expect(document.documentElement.classList.contains('high-contrast')).toBe(false);
});