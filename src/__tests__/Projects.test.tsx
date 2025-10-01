import { act, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Projects from '../components/Projects';
import { ActiveSectionContext } from '../context/ActiveSectionContext';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div {...props}>{children}</div>
    ),
    button: ({ children, ...props }: React.ComponentProps<'button'>) => (
      <button {...props}>{children}</button>
    ),
  },
}));

// Mock intersection observer
const mockIntersectionObserver = vi.fn();
const mockObserver = {
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
};

mockIntersectionObserver.mockImplementation(() => mockObserver);
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
});

// Mock projects data
vi.mock('../content/projects', () => ({
  projects: [
    {
      title: 'Test Project 1',
      description: 'A test project description',
      tags: ['React', 'TypeScript'],
      image: 'test-image-1.jpg',
      demoUrl: 'https://demo1.com',
      codeUrl: 'https://github.com/test/project1',
    },
    {
      title: 'Test Project 2',
      description: 'Another test project',
      tags: ['Node.js', 'Express'],
      image: 'test-image-2.jpg',
      demoUrl: 'https://demo2.com',
      codeUrl: 'https://github.com/test/project2',
    },
  ],
}));

const mockSetActiveSection = vi.fn();

const renderWithContext = (component: React.ReactNode) => {
  return render(
    <ActiveSectionContext.Provider
      value={{
        activeSection: 'home',
        setActiveSection: mockSetActiveSection,
      }}
    >
      {component}
    </ActiveSectionContext.Provider>
  );
};

describe('Projects', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders projects section with title and description', () => {
    renderWithContext(<Projects />);

    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(
      screen.getByText(
        /A curated collection of projects showcasing modern web development/
      )
    ).toBeInTheDocument();
  });

  it('renders all project cards', () => {
    renderWithContext(<Projects />);

    expect(screen.getByText('Test Project 1')).toBeInTheDocument();
    expect(screen.getByText('Test Project 2')).toBeInTheDocument();
  });

  it('sets up intersection observer on mount', () => {
    renderWithContext(<Projects />);

    expect(mockIntersectionObserver).toHaveBeenCalledWith(
      expect.any(Function),
      { threshold: 0.6 }
    );
    expect(mockObserver.observe).toHaveBeenCalled();
  });

  it('sets active section when intersecting', () => {
    renderWithContext(<Projects />);

    // Get the callback function passed to IntersectionObserver
    const callback = mockIntersectionObserver.mock
      .calls[0]?.[0] as IntersectionObserverCallback;

    // Simulate intersection
    act(() => {
      callback(
        [{ isIntersecting: true }] as IntersectionObserverEntry[],
        {} as IntersectionObserver
      );
    });

    expect(mockSetActiveSection).toHaveBeenCalledWith('projects');
  });

  it('does not set active section when not intersecting', () => {
    renderWithContext(<Projects />);

    const callback = mockIntersectionObserver.mock
      .calls[0]?.[0] as IntersectionObserverCallback;

    act(() => {
      callback(
        [{ isIntersecting: false }] as IntersectionObserverEntry[],
        {} as IntersectionObserver
      );
    });

    expect(mockSetActiveSection).not.toHaveBeenCalled();
  });

  it('cleans up intersection observer on unmount', () => {
    const { unmount } = renderWithContext(<Projects />);

    unmount();

    expect(mockObserver.disconnect).toHaveBeenCalled();
  });

  it('has correct section id and classes', () => {
    renderWithContext(<Projects />);

    const section = screen.getByText('Projects').closest('#projects');
    expect(section).toHaveClass(
      'text-center',
      'section-pad',
      'section-divider'
    );
  });
});
