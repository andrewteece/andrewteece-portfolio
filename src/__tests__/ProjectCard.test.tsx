import { render, screen } from '@testing-library/react';
import { expect, test, vi } from 'vitest';
import ProjectCard from '../components/ProjectCard';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    a: ({ children, ...props }: React.ComponentProps<'a'>) => (
      <a {...props}>{children}</a>
    ),
  },
}));

const mockProps = {
  title: 'Test Project',
  description: 'A test project description',
  github: 'https://github.com/test/repo',
  demo: 'https://test-demo.com',
  image: '/test-image.jpg',
  category: 'frontend' as const,
  featured: true,
  techStack: ['React', 'TypeScript', 'Tailwind', 'Vite'],
  metrics: {
    performance: '98/100 Lighthouse',
    accessibility: 'WCAG 2.1 AA',
    bundle: '234kb gzipped',
  },
};

test('renders project card with all information', () => {
  render(<ProjectCard {...mockProps} />);

  expect(screen.getByText('Test Project')).toBeInTheDocument();
  expect(screen.getByText('A test project description')).toBeInTheDocument();
  expect(screen.getByText('React')).toBeInTheDocument();
  expect(screen.getByText('TypeScript')).toBeInTheDocument();
  expect(screen.getByText('Featured')).toBeInTheDocument();
  expect(screen.getByText('frontend')).toBeInTheDocument();
});

test('renders github and demo links when provided', () => {
  render(<ProjectCard {...mockProps} />);

  const githubLink = screen.getByLabelText('View Test Project on GitHub');
  const demoLink = screen.getByLabelText('View live demo of Test Project');

  expect(githubLink).toBeInTheDocument();
  expect(githubLink).toHaveAttribute('href', 'https://github.com/test/repo');

  expect(demoLink).toBeInTheDocument();
  expect(demoLink).toHaveAttribute('href', 'https://test-demo.com');
});

test('renders image when provided', () => {
  render(<ProjectCard {...mockProps} />);

  const image = screen.getByAltText('Test Project');
  expect(image).toBeInTheDocument();
  expect(image).toHaveAttribute('src', '/test-image.jpg');
});

test('works without optional props', () => {
  const minimalProps = {
    title: 'Minimal Project',
    description: 'Basic project',
  };

  render(<ProjectCard {...minimalProps} />);

  expect(screen.getByText('Minimal Project')).toBeInTheDocument();
  expect(screen.getByText('Basic project')).toBeInTheDocument();
  expect(screen.queryByRole('img')).not.toBeInTheDocument();
  expect(screen.queryByText('Featured')).not.toBeInTheDocument();
});
