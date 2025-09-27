import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SocialLinks from '../components/SocialLinks';

describe('SocialLinks', () => {
  it('renders all social media links', () => {
    render(<SocialLinks />);

    const githubLink = screen.getByLabelText('GitHub');
    const linkedinLink = screen.getByLabelText('LinkedIn');
    const twitterLink = screen.getByLabelText('Twitter / X');

    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
  });

  it('has correct href attributes for all links', () => {
    render(<SocialLinks />);

    const githubLink = screen.getByLabelText('GitHub');
    const linkedinLink = screen.getByLabelText('LinkedIn');
    const twitterLink = screen.getByLabelText('Twitter / X');

    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/andrewteece'
    );
    expect(linkedinLink).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/andrew-teece/'
    );
    expect(twitterLink).toHaveAttribute(
      'href',
      'https://x.com/AndrewTeec43111'
    );
  });

  it('has correct target and rel attributes for external links', () => {
    render(<SocialLinks />);

    const links = [
      screen.getByLabelText('GitHub'),
      screen.getByLabelText('LinkedIn'),
      screen.getByLabelText('Twitter / X'),
    ];

    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('applies custom className when provided', () => {
    render(<SocialLinks className='custom-class' />);

    const container = screen.getByLabelText('GitHub').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('has default classes applied', () => {
    render(<SocialLinks />);

    const container = screen.getByLabelText('GitHub').parentElement;
    expect(container).toHaveClass('flex', 'items-center', 'space-x-4');
  });

  it('has proper hover classes on links', () => {
    render(<SocialLinks />);

    const githubLink = screen.getByLabelText('GitHub');
    expect(githubLink).toHaveClass(
      'hover:text-[var(--color-accent)]',
      'transition-colors',
      'duration-200'
    );
  });

  it('renders X icon with correct attributes', () => {
    render(<SocialLinks />);

    const twitterLink = screen.getByLabelText('Twitter / X');
    const xIcon = twitterLink.querySelector('svg');

    expect(xIcon).toBeInTheDocument();
    expect(xIcon).toHaveAttribute('viewBox', '0 0 24 24');
    expect(xIcon).toHaveAttribute('fill', 'currentColor');
    expect(xIcon).toHaveAttribute('aria-hidden', 'true');
  });
});
