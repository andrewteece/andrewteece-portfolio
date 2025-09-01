import type { SVGProps } from 'react';

export const IconMenu = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 24 24' width='1em' height='1em' {...p} aria-hidden>
    <path
      d='M3 6h18M3 12h18M3 18h18'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);

export const IconX = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 24 24' width='1em' height='1em' {...p} aria-hidden>
    <path
      d='M6 6l12 12M18 6l-12 12'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
    />
  </svg>
);

export const IconSun = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 24 24' width='1em' height='1em' {...p} aria-hidden>
    <path
      d='M12 4V2M12 22v-2M4.93 4.93L3.51 3.51M20.49 20.49l-1.42-1.42M4 12H2M22 12h-2M4.93 19.07L3.51 20.49M20.49 3.51l-1.42 1.42'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
    />
    <circle
      cx='12'
      cy='12'
      r='4'
      stroke='currentColor'
      strokeWidth='2'
      fill='none'
    />
  </svg>
);

export const IconMoon = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 24 24' width='1em' height='1em' {...p} aria-hidden>
    <path
      d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'
      stroke='currentColor'
      strokeWidth='2'
      fill='none'
    />
  </svg>
);

export const IconChevronDown = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 24 24' width='1em' height='1em' {...p} aria-hidden>
    <path
      d='M6 9l6 6 6-6'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      fill='none'
    />
  </svg>
);

export const IconArrowUp = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox='0 0 24 24' width='1em' height='1em' {...p} aria-hidden>
    <path
      d='M12 19V5M5 12l7-7 7 7'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      fill='none'
    />
  </svg>
);
