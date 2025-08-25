// src/lib/theme.ts
export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'theme';

export function getStoredTheme(): Theme | null {
  const t = localStorage.getItem(STORAGE_KEY);
  return t === 'light' || t === 'dark' ? t : null;
}

export function applyTheme(next: Theme) {
  const root = document.documentElement;

  // Temporarily disable transitions to prevent flashes
  root.classList.add('disable-transitions');

  // Apply on next frame to batch with layout
  requestAnimationFrame(() => {
    root.classList.toggle('dark', next === 'dark');
    root.setAttribute('data-theme', next);
    root.style.colorScheme = next;
    localStorage.setItem(STORAGE_KEY, next);

    // Keep meta color + favicons in sync
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]'
    );
    if (meta) meta.content = next === 'dark' ? '#0b0b0e' : '#ffffff';

    const iconLight = document.querySelector<HTMLLinkElement>(
      'link[rel="icon"][data-theme="light"]'
    );
    const iconDark = document.querySelector<HTMLLinkElement>(
      'link[rel="icon"][data-theme="dark"]'
    );
    if (iconLight && iconDark) {
      iconLight.media = next === 'dark' ? 'not all' : 'all';
      iconDark.media = next === 'dark' ? 'all' : 'not all';
    }

    // Re‑enable transitions after paint
    requestAnimationFrame(() => {
      root.classList.remove('disable-transitions');
    });
  });
}

export function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}
