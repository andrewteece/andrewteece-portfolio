import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  IconArrowUp,
  IconChevronDown,
  IconMenu,
  IconMoon,
  IconSun,
  IconX,
} from '../components/icons';

describe('Icons', () => {
  describe('IconMenu', () => {
    it('renders menu icon with correct attributes', () => {
      const { container } = render(<IconMenu />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      expect(svg).toHaveAttribute('width', '1em');
      expect(svg).toHaveAttribute('height', '1em');
      expect(svg).toHaveAttribute('aria-hidden');
    });

    it('accepts custom props', () => {
      const { container } = render(<IconMenu className='custom-class' />);
      const svg = container.querySelector('svg');

      expect(svg).toHaveClass('custom-class');
    });
  });

  describe('IconX', () => {
    it('renders X icon with correct attributes', () => {
      const { container } = render(<IconX />);
      const svg = container.querySelector('svg');

      expect(svg).toBeInTheDocument();
      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      expect(svg).toHaveAttribute('aria-hidden');
    });

    it('has correct path for X shape', () => {
      const { container } = render(<IconX />);
      const path = container.querySelector('path');

      expect(path).toHaveAttribute('d', 'M6 6l12 12M18 6l-12 12');
      expect(path).toHaveAttribute('stroke', 'currentColor');
    });
  });

  describe('IconSun', () => {
    it('renders sun icon with correct structure', () => {
      const { container } = render(<IconSun />);
      const svg = container.querySelector('svg');
      const paths = container.querySelectorAll('path');
      const circle = container.querySelector('circle');

      expect(svg).toBeInTheDocument();
      expect(paths).toHaveLength(1);
      expect(circle).toBeInTheDocument();
    });

    it('has correct circle attributes', () => {
      const { container } = render(<IconSun />);
      const circle = container.querySelector('circle');

      expect(circle).toHaveAttribute('cx', '12');
      expect(circle).toHaveAttribute('cy', '12');
      expect(circle).toHaveAttribute('r', '4');
      expect(circle).toHaveAttribute('fill', 'none');
    });
  });

  describe('IconMoon', () => {
    it('renders moon icon with correct attributes', () => {
      const { container } = render(<IconMoon />);
      const svg = container.querySelector('svg');
      const path = container.querySelector('path');

      expect(svg).toBeInTheDocument();
      expect(path).toHaveAttribute(
        'd',
        'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'
      );
      expect(path).toHaveAttribute('fill', 'none');
    });
  });

  describe('IconChevronDown', () => {
    it('renders chevron down icon', () => {
      const { container } = render(<IconChevronDown />);
      const svg = container.querySelector('svg');
      const path = container.querySelector('path');

      expect(svg).toBeInTheDocument();
      expect(path).toHaveAttribute('d', 'M6 9l6 6 6-6');
      expect(path).toHaveAttribute('strokeLinecap', 'round');
    });
  });

  describe('IconArrowUp', () => {
    it('renders arrow up icon', () => {
      const { container } = render(<IconArrowUp />);
      const svg = container.querySelector('svg');
      const path = container.querySelector('path');

      expect(svg).toBeInTheDocument();
      expect(path).toHaveAttribute('d', 'M12 19V5M5 12l7-7 7 7');
      expect(path).toHaveAttribute('strokeLinecap', 'round');
    });

    it('applies custom styling', () => {
      const { container } = render(<IconArrowUp style={{ color: 'red' }} />);
      const svg = container.querySelector('svg');

      expect(svg).toHaveStyle({ color: 'red' });
    });
  });

  it('all icons have consistent base properties', () => {
    const icons = [
      IconMenu,
      IconX,
      IconSun,
      IconMoon,
      IconChevronDown,
      IconArrowUp,
    ];

    icons.forEach((Icon) => {
      const { container } = render(<Icon />);
      const svg = container.querySelector('svg');

      expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
      expect(svg).toHaveAttribute('width', '1em');
      expect(svg).toHaveAttribute('height', '1em');
      expect(svg).toHaveAttribute('aria-hidden');
    });
  });
});
